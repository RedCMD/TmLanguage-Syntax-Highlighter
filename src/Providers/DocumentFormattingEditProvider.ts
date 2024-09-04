import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { getTrees, toRange, toPoint, queryNode } from "../TreeSitter";


/* 
	const filesConfig = workspace.getConfiguration('files', document);
	const fileFormattingOptions = {
		trimTrailingWhitespace: filesConfig.get<boolean>('trimTrailingWhitespace'),
		trimFinalNewlines: filesConfig.get<boolean>('trimFinalNewlines'),
		insertFinalNewline: filesConfig.get<boolean>('insertFinalNewline'),
	};
 */

export const DocumentFormattingEditProvider: vscode.DocumentFormattingEditProvider = {
	provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("Format"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const tabType = options.insertSpaces ? ' ' : '\t';
		const tabSize = options.insertSpaces ? options.tabSize : 1;
		const style = getFormattingStyle();

		// const start = performance.now();
		parseAllChildren(jsonTree.rootNode, textEdits, 0, tabSize, tabType, style);
		// vscode.window.showInformationMessage(performance.now() - start + "ms");

		// vscode.window.showInformationMessage(JSON.stringify(textEdits));
		return textEdits;
	},
};

export const DocumentRangeFormattingEditProvider: vscode.DocumentRangeFormattingEditProvider = {
	provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const tabType = options.insertSpaces ? ' ' : '\t';
		const tabSize = options.insertSpaces ? options.tabSize : 1;
		const style = getFormattingStyle();

		const startPoint = toPoint(range.start);
		const endPoint = toPoint(range.end);

		const queryString = `(_) @node`;
		const nestedCaptures = queryNode(jsonTree.rootNode, queryString, startPoint, endPoint);

		let level = -1;
		let node: Parser.SyntaxNode;
		for (const nestedCapture of nestedCaptures) {
			const nestedNode = nestedCapture.node;
			if (!toRange(nestedNode).contains(range)) {
				break;
			}
			node = nestedNode;
			level += tabSize;
		}
		const indent = Math.min(level, node.startPosition.column);

		parseAllChildren(node, textEdits, indent, tabSize, tabType, style);

		// vscode.window.showInformationMessage(JSON.stringify(textEdits));
		return textEdits;
	},
};

export const OnTypeFormattingEditProvider: vscode.OnTypeFormattingEditProvider = {
	provideOnTypeFormattingEdits(document: vscode.TextDocument, position: vscode.Position, ch: string, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const tabType = options.insertSpaces ? ' ' : '\t';
		const tabSize = options.insertSpaces ? options.tabSize : 1;
		const style = getFormattingStyle();

		const startPoint = toPoint(position.translate(0, -1));
		const endPoint = toPoint(position);

		const queryString = `"${ch}" @char`;
		const captures = queryNode(jsonTree.rootNode, queryString, startPoint, endPoint);
		const capture = captures.pop();
		if (!capture) {
			return;
		}
		const cursorNode = capture.node;
		let node: Parser.SyntaxNode;

		switch (ch) {
			case ',':
				node = cursorNode.previousNamedSibling;
				break;
			case '}':
			case ']':
				node = cursorNode.parent;
				break;
			default:
				return;
		}

		let level = 0;
		let parent = node.parent;
		while (parent) {
			parent = parent.parent;
			level++;
		};

		const indent = Math.min(level, node.startPosition.column);

		parseAllChildren(node, textEdits, indent, tabSize, tabType, style);

		// vscode.window.showInformationMessage(JSON.stringify(textEdits));
		return textEdits;
	},
};

type formattingStyle = { wsBrackets: string; };
function getFormattingStyle(): formattingStyle {
	const styleName: 'tight' | 'default' = vscode.workspace.getConfiguration('tmlanguage-syntax-highlighter').get('formattingStyle');
	const style = {
		default: { wsBrackets: ' ' },
		tight: { wsBrackets: '' },
	}[styleName];
	return style;
}

function parseAllChildren(parentNode: Parser.SyntaxNode, textEdits: vscode.TextEdit[], indent: number, tabSize: number, tabType: string, style: formattingStyle) {
	let range: vscode.Range;
	let whiteSpace: string;
	let textEdit: vscode.TextEdit;
	let expand: Boolean = false;

	for (const node of parentNode.namedChildren) {
		if (parseAllChildren(node, textEdits, indent + tabSize, tabSize, tabType, style)) {
			expand = true;
		}
	}

	if (expand == false) {
		const namedChildCount = parentNode.namedChildCount;
		if (namedChildCount > 1) {
			switch (parentNode.type) {
				case 'value':
				case 'regex':
					break;

				case 'repo':
				case 'repository':
				case 'injection':
					expand = true;
					break;

				case 'patterns':
					if (parentNode.parent.type == 'json') {
						expand = true;
						break;
					}

				default:
					if (namedChildCount > 2) {
						expand = true;
						break;
					}
					if (parentNode.firstNamedChild.type != 'key') {
						expand = true;
						break;
					}
					if (parentNode.text.length > 2000) {
						expand = true;
						break;
					}
			}
		}
	}


	for (const node of parentNode.children) {
		if (node.isMissing) {
			range = toRange(node);

			textEdit = vscode.TextEdit.replace(range, node.type);
			textEdits.push(textEdit);
		}
		switch (node.type) {
			case '{':
			case '[':
				indent += tabSize;

				if (expand == true)
					whiteSpace = '\n'.padEnd(indent + 1, tabType);
				else
					whiteSpace = style.wsBrackets;

				if (node.isMissing) {
					range = toRange(node);
				}
				else {
					range = new vscode.Range(
						node.endPosition.row,
						node.endPosition.column,
						node.nextSibling?.startPosition.row ?? parentNode.endPosition.row,
						node.nextSibling?.startPosition.column ?? parentNode.endPosition.column,
					);
				}

				textEdit = vscode.TextEdit.replace(range, whiteSpace);
				textEdits.push(textEdit);
				break;

			case '}':
			case ']':
				indent -= tabSize;

				if (node.previousSibling?.type == '{') {
					break;
				}
				if (node.previousSibling?.type == '[') {
					break;
				}

				if (expand == true)
					whiteSpace = '\n'.padEnd(indent + 1, tabType);
				else
					whiteSpace = style.wsBrackets;

				range = new vscode.Range(
					node.previousSibling?.endPosition.row ?? parentNode.startPosition.row,
					node.previousSibling?.endPosition.column ?? parentNode.startPosition.column,
					node.startPosition.row,
					node.startPosition.column,
				);

				textEdit = vscode.TextEdit.replace(range, whiteSpace);
				textEdits.push(textEdit);
				break;

			case ',':
				if (node.nextSibling?.type != '}' && node.nextSibling?.type != ']' || node.isMissing) { // hacks upon hacks
					if (expand == true)
						whiteSpace = '\n'.padEnd(indent + 1, tabType);
					else
						whiteSpace = ' ';

					if (node.isMissing) {
						range = toRange(node); // node.nextSibling doesn't work very well on missing nodes
					}
					else {
						range = new vscode.Range(
							node.endPosition.row,
							node.endPosition.column,
							node.nextSibling?.startPosition.row ?? parentNode.endPosition.row,
							node.nextSibling?.startPosition.column ?? parentNode.endPosition.column,
						);
					}

					textEdit = vscode.TextEdit.replace(range, whiteSpace);
					textEdits.push(textEdit);
				}

				if (node.previousSibling?.type == '{') {
					break;
				}
				if (node.previousSibling?.type == '[') {
					break;
				}
				if (node.previousSibling?.type == ',') {
					break;
				}

				whiteSpace = '';

				range = new vscode.Range(
					node.previousSibling?.endPosition.row ?? parentNode.startPosition.row,
					node.previousSibling?.endPosition.column ?? parentNode.startPosition.column,
					node.startPosition.row,
					node.startPosition.column,
				);

				textEdit = vscode.TextEdit.replace(range, whiteSpace);
				textEdits.push(textEdit);
				break;

			case ':':
				whiteSpace = ' ';

				if (node.isMissing) {
					range = toRange(node);
				}
				else {
					range = new vscode.Range(
						node.endPosition.row,
						node.endPosition.column,
						node.nextSibling?.startPosition.row ?? parentNode.endPosition.row,
						node.nextSibling?.startPosition.column ?? parentNode.endPosition.column,
					);
				}

				textEdit = vscode.TextEdit.replace(range, whiteSpace);
				textEdits.push(textEdit);

				whiteSpace = '';

				range = new vscode.Range(
					node.previousSibling?.endPosition.row ?? parentNode.startPosition.row,
					node.previousSibling?.endPosition.column ?? parentNode.startPosition.column,
					node.startPosition.row,
					node.startPosition.column,
				);

				textEdit = vscode.TextEdit.replace(range, whiteSpace);
				textEdits.push(textEdit);
				break;
		}
	}

	return expand;
}

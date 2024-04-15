import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { getTrees, toRange, toPoint, queryNode } from "../TreeSitter";


export const DocumentFormattingEditProvider: vscode.DocumentFormattingEditProvider = {
	provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("Format"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const tabType = options.insertSpaces ? ' ' : '\t';
		const tabSize = options.insertSpaces ? options.tabSize : 1;

		parseAllChildren(jsonTree.rootNode, textEdits, 0, tabSize, tabType);

		// vscode.window.showInformationMessage(JSON.stringify(textEdits));
		return textEdits;
	},
}

export const DocumentRangeFormattingEditProvider: vscode.DocumentRangeFormattingEditProvider = {
	provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const tabType = options.insertSpaces ? ' ' : '\t';
		const tabSize = options.insertSpaces ? options.tabSize : 1;

		const startPoint = toPoint(range.start);
		const endPoint = toPoint(range.end);

		const queryString = `(_) @node`;
		const nestedCaptures = queryNode(jsonTree.rootNode, queryString, startPoint, endPoint);

		let level = -1;
		let node: Parser.SyntaxNode;
		for (const nestedCapture of nestedCaptures) {
			const nestedNode = nestedCapture.node
			if (!toRange(nestedNode).contains(range)) {
				break;
			}
			node = nestedNode;
			level++;
		}
		const indent = Math.min(level, node.startPosition.column);

		parseAllChildren(node, textEdits, indent, tabSize, tabType);

		// vscode.window.showInformationMessage(JSON.stringify(textEdits));
		return textEdits;
	},
}

function parseAllChildren(parentNode: Parser.SyntaxNode, textEdits: vscode.TextEdit[], indent: number, tabSize: number, tabType: string) {
	let range: vscode.Range;
	let whiteSpace: string;
	let textEdit: vscode.TextEdit;
	let expand: Boolean = false;

	for (const node of parentNode.namedChildren) {
		if (parseAllChildren(node, textEdits, indent + tabSize, tabSize, tabType)) {
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

	const styleName: 'tight' | 'default' =
		vscode.workspace.getConfiguration('tmlanguage-syntax-highlighter').get('formattingStyle')
	const style = {
		'default': {
			'wsBrackets': ' '
		},
		'tight': {
			'wsBrackets': ''
		},
	}[styleName]

	for (const node of parentNode.children) {
		switch (node.type) {
			case '{':
			case '[':
				indent += tabSize

				if (node.nextSibling == null)
					break

				if (expand == true)
					whiteSpace = '\n'.padEnd(indent + 1, tabType)
				else
					whiteSpace = style.wsBrackets

				range = new vscode.Range(
					node.endPosition.row,
					node.endPosition.column,
					node.nextSibling.startPosition.row,
					node.nextSibling.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)
				break

			case '}':
			case ']':
				indent -= tabSize

				if (node.previousSibling == null)
					break

				if (node.previousSibling.type == '{')
					break
				if (node.previousSibling.type == '[')
					break

				if (expand == true)
					whiteSpace = '\n'.padEnd(indent + 1, tabType)
				else
					whiteSpace = style.wsBrackets

				range = new vscode.Range(
					node.previousSibling.endPosition.row,
					node.previousSibling.endPosition.column,
					node.startPosition.row,
					node.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)
				break

			case ',':
				if (node.nextSibling == null)
					break

				if (expand == true)
					whiteSpace = '\n'.padEnd(indent + 1, tabType)
				else
					whiteSpace = ' '

				range = new vscode.Range(
					node.endPosition.row,
					node.endPosition.column,
					node.nextSibling.startPosition.row,
					node.nextSibling.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)

				if (node.previousSibling == null)
					break

				whiteSpace = ''

				range = new vscode.Range(
					node.previousSibling.endPosition.row,
					node.previousSibling.endPosition.column,
					node.startPosition.row,
					node.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)
				break

			case ':':
				if (node.nextSibling == null)
					break
				whiteSpace = ' '

				range = new vscode.Range(
					node.endPosition.row,
					node.endPosition.column,
					node.nextSibling.startPosition.row,
					node.nextSibling.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)

				if (node.previousSibling == null)
					break

				whiteSpace = ''

				range = new vscode.Range(
					node.previousSibling.endPosition.row,
					node.previousSibling.endPosition.column,
					node.startPosition.row,
					node.startPosition.column
				)

				textEdit = vscode.TextEdit.replace(range, whiteSpace)
				textEdits.push(textEdit)
				break
		}
	}

	return expand;
}
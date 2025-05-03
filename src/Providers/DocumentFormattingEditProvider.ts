import * as vscode from 'vscode';
import * as TreeSitter from 'web-tree-sitter';
import { getTrees, toRange, toPoint, queryNode } from "../TreeSitter";
import { sleep } from "../extension";


type formattingStyle = {
	tabType: ' ' | '\t';
	tabSize: number;
	wsBrackets: string;
};

function getFormattingStyle(options?: vscode.FormattingOptions): formattingStyle {
	const bracketStyle = <'tight' | 'default'>vscode.workspace.getConfiguration('json.textmate').get('formattingStyle');
	const style: formattingStyle = {
		tabType: options?.insertSpaces ? ' ' : '\t',
		tabSize: options?.insertSpaces ? options?.tabSize : 1,
		wsBrackets: bracketStyle == 'tight' ? '' : ' ',
	};
	return style;
}


export const DocumentFormattingEditProvider: vscode.DocumentFormattingEditProvider = {
	provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("Format"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const style = getFormattingStyle(options);

		// const start = performance.now();
		formatChildren(jsonTree.rootNode, textEdits, 0, style);

		// vscode.window.showInformationMessage(`Format ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(textEdits)}`);
		return textEdits;
	},
};

export const DocumentRangeFormattingEditProvider: vscode.DocumentRangeFormattingEditProvider = {
	provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.TextEdit[] {
		// vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
		// const start = performance.now();
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const style = getFormattingStyle(options);

		const startPoint = toPoint(range.start);
		const endPoint = toPoint(range.end);

		const queryString = `(_) @node`;
		const nestedCaptures = queryNode(jsonTree.rootNode, queryString, startPoint, endPoint);

		let level = -1;
		let node!: TreeSitter.Node;
		for (const nestedCapture of nestedCaptures) {
			const nestedNode = nestedCapture.node;
			if (!toRange(nestedNode).contains(range)) {
				break;
			}
			node = nestedNode;
			level += style.tabSize;
		}
		const indent = Math.min(level, node.startPosition.column);

		formatChildren(node, textEdits, indent, style);

		// vscode.window.showInformationMessage(`FormatRange ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(textEdits)}`);
		return textEdits;
	},
};

export const OnTypeFormattingEditProvider: vscode.OnTypeFormattingEditProvider = {
	async provideOnTypeFormattingEdits(document: vscode.TextDocument, position: vscode.Position, ch: string, options: vscode.FormattingOptions, token: vscode.CancellationToken): Promise<vscode.TextEdit[] | undefined> {
		// vscode.window.showInformationMessage(`FormatType: ${JSON.stringify(ch)}`);
		// const start = performance.now();

		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const textEdits: vscode.TextEdit[] = [];

		const startPoint = toPoint(position.translate(0, -1));
		const endPoint = toPoint(position);

		const queryString = `"${ch}" @char`;
		const captures = queryNode(jsonTree.rootNode, queryString, startPoint, endPoint);
		const capture = captures.pop();
		if (!capture) {
			return;
		}
		const cursorNode = capture.node;
		let node: TreeSitter.Node | null;

		switch (ch) {
			case ',':
				node = cursorNode.previousNamedSibling;
				break;
			case '}':
			case ']':
			case ':':
				node = cursorNode.parent;
				break;
			default:
				return;
		}

		if (!node) {
			return;
		}

		const style = getFormattingStyle(options);

		let level = 0;
		let parent = node.parent;
		while (parent) {
			parent = parent.parent;
			level += style.tabSize;
		};

		const indent = Math.min(level, node.startPosition.column);

		formatChildren(node, textEdits, indent, style);

		// vscode.window.showInformationMessage(`FormatType ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(textEdits)}`);
		return textEdits;
	},
};


function formatChildren(parentNode: TreeSitter.Node, textEdits: vscode.TextEdit[], indent: number, style: formattingStyle): boolean {
	let expand: boolean = false;

	for (const node of parentNode.namedChildren) {
		if (!node) {
			continue;
		}
		if (node.isError) {
			continue;
		}
		expand = formatChildren(node, textEdits, indent + style.tabSize, style) || expand;
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
					if (parentNode.parent!.type == 'json') {
						expand = true;
						break;
					}
				/* FallThrough */
				default:
					if (namedChildCount > 2) {
						expand = true;
						break;
					}
					if (parentNode.firstNamedChild!.type != 'key') {
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
		if (!node) {
			continue;
		}
		if (node.isError) {
			continue;
		}

		const nextSibling = node.nextSibling;
		const prevSibling = node.previousSibling;

		switch (node.type) {
			case '{':
			case '[':
				indent += style.tabSize;

				if (nextSibling?.type == '}' || nextSibling?.type == ']') { // Don't double up spaces in empty objects/arrays
					break;
				}

				textEdits.push( // Whitespace after opening bracket
					vscode.TextEdit.replace(
						toRange(
							node.startPosition,
							nextSibling?.startPosition ?? parentNode.endPosition,
						),
						expand ?
							node.type + '\n'.padEnd(indent + 1, style.tabType) :
							node.type + style.wsBrackets,
					),
				);
				break;

			case '}':
			case ']':
				indent -= style.tabSize;

				textEdits.push( // Whitespace before closing bracket
					vscode.TextEdit.replace(
						toRange(
							prevSibling?.endPosition ?? parentNode.startPosition,
							node.endPosition,
						),
						expand ?
							'\n'.padEnd(indent + 1, style.tabType) + node.type :
							style.wsBrackets + node.type,
					),
				);
				break;

			case ',':
				if (prevSibling?.type == '{' || prevSibling?.type == '[' || nextSibling?.type == '}' || nextSibling?.type == ']' || nextSibling?.type == ',') {
					textEdits.push( // Remove extra comma
						vscode.TextEdit.delete(
							toRange(node),
						),
					);
					break;
				}

				textEdits.push( // No whitespace before comma. Only whitespace after comma
					vscode.TextEdit.replace(
						toRange(
							prevSibling?.endPosition ?? parentNode.startPosition,
							nextSibling?.startPosition ?? parentNode.endPosition,
						),
						expand ?
							',\n'.padEnd(indent + 2, style.tabType) :
							', ',
					),
				);
				break;

			case ':':
				textEdits.push( // One space after colon
					vscode.TextEdit.replace(
						toRange(
							prevSibling?.endPosition ?? parentNode.startPosition,
							nextSibling?.startPosition ?? parentNode.endPosition,
						),
						': ',
					)
				);
				break;
		}
	}

	return expand;
}

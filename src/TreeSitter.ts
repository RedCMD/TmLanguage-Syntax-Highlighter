import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { DocumentSelector, stringify } from "./extension";

export type trees = {
	readonly jsonTree: Parser.Tree;
	readonly regexTrees: {
		[id: number]: Parser.Tree;
	};
	readonly regexNodes: {
		[id: number]: Parser.SyntaxNode;
	};
};

const trees: {
	[uri: string]: trees;
} = {};

export function getTrees(uri: vscode.Uri): trees;
export function getTrees(document: vscode.TextDocument): trees;
export function getTrees(source: vscode.TextDocument | vscode.Uri): trees {
	const uriString = 'uri' in source ? source.uri.toString() : source.toString();
	const docTrees = trees[uriString];
	if (docTrees) {
		return docTrees;
	}

	if ('uri' in source) {
		parseTextDocument(source);
		const docTrees = trees[uriString];
		if (docTrees) {
			return docTrees;
		}
	}
	vscode.window.showInformationMessage(JSON.stringify("TextMate: TS Tree does not exist!"));
	vscode.window.showInformationMessage(JSON.stringify(source));
	vscode.window.showInformationMessage(JSON.stringify(trees));
}

export function getRegexNode(source: vscode.TextDocument | vscode.Uri | trees | trees["regexTrees"], node: Parser.SyntaxNode | number): Parser.SyntaxNode {
	const nodeId = typeof node == 'number' ? node : node.id;
	if ('uri' in source) {
		const uriString = source.uri.toString();
		const regexTrees = trees[uriString]?.regexTrees;
		const regexTree = regexTrees[nodeId];
		return regexTree.rootNode;
	}
	if ('scheme' in source) {
		const uriString = source.toString();
		const regexTrees = trees[uriString]?.regexTrees;
		const regexTree = regexTrees[nodeId];
		return regexTree.rootNode;
	}
	if ('regexTrees' in source) {
		const regexTrees = source.regexTrees;
		const regexTree = regexTrees[nodeId];
		return regexTree.rootNode;
	}
	const regexTree = source[nodeId];
	return regexTree.rootNode;
}

/**
 * Returns the first non-empty comment in the parent node
 */
export function getComment(node: Parser.SyntaxNode): string | null {
	const parent = trueParent(node);
	const query = `;scm
		(comment (value) @comment (.not-eq? @comment ""))
		(comment_slash (value) @comment (.not-eq? @comment ""))
	`;
	const capture = queryNode(parent, query)[0];
	return capture?.node?.text?.replace(/\\(.)?/g, '$1');
}

export function getLastNode(rootNode: Parser.SyntaxNode, type: string) {
	const nodes = rootNode.namedChildren;
	for (let index = nodes.length - 1; index >= 0; index--) { // bottom up
		const childNode = nodes[index];
		if (childNode.type == type) {
			return childNode;
		}
	}
}

const queryCache: { [query: string]: Parser.Query; } = {};

export function queryNode(node: Parser.SyntaxNode, queryString: string): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point): Parser.QueryCapture | null;
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point, mustIntersectPoint: false): Parser.QueryCapture | undefined;
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint: Parser.Point, endPoint: Parser.Point): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint?: Parser.Point, endPoint?: Parser.Point | false): Parser.QueryCapture[] | Parser.QueryCapture | null | undefined {
	// const start = performance.now();
	let query = queryCache[queryString];
	// query = null;

	if (query == null) {
		const language = node.tree.getLanguage();
		// const start = performance.now();
		query = language.query(queryString);
		// vscode.window.showInformationMessage(`${(performance.now() - start).toFixed(1)}ms: ${queryString}`);
		query.disableCapture('_ignore_');
		queryCache[queryString] = query;
		// vscode.window.showInformationMessage(JSON.stringify(query, stringify));
		// vscode.window.showInformationMessage(JSON.stringify(queryString));
	}

	// vscode.window.showInformationMessage(performance.now() - start + "ms");
	const queryOptions: Parser.QueryOptions = {
		startPosition: startPoint,
		endPosition: endPoint || startPoint,
		// startIndex: 0,
		// endIndex: 10000000,
		matchLimit: 10000,
	};

	// const queryCaptures = query.captures(node, queryOptions);
	const queryMatches = query.matches(node, queryOptions);
	// vscode.window.showInformationMessage(JSON.stringify(queryMatches));
	// if (queryCaptures.length > 10000) {
	// 	vscode.window.showWarningMessage("Unoptimized Query: " + queryCaptures.length + " results returned:\n" + queryString);
	// 	// vscode.window.showInformationMessage(JSON.stringify(queryCaptures));
	// }
	if (startPoint && !endPoint) {
		if (endPoint === false) {
			// vscode.window.showInformationMessage(JSON.stringify(queryMatches));
			return queryMatches.pop()?.captures?.pop();
			// return queryCaptures.pop(); // the last/inner most node
		}
		const position = new vscode.Position(
			startPoint.row,
			startPoint.column,
		);
		// const queryCaptures = query.captures(node, queryOptions);
		while (queryMatches.length) { // TreeSitter doesn't actually check if the captured node intersects the startPoint :/
			const queryMatch = queryMatches.pop(); // the last/inner most node
			const captures = queryMatch?.captures;
			while (captures?.length) { // TreeSitter doesn't actually check if the captured node intersects the startPoint :/
				const queryCapture = captures.pop(); // the last/inner most node
				if (toRange(queryCapture.node).contains(position)) {
					return queryCapture;
				}
			}
		}
		return null;
	}
	let queryCaptures: Parser.QueryCapture[] = [];
	for (const queryMatch of queryMatches) {
		const captures = queryMatch.captures;
		queryCaptures = queryCaptures.concat(captures);
	}
	return queryCaptures;
}

export function toRange(node: Parser.SyntaxNode): vscode.Range {
	if (!node) {
		return null;
	}
	const startPosition = node.startPosition;
	const endPosition = node.endPosition;
	const range = new vscode.Range(
		startPosition.row,
		startPosition.column,
		endPosition.row,
		endPosition.column
	);
	return range;
}

export function toPoint(position: vscode.Position): Parser.Point {
	if (!position) {
		return null;
	}
	const row = position.line;
	const column = position.character;
	const point: Parser.Point = { row: row, column: column };
	return point;
}

export function toPosition(point: Parser.Point): vscode.Position {
	if (!point) {
		return null;
	}
	const line = point.row;
	const character = point.column;
	const position = new vscode.Position(line, character);
	return position;
}

/**
 * TreeSitter bug
 * Using `.parent` on a 0width node returns the `previousSilbing` rather than the `parent`
 * https://github.com/tree-sitter/tree-sitter/issues/1872
 */
export function trueParent(node: Parser.SyntaxNode): Parser.SyntaxNode {
	const parent = node.parent;
	if (parent == null) {
		// vscode.window.showInformationMessage(JSON.stringify(node.toString()));
		// vscode.window.showInformationMessage(JSON.stringify(node.type));
		// vscode.window.showInformationMessage(JSON.stringify(node.text));
		return node;
	}
	if (node.text != '') {
		return parent;
	}
	// return parent;
	// return parent.parent;

	const sibling = parent.nextSibling;
	return sibling ? sibling.equals(node) ? parent.parent : parent : parent;
}


export const parseEvents: ((document: vscode.TextDocument) => void)[] = [];

export let jsonParser: Parser;
export let regexParser: Parser;

declare var navigator: object | undefined;
export async function initTreeSitter(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TreeSitterInit"));

	// We only need to provide these options when running in the web worker
	const moduleOptions: object | undefined = typeof navigator === 'undefined'
		? undefined
		: {
			locateFile() {
				return vscode.Uri.joinPath(context.extensionUri, 'node_modules', 'web-tree-sitter', 'tree-sitter.wasm').toString(true);
			}
		};
	await Parser.init(moduleOptions); // Everything MUST wait until TreeSitter initializes

	// vscode.window.showInformationMessage(JSON.stringify("Parser"));

	jsonParser = new Parser();
	const jsonWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-jsontm.wasm');
	const jsonWasm = jsonWasmUri.scheme === 'file' ? jsonWasmUri.fsPath : jsonWasmUri.toString(true);
	const jsonLanguage = await Parser.Language.load(jsonWasm);
	jsonParser.setLanguage(jsonLanguage);

	regexParser = new Parser();
	const regexWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-regextm.wasm');
	const regexWasm = regexWasmUri.scheme === 'file' ? regexWasmUri.fsPath : regexWasmUri.toString(true);
	const regexLanguage = await Parser.Language.load(regexWasm);
	regexParser.setLanguage(regexLanguage);

	const activeDocuments: {
		[uriString: string]: {
			edits: vscode.TextDocumentChangeEvent;
			timeout: NodeJS.Timeout | number; // VSCode vs VSCode Web
		};
	} = {};

	// for (const editor of vscode.window.visibleTextEditors) {
	// 	// vscode.window.showInformationMessage(JSON.stringify("visible"));
	// 	if (!vscode.languages.match(DocumentSelector, editor.document)) {
	// 		return;
	// 	}
	// 	parseTextDocument(editor.document);
	// }

	for (const editor of vscode.window.visibleTextEditors) {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		if (!vscode.languages.match(DocumentSelector, editor.document)) {
			continue;
		}
		parseTextDocument(editor.document);
	}

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(document => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			if (!vscode.languages.match(DocumentSelector, document)) {
				return;
			}
			parseTextDocument(document);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(edits => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			const document = edits.document;
			if (!vscode.languages.match(DocumentSelector, document)) {
				return;
			}

			const uriString = document.uri.toString();
			const activeDocument = activeDocuments[uriString] ?? { edits: null, timeout: null };
			activeDocuments[uriString] = activeDocument;

			// Debounce recently repeated requests
			if (activeDocument.timeout == null) {
				// Run Diagnostics instantly on first edit
				reparseTextDocument(edits);

				// Wait 50ms and execute CallBack reguardless of if there are gonna be new edits or not
				activeDocument.timeout = setInterval(
					() => {
						if (activeDocument.edits == null) {
							// No new edits? exit.
							clearInterval(activeDocument.timeout); // timeout.refresh() doesn't work in VSCode web
							activeDocument.timeout = null;

							for (const parseEvent of parseEvents) {
								try {
									parseEvent(document);
								} catch (error) { }
							}
							return;
						}

						// setInterval() waits for current callback to finish
						reparseTextDocument(activeDocument.edits);
						activeDocument.edits = null;
					},
					50, // 50 milisecond intervals. Does anyone want this as a config?
				);
				return;
			}

			// Add on the latest edits
			activeDocument.edits = {
				document: document,
				contentChanges: (activeDocument.edits?.contentChanges ?? []).concat(edits.contentChanges),
				reason: activeDocument.edits?.reason,
			};
			// vscode.window.showInformationMessage(JSON.stringify(activeDocument.edits));
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(document => {
			// vscode.window.showInformationMessage(JSON.stringify("close"));
			const uriString = document.uri.toString();
			delete activeDocuments[uriString];
			if (trees[uriString]) {
				trees[uriString].jsonTree.delete();
				for (const tree in trees[uriString].regexTrees) {
					trees[uriString].regexTrees[tree].delete();
				}
				delete trees[uriString];
			}
		})
	);
}


function parseTextDocument(document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("ParseTextDocument"));
	// vscode.window.showInformationMessage(JSON.stringify(document.uri));
	// const start = performance.now();

	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}
	// vscode.window.showInformationMessage(JSON.stringify(document.uri));

	const uriString = document.uri.toString();
	if (uriString in trees) {
		console.log("JSON TextMate: Why are we here?");
		return;
	}

	const text = document.getText();
	const jsonTree = jsonParser.parse(text);

	// const languageJSON = jsonParser.getLanguage();
	// const query = languageJSON.query(`(regex) @regex`);
	// const queryCaptures = query.captures(jsonTree.rootNode);

	const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
	const regexTrees: trees["regexTrees"] = {};
	const regexNodes: trees["regexNodes"] = {};

	for (const queryCapture of queryCaptures) {
		const node = queryCapture.node;
		const range: Parser.Range = {
			startIndex: node.startIndex,
			endIndex: node.endIndex,
			startPosition: node.startPosition,
			endPosition: node.endPosition,
		};
		const ranges: Parser.Range[] = [range];
		const options: Parser.Options = { includedRanges: ranges };
		const regexTree = regexParser.parse(text, null, options);
		regexTrees[node.id] = regexTree;

		const regexNode = regexTree.rootNode;
		regexNodes[regexNode.id] = node;
	}
	trees[uriString] = {
		jsonTree: jsonTree,
		regexTrees: regexTrees,
		regexNodes: regexNodes,
	};

	// let index = 0;
	// const regexIds = {};
	// const ranges: Parser.Range[] = [];
	// for (const queryCapture of queryCaptures) {
	// 	const node = queryCapture.node;
	// 	const range: Parser.Range = {
	// 		startPosition: node.startPosition,
	// 		endPosition: node.endPosition,
	// 		startIndex: node.startIndex,
	// 		endIndex: node.endIndex
	// 	};
	// 	ranges.push(range);

	// 	const id = node.id;
	// 	regexIds[id] = index++;
	// }
	// const Options: Parser.Options = { includedRanges: ranges };

	// const regexTree = regexParser.parse(text, jsonTree, Options);


	//  if(node.hasChanges()) {}
	// vscode.window.showInformationMessage(`parseTree ${performance.now() - start}ms`);
}

function reparseTextDocument(edits: vscode.TextDocumentChangeEvent) {
	// vscode.window.showInformationMessage(JSON.stringify("ReparseTextDocument"));
	// const start = performance.now();

	if (edits.contentChanges.length == 0) {
		return;
	}

	const document = edits.document;
	const uriString = document.uri.toString();
	if (!(uriString in trees)) {
		vscode.window.showInformationMessage(JSON.stringify(document));
		parseTextDocument(document);
		return;
	}

	// vscode.window.showInformationMessage(JSON.stringify(edits));

	const jsonTreeOld = trees[uriString].jsonTree;
	const text = document.getText();

	const deltas: Parser.Edit[] = [];

	for (const edit of edits.contentChanges) {
		const startIndex = edit.rangeOffset;
		const oldEndIndex = edit.rangeOffset + edit.rangeLength;
		const newEndIndex = edit.rangeOffset + edit.text.length;
		// const startPos = document.positionAt(startIndex);
		const startPos = edit.range.start;
		// const oldEndPos = document.positionAt(oldEndIndex);
		const oldEndPos = edit.range.end;
		// const newEndPos = document.positionAt(newEndIndex);
		const lines = edit.text.split(/\r?\n/g);
		const newEndPos = new vscode.Position(
			startPos.line + lines.length - 1,
			lines.length > 1 ? lines.pop().length : startPos.character + lines.pop().length
		);
		const startPosition = toPoint(startPos);
		const oldEndPosition = toPoint(oldEndPos);
		const newEndPosition = toPoint(newEndPos);
		const delta: Parser.Edit = {
			startIndex,
			oldEndIndex,
			newEndIndex,
			startPosition,
			oldEndPosition,
			newEndPosition,
		};
		deltas.push(delta);
		jsonTreeOld.edit(delta);
	}
	// vscode.window.showInformationMessage(JSON.stringify(deltas));

	// (startIndex: number, startPoint?: Parser.Point, endIndex?: number) => {
	// 	// vscode.window.showInformationMessage("startIndex: " + JSON.stringify(startIndex));
	// 	// vscode.window.showInformationMessage("startPoint: " + JSON.stringify(startPoint));
	// 	vscode.window.showInformationMessage("endIndex: " + JSON.stringify(endIndex));
	// 	return document.lineAt(startPoint.row).text.slice(startPoint.row)
	// },
	const jsonTree = jsonParser.parse(text, jsonTreeOld);
	// vscode.window.showInformationMessage(JSON.stringify(jsonTree.getEditedRange(jsonTreeOld)));


	// Todo: only reparse modified regex nodes. tree.getChangedRanges();
	const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
	const regexTrees: trees["regexTrees"] = {};
	const regexNodes: trees["regexNodes"] = {};

	for (const queryCapture of queryCaptures) {
		const node = queryCapture.node;
		const id = node.id;
		// if (node.hasChanges()) {
		const range: Parser.Range = {
			startPosition: node.startPosition,
			endPosition: node.endPosition,
			startIndex: node.startIndex,
			endIndex: node.endIndex
		};
		const ranges: Parser.Range[] = [range];
		const options: Parser.Options = { includedRanges: ranges };
		const regexTree = regexParser.parse(text, jsonTreeOld, options);
		regexTrees[id] = regexTree;

		const regexNode = regexTree.rootNode;
		regexNodes[regexNode.id] = node;
		// }
		// else {
		// 	const regexTree = trees[uriString].regexTrees[id];
		// 	vscode.window.showInformationMessage(JSON.stringify(regexTree));
		// 	regexTrees[id] = regexTree;

		// 	const regexNode = regexTree.rootNode;
		// 	regexNodes[regexNode.id] = node;
		// }
	}
	const oldRegexTrees = trees[uriString].regexTrees;

	trees[uriString] = {
		jsonTree: jsonTree,
		regexTrees: regexTrees,
		regexNodes: regexNodes,
	};

	jsonTreeOld.delete();
	for (const regexTree in oldRegexTrees) {
		oldRegexTrees[regexTree].delete();
	}
	// vscode.window.showInformationMessage(JSON.stringify(trees[uriString]));
	// vscode.window.showInformationMessage(`reparseTree ${edits.contentChanges.length} ${performance.now() - start}ms`);
}

import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { DocumentSelector } from "./extension";

export type trees = {
	jsonTree: Parser.Tree;
	regexTrees: {
		[id: number]: Parser.Tree;
	};
	regexNodes: {
		[id: number]: Parser.SyntaxNode;
	};
}

const trees: {
	[uri: string]: trees
} = {};

export function getTrees(uri: vscode.Uri): trees;
export function getTrees(document: vscode.TextDocument): trees;
export function getTrees(source: vscode.TextDocument | vscode.Uri): trees {
	const uriString = 'uri' in source ? source.uri.toString() : source.toString();
	const docTrees = trees[uriString];
	if (!docTrees) {
		vscode.window.showInformationMessage(JSON.stringify(source));
		vscode.window.showInformationMessage(JSON.stringify(trees));
	}
	return docTrees;
}

/**
 * @deprecated use {@link getTrees()} instead
 */
export function getTree(document: vscode.TextDocument): Parser.Tree {
	const uriString = document.uri.toString();
	const tree = trees[uriString]?.jsonTree;
	return tree;
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
	const query = `
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

export function queryNode(node: Parser.SyntaxNode, queryString: string): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point): Parser.QueryCapture | null;
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point, mustIntersectPoint: false): Parser.QueryCapture | undefined;
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint: Parser.Point, endPoint: Parser.Point): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint?: Parser.Point, endPoint?: Parser.Point | false): Parser.QueryCapture[] | Parser.QueryCapture | null | undefined {
	const language = node.tree.getLanguage();
	// const start = performance.now();
	const query = language.query(queryString);
	query.disableCapture('_ignore_');
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

	return new vscode.Range(
		startPosition.row,
		startPosition.column,
		endPosition.row,
		endPosition.column
	);
}

export function toPoint(position: vscode.Position): Parser.Point {
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
	return parent.parent;

	// const sibling = parent.nextSibling;
	// return sibling ? sibling.equals(node) ? parent.parent : parent : parent;
}

export let jsonParserLanguage: Parser.Language;
export let regexParserLanguage: Parser.Language;

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

	const jsonParser = new Parser();
	const jsonWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-jsontm.wasm');
	const jsonWasm = jsonWasmUri.scheme === 'file' ? jsonWasmUri.fsPath : jsonWasmUri.toString(true);
	const jsonLanguage = await Parser.Language.load(jsonWasm);
	jsonParser.setLanguage(jsonLanguage);
	jsonParserLanguage = jsonLanguage;

	const regexParser = new Parser();
	const regexWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-regextm.wasm');
	const regexWasm = regexWasmUri.scheme === 'file' ? regexWasmUri.fsPath : regexWasmUri.toString(true);
	const regexLanguage = await Parser.Language.load(regexWasm);
	regexParser.setLanguage(regexLanguage);
	regexParserLanguage = regexLanguage;

	vscode.workspace.textDocuments.forEach(document => {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		parseTextDocument(document, jsonParser, regexParser);
	});

	// vscode.window.visibleTextEditors.forEach(editor => {
	// 	// vscode.window.showInformationMessage(JSON.stringify("visible"));
	// 	parseTextDocument(editor.document, jsonParser, regexParser);
	// });

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(document => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			parseTextDocument(document, jsonParser, regexParser);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(edits => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			reparseTextDocument(edits, jsonParser, regexParser);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(
			document => {
				// vscode.window.showInformationMessage(JSON.stringify("close"));
				const uriString = document.uri.toString();
				if (trees[uriString]) {
					trees[uriString].jsonTree.delete();
					for (const tree in trees[uriString].regexTrees) {
						trees[uriString].regexTrees[tree].delete();
					}
					delete trees[uriString];
				}
			}
		)
	);
}


function parseTextDocument(document: vscode.TextDocument, jsonParser: Parser, regexParser: Parser) {
	// vscode.window.showInformationMessage(JSON.stringify("ParseTextDocument"));
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
			startPosition: node.startPosition,
			endPosition: node.endPosition,
			startIndex: node.startIndex,
			endIndex: node.endIndex
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
	// vscode.window.showInformationMessage(performance.now() - start + "ms");
}

function reparseTextDocument(edits: vscode.TextDocumentChangeEvent, jsonParser: Parser, regexParser: Parser) {
	// vscode.window.showInformationMessage(JSON.stringify("ReparseTextDocument"));
	// const start = performance.now();
	const document = edits.document;
	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}

	const uriString = document.uri.toString();
	if (!(uriString in trees)) {
		vscode.window.showInformationMessage(JSON.stringify(document));
		parseTextDocument(document, jsonParser, regexParser);
		return;
	}

	const jsonTreeOld = trees[uriString].jsonTree;
	const text = document.getText();

	for (const edit of edits.contentChanges) {
		const startIndex = edit.rangeOffset;
		const oldEndIndex = edit.rangeOffset + edit.rangeLength;
		const newEndIndex = edit.rangeOffset + edit.text.length;
		const startPos = document.positionAt(startIndex);
		const oldEndPos = document.positionAt(oldEndIndex);
		const newEndPos = document.positionAt(newEndIndex);
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
		jsonTreeOld.edit(delta);
	}

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
	// vscode.window.showInformationMessage(performance.now() - start + "ms");
}
import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { DocumentSelector } from './extension';

type trees = {
	jsonTree: Parser.Tree;
	regexTrees: {
		[id: number]: Parser.Tree;
	};
}

const trees: {
	[uri: string]: trees
} = {};

export function getTrees(document: vscode.TextDocument): trees {
	const uriString = document.uri.toString();
	return trees[uriString];
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

export function queryNode(node: Parser.SyntaxNode, queryString: string): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point): Parser.QueryCapture;
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point, mustIntersect: false): Parser.QueryCapture;
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint: Parser.Point, endPoint: Parser.Point): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint?: Parser.Point, endPoint?: Parser.Point | false): Parser.QueryCapture[] | Parser.QueryCapture | null {
	const language = node.tree.getLanguage();
	const query = language.query(queryString);
	const queryCaptures = query.captures(node, startPoint, endPoint || startPoint);
	if (startPoint && !endPoint) {
		if (endPoint === false) {
			return queryCaptures.pop(); // the last/inner most node
		}
		const position = new vscode.Position(
			startPoint.row,
			startPoint.column
		);
		while (queryCaptures.length) { // TreeSitter doesn't actually check if the captured node intersects the startPoint :/
			const queryCapture = queryCaptures.pop(); // the last/inner most node
			if (toRange(queryCapture.node).contains(position)) {
				return queryCapture;
			}
		}
		return null;
	}
	return queryCaptures;
}

/**
 * @deprecated use {@link queryNode()} instead
 */
export function queryForPosition(tree: Parser.Tree, queryString: string, point?: Parser.Point): Parser.QueryCapture | undefined {
	const language = tree.getLanguage();
	const query = language.query(queryString);
	const queryCaptures = query.captures(tree.rootNode, point, point);
	const queryCapture = queryCaptures.pop(); // the last/inner most node
	return queryCapture;
}

export function toRange(node: Parser.SyntaxNode): vscode.Range {
	if (!node) {
		return;
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

export async function initTreeSitter(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TreeSitterInit"));
	await Parser.init(); // Everything MUST wait until TreeSitter initializes

	const jsonParser = new Parser();
	const jsonWasm = context.asAbsolutePath('out/tree-sitter-jsontm.wasm');
	const jsonLanguage = await Parser.Language.load(jsonWasm);
	jsonParser.setLanguage(jsonLanguage);

	const regexParser = new Parser();
	const regexWasm = context.asAbsolutePath('out/tree-sitter-regextm.wasm');
	const regexLanguage = await Parser.Language.load(regexWasm);
	regexParser.setLanguage(regexLanguage);


	vscode.window.visibleTextEditors.forEach(editor => {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		parseTextDocument(editor.document, jsonParser, regexParser);
	});

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
				delete trees[uriString];
			}
		)
	);
}


function parseTextDocument(document: vscode.TextDocument, jsonParser: Parser, regexParser: Parser) {
	// vscode.window.showInformationMessage(JSON.stringify("ParseTextDocument"));

	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}
	// vscode.window.showInformationMessage(JSON.stringify(document.uri));

	const uriString = document.uri.toString();
	if (uriString in trees) {
		vscode.window.showInformationMessage(JSON.stringify("JSON TextMate: Why are we here?"));
		return;
	}

	const text = document.getText();
	const jsonTree = jsonParser.parse(text);

	// const languageJSON = jsonParser.getLanguage();
	// const query = languageJSON.query(`(regex) @regex`);
	// const queryCaptures = query.captures(jsonTree.rootNode);
	
	const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
	const regexTrees: trees["regexTrees"] = {};
	for (const queryCapture of queryCaptures) {
		const node = queryCapture.node;
		const range: Parser.Range = {
			startPosition: node.startPosition,
			endPosition: node.endPosition,
			startIndex: node.startIndex,
			endIndex: node.endIndex
		};
		const ranges: Parser.Range[] = [];
		ranges.push(range);
		const options: Parser.Options = { includedRanges: ranges };
		const regexTree = regexParser.parse(text, null, options);
		regexTrees[node.id] = regexTree;
	}
	trees[uriString] = {
		jsonTree: jsonTree,
		regexTrees: regexTrees
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
}

function reparseTextDocument(edits: vscode.TextDocumentChangeEvent, JSONParser: Parser, regexParser: Parser) {
	const document = edits.document;
	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}

	const uriString = document.uri.toString();
	if (!(uriString in trees)) {
		return;
	}

	const jsonTreeOld = trees[uriString].jsonTree;
	const text = document.getText();
	// const trees = getTrees(document);
	// if (!trees) {
	// 	return;
	// }
	// const oldTree = trees.jsonTree;

	for (const edit of edits.contentChanges) {
		const startIndex = edit.rangeOffset;
		const oldEndIndex = edit.rangeOffset + edit.rangeLength;
		const newEndIndex = edit.rangeOffset + edit.text.length;
		const startPos = document.positionAt(startIndex);
		const oldEndPos = document.positionAt(oldEndIndex);
		const newEndPos = document.positionAt(newEndIndex);
		// const startPosition: Parser.Point = { row: startPos.line, column: startPos.character };
		// const oldEndPosition: Parser.Point = { row: oldEndPos.line, column: oldEndPos.character };
		// const newEndPosition: Parser.Point = { row: newEndPos.line, column: newEndPos.character };
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

	const jsonTree = JSONParser.parse(text, jsonTreeOld);
	// trees[uriString].jsonTree = jsonTree;

	// Todo: only reparse modified regex nodes. tree.getChangedRanges();
	const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
	const regexTrees: trees["regexTrees"] = {};
	for (const queryCapture of queryCaptures) {
		const node = queryCapture.node;
		const range: Parser.Range = {
			startPosition: node.startPosition,
			endPosition: node.endPosition,
			startIndex: node.startIndex,
			endIndex: node.endIndex
		};
		const ranges: Parser.Range[] = [];
		ranges.push(range);
		const options: Parser.Options = { includedRanges: ranges };
		const regexTree = regexParser.parse(text, jsonTreeOld, options);
		regexTrees[node.id] = regexTree;
	}

	// vscode.window.showInformationMessage(JSON.stringify(tree));

	// const changedRanges = tree.getChangedRanges(oldTree);


	// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.firstNamedChild));
	// tree.rootNode.firstNamedChild = null;
	// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.firstNamedChild));

	// const regexCaptures = trees[uriString].regexCaptures;
	// for (const edit of edits.contentChanges) {
	// 	const editStartIndex = edit.rangeOffset;
	// 	const editEndIndex = edit.rangeOffset + edit.rangeLength;
	// 	for (let index = 0; index < trees[uriString].regexCaptures.length; index++) {
	// 		const regexCapture = trees[uriString].regexCaptures[index];
	// 		if (regexCapture.node.startIndex <= editStartIndex && // Todo editIndex range can be both outside and inside the regexNode
	// 			regexCapture.node.endIndex >= editEndIndex) {
	// 			const regexTree = trees[uriString].regexTrees[index];
	// 			const text = tree.rootNode.descendantForIndex(editStartIndex).text;
	// 			const newRegexTree = regexParser.parse(text, regexTree);
	// 			trees[uriString].regexTrees[index] = newRegexTree;
	// 		}

	// 	}
	// 	// for (let regexTree of trees[uriString].regexTrees) {
	// 	// 	if (regexTree.rootNode.startIndex <= editStartIndex && // Todo editIndex range can be both outside and inside the regexNode
	// 	// 		regexTree.rootNode.endIndex >= editEndIndex) {
	// 	// 		const text = tree.rootNode.descendantForIndex(editStartIndex).text;
	// 	// 		const newRegexTree = regexParser.parse(text, regexTree);
	// 	// 		const index = trees[uriString].regexTrees.indexOf(regexTree);
	// 	// 		trees[uriString].regexTrees[index] = newRegexTree;
	// 	// 	}
	// 	// }

	// }


	trees[uriString] = {
		jsonTree: jsonTree,
		regexTrees: regexTrees
	};
	// vscode.window.showInformationMessage(JSON.stringify(trees[uriString].regexTrees));
}
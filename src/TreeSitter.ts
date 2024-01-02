import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { DocumentSelector } from './extension';

const trees: {
	[uri: string]: {
		jsonTree: Parser.Tree,
		regexTrees?: Parser.Tree[],
		regexCaptures?: Parser.QueryCapture[],
	}
} = {};

export function getTree(document: vscode.TextDocument): Parser.Tree {
	const uriString = document.uri.toString();
	const tree = trees[uriString]?.jsonTree;
	return tree;
}

export function queryNode(node: Parser.SyntaxNode, queryString: string): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, point: Parser.Point): Parser.QueryCapture | null;
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint: Parser.Point, endPoint: Parser.Point): Parser.QueryCapture[];
export function queryNode(node: Parser.SyntaxNode, queryString: string, startPoint?: Parser.Point, endPoint?: Parser.Point): Parser.QueryCapture[] | Parser.QueryCapture | null {
	const language = node.tree.getLanguage();
	const query = language.query(queryString);
	const queryCaptures = query.captures(node, startPoint, endPoint ?? startPoint);
	if (startPoint && !endPoint) {
		const queryCapture = queryCaptures.pop(); // the last/inner most node
		return queryCapture ?? null;
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
	const regexWasm = context.asAbsolutePath('out/tree-sitter-your_language.wasm');
	const regexLanguage = await Parser.Language.load(regexWasm);
	regexParser.setLanguage(regexLanguage);


	// const regexTree = regexParser.parse('code');

	// const activeDocument = vscode.window.activeTextEditor?.document;
	// if (activeDocument) {
	// 	if (vscode.languages.match(DocumentSelector, activeDocument)) {
	// 		const uriString = activeDocument.uri.toString();
	// 		const tree = parserJSON.parse(activeDocument.getText());
	// 		trees[uriString] = tree;
	// 	}
	// }

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
		// return;
	}

	const tree = jsonParser.parse(document.getText());

	trees[uriString] = { jsonTree: tree };

	const languageJSON = tree.getLanguage();
	const query = languageJSON.query(
		`(` +
		`	(regex) @regex` +
		`)`
	);
	const queryCaptures = query.captures(tree.rootNode);
	trees[uriString].regexCaptures = queryCaptures;

	const regexTrees = [];
	for (const queryCapture of queryCaptures) {
		const text = queryCapture.node.text;
		const regexTree = regexParser.parse(text);
		regexTrees.push(regexTree);
	}
	trees[uriString].regexTrees = regexTrees;

	// trees[uriString] = { tree: tree, regexCaptures: queryCaptures };
	// vscode.window.showInformationMessage(JSON.stringify(trees[uriString].regexTrees));
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

	const oldTree = trees[uriString].jsonTree;

	for (const edit of edits.contentChanges) {
		const startIndex = edit.rangeOffset;
		const oldEndIndex = edit.rangeOffset + edit.rangeLength;
		const newEndIndex = edit.rangeOffset + edit.text.length;
		const startPos = edits.document.positionAt(startIndex);
		const oldEndPos = edits.document.positionAt(oldEndIndex);
		const newEndPos = edits.document.positionAt(newEndIndex);
		const startPosition: Parser.Point = { row: startPos.line, column: startPos.character };
		const oldEndPosition: Parser.Point = { row: oldEndPos.line, column: oldEndPos.character };
		const newEndPosition: Parser.Point = { row: newEndPos.line, column: newEndPos.character };
		// const startPosition = asPoint(startPos);
		// const oldEndPosition = asPoint(oldEndPos);
		// const newEndPosition = asPoint(newEndPos);
		const delta: Parser.Edit = {
			startIndex,
			oldEndIndex,
			newEndIndex,
			startPosition,
			oldEndPosition,
			newEndPosition,
		};
		oldTree.edit(delta);
	}

	const tree = JSONParser.parse(document.getText(), oldTree);
	trees[uriString].jsonTree = tree;

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
	// vscode.window.showInformationMessage(JSON.stringify(trees[uriString].regexTrees));
}
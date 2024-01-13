"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTreeSitter = exports.toPoint = exports.toRange = exports.queryForPosition = exports.queryNode = exports.getRegexNode = exports.getTree = exports.getTrees = void 0;
const vscode = require("vscode");
const Parser = require("web-tree-sitter");
const extension_1 = require("./extension");
const trees = {};
function getTrees(document) {
    const uriString = document.uri.toString();
    return trees[uriString];
}
exports.getTrees = getTrees;
/**
 * @deprecated use {@link getTrees()} instead
 */
function getTree(document) {
    const uriString = document.uri.toString();
    const tree = trees[uriString]?.jsonTree;
    return tree;
}
exports.getTree = getTree;
function getRegexNode(document, node) {
    const uriString = document.uri.toString();
    const regexTrees = trees[uriString]?.regexTrees;
    const regexTree = regexTrees[node.id];
    return regexTree.rootNode;
}
exports.getRegexNode = getRegexNode;
function queryNode(node, queryString, startPoint, endPoint) {
    const language = node.tree.getLanguage();
    const query = language.query(queryString);
    const queryCaptures = query.captures(node, startPoint, endPoint ?? startPoint); // would || be better?
    if (startPoint && !endPoint) {
        const position = new vscode.Position(startPoint.row, startPoint.column);
        while (queryCaptures.length) { // TreeSitter doesn't check if the captured node actually touches the startPoint :/
            const queryCapture = queryCaptures.pop(); // the last/inner most node
            if (toRange(queryCapture.node).contains(position)) {
                return queryCapture;
            }
        }
        return null;
    }
    return queryCaptures;
}
exports.queryNode = queryNode;
/**
 * @deprecated use {@link queryNode()} instead
 */
function queryForPosition(tree, queryString, point) {
    const language = tree.getLanguage();
    const query = language.query(queryString);
    const queryCaptures = query.captures(tree.rootNode, point, point);
    const queryCapture = queryCaptures.pop(); // the last/inner most node
    return queryCapture;
}
exports.queryForPosition = queryForPosition;
function toRange(node) {
    if (!node) {
        return;
    }
    const startPosition = node.startPosition;
    const endPosition = node.endPosition;
    return new vscode.Range(startPosition.row, startPosition.column, endPosition.row, endPosition.column);
}
exports.toRange = toRange;
function toPoint(position) {
    const row = position.line;
    const column = position.character;
    const point = { row: row, column: column };
    return point;
}
exports.toPoint = toPoint;
async function initTreeSitter(context) {
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
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(document => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        parseTextDocument(document, jsonParser, regexParser);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(edits => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        reparseTextDocument(edits, jsonParser, regexParser);
    }));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(document => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        const uriString = document.uri.toString();
        delete trees[uriString];
    }));
}
exports.initTreeSitter = initTreeSitter;
function parseTextDocument(document, jsonParser, regexParser) {
    // vscode.window.showInformationMessage(JSON.stringify("ParseTextDocument"));
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
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
    const regexTrees = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [];
        ranges.push(range);
        const options = { includedRanges: ranges };
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
function reparseTextDocument(edits, JSONParser, regexParser) {
    const document = edits.document;
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
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
        const startPos = edits.document.positionAt(startIndex);
        const oldEndPos = edits.document.positionAt(oldEndIndex);
        const newEndPos = edits.document.positionAt(newEndIndex);
        // const startPosition: Parser.Point = { row: startPos.line, column: startPos.character };
        // const oldEndPosition: Parser.Point = { row: oldEndPos.line, column: oldEndPos.character };
        // const newEndPosition: Parser.Point = { row: newEndPos.line, column: newEndPos.character };
        const startPosition = toPoint(startPos);
        const oldEndPosition = toPoint(oldEndPos);
        const newEndPosition = toPoint(newEndPos);
        const delta = {
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
    const regexTrees = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [];
        ranges.push(range);
        const options = { includedRanges: ranges };
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

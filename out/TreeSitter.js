"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTreeSitter = exports.regexParserLanguage = exports.jsonParserLanguage = exports.trueParent = exports.toPoint = exports.toRange = exports.queryForPosition = exports.queryNode = exports.getLastNode = exports.getComment = exports.getRegexNode = exports.getTree = exports.getTrees = void 0;
const vscode = require("vscode");
const Parser = require("web-tree-sitter");
const extension_1 = require("./extension");
const trees = {};
function getTrees(source) {
    const uriString = 'uri' in source ? source.uri.toString() : source.toString();
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
function getRegexNode(source, node) {
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
exports.getRegexNode = getRegexNode;
/**
 * Returns the first non-empty comment in the parent node
 */
function getComment(node) {
    const parent = trueParent(node);
    const query = `
		(comment (value) @comment (.not-eq? @comment ""))
		(comment_slash (value) @comment (.not-eq? @comment ""))
	`;
    const capture = queryNode(parent, query)[0];
    return capture?.node?.text?.replace(/\\(.)?/g, '$1');
}
exports.getComment = getComment;
function getLastNode(rootNode, type) {
    const nodes = rootNode.namedChildren;
    for (let index = nodes.length - 1; index >= 0; index--) { // bottom up
        const childNode = nodes[index];
        if (childNode.type == type) {
            return childNode;
        }
    }
}
exports.getLastNode = getLastNode;
function queryNode(node, queryString, startPoint, endPoint) {
    const language = node.tree.getLanguage();
    // const start = performance.now();
    const query = language.query(queryString);
    // vscode.window.showInformationMessage(performance.now() - start + "ms");
    const queryCaptures = query.captures(node, startPoint, endPoint || startPoint);
    if (queryCaptures.length > 10000) {
        vscode.window.showWarningMessage("Unoptimized Query: " + queryCaptures.length + " results returned:\n" + queryString);
        // vscode.window.showInformationMessage(JSON.stringify(queryCaptures));
    }
    if (startPoint && !endPoint) {
        if (endPoint === false) {
            return queryCaptures.pop(); // the last/inner most node
        }
        const position = new vscode.Position(startPoint.row, startPoint.column);
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
        return null;
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
/**
 * TreeSitter bug
 * Using `.parent` on a 0width node returns the `previousSilbing` rather than the `parent`
 * https://github.com/tree-sitter/tree-sitter/issues/1872
 */
function trueParent(node) {
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
exports.trueParent = trueParent;
async function initTreeSitter(context) {
    // vscode.window.showInformationMessage(JSON.stringify("TreeSitterInit"));
    // We only need to provide these options when running in the web worker
    const moduleOptions = typeof navigator === 'undefined'
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
    exports.jsonParserLanguage = jsonLanguage;
    const regexParser = new Parser();
    const regexWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-regextm.wasm');
    const regexWasm = regexWasmUri.scheme === 'file' ? regexWasmUri.fsPath : regexWasmUri.toString(true);
    const regexLanguage = await Parser.Language.load(regexWasm);
    regexParser.setLanguage(regexLanguage);
    exports.regexParserLanguage = regexLanguage;
    // vscode.window.showInformationMessage(JSON.stringify("Lang"));
    // const jsonParser = new Parser();
    // const jsonWasm = context.asAbsolutePath('out/tree-sitter-jsontm.wasm');
    // const jsonLanguage = await Parser.Language.load(jsonWasm);
    // jsonParser.setLanguage(jsonLanguage);
    // const regexParser = new Parser();
    // const regexWasm = context.asAbsolutePath('out/tree-sitter-regextm.wasm');
    // const regexLanguage = await Parser.Language.load(regexWasm);
    // regexParser.setLanguage(regexLanguage);
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
        console.log("JSON TextMate: Why are we here?");
        vscode.window.showInformationMessage("JSON TextMate: Why are we here?");
        return;
    }
    const text = document.getText();
    const jsonTree = jsonParser.parse(text);
    // const languageJSON = jsonParser.getLanguage();
    // const query = languageJSON.query(`(regex) @regex`);
    // const queryCaptures = query.captures(jsonTree.rootNode);
    const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
    const regexTrees = {};
    const regexNodes = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [range];
        const options = { includedRanges: ranges };
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
}
function reparseTextDocument(edits, JSONParser, regexParser) {
    // vscode.window.showInformationMessage(JSON.stringify("ReparseTextDocument"));
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
        const startPos = document.positionAt(startIndex);
        const oldEndPos = document.positionAt(oldEndIndex);
        const newEndPos = document.positionAt(newEndIndex);
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
    const regexNodes = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [range];
        const options = { includedRanges: ranges };
        const regexTree = regexParser.parse(text, jsonTreeOld, options);
        regexTrees[node.id] = regexTree;
        const regexNode = regexTree.rootNode;
        regexNodes[regexNode.id] = node;
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
        regexTrees: regexTrees,
        regexNodes: regexNodes,
    };
    // vscode.window.showInformationMessage(JSON.stringify(trees[uriString]));
}

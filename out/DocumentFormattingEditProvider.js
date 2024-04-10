"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRangeFormattingEditProvider = exports.DocumentFormattingEditProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.DocumentFormattingEditProvider = {
    provideDocumentFormattingEdits(document, options, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Format"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const textEdits = [];
        const tabType = options.insertSpaces ? ' ' : '\t';
        const tabSize = options.insertSpaces ? options.tabSize : 1;
        parseAllChildren(jsonTree.rootNode, textEdits, 0, tabSize, tabType);
        // vscode.window.showInformationMessage(JSON.stringify(textEdits));
        return textEdits;
    },
};
exports.DocumentRangeFormattingEditProvider = {
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        // vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const textEdits = [];
        const tabType = options.insertSpaces ? ' ' : '\t';
        const tabSize = options.insertSpaces ? options.tabSize : 1;
        const startPoint = (0, TreeSitter_1.toPoint)(range.start);
        const endPoint = (0, TreeSitter_1.toPoint)(range.end);
        const queryString = `(_) @node`;
        const nestedCaptures = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, queryString, startPoint, endPoint);
        let level = -1;
        let node;
        for (const nestedCapture of nestedCaptures) {
            const nestedNode = nestedCapture.node;
            if (!(0, TreeSitter_1.toRange)(nestedNode).contains(range)) {
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
};
function parseAllChildren(parentNode, textEdits, indent, tabSize, tabType) {
    let range;
    let whiteSpace;
    let textEdit;
    let expand = false;
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
    for (const node of parentNode.children) {
        switch (node.type) {
            case '{':
            case '[':
                indent += tabSize;
                if (node.nextSibling == null)
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case '}':
            case ']':
                indent -= tabSize;
                if (node.previousSibling == null)
                    break;
                if (node.previousSibling.type == '{')
                    break;
                if (node.previousSibling.type == '[')
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case ',':
                if (node.nextSibling == null)
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                if (node.previousSibling == null)
                    break;
                whiteSpace = '';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case ':':
                if (node.nextSibling == null)
                    break;
                whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                if (node.previousSibling == null)
                    break;
                whiteSpace = '';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
        }
    }
    return expand;
}

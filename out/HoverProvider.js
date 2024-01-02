"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.HoverProvider = {
    provideHover(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Hover"))
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        const node = tree.rootNode.descendantForPosition(point);
        // const node = tree.rootNode.namedDescendantForPosition(point);
        if (node == null) {
            return;
        }
        const markdownString = new vscode.MarkdownString();
        markdownString.appendCodeblock(node.text, 'json-tmLanguage');
        // const fieldName = node.walk().currentFieldName();
        // if (fieldName)
        // 	markdownString.appendText(fieldName + ':');
        if (node.parent)
            markdownString.appendText(node.parent.type + ' => ');
        markdownString.appendText(node.type);
        const range = (0, TreeSitter_1.toRange)(node);
        const hover = new vscode.Hover(markdownString, range);
        // vscode.window.showInformationMessage(JSON.stringify(hover))
        return hover;
    }
};

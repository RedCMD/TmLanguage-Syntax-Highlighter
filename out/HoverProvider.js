"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.HoverProvider = {
    provideHover(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Hover"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const node = jsonTree.rootNode.descendantForPosition(point);
        // const node = jsonTree.rootNode.namedDescendantForPosition(point);
        if (node == null) {
            return;
        }
        if (node.type == 'regex') {
            const regexTrees = (0, TreeSitter_1.getTrees)(document).regexTrees;
            const regexTree = regexTrees[node.id];
            const regexNode = regexTree.rootNode.descendantForPosition(point);
            const parentNode = regexNode.parent;
            const markdownString = new vscode.MarkdownString();
            markdownString.appendText(parentNode.type + ' => ' + regexNode.type);
            markdownString.appendCodeblock(parentNode.text, 'regex-tmLanguage');
            markdownString.appendCodeblock(parentNode.toString(), 'scm');
            const range = (0, TreeSitter_1.toRange)(parentNode);
            const hover = new vscode.Hover(markdownString, range);
            // vscode.window.showInformationMessage(JSON.stringify(hover));
            return hover;
        }
        else {
            const markdownString = new vscode.MarkdownString();
            markdownString.appendCodeblock(node.text, 'json-textmate');
            // const fieldName = node.walk().currentFieldName();
            // if (fieldName)
            // 	markdownString.appendText(fieldName + ':');
            if (node.parent)
                markdownString.appendText(node.parent.type + ' => ');
            markdownString.appendText(node.type);
            markdownString.appendCodeblock(node.toString(), 'scm');
            const range = (0, TreeSitter_1.toRange)(node);
            const hover = new vscode.Hover(markdownString, range);
            // vscode.window.showInformationMessage(JSON.stringify(hover));
            return hover;
        }
    }
};

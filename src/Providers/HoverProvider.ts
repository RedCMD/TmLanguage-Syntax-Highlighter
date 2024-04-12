import * as vscode from 'vscode';
import { getTrees, toPoint, toRange } from "../TreeSitter";


export const HoverProvider: vscode.HoverProvider = {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover {
		// vscode.window.showInformationMessage(JSON.stringify("Hover"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const point = toPoint(position);
		const node = jsonTree.rootNode.descendantForPosition(point);
		// const node = jsonTree.rootNode.namedDescendantForPosition(point);
		if (node == null) {
			return;
		}

		if (node.type == 'regex') {
			const regexTrees = getTrees(document).regexTrees;
			const regexTree = regexTrees[node.id];
			const regexNode = regexTree.rootNode.descendantForPosition(point);
			const parentNode = regexNode.parent;
			const markdownString = new vscode.MarkdownString();
			markdownString.appendText(parentNode.type + ' => ' + regexNode.type);
			markdownString.appendCodeblock(parentNode.text, 'regex-tmLanguage');
			markdownString.appendCodeblock(parentNode.toString(), 'scm');

			const range = toRange(parentNode);
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

			const range = toRange(node);
			const hover = new vscode.Hover(markdownString, range);
			// vscode.window.showInformationMessage(JSON.stringify(hover));
			return hover;
		}
	}
}
import * as vscode from 'vscode';
import { getTree, toPoint, toRange } from "./TreeSitter";


export const HoverProvider = {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover {
		// vscode.window.showInformationMessage(JSON.stringify("Hover"))
		const tree = getTree(document);
		const point = toPoint(position);
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

		const range = toRange(node);
		const hover = new vscode.Hover(markdownString, range);
		// vscode.window.showInformationMessage(JSON.stringify(hover))
		return hover;
	}
}
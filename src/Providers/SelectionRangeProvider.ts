import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange } from "../TreeSitter";

export const SelectionRangeProvider: vscode.SelectionRangeProvider = {
	provideSelectionRanges(document: vscode.TextDocument, positions: vscode.Position[], token: vscode.CancellationToken): vscode.SelectionRange[] {
		// vscode.window.showInformationMessage(JSON.stringify("SelectionRange"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const rootNode = jsonTree.rootNode;

		const cursorQuery = `(_) @node`;
		const selectionRanges: vscode.SelectionRange[] = [];

		for (const position of positions) {
			let selectionRange: vscode.SelectionRange;

			const point = toPoint(position);
			const cursorCaptures = queryNode(rootNode, cursorQuery, point, point);
			for (const cursorCapture of cursorCaptures) {
				const node = cursorCapture.node;
				const range = toRange(node);
				selectionRange = new vscode.SelectionRange(range, selectionRange);
			}
			selectionRanges.push(selectionRange);
		}

		/**
		 * The setting `editor.smartSelect.selectSubwords` can give unexpected results
		 * like breaking up scope names `camelCase.snake_case.dash-case` at every `human` word boundary
		 * but not at periods `.`
		 * https://github.com/microsoft/vscode/blob/main/src/vs/editor/contrib/smartSelect/browser/wordSelections.ts#L48
		 */

		// vscode.window.showInformationMessage(JSON.stringify(selectionRanges));
		return selectionRanges;
	},
};
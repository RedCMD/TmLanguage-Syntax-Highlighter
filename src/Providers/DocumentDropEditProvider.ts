import * as vscode from 'vscode';
import { DocumentSelector } from "../extension";
import { getTrees, queryNode, toPoint, toPosition } from "../TreeSitter";


export const DocumentDropEditProvider: vscode.DocumentDropEditProvider = {
	async provideDocumentDropEdits(document: vscode.TextDocument, position: vscode.Position, dataTransfer: vscode.DataTransfer, token: vscode.CancellationToken): Promise<vscode.DocumentDropEdit | undefined> {
		// vscode.window.showInformationMessage(JSON.stringify("DocumentDrop"));

		// dataTransfer.forEach((item: vscode.DataTransferItem, mimeType: string, dataTransfer: vscode.DataTransfer) => {
		// 	vscode.window.showInformationMessage(
		// 		JSON.stringify({ item: item, mimeType: mimeType, dataTransfer: dataTransfer })
		// 	);
		// });

		const scopeNames: string[] = [];

		const value: string = dataTransfer.get('text/plain')?.value;
		const paths = value.split('\r\n');
		for (const path of paths) {
			if (path.toLowerCase().endsWith('.tmlanguage.json')) {
				const uri = vscode.Uri.file(path);
				const tmDocument = await vscode.workspace.openTextDocument(uri);
				if (vscode.languages.match(DocumentSelector, tmDocument)) {
					const trees = getTrees(tmDocument);
					const rootNode = trees.jsonTree.rootNode;

					const scopeNameQuery = `(json (scopeName (value) @scopeName))`;
					const scopeNameCapture = queryNode(rootNode, scopeNameQuery).pop();
					if (scopeNameCapture) {
						const scopeName = scopeNameCapture.node.text;
						scopeNames.push(scopeName);
					}
				}
			}
		}

		if (scopeNames.length == 0) {
			return;
		}

		const trees = getTrees(document);
		const rootNode = trees.jsonTree.rootNode;

		const point = toPoint(position);
		const cursorQuery = `
			(key) @key
			(value) @value
			(pattern) @pattern
			(patterns) @patterns
			(repo) @repo
			(repository) @repository
		`;
		const cursorCapture = queryNode(rootNode, cursorQuery, point);
		const name = cursorCapture?.name;

		const includes: string[] = [];
		for (const scopeName of scopeNames) {
			switch (name) {
				case 'key':
				case 'value':
					includes.push(scopeName);
					break;
				case 'patterns':
					includes.push(`{ "include": "${scopeName}" }`);
					break;
				case 'pattern':
				default:
					includes.push(`"include": "${scopeName}"`);
					break;
			}
		}

		// TODO: should detect presence of comma instead
		const node = cursorCapture?.node;
		const firstNode = node?.namedChild(1); // ignore very first `key` node
		const lastNode = node?.lastNamedChild;
		const prefix = (lastNode && position.isAfterOrEqual(toPosition(lastNode.endPosition))) ? ',\n' : (firstNode && position.isAfter(toPosition(firstNode.endPosition))) ? '\n' : '';
		const postfix = (lastNode && position.isBeforeOrEqual(toPosition(lastNode.startPosition))) ? ',' : '';

		const dropEdit = prefix + includes.join(',\n') + postfix;
		return new vscode.DocumentDropEdit(dropEdit);
	},
};

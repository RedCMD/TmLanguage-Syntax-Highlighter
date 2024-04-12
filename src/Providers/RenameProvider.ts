import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange } from "../TreeSitter";

const cursorQuery = `
	(include (value (scopeName) @scopeName))
	(include (value (ruleName) @ruleName))
	;(json (scopeName (value) @root_scopeName))
	(repo (key) @repo)
`;

export const RenameProvider: vscode.RenameProvider = {
	/* async */ provideRenameEdits(document: vscode.TextDocument, position: vscode.Position, newName: string, token: vscode.CancellationToken): /* Promise< */vscode.WorkspaceEdit/* > */ {
		// vscode.window.showInformationMessage(JSON.stringify("RenameEdit"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const point = toPoint(position);

		const cursorCapture = queryNode(jsonTree.rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return;
		}

		const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		const cursorRange = toRange(cursorNode);

		const rootScopeName = queryNode(jsonTree.rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;

		const edits: vscode.TextEdit[] = [];
		const workspaceEdits = new vscode.WorkspaceEdit();
		
		const uri = document.uri;

		let query = ``;
		switch (cursorName) {
			case 'ruleName':
				query += `(repo (key) @repo (#eq? @repo "${cursorText}"))`;
				query += `(include (value (ruleName) @ruleName) @include (#eq? @include "#${cursorText}"))`;
				if (rootScopeName) {
					query += `(include (value (ruleName) @ruleName) @include (#eq? @include "${rootScopeName}#${cursorText}"))`;
				}
				break;
			// case 'root_scopeName':
			//	 const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
			//	 await vscode.workspace.openTextDocument(uriPackage);
			//	 for (const textDocument of vscode.workspace.textDocuments) {
			//	 	if (!vscode.languages.match({ pattern: "**/package.json", scheme: "file" }, textDocument)) {
			//	 		continue;
			//	 	}
			//	 	try {
			//	 		const packageParsed = await JSON.parse(textDocument.getText());
			//	 		const grammars = packageParsed.contributes?.grammars;
			//	 		if (grammars) {
			//	 			for (const grammar of grammars) {
			//	 				if (grammar.scopeName == cursorText) {
			//	 					const edit = new vscode.TextEdit(range, newName); // Cant get range
			//	 					workspaceEdits.set(textDocument.uri, [edit]);
			//	 				}
			//	 			}
			//	 		}
			//	 	} catch (error) {

			//	 	}
			//	 }
			//	 break;
			case 'scopeName':
				query += `(include (value (scopeName) @scopeName (#eq? @scopeName "${cursorText}")))`;
				query += `(json (scopeName (value) @scopeName (#eq? @scopeName "${cursorText}")))`;
				break;
			case 'repo':
				query += `(include (value (ruleName) @ruleName) @include (#eq? @include "#${cursorText}"))`;
				if (rootScopeName) {
					query += `(include (value (ruleName) @ruleName) @include (#eq? @include "${rootScopeName}#${cursorText}"))`;
				}
				const edit = new vscode.TextEdit(cursorRange, newName);
				edits.push(edit);
				break;
			default:
				return;
		}

		const queryCaptures = queryNode(jsonTree.rootNode, query);
		for (const queryCapture of queryCaptures) {
			if (queryCapture.name == 'include') {
				continue;
			}
			const node = queryCapture.node;
			const range = toRange(node);
			const edit = new vscode.TextEdit(range, newName);
			edits.push(edit);
		}

		workspaceEdits.set(uri, edits);
		// vscode.window.showInformationMessage(JSON.stringify(workspaceEdits));
		return workspaceEdits;
	},
	prepareRename(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<{ range: vscode.Range; placeholder: string; }> {
		// vscode.window.showInformationMessage(JSON.stringify("Rename"));
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const point = toPoint(position);

		const cursorCapture = queryNode(jsonTree.rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return Promise.reject('Item not renamable');
		}

		// const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		const cursorRange = toRange(cursorNode);
		
		// if (cursorName == 'root_scopeName') {
		// 	const uriPackage = vscode.Uri.joinPath(document.uri, '../../package.json');
		// 	vscode.workspace.openTextDocument(uriPackage);
		// }

		const rename = { range: cursorRange, placeholder: cursorText };
		// vscode.window.showInformationMessage(JSON.stringify(rename));
		return rename;
	},
}
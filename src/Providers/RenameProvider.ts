import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange } from "../TreeSitter";
import { findCandidateScopePostfixes } from "./CompletionItemProvider";


const cursorQuery = `;scm
	(include (value (scopeName) @scopeName))
	(include (value (ruleName) @ruleName))
	;(json (scopeName (value) @root_scopeName))
	(repo (key) @repo)
	(scope) @scope
`;

export const RenameProvider: vscode.RenameProvider = {
	prepareRename(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<{ range: vscode.Range; placeholder: string; }> {
		// vscode.window.showInformationMessage(JSON.stringify("Rename"));
		const rootNode = getTrees(document).jsonTree.rootNode;
		const point = toPoint(position);

		const cursorCapture = queryNode(rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return Promise.reject('Item not renamable');
		}

		const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		const cursorRange = toRange(cursorNode);

		switch (cursorName) {
			case 'scope':
				const scopePostfix = cursorText.split('.').pop()!;
				if (cursorRange.end.translate(0, -scopePostfix.length).isBeforeOrEqual(position)) {
					const candidateScopes = findCandidateScopePostfixes(rootNode, position);
					// const candidates = candidateScopes.candidates.sort(
					// 	(a, b) => {
					// 		if (a.length < b.length) {
					// 			return 1;
					// 		}
					// 		if (a.length > b.length) {
					// 			return -1;
					// 		}
					// 		return 0;
					// 	});
					for (const candidate of candidateScopes.candidatePostfixes) {
						if (cursorText.endsWith('.' + candidate)) {
							return {
								range: new vscode.Range(
									cursorRange.end.translate(0, -candidate.length),
									cursorRange.end,
								),
								placeholder: candidate,
							};
						}
					}
				}
		}
		// if (cursorName == 'root_scopeName') {
		// 	const uriPackage = vscode.Uri.joinPath(document.uri, '../../package.json');
		// 	vscode.workspace.openTextDocument(uriPackage);
		// }

		const rename = { range: cursorRange, placeholder: cursorText };
		// vscode.window.showInformationMessage(JSON.stringify(rename));
		return rename;
	},
	/* async */ provideRenameEdits(document: vscode.TextDocument, position: vscode.Position, newName: string, token: vscode.CancellationToken): /* Promise< */vscode.WorkspaceEdit | undefined/* > */ {
		// vscode.window.showInformationMessage(JSON.stringify("RenameEdit"));
		const rootNode = getTrees(document).jsonTree.rootNode;
		const point = toPoint(position);

		const cursorCapture = queryNode(rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return;
		}

		const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		const cursorRange = toRange(cursorNode);

		const rootScopeName = queryNode(rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;

		const edits: vscode.TextEdit[] = [];
		const workspaceEdits = new vscode.WorkspaceEdit();

		const uri = document.uri;
		let scopePostfixCandidate: string;

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
			case 'scope':
				const scopePostfix = cursorText.split('.').pop()!;
				if (cursorRange.end.translate(0, -scopePostfix.length).isBeforeOrEqual(position)) {
					const candidateScopes = findCandidateScopePostfixes(rootNode, position);
					for (const candidate of candidateScopes.candidatePostfixes) {
						if (cursorText.endsWith('.' + candidate)) {
							scopePostfixCandidate = candidate;
							query = `;scm
								((scope) @scopePostfix (#match? @scopePostfix "\\\\.${candidate.replaceAll(/[\\|([{}\]).?*+^$]/g, '\\\\$&')}$"))
							`;
							break;
						}
					}
				}
				else {
					query += `;scm
						((scope) @scope (#eq? @scope "${cursorText}"))
					`;
				}
				break;
			default:
				return;
		}

		const queryCaptures = queryNode(rootNode, query);
		for (const queryCapture of queryCaptures) {
			if (queryCapture.name == 'include') {
				continue;
			}

			const range = toRange(queryCapture);

			if (queryCapture.name == 'scopePostfix') {
				edits.push(
					new vscode.TextEdit(
						new vscode.Range(
							range.end.translate(0, -scopePostfixCandidate!.length),
							range.end,
						),
						newName,
					)
				);
				continue;
			}

			const edit = new vscode.TextEdit(range, newName);
			edits.push(edit);
		}

		workspaceEdits.set(uri, edits);
		// vscode.window.showInformationMessage(`rename: ${query}\n${JSON.stringify(workspaceEdits)}`);
		return workspaceEdits;
	},
};

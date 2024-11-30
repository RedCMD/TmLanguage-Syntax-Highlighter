import * as vscode from 'vscode';
import { QueryCapture } from 'web-tree-sitter';
import { getTrees, queryNode, toRange } from "../TreeSitter";
import { grammarLanguages } from "../TextMate";
import { IRelaxedExtensionManifest } from "../extensions";

type CodeLens = vscode.CodeLens & {
	capture: QueryCapture;
	document: vscode.TextDocument;
};

export const CodeLensProvider: vscode.CodeLensProvider = {
	provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): CodeLens[] {
		// vscode.window.showInformationMessage(JSON.stringify("provideCodeLenses"));
		// const start = performance.now();
		const trees = getTrees(document);
		const tree = trees.jsonTree;

		const query = `;scm
			(json (scopeName (value) @scopeName))
			;(repo (key) @repo)
		`;
		const captures = queryNode(tree.rootNode, query);

		const codeLenses: CodeLens[] = [];

		for (const capture of captures) {
			const node = capture.node;
			const range = toRange(node);
			const codeLens = new vscode.CodeLens(range) as CodeLens;
			codeLens.capture = capture;
			codeLens.document = document;
			codeLenses.push(codeLens);
		}

		// vscode.window.showInformationMessage(JSON.stringify(codeLens));
		// vscode.window.showInformationMessage(`codeLenses ${(performance.now() - start).toFixed(3)}ms`);
		return codeLenses;
	},
	async resolveCodeLens(codeLen: CodeLens, token: vscode.CancellationToken): Promise<vscode.CodeLens> {
		// vscode.window.showInformationMessage(JSON.stringify("resolveCodeLens"));
		// const start = performance.now();
		const text = codeLen.capture.node.text;
		const uri = codeLen.document.uri;
		const name = codeLen.capture.name;

		const locations: vscode.Location[] = [];

		switch (name) {
			case 'scopeName':
				const extensionUri = grammarLanguages.scopeName[text]?.extensionUri;
				// vscode.window.showInformationMessage(JSON.stringify(extensionUri));
				if (extensionUri) {
					const uri = vscode.Uri.joinPath(extensionUri, 'package.json');
					await vscode.workspace.openTextDocument(uri).then(null, () => { });
				}
				const injectionScopes = grammarLanguages.scopeName[text]?.injectionScopes ?? [];
				for (const injectionScope of injectionScopes) {
					const extensionUri = grammarLanguages.scopeName[injectionScope]?.extensionUri;
					if (extensionUri) {
						const uri = vscode.Uri.joinPath(extensionUri, 'package.json');
						await vscode.workspace.openTextDocument(uri).then(null, () => { });
					}
				}

				const uriPackage = vscode.Uri.joinPath(uri, '..', '..', 'package.json');
				if (uriPackage.scheme != 'untitled') {
					await vscode.workspace.openTextDocument(uriPackage).then(null, () => { });
				}

				for (const textDocument of vscode.workspace.textDocuments) {
					if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
						continue;
					}
					try {
						const packageJSON: IRelaxedExtensionManifest = JSON.parse(textDocument.getText());
						const grammars = packageJSON?.contributes?.grammars ?? [];
						for (const grammar of grammars) {
							if (grammar.scopeName == text) {
								const location = new vscode.Location(
									textDocument.uri,
									new vscode.Range(0, 0, textDocument.lineCount, 1000),
								);
								locations.push(location);
								break;
							}
							// let exit = false;
							const injectTo = grammar.injectTo ?? [];
							for (const injectToScope of injectTo) {
								if (injectToScope == text) {
									const location = new vscode.Location(
										textDocument.uri,
										new vscode.Range(0, 0, 0, 0),
									);
									locations.push(location);
									// exit = true;
									break;
								}
							}
							// if (exit) {
							// 	break;
							// }
						}
					}
					catch (error) { }
				}
				break;
			case 'repo':
				// Implement behind setting
				break;
			default:
				console.warn(`JSON TextMate: CodLens. Invalid 'name' ${name}`);
				break;
		}


		const length = locations.length;
		const command: vscode.Command = {
			title: `${length} reference${length == 1 ? '' : 's'}`,
			tooltip: `${name}: ${text}`,
			command: 'editor.action.showReferences',
			arguments: [
				uri,
				codeLen.range.start,
				locations,
			]
		};

		const codeLens = new vscode.CodeLens(codeLen.range, command);
		// vscode.window.showInformationMessage(JSON.stringify(codeLens));
		// vscode.window.showInformationMessage(`codeLens ${(performance.now() - start).toFixed(3)}ms`);
		return codeLens;
	},
};

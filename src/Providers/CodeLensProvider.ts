import * as vscode from 'vscode';
import { QueryCapture } from 'web-tree-sitter';
import { getTrees, queryNode, toRange } from "../TreeSitter";

type codeLen = vscode.CodeLens & {
	capture?: QueryCapture,
	document?: vscode.TextDocument
};

export const CodeLensProvider: vscode.CodeLensProvider = {
	provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): codeLen[] {
		// vscode.window.showInformationMessage(JSON.stringify("provideCodeLenses"));
		const trees = getTrees(document);
		const tree = trees.jsonTree;

		const query = `
			(json (scopeName (value) @scopeName))
			;(repo (key) @repo)
		`;
		const captures = queryNode(tree.rootNode, query);

		const codeLenses: vscode.CodeLens[] = [];

		for (const capture of captures) {
			const node = capture.node;
			const range = toRange(node);
			const codeLens: codeLen = new vscode.CodeLens(range);
			codeLens.capture = capture;
			codeLens.document = document;
			codeLenses.push(codeLens);
		}

		// vscode.window.showInformationMessage(JSON.stringify(codeLens));
		return codeLenses;
	},
	async resolveCodeLens(codeLen: codeLen, token: vscode.CancellationToken): Promise<vscode.CodeLens> {
		// vscode.window.showInformationMessage(JSON.stringify("resolveCodeLens"));
		const text = codeLen.capture.node.text;
		const uri = codeLen.document.uri;
		const name = codeLen.capture.name;

		const locations: vscode.Location[] = [];

		switch (name) {
			case 'scopeName':
				for (const extension of vscode.extensions.all) {
					const grammars = extension.packageJSON?.contributes?.grammars;
					if (grammars) {
						for (const grammar of grammars) {
							if (grammar.scopeName == text) {
								const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
								await vscode.workspace.openTextDocument(uri);
							}
						}
					}
				}

				const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
				if (uriPackage.scheme != 'untitled') {
					await vscode.workspace.openTextDocument(uriPackage);
				}

				for (const textDocument of vscode.workspace.textDocuments) {
					if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
						continue;
					}
					try {
						const packageJSON = await JSON.parse(textDocument.getText());
						const grammars = packageJSON?.contributes?.grammars;
						if (grammars) {
							for (const grammar of grammars) {
								if (grammar.scopeName == text) {
									const location = new vscode.Location(
										textDocument.uri,
										new vscode.Range(0, 0, textDocument.lineCount, 1000)
									);
									locations.push(location);
									break;
								}
							}
						}
					}
					catch (error) { }
				}
				break;
			case 'repo':

				break;
			default:
				return;
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
		return codeLens;
	},
}
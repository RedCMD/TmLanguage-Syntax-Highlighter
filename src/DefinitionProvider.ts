import * as vscode from 'vscode';
import { getTree, toRange, toPoint, queryNode } from "./TreeSitter";
import { DocumentSelector } from './extension';


export const DefinitionProvider = {
	async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.LocationLink[]> {
		// vscode.window.showInformationMessage(JSON.stringify("Definition"));
		const tree = getTree(document);
		const point = toPoint(position);
		let queryString: string;
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));

		queryString = `
			(json (scopeName (value) @scopeName))
			(repo (key) @repo)
			(include (value) @include)
		`;
		const cursorCapture = queryNode(tree.rootNode, queryString, point);
		// vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
		if (cursorCapture == null) {
			return;
		}
		const node = cursorCapture.node;
		// vscode.window.showInformationMessage(JSON.stringify(node));
		const originSelectionRange = toRange(node);
		if (!originSelectionRange.contains(position)) {
			return;
		}
		const text = node.text;
		// vscode.window.showInformationMessage(JSON.stringify(node.toString()));

		const locations: vscode.DefinitionLink[] = [];

		switch (cursorCapture.name) {
			case 'scopeName':
				for (const extension of vscode.extensions.all) {
					const grammars = extension.packageJSON?.contributes?.grammars;
					if (grammars) {
						for (const grammar of grammars) {
							if (grammar.scopeName == text) {
								const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
								const locationLink: vscode.DefinitionLink = {
									originSelectionRange: originSelectionRange, // Underlined text
									targetUri: uri,
									targetRange: new vscode.Range(0, 0, 20, 0), // Hover text. 20 lines
									targetSelectionRange: new vscode.Range(0, 0, 0, 0) // Highlighted text
								}
								locations.push(locationLink);
							}
						}
					}
				}
				break;
			case 'repo':
				if (text == '$self' || text == '$base') {
					return;
				}
				// Call ReferenceProvider() (see at bottom)
				break;
			case 'include':
				if (node.childForFieldName('base')) { // $base
					// Call ReferenceProvider() (see at bottom)
					break;
				}

				queryString = `(json (scopeName (value) @scopeName))`;
				const rootScopeNameNode = queryNode(tree.rootNode, queryString).pop()?.node ?? null;
				const rootScopeNameText = rootScopeNameNode?.text ?? '';
		
				const scopeName = node.childForFieldName('scopeName')?.text ?? '';
				const ruleName = node.childForFieldName('ruleName')?.text ?? '';
				queryString = `(json (patterns) @patterns)`;
				const rootPatternsNode = queryNode(tree.rootNode, queryString).pop()?.node;
				const rootPatternsRange = toRange(rootPatternsNode);
				if ((node.childForFieldName('self') && !scopeName) || (scopeName == rootScopeNameText && !ruleName)) { // $self
					if (rootPatternsNode == null) {
						break;
					}
					const targetSelectionRange = rootPatternsRange.contains(originSelectionRange) ?
						toRange(rootPatternsNode.childForFieldName('key')) :
						rootPatternsRange;

					const locationLink: vscode.DefinitionLink = {
						originSelectionRange: originSelectionRange, // Underlined text
						targetUri: document.uri,
						targetRange: rootPatternsRange, // Hover text
						targetSelectionRange: targetSelectionRange // Highlighted text
					}
					locations.push(locationLink);
					break;
				}
				if (!scopeName || scopeName == rootScopeNameText) { // #include
					queryString = `(repo
										[(patterns) (include)] (repository
											(repo
												(key) @repo (.eq? @repo "${ruleName}")))
										!match !begin)`;
					const nestedRepoNode = queryNode(tree.rootNode, queryString, point, false)?.node;
					if (nestedRepoNode) {
						const locationLink: vscode.DefinitionLink = {
							originSelectionRange: originSelectionRange, // Underlined text
							targetUri: document.uri,
							targetRange: toRange(nestedRepoNode.parent), // Hover text
							targetSelectionRange: toRange(nestedRepoNode) // Highlighted text
						}
						locations.push(locationLink);
						break;
					}

					queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
					const rootRepoNode = queryNode(tree.rootNode, queryString).pop()?.node;
					if (rootRepoNode) {
						const locationLink: vscode.DefinitionLink = {
							originSelectionRange: originSelectionRange, // Underlined text
							targetUri: document.uri,
							targetRange: toRange(rootRepoNode.parent), // Hover text
							targetSelectionRange: toRange(rootRepoNode) // Highlighted text
						}
						locations.push(locationLink);
					}
					break;
				}
				for (const extension of vscode.extensions.all) { // other
					const grammars = extension.packageJSON?.contributes?.grammars;
					if (grammars) {
						for (const grammar of grammars) {
							if (grammar.scopeName == scopeName) {
								const uri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
								const document = await vscode.workspace.openTextDocument(uri);
								vscode.languages.setTextDocumentLanguage(document, 'json-textmate');
							}
						}
					}
				}
				for (const textDocument of vscode.workspace.textDocuments) { // other#include
					if (!vscode.languages.match(DocumentSelector, textDocument)) {
						continue;
					}
					const documentTree = getTree(textDocument);
					queryString = `(json (scopeName (value) @scopeName (.eq? @scopeName "${scopeName}")))`;
					const documentScopeNameNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
					if (documentScopeNameNode) {
						if (ruleName) { // source.other#include
							queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
							const repoNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
							if (repoNode) {
								const locationLink: vscode.DefinitionLink = {
									originSelectionRange: originSelectionRange, // Underlined text
									targetUri: textDocument.uri,
									targetRange: toRange(repoNode.parent), // Hover text
									targetSelectionRange: toRange(repoNode) // Highlighted text
								}
								locations.push(locationLink);
							}
						}
						else { // source.other
							queryString = `(json (patterns) @patterns)`;
							const documentPatternsNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
							const locationLink: vscode.DefinitionLink = {
								originSelectionRange: originSelectionRange, // Underlined text
								targetUri: textDocument.uri,
								targetRange: toRange(documentPatternsNode), // Hover text
								targetSelectionRange: toRange(documentScopeNameNode) // Highlighted text
							}
							locations.push(locationLink);
						}
					}
				}
				break;
			default:
				return;
		}


		if (locations.length == 0) {
			// vscode will automatically run the ReferenceProvider() if the only location overlaps with the input
			const targetRange = toRange(node.parent);
			const locationLink: vscode.DefinitionLink = {
				originSelectionRange: originSelectionRange,
				targetUri: document.uri,
				targetRange: targetRange
			}
			locations.push(locationLink)
		}

		// vscode.window.showInformationMessage(JSON.stringify(locations));
		return locations;
	}
}
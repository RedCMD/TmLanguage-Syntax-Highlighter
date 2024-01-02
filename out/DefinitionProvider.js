"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.DefinitionProvider = {
    async provideDefinition(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Definition"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        let queryString;
        // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));
        queryString =
            `(json (scopeName (value) @scopeName))
			(repo (key) @repo)
			(include (value) @include)`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, point);
        if (cursorCapture == null) {
            return;
        }
        const node = cursorCapture.node;
        const originSelectionRange = (0, TreeSitter_1.toRange)(node);
        if (!originSelectionRange.contains(position)) {
            return;
        }
        const text = node.text;
        // vscode.window.showInformationMessage(JSON.stringify(node.toString()));
        const locations = [];
        switch (cursorCapture.name) {
            case 'scopeName':
                for (const extension of vscode.extensions.all) {
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == text) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
                                const locationLink = {
                                    originSelectionRange: originSelectionRange, // Underlined text
                                    targetUri: uri,
                                    targetRange: new vscode.Range(0, 0, 20, 0), // Hover text. 20 lines
                                    targetSelectionRange: new vscode.Range(0, 0, 0, 0) // Highlighted text
                                };
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
                const rootScopeNameNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node ?? null;
                const rootScopeNameText = rootScopeNameNode?.text ?? '';
                const scopeName = node.childForFieldName('scopeName')?.text ?? '';
                const ruleName = node.childForFieldName('ruleName')?.text ?? '';
                queryString = `(json (patterns) @patterns)`;
                const rootPatternsNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                const rootPatternsRange = (0, TreeSitter_1.toRange)(rootPatternsNode);
                if ((node.childForFieldName('self') && !scopeName) || (scopeName == rootScopeNameText && !ruleName)) { // $self
                    if (rootPatternsNode == null) {
                        break;
                    }
                    const targetSelectionRange = rootPatternsRange.contains(originSelectionRange) ?
                        (0, TreeSitter_1.toRange)(rootPatternsNode.childForFieldName('key')) :
                        rootPatternsRange;
                    const locationLink = {
                        originSelectionRange: originSelectionRange, // Underlined text
                        targetUri: document.uri,
                        targetRange: rootPatternsRange, // Hover text
                        targetSelectionRange: targetSelectionRange // Highlighted text
                    };
                    locations.push(locationLink);
                    break;
                }
                if (!scopeName || scopeName == rootScopeNameText) { // #include
                    queryString = `(repo
										[(patterns) (include)] (repository
											(repo
												(key) @repo (.eq? @repo "${ruleName}")))
										!match !begin)`;
                    const nestedRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, point)?.node;
                    if (nestedRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(nestedRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(nestedRepoNode) // Highlighted text
                        };
                        locations.push(locationLink);
                        break;
                    }
                    queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                    const rootRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                    if (rootRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(rootRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(rootRepoNode) // Highlighted text
                        };
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
                                await vscode.workspace.openTextDocument(uri);
                            }
                        }
                    }
                }
                for (const textDocument of vscode.workspace.textDocuments) { // other#include
                    if (textDocument.languageId != 'json-tmLanguage') {
                        continue;
                    }
                    const documentTree = (0, TreeSitter_1.getTree)(textDocument);
                    queryString = `(json (scopeName (value) @scopeName (.eq? @scopeName "${scopeName}")))`;
                    const documentScopeNameNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                    if (documentScopeNameNode) {
                        if (ruleName) { // source.other#include
                            queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                            const repoNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            if (repoNode) {
                                const locationLink = {
                                    originSelectionRange: originSelectionRange, // Underlined text
                                    targetUri: textDocument.uri,
                                    targetRange: (0, TreeSitter_1.toRange)(repoNode.parent), // Hover text
                                    targetSelectionRange: (0, TreeSitter_1.toRange)(repoNode) // Highlighted text
                                };
                                locations.push(locationLink);
                            }
                        }
                        else { // source.other
                            queryString = `(json (patterns) @patterns)`;
                            const documentPatternsNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            const locationLink = {
                                originSelectionRange: originSelectionRange, // Underlined text
                                targetUri: textDocument.uri,
                                targetRange: (0, TreeSitter_1.toRange)(documentPatternsNode), // Hover text
                                targetSelectionRange: (0, TreeSitter_1.toRange)(documentScopeNameNode) // Highlighted text
                            };
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
            const targetRange = (0, TreeSitter_1.toRange)(node.parent);
            const locationLink = {
                originSelectionRange: originSelectionRange,
                targetUri: document.uri,
                targetRange: targetRange
            };
            locations.push(locationLink);
        }
        // vscode.window.showInformationMessage(JSON.stringify(locations));
        return locations;
    }
};

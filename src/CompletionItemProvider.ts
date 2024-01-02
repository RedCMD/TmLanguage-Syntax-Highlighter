import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { getTree, toRange, toPoint, queryNode } from "./TreeSitter";

export const triggerCharacters = ['"', '#', '.', '$'];

export const CompletionItemProvider = {
	async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionList<vscode.CompletionItem>> {
		// vscode.window.showInformationMessage(JSON.stringify("Completions"));
		const tree = getTree(document);
		const point = toPoint(position);

		const cursorQuery = `(include (value) @include)`;
		const cursorCapture = queryNode(tree.rootNode, cursorQuery, point);
		if (cursorCapture == null) {
			return;
		}
		const cursorNode = cursorCapture.node;
		const cursorRange = toRange(cursorNode);
		const completionItems: vscode.CompletionItem[] = [];

		const rootPatternsQuery = `(json (patterns) @patterns)`;
		const rootPatternsText = queryNode(tree.rootNode, rootPatternsQuery).pop()?.node?.text;

		const selfLabel: vscode.CompletionItemLabel = {
			label: '$self',
			description: 'Includes the current grammar file'
		};
		const selfDocumentation = new vscode.MarkdownString();
		selfDocumentation.appendCodeblock(rootPatternsText, 'json-textmate')
		const selfCompletionItem: vscode.CompletionItem = {
			label: selfLabel,
			range: cursorRange,
			kind: vscode.CompletionItemKind.Class,
			documentation: selfDocumentation
		};
		completionItems.push(selfCompletionItem);

		completionItems.push(new vscode.CompletionItem(
			{ label: '$base', description: 'Includes the highest parent grammar' },
			vscode.CompletionItemKind.Class
		));

		repoCompletionItems(completionItems, tree, cursorRange);

		const cursorScopeName = cursorNode.childForFieldName('scopeName')?.text;
		if (cursorScopeName) {
			const rootScopeNameQuery = `(json (scopeName (value) @scopeName))`;
			const rootScopeName = queryNode(tree.rootNode, rootScopeNameQuery).pop()?.node?.text;

			const rootScopeNameLabel: vscode.CompletionItemLabel = {
				label: rootScopeName,
				description: 'use $self instead'
			};

			const rootScopeNameCompletionItem: vscode.CompletionItem = {
				label: rootScopeNameLabel,
				range: cursorRange,
				kind: vscode.CompletionItemKind.Field,
				documentation: selfDocumentation,
				commitCharacters: ['#'],
				command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' }
			};
			completionItems.push(rootScopeNameCompletionItem);

			if (rootScopeName == cursorScopeName) {
				repoCompletionItems(completionItems, tree, cursorRange, rootScopeName);
			}
		}

		for (const extension of vscode.extensions.all) {
			const grammars = extension.packageJSON?.contributes?.grammars;
			if (grammars) {
				const cursorText = cursorNode.text;
				for (const grammar of grammars) {
					const grammarScopeName = grammar.scopeName;
					if (grammarScopeName) {
						const grammarDocumentation = new vscode.MarkdownString();
						if (cursorScopeName == grammarScopeName) {
							const grammarUri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
							const grammarDocument = await vscode.workspace.openTextDocument(grammarUri);
							const grammarTree = getTree(grammarDocument);

							repoCompletionItems(completionItems, grammarTree, cursorRange, cursorScopeName);

							if (cursorText == grammarScopeName) {
								const grammarPatternsText = queryNode(grammarTree.rootNode, rootPatternsQuery).pop()?.node?.text;
								// grammarDocumentation.appendCodeblock(grammarPatternsText, 'json-textmate'); // if Word Wrap worked
								let grammarDocText: string;
								if (grammarDocument.lineCount == 1) {
									try {
										const parsedPatterns = JSON.parse('{' + grammarPatternsText + '}');
										grammarDocText = '"patterns": ' + JSON.stringify(parsedPatterns.patterns, null, 2).slice(0, 99900);
									} catch (error) {
										grammarDocText = grammarPatternsText.slice(0, 1000); // How to enable Word Wrap?
									}
								}
								else {
									grammarDocText = grammarPatternsText.slice(0, 99900);
								}
								grammarDocumentation.appendCodeblock(grammarDocText, 'json-textmate');
							}
						}
						else {
							grammarDocumentation.appendCodeblock(JSON.stringify(grammar, null, 2), 'json');
						}

						const grammarLabel: vscode.CompletionItemLabel = {
							label: grammarScopeName,
							description: grammar.language
						};

						const grammarCompletion: vscode.CompletionItem = {
							label: grammarLabel,
							range: cursorRange,
							kind: vscode.CompletionItemKind.Field,
							documentation: grammarDocumentation,
							commitCharacters: ['#'],
							command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' }
						}
						completionItems.push(grammarCompletion);
					}
				}
			}
		}


		// completions.push(new vscode.CompletionItem('#$$$'))
		const completionList = new vscode.CompletionList(completionItems);
		// vscode.window.showInformationMessage(JSON.stringify(completionList));
		return completionList;
	}
}

function repoCompletionItems(completionItems: vscode.CompletionItem[], tree: Parser.Tree, cursorRange: vscode.Range, scopeName?: string): void {
	const rootNode = tree.rootNode;

	const repoQuery = `(json (repository (repo (key) @repo (.not-match? @repo "^\\\\$(self|base)$"))))`;
	const repoCaptures = queryNode(rootNode, repoQuery);

	for (const repoCapture of repoCaptures) {
		const repoNode = repoCapture.node;
		const repoText = repoNode.text;

		const parentRepoNode = repoText ? repoNode.parent : repoNode.parent.parent; // Tree-sitter buggy on 0width nodes

		const commentQuery =
			`(comment (value) @comment (.not-eq? @comment ""))` +
			`(comment_slash (value) @comment (.not-eq? @comment ""))`;
		const commentText = queryNode(parentRepoNode, commentQuery)[0]?.node?.text;

		const repoLabel: vscode.CompletionItemLabel = {
			label: (scopeName ?? '') + '#' + repoText,
			description: commentText
		};

		const parentRepoNodeText = parentRepoNode.text;
		let repoDocText: string;
		if (rootNode.startPosition.row == rootNode.endPosition.row) {
			try {
				const parsedRepo = JSON.parse('{' + parentRepoNodeText + '}');
				repoDocText = `"${repoText}": ` + JSON.stringify(parsedRepo[repoText], null, 2).slice(0, 99900);
			} catch (error) {
				repoDocText = parentRepoNodeText.slice(0, 1000); // How to enable Word Wrap?
			}
		}
		else {
			repoDocText = parentRepoNodeText.slice(0, 99900);
		}
		const documentation = new vscode.MarkdownString();
		documentation.appendCodeblock(repoDocText, 'json-textmate');
		// documentation.appendCodeblock(parentRepoNodeText, 'json-textmate'); // if Word Wrap worked

		const repoCompletionItem: vscode.CompletionItem = {
			label: repoLabel,
			range: cursorRange,
			kind: vscode.CompletionItemKind.Function,
			documentation: documentation
		};

		completionItems.push(repoCompletionItem);
	}
}
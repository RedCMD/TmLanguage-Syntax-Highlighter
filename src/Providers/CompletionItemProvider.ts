import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { getTrees, toRange, toPoint, queryNode } from "../TreeSitter";
import { IRelaxedExtensionManifest } from "../extensions";
import { getScopes } from "../themeScopeColors";
import { UNICODE_PROPERTIES } from "../UNICODE_PROPERTIES";
import { unicode_property_data } from "../unicode_property_data";

type CompletionItem = vscode.CompletionItem & { type?: string; };

const triggerCharacterSets: { [key: string]: string[]; } = {
	schema: ['"', ':'],
	scopeName: ['"', '.'],
	name: ['"'],
	include: ['"', '#', '.', '$'],
	new_scope: ['"', ' '],
	scope: ['.', '$'],
	regex: ['{', '^',/* '\\', '(', '?', '<', '\'' */],
};
export const triggerCharacters = Object.values(triggerCharacterSets).flat();

export const CompletionItemProvider: vscode.CompletionItemProvider = {
	async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionList<vscode.CompletionItem>> {
		// vscode.window.showInformationMessage(JSON.stringify("Completions"));
		const trees = getTrees(document);
		const tree = trees.jsonTree;
		const rootNode = tree.rootNode;
		const point = toPoint(position);

		const cursorQuery = `;scm
			(schema (value) @schema)
			(scopeName (value) @scopeName)
			(name_display (value) @name)
			(include (value) @include)
			(name (value) @new_scope)
			(name (value (scope) @scope))
			(contentName (value) @new_scope)
			(contentName (value (scope) @scope))
			(regex) @regex
		`;
		const cursorCapture = queryNode(rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return;
		}
		const cursorName = cursorCapture.name;
		if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
			if (triggerCharacterSets[cursorName].indexOf(context.triggerCharacter) == -1) {
				return;
			}
		}
		const cursorNode = cursorCapture.node;
		const cursorRange = toRange(cursorNode);
		const completionItems: CompletionItem[] = [];

		switch (cursorName) {
			case 'schema':
				completionItems.push({
					label: "https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/vscode.tmLanguage.schema.json",
					range: cursorRange,
					kind: vscode.CompletionItemKind.Reference,
					documentation: "Schema for VSCode's TextMate JSON grammars",
				});
				break;
			case 'scopeName':
				completionItems.push({
					label: {
						label: "text",
						description: "text.language",
					},
					range: cursorRange,
					kind: vscode.CompletionItemKind.Text,
					insertText: new vscode.SnippetString("text.").appendPlaceholder("language"),
					sortText: '~text',
				});
				completionItems.push({
					label: {
						label: "source",
						description: "source.language",
					},
					range: cursorRange,
					kind: vscode.CompletionItemKind.Text,
					insertText: new vscode.SnippetString("source.").appendPlaceholder("language"),
					sortText: '~source',
				});

				if (!document.isUntitled) {
					try {
						const uri = document.uri;
						const path = uri.path;
						const packageUri = vscode.Uri.joinPath(uri, '../../package.json');
						const packageDocument = await vscode.workspace.openTextDocument(packageUri);
						if (packageDocument) {
							const packageJSON: IRelaxedExtensionManifest = await JSON.parse(packageDocument?.getText());
							const grammars = packageJSON.contributes?.grammars;
							if (grammars) {
								for (const grammar of grammars) {
									const grammarPath = vscode.Uri.joinPath(packageUri, '..', grammar.path).path;
									if (grammarPath == path) {
										completionItems.push({
											label: {
												label: grammar.scopeName,
												description: grammar.language,
											},
											range: cursorRange,
											kind: vscode.CompletionItemKind.Variable,
										});
									}
								}
							}
						}
					} catch (error) {
						console.warn("TextMate: Failed to parse package.json\n" + error);
					}
				}
				break;
			case 'name':
				if (!document.isUntitled) {
					try {
						const uri = document.uri;
						const path = uri.path;
						const packageUri = vscode.Uri.joinPath(uri, '../../package.json');
						const packageDocument = await vscode.workspace.openTextDocument(packageUri);
						if (packageDocument) {
							const packageJSON: IRelaxedExtensionManifest = await JSON.parse(packageDocument?.getText());
							const contributes = packageJSON.contributes;
							const grammars = contributes?.grammars;
							if (grammars) {
								for (const grammar of grammars) {
									const grammarPath = vscode.Uri.joinPath(packageUri, '..', grammar.path).path;
									if (grammarPath == path) {
										const languageId = grammar.language;
										if (languageId) {
											const languages = contributes.languages;
											if (languages) {
												for (const language of languages) {
													if (languageId == language.id) {
														const aliases = language.aliases;
														if (aliases) {
															for (const alias of aliases) {
																completionItems.push({
																	label: {
																		label: alias,
																		description: grammar.scopeName || languageId,
																	},
																	range: cursorRange,
																	kind: vscode.CompletionItemKind.Text,
																});
															}
														}
													}
												}
											}
										}
										const displayName = packageJSON.displayName;
										if (displayName) {
											completionItems.push({
												label: {
													label: displayName,
													description: packageJSON.name || languageId || grammar.scopeName,
												},
												range: cursorRange,
												kind: vscode.CompletionItemKind.Text,
											});
										}
										const description = packageJSON.description;
										if (description) {
											completionItems.push({
												label: {
													label: description,
													description: displayName || packageJSON.name || languageId || grammar.scopeName,
												},
												range: cursorRange,
												kind: vscode.CompletionItemKind.Text,
											});
										}
									}
								}
							}
						}
					} catch (error) {
						console.warn("TextMate: Failed to parse package.json\n" + error);
					}
				}
				break;
			case 'include':
				const rootPatternsQuery = `(json (patterns) @patterns)`;
				const rootPatternsText = queryNode(tree.rootNode, rootPatternsQuery).pop()?.node?.text;

				const selfLabel: vscode.CompletionItemLabel = {
					label: '$self',
					description: 'Includes the current grammar file',
				};
				const selfDocumentation = new vscode.MarkdownString();
				selfDocumentation.appendCodeblock(rootPatternsText, 'json-textmate');
				const selfCompletionItem: vscode.CompletionItem = {
					label: selfLabel,
					documentation: selfDocumentation,
					kind: vscode.CompletionItemKind.Class,
				};
				completionItems.push(selfCompletionItem);

				const baseLabel: vscode.CompletionItemLabel = {
					label: '$base',
					description: 'Includes the highest parent grammar',
				};
				const baseCompletionItem: vscode.CompletionItem = {
					label: baseLabel,
					range: cursorRange,
					kind: vscode.CompletionItemKind.Class,
					sortText: '$zbase',
				};
				completionItems.push(baseCompletionItem);

				repoCompletionItems(completionItems, tree, cursorRange);

				const cursorScopeName = cursorNode.childForFieldName('scopeName')?.text;
				if (cursorScopeName) {
					const rootScopeNameQuery = `(json (scopeName (value) @scopeName))`;
					const rootScopeName = queryNode(tree.rootNode, rootScopeNameQuery).pop()?.node?.text;

					const rootScopeNameLabel: vscode.CompletionItemLabel = {
						label: rootScopeName,
						description: '$self',
					};
					const rootScopeNameCompletionItem: vscode.CompletionItem = {
						label: rootScopeNameLabel,
						range: cursorRange,
						kind: vscode.CompletionItemKind.Field,
						documentation: selfDocumentation,
						commitCharacters: ['#'],
						command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' },
						tags: [vscode.CompletionItemTag.Deprecated],
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
									const grammarTree = getTrees(grammarDocument).jsonTree;

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
										grammarDocumentation.appendCodeblock(grammarDocText, 'json-textmate'); // but no, it doesn't work....
									}
								}
								else {
									grammarDocumentation.appendCodeblock(JSON.stringify(grammar, null, 2), 'json');
								}

								const grammarLabel: vscode.CompletionItemLabel = {
									label: grammarScopeName,
									description: grammar.language,
								};
								const grammarCompletion: vscode.CompletionItem = {
									label: grammarLabel,
									range: cursorRange,
									kind: vscode.CompletionItemKind.Field,
									documentation: grammarDocumentation,
									commitCharacters: ['#'],
									command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' },
								};
								completionItems.push(grammarCompletion);
							}
						}
					}
				}
				break;
			case 'scope':
			case 'new_scope':
				const themeScopes = await getScopes();
				for (const key in themeScopes) {
					const scope = themeScopes[key];
					const standardTokenType = key.match(/\b(?:comment|string|regex|meta\.embedded)\b/);
					completionItems.push({
						label: {
							label: key,
							description: scope.name,
						},
						range: cursorName == 'scope' ? cursorRange : null,
						kind: vscode.CompletionItemKind.Color,
						detail: scope.foreground || scope.background,
						documentation:
							'Theme: ' + scope.theme + '\n' +
							'Comment: ' + (scope.name ?? '') + '\n' +
							'Foreground: ' + (scope.foreground ?? 'editor.foreground') + '\n' +
							'Background: ' + (scope.background ?? 'editor.background') + '\n' +
							'FontStyle: ' + (scope.fontStyle ?? '') + '\n' +
							'StandardTokenType: ' + (standardTokenType ? (standardTokenType[0] == 'meta.embedded' ? 'other' : standardTokenType[0]) : ''),
						// sortText: ' ' + key,
					});
				}

				const scopes: string[] = [];
				const scopeQuery = `;scm
					(name (value (scope) @scope (.not-match? @scope "^(\\\\$0*[0-9]{1,3})+$")))
					(contentName (value (scope) @scope (.not-match? @scope "^(\\\\$0*[0-9]{1,3})+$")))
				`;
				const scopeCaptures = queryNode(rootNode, scopeQuery);
				for (const scopeCapture of scopeCaptures) {
					const scope = scopeCapture.node.text;
					scopes.push(scope);
				}

				const uniqueScopes = [...new Set(scopes)];
				for (const scope of uniqueScopes) {
					if (themeScopes[scope]) {
						continue;
					}
					completionItems.push({
						label: scope,
						range: cursorName == 'scope' ? cursorRange : null,
						kind: vscode.CompletionItemKind.Function,
					});
				}

				const noOfCaptureGroups = 5; // TODO: get actual number
				const updowncaseSnippet =
					new vscode.SnippetString('${')
						.appendChoice([...Array(noOfCaptureGroups).keys()].map(String))
						.appendText(':/')
						.appendChoice(['upcase', 'downcase'])
						.appendText('}');
				completionItems.push({
					label: {
						label: '${0:/updowncase}',
					},
					range: cursorRange,
					kind: vscode.CompletionItemKind.Function,
					insertText: updowncaseSnippet,
				});

				break;
			case 'regex':
				const regexRootNode = trees.regexTrees.get(cursorNode.id).rootNode;

				const regexQuery = `;scm
					(character_property (character_property_name) @property)
				`;
				const regexCapture = queryNode(regexRootNode, regexQuery, point);
				if (!regexCapture) {
					return;
				}
				const regexName = regexCapture.name;
				const regexNode = regexCapture.node;
				const regexRange = toRange(regexNode);
				switch (regexName) {
					case 'property':
						const characterProperty = regexNode.parent;
						if (characterProperty.text.charAt(4) != '^') { // \\p{^Letter}
							completionItems.push({
								label: '^',
								range: new vscode.Range(regexRange.start, regexRange.start),
								kind: vscode.CompletionItemKind.Operator,
								detail: 'Negate',
							});
						}
						for (const UNICODE_PROPERTY of UNICODE_PROPERTIES) {
							completionItems.push({
								label: UNICODE_PROPERTY,
								range: regexRange,
								kind: vscode.CompletionItemKind.Property,
								type: 'property',
							});
						}
						break;
					default:
						return;
				}
				// vscode.window.showInformationMessage(JSON.stringify(document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character))));
				// const text = document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character));
				// // switch (text) {
				// // 	case '\\':
				// const completionItemQuad: vscode.CompletionItem = {
				// 	label: '\\\\\\\\',
				// 	kind: vscode.CompletionItemKind.Class
				// };
				// completionItems.push(completionItemQuad);
				// const completionItemWhiteSpace: vscode.CompletionItem = {
				// 	label: '\\\\s',
				// 	kind: vscode.CompletionItemKind.Class
				// };
				// completionItems.push(completionItemWhiteSpace);
				// completionItems.push(new vscode.CompletionItem('\\\\w', vscode.CompletionItemKind.Class));
				// 		break;
				// 	default:
				// 		break;
				// }
				// const newPoint: Parser.Point = {
				// 	row: point.row,
				// 	column: point.column - 1
				// }
				// const regexTrees = trees.regexTrees;
				// const regexNode = regexTrees[cursorNode.id].rootNode;
				// vscode.window.showInformationMessage("1" + JSON.stringify(regexNode.toString()));
				// vscode.window.showInformationMessage("2" + JSON.stringify(regexNode.descendantForPosition(point).text));
				// vscode.window.showInformationMessage("3" + JSON.stringify(regexNode.descendantForPosition(newPoint).text));
				// vscode.window.showInformationMessage("4" + JSON.stringify(regexNode.descendantForPosition(point).toString()));
				// vscode.window.showInformationMessage("5" + JSON.stringify(regexNode.descendantForPosition(newPoint).toString()));
				// vscode.window.showInformationMessage("6" + JSON.stringify(context.triggerCharacter));
				// vscode.window.showInformationMessage("7" + JSON.stringify(queryNode(regexNode, `(_ _ @node)`, point).node.text));
				// vscode.window.showInformationMessage("8" + JSON.stringify(queryNode(regexNode, `(_ _ @node)`, newPoint).node.text));

				break;
			default:
				return;
		}


		const completionList = new vscode.CompletionList(completionItems);
		// vscode.window.showInformationMessage(JSON.stringify(completionList));
		return completionList;
	},
	resolveCompletionItem(item: CompletionItem, token: vscode.CancellationToken): vscode.CompletionItem {
		// vscode.window.showInformationMessage(JSON.stringify(item));

		const type = item.type;
		switch (type) {
			case 'property':
				let unicodeChars = '';

				const unicodeProperty = <string>item.label;
				const unicodeData = unicode_property_data[unicodeProperty];
				for (let index = 0; index < unicodeData.length; index += 2) {
					const unicodeDataStart = unicodeData[index];
					const unicodeDataEnd = unicodeData[index + 1];

					unicodeChars += '0x' + unicodeDataStart.toString(16).toUpperCase();
					// if (unicodeDataStart != unicodeDataEnd) {
					unicodeChars += '-0x' + unicodeDataEnd.toString(16).toUpperCase();
					// }
					unicodeChars += "; '";
					for (let char = unicodeDataStart; char <= unicodeDataEnd && char < (unicodeDataStart + 100); char++) {
						unicodeChars += String.fromCodePoint(char).replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r');
					}
					if ((unicodeDataStart + 100) <= unicodeDataEnd) {
						unicodeChars += '...';
					}
					unicodeChars += "' \n";
				}
				if (!unicodeChars) {
					vscode.window.showInformationMessage(JSON.stringify(unicodeProperty));
				}

				const markdownString = new vscode.MarkdownString();
				markdownString.appendCodeblock(unicodeChars, 'js');
				item.documentation = markdownString;
				break;
			default:
				break;
		}

		return item;
	},
};

function repoCompletionItems(completionItems: CompletionItem[], tree: Parser.Tree, cursorRange: vscode.Range, scopeName?: string): void {
	const rootNode = tree.rootNode;

	const repoQuery =
		`(json (repository (repo (key) @rootRepo (.not-match? @rootRepo "^\\\\$(self|base)$"))))` +
		(scopeName ? `` :
			`(repo
				[(patterns) (include)] (repository
					(repo
						(key) @nestRepo (.not-match? @nestRepo "^\\\\$(self|base)$")))
				!match !begin)`);
	// const repoCaptures = queryNode(rootNode, repoQuery);
	const repoCaptures = scopeName ? queryNode(rootNode, repoQuery) : queryNode(rootNode, repoQuery, toPoint(cursorRange.start), toPoint(cursorRange.end));

	for (const repoCapture of repoCaptures) {
		const repoNode = repoCapture.node;
		const repoText = repoNode.text;

		const repoNodeParent = repoText ? repoNode.parent : repoNode.parent.parent; // Tree-sitter buggy on 0width nodes

		const commentQuery =
			`(comment (value) @comment (.not-eq? @comment ""))` +
			`(comment_slash (value) @comment (.not-eq? @comment ""))`;
		const commentText = queryNode(repoNodeParent, commentQuery)[0]?.node?.text?.replace(/\\(.)?/g, '$1');

		const repoLabel: vscode.CompletionItemLabel = {
			label: (scopeName ?? '') + '#' + repoText,
			description: commentText,
		};

		const repoNodeParentText = repoNodeParent.text;
		let repoDocText: string;
		if (rootNode.startPosition.row == rootNode.endPosition.row) {
			try {
				const repoParsed = JSON.parse('{' + repoNodeParentText + '}');
				repoDocText = `"${repoText}": ` + JSON.stringify(repoParsed[repoText], null, 2).slice(0, 99900);
			} catch (error) {
				repoDocText = repoNodeParentText.slice(0, 1000); // How to enable Word Wrap?
			}
		}
		else {
			repoDocText = repoNodeParentText.slice(0, 99900);
		}
		const documentation = new vscode.MarkdownString();
		documentation.appendCodeblock(repoDocText, 'json-textmate');
		// documentation.appendCodeblock(parentRepoNodeText, 'json-textmate'); // if Word Wrap worked

		const repoCompletionItem: vscode.CompletionItem = {
			label: repoLabel,
			range: cursorRange,
			kind: vscode.CompletionItemKind.Function,
			documentation: documentation,
			// sortText: '~#' + repoText,
		};
		if (repoCapture.name == 'nestRepo') {
			repoCompletionItem.sortText = ' #' + repoText;
		}
		completionItems.push(repoCompletionItem);
	}
}

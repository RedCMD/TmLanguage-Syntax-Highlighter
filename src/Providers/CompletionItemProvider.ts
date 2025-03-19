import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';
import { Node } from 'web-tree-sitter';
import { getTrees, toRange, toPoint, queryNode, getLastNode, trees, toPosition } from "../TreeSitter";
import { ITextMateThemingRule } from "../extensions";
import { getScopes } from "../themeScopeColors";
import { UNICODE_PROPERTIES } from "../UNICODE_PROPERTIES";
import { unicode_property_data } from "../unicode_property_data";
import { getPackageJSON, sleep } from '../extension';

type CompletionItem = vscode.CompletionItem & { type?: string; };

const triggerCharacterSets: { [key: string]: string[]; } = {
	schema: ['"'],
	schema_new: [':'],
	scopeName: ['"', '.'],
	name: ['"'],
	repo: ['"', '#', '.', '$'],
	_nothing_: [],
	repo_new: ['"'],
	include: ['"', '#', '.', '$'],
	replace_capture: ['$', '{'],
	scope: ['.', '$'],
	scope_new: ['"', ' '],
	regex: ['{', '^',/* '\\', '(', '?', '<', '\'' */],
};
export const triggerCharacters = Object.values(triggerCharacterSets).flat();

const defaultThemeColors: { [baseTheme: string]: ITextMateThemingRule[]; } = {
	'light': [
		{ scope: 'token.info-token', settings: { foreground: '#316bcd' } },
		{ scope: 'token.warn-token', settings: { foreground: '#cd9731' } },
		{ scope: 'token.error-token', settings: { foreground: '#cd3131' } },
		{ scope: 'token.debug-token', settings: { foreground: '#800080' } }
	],
	'dark': [
		{ scope: 'token.info-token', settings: { foreground: '#6796e6' } },
		{ scope: 'token.warn-token', settings: { foreground: '#cd9731' } },
		{ scope: 'token.error-token', settings: { foreground: '#f44747' } },
		{ scope: 'token.debug-token', settings: { foreground: '#b267e6' } }
	],
	'hcLight': [
		{ scope: 'token.info-token', settings: { foreground: '#316bcd' } },
		{ scope: 'token.warn-token', settings: { foreground: '#cd9731' } },
		{ scope: 'token.error-token', settings: { foreground: '#cd3131' } },
		{ scope: 'token.debug-token', settings: { foreground: '#800080' } }
	],
	'hcDark': [
		{ scope: 'token.info-token', settings: { foreground: '#6796e6' } },
		{ scope: 'token.warn-token', settings: { foreground: '#008000' } },
		{ scope: 'token.error-token', settings: { foreground: '#FF0000' } },
		{ scope: 'token.debug-token', settings: { foreground: '#b267e6' } }
	]
};

function comma(cursorNode: Node, position: vscode.Position) {
	return toPosition(cursorNode.lastNamedChild!.endPosition).isBefore(position) ? '' : ',';
}

export const CompletionItemProvider: vscode.CompletionItemProvider = {
	async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionList<vscode.CompletionItem> | undefined> {
		// vscode.window.showInformationMessage(JSON.stringify("Completions"));
		// const start = performance.now();
		await sleep(50); // partially avoids race condition with reparseTextDocument()

		const trees = getTrees(document);
		const tree = trees.jsonTree;
		const rootNode = tree.rootNode;
		const point = toPoint(position);

		const cursorQuery = `;scm
			(schema (value) @schema)
			(schema) @schema_new
			(scopeName (value) @scopeName)
			(name_display (value) @name)
			(repository (repo (key) @repo))
			(repository (repo) @_nothing_)
			(repository) @repo_new
			(include (value) @include)
			(name (value (scope (replace_capture) @replace_capture)))
			(name (value (scope) @scope))
			(name (value) @scope_new)
			(contentName (value (scope) @scope))
			(contentName (value) @scope_new)
			(regex) @regex
		`;
		const cursorCapture = queryNode(rootNode, cursorQuery, point);
		if (!cursorCapture) {
			return;
		}
		const cursorName = cursorCapture.name;
		if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
			if (triggerCharacterSets[cursorName].indexOf(context.triggerCharacter!) == -1) {
				return;
			}
		}
		const cursorNode = cursorCapture.node;
		const cursorRange = cursorName.endsWith("_new") ? new vscode.Range(position, position) : toRange(cursorNode);
		const completionItems: CompletionItem[] = [];

		switch (cursorName) {
			case 'schema':
			case 'schema_new':
				const schema = "https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/vscode.tmLanguage.schema.json";
				completionItems.push({
					label: `"${schema}"`,
					range: cursorRange,
					kind: vscode.CompletionItemKind.Reference,
					documentation: "Schema for VSCode's JSON TextMate grammars",
					insertText: cursorName == 'schema' ? schema : `"${schema}"${comma(cursorNode, position)}`,
					sortText: ' ', // top
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

				const { packageJSON, packageUri } = await getPackageJSON(document);
				const grammars = packageJSON?.contributes?.grammars;
				if (Array.isArray(grammars)) {
					const documentPath = document.uri.path;
					for (const grammar of grammars) {
						const grammarPath = vscode.Uri.joinPath(packageUri!, '..', grammar.path).path;
						if (grammarPath == documentPath) {
							completionItems.push({
								label: {
									label: grammar.scopeName || `source.${grammar.language}`,
									description: grammar.language,
								},
								documentation: documentPath,
								range: cursorRange,
								kind: vscode.CompletionItemKind.Variable,
							});
						}
					}
				}
				break;
			case 'name': {
				const { packageJSON, packageUri } = await getPackageJSON(document);
				const contributes = packageJSON?.contributes;
				const grammars = contributes?.grammars;
				if (!Array.isArray(grammars)) { // TypeScript doesn't understand implications of Array.isArray() == false
					break;
				}
				const documentPath = document.uri.path;
				for (const grammar of grammars) {
					const grammarPath = vscode.Uri.joinPath(packageUri!, '..', grammar.path).path;
					if (grammarPath == documentPath) {
						const languageId = grammar.language;
						if (languageId) {
							const languages = contributes!.languages;
							if (Array.isArray(languages)) {
								for (const language of languages) {
									if (languageId == language.id) {
										const aliases = language.aliases;
										if (Array.isArray(aliases)) {
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
						const displayName = packageJSON!.displayName;
						if (displayName) {
							completionItems.push({
								label: {
									label: displayName,
									description: packageJSON!.name || languageId || grammar.scopeName,
								},
								range: cursorRange,
								kind: vscode.CompletionItemKind.Text,
							});
						}
						const description = packageJSON!.description;
						if (description) {
							completionItems.push({
								label: {
									label: description,
									description: displayName || packageJSON!.name || languageId || grammar.scopeName,
								},
								range: cursorRange,
								kind: vscode.CompletionItemKind.Text,
							});
						}
					}
				}

				break;
			}
			case 'repo':
			case 'repo_new': {
				const includeQuery = `;scm
					(include (value !scopeName (ruleName) @include !self !base))
				`;
				const repoQuery = `;scm
					(repo (key) @repo)
				`;

				const includeCaptures = queryNode(rootNode, includeQuery);
				const repoCaptures = queryNode(rootNode, repoQuery);

				// find includes with no repo
				for (const repo of repoCaptures) {
					const text = repo.node.text;
					// TS query's are slow
					for (let index = 0; index < includeCaptures.length; index++) {
						const includeCapture = includeCaptures[index];
						if (text == includeCapture.node.text) {
							includeCaptures.splice(index, 1);
							index--; // array is shorter now
						}
					}
				}
				// vscode.window.showInformationMessage(`includeCaptures ${includeCaptures.length}\n${JSON.stringify(includeCaptures)}`);

				const rootScopeNameQuery = `(json (scopeName (value) @rootScopeName))`;
				const rootScopeName = queryNode(rootNode, rootScopeNameQuery).pop()?.node.text || 'source.langId';

				for (const includeCapture of includeCaptures) {
					const text = includeCapture.node.text;
					const documentation = new vscode.MarkdownString();
					documentation.appendText("A repository item. Reference using:");
					documentation.appendCodeblock(`"include": "#${text}"`, 'json-textmate');
					documentation.appendText("Or from another grammar:");
					documentation.appendCodeblock(`"include": "${rootScopeName}#${text}"`, 'json-textmate');
					completionItems.push({
						label: text,
						range: cursorRange,
						kind: vscode.CompletionItemKind.Property,
						documentation: documentation,
						insertText: cursorName == 'repo' ? text : new vscode.SnippetString(`"${text}": {$0}${comma(cursorNode, position)}`),
					});
				}
				const documentation = new vscode.MarkdownString();
				documentation.appendText("A repository item. Reference using:");
				documentation.appendCodeblock(`"include": "#repo-item"`, 'json-textmate');
				documentation.appendText("Or from another grammar:");
				documentation.appendCodeblock(`"include": "${rootScopeName}#repo-item"`, 'json-textmate');
				completionItems.push({
					label: "repo-item",
					range: cursorRange,
					kind: vscode.CompletionItemKind.Property,
					documentation: documentation,
					insertText: cursorName == 'repo' ?
						"repo-item" :
						new vscode.SnippetString(
							`"\${1:repo-item}": {$0}${comma(cursorNode, position)}`
						),
					sortText: "~repo-item", // bottom
				});
				break;
			}
			case 'include':
				const rootPatternsQuery = `(json (patterns) @patterns)`;
				const rootPatternsText = queryNode(tree.rootNode, rootPatternsQuery).pop()?.node?.text;

				const selfLabel: vscode.CompletionItemLabel = {
					label: '$self',
					description: 'Includes the current grammar file',
				};
				const selfDocumentation = new vscode.MarkdownString();
				selfDocumentation.appendCodeblock(rootPatternsText || '"patterns": []', 'json-textmate');
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
					if (rootScopeName) {
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
										if (grammarPatternsText) {
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
			case 'scope_new':
				const themeScopes = await getScopes();
				for (const key in themeScopes) {
					const scope = themeScopes[key];
					const standardTokenType = key.match(/\b(?:comment|string|regex|meta\.embedded)\b/);
					const documentation = new vscode.MarkdownString();
					documentation.appendMarkdown(
						`Theme: \`${scope.theme}\`  \n` +
						`Comment: ${scope.name ? `\`${scope.name}\`` : ''}  \n` +
						`Foreground: \`${scope.foreground ?? 'editor.foreground'}\`  \n` +
						`Background: \`${scope.background ?? 'editor.background'}\`  \n` +
						`FontStyle: ${scope.fontStyle ? `\`${scope.fontStyle}\`` : ''}  \n` +
						`StandardTokenType: ${standardTokenType ? (standardTokenType[0] == 'meta.embedded' ? '`other`' : `\`${standardTokenType[0]}\``) : ''}`
					);
					completionItems.push({
						label: {
							label: key,
							// detail: scope.foreground,
							description: scope.name,
						},
						range: cursorRange,
						kind: vscode.CompletionItemKind.Color,
						detail: scope.foreground || scope.background,
						documentation: documentation,
					});
				}

				const baseTheme = [
					'',
					'light',
					'dark',
					'hcDark',
					'hcLight',
				][vscode.window.activeColorTheme.kind];
				const themeRules = defaultThemeColors[baseTheme];
				for (const themeRule of themeRules) {
					const scope = <string>themeRule.scope;
					const settings = themeRule.settings;
					const documentation = new vscode.MarkdownString();
					documentation.appendMarkdown(
						`Theme: \`${baseTheme}\`  \n` +
						`Comment: \`VSCode Debug Tokens\`  \n` +
						`Foreground: \`${settings.foreground}\`  \n` +
						`Background: \`editor.background\`  \n` +
						`FontStyle:  \n` +
						`StandardTokenType:`
					);
					completionItems.push({
						label: {
							label: scope,
							description: "VSCode Debug Tokens",
						},
						range: cursorRange,
						kind: vscode.CompletionItemKind.Color,
						detail: settings.foreground || settings.background,
						sortText: `~${scope}`,
						documentation: documentation,
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
						range: cursorRange,
						kind: vscode.CompletionItemKind.Text,
						sortText: ` ${scope}`,
					});
				}
			/* FallThrough */

			case 'replace_capture': {
				const nameNode =
					cursorName == 'replace_capture' ? cursorNode.parent!.parent!.parent! :
						cursorName == 'scope' ? cursorNode.parent!.parent! :
							cursorNode.parent!;
				const noOfCaptureGroups = locateRegex(trees, nameNode);
				// vscode.window.showInformationMessage(`noOfCaptureGroups: ${(performance.now() - start).toFixed(3)}ms ${noOfCaptureGroups.length}\n${JSON.stringify(noOfCaptureGroups)}`);
				const updowncaseSnippet =
					new vscode.SnippetString()
						.appendText('${')
						.appendChoice([...Array(noOfCaptureGroups.length || 1).keys()].map(String))
						.appendText(':/')
						.appendChoice(['downcase', 'upcase'])
						.appendText('}');
				completionItems.push({
					label: {
						label: '${0:/updowncase}',
						description: "Transform Capture's Case",
					},
					range: cursorName == 'replace_capture' ? cursorRange : undefined,
					kind: vscode.CompletionItemKind.Function,
					insertText: updowncaseSnippet,
					documentation: "Converts all the alphabetic characters in a capture to UPPERCASE or lowercase.\nAll leading dots (.) are stripped.",
				});
				const replaceSnippet = new vscode.SnippetString('$').appendChoice([...Array(noOfCaptureGroups.length || 1).keys()].map(String));
				completionItems.push({
					label: {
						label: '$0',
						description: "Capture Replacement",
					},
					range: cursorName == 'replace_capture' ? cursorRange : undefined,
					kind: vscode.CompletionItemKind.Function,
					insertText: replaceSnippet,
					documentation: "Replaced with the corresponding capture's captured text.\nAll leading dots (.) are stripped.",
				});
			}

				break;
			case 'regex':
				const regexRootNode = trees.regexTrees.get(cursorNode.id)?.rootNode;
				if (!regexRootNode) {
					return;
				}

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
						const characterProperty = regexNode.parent!;
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
		// vscode.window.showInformationMessage(`completionList: ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(completionList)}`);
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
						unicodeChars += String.fromCodePoint(char).replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t');
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

		const repoParent = repoNode.parent!;

		const commentQuery = `;scm
			(comment (value) @comment (.not-eq? @comment ""))
			(comment_slash (value) @comment (.not-eq? @comment ""))
		`;
		const commentText = queryNode(repoParent, commentQuery)[0]?.node?.text?.replace(/\\(.)?/g, '$1');

		const repoLabel: vscode.CompletionItemLabel = {
			label: (scopeName ?? '') + '#' + repoText,
			description: commentText,
		};

		const repoNodeParentText = repoParent.text;
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

function locateRegex(trees: trees, nameNode: Node): Parser.QueryCapture[] {
	const parent = nameNode.parent!;
	if (nameNode.type == 'name' && parent.childForFieldName('match')) {
		return getCaptureGroups(trees, parent, 'match');
	}

	const beginCaptures = getCaptureGroups(trees, parent, 'begin');
	if (beginCaptures.length) {
		return beginCaptures;
	}

	const doubleParent = parent.parent!;
	const tripleParent = doubleParent.parent!;

	if (doubleParent.type == 'captures') {
		const matchCaptures = getCaptureGroups(trees, tripleParent, 'match');
		if (matchCaptures.length) {
			return matchCaptures;
		}

		if (!tripleParent.childForFieldName('begin')) {
			return [];
		}
		let beginCaptures: Parser.QueryCapture[] = [];
		if (!getLastNode(tripleParent, 'beginCaptures')) {
			beginCaptures = getCaptureGroups(trees, tripleParent, 'begin');
		}

		if (tripleParent.childForFieldName('while')) {
			if (!tripleParent.childForFieldName('whileCaptures')) {
				const whileCaptures = getCaptureGroups(trees, tripleParent, 'while');
				if (whileCaptures.length > beginCaptures.length) {
					return whileCaptures;
				}
			}
			return beginCaptures;
		}

		if (tripleParent.childForFieldName('end')) {
			if (!tripleParent.childForFieldName('endCaptures')) {
				const endCaptures = getCaptureGroups(trees, tripleParent, 'end');
				if (endCaptures.length > beginCaptures.length) {
					return endCaptures;
				}
			}
			return beginCaptures;
		}
	}

	if (doubleParent.type == 'beginCaptures') {
		return getCaptureGroups(trees, tripleParent, 'begin');
	}

	if (doubleParent.type == 'whileCaptures') {
		return getCaptureGroups(trees, tripleParent, 'while');
	}

	if (doubleParent.type == 'endCaptures') {
		return getCaptureGroups(trees, tripleParent, 'end');
	}
	return [];
}

function getCaptureGroups(trees: trees, parentNode: Node, type: string): Parser.QueryCapture[] {
	const node = getLastNode(parentNode, type);
	if (!node) {
		return [];
	}
	const regexTrees = trees.regexTrees;
	const id = node.childForFieldName('regex')?.id;
	if (!id) {
		return [];
	}
	const regexNode = regexTrees.get(id)?.rootNode;
	if (!regexNode) {
		return [];
	}

	const query = `;scm
		(regex) @root
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
	const captures = queryNode(regexNode, query);
	return captures;
}

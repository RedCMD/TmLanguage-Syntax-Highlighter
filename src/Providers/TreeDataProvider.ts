import * as vscode from 'vscode';
import * as vscodeTextmate from "./textmate/main";
// import * as vscodeTextmate from 'vscode-textmate';
import { tokenizeFile } from "./TextMate";
import { IGrammar, IToken, RuleId, endRuleId, whileRuleId } from "./ITextMate";
import { stringify } from "./extension";
import { IRelaxedExtensionManifest } from "./extensions";
import { IRawCaptures, IRawRule } from "./textmate/rawGrammar";
import { getTrees, queryNode, toRange } from "./TreeSitter";
import { getScopes, getSubScope } from "./themeScopeColors";


type element = {
	line?: number,
	tokenId?: number,
	scopeId?: number,
	document: vscode.TextDocument,
	token?: IToken,
	id?: number,
	ruleId?: RuleId,
	type?: 'root' | 'tree' | 'list',
};

type rule = {
	scopeName: string,
	ruleId: RuleId,
	depth: number,
	_enterPos: number,
	line: number,
};
// const ruleList: rule[] = [];

type CallView = 'tree' | 'list';

let grammar: IGrammar;
let callView: CallView = 'tree';

const ruleChached: number[] = [];

const onDidChangeTreeData: vscode.EventEmitter<element | void | element[]> = new vscode.EventEmitter<element | void | element[]>();

export const TreeDataProvider: vscode.TreeDataProvider<element> = {
	async getChildren(element?: element): Promise<element[]> {
		// vscode.window.showInformationMessage(JSON.stringify("getChildren"));
		// vscode.window.showInformationMessage(JSON.stringify(element));

		const elements: element[] = [];

		if (!element) {
			const activeTextEditor = vscode.window.activeTextEditor;
			if (!activeTextEditor) {
				return;
			}

			const treeElement: element = {
				document: activeTextEditor.document,
				id: -2,
			};
			elements.push(treeElement);
			return elements;
		}

		const document = element.document;

		if (element.id == -2) {
			grammar = await tokenizeFile(document, false);

			for (let index = 0; index < grammar.rules.length; index++) {
				const rule = grammar.rules[index];
				if (rule) {
					const matchedRuleId = rule.matchedRuleId;
					if (ruleChached[matchedRuleId] == null) {
						ruleChached[matchedRuleId] = index;
					}
				}
			}
			// vscode.window.showInformationMessage(JSON.stringify(ruleChached));

			if (callView == 'list') {
				const listElement: element = {
					line: 0,
					id: -1,
					document: document,
					type: 'list',
				};
				elements.push(listElement);
			}
			else {
				const treeElement: element = {
					line: 0,
					id: -1,
					document: document,
					type: 'tree',
				};
				elements.push(treeElement);
			}

			return elements;
		}

		if (element.type == 'tree') {
			let id = element.id;
			const document = element.document;

			// vscode.window.showInformationMessage(JSON.stringify(element));


			let depth = 0;
			let line = element.line;

			// if (element.id) {
			// 	return elements;
			// }

			// if (element.ruleId != -1) {
			// id++;
			// line++;
			// }

			const rule = grammar._ruleId2desc[element.ruleId];
			if (rule) {
				if (rule._end) {
					id++;
				}
				else
					return elements;
			}

			for (let index = id; index < grammar.rules.length; index++) {
				const matchResult = grammar.rules[index];
				if (matchResult === undefined) {
					line++;
					continue;
				}
				if (matchResult == null) {
					continue;
				}
				const ruleId = matchResult.matchedRuleId;
				if (ruleId < 0) {
					depth--;
					if (depth == -1) {
						break;
					}
					continue;
				}
				if (depth == 0) {
					const childElement: element = {
						line: line,
						ruleId: ruleId,
						id: index,
						document: document,
						type: 'tree',
					};
					elements.push(childElement);
				}
				const rule = grammar._ruleId2desc[ruleId];
				if (!rule) {
					vscode.window.showInformationMessage(JSON.stringify(matchResult, stringify));
				}
				if (rule._begin && !rule._while) {
					depth++;
				}
			}

			return elements;
		}

		if (element.type == 'list') {
			if (element.id == -1) {
				for (let index = 0; index < grammar.lines.length && index < 125000; index++) {
					const element: element = {
						id: 0,
						line: index,
						document: document,
						type: 'list',
					};
					elements.push(element);
				}
				return elements;
			}

			if (element.id == 0) {
				const tokens = grammar.lines[element.line].tokens;
				for (let index = 0; index < tokens.length && index < 125000; index++) {
					const tokenElement: element = {
						id: 1,
						token: tokens[index],
						tokenId: index,
						line: element.line,
						document: document,
						type: 'list',
					};
					elements.push(tokenElement);
				}
				// vscode.window.showInformationMessage(JSON.stringify("elements done"));
				return elements;
			}

			if (element.id == 1) {
				const token = element.tokenId;
				for (let index = grammar.lines[element.line].tokens[token].scopes.length - 1; index >= 0; index--) {
					const tokenElement: element = {
						id: 2,
						tokenId: element.tokenId,
						scopeId: index,
						line: element.line,
						document: document,
						type: 'list',
					};
					elements.push(tokenElement);
				}
				return elements;
			}
		}
	},
	async getTreeItem(element: element): Promise<vscode.TreeItem> {
		// vscode.window.showInformationMessage(JSON.stringify("getTreeItem"));
		// vscode.window.showInformationMessage(JSON.stringify(element));

		const id = element.id;

		if (id == -1) {
			const time = grammar.lines[grammar.lines.length - 1].time;
			const timeFixed = time.toFixed(3);
			const label = /* timeFixed + ': ' + */ grammar._rootScopeName;
			const treeLabel: vscode.TreeItemLabel = {
				label: label,
				// highlights: time >= 500 ? [[0, label.length]] : null,
				// highlights: time >= 500 ? [[0, timeFixed.length]] : null,
			};
			const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.Collapsed);
			item.iconPath = new vscode.ThemeIcon('symbol-variable');
			item.tooltip = `Time: ${time}`;
			item.description = timeFixed + "ms" + (time > 500 ? ' ⚠️' : '');
			return item;
		}

		const document = element.document;
		if (id == -2) {
			const item = new vscode.TreeItem(document.uri, vscode.TreeItemCollapsibleState.Collapsed);
			item.description = document.languageId;
			item.iconPath = vscode.ThemeIcon.File;
			item.contextValue = 'document';
			return item;
		}

		if (element.type == 'tree') {
			const ruleId = element.ruleId;
			const line = element.line;

			const cachedRule = grammar._ruleId2desc[ruleId];
			const rule = grammar.rules[id];
			let prevTime = grammar.startTime;
			for (let index = id - 1; index >= 0; index--) {
				if (grammar.rules[index]) {
					prevTime = grammar.rules[index].time;
					break;
				}
			}
			// const prevTime = id ? (grammar.rules[id - 1]?.time ?? (line ? grammar.lines[line].time + grammar.startTime : grammar.startTime)) : grammar.startTime;
			const time = rule.time - prevTime;
			const timeFixed = time.toFixed(3);

			// const label = cachedRule.id + ": " + ruleChached[rule.matchedRuleId] + ": " + id;
			const label = cachedRule._name || cachedRule._contentName || cachedRule.id.toString();
			const treeLabel: vscode.TreeItemLabel = {
				label: (time >= 1 ? '⚠️' : '') + label,
				// highlights: ruleChached[rule.matchedRuleId] == id ? [[0, label.length]] : null,
				// highlights: time >= 1 ? [[0, label.length]] : null,
			};
			const item = new vscode.TreeItem(
				treeLabel,
				cachedRule._match ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Expanded, // TODO: toggle option
			);
			item.id = `${id}`;
			item.description = timeFixed + "ms" + (grammar.lines[line].stoppedEarly ? '❌' : time >= 1 ? ' ⚠️' : '');
			// item.description = timeFixed + "ms" + (ruleChached[rule.matchedRuleId] == id /* && !cachedRule._match */ ? ' ⚠️' : '');
			if (cachedRule._match) {
				item.iconPath = new vscode.ThemeIcon('regex');
				// item.iconPath = new vscode.ThemeIcon('symbol-event');
			}
			item.tooltip = `RuleId: ${cachedRule.id}`;

			// const start = rule.captureIndices[0].start;
			// const end = rule.captureIndices[0].end;
			// const location = new vscode.Location(
			// 	document.uri,
			// 	new vscode.Range(line - 1, start, line - 1, end),
			// );
			// const position = new vscode.Position(line - 1, start);
			// const command: vscode.Command = {
			// 	title: `title`,
			// 	tooltip: `tooltip`,
			// 	command: 'editor.action.goToLocations',
			// 	arguments: [
			// 		document.uri,
			// 		position,
			// 		[location],
			// 	]
			// };
			// item.command = command;

			return item;
		}

		if (element.type == 'list') {
			if (id == 0) {
				const line = element.line;

				const time = grammar.lines[line].time - (grammar.lines[line - 1]?.time ?? 0);
				const timeFixed = time.toFixed(3);

				const label = /* timeFixed + 'ms: ' + */ `${line + 1}: ${document.lineAt(line).text.slice(0, 50)}`;
				const treeLabel: vscode.TreeItemLabel = {
					label: label,
					// highlights: time >= 10 ? [[0, timeFixed.length]] : null,
				};
				const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.Collapsed);
				item.id = `${line}`;
				item.description = timeFixed + "ms" + (time >= 500 ? ' ⚠️' : '');
				item.iconPath = new vscode.ThemeIcon('symbol-key', new vscode.ThemeColor('symbolIcon.stringForeground'));
				item.tooltip = `Line: ${line + 1}`;

				return item;
			}
			if (id == 1) {
				const line = element.line;
				const token = element.token;
				// const token = grammar.lines[line].tokens[element.tokenId];
				// const scope = token.scopes[token.scopes.length - 1];
				const scopes = token.scopes;
				const scope = scopes.at(-1);

				const label = `${token.ruleId}: ${scope}`;
				const treeLabel: vscode.TreeItemLabel = {
					label: label,
					// highlights: time >= 10 ? [[0, timeFixed.length]] : null,
				};
				const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.Collapsed);
				item.id = `${line}_${element.tokenId}`;
				// Account for newlines in uncaptured tokens
				const newLineAdjust = scopes.length == 1 && (grammar.lines[line].tokens.length - 1 == element.tokenId) ? 1 : 0;
				item.description = token.startIndex + " - " + (token.endIndex - newLineAdjust);

				const subScope = await getSubScope(scopes.slice().reverse(), true);
				if (subScope) {
					item.iconPath = new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor(`textMateThemeToken.${subScope}`));
				}
				else {
					item.iconPath = new vscode.ThemeIcon('symbol-string');
				}

				item.tooltip = document.lineAt(line).text.substring(token.startIndex, token.endIndex - newLineAdjust);

				return item;
			}
			if (id == 2) {
				const line = element.line;
				const token = grammar.lines[line].tokens[element.tokenId];
				const scope = token.scopes[element.scopeId];

				const label = scope;
				const treeLabel: vscode.TreeItemLabel = {
					label: label,
				};
				const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.None);
				item.id = `${line}_${element.tokenId}_${element.scopeId}`;

				const subScope = await getSubScope(scope);
				if (subScope) {
					item.iconPath = new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor(`textMateThemeToken.${subScope}`));
				}
				else {
					item.iconPath = new vscode.ThemeIcon('symbol-string');
				}
				// italic
				// bold
				// remove
				// dash
				// 
				// symbol-parameter
				// text-size
				// wand

				return item;
			}
		}

	},
	getParent(element: element): element {
		// vscode.window.showInformationMessage(JSON.stringify("getParent"));
		// vscode.window.showInformationMessage(JSON.stringify(element));
		// console.log("getParent");
		// console.log(element);

		if (element.id == -1) {
			const parentElement: element = {
				document: element.document,
				id: -2,
			};
			return parentElement;
		}

		return undefined;
	},
	resolveTreeItem(item: vscode.TreeItem, element: element, token: vscode.CancellationToken): vscode.TreeItem {
		// vscode.window.showInformationMessage(JSON.stringify("resolveTreeItem"));
		// vscode.window.showInformationMessage(JSON.stringify(item));
		// vscode.window.showInformationMessage(JSON.stringify(element));
		
		// const id = element.id;
		// const document = element.document;
		
		// if (element.type == 'list') {
		// 	if (id == 0) {
		// 		const line = element.line;
		// 		item.tooltip = document.lineAt(line).text;
		// 	}
		// }
		
		return item;
	},
	onDidChangeTreeData: onDidChangeTreeData.event,
};


let treeView: vscode.TreeView<element>;

export async function initCallStackView(context: vscode.ExtensionContext): Promise<void> {
	// vscode.window.showInformationMessage(JSON.stringify("initCallStackView"));
	// context.subscriptions.push(vscode.commands.registerCommand("textmate.callstack", CallStackView, 'context'));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.refresh", refresh));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.find", find));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.file", gotoFile));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.grammar", gotoGrammar));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.tree-view", () => changeView('tree')));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.list-view", () => changeView('list')));
	// context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(updateWorkbench_colorCustomizations));

	// await updateWorkbench_colorCustomizations();

	await changeView(callView);

	const options: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProvider,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
	};
	treeView = vscode.window.createTreeView('TextMate', options);
}

// export function findMatchingThemeRule(theme: IColorTheme, scopes: string[]): ThemeRule | null {
// 	for (let i = scopes.length - 1; i >= 0; i--) {
// 		const parentScopes = scopes.slice(0, i);
// 		const scope = scopes[i];
// 		const r = findMatchingThemeRule2(theme, scope, parentScopes);
// 		if (r) {
// 			return r;
// 		}
// 	}
// 	return null;
// }

// function findMatchingThemeRule2(theme: IColorTheme, scope: string, parentScopes: string[], onlyColorRules: boolean): ThemeRule | null {
// 	let result: ThemeRule | null = null;

// 	// Loop backwards, to ensure the last most specific rule wins
// 	for (let i = theme.tokenColors.length - 1; i >= 0; i--) {
// 		const rule = theme.tokenColors[i];
// 		if (!rule.settings.foreground) {
// 			continue;
// 		}

// 		let selectors: string[];
// 		if (typeof rule.scope === 'string') {
// 			selectors = rule.scope.split(/,/).map(scope => scope.trim());
// 		} else if (Array.isArray(rule.scope)) {
// 			selectors = rule.scope;
// 		} else {
// 			continue;
// 		}

// 		for (let j = 0, lenJ = selectors.length; j < lenJ; j++) {
// 			const rawSelector = selectors[j];

// 			const themeRule = new ThemeRule(rawSelector, rule.settings);
// 			if (themeRule.matches(scope, parentScopes)) {
// 				if (themeRule.isMoreSpecific(result)) {
// 					result = themeRule;
// 				}
// 			}
// 		}
// 	}

// 	return result;
// }

interface IThemeScopedColorCustomizations {
	[colorId: string]: string;
}

interface IColorCustomizations {
	[colorId: string]: IThemeScopedColorCustomizations | string;
	[themeScope: `[${string}]`]: IThemeScopedColorCustomizations;
}

async function updateWorkbench_colorCustomizations() {
	const textMateScopes = await getScopes();

	const workbench = vscode.workspace.getConfiguration("workbench");
	// const colorTheme: string = workbench.get("colorTheme");
	const colorCustomizations: IColorCustomizations = workbench.get("colorCustomizations", {});
	// vscode.window.showInformationMessage(JSON.stringify(colorCustomizations));

	// const themeScope: { [colorId: string]: string; } = /* colorCustomizations[`[${colorTheme}]]`] ?? */ {};
	// for (const colorId in themeScope) {
	// 	if (colorId.startsWith("textMateThemeToken.")) {
	// 		delete themeScope[colorId];
	// 	}
	// }
	// for (const colorId in colorCustomizations) {
	// 	if (colorId.startsWith("textMateThemeToken.")) {
	// 		delete colorCustomizations[colorId];
	// 	}
	// }

	// for (const textMateScope in textMateScopes) {
	// 	const foreground = textMateScopes[textMateScope].foreground;
	// 	if (foreground) {
	// 		themeScope[textMateScope] = foreground;
	// 	}
	// }
	for (const textMateScope in textMateScopes) {
		const foreground = textMateScopes[textMateScope].foreground;
		if (foreground) {
			colorCustomizations[`textMateThemeToken.${textMateScope}`] = foreground;
		}
	}

	// colorCustomizations["[textMateThemeTokens"] = themeScope;
	// colorCustomizations[`[${colorTheme}]]`] = themeScope;
	// workbench.update("colorCustomizations", themeScope);
	workbench.update("colorCustomizations", colorCustomizations);
}

async function CallStackView(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): Promise<void> {
	// vscode.window.showInformationMessage(JSON.stringify("CallStackView"));
	// vscode.window.showInformationMessage(JSON.stringify(textEditor));
	// vscode.window.showInformationMessage(JSON.stringify(edit));
	// vscode.window.showInformationMessage(JSON.stringify(args));
	const document = textEditor.document;
	const position = textEditor.selection.active;

	// const tokenLineResults = await tokenizeFile(document);
	// // vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));

	// let rootParent = true;
	// let index = 0;
	// const ruleList: {
	// 	scopeName: string,
	// 	ruleId: RuleId,
	// 	depth: number,
	// 	_enterPos: number,
	// 	line: number,
	// }[] = [];
	// for (const tokenLine of tokenLineResults) {
	// 	let parentRule = <StateStackImpl>tokenLine.ruleStack;
	// 	index++;
	// 	const tempRules = [];
	// 	while (parentRule) {
	// 		if (parentRule._enterPos != -1 || rootParent) {
	// 			const rule = {
	// 				scopeName: parentRule.nameScopesList.scopePath.scopeName,
	// 				ruleId: parentRule.ruleId,
	// 				depth: parentRule.depth,
	// 				_enterPos: parentRule._enterPos,
	// 				line: index,
	// 			};
	// 			tempRules.unshift(rule);
	// 			rootParent = false;
	// 		}
	// 		parentRule = parentRule.parent;
	// 	}
	// 	ruleList.push(...tempRules);
	// 	// ruleList = [...ruleList, ...tempRules];
	// }

	// const ruleTree = {};

	// vscode.window.showInformationMessage(JSON.stringify(ruleList, stringify));

	// const grammar = await tokenizeFile(document);

	// onDidChangeTreeData.fire(undefined);

	const activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
	await treeView.reveal(
		undefined,
		{
			expand: true,
			focus: false,
			select: false,
		}
	);
	await treeView.reveal(
		{
			document: activeTextEditor.document,
			id: -2,
			type: 'tree',
		},
		{
			expand: true,
			focus: false,
			select: false,
		}
	);
	await treeView.reveal(
		{
			document: activeTextEditor.document,
			id: -1,
			type: 'tree',
		},
		{
			expand: 2,
			focus: true,
			select: true,
		}
	);
	// treeView.badge = {
	// 	tooltip: "tooltip badge 56: is there any use for this number?",
	// 	value: 56,
	// };
	// treeView.title = "new title";

}

async function refresh(element?: element) {
	// vscode.window.showInformationMessage(JSON.stringify("refresh"));
	// vscode.window.showInformationMessage(JSON.stringify(element));

	// if (element) {
	// 	onDidChangeTreeData.fire(
	// 		{
	// 			line: 0,
	// 			id: -1,
	// 			document: element.document,
	// 			type: element?.type,
	// 		}
	// 	);
	// 	return;
	// }
	if (callView == 'list') {
		await updateWorkbench_colorCustomizations();
	}
	onDidChangeTreeData.fire(undefined);
}

async function find(element?: element) {
	vscode.window.showInformationMessage(JSON.stringify(element));
	await treeView.reveal(undefined, { focus: true });
	vscode.commands.executeCommand('list.find');
	// vscode.commands.executeCommand('list.toggleFindMode');
	// vscode.commands.executeCommand('list.toggleFindMatchType');
}

async function gotoGrammar(element: element) {
	// vscode.window.showInformationMessage(JSON.stringify("goto"));
	// vscode.window.showInformationMessage(JSON.stringify(args));

	if (!element) {
		return;
	}

	const id = element.id;
	const document = element.document;

	if (id == -2) {
		const lang = document.languageId;
		for (const extension of vscode.extensions.all) {
			const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
			const grammars = packageJSON.contributes?.grammars;
			if (grammars) {
				for (const grammar of grammars) {
					if (grammar.language == lang) {
						const path = grammar.path;
						if (path) {
							const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
							vscode.window.showTextDocument(uri);
							return;
						}
					}
				}
			}
		}
		return;
	}


	if (id == -1) {
		const lang = document.languageId;
		for (const extension of vscode.extensions.all) {
			const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
			const grammars = packageJSON.contributes?.grammars;
			if (grammars) {
				for (const grammar of grammars) {
					if (grammar.language == lang) {
						const path = grammar.path;
						if (path) {
							const uri = vscode.Uri.joinPath(extension.extensionUri, path);
							vscode.window.showTextDocument(uri);
							return;
						}
					}
				}
			}
		}
		return;
	}

	// locate grammar rule via its id
	// annoyingly the ids are assigned on a first-served basis
	// including across included/embedded grammars

	let ruleId: RuleId;
	let capturesIndex = -1;

	if (element.type == 'tree') {
		ruleId = element.ruleId;
	}

	if (element.type == 'list') {
		const line = element.line;
		if (id == 0) {
			ruleId = grammar.lines[line].lastRule;
		}

		if (id == 1) {
			const tokenLine = grammar.lines[line];
			// vscode.window.showInformationMessage(JSON.stringify(tokenLine));
			const token = tokenLine.tokens[element.tokenId];
			const tokenStart = token.startIndex;
			const tokenEnd = token.endIndex; // This is required otherwise 0 width end rules get in the way
			const rulesLength = tokenLine.rulesLength;
			// vscode.window.showInformationMessage(JSON.stringify(rulesLength));
			for (let index = rulesLength; index < grammar.rules.length; index++) {
				const rule = grammar.rules[index];
				if (!rule) {
					break;
				}
				let foundRule = false;
				let captureIndex = -1;
				for (const captureIndice of rule.captureIndices) {
					if (captureIndice.start == tokenStart && captureIndice.end >= tokenEnd) {
						foundRule = true;
						// Keep going if next token is identical. (((x))) => 3 not 1
					}
					else if (foundRule) {
						break;
					}
					captureIndex++;
				}
				if (foundRule) {
					ruleId = rule.matchedRuleId;
					capturesIndex = captureIndex;
					// vscode.window.showInformationMessage("Capture: " + captureIndex);
					break;
				}
			}
			if (!ruleId) {
				ruleId = token.ruleId;
			}
		}
	}

	// vscode.window.showInformationMessage(JSON.stringify(ruleId));
	if (!ruleId) {
		return;
	}

	if (ruleId < 0) {
		ruleId = -ruleId;
	}

	// vscode.window.showInformationMessage(JSON.stringify(ruleId));
	let path = allChildren(grammar._grammar, ruleId);
	let grammarDoc;
	if (!path) {
		for (const key in grammar._includedGrammars) {
			const includedGrammar = grammar._includedGrammars[key];
			path = allChildren(includedGrammar, ruleId);
			if (path) {
				grammarDoc = await getGrammarDocumentScopeName(includedGrammar.scopeName);
				break;
			}
		}
	}
	else {
		grammarDoc = await getGrammarDocument(document);
	}
	vscode.window.showInformationMessage(JSON.stringify(path) + " Capture: " + capturesIndex);

	const trees = getTrees(grammarDoc);
	const tree = trees.jsonTree;
	let node = tree.rootNode;

	for (const step of path) {
		const repo = step.repository;
		if (repo != null) {
			for (const childNode of node.namedChildren) {
				if (childNode.type == 'repository') {
					node = childNode;
					break;
				}
			}
			for (const repoNode of node.namedChildren) {
				if (repoNode.firstNamedChild?.text == repo) {
					node = repoNode;
					break;
				}
			}
			continue;
		}
		const pattern = step.patterns;
		if (pattern != null) {
			for (const patternNode of node.namedChildren) {
				if (patternNode.type == 'patterns') {
					node = patternNode;
					break;
				}
			}
			node = node.namedChild(pattern + 1);
			continue;
		}
		const capture = step.captures;
		if (capture != null) {
			for (const childNode of node.namedChildren) {
				if (childNode.type == 'captures') {
					node = childNode;
					break;
				}
			}
			for (const captureNode of node.namedChildren) {
				if (captureNode.firstNamedChild?.text == capture) {
					node = captureNode;
					break;
				}
			}
			continue;
		}
		const id = step.id;
		if (id != null) {
			break;
		}
	}

	const range = toRange(node);
	const uri = grammarDoc.uri;
	const location = new vscode.Location(uri, range);
	const locations = [location];
	vscode.commands.executeCommand('editor.action.goToLocations', uri, range.start, locations);
}

async function gotoFile(element: element) {
	// vscode.window.showInformationMessage(JSON.stringify("goto"));

	if (!element) {
		return;
	}

	const id = element.id;
	const document = element.document;

	if (id == -2) {
		vscode.window.showTextDocument(document);
		return;
	}

	if (id == -1) {
		vscode.commands.executeCommand(
			'editor.action.goToLocations',
			document.uri,
			new vscode.Position(0, 0),
			[
				new vscode.Location(
					document.uri,
					new vscode.Range(0, 0, document.lineCount, 0),
				)
			]
		);
		return;
	}

	const line = element.line;

	if (element.type == 'tree') {
		const rule = grammar.rules[id];

		const start = rule.captureIndices[0].start;
		const end = rule.captureIndices[0].end;
		const location = new vscode.Location(
			document.uri,
			new vscode.Range(line - 1, start, line - 1, end),
		);
		const position = new vscode.Position(line - 1, start);
		vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
		return;
	}

	if (element.type == 'list') {
		if (id == 0) {
			const range = new vscode.Range(line, 0, line + 1, 0);
			const location = new vscode.Location(
				document.uri,
				range,
			);
			const position = new vscode.Position(line, 0);
			vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
			return;
		}
		if (id == 1) {
			const token = grammar.lines[line].tokens[element.tokenId];
			const range = new vscode.Range(line, token.startIndex, line, token.endIndex);
			const location = new vscode.Location(
				document.uri,
				range,
			);
			const position = new vscode.Position(line, token.startIndex);
			vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
			return;
		}
	}
}

function allChildren(rules: vscodeTextmate.IRawGrammar | IRawRule, ruleId: number, captureIndex?: number): [{ 'repository'?: string, 'patterns'?: number, 'captures'?: string, id?: number; }] {
	for (const key in rules) {
		switch (key) {
			case 'patterns':
				const patterns = rules[key];
				for (let index = 0; index < patterns.length; index++) {
					const pattern = patterns[index];
					const path = allChildren(pattern, ruleId);
					if (path) {
						path.unshift({ "patterns": index });
						return path;
					}
				}
				break;
			case 'repository':
				const repository = rules[key];
				for (const key in repository) {
					const repo = repository[key];
					const path = allChildren(repo, ruleId);
					if (path) {
						path.unshift({ "repository": key });
						return path;
					}
				}
				break;
			case 'captures':
				// @ts-ignore
				const captures = <IRawCaptures>rules[key];
				for (const key in captures) {
					const capture = captures[key];
					const path = allChildren(capture, ruleId);
					if (path) {
						path.unshift({ "captures": key });
						return path;
					}
				}
				break;
			case 'id':
				// @ts-ignore
				const id = <number>rules[key];
				if (id == ruleId) {
					// return [];
					return [{ id: id }];
				}
			default:
				break;
		}
	}
}

async function getGrammarDocument(document: vscode.TextDocument) {
	const lang = document.languageId;
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.language == lang) {
					const path = grammar.path;
					if (path) {
						const uri = vscode.Uri.joinPath(extension.extensionUri, path);
						const grammarDoc = await vscode.workspace.openTextDocument(uri);
						if (grammarDoc) {
							return grammarDoc;
						}
					}
				}
			}
		}
	}
}

async function getGrammarDocumentScopeName(scopeName: string) {
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.scopeName == scopeName) {
					const path = grammar.path;
					if (path) {
						const uri = vscode.Uri.joinPath(extension.extensionUri, path);
						if (uri.scheme != 'untitled') {
							const document = await vscode.workspace.openTextDocument(uri);
							if (document) {
								return document;
							}
						}
					}
				}
			}
		}
	}
}

async function changeView(view?: CallView) {
	// vscode.window.showInformationMessage(JSON.stringify("changeView"));
	// vscode.window.showInformationMessage(JSON.stringify(view));
	if (!view) {
		view = callView == 'list' ? 'tree' : 'list';
	}
	callView = view;
	vscode.commands.executeCommand('setContext', 'textmate.call.view', view);
	refresh();
}

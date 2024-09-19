import * as vscode from 'vscode';
import * as vscodeTextmate from "../textmate/main";
// import * as vscodeTextmate from 'vscode-textmate';
import { grammarLanguages, tokenizeFile } from "../TextMate";
import { IGrammar, IToken, RuleId, endRuleId, whileRuleId } from "../ITextMate";
import { stringify } from "../extension";
import { IRawCaptures, IRawRule } from "../textmate/rawGrammar";
import { getTrees, queryNode, toRange } from "../TreeSitter";
import { getScopes, getSubScope } from "../themeScopeColors";


type element = {
	type: 'file' | 'root' | 'line' | 'token' | 'scope' | 'rule' | 'name' | 'regex' | 'capture' | 'pattern',
	line?: number,
	tokenId?: number,
	scopeId?: number,
	ruleIndex?: number,
	ruleId?: RuleId,
	token?: IToken,
	document: vscode.TextDocument,
};

// type rule = {
// 	scopeName: string,
// 	ruleId: RuleId,
// 	depth: number,
// 	_enterPos: number,
// 	line: number,
// };
// const ruleList: rule[] = [];

type CallView = 'tree' | 'list';
const grammars: {
	[uri: string]: {
		grammar: {};
		Grammar: IGrammar;
	};
} = {};
let grammar: IGrammar;
let callView: CallView = 'tree';
let currentFile: string;

// const ruleChached: number[] = [];

const onDidChangeTreeData: vscode.EventEmitter<element | void | element[]> = new vscode.EventEmitter<element | void | element[]>();

export const TreeDataProvider: vscode.TreeDataProvider<element> = {
	getChildren(element?: element): element[] {
		// vscode.window.showInformationMessage(`getChildren\n${JSON.stringify(element)}`);
		const elements: element[] = [];

		if (!element) {
			const activeTextEditor = vscode.window.activeTextEditor;
			if (!activeTextEditor) {
				return;
			}

			currentFile = activeTextEditor.document.uri.toString();
			const treeElement: element = {
				type: 'file',
				document: activeTextEditor.document,
			};
			elements.push(treeElement);
			return elements;
		}

		const document = element.document;
		const type = element.type;

		if (type == 'file') {
			const treeElement: element = {
				type: 'root',
				document: document,
			};
			elements.push(treeElement);
			return elements;
		}

		if (callView == 'tree') {
			// vscode.window.showInformationMessage(JSON.stringify(element));

			let depth = 0;
			let line = element.line ?? 0;
			let id = element.ruleIndex ?? 0;

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
			if (id < 0) {
				id = 0;
			}


			// const stage = element.stage;
			// if (stage == 'name') {
			// 	const regexElement: element = {
			// 		line: line,
			// 		ruleId: element.ruleId,
			// 		document: document,
			// 		id: id,
			// 		type: 'tree',
			// 		stage: 'regex',
			// 	};
			// 	elements.push(regexElement);
			// 	return elements;
			// }

			// let depth = 0;
			// let whileDepth = 0;
			// let prevWhileDepth = 0;

			for (let index = id; index < grammar.rules.length; index++) {
				const matchResult = grammar.rules[index];
				if (matchResult === undefined) {
					line++;
					// depth -= whileDepth;
					// if (whileDepth < prevWhileDepth) {
					// 	depth--;
					// }
					// prevWhileDepth = whileDepth;
					// whileDepth = 0;
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
						type: 'rule',
						line: line,
						ruleId: ruleId,
						ruleIndex: index,
						document: document,
						// stage: 'name',
					};
					elements.push(childElement);
				}
				const rule = grammar._ruleId2desc[ruleId];
				if (!rule) {
					vscode.window.showInformationMessage(JSON.stringify(matchResult, stringify));
				}
				if (rule._begin && !rule._while) {
					depth++;
					// continue;
				}
			}

			return elements;
		}

		if (callView == 'list') {
			if (type == 'root') {
				for (let index = 0; index < grammar.lines.length && index < 125000; index++) {
					const element: element = {
						type: 'line',
						line: index,
						document: document,
					};
					elements.push(element);
				}
				return elements;
			}

			if (type == 'line') {
				const tokens = grammar.lines[element.line].tokens;
				for (let index = 0; index < tokens.length && index < 125000; index++) {
					const tokenElement: element = {
						type: 'token',
						token: tokens[index],
						tokenId: index,
						line: element.line,
						document: document,
					};
					elements.push(tokenElement);
				}
				// vscode.window.showInformationMessage(JSON.stringify("elements done"));
				return elements;
			}

			if (type == 'token') {
				const token = element.tokenId;
				for (let index = grammar.lines[element.line].tokens[token].scopes.length - 1; index >= 0; index--) {
					const tokenElement: element = {
						type: 'scope',
						tokenId: element.tokenId,
						scopeId: index,
						line: element.line,
						document: document,
					};
					elements.push(tokenElement);
				}
				return elements;
			}
		}
	},
	async getTreeItem(element: element): Promise<vscode.TreeItem> {
		// vscode.window.showInformationMessage(`getTreeItem\n${JSON.stringify(element)}`);

		const type = element.type;
		const document = element.document;

		if (type == 'file') {
			const item = new vscode.TreeItem(document.uri, vscode.TreeItemCollapsibleState.Collapsed);
			item.description = document.languageId;
			item.iconPath = vscode.ThemeIcon.File;
			item.contextValue = 'document';
			item.id = document.uri.toString();
			return item;
		}

		if (type == 'root') {
			grammar = await tokenizeFile(element.document, true);

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
			item.description = `${timeFixed}ms${(time > 500 ? ' ⚠️' : '')}`;
			item.id = grammar._rootScopeName;
			return item;
		}

		if (callView == 'tree') {
			// const stage = element.stage;

			// if (stage == 'name') {
			// 	const ruleId = element.ruleId;
			// 	const cachedRule = grammar._ruleId2desc[Math.abs(ruleId)];

			// 	const item = new vscode.TreeItem(
			// 		cachedRule._name || (cachedRule._match ? "match" : cachedRule._end ? "end" : "while"),
			// 		vscode.TreeItemCollapsibleState.Expanded,
			// 	);
			// 	item.id = `${id}_${stage}`;
			// 	item.description = ruleId.toString();

			// 	const subScope = await getSubScope(cachedRule._name, true);
			// 	if (subScope) {
			// 		item.iconPath = new vscode.ThemeIcon('symbol-color', new vscode.ThemeColor(`textMateThemeToken.${subScope}`));
			// 	}
			// 	else {
			// 		item.iconPath = new vscode.ThemeIcon('symbol-string');
			// 	}

			// 	return item;
			// }

			// if (stage == 'regex') {
			// 	const ruleId = element.ruleId;
			// 	const line = element.line;

			// 	const cachedRule = grammar._ruleId2desc[Math.abs(ruleId)];
			// 	const rule = grammar.rules[id];
			// 	let prevTime = grammar.startTime;
			// 	for (let index = id - 1; index >= 0; index--) {
			// 		if (grammar.rules[index]) {
			// 			prevTime = grammar.rules[index].time;
			// 			break;
			// 		}
			// 	}
			// 	const time = rule.time - prevTime;
			// 	const timeFixed = time.toFixed(3);

			// 	const label = cachedRule._match?.source || (ruleId < 0 ? cachedRule._end?.source || cachedRule._while?.source : cachedRule._begin.source);
			// 	const item = new vscode.TreeItem(
			// 		(time >= 1 ? '⚠️' : '') + label,
			// 		vscode.TreeItemCollapsibleState.None, // TODO: toggle option
			// 	);
			// 	item.id = `${id}_${stage}`;
			// 	item.description = timeFixed + "ms" + (grammar.lines[line].stoppedEarly ? '❌' : time >= 1 ? ' ⚠️' : '');
			// 	item.iconPath = new vscode.ThemeIcon('regex');
			// 	item.tooltip = `RuleId: ${ruleId}`;

			// 	return item;
			// }

			const ruleId = element.ruleId;
			const line = element.line;
			const id = element.ruleIndex;

			const cachedRule = grammar._ruleId2desc[Math.abs(ruleId)];
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
			item.id = `_${id}`;
			if (!grammar.lines[line]) {
				// vscode.window.showInformationMessage(JSON.stringify(line));
				// vscode.window.showInformationMessage(JSON.stringify(grammar.lines[line]));
				// vscode.window.showInformationMessage(JSON.stringify(grammar.lines));
			}
			item.description = timeFixed + "ms" + (grammar.lines[line]?.stoppedEarly ? '❌' : time >= 1 ? ' ⚠️' : '');
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

		if (callView == 'list') {
			if (type == 'line') {
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
				item.description = `${timeFixed}ms${time >= 500 ? ' ⚠️' : ''}`;
				// item.iconPath = new vscode.ThemeIcon('symbol-key', new vscode.ThemeColor('symbolIcon.stringForeground'));
				item.tooltip = `Line: ${line + 1}`;

				return item;
			}
			if (type == 'token') {
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
			if (type == 'scope') {
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
		// vscode.window.showInformationMessage(`getParent\n${JSON.stringify(element)}`);
		const document = element.document;
		switch (element.type) {
			case 'token':
				return {
					type: 'line',
					line: element.line,
					document: document,
				};
			case 'line':
				return {
					type: 'root',
					document: document,
				};
			case 'root':
				return {
					type: 'file',
					document: document,
				};
			case 'file':
			default:
				return undefined;
		}
	},
	resolveTreeItem(item: vscode.TreeItem, element: element, token: vscode.CancellationToken): vscode.TreeItem {
		// vscode.window.showInformationMessage(`resolveTreeItem\n${JSON.stringify(element)}\n${JSON.stringify(item, stringify)}`);

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
	// vscode.window.showInformationMessage(`initCallStackView\n${JSON.stringify(context)}`);
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.refresh", refresh));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.find", find));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.file", gotoFile));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.grammar", gotoGrammar));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.tree-view", (element: element) => changeView('tree', element)));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.list-view", (element: element) => changeView('list', element)));
	// context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(updateWorkbench_colorCustomizations));

	// await updateWorkbench_colorCustomizations();

	await changeView(callView);

	const options: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProvider,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
		dragAndDropController: null,
	};
	treeView = vscode.window.createTreeView('TextMate', options);
}

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
	// vscode.window.showInformationMessage(`CallStackView\n${JSON.stringify(textEditor)}\n${JSON.stringify(edit)}`);
	const document = textEditor.document;
	const position = textEditor.selection.active;

	if (currentFile != document.uri.toString()) {
		refresh();
	}

	await treeView.reveal(
		{
			type: 'root',
			document: document,
		},
		{
			expand: true,
			focus: false,
			select: false,
		}
	);

	if (callView == 'list') {
		const line = position.line;
		const character = position.character;
		const tokens = grammar.lines[line].tokens;
		let index = 0;
		for (const token of tokens) {
			if (token.startIndex <= character && token.endIndex >= character) {
				break;
			}
			index++;
		}
		await treeView.reveal(
			{
				type: 'token',
				token: tokens[index],
				tokenId: index,
				line: line,
				document: document,
			},
			{
				expand: false,
				focus: true,
				select: true,
			},
		);
		return;
	}

	// treeView.badge = {
	// 	tooltip: "tooltip badge 56: is there any use for this number?",
	// 	value: 56,
	// };
	// treeView.title = "new title";

}

async function refresh(element?: element) {
	// vscode.window.showInformationMessage(`refresh\n${JSON.stringify(element)}`);
	if (callView == 'list') {
		await updateWorkbench_colorCustomizations();
	}
	onDidChangeTreeData.fire(undefined);
}

async function find(element?: element) {
	// vscode.window.showInformationMessage(`find\n${JSON.stringify(element)}`);
	await treeView.reveal(undefined, { focus: true });
	vscode.commands.executeCommand('list.find');
	// vscode.commands.executeCommand('list.toggleFindMode');
	// vscode.commands.executeCommand('list.toggleFindMatchType');
}

async function gotoGrammar(element: element) {
	// vscode.window.showInformationMessage(`gotoGrammar\n${JSON.stringify(element)}`);

	if (!element) {
		return;
	}

	const type = element.type;
	const document = element.document;

	if (type == 'file') {
		const extensionUri = grammarLanguages.languageId[document.languageId]?.grammar.extensionUri;
		if (extensionUri) {
			const uri = vscode.Uri.joinPath(extensionUri, 'package.json');
			vscode.window.showTextDocument(uri);
		}
		return;
	}


	if (type == 'root') {
		const uri = grammarLanguages.languageId[document.languageId]?.grammar.uri;
		if (uri) {
			vscode.commands.executeCommand(
				'editor.action.goToLocations',
				uri,
				new vscode.Position(0, 0),
				[
					new vscode.Location(
						document.uri,
						new vscode.Range(0, 0, document.lineCount, 0),
					)
				],
			);
		}
		return;
	}

	// locate grammar rule via its id
	// annoyingly the ids are assigned on a first-served basis
	// including across included/embedded grammars

	let ruleId: RuleId;
	let capturesIndex = -1;

	if (callView == 'tree') {
		ruleId = element.ruleId;
	}

	if (callView == 'list') {
		const line = element.line;
		if (type == 'line') {
			ruleId = grammar.lines[line].lastRule;
			// vscode.window.showInformationMessage(`LineTokens: ${JSON.stringify(grammar.lines[line])}`);
		}

		if (type == 'token') {
			// Find the last (scopeNamed) rule that intersects the token
			const tokenLine = grammar.lines[line];
			// vscode.window.showInformationMessage(JSON.stringify(tokenLine));
			const token = tokenLine.tokens[element.tokenId];
			const tokenStart = token.startIndex;
			const tokenEnd = token.endIndex; // This is required otherwise 0 width end rules get in the way
			const rulesLength = tokenLine.rulesLength; // Start at the first rule in the line
			// vscode.window.showInformationMessage(JSON.stringify(rulesLength));
			let foundRule = false;
			let breakLoop = false;
			for (let index = rulesLength; index < grammar.rules.length; index++) {
				const rule = grammar.rules[index];
				if (!rule) {
					break;
				}
				let captureIndex = -1;
				for (const captureIndice of rule.captureIndices) {
					captureIndex++;
					if (captureIndice.start == tokenStart && captureIndice.end >= tokenEnd) {
						ruleId = rule.matchedRuleId;
						capturesIndex = captureIndex;
						// vscode.window.showInformationMessage("Capture: " + captureIndex);
						foundRule = true;
						// Keep going if next token is identical. (((x))) => 3 not 1
					}
					else if (foundRule) {
						breakLoop = true;
						break;
					}
				}
				if (breakLoop) {
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
	let grammarDoc: vscode.TextDocument;
	if (!path) {
		for (const key in grammar._includedGrammars) {
			const includedGrammar = grammar._includedGrammars[key];
			path = allChildren(includedGrammar, ruleId);
			if (path) {
				const uri = grammarLanguages.scopeName[includedGrammar.scopeName]?.uri;
				if (uri) {
					grammarDoc = await vscode.workspace.openTextDocument(uri);
					break;
				}
			}
		}
	}
	else {
		const uri = grammarLanguages.languageId[document.languageId]?.grammar.uri;
		if (uri) {
			grammarDoc = await vscode.workspace.openTextDocument(uri);
		}
	}
	vscode.window.showInformationMessage(`${JSON.stringify(path)} Capture: ${capturesIndex}`);

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
	// vscode.window.showInformationMessage(`gotoFile\n${JSON.stringify(element)}`);

	if (!element) {
		return;
	}

	const type = element.type;
	const document = element.document;

	if (type == 'file') {
		vscode.window.showTextDocument(document);
		return;
	}

	if (type == 'root') {
		vscode.commands.executeCommand(
			'editor.action.goToLocations',
			document.uri,
			new vscode.Position(0, 0),
			[
				new vscode.Location(
					document.uri,
					new vscode.Range(0, 0, document.lineCount, 0),
				)
			],
		);
		return;
	}

	const line = element.line;

	if (callView == 'tree') {
		const rule = grammar.rules[element.ruleIndex];

		const start = rule.captureIndices[0].start;
		const end = rule.captureIndices[0].end;
		const location = new vscode.Location(
			document.uri,
			new vscode.Range(line, start, line, end),
		);
		const position = new vscode.Position(line, start);
		vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
		return;
	}

	if (callView == 'list') {
		if (type == 'line') {
			const range = new vscode.Range(line, 0, line + 1, 0);
			const location = new vscode.Location(
				document.uri,
				range,
			);
			const position = new vscode.Position(line, 0);
			vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
			return;
		}
		if (type == 'token') {
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

async function changeView(view?: CallView, element?: element) {
	// vscode.window.showInformationMessage(`changeView ${view}\n${JSON.stringify(element)}`);
	if (!view) {
		view = callView == 'list' ? 'tree' : 'list';
	}
	callView = view;
	vscode.commands.executeCommand('setContext', 'textmate.call.view', view);
	refresh();
}

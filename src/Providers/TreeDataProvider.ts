import * as vscode from 'vscode';
import * as vscodeTextmate from "../textmate/main";
// import * as vscodeTextmate from 'vscode-textmate';
import { getScopeName, grammarLanguages, tokenizeFile } from "../TextMate";
import { IGrammar, IToken, RegExpSource, RuleId, endRuleId, whileRuleId } from "../ITextMate";
import { stringify } from "../extension";
import { IRawCaptures, IRawRule } from "../textmate/rawGrammar";
import { getTrees, queryNode, toRange } from "../TreeSitter";
import { getScopes, getSubScope } from "../themeScopeColors";
import { createOnigScanner, createOnigString, FindOption } from 'vscode-oniguruma';
import { ruleIdToNumber } from "../textmate/rule";
// import { ITextEditorOptions, EditorOpenSource, TextEditorSelectionSource } from "../extensions";
import { gotoLocationsBroken } from "./DefinitionProvider";

type element = {
	type: 'file' | 'root' | 'line' | 'token' | 'scope' | 'rule' | 'regexes' | 'regex',
	line?: number,
	tokenId?: number,
	scopeId?: number,
	ruleIndex?: number,
	ruleId?: RuleId,
	token?: IToken,
	parent?: RuleId,
	start?: number,
	end?: number,
	first?: boolean,
	itemRule?: RegExpSource,
	itemIndex?: number,
	// nestLevel?: number,
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

// type grammar = {
// 	document: vscode.TextDocument,
// 	IGrammar?: IGrammar;
// 	match?: string;
// 	begin?: string;
// 	while?: string;
// 	end?: string;
// };
// const grammars: { [uri: string]: grammar; } = {};
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
let selectedElement: element;

let treeView: vscode.TreeView<element>;
const onDidChangeTreeData: vscode.EventEmitter<element | void | element[]> = new vscode.EventEmitter<element | void | element[]>();

const TreeDataProvider: vscode.TreeDataProvider<element> = {
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
			// treeNodeCount = 0;
			return elements;
		}

		if (callView == 'tree') {
			// vscode.window.showInformationMessage(JSON.stringify(element));
			// if (treeNodeCount >= 10000) {
			// 	return elements;
			// }
			// treeNodeCount++;

			if (element.ruleId < 0) {
				return elements;
			}

			// const nest = element.nestLevel ?? 0;
			// if (nest > 1000) {
			// 	return elements;
			// }

			let depth = 0;
			let line = element.line ?? 0;
			let id = element.ruleIndex ?? 0;
			let first = true;
			// let count = 0;

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
			const parents = [element.ruleId ?? 1];
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
						const endElement: element = {
							type: 'rule',
							line: line,
							ruleId: ruleId,
							ruleIndex: index,
							parent: parents.at(-1),
							first: first,
							document: document,
							// nestLevel: nest + 1,
						};
						elements.push(endElement);
						break;
					}
					parents.pop();
					continue;
				}

				if (depth == 0) {
					// if (count > 1000) {
					// 	break;
					// }
					const childElement: element = {
						type: 'rule',
						line: line,
						ruleId: ruleId,
						ruleIndex: index,
						parent: parents.at(-1),
						first: first,
						document: document,
						// nestLevel: nest + 1,
						// stage: 'name',
					};
					elements.push(childElement);
					first = false;
					// count++;
				}
				const rule = grammar._ruleId2desc[ruleId];
				if (!rule) {
					vscode.window.showInformationMessage(JSON.stringify(matchResult, stringify));
				}
				if (rule._begin && !rule._while) {
					depth++;
					parents.push(ruleId);
					// continue;
				}
			}

			return elements;
		}

		if (callView == 'list') {
			if (type == 'root') {
				for (let index = 0; index < grammar.lines.length && index < 125000; index++) { // VSCode cannot handle many tree nodes
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
				for (let index = 0; index < tokens.length && index < 125000; index++) { // VSCode cannot handle many tree nodes
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
			grammar = await tokenizeFile(element.document, false);

			if (grammar) {
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
				item.tooltip = `Time: ${time}\nRules: ${grammar.rules.length}`;
				item.description = `${timeFixed}ms${(time > 500 ? ' ⚠️' : '')}`;
				item.id = grammar._rootScopeName;
				return item;
			}

			const label = getScopeName(document.languageId) ?? '<no grammar>';
			const item = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None);
			item.iconPath = new vscode.ThemeIcon('symbol-variable');
			item.tooltip = `There is no valid grammar assigned to the language \`${document.languageId}\``;
			item.description = '❌';
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

			// const label = cachedRule.id + ": " + ruleCached[rule.matchedRuleId] + ": " + id;
			const label = cachedRule._name || cachedRule._contentName || Math.abs(ruleId).toString();
			const treeLabel: vscode.TreeItemLabel = {
				label: `${label}${time >= 1 ? '⚠️' : ''}`,
				// highlights: ruleCached[rule.matchedRuleId] == id ? [[0, label.length]] : null,
				// highlights: time >= 1 ? [[0, label.length]] : null,
			};
			const item = new vscode.TreeItem(
				treeLabel,
				cachedRule._begin && ruleId >= 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None, // TODO: toggle option
			);
			item.id = `_${id}`;
			if (!grammar.lines[line]) {
				// vscode.window.showInformationMessage(JSON.stringify(line));
				// vscode.window.showInformationMessage(JSON.stringify(grammar.lines[line]));
				// vscode.window.showInformationMessage(JSON.stringify(grammar.lines));
			}
			item.description = timeFixed + "ms" + (grammar.lines[line]?.stoppedEarly ? '❌' : time >= 1 ? ' ⚠️' : '');
			// item.description = timeFixed + "ms" + (ruleCached[rule.matchedRuleId] == id /* && !cachedRule._match */ ? ' ⚠️' : '');
			if (cachedRule._match) {
				item.iconPath = new vscode.ThemeIcon('regex');
				// item.iconPath = new vscode.ThemeIcon('symbol-event');
			}
			else if (cachedRule._begin && ruleId < 0) {
				item.iconPath = new vscode.ThemeIcon('chevron-up');
			}
			item.tooltip = `${cachedRule._match ? `match: ${cachedRule._match.source}` : ''}${ruleId >= 0 ? (cachedRule._begin ? `begin: ${cachedRule._begin.source}` : '') : (cachedRule._end ? `end: ${cachedRule._end.source}` : '')}${cachedRule._while ? `while: ${cachedRule._while.source}` : ''}\nRuleId: ${ruleId}`;
			item.command = {
				title: `Show Call Details`,
				command: 'textmate.call.details',
				arguments: [
					element,
				]
			};
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
				item.tooltip = `Line: ${line + 1}\nTokens: ${grammar.lines[line].tokens.length}`;

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


let treeViewCall: vscode.TreeView<element>;
const onDidChangeTreeDataCall: vscode.EventEmitter<element | void | element[]> = new vscode.EventEmitter<element | void | element[]>();

const TreeDataProviderCall: vscode.TreeDataProvider<element> = {
	getChildren(element?: element): element[] {
		// vscode.window.showInformationMessage(`getChildrenCall\n${JSON.stringify(element)}`);
		const elements: element[] = [];

		if (!selectedElement) {
			return elements;
		}
		const document = selectedElement.document;
		if (!element) {
			const regexesElement: element = {
				type: 'regexes',
				ruleId: selectedElement.ruleId,
				line: selectedElement.line,
				ruleIndex: selectedElement.ruleIndex,
				document: document,
			};
			elements.push(regexesElement);
			return elements;
		}

		const type = element.type;
		if (type == 'regexes') {
			let index = 0;
			const ruleId = selectedElement.parent;
			const cachedRule = grammar._ruleId2desc[Math.abs(ruleId)];
			// vscode.window.showInformationMessage(`cachedRule\n${JSON.stringify(cachedRule, stringify)}`);
			for (const rule of cachedRule._cachedCompiledPatterns._items) {
				// for (const rule of cachedRule._cachedCompiledPatterns._cached.rules) {
				const ruleId = rule.ruleId;
				const regexElement: element = {
					type: 'regex',
					ruleId: ruleId < 0 ? cachedRule.id : ruleId,
					line: element.line,
					ruleIndex: element.ruleIndex,
					first: selectedElement.first,
					itemRule: rule,
					itemIndex: index,
					document: document,
				};
				elements.push(regexElement);
				index++;
			}
			return elements;
		}
	},
	getTreeItem(element: element): vscode.TreeItem {
		// vscode.window.showInformationMessage(`getTreeItemCall\n${JSON.stringify(element)}`);
		const type = element.type;

		if (type == 'regexes') {
			const ruleId = selectedElement.parent;
			const line = selectedElement.line;
			// const id = selectedElement.ruleIndex;
			const rule = grammar.rules[selectedElement.ruleIndex];
			const start = rule.linePos;

			// let prevTime = grammar.startTime;
			// for (let index = id - 1; index >= 0; index--) {
			// 	if (grammar.rules[index]) {
			// 		prevTime = grammar.rules[index].time;
			// 		break;
			// 	}
			// }
			// const rule = grammar.rules[id];
			// const time = rule.time - prevTime;
			// const timeFixed = time.toFixed(3);

			const text = selectedElement.document.lineAt(line).text + '\n';
			const onigLineText = createOnigString(text);

			const cachedRule = grammar._ruleId2desc[Math.abs(ruleId)];
			// vscode.window.showInformationMessage(`cachedRule\n${JSON.stringify(cachedRule, stringify)}`);
			const regexes: string[] = [];
			for (const regexSource of cachedRule._cachedCompiledPatterns._items) {
				regexes.push(regexSource.source);
			}
			const scanner = createOnigScanner(regexes);

			const options =
				(line > 0 ? FindOption.NotBeginString : FindOption.None) |
				(line != grammar.lines.length - 1 ? FindOption.NotEndString : FindOption.None) |
				(false ? FindOption.NotBeginPosition : FindOption.None) |
				(false ? FindOption.DebugCall : FindOption.None);

			if (element.first === false) {
				// scanner.findNextMatchSync(onigLineText, start, options); // internal caching
			}
			const startTime = performance.now();
			const onigMatch = scanner.findNextMatchSync(onigLineText, start, options);
			const time = performance.now() - startTime;
			const timeFixed = time.toFixed(3);
			scanner.dispose();

			// const regex = cachedRule._match?.source ?? (ruleId < 0 ? cachedRule._while?.source ?? cachedRule._end?.source : cachedRule._begin?.source);
			const item = new vscode.TreeItem(
				// regex.substring(0, 50),
				cachedRule._cachedCompiledPatterns._items[onigMatch.index].source.substring(0, 50),
				vscode.TreeItemCollapsibleState.Expanded,
			);

			item.id = 'regexes';
			item.description = `${timeFixed}ms${grammar.lines[line]?.stoppedEarly ? '❌' : time >= 1 ? ' ⚠️' : ''}`;
			item.tooltip = `RuleId: ${selectedElement.ruleId}`;
			item.iconPath = new vscode.ThemeIcon('regex');
			return item;
		}

		if (type == 'regex') {
			const line = selectedElement.line;
			const rule = grammar.rules[selectedElement.ruleIndex];
			const start = rule.linePos;
			// const end = rule.captureIndices[0].end; // Inside a capture

			// const text = selectedElement.document.lineAt(line).text.substring(start, end);
			const text = selectedElement.document.lineAt(line).text + '\n';
			const onigLineText = createOnigString(text);

			// const cachedRule = grammar._ruleId2desc[ruleId == -1 ? selectedElement.ruleId : ruleId];
			// const regex = cachedRule._match?.source ?? cachedRule._begin?.source ?? '';
			const regex = element.itemRule.source;
			const scanner = createOnigScanner([regex]);

			const options =
				(line > 0 ? FindOption.NotBeginString : FindOption.None) |
				(line != grammar.lines.length - 1 ? FindOption.NotEndString : FindOption.None) |
				(false ? FindOption.NotBeginPosition : FindOption.None) |
				(false ? FindOption.DebugCall : FindOption.None);

			if (element.first === false) {
				// scanner.findNextMatchSync(onigLineText, start, options); // internal caching
			}
			const startTime = performance.now();
			const onigMatch = scanner.findNextMatchSync(onigLineText, start, options);
			const time = performance.now() - startTime;
			const timeFixed = time.toFixed(3);
			scanner.dispose();

			const label = regex.substring(0, 50);
			const treeLabel: vscode.TreeItemLabel = {
				label: label,
				highlights: onigMatch ? [[0, label.length]] : null,
			};
			const item = new vscode.TreeItem(
				treeLabel,
				vscode.TreeItemCollapsibleState.Collapsed,
			);

			const ruleId = element.itemRule.ruleId;
			item.id = `${element.itemIndex}`;
			item.description = `${regex.length > 50 ? '...' : ''}${timeFixed}ms${time >= 1 ? ' ⚠️' : ''}`;
			item.tooltip = `RuleId: ${ruleId}\n${onigMatch?.captureIndices[0].start} - ${onigMatch?.captureIndices[0].end}`;
			item.iconPath = new vscode.ThemeIcon('regex');

			element.start = onigMatch?.captureIndices[0].start;
			element.end = onigMatch?.captureIndices[0].end;

			return item;
		}
	},
	getParent(element: element): element {
		// vscode.window.showInformationMessage(`getParentCall\n${JSON.stringify(element)}`);
		return;
	},
	resolveTreeItem(item: vscode.TreeItem, element: element, token: vscode.CancellationToken): vscode.TreeItem {
		// vscode.window.showInformationMessage(`resolveTreeItemCall\n${JSON.stringify(element)}\n${JSON.stringify(item, stringify)}`);
		return item;
	},
	onDidChangeTreeData: onDidChangeTreeDataCall.event,
};


export function initCallStackView(context: vscode.ExtensionContext): void {
	// vscode.window.showInformationMessage(`initCallStackView\n${JSON.stringify(context)}`);
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.refresh", refresh));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.find", find));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.call.details", callDetails));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.file", gotoFile));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.grammar", gotoGrammar));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.tree-view", (element: element) => changeView('tree', element)));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.list-view", (element: element) => changeView('list', element)));
	// context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(updateWorkbench_colorCustomizations));

	// await updateWorkbench_colorCustomizations();

	changeView(callView);

	const options: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProvider,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
		dragAndDropController: null,
	};
	treeView = vscode.window.createTreeView('TextMate', options);

	const optionsCall: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProviderCall,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
		dragAndDropController: null,
	};
	treeViewCall = vscode.window.createTreeView('TextMate-Call', optionsCall);
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

	// await treeView.reveal(
	// 	undefined,
	// 	{
	// 		expand: false,
	// 		focus: false,
	// 		select: false,
	// 	}
	// );
	await treeView.reveal(
		{
			type: 'file',
			document: document,
		},
		{
			expand: true,
			focus: false,
			select: false,
		},
	);
	await treeView.reveal(
		{
			type: 'root',
			document: document,
		},
		{
			expand: false,
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

	const type = element?.type;
	if (type == 'regex' || type == 'regexes') {
		onDidChangeTreeDataCall.fire(undefined);
		return;
	}

	onDidChangeTreeData.fire(undefined);

	if (element) {
		return;
	}
	onDidChangeTreeDataCall.fire(undefined);
}

async function find(element?: element) {
	// vscode.window.showInformationMessage(`find\n${JSON.stringify(element)}`);
	await treeView.reveal(undefined, { focus: true });
	vscode.commands.executeCommand('list.find');
	// vscode.commands.executeCommand('list.toggleFindMode');
	// vscode.commands.executeCommand('list.toggleFindMatchType');
}

async function callDetails(element?: element) {
	// vscode.window.showInformationMessage(`callDetails\n${JSON.stringify(element)}`);
	selectedElement = element;
	onDidChangeTreeDataCall.fire(undefined);
}

async function gotoGrammar(element: element) {
	// vscode.window.showInformationMessage(`gotoGrammar:\n${JSON.stringify(element)}`);

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
						uri,
						new vscode.Range(0, 0, (await vscode.workspace.openTextDocument(uri))?.lineCount ?? 0, 0),
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
	if (gotoLocationsBroken) {
		const options: vscode.TextDocumentShowOptions = {
			selection: range,
			preview: true,
		};
		vscode.window.showTextDocument(grammarDoc, options);
	}
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

	if (type == 'regex') {
		const start = element.start;
		const end = element.end;
		if (start != null && end != null) {
			const location = new vscode.Location(
				document.uri,
				new vscode.Range(line, start, line, end),
			);
			const position = new vscode.Position(line, start);
			vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
		}
		else {
			vscode.window.showTextDocument(document);
		}
		return;
	}

	if (callView == 'tree') {
		const rule = grammar.rules[element.ruleIndex];

		const start = rule.captureIndices[0].start;
		const end = rule.captureIndices[0].end;
		const range = new vscode.Range(line, start, line, end);
		const location = new vscode.Location(
			document.uri,
			range,
		);
		const position = new vscode.Position(line, start);
		// const textEditorOptions: ITextEditorOptions = {
		// 	selection: {
		// 		startColumn: start,
		// 		startLineNumber: line - 1,
		// 		endColumn: end,
		// 		endLineNumber: line - 1,
		// 	},
		// 	revealIfVisible: true,
		// 	source: EditorOpenSource.USER,
		// 	selectionSource: TextEditorSelectionSource.NAVIGATION,
		// };
		// vscode.commands.executeCommand('vscode.open', document.uri, [start, textEditorOptions]);
		if (gotoLocationsBroken) {
			const options: vscode.TextDocumentShowOptions = {
				selection: range,
				preview: true,
			};
			vscode.window.showTextDocument(document, options);
		}
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

function changeView(view?: CallView, element?: element) {
	// vscode.window.showInformationMessage(`changeView ${view}\n${JSON.stringify(element)}`);
	if (!view) {
		view = callView == 'list' ? 'tree' : 'list';
	}
	callView = view;
	vscode.commands.executeCommand('setContext', 'textmate.call.view', view);
	refresh();
}

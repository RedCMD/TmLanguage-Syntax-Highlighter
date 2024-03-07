import * as vscode from 'vscode';
import * as vscodeTextmate from './textmate/main';
// import * as vscodeTextmate from 'vscode-textmate';
import path = require('path');
import { IGrammar, IRawGrammar, RuleId, StateStackImpl, tokenizeFile, tokenizeLine } from './TextMate';
import { stringify } from './extension';
import { IRelaxedExtensionManifest } from './extensions';
import { IRawRule } from './textmate/rawGrammar';
import { getTrees, queryNode, toRange } from './TreeSitter';

type element = {
	line?: number,
	document: vscode.TextDocument,
	token?: vscodeTextmate.IToken,
	id?: number,
	ruleId?: RuleId,
};

type rule = {
	scopeName: string,
	ruleId: RuleId,
	depth: number,
	_enterPos: number,
	line: number,
};
// const ruleList: rule[] = [];

let grammar: IGrammar;

const FileIcon = path.join(__dirname, '..', 'assets', 'TextMate-file-icon.svg');
const onDidChangeTreeData: vscode.EventEmitter<element | void | element[]> = new vscode.EventEmitter<element | void | element[]>();

export const TreeDataProvider: vscode.TreeDataProvider<element> = {
	async getChildren(element?: element): Promise<element[]> {
		// vscode.window.showInformationMessage(JSON.stringify("getChildren"));
		// vscode.window.showInformationMessage(JSON.stringify(element));

		if (false) {
			const elements: element[] = [];

			if (!element) {
				const activeTextEditor = vscode.window.activeTextEditor;
				if (!activeTextEditor) {
					return;
				}
				const element: element = {
					line: -1,
					document: activeTextEditor.document,
				};
				elements.push(element);
				return elements;
			}

			const document = element.document;
			const line = element.line;

			if (line == -1) {
				for (let index = 0; index < document.lineCount; index++) {
					const element: element = { line: index, document: document };
					elements.push(element);
				}
				return elements;
			}

			if (element.token) {
				return;
			}

			const tokenLineResult = await tokenizeLine(document, line);
			vscode.window.showInformationMessage(JSON.stringify(tokenLineResult, stringify));
			const tokens = tokenLineResult.tokens;
			if (!tokens) {
				return;
			}
			let count = 0;
			for (const token of tokens) {
				const element: element = {
					line: line,
					document: document,
					token: token
				};
				elements.push(element);
				count++;
				if (count > 500) {
					return elements;
				}
			}
			return elements;
		}

		if (false) {
			const elements: element[] = [];

			if (!element) {
				const activeTextEditor = vscode.window.activeTextEditor;
				if (!activeTextEditor) {
					return;
				}
				const childElement: element = {
					id: -1,
					document: activeTextEditor.document,
				};
				elements.push(childElement);
				return elements;
			}

			const document = element.document;

			if (element.id == -1) {
				const tokenLineResults = await tokenizeFile(document);

				let rootParent = true;
				let index = 0;
				// for (const tokenLine of tokenLineResults) {
				// 	let parentRule = <StateStackImpl>tokenLine.ruleStack;
				// 	index++;
				// 	const tempRules: rule[] = [];
				// 	while (parentRule) {
				// 		const _enterPos = parentRule._enterPos;
				// 		if (_enterPos != -1) {
				// 			const rule = {
				// 				scopeName: parentRule.nameScopesList.scopePath.scopeName,
				// 				ruleId: parentRule.ruleId,
				// 				depth: parentRule.depth,
				// 				_enterPos: _enterPos,
				// 				line: index,
				// 			};
				// 			tempRules.unshift(rule);
				// 		} else if (rootParent) {
				// 			const rule = {
				// 				scopeName: parentRule.nameScopesList.scopePath.scopeName,
				// 				ruleId: parentRule.ruleId,
				// 				depth: parentRule.depth,
				// 				_enterPos: -1,
				// 				line: 0,
				// 			};
				// 			tempRules.unshift(rule);
				// 			rootParent = false;
				// 		}
				// 		parentRule = parentRule.parent;
				// 	}
				// 	ruleList.push(...tempRules);
				// }
				const childElement: element = {
					id: 0,
					document: document,
				};
				elements.push(childElement);
				return elements;
			}

			if (true) {
				// const id = element.id;
				// const depth = ruleList[id].depth;
				// for (let index = id + 1; index < ruleList.length; index++) {
				// 	const rule = ruleList[index];
				// 	const ruleDepth = rule.depth;
				// 	if (ruleDepth == depth) {
				// 		break;
				// 	}
				// 	if (ruleDepth == depth + 1) {
				// 		const childElement: element = {
				// 			id: index,
				// 			document: document,
				// 		};
				// 		elements.push(childElement);
				// 	}
				// }
				return elements;
			}
		}

		if (true) {
			const elements: element[] = [];

			if (!element) {
				const activeTextEditor = vscode.window.activeTextEditor;
				if (!activeTextEditor) {
					return;
				}
				const childElement: element = {
					id: -2,
					document: activeTextEditor.document,
				};
				elements.push(childElement);
				return elements;
			}

			const document = element.document;

			if (element.id == -2) {
				grammar = await tokenizeFile(document);

				// grammar.rules.unshift(
				// 	{
				// 		captureIndices: [
				// 			{
				// 				start: 0,
				// 				end: 0,
				// 				length: 0,
				// 			}
				// 		],
				// 		matchedRuleId: 1,
				// 	}
				// );

				const childElement: element = {
					line: 0,
					id: -1,
					document: document,
				};
				elements.push(childElement);
				return elements;
			}

			if (true) {
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
					if (ruleId == -1) {
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
						};
						elements.push(childElement);
					}
					const rule = grammar._ruleId2desc[ruleId];
					if (rule._begin && !rule._while) {
						depth++;
					}
				}

				return elements;
			}
		}
	},
	getTreeItem(element: element): vscode.TreeItem {
		// vscode.window.showInformationMessage(JSON.stringify("getTreeItem"));
		// vscode.window.showInformationMessage(JSON.stringify(element));

		if (false) {
			const document = element.document;
			const line = element.line;

			if (line == -1) {
				const item = new vscode.TreeItem(document.uri);
				item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
				item.description = document.languageId;
				item.iconPath = FileIcon;
				return item;
			}

			const token = element.token;
			if (token) {
				const item = new vscode.TreeItem(JSON.stringify(token));
				return item;
			}

			const text = document.lineAt(line).text;
			const label = text.replaceAll(' ', '·').replaceAll('\t', '→') /* + (element + 1 == document.lineCount ? '⛔' : '⏎') */;
			const item = new vscode.TreeItem(label);
			item.accessibilityInformation = { label: 'accessibilityInformation', role: 'tree' };
			// item.checkboxState = {
			// 	state: vscode.TreeItemCheckboxState.Unchecked,
			// 	tooltip: 'checkboxtooltip',
			// 	accessibilityInformation: { label: 'checkboxaccessibilityInformation', role: 'menu' }
			// };
			item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			item.description = (line + 1).toString();
			// item.id = element.toString();
			// item.resourceUri = document.uri;
			item.iconPath = FileIcon;
			item.tooltip = `Line: ${line + 1}`;

			return item;
		}

		if (false) {
			const document = element.document;
			const id = element.id;

			if (id == -1) {
				const item = new vscode.TreeItem(document.uri);
				item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
				item.description = document.languageId;
				item.iconPath = FileIcon;
				return item;
			}

			// const rule = ruleList[id];
			// const line = rule.line;
			// const _enterPos = rule._enterPos;

			// const label = rule.scopeName;
			// const item = new vscode.TreeItem(label);
			// item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			// item.description = line.toString();
			// item.iconPath = FileIcon;
			// item.tooltip = `Start Index: ${_enterPos}`;

			// const locations: vscode.Location[] = [];
			// const range = line == 0 ?
			// 	new vscode.Range(0, 0, document.lineCount, 0)
			// 	:
			// 	new vscode.Range(line - 1, _enterPos, line - 1, _enterPos + 1);
			// const location = new vscode.Location(
			// 	document.uri,
			// 	range,
			// );
			// locations.push(location);
			// const position = line == 0 ?
			// 	new vscode.Position(0, 0)
			// 	:
			// 	new vscode.Position(line - 1, _enterPos);
			// const command: vscode.Command = {
			// 	title: `title`,
			// 	tooltip: `tooltip`,
			// 	command: 'editor.action.goToLocations',
			// 	arguments: [
			// 		document.uri,
			// 		position,
			// 		locations,
			// 	]
			// };
			// item.command = command;

			// return item;
		}

		if (true) {
			const id = element.id;

			if (id == -1) {
				const label = grammar._rootScopeName;
				const item = new vscode.TreeItem(label);
				item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
				item.iconPath = FileIcon;
				return item;
			}

			const document = element.document;
			if (id == -2) {
				const item = new vscode.TreeItem(document.uri);
				item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
				item.description = document.languageId;
				item.iconPath = FileIcon;
				return item;
			}

			const ruleId = element.ruleId;
			const line = element.line;

			const cachedRule = grammar._ruleId2desc[ruleId];

			// const _enterPos = rule._enterPos;

			const label = cachedRule._name;
			const item = new vscode.TreeItem(label);
			item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			item.description = line.toString();
			item.iconPath = FileIcon;
			item.tooltip = `RuleId: ${cachedRule.id}`;

			const rule = grammar.rules[element.id];
			const start = rule.captureIndices[0].start;
			const end = rule.captureIndices[0].end;
			const locations: vscode.Location[] = [];
			const range = new vscode.Range(line - 1, start, line - 1, end);
			const location = new vscode.Location(
				document.uri,
				range,
			);
			locations.push(location);
			const position = new vscode.Position(line - 1, start);
			const command: vscode.Command = {
				title: `title`,
				tooltip: `tooltip`,
				command: 'editor.action.goToLocations',
				arguments: [
					document.uri,
					position,
					locations,
				]
			};
			item.command = command;

			return item;
		}

		return;
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

		return item;
	},
	onDidChangeTreeData: onDidChangeTreeData.event,
};


let treeView: vscode.TreeView<element>;

export function initCallStackView(context: vscode.ExtensionContext): void {
	// vscode.window.showInformationMessage(JSON.stringify("initCallStackView"));
	// context.subscriptions.push(vscode.commands.registerCommand("textmate.callstack", CallStackView, 'context'));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.refresh", refresh));
	context.subscriptions.push(vscode.commands.registerCommand("textmate.goto", goto));
	const options: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProvider,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
	};
	treeView = vscode.window.createTreeView('TextMate', options);

	// context.subscriptions.push(
	// 	vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor) => {
	// 		// vscode.window.showInformationMessage(JSON.stringify("active"));
	// 		// vscode.window.showInformationMessage(JSON.stringify(editor));
	// 		if (!editor) {
	// 			return;
	// 		}
	// 		const document = editor.document;
	// 		const element: element = {
	// 			line: -1,
	// 			document: document,
	// 		};
	// 		onDidChangeTreeData.fire(element);
	// 	})
	// );
}

async function CallStackView(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
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

	const grammar = await tokenizeFile(document);

	// onDidChangeTreeData.fire(undefined);

	const activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
	await treeView.reveal(
		{
			document: activeTextEditor.document,
			id: -2,
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
		},
		{
			expand: 2,
			focus: true,
			select: true,
		}
	);
	treeView.badge = {
		tooltip: "tooltip badge 56: is there any use for this number?",
		value: 56,
	};
	treeView.title = "new title";

}

function refresh(...args: any[]) {
	// vscode.window.showInformationMessage(JSON.stringify("refresh"));
	// vscode.window.showInformationMessage(JSON.stringify(args));

	const element: element = args[0];
	if (element) {
		onDidChangeTreeData.fire(
			{
				document: element.document,
				id: -2,
			}
		);
	}
	onDidChangeTreeData.fire(undefined);
}

async function goto(...args: any[]) {
	// vscode.window.showInformationMessage(JSON.stringify("goto"));
	// vscode.window.showInformationMessage(JSON.stringify(args));

	const element: element = args[0];
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
	}
	
	// locate grammar rule via its id
	// annoyingly the ids are assigned on a first-served basis
	// including across included/embedded grammars

	const ruleId = element.ruleId
	if (!ruleId) {
		return;
	}
	// (json (repository (repo (key) )))
	const path = allChildren(grammar._grammar, ruleId);
	vscode.window.showInformationMessage(JSON.stringify(path));

	const grammarDoc = await getGrammarDocument(document);
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

function allChildren(rules: vscodeTextmate.IRawGrammar | IRawRule, ruleId: number): [{ 'repository'?: string, 'patterns'?: number, id?: number }] {
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
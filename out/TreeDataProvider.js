"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCallStackView = exports.TreeDataProvider = void 0;
const vscode = require("vscode");
// import * as vscodeTextmate from 'vscode-textmate';
const TextMate_1 = require("./TextMate");
const extension_1 = require("./extension");
const TreeSitter_1 = require("./TreeSitter");
let grammar;
let callView = 'tree';
const ruleChached = [];
const onDidChangeTreeData = new vscode.EventEmitter();
exports.TreeDataProvider = {
    async getChildren(element) {
        // vscode.window.showInformationMessage(JSON.stringify("getChildren"));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        const elements = [];
        if (!element) {
            const activeTextEditor = vscode.window.activeTextEditor;
            if (!activeTextEditor) {
                return;
            }
            const treeElement = {
                document: activeTextEditor.document,
                id: -2,
            };
            elements.push(treeElement);
            return elements;
        }
        const document = element.document;
        if (element.id == -2) {
            grammar = await (0, TextMate_1.tokenizeFile)(document, false);
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
                const linearElement = {
                    line: 0,
                    id: -1,
                    document: document,
                    type: 'list',
                };
                elements.push(linearElement);
            }
            else {
                const treeElement = {
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
                    const childElement = {
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
                    vscode.window.showInformationMessage(JSON.stringify(matchResult, extension_1.stringify));
                }
                if (rule._begin && !rule._while) {
                    depth++;
                }
            }
            return elements;
        }
        if (element.type == 'list') {
            if (element.id == -1) {
                for (let index = 0; index < grammar.lines.length; index++) {
                    const element = {
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
                for (let index = 0; index < grammar.lines[element.line].tokens.length; index++) {
                    const tokenElement = {
                        id: 1,
                        tokenId: index,
                        line: element.line,
                        document: document,
                        type: 'list',
                    };
                    elements.push(tokenElement);
                }
                // vscode.window.showInformationMessage(JSON.stringify("element done"));
                return elements;
            }
            if (element.id == 1) {
                const token = element.tokenId;
                for (let index = 0; index < grammar.lines[element.line].tokens[token].scopes.length; index++) {
                    const tokenElement = {
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
    getTreeItem(element) {
        // vscode.window.showInformationMessage(JSON.stringify("getTreeItem"));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        const id = element.id;
        if (id == -1) {
            const time = grammar.lines[grammar.lines.length - 1].time;
            const timeFixed = time.toFixed(3);
            const label = /* timeFixed + ': ' + */ grammar._rootScopeName;
            const treeLabel = {
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
            const treeLabel = {
                label: (time >= 1 ? '⚠️' : '') + label,
                // highlights: ruleChached[rule.matchedRuleId] == id ? [[0, label.length]] : null,
                // highlights: time >= 1 ? [[0, label.length]] : null,
            };
            const item = new vscode.TreeItem(treeLabel, cachedRule._match ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Expanded);
            item.description = timeFixed + "ms" + (time >= 1 ? ' ⚠️' : '');
            // item.description = timeFixed + "ms" + (ruleChached[rule.matchedRuleId] == id /* && !cachedRule._match */ ? ' ⚠️' : '');
            if (cachedRule._match) {
                item.iconPath = new vscode.ThemeIcon('symbol-event');
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
                const label = /* timeFixed + 'ms: ' + */ document.lineAt(line).text;
                const treeLabel = {
                    label: label,
                    // highlights: time >= 10 ? [[0, timeFixed.length]] : null,
                };
                const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.Collapsed);
                item.description = timeFixed + "ms" + (time >= 500 ? ' ⚠️' : '');
                item.iconPath = new vscode.ThemeIcon('symbol-key', new vscode.ThemeColor('symbolIcon.stringForeground'));
                item.tooltip = `Line: ${line + 1}`;
                // const locations: vscode.Location[] = [];
                // const range = new vscode.Range(line, 0, line + 1, 0);
                // const location = new vscode.Location(
                // 	document.uri,
                // 	range,
                // );
                // locations.push(location);
                // const position = new vscode.Position(line, 0);
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
                return item;
            }
            if (id == 1) {
                const line = element.line;
                const token = grammar.lines[line].tokens[element.tokenId];
                // const scope = token.scopes[token.scopes.length - 1];
                const scope = token.scopes.at(-1);
                const label = scope;
                const treeLabel = {
                    label: label,
                    // highlights: time >= 10 ? [[0, timeFixed.length]] : null,
                };
                const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.Collapsed);
                // Account for newlines in uncaptured tokens
                const newLineAdjust = token.scopes.length == 1 && (grammar.lines[line].tokens.length - 1 == element.tokenId) ? 1 : 0;
                item.description = token.startIndex + " - " + (token.endIndex - newLineAdjust);
                item.iconPath = new vscode.ThemeIcon('symbol-string');
                item.tooltip = document.lineAt(line).text.substring(token.startIndex, token.endIndex - newLineAdjust);
                // const location = new vscode.Location(
                // 	document.uri,
                // 	new vscode.Range(line, token.startIndex, line, token.endIndex),
                // );
                // const command: vscode.Command = {
                // 	title: `title`,
                // 	tooltip: `tooltip`,
                // 	command: 'editor.action.goToLocations',
                // 	arguments: [
                // 		document.uri,
                // 		new vscode.Position(line, token.startIndex),
                // 		[location],
                // 	]
                // };
                // item.command = command;
                return item;
            }
            if (id == 2) {
                const line = element.line;
                const token = grammar.lines[line].tokens[element.tokenId];
                const scope = token.scopes[element.scopeId];
                const label = scope;
                const treeLabel = {
                    label: label,
                };
                const item = new vscode.TreeItem(treeLabel, vscode.TreeItemCollapsibleState.None);
                return item;
            }
        }
    },
    getParent(element) {
        // vscode.window.showInformationMessage(JSON.stringify("getParent"));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        // console.log("getParent");
        // console.log(element);
        if (element.id == -1) {
            const parentElement = {
                document: element.document,
                id: -2,
            };
            return parentElement;
        }
        return undefined;
    },
    resolveTreeItem(item, element, token) {
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
let treeView;
async function initCallStackView(context) {
    // vscode.window.showInformationMessage(JSON.stringify("initCallStackView"));
    // context.subscriptions.push(vscode.commands.registerCommand("textmate.callstack", CallStackView, 'context'));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.refresh", refresh));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.find", find));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.file", gotoFile));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.goto.grammar", gotoGrammar));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.tree-view", () => changeView('tree')));
    context.subscriptions.push(vscode.commands.registerCommand("textmate.list-view", () => changeView('list')));
    changeView(callView);
    const options = {
        treeDataProvider: exports.TreeDataProvider,
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
exports.initCallStackView = initCallStackView;
async function CallStackView(textEditor, edit) {
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
    await treeView.reveal(undefined, {
        expand: true,
        focus: false,
        select: false,
    });
    await treeView.reveal({
        document: activeTextEditor.document,
        id: -2,
        type: 'tree',
    }, {
        expand: true,
        focus: false,
        select: false,
    });
    await treeView.reveal({
        document: activeTextEditor.document,
        id: -1,
        type: 'tree',
    }, {
        expand: 2,
        focus: true,
        select: true,
    });
    treeView.badge = {
        tooltip: "tooltip badge 56: is there any use for this number?",
        value: 56,
    };
    treeView.title = "new title";
}
function refresh(element) {
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
    onDidChangeTreeData.fire(undefined);
}
async function find(element) {
    vscode.window.showInformationMessage(JSON.stringify(element));
    await treeView.reveal(undefined, { focus: true });
    vscode.commands.executeCommand('list.find');
    // vscode.commands.executeCommand('list.toggleFindMode');
    // vscode.commands.executeCommand('list.toggleFindMatchType');
}
async function gotoGrammar(element) {
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
            const packageJSON = extension.packageJSON;
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
            const packageJSON = extension.packageJSON;
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
    let ruleId = 1;
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
                let captureIndex = 0;
                for (const captureIndice of rule.captureIndices) {
                    if (captureIndice.start == tokenStart && captureIndice.end >= tokenEnd) {
                        foundRule = true;
                        break;
                        // Should keep going if next token is identical. (((x))) => 3 not 1
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
        }
    }
    // vscode.window.showInformationMessage(JSON.stringify(ruleId));
    if (!ruleId) {
        return;
    }
    if (ruleId < 0) {
        ruleId = -ruleId;
    }
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
    const trees = (0, TreeSitter_1.getTrees)(grammarDoc);
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
    const range = (0, TreeSitter_1.toRange)(node);
    const uri = grammarDoc.uri;
    const location = new vscode.Location(uri, range);
    const locations = [location];
    vscode.commands.executeCommand('editor.action.goToLocations', uri, range.start, locations);
}
async function gotoFile(element) {
    // vscode.window.showInformationMessage(JSON.stringify("goto"));
    // vscode.window.showInformationMessage(JSON.stringify(args));
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
        vscode.commands.executeCommand('editor.action.goToLocations', document.uri, new vscode.Position(0, 0), [
            new vscode.Location(document.uri, new vscode.Range(0, 0, document.lineCount, 0))
        ]);
        return;
    }
    const line = element.line;
    if (element.type == 'tree') {
        const rule = grammar.rules[id];
        const start = rule.captureIndices[0].start;
        const end = rule.captureIndices[0].end;
        const location = new vscode.Location(document.uri, new vscode.Range(line - 1, start, line - 1, end));
        const position = new vscode.Position(line - 1, start);
        vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
        return;
    }
    if (element.type == 'list') {
        if (id == 0) {
            const range = new vscode.Range(line, 0, line + 1, 0);
            const location = new vscode.Location(document.uri, range);
            const position = new vscode.Position(line, 0);
            vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
            return;
        }
        if (id == 1) {
            const token = grammar.lines[line].tokens[element.tokenId];
            const location = new vscode.Location(document.uri, new vscode.Range(line, token.startIndex, line, token.endIndex));
            const position = new vscode.Position(line, token.startIndex);
            vscode.commands.executeCommand('editor.action.goToLocations', document.uri, position, [location]);
            return;
        }
    }
}
function allChildren(rules, ruleId, captureIndex) {
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
                const id = rules[key];
                if (id == ruleId) {
                    // return [];
                    return [{ id: id }];
                }
            default:
                break;
        }
    }
}
async function getGrammarDocument(document) {
    const lang = document.languageId;
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
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
async function getGrammarDocumentScopeName(scopeName) {
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
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
function changeView(view) {
    // vscode.window.showInformationMessage(JSON.stringify("changeView"));
    // vscode.window.showInformationMessage(JSON.stringify(view));
    vscode.commands.executeCommand('setContext', 'textmate.call.view', view);
    callView = view;
    refresh();
}

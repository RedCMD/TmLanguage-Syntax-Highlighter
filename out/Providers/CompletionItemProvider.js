"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionItemProvider = exports.triggerCharacters = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("../TreeSitter");
const themeScopeColors_1 = require("../themeScopeColors");
const triggerCharactersInclude = ['"', '#', '.', '$'];
const triggerCharactersScope = ['"', '.', '$', ' '];
const triggerCharactersRegex = ['\\', '(', '?', '<', '\''];
exports.triggerCharacters = [].concat(triggerCharactersInclude, triggerCharactersScope, triggerCharactersRegex);
exports.CompletionItemProvider = {
    async provideCompletionItems(document, position, token, context) {
        // vscode.window.showInformationMessage(JSON.stringify("Completions"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorQuery = `
			(include (value) @include)
			(name (value) @new_scope)
			(name (value (scope) @scope))
			;(regex) @regex
		`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(rootNode, cursorQuery, point);
        if (cursorCapture == null) {
            return;
        }
        const cursorNode = cursorCapture.node;
        const cursorRange = (0, TreeSitter_1.toRange)(cursorNode);
        const completionItems = [];
        const cursorName = cursorCapture.name;
        switch (cursorName) {
            case 'include':
                if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
                    if (triggerCharactersInclude.indexOf(context.triggerCharacter) == -1) {
                        return;
                    }
                }
                const rootPatternsQuery = `(json (patterns) @patterns)`;
                const rootPatternsText = (0, TreeSitter_1.queryNode)(tree.rootNode, rootPatternsQuery).pop()?.node?.text;
                const selfLabel = {
                    label: '$self',
                    description: 'Includes the current grammar file',
                };
                const selfDocumentation = new vscode.MarkdownString();
                selfDocumentation.appendCodeblock(rootPatternsText, 'json-textmate');
                const selfCompletionItem = {
                    label: selfLabel,
                    documentation: selfDocumentation,
                    kind: vscode.CompletionItemKind.Class,
                };
                completionItems.push(selfCompletionItem);
                const baseLabel = {
                    label: '$base',
                    description: 'Includes the highest parent grammar',
                };
                const baseCompletionItem = {
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
                    const rootScopeName = (0, TreeSitter_1.queryNode)(tree.rootNode, rootScopeNameQuery).pop()?.node?.text;
                    const rootScopeNameLabel = {
                        label: rootScopeName,
                        description: '$self',
                    };
                    const rootScopeNameCompletionItem = {
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
                                    const grammarTree = (0, TreeSitter_1.getTrees)(grammarDocument).jsonTree;
                                    repoCompletionItems(completionItems, grammarTree, cursorRange, cursorScopeName);
                                    if (cursorText == grammarScopeName) {
                                        const grammarPatternsText = (0, TreeSitter_1.queryNode)(grammarTree.rootNode, rootPatternsQuery).pop()?.node?.text;
                                        // grammarDocumentation.appendCodeblock(grammarPatternsText, 'json-textmate'); // if Word Wrap worked
                                        let grammarDocText;
                                        if (grammarDocument.lineCount == 1) {
                                            try {
                                                const parsedPatterns = JSON.parse('{' + grammarPatternsText + '}');
                                                grammarDocText = '"patterns": ' + JSON.stringify(parsedPatterns.patterns, null, 2).slice(0, 99900);
                                            }
                                            catch (error) {
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
                                const grammarLabel = {
                                    label: grammarScopeName,
                                    description: grammar.language,
                                };
                                const grammarCompletion = {
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
                if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
                    if (triggerCharactersScope.indexOf(context.triggerCharacter) == -1) {
                        return;
                    }
                }
                const themeScopes = await (0, themeScopeColors_1.getScopes)();
                for (const key in themeScopes) {
                    const scope = themeScopes[key];
                    const scopeLabel = {
                        label: key,
                        description: scope.name,
                    };
                    const standardTokenType = key.match(/\b(?:comment|string|regex|meta\.embedded)\b/);
                    const scopeCompletionItem = {
                        label: scopeLabel,
                        range: cursorName == 'scope' ? cursorRange : null,
                        kind: vscode.CompletionItemKind.Color,
                        detail: scope.foreground || scope.background,
                        documentation: 'Theme: ' + scope.theme + '\n' +
                            'Comment: ' + (scope.name ?? '') + '\n' +
                            'Foreground: ' + (scope.foreground ?? 'editor.foreground') + '\n' +
                            'Background: ' + (scope.background ?? 'editor.background') + '\n' +
                            'FontStyle: ' + (scope.fontStyle ?? '') + '\n' +
                            'StandardTokenType: ' + (standardTokenType ? (standardTokenType[0] == 'meta.embedded' ? 'other' : standardTokenType[0]) : ''),
                        // sortText: ' ' + key,
                    };
                    completionItems.push(scopeCompletionItem);
                }
                const scopes = [];
                const scopeQuery = `(name (value (scope) @scope (.not-match? @scope "^(\\\\$0*[0-9]{1,3})+$")))`;
                const scopeCaptures = (0, TreeSitter_1.queryNode)(rootNode, scopeQuery);
                for (const scopeCapture of scopeCaptures) {
                    const scope = scopeCapture.node.text;
                    scopes.push(scope);
                }
                const uniqueScopes = [...new Set(scopes)];
                for (const scope of uniqueScopes) {
                    if (themeScopes[scope]) {
                        continue;
                    }
                    const scopeLabel = {
                        label: scope,
                        // description: 'description',
                    };
                    const scopeCompletionItem = {
                        label: scopeLabel,
                        range: cursorName == 'scope' ? cursorRange : null,
                        kind: vscode.CompletionItemKind.Function,
                        // sortText: '' + scope,
                    };
                    completionItems.push(scopeCompletionItem);
                }
                const snippet = "\\${$1:/upcase}";
                // const snippet = "${${1:0,1,2,3,4,5,6,7,8,9}:/upcase}"
                const updowncaseLabel = {
                    label: '${0:/upcase}',
                    // description: 'description',
                };
                const updowncaseCompletionItem = {
                    label: updowncaseLabel,
                    range: cursorRange,
                    kind: vscode.CompletionItemKind.Function,
                    // sortText: '' + scope,
                    insertText: snippet,
                };
                completionItems.push(updowncaseCompletionItem);
                break;
            case 'regex':
                if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
                    if (triggerCharactersRegex.indexOf(context.triggerCharacter) == -1) {
                        return;
                    }
                }
                vscode.window.showInformationMessage(JSON.stringify(document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character))));
                const text = document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character));
                // switch (text) {
                // 	case '\\':
                const completionItemQuad = {
                    label: '\\\\\\\\',
                    kind: vscode.CompletionItemKind.Class
                };
                completionItems.push(completionItemQuad);
                const completionItemWhiteSpace = {
                    label: '\\\\s',
                    kind: vscode.CompletionItemKind.Class
                };
                completionItems.push(completionItemWhiteSpace);
                completionItems.push(new vscode.CompletionItem('\\\\w', vscode.CompletionItemKind.Class));
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
    }
};
function repoCompletionItems(completionItems, tree, cursorRange, scopeName) {
    const rootNode = tree.rootNode;
    const repoQuery = `(json (repository (repo (key) @rootRepo (.not-match? @rootRepo "^\\\\$(self|base)$"))))` +
        (scopeName ? `` :
            `(repo
				[(patterns) (include)] (repository
					(repo
						(key) @nestRepo (.not-match? @nestRepo "^\\\\$(self|base)$")))
				!match !begin)`);
    // const repoCaptures = queryNode(rootNode, repoQuery);
    const repoCaptures = scopeName ? (0, TreeSitter_1.queryNode)(rootNode, repoQuery) : (0, TreeSitter_1.queryNode)(rootNode, repoQuery, (0, TreeSitter_1.toPoint)(cursorRange.start), (0, TreeSitter_1.toPoint)(cursorRange.end));
    for (const repoCapture of repoCaptures) {
        const repoNode = repoCapture.node;
        const repoText = repoNode.text;
        const repoNodeParent = repoText ? repoNode.parent : repoNode.parent.parent; // Tree-sitter buggy on 0width nodes
        const commentQuery = `(comment (value) @comment (.not-eq? @comment ""))` +
            `(comment_slash (value) @comment (.not-eq? @comment ""))`;
        const commentText = (0, TreeSitter_1.queryNode)(repoNodeParent, commentQuery)[0]?.node?.text?.replace(/\\(.)?/g, '$1');
        const repoLabel = {
            label: (scopeName ?? '') + '#' + repoText,
            description: commentText,
        };
        const repoNodeParentText = repoNodeParent.text;
        let repoDocText;
        if (rootNode.startPosition.row == rootNode.endPosition.row) {
            try {
                const repoParsed = JSON.parse('{' + repoNodeParentText + '}');
                repoDocText = `"${repoText}": ` + JSON.stringify(repoParsed[repoText], null, 2).slice(0, 99900);
            }
            catch (error) {
                repoDocText = repoNodeParentText.slice(0, 1000); // How to enable Word Wrap?
            }
        }
        else {
            repoDocText = repoNodeParentText.slice(0, 99900);
        }
        const documentation = new vscode.MarkdownString();
        documentation.appendCodeblock(repoDocText, 'json-textmate');
        // documentation.appendCodeblock(parentRepoNodeText, 'json-textmate'); // if Word Wrap worked
        const repoCompletionItem = {
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

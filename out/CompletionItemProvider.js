"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionItemProvider = exports.triggerCharacters = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.triggerCharacters = ['"', '#', '.', '$'];
exports.CompletionItemProvider = {
    async provideCompletionItems(document, position, token, context) {
        // vscode.window.showInformationMessage(JSON.stringify("Completions"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorQuery = `(include (value) @include)`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, cursorQuery, point);
        if (cursorCapture == null) {
            return;
        }
        const cursorNode = cursorCapture.node;
        const cursorRange = (0, TreeSitter_1.toRange)(cursorNode);
        const completionItems = [];
        const rootPatternsQuery = `(json (patterns) @patterns)`;
        const rootPatternsText = (0, TreeSitter_1.queryNode)(tree.rootNode, rootPatternsQuery).pop()?.node?.text;
        const selfLabel = {
            label: '$self',
            description: 'Includes the current grammar file'
        };
        const selfDocumentation = new vscode.MarkdownString();
        selfDocumentation.appendCodeblock(rootPatternsText, 'json-textmate');
        const selfCompletionItem = {
            label: selfLabel,
            range: cursorRange,
            kind: vscode.CompletionItemKind.Class,
            documentation: selfDocumentation
        };
        completionItems.push(selfCompletionItem);
        completionItems.push(new vscode.CompletionItem({ label: '$base', description: 'Includes the highest parent grammar' }, vscode.CompletionItemKind.Class));
        repoCompletionItems(completionItems, tree, cursorRange);
        const cursorScopeName = cursorNode.childForFieldName('scopeName')?.text;
        if (cursorScopeName) {
            const rootScopeNameQuery = `(json (scopeName (value) @scopeName))`;
            const rootScopeName = (0, TreeSitter_1.queryNode)(tree.rootNode, rootScopeNameQuery).pop()?.node?.text;
            const rootScopeNameLabel = {
                label: rootScopeName,
                description: 'use $self instead'
            };
            const rootScopeNameCompletionItem = {
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
                            const grammarTree = (0, TreeSitter_1.getTree)(grammarDocument);
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
                                grammarDocumentation.appendCodeblock(grammarDocText, 'json-textmate');
                            }
                        }
                        else {
                            grammarDocumentation.appendCodeblock(JSON.stringify(grammar, null, 2), 'json');
                        }
                        const grammarLabel = {
                            label: grammarScopeName,
                            description: grammar.language
                        };
                        const grammarCompletion = {
                            label: grammarLabel,
                            range: cursorRange,
                            kind: vscode.CompletionItemKind.Field,
                            documentation: grammarDocumentation,
                            commitCharacters: ['#'],
                            command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' }
                        };
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
};
function repoCompletionItems(completionItems, tree, cursorRange, scopeName) {
    const rootNode = tree.rootNode;
    const repoQuery = `(json (repository (repo (key) @repo)))`;
    const repoCaptures = (0, TreeSitter_1.queryNode)(rootNode, repoQuery);
    for (const repoCapture of repoCaptures) {
        const repoNode = repoCapture.node;
        const repoText = repoNode.text;
        const parentRepoNode = repoText ? repoNode.parent : repoNode.parent.parent; // Tree-sitter buggy on 0width nodes
        const commentQuery = `(comment (value) @comment (.not-eq? @comment ""))` +
            `(comment_slash (value) @comment (.not-eq? @comment ""))`;
        const commentText = (0, TreeSitter_1.queryNode)(parentRepoNode, commentQuery)[0]?.node?.text;
        const repoLabel = {
            label: (scopeName ?? '') + '#' + repoText,
            description: commentText
        };
        const parentRepoNodeText = parentRepoNode.text;
        let repoDocText;
        if (rootNode.startPosition.row == rootNode.endPosition.row) {
            try {
                const parsedRepo = JSON.parse('{' + parentRepoNodeText + '}');
                repoDocText = `"${repoText}": ` + JSON.stringify(parsedRepo[repoText], null, 2).slice(0, 99900);
            }
            catch (error) {
                repoDocText = parentRepoNodeText.slice(0, 1000); // How to enable Word Wrap?
            }
        }
        else {
            repoDocText = parentRepoNodeText.slice(0, 99900);
        }
        const documentation = new vscode.MarkdownString();
        documentation.appendCodeblock(repoDocText, 'json-textmate');
        // documentation.appendCodeblock(parentRepoNodeText, 'json-textmate'); // if Word Wrap worked
        const repoCompletionItem = {
            label: repoLabel,
            range: cursorRange,
            kind: vscode.CompletionItemKind.Function,
            documentation: documentation
        };
        completionItems.push(repoCompletionItem);
    }
}

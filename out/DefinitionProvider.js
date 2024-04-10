"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
const extension_1 = require("./extension");
exports.DefinitionProvider = {
    async provideDefinition(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Definition"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));
        const cursorQuery = `
			(json (scopeName (value) @scopeName))
			(repo (key) @repo)
			(include (value) @include)
			(captures (capture (key) @capture))
			(beginCaptures (capture (key) @beginCapture))
			(endCaptures (capture (key) @endCapture))
			(whileCaptures (capture (key) @whileCapture))
			(name (value (scope (replace_capture) @replace)))
			(contentName (value (scope (replace_capture) @replace)))
			;(match (regex) @regex)
		`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, cursorQuery, point);
        // vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
        if (cursorCapture == null) {
            return;
        }
        const node = cursorCapture.node;
        // vscode.window.showInformationMessage(JSON.stringify(node));
        const originSelectionRange = (0, TreeSitter_1.toRange)(node);
        if (!originSelectionRange.contains(position)) {
            return;
        }
        const text = node.text;
        let queryString;
        // vscode.window.showInformationMessage(JSON.stringify(node.text));
        const uri = document.uri;
        const definitions = [];
        switch (cursorCapture.name) {
            case 'scopeName':
                for (const extension of vscode.extensions.all) {
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == text) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
                                await vscode.workspace.openTextDocument(uri);
                            }
                        }
                    }
                }
                const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
                if (uriPackage) {
                    await vscode.workspace.openTextDocument(uriPackage);
                }
                for (const textDocument of vscode.workspace.textDocuments) {
                    if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
                        continue;
                    }
                    try {
                        const packageJSON = await JSON.parse(textDocument.getText());
                        const grammars = packageJSON?.contributes?.grammars;
                        if (grammars) {
                            for (const grammar of grammars) {
                                if (grammar.scopeName == text) {
                                    const definitionLink = {
                                        originSelectionRange: originSelectionRange, // Underlined text
                                        targetUri: textDocument.uri,
                                        targetRange: new vscode.Range(0, 0, textDocument.lineCount, 1000), // Hover text
                                        targetSelectionRange: new vscode.Range(0, 0, textDocument.lineCount + 1, 0) // Highlighted text
                                    };
                                    definitions.push(definitionLink);
                                }
                            }
                        }
                    }
                    catch (error) {
                    }
                }
                break;
            case 'repo':
                if (text == '$self' || text == '$base') {
                    return;
                }
                // Call ReferenceProvider() (see at bottom)
                break;
            case 'include':
                if (node.childForFieldName('base')) { // $base
                    // Call ReferenceProvider() (see at bottom)
                    break;
                }
                queryString = `(json (scopeName (value) @scopeName))`;
                const rootScopeNameNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node ?? null;
                const rootScopeNameText = rootScopeNameNode?.text ?? '';
                const scopeName = node.childForFieldName('scopeName')?.text ?? '';
                const ruleName = node.childForFieldName('ruleName')?.text ?? '';
                queryString = `(json (patterns) @patterns)`;
                const rootPatternsNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                const rootPatternsRange = (0, TreeSitter_1.toRange)(rootPatternsNode);
                if ((node.childForFieldName('self') && !scopeName) || (scopeName == rootScopeNameText && !ruleName)) { // $self
                    if (rootPatternsNode == null) {
                        break;
                    }
                    const targetSelectionRange = rootPatternsRange.contains(originSelectionRange) ?
                        (0, TreeSitter_1.toRange)(rootPatternsNode.childForFieldName('key')) :
                        rootPatternsRange;
                    const locationLink = {
                        originSelectionRange: originSelectionRange, // Underlined text
                        targetUri: document.uri,
                        targetRange: rootPatternsRange, // Hover text
                        targetSelectionRange: targetSelectionRange // Highlighted text
                    };
                    definitions.push(locationLink);
                    break;
                }
                if (!scopeName || scopeName == rootScopeNameText) { // #include
                    queryString = `(repo
										[(patterns) (include)] (repository
											(repo
												(key) @repo (.eq? @repo "${ruleName}")))
										!match !begin)`;
                    const nestedRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, point, false)?.node;
                    if (nestedRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(nestedRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(nestedRepoNode) // Highlighted text
                        };
                        definitions.push(locationLink);
                        break;
                    }
                    queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                    const rootRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                    if (rootRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(rootRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(rootRepoNode) // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                    break;
                }
                for (const extension of vscode.extensions.all) { // other
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == scopeName) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
                                const document = await vscode.workspace.openTextDocument(uri);
                                vscode.languages.setTextDocumentLanguage(document, 'json-textmate');
                            }
                        }
                    }
                }
                for (const textDocument of vscode.workspace.textDocuments) { // other#include
                    if (!vscode.languages.match(extension_1.DocumentSelector, textDocument)) {
                        continue;
                    }
                    const documentTree = (0, TreeSitter_1.getTree)(textDocument);
                    queryString = `(json (scopeName (value) @scopeName (.eq? @scopeName "${scopeName}")))`;
                    const documentScopeNameNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                    if (documentScopeNameNode) {
                        if (ruleName) { // source.other#include
                            queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                            const repoNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            if (repoNode) {
                                const locationLink = {
                                    originSelectionRange: originSelectionRange, // Underlined text
                                    targetUri: textDocument.uri,
                                    targetRange: (0, TreeSitter_1.toRange)(repoNode.parent), // Hover text
                                    targetSelectionRange: (0, TreeSitter_1.toRange)(repoNode) // Highlighted text
                                };
                                definitions.push(locationLink);
                            }
                        }
                        else { // source.other
                            queryString = `(json (patterns) @patterns)`;
                            const documentPatternsNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            const locationLink = {
                                originSelectionRange: originSelectionRange, // Underlined text
                                targetUri: textDocument.uri,
                                targetRange: (0, TreeSitter_1.toRange)(documentPatternsNode), // Hover text
                                targetSelectionRange: (0, TreeSitter_1.toRange)(documentScopeNameNode) // Highlighted text
                            };
                            definitions.push(locationLink);
                        }
                    }
                }
                break;
            case 'replace':
                const nameNode = node.parent.parent.parent;
                const quadParent = nameNode.parent;
                const replaceGroup = (nameNode.type == 'name' ? getRegexGroup(trees, quadParent, node, 'match') : null) ?? getRegexGroup(trees, quadParent, node, 'begin');
                if (pushDefinitionLink(definitions, replaceGroup, originSelectionRange, uri)) {
                    break;
                }
                const quintParent = quadParent.parent;
                const sextParent = quintParent.parent;
                if (quintParent.type == 'captures') {
                    const matchReplaceGroup = getRegexGroup(trees, sextParent, node, 'match');
                    if (pushDefinitionLink(definitions, matchReplaceGroup, originSelectionRange, uri)) {
                        break;
                    }
                    if (!sextParent.childForFieldName('begin')) {
                        break;
                    }
                    if (!(0, TreeSitter_1.getLastNode)(sextParent, 'beginCaptures')) {
                        const beginReplaceGroup = getRegexGroup(trees, sextParent, node, 'begin');
                        pushDefinitionLink(definitions, beginReplaceGroup, originSelectionRange, uri);
                    }
                    if (sextParent.childForFieldName('while')) {
                        if (!sextParent.childForFieldName('whileCaptures')) {
                            const whileReplaceGroup = getRegexGroup(trees, sextParent, node, 'while');
                            pushDefinitionLink(definitions, whileReplaceGroup, originSelectionRange, uri);
                        }
                        break;
                    }
                    if (sextParent.childForFieldName('end')) {
                        if (!sextParent.childForFieldName('endCaptures')) {
                            const endReplaceGroup = getRegexGroup(trees, sextParent, node, 'end');
                            pushDefinitionLink(definitions, endReplaceGroup, originSelectionRange, uri);
                        }
                    }
                    break;
                }
                if (quintParent.type == 'beginCaptures') {
                    const beginReplaceGroup = getRegexGroup(trees, sextParent, node, 'begin');
                    if (pushDefinitionLink(definitions, beginReplaceGroup, originSelectionRange, uri)) {
                        break;
                    }
                }
                if (quintParent.type == 'endCaptures') {
                    const endReplaceGroup = getRegexGroup(trees, sextParent, node, 'end');
                    if (pushDefinitionLink(definitions, endReplaceGroup, originSelectionRange, uri)) {
                        break;
                    }
                }
                if (quintParent.type == 'whileCaptures') {
                    const whileReplaceGroup = getRegexGroup(trees, sextParent, node, 'while');
                    if (pushDefinitionLink(definitions, whileReplaceGroup, originSelectionRange, uri)) {
                        break;
                    }
                }
                break;
            case 'capture':
                const tripleParent = node.parent.parent.parent;
                if (tripleParent.childForFieldName('match')) {
                    const matchGroup = getRegexGroup(trees, tripleParent, node, 'match');
                    const groupRange = (0, TreeSitter_1.toRange)(matchGroup);
                    const locationLink = {
                        originSelectionRange: originSelectionRange, // Underlined text
                        targetUri: document.uri,
                        targetRange: groupRange, // Hover text
                        targetSelectionRange: groupRange // Highlighted text
                    };
                    definitions.push(locationLink);
                    break;
                }
                if (!tripleParent.childForFieldName('begin')) {
                    break;
                }
                if (!(0, TreeSitter_1.getLastNode)(tripleParent, 'beginCaptures')) {
                    const beginGroup = getRegexGroup(trees, tripleParent, node, 'begin');
                    if (beginGroup) {
                        const groupRange = (0, TreeSitter_1.toRange)(beginGroup);
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: groupRange, // Hover text
                            targetSelectionRange: groupRange // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                }
                if (tripleParent.childForFieldName('while')) {
                    if (!tripleParent.childForFieldName('whileCaptures')) {
                        const whileNode = getRegexGroup(trees, tripleParent, node, 'while');
                        if (whileNode) {
                            const groupRange = (0, TreeSitter_1.toRange)(whileNode);
                            const locationLink = {
                                originSelectionRange: originSelectionRange, // Underlined text
                                targetUri: document.uri,
                                targetRange: groupRange, // Hover text
                                targetSelectionRange: groupRange // Highlighted text
                            };
                            definitions.push(locationLink);
                        }
                    }
                    break;
                }
                if (!tripleParent.childForFieldName('endCaptures')) {
                    const endGroup = getRegexGroup(trees, tripleParent, node, 'end');
                    if (endGroup) {
                        const groupRange = (0, TreeSitter_1.toRange)(endGroup);
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: groupRange, // Hover text
                            targetSelectionRange: groupRange // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                }
                break;
            case 'beginCapture':
                const beginGroupRange = getRegexGroup(trees, node.parent.parent.parent, node, 'while');
                pushDefinitionLink(definitions, beginGroupRange, originSelectionRange, uri);
                // const beginGroupRange = toRange(getRegexGroup(trees, node.parent.parent.parent, node, 'begin'));
                // const beginLocationLink: vscode.DefinitionLink = {
                // 	originSelectionRange: originSelectionRange, // Underlined text
                // 	targetUri: document.uri,
                // 	targetRange: beginGroupRange, // Hover text
                // 	targetSelectionRange: beginGroupRange // Highlighted text
                // }
                // definitions.push(beginLocationLink);
                break;
            case 'endCapture':
                const endGroupRange = getRegexGroup(trees, node.parent.parent.parent, node, 'while');
                pushDefinitionLink(definitions, endGroupRange, originSelectionRange, uri);
                // const endGroupRange = toRange(getRegexGroup(trees, node.parent.parent.parent, node, 'end'));
                // const endLocationLink: vscode.DefinitionLink = {
                // 	originSelectionRange: originSelectionRange, // Underlined text
                // 	targetUri: document.uri,
                // 	targetRange: endGroupRange, // Hover text
                // 	targetSelectionRange: endGroupRange // Highlighted text
                // }
                // definitions.push(endLocationLink);
                break;
            case 'whileCapture':
                const whileReplaceGroup = getRegexGroup(trees, node.parent.parent.parent, node, 'while');
                pushDefinitionLink(definitions, whileReplaceGroup, originSelectionRange, uri);
                break;
            case 'regex':
                const regexGroupRefs = getCaptureRefs(trees, node, position);
                if (!regexGroupRefs) {
                    return;
                }
                for (const capture of regexGroupRefs.captures) {
                    const targetRange = (0, TreeSitter_1.toRange)(capture.node);
                    const regexLocationLink = {
                        originSelectionRange: regexGroupRefs.range, // Underlined text
                        targetUri: document.uri,
                        targetRange: targetRange, // Hover text
                        targetSelectionRange: targetRange // Highlighted text
                    };
                    definitions.push(regexLocationLink);
                }
                return definitions;
            default:
                return;
        }
        if (definitions.length == 0) {
            // vscode will automatically run the ReferenceProvider() if the only location overlaps with the input
            pushDefinitionLink(definitions, node.parent, originSelectionRange, uri);
        }
        // vscode.window.showInformationMessage(JSON.stringify(definitions));
        return definitions;
    }
};
function pushDefinitionLink(definitions, node, originSelectionRange, uri) {
    if (!node) {
        return false;
    }
    const targetRange = (0, TreeSitter_1.toRange)(node);
    const locationLink = {
        originSelectionRange: originSelectionRange, // Underlined text
        targetUri: uri, // Target doc
        targetRange: targetRange, // Hover text
        targetSelectionRange: targetRange // Highlighted text
    };
    definitions.push(locationLink);
    return true;
}
function getCaptureRefs(trees, node, position) {
    const regexTrees = trees.regexTrees;
    const regexNode = regexTrees[node.id]?.rootNode;
    const captureGroupQuery = `
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
    let groupNode;
    const groupCaptures = (0, TreeSitter_1.queryNode)(regexNode, captureGroupQuery);
    let index = groupCaptures.length;
    while (groupCaptures.length) {
        const captureNode = groupCaptures.pop().node;
        if ((0, TreeSitter_1.toRange)(captureNode).contains(position)) {
            groupNode = captureNode;
            break;
        }
        index--;
    }
    vscode.window.showInformationMessage(JSON.stringify(index));
    if (!groupNode) {
        return;
    }
    const groupSyntaxQuery = `
		"(" @open
		")" @close
		"(?<" @open
		"(?'" @open
		">" @close
		"'" @close
		(name) @name
	`;
    // const startPoint = toPoint(new vscode.Position(position.line, position.character - 1));
    const startPoint = { row: position.line, column: position.character - 1 };
    // const endPoint = toPoint(new vscode.Position(position.line, position.character + 1));
    const endPoint = { row: position.line, column: position.character + 1 };
    const groupSyntaxNode = (0, TreeSitter_1.queryNode)(groupNode, groupSyntaxQuery, startPoint, endPoint).pop()?.node;
    if (!groupSyntaxNode) {
        return;
    }
    const targetQuery = `
		;(regex (subroutine (number)) @subroutine)
		(regex (subroutine (number)) @subroutine (#eq? @subroutine "\\\\\\\\g<${index}>"))
	`;
    const targetCaptures = (0, TreeSitter_1.queryNode)(regexNode, targetQuery);
    vscode.window.showInformationMessage(JSON.stringify(regexNode.toString()));
    vscode.window.showInformationMessage(JSON.stringify(targetCaptures));
    return { range: (0, TreeSitter_1.toRange)(groupNode), captures: targetCaptures };
}
function getRegexGroup(trees, parentNode, captureNode, type) {
    const node = (0, TreeSitter_1.getLastNode)(parentNode, type);
    if (!node) {
        return;
    }
    const regexTrees = trees.regexTrees;
    const id = node.childForFieldName('regex').id;
    const regexNode = regexTrees[id]?.rootNode;
    const index = parseInt(captureNode.text.replace('$', '')); // Ignores random characters after the first numerics, just like VSCode TextMate
    if (index == 0) {
        return regexNode;
    }
    const query = `
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
    const captures = (0, TreeSitter_1.queryNode)(regexNode, query);
    return captures[index - 1]?.node;
}

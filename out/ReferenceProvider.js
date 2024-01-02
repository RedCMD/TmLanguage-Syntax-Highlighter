"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.ReferenceProvider = {
    provideReferences(document, position, context, token) {
        // vscode.window.showInformationMessage(JSON.stringify("references"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        let queryString;
        // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));
        queryString =
            `(` +
                `	[` +
                // `		(json (scopeName (value) @scopeName))` +
                `		(include (value) @include)` +
                `		(repo (key) @repo)` +
                `	]` +
                `)`;
        const referenceQueryCapture = (0, TreeSitter_1.queryForPosition)(tree, queryString, point);
        if (referenceQueryCapture == null) {
            return;
        }
        const node = referenceQueryCapture.node;
        const text = node.text;
        // vscode.window.showInformationMessage(JSON.stringify(node.toString()));
        queryString =
            `(` +
                `	json (scopeName (value) @scopeName) ` +
                `)`;
        const rootScopeName = (0, TreeSitter_1.queryForPosition)(tree, queryString)?.node?.text;
        switch (referenceQueryCapture.name) {
            case 'repo':
                if (text == '$self' || text == '$base') {
                    return;
                }
                queryString =
                    `(include (value) @include (#eq? @include "#${text}"))` +
                        `(repo (key) @repo (#eq? @repo "${text}"))`;
                if (rootScopeName && text)
                    queryString += `(include (value) @include (#eq? @include "${rootScopeName}#${text}"))`;
                break;
            case 'include': // move to own function. Can be used for code-lens and symbol-highlight etc
                /*
                                        *fail
                #invalid				*fail
                invalid					*fail
                invalid#				*fail
                invalid#$self			*fail
                invalid#$base			*fail
                invalid#invalid			*fail
                $self					$self
                #$self					$self
                source.same				$self
                source.same#			$self
                source.same#$self		$self
                $base					$base
                #$base					$base
                source.same#$base		$base
                source.other#$base		$base
                #						#include
                #include				#include
                source.same#include		#include
                source.other			other
                source.other#			other
                source.other#$self		other
                source.other#include	other#include
                */
                if (text == '') { // *fail
                    // vscode.window.showInformationMessage("*fail");
                    return;
                }
                if (node.childForFieldName('base')) { // $base
                    // vscode.window.showInformationMessage("$base");
                    queryString = `(include (value) @include (#match? @include "^([^#]*#)?\\\\$base$"))`;
                }
                else {
                    const scopeName = node.childForFieldName('scopeName')?.text;
                    const ruleName = node.childForFieldName('ruleName')?.text;
                    if (scopeName && scopeName != rootScopeName) {
                        if (ruleName) { // other#include
                            // vscode.window.showInformationMessage("other#include");
                            queryString = `(include (value) @include (#eq? @include "${scopeName}#${ruleName}"))`;
                        }
                        else { // other
                            // vscode.window.showInformationMessage("other");
                            queryString =
                                `(include (value) @include (#eq? @include "${scopeName}"))` +
                                    `(include (value) @include (#eq? @include "${scopeName}#"))` +
                                    `(include (value) @include (#eq? @include "${scopeName}#$self"))`;
                        }
                    }
                    else if (node.childForFieldName('self') || (scopeName && !ruleName)) { // $self
                        // vscode.window.showInformationMessage("$self");
                        queryString =
                            `(include (value) @include (#match? @include "^#?\\\\$self$"))`;
                        if (rootScopeName) {
                            queryString +=
                                `(include (value) @include (#eq? @include "${rootScopeName}"))` +
                                    `(include (value) @include (#eq? @include "${rootScopeName}#"))` +
                                    `(include (value) @include (#eq? @include "${rootScopeName}#$self"))`;
                        }
                    }
                    else { // #include
                        // vscode.window.showInformationMessage("#include");
                        queryString =
                            `(include (value) @include (#eq? @include "#${ruleName}"))` +
                                `(repo (key) @repo (#eq? @repo "${ruleName}"))`;
                        if (ruleName) {
                            queryString += `(include (value) @include (#eq? @include "${rootScopeName}#${ruleName}"))`;
                        }
                    }
                }
                break;
            default:
                return;
        }
        // vscode.window.showInformationMessage(queryString);
        const language = tree.getLanguage();
        const query = language.query(queryString);
        const queryCaptures = query.captures(tree.rootNode);
        const locations = [];
        const uri = document.uri;
        for (const queryCapture of queryCaptures) {
            if (queryCapture.name == 'include') {
                const range = (0, TreeSitter_1.toRange)(queryCapture.node); // .parent?
                const location = new vscode.Location(uri, range);
                locations.push(location);
            }
        }
        // if (referenceQueryCapture.name == 'repo' && locations.length == 0) {
        // 	const range = toRange(node); // .parent?
        // 	const location = new vscode.Location(uri, range);
        // 	locations.push(location);
        // }
        if (( /* referenceQueryCapture.name == 'repo' && */locations.length == 0) ||
            (referenceQueryCapture.name == 'include' && locations.length <= 1)) {
            for (const queryCapture of queryCaptures) {
                if (queryCapture.name == 'repo') {
                    const range = (0, TreeSitter_1.toRange)(queryCapture.node); // .parent?
                    const location = new vscode.Location(uri, range);
                    locations.push(location);
                }
            }
        }
        // vscode.window.showInformationMessage(JSON.stringify(locations));
        return locations;
    }
};

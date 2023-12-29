"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
exports.ReferenceProvider = {
    async provideReferences(document, position, context, token) {
        // vscode.window.showInformationMessage(JSON.stringify("references"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        const node = tree.rootNode.namedDescendantForPosition(point);
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
        source.other			other.$self
        source.other#			other.$self
        source.other#$self		other.$self
        source.other#include	other.#include
        */
        let queryString;
        const language = tree.getLanguage();
        const rootScopeNameQuery = language.query(`(` +
            `	json (scopeName (value) @scopeName) ` +
            `)`);
        const scopeNameQueryCaptures = rootScopeNameQuery.captures(tree.rootNode);
        const rootScopeName = scopeNameQueryCaptures[0]?.node.text;
        if (node.type == 'key' && node.parent.type == 'repo') {
            const text = node.text;
            if (text == '$self' || text == '$base') {
                return;
            }
            queryString = `(include (value) @include (#eq? @include "#${text}"))`;
            if (rootScopeName != null)
                queryString += `(include (value) @include (#eq? @include "${rootScopeName}#${text}"))`;
        }
        else if (node.type == 'value' && node.parent.type == 'include') {
            const text = node.text;
            if (text == '') { // *fail
                return;
            }
            const indexOfSharp = node.text.indexOf("#");
            const scopeName = indexOfSharp < 0 ? text : text.substring(0, indexOfSharp);
            const ruleName = indexOfSharp < 0 ? '' : text.substring(indexOfSharp + 1);
            if (ruleName == '$base') { // $base
                queryString = `(include (value) @include (#match? @include "^([^#]*#)?\\\\$base$"))`;
            }
            else if (scopeName != '' && scopeName != rootScopeName && (ruleName == '' || ruleName == '$self')) { // other.$self
                queryString = `(include (value) @include (#match? @include "^${scopeName}(#(\\\\$self)?)?$"))`;
            }
        }
        else {
            return;
        }
        vscode.window.showInformationMessage(JSON.stringify(queryString));
        const query = language.query(queryString);
        const queryCaptures = query.captures(tree.rootNode);
        const locations = [];
        const uri = document.uri;
        for (const queryCapture of queryCaptures) {
            const range = (0, TreeSitter_1.toRange)(queryCapture.node); // .parent?
            const location = new vscode.Location(uri, range);
            locations.push(location);
        }
        vscode.window.showInformationMessage(JSON.stringify(locations));
        return locations;
    }
};

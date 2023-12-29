import * as vscode from 'vscode';
import { getTree, toRange, toPoint } from "./TreeSitter";
import Parser = require('web-tree-sitter');

export const ReferenceProvider = {
	async provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken) {
		// vscode.window.showInformationMessage(JSON.stringify("references"));
		const tree = getTree(document);
		const point = toPoint(position);
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
		let queryString: string;
		
		const language = tree.getLanguage();
		const rootScopeNameQuery = language.query(
			`(` +
			`	json (scopeName (value) @scopeName) ` + 
			`)`
		);
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
		const locations: vscode.ProviderResult<vscode.Location[]> = [];
		const uri = document.uri;

		for (const queryCapture of queryCaptures) {
			const range = toRange(queryCapture.node); // .parent?
			const location = new vscode.Location(uri, range);
			locations.push(location);
		}

		vscode.window.showInformationMessage(JSON.stringify(locations));
		return locations
	}
}
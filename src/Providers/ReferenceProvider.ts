import * as vscode from 'vscode';
import { getTrees, toRange, toPoint, queryNode } from "../TreeSitter";


export const ReferenceProvider: vscode.ReferenceProvider = {
	provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.Location[] | undefined {
		// vscode.window.showInformationMessage(JSON.stringify("references"));
		const tree = getTrees(document).jsonTree;
		const point = toPoint(position);
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));

		const cursorQuery = `;scm
			;(json (scopeName (value) @scopeName))
			(include (value) @include)
			(repo (key) @repo)
		`;
		const cursorQueryCapture = queryNode(tree.rootNode, cursorQuery, point);
		if (cursorQueryCapture == null) {
			return;
		}
		const cursorNode = cursorQueryCapture.node;
		const cursorText = cursorNode.text;
		// vscode.window.showInformationMessage(JSON.stringify(node.toString()));

		const rootScopeNameQuery = `(json (scopeName (value) @scopeName))`;
		const rootScopeName = queryNode(tree.rootNode, rootScopeNameQuery).pop()?.node?.text ?? '';

		let queryString: string;
		switch (cursorQueryCapture.name) {
			case 'repo':
				if (cursorText == '$self' || cursorText == '$base') {
					return;
				}
				queryString = `;scm
					(include
						(value
							(scopeName)? @_scopeName (#eq? @_scopeName "${rootScopeName}")
							(ruleName) @_ruleName (#eq? @_ruleName "${cursorText}")
						) @include
					)
				`;
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
				if (cursorText == '') { // *fail
					// vscode.window.showInformationMessage("*fail");
					return;
				}

				if (cursorNode.childForFieldName('base')) { // $base
					// vscode.window.showInformationMessage("$base");
					queryString = `(include (value) @include (#match? @include "^([^#]*#)?\\\\$base$"))`;
				}
				else {
					const scopeName = cursorNode.childForFieldName('scopeName')?.text;
					const ruleName = cursorNode.childForFieldName('ruleName')?.text;
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
					else if (cursorNode.childForFieldName('self') || (scopeName && !ruleName)) { // $self
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
		const locations: vscode.Location[] = [];
		const uri = document.uri;

		for (const queryCapture of queryCaptures) {
			if (queryCapture.name == 'include') {
				const range = toRange(queryCapture.node); // .parent?
				const location = new vscode.Location(uri, range);
				locations.push(location);
			}
		}

		// if (referenceQueryCapture.name == 'repo' && locations.length == 0) {
		// 	const range = toRange(node); // .parent?
		// 	const location = new vscode.Location(uri, range);
		// 	locations.push(location);
		// }


		if ((/* referenceQueryCapture.name == 'repo' && */ locations.length == 0) ||
			(cursorQueryCapture.name == 'include' && locations.length <= 1)) {
			for (const queryCapture of queryCaptures) {
				if (queryCapture.name == 'repo') {
					const range = toRange(queryCapture.node); // .parent?
					const location = new vscode.Location(uri, range);
					locations.push(location);
				}
			}
		}

		// vscode.window.showInformationMessage(JSON.stringify(locations));
		return locations;
	}
};

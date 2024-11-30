import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange } from "../TreeSitter";

export const DocumentHighlightProvider: vscode.DocumentHighlightProvider = {
	provideDocumentHighlights(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.DocumentHighlight[] | undefined {
		// vscode.window.showInformationMessage(JSON.stringify("DocumentHighlights"));
		// const start = performance.now();
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;
		const point = toPoint(position);

		const cursorQuery = `;scm
			(key) @key
			(value !scopeName !ruleName !self !base) @value
			(capture . (key) @key)
			(repo . (key) @repo)
			(json (scopeName (value) @rootScopeName))
			(include (value (scopeName) !ruleName !base) @scopeName)
			(include (value (ruleName)) @include)
			(include (value !scopeName (self) @self))
			(include (value (base) @base))
			(name (value (scope) @scope))
		`;
		const cursorCapture = queryNode(jsonTree.rootNode, cursorQuery, point);
		// vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
		if (!cursorCapture) {
			return;
		}

		const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		// const cursorRange = toRange(cursorNode);


		// const scopeName = cursorNode.parent.childForFieldName('scopeName')?.text; 
		const rootScopeName = queryNode(jsonTree.rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;


		let query = ``;
		switch (cursorName) {
			case 'key':
				const cursorType = cursorNode.parent!.type;
				if (cursorType != 'repo') {
					query = `(${cursorType} . (key) @key (#eq? @key "${cursorText}"))`;
					break;
				}
			// FallThrough
			case 'repo':
				query = `;scm
					(repo (key) @repo (#eq? @repo "${cursorText}"))
					(include
						(value
							(scopeName)? @_scopeName (#eq? @_scopeName "${rootScopeName}")
							(ruleName) @_ruleName (#eq? @_ruleName "${cursorText}")
						) @include
					)
				`;
				break;
			case 'value':
				query = `(_ (value) @value (#eq? @value "${cursorText}"))`;
				break;
			case 'self':
			case 'rootScopeName':
				query = `(json (scopeName (value) @scopeName))`;
				query += `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${rootScopeName}") !ruleName !base) @include)`;
				query += `(include (value (self) !scopeName) @self)`;
				break;
			case 'base':
				query = `(include (value (base)) @base)`;
				break;
			case 'scopeName':
				const scopeName = cursorNode.childForFieldName('scopeName')?.text;
				query = `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${scopeName}") !ruleName !base) @include)`;
				if (scopeName == rootScopeName) {
					query += `(json (scopeName (value) @scopeName))`;
					query += `(include (value (self) !scopeName) @self)`;
				}
				break;
			case 'include':
				const scopeName2 = cursorNode.childForFieldName('scopeName')?.text;
				const ruleName = cursorNode.childForFieldName('ruleName')?.text;
				if (!scopeName2 || scopeName2 == rootScopeName) {
					query = `(include (value (scopeName)? @_scopeName (#eq? @_scopeName "${scopeName2 ?? rootScopeName}") (ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")) @include)`;
					query += `(repo (key) @repo (#eq? @repo "${ruleName}"))`;
				}
				else {
					query = `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${scopeName2}") (ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")) @include)`;
				}
				break;
			case 'scope':
				query = `(name (value (scope) @scope (#eq? @scope "${cursorText}")))`;
				break;
			default:
				return;
		}

		const documentHighlights: vscode.DocumentHighlight[] = [];
		const queryCaptures = queryNode(jsonTree.rootNode, query);
		for (const queryCapture of queryCaptures) {
			if (queryCapture.name.charAt(0) == '_') {
				// Ignore internal use captures
				continue;
			}
			const node = queryCapture.node;
			const range = toRange(node);
			const documentHighlight = new vscode.DocumentHighlight(range, vscode.DocumentHighlightKind.Read);
			documentHighlights.push(documentHighlight);
		}

		// vscode.window.showInformationMessage(`documentHighlights ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(documentHighlights)}`);
		return documentHighlights;
	}
};

import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange } from "../TreeSitter";


export const DocumentHighlightProvider: vscode.DocumentHighlightProvider = {
	provideDocumentHighlights(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.DocumentHighlight[] | undefined {
		// vscode.window.showInformationMessage(`DocumentHighlights ${JSON.stringify(position)}\n${JSON.stringify(document)}`);
		// const start = performance.now();
		const trees = getTrees(document);
		const rootNode = trees.jsonTree.rootNode;
		const point = toPoint(position);

		const cursorQuery = `;scm
			(capture . (key) @key)
			(repo . (key) @repo)
			(json (scopeName (value) @rootScopeName))
			(include (value (scopeName) @scopeName !ruleName !base))
			(include (value (ruleName)) @include)
			(include (value !scopeName (self) @self))
			(include (value (base) @base))
			(name (value (scope) @name))
			(contentName (value (scope) @name))
			(injectionSelector (value (scope) @injection))
			(injection (key (scope) @injection))
		`;
		const fallbackQuery = `;scm
			(key) @key
			(value !scopeName !ruleName !self !base) @value
		`;
		const cursorCapture = queryNode(rootNode, cursorQuery, point) || queryNode(rootNode, fallbackQuery, point);
		// vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
		if (!cursorCapture) {
			return;
		}

		const cursorName = cursorCapture.name;
		const cursorNode = cursorCapture.node;
		const cursorText = cursorNode.text;
		// const cursorRange = toRange(cursorNode);


		// const scopeName = cursorNode.parent.childForFieldName('scopeName')?.text; 
		const rootScopeName = queryNode(rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;


		let query = ``;
		switch (cursorName) {
			case 'key':
				const cursorType = cursorNode.parent!.type;
				query = `;scm
					(${cursorType} . (key) @key (#eq? @key "${cursorText}"))
				`;
				break;
			case 'value':
				query = `;scm
					((value) @value (#eq? @value "${cursorText}"))
				`;
				break;
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
			case 'self':
			case 'rootScopeName':
				query = `;scm
					(json (scopeName (value) @scopeName))
					(include (value (scopeName) @scopeName (#eq? @scopeName "${rootScopeName}") !base))
					(include (value (self) !scopeName) @self)
					(injectionSelector (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injection (key (scope) @scope (#eq? @scope "${cursorText}")))
				`;
				break;
			case 'base':
				query = `;scm
					(include (value (base)) @base)
				`;
				break;
			case 'scopeName':
				query = `;scm
					(include (value (scopeName) @scopeName (#eq? @scopeName "${cursorText}") !base))
					(injectionSelector (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injection (key (scope) @scope (#eq? @scope "${cursorText}")))
				`;
				if (cursorText == rootScopeName) {
					query += `;scm
						(json (scopeName (value) @scopeName))
						(include (value (self) !scopeName) @self)
					`;
				}
				break;
			case 'include':
				const scopeName = cursorNode.childForFieldName('scopeName')?.text || '';
				const ruleName = cursorNode.childForFieldName('ruleName')?.text || '';
				if (!scopeName || scopeName == rootScopeName) {
					query = `;scm
						(include
							(value
								(scopeName)? @_scopeName (#eq? @_scopeName "${scopeName || rootScopeName}")
								(ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")
							) @include
						)
						(repo (key) @repo (#eq? @repo "${ruleName}"))
					`;
				}
				else {
					query = `;scm
						(include
							(value
								(scopeName) @_scopeName (#eq? @_scopeName "${scopeName}")
								(ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")
							) @include
						)
					`;
				}
				break;
			case 'name':
				query = `;scm
					(name (value (scope) @scope (#eq? @scope "${cursorText}")))
					(contentName (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injectionSelector (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injection (key (scope) @scope (#eq? @scope "${cursorText}")))
				`;
				break;
			case 'injection':
				query = `;scm
					(name (value (scope) @scope (#eq? @scope "${cursorText}")))
					(contentName (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injectionSelector (value (scope) @scope (#eq? @scope "${cursorText}")))
					(injection (key (scope) @scope (#eq? @scope "${cursorText}")))
					(include (value (scopeName) @scopeName (#eq? @scopeName "${cursorText}") !base))
					(json (scopeName (value) @scopeName (#eq? @scopeName "${cursorText}")))
				`;
				break;
			default:
				return;
		}

		const documentHighlights: vscode.DocumentHighlight[] = [];
		const queryCaptures = queryNode(rootNode, query);
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

		// vscode.window.showInformationMessage(`documentHighlights ${(performance.now() - start).toFixed(3)}ms\n${query}\n${JSON.stringify(documentHighlights)}`);
		return documentHighlights;
	}
};

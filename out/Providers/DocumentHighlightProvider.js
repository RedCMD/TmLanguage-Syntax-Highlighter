"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentHighlightProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("../TreeSitter");
exports.DocumentHighlightProvider = {
    provideDocumentHighlights(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("DocumentHighlights"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorQuery = `
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
        const cursorCapture = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, cursorQuery, point);
        if (!cursorCapture) {
            return;
        }
        const cursorName = cursorCapture.name;
        const cursorNode = cursorCapture.node;
        const cursorText = cursorNode.text;
        // const cursorRange = toRange(cursorNode);
        // const scopeName = cursorNode.parent.childForFieldName('scopeName')?.text;
        const rootScopeName = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;
        let query = ``;
        switch (cursorName) {
            case 'key':
                const cursorType = (0, TreeSitter_1.trueParent)(cursorNode).type;
                // const cursorType = cursorText ? cursorNode.parent.type : cursorNode.parent.parent.type;
                query = `(${cursorType} . (key) @key (#eq? @key "${cursorText}"))`;
                break;
            case 'value':
                query = `(_ (value) @value (#eq? @value "${cursorText}"))`;
                break;
            case 'repo':
                query = `(repo (key) @repo (#eq? @repo "${cursorText}"))`;
                query += `(include (value (scopeName)? @_scopeName (#eq? @_scopeName "${rootScopeName}") (ruleName) @_ruleName (#eq? @_ruleName "${cursorText}")) @include)`;
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
        const documentHighlights = [];
        const queryCaptures = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, query);
        for (const queryCapture of queryCaptures) {
            if (queryCapture.name.charAt(0) == '_') {
                // Ignore internal use captures
                continue;
            }
            const node = queryCapture.node;
            const range = (0, TreeSitter_1.toRange)(node);
            const documentHighlight = new vscode.DocumentHighlight(range, vscode.DocumentHighlightKind.Read);
            documentHighlights.push(documentHighlight);
        }
        // vscode.window.showInformationMessage(JSON.stringify(documentHighlights));
        return documentHighlights;
    }
};

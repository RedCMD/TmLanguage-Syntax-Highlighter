"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHierarchyProvider = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
const DocumentSymbolProvider_1 = require("./DocumentSymbolProvider");
exports.CallHierarchyProvider = {
    prepareCallHierarchy(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchy"));
        const uri = document.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const point = (0, TreeSitter_1.toPoint)(position);
        const includeQuery = `(include (value !scopeName (ruleName) @include))`; // TODO: support scopeNames
        const includeCapture = (0, TreeSitter_1.queryNode)(rootNode, includeQuery, point);
        const includeText = includeCapture?.node?.text;
        const repoQuery = includeText ? `
			(json (repository (repo (key) @repo (.eq? @repo "${includeText}"))))
			(repo
				[(patterns) (include)] (repository
					(repo
						(key) @repo (.eq? @repo "${includeText}")))
				!match !begin)
		`
            : `(repo (key) @repo)`;
        const repoCapture = (0, TreeSitter_1.queryNode)(rootNode, repoQuery, point, false);
        if (!repoCapture) {
            return;
        }
        const node = repoCapture.node;
        const selectionRange = (0, TreeSitter_1.toRange)(node);
        const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(node));
        const detail = (0, TreeSitter_1.getComment)(node);
        const name = node.text;
        const kind = DocumentSymbolProvider_1.SymbolKind[repoCapture.name];
        const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyItem));
        return callHierarchyItem;
    },
    provideCallHierarchyIncomingCalls(item, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchyIncoming"));
        // vscode.window.showInformationMessage(JSON.stringify(item));
        const uri = item.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const callHierarchyIncomingCalls = [];
        const includeQuery = `(include (value !scopeName (ruleName) @include (.eq? @include "${item.name}")))`;
        const includeCaptures = (0, TreeSitter_1.queryNode)(rootNode, includeQuery);
        for (const includeCapture of includeCaptures) {
            const includeNode = includeCapture.node;
            const selectionRange = (0, TreeSitter_1.toRange)(includeNode);
            const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(includeNode));
            const targetQuery = `
				(json (scopeName (value) @scopeName))
				(repo (key) @repo)
			`;
            const targetCapture = (0, TreeSitter_1.queryNode)(rootNode, targetQuery, includeNode.startPosition, false);
            const targetNode = targetCapture.node;
            const detail = (0, TreeSitter_1.getComment)(targetNode);
            const name = targetNode.text;
            const kind = DocumentSymbolProvider_1.SymbolKind[includeCapture.name];
            const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);
            const ranges = [range];
            const callHierarchyIncomingCall = new vscode.CallHierarchyIncomingCall(callHierarchyItem, ranges);
            callHierarchyIncomingCalls.push(callHierarchyIncomingCall);
        }
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
        return callHierarchyIncomingCalls;
    },
    provideCallHierarchyOutgoingCalls(item, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchyOutgoing"));
        // vscode.window.showInformationMessage(JSON.stringify(item));
        const uri = item.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const callHierarchyOutgoingCalls = [];
        const includeQuery = `
			;(include (value) @include)
			(include (value !scopeName (ruleName) @include))
		`;
        const startPoint = (0, TreeSitter_1.toPoint)(item.range.start);
        const endPoint = (0, TreeSitter_1.toPoint)(item.range.end);
        const includeCaptures = (0, TreeSitter_1.queryNode)(rootNode, includeQuery, startPoint, endPoint);
        for (const includeCapture of includeCaptures) {
            const includeNode = includeCapture.node;
            const includeText = includeNode.text;
            const repoQuery = `
				(json (repository (repo (key) @repo (.eq? @repo "${includeText}"))))
				(repo
					[(patterns) (include)] (repository
						(repo
							(key) @repo (.eq? @repo "${includeText}")))
					!match !begin)
			`;
            const repoCapture = (0, TreeSitter_1.queryNode)(rootNode, repoQuery, startPoint, false);
            if (!repoCapture) {
                continue;
            }
            const repoNode = repoCapture.node;
            const selectionRange = (0, TreeSitter_1.toRange)(repoNode);
            const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(repoNode));
            const text = repoNode.text;
            const detail = (0, TreeSitter_1.getComment)(repoNode);
            const kind = DocumentSymbolProvider_1.SymbolKind[repoCapture.name];
            const callHierarchyItem = new vscode.CallHierarchyItem(kind, text, detail, uri, range, selectionRange);
            const parentRange = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(includeNode));
            const ranges = [parentRange];
            const callHierarchyOutgoingCall = new vscode.CallHierarchyOutgoingCall(callHierarchyItem, ranges);
            callHierarchyOutgoingCalls.push(callHierarchyOutgoingCall);
        }
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
        return callHierarchyOutgoingCalls;
    },
};

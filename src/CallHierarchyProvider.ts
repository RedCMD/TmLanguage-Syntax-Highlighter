import * as vscode from 'vscode';
import { getTrees, toPoint, queryNode, toRange, trueParent, getComment } from './TreeSitter';
import { SymbolKind } from './DocumentSymbolProvider';


export const CallHierarchyProvider: vscode.CallHierarchyProvider = {
	prepareCallHierarchy(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.CallHierarchyItem | vscode.CallHierarchyItem[] {
		// vscode.window.showInformationMessage(JSON.stringify("CallHierarchy"));
		const uri = document.uri;
		const trees = getTrees(uri);
		const tree = trees.jsonTree;
		const rootNode = tree.rootNode;
		const point = toPoint(position);

		const includeQuery = `(include (value !scopeName (ruleName) @include))`; // TODO: support scopeNames
		const includeCapture = queryNode(rootNode, includeQuery, point);
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

		const repoCapture = queryNode(rootNode, repoQuery, point, false);
		if (!repoCapture) {
			return;
		}

		const node = repoCapture.node;
		const selectionRange = toRange(node);
		const range = toRange(trueParent(node));
		const detail = getComment(node);
		const name = node.text;
		const kind = SymbolKind[repoCapture.name];
		
		const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);

		// vscode.window.showInformationMessage(JSON.stringify(callHierarchyItem));
		return callHierarchyItem;
	},
	provideCallHierarchyIncomingCalls(item: vscode.CallHierarchyItem, token: vscode.CancellationToken): vscode.CallHierarchyIncomingCall[] {
		// vscode.window.showInformationMessage(JSON.stringify("CallHierarchyIncoming"));
		// vscode.window.showInformationMessage(JSON.stringify(item));
		const uri = item.uri;
		const trees = getTrees(uri);
		const tree = trees.jsonTree;
		const rootNode = tree.rootNode;

		const callHierarchyIncomingCalls: vscode.CallHierarchyIncomingCall[] = [];

		const includeQuery = `(include (value !scopeName (ruleName) @include (.eq? @include "${item.name}")))`;
		const includeCaptures = queryNode(rootNode, includeQuery);
		for (const includeCapture of includeCaptures) {
			const includeNode = includeCapture.node;
			const selectionRange = toRange(includeNode);
			const range = toRange(trueParent(includeNode));

			const targetQuery = `
				(json (scopeName (value) @scopeName))
				(repo (key) @repo)
			`
			const targetCapture = queryNode(rootNode, targetQuery, includeNode.startPosition, false);
			const targetNode = targetCapture.node;
			
			const detail = getComment(targetNode);
			const name = targetNode.text;
			const kind = SymbolKind[includeCapture.name];
			
			const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);

			const ranges: vscode.Range[] = [range];

			const callHierarchyIncomingCall = new vscode.CallHierarchyIncomingCall(callHierarchyItem, ranges);
			callHierarchyIncomingCalls.push(callHierarchyIncomingCall);
		}

		// vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
		return callHierarchyIncomingCalls;
	},
	provideCallHierarchyOutgoingCalls(item: vscode.CallHierarchyItem, token: vscode.CancellationToken): vscode.CallHierarchyOutgoingCall[] {
		// vscode.window.showInformationMessage(JSON.stringify("CallHierarchyOutgoing"));
		// vscode.window.showInformationMessage(JSON.stringify(item));
		const uri = item.uri;
		const trees = getTrees(uri);
		const tree = trees.jsonTree;
		const rootNode = tree.rootNode;

		const callHierarchyOutgoingCalls: vscode.CallHierarchyOutgoingCall[] = [];


		const includeQuery = `
			;(include (value) @include)
			(include (value !scopeName (ruleName) @include))
		`;
		const startPoint = toPoint(item.range.start);
		const endPoint = toPoint(item.range.end);

		const includeCaptures = queryNode(rootNode, includeQuery, startPoint, endPoint);
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
			const repoCapture = queryNode(rootNode, repoQuery, startPoint, false);
			if (!repoCapture) {
				continue;
			}

			const repoNode = repoCapture.node;
			const selectionRange = toRange(repoNode);
			const range = toRange(trueParent(repoNode));
			const text = repoNode.text;
			const detail = getComment(repoNode);
			const kind = SymbolKind[repoCapture.name];

			const callHierarchyItem = new vscode.CallHierarchyItem(kind, text, detail, uri, range, selectionRange);

			const parentRange = toRange(trueParent(includeNode));
			const ranges: vscode.Range[] = [parentRange];

			const callHierarchyOutgoingCall = new vscode.CallHierarchyOutgoingCall(callHierarchyItem, ranges);
			callHierarchyOutgoingCalls.push(callHierarchyOutgoingCall);
		}

		// vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
		return callHierarchyOutgoingCalls;
	},
}
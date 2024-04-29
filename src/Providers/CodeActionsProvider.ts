import * as vscode from 'vscode';
import { getTrees, queryNode, toRange, trueParent } from "../TreeSitter";
import { unicodeproperties, UNICODE_PROPERTIES } from "../UNICODE_PROPERTIES";
import { wagnerFischer } from "../extension";
import { SyntaxNode } from 'web-tree-sitter';


type CodeAction = vscode.CodeAction & {
	document?: vscode.TextDocument,
	nodeId?: number;
};

export const CodeActionsProvider: vscode.CodeActionProvider = {
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		// vscode.window.showInformationMessage(JSON.stringify("CodeActions"));
		// vscode.window.showInformationMessage(JSON.stringify(context));

		const codeActions: vscode.CodeAction[] = [];
		let codeAction: CodeAction;

		const diagnostics = context.diagnostics;
		for (const diagnostic of diagnostics) {
			if (!range.intersection(diagnostic.range)) {
				continue;
			}

			const edit = new vscode.WorkspaceEdit;
			const message = diagnostic.message;
			const code = diagnostic.code;
			switch (code) {
				case 'ERROR':
				case 'error':
				case 'error_':
					const error = message.split("'")[1];

					edit.delete(document.uri, diagnostic.range);
					codeAction = {
						title: `Remove error '${error}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				case 'missing':
					const missing = message.split("'")[3];

					edit.insert(document.uri, diagnostic.range.end, missing);
					codeAction = {
						title: `Add missing '${missing}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				case 'property':
					const property = message.split("'")[1].replaceAll(/[ _-]+/g, '').toLowerCase();
					if (property.length < 2) {
						continue;
					}

					const distances = wagnerFischer(property, unicodeproperties);
					// vscode.window.showInformationMessage(JSON.stringify(distances));
					const distance = distances[0].distance;
					if (distance > 2) {
						continue;
					}

					const propertyName = UNICODE_PROPERTIES[distances[0].index];
					edit.replace(document.uri, diagnostic.range, propertyName);
					codeAction = {
						title: `Change spelling to '${propertyName}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				default:
					continue;
			}
			codeActions.push(codeAction);
		}

		let minifyRegex = false;

		const trees = getTrees(document);
		const regexNodes = trees.regexNodes;
		for (const key in regexNodes) {
			const regexNode = regexNodes[key];
			const parentRange = toRange(trueParent(regexNode));
			if (parentRange.intersection(range)) {
				codeAction = {
					title: `Minify Regex`,
					kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
					document: document,
					nodeId: <number><unknown>key, // why?
				};
				codeActions.push(codeAction);
				minifyRegex = true;
			}
		}
		if (minifyRegex || context.triggerKind == vscode.CodeActionTriggerKind.Invoke) {
			codeAction = {
				title: `Minify All Regex's`,
				kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
				document: document,
				nodeId: -1,
			};
			codeActions.push(codeAction);
		}

		// vscode.window.showInformationMessage(JSON.stringify(codeActions));
		return codeActions;
	},
	resolveCodeAction(codeAction: CodeAction, token: vscode.CancellationToken): vscode.CodeAction {
		// vscode.window.showInformationMessage(JSON.stringify(codeAction));
		const document = codeAction.document;
		const uri = document.uri;

		const trees = getTrees(document);
		const regexTrees = trees.regexTrees;

		const rootNodes: SyntaxNode[] = [];
		const id = codeAction.nodeId;

		if (id == -1) {
			for (const key in regexTrees) {
				const regexTree = regexTrees[key];
				const rootNode = regexTree.rootNode;
				rootNodes.push(rootNode);
			}
		}
		else {
			const regexNodes = trees.regexNodes;
			const jsonNode = regexNodes[id];
			const regexTree = regexTrees[jsonNode.id];
			const rootNode = regexTree.rootNode;
			rootNodes.push(rootNode);
		}

		const edit = new vscode.WorkspaceEdit;

		for (const rootNode of rootNodes) {
			const minifyQuery = `
				(comment_group) @comment
				(comment_extended) @comment
				(non_capture_group) @non_capture_group
				(non_capture_group_extended) @non_capture_group
			`;
			const minifyCaptures = queryNode(rootNode, minifyQuery);
			for (const minifyCapture of minifyCaptures) {
				const minifyName = minifyCapture.name;
				const minifyNode = minifyCapture.node;
				const minifyRange = toRange(minifyNode);

				switch (minifyName) {
					case 'comment':
						edit.delete(uri, minifyRange);
						break;
					case 'non_capture_group':
						const childCount = minifyNode.namedChildCount;

						let nextSibling = minifyNode.nextNamedSibling;
						while (nextSibling?.type?.startsWith('comment')) {
							nextSibling = nextSibling.nextNamedSibling;
						}

						if (nextSibling?.type == 'quantifier') {
							if (childCount > 1) { // (?:..)?
								break;
							}

							if (childCount == 0) {
								edit.delete( // `(?:)?`
									uri,
									new vscode.Range(
										minifyRange.start,
										toRange(nextSibling).end,
									),
								);
								break;
							}

							const child = minifyNode.firstNamedChild;
							switch (child.type) {
								case 'literal':
									if (child.text.length > 1) { // (?:ab)?
										continue;
									}
									break;
								case 'modify':
								case 'modify_extended':
								case 'look_ahead':
								case 'look_behind':
								case 'look_around':
								case 'callout':
								case 'alteration':
									continue; // (?:(?=))?
								default:
									break;
							}

							let stop = false; // why
							for (const child of minifyNode.namedChildren) { // c(?:a|b)?
								const type = child.type;
								if (type == 'alteration') {
									stop = true;
									break;
								}
							}
							if (stop) {
								break;
							}
						}
						else if (minifyNode.parent.namedChildCount > 1) { // TODO: ignore comment nodes
							let stop = false; // why
							for (const child of minifyNode.namedChildren) {
								const type = child.type;
								if (type == 'alteration') {
									stop = true;
									break;
								}
							}
							if (stop) {
								break;
							}
						}

						if (childCount == 1 && minifyNode.firstNamedChild.type == 'non_capture_group') { // prevents issues with nested groups /a(?:(?:b|c))/
							break;
						}

						edit.delete( // `(?:`
							uri,
							new vscode.Range(
								minifyRange.start,
								minifyRange.start.translate(0, 3),
							),
						);
						edit.delete( // `)`
							uri,
							new vscode.Range(
								minifyRange.end,
								minifyRange.end.translate(0, -1),
							),
						);
						break;
					default:
						break;
				}
			}
		}

		// vscode.window.showInformationMessage(JSON.stringify(edit));
		codeAction.edit = edit;
		return codeAction;
	},
};

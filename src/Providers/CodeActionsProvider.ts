import * as vscode from 'vscode';
import { Node } from 'web-tree-sitter';
import { getTrees, queryNode, toRange, trees } from "../TreeSitter";
import { unicodeproperties, UNICODE_PROPERTIES } from "../UNICODE_PROPERTIES";
import { stringify, wagnerFischer } from "../extension";


type CodeAction = vscode.CodeAction & {
	document: vscode.TextDocument,
	node: Node | null;
};

export const CodeActionsProvider: vscode.CodeActionProvider = {
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		// vscode.window.showInformationMessage(`provideCodeActions\n${JSON.stringify(context)}`);
		// const start = performance.now();

		const codeActions: vscode.CodeAction[] = [];
		let codeAction: CodeAction | vscode.CodeAction;

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
						edit: edit,
					};
					break;
				case 'missing':
					const missing = message.split("'")[3] || "'";

					edit.insert(document.uri, diagnostic.range.end, missing);
					codeAction = {
						title: `Add missing '${missing}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						edit: edit,
					};
					break;
				case 'scopeName': {
					const scopeName = message.split("'")[3];

					edit.replace(document.uri, diagnostic.range, scopeName);
					codeAction = {
						title: `Change spelling to '${scopeName}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				}
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
				case 'include': {
					const include = message.split("'")[3];
					if (!include) {
						continue;
					}
					edit.replace(document.uri, diagnostic.range, include);
					codeAction = {
						title: `Change spelling to '${include}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				}
				default:
					continue;
			}
			codeActions.push(codeAction);
		}

		let optimizeAllRegex = false;

		const trees = getTrees(document);
		const regexNodes = trees.regexNodes;
		for (const regexNode of regexNodes.values()) {
			const parentRange = toRange(regexNode.parent!);
			if (parentRange.intersection(range)) {
				codeAction = {
					title: `Optimize Regex`,
					kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
					document: document,
					node: regexNode,
				};
				codeActions.push(codeAction);
				optimizeAllRegex = true;
			}
		}
		if (optimizeAllRegex || context.triggerKind == vscode.CodeActionTriggerKind.Invoke) {
			codeAction = {
				title: `Optimize all Regexes`,
				kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
				document: document,
				node: null,
			};
			codeActions.push(codeAction);
		}

		// vscode.window.showInformationMessage(`codeActions ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(codeActions)}`);
		return codeActions;
	},
	async resolveCodeAction(codeAction: CodeAction, token: vscode.CancellationToken): Promise<vscode.CodeAction> {
		// vscode.window.showInformationMessage(`resolveCodeAction\n${JSON.stringify(codeAction)}`);
		// const start = performance.now();
		const document = codeAction.document;
		const uri = document.uri;

		const trees = getTrees(document);

		const node = codeAction.node;
		const edit = new vscode.WorkspaceEdit;

		if (node) {
			const regexNode = trees.regexTrees.get(node.id)!.rootNode;
			await optimizeRegex(edit, regexNode, uri);
		}
		else {
			const regexNodes = trees.regexNodes;
			for (const regexNode of regexNodes.values()) {
				await optimizeRegex(edit, regexNode, uri);
			}
		}

		codeAction.edit = edit;
		// vscode.window.showInformationMessage(`codeAction ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(edit)}`);
		return codeAction;
	},
};

const minifyQuery = `;scm
	(backslash) @backslash
	(comment_group) @comment
	(comment_extended) @comment
	(non_capture_group) @non_capture_group
	(non_capture_group_extended) @non_capture_group
`;

async function optimizeRegex(edit: vscode.WorkspaceEdit, regexNode: Node, uri: vscode.Uri) {
	const range = toRange(regexNode);

	try {
		const { optimize } = await import("oniguruma-parser/optimizer");

		const text = JSON.parse(`"${regexNode.text}"`);

		const optimized = optimize(text, {
			rules: {
				// Follow `vscode-oniguruma` which enables this Oniguruma option by default
				captureGroup: true,
				allowOrphanBackrefs: true,
			},
		}).pattern;

		const replacedText = JSON.stringify(optimized).slice(1, -1); // remove surrounding "double quotes"
		edit.replace(uri, range, replacedText);

		return;
	} catch (error) {
		console.warn("JSON TextMate: oniguruma-parser/optimizer: range:", range, '\n', error);
	}

	// Fallback to basic minifier
	const minifyCaptures = queryNode(regexNode, minifyQuery);
	for (const minifyCapture of minifyCaptures) {
		const minifyName = minifyCapture.name;
		const minifyNode = minifyCapture.node;
		const minifyRange = toRange(minifyNode);

		switch (minifyName) {
			case 'comment':
				edit.delete(uri, minifyRange);
				break;
			case 'backslash':
				const text = minifyNode.text;
				switch (text.lastIndexOf('\\')) {
					case 0: // \["/bfnrt]
						if (text == '\\/') { // \\/
							edit.delete(
								uri,
								new vscode.Range(
									minifyRange.start,
									minifyRange.start.translate(0, 1),
								),
							);
						}
						break;
					case 1: // \\.
						if (/^\\\\[^\x00-\x1F\x7F "#$'()*+,-.0123456789:<?ABCDGHKNORSWXYZ\[\\\]^abcdefhnorstuvwxyz{|}]$/.test(text)) {
							edit.delete(
								uri,
								new vscode.Range(
									minifyRange.start,
									minifyRange.start.translate(0, 2),
								),
							);
						}
						break;
					case 2: // \\\["/bfnrt]
						edit.delete(
							uri,
							new vscode.Range(
								minifyRange.start,
								minifyRange.start.translate(
									0,
									text == '\\\\\\/' ? 3 : 2, // \\\/
								),
							),
						);
						break;
					case 3: // \\\\
						break;
					default:
						// tree-sitter bug?
						break;
				}
				break;
			case 'non_capture_group':
				const childCount = minifyNode.namedChildCount;

				let siblingCommentCount = 0; // Only accounts for comments directly after the group
				let nextSibling = minifyNode.nextNamedSibling;
				while (nextSibling?.type?.startsWith('comment')) {
					nextSibling = nextSibling.nextNamedSibling;
					siblingCommentCount++;
				}

				if (nextSibling?.type == 'quantifier') { // Only minify group if theres only one valid child inside
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

					const child = minifyNode.firstNamedChild!; // Only child
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
							continue; // Quantifier's can't be placed on certain expressions. (?:(?=))?
						default:
							break;
					}

					let stop = false; // why
					for (const child of minifyNode.namedChildren) { // c(?:a|b)?
						const type = child?.type;
						if (type == 'alteration') {
							stop = true;
							break;
						}
					}
					if (stop) {
						break;
					}
				}
				else if (minifyNode.parent!.namedChildCount - siblingCommentCount > 1) {
					if (childCount == 1 && minifyNode.firstNamedChild!.type == 'alteration') {
						edit.delete( // `(?:|)`
							uri,
							minifyRange,
						);
						break;
					}
					let stop = false; // why
					for (const child of minifyNode.namedChildren) {
						const type = child?.type;
						if (type == 'alteration') {
							stop = true;
							break;
						}
					}
					if (stop) {
						break;
					}
				}

				if (childCount == 1 && minifyNode.firstNamedChild!.type == 'non_capture_group' && minifyNode.firstNamedChild!.namedChildCount > 1) { // prevents issues with nested groups. a(?:(?:b|c))
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

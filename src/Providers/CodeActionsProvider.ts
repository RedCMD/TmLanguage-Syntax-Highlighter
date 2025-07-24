import * as vscode from 'vscode';
import * as webTreeSitter from 'web-tree-sitter';
import * as optimizer from 'oniguruma-parser-cjs/optimizer';
import { closeEnoughQuestionMark, JSONParseStringRelaxed, stringify, wagnerFischer } from "../extension";
import { getTrees, queryNode, toRange } from "../TreeSitter";
import { debouncedDiagnostics } from "../DiagnosticCollection";
import { unicodeproperties, UNICODE_PROPERTIES } from "../UNICODE_PROPERTIES";


export const metadata: vscode.CodeActionProviderMetadata = {
	providedCodeActionKinds: [
		vscode.CodeActionKind.QuickFix,
		vscode.CodeActionKind.QuickFix.append('ignore'),
		vscode.CodeActionKind.RefactorRewrite.append("minify"),
		vscode.CodeActionKind.RefactorRewrite.append("sort"),
	],
	documentation: undefined,
};

type CodeAction = vscode.CodeAction & {
	document: vscode.TextDocument;
	node?: webTreeSitter.Node;
};

export let ignoreDiagnosticsUnusedRepos: boolean = false;

export const CodeActionsProvider: vscode.CodeActionProvider = {
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		// vscode.window.showInformationMessage(`provideCodeActions\n${JSON.stringify(context, stringify)}`);
		// const start = performance.now();

		const codeActions: (CodeAction | vscode.CodeAction)[] = [];

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
					codeActions.push({
						title: `Remove error '${error}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						edit: edit,
					});
					break;
				case 'missing':
					const missing = message.split("'")[3] || "'";

					edit.insert(document.uri, diagnostic.range.end, missing);
					codeActions.push({
						title: `Add missing '${missing}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						edit: edit,
					});
					break;
				case 'scopeName': {
					const scopeName = message.split("'")[3];

					edit.replace(document.uri, diagnostic.range, scopeName);
					codeActions.push({
						title: `Change spelling to '${scopeName}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					});
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
					if (!closeEnoughQuestionMark(distance, property)) {
						continue;
					}

					const propertyName = UNICODE_PROPERTIES[distances[0].index];
					edit.replace(document.uri, diagnostic.range, propertyName);
					codeActions.push({
						title: `Change spelling to '${propertyName}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					});
					break;
				case 'include': {
					const include = message.split("'")[3];
					if (!include) {
						continue;
					}
					edit.replace(document.uri, diagnostic.range, include);
					codeActions.push({
						title: `Change spelling to '${include}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					});
					break;
				}
				case 'repo': {
					codeActions.push({
						title: `Ignore no reference warnings`,
						kind: vscode.CodeActionKind.QuickFix.append('ignore'),
						diagnostics: [diagnostic],
						document: document,
					});
					break;
				}
				default:
					continue;
			}
		}

		let showAllCodeActions = context.triggerKind == vscode.CodeActionTriggerKind.Invoke;

		const trees = getTrees(document);
		const regexNodes = trees.regexNodes;
		for (const regexNode of regexNodes.values()) {
			const parentRange = toRange(regexNode.parent!);
			if (parentRange.intersection(range)) {
				codeActions.push({
					title: `Optimize Regex`,
					kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
					document: document,
					node: regexNode,
				});
				showAllCodeActions = true;
			}
		}

		if (showAllCodeActions) {
			codeActions.push(
				{
					title: `Optimize all Regexes`,
					kind: vscode.CodeActionKind.RefactorRewrite.append("minify"),
					document: document,
					node: undefined,
				},
				{
					title: `Sort JSON Keys`,
					kind: vscode.CodeActionKind.RefactorRewrite.append("sort"),
					document: document,
				},
			);
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

		const edit = new vscode.WorkspaceEdit;
		const kind = codeAction.kind?.value;

		switch (kind) {
			case 'refactor.rewrite.minify':
				const node = codeAction.node;
				const regexTrees = trees.regexTrees;
				if (node) {
					const rootNode = regexTrees.get(node.id)!.rootNode;
					await optimizeRegex(edit, rootNode, uri);
				}
				else {
					for (const regexTree of regexTrees.values()) {
						await optimizeRegex(edit, regexTree.rootNode, uri);
					}
				}
				break;
			case 'refactor.rewrite.sort':
				const jsonTree = trees.jsonTree;
				sortJSON(edit, jsonTree, uri);
				break;
			case 'quickfix.ignore':
				ignoreDiagnosticsUnusedRepos = true;
				debouncedDiagnostics(document);
			/* FALLTHROUGH */
			case 'quickfix':
			default:
				return codeAction;
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
	(character_class (backslash) @backslash_class)
`;

async function optimizeRegex(edit: vscode.WorkspaceEdit, regexNode: webTreeSitter.Node, uri: vscode.Uri) {
	const range = toRange(regexNode);

	try {
		const text: string = JSONParseStringRelaxed(regexNode.text);

		const optimized = optimizer.optimize(text, {
			rules: {
				// Follow `vscode-oniguruma` which enables this Oniguruma option by default
				captureGroup: true,
				allowOrphanBackrefs: true,
			},
		}).pattern;

		const replacedText = JSON.stringify(optimized).slice(1, -1); // remove surrounding "double quotes"
		if (text != optimized) {
			edit.replace(uri, range, replacedText);
			return;
		}
	} catch (error) {
		console.warn("JSON TextMate: oniguruma-parser/optimizer: range: ", range, '\n', error);
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
			case 'backslash_class':
				if (/^\\\\[ #$'()*+,.89<?ABGKNORXYZyz{|}]$/.test(minifyNode.text)) { // MUST be mutually exclusive with the regex below! // Error: Overlapping ranges are not allowed!
					edit.delete(
						uri,
						new vscode.Range(
							minifyRange.start,
							minifyRange.start.translate(0, 2),
						),
					);
				}
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

function replaceStringAt(string: string, replacement: string, startIndex: number, endIndex?: number) {
	return string.substring(0, startIndex) + replacement + string.substring(endIndex ?? startIndex + replacement.length);
}

function sortJSON(edit: vscode.WorkspaceEdit, jsonTree: webTreeSitter.Tree, uri: vscode.Uri) {
	const rootNode = jsonTree.rootNode;
	let newRootText = rootNode.text;

	const sortOrder = vscode.workspace.getConfiguration('json.textmate').get('sortOrder', [
		"version",
		"$schema",
		// "comment",
		"match",
		"begin",
		"end",
		"captures",
		"beginCaptures",
		"endCaptures",
		"whileCaptures",
		"name",
		"contentName",
		"scopeName",
		"fileTypes",
		"firstLineMatch",
		"foldingStartMarker",
		"foldingStopMarker",
		"injectionSelector",
		"injections",
		"include",
		"applyEndPatternLast",
		"patterns",
		"repository",
		"uuid",
	]);

	const sortQuery = `;scm
		(json) @root
		(repo) @repo
		(pattern) @pattern
		(capture) @capture
	`;
	const sortCaptures = queryNode(rootNode, sortQuery);
	sortCaptures.reverse(); // inner/bottom up
	// vscode.window.showInformationMessage(`sortCaptures\n${JSON.stringify(sortCaptures)}`);

	for (const sortCapture of sortCaptures) {
		const node = sortCapture.node;
		// vscode.window.showInformationMessage(`node\n${JSON.stringify(node.toString())}`);

		const keys: {
			keyNode: webTreeSitter.Node;
			nodeText: string;
		}[] = [];
		for (const child of node.namedChildren) {
			const key = child?.firstNamedChild;
			if (key) {
				const childText = newRootText.substring(child.startIndex, child.endIndex); // nested children nodes may have been sorted
				keys.push(
					{
						keyNode: key,
						nodeText: childText,
					}
				);
			}
		}

		keys.sort((a, b) => {
			const indexA = sortOrder.indexOf(a.keyNode.text);
			const indexB = sortOrder.indexOf(b.keyNode.text);

			// attempt to preserve order of unknown items
			if (indexA == -1) {
				return 0;
			}
			if (indexB == -1) {
				return 0;
			}

			if (indexA > indexB) {
				return 1;
			}
			if (indexB > indexA) {
				return -1;
			}

			return 0;
		});
		keys.reverse(); // bottom up

		let index = node.namedChildCount; // `repo` and `captures` have an extra (key) node
		for (const key of keys) {
			index--;
			const text = key.nodeText;
			const sibling = node.namedChild(index)!; // the new position
			newRootText = replaceStringAt(newRootText, text, sibling.startIndex, sibling.endIndex);

			// const range = toRange(sibling);
			// edit.replace(uri, range, text); // Error: Overlapping ranges are not allowed!
		}
	}

	const range = toRange(rootNode);
	edit.replace(uri, range, newRootText);
}

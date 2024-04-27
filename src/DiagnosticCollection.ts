import * as vscode from 'vscode';
import * as vscodeOniguruma from 'vscode-oniguruma';
import { getTrees, jsonParserLanguage, queryNode, toRange, trueParent } from "./TreeSitter";
import { DocumentSelector } from "./extension";
import { Query, QueryOptions } from 'web-tree-sitter';
import { unicodeproperties } from "./UNICODE_PROPERTIES";


type IOnigBinding = {
	HEAPU8: Uint8Array;
	HEAPU32: Uint32Array;

	_omalloc(count: number): Pointer;
	_ofree(ptr: Pointer): void;
	UTF8ToString(ptr: Pointer): string;

	_getLastOnigError(): Pointer;
	_createOnigScanner(strPtrsPtr: Pointer, strLenPtr: Pointer, count: number, options: number, syntax: Pointer): Pointer;
	_freeOnigScanner(ptr: Pointer): void;
	_findNextOnigScannerMatch(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;
	_findNextOnigScannerMatchDbg(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;
};
type Pointer = number;
type OnigScanner = vscodeOniguruma.OnigScanner & {
	readonly _onigBinding: IOnigBinding;
	readonly _ptr: Pointer;
	readonly _options: vscodeOniguruma.FindOption[];
};

let repoQuery: Query;

export function initDiagnostics(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("initDiagnostics"));
	const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");
	context.subscriptions.push(DiagnosticCollection);

	const repoQueryString = `
		(repo
		;	[(patterns) (include)] (repository ; causes extra 70ms lag
			(repository
				(repo
					(key) @nestRepo))
			!match !begin)
	`;
	repoQuery = jsonParserLanguage.query(repoQueryString);

	for (const editor of vscode.window.visibleTextEditors) {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		Diagnostics(editor.document, DiagnosticCollection);
	}

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			Diagnostics(document, DiagnosticCollection);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument((edits: vscode.TextDocumentChangeEvent) => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			Diagnostics(edits.document, DiagnosticCollection);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("close"));
			DiagnosticCollection.delete(document.uri);
		})
	);
}

function Diagnostics(document: vscode.TextDocument, Diagnostics: vscode.DiagnosticCollection) {
	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}

	const trees = getTrees(document);
	const jsonTree = trees.jsonTree;
	const rootNode = jsonTree.rootNode;

	const diagnostics: vscode.Diagnostic[] = [];

	if (true) { // TreeSitter JSON errors
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics JSON"))
		const queryCaptures = queryNode(rootNode, `(ERROR) @ERROR`);

		for (const queryCapture of queryCaptures) {
			const node = queryCapture.node;
			const text = node.text;
			const range = toRange(node);
			const diagnostic = new vscode.Diagnostic(
				range,
				`ERROR: \`${text}\``,
				vscode.DiagnosticSeverity.Error,
			);
			diagnostic.source = 'JSON TextMate TreeSitter';
			diagnostics.push(diagnostic);
			// vscode.window.showInformationMessage(JSON.stringify(text));
		}
	}

	if (true) { // TreeSitter Regex errors
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex"));
		const regexTrees = trees.regexTrees;
		for (const id in regexTrees) {
			const tree = regexTrees[id];
			// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.toString()));

			const queryString = `
				(ERROR) @ERROR
				(error) @error
				(quantifier) @quantifier
				_ @missing ;Only the last child node can be missing
			`;
			const queryCaptures = queryNode(tree.rootNode, queryString);

			for (const queryCapture of queryCaptures) {
				const node = queryCapture.node;
				const type = node.type;
				const text = node.text;
				const range = toRange(node);
				const parent = trueParent(node);
				const parentType = parent.type;
				const parentRange = toRange(parent);

				let diagnostic: vscode.Diagnostic;
				const name = queryCapture.name;
				switch (name) {
					case 'ERROR':
					case 'error':
					case 'error_':
						diagnostic = {
							range: range,
							message: `'${text}' is not valid at this position inside '${parentType}'`,
							severity: vscode.DiagnosticSeverity.Error,
							source: 'JSON TextMate Oniguruma',
						};
						break;
					case 'invalid':
						diagnostic = {
							range: range,
							message: `${text}`,
							severity: vscode.DiagnosticSeverity.Warning,
							source: `${type}`,
						};
						break;
					case 'missing':
						if (!node.isMissing) {
							continue;
						}
						diagnostic = {
							range: parentRange,
							message: `'${parentType}' is missing ending char${type.length > 1 ? 's' : ''} '${type}'`,
							severity: vscode.DiagnosticSeverity.Error,
							source: 'TreeSitter',
						};
						break;
					case 'quantifier':
						let previousSibling = node.previousNamedSibling;
						while (previousSibling?.type == 'comment_extended') {
							previousSibling = previousSibling.previousNamedSibling;
						}
						if (previousSibling) {
							switch (previousSibling.type) {
								case 'modify':
								case 'modify_extended':
								case 'look_ahead':
								case 'look_behind':
								case 'look_around':
								case 'callout':
								case 'alteration':
									break;
								default:
									continue;
							}
						}
						if (parentType == 'capture_group' && text == '?') {
							diagnostic = {
								range: range,
								message: `'(?...)' Invalid Group syntax`,
								severity: vscode.DiagnosticSeverity.Error,
								source: 'ONIG_INEFFECTIVE_META_CHAR',
							};
							break;
						}
						diagnostic = {
							range: range,
							message: `'${text}' Invalid Quantifier target`,
							severity: vscode.DiagnosticSeverity.Error,
							source: 'ONIG_SYN_CONTEXT_INVALID_REPEAT_OPS',
						};
						break;
					case 'property':
						const propertyName = text;
						if (unicodeproperties.includes(propertyName.replaceAll(/[ _-]+/g, '').toLowerCase())) {
							continue;
						}
						diagnostic = {
							range: range,
							message: `'${propertyName}' Invalid Character Property name`,
							severity: vscode.DiagnosticSeverity.Error,
							source: 'Oniguruma',
						};
						break;
					default:
						continue;
				}
				// diagnostic.code = { value: name, target: document.uri };
				diagnostic.code = name;
				diagnostics.push(diagnostic);
				// vscode.window.showInformationMessage(JSON.stringify(diagnostic));
			}
		}
	}

	if (true) { // Oniguruma Regex errors. https://github.com/kkos/oniguruma
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex Oniguruma"));
		const regexNodes = trees.regexNodes;

		for (const id in regexNodes) {
			const regexNode = regexNodes[id];
			const text = regexNode.text;
			const key = regexNode.previousNamedSibling;
			if (!key) { // `previousNamedSibling` is broken on 0width nodes
				continue;
			}

			let regex = text.replace(/\\[\\\/bfnrt"]|\\u[0-9a-fA-F]{4}/g, regexEscapeReplacer);
			if (key.text == 'end' || key.text == 'while') {
				// `\\3` could be valid; could be invalid. Who knows?
				// Would need to check the `begin` regex first for the number of capture groups
				// Then how to tell Oniguruma how many are available??
				// Keeping in mind /(?I:...)/
				regex = regex.replace(/\\[1-9](\d{2})?(?!\d)/g, '\\0');
			}

			const scanner = new vscodeOniguruma.OnigScanner([regex]);

			const onigBinding = (<OnigScanner>scanner)._onigBinding;
			const errorCode = onigBinding.UTF8ToString(onigBinding._getLastOnigError());

			// const string = vscodeOniguruma.createOnigString(''); // blank. Maybe can test against a user provided string?
			// const match = scanner.findNextMatchSync(string, 0); // returns null if `regex` is invalid

			if (errorCode != 'undefined error code') {
				const range = toRange(key);
				const diagnostic: vscode.Diagnostic = {
					range: range,
					message: errorCode,
					severity: vscode.DiagnosticSeverity.Error,
					source: 'Oniguruma',
				};
				diagnostics.push(diagnostic);
			}
		}
	}

	if (true) { // missing `#include`
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics #includes"))
		// const start = performance.now();

		const includeCaptures = queryNode(rootNode, `(include (value !scopeName (ruleName) @include))`);

		const rootRepoQuery = `(json (repository (repo (key) @rootRepo)))`;
		const rootRepoCaptures = queryNode(rootNode, rootRepoQuery);

		// const repoQueryString = `
		// 	;(json
		// 	;	(repository
		// 	;		(repo
		// 	;			(key) @rootRepo)))
		// 	(repo
		// 	;	[(patterns) (include)] (repository ; causes extra 70ms lag
		// 		(repository
		// 			(repo
		// 				(key) @nestRepo))
		// 		!match !begin)
		// `;
		// const language = jsonTree.getLanguage();
		// const repoQuery = language.query(repoQueryString);
		// const queryCaptures = repoQuery.captures(node, startPoint, endPoint || startPoint);

		for (const includeCapture of includeCaptures) {
			const node = includeCapture.node;
			const text = node.text;

			// const repoCapture = queryNode(rootNode, repoQuery, node.startPosition, false);
			let match = false;
			for (const repoCapture of rootRepoCaptures) {
				const repoText = repoCapture.node.text;
				if (repoText == text) {
					match = true;
					break;
				}
			}
			if (match) {
				continue;
			}

			const queryOptions: QueryOptions = {
				startPosition: node.startPosition,
				endPosition: node.endPosition,
			};
			const repoMatches = repoQuery.matches(rootNode, queryOptions);
			for (const repoMatch of repoMatches) {
				const repoCaptures = repoMatch.captures;
				for (const repoCapture of repoCaptures) {
					const repoText = repoCapture.node.text;
					if (repoText == text) {
						match = true;
						break;
					}
				}
			}
			if (match) {
				continue;
			}

			const range = toRange(node);
			const diagnostic: vscode.Diagnostic = {
				range: range,
				message: `'${text}' was not found in a repository.`,
				severity: vscode.DiagnosticSeverity.Error,
				source: 'TextMate',
				code: 'include',
			};
			diagnostics.push(diagnostic);
		}
		// vscode.window.showInformationMessage(performance.now() - start + "ms");
	}

	// vscode.window.showInformationMessage(JSON.stringify(diagnostics));
	Diagnostics.set(document.uri, diagnostics);
}

function regexEscapeReplacer(substring: string, ...args: any[]): string {
	const char = substring.charAt(1);
	switch (char) {
		case '\\': return '\\';
		case '/': return '/';
		case 'b': return '\b';
		case 'f': return '\f';
		case 'n': return '\n';
		case 'r': return '\r';
		case 't': return '\t';
		case '"': return '"';
		case 'u':
			const hexStr = substring.substring(2, 6);
			const hexCode = parseInt(hexStr, 16);
			const char = String.fromCodePoint(hexCode);
			return char;
	}
}

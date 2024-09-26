import * as vscode from 'vscode';
import * as vscodeOniguruma from 'vscode-oniguruma';
import { getLastNode, getTrees, parseEvents, queryNode, toPosition, toRange, trueParent } from "./TreeSitter";
import { DocumentSelector, stringify } from "./extension";
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

const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");
export function initDiagnostics(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("initDiagnostics"));
	context.subscriptions.push(DiagnosticCollection);
	parseEvents.push(Diagnostics);

	// const activeDocuments: {
	// 	[uriString: string]: {
	// 		edits: vscode.TextDocumentChangeEvent;
	// 		timeout: NodeJS.Timeout | number;
	// 	};
	// } = {};

	for (const editor of vscode.window.visibleTextEditors) {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		const document = editor.document;
		if (!vscode.languages.match(DocumentSelector, document)) {
			continue;
		}
		// const uriString = document.uri.toString();
		// activeDocuments[uriString] = { edits: null, timeout: null };
		Diagnostics(document);
	}

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			if (!vscode.languages.match(DocumentSelector, document)) {
				return;
			}
			Diagnostics(document);
		})
	);

	// context.subscriptions.push(
	// 	vscode.workspace.onDidChangeTextDocument((edits: vscode.TextDocumentChangeEvent) => {
	// 		// vscode.window.showInformationMessage(JSON.stringify("change"));
	// 		if (!vscode.languages.match(DocumentSelector, edits.document)) {
	// 			return;
	// 		}

	// 		if (edits.contentChanges.length == 0) {
	// 			// File saving triggers onDidChangeTextDocument()
	// 			return;
	// 		}

	// 		const uriString = edits.document.uri.toString();
	// 		const activeDocument = activeDocuments[uriString];

	// 		// Debounce recently repeated requests
	// 		if (activeDocument.timeout == null) {
	// 			// Run Diagnostics instantly on first edit
	// 			Diagnostics(edits.document, DiagnosticCollection);

	// 			// Wait 50ms and execute CallBack reguardless of if there were new edits or not
	// 			activeDocument.timeout = setInterval(
	// 				() => {
	// 					if (activeDocument.edits == null) {
	// 						// No new edits? exit.
	// 						clearInterval(activeDocument.timeout); // Works in VSCode web
	// 						activeDocument.timeout = null;
	// 						return;
	// 					}

	// 					// setInterval() waits for current callback to finish
	// 					Diagnostics(activeDocument.edits.document, DiagnosticCollection);
	// 					activeDocument.edits = null;
	// 				},
	// 				50, // 50 milisecond intervals. Does anyone want this as a config?
	// 			);
	// 			return;
	// 		}

	// 		// Use the latest edits
	// 		activeDocument.edits = edits;
	// 	})
	// );

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("close"));
			DiagnosticCollection.delete(document.uri);
		})
	);
}

function Diagnostics(document: vscode.TextDocument) {
	// vscode.window.showInformationMessage("Diagnostics");
	// const start = performance.now();

	const trees = getTrees(document);
	const jsonTree = trees.jsonTree;
	const rootNode = jsonTree.rootNode;

	const diagnostics: vscode.Diagnostic[] = [];

	if (true) { // TreeSitter JSON errors
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics JSON"));
		// const start = performance.now();
		const queryString = `;scm
			(ERROR) @ERROR
			(_ _ @missing (#eq? @missing ""))
		`;
		const queryCaptures = queryNode(rootNode, queryString);

		for (const queryCapture of queryCaptures) {
			const node = queryCapture.node;
			const type = node.type;
			const text = node.text;
			const range = toRange(node);
			const parent = trueParent(node);
			const parentType = parent.type;

			let diagnostic: vscode.Diagnostic;
			const name = queryCapture.name;
			switch (name) {
				case 'ERROR':
					diagnostic = {
						range: range,
						message: `ERROR: '${text}'`,
						severity: vscode.DiagnosticSeverity.Error,
						source: 'JSON TextMate TreeSitter',
					};
					break;
				case 'missing':
					if (!node.isMissing) {
						continue;
					}
					diagnostic = {
						range:
							type == ',' ?
								new vscode.Range(
									toPosition(node.previousSibling.endPosition),
									toPosition(node.previousSibling.endPosition),
								)
								: range,
						message: `'${parentType}' is missing character${type.length > 1 ? 's' : ''} '${type}'`,
						severity: vscode.DiagnosticSeverity.Error,
						source: 'TreeSitter',
					};
					break;

			}
			diagnostic.code = name;
			diagnostics.push(diagnostic);
			// vscode.window.showInformationMessage(JSON.stringify(text));
		}
		// vscode.window.showInformationMessage(`JSON ${(performance.now() - start).toFixed(3)}ms`);
	}

	if (true) { // TreeSitter Regex errors
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex"));
		// const start = performance.now();
		const regexTrees = trees.regexTrees;
		for (const tree of regexTrees.values()) {
			// diagnostics.push({
			// 	range: toRange(tree.rootNode),
			// 	message: tree.rootNode.text,
			// 	severity: vscode.DiagnosticSeverity.Information,
			// 	source: 'regex',
			// });
			// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.toString()));

			const queryString = `;scm
				(ERROR) @ERROR
				(error) @error
				(quantifier) @quantifier
				(character_property_name) @property
				(_ _ @missing (#eq? @missing ""))
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
						while (previousSibling?.type?.startsWith('comment')) {
							previousSibling = previousSibling.previousNamedSibling;
						}
						if (previousSibling) {
							switch (previousSibling.type) {
								// case 'modify':
								// case 'modify_extended':
								case 'options':
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
		// vscode.window.showInformationMessage(`Regex ${(performance.now() - start).toFixed(3)}ms`);
	}

	if (true) { // Oniguruma Regex errors. https://github.com/kkos/oniguruma
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex Oniguruma"));
		// const start = performance.now();
		const regexNodes = trees.regexNodes;

		for (const regexNode of regexNodes.values()) {
			const text = regexNode.text;
			const key = regexNode.previousNamedSibling;
			if (!key) { // `previousNamedSibling` is broken on 0width nodes
				vscode.window.showInformationMessage("0width broken!!");
				continue;
			}

			let regex = text.replace(/\\[\\\/bfnrt"]|\\u[0-9a-fA-F]{4}/g, jsonEscapeReplacer);
			if (key.text == 'end' || key.text == 'while') {
				/* `\\3` could be valid; could be invalid. Who knows?
				 * Need to check the `begin` regex first for the number of capture groups
				 * VSCode TextMate escapes all special regex characters
				 * and replaces the backreferences directly
				 */
				if (/\\[1-9](\d{2})?(?!\d)/.test(regex)) {
					const beginNode = getLastNode(regexNode.parent.parent, 'begin').childForFieldName('regex');
					if (beginNode) {
						const beginRegex = trees.regexTrees.get(beginNode.id).rootNode;
						const captureGroupQuery = `;scm
							(capture_group) @group
							(capture_group_extended) @group
							(capture_group_name) @name
							(capture_group_name_extended) @name
						`;
						let index = 1;
						const groupCaptures = queryNode(beginRegex, captureGroupQuery);
						for (const groupCapture of groupCaptures) {
							const groupText = groupCapture.node.text.slice( // substring() doesn't work with -1
								groupCapture.name == 'name' ? groupCapture.node.firstNamedChild.text.length + 4 : 1, // remove `(?<name>`
								-1, // remove `)`
							).replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&'); // TextMate 2.0 only escapes these characters \|([{}]).?*+^$
							// https://github.com/textmate/textmate/blob/master/Frameworks/parse/src/parse.cc#L120
							// https://github.com/microsoft/vscode-textmate/blob/main/src/utils.ts#L160
							// https://github.com/microsoft/vscode-textmate/issues/239
							regex = regex.replace(
								new RegExp(`\\\\${index}(?!\\d)`, 'g'),
								groupText,
							);
							index++;
						}
					}
				}
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
		// vscode.window.showInformationMessage(`Oniguruma ${(performance.now() - start).toFixed(3)}ms`);
	}

	if (true) { // missing `#include`
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics #includes"))
		// const start = performance.now();

		let prevParent;
		let errorCount;

		const repoQueryString = `;scm
			(repo
				[(include) (patterns)] (repository
					(repo
						(key) @nestRepo))
				!match !begin)
			(repo
				(repository
					(repo
						(key) @nestRepo)) [(include) (patterns)]
				!match !begin)
			(pattern
				(patterns) (repository
					(repo
						(key) @nestRepo))
				!match !begin)
			(pattern
				(repository
					(repo
						(key) @nestRepo)) (patterns)
				!match !begin)
			(capture
				(patterns) (repository
					(repo
						(key) @nestRepo))
				!match !begin)
			(capture
				(repository
					(repo
						(key) @nestRepo)) (patterns)
				!match !begin)
		`;

		const rootRepoQuery = `(json (repository (repo (key) @rootRepo)))`;
		const rootRepoCaptures = queryNode(rootNode, rootRepoQuery);

		const includeCaptures = queryNode(rootNode, `(include (value !scopeName (ruleName) @include))`);
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

			const repoCaptures = queryNode(rootNode, repoQueryString, node.startPosition, node.endPosition);
			for (const repoCapture of repoCaptures) {
				const repoText = repoCapture.node.text;
				if (repoText == text) {
					match = true;
					break;
				}
			}
			if (match) {
				continue;
			}

			const range = toRange(node);
			const diagnostic: vscode.Diagnostic = {
				range: range,
				message: `'${text}' was not found in a repository.`,
				severity: vscode.DiagnosticSeverity.Warning,
				source: 'TextMate',
				code: 'include',
			};
			diagnostics.push(diagnostic);

			// Change `severity` to `Error` if every single `#include` cannot be found inside a `"patterns"` array
			const parent = node.parent.parent.parent.parent;
			if (prevParent != parent.id) {
				errorCount = 0;
			}

			errorCount++;
			if (parent.namedChildCount - 1 == errorCount) {
				for (let index = diagnostics.length - errorCount; index < diagnostics.length; index++) {
					const diagnostic = diagnostics[index];
					diagnostic.severity = vscode.DiagnosticSeverity.Error;
					diagnostics[index] = diagnostic;
				}
			}
			prevParent = parent.id;
		}
		// vscode.window.showInformationMessage(`include ${(performance.now() - start).toFixed(3)}ms`);
	}

	if (true) { // 'dead' TextMate code
		// vscode.window.showInformationMessage(JSON.stringify("diagnostics TextMate dead"));
		// const start = performance.now();

		// Some queries are very performance heavy during startup +8000ms
		const deadQuery = `;scm
			(json (fileTypes) @fileTypes)
			(json (firstLineMatch) @firstLineMatch)
			(json (foldingStartMarker) @foldingStartMarker)
			(json (foldingStopMarker) @foldingStopMarker)

			(repo (repository) @repository !patterns !include)
			;(repo (repository) @repository [(match) (begin)])
			;(repo [(match) (begin)] (repository) @repository)
			;(repo (patterns) @patterns (match))
			;(repo (match) (patterns) @patterns)
			;(repo (include) @include [(match) (begin) (patterns)])
			;(repo [(match) (begin) (patterns)] (include) @include)
			;(repo [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @begin (match))
			;(repo (match) [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @begin)
			;(repo (end) @end (while))
			;(repo (while) (end) @end)
			(repo [(captures) @captures (name) @name] !match !begin)
			(repo [(while) @while (end) @end (beginCaptures) @beginCaptures (whileCaptures) @whileCaptures (endCaptures) @endCaptures (contentName) @contentName (applyEndPatternLast) @applyEndPatternLast] !begin)
			(repo (whileCaptures) @whileCaptures !while)
			(repo [(endCaptures) @endCaptures (applyEndPatternLast) @applyEndPatternLast] !end)
			(repo (disabled) @disabled)

			(pattern (repository) @repositoryPatterns !patterns)
			;(pattern (repository) @repositoryPatterns [(match) (begin)])
			;(pattern [(match) (begin)] (repository) @repositoryPatterns)
			;(pattern (patterns) @patternsPatterns [(match) (include)])
			;(pattern [(match) (include)] (patterns) @patternsPatterns)
			;(pattern (match) @match (include))
			;(pattern (include) (match) @match)
			;(pattern [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns [(match) (include)])
			;(pattern [(match) (include)] [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns)
			;(pattern (match) [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns)
			;(pattern (include) [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns)
			(pattern [(captures) @captures (name) @name] !match !begin)
			(pattern [(while) @while (end) @end (beginCaptures) @beginCaptures (whileCaptures) @whileCaptures (endCaptures) @endCaptures (contentName) @contentName (applyEndPatternLast) @applyEndPatternLast] !begin)
			(pattern (whileCaptures) @whileCaptures !while)
			(pattern [(endCaptures) @endCaptures (applyEndPatternLast) @applyEndPatternLast] !end)
			(pattern (disabled) @disabled)

			(capture (include) @includeCapture)
			(capture [(repository) (match) (begin) (while) (end) (contentName) (captures) (beginCaptures) (whileCaptures) (endCaptures) (applyEndPatternLast) (disabled)] @capture !patterns)
		`;

		const deadCaptures = queryNode(rootNode, deadQuery);

		for (const deadCapture of deadCaptures) {
			const node = deadCapture.node;
			const name = deadCapture.name;

			const message = {
				repository: `"repository" requires either "patterns" or "include" to be present and "match"/"begin" to be absent.`,
				repositoryPatterns: `"repository" requires "patterns" to be present and "match", "begin" & "include" to be absent.`,
				patterns: `"patterns" requires "match" to be absent.`,
				patternsPatterns: `"patterns" requires "match" and "include" to be absent.`,
				include: `"include" requires "match", "begin" and "patterns" to be absent.`,
				includeCapture: `"include" requires "patterns" to be present and "patterns" to be absent. Rendering it useless.`,
				match: `"match" requires "include" to be absent.`,
				begin: `"begin" requires "match" to be absent.`,
				beginPatterns: `"begin" requires "match" and "include" to be absent.`,
				while: `"while" requires "begin" to be present.`,
				end: `"end" requires "begin" to be present and "while" to be absent.`,
				name: `"name" requires either "match" or "begin" to be present.`,
				contentName: `"contentName" requires "begin" to be present.`,
				captures: `"captures" requires "match", "begin", "while" or "end" to be present.`,
				beginCaptures: `"beginCaptures" requires "begin" to be present.`,
				whileCaptures: `"whileCaptures" requires "while" to be present.`,
				endCaptures: `"endCaptures" requires "end" to be present.`,
				applyEndPatternLast: `"applyEndPatternLast" requires "end" to be present.`,
				capture: `"patterns" is required to be present.`,
			}[name]
				?? `"${name}" has no affect under VSCode TextMate.`;

			const range = toRange(node);
			const diagnostic: vscode.Diagnostic = {
				range: range,
				message: message,
				severity: vscode.DiagnosticSeverity.Hint,
				source: 'TextMate',
				code: 'dead',
				tags: [vscode.DiagnosticTag.Unnecessary],
			};
			diagnostics.push(diagnostic);
		}

		// vscode.window.showInformationMessage(`dead ${(performance.now() - start).toFixed(3)}ms`);
	}

	if (false) { // create artificial lag
		const start = performance.now();
		for (let i = 0; i < 1000; i++) {
			queryNode(rootNode, `(ERROR) @ERROR`);
		}
		// vscode.window.showInformationMessage(performance.now() - start + "ms");
	}

	// vscode.window.showInformationMessage(JSON.stringify(diagnostics));
	DiagnosticCollection.set(document.uri, diagnostics);
	// vscode.window.showInformationMessage(`Diagnostics ${(performance.now() - start).toFixed(3)}ms`);
}

function jsonEscapeReplacer(substring: string): string {
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
		case 'u': // unicode \u0000
			const hexStr = substring.substring(2, 6);
			const hexCode = parseInt(hexStr, 16);
			const char = String.fromCodePoint(hexCode);
			return char;
	}
}

import * as vscode from 'vscode';
import * as webTreeSitter from 'web-tree-sitter';
import * as vscodeOniguruma from 'vscode-oniguruma';
import * as textmateOnigmo from 'vscode-onigmo';
import * as PCRE from '@syntropiq/libpcre-ts';
import * as onigurumaToES from 'oniguruma-to-es';
import { closeEnoughQuestionMark, DocumentSelector, getPackageJSON, JSONParseStringRelaxed, stringify, tryCatch, wagnerFischer } from "./extension";
import { getLastNode, getTrees, queryNode, toRange, trees } from "./TreeSitter";
import { ignoreDiagnosticsUnusedRepos } from "./Providers/CodeActionsProvider";
import { unicodeproperties } from "./UNICODE_PROPERTIES";


type Pointer = number;
type IOnigBinding = {
	HEAP8: Int8Array;
	HEAP16: Int16Array;
	HEAP32: Int32Array;
	HEAPU8: Uint8Array;
	HEAPU16: Uint16Array;
	HEAPU32: Uint32Array;
	HEAPF32: Float32Array;
	HEAPF64: Float64Array;

	calledRun: boolean;
	ready: {};

	print: vscodeOniguruma.ICommonOptions['print'];
	instantiateWasm: vscodeOniguruma.IInstantiatorOptions['instantiator'];

	_omalloc(count: number): Pointer;
	_ofree(ptr: Pointer): void;
	UTF8ToString(ptr: Pointer): string;

	_getLastOnigError(): Pointer;
	_createOnigScanner(strPtrsPtr: Pointer, strLenPtr: Pointer, count: number, options: number, syntax: Pointer): Pointer;
	_freeOnigScanner(ptr: Pointer): void;
	_findNextOnigScannerMatch(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;
	_findNextOnigScannerMatchDbg(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;

	___wasm_call_ctors(...args: any[]): unknown;
	___errno_location(...args: any[]): unknown;
	stackSave(...args: any[]): unknown;
	stackRestore(...args: any[]): unknown;
	stackAlloc(...args: any[]): unknown;
	dynCall_jiji(...args: any[]): unknown;
};
type OnigScanner = vscodeOniguruma.OnigScanner & {
	readonly _onigBinding: IOnigBinding;
	readonly _ptr: Pointer;
	readonly _options: vscodeOniguruma.FindOption[];
};

type IOnigmoBinding = {
	HEAP8: Int8Array;
	HEAP16: Int16Array;
	HEAP32: Int32Array;
	HEAPU8: Uint8Array;
	HEAPU16: Uint16Array;
	HEAPU32: Uint32Array;
	HEAPF32: Float32Array;
	HEAPF64: Float64Array;

	calledRun: boolean;
	ready: {};

	print: textmateOnigmo.ICommonOptions['print'];
	instantiateWasm: textmateOnigmo.IInstantiatorOptions['instantiator'];

	_omalloc(count: number): Pointer;
	_ofree(ptr: Pointer): void;
	UTF8ToString(ptr: Pointer): string;

	_getLastOnigError(): Pointer;
	_createOnigScanner(strPtrsPtr: Pointer, strLenPtr: Pointer, count: number, options: number, syntax: Pointer): Pointer;
	_freeOnigScanner(ptr: Pointer): void;
	_findNextOnigScannerMatch(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;
	_findNextOnigScannerMatchDbg(scanner: Pointer, strCacheId: number, strData: Pointer, strLength: number, position: number, options: number): number;

	BindingError(...args: any[]): unknown;
	InternalError(...args: any[]): unknown;
	count_emval_handles(...args: any[]): unknown;
	__embind_initialize_bindings(...args: any[]): unknown;
	dynCall_jiji(...args: any[]): unknown;

	ONIG_OPTION_DEFAULT: 0;
	ONIG_OPTION_NONE: 0;
	ONIG_OPTION_IGNORECASE: 1;
	ONIG_OPTION_EXTEND: 2;
	ONIG_OPTION_MULTILINE: 4;
	ONIG_OPTION_SINGLELINE: 8;
	ONIG_OPTION_FIND_LONGEST: 16;
	ONIG_OPTION_FIND_NOT_EMPTY: 32;
	ONIG_OPTION_NEGATE_SINGLELINE: 64;
	ONIG_OPTION_DONT_CAPTURE_GROUP: 128;
	ONIG_OPTION_CAPTURE_GROUP: 256;
	ONIG_OPTION_NOTBOL: 512;
	ONIG_OPTION_NOTEOL: 1024;
	ONIG_OPTION_POSIX_REGION: 2048;
	ONIG_OPTION_MAXBIT: 131072;
	ONIG_SYNTAX_DEFAULT: 325520;
	ONIG_SYNTAX_ASIS: 326008;
	ONIG_SYNTAX_POSIX_BASIC: 326048;
	ONIG_SYNTAX_POSIX_EXTENDED: 326088;
	ONIG_SYNTAX_EMACS: 326128;
	ONIG_SYNTAX_GREP: 326168;
	ONIG_SYNTAX_GNU_REGEX: 326208;
	ONIG_SYNTAX_JAVA: 326248;
	ONIG_SYNTAX_PERL: 326288;
	ONIG_SYNTAX_RUBY: 325520;
	ONIG_SYNTAX_PYTHON: 326328;
};
type OnigmoScanner = textmateOnigmo.OnigScanner & {
	readonly _onigBinding: IOnigmoBinding;
	readonly _ptr: Pointer;
	readonly _options: textmateOnigmo.FindOption[];
};

export type Diagnostic = vscode.Diagnostic & {
	node?: webTreeSitter.Node;
	source: vscode.Diagnostic['source'];
	// code: vscode.Diagnostic['code'];
};

const pcre = new PCRE.PCRE();

const activeDocuments: {
	[uriString: string]: {
		document: vscode.TextDocument;
		countDown: number;
		timeout: NodeJS.Timeout | number | undefined; // VSCode vs VSCode Web;
	};
} = {};


const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");
export async function initDiagnostics(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("initDiagnostics"));

	await pcre.init();

	context.subscriptions.push(DiagnosticCollection);

	for (const editor of vscode.window.visibleTextEditors) {
		// vscode.window.showInformationMessage(`visible\n${JSON.stringify(document)}`);
		debouncedDiagnostics(editor.document);
	}

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(debouncedDiagnostics),
		vscode.workspace.onDidChangeTextDocument((edits: vscode.TextDocumentChangeEvent) => {
			debouncedDiagnostics(edits.document);
		}),
		vscode.workspace.onDidCloseTextDocument((document: vscode.TextDocument) => {
			delete activeDocuments[document.uri.toString()];
			DiagnosticCollection.delete(document.uri);
		}),
		vscode.window.onDidChangeActiveTextEditor((textEditor: vscode.TextEditor | undefined) => {
			if (textEditor) {
				const document = textEditor.document;
				debouncedDiagnostics(document);
			}
		}),
	);
}

export function debouncedDiagnostics(document: vscode.TextDocument) {
	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}

	// https://github.com/microsoft/vscode/issues/11487
	const uriString = document.uri.toString();
	const activeDocument: typeof activeDocuments[string] = activeDocuments[uriString] = activeDocuments[uriString] ?? {
		document: document,
		countDown: 0,
		timeout: undefined,
	};
	activeDocument.document = document;
	activeDocument.countDown++; // waits longer the more edits there are

	// Debounce recently repeated requests
	if (activeDocument.timeout === undefined) {

		// Wait 50ms and repeatedly execute CallBack
		activeDocument.timeout = setInterval(
			async () => {
				// setInterval() waits for current callback to finish

				if (activeDocument.countDown < 0) {
					clearInterval(activeDocument.timeout); // timeout.refresh() doesn't work in VSCode web
					activeDocument.timeout = undefined;
					await Diagnostics(activeDocument.document);
				}

				activeDocument.countDown -= 2;
			},
			50, // 50 milliseconds
		);
	}
}

async function Diagnostics(document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(`Diagnostics${JSON.stringify(document)}`);
	// const start = performance.now();

	const diagnostics: Diagnostic[] = [];

	await Promise.allSettled([
		tryCatch(diagnosticsMismatchingPackageJSONInfo(diagnostics, document), "Diagnostics error:", "MismatchingPackageJSONInfo"),
		tryCatch(() => diagnosticsTreeSitterJSONErrors(diagnostics, document), "Diagnostics error:", "TreeSitterJSONErrors"),
		tryCatch(() => diagnosticsTreeSitterRegexErrors(diagnostics, document), "Diagnostics error:", "TreeSitterRegexErrors"),
		tryCatch(() => diagnosticsRegularExpressionErrors(diagnostics, document), "Diagnostics error:", "OnigurumaRegexErrors"),
		tryCatch(() => diagnosticsBrokenIncludes(diagnostics, document), "Diagnostics error:", "BrokenIncludes"),
		tryCatch(() => diagnosticsUnusedRepos(diagnostics, document), "Diagnostics error:", "UnusedRepos"),
		tryCatch(() => diagnosticsLinguistCaptures(diagnostics, document), "Diagnostics error:", "LinguistCaptures"),
		tryCatch(() => diagnosticsHints(diagnostics, document), "Diagnostics error:", "Hints"),
		tryCatch(() => diagnosticsDeadTextMateCode(diagnostics, document), "Diagnostics error:", "DeadTextMateCode"),
	]);

	DiagnosticCollection.set(document.uri, diagnostics);
	// vscode.window.showInformationMessage(`Diagnostics ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(diagnostics)}`);
}


function diagnosticsTreeSitterJSONErrors(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics JSON"));
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;
	const jsonQuery = `;scm
			(ERROR) @ERROR
			(MISSING) @missing
		`;
	const jsonCaptures = queryNode(rootNode, jsonQuery);

	for (const queryCapture of jsonCaptures) {
		const node = queryCapture.node;
		const type = node.type;
		const text = node.text;
		const range = toRange(node);
		const parent = node.parent;
		const parentType = parent?.type;

		let diagnostic!: Diagnostic;
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
					range: toRange(node.previousSibling!.endPosition),
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

function diagnosticsTreeSitterRegexErrors(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex"));
	// const start = performance.now();
	const regexTrees = getTrees(document).regexTrees;
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
			(MISSING) @missing
		`;
		const queryCaptures = queryNode(tree.rootNode, queryString);

		for (const queryCapture of queryCaptures) {
			const node = queryCapture.node;
			const type = node.type;
			const text = node.text;
			const range = toRange(node);
			const parent = node.parent;
			const parentType = parent?.type;

			let diagnostic: Diagnostic;
			const name = queryCapture.name;
			switch (name) {
				case 'ERROR':
				case 'error':
				case 'error_':
					diagnostic = {
						range: range,
						message: `'${text}' is not valid at this position inside '${parentType || 'regex'}'`,
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
					const parentRange = toRange(parent!);
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

function diagnosticsRegularExpressionErrors(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics Regexes"));
	// const start = performance.now();
	const trees = getTrees(document);
	const regexNodes = trees.regexNodes;

	for (const regexNode of regexNodes.values()) {
		const text = regexNode.text;
		const key = regexNode.previousNamedSibling;
		if (!key) {
			continue;
		}

		let groupCaptures!: webTreeSitter.QueryCapture[];

		const regex: string = JSONParseStringRelaxed(text);
		const hasBackreferences = (key.text == 'end' || key.text == 'while') && /\\[0-9]/.test(regex);
		const beginNode = hasBackreferences ? getLastNode(regexNode.parent!.parent!, 'begin')?.childForFieldName('regex') : null;
		if (beginNode) {
			const beginRegex = trees.regexTrees.get(beginNode.id)?.rootNode;
			if (!beginRegex) {
				continue;
			}
			const captureGroupQuery = `;scm
					(regex) @regex
					(capture_group) @group
					(capture_group_extended) @group
					(capture_group_name) @name
					(capture_group_name_extended) @name
				`;
			groupCaptures = queryNode(beginRegex, captureGroupQuery);
		}


		const startTimeOniguruma = performance.now();
		let errorCodeOniguruma: string;
		try {
			// VSCode TextMate uses oniguruma
			let replacedRegex = regex;
			if (hasBackreferences) {
				// VSCode TextMate replaces the backreferences directly
				if (beginNode) {
					let index = 0;
					for (const groupCapture of groupCaptures) {
						const groupText = extractCaptureGroupText(groupCapture).replaceAll(/[\-\\{}*+?|^$.,\[\]()#\s]/g, '\\$&');
						// https://github.com/microsoft/vscode-textmate/blob/main/src/utils.ts#L160
						// https://github.com/microsoft/vscode-textmate/issues/239

						replacedRegex = replacedRegex.replaceAll(
							// VSCode TextMate targets all escaped numbers /\\[0-9]+/
							// not correctly accounting for escaped backslashes
							new RegExp(
								/\\0*/.source + index + /(?![0-9])/.source,
								'g',
							),
							groupText,
						);
						index++;
					}
				}
				replacedRegex = replacedRegex.replaceAll(/\\[0-9]+/g, ''); // All non-existent backreferences are removed
			}

			const scanner = new vscodeOniguruma.OnigScanner([replacedRegex]) as OnigScanner;
			const onigBinding = scanner._onigBinding;
			errorCodeOniguruma = onigBinding.UTF8ToString(onigBinding._getLastOnigError());

			scanner.dispose();
		} catch (error: any) {
			errorCodeOniguruma = error?.message || String(error);
		}
		errorCodeOniguruma = errorCodeOniguruma?.replace(/^undefined error code$/, '');
		const timeOniguruma = performance.now() - startTimeOniguruma;
		const timeMessageOniguruma = ` (${timeOniguruma.toFixed()}ms)`;
		// vscode.window.showInformationMessage(`timeOniguruma ${timeOniguruma.toFixed(3)}ms`);


		const startTimeOnigmo = performance.now();
		let errorCodeOnigmo: string;
		try {
			// TextMate 2.0 uses Onigmo
			let replacedRegex = regex;
			if (hasBackreferences) {
				if (beginNode) {
					let index = 0;
					for (const groupCapture of groupCaptures) {
						const groupText = extractCaptureGroupText(groupCapture).replaceAll(/[\\|([{}\]).?*+^$]/g, '\\$&');
						// https://github.com/textmate/textmate/blob/master/Frameworks/parse/src/parse.cc#L120

						replacedRegex = replacedRegex.replaceAll(
							// TextMate 2.0 only targets single digit backreferences /\\[0-9]/
							// https://github.com/textmate/textmate/blob/master/Frameworks/parse/src/parse.cc#L136-L148
							new RegExp(
								/\\\\|\\/.source + index,
								'g',
							),
							(match: string): string => match === '\\\\' ? '\\\\' : groupText,
						);
						index++;
					}
				}
			}

			// throws error if regex invalid
			const scanner = new textmateOnigmo.OnigScanner([replacedRegex]) as OnigmoScanner;
			const onigBinding = scanner._onigBinding;
			errorCodeOnigmo = onigBinding.UTF8ToString(onigBinding._getLastOnigError());

			scanner.dispose();
		} catch (error: any) {
			errorCodeOnigmo = error?.message || String(error);
		}
		errorCodeOnigmo = errorCodeOnigmo?.replace(/^Error: /, '');
		const timeOnigmo = performance.now() - startTimeOnigmo;
		const timeMessageOnigmo = ` (${timeOnigmo.toFixed()}ms)`;
		// vscode.window.showInformationMessage(`timeOnigmo ${timeOnigmo.toFixed(3)}ms`);


		const startTimePCRE = performance.now();
		let errorCodePCRE: string | undefined;
		try {
			// Github/Linguist uses PCRE
			// and correctly escapes backreferences
			// https://github.com/github-linguist/linguist/discussions/7421

			let replacedRegex = regex;
			if (hasBackreferences) {
				if (beginNode) {
					let index = 0;
					for (const groupCapture of groupCaptures) {
						const groupText = groupCapture.node.text.slice( // substring() doesn't work with -1
							groupCapture.name == 'name' ? groupCapture.node.firstNamedChild!.text.length + 4 : // remove `(?<name>`
								groupCapture.name == 'group' ? 1 : // remove `(`
									0,
							groupCapture.name == 'regex' ? undefined : -1, // remove `)`
						).replace(/[\\|([{}\]).?*+^$]/g, '\\$&');

						replacedRegex = replacedRegex.replaceAll(
							// https://github.com/github-linguist/linguist/blob/main/tools/grammars/compiler/pcre.go#L27
							new RegExp(
								/\\\\|\\/.source + index,
								'g',
							),
							(match: string): string => match === '\\\\' ? '\\\\' : groupText,
						);
						index++;
					}
				}
			}

			if (replacedRegex.length > 32 * 1024) {
				// https://github.com/github-linguist/linguist/blob/main/tools/grammars/compiler/pcre.go#L55-L59
				errorCodePCRE = `'${replacedRegex.slice(0, 20)}${replacedRegex.length > 20 ? '…' : ''}': definition too long (${replacedRegex.length} bytes > 32768)`;
			}
			else if (pcre) {
				const pcreConstants = pcre.constants;
				// throws error if regex invalid
				const PCRERegex = pcre.compile(
					replacedRegex,
					// https://github.com/github-linguist/linguist/blob/main/tools/grammars/pcre/pcre.go#L35
					pcreConstants.DUPNAMES | pcreConstants.UTF8 | pcreConstants.NEWLINE_ANYCRLF,
				);

				const regexTree = trees.regexTrees.get(regexNode.id);
				if (regexTree) {
					const intersectionQuery = `;scm
						(character_class (literal) @literal (#match? @literal "&&"))
					`;
					const intersectionCaptures = queryNode(regexTree.rootNode, intersectionQuery);
					if (intersectionCaptures.length) {
						errorCodePCRE = 'Character Class Intersection "&&" is not supported';
					}
				}
			}
		} catch (error: any) {
			errorCodePCRE = error?.message || String(error);
		}
		errorCodePCRE = errorCodePCRE?.replace(/^PCRE compilation failed: /, '').replace(
			/\b\d+$/,
			(substring) => {
				// re-adjust error offset in accordance with JSON escaping
				const newOffsetRegex = new RegExp(
					/^(\\u[0-9A-Fa-f]{1,4}|\\.?|.)/.source + '{0,' + parseInt(substring) + '}',
					'g',
				);
				const newOffset = text.match(newOffsetRegex)?.[0].length ?? 0;
				// TODO: still need to re-adjust error offset in accordance with backreference replacements
				// TODO: PCRE treats characters > 127bits as 2 bytes
				return newOffset.toFixed();
			},
		);
		const timePCRE = performance.now() - startTimePCRE;
		const timeMessagePCRE = ` (${timePCRE.toFixed()}ms)`;
		// vscode.window.showInformationMessage(`timePCRE ${timePCRE.toFixed(3)}ms`);


		const startTimeES = performance.now();
		let errorCodeES: string | undefined;
		try {
			// https://shiki.style/ uses https://github.com/slevithan/oniguruma-to-es
			// There is no escaping backreferences, but orphan backreferences are ignored

			const options: onigurumaToES.ToRegExpOptions = {
				accuracy: 'default',
				verbose: true,
				lazyCompileLength: 0,
				rules: {
					// Follow `vscode-oniguruma` which enables this Oniguruma option by default
					captureGroup: true,
					allowOrphanBackrefs: hasBackreferences,
				},
			};
			const jsRegex = onigurumaToES.toRegExpDetails(regex, options);
		} catch (error: any) {
			errorCodeES = error?.message || String(error);
		}
		const timeES = performance.now() - startTimeES;
		const timeMessageES = ` (${timeES.toFixed()}ms)`;
		// vscode.window.showInformationMessage(`timeES ${timeES.toFixed(3)}ms`);

		const range = toRange(key);

		if (errorCodeOniguruma && errorCodeOnigmo && errorCodePCRE && errorCodeES) {
			diagnostics.push({
				range: range,
				message: errorCodeOniguruma + (timeOniguruma >= 1 ? timeMessageOniguruma : ''),
				severity: vscode.DiagnosticSeverity.Error,
				source: 'Oniguruma',
			});
			if (errorCodeOnigmo !== errorCodeOniguruma || Math.abs(timeOniguruma - timeOnigmo) > 10) {
				diagnostics.push({
					range: range,
					message: errorCodeOnigmo + (timeOnigmo >= 1 ? timeMessageOnigmo : ''),
					severity: vscode.DiagnosticSeverity.Error,
					source: 'Onigmo',
				});
			}
			diagnostics.push({
				range: range,
				message: errorCodePCRE + (timePCRE >= 1 ? timeMessagePCRE : ''),
				severity: vscode.DiagnosticSeverity.Error,
				source: 'PCRE',
			});
			diagnostics.push({
				range: range,
				message: errorCodeES + (timeES >= 1 ? timeMessageES : ''),
				severity: vscode.DiagnosticSeverity.Error,
				source: 'ES',
			});

			continue;
		}

		if (errorCodeOniguruma) {
			diagnostics.push({
				range: range,
				message: `Regex incompatible with VSCode TextMate${timeOniguruma >= 1 ? timeMessageOniguruma : ''} (Oniguruma v6.9.8)\n${errorCodeOniguruma}`,
				severity: vscode.DiagnosticSeverity.Error,
				source: 'Oniguruma',
			});
		}

		if (errorCodeOnigmo) {
			diagnostics.push({
				range: range,
				message: `Regex incompatible with TextMate 2.0${timeOnigmo >= 1 ? timeMessageOnigmo : ''} (Onigmo v5.13.5)\n${errorCodeOnigmo}`,
				severity: vscode.DiagnosticSeverity.Warning,
				source: 'Onigmo',
			});
		}

		if (errorCodePCRE) {
			diagnostics.push({
				range: range,
				message: `Regex incompatible with Github-Linguist${timePCRE >= 1 ? timeMessagePCRE : ''} (PCRE v8.36)\n${errorCodePCRE}`,
				severity: vscode.DiagnosticSeverity.Warning,
				source: 'PCRE',
			});
		}

		if (errorCodeES) {
			diagnostics.push({
				range: range,
				message: `Regex incompatible with Shiki${timeES >= 1 ? timeMessageES : ''} (oniguruma-to-es)\n${errorCodeES}`,
				severity: vscode.DiagnosticSeverity.Warning,
				source: 'ES',
			});
		}
	}
	// vscode.window.showInformationMessage(`Regexes ${(performance.now() - start).toFixed(3)}ms`);
}

function diagnosticsBrokenIncludes(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics #includes"))
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;

	let prevPatternsArrayId!: number;
	let errorCount!: number;

	const nestedRepoQuery = `;scm
		(repo (repository (repo (key) @repo)))
	`;
	let nestedRepoCaptures: webTreeSitter.QueryCapture[] = [];

	const repoQuery = `;scm
		(repo
			&include (repository
				(repo
					(key) @nestRepo))
			!match !begin)
		(repo
			&patterns (repository
				(repo
					(key) @nestRepo))
			!match !begin !include)
		(pattern
			&patterns (repository
				(repo
					(key) @nestRepo))
			!match !begin !include)
		(capture
			&patterns (repository
				(repo
					(key) @nestRepo))
			!match !begin)
	`;

	const rootRepoQuery = `(json (repository (repo (key) @rootRepo)))`;
	const rootRepoCaptures = queryNode(rootNode, rootRepoQuery);

	const includeQuery = `(include (value !scopeName (ruleName) @include))`;
	const includeCaptures = queryNode(rootNode, includeQuery);
	for (const includeCapture of includeCaptures) {
		const node = includeCapture.node;
		const text = node.text;

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

		const repoCaptures = queryNode(rootNode, repoQuery, node.startPosition, node.endPosition);
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

		const repoItems: string[] = [];
		for (const repoCapture of rootRepoCaptures) {
			repoItems.push(repoCapture.node.text);
		}
		for (const repoCapture of repoCaptures) {
			repoItems.push(repoCapture.node.text);
		}
		const distances = wagnerFischer(text, repoItems);
		const distance = distances[0]?.distance;

		let message = `Cannot find repo name '${text}'`;
		if (closeEnoughQuestionMark(distance, text)) {
			message += `. Did you mean '${distances[0].string}'?`;
		}
		else {
			if (nestedRepoCaptures.length == 0) {
				nestedRepoCaptures = queryNode(rootNode, nestedRepoQuery);
			}
			for (const repoCapture of nestedRepoCaptures) {
				const repoText = repoCapture.node.text;
				if (repoText == text) {
					message += `. Nested repository inaccessible`;
					break;
				}
			}
		}

		const range = toRange(node);
		const diagnostic: Diagnostic = {
			range: range,
			message: message,
			severity: vscode.DiagnosticSeverity.Warning,
			source: 'TextMate',
			code: 'include',
		};
		diagnostics.push(diagnostic);

		// Change `severity` to `Error` if every single `#include` cannot be found inside a `"patterns"` array
		const patternsArray = node.parent!.parent!.parent!.parent!;
		if (patternsArray.type != 'patterns') {
			continue;
		}

		const parentRule = patternsArray.parent!;
		if (parentRule.type == 'capture') {
			continue;
		}

		if (prevPatternsArrayId != patternsArray.id) {
			errorCount = 0;
		}

		errorCount++;
		if (patternsArray.namedChildCount - 1 == errorCount) {
			for (let index = diagnostics.length - errorCount; index < diagnostics.length; index++) {
				const diagnostic = diagnostics[index];
				diagnostic.severity = vscode.DiagnosticSeverity.Error;
				diagnostics[index] = diagnostic;
			}

			if (!parentRule.childForFieldName('match') && !(parentRule.type == 'pattern' && parentRule.childForFieldName('include')) && parentRule.type != 'json') {
				const range = toRange(parentRule);
				const diagnostic: Diagnostic = {
					range: range,
					message: 'The entire parent rule is nullified because all "#includes" failed.',
					severity: vscode.DiagnosticSeverity.Hint,
					source: 'TextMate',
					code: 'dead',
					tags: [vscode.DiagnosticTag.Unnecessary],
				};
				diagnostics.push(diagnostic);
			}
		}
		prevPatternsArrayId = patternsArray.id;
	}
	// vscode.window.showInformationMessage(`include ${(performance.now() - start).toFixed(3)}ms`);
}

function diagnosticsUnusedRepos(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	if (ignoreDiagnosticsUnusedRepos) {
		return;
	}
	// vscode.window.showInformationMessage(`diagnostics unusedRepos\n${JSON.stringify(rootNode)}`)
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;

	const includeCapturesCache: { [id: number]: webTreeSitter.QueryCapture[]; } = {};

	// should validate all #include first
	// but TS too slow
	const includeQuery = `;scm
		(include (value !scopeName (ruleName) @include))
	`;

	const repoQuery = `;scm
		(repo (key) @repo)
	`;
	const repoCaptures = queryNode(rootNode, repoQuery);
	for (const repoCapture of repoCaptures) {
		const repoNode = repoCapture.node;
		const repoText = repoNode.text;

		const repositoryParentNode = repoNode.parent!.parent!.parent!;
		const repoParentId = repositoryParentNode.id;

		if (!includeCapturesCache[repoParentId]) {
			includeCapturesCache[repoParentId] = queryNode(repositoryParentNode, includeQuery);
		}

		let foundInclude = false;
		for (const includeCapture of includeCapturesCache[repoParentId]) {
			const includeText = includeCapture.node.text;
			if (repoText == includeText) {
				foundInclude = true;
				break;
			}
		}
		if (foundInclude) {
			continue;
		}

		const range = toRange(repoNode);
		diagnostics.push({
			range: range,
			message: `No "#include" references found to '${repoText}'`,
			severity: vscode.DiagnosticSeverity.Information,
			source: 'TextMate',
			code: 'repo',
		});
	}

	// vscode.window.showInformationMessage(`unusedRepos ${(performance.now() - start).toFixed(3)}ms`);
}

function diagnosticsDeadTextMateCode(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics TextMate dead"));
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;

	const deadQuery = `;scm
		(fileTypes) @fileTypes
		(firstLineMatch) @firstLineMatch
		(foldingStartMarker) @foldingStartMarker
		(foldingStopMarker) @foldingStopMarker
		(disabled) @disabled

		((end) @end (while))
		((while) (end) @end)

		(repo (repository) @repository !patterns !include)
		(repo (repository) @repository &match)
		(repo (repository) @repository &begin !match)
		(repo (patterns) @patterns &match)
		(repo (include) @include &match)
		(repo (include) @include &begin !match)
		(repo (include) @include &patterns !begin !match)
		(repo [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @begin &match)
		(repo [(captures) @captures (name) @name (name_scopeName) @name] !match !begin)
		(repo [(while) @while (end) @end (beginCaptures) @beginCaptures (whileCaptures) @whileCaptures (endCaptures) @endCaptures (contentName) @contentName (applyEndPatternLast) @applyEndPatternLast] !begin)
		(repo (whileCaptures) @whileCaptures !while)
		(repo [(endCaptures) @endCaptures (applyEndPatternLast) @applyEndPatternLast] !end)
		(repo (patterns . (key) . ) @patternsEmpty !match !include)
		(repo (key) @repoEmpty !match !begin !include !patterns)

		(pattern (repository) @repositoryPatterns !patterns)
		(pattern (repository) @repositoryPatterns &match)
		(pattern (repository) @repositoryPatterns &begin !match)
		(pattern (repository) @repositoryPatterns &include !begin !match)
		(pattern (patterns) @patternsPatterns &match)
		(pattern (patterns) @patternsPatterns &include !match)
		(pattern (match) @match &include)
		(pattern [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns &match)
		(pattern [(begin) (while) (end) (beginCaptures) (whileCaptures) (endCaptures) (contentName) (applyEndPatternLast)] @beginPatterns &include !match)
		(pattern [(captures) @captures (name) @name (name_scopeName) @name] !match !begin)
		(pattern [(while) @while (end) @end (beginCaptures) @beginCaptures (whileCaptures) @whileCaptures (endCaptures) @endCaptures (contentName) @contentName (applyEndPatternLast) @applyEndPatternLast] !begin)
		(pattern (whileCaptures) @whileCaptures !while)
		(pattern [(endCaptures) @endCaptures (applyEndPatternLast) @applyEndPatternLast] !end)
		(pattern (patterns . (key) .) @patternsEmpty !match !include)
		(pattern !match !begin !include !patterns) @patternEmpty

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
			repoEmpty: `Empty "repo".`,
			patterns: `"patterns" requires "match" to be absent.`,
			patternsPatterns: `"patterns" requires "match" and "include" to be absent.`,
			patternsEmpty: `Empty "patterns".`,
			patternEmpty: `Empty "pattern".`,
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
		const diagnostic: Diagnostic = {
			range: range,
			message: message,
			severity: vscode.DiagnosticSeverity.Hint,
			source: 'TextMate',
			code: 'dead',
			tags: [vscode.DiagnosticTag.Unnecessary],
		};
		diagnostics.push(diagnostic);
	}

	// vscode.window.showInformationMessage(`dead ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(diagnostics, stringify)}`);
}

async function diagnosticsMismatchingPackageJSONInfo(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// const start = performance.now();

	const { packageJSON, packageUri } = await getPackageJSON(document);
	if (!packageJSON) {
		return;
	}
	const grammars = packageJSON.contributes?.grammars;
	if (!Array.isArray(grammars)) {
		return;
	}

	const rootNode = getTrees(document).jsonTree.rootNode;
	const query = `;scm
		(json (scopeName (value) @scopeName))
		(json (injectionSelector) @injectionSelector)
	`;
	const queryCaptures = queryNode(rootNode, query);

	let injectToPresent = false;
	let injectionSelectorPresent = false;
	for (const grammar of grammars) {
		const path = grammar.path;
		if (!path) {
			continue;
		}
		const uri = vscode.Uri.joinPath(packageUri, '..', path);
		if (document.uri.path == uri.path) {
			for (const queryCapture of queryCaptures) {
				switch (queryCapture.name) {
					case 'injectionSelector':
						injectionSelectorPresent = true;
						break;
					case 'scopeName':
						const scopeName = queryCapture.node.text;
						if (grammar.scopeName == scopeName) {
							break;
						}

						const range = toRange(queryCapture);
						const diagnostic: Diagnostic = {
							range: range,
							message: `scopeName '${scopeName}' does not match scopeName '${grammar.scopeName}' inside './${vscode.workspace.asRelativePath(packageUri, false)}'`,
							severity: vscode.DiagnosticSeverity.Error,
							source: 'TextMate',
							code: 'scopeName',
						};
						diagnostics.push(diagnostic);
						break;
				}
			}

			if (grammar.injectTo?.length) {
				injectToPresent = true;
				if (!injectionSelectorPresent) {
					const rootObjectQuery = `;scm
						(json . "{" @rootObject)
					`;
					const rootObjectCaptures = queryNode(rootNode, rootObjectQuery);
					for (const rootObjectCapture of rootObjectCaptures) {
						const range = toRange(rootObjectCapture);
						const diagnostic: Diagnostic = {
							range: range,
							message: `Missing property "injectionSelector".`,
							severity: vscode.DiagnosticSeverity.Warning,
							source: 'TextMate',
							code: 'injectionSelector',
						};
						diagnostics.push(diagnostic);
					}
				}
			}
		}
	}

	if (injectionSelectorPresent && !injectToPresent) {
		for (const queryCapture of queryCaptures) {
			switch (queryCapture.name) {
				case 'injectionSelector':
					const range = toRange(queryCapture);
					const diagnostic: Diagnostic = {
						range: range,
						message: '"injectionSelector" requires "injectTo" to be present under "grammars" inside `package.json`.',
						severity: vscode.DiagnosticSeverity.Hint,
						source: 'TextMate',
						code: 'dead',
						tags: [vscode.DiagnosticTag.Unnecessary],
					};
					diagnostics.push(diagnostic);
					break;
			}
		}
	}
	// vscode.window.showInformationMessage(`packageJSON ${(performance.now() - start).toFixed(3)}ms`);
}

function diagnosticsLinguistCaptures(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics (captures)"))
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;

	const capturesQuery = `;scm
		(captures		"{" (_ (key) @captures))
		(beginCaptures	"{" (_ (key) @beginCaptures))
		(endCaptures	"{" (_ (key) @endCaptures))
		(whileCaptures	"{" (_ (key) @whileCaptures))
		(captures		"{" (_ "{") @object)
		(beginCaptures	"{" (_ "{") @object)
		(endCaptures	"{" (_ "{") @object)
		(whileCaptures	"{" (_ "{") @object)
	`;
	const capturesCaptures = queryNode(rootNode, capturesQuery);
	// vscode.window.showInformationMessage(`(captures) ${JSON.stringify(capturesCaptures)} ${(performance.now() - start).toFixed(3)}ms`);
	for (const captureCapture of capturesCaptures) {
		const name = captureCapture.name;
		if (name === 'object') {
			diagnostics.pop();
			continue;
		}

		const node = captureCapture.node;

		const range = toRange(node);
		const diagnostic: Diagnostic = {
			range: range,
			message: 'Incompatible with Github-Linguist. Only object values are supported within "captures"',
			severity: vscode.DiagnosticSeverity.Warning,
			source: 'TextMate',
			code: 'captures',
		};
		diagnostics.push(diagnostic);
	}

	// vscode.window.showInformationMessage(`(captures) ${(performance.now() - start).toFixed(3)}ms`);
}

function diagnosticsHints(diagnostics: Diagnostic[], document: vscode.TextDocument) {
	// const start = performance.now();
	const rootNode = getTrees(document).jsonTree.rootNode;

	const query = `;scm
		(repo . (key) . (patterns (key) @patterns . (_) .) .)
		(pattern . (patterns (key) @patterns . (_) .) .)
		(repo (name (value) @name (#match? @name " ")) !name_scopeName)
		(pattern (name (value) @name (#match? @name " ")) !name_scopeName)
		(capture (name (value) @name (#match? @name " ")) !name_scopeName)
		(contentName (value) @contentName (#match? @contentName " "))
	`;
	const captures = queryNode(rootNode, query);
	for (const capture of captures) {
		const node = capture.node;
		const range = toRange(node);

		const name = capture.name;
		switch (name) {
			case 'name':
			case 'contentName':
				const text = node.text;
				const scopes = text.split(' ');
				const firstSubScopes = text.match(/^[^ ]+(?=\.[^ ]* )/)?.[0];
				diagnostics.push({
					range: range,
					message: `TextMate 2.0 and Github-Linguist handle space separated scopes differently to VSCode TextMate.
								VSCode will split the scopes on spaces.
								  \`${text}\` will apply ${scopes.length} different scopes; \`${scopes.join('`, `')}\`.
								TextMate and Github will not split the scopes.
								  They instead will try to match against the literal singular scopeName \`${text}\`.
								  However their theme parser will split scopes on spaces.
								  So effectively only the first sub-scope(s) \`${firstSubScopes ?? ''}\` can ever be matched against.
								${name == 'name' ? 'TextMate 2.0 allows you to use "scopeName" to override "name".' : ''}`.replaceAll('\t', ''),
					severity: firstSubScopes ? vscode.DiagnosticSeverity.Hint : vscode.DiagnosticSeverity.Warning,
					source: 'TextMate',
					code: 'spaceScopes',
					node: node,
				});
				break;
			case 'patterns':
				diagnostics.push({
					range: range,
					message: 'Patterns array not required for a single rule.',
					severity: vscode.DiagnosticSeverity.Hint,
					source: 'TextMate',
					code: 'singlePattern',
					node: node.parent!,
				});
				break;
		}
	}

	// vscode.window.showInformationMessage(`Hints ${(performance.now() - start).toFixed(3)}ms`);
}


function extractCaptureGroupText(groupCapture: webTreeSitter.QueryCapture) {
	const name = groupCapture.name;
	const node = groupCapture.node;
	const nodeText = node.text;
	const groupText = nodeText.slice( // substring() doesn't work with -1
		name === 'name' ?
			node.firstNamedChild!.text.length + 4 : // remove `(?<name>`
			name === 'group' ?
				1 : // remove `(`
				0, // start of regex

		name === 'regex' ?
			undefined : // end of regex
			-1, // remove `)`
	);
	return JSONParseStringRelaxed(groupText);
}

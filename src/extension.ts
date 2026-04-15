import * as vscode from 'vscode';
import { IRelaxedExtensionManifest } from "./extensions";

import { initTreeSitter } from "./TreeSitter";
import { initOniguruma } from "./Oniguruma";
import { initTextMate } from "./TextMate";
import { initDiagnostics } from "./DiagnosticCollection";
import { initTokenColorCustomizations } from "./tokenColorCustomizations";
import { initThemeScopes } from "./themeScopeColors";
import { initFileConverter } from "./fileConverter";
import { initCallStackView } from "./Providers/TreeDataProvider";

import { HoverProvider } from "./Providers/HoverProvider";
import { RenameProvider } from "./Providers/RenameProvider";
import { CodeLensProvider } from "./Providers/CodeLensProvider";
import { ReferenceProvider } from "./Providers/ReferenceProvider";
import { DefinitionProvider } from "./Providers/DefinitionProvider";
import { InlayHintsProvider } from "./Providers/InlayHintsProvider";
import { CodeActionsProvider, metadata } from "./Providers/CodeActionsProvider";
import { CallHierarchyProvider } from "./Providers/CallHierarchyProvider";
import { DocumentSymbolProvider, metaData } from "./Providers/DocumentSymbolProvider";
import { SelectionRangeProvider } from "./Providers/SelectionRangeProvider";
import { DocumentDropEditProvider } from "./Providers/DocumentDropEditProvider";
import { DocumentHighlightProvider } from "./Providers/DocumentHighlightProvider";
import { CompletionItemProvider, triggerCharacters } from "./Providers/CompletionItemProvider";
import { OnTypeFormattingEditProvider, DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider } from "./Providers/DocumentFormattingEditProvider";
import { DocumentSemanticTokensProvider, SemanticTokensLegend } from "./Providers/DocumentSemanticTokensProvider";


export const DocumentSelector: vscode.DocumentSelector = [
	{ language: 'json-textmate' }
];

export async function activate(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));
	// const start = performance.now();

	await initTreeSitter(context);
	await initOniguruma(context);
	initTextMate(context);
	initDiagnostics(context);
	initCallStackView(context);
	initTokenColorCustomizations(context);
	initThemeScopes(context);
	initFileConverter(context);

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider), // Mouse over Hovers
		vscode.languages.registerRenameProvider(DocumentSelector, RenameProvider), // [F2] Rename
		vscode.languages.registerCodeLensProvider(DocumentSelector, CodeLensProvider), // Code Lens
		vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider), // Go to References
		vscode.languages.registerDefinitionProvider(DocumentSelector, DefinitionProvider), // ctrl+click Go to Definition
		// vscode.languages.registerInlayHintsProvider(DocumentSelector, InlayHintsProvider), // 
		vscode.languages.registerCodeActionsProvider(DocumentSelector, CodeActionsProvider, metadata), // right click => Refactor...
		vscode.languages.registerCallHierarchyProvider(DocumentSelector, CallHierarchyProvider), // right click => Peak Call Hierarchy
		vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider, metaData), // Breadcrumbs/Outline
		vscode.languages.registerSelectionRangeProvider(DocumentSelector, SelectionRangeProvider), // Expand and Shrink Selection
		vscode.languages.registerCompletionItemProvider(DocumentSelector, CompletionItemProvider, ...triggerCharacters), // Intellisense ctrl+space completions
		vscode.languages.registerDocumentDropEditProvider(DocumentSelector, DocumentDropEditProvider), // Drag and Drop `tmLanguage.json` files to `#include`
		vscode.languages.registerDocumentHighlightProvider(DocumentSelector, DocumentHighlightProvider), // Context aware cursor highlights
		vscode.languages.registerOnTypeFormattingEditProvider(DocumentSelector, OnTypeFormattingEditProvider, '}', ']', ':', ','), // Auto Format on certain characters
		vscode.languages.registerDocumentFormattingEditProvider(DocumentSelector, DocumentFormattingEditProvider), // right-click => Format Document
		vscode.languages.registerDocumentRangeFormattingEditProvider(DocumentSelector, DocumentRangeFormattingEditProvider), // right-click => Format Selection
		// vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend), // Context aware syntax highlighting
		// vscode.languages.registerDocumentRangeSemanticTokensProvider(DocumentSelector, DocumentRangeSemanticTokensProvider, SemanticTokensLegend), // Context aware syntax highlighting
	);

	// vscode.window.showInformationMessage(`Extension ${(performance.now() - start).toFixed(3)}ms`);
}


// This method is called when your extension is deactivated
export function deactivate() {
	// vscode.window.showInformationMessage(JSON.stringify("deactivate"));
	// https://github.com/microsoft/vscode/issues/105484
	// https://github.com/microsoft/vscode/issues/201664
}

export function sleep(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function stringify(this: any, key: string, value: any): any {
	if (typeof value === 'function') {
		return "<function>";
	}
	if (typeof value === 'symbol') {
		return "<symbol>";
	}
	if (typeof value === 'undefined') {
		return "<undefined>";
	}
	if (value === null) {
		return null;
	}
	if (value instanceof Map) {
		if (key == "_grammars") {
			return Array.from(value.keys());
		}
		return Array.from(value.entries());
	}
	if (key.startsWith("HEAP")) {
		return "<error>";
	}
	return value;
}

export function JSONParseStringRelaxed(string: string) {
	return string.replaceAll(
		/\\u[0-9A-Fa-f]{1,4}|\\.?/g,
		(escapeString) => {
			const escapeChar = escapeString.charAt(1);
			switch (escapeChar) {
				case 'u': // unicode \u0000
					const hexadecimalString = escapeString.substring(2, 6);
					const hexadecimalCode = parseInt(hexadecimalString, 16);
					return String.fromCodePoint(hexadecimalCode);
				case 'b': return '\b'; // backspace
				case 'f': return '\f'; // form feed
				case 'n': return '\n'; // newline
				case 'r': return '\r'; // carriage return
				case 't': return '\t'; // tab
				default:
					return escapeChar;
			}
		}
	);
}


export type spellingSuggestion = {
	candidate: string;
	distance: number;
	index: number;
};
// https://github.com/microsoft/TypeScript/blob/55423abe4d029017f19b6e4c32097591994836b4/src/compiler/core.ts#L2155-L2244
export function getSpellingSuggestion(word: string, candidates: readonly string[], max?: number): spellingSuggestion | undefined {
	let bestDistance = word.length * 0.5 + 1.15; // If the best result is worse than this, don't bother.
	if (max) {
		bestDistance = Math.min(bestDistance, max);
	}

	let bestCandidate: string | undefined;
	let candidateIndex!: number;
	let index = -1;

	for (const candidate of candidates) {
		index++;
		if (candidate && Math.abs(candidate.length - word.length) <= Math.max(2, word.length * 0.34, candidate.length * 0.28)) {
			if (candidate === word) {
				continue;
			}
			// Only consider candidates less than 3 characters long when they differ by case.
			// Otherwise, don't bother, since a user would usually notice differences of a 2-character name.
			if (word.length < 3 && candidate.length < 3 && candidate.toLowerCase() !== word.toLowerCase()) {
				continue;
			}

			const distance = levenshteinDistanceWithMax(word, candidate, bestDistance);
			if (distance === undefined || bestCandidate && distance >= bestDistance) {
				continue;
			}

			bestCandidate = candidate;
			bestDistance = distance;
			candidateIndex = index;
		}
	}

	return bestCandidate ?
		{
			candidate: bestCandidate,
			distance: bestDistance,
			index: candidateIndex,
		}
		: undefined;
}

// https://github.dev/kodmax/damerau-levenshtein-distance
// https://richardminerich.com/2012/09/levenshtein-distance-and-the-triangle-inequality/
// https://www.lemoda.net/text-fuzzy/damerau-levenshtein/
// const lastCharIndex = Array(256); // All ASCII chars TODO: transposition
/** Wagner–Fischer algorithm is a dynamic programming algorithm that computes the edit distance between two strings of characters */
function levenshteinDistanceWithMax(word: string, targetWord: string, max?: number): number | undefined {
	// Re-use array's
	let next: number[] = Array(targetWord.length + 1);
	let prev: number[] = Array.from(next.keys());

	prev[0] = word[0] == targetWord[0] ? 0 : 1;
	let i = 1;
	for (const char of word) {
		let rowMin = i;
		let j = 1;
		next[0] = i;
		for (const targetChar of targetWord) {
			const distance =
				char == targetChar // match
					? prev[j - 1]
					: Math.min(
						prev[j] + 1, // delete
						next[j - 1] + 1, // insert
						prev[j - 1] + // substitute
						(char.toLowerCase() == targetChar.toLowerCase()
							? 0.1 // case difference should be significantly cheaper than other differences
							: 1.05),
						// TODO: transposition (damerau)
					);
			next[j] = distance;
			j++;
			rowMin = Math.min(rowMin, distance);
		}

		if (max && rowMin > max) {
			return;
		}

		i++;
		[prev, next] = [next, prev];
	}

	const distance = prev[targetWord.length];
	return max && distance > max ? undefined : distance;
}


/*
 Parsing normal JSON
 Getting locations of all nodes
https://www.npmjs.com/package/jsonc-parser
https://www.npmjs.com/package/flatted
https://www.npmjs.com/package/json-asty
https://www.npmjs.com/package/json-cst
*/

export async function getPackageJSON(baseUri: vscode.TextDocument | vscode.Uri, ...pathSegments: string[]): Promise<{
	packageJSON: IRelaxedExtensionManifest;
	packageUri: vscode.Uri;
} | {
	packageJSON?: undefined;
	packageUri?: undefined;
}> {
	if ('isUntitled' in baseUri) {
		if (baseUri.isUntitled) {
			return {};
		}
	}

	const uri = 'uri' in baseUri ? baseUri.uri : baseUri;
	const newUri = uri.with({ query: '' }); // 'git file changes' document adds a query property. that then ruins readFile()

	let packageUri = vscode.Uri.joinPath(newUri, ...pathSegments, '..', '..', 'package.json');
	let file = await tryCatchAsync(vscode.workspace.fs.readFile(packageUri));

	if (!file) {
		packageUri = vscode.Uri.joinPath(newUri, ...pathSegments, '..', 'package.json'); // Maybe `package.json` is at the same level as the grammar file
		file = await tryCatchAsync(vscode.workspace.fs.readFile(packageUri));

		if (!file) {
			return {};
		}
	}

	const decoder = new TextDecoder(); // Works in VSCode web
	const text = decoder.decode(file);
	const packageJSON = tryCatchSync(
		() => JSON.parse(text) as IRelaxedExtensionManifest,
		"Failed to parse package.json",
	);

	if (!packageJSON) {
		return {};
	}

	return {
		packageJSON: packageJSON,
		packageUri: packageUri,
	};
}


// https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
export async function tryCatchAsync<T>(
	promiseOrFunction: Promise<T> | Thenable<T> | (() => T),
	...consoleLogMessages: any[]
): Promise<T | null> {
	try {
		if (typeof promiseOrFunction === 'function') {
			const data = promiseOrFunction();
			return data;
		}
		const data = await promiseOrFunction;
		return data;
	} catch (error: any) {
		if (consoleLogMessages.length) {
			console.warn('JSON TextMate Extension:', ...consoleLogMessages, '\n', error?.toString() || String(error));
		}
		return null;
	}
}

export function tryCatchSync<T>(
	Function: () => T,
	...consoleLogMessages: any[]
): T | null {
	try {
		const data = Function();
		return data;
	} catch (error: any) {
		if (consoleLogMessages.length) {
			console.warn('JSON TextMate Extension:', ...consoleLogMessages, '\n', error?.toString() || String(error));
		}
		return null;
	}
}

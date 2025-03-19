import * as vscode from 'vscode';

import { initTreeSitter } from "./TreeSitter";
import { initOniguruma } from "./Oniguruma";
import { initTextMate } from "./TextMate";
import { initDiagnostics } from "./DiagnosticCollection";
import { initCallStackView } from "./Providers/TreeDataProvider";
import { initTokenColorCustomizations } from "./tokenColorCustomizations";
import { initThemeScopes } from "./themeScopeColors";

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
import { IRelaxedExtensionManifest } from "./extensions";


export const DocumentSelector: vscode.DocumentSelector = [
	{ language: 'json-textmate' },
	{
		language: 'json',
		pattern: '**/syntaxes/*.json'
	}
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
		// vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend), // Context aware syntax highlighting
		// vscode.languages.registerDocumentRangeSemanticTokensProvider(DocumentSelector, DocumentRangeSemanticTokensProvider, SemanticTokensLegend), // Context aware syntax highlighting
		vscode.languages.registerDocumentRangeFormattingEditProvider(DocumentSelector, DocumentRangeFormattingEditProvider), // right-click => Format Selection
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

export function stringify(this: any, key: string, value: any) {
	if (typeof value === 'function') {
		return "<function>";
	}
	if (typeof value === 'symbol') {
		return "<symbol>";
	}
	if (typeof value === 'undefined') {
		return "<undefined>";
	}
	if (value == null) {
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


export function closeEnoughQuestionMark(distance: number, text: string): boolean {
	return distance < 1.5 * Math.sqrt(text.length); // more lenient for longer words
}

type wagnerFischerResult = {
	distance: number,
	index: number,
	string: string | string[],
};
/** Wagner–Fischer algorithm is a dynamic programming algorithm that computes the edit distance between two strings of characters */
export function wagnerFischer(word: string, directory: string[]): { distance: number, index: number, string: string; }[];
/** Interestingly this also works with arrays of strings */
export function wagnerFischer(words: string[], directorys: string[][]): { distance: number, index: number, string: string[]; }[];
export function wagnerFischer(word: string | string[], directory: string[] | string[][]): wagnerFischerResult[] {
	const distances: wagnerFischerResult[] = [];
	let index = 0;

	for (const targetWord of directory) {
		let prev = Array.from(Array(targetWord.length + 1).keys());
		// let prev = Array(targetWord.length + 1).fill(0);

		let i = 1;
		for (const char of word) {
			let next: number[] = Array(targetWord.length + 1);
			let j = 1;
			next[0] = i;
			for (const targetChar of targetWord) {
				if (char == targetChar) {
					next[j] = prev[j - 1];
				}
				else {
					next[j] = 1 + Math.min(
						prev[j],
						prev[j - 1],
						next[j - 1],
					);
				}
				j++;
			}
			i++;
			prev = next;
		}

		const distance = {
			distance: prev[targetWord.length],
			index: index,
			string: targetWord,
			prev: prev,
		};
		distances.push(distance);

		index++;
	}

	distances.sort((a, b) => {
		if (a.distance > b.distance) {
			return 1;
		}
		if (a.distance < b.distance) {
			return -1;
		}
		if (a.string.length < b.string.length) {
			return 1;
		}
		if (a.string.length > b.string.length) {
			return -1;
		}
		return 0;
	});

	return distances;
}


/*
 Parsing normal JSON
 Getting locations of all nodes
https://www.npmjs.com/package/jsonc-parser
https://www.npmjs.com/package/flatted
https://www.npmjs.com/package/json-asty
https://www.npmjs.com/package/json-cst
*/

export async function getPackageJSON(baseUri: vscode.TextDocument | vscode.Uri, ...pathSegments: string[]) {
	if ('isUntitled' in baseUri) {
		if (baseUri.isUntitled) {
			return {};
		}
	}

	const uri = 'uri' in baseUri ? baseUri.uri : baseUri;

	const packageUri1 = vscode.Uri.joinPath(uri, ...pathSegments, '..', '..', 'package.json');
	const packageUri2 = vscode.Uri.joinPath(uri, ...pathSegments, '..', 'package.json'); // Maybe grammar file is at the same level as `package.json`

	const file1 = await vscode.workspace.fs.readFile(packageUri1).then(null, () => { });
	const file = file1 || await vscode.workspace.fs.readFile(packageUri2).then(null, () => { });
	if (!file) {
		return {};
	}

	const packageUri = file1 ? packageUri1 : packageUri2;

	try {
		const decoder = new TextDecoder(); // Works in VSCode web
		const text = decoder.decode(file);

		const packageJSON: IRelaxedExtensionManifest = JSON.parse(text);
		if (packageJSON) {
			return { packageJSON: packageJSON, packageUri: packageUri };
		}
	} catch (error) {
		console.warn(`TextMate: Failed to parse package.json\n${error}`);
	}

	return {};
}

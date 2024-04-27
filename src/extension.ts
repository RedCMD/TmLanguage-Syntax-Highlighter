import * as vscode from 'vscode';

import { initTreeSitter } from "./TreeSitter";
import { initOniguruma } from "./Oniguruma";
import { initTextMate } from "./TextMate";
import { initDiagnostics } from "./DiagnosticCollection";
import { initCallStackView } from "./treeData";
import { initTokenColorCustomizations } from "./tokenColorCustomizations";

import { HoverProvider } from "./Providers/HoverProvider";
import { RenameProvider } from "./Providers/RenameProvider";
import { CodeLensProvider } from "./Providers/CodeLensProvider";
import { ReferenceProvider } from "./Providers/ReferenceProvider";
import { DefinitionProvider } from "./Providers/DefinitionProvider";
import { CodeActionsProvider } from "./Providers/CodeActionsProvider";
import { CallHierarchyProvider } from "./Providers/CallHierarchyProvider";
import { DocumentSymbolProvider } from "./Providers/DocumentSymbolProvider";
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

	await initTreeSitter(context);
	await initOniguruma(context);
	initTextMate(context);
	initDiagnostics(context);
	initCallStackView(context);
	initTokenColorCustomizations(context);

	// registerInlayHintsProvider

	// context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
	context.subscriptions.push(vscode.languages.registerRenameProvider(DocumentSelector, RenameProvider)); // [F2] Rename
	// context.subscriptions.push(vscode.languages.registerCodeLensProvider(DocumentSelector, CodeLensProvider)); // Code Lens
	context.subscriptions.push(vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider)); // Go to References
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(DocumentSelector, DefinitionProvider)); // ctrl+click Go to Definition
	context.subscriptions.push(vscode.languages.registerCodeActionsProvider(DocumentSelector, CodeActionsProvider)); // Mouse over Hovers
	context.subscriptions.push(vscode.languages.registerCallHierarchyProvider(DocumentSelector, CallHierarchyProvider)); // right click => Peak Call Hierarchy
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)); // Breadcrumbs
	context.subscriptions.push(vscode.languages.registerSelectionRangeProvider(DocumentSelector, SelectionRangeProvider)); // Expand and Shrink Selection
	context.subscriptions.push(vscode.languages.registerDocumentDropEditProvider(DocumentSelector, DocumentDropEditProvider)); // Drag and Drop `tmLanguage.json` files to `#include`
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DocumentSelector, CompletionItemProvider, ...triggerCharacters)); // Intellisense ctrl+space completions
	context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(DocumentSelector, DocumentHighlightProvider)); // Context aware variable highlighting
	context.subscriptions.push(vscode.languages.registerOnTypeFormattingEditProvider(DocumentSelector, OnTypeFormattingEditProvider, '}', ']', ',')); // right-click => Format Document
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(DocumentSelector, DocumentFormattingEditProvider)); // right-click => Format Document
	context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(DocumentSelector, DocumentRangeFormattingEditProvider)); // right-click => Format Selection
	// context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)); // Context aware syntax highlighting
}


// This method is called when your extension is deactivated
export function deactivate() {
	// vscode.window.showInformationMessage(JSON.stringify("deactivate"));
	// https://github.com/microsoft/vscode/issues/105484
	// https://github.com/microsoft/vscode/issues/201664
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
	if (key.startsWith("HEAP")) {
		return "<error>";
	}
	return value;
}

export function wagnerFischer(word: string, directory: string[]): { distance: number, index: number, string: string; }[] {
	const distances: { distance: number, index: number, string: string; }[] = [];
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

		const distance = { 'distance': prev[targetWord.length], index: index, string: targetWord };
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

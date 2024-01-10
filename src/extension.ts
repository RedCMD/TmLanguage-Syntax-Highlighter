import * as vscode from 'vscode';

import { initTreeSitter } from "./TreeSitter";
import { initDiagnostics } from "./DiagnosticCollection";
import { initTokenColorCustomizations } from './tokenColorCustomizations';

import { HoverProvider } from "./HoverProvider";
import { ReferenceProvider } from "./ReferenceProvider";
import { DefinitionProvider } from "./DefinitionProvider";
import { DocumentSymbolProvider } from "./DocumentSymbolProvider";
import { CompletionItemProvider, triggerCharacters } from "./CompletionItemProvider";
import { DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider } from "./DocumentFormattingEditProvider";
import { DocumentSemanticTokensProvider, SemanticTokensLegend } from "./DocumentSemanticTokensProvider";

export const DocumentSelector: vscode.DocumentSelector = [
	{ language: 'json-textmate' }
];


export async function activate(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));

	await initTreeSitter(context);
	initDiagnostics(context);
	initTokenColorCustomizations(context);

	// context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
	context.subscriptions.push(vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider)); // Go to References
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(DocumentSelector, DefinitionProvider)); // Go to Definition
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)); // Breadcrumbs
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DocumentSelector, CompletionItemProvider, ...triggerCharacters)); // Intellisense ctrl+space completions
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(DocumentSelector, DocumentFormattingEditProvider)); // right-click => format
	context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(DocumentSelector, DocumentRangeFormattingEditProvider)); // right-click => format
	// context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)); // Context aware syntax highlighting
}


// This method is called when your extension is deactivated
export function deactivate() {
	// https://github.com/microsoft/vscode/issues/105484
	// https://github.com/microsoft/vscode/issues/201664
}
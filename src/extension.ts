import * as vscode from 'vscode';

import { initTreeSitter } from "./TreeSitter";
import { initDiagnostics } from "./DiagnosticCollection";
import { initTokenColorCustomizations } from './tokenColorCustomizations';

import { HoverProvider } from "./HoverProvider";
import { RenameProvider } from "./RenameProvider";
import { ReferenceProvider } from "./ReferenceProvider";
import { DefinitionProvider } from "./DefinitionProvider";
import { CallHierarchyProvider } from "./CallHierarchyProvider";
import { DocumentSymbolProvider } from "./DocumentSymbolProvider";
import { DocumentHighlightProvider } from "./DocumentHighlightProvider";
import { CompletionItemProvider, triggerCharacters } from "./CompletionItemProvider";
import { DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider } from "./DocumentFormattingEditProvider";
import { DocumentSemanticTokensProvider, SemanticTokensLegend } from "./DocumentSemanticTokensProvider";


export type _object_ = { [key: string]: any };

export const DocumentSelector: vscode.DocumentSelector = [
	{ language: 'json-textmate' }
];

export async function activate(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));

	await initTreeSitter(context);
	initDiagnostics(context);
	initTokenColorCustomizations(context);

	// context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
	context.subscriptions.push(vscode.languages.registerRenameProvider(DocumentSelector, RenameProvider)); // [F2] Rename
	context.subscriptions.push(vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider)); // Go to References
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(DocumentSelector, DefinitionProvider)); // ctrl+click Go to Definition
	context.subscriptions.push(vscode.languages.registerCallHierarchyProvider(DocumentSelector, CallHierarchyProvider)); // right click => Peak Call Hierarchy
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)); // Breadcrumbs
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DocumentSelector, CompletionItemProvider, ...triggerCharacters)); // Intellisense ctrl+space completions
	context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(DocumentSelector, DocumentHighlightProvider)); // Context aware variable highlighting
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
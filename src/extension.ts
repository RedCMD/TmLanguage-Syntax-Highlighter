import * as vscode from 'vscode';
import * as Parser from 'web-tree-sitter';

import { initTreeSitter } from "./TreeSitter";
import { initDiagnostics } from "./DiagnosticCollection";
import { ReferenceProvider } from "./ReferenceProvider";

export const DocumentSelector = [
	{ language: 'json-tmLanguage' },
	{ language: 'json-textmate' },
	// { language: 'json' },
	// { language: 'typescript' }
];


export async function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));

	await initTreeSitter(context);
	initDiagnostics(context);

	context.subscriptions.push(vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider)); // go to references

}


// This method is called when your extension is deactivated
export function deactivate() { }
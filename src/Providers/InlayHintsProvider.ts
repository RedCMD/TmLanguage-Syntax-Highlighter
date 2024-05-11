import * as vscode from 'vscode';


const onDidChangeInlayHints = new vscode.EventEmitter<void>();

export const InlayHintsProvider: vscode.InlayHintsProvider = {
	provideInlayHints(document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken): vscode.InlayHint[] {

		return;
	},
	resolveInlayHint(hint: vscode.InlayHint, token: vscode.CancellationToken): vscode.InlayHint {

		return;
	},
	onDidChangeInlayHints: onDidChangeInlayHints.event,
};

// onDidChangeInlayHints.fire();

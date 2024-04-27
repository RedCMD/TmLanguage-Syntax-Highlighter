import * as vscode from 'vscode';

export const CodeActionsProvider: vscode.CodeActionProvider = {
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		// vscode.window.showInformationMessage(JSON.stringify("Definition"));
		// vscode.window.showInformationMessage(JSON.stringify(context));

		// if (context.triggerKind == vscode.CodeActionTriggerKind.Automatic) {
		// 	return;
		// }

		const codeActions: vscode.CodeAction[] = [];
		let codeAction: vscode.CodeAction;

		const diagnostics = context.diagnostics;
		for (const diagnostic of diagnostics) {
			if (!range.intersection(diagnostic.range)) {
				continue;
			}

			const edit = new vscode.WorkspaceEdit;
			const message = diagnostic.message;
			const code = diagnostic.code;
			switch (code) {
				case 'ERROR':
				case 'error':
				case 'error_':
					const error = message.split("'")[1];

					edit.delete(document.uri, diagnostic.range);
					codeAction = {
						title: `Remove error '${error}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				case 'missing':
					const missing = message.split("'")[3];

					edit.insert(document.uri, diagnostic.range.end, missing);
					codeAction = {
						title: `Add missing '${missing}'`,
						kind: vscode.CodeActionKind.QuickFix,
						diagnostics: [diagnostic],
						isPreferred: true,
						edit: edit,
					};
					break;
				default:
					continue;
			}
			codeActions.push(codeAction);
		}

		// vscode.window.showInformationMessage(JSON.stringify(codeActions));
		return codeActions;
	},
	resolveCodeAction(codeAction: vscode.CodeAction, token: vscode.CancellationToken): vscode.CodeAction {

		return codeAction;
	},
};
import * as vscode from 'vscode';

export function initTokenColorCustomizations(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("tokenColorCustomizations"));

	const activeDocument = vscode.window.activeTextEditor.document;
	update(packageJSON(activeDocument) || jsonTextMate(activeDocument));

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor) => {
			// vscode.window.showInformationMessage(JSON.stringify("active"));
			const document = editor.document;
			update(packageJSON(document) || jsonTextMate(document));
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			if (document == vscode.window.activeTextEditor.document) {
				update(packageJSON(document) || jsonTextMate(document));
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument((edits: vscode.TextDocumentChangeEvent) => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			const document = edits.document;
			if (document == vscode.window.activeTextEditor.document) {
				update(packageJSON(document));
			}
		})
	);

	// context.subscriptions.push(
	// 	vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
	// 		// vscode.window.showInformationMessage(JSON.stringify("config"));
	// 		if (event.affectsConfiguration("editor.tokenColorCustomizations")) {
	// 			const document = vscode.window.activeTextEditor.document;
	// 			update(packageJSON(document) || jsonTextMate(document));
	// 		}
	// 	})
	// );

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("close"));
			if (document == vscode.window.activeTextEditor.document) {
				update(null);
			}
		})
	);
}


const packageJSONSelector: vscode.DocumentFilter = { pattern: "**/package.json", scheme: "file" };
const jsonTextMateSelector: vscode.DocumentFilter = { language: "json-textmate", scheme: "file" };
// const documentSelector: vscode.DocumentSelector = [packageJSONSelector, jsonTextMateSelector];

function packageJSON(document: vscode.TextDocument): vscode.Uri {
	// vscode.window.showInformationMessage(JSON.stringify("packageJSON"));
	if (vscode.languages.match(packageJSONSelector, document)) {
		const uri = document.uri;
		return uri;
	}
}

function jsonTextMate(document: vscode.TextDocument): vscode.Uri {
	// vscode.window.showInformationMessage(JSON.stringify("jsonTextMate"));
	if (vscode.languages.match(jsonTextMateSelector, document)) {
		const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
		return uri;
	}
}


const bak = '[tokenColorCustomizations_bak_JSON_TextMate'; // The square bracket is there on purpose so that the json `settings` schema doesn't complain about it
async function update(uri: vscode.Uri) {
	// vscode.window.showInformationMessage(JSON.stringify("update"));

	// Workspace settings have higher priority than Global settings. But... Workspace settings don't work when there is no Workspace
	const configurationTarget = vscode.workspace.name ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
	const configurationValue = vscode.workspace.name ? 'workspaceValue' : 'globalValue';

	if (uri) {
		const packageDocument = await vscode.workspace.openTextDocument(uri);

		try {
			const packageParsed = await JSON.parse(packageDocument?.getText());
			const package_tokenColorCustomizations: Object = packageParsed?.contributes?.configurationDefaults?.['editor.tokenColorCustomizations'];

			if (package_tokenColorCustomizations) {
				const editor = vscode.workspace.getConfiguration("editor");
				const tokenColorCustomizations: Object = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
				const tokenColorCustomizations_bak: Object = tokenColorCustomizations[bak] ?? tokenColorCustomizations;

				delete tokenColorCustomizations_bak[bak];
				package_tokenColorCustomizations[bak] = tokenColorCustomizations_bak;

				editor.update("tokenColorCustomizations", package_tokenColorCustomizations, configurationTarget);
				return;
			}
		} catch (error) {
			vscode.window.showWarningMessage("TextMateRules: Failed to parse `Package.json`");
		}
	}

	const editor = vscode.workspace.getConfiguration("editor");
	const tokenColorCustomizations: Object = editor.inspect("tokenColorCustomizations")[configurationValue];
	const tokenColorCustomizations_bak: Object = tokenColorCustomizations[bak];

	if (tokenColorCustomizations_bak !== undefined) {
		const length = Object.keys(tokenColorCustomizations_bak).length;
		editor.update("tokenColorCustomizations", length ? tokenColorCustomizations_bak : undefined, configurationTarget);
	}
}
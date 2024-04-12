import * as vscode from 'vscode';
import { _object_ } from "./extension";

export function initTokenColorCustomizations(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("tokenColorCustomizations"));

	const activeDocument = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
	update(packageJSON(activeDocument) || jsonTextMate(activeDocument));

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor) => {
			// vscode.window.showInformationMessage(JSON.stringify("active"));
			const document = editor?.document; // `editor` can be `undefined`!
			update(packageJSON(document) || jsonTextMate(document));
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
				update(packageJSON(document) || jsonTextMate(document));
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument((edits: vscode.TextDocumentChangeEvent) => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			if (edits.contentChanges.length == 0) {
				return;
			}
			const document = edits.document;
			if (vscode.languages.match(packageJSONSelector, document)) {
				if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
					update(packageJSON(document));
				}
			}
		})
	);

	// context.subscriptions.push(
	// 	vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
	// 		// vscode.window.showInformationMessage(JSON.stringify("config"));
	// 		if (event.affectsConfiguration("editor.tokenColorCustomizations")) {
	// 			const document = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
	// 			update(packageJSON(document) || jsonTextMate(document));
	// 		}
	// 	})
	// );

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument((document: vscode.TextDocument) => {
			// vscode.window.showInformationMessage(JSON.stringify("close"));
			if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
				update(null);
			}
		})
	);
}


const packageJSONSelector: vscode.DocumentSelector = [
	{ pattern: "**/package.json", scheme: "file" },
	{ pattern: "**/package.json", scheme: "vscode-vfs" }
];
const jsonTextMateSelector: vscode.DocumentSelector = [
	{ language: "json-textmate", scheme: "file" },
	{ language: "json-textmate", scheme: "vscode-vfs" }
];
// const documentSelector: vscode.DocumentSelector = [packageJSONSelector, jsonTextMateSelector];

function packageJSON(document: vscode.TextDocument): vscode.Uri {
	// vscode.window.showInformationMessage(JSON.stringify("packageJSON"));
	if (!document) {
		return null;
	}
	if (vscode.languages.match(packageJSONSelector, document)) {
		const uri = document.uri;
		return uri;
	}
}

function jsonTextMate(document: vscode.TextDocument): vscode.Uri {
	// vscode.window.showInformationMessage(JSON.stringify("jsonTextMate"));
	if (!document) {
		return null;
	}
	if (vscode.languages.match(jsonTextMateSelector, document)) {
		const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
		return uri;
	}
}

let ignoreFailParse = false;
let hadTokenColorCustomizations = false;


const bak = '[tokenColorCustomizations_bak_JSON_TextMate'; // The square bracket is there on purpose so that the json `settings` schema doesn't complain about it
async function update(uri: vscode.Uri) {
	// vscode.window.showInformationMessage(JSON.stringify("update"));

	// Workspace settings have higher priority than Global settings. But... Workspace settings don't work when there is no Workspace
	const configurationTarget = vscode.workspace.name ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
	const configurationValue = vscode.workspace.name ? 'workspaceValue' : 'globalValue';

	if (uri && uri.scheme != 'untitled') {
		try {
			const packageDocument = await vscode.workspace.openTextDocument(uri);
			const packageParsed = await JSON.parse(packageDocument?.getText());
			const package_tokenColorCustomizations: _object_ = packageParsed?.contributes?.configurationDefaults?.['editor.tokenColorCustomizations'];

			if (package_tokenColorCustomizations) {
				const editor = vscode.workspace.getConfiguration("editor");
				const tokenColorCustomizations: _object_ = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
				const tokenColorCustomizations_bak: _object_ = tokenColorCustomizations[bak] ?? tokenColorCustomizations;

				delete tokenColorCustomizations_bak[bak];
				package_tokenColorCustomizations[bak] = tokenColorCustomizations_bak;

				editor.update("tokenColorCustomizations", package_tokenColorCustomizations, configurationTarget);
				hadTokenColorCustomizations = true;
				return;
			}
		} catch (error) {
			if (hadTokenColorCustomizations && ignoreFailParse == false) {
				const message = `Failed to parse package.json:\n${error}`
				const ignore = "Ignore"
				vscode.window.showWarningMessage(message, ignore).then((value) => {
					if (value == ignore) {
						ignoreFailParse = true;
					}
					return true;
				});
			}
		}
	}

	const editor = vscode.workspace.getConfiguration("editor");
	const tokenColorCustomizations: _object_ = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
	const tokenColorCustomizations_bak: _object_ = tokenColorCustomizations[bak];

	if (tokenColorCustomizations_bak !== undefined) {
		const length = Object.keys(tokenColorCustomizations_bak).length;
		editor.update("tokenColorCustomizations", length ? tokenColorCustomizations_bak : undefined, configurationTarget);
	}
}
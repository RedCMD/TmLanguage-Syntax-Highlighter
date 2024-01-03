"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTokenColorCustomizations = void 0;
const vscode = require("vscode");
// let count = 0
function initTokenColorCustomizations(context) {
    // vscode.window.showInformationMessage(JSON.stringify("tokenColorCustomizations"));
    update(getValidURI(vscode.window.activeTextEditor.document, true, true));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        // vscode.window.showInformationMessage(JSON.stringify("active"));
        const uri = getValidURI(editor.document, true, true);
        if (uri) {
            update(uri);
            return;
        }
        for (const textEditor of vscode.window.visibleTextEditors) {
            const uri = getValidURI(textEditor.document, true, true);
            if (uri) {
                return;
            }
        }
        update(uri, true);
    }));
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        update(getValidURI(document, true, true));
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((edits) => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        const document = edits.document;
        if (document == vscode.window.activeTextEditor.document) {
            update(getValidURI(document, false, true));
        }
    }));
    // context.subscriptions.push(
    // 	vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    // 		// vscode.window.showInformationMessage(JSON.stringify("config"));
    // 		if (event.affectsConfiguration("editor.tokenColorCustomizations")) {
    // 			const document = vscode.window.activeTextEditor.document;
    // 			update(document);
    // 		}
    // 	})
    // );
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        update(getValidURI(document, true, true), true);
    }));
}
exports.initTokenColorCustomizations = initTokenColorCustomizations;
function getValidURI(document, allowTextMate, allowPackageJSON) {
    if (allowTextMate && document.languageId == 'json-textmate') {
        const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
        return uri;
    }
    const path = document.fileName;
    if (allowPackageJSON && path.match(/[\\/:]package.json$/)) {
        const uri = vscode.Uri.file(path);
        return uri;
    }
}
async function update(uri, isClosed) {
    const configurationTarget = vscode.ConfigurationTarget.Global;
    const editor = vscode.workspace.getConfiguration("editor");
    const tokenColorCustomizations_bak = editor.get("tokenColorCustomizations_bak");
    if (!isClosed) {
        if (!uri) {
            return;
        }
        // vscode.window.showInformationMessage(JSON.stringify(count));
        const packageDocument = await vscode.workspace.openTextDocument(uri);
        try {
            const packageParsed = await JSON.parse(packageDocument?.getText());
            const package_tokenColorCustomizations = packageParsed?.contributes?.configurationDefaults?.['editor.tokenColorCustomizations'];
            if (package_tokenColorCustomizations) {
                const tokenColorCustomizations = editor.get("tokenColorCustomizations");
                if (Object.keys(tokenColorCustomizations).length &&
                    !Object.keys(tokenColorCustomizations_bak).length) {
                    editor.update("tokenColorCustomizations_bak", tokenColorCustomizations, configurationTarget);
                }
                editor.update("tokenColorCustomizations", package_tokenColorCustomizations, configurationTarget);
                return;
            }
        }
        catch (error) {
            vscode.window.showWarningMessage("TextMateRules: Failed to parse `Package.json`");
        }
    }
    if (Object.keys(tokenColorCustomizations_bak).length) {
        editor.update("tokenColorCustomizations", tokenColorCustomizations_bak, configurationTarget);
        editor.update("tokenColorCustomizations_bak", undefined, configurationTarget);
    }
}

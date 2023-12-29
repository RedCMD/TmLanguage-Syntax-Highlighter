"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.DocumentSelector = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
const DiagnosticCollection_1 = require("./DiagnosticCollection");
const ReferenceProvider_1 = require("./ReferenceProvider");
exports.DocumentSelector = [
    { language: 'json-tmLanguage' },
    { language: 'json-textmate' },
    // { language: 'json' },
    // { language: 'typescript' }
];
async function activate(context) {
    vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));
    await (0, TreeSitter_1.initTreeSitter)(context);
    (0, DiagnosticCollection_1.initDiagnostics)(context);
    context.subscriptions.push(vscode.languages.registerReferenceProvider(exports.DocumentSelector, ReferenceProvider_1.ReferenceProvider)); // go to references
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

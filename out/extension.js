"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.DocumentSelector = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
const DiagnosticCollection_1 = require("./DiagnosticCollection");
const ReferenceProvider_1 = require("./ReferenceProvider");
const DefinitionProvider_1 = require("./DefinitionProvider");
const CompletionItemProvider_1 = require("./CompletionItemProvider");
const DocumentFormattingEditProvider_1 = require("./DocumentFormattingEditProvider");
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
    context.subscriptions.push(vscode.languages.registerReferenceProvider(exports.DocumentSelector, ReferenceProvider_1.ReferenceProvider)); // Go to References
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(exports.DocumentSelector, DefinitionProvider_1.DefinitionProvider)); // Go to Definition
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(exports.DocumentSelector, CompletionItemProvider_1.CompletionItemProvider, ...CompletionItemProvider_1.triggerCharacters)); // Intellisense ctrl+space completions
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(exports.DocumentSelector, DocumentFormattingEditProvider_1.DocumentFormattingEditProvider)); // right-click => format
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

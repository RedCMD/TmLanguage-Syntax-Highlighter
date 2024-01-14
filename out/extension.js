"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.DocumentSelector = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("./TreeSitter");
const tokenColorCustomizations_1 = require("./tokenColorCustomizations");
const RenameProvider_1 = require("./RenameProvider");
const ReferenceProvider_1 = require("./ReferenceProvider");
const DefinitionProvider_1 = require("./DefinitionProvider");
const DocumentSymbolProvider_1 = require("./DocumentSymbolProvider");
const CompletionItemProvider_1 = require("./CompletionItemProvider");
const DocumentFormattingEditProvider_1 = require("./DocumentFormattingEditProvider");
exports.DocumentSelector = [
    { language: 'json-textmate' }
];
async function activate(context) {
    // vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));
    await (0, TreeSitter_1.initTreeSitter)(context);
    // initDiagnostics(context);
    (0, tokenColorCustomizations_1.initTokenColorCustomizations)(context);
    // context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
    context.subscriptions.push(vscode.languages.registerRenameProvider(exports.DocumentSelector, RenameProvider_1.RenameProvider)); // [F2] Rename
    context.subscriptions.push(vscode.languages.registerReferenceProvider(exports.DocumentSelector, ReferenceProvider_1.ReferenceProvider)); // Go to References
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(exports.DocumentSelector, DefinitionProvider_1.DefinitionProvider)); // ctrl+click Go to Definition
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(exports.DocumentSelector, DocumentSymbolProvider_1.DocumentSymbolProvider)); // Breadcrumbs
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(exports.DocumentSelector, CompletionItemProvider_1.CompletionItemProvider, ...CompletionItemProvider_1.triggerCharacters)); // Intellisense ctrl+space completions
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(exports.DocumentSelector, DocumentFormattingEditProvider_1.DocumentFormattingEditProvider)); // right-click => format
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(exports.DocumentSelector, DocumentFormattingEditProvider_1.DocumentRangeFormattingEditProvider)); // right-click => format
    // context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)); // Context aware syntax highlighting
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    // https://github.com/microsoft/vscode/issues/105484
    // https://github.com/microsoft/vscode/issues/201664
}
exports.deactivate = deactivate;

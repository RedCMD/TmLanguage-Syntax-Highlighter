"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScopes = void 0;
const vscode = require("vscode");
const scopeTokens = {};
async function getScopes() {
    const colorTheme = vscode.workspace.getConfiguration("workbench").get("colorTheme");
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
        const themes = packageJSON.contributes?.themes;
        if (!themes) {
            continue;
        }
        for (const theme of themes) {
            const id = theme.id || theme.label;
            if (id == colorTheme) {
                const uri = vscode.Uri.joinPath(extension.extensionUri, theme.path);
                loadColorTheme(uri);
            }
        }
        if (Object.keys(scopeTokens).length) {
            return scopeTokens;
        }
    }
}
exports.getScopes = getScopes;
async function loadColorTheme(uri) {
    const document = await vscode.workspace.openTextDocument(uri);
    const theme = JSON.parse(document.getText());
    const tokenColors = theme.tokenColors;
    if (tokenColors) {
        for (const tokenColor of tokenColors) {
            const scope = tokenColor.scope;
            if (typeof scope === 'string') {
                const settings = tokenColor.settings;
                scopeTokens[scope] = {
                    foreground: settings.foreground,
                    background: settings.background,
                    fontStyle: settings.fontStyle,
                    theme: theme.name,
                    name: tokenColor.name,
                };
            }
            if (scope instanceof Array) {
                const scopes = scope;
                for (const scope of scopes) {
                    const settings = tokenColor.settings;
                    scopeTokens[scope] = {
                        foreground: settings.foreground,
                        background: settings.background,
                        fontStyle: settings.fontStyle,
                        theme: theme.name,
                        name: tokenColor.name,
                    };
                }
            }
        }
    }
    const include = theme.include;
    if (include) {
        const uriInclude = vscode.Uri.joinPath(uri, '../', include);
        loadColorTheme(uriInclude);
    }
}

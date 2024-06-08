import * as vscode from 'vscode';
import { IRelaxedExtensionManifest } from "./extensions";

interface ISemanticTokenColorizationSetting {
	foreground?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
	bold?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	italic?: boolean;
}
interface ISemanticTokenRules {
	[selector: string]: string | ISemanticTokenColorizationSetting | undefined;
}
interface IThemeScopedSemanticTokenColorCustomizations {
	[styleRule: string]: ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}
interface ISemanticTokenColorCustomizations {
	[styleRuleOrThemeScope: string]: IThemeScopedSemanticTokenColorCustomizations | ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}

interface ITextMateThemingRule {
	name?: string;
	scope?: string | string[];
	settings: ITokenColorizationSetting;
}
interface ITokenColorizationSetting {
	foreground?: string;
	background?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
}
interface TokenColorizationDeatils {
	theme: string;
	name?: string;
}

interface ColorTheme {
	readonly name: string;
	readonly include?: string;
	readonly colors?: { [key: string]: string; };
	readonly tokenColors?: ITextMateThemingRule[];
	readonly semanticHighlighting?: boolean;
	readonly semanticTokenColors?: ISemanticTokenColorCustomizations;
}

let colorThemeName = '';
const scopeTokens: { [scope: string]: ITokenColorizationSetting & TokenColorizationDeatils; } = {};
const tokenCache: { [scope: string]: string; } = {};

export function initThemeScopes(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(
		() => {
			const colorTheme: string = vscode.workspace.getConfiguration("workbench").get("colorTheme");
			if (colorTheme != colorThemeName) {
				colorThemeName = '';
				for (const token in tokenCache) {
					delete tokenCache[token];
				}
			}
		}
	));
}

export async function getSubScope(scopes: string | string[], foregroundOnly: boolean = false) {
	if (!scopes) {
		return '';
	}
	if (typeof scopes == 'string') {
		scopes = [scopes];
	}

	const textMateScopes = await getScopes();
	// const start = performance.now();

	let score = -1;
	let matchedScope: string;
	for (const scope of scopes) {
		if (tokenCache[scope]) {
			return tokenCache[scope];
		}
		for (const textMateScope in textMateScopes) {
			if (foregroundOnly && !textMateScopes[textMateScope].foreground) {
				continue;
			}
			const subScopes = scope.split('.');
			for (let index = subScopes.length; index > 0; index--) {
				if (score > index) {
					break;
				}
				const subScope = subScopes.join('.');
				if (textMateScope == subScope) {
					matchedScope = subScope;
					score = index;
					break;
				}
				subScopes.pop();
			}
		}
		if (matchedScope) {
			tokenCache[scope] = matchedScope;
			break;
		}
	}
	// vscode.window.showInformationMessage(performance.now() - start + "ms");

	return matchedScope;
}

export async function getScopes() {
	if (colorThemeName) {
		return scopeTokens;
	}
	// const start = performance.now();

	const colorTheme: string = vscode.workspace.getConfiguration("workbench").get("colorTheme");
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const themes = packageJSON.contributes?.themes;
		if (!Array.isArray(themes)) {
			continue;
		}
		for (const theme of themes) {
			const id = theme?.id || theme?.label;
			if (id == colorTheme) {
				const uri = vscode.Uri.joinPath(extension.extensionUri, theme.path);
				await loadColorTheme(uri);
			}
		}
		if (Object.keys(scopeTokens).length) {
			// vscode.window.showInformationMessage(JSON.stringify(scopeTokens));
			colorThemeName = colorTheme;
			break;
		}
	}
	// vscode.window.showInformationMessage(performance.now() - start + "ms" + JSON.stringify(scopeTokens));
	return scopeTokens;
}

async function loadColorTheme(uri: vscode.Uri) {
	const file = await vscode.workspace.fs.readFile(uri);
	const decoder = new TextDecoder(); // Works in VSCode web
	const text = decoder.decode(file);
	const theme: ColorTheme = JSON.parse(text);

	const include = theme.include;
	if (include) {
		const uriInclude = vscode.Uri.joinPath(uri, '..', include);
		await loadColorTheme(uriInclude);
	}

	const tokenColors = theme.tokenColors;
	if (tokenColors) {
		for (const tokenColor of tokenColors) {
			const scope = tokenColor.scope;
			const scopes = typeof scope === 'string' ? [scope] : scope;
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

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
	readonly colors?: { [key: string]: string },
	readonly tokenColors?: ITextMateThemingRule[];
	readonly semanticHighlighting?: boolean;
	readonly semanticTokenColors?: ISemanticTokenColorCustomizations;
}

const scopeTokens: { [scope: string]: ITokenColorizationSetting & TokenColorizationDeatils } = {};

export async function getScopes() {
	const colorTheme = vscode.workspace.getConfiguration("workbench").get("colorTheme");
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const themes = packageJSON.contributes?.themes;
		if (!themes) {
			continue;
		}
		for (const theme of themes) {
			const id = theme.id || theme.label;
			if (id == colorTheme) {
				const uri = vscode.Uri.joinPath(extension.extensionUri, theme.path);
				await loadColorTheme(uri);
			}
		}
		if (Object.keys(scopeTokens).length) {
			return scopeTokens;
		}
	}
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
}

import * as vscode from 'vscode';

export interface IEmbeddedLanguagesMap {
	[scopeName: string]: string;
}

export interface TokenTypesContribution {
	[scopeName: string]: string;
}

export interface ITMSyntaxExtensionPoint {
	language: string;
	scopeName: string;
	path: string;
	embeddedLanguages: IEmbeddedLanguagesMap;
	tokenTypes: TokenTypesContribution;
	injectTo: string[];
	balancedBracketScopes: string[];
	unbalancedBracketScopes: string[];
}

export interface ILocalizedString {

	/**
	 * The localized value of the string.
	 */
	value: string;

	/**
	 * The original (non localized value of the string)
	 */
	original: string;
}

export interface ICommand {
	command: string;
	title: string | ILocalizedString;
	category?: string | ILocalizedString;
}

export interface IConfigurationProperty {
	description: string;
	type: string | string[];
	default?: any;
}

export interface IConfiguration {
	id?: string;
	order?: number;
	title?: string;
	properties: { [key: string]: IConfigurationProperty; };
}

export interface IConfigurationDefaults {
	'editor.tokenColorCustomizations': ITokenColorCustomizations;
	[groupId: `[${string}]`]: { [configuration: string]: any; };
	[configuration: string]: any;
}

export interface ITokenColorizationSetting {
	foreground?: string;
	background?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
}

export interface ITextMateThemingRule {
	name?: string;
	scope?: string | string[];
	settings: ITokenColorizationSetting;
}

export interface ISemanticTokenColorizationSetting {
	foreground?: string;
	fontStyle?: string; /* [italic|bold|underline|strikethrough] */
	bold?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	italic?: boolean;
}

export interface IThemeScopedColorCustomizations {
	[colorId: string]: string;
}

export interface IColorCustomizations {
	[colorIdOrThemeScope: string]: IThemeScopedColorCustomizations | string;
}

export interface IThemeScopedTokenColorCustomizations {
	[groupId: string]: ITextMateThemingRule[] | ITokenColorizationSetting | boolean | string | undefined;
	comments?: string | ITokenColorizationSetting;
	strings?: string | ITokenColorizationSetting;
	numbers?: string | ITokenColorizationSetting;
	keywords?: string | ITokenColorizationSetting;
	types?: string | ITokenColorizationSetting;
	functions?: string | ITokenColorizationSetting;
	variables?: string | ITokenColorizationSetting;
	textMateRules?: ITextMateThemingRule[];
	semanticHighlighting?: boolean; // deprecated, use ISemanticTokenColorCustomizations.enabled instead
}

export interface ITokenColorCustomizations {
	[groupId: string]: ITokenColorCustomizations | IThemeScopedTokenColorCustomizations | ITextMateThemingRule[] | ITokenColorizationSetting | boolean | string | undefined;
	[themeScope: `[${string}]`]: IThemeScopedTokenColorCustomizations;
	'[tokenColorCustomizations_bak_JSON_TextMate'?: ITokenColorCustomizations;
	comments?: string | ITokenColorizationSetting;
	strings?: string | ITokenColorizationSetting;
	numbers?: string | ITokenColorizationSetting;
	keywords?: string | ITokenColorizationSetting;
	types?: string | ITokenColorizationSetting;
	functions?: string | ITokenColorizationSetting;
	variables?: string | ITokenColorizationSetting;
	textMateRules?: ITextMateThemingRule[];
	semanticHighlighting?: boolean; // deprecated, use ISemanticTokenColorCustomizations.enabled instead
}

export interface IThemeScopedSemanticTokenColorCustomizations {
	[styleRule: string]: ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}

export interface ISemanticTokenColorCustomizations {
	[styleRuleOrThemeScope: string]: IThemeScopedSemanticTokenColorCustomizations | ISemanticTokenRules | boolean | undefined;
	enabled?: boolean;
	rules?: ISemanticTokenRules;
}

export interface IThemeScopedExperimentalSemanticTokenColorCustomizations {
	[themeScope: string]: ISemanticTokenRules | undefined;
}

export interface IExperimentalSemanticTokenColorCustomizations {
	[styleRuleOrThemeScope: string]: IThemeScopedExperimentalSemanticTokenColorCustomizations | ISemanticTokenRules | undefined;
}

export type IThemeScopedCustomizations =
	IThemeScopedColorCustomizations
	| IThemeScopedTokenColorCustomizations
	| IThemeScopedExperimentalSemanticTokenColorCustomizations
	| IThemeScopedSemanticTokenColorCustomizations;

export type IThemeScopableCustomizations =
	IColorCustomizations
	| ITokenColorCustomizations
	| IExperimentalSemanticTokenColorCustomizations
	| ISemanticTokenColorCustomizations;

export interface ISemanticTokenRules {
	[selector: string]: string | ISemanticTokenColorizationSetting | undefined;
}

export interface IDebugger {
	label?: string;
	type: string;
	runtime?: string;
}

export interface IGrammar extends ITMSyntaxExtensionPoint {
	language: string;
}

export interface IJSONValidation {
	fileMatch: string | string[];
	url: string;
}

export interface IKeyBinding {
	command: string;
	key: string;
	when?: string;
	mac?: string;
	linux?: string;
	win?: string;
}

export interface ILanguage {
	id: string;
	extensions: string[];
	aliases: string[];
}

export interface IMenu {
	command: string;
	alt?: string;
	when?: string;
	group?: string;
}

export interface ISnippet {
	language: string;
}

export const VS_LIGHT_THEME = 'vs';
export const VS_DARK_THEME = 'vs-dark';
export const VS_HC_THEME = 'hc-black';
export const VS_HC_LIGHT_THEME = 'hc-light';
export interface IThemeExtensionPoint {
	id: string;
	label?: string;
	description?: string;
	path: string;
	uiTheme?: typeof VS_LIGHT_THEME | typeof VS_DARK_THEME | typeof VS_HC_THEME | typeof VS_HC_LIGHT_THEME;
	_watch: boolean; // unsupported options to watch location
}

export interface ITheme extends IThemeExtensionPoint {
	label: string;
}

export interface IViewContainer {
	id: string;
	title: string;
}

export interface IView {
	id: string;
	name: string;
}

export interface IColor {
	id: string;
	description: string;
	defaults: { light: string; dark: string; highContrast: string; };
}

interface IWebviewEditor {
	readonly viewType: string;
	readonly priority: string;
	readonly selector: readonly {
		readonly filenamePattern?: string;
	}[];
}

export interface ICodeActionContributionAction {
	readonly kind: string;
	readonly title: string;
	readonly description?: string;
}

export interface ICodeActionContribution {
	readonly languages: readonly string[];
	readonly actions: readonly ICodeActionContributionAction[];
}

export interface IAuthenticationContribution {
	readonly id: string;
	readonly label: string;
}

export interface IWalkthroughStep {
	readonly id: string;
	readonly title: string;
	readonly description: string | undefined;
	readonly media:
	| { image: string | { dark: string; light: string; hc: string; }; altText: string; markdown?: never; svg?: never; }
	| { markdown: string; image?: never; svg?: never; }
	| { svg: string; altText: string; markdown?: never; image?: never; };
	readonly completionEvents?: string[];
	/** @deprecated use `completionEvents: 'onCommand:...'` */
	readonly doneOn?: { command: string; };
	readonly when?: string;
}

export interface IWalkthrough {
	readonly id: string;
	readonly title: string;
	readonly icon?: string;
	readonly description: string;
	readonly steps: IWalkthroughStep[];
	readonly featuredFor: string[] | undefined;
	readonly when?: string;
}

export interface IStartEntry {
	readonly title: string;
	readonly description: string;
	readonly command: string;
	readonly when?: string;
	readonly category: 'file' | 'folder' | 'notebook';
}

export interface INotebookEntry {
	readonly type: string;
	readonly displayName: string;
}

export interface INotebookRendererContribution {
	readonly id: string;
	readonly displayName: string;
	readonly mimeTypes: string[];
}

export interface IDebugVisualizationContribution {
	readonly id: string;
	readonly when: string;
}

export interface ITranslation {
	id: string;
	path: string;
}

export interface ILocalizationContribution {
	languageId: string;
	languageName?: string;
	localizedLanguageName?: string;
	translations: ITranslation[];
	minimalTranslations?: { [key: string]: string; };
}

export interface IExtensionContributions {
	commands?: ICommand[];
	configuration?: IConfiguration | IConfiguration[];
	configurationDefaults?: IConfigurationDefaults;
	debuggers?: IDebugger[];
	grammars?: IGrammar[];
	jsonValidation?: IJSONValidation[];
	keybindings?: IKeyBinding[];
	languages?: ILanguage[];
	menus?: { [context: string]: IMenu[]; };
	snippets?: ISnippet[];
	themes?: ITheme[];
	iconThemes?: ITheme[];
	productIconThemes?: ITheme[];
	viewsContainers?: { [location: string]: IViewContainer[]; };
	views?: { [location: string]: IView[]; };
	colors?: IColor[];
	localizations?: ILocalizationContribution[];
	readonly customEditors?: readonly IWebviewEditor[];
	readonly codeActions?: readonly ICodeActionContribution[];
	authentication?: IAuthenticationContribution[];
	walkthroughs?: IWalkthrough[];
	startEntries?: IStartEntry[];
	readonly notebooks?: INotebookEntry[];
	readonly notebookRenderer?: INotebookRendererContribution[];
	readonly debugVisualizers?: IDebugVisualizationContribution[];
}

export interface IExtensionCapabilities {
	readonly virtualWorkspaces?: ExtensionVirtualWorkspaceSupport;
	readonly untrustedWorkspaces?: ExtensionUntrustedWorkspaceSupport;
}

export type LimitedWorkspaceSupportType = 'limited';
export type ExtensionUntrustedWorkspaceSupportType = boolean | LimitedWorkspaceSupportType;
export type ExtensionUntrustedWorkspaceSupport = { supported: true; } | { supported: false; description: string; } | { supported: LimitedWorkspaceSupportType; description: string; restrictedConfigurations?: string[]; };

export type ExtensionVirtualWorkspaceSupportType = boolean | LimitedWorkspaceSupportType;
export type ExtensionVirtualWorkspaceSupport = boolean | { supported: true; } | { supported: false | LimitedWorkspaceSupportType; description: string; };

export interface IRelaxedExtensionManifest {
	id: string,
	identifier: {
		value: string,
		_lower: string; // lowercase
	},
	isBuiltin: boolean,
	isUserBuiltin: boolean,
	isUnderDevelopment: boolean,
	extensionLocation: vscode.Uri,
	uuid?: string,
	targetPlatform: string,

	name: string;
	displayName?: string;
	publisher: string;
	version: string;
	engines: { readonly vscode: string; };
	description?: string;
	main?: string;
	browser?: string;
	preview?: boolean;
	// For now this only supports pointing to l10n bundle files
	// but it will be used for package.l10n.json files in the future
	l10n?: string;
	icon?: string;
	categories?: string[];
	keywords?: string[];
	activationEvents?: string[];
	extensionDependencies?: string[];
	extensionPack?: string[];
	extensionKind?: vscode.ExtensionKind | vscode.ExtensionKind[];
	contributes?: IExtensionContributions;
	repository?: { url: string; };
	bugs?: { url: string; };
	enabledApiProposals?: readonly string[];
	api?: string;
	scripts?: { [key: string]: string; };
	capabilities?: IExtensionCapabilities;
}

// vscode.extensions.all
export interface IRelaxedExtension {

	/**
	 * The canonical extension identifier in the form of: `publisher.name`.
	 */
	readonly id: string,

	/**
	 * The uri of the directory containing the extension.
	 */
	readonly extensionUri: vscode.Uri,

	/**
	 * The absolute file path of the directory containing this extension. Shorthand
	 * notation for {@link Extension.extensionUri Extension.extensionUri.fsPath} (independent of the uri scheme).
	 */
	readonly extensionPath: string,

	/**
	 * `true` if the extension has been activated.
	 */
	readonly isActive: boolean;

	/**
	 * The parsed contents of the extension's package.json.
	 */
	readonly packageJSON: IRelaxedExtensionManifest,

	/**
	 * The extension kind describes if an extension runs where the UI runs
	 * or if an extension runs where the remote extension host runs. The extension kind
	 * is defined in the `package.json`-file of extensions but can also be refined
	 * via the `remote.extensionKind`-setting. When no remote extension host exists,
	 * the value is {@linkcode ExtensionKind.UI}.
	 */
	readonly extensionKind: vscode.ExtensionKind,

	/**
	 * The public API exported by this extension (return value of `activate`).
	 * It is an invalid action to access this field before this extension has been activated.
	 */
	readonly exports: any;

	/**
	 * Activates this extension and returns its public API.
	 *
	 * @returns A promise that will resolve when this extension has been activated.
	 */
	activate(): Thenable<any>;

	readonly isFromDifferentExtensionHost?: boolean;
}

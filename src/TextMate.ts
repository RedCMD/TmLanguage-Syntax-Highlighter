import * as vscode from 'vscode';
import * as vscodeTextmate from './textmate/main';
// import * as vscodeTextmate from "vscode-textmate";
import * as vscodeOniguruma from "vscode-oniguruma";
import { IRelaxedExtensionManifest } from './extensions';
import { stringify } from './extension';

// const ruleIdSymbol = Symbol('RuleId');
// export type RuleId = { __brand: typeof ruleIdSymbol };
export type RuleId = number;
export const endRuleId = -1;
export const whileRuleId = -2;

/**
 * Identifiers with a binary dot operator.
 * Examples: `baz` or `foo.bar`
*/
type ScopeName = string;
type ScopeStack = {

	readonly parent: ScopeStack | null,
	readonly scopeName: ScopeName
}
type EncodedTokenAttributes = number;

type AttributedScopeStack = {

	readonly parent: AttributedScopeStack | null,
	readonly scopePath: ScopeStack,
	readonly tokenAttributes: EncodedTokenAttributes
}

export type StateStackImpl = vscodeTextmate.StateStack & {
	readonly _stackElementBrand: void;

	/**
	 * The position on the current line where this state was pushed.
	 * This is relevant only while tokenizing a line, to detect endless loops.
	 * Its value is meaningless across lines.
	 */
	readonly _enterPos: number;

	/**
	 * The captured anchor position when this stack element was pushed.
	 * This is relevant only while tokenizing a line, to restore the anchor position when popping.
	 * Its value is meaningless across lines.
	 */
	readonly _anchorPos: number;

	/**
	 * The depth of the stack.
	 */
	readonly depth: number;

	/**
	 * The previous state on the stack (or null for the root state).
	 */
	readonly parent: StateStackImpl | null,

	/**
	 * The state (rule) that this element represents.
	 */
	readonly ruleId: RuleId,

	/**
	 * The state has entered and captured \n. This means that the next line should have an anchorPosition of 0.
	 */
	readonly beginRuleCapturedEOL: boolean,

	/**
	 * The "pop" (end) condition for this state in case that it was dynamically generated through captured text.
	 */
	readonly endRule: string | null,

	/**
	 * The list of scopes containing the "name" for this state.
	 */
	readonly nameScopesList: AttributedScopeStack | null,

	/**
	 * The list of scopes containing the "contentName" (besides "name") for this state.
	 * This list **must** contain as an element `scopeName`.
	 */
	readonly contentNameScopesList: AttributedScopeStack | null
}

interface IRegExpSourceAnchorCache {
	readonly A0_G0: string;
	readonly A0_G1: string;
	readonly A1_G0: string;
	readonly A1_G1: string;
}

type RegExpSource<TRuleId = RuleId | typeof endRuleId> = {

	readonly source: string;
	readonly ruleId: TRuleId;
	readonly hasAnchor: boolean;
	readonly hasBackReferences: boolean;
	readonly _anchorCache: IRegExpSourceAnchorCache | null;
}

type CaptureRule = Rule & {
	readonly retokenizeCapturedWithRuleId: RuleId | 0;
}

type IRegExpSourceListAnchorCache<TRuleId> = {
	readonly A0_G0: CompiledRule<TRuleId> | null,
	readonly A0_G1: CompiledRule<TRuleId> | null,
	readonly A1_G0: CompiledRule<TRuleId> | null,
	readonly A1_G1: CompiledRule<TRuleId> | null,
}
export type CompiledRule<TRuleId = RuleId | typeof endRuleId> = {
	readonly scanner: vscodeOniguruma.OnigScanner;
}
export type RegExpSourceList<TRuleId = RuleId | typeof endRuleId> = {

	readonly _items: RegExpSource<TRuleId>[],
	readonly _hasAnchors: boolean,
	readonly _cached: CompiledRule<TRuleId> | null,
	readonly _anchorCache: IRegExpSourceListAnchorCache<TRuleId>,
}

export type Rule = {
	readonly $location: undefined;
	readonly id: RuleId;
	readonly _nameIsCapturing: boolean;
	readonly _name: string | null;
	readonly _contentNameIsCapturing: boolean;
	readonly _contentName: string | null;


	readonly _begin: RegExpSource,
	readonly beginCaptures: (CaptureRule | null)[],
	readonly _end: RegExpSource,
	readonly endHasBackReferences: boolean,
	readonly endCaptures: (CaptureRule | null)[],
	readonly applyEndPatternLast: boolean,
	readonly hasMissingPatterns: boolean,
	readonly patterns: RuleId[],
	readonly _cachedCompiledPatterns: RegExpSourceList | null,


	readonly whileCaptures: (CaptureRule | null)[],
	readonly _while: RegExpSource<RuleId | typeof whileRuleId>,
	readonly whileHasBackReferences: boolean,
	_cachedCompiledWhilePatterns: RegExpSourceList<RuleId | typeof whileRuleId> | null,
}

interface IOnigCaptureIndex {
	readonly start: number;
	readonly end: number;
	readonly length: number;
}
export type IMatchResult = {
	readonly captureIndices: IOnigCaptureIndex[];
	readonly matchedRuleId: RuleId | typeof endRuleId;
}
type Matcher<T> = {
	(matcherInput: T): boolean;
}
type BalancedBracketSelectors = {
	readonly balancedBracketScopes: Matcher<string[]>[];
	readonly unbalancedBracketScopes: Matcher<string[]>[];
	readonly allowAny: boolean;
}
type IGrammarRepository = {
	lookup(scopeName: ScopeName): vscodeTextmate.IRawGrammar | undefined;
	injections(scopeName: ScopeName): ScopeName[];
}
const enum FontStyle {
	NotSet = -1,
	None = 0,
	Italic = 1,
	Bold = 2,
	Underline = 4,
	Strikethrough = 8
}
type OrMask<T extends number> = number;
type StyleAttributes = {
	readonly fontStyle: OrMask<FontStyle>,
	readonly foregroundId: number,
	readonly backgroundId: number
}
type IThemeProvider = {
	themeMatch(scopePath: ScopeStack): StyleAttributes | null;
	getDefaults(): StyleAttributes;
}
const enum OptionalStandardTokenType {
	Other = 0,
	Comment = 1,
	String = 2,
	RegEx = 3,
	// Indicates that no token type is set.
	NotSet = 8
}
type BasicScopeAttributes = {
	readonly languageId: number,
	readonly tokenType: OptionalStandardTokenType
}

type ScopeMatcher<TValue> = {
	readonly values: ReadonlyMap<string, TValue> | null;
	readonly scopesRegExp: RegExp | null;
}

type BasicScopeAttributesProvider = {
	readonly _defaultAttributes: BasicScopeAttributes;
	readonly _embeddedLanguagesMatcher: ScopeMatcher</* language id */ number>;
}
type Injection = {
	readonly debugSelector: string;
	readonly matcher: Matcher<string[]>;
	readonly priority: -1 | 0 | 1; // 0 is the default. -1 for 'L' and 1 for 'R'
	readonly ruleId: RuleId;
	readonly grammar: vscodeTextmate.IRawGrammar;
}

const enum StandardTokenType {
	Other = 0,
	Comment = 1,
	String = 2,
	RegEx = 3
}
interface TokenTypeMatcher {
	readonly matcher: Matcher<string[]>;
	readonly type: StandardTokenType;
}
export type IGrammar = vscodeTextmate.IGrammar & {
	rules: IMatchResult[],
	readonly _rootScopeName: ScopeName,
	readonly grammar: vscodeTextmate.IRawGrammar,
	readonly initialLanguage: number,
	readonly embeddedLanguages: vscodeTextmate.IEmbeddedLanguagesMap | null,
	readonly tokenTypes: vscodeTextmate.ITokenTypeMap | null,
	readonly balancedBracketSelectors: BalancedBracketSelectors | null,
	readonly grammarRepository: IGrammarRepository & IThemeProvider,
	readonly _onigLib: vscodeTextmate.IOnigLib,

	readonly _rootId: RuleId | -1,
	readonly _lastRuleId: number,
	readonly _ruleId2desc: Rule[],
	readonly _includedGrammars: { [scopeName: string]: vscodeTextmate.IRawGrammar },
	readonly _grammarRepository: IGrammarRepository & IThemeProvider,
	readonly _grammar: vscodeTextmate.IRawGrammar,
	readonly _injections: Injection[] | null,
	readonly _basicScopeAttributesProvider: BasicScopeAttributesProvider,
	readonly _tokenTypeMatchers: TokenTypeMatcher[],

};


type ILocation = {
	readonly filename: string;
	readonly line: number;
	readonly char: number;
}
type ILocatable = {
	readonly $vscodeTextmateLocation?: ILocation;
}

type IncludeString = string;
type RegExpString = string;

type IRawCaptures = IRawCapturesMap & ILocatable;

type IRawCapturesMap = {
	[captureId: string]: IRawRule;
}

type IRawRepositoryMap = {
	[name: string]: IRawRule;
	$self: IRawRule;
	$base: IRawRule;
}

type IRawRepository = IRawRepositoryMap & ILocatable;

export type IRawRule = ILocatable & {
	id?: RuleId; // This is not part of the spec only used internally

	readonly include?: IncludeString;

	readonly name?: ScopeName;
	readonly contentName?: ScopeName;

	readonly match?: RegExpString;
	readonly captures?: IRawCaptures;
	readonly begin?: RegExpString;
	readonly beginCaptures?: IRawCaptures;
	readonly end?: RegExpString;
	readonly endCaptures?: IRawCaptures;
	readonly while?: RegExpString;
	readonly whileCaptures?: IRawCaptures;
	readonly patterns?: IRawRule[];

	readonly repository?: IRawRepository;

	readonly applyEndPatternLast?: boolean;
}


export type IRawGrammar = ILocatable & {
	repository: IRawRepository;
	readonly scopeName: ScopeName;
	readonly patterns: IRawRule[];
	readonly injections?: { [expression: string]: IRawRule };
	readonly injectionSelector?: string;

	readonly fileTypes?: string[];
	readonly name?: string;
	readonly firstLineMatch?: string;
}


async function onigLibInterface() {
	return {
		createOnigScanner(sources: string[]): vscodeOniguruma.OnigScanner {
			return new vscodeOniguruma.OnigScanner(sources);
		},
		createOnigString(str: string) {
			return new vscodeOniguruma.OnigString(str);
		}
	};
}

async function loadGrammar(scopeName: string): Promise<vscodeTextmate.IRawGrammar | null> {
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.scopeName == scopeName) {
					const path = grammar.path;
					if (path) {
						const uri = vscode.Uri.joinPath(extension.extensionUri, path);
						if (uri.scheme != 'untitled') {
							const document = await vscode.workspace.openTextDocument(uri);
							const rawGrammar = vscodeTextmate.parseRawGrammar(document.getText(), uri.path);
							return rawGrammar;
						}
					}
				}
			}
		}
	}
	vscode.window.showInformationMessage(`Unknown scopeName: ${scopeName}`);
	console.log(`TextMate: Unknown scope name: ${scopeName}`);
	return null;
}

let registry: vscodeTextmate.Registry;
export function initTextMate(context: vscode.ExtensionContext): void {
	const options: vscodeTextmate.RegistryOptions = {
		onigLib: onigLibInterface(),
		loadGrammar: loadGrammar,
	}

	// Create a registry that can create a grammar from a scope name.
	registry = new vscodeTextmate.Registry(options);

}

function getScopeName(lang: string): string {
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.language == lang) {
					const scopeName = grammar.scopeName;
					if (scopeName) {
						return scopeName;
					}
				}
			}
		}
	}
	return null;
}

export async function tokenizeLine(document: vscode.TextDocument, lineNumber: number) {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	const grammar = await registry.loadGrammar(scopeName);
	// vscode.window.showInformationMessage(JSON.stringify(grammar));
	// vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));

	// const text = [
	// 	`function sayHello(name) {`,
	// 	`\treturn "Hello, " + name;`,
	// 	`}`
	// ];
	// const text = document.getText();

	let tokenLineResult;
	let ruleStack = vscodeTextmate.INITIAL;
	for (let i = 0; i <= lineNumber; i++) {
		const line = document.lineAt(i).text;
		// const line = text[i];
		// vscode.window.showInformationMessage(JSON.stringify(ruleStack));
		// const lineTokens = tokenizeLine(grammar, line, ruleStack);
		const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
		// vscode.window.showInformationMessage(JSON.stringify(lineTokens));
		// console.log(`\nTokenizing line: ${line}`);
		// for (let j = 0; j < lineTokens.tokens.length; j++) {
		// 	const token = lineTokens.tokens[j];
		// 	console.log(` - token from ${token.startIndex} to ${token.endIndex} ` +
		// 		`(${line.substring(token.startIndex, token.endIndex)}) ` +
		// 		`with scopes ${token.scopes.join(', ')}`
		// 	);
		// }
		ruleStack = lineTokens.ruleStack;
		tokenLineResult = lineTokens;
	}


	// vscode.window.showInformationMessage(stringifyMaxDepth(grammar._ruleId2desc, 6));
	// @ts-ignore
	// vscode.window.showInformationMessage(JSON.stringify((grammar as Grammar)._ruleId2desc, stringify));
	// vscode.window.showInformationMessage(JSON.stringify(ruleStack, stringify));
	return tokenLineResult;
}


export async function tokenizeFile(document: vscode.TextDocument): Promise<IGrammar> {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	// const grammar = await registry.loadGrammar(scopeName);

	const grammar = <IGrammar>await registry.loadGrammar(scopeName);
	// Very hacky, assigns array so `_tokenizeString()` can add rules to it
	grammar.rules = [];

	// const tokenLineResults: vscodeTextmate.ITokenizeLineResult[] = [];
	let ruleStack = vscodeTextmate.INITIAL;
	for (let i = 0; i < document.lineCount; i++) {
		const line = document.lineAt(i).text;
		const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
		// tokenLineResults.push(
		// 	{
		// 		tokens: lineTokens.tokens,
		// 		ruleStack: structuredClone(lineTokens.ruleStack),
		// 		stoppedEarly: lineTokens.stoppedEarly,
		// 	}
		// );

		// one liner?
		grammar.rules.pop();
		grammar.rules.push(undefined);
		ruleStack = lineTokens.ruleStack;
	}

	// vscode.window.showInformationMessage(JSON.stringify(registry, stringify));
	vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
	// vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));

	// return tokenLineResults;
	return grammar;
}
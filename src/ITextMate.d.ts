import * as vscodeTextmate from "./textmate/main";
import * as vscodeOniguruma from 'vscode-oniguruma';

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
	readonly scopeName: ScopeName;
};
type EncodedTokenAttributes = number;

type AttributedScopeStack = {

	readonly parent: AttributedScopeStack | null,
	readonly scopePath: ScopeStack,
	readonly tokenAttributes: EncodedTokenAttributes;
};

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
	readonly contentNameScopesList: AttributedScopeStack | null;
};

interface IRegExpSourceAnchorCache {
	readonly A0_G0: string;
	readonly A0_G1: string;
	readonly A1_G0: string;
	readonly A1_G1: string;
}

type RegExpSource<TRuleId = RuleId | typeof endRuleId> = {
	readonly source: string | undefined;
	readonly ruleId: TRuleId;
	readonly hasAnchor: boolean;
	readonly hasBackReferences: boolean;
	readonly _anchorCache: IRegExpSourceAnchorCache | null;
};

type CaptureRule = Rule & {
	readonly retokenizeCapturedWithRuleId: RuleId | 0;
};

type IRegExpSourceListAnchorCache<TRuleId> = {
	readonly A0_G0: CompiledRule<TRuleId> | null,
	readonly A0_G1: CompiledRule<TRuleId> | null,
	readonly A1_G0: CompiledRule<TRuleId> | null,
	readonly A1_G1: CompiledRule<TRuleId> | null,
};
export type CompiledRule<TRuleId = RuleId | typeof endRuleId> = {
	readonly regExps: string[];
	readonly rules: RuleId[];
	readonly scanner: vscodeOniguruma.OnigScanner;
};
export type RegExpSourceList<TRuleId = RuleId | typeof endRuleId> = {
	readonly _items: RegExpSource<TRuleId>[],
	readonly _hasAnchors: boolean,
	readonly _cached: CompiledRule<TRuleId> | null,
	readonly _anchorCache: IRegExpSourceListAnchorCache<TRuleId>,
};

export type Rule = {
	readonly $location: undefined;
	readonly id: RuleId;
	readonly _nameIsCapturing: boolean;
	readonly _name: string | null;
	readonly _contentNameIsCapturing: boolean;
	readonly _contentName: string | null;


	readonly _match: RegExpSource;
	readonly captures: (CaptureRule | null)[];


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
};


export interface IToken {
	startIndex: number;
	readonly endIndex: number;
	readonly scopes: string[];
	readonly ruleId?: RuleId;
}
interface IOnigCaptureIndex {
	readonly start: number;
	readonly end: number;
	readonly length: number;
}
export type IMatchResult = {
	readonly parentId: RuleId;
	readonly captureIndices: IOnigCaptureIndex[];
	readonly matchedRuleId?: RuleId;
	readonly linePos: number;
	readonly time: number;
	readonly anchorPosition: number;
};
type Matcher<T> = {
	(matcherInput: T): boolean;
};
type BalancedBracketSelectors = {
	readonly balancedBracketScopes: Matcher<string[]>[];
	readonly unbalancedBracketScopes: Matcher<string[]>[];
	readonly allowAny: boolean;
};
type IGrammarRepository = {
	lookup(scopeName: ScopeName): vscodeTextmate.IRawGrammar | undefined;
	injections(scopeName: ScopeName): ScopeName[];
};
export const enum FontStyle {
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
	readonly backgroundId: number;
};
type IThemeProvider = {
	themeMatch(scopePath: ScopeStack): StyleAttributes | null;
	getDefaults(): StyleAttributes;
};
export const enum OptionalStandardTokenType {
	Other = 0,
	Comment = 1,
	String = 2,
	RegEx = 3,
	// Indicates that no token type is set.
	NotSet = 8
}
type BasicScopeAttributes = {
	readonly languageId: number,
	readonly tokenType: OptionalStandardTokenType;
};

type ScopeMatcher<TValue> = {
	readonly values: ReadonlyMap<string, TValue> | null;
	readonly scopesRegExp: RegExp | null;
};

type BasicScopeAttributesProvider = {
	readonly _defaultAttributes: BasicScopeAttributes;
	readonly _embeddedLanguagesMatcher: ScopeMatcher</* language id */ number>;
};
type Injection = {
	readonly debugSelector: string;
	readonly matcher: Matcher<string[]>;
	readonly priority: -1 | 0 | 1; // 0 is the default. -1 for 'L' and 1 for 'R'
	readonly ruleId: RuleId;
	readonly grammar: vscodeTextmate.IRawGrammar;
};

export const enum StandardTokenType {
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
	startTime: number,
	lines: { tokens: IToken[]; stoppedEarly: boolean; time: number; lastRule: number; rulesLength: number; }[],
	rules: (IMatchResult | undefined)[],
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
	readonly _includedGrammars: { [scopeName: string]: vscodeTextmate.IRawGrammar; },
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
};
type ILocatable = {
	readonly $vscodeTextmateLocation?: ILocation;
};

type IncludeString = string;
type RegExpString = string;

type IRawCaptures = IRawCapturesMap & ILocatable;

type IRawCapturesMap = {
	[captureId: string]: IRawRule;
};

type IRawRepositoryMap = {
	[name: string]: IRawRule;
	$self: IRawRule;
	$base: IRawRule;
};

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
};


export type IRawGrammar = ILocatable & {
	repository: IRawRepository;
	readonly scopeName: ScopeName;
	readonly patterns: IRawRule[];
	readonly injections?: { [expression: string]: IRawRule; };
	readonly injectionSelector?: string;

	readonly fileTypes?: string[];
	readonly name?: string;
	readonly firstLineMatch?: string;
};

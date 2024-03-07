"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTokens = exports.BalancedBracketSelectors = exports.StateStackImpl = exports.AttributedScopeStack = exports.Grammar = exports.createGrammar = void 0;
const debug_1 = require("../debug");
const encodedTokenAttributes_1 = require("../encodedTokenAttributes");
const matcher_1 = require("../matcher");
const onigLib_1 = require("../onigLib");
const rule_1 = require("../rule");
const theme_1 = require("../theme");
const utils_1 = require("../utils");
const basicScopesAttributeProvider_1 = require("./basicScopesAttributeProvider");
const tokenizeString_1 = require("./tokenizeString");
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
    return new Grammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib); //TODO
}
exports.createGrammar = createGrammar;
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
    const matchers = (0, matcher_1.createMatchers)(selector, nameMatcher);
    const ruleId = rule_1.RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
    for (const matcher of matchers) {
        result.push({
            debugSelector: selector,
            matcher: matcher.matcher,
            ruleId: ruleId,
            grammar: grammar,
            priority: matcher.priority
        });
    }
}
function nameMatcher(identifers, scopes) {
    if (scopes.length < identifers.length) {
        return false;
    }
    let lastIndex = 0;
    return identifers.every(identifier => {
        for (let i = lastIndex; i < scopes.length; i++) {
            if (scopesAreMatching(scopes[i], identifier)) {
                lastIndex = i + 1;
                return true;
            }
        }
        return false;
    });
}
function scopesAreMatching(thisScopeName, scopeName) {
    if (!thisScopeName) {
        return false;
    }
    if (thisScopeName === scopeName) {
        return true;
    }
    const len = scopeName.length;
    return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === '.';
}
class Grammar {
    _rootScopeName;
    balancedBracketSelectors;
    _onigLib;
    _rootId;
    _lastRuleId;
    _ruleId2desc;
    _includedGrammars;
    _grammarRepository;
    _grammar;
    _injections;
    _basicScopeAttributesProvider;
    _tokenTypeMatchers;
    get themeProvider() { return this._grammarRepository; }
    constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
        this._rootScopeName = _rootScopeName;
        this.balancedBracketSelectors = balancedBracketSelectors;
        this._onigLib = _onigLib;
        this._basicScopeAttributesProvider = new basicScopesAttributeProvider_1.BasicScopeAttributesProvider(initialLanguage, embeddedLanguages);
        this._rootId = -1;
        this._lastRuleId = 0;
        this._ruleId2desc = [null];
        this._includedGrammars = {};
        this._grammarRepository = grammarRepository;
        this._grammar = initGrammar(grammar, null);
        this._injections = null;
        this._tokenTypeMatchers = [];
        if (tokenTypes) {
            for (const selector of Object.keys(tokenTypes)) {
                const matchers = (0, matcher_1.createMatchers)(selector, nameMatcher);
                for (const matcher of matchers) {
                    this._tokenTypeMatchers.push({
                        matcher: matcher.matcher,
                        type: tokenTypes[selector],
                    });
                }
            }
        }
    }
    dispose() {
        for (const rule of this._ruleId2desc) {
            if (rule) {
                rule.dispose();
            }
        }
    }
    createOnigScanner(sources) {
        return this._onigLib.createOnigScanner(sources);
    }
    createOnigString(sources) {
        return this._onigLib.createOnigString(sources);
    }
    getMetadataForScope(scope) {
        return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
    }
    _collectInjections() {
        const grammarRepository = {
            lookup: (scopeName) => {
                if (scopeName === this._rootScopeName) {
                    return this._grammar;
                }
                return this.getExternalGrammar(scopeName);
            },
            injections: (scopeName) => {
                return this._grammarRepository.injections(scopeName);
            },
        };
        const result = [];
        const scopeName = this._rootScopeName;
        const grammar = grammarRepository.lookup(scopeName);
        if (grammar) {
            // add injections from the current grammar
            const rawInjections = grammar.injections;
            if (rawInjections) {
                for (let expression in rawInjections) {
                    collectInjections(result, expression, rawInjections[expression], this, grammar);
                }
            }
            // add injection grammars contributed for the current scope
            const injectionScopeNames = this._grammarRepository.injections(scopeName);
            if (injectionScopeNames) {
                injectionScopeNames.forEach((injectionScopeName) => {
                    const injectionGrammar = this.getExternalGrammar(injectionScopeName);
                    if (injectionGrammar) {
                        const selector = injectionGrammar.injectionSelector;
                        if (selector) {
                            collectInjections(result, selector, injectionGrammar, this, injectionGrammar);
                        }
                    }
                });
            }
        }
        result.sort((i1, i2) => i1.priority - i2.priority); // sort by priority
        return result;
    }
    getInjections() {
        if (this._injections === null) {
            this._injections = this._collectInjections();
            if (debug_1.DebugFlags.InDebugMode && this._injections.length > 0) {
                console.log(`Grammar ${this._rootScopeName} contains the following injections:`);
                for (const injection of this._injections) {
                    console.log(`  - ${injection.debugSelector}`);
                }
            }
        }
        return this._injections;
    }
    registerRule(factory) {
        const id = ++this._lastRuleId;
        const result = factory((0, rule_1.ruleIdFromNumber)(id));
        this._ruleId2desc[id] = result;
        return result;
    }
    getRule(ruleId) {
        return this._ruleId2desc[(0, rule_1.ruleIdToNumber)(ruleId)];
    }
    getExternalGrammar(scopeName, repository) {
        if (this._includedGrammars[scopeName]) {
            return this._includedGrammars[scopeName];
        }
        else if (this._grammarRepository) {
            const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
            if (rawIncludedGrammar) {
                // console.log('LOADED GRAMMAR ' + pattern.include);
                this._includedGrammars[scopeName] = initGrammar(rawIncludedGrammar, repository && repository.$base);
                return this._includedGrammars[scopeName];
            }
        }
        return undefined;
    }
    tokenizeLine(lineText, prevState, timeLimit = 0) {
        const r = this._tokenize(lineText, prevState, false, timeLimit);
        return {
            tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
            ruleStack: r.ruleStack,
            stoppedEarly: r.stoppedEarly,
        };
    }
    tokenizeLine2(lineText, prevState, timeLimit = 0) {
        const r = this._tokenize(lineText, prevState, true, timeLimit);
        return {
            tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
            ruleStack: r.ruleStack,
            stoppedEarly: r.stoppedEarly,
        };
    }
    _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
        if (this._rootId === -1) {
            this._rootId = rule_1.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository);
            // This ensures ids are deterministic, and thus equal in renderer and webworker.
            this.getInjections();
        }
        let isFirstLine;
        if (!prevState || prevState === StateStackImpl.NULL) {
            isFirstLine = true;
            const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
            const defaultStyle = this.themeProvider.getDefaults();
            const defaultMetadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(0, rawDefaultMetadata.languageId, rawDefaultMetadata.tokenType, null, defaultStyle.fontStyle, defaultStyle.foregroundId, defaultStyle.backgroundId);
            const rootScopeName = this.getRule(this._rootId).getName(null, null);
            let scopeList;
            if (rootScopeName) {
                scopeList = AttributedScopeStack.createRootAndLookUpScopeName(rootScopeName, defaultMetadata, this);
            }
            else {
                scopeList = AttributedScopeStack.createRoot("unknown", defaultMetadata);
            }
            prevState = new StateStackImpl(null, this._rootId, -1, -1, false, null, scopeList, scopeList);
        }
        else {
            isFirstLine = false;
            prevState.reset();
        }
        lineText = lineText + "\n";
        const onigLineText = this.createOnigString(lineText);
        const lineLength = onigLineText.content.length;
        const lineTokens = new LineTokens(emitBinaryTokens, lineText, this._tokenTypeMatchers, this.balancedBracketSelectors);
        const r = (0, tokenizeString_1._tokenizeString)(this, onigLineText, isFirstLine, 0, prevState, lineTokens, true, timeLimit);
        (0, onigLib_1.disposeOnigString)(onigLineText);
        return {
            lineLength: lineLength,
            lineTokens: lineTokens,
            ruleStack: r.stack,
            stoppedEarly: r.stoppedEarly,
        };
    }
}
exports.Grammar = Grammar;
function initGrammar(grammar, base) {
    grammar = (0, utils_1.clone)(grammar);
    grammar.repository = grammar.repository || {};
    grammar.repository.$self = {
        $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
        patterns: grammar.patterns,
        name: grammar.scopeName
    };
    grammar.repository.$base = base || grammar.repository.$self;
    return grammar;
}
class AttributedScopeStack {
    parent;
    scopePath;
    tokenAttributes;
    static fromExtension(namesScopeList, contentNameScopesList) {
        let current = namesScopeList;
        let scopeNames = namesScopeList?.scopePath ?? null;
        for (const frame of contentNameScopesList) {
            scopeNames = theme_1.ScopeStack.push(scopeNames, frame.scopeNames);
            current = new AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
        }
        return current;
    }
    static createRoot(scopeName, tokenAttributes) {
        return new AttributedScopeStack(null, new theme_1.ScopeStack(null, scopeName), tokenAttributes);
    }
    static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
        const rawRootMetadata = grammar.getMetadataForScope(scopeName);
        const scopePath = new theme_1.ScopeStack(null, scopeName);
        const rootStyle = grammar.themeProvider.themeMatch(scopePath);
        const resolvedTokenAttributes = AttributedScopeStack.mergeAttributes(tokenAttributes, rawRootMetadata, rootStyle);
        return new AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
    }
    get scopeName() { return this.scopePath.scopeName; }
    /**
     * Invariant:
     * ```
     * if (parent && !scopePath.extends(parent.scopePath)) {
     * 	throw new Error();
     * }
     * ```
     */
    constructor(parent, scopePath, tokenAttributes) {
        this.parent = parent;
        this.scopePath = scopePath;
        this.tokenAttributes = tokenAttributes;
    }
    toString() {
        return this.getScopeNames().join(' ');
    }
    equals(other) {
        return AttributedScopeStack.equals(this, other);
    }
    static equals(a, b) {
        do {
            if (a === b) {
                return true;
            }
            if (!a && !b) {
                // End of list reached for both
                return true;
            }
            if (!a || !b) {
                // End of list reached only for one
                return false;
            }
            if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
                return false;
            }
            // Go to previous pair
            a = a.parent;
            b = b.parent;
        } while (true);
    }
    static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
        let fontStyle = -1 /* FontStyle.NotSet */;
        let foreground = 0;
        let background = 0;
        if (styleAttributes !== null) {
            fontStyle = styleAttributes.fontStyle;
            foreground = styleAttributes.foregroundId;
            background = styleAttributes.backgroundId;
        }
        return encodedTokenAttributes_1.EncodedTokenAttributes.set(existingTokenAttributes, basicScopeAttributes.languageId, basicScopeAttributes.tokenType, null, fontStyle, foreground, background);
    }
    pushAttributed(scopePath, grammar) {
        if (scopePath === null) {
            return this;
        }
        if (scopePath.indexOf(' ') === -1) {
            // This is the common case and much faster
            return AttributedScopeStack._pushAttributed(this, scopePath, grammar);
        }
        const scopes = scopePath.split(/ /g);
        let result = this;
        for (const scope of scopes) {
            result = AttributedScopeStack._pushAttributed(result, scope, grammar);
        }
        return result;
    }
    static _pushAttributed(target, scopeName, grammar) {
        const rawMetadata = grammar.getMetadataForScope(scopeName);
        const newPath = target.scopePath.push(scopeName);
        const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
        const metadata = AttributedScopeStack.mergeAttributes(target.tokenAttributes, rawMetadata, scopeThemeMatchResult);
        return new AttributedScopeStack(target, newPath, metadata);
    }
    getScopeNames() {
        return this.scopePath.getSegments();
    }
    getExtensionIfDefined(base) {
        const result = [];
        let self = this;
        while (self && self !== base) {
            result.push({
                encodedTokenAttributes: self.tokenAttributes,
                scopeNames: self.scopePath.getExtensionIfDefined(self.parent?.scopePath ?? null),
            });
            self = self.parent;
        }
        return self === base ? result.reverse() : undefined;
    }
}
exports.AttributedScopeStack = AttributedScopeStack;
/**
 * Represents a "pushed" state on the stack (as a linked list element).
 */
class StateStackImpl {
    parent;
    ruleId;
    beginRuleCapturedEOL;
    endRule;
    nameScopesList;
    contentNameScopesList;
    _stackElementBrand = undefined;
    // TODO remove me
    static NULL = new StateStackImpl(null, 0, 0, 0, false, null, null, null);
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    _enterPos;
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    _anchorPos;
    /**
     * The depth of the stack.
     */
    depth;
    /**
     * Invariant:
     * ```
     * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
     * 	throw new Error();
     * }
     * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
     * 	throw new Error();
     * }
     * ```
     */
    constructor(
    /**
     * The previous state on the stack (or null for the root state).
     */
    parent, 
    /**
     * The state (rule) that this element represents.
     */
    ruleId, enterPos, anchorPos, 
    /**
     * The state has entered and captured \n. This means that the next line should have an anchorPosition of 0.
     */
    beginRuleCapturedEOL, 
    /**
     * The "pop" (end) condition for this state in case that it was dynamically generated through captured text.
     */
    endRule, 
    /**
     * The list of scopes containing the "name" for this state.
     */
    nameScopesList, 
    /**
     * The list of scopes containing the "contentName" (besides "name") for this state.
     * This list **must** contain as an element `scopeName`.
     */
    contentNameScopesList) {
        this.parent = parent;
        this.ruleId = ruleId;
        this.beginRuleCapturedEOL = beginRuleCapturedEOL;
        this.endRule = endRule;
        this.nameScopesList = nameScopesList;
        this.contentNameScopesList = contentNameScopesList;
        this.depth = this.parent ? this.parent.depth + 1 : 1;
        this._enterPos = enterPos;
        this._anchorPos = anchorPos;
    }
    equals(other) {
        if (other === null) {
            return false;
        }
        return StateStackImpl._equals(this, other);
    }
    static _equals(a, b) {
        if (a === b) {
            return true;
        }
        if (!this._structuralEquals(a, b)) {
            return false;
        }
        return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
    }
    /**
     * A structural equals check. Does not take into account `scopes`.
     */
    static _structuralEquals(a, b) {
        do {
            if (a === b) {
                return true;
            }
            if (!a && !b) {
                // End of list reached for both
                return true;
            }
            if (!a || !b) {
                // End of list reached only for one
                return false;
            }
            if (a.depth !== b.depth ||
                a.ruleId !== b.ruleId ||
                a.endRule !== b.endRule) {
                return false;
            }
            // Go to previous pair
            a = a.parent;
            b = b.parent;
        } while (true);
    }
    clone() {
        return this;
    }
    static _reset(el) {
        while (el) {
            el._enterPos = -1;
            el._anchorPos = -1;
            el = el.parent;
        }
    }
    reset() {
        StateStackImpl._reset(this);
    }
    pop() {
        return this.parent;
    }
    safePop() {
        if (this.parent) {
            return this.parent;
        }
        return this;
    }
    push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
        return new StateStackImpl(this, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList);
    }
    getEnterPos() {
        return this._enterPos;
    }
    getAnchorPos() {
        return this._anchorPos;
    }
    getRule(grammar) {
        return grammar.getRule(this.ruleId);
    }
    toString() {
        const r = [];
        this._writeString(r, 0);
        return "[" + r.join(",") + "]";
    }
    _writeString(res, outIndex) {
        if (this.parent) {
            outIndex = this.parent._writeString(res, outIndex);
        }
        res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
        return outIndex;
    }
    withContentNameScopesList(contentNameScopeStack) {
        if (this.contentNameScopesList === contentNameScopeStack) {
            return this;
        }
        return this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, contentNameScopeStack);
    }
    withEndRule(endRule) {
        if (this.endRule === endRule) {
            return this;
        }
        return new StateStackImpl(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, endRule, this.nameScopesList, this.contentNameScopesList);
    }
    // Used to warn of endless loops
    hasSameRuleAs(other) {
        let el = this;
        while (el && el._enterPos === other._enterPos) {
            if (el.ruleId === other.ruleId) {
                return true;
            }
            el = el.parent;
        }
        return false;
    }
    toStateStackFrame() {
        return {
            ruleId: (0, rule_1.ruleIdToNumber)(this.ruleId),
            beginRuleCapturedEOL: this.beginRuleCapturedEOL,
            endRule: this.endRule,
            nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
            contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? [],
        };
    }
    static pushFrame(self, frame) {
        const namesScopeList = AttributedScopeStack.fromExtension(self?.nameScopesList ?? null, frame.nameScopesList);
        return new StateStackImpl(self, (0, rule_1.ruleIdFromNumber)(frame.ruleId), frame.enterPos ?? -1, frame.anchorPos ?? -1, frame.beginRuleCapturedEOL, frame.endRule, namesScopeList, AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList));
    }
}
exports.StateStackImpl = StateStackImpl;
class BalancedBracketSelectors {
    balancedBracketScopes;
    unbalancedBracketScopes;
    allowAny = false;
    constructor(balancedBracketScopes, unbalancedBracketScopes) {
        this.balancedBracketScopes = balancedBracketScopes.flatMap((selector) => {
            if (selector === '*') {
                this.allowAny = true;
                return [];
            }
            return (0, matcher_1.createMatchers)(selector, nameMatcher).map((m) => m.matcher);
        });
        this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap((selector) => (0, matcher_1.createMatchers)(selector, nameMatcher).map((m) => m.matcher));
    }
    get matchesAlways() {
        return this.allowAny && this.unbalancedBracketScopes.length === 0;
    }
    get matchesNever() {
        return this.balancedBracketScopes.length === 0 && !this.allowAny;
    }
    match(scopes) {
        for (const excluder of this.unbalancedBracketScopes) {
            if (excluder(scopes)) {
                return false;
            }
        }
        for (const includer of this.balancedBracketScopes) {
            if (includer(scopes)) {
                return true;
            }
        }
        return this.allowAny;
    }
}
exports.BalancedBracketSelectors = BalancedBracketSelectors;
class LineTokens {
    balancedBracketSelectors;
    _emitBinaryTokens;
    /**
     * defined only if `DebugFlags.InDebugMode`.
     */
    _lineText;
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    _tokens;
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    _binaryTokens;
    _lastTokenEndIndex;
    _tokenTypeOverrides;
    constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
        this.balancedBracketSelectors = balancedBracketSelectors;
        this._emitBinaryTokens = emitBinaryTokens;
        this._tokenTypeOverrides = tokenTypeOverrides;
        if (debug_1.DebugFlags.InDebugMode) {
            this._lineText = lineText;
        }
        else {
            this._lineText = null;
        }
        this._tokens = [];
        this._binaryTokens = [];
        this._lastTokenEndIndex = 0;
    }
    produce(stack, endIndex) {
        this.produceFromScopes(stack.contentNameScopesList, endIndex);
    }
    produceFromScopes(scopesList, endIndex) {
        if (this._lastTokenEndIndex >= endIndex) {
            return;
        }
        if (this._emitBinaryTokens) {
            let metadata = scopesList?.tokenAttributes ?? 0;
            let containsBalancedBrackets = false;
            if (this.balancedBracketSelectors?.matchesAlways) {
                containsBalancedBrackets = true;
            }
            if (this._tokenTypeOverrides.length > 0 || (this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever)) {
                // Only generate scope array when required to improve performance
                const scopes = scopesList?.getScopeNames() ?? [];
                for (const tokenType of this._tokenTypeOverrides) {
                    if (tokenType.matcher(scopes)) {
                        metadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(metadata, 0, (0, encodedTokenAttributes_1.toOptionalTokenType)(tokenType.type), null, -1 /* FontStyle.NotSet */, 0, 0);
                    }
                }
                if (this.balancedBracketSelectors) {
                    containsBalancedBrackets = this.balancedBracketSelectors.match(scopes);
                }
            }
            if (containsBalancedBrackets) {
                metadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(metadata, 0, 8 /* OptionalStandardTokenType.NotSet */, containsBalancedBrackets, -1 /* FontStyle.NotSet */, 0, 0);
            }
            if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
                // no need to push a token with the same metadata
                this._lastTokenEndIndex = endIndex;
                return;
            }
            if (debug_1.DebugFlags.InDebugMode) {
                const scopes = scopesList?.getScopeNames() ?? [];
                console.log('  token: |' + this._lineText.substring(this._lastTokenEndIndex, endIndex).replace(/\n$/, '\\n') + '|');
                for (let k = 0; k < scopes.length; k++) {
                    console.log('      * ' + scopes[k]);
                }
            }
            this._binaryTokens.push(this._lastTokenEndIndex);
            this._binaryTokens.push(metadata);
            this._lastTokenEndIndex = endIndex;
            return;
        }
        const scopes = scopesList?.getScopeNames() ?? [];
        if (debug_1.DebugFlags.InDebugMode) {
            console.log('  token: |' + this._lineText.substring(this._lastTokenEndIndex, endIndex).replace(/\n$/, '\\n') + '|');
            for (let k = 0; k < scopes.length; k++) {
                console.log('      * ' + scopes[k]);
            }
        }
        this._tokens.push({
            startIndex: this._lastTokenEndIndex,
            endIndex: endIndex,
            // value: lineText.substring(lastTokenEndIndex, endIndex),
            scopes: scopes
        });
        this._lastTokenEndIndex = endIndex;
    }
    getResult(stack, lineLength) {
        if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
            // pop produced token for newline
            this._tokens.pop();
        }
        if (this._tokens.length === 0) {
            this._lastTokenEndIndex = -1;
            this.produce(stack, lineLength);
            this._tokens[this._tokens.length - 1].startIndex = 0;
        }
        return this._tokens;
    }
    getBinaryResult(stack, lineLength) {
        if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
            // pop produced token for newline
            this._binaryTokens.pop();
            this._binaryTokens.pop();
        }
        if (this._binaryTokens.length === 0) {
            this._lastTokenEndIndex = -1;
            this.produce(stack, lineLength);
            this._binaryTokens[this._binaryTokens.length - 2] = 0;
        }
        const result = new Uint32Array(this._binaryTokens.length);
        for (let i = 0, len = this._binaryTokens.length; i < len; i++) {
            result[i] = this._binaryTokens[i];
        }
        return result;
    }
}
exports.LineTokens = LineTokens;

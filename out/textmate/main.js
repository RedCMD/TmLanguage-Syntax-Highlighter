"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyStateStackDiff = exports.diffStateStacksRefEq = exports.parseRawGrammar = exports.INITIAL = exports.Registry = void 0;
const grammar_1 = require("./grammar");
const grammarReader = require("./parseRawGrammar");
const registry_1 = require("./registry");
const theme_1 = require("./theme");
const grammarDependencies_1 = require("./grammar/grammarDependencies");
const diffStateStacks_1 = require("./diffStateStacks");
Object.defineProperty(exports, "applyStateStackDiff", { enumerable: true, get: function () { return diffStateStacks_1.applyStateStackDiff; } });
Object.defineProperty(exports, "diffStateStacksRefEq", { enumerable: true, get: function () { return diffStateStacks_1.diffStateStacksRefEq; } });
__exportStar(require("./onigLib"), exports);
/**
 * The registry that will hold all grammars.
 */
class Registry {
    _options;
    _syncRegistry;
    _ensureGrammarCache;
    constructor(options) {
        this._options = options;
        this._syncRegistry = new registry_1.SyncRegistry(theme_1.Theme.createFromRawTheme(options.theme, options.colorMap), options.onigLib);
        this._ensureGrammarCache = new Map();
    }
    dispose() {
        this._syncRegistry.dispose();
    }
    /**
     * Change the theme. Once called, no previous `ruleStack` should be used anymore.
     */
    setTheme(theme, colorMap) {
        this._syncRegistry.setTheme(theme_1.Theme.createFromRawTheme(theme, colorMap));
    }
    /**
     * Returns a lookup array for color ids.
     */
    getColorMap() {
        return this._syncRegistry.getColorMap();
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
        return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
        return this._loadGrammar(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes, new grammar_1.BalancedBracketSelectors(configuration.balancedBracketSelectors || [], configuration.unbalancedBracketSelectors || []));
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     */
    loadGrammar(initialScopeName) {
        return this._loadGrammar(initialScopeName, 0, null, null, null);
    }
    async _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
        const dependencyProcessor = new grammarDependencies_1.ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
        while (dependencyProcessor.Q.length > 0) {
            await Promise.all(dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName)));
            dependencyProcessor.processQueue();
        }
        return this._grammarForScopeName(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
    }
    async _loadSingleGrammar(scopeName) {
        if (!this._ensureGrammarCache.has(scopeName)) {
            this._ensureGrammarCache.set(scopeName, this._doLoadSingleGrammar(scopeName));
        }
        return this._ensureGrammarCache.get(scopeName);
    }
    async _doLoadSingleGrammar(scopeName) {
        const grammar = await this._options.loadGrammar(scopeName);
        if (grammar) {
            const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : undefined;
            this._syncRegistry.addGrammar(grammar, injections);
        }
    }
    /**
     * Adds a rawGrammar.
     */
    async addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
        this._syncRegistry.addGrammar(rawGrammar, injections);
        return (await this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages));
    }
    /**
     * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
     */
    _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
        return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
    }
}
exports.Registry = Registry;
exports.INITIAL = grammar_1.StateStackImpl.NULL;
exports.parseRawGrammar = grammarReader.parseRawGrammar;

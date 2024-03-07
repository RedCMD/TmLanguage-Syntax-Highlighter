"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncRegistry = void 0;
const grammar_1 = require("./grammar");
class SyncRegistry {
    _onigLibPromise;
    _grammars = new Map();
    _rawGrammars = new Map();
    _injectionGrammars = new Map();
    _theme;
    constructor(theme, _onigLibPromise) {
        this._onigLibPromise = _onigLibPromise;
        this._theme = theme;
    }
    dispose() {
        for (const grammar of this._grammars.values()) {
            grammar.dispose();
        }
    }
    setTheme(theme) {
        this._theme = theme;
    }
    getColorMap() {
        return this._theme.getColorMap();
    }
    /**
     * Add `grammar` to registry and return a list of referenced scope names
     */
    addGrammar(grammar, injectionScopeNames) {
        this._rawGrammars.set(grammar.scopeName, grammar);
        if (injectionScopeNames) {
            this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
        }
    }
    /**
     * Lookup a raw grammar.
     */
    lookup(scopeName) {
        return this._rawGrammars.get(scopeName);
    }
    /**
     * Returns the injections for the given grammar
     */
    injections(targetScope) {
        return this._injectionGrammars.get(targetScope);
    }
    /**
     * Get the default theme settings
     */
    getDefaults() {
        return this._theme.getDefaults();
    }
    /**
     * Match a scope in the theme.
     */
    themeMatch(scopePath) {
        return this._theme.match(scopePath);
    }
    /**
     * Lookup a grammar.
     */
    async grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
        if (!this._grammars.has(scopeName)) {
            let rawGrammar = this._rawGrammars.get(scopeName);
            if (!rawGrammar) {
                return null;
            }
            this._grammars.set(scopeName, (0, grammar_1.createGrammar)(scopeName, rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, this, await this._onigLibPromise));
        }
        return this._grammars.get(scopeName);
    }
}
exports.SyncRegistry = SyncRegistry;

"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicScopeAttributesProvider = exports.BasicScopeAttributes = void 0;
const utils_1 = require("../utils");
class BasicScopeAttributes {
    languageId;
    tokenType;
    constructor(languageId, tokenType) {
        this.languageId = languageId;
        this.tokenType = tokenType;
    }
}
exports.BasicScopeAttributes = BasicScopeAttributes;
class BasicScopeAttributesProvider {
    _defaultAttributes;
    _embeddedLanguagesMatcher;
    constructor(initialLanguageId, embeddedLanguages) {
        this._defaultAttributes = new BasicScopeAttributes(initialLanguageId, 8 /* OptionalStandardTokenType.NotSet */);
        this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
    }
    getDefaultAttributes() {
        return this._defaultAttributes;
    }
    getBasicScopeAttributes(scopeName) {
        if (scopeName === null) {
            return BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
        }
        return this._getBasicScopeAttributes.get(scopeName);
    }
    static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
    _getBasicScopeAttributes = new utils_1.CachedFn((scopeName) => {
        const languageId = this._scopeToLanguage(scopeName);
        const standardTokenType = this._toStandardTokenType(scopeName);
        return new BasicScopeAttributes(languageId, standardTokenType);
    });
    /**
     * Given a produced TM scope, return the language that token describes or null if unknown.
     * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
     */
    _scopeToLanguage(scope) {
        return this._embeddedLanguagesMatcher.match(scope) || 0;
    }
    _toStandardTokenType(scopeName) {
        const m = scopeName.match(BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
        if (!m) {
            return 8 /* OptionalStandardTokenType.NotSet */;
        }
        switch (m[1]) {
            case "comment":
                return 1 /* OptionalStandardTokenType.Comment */;
            case "string":
                return 2 /* OptionalStandardTokenType.String */;
            case "regex":
                return 3 /* OptionalStandardTokenType.RegEx */;
            case "meta.embedded":
                return 0 /* OptionalStandardTokenType.Other */;
        }
        throw new Error("Unexpected match for standard token type!");
    }
    static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}
exports.BasicScopeAttributesProvider = BasicScopeAttributesProvider;
class ScopeMatcher {
    values;
    scopesRegExp;
    constructor(values) {
        if (values.length === 0) {
            this.values = null;
            this.scopesRegExp = null;
        }
        else {
            this.values = new Map(values);
            // create the regex
            const escapedScopes = values.map(([scopeName, value]) => (0, utils_1.escapeRegExpCharacters)(scopeName));
            escapedScopes.sort();
            escapedScopes.reverse(); // Longest scope first
            this.scopesRegExp = new RegExp(`^((${escapedScopes.join(")|(")}))($|\\.)`, "");
        }
    }
    match(scope) {
        if (!this.scopesRegExp) {
            return undefined;
        }
        const m = scope.match(this.scopesRegExp);
        if (!m) {
            // no scopes matched
            return undefined;
        }
        return this.values.get(m[1]);
    }
}

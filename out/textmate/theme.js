"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeTrieElement = exports.ThemeTrieElementRule = exports.ColorMap = exports.fontStyleToString = exports.ParsedThemeRule = exports.parseTheme = exports.StyleAttributes = exports.ScopeStack = exports.Theme = void 0;
const utils_1 = require("./utils");
class Theme {
    _colorMap;
    _defaults;
    _root;
    static createFromRawTheme(source, colorMap) {
        return this.createFromParsedTheme(parseTheme(source), colorMap);
    }
    static createFromParsedTheme(source, colorMap) {
        return resolveParsedThemeRules(source, colorMap);
    }
    _cachedMatchRoot = new utils_1.CachedFn((scopeName) => this._root.match(scopeName));
    constructor(_colorMap, _defaults, _root) {
        this._colorMap = _colorMap;
        this._defaults = _defaults;
        this._root = _root;
    }
    getColorMap() {
        return this._colorMap.getColorMap();
    }
    getDefaults() {
        return this._defaults;
    }
    match(scopePath) {
        if (scopePath === null) {
            return this._defaults;
        }
        const scopeName = scopePath.scopeName;
        const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
        const effectiveRule = matchingTrieElements.find((v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes));
        if (!effectiveRule) {
            return null;
        }
        return new StyleAttributes(effectiveRule.fontStyle, effectiveRule.foreground, effectiveRule.background);
    }
}
exports.Theme = Theme;
class ScopeStack {
    parent;
    scopeName;
    static push(path, scopeNames) {
        for (const name of scopeNames) {
            path = new ScopeStack(path, name);
        }
        return path;
    }
    static from(...segments) {
        let result = null;
        for (let i = 0; i < segments.length; i++) {
            result = new ScopeStack(result, segments[i]);
        }
        return result;
    }
    constructor(parent, scopeName) {
        this.parent = parent;
        this.scopeName = scopeName;
    }
    push(scopeName) {
        return new ScopeStack(this, scopeName);
    }
    getSegments() {
        let item = this;
        const result = [];
        while (item) {
            result.push(item.scopeName);
            item = item.parent;
        }
        result.reverse();
        return result;
    }
    toString() {
        return this.getSegments().join(' ');
    }
    extends(other) {
        if (this === other) {
            return true;
        }
        if (this.parent === null) {
            return false;
        }
        return this.parent.extends(other);
    }
    getExtensionIfDefined(base) {
        const result = [];
        let item = this;
        while (item && item !== base) {
            result.push(item.scopeName);
            item = item.parent;
        }
        return item === base ? result.reverse() : undefined;
    }
}
exports.ScopeStack = ScopeStack;
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
    if (parentScopes === null) {
        return true;
    }
    let index = 0;
    let scopePattern = parentScopes[index];
    while (scopePath) {
        if (_matchesScope(scopePath.scopeName, scopePattern)) {
            index++;
            if (index === parentScopes.length) {
                return true;
            }
            scopePattern = parentScopes[index];
        }
        scopePath = scopePath.parent;
    }
    return false;
}
function _matchesScope(scopeName, scopePattern) {
    return scopePattern === scopeName || (scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === '.');
}
class StyleAttributes {
    fontStyle;
    foregroundId;
    backgroundId;
    constructor(fontStyle, foregroundId, backgroundId) {
        this.fontStyle = fontStyle;
        this.foregroundId = foregroundId;
        this.backgroundId = backgroundId;
    }
}
exports.StyleAttributes = StyleAttributes;
/**
 * Parse a raw theme into rules.
 */
function parseTheme(source) {
    if (!source) {
        return [];
    }
    if (!source.settings || !Array.isArray(source.settings)) {
        return [];
    }
    let settings = source.settings;
    let result = [], resultLen = 0;
    for (let i = 0, len = settings.length; i < len; i++) {
        let entry = settings[i];
        if (!entry.settings) {
            continue;
        }
        let scopes;
        if (typeof entry.scope === 'string') {
            let _scope = entry.scope;
            // remove leading commas
            _scope = _scope.replace(/^[,]+/, '');
            // remove trailing commans
            _scope = _scope.replace(/[,]+$/, '');
            scopes = _scope.split(',');
        }
        else if (Array.isArray(entry.scope)) {
            scopes = entry.scope;
        }
        else {
            scopes = [''];
        }
        let fontStyle = -1 /* FontStyle.NotSet */;
        if (typeof entry.settings.fontStyle === 'string') {
            fontStyle = 0 /* FontStyle.None */;
            let segments = entry.settings.fontStyle.split(' ');
            for (let j = 0, lenJ = segments.length; j < lenJ; j++) {
                let segment = segments[j];
                switch (segment) {
                    case 'italic':
                        fontStyle = fontStyle | 1 /* FontStyle.Italic */;
                        break;
                    case 'bold':
                        fontStyle = fontStyle | 2 /* FontStyle.Bold */;
                        break;
                    case 'underline':
                        fontStyle = fontStyle | 4 /* FontStyle.Underline */;
                        break;
                    case 'strikethrough':
                        fontStyle = fontStyle | 8 /* FontStyle.Strikethrough */;
                        break;
                }
            }
        }
        let foreground = null;
        if (typeof entry.settings.foreground === 'string' && (0, utils_1.isValidHexColor)(entry.settings.foreground)) {
            foreground = entry.settings.foreground;
        }
        let background = null;
        if (typeof entry.settings.background === 'string' && (0, utils_1.isValidHexColor)(entry.settings.background)) {
            background = entry.settings.background;
        }
        for (let j = 0, lenJ = scopes.length; j < lenJ; j++) {
            let _scope = scopes[j].trim();
            let segments = _scope.split(' ');
            let scope = segments[segments.length - 1];
            let parentScopes = null;
            if (segments.length > 1) {
                parentScopes = segments.slice(0, segments.length - 1);
                parentScopes.reverse();
            }
            result[resultLen++] = new ParsedThemeRule(scope, parentScopes, i, fontStyle, foreground, background);
        }
    }
    return result;
}
exports.parseTheme = parseTheme;
class ParsedThemeRule {
    scope;
    parentScopes;
    index;
    fontStyle;
    foreground;
    background;
    constructor(scope, parentScopes, index, fontStyle, foreground, background) {
        this.scope = scope;
        this.parentScopes = parentScopes;
        this.index = index;
        this.fontStyle = fontStyle;
        this.foreground = foreground;
        this.background = background;
    }
}
exports.ParsedThemeRule = ParsedThemeRule;
function fontStyleToString(fontStyle) {
    if (fontStyle === -1 /* FontStyle.NotSet */) {
        return 'not set';
    }
    let style = '';
    if (fontStyle & 1 /* FontStyle.Italic */) {
        style += 'italic ';
    }
    if (fontStyle & 2 /* FontStyle.Bold */) {
        style += 'bold ';
    }
    if (fontStyle & 4 /* FontStyle.Underline */) {
        style += 'underline ';
    }
    if (fontStyle & 8 /* FontStyle.Strikethrough */) {
        style += 'strikethrough ';
    }
    if (style === '') {
        style = 'none';
    }
    return style.trim();
}
exports.fontStyleToString = fontStyleToString;
/**
 * Resolve rules (i.e. inheritance).
 */
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
    // Sort rules lexicographically, and then by index if necessary
    parsedThemeRules.sort((a, b) => {
        let r = (0, utils_1.strcmp)(a.scope, b.scope);
        if (r !== 0) {
            return r;
        }
        r = (0, utils_1.strArrCmp)(a.parentScopes, b.parentScopes);
        if (r !== 0) {
            return r;
        }
        return a.index - b.index;
    });
    // Determine defaults
    let defaultFontStyle = 0 /* FontStyle.None */;
    let defaultForeground = '#000000';
    let defaultBackground = '#ffffff';
    while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === '') {
        let incomingDefaults = parsedThemeRules.shift();
        if (incomingDefaults.fontStyle !== -1 /* FontStyle.NotSet */) {
            defaultFontStyle = incomingDefaults.fontStyle;
        }
        if (incomingDefaults.foreground !== null) {
            defaultForeground = incomingDefaults.foreground;
        }
        if (incomingDefaults.background !== null) {
            defaultBackground = incomingDefaults.background;
        }
    }
    let colorMap = new ColorMap(_colorMap);
    let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
    let root = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1 /* FontStyle.NotSet */, 0, 0), []);
    for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
        let rule = parsedThemeRules[i];
        root.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
    }
    return new Theme(colorMap, defaults, root);
}
class ColorMap {
    _isFrozen;
    _lastColorId;
    _id2color;
    _color2id;
    constructor(_colorMap) {
        this._lastColorId = 0;
        this._id2color = [];
        this._color2id = Object.create(null);
        if (Array.isArray(_colorMap)) {
            this._isFrozen = true;
            for (let i = 0, len = _colorMap.length; i < len; i++) {
                this._color2id[_colorMap[i]] = i;
                this._id2color[i] = _colorMap[i];
            }
        }
        else {
            this._isFrozen = false;
        }
    }
    getId(color) {
        if (color === null) {
            return 0;
        }
        color = color.toUpperCase();
        let value = this._color2id[color];
        if (value) {
            return value;
        }
        if (this._isFrozen) {
            throw new Error(`Missing color in color map - ${color}`);
        }
        value = ++this._lastColorId;
        this._color2id[color] = value;
        this._id2color[value] = color;
        return value;
    }
    getColorMap() {
        return this._id2color.slice(0);
    }
}
exports.ColorMap = ColorMap;
class ThemeTrieElementRule {
    scopeDepth;
    parentScopes;
    fontStyle;
    foreground;
    background;
    constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
        this.scopeDepth = scopeDepth;
        this.parentScopes = parentScopes;
        this.fontStyle = fontStyle;
        this.foreground = foreground;
        this.background = background;
    }
    clone() {
        return new ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
    }
    static cloneArr(arr) {
        let r = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            r[i] = arr[i].clone();
        }
        return r;
    }
    acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
        if (this.scopeDepth > scopeDepth) {
            console.log('how did this happen?');
        }
        else {
            this.scopeDepth = scopeDepth;
        }
        // console.log('TODO -> my depth: ' + this.scopeDepth + ', overwriting depth: ' + scopeDepth);
        if (fontStyle !== -1 /* FontStyle.NotSet */) {
            this.fontStyle = fontStyle;
        }
        if (foreground !== 0) {
            this.foreground = foreground;
        }
        if (background !== 0) {
            this.background = background;
        }
    }
}
exports.ThemeTrieElementRule = ThemeTrieElementRule;
class ThemeTrieElement {
    _mainRule;
    _children;
    _rulesWithParentScopes;
    constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
        this._mainRule = _mainRule;
        this._children = _children;
        this._rulesWithParentScopes = rulesWithParentScopes;
    }
    static _sortBySpecificity(arr) {
        if (arr.length === 1) {
            return arr;
        }
        arr.sort(this._cmpBySpecificity);
        return arr;
    }
    static _cmpBySpecificity(a, b) {
        if (a.scopeDepth === b.scopeDepth) {
            const aParentScopes = a.parentScopes;
            const bParentScopes = b.parentScopes;
            let aParentScopesLen = aParentScopes === null ? 0 : aParentScopes.length;
            let bParentScopesLen = bParentScopes === null ? 0 : bParentScopes.length;
            if (aParentScopesLen === bParentScopesLen) {
                for (let i = 0; i < aParentScopesLen; i++) {
                    const aLen = aParentScopes[i].length;
                    const bLen = bParentScopes[i].length;
                    if (aLen !== bLen) {
                        return bLen - aLen;
                    }
                }
            }
            return bParentScopesLen - aParentScopesLen;
        }
        return b.scopeDepth - a.scopeDepth;
    }
    match(scope) {
        if (scope === '') {
            return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }
        let dotIndex = scope.indexOf('.');
        let head;
        let tail;
        if (dotIndex === -1) {
            head = scope;
            tail = '';
        }
        else {
            head = scope.substring(0, dotIndex);
            tail = scope.substring(dotIndex + 1);
        }
        if (this._children.hasOwnProperty(head)) {
            return this._children[head].match(tail);
        }
        return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
    }
    insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
        if (scope === '') {
            this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
            return;
        }
        let dotIndex = scope.indexOf('.');
        let head;
        let tail;
        if (dotIndex === -1) {
            head = scope;
            tail = '';
        }
        else {
            head = scope.substring(0, dotIndex);
            tail = scope.substring(dotIndex + 1);
        }
        let child;
        if (this._children.hasOwnProperty(head)) {
            child = this._children[head];
        }
        else {
            child = new ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
            this._children[head] = child;
        }
        child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
    }
    _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
        if (parentScopes === null) {
            // Merge into the main rule
            this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
            return;
        }
        // Try to merge into existing rule
        for (let i = 0, len = this._rulesWithParentScopes.length; i < len; i++) {
            let rule = this._rulesWithParentScopes[i];
            if ((0, utils_1.strArrCmp)(rule.parentScopes, parentScopes) === 0) {
                // bingo! => we get to merge this into an existing one
                rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
                return;
            }
        }
        // Must add a new rule
        // Inherit from main rule
        if (fontStyle === -1 /* FontStyle.NotSet */) {
            fontStyle = this._mainRule.fontStyle;
        }
        if (foreground === 0) {
            foreground = this._mainRule.foreground;
        }
        if (background === 0) {
            background = this._mainRule.background;
        }
        this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
    }
}
exports.ThemeTrieElement = ThemeTrieElement;

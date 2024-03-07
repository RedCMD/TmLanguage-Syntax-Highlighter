"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOptionalTokenType = exports.EncodedTokenAttributes = void 0;
var EncodedTokenAttributes;
(function (EncodedTokenAttributes) {
    function toBinaryStr(encodedTokenAttributes) {
        return encodedTokenAttributes.toString(2).padStart(32, "0");
    }
    EncodedTokenAttributes.toBinaryStr = toBinaryStr;
    function print(encodedTokenAttributes) {
        const languageId = EncodedTokenAttributes.getLanguageId(encodedTokenAttributes);
        const tokenType = EncodedTokenAttributes.getTokenType(encodedTokenAttributes);
        const fontStyle = EncodedTokenAttributes.getFontStyle(encodedTokenAttributes);
        const foreground = EncodedTokenAttributes.getForeground(encodedTokenAttributes);
        const background = EncodedTokenAttributes.getBackground(encodedTokenAttributes);
        console.log({
            languageId: languageId,
            tokenType: tokenType,
            fontStyle: fontStyle,
            foreground: foreground,
            background: background,
        });
    }
    EncodedTokenAttributes.print = print;
    function getLanguageId(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 255 /* EncodedTokenDataConsts.LANGUAGEID_MASK */) >>>
            0 /* EncodedTokenDataConsts.LANGUAGEID_OFFSET */);
    }
    EncodedTokenAttributes.getLanguageId = getLanguageId;
    function getTokenType(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 768 /* EncodedTokenDataConsts.TOKEN_TYPE_MASK */) >>>
            8 /* EncodedTokenDataConsts.TOKEN_TYPE_OFFSET */);
    }
    EncodedTokenAttributes.getTokenType = getTokenType;
    function containsBalancedBrackets(encodedTokenAttributes) {
        return (encodedTokenAttributes & 1024 /* EncodedTokenDataConsts.BALANCED_BRACKETS_MASK */) !== 0;
    }
    EncodedTokenAttributes.containsBalancedBrackets = containsBalancedBrackets;
    function getFontStyle(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 30720 /* EncodedTokenDataConsts.FONT_STYLE_MASK */) >>>
            11 /* EncodedTokenDataConsts.FONT_STYLE_OFFSET */);
    }
    EncodedTokenAttributes.getFontStyle = getFontStyle;
    function getForeground(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 16744448 /* EncodedTokenDataConsts.FOREGROUND_MASK */) >>>
            15 /* EncodedTokenDataConsts.FOREGROUND_OFFSET */);
    }
    EncodedTokenAttributes.getForeground = getForeground;
    function getBackground(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 4278190080 /* EncodedTokenDataConsts.BACKGROUND_MASK */) >>>
            24 /* EncodedTokenDataConsts.BACKGROUND_OFFSET */);
    }
    EncodedTokenAttributes.getBackground = getBackground;
    /**
     * Updates the fields in `metadata`.
     * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
     */
    function set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
        let _languageId = EncodedTokenAttributes.getLanguageId(encodedTokenAttributes);
        let _tokenType = EncodedTokenAttributes.getTokenType(encodedTokenAttributes);
        let _containsBalancedBracketsBit = EncodedTokenAttributes.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
        let _fontStyle = EncodedTokenAttributes.getFontStyle(encodedTokenAttributes);
        let _foreground = EncodedTokenAttributes.getForeground(encodedTokenAttributes);
        let _background = EncodedTokenAttributes.getBackground(encodedTokenAttributes);
        if (languageId !== 0) {
            _languageId = languageId;
        }
        if (tokenType !== 8 /* OptionalStandardTokenType.NotSet */) {
            _tokenType = fromOptionalTokenType(tokenType);
        }
        if (containsBalancedBrackets !== null) {
            _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
        }
        if (fontStyle !== -1 /* FontStyle.NotSet */) {
            _fontStyle = fontStyle;
        }
        if (foreground !== 0) {
            _foreground = foreground;
        }
        if (background !== 0) {
            _background = background;
        }
        return (((_languageId << 0 /* EncodedTokenDataConsts.LANGUAGEID_OFFSET */) |
            (_tokenType << 8 /* EncodedTokenDataConsts.TOKEN_TYPE_OFFSET */) |
            (_containsBalancedBracketsBit <<
                10 /* EncodedTokenDataConsts.BALANCED_BRACKETS_OFFSET */) |
            (_fontStyle << 11 /* EncodedTokenDataConsts.FONT_STYLE_OFFSET */) |
            (_foreground << 15 /* EncodedTokenDataConsts.FOREGROUND_OFFSET */) |
            (_background << 24 /* EncodedTokenDataConsts.BACKGROUND_OFFSET */)) >>>
            0);
    }
    EncodedTokenAttributes.set = set;
})(EncodedTokenAttributes || (exports.EncodedTokenAttributes = EncodedTokenAttributes = {}));
function toOptionalTokenType(standardType) {
    return standardType;
}
exports.toOptionalTokenType = toOptionalTokenType;
function fromOptionalTokenType(standardType) {
    return standardType;
}

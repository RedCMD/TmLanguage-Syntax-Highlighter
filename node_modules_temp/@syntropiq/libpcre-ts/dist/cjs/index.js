"use strict";
// TypeScript implementation for the PCRE convenience class
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCRE = void 0;
const libpcre_npm_js_1 = __importDefault(require("./libpcre-npm.js"));
class PCRE {
    constructor() {
        this.module = null;
    }
    /**
     * Initialize the PCRE module
     * @returns Promise that resolves when the module is ready
     */
    async init() {
        const result = await (0, libpcre_npm_js_1.default)();
        this.module = result;
    }
    /**
     * Create a new regex pattern
     * @param pattern The regex pattern string
     * @param options PCRE options flags
     * @returns A new PCRERegex instance
     */
    compile(pattern, options = 0) {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return new this.module.PCRERegex(pattern, options);
    }
    /**
     * Quick test if a pattern matches a string
     * @param pattern The regex pattern
     * @param subject The string to test
     * @param options PCRE options flags
     * @returns true if the pattern matches
     */
    test(pattern, subject, options = 0) {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return this.module.quickTest(pattern, subject, options);
    }
    /**
     * Quick match execution
     * @param pattern The regex pattern
     * @param subject The string to match
     * @param options PCRE options flags
     * @returns Array of matches or null
     */
    match(pattern, subject, options = 0) {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return this.module.quickMatch(pattern, subject, options);
    }
    /**
     * Get PCRE version information
     * @returns Version number
     */
    getVersion() {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return this.module.getVersion();
    }
    /**
     * Get PCRE version string
     * @returns Version string
     */
    getVersionString() {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return this.module.getVersionString();
    }
    /**
     * Get PCRE configuration information
     * @returns Configuration object
     */
    getConfig() {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return this.module.getConfigInfo();
    }
    /**
     * Access to all PCRE constants
     */
    get constants() {
        if (!this.module)
            throw new Error('PCRE module not initialized. Call init() first.');
        return {
            // Options
            CASELESS: this.module.PCRE_CASELESS,
            MULTILINE: this.module.PCRE_MULTILINE,
            DOTALL: this.module.PCRE_DOTALL,
            EXTENDED: this.module.PCRE_EXTENDED,
            ANCHORED: this.module.PCRE_ANCHORED,
            DOLLAR_ENDONLY: this.module.PCRE_DOLLAR_ENDONLY,
            EXTRA: this.module.PCRE_EXTRA,
            NOTBOL: this.module.PCRE_NOTBOL,
            NOTEOL: this.module.PCRE_NOTEOL,
            UNGREEDY: this.module.PCRE_UNGREEDY,
            NOTEMPTY: this.module.PCRE_NOTEMPTY,
            UTF8: this.module.PCRE_UTF8,
            UTF16: this.module.PCRE_UTF16,
            UTF32: this.module.PCRE_UTF32,
            NO_AUTO_CAPTURE: this.module.PCRE_NO_AUTO_CAPTURE,
            NO_UTF8_CHECK: this.module.PCRE_NO_UTF8_CHECK,
            NO_UTF16_CHECK: this.module.PCRE_NO_UTF16_CHECK,
            NO_UTF32_CHECK: this.module.PCRE_NO_UTF32_CHECK,
            AUTO_CALLOUT: this.module.PCRE_AUTO_CALLOUT,
            PARTIAL_SOFT: this.module.PCRE_PARTIAL_SOFT,
            PARTIAL: this.module.PCRE_PARTIAL,
            NEVER_UTF: this.module.PCRE_NEVER_UTF,
            DFA_SHORTEST: this.module.PCRE_DFA_SHORTEST,
            NO_AUTO_POSSESS: this.module.PCRE_NO_AUTO_POSSESS,
            DFA_RESTART: this.module.PCRE_DFA_RESTART,
            FIRSTLINE: this.module.PCRE_FIRSTLINE,
            DUPNAMES: this.module.PCRE_DUPNAMES,
            NEWLINE_CR: this.module.PCRE_NEWLINE_CR,
            NEWLINE_LF: this.module.PCRE_NEWLINE_LF,
            NEWLINE_CRLF: this.module.PCRE_NEWLINE_CRLF,
            NEWLINE_ANY: this.module.PCRE_NEWLINE_ANY,
            NEWLINE_ANYCRLF: this.module.PCRE_NEWLINE_ANYCRLF,
            BSR_ANYCRLF: this.module.PCRE_BSR_ANYCRLF,
            BSR_UNICODE: this.module.PCRE_BSR_UNICODE,
            JAVASCRIPT_COMPAT: this.module.PCRE_JAVASCRIPT_COMPAT,
            NO_START_OPTIMIZE: this.module.PCRE_NO_START_OPTIMIZE,
            NO_START_OPTIMISE: this.module.PCRE_NO_START_OPTIMISE,
            PARTIAL_HARD: this.module.PCRE_PARTIAL_HARD,
            NOTEMPTY_ATSTART: this.module.PCRE_NOTEMPTY_ATSTART,
            UCP: this.module.PCRE_UCP,
            // Errors
            ERROR_NOMATCH: this.module.PCRE_ERROR_NOMATCH,
            ERROR_NULL: this.module.PCRE_ERROR_NULL,
            ERROR_BADOPTION: this.module.PCRE_ERROR_BADOPTION,
            ERROR_BADMAGIC: this.module.PCRE_ERROR_BADMAGIC,
            ERROR_UNKNOWN_OPCODE: this.module.PCRE_ERROR_UNKNOWN_OPCODE,
            ERROR_UNKNOWN_NODE: this.module.PCRE_ERROR_UNKNOWN_NODE,
            ERROR_NOMEMORY: this.module.PCRE_ERROR_NOMEMORY,
            ERROR_NOSUBSTRING: this.module.PCRE_ERROR_NOSUBSTRING,
            ERROR_MATCHLIMIT: this.module.PCRE_ERROR_MATCHLIMIT,
            ERROR_CALLOUT: this.module.PCRE_ERROR_CALLOUT,
            ERROR_BADUTF8: this.module.PCRE_ERROR_BADUTF8,
            ERROR_BADUTF16: this.module.PCRE_ERROR_BADUTF16,
            ERROR_BADUTF32: this.module.PCRE_ERROR_BADUTF32,
            ERROR_BADUTF8_OFFSET: this.module.PCRE_ERROR_BADUTF8_OFFSET,
            ERROR_BADUTF16_OFFSET: this.module.PCRE_ERROR_BADUTF16_OFFSET,
            ERROR_PARTIAL: this.module.PCRE_ERROR_PARTIAL,
            ERROR_BADPARTIAL: this.module.PCRE_ERROR_BADPARTIAL,
            ERROR_INTERNAL: this.module.PCRE_ERROR_INTERNAL,
            ERROR_BADCOUNT: this.module.PCRE_ERROR_BADCOUNT,
            ERROR_DFA_UITEM: this.module.PCRE_ERROR_DFA_UITEM,
            ERROR_DFA_UCOND: this.module.PCRE_ERROR_DFA_UCOND,
            ERROR_DFA_UMLIMIT: this.module.PCRE_ERROR_DFA_UMLIMIT,
            ERROR_DFA_WSSIZE: this.module.PCRE_ERROR_DFA_WSSIZE,
            ERROR_DFA_RECURSE: this.module.PCRE_ERROR_DFA_RECURSE,
            ERROR_RECURSIONLIMIT: this.module.PCRE_ERROR_RECURSIONLIMIT,
            ERROR_NULLWSLIMIT: this.module.PCRE_ERROR_NULLWSLIMIT,
            ERROR_BADNEWLINE: this.module.PCRE_ERROR_BADNEWLINE,
            ERROR_BADOFFSET: this.module.PCRE_ERROR_BADOFFSET,
            ERROR_SHORTUTF8: this.module.PCRE_ERROR_SHORTUTF8,
            ERROR_SHORTUTF16: this.module.PCRE_ERROR_SHORTUTF16,
            ERROR_RECURSELOOP: this.module.PCRE_ERROR_RECURSELOOP,
            ERROR_JIT_STACKLIMIT: this.module.PCRE_ERROR_JIT_STACKLIMIT,
            ERROR_BADMODE: this.module.PCRE_ERROR_BADMODE,
            ERROR_BADENDIANNESS: this.module.PCRE_ERROR_BADENDIANNESS,
            ERROR_DFA_BADRESTART: this.module.PCRE_ERROR_DFA_BADRESTART,
            ERROR_JIT_BADOPTION: this.module.PCRE_ERROR_JIT_BADOPTION,
            ERROR_BADLENGTH: this.module.PCRE_ERROR_BADLENGTH,
            ERROR_UNSET: this.module.PCRE_ERROR_UNSET,
        };
    }
}
exports.PCRE = PCRE;
// Export the module creation function as default
exports.default = libpcre_npm_js_1.default;

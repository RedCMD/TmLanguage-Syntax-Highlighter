import createPCREModule from './libpcre-npm.js';
export interface PCREMatch {
    value: string;
    index: number;
    length: number;
}
export interface PCREConfig {
    utf8: boolean;
    unicodeProperties: boolean;
    jit: boolean;
    newline: number;
    linkSize: number;
    matchLimit: number;
}
export interface PCREConstants {
    CASELESS: number;
    MULTILINE: number;
    DOTALL: number;
    EXTENDED: number;
    ANCHORED: number;
    DOLLAR_ENDONLY: number;
    EXTRA: number;
    NOTBOL: number;
    NOTEOL: number;
    UNGREEDY: number;
    NOTEMPTY: number;
    UTF8: number;
    UTF16: number;
    UTF32: number;
    NO_AUTO_CAPTURE: number;
    NO_UTF8_CHECK: number;
    NO_UTF16_CHECK: number;
    NO_UTF32_CHECK: number;
    AUTO_CALLOUT: number;
    PARTIAL_SOFT: number;
    PARTIAL: number;
    NEVER_UTF: number;
    DFA_SHORTEST: number;
    NO_AUTO_POSSESS: number;
    DFA_RESTART: number;
    FIRSTLINE: number;
    DUPNAMES: number;
    NEWLINE_CR: number;
    NEWLINE_LF: number;
    NEWLINE_CRLF: number;
    NEWLINE_ANY: number;
    NEWLINE_ANYCRLF: number;
    BSR_ANYCRLF: number;
    BSR_UNICODE: number;
    JAVASCRIPT_COMPAT: number;
    NO_START_OPTIMIZE: number;
    NO_START_OPTIMISE: number;
    PARTIAL_HARD: number;
    NOTEMPTY_ATSTART: number;
    UCP: number;
    ERROR_NOMATCH: number;
    ERROR_NULL: number;
    ERROR_BADOPTION: number;
    ERROR_BADMAGIC: number;
    ERROR_UNKNOWN_OPCODE: number;
    ERROR_UNKNOWN_NODE: number;
    ERROR_NOMEMORY: number;
    ERROR_NOSUBSTRING: number;
    ERROR_MATCHLIMIT: number;
    ERROR_CALLOUT: number;
    ERROR_BADUTF8: number;
    ERROR_BADUTF16: number;
    ERROR_BADUTF32: number;
    ERROR_BADUTF8_OFFSET: number;
    ERROR_BADUTF16_OFFSET: number;
    ERROR_PARTIAL: number;
    ERROR_BADPARTIAL: number;
    ERROR_INTERNAL: number;
    ERROR_BADCOUNT: number;
    ERROR_DFA_UITEM: number;
    ERROR_DFA_UCOND: number;
    ERROR_DFA_UMLIMIT: number;
    ERROR_DFA_WSSIZE: number;
    ERROR_DFA_RECURSE: number;
    ERROR_RECURSIONLIMIT: number;
    ERROR_NULLWSLIMIT: number;
    ERROR_BADNEWLINE: number;
    ERROR_BADOFFSET: number;
    ERROR_SHORTUTF8: number;
    ERROR_SHORTUTF16: number;
    ERROR_RECURSELOOP: number;
    ERROR_JIT_STACKLIMIT: number;
    ERROR_BADMODE: number;
    ERROR_BADENDIANNESS: number;
    ERROR_DFA_BADRESTART: number;
    ERROR_JIT_BADOPTION: number;
    ERROR_BADLENGTH: number;
    ERROR_UNSET: number;
}
export interface PCRERegex {
    test(subject: string, startOffset?: number): boolean;
    exec(subject: string, startOffset?: number): PCREMatch[] | null;
    getNamedGroups(): {
        [name: string]: number;
    };
    globalMatch(subject: string): PCREMatch[][];
    replace(subject: string, replacement: string, global?: boolean): string;
    getPattern(): string;
    getOptions(): number;
}
export declare class PCRE {
    private module;
    /**
     * Initialize the PCRE module
     * @returns Promise that resolves when the module is ready
     */
    init(): Promise<void>;
    /**
     * Create a new regex pattern
     * @param pattern The regex pattern string
     * @param options PCRE options flags
     * @returns A new PCRERegex instance
     */
    compile(pattern: string, options?: number): PCRERegex;
    /**
     * Quick test if a pattern matches a string
     * @param pattern The regex pattern
     * @param subject The string to test
     * @param options PCRE options flags
     * @returns true if the pattern matches
     */
    test(pattern: string, subject: string, options?: number): boolean;
    /**
     * Quick match execution
     * @param pattern The regex pattern
     * @param subject The string to match
     * @param options PCRE options flags
     * @returns Array of matches or null
     */
    match(pattern: string, subject: string, options?: number): PCREMatch[] | null;
    /**
     * Get PCRE version information
     * @returns Version number
     */
    getVersion(): number;
    /**
     * Get PCRE version string
     * @returns Version string
     */
    getVersionString(): string;
    /**
     * Get PCRE configuration information
     * @returns Configuration object
     */
    getConfig(): PCREConfig;
    /**
     * Access to all PCRE constants
     */
    get constants(): PCREConstants;
}
export default createPCREModule;

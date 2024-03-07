"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = void 0;
function doFail(streamState, msg) {
    // console.log('Near offset ' + streamState.pos + ': ' + msg + ' ~~~' + streamState.source.substr(streamState.pos, 50) + '~~~');
    throw new Error('Near offset ' + streamState.pos + ': ' + msg + ' ~~~' + streamState.source.substr(streamState.pos, 50) + '~~~');
}
function parseJSON(source, filename, withMetadata) {
    let streamState = new JSONStreamState(source);
    let token = new JSONToken();
    let state = 0 /* JSONState.ROOT_STATE */;
    let cur = null;
    let stateStack = [];
    let objStack = [];
    function pushState() {
        stateStack.push(state);
        objStack.push(cur);
    }
    function popState() {
        state = stateStack.pop();
        cur = objStack.pop();
    }
    function fail(msg) {
        doFail(streamState, msg);
    }
    while (nextJSONToken(streamState, token)) {
        if (state === 0 /* JSONState.ROOT_STATE */) {
            if (cur !== null) {
                fail('too many constructs in root');
            }
            if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                cur = {};
                if (withMetadata) {
                    cur.$vscodeTextmateLocation = token.toLocation(filename);
                }
                pushState();
                state = 1 /* JSONState.DICT_STATE */;
                continue;
            }
            if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                cur = [];
                pushState();
                state = 4 /* JSONState.ARR_STATE */;
                continue;
            }
            fail('unexpected token in root');
        }
        if (state === 2 /* JSONState.DICT_STATE_COMMA */) {
            if (token.type === 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 7 /* JSONTokenType.COMMA */) {
                state = 3 /* JSONState.DICT_STATE_NO_CLOSE */;
                continue;
            }
            fail('expected , or }');
        }
        if (state === 1 /* JSONState.DICT_STATE */ || state === 3 /* JSONState.DICT_STATE_NO_CLOSE */) {
            if (state === 1 /* JSONState.DICT_STATE */ && token.type === 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 1 /* JSONTokenType.STRING */) {
                let keyValue = token.value;
                if (!nextJSONToken(streamState, token) || /*TS bug*/ token.type !== 6 /* JSONTokenType.COLON */) {
                    fail('expected colon');
                }
                if (!nextJSONToken(streamState, token)) {
                    fail('expected value');
                }
                state = 2 /* JSONState.DICT_STATE_COMMA */;
                if (token.type === 1 /* JSONTokenType.STRING */) {
                    cur[keyValue] = token.value;
                    continue;
                }
                if (token.type === 8 /* JSONTokenType.NULL */) {
                    cur[keyValue] = null;
                    continue;
                }
                if (token.type === 9 /* JSONTokenType.TRUE */) {
                    cur[keyValue] = true;
                    continue;
                }
                if (token.type === 10 /* JSONTokenType.FALSE */) {
                    cur[keyValue] = false;
                    continue;
                }
                if (token.type === 11 /* JSONTokenType.NUMBER */) {
                    cur[keyValue] = parseFloat(token.value);
                    continue;
                }
                if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                    let newArr = [];
                    cur[keyValue] = newArr;
                    pushState();
                    state = 4 /* JSONState.ARR_STATE */;
                    cur = newArr;
                    continue;
                }
                if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                    let newDict = {};
                    if (withMetadata) {
                        newDict.$vscodeTextmateLocation = token.toLocation(filename);
                    }
                    cur[keyValue] = newDict;
                    pushState();
                    state = 1 /* JSONState.DICT_STATE */;
                    cur = newDict;
                    continue;
                }
            }
            fail('unexpected token in dict');
        }
        if (state === 5 /* JSONState.ARR_STATE_COMMA */) {
            if (token.type === 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 7 /* JSONTokenType.COMMA */) {
                state = 6 /* JSONState.ARR_STATE_NO_CLOSE */;
                continue;
            }
            fail('expected , or ]');
        }
        if (state === 4 /* JSONState.ARR_STATE */ || state === 6 /* JSONState.ARR_STATE_NO_CLOSE */) {
            if (state === 4 /* JSONState.ARR_STATE */ && token.type === 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */) {
                popState();
                continue;
            }
            state = 5 /* JSONState.ARR_STATE_COMMA */;
            if (token.type === 1 /* JSONTokenType.STRING */) {
                cur.push(token.value);
                continue;
            }
            if (token.type === 8 /* JSONTokenType.NULL */) {
                cur.push(null);
                continue;
            }
            if (token.type === 9 /* JSONTokenType.TRUE */) {
                cur.push(true);
                continue;
            }
            if (token.type === 10 /* JSONTokenType.FALSE */) {
                cur.push(false);
                continue;
            }
            if (token.type === 11 /* JSONTokenType.NUMBER */) {
                cur.push(parseFloat(token.value));
                continue;
            }
            if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                let newArr = [];
                cur.push(newArr);
                pushState();
                state = 4 /* JSONState.ARR_STATE */;
                cur = newArr;
                continue;
            }
            if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                let newDict = {};
                if (withMetadata) {
                    newDict.$vscodeTextmateLocation = token.toLocation(filename);
                }
                cur.push(newDict);
                pushState();
                state = 1 /* JSONState.DICT_STATE */;
                cur = newDict;
                continue;
            }
            fail('unexpected token in array');
        }
        fail('unknown state');
    }
    if (objStack.length !== 0) {
        fail('unclosed constructs');
    }
    return cur;
}
exports.parseJSON = parseJSON;
class JSONStreamState {
    source;
    pos;
    len;
    line;
    char;
    constructor(source) {
        this.source = source;
        this.pos = 0;
        this.len = source.length;
        this.line = 1;
        this.char = 0;
    }
}
class JSONToken {
    value;
    type;
    offset;
    len;
    line; /* 1 based line number */
    char;
    constructor() {
        this.value = null;
        this.type = 0 /* JSONTokenType.UNKNOWN */;
        this.offset = -1;
        this.len = -1;
        this.line = -1;
        this.char = -1;
    }
    toLocation(filename) {
        return {
            filename: filename,
            line: this.line,
            char: this.char
        };
    }
}
/**
 * precondition: the string is known to be valid JSON (https://www.ietf.org/rfc/rfc4627.txt)
 */
function nextJSONToken(_state, _out) {
    _out.value = null;
    _out.type = 0 /* JSONTokenType.UNKNOWN */;
    _out.offset = -1;
    _out.len = -1;
    _out.line = -1;
    _out.char = -1;
    let source = _state.source;
    let pos = _state.pos;
    let len = _state.len;
    let line = _state.line;
    let char = _state.char;
    //------------------------ skip whitespace
    let chCode;
    do {
        if (pos >= len) {
            return false; /*EOS*/
        }
        chCode = source.charCodeAt(pos);
        if (chCode === 32 /* ChCode.SPACE */ || chCode === 9 /* ChCode.HORIZONTAL_TAB */ || chCode === 13 /* ChCode.CARRIAGE_RETURN */) {
            // regular whitespace
            pos++;
            char++;
            continue;
        }
        if (chCode === 10 /* ChCode.LINE_FEED */) {
            // newline
            pos++;
            line++;
            char = 0;
            continue;
        }
        // not whitespace
        break;
    } while (true);
    _out.offset = pos;
    _out.line = line;
    _out.char = char;
    if (chCode === 34 /* ChCode.QUOTATION_MARK */) {
        //------------------------ strings
        _out.type = 1 /* JSONTokenType.STRING */;
        pos++;
        char++;
        do {
            if (pos >= len) {
                return false; /*EOS*/
            }
            chCode = source.charCodeAt(pos);
            pos++;
            char++;
            if (chCode === 92 /* ChCode.BACKSLASH */) {
                // skip next char
                pos++;
                char++;
                continue;
            }
            if (chCode === 34 /* ChCode.QUOTATION_MARK */) {
                // end of the string
                break;
            }
        } while (true);
        _out.value = source.substring(_out.offset + 1, pos - 1).replace(/\\u([0-9A-Fa-f]{4})/g, (_, m0) => {
            return String.fromCodePoint(parseInt(m0, 16));
        }).replace(/\\(.)/g, (_, m0) => {
            switch (m0) {
                case '"': return '"';
                case '\\': return '\\';
                case '/': return '/';
                case 'b': return '\b';
                case 'f': return '\f';
                case 'n': return '\n';
                case 'r': return '\r';
                case 't': return '\t';
                default: doFail(_state, 'invalid escape sequence');
            }
            throw new Error('unreachable');
        });
    }
    else if (chCode === 91 /* ChCode.LEFT_SQUARE_BRACKET */) {
        _out.type = 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 123 /* ChCode.LEFT_CURLY_BRACKET */) {
        _out.type = 3 /* JSONTokenType.LEFT_CURLY_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 93 /* ChCode.RIGHT_SQUARE_BRACKET */) {
        _out.type = 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 125 /* ChCode.RIGHT_CURLY_BRACKET */) {
        _out.type = 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 58 /* ChCode.COLON */) {
        _out.type = 6 /* JSONTokenType.COLON */;
        pos++;
        char++;
    }
    else if (chCode === 44 /* ChCode.COMMA */) {
        _out.type = 7 /* JSONTokenType.COMMA */;
        pos++;
        char++;
    }
    else if (chCode === 110 /* ChCode.n */) {
        //------------------------ null
        _out.type = 8 /* JSONTokenType.NULL */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 117 /* ChCode.u */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else if (chCode === 116 /* ChCode.t */) {
        //------------------------ true
        _out.type = 9 /* JSONTokenType.TRUE */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 114 /* ChCode.r */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 117 /* ChCode.u */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 101 /* ChCode.e */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else if (chCode === 102 /* ChCode.f */) {
        //------------------------ false
        _out.type = 10 /* JSONTokenType.FALSE */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 97 /* ChCode.a */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 115 /* ChCode.s */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 101 /* ChCode.e */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else {
        //------------------------ numbers
        _out.type = 11 /* JSONTokenType.NUMBER */;
        do {
            if (pos >= len) {
                return false; /*EOS*/
            }
            chCode = source.charCodeAt(pos);
            if (chCode === 46 /* ChCode.DOT */
                || (chCode >= 48 /* ChCode.D0 */ && chCode <= 57 /* ChCode.D9 */)
                || (chCode === 101 /* ChCode.e */ || chCode === 69 /* ChCode.E */)
                || (chCode === 45 /* ChCode.MINUS */ || chCode === 43 /* ChCode.PLUS */)) {
                // looks like a piece of a number
                pos++;
                char++;
                continue;
            }
            // pos--; char--;
            break;
        } while (true);
    }
    _out.len = pos - _out.offset;
    if (_out.value === null) {
        _out.value = source.substr(_out.offset, _out.len);
    }
    _state.pos = pos;
    _state.line = line;
    _state.char = char;
    // console.log('PRODUCING TOKEN: ', _out.value, JSONTokenType[_out.type]);
    return true;
}

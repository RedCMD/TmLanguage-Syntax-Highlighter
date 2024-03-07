"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawGrammar = void 0;
const plist = require("./plist");
const debug_1 = require("./debug");
const json_1 = require("./json");
function parseRawGrammar(content, filePath = null) {
    if (filePath !== null && /\.json$/.test(filePath)) {
        return parseJSONGrammar(content, filePath);
    }
    return parsePLISTGrammar(content, filePath);
}
exports.parseRawGrammar = parseRawGrammar;
function parseJSONGrammar(contents, filename) {
    if (debug_1.DebugFlags.InDebugMode) {
        return (0, json_1.parseJSON)(contents, filename, true);
    }
    return JSON.parse(contents);
}
function parsePLISTGrammar(contents, filename) {
    if (debug_1.DebugFlags.InDebugMode) {
        return plist.parseWithLocation(contents, filename, '$vscodeTextmateLocation');
    }
    return plist.parsePLIST(contents);
}

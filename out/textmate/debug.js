"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseOnigurumaFindOptions = exports.DebugFlags = void 0;
exports.DebugFlags = {
    InDebugMode: (typeof process !== 'undefined' && !!process.env['VSCODE_TEXTMATE_DEBUG'])
};
exports.UseOnigurumaFindOptions = false;

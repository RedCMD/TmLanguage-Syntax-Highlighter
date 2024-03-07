"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.disposeOnigString = void 0;
function disposeOnigString(str) {
    if (typeof str.dispose === 'function') {
        str.dispose();
    }
}
exports.disposeOnigString = disposeOnigString;

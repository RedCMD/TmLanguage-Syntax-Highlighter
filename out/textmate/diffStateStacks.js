"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyStateStackDiff = exports.diffStateStacksRefEq = void 0;
const grammar_1 = require("./grammar");
function diffStateStacksRefEq(first, second) {
    let pops = 0;
    const newFrames = [];
    let curFirst = first;
    let curSecond = second;
    while (curFirst !== curSecond) {
        if (curFirst && (!curSecond || curFirst.depth >= curSecond.depth)) {
            // curFirst is certainly not contained in curSecond
            pops++;
            curFirst = curFirst.parent;
        }
        else {
            // curSecond is certainly not contained in curFirst.
            // Also, curSecond must be defined, as otherwise a previous case would match
            newFrames.push(curSecond.toStateStackFrame());
            curSecond = curSecond.parent;
        }
    }
    return {
        pops,
        newFrames: newFrames.reverse(),
    };
}
exports.diffStateStacksRefEq = diffStateStacksRefEq;
function applyStateStackDiff(stack, diff) {
    let curStack = stack;
    for (let i = 0; i < diff.pops; i++) {
        curStack = curStack.parent;
    }
    for (const frame of diff.newFrames) {
        curStack = grammar_1.StateStackImpl.pushFrame(curStack, frame);
    }
    return curStack;
}
exports.applyStateStackDiff = applyStateStackDiff;

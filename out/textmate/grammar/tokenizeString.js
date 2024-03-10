"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStackElement = exports._tokenizeString = void 0;
const debug_1 = require("../debug");
const onigLib_1 = require("../onigLib");
const rule_1 = require("../rule");
const utils_1 = require("../utils");
class TokenizeStringResult {
    stack;
    stoppedEarly;
    constructor(stack, stoppedEarly) {
        this.stack = stack;
        this.stoppedEarly = stoppedEarly;
    }
}
/**
 * Tokenize a string
 * @param grammar
 * @param lineText
 * @param isFirstLine
 * @param linePos
 * @param stack
 * @param lineTokens
 * @param checkWhileConditions
 * @param timeLimit Use `0` to indicate no time limit
 * @returns the StackElement or StackElement.TIME_LIMIT_REACHED if the time limit has been reached
 */
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
    const lineLength = lineText.content.length;
    let STOP = false;
    let anchorPosition = -1;
    if (checkWhileConditions) {
        const whileCheckResult = _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens);
        stack = whileCheckResult.stack;
        linePos = whileCheckResult.linePos;
        isFirstLine = whileCheckResult.isFirstLine;
        anchorPosition = whileCheckResult.anchorPosition;
    }
    const startTime = Date.now();
    while (!STOP) {
        if (timeLimit !== 0) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > timeLimit) {
                return new TokenizeStringResult(stack, true);
            }
        }
        scanNext(); // potentially modifies linePos && anchorPosition
    }
    return new TokenizeStringResult(stack, false);
    function scanNext() {
        if (debug_1.DebugFlags.InDebugMode) {
            console.log("");
            console.log(`@@scanNext ${linePos}: |${lineText.content
                .substr(linePos)
                .replace(/\n$/, "\\n")}|`);
        }
        const r = matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
        if (!r) {
            if (debug_1.DebugFlags.InDebugMode) {
                console.log("  no more matches.");
            }
            // No match
            lineTokens.produce(stack, lineLength);
            STOP = true;
            return;
        }
        const captureIndices = r.captureIndices;
        const matchedRuleId = r.matchedRuleId;
        const hasAdvanced = captureIndices && captureIndices.length > 0
            ? captureIndices[0].end > linePos
            : false;
        if (matchedRuleId === rule_1.endRuleId) {
            // We matched the `end` for this rule => pop it
            const poppedRule = stack.getRule(grammar);
            if (debug_1.DebugFlags.InDebugMode) {
                console.log("  popping " +
                    poppedRule.debugName +
                    " - " +
                    poppedRule.debugEndRegExp);
            }
            lineTokens.produce(stack, captureIndices[0].start);
            stack = stack.withContentNameScopesList(stack.nameScopesList);
            handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, poppedRule.endCaptures, captureIndices);
            lineTokens.produce(stack, captureIndices[0].end);
            // pop
            const popped = stack;
            stack = stack.parent;
            anchorPosition = popped.getAnchorPos();
            if (!hasAdvanced && popped.getEnterPos() === linePos) {
                // Grammar pushed & popped a rule without advancing
                if (debug_1.DebugFlags.InDebugMode) {
                    console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing");
                }
                // See https://github.com/Microsoft/vscode-textmate/issues/12
                // Let's assume this was a mistake by the grammar author and the intent was to continue in this state
                stack = popped;
                lineTokens.produce(stack, lineLength);
                STOP = true;
                return;
            }
        }
        else {
            // We matched a rule!
            const _rule = grammar.getRule(matchedRuleId);
            lineTokens.produce(stack, captureIndices[0].start);
            const beforePush = stack;
            // push it on the stack rule
            const scopeName = _rule.getName(lineText.content, captureIndices);
            const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
            stack = stack.push(matchedRuleId, linePos, anchorPosition, captureIndices[0].end === lineLength, null, nameScopesList, nameScopesList);
            if (_rule instanceof rule_1.BeginEndRule) {
                const pushedRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  pushing " +
                        pushedRule.debugName +
                        " - " +
                        pushedRule.debugBeginRegExp);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                anchorPosition = captureIndices[0].end;
                const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                stack = stack.withContentNameScopesList(contentNameScopesList);
                if (pushedRule.endHasBackReferences) {
                    stack = stack.withEndRule(pushedRule.getEndWithResolvedBackReferences(lineText.content, captureIndices));
                }
                if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                    // Grammar pushed the same rule without advancing
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing");
                    }
                    stack = stack.pop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
            else if (_rule instanceof rule_1.BeginWhileRule) {
                const pushedRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  pushing " + pushedRule.debugName);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                anchorPosition = captureIndices[0].end;
                const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                stack = stack.withContentNameScopesList(contentNameScopesList);
                if (pushedRule.whileHasBackReferences) {
                    stack = stack.withEndRule(pushedRule.getWhileWithResolvedBackReferences(lineText.content, captureIndices));
                }
                if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                    // Grammar pushed the same rule without advancing
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing");
                    }
                    stack = stack.pop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
            else {
                const matchingRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  matched " +
                        matchingRule.debugName +
                        " - " +
                        matchingRule.debugMatchRegExp);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, matchingRule.captures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                // pop rule immediately since it is a MatchRule
                stack = stack.pop();
                if (!hasAdvanced) {
                    // Grammar is not advancing, nor is it pushing/popping
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping");
                    }
                    stack = stack.safePop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
        }
        if (captureIndices[0].end > linePos) {
            // Advance stream
            linePos = captureIndices[0].end;
            isFirstLine = false;
        }
        // @ts-ignore
        // grammar.rules.push(r);
        if (r) {
            // @ts-ignore
            grammar.rules.push({
                captureIndices: captureIndices,
                matchedRuleId: matchedRuleId,
                // ...r,
                // ...{
                // lineText: lineText,
                // isFirstLine: isFirstLine,
                // linePos: linePos,
                // stack: stack,
                anchorPosition: anchorPosition,
                time: performance.now(),
                // }
            });
        }
    }
}
exports._tokenizeString = _tokenizeString;
/**
 * Walk the stack from bottom to top, and check each while condition in this order.
 * If any fails, cut off the entire stack above the failed while condition. While conditions
 * may also advance the linePosition.
 */
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
    let anchorPosition = (stack.beginRuleCapturedEOL ? 0 : -1);
    const whileRules = [];
    for (let node = stack; node; node = node.pop()) {
        const nodeRule = node.getRule(grammar);
        if (nodeRule instanceof rule_1.BeginWhileRule) {
            whileRules.push({
                rule: nodeRule,
                stack: node
            });
        }
    }
    for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
        const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
        const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
        if (debug_1.DebugFlags.InDebugMode) {
            console.log('  scanning for while rule');
            console.log(ruleScanner.toString());
        }
        if (r) {
            const matchedRuleId = r.ruleId;
            if (matchedRuleId !== rule_1.whileRuleId) {
                // we shouldn't end up here
                stack = whileRule.stack.pop();
                break;
            }
            if (r.captureIndices && r.captureIndices.length) {
                lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
                handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
                lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
                anchorPosition = r.captureIndices[0].end;
                if (r.captureIndices[0].end > linePos) {
                    linePos = r.captureIndices[0].end;
                    isFirstLine = false;
                }
            }
        }
        else {
            if (debug_1.DebugFlags.InDebugMode) {
                console.log('  popping ' + whileRule.rule.debugName + ' - ' + whileRule.rule.debugWhileRegExp);
            }
            stack = whileRule.stack.pop();
            break;
        }
    }
    return { stack: stack, linePos: linePos, anchorPosition: anchorPosition, isFirstLine: isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    // Look for normal grammar rule
    const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
    // Look for injected rules
    const injections = grammar.getInjections();
    if (injections.length === 0) {
        // No injections whatsoever => early return
        return matchResult;
    }
    const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
    if (!injectionResult) {
        // No injections matched => early return
        return matchResult;
    }
    if (!matchResult) {
        // Only injections matched => early return
        return injectionResult;
    }
    // Decide if `matchResult` or `injectionResult` should win
    const matchResultScore = matchResult.captureIndices[0].start;
    const injectionResultScore = injectionResult.captureIndices[0].start;
    if (injectionResultScore < matchResultScore || (injectionResult.priorityMatch && injectionResultScore === matchResultScore)) {
        // injection won!
        return injectionResult;
    }
    return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    const rule = stack.getRule(grammar);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
    let perfStart = 0;
    if (debug_1.DebugFlags.InDebugMode) {
        perfStart = (0, utils_1.performanceNow)();
    }
    const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (debug_1.DebugFlags.InDebugMode) {
        const elapsedMillis = (0, utils_1.performanceNow)() - perfStart;
        if (elapsedMillis > 5) {
            console.warn(`Rule ${rule.debugName} (${rule.id}) matching took ${elapsedMillis} against '${lineText}'`);
        }
        console.log(`  scanning for (linePos: ${linePos}, anchorPosition: ${anchorPosition})`);
        console.log(ruleScanner.toString());
        if (r) {
            console.log(`matched rule id: ${r.ruleId} from ${r.captureIndices[0].start} to ${r.captureIndices[0].end}`);
        }
    }
    if (r) {
        return {
            captureIndices: r.captureIndices,
            matchedRuleId: r.ruleId
        };
    }
    return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    // The lower the better
    let bestMatchRating = Number.MAX_VALUE;
    let bestMatchCaptureIndices = null;
    let bestMatchRuleId;
    let bestMatchResultPriority = 0;
    const scopes = stack.contentNameScopesList.getScopeNames();
    for (let i = 0, len = injections.length; i < len; i++) {
        const injection = injections[i];
        if (!injection.matcher(scopes)) {
            // injection selector doesn't match stack
            continue;
        }
        const rule = grammar.getRule(injection.ruleId);
        const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
        const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
        if (!matchResult) {
            continue;
        }
        if (debug_1.DebugFlags.InDebugMode) {
            console.log(`  matched injection: ${injection.debugSelector}`);
            console.log(ruleScanner.toString());
        }
        const matchRating = matchResult.captureIndices[0].start;
        if (matchRating >= bestMatchRating) {
            // Injections are sorted by priority, so the previous injection had a better or equal priority
            continue;
        }
        bestMatchRating = matchRating;
        bestMatchCaptureIndices = matchResult.captureIndices;
        bestMatchRuleId = matchResult.ruleId;
        bestMatchResultPriority = injection.priority;
        if (bestMatchRating === linePos) {
            // No more need to look at the rest of the injections.
            break;
        }
    }
    if (bestMatchCaptureIndices) {
        return {
            priorityMatch: bestMatchResultPriority === -1,
            captureIndices: bestMatchCaptureIndices,
            matchedRuleId: bestMatchRuleId
        };
    }
    return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
    if (debug_1.UseOnigurumaFindOptions) {
        const ruleScanner = rule.compile(grammar, endRegexSource);
        const findOptions = getFindOptions(allowA, allowG);
        return { ruleScanner, findOptions };
    }
    const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
    return { ruleScanner, findOptions: 0 /* FindOption.None */ };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
    if (debug_1.UseOnigurumaFindOptions) {
        const ruleScanner = rule.compileWhile(grammar, endRegexSource);
        const findOptions = getFindOptions(allowA, allowG);
        return { ruleScanner, findOptions };
    }
    const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
    return { ruleScanner, findOptions: 0 /* FindOption.None */ };
}
function getFindOptions(allowA, allowG) {
    let options = 0 /* FindOption.None */;
    if (!allowA) {
        options |= 1 /* FindOption.NotBeginString */;
    }
    if (!allowG) {
        options |= 4 /* FindOption.NotBeginPosition */;
    }
    return options;
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
    if (captures.length === 0) {
        return;
    }
    const lineTextContent = lineText.content;
    const len = Math.min(captures.length, captureIndices.length);
    const localStack = [];
    const maxEnd = captureIndices[0].end;
    for (let i = 0; i < len; i++) {
        const captureRule = captures[i];
        if (captureRule === null) {
            // Not interested
            continue;
        }
        const captureIndex = captureIndices[i];
        if (captureIndex.length === 0) {
            // Nothing really captured
            continue;
        }
        if (captureIndex.start > maxEnd) {
            // Capture going beyond consumed string
            break;
        }
        // pop captures while needed
        while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
            // pop!
            lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
            localStack.pop();
        }
        if (localStack.length > 0) {
            lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
        }
        else {
            lineTokens.produce(stack, captureIndex.start);
        }
        if (captureRule.retokenizeCapturedWithRuleId) {
            // the capture requires additional matching
            const scopeName = captureRule.getName(lineTextContent, captureIndices);
            const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
            const contentName = captureRule.getContentName(lineTextContent, captureIndices);
            const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
            const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
            const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
            _tokenizeString(grammar, onigSubStr, (isFirstLine && captureIndex.start === 0), captureIndex.start, stackClone, lineTokens, false, /* no time limit */ 0);
            (0, onigLib_1.disposeOnigString)(onigSubStr);
            continue;
        }
        const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
        if (captureRuleScopeName !== null) {
            // push
            const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
            const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
            localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
        }
    }
    while (localStack.length > 0) {
        // pop!
        lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
        localStack.pop();
    }
}
class LocalStackElement {
    scopes;
    endPos;
    constructor(scopes, endPos) {
        this.scopes = scopes;
        this.endPos = endPos;
    }
}
exports.LocalStackElement = LocalStackElement;

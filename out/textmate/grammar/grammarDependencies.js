"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInclude = exports.TopLevelRepositoryReference = exports.TopLevelReference = exports.RelativeReference = exports.SelfReference = exports.BaseReference = exports.ScopeDependencyProcessor = exports.ExternalReferenceCollector = exports.TopLevelRepositoryRuleReference = exports.TopLevelRuleReference = void 0;
const utils_1 = require("../utils");
/**
 * References the top level rule of a grammar with the given scope name.
*/
class TopLevelRuleReference {
    scopeName;
    constructor(scopeName) {
        this.scopeName = scopeName;
    }
    toKey() {
        return this.scopeName;
    }
}
exports.TopLevelRuleReference = TopLevelRuleReference;
/**
 * References a rule of a grammar in the top level repository section with the given name.
*/
class TopLevelRepositoryRuleReference {
    scopeName;
    ruleName;
    constructor(scopeName, ruleName) {
        this.scopeName = scopeName;
        this.ruleName = ruleName;
    }
    toKey() {
        return `${this.scopeName}#${this.ruleName}`;
    }
}
exports.TopLevelRepositoryRuleReference = TopLevelRepositoryRuleReference;
class ExternalReferenceCollector {
    _references = [];
    _seenReferenceKeys = new Set();
    get references() {
        return this._references;
    }
    visitedRule = new Set();
    add(reference) {
        const key = reference.toKey();
        if (this._seenReferenceKeys.has(key)) {
            return;
        }
        this._seenReferenceKeys.add(key);
        this._references.push(reference);
    }
}
exports.ExternalReferenceCollector = ExternalReferenceCollector;
class ScopeDependencyProcessor {
    repo;
    initialScopeName;
    seenFullScopeRequests = new Set();
    seenPartialScopeRequests = new Set();
    Q;
    constructor(repo, initialScopeName) {
        this.repo = repo;
        this.initialScopeName = initialScopeName;
        this.seenFullScopeRequests.add(this.initialScopeName);
        this.Q = [new TopLevelRuleReference(this.initialScopeName)];
    }
    processQueue() {
        const q = this.Q;
        this.Q = [];
        const deps = new ExternalReferenceCollector();
        for (const dep of q) {
            collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
        }
        for (const dep of deps.references) {
            if (dep instanceof TopLevelRuleReference) {
                if (this.seenFullScopeRequests.has(dep.scopeName)) {
                    // already processed
                    continue;
                }
                this.seenFullScopeRequests.add(dep.scopeName);
                this.Q.push(dep);
            }
            else {
                if (this.seenFullScopeRequests.has(dep.scopeName)) {
                    // already processed in full
                    continue;
                }
                if (this.seenPartialScopeRequests.has(dep.toKey())) {
                    // already processed
                    continue;
                }
                this.seenPartialScopeRequests.add(dep.toKey());
                this.Q.push(dep);
            }
        }
    }
}
exports.ScopeDependencyProcessor = ScopeDependencyProcessor;
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
    const selfGrammar = repo.lookup(reference.scopeName);
    if (!selfGrammar) {
        if (reference.scopeName === baseGrammarScopeName) {
            throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
        }
        return;
    }
    const baseGrammar = repo.lookup(baseGrammarScopeName);
    if (reference instanceof TopLevelRuleReference) {
        collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
    }
    else {
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { baseGrammar, selfGrammar, repository: selfGrammar.repository }, result);
    }
    const injections = repo.injections(reference.scopeName);
    if (injections) {
        for (const injection of injections) {
            result.add(new TopLevelRuleReference(injection));
        }
    }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
    if (context.repository && context.repository[ruleName]) {
        const rule = context.repository[ruleName];
        collectExternalReferencesInRules([rule], context, result);
    }
}
function collectExternalReferencesInTopLevelRule(context, result) {
    if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
        collectExternalReferencesInRules(context.selfGrammar.patterns, { ...context, repository: context.selfGrammar.repository }, result);
    }
    if (context.selfGrammar.injections) {
        collectExternalReferencesInRules(Object.values(context.selfGrammar.injections), { ...context, repository: context.selfGrammar.repository }, result);
    }
}
function collectExternalReferencesInRules(rules, context, result) {
    for (const rule of rules) {
        if (result.visitedRule.has(rule)) {
            continue;
        }
        result.visitedRule.add(rule);
        const patternRepository = rule.repository ? (0, utils_1.mergeObjects)({}, context.repository, rule.repository) : context.repository;
        if (Array.isArray(rule.patterns)) {
            collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
        }
        const include = rule.include;
        if (!include) {
            continue;
        }
        const reference = parseInclude(include);
        switch (reference.kind) {
            case 0 /* IncludeReferenceKind.Base */:
                collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
                break;
            case 1 /* IncludeReferenceKind.Self */:
                collectExternalReferencesInTopLevelRule(context, result);
                break;
            case 2 /* IncludeReferenceKind.RelativeReference */:
                collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
                break;
            case 3 /* IncludeReferenceKind.TopLevelReference */:
            case 4 /* IncludeReferenceKind.TopLevelRepositoryReference */:
                const selfGrammar = reference.scopeName === context.selfGrammar.scopeName
                    ? context.selfGrammar
                    : reference.scopeName === context.baseGrammar.scopeName
                        ? context.baseGrammar
                        : undefined;
                if (selfGrammar) {
                    const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
                    if (reference.kind === 4 /* IncludeReferenceKind.TopLevelRepositoryReference */) {
                        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
                    }
                    else {
                        collectExternalReferencesInTopLevelRule(newContext, result);
                    }
                }
                else {
                    if (reference.kind === 4 /* IncludeReferenceKind.TopLevelRepositoryReference */) {
                        result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
                    }
                    else {
                        result.add(new TopLevelRuleReference(reference.scopeName));
                    }
                }
                break;
        }
    }
}
class BaseReference {
    kind = 0 /* IncludeReferenceKind.Base */;
}
exports.BaseReference = BaseReference;
class SelfReference {
    kind = 1 /* IncludeReferenceKind.Self */;
}
exports.SelfReference = SelfReference;
class RelativeReference {
    ruleName;
    kind = 2 /* IncludeReferenceKind.RelativeReference */;
    constructor(ruleName) {
        this.ruleName = ruleName;
    }
}
exports.RelativeReference = RelativeReference;
class TopLevelReference {
    scopeName;
    kind = 3 /* IncludeReferenceKind.TopLevelReference */;
    constructor(scopeName) {
        this.scopeName = scopeName;
    }
}
exports.TopLevelReference = TopLevelReference;
class TopLevelRepositoryReference {
    scopeName;
    ruleName;
    kind = 4 /* IncludeReferenceKind.TopLevelRepositoryReference */;
    constructor(scopeName, ruleName) {
        this.scopeName = scopeName;
        this.ruleName = ruleName;
    }
}
exports.TopLevelRepositoryReference = TopLevelRepositoryReference;
function parseInclude(include) {
    if (include === '$base') {
        return new BaseReference();
    }
    else if (include === '$self') {
        return new SelfReference();
    }
    const indexOfSharp = include.indexOf("#");
    if (indexOfSharp === -1) {
        return new TopLevelReference(include);
    }
    else if (indexOfSharp === 0) {
        return new RelativeReference(include.substring(1));
    }
    else {
        const scopeName = include.substring(0, indexOfSharp);
        const ruleName = include.substring(indexOfSharp + 1);
        return new TopLevelRepositoryReference(scopeName, ruleName);
    }
}
exports.parseInclude = parseInclude;

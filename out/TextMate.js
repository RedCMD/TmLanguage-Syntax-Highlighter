"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeFile = exports.tokenizeLine = exports.initTextMate = exports.whileRuleId = exports.endRuleId = void 0;
const vscode = require("vscode");
const vscodeTextmate = require("./textmate/main");
// import * as vscodeTextmate from "vscode-textmate";
const vscodeOniguruma = require("vscode-oniguruma");
const extension_1 = require("./extension");
exports.endRuleId = -1;
exports.whileRuleId = -2;
async function onigLibInterface() {
    return {
        createOnigScanner(sources) {
            return new vscodeOniguruma.OnigScanner(sources);
        },
        createOnigString(str) {
            return new vscodeOniguruma.OnigString(str);
        }
    };
}
async function loadGrammar(scopeName) {
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
        const grammars = packageJSON.contributes?.grammars;
        if (grammars) {
            for (const grammar of grammars) {
                if (grammar.scopeName == scopeName) {
                    const path = grammar.path;
                    if (path) {
                        const uri = vscode.Uri.joinPath(extension.extensionUri, path);
                        if (uri.scheme != 'untitled') {
                            const document = await vscode.workspace.openTextDocument(uri);
                            const rawGrammar = vscodeTextmate.parseRawGrammar(document.getText(), uri.path);
                            return rawGrammar;
                        }
                    }
                }
            }
        }
    }
    vscode.window.showInformationMessage(`Unknown scopeName: ${scopeName}`);
    console.log(`TextMate: Unknown scope name: ${scopeName}`);
    return null;
}
let registry;
function initTextMate(context) {
    const options = {
        onigLib: onigLibInterface(),
        loadGrammar: loadGrammar,
    };
    // Create a registry that can create a grammar from a scope name.
    registry = new vscodeTextmate.Registry(options);
}
exports.initTextMate = initTextMate;
function getScopeName(lang) {
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
        const grammars = packageJSON.contributes?.grammars;
        if (grammars) {
            for (const grammar of grammars) {
                if (grammar.language == lang) {
                    const scopeName = grammar.scopeName;
                    if (scopeName) {
                        return scopeName;
                    }
                }
            }
        }
    }
    return null;
}
async function tokenizeLine(document, lineNumber) {
    const lang = document.languageId;
    const scopeName = getScopeName(lang);
    const grammar = await registry.loadGrammar(scopeName);
    // vscode.window.showInformationMessage(JSON.stringify(grammar));
    // vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
    // const text = [
    // 	`function sayHello(name) {`,
    // 	`\treturn "Hello, " + name;`,
    // 	`}`
    // ];
    // const text = document.getText();
    let tokenLineResult;
    let ruleStack = vscodeTextmate.INITIAL;
    for (let i = 0; i <= lineNumber; i++) {
        const line = document.lineAt(i).text;
        // const line = text[i];
        // vscode.window.showInformationMessage(JSON.stringify(ruleStack));
        // const lineTokens = tokenizeLine(grammar, line, ruleStack);
        const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
        // vscode.window.showInformationMessage(JSON.stringify(lineTokens));
        // console.log(`\nTokenizing line: ${line}`);
        // for (let j = 0; j < lineTokens.tokens.length; j++) {
        // 	const token = lineTokens.tokens[j];
        // 	console.log(` - token from ${token.startIndex} to ${token.endIndex} ` +
        // 		`(${line.substring(token.startIndex, token.endIndex)}) ` +
        // 		`with scopes ${token.scopes.join(', ')}`
        // 	);
        // }
        ruleStack = lineTokens.ruleStack;
        tokenLineResult = lineTokens;
    }
    // vscode.window.showInformationMessage(stringifyMaxDepth(grammar._ruleId2desc, 6));
    // @ts-ignore
    // vscode.window.showInformationMessage(JSON.stringify((grammar as Grammar)._ruleId2desc, stringify));
    // vscode.window.showInformationMessage(JSON.stringify(ruleStack, stringify));
    return tokenLineResult;
}
exports.tokenizeLine = tokenizeLine;
async function tokenizeFile(document) {
    const lang = document.languageId;
    const scopeName = getScopeName(lang);
    // const grammar = await registry.loadGrammar(scopeName);
    const grammar = await registry.loadGrammar(scopeName);
    // Very hacky, assigns array so `_tokenizeString()` can add rules to it
    grammar.rules = [];
    grammar.lines = [];
    // cache rules for more accurate debug timing
    let ruleStack = vscodeTextmate.INITIAL;
    for (let i = 0; i < document.lineCount; i++) {
        ruleStack = grammar.tokenizeLine(document.lineAt(i).text, ruleStack, 15000).ruleStack;
    }
    grammar.rules = [];
    // vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
    ruleStack = vscodeTextmate.INITIAL;
    const startTime = performance.now();
    grammar.startTime = startTime;
    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;
        const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
        grammar.lines.push({
            tokens: lineTokens.tokens,
            stoppedEarly: lineTokens.stoppedEarly,
            time: performance.now() - startTime,
        });
        // tokenLineResults.push(
        // 	{
        // 		tokens: lineTokens.tokens,
        // 		ruleStack: structuredClone(lineTokens.ruleStack),
        // 		stoppedEarly: lineTokens.stoppedEarly,
        // 	}
        // );
        // grammar.rules.pop();
        grammar.rules.push(undefined);
        ruleStack = lineTokens.ruleStack;
    }
    // vscode.window.showInformationMessage(JSON.stringify(registry, stringify));
    vscode.window.showInformationMessage(JSON.stringify(grammar, extension_1.stringify));
    // vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));
    // return tokenLineResults;
    return grammar;
}
exports.tokenizeFile = tokenizeFile;

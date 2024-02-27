"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDiagnostics = void 0;
const vscode = require("vscode");
const vscodeOniguruma = require("vscode-oniguruma");
const TreeSitter_1 = require("./TreeSitter");
const extension_1 = require("./extension");
async function initDiagnostics(context) {
    // Oniguruma regex parser
    const uri = vscode.Uri.joinPath(context.extensionUri, 'node_modules', 'vscode-oniguruma', 'release', 'onig.wasm');
    const wasm = await vscode.workspace.fs.readFile(uri);
    const options = {
        data: wasm,
        print(string) {
            console.log(string);
        }
    };
    await vscodeOniguruma.loadWASM(options);
    const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");
    context.subscriptions.push(DiagnosticCollection);
    for (const editor of vscode.window.visibleTextEditors) {
        // vscode.window.showInformationMessage(JSON.stringify("visible"));
        Diagnostics(editor.document, DiagnosticCollection);
    }
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        Diagnostics(document, DiagnosticCollection);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((edits) => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        Diagnostics(edits.document, DiagnosticCollection);
    }));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        DiagnosticCollection.delete(document.uri);
    }));
}
exports.initDiagnostics = initDiagnostics;
function Diagnostics(document, Diagnostics) {
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
        return;
    }
    const diagnostics = [];
    if (false) { // TreeSitter JSON errors
        // vscode.window.showInformationMessage(JSON.stringify("diagnostics JSON"))
        const tree = (0, TreeSitter_1.getTree)(document);
        if (tree == null) {
            return;
        }
        const queryCaptures = (0, TreeSitter_1.queryNode)(tree.rootNode, `(ERROR) @ERROR`);
        for (const queryCapture of queryCaptures) {
            const node = queryCapture.node;
            const text = node.text;
            const range = (0, TreeSitter_1.toRange)(node);
            const diagnostic = new vscode.Diagnostic(range, `JSON error: \`${text}\``, vscode.DiagnosticSeverity.Warning);
            diagnostics.push(diagnostic);
            // vscode.window.showInformationMessage(JSON.stringify(text));
        }
    }
    if (false) { // TreeSitter Regex errors
        // vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        if (trees == null) {
            return;
        }
        const regexTrees = trees.regexTrees;
        for (const id in regexTrees) {
            const tree = regexTrees[id];
            // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.toString()));
            const queryString = `
				((ERROR) @ERROR)
				((error) @error)
				((quantifier) @quantifier)
				(_ _ @missing .) ;Only the last child node can be missing
			`;
            const queryCaptures = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString);
            for (const queryCapture of queryCaptures) {
                const node = queryCapture.node;
                const type = node.type;
                const text = node.text;
                const range = (0, TreeSitter_1.toRange)(node);
                const parent = (0, TreeSitter_1.trueParent)(node);
                const parentType = parent.type;
                const parentRange = (0, TreeSitter_1.toRange)(parent);
                let diagnostic;
                switch (queryCapture.name) {
                    case 'ERROR':
                    case 'error':
                    case 'error_':
                        diagnostic = {
                            range: range,
                            message: `'${text}' is not valid inside '${parentType}'`,
                            severity: vscode.DiagnosticSeverity.Warning,
                            source: 'JSON TextMate oniguruma',
                        };
                        break;
                    case 'invalid':
                        diagnostic = {
                            range: range,
                            message: `${text}`,
                            severity: vscode.DiagnosticSeverity.Warning,
                            source: `${type}`,
                        };
                        break;
                    case 'missing':
                        if (!node.isMissing()) {
                            continue;
                        }
                        diagnostic = {
                            range: parentRange,
                            message: `'${parentType}' is missing ending char${type.length > 1 ? 's' : ''} '${type}'`,
                            severity: vscode.DiagnosticSeverity.Error,
                            source: 'TreeSitter Missing node',
                        };
                        break;
                    case 'quantifier':
                        let previousSibling = node.previousNamedSibling;
                        while (previousSibling?.type == 'comment_extended') {
                            previousSibling = previousSibling.previousNamedSibling;
                        }
                        if (previousSibling) {
                            switch (previousSibling.type) {
                                case 'modify':
                                case 'modify_extended':
                                case 'look_ahead':
                                case 'look_behind':
                                case 'look_around':
                                case 'callout':
                                case 'alteration':
                                    break;
                                default:
                                    continue;
                            }
                        }
                        if (parentType == 'capture_group' && text == '?') {
                            diagnostic = {
                                range: range,
                                message: `'(?...)' Invalid group syntax`,
                                severity: vscode.DiagnosticSeverity.Error,
                                source: 'ONIG_INEFFECTIVE_META_CHAR',
                            };
                            break;
                        }
                        diagnostic = {
                            range: range,
                            message: `'${text}' Invalid Quantifier target`,
                            severity: vscode.DiagnosticSeverity.Error,
                            source: 'ONIG_SYN_CONTEXT_INVALID_REPEAT_OPS',
                        };
                        break;
                    default:
                        continue;
                }
                diagnostics.push(diagnostic);
                // vscode.window.showInformationMessage(JSON.stringify(diagnostic));
            }
        }
    }
    if (true) { // Oniguruma Regex errors. https://github.com/kkos/oniguruma
        // vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex Oniguruma"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        // const jsonTree = trees.jsonTree;
        const regexTrees = trees.regexTrees;
        const regexNodes = trees.regexNodes;
        for (const id in regexTrees) {
            const regexTree = regexTrees[id];
            const node = regexTree.rootNode;
            const text = node.text;
            const regexNode = regexNodes[node.id];
            const key = regexNode.previousNamedSibling;
            let regex = text.replace(/\\[\\\/bfnrt"]|\\u[0-9a-fA-F]{4}/g, regexEscapeReplacer);
            if (key.text == 'end' || key.text == 'while') {
                // `\\3` could be valid; could be invalid. Who knows?
                // Would need to check the `begin` regex first for the number of capture groups
                // Then how to tell Oniguruma how many are available??
                regex = regex.replace(/\\[1-9](\d{2})?(?!\d)/g, '\\0');
            }
            const string = vscodeOniguruma.createOnigString(''); // blank. Maybe can test against a user provided string?
            // const scanner = vscodeOniguruma.createOnigScanner([regex]);
            const scanner = new vscodeOniguruma.OnigScanner(['', regex]);
            const match = scanner.findNextMatchSync(string, 0); // returns null if `regex` is invalid
            // vscode.window.showInformationMessage(JSON.stringify(match));
            if (!match) {
                const range = (0, TreeSitter_1.toRange)(key);
                const diagnostic = {
                    range: range,
                    message: `Regex Failed Parse Test.`,
                    severity: vscode.DiagnosticSeverity.Error,
                    source: 'Oniguruma',
                };
                diagnostics.push(diagnostic);
            }
        }
    }
    // vscode.window.showInformationMessage(JSON.stringify(diagnostics));
    Diagnostics.set(document.uri, diagnostics);
}
function regexEscapeReplacer(substring, ...args) {
    const char = substring.charAt(1);
    switch (char) {
        case '\\': return '\\';
        case '/': return '/';
        case 'b': return '\b';
        case 'f': return '\f';
        case 'n': return '\n';
        case 'r': return '\r';
        case 't': return '\t';
        case '"': return '"';
        case 'u':
            const hexStr = substring.substring(2, 6);
            const hexCode = parseInt(hexStr, 16);
            const char = String.fromCodePoint(hexCode);
            return char;
    }
}

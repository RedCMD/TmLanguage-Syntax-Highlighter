"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSemanticTokensProvider = exports.SemanticTokensLegend = void 0;
const vscode = require("vscode");
const TreeSitter_1 = require("../TreeSitter");
const tokenConversion = {
    escape_sequence: 17,
    number: 20,
    true: 19,
    false: 19,
    null: 19,
    string: 18,
    port: 0,
    register: 7,
    memory: 10,
    label: 11,
    instruction: 15,
    macro: 16,
    comment: 17,
    numeric: 20,
    operators: 22,
    key: 15,
    value: 18,
    error: 17,
};
const tokenTypesLegend = [
    "namespace", // 0  %port
    "class", // 1  %port
    "enum", // 2  %port
    "interface", // 3  %port
    "struct", // 4  %port
    "typeParameter", // 5  %port
    "type", // 6  %port
    "parameter", // 7  $register
    "variable", // 8  $register
    "property", // 9  $register
    "enumMember", // 10 #memory
    "decorator", // 11 .label
    "event", // 12 $register
    "function", // 13 .label
    "method", // 14 .label
    "macro", // 15 instruction
    "label", // 16 @macro
    "comment", // 17 //comment
    "string", // 18 "string"
    "keyword", // 19 @macro
    "number", // 20 -numeric
    "regexp", // 21 
    "operator", // 22 =operators
];
const tokenModifiersLegend = [
    "declaration",
    "definition",
    "readonly",
    "static",
    "deprecated",
    "abstract",
    "async",
    "modification",
    "documentation",
    "defaultLibrary",
    "strong",
    "bold",
    "strikethrough",
    "underline",
];
exports.SemanticTokensLegend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
exports.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(document, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Semantic"));
        const semanticTokensBuilder = new vscode.SemanticTokensBuilder(exports.SemanticTokensLegend);
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const captures = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, `(_) @node`);
        for (const capture of captures) {
            const node = capture.node;
            const tokenType = tokenConversion[node.type];
            if (tokenType) {
                const range = (0, TreeSitter_1.toRange)(node);
                semanticTokensBuilder.push(range, tokenTypesLegend[tokenType]);
            }
        }
        const tokens = semanticTokensBuilder.build();
        // vscode.window.showInformationMessage(JSON.stringify(tokens));
        return tokens;
    },
};

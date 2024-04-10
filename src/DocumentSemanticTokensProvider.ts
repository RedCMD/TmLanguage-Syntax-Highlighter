import * as vscode from 'vscode';
import { getTrees, queryNode, toRange } from "./TreeSitter";
import { _object_ } from './extension';


const tokenConversion: _object_ = {
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
}

const tokenTypesLegend = [
	"namespace",	// 0  %port
	"class",		// 1  %port
	"enum",			// 2  %port
	"interface",	// 3  %port
	"struct",		// 4  %port
	"typeParameter",// 5  %port
	"type",			// 6  %port
	"parameter",	// 7  $register
	"variable",		// 8  $register
	"property",		// 9  $register
	"enumMember",	// 10 #memory
	"decorator",	// 11 .label
	"event",		// 12 $register
	"function",		// 13 .label
	"method",		// 14 .label
	"macro",		// 15 instruction
	"label",		// 16 @macro
	"comment",		// 17 //comment
	"string",		// 18 "string"
	"keyword",		// 19 @macro
	"number",		// 20 -numeric
	"regexp",		// 21 
	"operator",		// 22 =operators
]

const tokenModifiersLegend = [ // idk what this does/is for
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
]

export const SemanticTokensLegend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);


export const DocumentSemanticTokensProvider: vscode.DocumentSemanticTokensProvider = {
	provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.SemanticTokens {
		// vscode.window.showInformationMessage(JSON.stringify("Semantic"));
		const semanticTokensBuilder = new vscode.SemanticTokensBuilder(SemanticTokensLegend);
		const trees = getTrees(document);
		const jsonTree = trees.jsonTree;

		const captures = queryNode(jsonTree.rootNode, `(_) @node`);
		for (const capture of captures) {
			const node = capture.node;
			const tokenType = tokenConversion[node.type];
			if (tokenType) {
				const range = toRange(node);
				semanticTokensBuilder.push(range, tokenTypesLegend[tokenType]);
			}
		}

		const tokens = semanticTokensBuilder.build();
		// vscode.window.showInformationMessage(JSON.stringify(tokens));
		return tokens;
	},
}
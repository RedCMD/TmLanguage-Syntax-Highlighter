'use strict'
Object.defineProperty(exports, "__esModule", { value: true })


const vscode = require("vscode")

const DocumentFormattingEditProvider = require("./DocumentFormattingEditProvider.js").DocumentFormattingEditProvider
const DocumentSemanticTokensProvider = require("./DocumentSemanticTokensProvider.js").DocumentSemanticTokensProvider
const SemanticTokensLegend = require("./DocumentSemanticTokensProvider.js").SemanticTokensLegend
const DocumentSymbolProvider = require("./DocumentSymbolProvider.js").DocumentSymbolProvider
const CompletionItemProvider = require("./CompletionItemProvider.js").CompletionItemProvider
const DefinitionProvider = require("./DefinitionProvider.js").DefinitionProvider
const ReferenceProvider = require("./ReferenceProvider.js").ReferenceProvider
const HoverProvider = require("./HoverProvider.js").HoverProvider


const parseTreeExtension = vscode.extensions.getExtension("pokey.parse-tree")
if (parseTreeExtension == null)
	throw new Error("Depends on pokey.parse-tree extension")


function nodeToVscodeRange(node) {
	const startPosition = node.startPosition
	const endPosition = node.endPosition
	
	return new vscode.Range(
		startPosition.row,
		startPosition.column,
		endPosition.row,
		endPosition.column
	)
}

function getNodeAtPosition(rootNode, position) {
	if (rootNode.type == 'value')
		return rootNode
		
	for (let index = 0; index < rootNode.namedChildCount; index++) {
		const childNode = rootNode.namedChild(index);
		if (nodeToVscodeRange(childNode).contains(position))
			return getNodeAtPosition(childNode, position)
	}

	return rootNode
}


const DocumentSelector = [
	{ language: 'json-tmLanguage' }
]

// main()
async function activate(context) {
	// vscode.window.showInformationMessage(JSON.stringify())

	const { registerLanguage } = await parseTreeExtension.activate()
	// const wasm = "tree-sitter-json"
	const wasm = context.extensionPath + '\\out\\tree-sitter\\tree-sitter-jsontm.wasm'
	registerLanguage('json-tmLanguage', wasm)


	// context.subscriptions.push(vscode.commands.registerCommand('json-tm.reload-wasm', () => {
	// 	vscode.window.showInformationMessage(JSON.stringify("reload"))
	// 	registerLanguage('json-tmLanguage', "E:\\VSCode-win32-x64\\data\\extensions\\redcmd.wasm.windows\\tree-sitter-your_language\\tree-sitter-jsontm.wasm")
	// 	registerLanguage('json-tmLanguage', "tree-sitter-json")
	// }))



	// context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)) // debug tree-sitter rules
	context.subscriptions.push(vscode.languages.registerReferenceProvider(DocumentSelector, ReferenceProvider)) // #include
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(DocumentSelector, DefinitionProvider)) // #include
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DocumentSelector, CompletionItemProvider)) //scope names
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)) // breadcrumbs
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(DocumentSelector, DocumentFormattingEditProvider)) // right-click => format
	// context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)) // syntax highlighting
}


exports.parseTreeExtension = parseTreeExtension
exports.nodeToVscodeRange = nodeToVscodeRange
exports.getNodeAtPosition = getNodeAtPosition

exports.activate = activate
function deactivate() { }
exports.deactivate = deactivate
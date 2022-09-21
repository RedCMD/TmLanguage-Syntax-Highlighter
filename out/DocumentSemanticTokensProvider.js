const vscode = require("vscode")
const extension = require("./extension.js")


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
	

	header: 16,
	"instruction.unknown": 15,
	registerspecial: 7,
	address: 10,
	"string.special": 18,
	number: 20,
	identifier: 7,
	"identifier.placeholder": 7,
	
	"error": 17,
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
	"operator"		// 22 =operators
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
	"underline"
]

const SemanticTokensLegend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend)


const DocumentSemanticTokensProvider = {
	async provideDocumentSemanticTokens(document, token) {
		const builder = new vscode.SemanticTokensBuilder()

		
		// vscode.window.showInformationMessage(JSON.stringify("sitter"))


		// const { loadLanguage } = await extension.parseTreeExtension.activate()
		const { getTree } = await extension.parseTreeExtension.activate()
		// const { getNodeAtLocation } = await extension.parseTreeExtension.activate()
		// vscode.window.showInformationMessage(JSON.stringify("parseTreeExtension"))

		// vscode.window.showInformationMessage(JSON.stringify("tokens"))
		
		let tree = getTree(document)
		// for (let index = 0; index < array.length; index++) {
		// 	const element = array[index]

		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.text))
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.walk().currentNode().currentFieldName()))
		
		this.getAllChildren(builder, tree.rootNode)

		// }
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.child(0).firstChild))
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.printDotGraph()))

		// const location = new vscode.Location(document.uri, new vscode.Position(0, 0))
		// let node = getNodeAtLocation(location)
		// vscode.window.showInformationMessage(JSON.stringify(node))
		// vscode.window.showInformationMessage(JSON.stringify(Object.getOwnPropertyNames(Object.getPrototypeOf(node))))



		// builder.push(0, 0, 6, 0, 0)

		
		const tokens = builder.build()
		
		// vscode.window.showInformationMessage(JSON.stringify(tokens))
		return tokens
	},
	async getAllChildren(builder, node) {
		
		for (let index = 0; index < node.childCount; index++)
			this.getAllChildren(builder, node.child(index))
		
		// vscode.window.showInformationMessage(JSON.stringify(tokenConversion['node.type']))

		if (tokenConversion[node.type])
			builder.push(node.startPosition.row, node.startPosition.column, node.endPosition.column - node.startPosition.column, tokenConversion[node.type.toLowerCase()], 0)
	}
}

exports.DocumentSemanticTokensProvider = DocumentSemanticTokensProvider
exports.SemanticTokensLegend = SemanticTokensLegend
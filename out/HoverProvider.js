const vscode = require("vscode")
const extension = require("./extension.js")


const HoverProvider = {
	async provideHover(document, position, token) {
		// vscode.window.showInformationMessage(JSON.stringify())

		const { getNodeAtLocation } = await extension.parseTreeExtension.activate()

		// getting node at current mouse location
		const location = new vscode.Location(document.uri, position)
		let node = getNodeAtLocation(location)


		// let treeCursor = node.walk()
		// treeCursor.gotoFirstChild()
		// let field = treeCursor.currentFieldName()
		// vscode.window.showInformationMessage(JSON.stringify(field))

		// formating node string to markdown
		var markdownString = new vscode.MarkdownString()

		// vscode.window.showInformationMessage(node.parent.toString())
		// // vscode.window.showInformationMessage(node.parent.childForFieldName("value").toString())
		// if (node.type == "string_content")
		// 	if (node.parent.parent.childForFieldName("key").child(1).text == "include")
		// 		if (node.parent.parent.childForFieldName("value").child(1).equals(node))

		// node = node.childForFieldName("value")

		// while (node.type != "document" && node.type != "pair") {
		// node = node.parent
		// }
		// node = node.child(1)

		// if (node.parent.type == "string" &&
		// 	node.parent.parent.type == "key" &&
		// 	node.parent.parent.child(0) == node
		// )

		markdownString.appendCodeblock(node.text, 'json-tmLanguage')
		if (node.parent != null)
			markdownString.appendText(node.parent.type + ' => ')
		markdownString.appendText(node.type)
		// for (let index = 0; index < node.childCount; index++)
		// 	markdownString.appendCodeblock(node.child(index).text, 'c')

		// vscode.window.showInformationMessage(JSON.stringify(node.walk().currentFieldName()))
		// vscode.window.showInformationMessage(JSON.stringify(node.toString()))

		// markdownString.appendCodeblock(node.childForFieldName("type").text, 'json')
		// highlight node range
		// const range = new vscode.Range(node.startPosition.row, node.startPosition.column, node.endPosition.row, node.endPosition.column)
		const range = extension.nodeToVscodeRange(node)
		return { contents: [markdownString], range: range }
	}
}

exports.HoverProvider = HoverProvider
const vscode = require("vscode");
const extension = require("./extension.js");

const ReferenceProvider = {
	async provideReferences(document, position, context, token) {
		
		const { getNodeAtLocation } = await extension.parseTreeExtension.activate()
		const location = new vscode.Location(document.uri, position)
		const node = getNodeAtLocation(location)
		let text


		if (node.type == 'key' && node.parent.type == 'repo')
			text = node.text
		else if (node.type == 'value' && node.parent.type == 'include')
			text = node.text.substring(node.text.indexOf("#") + 1)
		else
			return
		// vscode.window.showInformationMessage(text)

		const { getTree } = await extension.parseTreeExtension.activate()
		const tree = getTree(document)
		let locations = []


		this.getAllChildren(tree.rootNode, locations, text, document.uri)


		// vscode.window.showInformationMessage(JSON.stringify(locations))
		return locations
	},
	async getAllChildren(node, locations, text, uri) {
		node.namedChildren.forEach(childNode => {
			this.getAllChildren(childNode, locations, text, uri)
		})

		if (node.type != 'value')
			return

		if (node.parent.type != 'include')
			return

		if (node.text.substring(node.text.indexOf("#") + 1) != text)
			return

		const range = extension.nodeToVscodeRange(node)
		const location = new vscode.Location(uri, range)
		locations.push(location)
	}
}

exports.ReferenceProvider = ReferenceProvider
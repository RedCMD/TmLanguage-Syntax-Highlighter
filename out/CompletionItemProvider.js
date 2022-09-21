const vscode = require("vscode");
const _extension = require("./extension.js");

const CompletionItemProvider = {
	async provideCompletionItems(document, position, token, context) {
		// const { getNodeAtLocation } = await extension.parseTreeExtension.activate()
		// const location = new vscode.Location(document.uri, position)
		// const node = getNodeAtLocation(location)
		const { getTree } = await _extension.parseTreeExtension.activate()
		const tree = getTree(document)
		const node = _extension.getNodeAtPosition(tree.rootNode, position)
		const completions = []
		// vscode.window.showInformationMessage(JSON.stringify(node.text))

		// if (node.previousNamedSibling.text == '')
		// node = node.previousNamedSibling
		// vscode.window.showInformationMessage(JSON.stringify(node.type))
		// vscode.window.showInformationMessage(JSON.stringify(node.parent.type))

		// if (node.type == 'value' && node.parent.type == 'include') { 
		
		// 0 width nodes in tree-sitter are very buggy
		if (node.type == 'value' && (node.parent.type == 'include' || node.parent.parent.type == 'include')) {
		// if ((node.type == 'value' || node.previousSibling.type == 'value') && node.parent.type == 'include') {
			// const { getTree } = await extension.parseTreeExtension.activate()
			// const tree = getTree(document)
			// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.type))

			tree.rootNode.namedChildren.forEach(rootNode => {
				if (rootNode.type != 'repository')
					return

				rootNode.namedChildren.forEach(repoNode => {
					if (repoNode.type != 'repo')
						return
					
					const firstNamedChild = repoNode.firstNamedChild
					if (firstNamedChild == null)
						return

					const label = '#' + firstNamedChild.text
																// 0 width nodes in tree-sitter are very buggy
					const range = _extension.nodeToVscodeRange(node.type == 'value' ? node : node.previousSibling)
					const completion = {
						label: label,
						range: range,
						kind: vscode.CompletionItemKind.Function
					}
					completions.push(completion)
				})
			})


			vscode.extensions.all.forEach(extension => {
				const packageJSON = extension.packageJSON
				if (packageJSON == null)
					return

				const contributes = packageJSON.contributes
				if (contributes == null)
					return

				const grammars = contributes.grammars
				if (grammars == null)
					return

				grammars.forEach(grammar => {
					const scopeName = grammar.scopeName
					if (scopeName == null)
						return

																// 0 width nodes in tree-sitter are very buggy
					const range = _extension.nodeToVscodeRange(node.type == 'value' ? node : node.previousSibling)
					const completion = {
						label: scopeName,
						range: range,
						kind: vscode.CompletionItemKind.Field
					}
					
					completions.push(completion)
				})
			})


			completions.push(new vscode.CompletionItem('$self', vscode.CompletionItemKind.Class))
			completions.push(new vscode.CompletionItem('$base', vscode.CompletionItemKind.Class))


			// completions.push(new vscode.CompletionItem('#$$$'))
		}

		// vscode.window.showInformationMessage(JSON.stringify(completions))
		return completions
	}
}

exports.CompletionItemProvider = CompletionItemProvider
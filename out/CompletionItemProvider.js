const vscode = require("vscode");
const _extension = require("./extension.js");

const CompletionItemProvider = {
	async provideCompletionItems(document, position, token, context) {
		const { getTree } = await _extension.parseTreeExtension.activate()
		const tree = getTree(document)
		const node = _extension.getNodeAtPosition(tree.rootNode, position)
		const completions = []
		// vscode.window.showInformationMessage(JSON.stringify(node.text))


		// 0 width nodes in tree-sitter are very buggy
		if (node.type == 'value' && (node.parent.type == 'include' || node.parent.parent.type == 'include')) {
			const text = node.text
			// TODO: move this to tree-sitter grammar
			const indexOfHash = text.indexOf("#")
			const includeText = text.substring(indexOfHash + 1)
			const nameScope = indexOfHash == -1 ? text : text.substring(0, indexOfHash)
			// 0 width nodes in tree-sitter are very buggy
			const range = _extension.nodeToVscodeRange(node.type == 'value' ? node : node.previousSibling)


			for (const rootNode of tree.rootNode.namedChildren) {
				if (rootNode.type != 'repository')
					continue

				for (const repoNode of rootNode.namedChildren) {
					if (repoNode.type != 'repo')
						continue
					
					const firstNamedChild = repoNode.firstNamedChild
					if (firstNamedChild == null)
						continue
					

					const label = '#' + firstNamedChild.text
					const completion = {
						label: label,
						range: range,
						kind: vscode.CompletionItemKind.Function
					}
					
					for (const commentNode of repoNode.namedChildren) {
						if (commentNode.type != 'comment')
							continue
						
						if (commentNode.namedChild(1) == null)
							continue
						
						completion.detail = commentNode.namedChild(1).text
						break
					}
					
					completions.push(completion)
				}
			}



			for (const extension of vscode.extensions.all) {
				const packageJSON = extension.packageJSON
				if (packageJSON == null)
					continue

				const contributes = packageJSON.contributes
				if (contributes == null)
					continue

				const grammars = contributes.grammars
				if (grammars == null)
					continue

				for (const grammar of grammars) {
					const scopeName = grammar.scopeName
					if (scopeName == null)
						continue

					// 0 width nodes in tree-sitter are very buggy
					const completion = {
						label: scopeName,
						range: range,
						kind: vscode.CompletionItemKind.Field
					}
					const language = grammar.language
					if (language != null)
						completion.detail = language
					completions.push(completion)

					if (nameScope == scopeName) {
						const path = vscode.Uri.joinPath(extension.extensionUri, grammar.path)
						const textDocument = await vscode.workspace.openTextDocument(path)
						const documentTree = getTree(textDocument)

						if (documentTree.rootNode.namedChildren.some(rootNode =>
							rootNode.type == 'scopeName' && rootNode.namedChild(1).text == nameScope
						)) {
							for (const rootNode of documentTree.rootNode.namedChildren) {
								if (rootNode.type != 'repository')
									continue

								for (const repoNode of rootNode.namedChildren) {
									if (repoNode.type != 'repo')
										continue

									if (repoNode.namedChild(0) == null)
										continue

									const completion = {
										label: nameScope + '#' + repoNode.namedChild(0).text,
										range: range,
										kind: vscode.CompletionItemKind.Field
									}
									completions.push(completion)
								}
							}
						}
					}
				}
			}


			completions.push(new vscode.CompletionItem(
				{ label: '$self', description: 'Includes the current grammar file' },
				vscode.CompletionItemKind.Class
			))
			completions.push(new vscode.CompletionItem(
				{ label: '$base', description: 'Includes the highest parent grammar' },
				vscode.CompletionItemKind.Class
			))


			// completions.push(new vscode.CompletionItem('#$$$'))
		}

		// vscode.window.showInformationMessage(JSON.stringify(completions))
		return completions
	}
}

exports.CompletionItemProvider = CompletionItemProvider
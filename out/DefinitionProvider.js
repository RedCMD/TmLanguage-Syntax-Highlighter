const vscode = require("vscode")
const _extension = require("./extension.js")

const DefinitionProvider = {
	async provideDefinition(document, position, token) {

		const { getNodeAtLocation } = await _extension.parseTreeExtension.activate()
		const location = new vscode.Location(document.uri, position)
		let node = getNodeAtLocation(location)
		let locations = []
		// vscode.window.showInformationMessage(node.text)

		if (node.parent.type == 'value')
			node = node.parent

		const originSelectionRange = _extension.nodeToVscodeRange(node)

		if (false) {
			let uri = await vscode.workspace.findFiles('**/*.tmLanguage.json', '**/node_modules/**', 1)
			uri = uri.pop()
			// vscode.window.showInformationMessage(JSON.stringify(document.uri))
			// vscode.window.showInformationMessage(JSON.stringify(uri))

			// const { getTree } = await extension.parseTreeExtension.activate()
			// vscode.window.showInformationMessage(JSON.stringify({ uri: uri.pop() }))
			// const tree2 = getTree({ uri: uri.pop() })

			// vscode.window.showInformationMessage(JSON.stringify("tree2.rootNode.text"))

			// let targetRange2
			// let targetSelectionRange2

			// tree2.rootNode.namedChildren.forEach(rootNode2 => {
			// 	vscode.window.showInformationMessage(rootNode2.type)
			// 	switch (rootNode2.type) {
			// 		case 'scopeName':
			// 			targetRange2 = extension.nodeToVscodeRange(rootNode2)
			// 			break
			// 		case 'patterns':
			// 			// vscode.window.showInformationMessage(JSON.stringify(extension.nodeToVscodeRange(rootNode)))
			// 			// if (targetSelectionRange == null || extension.nodeToVscodeRange(rootNode).contains(extension.nodeToVscodeRange(node)))
			// 			targetSelectionRange2 = extension.nodeToVscodeRange(rootNode2)
			// 			break
			// 	}
			// })

			// if (targetRange == null)
			// 	targetRange = targetSelectionRange
			// if (targetRange == null)
			// 	return
			// if (targetSelectionRange2 == null)
			// 	targetSelectionRange2 = targetRange2

			// if (targetSelectionRange2.contains(originSelectionRange))
			// 	targetSelectionRange2 = targetRange2

			// targetRange2 = targetSelectionRange2

			// if (targetRange2 == null)
			// 	return


			const locationLink = {
				originSelectionRange: originSelectionRange,
				targetUri: uri,
				targetRange: originSelectionRange,
				targetSelectionRange: originSelectionRange
			}
			vscode.window.showInformationMessage(JSON.stringify(locationLink))
			locations.push(locationLink)
		}

		
		if (node.type == 'value' && node.parent.type == 'include') {
			const { getTree } = await _extension.parseTreeExtension.activate()
			const tree = getTree(document)

			switch (node.text) {
				case '$self':
				case '$base':

					let targetRange
					let targetSelectionRange

					tree.rootNode.namedChildren.forEach(rootNode => {
						// vscode.window.showInformationMessage(node.type)
						switch (rootNode.type) {
							case 'scopeName':
								targetRange = _extension.nodeToVscodeRange(rootNode)
								break
							case 'patterns':
								// vscode.window.showInformationMessage(JSON.stringify(extension.nodeToVscodeRange(rootNode)))
								// if (targetSelectionRange == null || extension.nodeToVscodeRange(rootNode).contains(extension.nodeToVscodeRange(node)))
								targetSelectionRange = _extension.nodeToVscodeRange(rootNode)
								break
						}
					})

					if (targetRange == null)
						targetRange = targetSelectionRange
					if (targetRange == null)
						break
					if (targetSelectionRange == null)
						targetSelectionRange = targetRange

					if (targetSelectionRange.contains(originSelectionRange))
						targetSelectionRange = targetRange
						
					
					const locationLink = {
						originSelectionRange: originSelectionRange,
						targetUri: document.uri,
						targetRange: targetRange,
						targetSelectionRange: targetSelectionRange
					}
					locations.push(locationLink)
					break

				default:
					// TODO: move this to tree-sitter grammar
					const indexOfHash = node.text.indexOf("#")
					const includeText = node.text.substring(indexOfHash + 1)
					const nameScope = indexOfHash == -1 ? node.text : node.text.substring(0, indexOfHash)
					// vscode.window.showInformationMessage(JSON.stringify(indexOfHash))


					if (indexOfHash != 0) {
						// vscode.window.showInformationMessage(JSON.stringify(vscode.extensions.all))
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
								if (scopeName != nameScope)
									return

								const path = vscode.Uri.joinPath(extension.extensionUri, grammar.path)
								vscode.workspace.openTextDocument(path)
							})
						})
						vscode.workspace.textDocuments.forEach(textDocument => {
							// vscode.window.showInformationMessage(JSON.stringify(textDocument))
							if (textDocument.languageId != 'json-tmLanguage')
								return
							const documentTree = getTree(textDocument)

							if (documentTree.rootNode.namedChildren.some(rootNode =>
								rootNode.type == 'scopeName' && rootNode.namedChild(1).text == nameScope
							)) {
								// vscode.window.showInformationMessage(documentTree.rootNode.text)
								// vscode.window.showInformationMessage(JSON.stringify(indexOfHash))
								if (indexOfHash == -1) {
									let targetRange
									let targetSelectionRange

									documentTree.rootNode.namedChildren.forEach(rootNode => {
										// vscode.window.showInformationMessage(node.type)
										switch (rootNode.type) {
											case 'scopeName':
												targetRange = _extension.nodeToVscodeRange(rootNode)
												break
											case 'patterns':
												// vscode.window.showInformationMessage(JSON.stringify(extension.nodeToVscodeRange(rootNode)))
												// if (targetSelectionRange == null || extension.nodeToVscodeRange(rootNode).contains(extension.nodeToVscodeRange(node)))
												targetSelectionRange = _extension.nodeToVscodeRange(rootNode)
												break
										}
									})

									// if (targetRange == null)
									// 	targetRange = targetSelectionRange
									// if (targetRange == null)
									// 	return
									if (targetSelectionRange == null)
										targetSelectionRange = targetRange

									if (targetSelectionRange.contains(originSelectionRange))
										targetSelectionRange = targetRange

									targetRange = targetSelectionRange
									
									if (targetRange == null)
										return


									const locationLink = {
										originSelectionRange: originSelectionRange,
										targetUri: textDocument.uri,
										targetRange: targetRange,
										targetSelectionRange: targetSelectionRange
									}
									// vscode.window.showInformationMessage(JSON.stringify(locationLink))
									locations.push(locationLink)
								} else {
									documentTree.rootNode.namedChildren.forEach(rootNode => {
										if (rootNode.type != 'repository')
											return

										rootNode.namedChildren.forEach(repoNode => {
											if (repoNode.type != 'repo')
												return

											if (repoNode.firstNamedChild.text != includeText)
												return

											// const locationLink2 = {
											// 	targetUri: document.uri,
											// 	targetRange: originSelectionRange,
											// }

											const locationLink = {
												originSelectionRange: originSelectionRange,
												// originSelectionRange: locationLink2,
												targetUri: textDocument.uri,
												// targetUri: document.uri,
												targetRange: _extension.nodeToVscodeRange(repoNode),
												targetSelectionRange: _extension.nodeToVscodeRange(repoNode.firstNamedChild)
											}
											// if (locations.length == 0)
											// 	locationLink['originSelectionRange'] = originSelectionRange
											// vscode.window.showInformationMessage(JSON.stringify(locationLink))
											locations.push(locationLink)

										})
									})
								}
							}
						})
					}
					else
						tree.rootNode.namedChildren.forEach(node => {
							if (node.type != 'repository')
								return

							node.namedChildren.forEach(repoNode => {
								if (repoNode.type != 'repo')
									return

								if (repoNode.firstNamedChild.text != includeText)
									return

								const locationLink = {
									originSelectionRange: originSelectionRange,
									targetUri: document.uri,
									targetRange: _extension.nodeToVscodeRange(repoNode),
									targetSelectionRange: _extension.nodeToVscodeRange(repoNode.firstNamedChild)
								}
								// vscode.window.showInformationMessage(JSON.stringify(locationLink))
								locations.push(locationLink)
							})
						})

					break
			}
		}
		else if (node.type == 'key' && node.parent.type == 'repo') {
			// Call ReferenceProvider (down below)
		}
		// else if (node.type == 'key' && node.parent.type == 'include') {
		// 	// Call ReferenceProvider (down below)
		// }
		else
			return


		if (locations.length == 0) {
			// vscode will automatically run the ReferenceProvider if the only location is the same as the input
			const locationLink = {
				originSelectionRange: originSelectionRange,
				targetUri: document.uri,
				targetRange: originSelectionRange,
				targetSelectionRange: originSelectionRange
			}
			locations.push(locationLink)
		}

		// vscode.window.showInformationMessage(JSON.stringify(locations))
		return locations
	}
}

exports.DefinitionProvider = DefinitionProvider
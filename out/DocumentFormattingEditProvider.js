const vscode = require("vscode");
const extension = require("./extension.js");

const DocumentFormattingEditProvider = {
	async provideDocumentFormattingEdits(document, options, token) {

		const { getTree } = await extension.parseTreeExtension.activate()

		const tree = getTree(document)

		// let results = []
		const textEdits = []
		// results.push(new vscode.TextEdit(new vscode.Range(0, 0, 0, 0), "1"))
		// results.push(vscode.TextEdit.insert(new vscode.Position(2, 2), "."))
		// results.insert(new vscode.Position(2, 2), ".")

		this.getAllChildren(tree.rootNode, textEdits, 0)

		// const range = new vscode.Range(node.startPosition.row, node.startPosition.column, node.endPosition.row, node.endPosition.column)
		// results.push(new vscode.TextEdit(range, string))

		// vscode.window.showInformationMessage(tree.rootNode.toString())
		// textEdits.reverse()
		// vscode.window.showInformationMessage(JSON.stringify(textEdits))
		return textEdits
	},
	getAllChildren(node, textEdits, indent) {
		let range
		let whiteSpace
		let textEdit
		let expand = false

		// if (node.namedChildCount > 2)
		// 	expand = true

		node.children.forEach(childNode => {
			// switch (childNode.type) {
			// 	case '{':
			// 	case '[':
			// 		// indent++
			// 		break
			// 	case '}':
			// 	case ']':
			// 		// indent--
			// 		break
			// }
			// if (expand == true)
			// 	return
			// vscode.window.showInformationMessage(JSON.stringify(this.getAllChildren(childNode, textEdits, indent)))
			if (this.getAllChildren(childNode, textEdits, indent + 1)) 
				expand = true
			// expand |= this.getAllChildren(childNode, textEdits, indent)
			// vscode.window.showInformationMessage(JSON.stringify(expand == true))
			// vscode.window.showInformationMessage(expand)
			// if (expand == true)
			// 	return
				// vscode.window.showInformationMessage(childNode.text)
			// if (childNode.namedChildCount > 2)
			// 	expand = true

		})
		// vscode.window.showInformationMessage(JSON.stringify(expand))

		// if (node.parent != null)
		if (node.type == 'repo')
			expand = true
		else if (node.namedChildCount > 1)
			if (node.namedChildCount > 2)
				expand = true
			else if (node.namedChild(0).type != 'key')
				expand = true
			else if (node.text.length > 2000)
				// if (node.startPosition.column > node.parent.startPosition.column + 4)
				// if (node.previousSibling.endPosition.column > node.parent.startPosition.column + 4)
				expand = true
			// } else
				// vscode.window.showInformationMessage(node.namedChild(0).type)
		// expand = true

		// vscode.window.showInformationMessage(JSON.stringify(node.namedChildCount))

		node.children.forEach(childNode => {
			switch (childNode.type) {
				case '{':
				case '[':
					indent++
					// if (node.parent.namedChildCount > 2)
					// 	expand = true

					if (childNode.nextSibling == null)
						break

					if (expand == true)
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					else
						whiteSpace = ' '

					range = new vscode.Range(
						childNode.endPosition.row,
						childNode.endPosition.column,
						childNode.nextSibling.startPosition.row,
						childNode.nextSibling.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					// vscode.window.showInformationMessage(JSON.stringify(textEdit))
					textEdits.push(textEdit)
					break

				case '}':
				case ']':
					indent--
					// if (node.parent.namedChildCount > 2)
					// 	expand = true

					if (childNode.previousSibling == null)
						break
					
					if (childNode.previousSibling.type == '{')
						break
					if (childNode.previousSibling.type == '[')
						break

					if (expand == true)
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					else
						whiteSpace = ' '

					range = new vscode.Range(
						childNode.previousSibling.endPosition.row,
						childNode.previousSibling.endPosition.column,
						childNode.startPosition.row,
						childNode.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)
					break

				case ',':
					if (childNode.nextSibling == null)
						break

					if (expand == true)
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					else
						whiteSpace = ' '

					range = new vscode.Range(
						childNode.endPosition.row,
						childNode.endPosition.column,
						childNode.nextSibling.startPosition.row,
						childNode.nextSibling.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)

					if (childNode.previousSibling == null)
						break

					whiteSpace = ''

					range = new vscode.Range(
						childNode.previousSibling.endPosition.row,
						childNode.previousSibling.endPosition.column,
						childNode.startPosition.row,
						childNode.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)
					break
			
				case ':':
					// if (node.parent.namedChildCount > 2)
					// 	expand = true

					if (childNode.nextSibling == null)
						break
					// if (expand == true)
					// 	whiteSpace = '    '
					// else
					whiteSpace = ' '

					range = new vscode.Range(
						childNode.endPosition.row,
						childNode.endPosition.column,
						childNode.nextSibling.startPosition.row,
						childNode.nextSibling.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)

					if (childNode.previousSibling == null)
						break

					whiteSpace = ''

					range = new vscode.Range(
						childNode.previousSibling.endPosition.row,
						childNode.previousSibling.endPosition.column,
						childNode.startPosition.row,
						childNode.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)
					break
			}
		})
		// if (expand == false)
			// vscode.window.showInformationMessage(JSON.stringify(extension.nodeToVscodeRange(node)) + node.text)

		return expand

	},
	async getAllChildren4(node, textEdits, indent) {
		vscode.window.showInformationMessage(node.text)

		// let whiteSpace
		// let Range
		// let TextEdit
		// switch (node.type) {
		// 	case '{':
		// 	case '[':
		// 	case ',':
		// 		if (node.nextSibling == null)
		// 			break

		// 		if (node.parent.namedChildCount > 1) {
		// 			// indent++
		// 			whiteSpace = '\n' + new Array(indent + 1).join('\t')
		// 		} else {
		// 			// vscode.window.showInformationMessage(node.nextSibling.text)
		// 			whiteSpace = ' '
		// 		}

		// 		Range = new vscode.Range(
		// 			node.endPosition.row,
		// 			node.endPosition.column,
		// 			node.nextSibling.startPosition.row,
		// 			node.nextSibling.startPosition.column
		// 		)
		// 		TextEdit = vscode.TextEdit.replace(Range, whiteSpace)
		// 		textEdits.push(TextEdit)

		// 		break
		// 	case '}':
		// 	case ']':
		// 		if (node.previousSibling == null)
		// 			break

		// 		if (node.parent.namedChildCount > 1) {
		// 			// indent--
		// 			whiteSpace = '\n' + new Array(indent + 1).join('\t')
		// 		} else {
		// 			whiteSpace = ' '
		// 		}

		// 		Range = new vscode.Range(
		// 			node.previousSibling.endPosition.row,
		// 			node.previousSibling.endPosition.column,
		// 			node.startPosition.row,
		// 			node.startPosition.column
		// 		)
		// 		TextEdit = vscode.TextEdit.replace(Range, whiteSpace)
		// 		textEdits.push(TextEdit)

		// 		break

		// 	default:
		// 		break;
		// }


		node.children.forEach(childNode => {

			if (node.namedChildCount > 1)
				if (childNode.type == '{' || childNode.type == '[')
					indent++
				else if (childNode.type == '}' || childNode.type == ']')
					indent--

			this.getAllChildren(childNode, textEdits, indent)



			let range
			let whiteSpace
			let textEdit
			switch (childNode.type) {
				case '{':
				case '[':
				case ',':
					if (childNode.nextSibling == null)
						return

					if (node.namedChildCount > 2)
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					else
						whiteSpace = ' '

					range = new vscode.Range(
						childNode.endPosition.row,
						childNode.endPosition.column,
						childNode.nextSibling.startPosition.row,
						childNode.nextSibling.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)
					break;

				case '}':
				case ']':
					if (childNode.previousSibling == null)
						return

					if (node.namedChildCount > 2)
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					else
						whiteSpace = ' '

					range = new vscode.Range(
						childNode.previousSibling.endPosition.row,
						childNode.previousSibling.endPosition.column,
						childNode.startPosition.row,
						childNode.startPosition.column
					)

					textEdit = vscode.TextEdit.replace(range, whiteSpace)
					textEdits.push(textEdit)
					break;

				case ':':
					if (childNode.nextSibling != null) {

						whiteSpace = ' '

						range = new vscode.Range(
							childNode.endPosition.row,
							childNode.endPosition.column,
							childNode.nextSibling.startPosition.row,
							childNode.nextSibling.startPosition.column
						)

						textEdit = vscode.TextEdit.replace(range, whiteSpace)
						textEdits.push(textEdit)
					}
					if (childNode.previousSibling != null) {

						whiteSpace = ''

						range = new vscode.Range(
							childNode.previousSibling.endPosition.row,
							childNode.previousSibling.endPosition.column,
							childNode.startPosition.row,
							childNode.startPosition.column
						)

						textEdit = vscode.TextEdit.replace(range, whiteSpace)
						textEdits.push(textEdit)
					}
					break;

			}

		})

		// vscode.window.showInformationMessage(JSON.stringify(node.toString()))
	},
	async getAllChildren2(node, results, indent) {

		switch (node.type) {
			case 'document':
				for (let index = 0; index < node.childCount; index++) {
					this.getAllChildren(node.child(index), results, indent)
				}

				break
			case 'object':
			case 'array':
				for (let index = 0; index < node.childCount; index++) {
					this.getAllChildren(node.child(index), results, indent)
				}

				break
			case 'pair':
				previousNode = node.childForFieldName(':')
				if (node != null) {
					const range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column)
					results.push(vscode.TextEdit.replace(range, ': '))
				}

				break
			case ',':

				break
			default:
				return
		}


		// if (node.parent != null)
		// 	if (node.parent.type == 'object' || node.parent.type == 'array') {
		// 		if (node.previousSibling != null) {
		// 			let whiteSpace

		// 			const range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column)

		// 			if (node.type == ',')
		// 				whiteSpace = ''
		// 			else if (node.parent.childCount < 5)
		// 				whiteSpace = ' '
		// 			else {
		// 				if (node.type != '}' && node.type != ']')
		// 					indent++
		// 				whiteSpace = '\n' + new Array(indent + 1).join('\t')
		// 			}


		// 			results.push(vscode.TextEdit.replace(range, whiteSpace))
		// 		}
		// 	}
		// 	else if (node.parent.type == 'pair') {
		// 		let whiteSpace

		// 		if (node.type == ':')
		// 			whiteSpace = ''
		// 		else if (node.previousSibling.type == ':')
		// 			whiteSpace = ' '

		// 		if (whiteSpace != null) {
		// 			const range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column)
		// 			results.push(vscode.TextEdit.replace(range, whiteSpace))
		// 		}
		// 	}



	},
	async getAllChildren3(node, results, indent) {

		if (node.parent != null)
			if (node.parent.type == 'object' || node.parent.type == 'array') {
				if (node.previousSibling != null) {
					let whiteSpace

					const range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column)

					if (node.type == ',')
						whiteSpace = ''
					// else if (node.parent.childCount < 5 && (node.childForFieldName('value') != null && (node.childForFieldName('value').type != 'object' || node.childForFieldName('value').type != 'array'))) {
					else if (node.parent.childCount < 5 && ((node.childForFieldName('value') != null && node.childForFieldName('value').type == 'string') || (node.previousSibling.childForFieldName('value') != null && node.previousSibling.childForFieldName('value').type == 'string'))) {
						whiteSpace = ' '
						// if (node.childForFieldName('value'))
						// vscode.window.showInformationMessage(JSON.stringify(node.childForFieldName('value')))
					} else {
						if (node.type != '}' && node.type != ']')
							indent++
						whiteSpace = '\n' + new Array(indent + 1).join('\t')
					}


					results.push(vscode.TextEdit.replace(range, whiteSpace))
				}
			}
			else if (node.parent.type == 'pair') {
				let whiteSpace

				if (node.type == ':')
					whiteSpace = ''
				else if (node.previousSibling.type == ':')
					whiteSpace = ' '

				if (whiteSpace != null) {
					const range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column)
					results.push(vscode.TextEdit.replace(range, whiteSpace))
				}
			}


		for (let index = 0; index < node.childCount; index++) {
			this.getAllChildren(node.child(index), results, indent)
		}

		// if (node.childCount == 0) {
		// 	// const range = new vscode.Range(node.startPosition.row, node.startPosition.column, node.endPosition.row, node.endPosition.column)
		// 	const position = new vscode.Position(node.startPosition.row, node.startPosition.column)
		// 	// results.push(new vscode.TextEdit(range, "node.text"))
		// 	results.push(vscode.TextEdit.insert(position, node.text))
		// }

		// vscode.window.showInformationMessage(JSON.stringify(node.toString()))
	}
}

exports.DocumentFormattingEditProvider = DocumentFormattingEditProvider
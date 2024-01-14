import * as vscode from 'vscode';
import { getTree, getTrees, getRegexNode, toRange, toPoint, queryForPosition } from "./TreeSitter";
import { SyntaxNode } from 'web-tree-sitter';
import { _object_ } from './extension';


const SymbolKind: _object_ = {
	// 'File': vscode.SymbolKind.File,
	// 'Module': vscode.SymbolKind.Module,
	// 'Namespace': vscode.SymbolKind.Namespace,
	// 'Package': vscode.SymbolKind.Package,
	// 'Class': vscode.SymbolKind.Class,
	// 'Method': vscode.SymbolKind.Method,
	// 'Property': vscode.SymbolKind.Property,
	// 'Field': vscode.SymbolKind.Field,
	// 'Constructor': vscode.SymbolKind.Constructor,
	// 'Enum': vscode.SymbolKind.Enum,
	// 'Interface': vscode.SymbolKind.Interface,
	// 'Function': vscode.SymbolKind.Function,
	// 'Variable': vscode.SymbolKind.Variable,
	// 'Constant': vscode.SymbolKind.Constant,
	// 'String': vscode.SymbolKind.String,
	// 'Number': vscode.SymbolKind.Number,
	// 'Boolean': vscode.SymbolKind.Boolean,
	// 'Array': vscode.SymbolKind.Array,
	// 'Object': vscode.SymbolKind.Object,
	// 'Key': vscode.SymbolKind.String,
	// 'Null': vscode.SymbolKind.Null,
	// 'EnumMember': vscode.SymbolKind.EnumMember,
	// 'Struct': vscode.SymbolKind.Struct,
	// 'Event': vscode.SymbolKind.Event,
	// 'Operator': vscode.SymbolKind.Operator,
	// 'TypeParameter': vscode.SymbolKind.TypeParameter,
	
	'json': vscode.SymbolKind.File,
	
	'patterns': vscode.SymbolKind.Array,
	'pattern': vscode.SymbolKind.Number,
	
	'repository': vscode.SymbolKind.Object,
	'repo': vscode.SymbolKind.Function,
	
	'captures': vscode.SymbolKind.Field,
	'beginCaptures': vscode.SymbolKind.Field,
	'endCaptures': vscode.SymbolKind.Field,
	'capture': vscode.SymbolKind.Number,
	
	'match': vscode.SymbolKind.String,
	'begin': vscode.SymbolKind.String,
	'end': vscode.SymbolKind.String,
	'while': vscode.SymbolKind.String,
	
	'scopeName': vscode.SymbolKind.String,
	'name_scope': vscode.SymbolKind.String,
	'name': vscode.SymbolKind.String,
	
	'version': vscode.SymbolKind.String,
	'schema': vscode.SymbolKind.String,
	'fileTypes': vscode.SymbolKind.String,
	'firstLineMatch': vscode.SymbolKind.String,
	'foldingStartMarker': vscode.SymbolKind.String,
	'foldingStopMarker': vscode.SymbolKind.String,
	'uuid': vscode.SymbolKind.Number,
	
	'injectionSelector': vscode.SymbolKind.String,
	'injections': vscode.SymbolKind.Object,
	'injection': vscode.SymbolKind.Number,
	
	'include': vscode.SymbolKind.Variable,
	
	'comment': vscode.SymbolKind.String,
	'comment_slash': vscode.SymbolKind.String,
	
	'object': vscode.SymbolKind.Object,
	'array': vscode.SymbolKind.Array,
	'item': vscode.SymbolKind.String,
	'value': vscode.SymbolKind.Key,
	'key': vscode.SymbolKind.Property,
	
	'boolean': vscode.SymbolKind.Boolean,
	'null': vscode.SymbolKind.Null,
	'integer': vscode.SymbolKind.Number,
	'string': vscode.SymbolKind.String,
	'regex': vscode.SymbolKind.Event,
	
	'{': vscode.SymbolKind.Object,
	'}': vscode.SymbolKind.Object,
	'[': vscode.SymbolKind.Array,
	']': vscode.SymbolKind.Array,
	',': vscode.SymbolKind.Property,
	':': vscode.SymbolKind.Property,
	'"': vscode.SymbolKind.Property,
}

export const DocumentSymbolProvider = {
	async provideDocumentSymbols(document: vscode.TextDocument) {



		// const tree = getTree(document)
		const symbols: vscode.DocumentSymbol[] = [];

		if (true) {
			const tree = getTree(document);
			this.getAllChildren(tree.rootNode, symbols, document)
		}
		else if (false) {
			let i = 0
			for (const symbol in SymbolKind) {
				const documentSymbol = new vscode.DocumentSymbol(
					symbol,
					SymbolKind[symbol].toString(),
					SymbolKind[symbol],
					new vscode.Range(i, 0, i, 1),
					new vscode.Range(i, 0, i, 1)
				)
				symbols.push(documentSymbol)
				i++
			}
		}
		else if (true) {
			const regexTrees = getTrees(document).regexTrees;
			for (const regexTree in regexTrees) {
				this.getAllChildren(regexTrees[regexTree].rootNode, symbols, document)
			}
		}

		// vscode.window.showInformationMessage(JSON.stringify(symbols))
		return symbols
	},
	async getAllChildren(node: SyntaxNode, symbols: vscode.DocumentSymbol[], document: vscode.TextDocument) {


		let symbolsChildren: vscode.DocumentSymbol[] = [];


		let documentSymbol: vscode.DocumentSymbol
		if (true) {
			// for (let index = 0; index < node.namedChildCount; index++)
				// this.getAllChildren(node.namedChild(index), symbolsChildren)
			for (let index = 0; index < node.childCount; index++)
				this.getAllChildren(node.child(index), symbolsChildren, document)
			// let text
			// switch (node.type) {
			// 	case 'document': text = ' '; break
			// 	case 'object': text = '{}'; break
			// 	case 'array': text = '[]'; break
			// 	case 'pair': text = ':'; break
			// 	case 'string_content': text = ''; break
			// 	default: text = node.text
			// }
			// const field = node.walk().currentFieldName()
			// const range = new vscode.Range(node.startPosition.row, node.startPosition.column, node.endPosition.row, node.endPosition.column)
			const range = toRange(node)
			documentSymbol = new vscode.DocumentSymbol(
				node.type ? node.type : "",
				node.text ? node.text.slice(0, 1000) : " ",
				node.isNamed() ? vscode.SymbolKind.Method : vscode.SymbolKind.Field,
				range,
				range
			)
		} else {
			for (let index = 0; index < node.namedChildCount; index++)
				this.getAllChildren(node.namedChild(index), symbolsChildren, document)

			let name = ''
			switch (node.type) {
				case 'pattern':
				case 'injection':
					name = node.parent.namedChildren.map(function (e: { id: any; }) {
						return e.id;
					}).indexOf(node.id).toString()
					break
				case 'repo':
				case 'capture':
					name = node.firstNamedChild.text
					break
				case 'name_scope':
					name = 'name'
					break
				case 'value':
					name = node.text
					break
				case 'regex':
					node = getRegexNode(document, node);
					for (const regexChildNode of node.namedChildren) {
						this.getAllChildren(regexChildNode, symbolsChildren, document);
					}
					break;
			}
			if (name == '')
				name = node.type
			
			// const range = new vscode.Range(node.startPosition.row, node.startPosition.column, node.endPosition.row, node.endPosition.column)
			const range = toRange(node)
			documentSymbol = new vscode.DocumentSymbol(
				name,
				node.text ? node.text.slice(0, 1000) : ' ',
				SymbolKind[node.type],
				range,
				range
			)
		}

		documentSymbol.children = symbolsChildren
		symbols.push(documentSymbol)
	}
}
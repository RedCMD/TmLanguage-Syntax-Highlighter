import * as vscode from 'vscode';
import { getTrees, getRegexNode, toRange } from "../TreeSitter";
import { SyntaxNode } from 'web-tree-sitter';


export const SymbolKind: { [key: string]: vscode.SymbolKind; } = {
	/*
		'File': vscode.SymbolKind.File,
		'Module': vscode.SymbolKind.Module,
		'Namespace': vscode.SymbolKind.Namespace,
		'Package': vscode.SymbolKind.Package,
		'Class': vscode.SymbolKind.Class,
		'Method': vscode.SymbolKind.Method,
		'Property': vscode.SymbolKind.Property,
		'Field': vscode.SymbolKind.Field,
		'Constructor': vscode.SymbolKind.Constructor,
		'Enum': vscode.SymbolKind.Enum,
		'Interface': vscode.SymbolKind.Interface,
		'Function': vscode.SymbolKind.Function,
		'Variable': vscode.SymbolKind.Variable,
		'Constant': vscode.SymbolKind.Constant,
		'String': vscode.SymbolKind.String,
		'Number': vscode.SymbolKind.Number,
		'Boolean': vscode.SymbolKind.Boolean,
		'Array': vscode.SymbolKind.Array,
		'Object': vscode.SymbolKind.Object,
		'Key': vscode.SymbolKind.String,
		'Null': vscode.SymbolKind.Null,
		'EnumMember': vscode.SymbolKind.EnumMember,
		'Struct': vscode.SymbolKind.Struct,
		'Event': vscode.SymbolKind.Event,
		'Operator': vscode.SymbolKind.Operator,
		'TypeParameter': vscode.SymbolKind.TypeParameter,
	*/

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

	'scopeName': vscode.SymbolKind.Variable,
	'name': vscode.SymbolKind.String,
	'name_display': vscode.SymbolKind.String,

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
	
	'literal': vscode.SymbolKind.String,
	'backslash': vscode.SymbolKind.Property,
}


export const DocumentSymbolProvider: vscode.DocumentSymbolProvider = {
	provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.DocumentSymbol[] {
		// vscode.window.showInformationMessage(JSON.stringify("documentSymbol"));
		const trees = getTrees(document);
		const tree = trees.jsonTree;

		let node = tree.rootNode;
		let index = 0;
		let documentSymbol: vscode.DocumentSymbol = newDocumentSymbol(node);
		const nodeStack: SyntaxNode[] = [];
		const indexStack: number[] = [];
		const documentSymbolStack: vscode.DocumentSymbol[] = [];

		while (true) {
			// let childNode = node.child(index);
			let childNode = node.namedChild(index);

			if (!childNode) {
				node = nodeStack.pop();
				if (node === undefined) {
					break;
				}
				index = indexStack.pop();
				index++;
				const tempSymbol = documentSymbolStack.pop();
				tempSymbol.children.push(documentSymbol);
				documentSymbol = tempSymbol;
				continue;
			}


			if (childNode.type == 'regex') {
				childNode = getRegexNode(trees, childNode) ?? childNode;
				// childNode = regexTrees[childNode.id]?.rootNode ?? childNode;
			}

			// if (childNode.childCount && indexStack.length < 900) { // StackOverFlow
			if (childNode.namedChildCount && indexStack.length < 900) { // StackOverFlow
				nodeStack.push(node);
				indexStack.push(index);
				documentSymbolStack.push(documentSymbol);
				documentSymbol = newDocumentSymbol(childNode);
				node = childNode;
				index = 0;
				continue;
			}

			documentSymbol.children.push(newDocumentSymbol(childNode));
			index++;
		}

		return [documentSymbol];
	},
}

function newDocumentSymbol(node: SyntaxNode): vscode.DocumentSymbol {
	let text: string;
	switch (node.type) {
		case 'pattern':
		case 'injection':
			let index = 0;
			let sibling = node;
			while (sibling = sibling.previousNamedSibling) {
				index++;
			}
			text = index.toString();
			break;
		case 'repo':
		case 'capture':
			text = node.firstNamedChild.text;
			break;
		case 'name':
			text = 'name';
			break;
		case 'value':
			text = node.text;
			break;
	}

	const name = text?.slice(0, 50) || node.type;
	const detail = node.text.slice(0, 50);
	const kind = SymbolKind[node.type] ?? (node.isNamed ? vscode.SymbolKind.Method : vscode.SymbolKind.Field);
	const range = toRange(node);
	const selectionRange = range;
	// const selectionRange = toRange(node.firstNamedChild) ?? range;

	const documentSymbol = new vscode.DocumentSymbol(name, detail, kind, range, selectionRange);
	// vscode.window.showInformationMessage(JSON.stringify(documentSymbol));
	return documentSymbol;
}

const vscode = require("vscode");
const extension = require("./extension.js");



async function DiagnosticCollection(document, Diagnostics) {
	// vscode.window.showInformationMessage(JSON.stringify("diagnostics"))
	const { getTree } = await extension.parseTreeExtension.activate()
	const tree = await getTree(document)
	const diagnostics = []
	
	getAllChildren(tree.rootNode, diagnostics)

	// vscode.window.showInformationMessage(JSON.stringify(diagnostics))
	Diagnostics.set(document.uri, diagnostics);
}

async function getAllChildren(node, diagnostics) {
	// vscode.window.showInformationMessage(JSON.stringify(node.type))

	if (false)
		for (const childNode of node.namedChildren)
			getAllChildren(childNode, diagnostics)
	else
		for (const childNode of node.children)
			getAllChildren(childNode, diagnostics)

	if (node.type != 'ERROR')
		return

	const range = extension.nodeToVscodeRange(node)
	const diagnostic = new vscode.Diagnostic(
		range,
		`Big boi error: \`${node.text}\``,
		vscode.DiagnosticSeverity.Error
	)

	diagnostics.push(diagnostic)
}



exports.DiagnosticCollection = DiagnosticCollection
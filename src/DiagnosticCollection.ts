import * as vscode from 'vscode';
import { getTree, toRange } from "./TreeSitter";
import { DocumentSelector } from './extension';

export function initDiagnostics(context: vscode.ExtensionContext) {
	const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");

	context.subscriptions.push(DiagnosticCollection);

	vscode.window.visibleTextEditors.forEach(editor => {
		// vscode.window.showInformationMessage(JSON.stringify("visible"));
		Diagnostics(editor.document, DiagnosticCollection);
	});

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(document => {
			// vscode.window.showInformationMessage(JSON.stringify("open"));
			Diagnostics(document, DiagnosticCollection);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(edits => {
			// vscode.window.showInformationMessage(JSON.stringify("change"));
			Diagnostics(edits.document, DiagnosticCollection);
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(
			document => {
				// vscode.window.showInformationMessage(JSON.stringify("close"));
				DiagnosticCollection.delete(document.uri);
			}
		)
	);
}

function Diagnostics(document: vscode.TextDocument, Diagnostics: vscode.DiagnosticCollection) {
	if (!vscode.languages.match(DocumentSelector, document)) {
		return;
	}

	// vscode.window.showInformationMessage(JSON.stringify("diagnostics"))
	const tree = getTree(document);
	if (tree == null) {
		return;
	}

	const diagnostics = [];

	const language = tree.getLanguage()
	const query = language.query(
		`(` +
		`	(ERROR) @ERROR` +
		`)`
	);
	const queryCaptures = query.captures(tree.rootNode);

	for (const queryCapture of queryCaptures) {
		const node = queryCapture.node;
		const text = node.text;
		const range = toRange(node);
		const diagnostic = new vscode.Diagnostic(
			range,
			`JSON error: \`${text}\``,
			vscode.DiagnosticSeverity.Warning
		);
		diagnostics.push(diagnostic);
		// vscode.window.showInformationMessage(JSON.stringify(text));
	}


	// vscode.window.showInformationMessage(JSON.stringify(diagnostics))
	Diagnostics.set(document.uri, diagnostics);
}
import * as vscode from 'vscode';
import * as vscodeOniguruma from 'vscode-oniguruma';
import * as textmateOnigmo from "./Onigmo/Onigmo";


export async function initOniguruma(context: vscode.ExtensionContext): Promise<void> {
	// https://github.com/microsoft/vscode
	// https://github.com/microsoft/vscode-textmate/tree/v9.2.0
	// https://github.com/microsoft/vscode-oniguruma/tree/v1.7.0
	// https://github.com/kkos/oniguruma/tree/v6.9.8
	const uri = vscode.Uri.joinPath(context.extensionUri, 'node_modules', 'vscode-oniguruma', 'release', 'onig.wasm');
	const wasm = await vscode.workspace.fs.readFile(uri);
	const options: vscodeOniguruma.IOptions = {
		data: wasm,
		// instantiator: (imports) => WebAssembly.instantiate(wasm, imports),
		print(string: string) {
			console.log("JSON TextMate: vscodeOniguruma: ", string);
		},
	};

	await vscodeOniguruma.loadWASM(options);


	// https://github.com/textmate/textmate
	// https://github.com/textmate/Onigmo/tree/Onigmo-5.13.5
	// fork of https://github.com/k-takata/Onigmo
	// fork of https://github.com/kkos/oniguruma
	const uriOnigmo = vscode.Uri.joinPath(context.extensionUri, 'out', 'Onigmo', 'Onigmo.wasm');
	const wasmOnigmo = await vscode.workspace.fs.readFile(uriOnigmo);
	const optionsOnigmo: textmateOnigmo.IOptions = {
		data: wasmOnigmo,
		// instantiator: (imports) => WebAssembly.instantiate(wasm, imports),
		print(string: string) {
			console.log("JSON TextMate: textmateOnigmo: ", string);
		},
	};

	await textmateOnigmo.loadWASM(optionsOnigmo);
}

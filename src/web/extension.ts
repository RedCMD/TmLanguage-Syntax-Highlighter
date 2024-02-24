import * as vscode from 'vscode';
import { _object_ } from './../extension';
import { initTokenColorCustomizations } from './../tokenColorCustomizations';


export function activate(context: vscode.ExtensionContext) {
	initTokenColorCustomizations(context);
}

export function deactivate() { }
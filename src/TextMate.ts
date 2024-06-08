import * as vscode from 'vscode';
import * as vscodeTextmate from "./textmate/main";
// import * as vscodeTextmate from 'vscode-textmate';
import * as vscodeOniguruma from 'vscode-oniguruma';
import { IRelaxedExtensionManifest } from "./extensions";
import { stringify } from "./extension";
import { IGrammar } from "./ITextMate";


async function onigLibInterface() {
	return {
		createOnigScanner(sources: string[]): vscodeOniguruma.OnigScanner {
			return new vscodeOniguruma.OnigScanner(sources);
		},
		createOnigString(str: string) {
			return new vscodeOniguruma.OnigString(str);
		}
	};
}

async function loadGrammar(scopeName: string): Promise<vscodeTextmate.IRawGrammar | null> {
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.scopeName == scopeName) {
					const path = grammar.path;
					if (path) {
						const uri = vscode.Uri.joinPath(extension.extensionUri, path);
						if (uri.scheme != 'untitled') {
							const document = await vscode.workspace.openTextDocument(uri);
							const rawGrammar = vscodeTextmate.parseRawGrammar(document.getText(), uri.path);
							return rawGrammar;
						}
					}
				}
			}
		}
	}
	vscode.window.showInformationMessage(`Unknown scopeName: ${scopeName}`);
	console.log(`TextMate: Unknown scope name: ${scopeName}`);
	return null;
}

function getInjections(scopeName: string) {
	const scopeNames: string[] = [];
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				const grammarScopeName = grammar.scopeName;
				if (grammarScopeName) {
					const injectTo = grammar.injectTo;
					if (injectTo) {
						for (const injectToScopeName of injectTo) {
							if (injectToScopeName == scopeName) {
								scopeNames.push(grammarScopeName);
								break;
							}
						}
					}
				}
			}
		}
	}
	return scopeNames;
}

let registry: vscodeTextmate.Registry;
export function initTextMate(context: vscode.ExtensionContext) {
	const options: vscodeTextmate.RegistryOptions = {
		onigLib: onigLibInterface(),
		// theme: theme,
		// colorMap: colorMap,
		loadGrammar: loadGrammar,
		getInjections: getInjections,
	};

	// Create a registry that can create a grammar from a scope name.
	registry = new vscodeTextmate.Registry(options);
}

function getScopeName(lang: string): string {
	for (const extension of vscode.extensions.all) {
		const packageJSON: IRelaxedExtensionManifest = extension.packageJSON;
		const grammars = packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				if (grammar.language == lang) {
					const scopeName = grammar.scopeName;
					if (scopeName) {
						return scopeName;
					}
				}
			}
		}
	}
	return null;
}

export async function tokenizeLine(document: vscode.TextDocument, lineNumber: number) {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	const grammar = await registry.loadGrammar(scopeName);
	// vscode.window.showInformationMessage(JSON.stringify(grammar));
	// vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));

	// const text = [
	// 	`function sayHello(name) {`,
	// 	`\treturn "Hello, " + name;`,
	// 	`}`
	// ];
	// const text = document.getText();

	let tokenLineResult;
	let ruleStack = vscodeTextmate.INITIAL;
	for (let i = 0; i <= lineNumber; i++) {
		const line = document.lineAt(i).text;
		// const line = text[i];
		// vscode.window.showInformationMessage(JSON.stringify(ruleStack));
		// const lineTokens = tokenizeLine(grammar, line, ruleStack);
		const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
		// vscode.window.showInformationMessage(JSON.stringify(lineTokens));
		// console.log(`\nTokenizing line: ${line}`);
		// for (let j = 0; j < lineTokens.tokens.length; j++) {
		// 	const token = lineTokens.tokens[j];
		// 	console.log(` - token from ${token.startIndex} to ${token.endIndex} ` +
		// 		`(${line.substring(token.startIndex, token.endIndex)}) ` +
		// 		`with scopes ${token.scopes.join(', ')}`
		// 	);
		// }
		ruleStack = lineTokens.ruleStack;
		tokenLineResult = lineTokens;
	}


	// vscode.window.showInformationMessage(stringifyMaxDepth(grammar._ruleId2desc, 6));
	// @ts-ignore
	// vscode.window.showInformationMessage(JSON.stringify((grammar as Grammar)._ruleId2desc, stringify));
	// vscode.window.showInformationMessage(JSON.stringify(ruleStack, stringify));
	return tokenLineResult;
}


export async function tokenizeFile(document: vscode.TextDocument, runTwice?: boolean): Promise<IGrammar> {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	// const grammar = await registry.loadGrammar(scopeName);

	const grammar = <IGrammar>await registry.loadGrammar(scopeName);
	// Very hacky, assigns array so `_tokenizeString()` can add rules to it
	grammar.rules = [];
	grammar.lines = [];

	let ruleStack = vscodeTextmate.INITIAL;
	// cache rules for more accurate debug timing
	if (runTwice) {
		for (let i = 0; i < document.lineCount; i++) {
			ruleStack = grammar.tokenizeLine(document.lineAt(i).text, ruleStack, 15000).ruleStack;
		}
		grammar.rules = [];
		// vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
	}
	let rulesLength = 0;
	ruleStack = vscodeTextmate.INITIAL;
	const startTime = performance.now();
	grammar.startTime = startTime;
	for (let i = 0; i < document.lineCount; i++) {
		// vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
		const line = document.lineAt(i).text;

		const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
		// grammar.rules.pop();
		grammar.rules.push(undefined);
		ruleStack = lineTokens.ruleStack;
		grammar.lines.push(
			{
				tokens: lineTokens.tokens,
				stoppedEarly: lineTokens.stoppedEarly,
				time: performance.now() - startTime,
				// @ts-ignore
				lastRule: ruleStack.ruleId || 1,
				rulesLength: rulesLength,
			}
		);
		rulesLength = grammar.rules.length;
		// tokenLineResults.push(
		// 	{
		// 		tokens: lineTokens.tokens,
		// 		ruleStack: structuredClone(lineTokens.ruleStack),
		// 		stoppedEarly: lineTokens.stoppedEarly,
		// 	}
		// );
		// vscode.window.showInformationMessage(JSON.stringify(ruleStack, stringify));
	}

	try {
		// vscode.window.showInformationMessage(JSON.stringify(registry, stringify));
		vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
		// vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));
	} catch (error) {
		vscode.window.showInformationMessage(JSON.stringify(error));
	}

	// return tokenLineResults;
	return grammar;
}

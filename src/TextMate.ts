import * as vscode from 'vscode';
import * as vscodeTextmate from "./textmate/main";
// import * as vscodeTextmate from 'vscode-textmate';
import * as vscodeOniguruma from 'vscode-oniguruma';
import { IRelaxedExtension } from "./extensions";
import { stringify } from "./extension";
import { IGrammar, ScopeName } from "./ITextMate";

// Development Extensions are higher than User Extensions, which are higher than BuiltIn Extensions
enum priority {
	dev = -1,
	user = 0,
	builtIn = 1,
}

type grammar = {
	grammarPath: string;
	extensionUri: vscode.Uri | null;
	uri: vscode.Uri | null;
	injectionScopes: ScopeName[];
};

export const grammarLanguages: {
	languageId: {
		[id: string]: {
			scopeName: ScopeName;
			priority: priority;
			grammar: grammar;
		};
	};
	scopeName: { [name: ScopeName]: grammar; };
} = {
	languageId: {},
	scopeName: {},
};

function parseExtensions() {
	for (const extension of vscode.extensions.all as IRelaxedExtension[]) {
		// if (extension?.isActive === false) {
		// 	continue;
		// }
		const builtIn = extension.packageJSON.isBuiltin; // Lower priority
		const dev = extension.packageJSON.isUnderDevelopment; // Higher priority
		const priority = dev ? -1 : builtIn ? 1 : 0;
		const grammars = extension.packageJSON.contributes?.grammars;
		if (grammars) {
			for (const grammar of grammars) {
				const scopeName = grammar.scopeName;
				if (scopeName) {
					const path = grammar.path;
					if (path) {
						const extensionUri = extension.extensionUri;
						const uri = vscode.Uri.joinPath(extensionUri, path);
						if (uri.scheme == 'untitled') {
							vscode.window.showWarningMessage(`TextMate: Invalid grammar path: ${path} in ${extensionUri.fsPath}`);
							console.log(`TextMate: Invalid grammar path: ${path} in ${extensionUri.fsPath}`);
						}
						grammarLanguages.scopeName[scopeName] = {
							grammarPath: path,
							extensionUri: extension.extensionUri,
							uri: uri,
							injectionScopes: grammarLanguages.scopeName[scopeName]?.injectionScopes ?? [],
						};

						const injectTo = grammar.injectTo;
						if (injectTo) {
							for (const injectToScopeName of injectTo) {
								if (!grammarLanguages.scopeName[injectToScopeName]) {
									grammarLanguages.scopeName[injectToScopeName] = {
										grammarPath: '',
										extensionUri: null,
										uri: null,
										injectionScopes: [],
									};
								}
								const injectionScopes = grammarLanguages.scopeName[injectToScopeName].injectionScopes;
								injectionScopes.push(scopeName);
								grammarLanguages.scopeName[injectToScopeName].injectionScopes = injectionScopes;
							}
						}

						const language = grammar.language;
						if (language) {
							if (!grammarLanguages.languageId[language] ||
								grammarLanguages.languageId[language].priority >= priority) { // VSCode picks the last extension
								grammarLanguages.languageId[language] = {
									priority: priority,
									scopeName: scopeName,
									grammar: grammarLanguages.scopeName[scopeName],
								};
							}
						}
					}
				}
			}
		}
	}
	// vscode.window.showInformationMessage(JSON.stringify(grammarLanguages));
}


export function getScopeName(lang: string): ScopeName | null {
	// vscode.window.showInformationMessage(`getScopeName: ${lang}`);
	if (Object.keys(grammarLanguages.languageId).length == 0) {
		parseExtensions();
	}

	return grammarLanguages.languageId[lang]?.scopeName;
}

async function loadGrammar(scopeName: ScopeName): Promise<vscodeTextmate.IRawGrammar | undefined> {
	// vscode.window.showInformationMessage(`loadGrammar: ${scopeName}`);
	if (Object.keys(grammarLanguages.scopeName).length == 0) {
		parseExtensions();
	}

	const uri = grammarLanguages.scopeName[scopeName]?.uri;
	if (!uri) {
		// vscode.window.showInformationMessage(`TextMate: Unknown scopeName: ${scopeName}`);
		console.log(`TextMate: Unknown scopeName: ${scopeName}`);
		return;
	}

	// vscode.workspace.openTextDocument() is extremely slow for some reason
	const file = await vscode.workspace.fs.readFile(uri).then(null, () => { });
	if (!file) {
		vscode.window.showInformationMessage(`TextMate: Unable to load grammar:\n${uri.path}`);
		console.log(`TextMate: Unable to load grammar:\n${JSON.stringify(uri)}`);
		return;
	}
	const decoder = new TextDecoder(); // Works in VSCode web
	const text = decoder.decode(file);

	const rawGrammar = vscodeTextmate.parseRawGrammar(text, uri.path);
	return rawGrammar;
}

function getInjections(scopeName: ScopeName): ScopeName[] | undefined {
	// vscode.window.showInformationMessage(`getInjections: ${scopeName}`);
	if (activeScopeName && activeScopeName != scopeName) {
		// Only 'root' level scopeNames can be targeted by `injectTo` injection
		return;
	}

	if (Object.keys(grammarLanguages.scopeName).length == 0) {
		parseExtensions();
	}

	// https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/textMate/common/TMGrammarFactory.ts#L62-L70
	let injections: ScopeName[] = [];
	const scopeParts = scopeName.split('.');
	for (let i = 1; i <= scopeParts.length; i++) { // order matters
		const subScopeName = scopeParts.slice(0, i).join('.');
		injections = [...injections, ...(grammarLanguages.scopeName[subScopeName]?.injectionScopes || [])];
	}

	if (injections.length) {
		// vscode.window.showInformationMessage(`injections:\n${JSON.stringify(injections)}`);
		return injections;
	}
}


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

let registry: vscodeTextmate.Registry;
export function initTextMate(context: vscode.ExtensionContext) {
	parseExtensions();

	context.subscriptions.push(vscode.extensions.onDidChange(parseExtensions));

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


export async function tokenizeLine(document: vscode.TextDocument, lineNumber: number) {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	const grammar = await registry.loadGrammar(scopeName ?? '');
	if (!grammar) {
		return;
	}
	// vscode.window.showInformationMessage(JSON.stringify(grammar));
	// vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));

	// const text = [
	// 	`function sayHello(name) {`,
	// 	`\treturn "Hello, " + name;`,
	// 	`}`
	// ];
	// const text = document.getText();

	let tokenLineResult: vscodeTextmate.ITokenizeLineResult;
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

let activeScopeName: ScopeName | null;
export async function tokenizeFile(document: vscode.TextDocument, runTwice?: boolean): Promise<IGrammar> {
	const lang = document.languageId;
	const scopeName = getScopeName(lang);
	// const grammar = await registry.loadGrammar(scopeName);

	// const start = performance.now();
	activeScopeName = scopeName;
	const grammar = <IGrammar>await registry.loadGrammar(scopeName ?? '').catch(error =>
		console.log("JSON TextMate: Invalid grammar for scopeName:", scopeName, '\n', error)
	);
	activeScopeName = null;
	if (!grammar) {
		vscode.window.showInformationMessage(`registered_languages:\n${JSON.stringify(grammarLanguages)}`);
		return grammar; // yes `grammar` is `never` at this point
	}
	// vscode.window.showInformationMessage(`grammar ${performance.now() - start}ms`);


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

	// vscode.window.showInformationMessage(JSON.stringify(registry, stringify));
	// vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));
	// return tokenLineResults;
	return grammar;
}

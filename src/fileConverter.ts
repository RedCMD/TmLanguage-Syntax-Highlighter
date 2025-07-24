import * as vscode from 'vscode';
import * as YAML from 'yaml';
import * as XML from 'plist';
import * as CSON from 'cson-parser';
import * as DATE from 'date-and-time';


export function initFileConverter(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('extension.convertFileToJSON', async (editor: vscode.TextEditor) => await convertFileTo('JSON', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToYAML', async (editor: vscode.TextEditor) => await convertFileTo('YAML', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToXML', async (editor: vscode.TextEditor) => await convertFileTo('XML', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToPLIST', async (editor: vscode.TextEditor) => await convertFileTo('ASCII', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToCSON', async (editor: vscode.TextEditor) => await convertFileTo('CSON', editor.document)),
	);
}

type Language = 'JSON' | 'YAML' | 'XML' | 'ASCII' | 'CSON';
async function convertFileTo(newLanguage: Language, document?: vscode.TextDocument) {
	if (!document) {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) {
			throw new Error(`TextMate: no document to convert from`);
		}
		document = activeTextEditor.document;
	}

	let parsedDocument: any;
	const text = document.getText();
	const rankedLanguages = rankLanguages(document);
	for (const language of rankedLanguages) {
		try {
			switch (language) {
				case 'JSON':
					parsedDocument = JSON.parse(text);
					break;
				case 'YAML':
					parsedDocument = YAML.parse(text);
					break;
				case 'XML':
					parsedDocument = XML.parse(text);
					break;
				case 'ASCII':
					parsedDocument = parseAsciiPLIST(text);
					break;
				case 'CSON':
					if (!CSON.parse) {
						vscode.window.showWarningMessage("TextMate: CSON conversion not available in VSCode Web atm");
						break;
					}
					parsedDocument = CSON.parse(text);
					break;
			}
		} catch (error: any) {
			vscode.window.showWarningMessage(`TextMate: Error converting file from ${language}:\n${error.toString()}`);
		}
		// console.log(`parsedDocument: ${language}\n`, parsedDocument);
		if (parsedDocument != null) {
			break;
		}
	}

	if (parsedDocument == null) {
		return;
	}

	const documentLanguage = {
		JSON: 'json-textmate',
		YAML: 'yaml-textmate',
		XML: 'xml',
		ASCII: 'ascii-textmate',
		CSON: 'coffeescript',
	}[newLanguage];
	const editorConfig = vscode.workspace.getConfiguration('editor', { languageId: documentLanguage });
	const tabSize = editorConfig.get<number>('tabSize') ?? 4;
	const insertSpaces = editorConfig.get<boolean>('insertSpaces');
	const indent = insertSpaces ? ''.padEnd(tabSize, ' ') : '\t';

	let newText: string;
	try {
		switch (newLanguage) {
			case 'JSON':
				newText = JSON.stringify(parsedDocument, null, indent);
				break;
			case 'YAML':
				newText = YAML.stringify(parsedDocument, {
					keepUndefined: true,
					indent: tabSize,
				});
				break;
			case 'XML':
				newText = XML.build(parsedDocument, { indent: indent });
				break;
			case 'ASCII':
				newText = stringifyAsciiPLIST(parsedDocument, indent);
				break;
			case 'CSON':
				if (!CSON.stringify) {
					vscode.window.showWarningMessage("TextMate: CSON conversion not available in VSCode Web atm");
					return;
				}
				newText = CSON.stringify(parsedDocument, undefined, indent);
				break;
			default:
				return;
		}
	} catch (error: any) {
		vscode.window.showWarningMessage(`TextMate: Error converting file to ${newLanguage}:\n${error.toString()}`);
		return;
	}

	const newDocument = await vscode.workspace.openTextDocument({ content: newText, language: documentLanguage });
	const options: vscode.TextDocumentShowOptions = {
		preview: true,
		preserveFocus: true,
	};
	await vscode.window.showTextDocument(newDocument, options);
}

function rankLanguages(document: vscode.TextDocument): Language[] {
	const languageScores: { [key in Language]: number; } = {
		JSON: 0,
		YAML: 0,
		XML: 0,
		ASCII: 0,
		CSON: 0,
	};

	const documentLanguage = document.languageId;
	if (/JSON/i.test(documentLanguage)) {
		languageScores.JSON += 10;
	}
	if (/YA?ML/i.test(documentLanguage)) {
		languageScores.YAML += 10;
	}
	if (/XML/i.test(documentLanguage)) {
		languageScores.XML += 10;
	}
	if (/ASCII-TEXTMATE/i.test(documentLanguage)) {
		languageScores.ASCII += 10;
	}
	if (/cson|coffeescript/i.test(documentLanguage)) {
		languageScores.CSON += 10;
	}

	const fileName = document.fileName;
	if (/JSON$/i.test(fileName)) {
		languageScores.JSON += 6;
	}
	if (/YA?ML/i.test(fileName)) {
		languageScores.YAML += 5;
	}
	if (/XML$/i.test(fileName)) {
		languageScores.XML += 6;
	}
	if (/PLIST$/i.test(fileName)) {
		languageScores.ASCII += 5;
	}
	if (/tmLanguage$/i.test(fileName)) {
		languageScores.XML += 2;
		languageScores.ASCII += 2;
	}
	if (/textmate$/i.test(fileName)) {
		languageScores.ASCII += 3;
	}
	if (/cson$|coffeescript$/i.test(fileName)) {
		languageScores.CSON += 6;
	}

	const text = document.getText();
	if (/^\s*{\s*$|^\s*{\s*"/i.test(text)) {
		languageScores.JSON += 2;
	}
	if (/^\s*#|^%|^\s*\w+:\s/i.test(text)) {
		languageScores.YAML += 4;
	}
	if (/^\s*{/i.test(text)) {
		languageScores.YAML += 1;
		languageScores.ASCII += 2;
	}
	if (/^\s*</i.test(text)) {
		languageScores.XML += 5;
	}
	if (/^\s*{\s*['"]?\w+['"]?\s*=/i.test(text)) {
		languageScores.ASCII += 3;
	}
	if (/^\s*#|^\s*\w+:\s/i.test(text)) {
		languageScores.CSON += 3;
	}

	for (const language in languageScores) {
		if (languageScores[language as Language] === 0) {
			delete languageScores[language as Language];
		}
	}

	const rankedLanguages = (Object.keys(languageScores) as Language[]).sort((a, b) => languageScores[b] - languageScores[a]);
	console.log('TextMate: rankedLanguages: ', rankedLanguages, ' ', languageScores);
	if (rankLanguages.length === 0) {
		vscode.window.showWarningMessage("TextMate: FileConverter:\nCannot determine document's language");
	}
	return rankedLanguages;
}



/* == ASCI PLIST == */

function stringifyAsciiPLIST(value: Value, space: string = '\t', indent: number = 0, parent?: Value): string {
	// https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/to_s.cc
	if (value == null) {
		return '';
	}
	switch (typeof value) {
		case 'string':
			// Number
			// https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/to_s.cc#L128-L129
			// Leading 0's are lost after 2 successive formats: '001' => 001 => 1
			// if (/^\d+$/.test(value)) {
			if (/^0$|^[1-9]\d*$/.test(value)) {
				return value;
			}

			// Unquoted string
			// https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/to_s.cc#L132L-141
			// if (indent === 0 && /^[A-Za-z_][A-Za-z0-9_.-]*$/.test(value)) {
			if (indent === 0 && /^[A-Za-z_][A-Za-z_.-]*$/.test(value)) {
				return value;
			}

			// Single quotes
			// https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/to_s.cc#L102
			if (!/'/.test(value) || /\\/.test(value)) {
				return `'${value.replaceAll("'", "''")}'`;
			}

			// Double quotes
			return `"${value.replaceAll(/"|\\(?=\\|")/g, "\\$&")}"`;

		case 'bigint':
		case 'number':
			return value.toString();

		case 'boolean':
			// Apple's custom plist (ascii) boolean
			return value ? ':true' : ':false';

		case 'object':
			if (value instanceof Date) {
				const dateFormatted = DATE.format(value, '@YYYY-MM-DD HH:mm:ss Z');
				return value.getUTCFullYear() < 1900 ? `'${dateFormatted}'` : `${dateFormatted}`;
			}

			if (Array.isArray(value)) {
				// https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/to_s.cc#L204-L207
				if (value.length === 0) {
					return '( )';
				}

				if (value.length === 1) {
					if (value[0] != null) {
						const firstValue = value[0];
						switch (typeof firstValue) {
							case 'object':
								if (!(firstValue instanceof Date)) {
									break;
								}
							case 'string':
							case 'bigint':
							case 'number':
							case 'boolean':
								return `( ${stringifyAsciiPLIST(firstValue)} )`;
						}
					}

				}
				return `(${value
					.map(element =>
						`\n${space.repeat(indent + 1)}${stringifyAsciiPLIST(element, space, indent + 1, value)},`
					).join('')
					}\n${space.repeat(indent)})`;
			}

			if (Object.keys(value).length === 0) {
				return '{ }';
			}
			if (Object.keys(value).length === 1 && typeof Object.values(value)[0] !== 'object') {
				return `{ ${stringifyAsciiPLIST(Object.keys(value)[0])} = ${stringifyAsciiPLIST(Object.values(value)[0], space, indent + 1, value)}; }`;
			}
			return `{${(Array.isArray(parent) || !parent) ? space.startsWith(' ') ? space.slice(1) || ' ' : space : `\n${space.repeat(indent + 1)}`}${Object.keys(value)
				.map(key =>
					`${stringifyAsciiPLIST(key)} = ${stringifyAsciiPLIST(value[key], space, indent + 1, value)};`
				).join(`\n${space.repeat(indent + 1)}`)
				}\n${space.repeat(indent)}}`;

		default:
			throw new Error(`Unsupported value type ${typeof value}`);
	}
};


type Value = Dictionary | Value[] | string | number | bigint | boolean | Date | null | undefined;
type Dictionary = {
	[key: string]: Value;
};

function backtrack(regex: RegExp, match: match): void {
	// console.log("backtrack: ", match);
	regex.lastIndex = regex.lastIndex - (match?.value.length ?? 0); // ignoring whitespace and comments
}
function nextToken(regex: RegExp, string: string): match {
	do {
		var match = regex.exec(string)!.groups as tokens;
		// console.log("match: ", regex.lastIndex, match);
		// console.log("match-stringify: ", JSON.stringify(match, stringify));
	} while (match.whitespace || match.comment);
	// const matchIndex = Object.values(match).findIndex(name => name);
	// if (matchIndex === -1) {
	// 	return null;
	// }
	// const matchKey = Object.keys(match)[matchIndex] as NonNullable<match>['key'];
	// const matchValue = Object.values(match)[matchIndex]!;
	// return { key: matchKey, value: matchValue };
	const matchedGroup = Object.entries(match).find(group => group[1]) as [NonNullable<match>['key'], string];
	if (matchedGroup === undefined) {
		return null;
	}
	return { key: matchedGroup[0], value: matchedGroup[1] };
}
function parseElement(regex: RegExp, string: string, match: match = nextToken(regex, string)): Value {
	if (!match) {
		return;
	}
	switch (match.key) {
	// case 'whitespace':
	// case 'comment':
	// case 'forwardSlash':
	// 	continue;

		case 'curlyOpen':
			const object: Dictionary = {};
			while (match = nextToken(regex, string)) {
				if (match.key === 'semiColon') {
					continue;
				}
				if (match.key === 'curlyClose') {
					break;
				}
				// backtrack(regex, match);

				const key = parseElement(regex, string, match);
				if (key == undefined) {
					break;
				}
				match = nextToken(regex, string);
				if (match?.key == 'assign') {
					match = nextToken(regex, string);
					// backtrack(regex, match);
				}
				const value = parseElement(regex, string, match);
				object[key.toString()] = value;
			};
			return object;

		case 'parenOpen':
			const array: Value[] = [];
			while (match = nextToken(regex, string)) {
				if (match.key === 'parenClose') {
					break;
				}
				if (match.key === 'comma') {
					continue;
				}
				// backtrack(regex, match);

				const element = parseElement(regex, string, match);
				if (element == undefined) {
					break;
				}
				array.push(element);
			};
			return array;

		case 'stringDouble':
			return match.value.slice(1, -1).replaceAll(/\\(\\|")/g, '$1');
		case 'stringSingle':
			return match.value.slice(1, -1).replaceAll(/''/g, "'");
		case 'stringUnquoted':
			return match.value;

		case 'float':
			return parseFloat(match.value);
		case 'integer':
			if (/^[+-]?0x/.test(match.value)) {
				return parseInt(match.value, 16);
			}
			if (/^[+-]?0\d/.test(match.value)) {
				return parseInt(match.value, 8);
			}
			if (/^[+-]?\d/.test(match.value)) {
				return parseInt(match.value, 10);
			}
			return;

		case 'boolean':
			switch (match.value) {
				case ':true':
					return true;
				case ':false':
					return false;
				default:
					return;
			}

		case 'date':
			// if (match.value.length !== 16) {
			// 	return;
			// }
			// if (!/@\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4}/.test(match.value)) {
			// 	return;
			// }
			// const groups = match.value.match(/^@(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}) (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2}) [+-](?<offset>\d{4})$/)?.groups as {
			// 	year: string;
			// 	month: string;
			// 	day: string;
			// 	hour: string;
			// 	minute: string;
			// 	second: string;
			// 	offset: string;
			// } | undefined;
			// if (!groups) {
			// 	return;
			// }
			const date = DATE.parse(match.value, '@YYYY-MM-DD HH:mm:ss Z', true);
			if (date.getUTCFullYear() < 1970) { }
			return date;

		case 'curlyClose':
		case 'parenClose':
		case 'assign':
		case 'comma':
		case 'semiColon':
			backtrack(regex, match);
		case 'invalid':
		default:
			return;
	}
}

type tokens = {
	whitespace: string | undefined;
	comment: string | undefined;
	curlyOpen: string | undefined;
	curlyClose: string | undefined;
	parenOpen: string | undefined;
	parenClose: string | undefined;
	stringDouble: string | undefined;
	stringSingle: string | undefined;
	stringUnquoted: string | undefined;
	forwardSlash: string | undefined;
	float: string | undefined;
	integer: string | undefined;
	boolean: string | undefined;
	date: string | undefined;
	assign: string | undefined;
	comma: string | undefined;
	semiColon: string | undefined;
	invalid: string | undefined;
};
type match = {
	key: keyof Omit<tokens, 'whitespace' | 'comment' | 'forwardSlash'>;
	value: string;
} | null;

/* https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/ascii.rl
 * dict:     '{' (key '=' value ';')* '}'
 * array:    '(' (element ',')* (element)? ')'
 * string:   ["] … ["] | ['] … ['] | [A-Za-z_][A-Za-z0-9_.-]*
 * integer:  ('-'|'+')? ('0x'|'0')? [0-9]+
 * float:    '-'? [0-9]* '.' [0-9]+
 * boolean:  :true | :false
 * date:     @2010-05-10 20:34:12 +0000
 */
function parseAsciiPLIST(string: string): Value {
	const regex = new RegExp(
		[
			/(?<whitespace>[ \t\r\n]+)/,
			/(?<comment>\/\/.*$|\/\*.*?\*\/)/,
			/(?<forwardSlash>\/(?!\s))/, // for some reason, Apple ignores single forward slashes before any non-whitespace token
			/(?<curlyOpen>{)/,
			/(?<curlyClose>})/,
			/(?<parenOpen>\()/,
			/(?<parenClose>\))/,
			/(?<stringDouble>"(?:\\.|[^"\\]+)*")/,
			/(?<stringSingle>'(?:''|[^']+)*')/,
			/(?<stringUnquoted>[A-Za-z_][A-Za-z0-9_.-]*)/,
			/(?<float>[+-]?\d*\.\d+)/,
			/(?<integer>[+-]?(?:0x[a-fA-F0-9]+|0[0-7]+|\d+))/,
			/(?<boolean>:true|:false)/,
			/(?<date>@\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4})/,
			/(?<assign>=)/,
			/(?<comma>,)/,
			/(?<semiColon>;)/,
			/(?<invalid>.)/,
		].map((regex: RegExp): string => regex.source).join('|'),
		'gm',
	);
	return parseElement(regex, string);
}

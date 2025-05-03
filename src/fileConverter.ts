import * as vscode from 'vscode';
import * as YAML from 'yaml';
import * as XML from 'plist';
import * as DATE from 'date-and-time';

export function initFileConverter(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('extension.convertFileToJSON', async (editor: vscode.TextEditor) => await convertFileTo('JSON', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToYAML', async (editor: vscode.TextEditor) => await convertFileTo('YAML', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToXML', async (editor: vscode.TextEditor) => await convertFileTo('XML', editor.document)),
		vscode.commands.registerTextEditorCommand('extension.convertFileToPLIST', async (editor: vscode.TextEditor) => await convertFileTo('PLIST', editor.document)),
	);
}

type Language = 'JSON' | 'YAML' | 'XML' | 'PLIST';
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
				case 'PLIST':
					parsedDocument = parseAsciiPLIST(text);
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
		PLIST: 'ascii-textmate',
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
			case 'PLIST':
				newText = stringifyAsciiPLIST(parsedDocument, indent);
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
	const languages: { [key in Language]: number; } = {
		JSON: 0,
		YAML: 0,
		XML: 0,
		PLIST: 0,
	};

	const documentLanguage = document.languageId;
	if (/JSON/i.test(documentLanguage)) {
		languages.JSON += 10;
	}
	if (/YA?ML/i.test(documentLanguage)) {
		languages.YAML += 10;
	}
	if (/XML/i.test(documentLanguage)) {
		languages.XML += 10;
	}
	if (/PLIST/i.test(documentLanguage)) {
		languages.PLIST += 10;
	}
	if (/^plaintext$/i.test(documentLanguage)) {
		languages.PLIST += 4;
	}

	const fileName = document.fileName;
	if (/JSON/i.test(fileName)) {
		languages.JSON += 5;
	}
	if (/YA?ML/i.test(fileName)) {
		languages.YAML += 5;
	}
	if (/XML/i.test(fileName)) {
		languages.XML += 5;
	}
	if (/PLIST/i.test(fileName)) {
		languages.PLIST += 5;
	}
	if (/tmLanguage$/i.test(fileName)) {
		languages.XML += 2;
		languages.PLIST += 2;
	}

	const text = document.getText();
	if (/^\s*{\s*$|^\s*{\s*"/i.test(text)) {
		languages.JSON += 2;
	}
	if (/^\s*#|^%|\w+:\s/i.test(text)) {
		languages.YAML += 4;
	}
	if (/^\s*{/i.test(text)) {
		languages.YAML += 1;
	}
	if (/^\s*</i.test(text)) {
		languages.XML += 5;
	}
	if (/^\s*{/i.test(text)) {
		languages.PLIST += 2;
	}

	const rankedLanguages = (Object.keys(languages) as Language[]).sort((a, b) => languages[b] - languages[a]);
	console.log('rankedLanguages: ', rankedLanguages, ' ', languages);
	return rankedLanguages;
}


function stringifyAsciiPLIST(value: Value, space: string = '\t', indent: number = 0, parent?: Value): string {
	if (value == null) {
		return '';
	}
	switch (typeof value) {
		case 'string':
			// Number
			if (/^[1-9]\d*$/.test(value)) {
				return value;
			}

			// Unquoted string
			if (indent === 0 && /^[A-Za-z_][A-Za-z0-9_.-]*$/.test(value)) {
				return value;
			}

			// Single quotes
			if (!/[\x00-\x1F\x7F]/.test(value) && (value.match(/'/g)?.length ?? 0) <= (value.match(/["\\]/g)?.length ?? 0)) {
				return `'${value.replaceAll("'", "''")}'`;
			}
			// Double quotes
			return JSON.stringify(value);

		case 'bigint':
		case 'number':
			return value.toString();

		case 'boolean':
			// Apple's custom plist (ascii) boolean
			return value ? ':true' : ':false';

		case 'object':
			if (Array.isArray(value)) {
				if (value.length === 0) {
					return '( )';
				}
				return `(${value
					.map(element =>
						`\n${space.repeat(indent + 1)}${stringifyAsciiPLIST(element, space, indent + 1, value)},`
					).join('')
					}\n${space.repeat(indent)})`;
			}

			if (value instanceof Date) {
				const dateFormatted = DATE.format(value, '@YYYY-MM-DD HH:mm:ss Z');
				return value.getUTCFullYear() < 1900 ? `'${dateFormatted}'` : `${dateFormatted}`;
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


type Value = Dictionary | Value[] | string | number | boolean | Date | null | undefined;
type Dictionary = {
	[key: string]: Value;
};

function backtrack(regex: RegExp, match: match): void {
	// console.log("backtrack: ", match);
	regex.lastIndex = regex.lastIndex - (match?.value.length ?? 0); // ignoring whitespace and comments
}
function nextToken(regex: RegExp, string: string): match {
	let match: tokens;
	do {
		match = regex.exec(string)?.groups as tokens;
		// console.log("match: ", regex.lastIndex, match);
		// console.log("match-stringify: ", JSON.stringify(match, stringify));
	} while (match.whitespace || match.comment);
	const matchIndex = Object.values(match).findIndex(name => name);
	if (matchIndex === -1) {
		return null;
	}
	const matchKey = Object.keys(match)[matchIndex] as NonNullable<match>['key'];
	const matchValue = Object.values(match)[matchIndex]!;
	return { key: matchKey, value: matchValue };
}
function parseElement(regex: RegExp, string: string): Value {
	let match: match;
	if (match = nextToken(regex, string)) {
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
					backtrack(regex, match);

					const key = parseElement(regex, string);
					if (key == undefined) {
						break;
					}
					match = nextToken(regex, string);
					if (match?.key !== 'assign') {
						backtrack(regex, match);
					}
					const value = parseElement(regex, string);
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
					backtrack(regex, match);

					const element = parseElement(regex, string);
					if (element == undefined) {
						break;
					}
					array.push(element);
				};
				return array;

			case 'stringDouble':
				return JSON.parse(match.value);
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
			/(?<stringDouble>"(?:[^"\\]+|\\.)*")/,
			/(?<stringSingle>'(?:[^']+|'')*')/,
			/(?<stringUnquoted>[A-Za-z_][A-Za-z0-9_.-]*)/,
			/(?<float>[+-]?\d*\.\d+)/,
			/(?<integer>[+-]?(0x[a-fA-F\d]+|0[0-7]+|\d+))/,
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

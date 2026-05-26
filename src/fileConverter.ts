import * as vscode from 'vscode';
import * as YAML from 'yaml';
import * as XML from 'plist';
import * as DATE from 'date-and-time';
import * as coffeescript from 'coffeescript';
import { stringify } from './extension';


export function initFileConverter(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		// TODO: use registerTextEditorCommand instead. https://github.com/microsoft/vscode/issues/153164
		vscode.commands.registerCommand('textmate.convertFileToJSON', async (document?: vscode.TextDocument) => await convertFileTo('JSON', document)),
		vscode.commands.registerCommand('textmate.convertFileToYAML', async (document?: vscode.TextDocument) => await convertFileTo('YAML', document)),
		vscode.commands.registerCommand('textmate.convertFileToXML', async (document?: vscode.TextDocument) => await convertFileTo('XML', document)),
		vscode.commands.registerCommand('textmate.convertFileToASCII', async (document?: vscode.TextDocument) => await convertFileTo('ASCII', document)),
		vscode.commands.registerCommand('textmate.convertFileToCSON', async (document?: vscode.TextDocument) => await convertFileTo('CSON', document)),
	);
}

type Language = 'JSON' | 'YAML' | 'XML' | 'ASCII' | 'CSON';

async function convertFileTo(newLanguage: Language, document?: vscode.TextDocument) {
	// const start = performance.now();
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
					parsedDocument = parseCSON(text);
					break;
			}
		} catch (error: any) {
			throw new Error(`TextMate: Error converting file from ${language}:\n${error.toString()}`);
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
				newText = JSON.stringify(
					parsedDocument,
					(key, value) => value instanceof RegExp ? value.source : value,
					indent
				);
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
				newText = stringifyCSON(parsedDocument, indent);
				break;
			default:
				return;
		}
	} catch (error: any) {
		throw new Error(`TextMate: Error converting file to ${newLanguage}:\n${error?.message || error.toString()}`);
	}

	const newDocument = await vscode.workspace.openTextDocument({ content: newText, language: documentLanguage });
	const options: vscode.TextDocumentShowOptions = {
		preview: true,
		preserveFocus: true,
	};
	// vscode.window.showInformationMessage(`convertFileTo ${(performance.now() - start).toFixed(3)}ms`);
	return await vscode.window.showTextDocument(newDocument, options);
}

function rankLanguages(document: vscode.TextDocument): Language[] {
	const languageScores: { [key in Language]: number; } = {
		JSON: 0,
		YAML: 0,
		XML: 0,
		ASCII: 0,
		CSON: 0,
	};

	const languageId = document.languageId;
	if (/JSON/i.test(languageId)) {
		languageScores.JSON += 10;
	}
	if (/YA?ML/i.test(languageId)) {
		languageScores.YAML += 10;
	}
	if (/XML/i.test(languageId)) {
		languageScores.XML += 10;
	}
	if (/ASCII-TEXTMATE/i.test(languageId)) {
		languageScores.ASCII += 10;
	}
	if (/cson|coffeescript/i.test(languageId)) {
		languageScores.CSON += 10;
	}

	const fileName = document.fileName;
	if (/JSON[CL]?$/i.test(fileName)) {
		languageScores.JSON += 6;
	}
	if (/YA?ML(?:-tmLanguage)?$/i.test(fileName)) {
		languageScores.YAML += 6;
	}
	if (/XML$/i.test(fileName)) {
		languageScores.XML += 6;
	}
	if (/(?:cson|coffeescript)(?:-tmLanguage)?$/i.test(fileName)) {
		languageScores.CSON += 6;
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

	const text = document.getText();
	if (/^\s*{\s*$|^\s*{\s*"/i.test(text)) {
		languageScores.JSON += 2;
	}
	if (/^\s*#|^%|^\s*\w+:\s|^---/i.test(text)) {
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
	if (/^\s*#|^\s*['"]?\w+['"]?:\s/i.test(text)) {
		languageScores.CSON += 3;
	}
	if (/^\s*\w+:\s+\[/i.test(text)) {
		languageScores.CSON += 2;
	}

	for (const language in languageScores) {
		if (languageScores[language as Language] === 0) {
			delete languageScores[language as Language];
		}
	}

	const rankedLanguages = (Object.keys(languageScores) as Language[]).sort((a, b) => languageScores[b] - languageScores[a]);
	// console.log('TextMate: FileConverter: Ranked Languages: Order: ', rankedLanguages, 'Scores: ', languageScores);
	if (rankedLanguages.length === 0) {
		throw new Error("TextMate: FileConverter:\nCannot determine document's language");
	}
	return rankedLanguages;
}


/* == ASCII PLIST == */

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
			// TextMate2.0's custom boolean
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
							if (firstValue == null) {
								break;
							}
							return `( ${stringifyAsciiPLIST(firstValue)} )`;
					}
				}
				const elements = value.map(element => `\n${space.repeat(indent + 1)}${stringifyAsciiPLIST(element, space, indent + 1, value)},`);
				return `(${elements.join('')}\n${space.repeat(indent)})`;
			}

			const keys = Object.keys(value);
			if (keys.length === 0) {
				return '{ }';
			}
			if (keys.length === 1) {
				const values = Object.values(value);
				if (typeof values[0] !== 'object') {
					return `{ ${stringifyAsciiPLIST(keys[0])} = ${stringifyAsciiPLIST(Object.values(value)[0], space, indent + 1, value)}; }`;
				}
			}
			return `{${(!parent || Array.isArray(parent)) ? space.startsWith(' ') ? space.slice(1) || ' ' : space : `\n${space.repeat(indent + 1)}`}${keys
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
	const matchedGroup = Object.entries(match).find(group => group[1]) as [NonNullable<match>['key'], string] | undefined;
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
			if (date.getUTCFullYear() < 1970) {
				// TextMate2.0 can't handle dates before 1970
			}
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
			/(?<forwardSlash>\/(?!\s))/, // TextMate2.0 doesn't backtrack matching a single forward slash when attempting to match a comment. Effectively ignores a single forward slash before any non-whitespace token
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
		].map(regex => regex.source).join('|'),
		'gm',
	);
	return parseElement(regex, string);
}


/* == CSON == */

type CSONValue = CSONDictionary | CSONValue[] | string | number | bigint | boolean | null | undefined;
type CSONDictionary = {
	[key: string]: CSONValue;
};

function stringifyCSON(value: CSONValue, indent: string = '\t', level: number = 0): string {
	switch (typeof value) {
		case 'undefined':
			return 'undefined';

		// https://github.com/jashkenas/coffeescript/blob/main/src/lexer.coffee#L1341-L1347
		case 'string':
			// Unquoted string
			if (level < 0 && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)) {
				return value;
			}

			// Heredoc
			if (value.match(/\n/)) {
				if ((value.match(/'''|(?<=')''|(?<='')'/g)?.length ?? 0) <= (value.match(/"""|(?<=")""|(?<="")"|#{/g)?.length ?? 0)) {
					// Heredoc Single quotes
					return `'''${('\n' + value).replaceAll(/\\|'''|(?<=')''|(?<='')'/g, "\\$&").replaceAll(/\r?\n|\r/g, '$&' + indent.repeat(level + 1))}\n${indent.repeat(level)}'''`;
				}

				// Heredoc Double quotes
				return `"""${('\n' + value).replaceAll(/\\|"""|(?<=")""|(?<="")"|#{/g, "\\$&").replaceAll(/\r?\n|\r/g, '$&' + indent.repeat(level + 1))}\n${indent.repeat(level)}"""`;
			}

			return ((value.match(/'/g)?.length ?? 0) <= (value.match(/"|#{/g)?.length ?? 0)
				// Single quotes
				? `'${value.replaceAll(/\\|'/g, "\\$&")}'`
				// Double quotes
				: `"${value.replaceAll(/\\|"|#{/g, "\\$&")}"`)
				.replaceAll(/[\x00-\x1F]/g, unicode => {
					const codePoint = unicode.codePointAt(0)!;
					if (codePoint <= 0x1F) {
						switch (codePoint) {
							case 0x00: return '\\0'; // null
							case 0x08: return '\\b'; // backspace
							case 0x09: return '\\t'; // tab
							case 0x0A: return '\\n'; // newline
							case 0x0B: return '\\v'; // vertical tab
							case 0x0C: return '\\f'; // form feed
							case 0x0D: return '\\r'; // carriage return
						}
					}
					// if (codePoint <= 0x7F) {
					// 	return unicode;
					// }
					if (codePoint <= 0xFF) {
						return `\\x${codePoint.toString(16).padStart(2, '0')}`;
					}
					if (codePoint <= 0xFFFF) {
						return `\\u${codePoint.toString(16).padStart(4, '0')}`;
					}
					return `\\u{${codePoint.toString(16)}}`;
				});

		case 'bigint':
		case 'number':
			return value.toString();

		case 'boolean':
			return value ? 'true' : 'false';

		case 'object':
			if (value == null) {
				return 'null';
			}

			if (value instanceof RegExp) {
				return `/${value.source}/${value.flags}`;
			}

			if (Array.isArray(value)) {
				if (value.length === 0) {
					return '[]';
				}

				if (value.length === 1) {
					const childValue = value[0];
					if (typeof childValue !== 'object'
						|| childValue === null
						|| childValue instanceof RegExp) {
						return `[ ${stringifyCSON(childValue, indent, level)} ]`;
					}
				}
				else {
					if (
						value.every(childValue =>
							typeof childValue === 'object'
							&& childValue !== null
							&& !(childValue instanceof RegExp)
							&& !Array.isArray(childValue))
					) {
						const elements = (value as CSONDictionary[]).map(childValue => {
							const inline = Object.keys(childValue).length === 1;
							const beforeIndent = inline ? ' ' : `\n${indent.repeat(level + 2)}`;
							const afterIndent = inline ? ' ' : `\n${indent.repeat(level + 1)}`;
							return `${indent.repeat(level + 1)}{${beforeIndent}${stringifyCSON(childValue, indent, level + 2)}${afterIndent}}`;
						});
						return `[\n${elements.join('\n')}\n${indent.repeat(level)}]`;
					}
				}

				const elements = value.map(element => `\n${indent.repeat(level + 1)}${stringifyCSON(element, indent, level + 1)}`);
				return `[${elements.join('')}\n${indent.repeat(level)}]`;
			}

			const entires = Object.entries(value);
			if (entires.length == 0) {
				return '{}';
			}
			if (entires.length == 1) {
				const childValue = entires[0][1];
				if (typeof childValue !== 'object'
					|| childValue == null
					|| childValue instanceof RegExp) {
					return `${stringifyCSON(entires[0][0], indent, -1)}: ${stringifyCSON(childValue, indent, level + 1)}`;
				}
			}

			return `${entires
				.map(entry => {
					const childValue = entry[1];
					const inline = typeof childValue !== 'object'
						|| childValue == null
						|| Array.isArray(childValue)
						|| Object.keys(childValue).length == 0;
					return `${stringifyCSON(entry[0], indent, -1)}:${inline ? ' ' : `\n${indent.repeat(level + 1)}`}${stringifyCSON(childValue, indent, inline ? level : level + 1)}`;
				}).join(`\n${indent.repeat(level)}`)
				}`;

		case 'function':
			return '"<function>"';
		case 'symbol':
			return '"<symbol>"';

		default:
			throw new Error(`Unsupported value type ${typeof value}`);
	}
};


function nodeTypeString(csNode: Object): string {
	return csNode.constructor.name ?? csNode.constructor.toString().match(/^function\s*([^(\s]+)/)![1];
}

function syntaxErrorMessage(csNode: coffeescript.ASTNode, msg: string) {
	const ref = csNode.locationData as coffeescript.JisonLocationData;
	const lineIdx = ref.first_line;
	const columnIdx = ref.first_column;
	let line = -1;
	let column = -1;
	if (lineIdx != null) {
		line = lineIdx + 1;
	}
	if (columnIdx != null) {
		column = columnIdx + 1;
	}
	return `Syntax error on line ${line}, column ${column}: ${msg}`;
}

function transformKey(csNode: coffeescript.ASTNode) {
	const type = nodeTypeString(csNode);
	if (type !== 'Value') {
		throw new SyntaxError(syntaxErrorMessage(csNode, `${type} used as key`));
	}
	const value = csNode.base!.value as string;
	switch (value.charAt(0)) {
		case "'":
		case '"':
			return parseString(csNode.base!);
		default:
			return value;
	}
}

function parseString(node: coffeescript.ASTNode) {
	const value = node.value as string;
	// @ts-expect-error
	switch (node.delimiter) {
		case '"':
		case "'":
			return value.slice(1, -1).replaceAll(
				/\\(?:u{[0-9A-Fa-f]+}|u[0-9A-Fa-f]{4}|x[0-9A-Fa-f]{2}|.)?/g,
				escapeString => {
					const escapeChar = escapeString.charAt(1);
					switch (escapeChar) {
						case 'u': // unicode \u0000
							const unicodeString = escapeString.charAt(2) == '{'
								? escapeString.slice(3, -1)
								: escapeString.slice(2, 6);
							const unicodeCode = parseInt(unicodeString, 16);
							return String.fromCodePoint(unicodeCode);
						case 'x': // ascii \x00
							const hexadecimalString = escapeString.slice(2, 4);
							const hexadecimalCode = parseInt(hexadecimalString, 16);
							return String.fromCodePoint(hexadecimalCode);
						case 'b': return '\b'; // backspace
						case 'f': return '\f'; // form feed
						case 'n': return '\n'; // newline
						case 'r': return '\r'; // carriage return
						case 't': return '\t'; // tab
						case 'v': return '\v'; // vertical tab
						case '0': return '\0'; // null
						default:
							return escapeChar;
					}
				}
			);
		case '/':
		case '///':
			const match = value.match(/^\/(?<pattern>.*)\/(?<flags>\w*)$/);
			return new RegExp(match!.groups!.pattern!, match!.groups!.flags!);
	// // @ts-expect-error
	// return new RegExp(node.originalValue, node.flags);
		default:
			try {
				return JSON.parse(value) as boolean | number | null;
			} catch (error: any) {
				throw new SyntaxError(syntaxErrorMessage(node, error.message));
			}
	}
}

const nodeTransforms/* : { [key: string]: TransformNode; } */ = {
	Block: function Block(node: coffeescript.ASTNode, transformNode: TransformNode) {
		const expressions = node.expressions;
		if (!expressions || expressions.length !== 1) {
			throw new SyntaxError(
				syntaxErrorMessage(node, 'One top level value expected')
			);
		}
		return transformNode(expressions[0]);
	},
	Root: function Root(node: coffeescript.ASTNode, transformNode: TransformNode) {
		const expressions = node.body!.expressions;
		if (!expressions || expressions.length !== 1) {
			throw new SyntaxError(
				syntaxErrorMessage(node, 'One top level value expected')
			);
		}
		return transformNode(expressions[0]);
	},
	Value: function Value(node: coffeescript.ASTNode, transformNode: TransformNode) {
		return transformNode(node.base!);
	},
	Bool: function Bool(node: coffeescript.ASTNode) {
		return node.val === 'true';
	},
	BooleanLiteral: function BooleanLiteral(node: coffeescript.ASTNode) {
		return node.value === 'true';
	},
	Null: function Null() {
		return null;
	},
	NullLiteral: function NullLiteral() {
		return null;
	},
	Literal: function Literal(node: coffeescript.ASTNode) {
		return parseString(node);
	},
	NumberLiteral: function NumberLiteral(node: coffeescript.ASTNode) {
		return Number(node.value);
	},
	StringLiteral: function StringLiteral(node: coffeescript.ASTNode) {
		return parseString(node);
	},
	RegexLiteral: function RegexLiteral(node: coffeescript.ASTNode) {
		return parseString(node);
	},
	Arr: function Arr(node: coffeescript.ASTNode, transformNode: TransformNode) {
		return node.objects!.map(transformNode as (csNode: coffeescript.ASTNode) => ReturnType<TransformNode>);
	},
	Obj: function Obj(node: coffeescript.ASTNode, transformNode: TransformNode, reviver: NonNullable<Parameters<typeof parseCSON>[1]>) {
		return node.properties!.reduce((outObject: { [key: string]: ReturnType<TransformNode>; }, property) => {
			const variable = property.variable;
			if (!variable) {
				return outObject;
			}

			const keyName = transformKey(variable) as string;
			const value = transformNode(property.value as coffeescript.ASTNode);
			outObject[keyName] = reviver.call(outObject, keyName, value);
			return outObject;
		}, {});
	},
	Op: function Op(node: coffeescript.ASTNode, transformNode: TransformNode) {
		if (node.second != null) {
			const left = transformNode(node.first!) as number;
			const right = transformNode(node.second) as number;
			switch (node.operator) {
				case '-':
					return left - right;
				case '+':
					return left + right;
				case '*':
					return left * right;
				case '/':
					return left / right;
				case '%':
					return left % right;
				case '&':
					return left & right;
				case '|':
					return left | right;
				case '^':
					return left ^ right;
				case '<<':
					return left << right;
				case '>>>':
					return left >>> right;
				case '>>':
					return left >> right;
				default:
					throw new SyntaxError(
						syntaxErrorMessage(node, `Unknown binary operator ${node.operator}`)
					);
			}
		} else {
			switch (node.operator) {
				case '-':
					return -(transformNode(node.first!) as number);
				case '~':
					return ~(transformNode(node.first!) as number);
				default:
					throw new SyntaxError(
						syntaxErrorMessage(node, `Unknown unary operator ${node.operator}`)
					);
			}
		}
	},
	Parens: function Parens(node: coffeescript.ASTNode, transformNode: TransformNode) {
		const expressions = node.body!.expressions as coffeescript.ASTNode[];
		if (!expressions || expressions.length !== 1) {
			throw new SyntaxError(
				syntaxErrorMessage(node, 'Parenthesis may only contain one expression')
			);
		}
		return transformNode(expressions[0]);
	},
};

function defaultReviver(key: string, value: any): any {
	return value;
}

type TransformNode = (
	csNode: coffeescript.ASTNode,
	transformNode?: TransformNode,
	reviver?: NonNullable<Parameters<typeof parseCSON>[1]>
) => string | number | boolean | RegExp | coffeescript.ASTNode | null/* ReturnType<typeof nodeTransforms[keyof typeof nodeTransforms]> */;
function parseCSON(text: string, reviver?: (this: any, key: string, value: any) => any): any {
	reviver ??= defaultReviver;
	if (typeof reviver !== 'function') {
		throw new TypeError('reviver has to be a function');
	}

	const transformNode = (csNode: coffeescript.ASTBody) => {
		const type = nodeTypeString(csNode) as keyof typeof nodeTransforms;
		const transform = nodeTransforms[type];
		if (!transform) {
			throw new SyntaxError(syntaxErrorMessage(csNode, `Unexpected ${type}`));
		}
		return transform(csNode, transformNode as TransformNode, reviver);
	};

	const coffeeAst = coffeescript.nodes(text);
	// vscode.window.showInformationMessage(JSON.stringify(coffeeAst, stringify));

	const parsed = transformNode(coffeeAst);

	const contextObj = { '': parsed };
	return reviver.call(contextObj, '', parsed);
}

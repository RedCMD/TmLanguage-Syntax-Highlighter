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

let activeDocument: vscode.TextDocument;
async function convertFileTo(newLanguage: Language, document?: vscode.TextDocument) {
	// const start = performance.now();
	if (!document) {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) {
			throw new Error(`TextMate: no document to convert from`);
		}
		document = activeTextEditor.document;
	}
	activeDocument = document;

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
					(key, value) => value instanceof RegExp ? value.source /* `/${value.source}/${value.flags}` */ : value,
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
				if (level < 0) {
					level = 0;
				}

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

function syntaxErrorCSON(csNode: ASTNode | ASTBody, errorMessage: string | Error) {
	const text = activeDocument.getText();
	const filename = activeDocument.fileName.match(/[^\\/]+$/)?.[0];

	// try {
	// 	// @ts-expect-error
	// 	return coffeescript.helpers.throwSyntaxError(message, csNode.locationData) as SyntaxError;
	// } catch (error: unknown) {
	// 	// try {
	// 	// 	// @ts-expect-error
	// 	// 	return coffeescript.helpers.updateSyntaxError(error as SyntaxError, text, filename) as SyntaxError;
	// 	// } catch (error: unknown) { }
	// }

	const location = csNode.locationData as coffeescript.JisonLocationData;
	const line = location.first_line;
	const column = location.first_column;
	const column_last = location.last_column;
	const code = text.split('\n')[line].slice(column, column_last + 1);
	const marker = '^'.repeat(column_last - column + 1);

	if (typeof errorMessage === 'string') {
		const syntaxError = new SyntaxError(`${filename}:${line + 1}:${column + 1}\n${errorMessage}\n${code}\n${marker}`);
		// @ts-expect-error
		syntaxError.location = location;
		return syntaxError;
	}

	errorMessage.message = `${errorMessage.message}\n${filename}:${line + 1}:${column + 1}\n${code}\n${marker}`;
	return errorMessage;
}

function defaultReviver(key: string, value: CSONValue) {
	return value;
}

type ASTBody = {
	body: {
		expressions: ASTNode[];
		locationData: coffeescript.LocationData;
	};
	isAsync: boolean;
	locationData: coffeescript.LocationData;
	astType: ({ }: { level: number; }) => 'File';
};
type ASTNode = {
	astType: ({ }: { level: number; }) => 'MemberExpression' | 'Program' | 'ClassBody' | 'BlockStatement' | 'BigIntLiteral' | 'NumericLiteral' | 'Identifier' | 'StringLiteral' | 'RegExpLiteral' | 'PassthroughLiteral' | 'JSXIdentifier' | 'ContinueStatement' | 'BreakStatement' | 'DebuggerStatement' | 'ThisExpression' | 'NullLiteral' | 'BooleanLiteral' | 'ReturnStatement' | 'JSXMemberExpression' | 'OptionalMemberExpression' | 'CommentBlock' | 'CommentLine' | 'JSXFragment' | 'JSXElement' | 'NewExpression' | 'OptionalCallExpression' | 'CallExpression' | 'InterpolatedRegExpLiteral' | 'TaggedTemplateExpression' | 'ObjectPattern' | 'ObjectExpression' | 'ArrayPattern' | 'ArrayExpression' | 'ClassDeclaration' | 'ClassExpression' | 'Import' | 'AssignmentPattern' | 'AssignmentExpression' | 'ClassMethod' | 'ArrowFunctionExpression' | 'FunctionExpression' | 'JSXSpreadAttribute' | 'RestElement' | 'SpreadElement' | 'WhileStatement' | 'AwaitExpression' | 'YieldExpression' | 'ChainedComparison' | 'LogicalExpression' | 'UpdateExpression' | 'UnaryExpression' | 'BinaryExpression' | 'TryStatement' | 'CatchClause' | 'ThrowStatement' | 'TemplateLiteral' | 'For' | 'SwitchStatement' | 'IfStatement' | 'ConditionalExpression' | 'SequenceExpression' | 'Parens';
	locationData: coffeescript.LocationData;
} &
	Partial<{
		array: boolean | ASTNode;
		asKey: boolean;
		args: ASTNode[];
		base: ASTNode;
		body: /* ASTBody | */ ASTNode;
		bound: boolean;
		boundFuncs: ASTNode[];
		cases: ASTNode[][];
		classBody: boolean;
		comments: string[];
		condition: ASTNode;
		context: string;
		elseBody: ASTNode | null;
		expression: ASTNode;
		expressions: ASTNode[];
		first: ASTNode;
		flip: boolean;
		generated: boolean;
		guard: ASTNode;
		index: ASTNode;
		isChain: boolean;
		isGenerator: boolean;
		isNew: boolean;
		isSuper: boolean;
		name: ASTNode;
		negated: boolean;
		object: boolean | ASTNode;
		objects: ASTNode[];
		operator: string;
		otherwise: ASTNode;
		own: boolean;
		param: boolean;
		params: ASTNode[];
		parent: ASTNode | null;
		parsedValue: any;
		pattern: boolean;
		properties: ASTNode[];
		range: boolean | coffeescript.ASTNodeRange[];
		returns: boolean;
		subject: ASTNode;
		second: ASTNode;
		soak: boolean;
		source: ASTNode;
		subpattern: boolean;
		this: boolean;
		val: string;
		value: ASTNode | string;
		variable: ASTNode;
	}>;

// type Reviver = (this: any, key: string, value: any) => any;
type ValueCSON = string | number | boolean | undefined | null | RegExp | ValueCSON[] | { [key: string]: ValueCSON; };

let activeNodeCSON: ASTNode | ASTBody;
function parseNodeCSON(csNode: ASTNode | ASTBody, reviver: (this: { [key: string]: ValueCSON; }, key: string, value: ValueCSON) => ValueCSON): ValueCSON {
	activeNodeCSON = csNode;
	const nodeType = csNode.astType({ level: 0 });
	csNode = csNode as ASTNode; // TODO: Cause TypeScript broken on astType() function return type
	switch (nodeType) {
		case 'File': // Root
			csNode = csNode as unknown as ASTBody; // TODO: Cause TypeScript broken
		/* FallThrough */
		case 'Parens':
			const expressions = csNode.body!.expressions; // Block
			if (expressions?.length === 1) {
				return parseNodeCSON(expressions[0], reviver);
			}
			throw syntaxErrorCSON(csNode, nodeType == 'File' ? 'One top level value expected' : 'Parenthesis may only contain one expression');
		case 'MemberExpression': // Value
			return parseNodeCSON(csNode.base!, reviver);
		case 'ObjectExpression': // Obj
			return csNode.objects!.reduce((outObject: { [key: string]: ValueCSON; }, node, index, array) => {
				const variable = node.variable; // Assign
				if (!variable) {
					return outObject;
				}

				const type = variable.astType({ level: 0 });
				if (type !== 'MemberExpression') { // String
					throw syntaxErrorCSON(variable, `${type} used as key`);
				}

				const keyName = parseNodeCSON(variable.base!, reviver) as string;
				const value = parseNodeCSON(node.value as ASTNode, reviver);
				outObject[keyName] = reviver.call(outObject, keyName, value);

				return outObject;
			}, {});
		case 'ArrayExpression':
			return csNode.objects!.map(value => parseNodeCSON(value, reviver));
		case 'Identifier':
			switch (csNode.constructor.name) {
				case 'InfinityLiteral':
					return Infinity;
				case 'NaNLiteral':
					return NaN;
				case 'UndefinedLiteral':
					return undefined;
				case 'PropertyName': // PropertyName: value
					return csNode.value as string;
				default:
					if ('parsedValue' in csNode) {
						return csNode.parsedValue;
					}
					if (typeof csNode.value === 'string') {
						return csNode.value;
					}
				case 'IdentifierLiteral': // variable
				case 'ComputedPropertyName': // [ComputedPropertyName]: value
				case 'DefaultLiteral': // EXPORT DEFAULT
					// console.log(JSON.stringify(csNode, stringify));
					throw syntaxErrorCSON(csNode, `Unsupported Literal type Identifier:${csNode.constructor.name}`);
			}
		case 'StringLiteral': // StringLiteral
			const string = csNode.value as string;
			return string.slice(1, -1).replaceAll(
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
		case 'RegExpLiteral':
			const regex = csNode.value as string;
			const match = regex.match(/^\/(?<pattern>.*)\/(?<flags>\w*)$/);
			return new RegExp(match!.groups!.pattern!, match!.groups!.flags!);
		case 'BigIntLiteral': // NumberLiteral
			return csNode.value as string
		case 'NumericLiteral':
			// return Number(csNode.value as string);
			// @ts-expect-error
			return coffeescript.helpers.parseNumber(csNode.value as string) as number;
		case 'BooleanLiteral':
			return csNode.value === 'true';
		case 'NullLiteral':
			return null;
		case 'PassthroughLiteral':
			if (csNode.generated) {
				return null;
			}
			return csNode.value as string;
		case 'UpdateExpression': // Op
		case 'UnaryExpression': // Op, Existence
			let value = parseNodeCSON(csNode.first!, reviver) as any;
			switch (csNode.operator) {
				case '++': return value++;
				case '--': return value--;

				case '-': return -value;
				case '~': return ~value;
			}
		/* FallThrough */
		case 'LogicalExpression': // Op
		case 'BinaryExpression': // Op
			const left = parseNodeCSON(csNode.first!, reviver) as any;
			const right = parseNodeCSON(csNode.second!, reviver) as any;
			switch (csNode.operator) {
				case '||': return left || right;
				case '&&': return left & right;
				case '?': return left ?? right;

				case '-': return left - right;
				case '+': return left + right;
				case '*': return left * right;
				case '/': return left / right;
				case '%': return left % right;
				case '&': return left & right;
				case '|': return left | right;
				case '^': return left ^ right;
				case '>': return left > right;
				case '<': return left < right;
				case '>=': return left >= right;
				case '<=': return left <= right;
				case '<<': return left << right;
				case '>>': return left >> right;
				case '===': return left === right;
				case '!==': return left !== right;
				case '>>>': return left >>> right;
				case 'in':
					if (Array.isArray(right)) {
						return right.indexOf(left) >= 0;
					}
					return left in right;

				case '//': return Math.floor(left / right);
				case '%%': return left % right;
				default:
					throw syntaxErrorCSON(csNode, `Unknown ${nodeType.replace('Expression', '')} operator ${csNode.operator}`);
			}

		default:
			if (typeof csNode.value === 'string') {
				console.warn(syntaxErrorCSON(csNode, `Unexpected node type ${nodeType}`));
				return csNode.value;
			}
			// console.log(JSON.stringify(csNode, stringify));
			throw syntaxErrorCSON(csNode, `Unexpected node type ${nodeType /* satisfies never */}`);
	}
}

function parseCSON(text: string, reviver?: (this: any, key: string, value: any) => any): any {
	reviver ??= defaultReviver;
	if (typeof reviver !== 'function') {
		throw new TypeError('reviver has to be a function');
	}

	try {
		const coffeeAst = coffeescript.nodes(text) as unknown as ASTBody;
		// vscode.window.showInformationMessage(JSON.stringify(coffeeAst, stringify));
		// vscode.window.showInformationMessage(coffeescript.compile(text));
		const parsed = parseNodeCSON(coffeeAst, reviver);
		return reviver.call({ '': parsed }, '', parsed);

	} catch (error: any) {
		if (!error.location) {
			error = syntaxErrorCSON(activeNodeCSON, error as Error);
		}
		throw error;
	}
}

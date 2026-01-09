import * as vscode from 'vscode';
import assert from 'assert';
// import Mocha from 'mocha'; // TODO: Can't get it to work in both VSCode NodeJS and VSCode Web
import { sleep, stringify, tryCatch } from '../../extension';
import { IRelaxedExtensionManifest } from '../../extensions';
import { Diagnostic } from '../../DiagnosticCollection';
import { triggerCharacters } from '../../Providers/CompletionItemProvider';

const updateTests = process.env.updateTests === "true" ? true : false;
const runTests = !updateTests;

suite('Extension Tests', async () => {
	if (runTests) {
		console.log("Start the tests!");
		vscode.window.showInformationMessage("Start the tests!");
	}
	else {
		console.log("Update the tests!");
		vscode.window.showInformationMessage("Update the tests!");
	}

	const workspaceFolders = vscode.workspace.workspaceFolders;
	assert.ok(Array.isArray(workspaceFolders));
	// Because TypeScript broken. https://github.com/microsoft/TypeScript/issues/17002
	const workspaceFolder = (workspaceFolders as readonly vscode.WorkspaceFolder[]).at(0);
	assert.ok(workspaceFolder);
	const fixturesUri = vscode.Uri.joinPath(workspaceFolder.uri, /* 'src', 'test', */ 'fixtures');
	const baselinesUri = vscode.Uri.joinPath(workspaceFolder.uri, /* 'src', 'test', */ 'baselines');

	const showTextDocumentOptions: vscode.TextDocumentShowOptions = {
		preserveFocus: false,
		preview: false,
		selection: undefined,
		viewColumn: undefined,
	};

	// Make sure to replace all instances of paths, timings, temporary codes with platform independent text
	async function assertBaseline(actual: any[], filename: string) {
		assert.ok(Array.isArray(actual), `Expected array. Got ${typeof actual}`);
		assert.ok(actual.length > 0, "Actual array was empty");
		const actualStringified = JSON.stringify(actual, null, /* '\t' */) /* + '\r\n' */;

		const file = vscode.Uri.joinPath(baselinesUri, filename);

		if (runTests) {
			const uint8Array = await vscode.workspace.fs.readFile(file);
			const decoder = new TextDecoder();
			const expectedStringified = decoder.decode(uint8Array);

			const expected: vscode.Diagnostic[] = JSON.parse(expectedStringified);
			assert.ok(Array.isArray(expected), `Expected array. Got ${typeof expected}`);
			assert.ok(expected.length > 0, "Expected array was empty. Run `npm run test:extension:update`");

			assert.equal(
				actual.length,
				expected.length,
			);
			// VSCode's IRange is presented differently compared to how its actually stored
			assert.equal(
				actualStringified,
				JSON.stringify(expected, null, /* '\t' */) /* + '\r\n' */,
			);
			assert.deepEqual(
				JSON.parse(actualStringified),
				expected,
			);
		}
		else {
			const encoder = new TextEncoder();
			const uint8Array = encoder.encode(actualStringified);
			await vscode.workspace.fs.writeFile(file, uint8Array);
		}
	}

	async function assertStrings(editor: vscode.TextEditor, assertFunction: Function) {
		const document = editor.document;
		const text = document.getText();

		const regex = /"(?:[^\x00-\x0F\\"]|\\[^\x00-\x0F])*"/g;
		let match: RegExpExecArray | null;
		while (match = regex.exec(text)) {
			const position = document.positionAt(match.index);
			const middlePosition = position.translate(0, match[0].length / 2);
			await assertFunction(middlePosition);
		}
	}

	test('Extension should activate()', async () => {
		const extension = vscode.extensions.getExtension('redcmd.tmlanguage-syntax-highlighter');
		assert.ok(extension);
		await extension.activate();
		assert.ok(extension.isActive);
		const packageJSON = extension.packageJSON as IRelaxedExtensionManifest;

		const commands = packageJSON.contributes?.commands;
		assert.ok(Array.isArray(commands));

		const registeredCommands = await vscode.commands.getCommands(true);
		for (const command of commands) {
			assert.ok(registeredCommands.includes(command.command), `Missing command: ${command.command}`);
		}

		const menus = packageJSON.contributes?.menus;
		assert.equal(typeof menus, 'object');
		for (const context in menus) {
			assert.ok(Array.isArray(menus[context]));
			for (const menu of menus[context]) {
				const command = menu.command;
				assert.ok(registeredCommands.includes(command), `Missing command: ${command}`);
			}
		}
	});

	test('Pre-load test Files', async () => {
		const files = await vscode.workspace.findFiles(
			new vscode.RelativePattern(
				workspaceFolder.uri,
				'{fixtures,baselines}/**/*'
			)
		);
		/* await */ Promise.allSettled(
			files.map(
				uri => vscode.window.showTextDocument(uri, showTextDocumentOptions)
			)
		);

		// Diagnostics can be slow
		vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, 'DiagnosticCollection.tmLanguage.json'), showTextDocumentOptions);
	});

	test('sleep()', async () => {
		const time = 50;
		const start = performance.now();
		await sleep(time);
		const end = performance.now();
		const duration = end - start;
		assert.ok(
			duration < 100 && duration > 0,
			`sleep(${time}); took: ${duration.toFixed(3)}ms`
		);
	});

	test('FileTypes', async () => {
		const files = await vscode.workspace.findFiles(new vscode.RelativePattern(fixturesUri, '**/*'));
		files.sort(); // Must be predictable
		const documents = await Promise.all(files.map(uri => vscode.workspace.openTextDocument(uri)));

		const languageIds: {
			[languageId: string]: string[];
		} = {};

		for (const document of documents) {
			const path = vscode.workspace.asRelativePath(document.uri, false);
			if (path == 'fixtures/fileTypes/ascii.tm-grammar.plist') {
				// TODO: `fixtures/fileTypes/ascii.tm-grammar.plist` should be `ascii-textmate`
				// Works correctly in vscode-web
				// Broken in VSCode desktop nodejs
				continue;
			}

			const languageId = document.languageId;
			languageIds[languageId] ??= [];
			languageIds[languageId].push(path);
		}

		await assertBaseline([languageIds], "FileTypes.json");
	});

	test('FileConverter', async () => {
		async function testFileConversion(fromFile: string, command: string, toFile?: string) {
			// const start = performance.now();
			toFile ??= fromFile;

			// const document = vscode.workspace.openTextDocument(); is slightly faster, but not as flashy ;)
			const fromEditor = await vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, fromFile), showTextDocumentOptions);
			const toEditor = await vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, toFile), showTextDocumentOptions);

			const convertedEditor = await vscode.commands.executeCommand(command, fromEditor.document) as vscode.TextEditor | undefined;
			assert.ok(convertedEditor, `Failure executing file conversion command: ${command}`);
			assert.ok(await convertedEditor.edit((editBuilder) => editBuilder.setEndOfLine(toEditor.document.eol)));

			// console.log('\n---\n');
			// console.log(`fromEditor: ${fromFile}: ${JSON.stringify(fromEditor.document.getText())}\n`);
			// console.log(`toEditor: ${toFile}: ${JSON.stringify(toEditor.document.getText())}\n`);
			// console.log(`convertedEditor: ${command}: ${JSON.stringify(convertedEditor.document.getText())}\n`);

			assert.equal(convertedEditor.document.getText().replace(/\r?\n$/, ''), toEditor.document.getText().replace(/\r?\n$/, ''), `Conversion from ${fromFile} via ${command} to ${toFile}`);

			// console.log((performance.now() - start).toFixed(), 'ms', fromFile, command, toFile);
		}

		await testFileConversion('JSON.tmLanguage.json', 'textmate.convertFileToJSON');
		await testFileConversion('YAML.tmLanguage.yaml', 'textmate.convertFileToYAML');
		await testFileConversion('ASCII.textmate', 'textmate.convertFileToASCII');

		// TODO: Conversion to XML/CSON doesn't work in VSCode Web atm
		if (typeof navigator === 'object') {
			// TODO: Conversion from CSON is buggy. skipping test
			// https://github.com/fabiospampinato/cson2json/issues/1
			// await testFileConversion('CSON.tmLanguage.cson', 'textmate.convertFileToJSON', 'JSON.tmLanguage.json');
			await testFileConversion('XML.tmLanguage', 'textmate.convertFileToJSON', 'JSON.tmLanguage.json');

			return;
		}

		await testFileConversion('CSON.tmLanguage.cson', 'textmate.convertFileToCSON');
		await testFileConversion('XML.tmLanguage', 'textmate.convertFileToXML');
	});

	test('FormatDocumentProvider', async () => {
		const editorTabs = await vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, 'DocumentFormattingEditProvider-tabs.tmLanguage.json'), showTextDocumentOptions);
		const editorSpaces = await vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, 'DocumentFormattingEditProvider-3spaces.tmLanguage.json'), showTextDocumentOptions);
		const editorUnformatted = await vscode.window.showTextDocument(vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json'), showTextDocumentOptions);

		const documentFormatting = await vscode.workspace.openTextDocument({ content: editorUnformatted.document.getText(), language: 'json-textmate', encoding: '\r\n' });
		const editorFormatting = await vscode.window.showTextDocument(documentFormatting);

		async function testFormatFile(editor: vscode.TextEditor, editsCount: number, options: vscode.FormattingOptions = { tabSize: 4, insertSpaces: false, }) {
			const edits: vscode.TextEdit[] = await vscode.commands.executeCommand(
				'_executeFormatDocumentProvider',
				editorFormatting.document.uri,
				// VSCode Web crashes without `options`
				options,
			);
			assert.ok(Array.isArray(edits));
			assert.equal(edits.length, editsCount);

			// Make sure `editor.detectIndentation` is set to false in VSCode Web
			const editorSettings = vscode.workspace.getConfiguration("editor");
			await editorSettings.update('insertSpaces', options.insertSpaces);
			await editorSettings.update('tabSize', options.tabSize);

			// TODO: TreeSitter broken. can't handle partially minified JSON
			await vscode.commands.executeCommand('editor.action.formatDocument');
			await vscode.commands.executeCommand('editor.action.formatDocument');
			assert.equal(editorFormatting.document.getText(), editor.document.getText());
		}

		await testFormatFile(editorTabs, 15);

		// Partially minify document;
		await editorFormatting.edit(
			(editBuilder) => {
				const minifiedText = editorFormatting.document.getText().replaceAll(/\s*[\r\n]+\s*/gm, '');
				editBuilder.replace(new vscode.Range(0, 0, editorFormatting.document.lineCount, 0), minifiedText + '\n');
			}
		);
		// TODO: TreeSitter broken. can't handle partially minified JSON
		await testFormatFile(editorSpaces, 34, { tabSize: 3, insertSpaces: true });

		await testFormatFile(editorTabs, 31);
	});

	test('CodeLensProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'DefinitionReferenceProvider.tmLanguage.json');
		// await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		type CodeLens = vscode.CodeLens & {
			cacheId?: number[],
			command: {
				$ident?: string;
				id?: string;
				arguments: string[];
			};
		};

		const codeLens = await vscode.commands.executeCommand('_executeCodeLensProvider', uri) as CodeLens[];
		assert.ok(Array.isArray(codeLens));
		assert.ok(codeLens.length > 0);

		const codeLensResolved = await vscode.commands.executeCommand('_executeCodeLensProvider', uri, codeLens.length) as CodeLens[];
		assert.ok(Array.isArray(codeLensResolved));
		assert.ok(codeLensResolved.length > 0);

		assert.equal(codeLensResolved.length, codeLens.length);

		codeLensResolved.forEach((codeLens) => {
			delete codeLens.cacheId;
			delete codeLens.command.$ident;
			delete codeLens.command.id;
			codeLens.command.arguments[0] = (codeLens.command.arguments[0] as string).replace(/\d+$/, '999');
		});

		await assertBaseline(codeLensResolved, 'CodeLensProvider.json');
	});

	test('DiagnosticCollection', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'DiagnosticCollection.tmLanguage.json');
		// await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		// Diagnostics can be slow
		// await sleep(250);

		const diagnosticsActual: (Diagnostic | vscode.Diagnostic)[] = vscode.languages.getDiagnostics(uri);
		assert.ok(Array.isArray(diagnosticsActual));

		// Attempt to normalise the output
		diagnosticsActual.forEach(diagnostic => {
			if ('node' in diagnostic) {
				delete diagnostic.node;
			}
			diagnostic.message = diagnostic.message.replace(/\s+\(\d+ms\)/, '');
		});
		diagnosticsActual.sort((diagnosticA, diagnosticB) => {
			if (diagnosticA.range.start.isAfter(diagnosticB.range.start)) {
				return 1;
			}
			if (diagnosticA.range.start.isBefore(diagnosticB.range.start)) {
				return -1;
			}
			if (diagnosticA.range.end.isAfter(diagnosticB.range.end)) {
				return 1;
			}
			if (diagnosticA.range.end.isBefore(diagnosticB.range.end)) {
				return -1;
			}
			if (diagnosticA.message > diagnosticB.message) {
				return 1;
			}
			if (diagnosticA.message < diagnosticB.message) {
				return -1;
			}
			return 0;
		});

		await assertBaseline(diagnosticsActual, 'DiagnosticCollection.json');
	});

	test('CodeActionsProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'DiagnosticCollection.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		type CodeAction = vscode.CodeAction & {
			cacheId?: number[];
			isAI: boolean;
			edit?: vscode.WorkspaceEdit & {
				edits: {
					resource?: vscode.Uri;
					textEdit: vscode.TextEdit;
					filename?: string;
				}[];
			};
		};

		const range = new vscode.Range(0, 0, editor.document.lineCount, 0);
		const codeActionsActual = await vscode.commands.executeCommand(
			'_executeCodeActionProvider', uri, range, /* kind, itemResolveCount */
		) as CodeAction[];

		codeActionsActual.forEach(codeAction => {
			codeAction.edit?.edits.forEach((edit) => {
				// edit.filename = edit.resource!.path.match(/[^/\\]+$/)![0];
				edit.filename = vscode.workspace.asRelativePath(edit.resource!, false);
				delete edit.resource;
			});
		});

		await assertBaseline(codeActionsActual, 'CodeActionsProvider.json');
	});

	test('DocumentSymbolProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		const documentSymbolsActual = await vscode.commands.executeCommand(
			'_executeDocumentSymbolProvider', uri
		) as vscode.DocumentSymbol[];

		await assertBaseline(documentSymbolsActual, 'DocumentSymbolProvider.json');
	});

	test('FoldingRangeProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		const foldingRangesActual = await vscode.commands.executeCommand(
			'_executeFoldingRangeProvider', uri
		) as vscode.FoldingRange[];

		await assertBaseline(foldingRangesActual, 'FoldingRangeProvider.json');
	});

	test('RenameProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'DefinitionReferenceProvider.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		type RenamePrepare = /* vscode.Range | */ {
			range: vscode.Range;
			text: string;
		};
		interface WorkspaceEdit {
			readonly size: number;
			edits: Array<IWorkspaceTextEdit /* | IWorkspaceFileEdit | ICustomEdit */>;
		}
		interface IWorkspaceTextEdit {
			resource?: vscode.Uri;
			textEdit: TextEdit & { insertAsSnippet?: boolean; keepWhitespace?: boolean; };
			versionId?: number | undefined;
			metadata?: vscode.WorkspaceEditMetadata;
			filename?: string;
		}
		interface TextEdit {
			range: IRange;
			text: string;
			// eol?: model.EndOfLineSequence;
		}
		interface IRange {
			readonly startLineNumber: number;
			readonly startColumn: number;
			readonly endLineNumber: number;
			readonly endColumn: number;
		}
		interface IPosition {
			/** line number (starts at 1) */
			readonly lineNumber: number;
			/** column (the first character in a line is between column 1 and column 2) */
			readonly column: number;
		}


		const renamesActual: {
			renamePrepare: RenamePrepare;
			workspaceEdits: WorkspaceEdit['edits'];
		}[] = [];

		async function assertRename(line: number, character: number, newName?: string): Promise<void>;
		async function assertRename(position: vscode.Position): Promise<void>;
		async function assertRename(positionOrLine: vscode.Position | number, character?: number, newName?: string) {
			const position = typeof positionOrLine == 'number' ? new vscode.Position(positionOrLine, character!) : positionOrLine;
			const renamePrepare = await tryCatch(vscode.commands.executeCommand('_executePrepareRename', uri, position)) as RenamePrepare | undefined;
			if (typeof character == 'number') {
				assert.ok(renamePrepare);
			}
			else {
				if (!renamePrepare) {
					return;
				}
			}

			if (!renamePrepare.text) {
				console.log(JSON.stringify(renamePrepare));
			}
			newName = newName || renamePrepare.text.split('').reverse().join('');
			const workspaceEdit = await vscode.commands.executeCommand('_executeDocumentRenameProvider', uri, position, newName) as WorkspaceEdit;
			const workspaceEdits = workspaceEdit.edits;

			workspaceEdits.forEach((edit) => {
				// edit.filename = edit.resource!.path.match(/[^/\\]+$/)![0];
				edit.filename = vscode.workspace.asRelativePath(edit.resource!, false);
				delete edit.resource;
			});

			renamesActual.push({ renamePrepare, workspaceEdits });

			const iPosition: IPosition = {
				lineNumber: position.line + 1,
				column: position.character + 1,
			};
			await vscode.commands.executeCommand('editor.action.rename', [uri, iPosition]);
			// TODO: VSCode doesn't allow modifying the input via tests
			await vscode.commands.executeCommand('acceptRenameInput');
		}

		const document = editor.document;
		const text = document.getText();

		await assertStrings(editor, assertRename);

		await assertRename(19, 7, "LogicalBinary");

		await assertBaseline(renamesActual, 'RenameProvider.json');

		// Document should be untouched. Since VSCode doesn't allow us to modify Rename inputs
		assert(document.getText(), text);
	});

	test('DefinitionReferenceProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'DefinitionReferenceProvider.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		type DefinitionReferenceLink = {
			originSelectionRange: vscode.DefinitionLink['originSelectionRange'];
			uri?: vscode.DefinitionLink['targetUri'];
			range: vscode.DefinitionLink['targetRange'];
			targetSelectionRange: vscode.DefinitionLink['targetSelectionRange'];
			filename?: string;
		};
		const definitionsActual: DefinitionReferenceLink[][] = [];

		async function assertDefinition(line: number, character: number): Promise<void>;
		async function assertDefinition(position: vscode.Position): Promise<void>;
		async function assertDefinition(positionOrLine: vscode.Position | number, character?: number) {
			const position = typeof positionOrLine == 'number' ? new vscode.Position(positionOrLine, character!) : positionOrLine;
			const definitions = await vscode.commands.executeCommand('_executeDefinitionProvider', uri, position) as DefinitionReferenceLink[];

			assert.ok(Array.isArray(definitions));
			if (typeof character == 'number') {
				assert.ok(definitions.length > 0, "Actual array was empty");
			}

			definitions.forEach((location) => {
				// location.filename = location.uri!.path.match(/[^/\\]+$/)![0];
				location.filename = vscode.workspace.asRelativePath(location.uri!, false);
				delete location.uri;
			});

			definitionsActual.push(definitions);
		}

		await assertStrings(editor, assertDefinition);

		await assertDefinition(22, 31);

		await assertBaseline(definitionsActual, 'DefinitionReferenceProvider.json');
	});

	test('CompletionItemProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		type CompletionList = vscode.CompletionList<vscode.CompletionItem> & {
			suggestions: (vscode.CompletionItem & {
				extensionId?: {
					value: string;
					_lower: string;
				};
				_id?: number[];
			})[];
			dispose?(): void;
			duration?: number;
		};
		const completionsActual: CompletionList[] = [];

		async function assertCompletion(line: number, character: number): Promise<void>;
		async function assertCompletion(position: vscode.Position): Promise<void>;
		async function assertCompletion(positionOrLine: vscode.Position | number, character?: number) {
			const position = typeof positionOrLine == 'number' ? new vscode.Position(positionOrLine, character!) : positionOrLine;
			const completions = await vscode.commands.executeCommand(
				'_executeCompletionItemProvider',
				uri, position, triggerCharacters.join(''), /* itemResolveCount */
			) as CompletionList;

			completions.suggestions = completions.suggestions.filter((suggestion) => {
				if (suggestion.extensionId?.value == 'vscode.json-language-features' &&
					/getcomposer|localhost/.test(suggestion.sortText ?? '')) {
					return false;
				}
				delete suggestion._id;
				return true;
			});

			completionsActual.push(completions);
		}

		await assertStrings(editor, assertCompletion);

		// await assertCompletion(22, 31);

		await assertBaseline(completionsActual, 'CompletionItemProvider.json');
	});

	test('DocumentHighlightProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		const highlightsActual: vscode.DocumentHighlight[][] = [];

		async function assertHighlight(line: number, character: number): Promise<void>;
		async function assertHighlight(position: vscode.Position): Promise<void>;
		async function assertHighlight(positionOrLine: vscode.Position | number, character?: number) {
			const position = typeof positionOrLine == 'number' ? new vscode.Position(positionOrLine, character!) : positionOrLine;
			const highlights = await vscode.commands.executeCommand(
				'_executeDocumentHighlights',
				uri, position,
			) as vscode.DocumentHighlight[];

			highlightsActual.push(highlights);
		}

		await assertStrings(editor, assertHighlight);

		// await assertHighlight(22, 31);

		await assertBaseline(highlightsActual, 'DocumentHighlightProvider.json');
	});

	test('HoverProvider', async () => {
		const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
		const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);

		const hoversActual: vscode.Hover[][] = [];

		async function assertHover(line: number, character: number): Promise<void>;
		async function assertHover(position: vscode.Position): Promise<void>;
		async function assertHover(positionOrLine: vscode.Position | number, character?: number) {
			const position = typeof positionOrLine == 'number' ? new vscode.Position(positionOrLine, character!) : positionOrLine;
			const hover = await vscode.commands.executeCommand(
				'_executeHoverProvider',
				uri, position
			) as vscode.Hover[];

			hoversActual.push(hover);
		}

		await assertStrings(editor, assertHover);

		// await assertHover(22, 31);

		await assertBaseline(hoversActual, 'HoverProvider.json');
	});

	// TODO:
	// _executeFormatOnTypeProvider
	// _executeFormatRangeProvider
	// _executeHoverProvider_recursive
	// _executePrepareCallHierarchy
	// _executeProvideIncomingCalls
	// _executeProvideOutgoingCalls
	// _executeReferenceProvider_recursive
	// _executeReferenceProvider
	// _executeSelectionRangeProvider

	// test('TextMate', async () => {
	// 	const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
	// 	const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);
	// 	const tokens = await vscode.commands.executeCommand('_workbench.captureSyntaxTokens', uri);
	// 	vscode.window.showInformationMessage(JSON.stringify(tokens));
	// });


	// test('sleep', async () => {
	// 	await sleep(10000);
	// });
});

// console.log(JSON.stringify(variable));

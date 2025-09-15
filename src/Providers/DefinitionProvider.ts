import * as vscode from 'vscode';
import * as webTreeSitter from 'web-tree-sitter';
import { DocumentSelector, stringify } from "../extension";
import { getTrees, toRange, toPoint, queryNode, trees, getLastNode } from "../TreeSitter";


let previous: {
	position: vscode.Position;
	uriString: string;
	definitions: vscode.DefinitionLink[];
};


export const DefinitionProvider: vscode.DefinitionProvider = {
	async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.DefinitionLink[] | undefined> {
		// vscode.window.showInformationMessage(JSON.stringify("Definition"));
		// const start = performance.now();

		const uriString = document.uri.toString();
		if (previous &&
			position.isEqual(previous.position) &&
			previous.uriString == uriString) {
			// vscode.window.showInformationMessage(JSON.stringify(previous));
			return previous.definitions;
		}

		const trees = getTrees(document);
		const tree = trees.jsonTree;
		const point = toPoint(position);
		// vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));

		const cursorQuery = `;scm
			(json (scopeName (value) @scopeName))
			(repo (key) @repo)
			(include (value) @include)
			(captures (capture (key) @capture))
			(beginCaptures (capture (key) @beginCapture))
			(endCaptures (capture (key) @endCapture))
			(whileCaptures (capture (key) @whileCapture))
			(name (value (scope (replace_capture) @replace)))
			(contentName (value (scope (replace_capture) @replace)))
			;(match (regex) @regex)
		`;
		const cursorCapture = queryNode(tree.rootNode, cursorQuery, point);
		// vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
		if (cursorCapture == null) {
			return;
		}
		const cursorNode = cursorCapture.node;
		// vscode.window.showInformationMessage(JSON.stringify(node));
		const originSelectionRange = toRange(cursorNode);
		if (!originSelectionRange.contains(position)) {
			return;
		}
		const cursorText = cursorNode.text;
		let queryString: string;
		// vscode.window.showInformationMessage(JSON.stringify(node.text));

		const uri = document.uri;
		const definitions: vscode.DefinitionLink[] = [];

		switch (cursorCapture.name) {
			case 'scopeName':
				for (const extension of vscode.extensions.all) {
					const grammars = extension.packageJSON?.contributes?.grammars;
					if (grammars) {
						for (const grammar of grammars) {
							if (grammar.scopeName == cursorText) {
								const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
								await vscode.workspace.openTextDocument(uri);
							}
						}
					}
				}

				const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
				if (uriPackage) {
					await vscode.workspace.openTextDocument(uriPackage);
				}

				for (const textDocument of vscode.workspace.textDocuments) {
					if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
						continue;
					}
					try {
						const packageJSON = await JSON.parse(textDocument.getText());
						const grammars = packageJSON?.contributes?.grammars;
						if (grammars) {
							for (const grammar of grammars) {
								if (grammar.scopeName == cursorText) {
									const definitionLink: vscode.DefinitionLink = {
										originSelectionRange: originSelectionRange, // Underlined text
										targetUri: textDocument.uri,
										targetRange: new vscode.Range(0, 0, textDocument.lineCount, 1000), // Hover text
										targetSelectionRange: new vscode.Range(0, 0, textDocument.lineCount + 1, 0) // Highlighted text
									};
									definitions.push(definitionLink);
								}
							}
						}
					}
					catch (error) {

					}
				}
				break;
			case 'repo':
				if (cursorText == '$self' || cursorText == '$base') {
					return;
				}
				// Call ReferenceProvider() (see at bottom)
				break;
			case 'include':
				if (cursorNode.childForFieldName('base')) { // $base
					// Call ReferenceProvider() (see at bottom)
					break;
				}

				queryString = `(json (scopeName (value) @scopeName))`;
				const rootScopeNameNode = queryNode(tree.rootNode, queryString).pop()?.node ?? null;
				const rootScopeNameText = rootScopeNameNode?.text ?? '';

				const scopeName = cursorNode.childForFieldName('scopeName')?.text ?? '';
				const ruleName = cursorNode.childForFieldName('ruleName')?.text ?? '';
				queryString = `(json (patterns) @patterns)`;
				if ((cursorNode.childForFieldName('self') && !scopeName) || (scopeName == rootScopeNameText && !ruleName)) { // $self
					const rootPatternsNode = queryNode(tree.rootNode, queryString).pop()?.node;
					if (!rootPatternsNode) {
						break;
					}
					const rootPatternsRange = toRange(rootPatternsNode);
					const targetSelectionRange = rootPatternsRange.contains(originSelectionRange) ?
						toRange(rootPatternsNode.childForFieldName('key')!) :
						rootPatternsRange;

					const locationLink: vscode.DefinitionLink = {
						originSelectionRange: originSelectionRange, // Underlined text
						targetUri: document.uri,
						targetRange: rootPatternsRange, // Hover text
						targetSelectionRange: targetSelectionRange // Highlighted text
					};
					definitions.push(locationLink);
					break;
				}
				if (!scopeName || scopeName == rootScopeNameText) { // #include
					if (!cursorNode.childForFieldName('sharp')) {
						break;
					}
					const nestedRepoQuery = `;scm
						(repo
							[(patterns) (include)] (repository
								(repo
									(key) @repo))
							!match !begin)
					`;
					const nestedRepoCaptures = queryNode(tree.rootNode, nestedRepoQuery, point, point);
					// vscode.window.showInformationMessage(`mid ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(definitions)}`);
					nestedRepoCaptures.reverse();
					let exit = false;
					for (const nestedRepoCapture of nestedRepoCaptures) {
						const nestedRepoNode = nestedRepoCapture.node;
						if (nestedRepoNode.text == ruleName) {
							exit = pushDefinitionLink(
								definitions,
								nestedRepoNode.parent,
								toRange(nestedRepoNode),
								uri,
							);
							break;
						}
					}
					if (exit) {
						break;
					}

					queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
					const rootRepoNode = queryNode(tree.rootNode, queryString).pop()?.node;
					if (rootRepoNode) {
						const locationLink: vscode.DefinitionLink = {
							originSelectionRange: originSelectionRange, // Underlined text
							targetUri: document.uri,
							targetRange: toRange(rootRepoNode.parent!), // Hover text
							targetSelectionRange: toRange(rootRepoNode), // Highlighted text
						};
						definitions.push(locationLink);
					}
					break;
				}
				for (const extension of vscode.extensions.all) { // other
					const grammars = extension.packageJSON?.contributes?.grammars;
					if (grammars) {
						for (const grammar of grammars) {
							if (grammar.scopeName == scopeName) {
								const uri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
								const document = await vscode.workspace.openTextDocument(uri);
								vscode.languages.setTextDocumentLanguage(document, 'json-textmate');
							}
						}
					}
				}
				for (const textDocument of vscode.workspace.textDocuments) { // other#include
					if (!vscode.languages.match(DocumentSelector, textDocument)) {
						continue;
					}
					const documentTree = getTrees(textDocument).jsonTree;
					queryString = `(json (scopeName (value) @scopeName (.eq? @scopeName "${scopeName}")))`;
					const documentScopeNameNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
					if (documentScopeNameNode) {
						if (ruleName) { // source.other#include
							queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
							const repoNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
							if (repoNode) {
								const locationLink: vscode.DefinitionLink = {
									originSelectionRange: originSelectionRange, // Underlined text
									targetUri: textDocument.uri,
									targetRange: toRange(repoNode.parent!), // Hover text
									targetSelectionRange: toRange(repoNode), // Highlighted text
								};
								definitions.push(locationLink);
							}
						}
						else { // source.other
							queryString = `(json (patterns) @patterns)`;
							const documentPatternsNode = queryNode(documentTree.rootNode, queryString).pop()?.node;
							const locationLink: vscode.DefinitionLink = {
								originSelectionRange: originSelectionRange, // Underlined text
								targetUri: textDocument.uri,
								targetRange: toRange(documentPatternsNode || documentScopeNameNode), // Hover text
								targetSelectionRange: toRange(documentScopeNameNode), // Highlighted text
							};
							definitions.push(locationLink);
						}
					}
				}
				break;
			case 'replace': {
				const nameNode = cursorNode.parent!.parent!.parent!;
				const quadParent = nameNode.parent!;
				const replaceGroup = (nameNode.type == 'name' ? getRegexGroup(trees, quadParent, cursorNode, 'match') : null) ?? getRegexGroup(trees, quadParent, cursorNode, 'begin');
				if (pushDefinitionLink(definitions, replaceGroup, originSelectionRange, uri)) {
					break;
				}

				const quintParent = quadParent.parent!;
				const sextParent = quintParent.parent!;

				if (quintParent.type == 'captures') {
					const matchReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'match');
					if (pushDefinitionLink(definitions, matchReplaceGroup, originSelectionRange, uri)) {
						break;
					}

					if (!sextParent.childForFieldName('begin')) {
						break;
					}
					if (!getLastNode(sextParent, 'beginCaptures')) {
						const beginReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'begin');
						pushDefinitionLink(definitions, beginReplaceGroup, originSelectionRange, uri);
					}

					if (sextParent.childForFieldName('while')) {
						if (!sextParent.childForFieldName('whileCaptures')) {
							const whileReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'while');
							pushDefinitionLink(definitions, whileReplaceGroup, originSelectionRange, uri);
						}
						break;
					}

					if (sextParent.childForFieldName('end')) {
						if (!sextParent.childForFieldName('endCaptures')) {
							const endReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'end');
							pushDefinitionLink(definitions, endReplaceGroup, originSelectionRange, uri);
						}
					}
					break;
				}

				if (quintParent.type == 'beginCaptures') {
					const beginReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'begin');
					if (pushDefinitionLink(definitions, beginReplaceGroup, originSelectionRange, uri)) {
						break;
					}
				}

				if (quintParent.type == 'endCaptures') {
					const endReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'end');
					if (pushDefinitionLink(definitions, endReplaceGroup, originSelectionRange, uri)) {
						break;
					}
				}

				if (quintParent.type == 'whileCaptures') {
					const whileReplaceGroup = getRegexGroup(trees, sextParent, cursorNode, 'while');
					if (pushDefinitionLink(definitions, whileReplaceGroup, originSelectionRange, uri)) {
						break;
					}
				}

				break;
			}
			case 'capture': {
				const tripleParent = cursorNode.parent!.parent!.parent!;

				if (tripleParent.childForFieldName('match')) {
					const matchNode = getRegexGroup(trees, tripleParent, cursorNode, 'match');
					pushDefinitionLink(definitions, matchNode, originSelectionRange, uri);
					break;
				}

				if (!tripleParent.childForFieldName('begin')) {
					break;
				}
				if (!getLastNode(tripleParent, 'beginCaptures')) {
					const beginNode = getRegexGroup(trees, tripleParent, cursorNode, 'begin');
					pushDefinitionLink(definitions, beginNode, originSelectionRange, uri);
				}

				if (tripleParent.childForFieldName('while')) {
					if (!tripleParent.childForFieldName('whileCaptures')) {
						const whileNode = getRegexGroup(trees, tripleParent, cursorNode, 'while');
						pushDefinitionLink(definitions, whileNode, originSelectionRange, uri);
					}
					break;
				}

				if (!tripleParent.childForFieldName('endCaptures')) {
					const endNode = getRegexGroup(trees, tripleParent, cursorNode, 'end');
					pushDefinitionLink(definitions, endNode, originSelectionRange, uri);
				}
				break;
			}
			case 'beginCapture':
				const beginNode = getRegexGroup(trees, cursorNode.parent!.parent!.parent!, cursorNode, 'begin');
				pushDefinitionLink(definitions, beginNode, originSelectionRange, uri);
				break;
			case 'endCapture':
				const endNode = getRegexGroup(trees, cursorNode.parent!.parent!.parent!, cursorNode, 'end');
				pushDefinitionLink(definitions, endNode, originSelectionRange, uri);
				break;
			case 'whileCapture':
				const whileNode = getRegexGroup(trees, cursorNode.parent!.parent!.parent!, cursorNode, 'while');
				pushDefinitionLink(definitions, whileNode, originSelectionRange, uri);
				break;
			case 'regex':
				const regexGroupRefs = getCaptureRefs(trees, cursorNode, position);
				if (!regexGroupRefs) {
					return;
				}
				for (const capture of regexGroupRefs.captures) {
					const targetRange = toRange(capture.node);
					const regexLocationLink: vscode.DefinitionLink = {
						originSelectionRange: regexGroupRefs.range, // Underlined text
						targetUri: document.uri,
						targetRange: targetRange, // Hover text
						targetSelectionRange: targetRange // Highlighted text
					};
					definitions.push(regexLocationLink);
				}
				return definitions;
			default:
				return;
		}


		if (definitions.length == 0) {
			// vscode will automatically run the ReferenceProvider() if the only location overlaps with the input
			pushDefinitionLink(definitions, cursorNode.parent, originSelectionRange, uri);
		}

		previous = {
			position: position,
			uriString: uriString,
			definitions: definitions,
		};
		// vscode.window.showInformationMessage(`Definitions ${(performance.now() - start).toFixed(3)}ms\n${JSON.stringify(definitions)}`);
		return definitions;
	}
};

function pushDefinitionLink(definitions: vscode.LocationLink[], node: webTreeSitter.Node | null | undefined, originSelectionRange: vscode.Range, uri: vscode.Uri) {
	if (!node) {
		return false;
	}
	const targetRange = toRange(node);
	const locationLink: vscode.DefinitionLink = {
		originSelectionRange: originSelectionRange, // Underlined text
		targetUri: uri, // Target doc
		targetRange: targetRange, // Hover text
		targetSelectionRange: targetRange // Highlighted text
	};
	definitions.push(locationLink);
	return true;
}

function getCaptureRefs(trees: trees, node: webTreeSitter.Node, position: vscode.Position) {
	const regexTrees = trees.regexTrees;
	const regexNode = regexTrees.get(node.id)?.rootNode;
	if (!regexNode) {
		return;
	}

	const captureGroupQuery = `;scm
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;

	let groupNode;
	const groupCaptures = queryNode(regexNode, captureGroupQuery);
	let index = groupCaptures.length;
	while (groupCaptures.length) {
		const captureNode = groupCaptures.pop()!.node;
		if (toRange(captureNode).contains(position)) {
			groupNode = captureNode;
			break;
		}
		index--;
	}
	vscode.window.showInformationMessage(JSON.stringify(index));
	if (!groupNode) {
		return;
	}
	const groupSyntaxQuery = `;scm
		"(" @open
		")" @close
		"(?<" @open
		"(?'" @open
		">" @close
		"'" @close
		(name) @name
	`;
	// const startPoint = toPoint(new vscode.Position(position.line, position.character - 1));
	const startPoint: webTreeSitter.Point = { row: position.line, column: position.character - 1 };
	// const endPoint = toPoint(new vscode.Position(position.line, position.character + 1));
	const endPoint: webTreeSitter.Point = { row: position.line, column: position.character + 1 };
	const groupSyntaxNode = queryNode(groupNode, groupSyntaxQuery, startPoint, endPoint).pop()?.node;

	if (!groupSyntaxNode) {
		return;
	}

	const targetQuery = `;scm
		;(regex (subroutine (number)) @subroutine)
		(regex (subroutine (number)) @subroutine (#eq? @subroutine "\\\\\\\\g<${index}>"))
	`;
	const targetCaptures = queryNode(regexNode, targetQuery);

	vscode.window.showInformationMessage(JSON.stringify(regexNode.toString()));
	vscode.window.showInformationMessage(JSON.stringify(targetCaptures));

	return { range: toRange(groupNode), captures: targetCaptures };
}

function getRegexGroup(trees: trees, parentNode: webTreeSitter.Node, captureNode: webTreeSitter.Node, type: string): webTreeSitter.Node | undefined {
	const node = getLastNode(parentNode, type);
	if (!node) {
		return;
	}
	const regexTrees = trees.regexTrees;
	const id = node.childForFieldName('regex')?.id;
	if (!id) {
		return;
	}
	const regexNode = regexTrees.get(id)?.rootNode;

	const index = parseInt(captureNode.text.replace('$', '')); // Ignores random characters after the first numerics, just like VSCode TextMate
	if (index == 0 || !regexNode) {
		return regexNode;
	}

	const query = `;scm
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
	const captures = queryNode(regexNode, query);
	return captures[index - 1]?.node;
}

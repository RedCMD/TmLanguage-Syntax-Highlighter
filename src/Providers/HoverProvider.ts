import * as vscode from 'vscode';
import { getTrees, queryNode, toPoint, toRange, trees } from "../TreeSitter";
import { Point } from 'web-tree-sitter';

export const HoverProvider: vscode.HoverProvider = {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover | undefined {
		// vscode.window.showInformationMessage(JSON.stringify("Hover"));
		const trees = getTrees(document);
		const point = toPoint(position);

		// return debugTreeSitterHovers(trees, point);

		const rootNode = trees.jsonTree.rootNode;
		const hoverQuery = `;scm
			(match (key) @match)
			(begin (key) @begin)
			(end (key) @end)
			(while (key) @while)
		`;
		const hoverCapture = queryNode(rootNode, hoverQuery, point);
		if (!hoverCapture) {
			return;
		}

		const hoverNode = hoverCapture.node;

		const markdownString = new vscode.MarkdownString();
		switch (hoverCapture.name) {
			case 'match':
				markdownString.appendMarkdown('Regular Expression to match, (capture) and apply `scopeNames` to text  \n');
				markdownString.appendMarkdown('TextMate uses the [Oniguruma](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE) regex dialect  \n');
				markdownString.appendCodeblock('Example: \\\\b(true|false)\\\\b', 'json-textmate-regex');
				break;
			case 'begin':
				markdownString.appendMarkdown('Regular Expression just like `"match"`  \n');
				markdownString.appendMarkdown('Starts a region that _can_ span multiple lines. When used in conjunction with a `"end"`/`"while"` key  \n');
				markdownString.appendMarkdown('Rules can be nested inside the block with the `"patterns"` key  \n');
				markdownString.appendMarkdown('An anchor is placed after the `"begin"` rule; that you can then match with `\\\\G`  \n');
				markdownString.appendMarkdown('**\\*WARNING\\*** If `"begin"` matches the newline `\\n`. The `\\\\G` anchor is then placed at the beginning of the _next_ line  \n');
				markdownString.appendCodeblock('Example: (\\\\s*)(#*)(\\")', 'json-textmate-regex');
				break;
			case 'end':
				markdownString.appendMarkdown('Regular Expression just like `"match"`  \n');
				markdownString.appendMarkdown('Ends the block started by `"begin"`  \n');
				markdownString.appendMarkdown('`"end"` has priority over rules inside the `"patterns"` array  \n');
				markdownString.appendMarkdown('**\\*WARNING\\*** Rules inside `"patterns"` can \'overmatch\' the `"end"` rule. Effectively \'pushing\' it out  \n');
				markdownString.appendMarkdown('(Captures) inside the `"begin"` key can be referenced here with regex back-references `\\\\1`  \n');
				markdownString.appendCodeblock('Example: (\\")(\\\\2)', 'json-textmate-regex');
				break;
			case 'while':
				markdownString.appendMarkdown('Regular Expression just like `"match"`  \n');
				markdownString.appendMarkdown('Continues the block started by `"begin"`  \n');
				markdownString.appendMarkdown('**\\*WARNING\\*** [VSCode\'s TextMate Engine](https://github.com/microsoft/vscode-textmate) implements `"while"` slightly [differently](https://github.com/microsoft/vscode-textmate/issues/241) to how [Apple\'s TextMate 2.0 Application](https://macromates.com/) has  \n');
				markdownString.appendMarkdown('Unlike `"end"`, `"while"` is line-based, not character-based. It is only checked once per line (starting on the line after the `"begin"`)  \n');
				markdownString.appendMarkdown('If it matches then the _rest_ of the line is now part of the block (same also applies to the `"begin"` rule)  \n');
				markdownString.appendMarkdown('Rules can be nested inside the block with the `"patterns"` key  \n');
				markdownString.appendMarkdown('VSCode: `"while"` is always tested first, before any inner `"patterns"`.  \n');
				markdownString.appendMarkdown('VSCode: When `"while"` doesn\'t match, all unfinished/unclosed patterns are terminated and the `"begin"`/`"while"` block is then finished/closed  \n');
				markdownString.appendMarkdown('Apple: `"begin"`&`"end"` rules \'push\' the `"while"` rule to the next line  \n');
				markdownString.appendMarkdown('An anchor is placed after the `"begin"` rule; that you can then match with `\\\\G`  \n');
				markdownString.appendMarkdown('Apple: A `\\\G` anchor is also placed at the beginning of the _next_ line  \n');
				markdownString.appendMarkdown('(Captures) inside the `"begin"` key can be referenced here with regex back-references `\\\\1`  \n');
				markdownString.appendCodeblock('Example: ^\\\\1(?!\\\\s*\\")', 'json-textmate-regex');
				break;
		}

		const range = toRange(hoverNode);
		const hover = new vscode.Hover(markdownString, range);
		// vscode.window.showInformationMessage(`hover\n${JSON.stringify(hover)}`);
		return hover;
	}
};

function debugTreeSitterHovers(trees: trees, point: Point): vscode.Hover | undefined {
	const node = trees.jsonTree.rootNode.descendantForPosition(point);
	// const node = jsonTree.rootNode.namedDescendantForPosition(point);

	if (!node) {
		return;
	}

	if (node.type == 'regex') {
		const regexTrees = trees.regexTrees;
		const regexTree = regexTrees.get(node.id);
		if (!regexTree) {
			return;
		}
		const regexNode = regexTree.rootNode.descendantForPosition(point);
		if (!regexNode) {
			return;
		}
		const parentNode = regexNode.parent!;
		const markdownString = new vscode.MarkdownString();
		markdownString.appendText(parentNode.type + ' => ' + regexNode.type);
		markdownString.appendCodeblock(parentNode.text, 'json-textmate-regex');
		markdownString.appendCodeblock(parentNode.toString(), 'scm');

		const range = toRange(parentNode);
		const hover = new vscode.Hover(markdownString, range);
		// vscode.window.showInformationMessage(`debugRegexHover\n${JSON.stringify(hover)}`);
		return hover;
	}
	else {
		const markdownString = new vscode.MarkdownString();
		markdownString.appendCodeblock(node.text, 'json-textmate');
		// const fieldName = node.walk().currentFieldName();
		// if (fieldName) {
		// 	markdownString.appendText(`${fieldName}:`);
		// }
		if (node.parent) {
			markdownString.appendText(node.parent.type + ' => ');
		}
		markdownString.appendText(node.type);
		markdownString.appendCodeblock(node.toString(), 'scm');

		const range = toRange(node);
		const hover = new vscode.Hover(markdownString, range);
		// vscode.window.showInformationMessage(`debugHover\n${JSON.stringify(hover)}`);
		return hover;
	}
}

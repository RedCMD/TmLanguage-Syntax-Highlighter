# TmLanguage-Syntax-Highlighter
Syntax Highlighting and Intellisense for VSCodes's JSON based TextMate grammars

## Features
* Syntax Highlighting
* Basic Intellisense
* Diagnostics error reporting
* Ctrl+click Definitions
* Breadcrumbs/Outline
* Formatting
* Schema support
* `repository`/`include` Call Hierarchy View
* [F2] Rename
* CodeLens
* CallStack Viewer
* Deadcode dims
* Supported in [VSCode Web](https://insiders.vscode.dev/)

Example code:  
![example-code](https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/images/Example%20Code%20V2.5.png)

Highlights scope names with their own themed colour in realtime:  
![list-of-VSCode-Dark+-scopenames-and-their-colours](https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/images/VSCode%20Dark+%20theme%20coloured%20scope-names.png)

```json textmate
{
  "$schema": "https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/vscode.tmLanguage.schema.json",
  "name": "languageId",
  "scopeName": "source.languageId",
  "patterns": [
    { "include": "#repo-item" },
    { "include": "#string" },
    { "include": "#boolean" }
  ],
  "repository": {
    "repo-item": { },
    "boolean": {
      "comment": "`\\b` is a 0-width word boundary. `$1` references capture group 1",
      "match": "\\b(true|false)\\b",
      "name": "constant.language.$1.languageId"
    },
    "string": {
      "comment": "\"begin\" & \"end\" can create a multi-line region",
      "begin": "\"",
      "end": "\"",
      "beginCaptures": { "0": { "name": "punctuation.definition.string.begin.languageId" } },
      "endCaptures": { "0": { "name": "punctuation.definition.string.end.languageId" } },
      "name": "string.quoted.double.languageId",
      "patterns": [
        {
          "comment": "Quad backslash required to match one literal backslash",
          "match": "\\\\.",
          "name": "constant.character.escape.languageId"
        }
      ]
    }
  }
}
```



### For more information
* [Github - TextMate](https://github.com/textmate/textmate)
* [Github - VSCode TextMate](https://github.com/microsoft/vscode-textmate)
* [Github - Oniguruma](https://github.com/kkos/oniguruma)
* [Github - Oniguruma: list of all expressions](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE)
* [Github - VSCode Oniguruma](https://github.com/microsoft/vscode-oniguruma)
* [Github - Unit testing](https://github.com/PanAeon/vscode-tmgrammar-test)
* [Github - TmLanguage-Syntax-Highlighter](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
* [Github - Documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)
* [Github - Schema](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/vscode.tmLanguage.schema.json)


### Todo
* Support unicode character insertions `\u00b0`
* Finish ctrl+click definitions and references
* Improve tree-sitter grammar
* Improve TextMate [documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)
* Finish CallStack viewer
* Redo TextMate scopeNames [Naming conventions](https://github.com/atom/flight-manual.atom.io/pull/564)
* Refactor: Sort JSON keys
* Move to LanguageServer
* Add unit tests
* Improve TreeSitter Query performance: [Node contains `&fieldName`](https://github.com/tree-sitter/tree-sitter/issues/3956), [Caching or Serializing a `TSQuery`](https://github.com/tree-sitter/tree-sitter/issues/1942)
* Add [FlameGraph](https://www.brendangregg.com/flamegraphs.html) [schema](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-Profile)
* Update [CHANGELOG.md](/CHANGELOG.md)

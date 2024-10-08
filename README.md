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
  "scopeName": "source.languageId",
  "name": "languageId",
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
* [Github - Oniguruma: list of all expressions](https://github.com/kkos/oniguruma/blob/master/doc/RE)
* [Github - VSCode Oniguruma](https://github.com/microsoft/vscode-oniguruma)
* [Github - Unit testing](https://github.com/PanAeon/vscode-tmgrammar-test)
* [Github - TmLanguage-Syntax-Highlighter](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
* [Github - Documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)
* [Github - Schema](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/vscode.tmLanguage.schema.json)


### Todo
* Support unicode character insertions `\u00b0`
* Improve performance: [Github Issue - Capturing and applying a pattern causes performance loss](https://github.com/microsoft/vscode-textmate/issues/167)
* Finish ctrl+click definitions and references
* Add hovers
* Improve tree-sitter grammar
* Improve TextMate [documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)
* Finish CallStack viewer
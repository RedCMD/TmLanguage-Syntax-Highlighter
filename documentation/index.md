## Introduction

TextMate is a general purpose text editor for Mac released by [MacroMates](https://macromates.com/).  
It is also a language grammar specification that is mainly used for syntax highlighting.  
Supported by [VSCode](https://code.visualstudio.com/), [Github](https://github.com/github-linguist/linguist), [Sublime](https://www.sublimetext.com/), [Atom](https://github.com/atom) and of course [TextMate](https://macromates.com/manual/en/language_grammars).  


VSCode supports TextMate in [JSON](https://www.json.org/json-en.html) and [XML](https://en.wikipedia.org/wiki/XML) formats.  
Sublime supports [YAML](https://yaml.org/).  
[TextMate](https://macromates.com/manual/en/appendix#property-list-format) uses the [old-style property list format](http://developer.apple.com/documentation/Cocoa/Conceptual/PropertyLists/Articles/OldStylePListsConcept.html). (Which Apple has kindly removed the link for us).  

The rest of this file will be in the context of VSCodes TextMate JSON.  

* Todo: Improve layout of this file. Split each section into its own seperate file?  

## Package.json
VSCode TextMate syntax files use the file extension `.tmLanguage.json` and are located in `./syntaxes/`.  
Todo: Explain basics of the `Package.json` in relation to TextMate syntaxes.  

## Rules
Supported rules under VSCode TextMate: [rawGrammar.ts](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts)  
All unspported rules are ignored.  
With the exception of non-object types inside a `"patterns"` array.  

### name (display)
`"name:" "..."`  
The display name of your language.  
VSCode acknowledges `name`, but doesn't do anything with it.  

### scopeName
`"scopeName:" "..."`  
[Required]: The `scopeName` for your language.  
It is the same value as `"scopeName"` under `"grammars"` in your `package.json` file.  
You should use the recommended format of `source.languageId`.  
Or if you are extending another language via injections etc, use `source.theirLanguageId.yourScope`.  

### patterns
`"patterns": [ ... ]`  
[Required]: An array of pattern's to include.  

### repository
`"repository": { ... }`  
A list of rules that can be later referenced with [include](#include).  
[contributing-a-basic-grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#contributing-a-basic-grammar).  
https://github.com/microsoft/vscode-textmate/issues/140

### injections
`"injections": { ... }`  
A dictionary of injections.  
They do NOT work when the grammar is embedded into another language in VSCode.  
[injection-grammars](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars)  

### injectionSelector
`"injectionSelector": "..."`  
Controls which scope-names to inject into and with what priority.  
Default priority is `0`, left `L:` is `-1` (higher) and Right `R:` is `1` (Lower)  
Used in conjunction with `"injectTo"` under `"grammars"` in your `package.json` file.  
[injection-grammars](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars)  

### fileTypes
`"fileTypes": [ "..." ]`  
An array of file extensions your language supports.  
VSCode acknowledges `fileTypes`, but doesn't do anything with it.  
Use `"extensions"` under `"languages"` in your `package.json` file instead.  

### firstLineMatch
`"firstLineMatch": "..."`  
A regex to detect if an open file should get assigned to your language.  
VSCode acknowledges `firstLineMatch`, but doesn't do anything with it.  
Use `"extensions"` under `"languages"` in your `package.json` file instead.  


### include
`"include": "..."`  
Reference an item in a [repository](#repository).  
`"$self"` includes the entire grammar file again.  
`"$base"` includes the top level grammar file. (When embedded inside other grammars).  
`"#..."` includes a repository rule in the same grammar file.  
`"source..."` includes another grammar file with the [scopeName](#scopeName).  
`"source...#..."` includes a repository rule in the other grammar file.  
`include` will not work if there is a [patterns](#patterns) array at the same level as it.  
`include` can reference rules in a `repository` that is at the same level as it or higher.  

### name
`"name": "..."`  
A list of space-separated scope-names to be assigned to the provided token.  
VSCode will then colour that token using the current theme.  
`comment`, `string` and `regex` disables bracket matching while `meta.embedded` reenables it.  
[naming_conventions](https://macromates.com/manual/en/language_grammars#naming_conventions)  

### contentName
`"contentName": "..."`  
Same as [name](#name), but only applies to inside a [begin](#begin)/[end](#end) region

### match
`"match": "..."`  

### begin
`"begin": "..."`  

### end
`"end": "..."`  

### while
`"while": "..."`  
[jeff-hykin textmate_while](https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md)

### applyEndPatternLast
`"applyEndPatternLast": true`  
Controls if the `"end"` pattern should attempt to match before or after the [patterns](#patterns) array.  
`0`, `false` and `null` will disable it. `true` and numbers != `0` will enable it.  

### captures
`"captures": { ... }`  

### beginCaptures
`"beginCaptures": { ... }`  

### endCaptures
`"endCaptures": { ... }`  

### whileCaptures
`"whileCaptures": { ... }`  

### capture
`"0": { ... }`  
Target specific capture group.  
A [patterns](#patterns) array inside `capture` causes a performance hit in VSCode: [issue 167](https://github.com/microsoft/vscode-textmate/issues/167)  

### comment
`"comment": "..."`  
VSCode's TextMate does NOT acknowledge `"comment"` but instead just ignores it like all other unsupported keys.  
C styled comments `//...` and `/* ... */` are NOT allowed in TextMate json files.  
The VSCode JSON validator ignores duplicate `"//"` keys.  


### schema
`"$schema:" "..."`  
A link or releative file path to a json schema.  
[Schema](https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/vscode.tmLanguage.schema.json) used to validate VSCode TextMate json files.  
Not supported by TextMate.  

### uuid
`"uuid:" "..."`  
Technically this should be required in all json files.  
A Universally Unique IDentifier for each json file.  
In the format `[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`.  
Not supported by TextMate.  

### disabled
`"disabled:" true`  
Disables the current rule for easy testing.  
Not currently supported by VSCode.  

### version
`"version:" "..."`  
VSCode supplies it in their builtin grammars.  
Not supported by TextMate.  

### foldingStartMarker
`"foldingStartMarker": "..."`
A regex to define the start of a folding section.  
Not currently supported by VSCode.  
Use `"folding"` in your `language-configuration.json` file instead.  

### foldingStopMarker
`"foldingStopMarker": "..."`
A regex to define the end of the folding section that was started with [foldingStartMarker](#foldingStartMarker).  
Not currently supported by VSCode.  
Use `"folding"` in your `language-configuration.json` file instead.  

## Regex
VSCode TextMate uses the [oniguruma](https://github.com/kkos/oniguruma) dialect.  
Here is a list of all valid regex [expressions](https://github.com/kkos/oniguruma/blob/master/doc/RE).  
[regex.tmLanguage.json](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/syntaxes/regex.tmLanguage.json)


## Embedded Languages
[embedded-languages](https://code.visualstudio.com/api/language-extensions/embedded-languages)  
Todo:


## More Links
- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://macromates.com/manual/en/
- https://macromates.com/textmate/manual/
- https://www.apeth.com/nonblog/stories/textmatebundle.html
- https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1
- https://github.com/kkos/oniguruma/blob/master/doc/RE
- https://github.com/chbk/flight-manual.atom.io/blob/scopes/content/hacking-atom/sections/syntax-naming-conventions.md
- https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md
- https://github.com/RedCMD/TmLanguage-Syntax-Highlighter
- https://code.visualstudio.com/api/language-extensions/embedded-languages
- https://www.sublimetext.com/docs/3/scope_naming.html
- https://www.regular-expressions.info/refquick.html
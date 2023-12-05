
# Rules
VSCode TextMate doesn't support all of the offical TextMate rules.  
Supported rules under VSCode TextMate: [rawGrammar.ts](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts)  
All unspported rules are ignored.  
With the exception of non-object types inside a `"patterns"` array.  
MacroMates [example_grammar](https://macromates.com/manual/en/language_grammars#example_grammar)  

Rule priorities inside `"patterns"` and `"repository"` rule items.  
1. [match](#match). It includes [name](#name) and [captures](#captures).  
1. [begin](#begin)/[while](#while). It includes [name](#name), [contentName](#contentName), [beginCaptures](#beginCaptures), [whileCaptures](#whileCaptures), [captures](#captures) and [patterns](#patterns).  
1. [begin](#begin)/[end](#end). It includes [name](#name), [contentName](#contentName), [beginCaptures](#beginCaptures), [endCaptures](#endCaptures), [captures](#captures), [applyEndPatternLast](#applyEndPatternLast) and [patterns](#patterns).  
1. [patterns](#patterns). It includes [repository](#repository) and when inside [capture](#capture); [name](#name) and [contentName](#contentName).  
1. [include](#include). It includes [repository](#repository)(When NOT inside the root [patterns](#patterns) array) and when inside [capture](#capture); [name](#name) and [contentName](#contentName).  
https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L389


## Root
`{ ... }`  
A JSON object containing your grammar.  
It is required along with [patterns](#patterns) and [scopeName](#scopeName)  
Valid rules:
1. [version](#version)
1. [$schema](#schema)
1. [name](#name_display)
1. [scopeName](#scopeName)
1. [fileTypes](#fileTypes)
1. [firstLineMatch](#firstLineMatch)
1. [foldingStartMarker](#foldingStartMarker)
1. [foldingStopMarker](#foldingStopMarker)
1. [injections](#injections)
1. [injectionSelector](#injectionSelector)
1. [patterns](#patterns)
1. [repository](#repository)
1. [uuid](#uuid)
1. [comment](#comment)
1. [unknown](#unknown)

## name_display
`"name:" "..."`  
The display name of your language.  
VSCode acknowledges [name](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts#L16), but doesn't do anything with it.  

## scopeName
`"scopeName:" "..."`  
The [scopeName](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts#L10) for your language.  
It is the same value as `"scopeName"` under `"grammars"` in your `package.json` file.  
You should use the recommended format of `source.languageId` or `text.languageId`.  
Or if you are extending another language via injections etc, use `source/text.theirLanguageId.yourScope`.  
For example [HTML (Derivative)](https://github.com/textmate/html.tmbundle/blob/master/Syntaxes/HTML.plist) `text.html.derivative` extending [HTML](https://github.com/textmate/html.tmbundle/blob/master/Syntaxes/HTML%20(Derivative).tmLanguage) `text.html.basic`  

## patterns
`"patterns": [ { ... } ]`  
An array of object pattern's to include.  
If everything inside `"patterns"` fails with an error, then any `"begin"` rules will fail  
If multiple conflicting rules appear, VSCode will pick the highest one from the list:  
1. [match](#match)
1. [begin](#begin)/[while](#while)
1. [begin](#begin)/[end](#end)
1. [patterns](#patterns)
1. [include](#include)

[getCompiledRuleId](https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L389-L447)  


## repository
`"repository": { "...": { ... } }`  
A list of rules that can be later referenced with [include](#include).  
[contributing-a-basic-grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#contributing-a-basic-grammar).  
https://github.com/microsoft/vscode-textmate/issues/140  
Although you can name repo-rules anything you like, you cannot reference a rule named `$self` or `$base`  
If multiple conflicting rules appear, VSCode will pick the highest one from the list:  
1. [match](#match)
1. [begin](#begin)/[while](#while)
1. [begin](#begin)/[end](#end)
1. [include](#include)
1. [patterns](#patterns)

[_compilePatterns](https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L487-L572)  


## injections
`"injections": { ... }`  
A dictionary of injections.  
They do NOT work when the grammar is embedded into another language in VSCode.  
[injection-grammars](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars)  

## injectionSelector
`"injectionSelector": "..."`  
Controls which scope-names to inject into and with what priority.  
Default priority is `0`, left `L:` is `-1` (higher) and Right `R:` is `1` (Lower)  
Used in conjunction with `"injectTo"` under `"grammars"` in your `package.json` file.  
[injection-grammars](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars)  

## fileTypes
`"fileTypes": [ "..." ]`  
An array of file extensions your language supports.  
VSCode acknowledges `fileTypes`, but doesn't do anything with it.  
Use `"extensions"` under `"languages"` in your `package.json` file instead.  

## firstLineMatch
`"firstLineMatch": "..."`  
A regex to detect if an open file should get assigned to your language.  
VSCode acknowledges `firstLineMatch`, but doesn't do anything with it.  
Use `"extensions"` under `"languages"` in your `package.json` file instead.  


## include
`"include": "..."`  
Reference an item in a [repository](#repository).  
`"$self"` includes the entire grammar file again.  
`"$base"` includes the top level grammar file. (When embedded inside other grammars).  
`"#..."` includes a repository rule in the same grammar file.  
`"source..."` includes another grammar file with the [scopeName](#scopeName).  
`"source...#..."` includes a repository rule in the other grammar file.  
`include` can reference rules in a [repository](#repository) that is at the same level as it or higher.  
However it cannot reference a [repository](#repository) at the same level as it, if they are both inside a [patterns](#patterns) array 

## name
`"name": "..."`  
A list of space-separated scope-names to be assigned to the provided token.  
VSCode will then colour that token using the scope names in the current theme.  
[naming_conventions](https://macromates.com/manual/en/language_grammars#naming_conventions), [themes](https://code.visualstudio.com/docs/getstarted/themes), [theming](https://code.visualstudio.com/api/extension-capabilities/theming)  
`comment`, `string` and `regex` disables bracket matching while `meta.embedded` reenables it.  
However, VSCode TextMate only checks for word boundaries `\b(comment|string|regex|meta\.embedded)\b`.  
So `keyword.string-double.comment` will be recognized with `string`, disabling bracket matching.  
Priority is to the first `standardTokenType` found.  
[_toStandardTokenType](https://github.com/microsoft/vscode-textmate/blob/main/src/grammar/basicScopesAttributeProvider.ts#L54-L72)  
The VSCode setting `"editor.quickSuggestions"` can be enabled/disabled based on the following `standardTokenTypes`: `comment`, `strings` and `other`.  

## contentName
`"contentName": "..."`  
Same as [name](#name), but only applies to inside a [begin](#begin)/[end](#end) region  
Also applies to the captured text when paired with [patterns](#patterns) inside a [capture](#capture)  

## match
`"match": "..."`  

## begin
`"begin": "..."`  

## end
`"end": "..."`  

## while
`"while": "..."`  
[jeff-hykin textmate_while](https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md)

## applyEndPatternLast
`"applyEndPatternLast": true`  
Controls if the [end](#end) rule should attempt to match before or after the [patterns](#patterns) array.  
`0`, `false` and `null` will disable it. `true` and numbers != `0` will enable it.  
[applyEndPatternLast check](https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L227)

## captures
`"captures": { ... }`  

## beginCaptures
`"beginCaptures": { ... }`  

## endCaptures
`"endCaptures": { ... }`  

## whileCaptures
`"whileCaptures": { ... }`  

## capture
`"0": { ... }`  
Target specific capture group.  
A [patterns](#patterns) array inside `capture` causes a performance hit in VSCode: [issue 167](https://github.com/microsoft/vscode-textmate/issues/167)  
Valid rules:
1. [name](#name)
1. [contentName](#contentName) (Only works when paired with [patterns](#patterns), the [patterns](#patterns) array can optional be empty)
1. [patterns](#patterns)
1. [repository](#repository)
1. [comment](#comment)
1. [unknown](#unknown)

## comment
`"comment": "..."`  
VSCode's TextMate does NOT acknowledge `"comment"` but instead just ignores it like all other unsupported keys.  
C styled comments `//...` and `/* ... */` are NOT allowed in TextMate json files.  
The VSCode JSON validator ignores duplicate `"//"` keys.  


## schema
`"$schema:" "..."`  
A link or releative file path to a json schema.  
[Schema](https://raw.githubusercontent.com/RedCMD/TmLanguage-Syntax-Highlighter/main/vscode.tmLanguage.schema.json) used to validate VSCode TextMate json files.  
Not supported by TextMate.  

## uuid
`"uuid:" "..."`  
Technically this should be required in all json files.  
A Universally Unique IDentifier for each json file.  
In the format `[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`.  
Not supported by TextMate.  

## disabled
`"disabled:" true`  
Disables the current rule for easy testing.  
Not currently supported by VSCode.  

## version
`"version:" "..."`  
VSCode supplies it in their builtin grammars.  
Not supported by TextMate.  

## foldingStartMarker
`"foldingStartMarker": "..."`  
A regex to define the start of a folding section.  
Not currently supported by VSCode.  
Use `"folding"` in your `language-configuration.json` file instead.  

## foldingStopMarker
`"foldingStopMarker": "..."`  
A regex to define the end of the folding section that was started with [foldingStartMarker](#foldingStartMarker).  
Not currently supported by VSCode.  
Use `"folding"` in your `language-configuration.json` file instead.  


## Unknown
`"...": ...`  
All unknown/supported rules are ignored by VSCode TextMate.  
This includes [comment](#comment) etc.  
They do however need to be valid json.  
With the exception of [patterns](#patterns). It must contain `object`'s only. All other data types cause an error.  
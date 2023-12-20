
# Rules
VSCode TextMate doesn't support all of the offical TextMate rules.  
Supported rules under VSCode TextMate: [rawGrammar.ts](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts)  
All unspported rules are ignored.  
MacroMates [example_grammar](https://macromates.com/manual/en/language_grammars#example_grammar)  
https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L389


## Root
`{ ... }`  
The JSON object containing your grammar.  
It is required along with [patterns](#patterns) and [scopeName](#scopename)  
Valid VSCode TextMate rules:
* [scopeName](#scopename)
* [injections](#injections)
* [injectionSelector](#injectionselector)
* [patterns](#patterns)
* [repository](#repository)

Valid offical TextMate rules: (ignored by VSCode TextMate)
* [name](#name_display)
* [fileTypes](#filetypes)
* [firstLineMatch](#firstlinematch)
* [foldingStartMarker](#foldingstartmarker)
* [foldingStopMarker](#foldingstopmarker)

Other supported rules: (ignored by VSCode/offical TextMate)
* [information_for_contributors](#information_for_contributors)
* [version](#version)
* [$schema](#schema)
* [uuid](#uuid)
* [comment](#comment)
* [unknown](#unknown)

## name_display
`"name:" "..."`  
The display name of your language.  
VSCode TextMate acknowledges [name](https://github.com/microsoft/vscode-textmate/blob/main/src/rawGrammar.ts#L16), but doesn't do anything with it.  

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
If everything inside `patterns` fails with an error, then any [begin](#begin) rules will fail also.  
If multiple conflicting rules appear, VSCode will pick the highest one from the list:  
* [match](#match)
* [begin](#begin)/[while](#while)
* [begin](#begin)/[end](#end)
* [patterns](#patterns)
* [include](#include)

[getCompiledRuleId](https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L389-L447)  


## repository
`"repository": { "...": { ... } }`  
A list of rules that can be later referenced with [include](#include).  
[contributing-a-basic-grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#contributing-a-basic-grammar).  
https://github.com/microsoft/vscode-textmate/issues/140  
Although you can name repo-rules anything you like, you cannot reference a rule named `$self` or `$base`  
If multiple conflicting rules appear, VSCode will pick the highest one from the list:  
* [match](#match)
* [begin](#begin)/[while](#while)
* [begin](#begin)/[end](#end)
* [include](#include)
* [patterns](#patterns)

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
`"source..."` includes another grammar file with the [scopeName](#scopename).  
`"source...#..."` includes a repository rule in the other grammar file.  
`include` can reference rules in a [repository](#repository) that is at the same level as it or higher.  
However it cannot reference a [repository](#repository) at the same level as it, if they are both inside a [patterns](#patterns) array 

## name
`"name": "..."`  
A list of space-separated scope-names to be assigned to the provided token.  
VSCode will then colour that token using the scope names in the current theme.  
[naming_conventions](https://macromates.com/manual/en/language_grammars#naming_conventions), [themes](https://code.visualstudio.com/docs/getstarted/themes), [theming](https://code.visualstudio.com/api/extension-capabilities/theming)  
You should add your `languageId` as a suffix to all scope-names. example `keyword.control.goto.cpp`  
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
[Regex](index.md#regex) used to tokenize and capture parts of a file.  
[name](#name) is used to apply a scope-name to the whole text being matched.  
[captures](#captures) is used to apply scope-names to specfic capture groups and/or retokenize the capture groups.  
All other rules are effectively ignored. Including [repository](#repository).  
[rule.ts](https://github.com/microsoft/vscode-textmate/blob/8b07a3c2be6fe4674f9ce6bba6d5c962a7f50df5/src/rule.ts#L394-L402)  

## begin
`"begin": "..."`  
[Regex](index.md#regex) just like [match](#match).  
[name](#name) is used to apply a scope-name to both the `begin` text and the entire region covered by `begin`/([end](#end)|[while](#while)).  
[contentName](#contentname) is used to apply a scope-name to the inner region being covered.  
[end](#end) is used to end the region that was opened by `begin`. It is effectively placed at the beginning of the [patterns](#patterns) array.  
[while](#while) [jeff-hykin textmate_while](https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md). It is prioritized over [end](#end).  
[patterns](#patterns).  
[captures](#captures) is used to apply scope-names to specfic capture groups and/or retokenize the capture groups.  
[beginCaptures](#begincaptures) is just like [captures](#captures), but specifically targets `begin`. It is prioritized over [captures](#captures).  
All other rules are effectively ignored. Including [repository](#repository).  
`begin` places an invisible 0-width anchor after it. It can then be matched using `\\G`.  
[rule.ts](https://github.com/microsoft/vscode-textmate/blob/8b07a3c2be6fe4674f9ce6bba6d5c962a7f50df5/src/rule.ts#L421-L442)  

## end
`"end": "..."`  
Used to end the region started by [begin](#begin).  
`end` is checked before the [patterns](#patterns) array.  But it is not concrete.  
Meaning items in [patterns](#patterns) can consume the same text as `end` and effectively push the `end` rule along.  
`end` can end directly after [begin](#begin). Don't get caught out by it. [Bad usage of 0-wdith `begin` and `end` rules](https://github.com/Microsoft/vscode-textmate/issues/12).  
[applyEndPatternLast](#applyendpatternlast) controls if `end` should attempt to match before or after the [patterns](#patterns) array.  
[name](#name) is used to apply a scope-name to the token matched by `end`.  
[captures](#captures) is used to apply scope-names to specfic capture groups and/or retokenize the capture groups.  
[endCaptures](#endcaptures) is just like [captures](#captures), but specifically targets `end`. It is prioritized over [captures](#captures).  


## while
`"while": "..."`  
[jeff-hykin textmate_while](https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md)  
[name](#name) is used to apply a scope-name to the token matched by `while`.  
[captures](#captures) is used to apply scope-names to specfic capture groups and/or retokenize the capture groups.  
[whileCaptures](#begincaptures) is just like [captures](#captures), but specifically targets `while`. It is prioritized over [captures](#captures).  

## applyEndPatternLast
`"applyEndPatternLast": true`  
Controls if the [end](#end) rule should attempt to match before or after the [patterns](#patterns) array.  
`0`, `false` and `null` will disable it. `true` and numbers != `0` will enable it.  
[applyEndPatternLast check](https://github.com/microsoft/vscode-textmate/blob/main/src/rule.ts#L227)

## captures
`"captures": { ... }`  
`captures` is used to apply scope-names to specfic capture groups and/or retokenize the capture groups inside [match](#match), [begin](#begin), [end](#end) and [while](#while).  
[beginCaptures](#begincaptures), [endCaptures](#endcaptures) and [whileCaptures](#whilecaptures) are prioritized over `captures`.  
Valid rules:
* [capture](#capture) is used to target a specific capture group number inside [match](#match), [begin](#begin), [end](#end) and [while](#while).  
* [comment](#comment)
* [unknown](#unknown)

## beginCaptures
`"beginCaptures": { ... }`  
Same as [captures](#captures).  
Specifically targets [begin](#begin).  
Overrides [captures](#captures) for [begin](#begin).  
Valid rules:
* [capture](#capture) is used to target a specific capture group number inside [begin](#begin).  
* [comment](#comment)
* [unknown](#unknown)

## endCaptures
`"endCaptures": { ... }`  
Same as [captures](#captures).  
Specifically targets [end](#end).  
Overrides [captures](#captures) for [end](#end).  
Valid rules:
* [capture](#capture) is used to target a specific capture group number inside [end](#end).  
* [comment](#comment)
* [unknown](#unknown)

## whileCaptures
`"whileCaptures": { ... }`  
Same as [captures](#captures).  
Specifically targets [while](#while).  
Overrides [captures](#captures) for [while](#while).  
Valid rules:
* [capture](#capture) is used to target a specific capture group number inside [while](#while).  
* [comment](#comment)
* [unknown](#unknown)

## capture
`"0": { ... }`  
Target specific capture group number 0-999.  
Group `0` is the entire string, excluding text before `\\K` [regex](index.md#regex).  
Non-existent capture group numbers are ignored.  
VSCode will ignore all characters after the numeric `"123 this text is ignored, including 456": { }`
`capture` can only target capture groups `(...)` or named capture groups `(?<name>...)`, not non-capture groups `(?:...)`, `(?>...)` or 0-width lookarounds `(?=...)`, `(?<!...)` or absent groups `(?~|...|...)` or any other groups.  
Capture groups inside lookarounds can be targeted, but there can be some side affects.  
Capture groups inside negative-lookarounds will cause an error. Use non-capture group `(?:...)` instead.  
A [patterns](#patterns) array inside `capture` causes a performance hit in VSCode: [issue 167](https://github.com/microsoft/vscode-textmate/issues/167)  
Valid rules:
* [name](#name) is used to apply a scope-name to the entire capture group
* [patterns](#patterns) allows sub-retokenizing of capture group, will clear scope-names from other `captures`. Use [name](#name) to re-scope
* [repository](#repository) list of rules that can be included from within [patterns](#patterns)
* [comment](#comment)
* [unknown](#unknown)

A [patterns](#patterns) array (optionally empty) is required to be present for these rules to take effect.  
It is not recommended to used them in this way. Rather buggy.  
Nest them inside the [patterns](#patterns) array instead.  
* [contentName](#contentname) can apply scope-names twice and starts at the beginning of the capture group, reguardless of [begin](#begin).  
* [match](#match) appears to work as expected
* [begin](#begin) is affected by [contentName](#contentname)
* [end](#end) will allow rules from the outside [patterns](#patterns) array to start matching.  
* [while](#while) Not tested
* [captures](#captures) Not tested
* [beginCaptures](#begincaptures) Not tested
* [endCaptures](#endcaptures) Not tested
* [whileCaptures](#whilecaptures) Not tested
* [applyEndPatternLast](#applyendpatternlast) Not tested
* [include](#include) doesn't work as it requires [patterns](#patterns) to be present. But... [patterns](#patterns) has higher priority than [include](#include)


## comment
`"comment": "..."`  
`"//": ...`  
VSCode's TextMate does NOT acknowledge `comment` but instead just ignores it like all other unsupported keys.  
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

## information_for_contributors
`"information_for_contributors:" [ "..." ]`  
VSCode supplies it in their builtin syntax grammars.  
Not supported by TextMate.  

## version
`"version:" "..."`  
VSCode supplies it in their builtin syntax grammars.  
Not supported by TextMate.  

## foldingStartMarker
`"foldingStartMarker": "..."`  
A regex to define the start of a folding section.  
Pair with [foldingStopMarker](#foldingstopmarker).  
Not currently supported by VSCode TextMate.  
Use `"folding"` in your `language-configuration.json` file instead.  

## foldingStopMarker
`"foldingStopMarker": "..."`  
A regex to define the end of the folding section that was started with [foldingStartMarker](#foldingstartmarker).  
Not currently supported by VSCode TextMate.  
Use `"folding"` in your `language-configuration.json` file instead.  


## Unknown
`"...": ...`  
All unknown/unsupported rules are ignored by VSCode TextMate.  
This includes [comment](#comment) etc.  
They do however need to be valid json.  
With the exception of [patterns](#patterns). It must only contain objects `{}`. It cannot contain type "string", number, boolean or `null`. Arrays `[]` are ignored.  



## [Introduction](index.md)
## Introduction

TextMate is a general purpose GUI text editor for MacOS released by [MacroMates](https://macromates.com/).  
It is also a language grammar specification that is mainly used for syntax highlighting.  
Supported by [VSCode](https://code.visualstudio.com/), [Github](https://github.com/github-linguist/linguist), [Sublime](https://www.sublimetext.com/), [Atom](https://github.com/atom) and of course [TextMate](https://macromates.com/manual/en/language_grammars).  

TextMate has a lot of incomplete and fragmented [documentation](https://macromates.com/manual/en/).  
Hopefully this can be a comprehensive guide for VSCode's JSON TextMate.  

VSCode supports TextMate in [JSON](https://www.json.org/json-en.html) (`.tmLanguage.json`) and [XML](https://en.wikipedia.org/wiki/XML) (`.tmLanguage`) formats.  
[TextMate](https://macromates.com/manual/en/appendix#property-list-format) uses the [old-style property list format](http://developer.apple.com/documentation/Cocoa/Conceptual/PropertyLists/Articles/OldStylePListsConcept.html) (Which Apple has kindly removed the link for us).  
Sublime supports [YAML](https://yaml.org/).  
Atom supports [CSON](https://github.com/lifthrasiir/cson).  

TextMate is a top down line based lexer. This was done for performance reasons.  
Meaning you cant match new lines `\n`.  

The rest of this file will be in the context of VSCode's JSON TextMate.  

* Todo: Improve layout of this file. Split each section into its own separate file?  

## Package.json
VSCode TextMate syntax files use the file extension `.tmLanguage.json` and are located in `./extensions/publisher.extension_name.version/syntaxes/*`.  
Todo: Explain basics of the `Package.json` in relation to TextMate syntaxes.  

## [Rules](rules.md)

## [Injections](injection_order.md)

## Regex
VSCode TextMate uses the [oniguruma](https://github.com/kkos/oniguruma) dialect.  
It used to use Ruby.  
Here is a list of all valid regex [expressions](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE).  
[regex.tmLanguage.json](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/syntaxes/regex.tmLanguage.json).  
`\\K` [Keep](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE#L183) effectively moves the start position of the captured text.  
`\\G` [MatchAnchor](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE#L182) matches against the end of a [begin](./rules.md#begin) rule.  
Capture groups inside a positive-lookaround can be targeted by [capture](rules.md#capture).  
Capture groups inside a negative-lookaround will cause an error. Use non-capture group `(?:...)` instead.  

## Embedded Languages
[embedded-languages](https://code.visualstudio.com/api/language-extensions/embedded-languages)  
Todo:


## More Links
- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://code.visualstudio.com/api/language-extensions/embedded-languages
- https://macromates.com/manual/en/
- https://macromates.com/textmate/manual/
- https://www.apeth.com/nonblog/stories/textmatebundle.html
- https://www.sublimetext.com/docs/3/scope_naming.html
- https://www.regular-expressions.info/refquick.html
- https://techblog.kayac.com/vscode-extension-syntax-highlight
- https://markdown-all-in-one.github.io/docs/contributing/textmate-language-grammar.html
- https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1
- https://gist.github.com/DamnedScholar/622926bcd222eb1ddc483d12103fd315
- https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example
- https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE
- https://github.com/chbk/flight-manual.atom.io/blob/scopes/content/hacking-atom/sections/syntax-naming-conventions.md
- https://github.com/atom/flight-manual.atom.io/pull/564
- https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md
- https://github.com/RedCMD/TmLanguage-Syntax-Highlighter
- https://github.com/bevry/cson#what-is-cson
- https://github.com/dunstontc/textmate/blob/master/readme.md
- https://github.com/kkos/oniguruma
- https://github.com/microsoft/vscode-oniguruma
- https://github.com/Microsoft/vscode-textmate
- https://github.com/microsoft/vscode/tree/main/extensions
- https://github.com/microsoft/vscode/blob/main/extensions/json/syntaxes/JSON.tmLanguage.json
- https://github.com/microsoft/vscode-textmate/issues/208
- https://github.com/microsoft/vscode-textmate/issues/193
- https://github.com/microsoft/vscode-textmate/issues/167
- https://github.com/microsoft/vscode-textmate/issues/140
- https://github.com/microsoft/vscode-textmate/issues/127
- https://github.com/microsoft/vscode-textmate/issues/83
- https://github.com/microsoft/vscode-textmate/issues/74
- https://github.com/microsoft/vscode-textmate/issues/52
- https://github.com/microsoft/vscode-textmate/issues/48
- https://github.com/Microsoft/vscode-textmate/issues/12
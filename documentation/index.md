## Introduction

TextMate is a general purpose GUI text editor for Mac released by [MacroMates](https://macromates.com/).  
It is also a language grammar specification that is mainly used for syntax highlighting.  
Supported by [VSCode](https://code.visualstudio.com/), [Github](https://github.com/github-linguist/linguist), [Sublime](https://www.sublimetext.com/), [Atom](https://github.com/atom) and of course [TextMate](https://macromates.com/manual/en/language_grammars).  


VSCode supports TextMate in [JSON](https://www.json.org/json-en.html) (`.tmLanguage.json`) and [XML](https://en.wikipedia.org/wiki/XML) (`.tmLanguage`) formats.  
Sublime supports [YAML](https://yaml.org/).  
[TextMate](https://macromates.com/manual/en/appendix#property-list-format) uses the [old-style property list format](http://developer.apple.com/documentation/Cocoa/Conceptual/PropertyLists/Articles/OldStylePListsConcept.html) (Which Apple has kindly removed the link for us).  
Atom uses [CSON](https://github.com/lifthrasiir/cson).  

The rest of this file will be in the context of VSCodes TextMate JSON.  

* Todo: Improve layout of this file. Split each section into its own seperate file?  

## Package.json
VSCode TextMate syntax files use the file extension `.tmLanguage.json` and are located in `./syntaxes/`.  
Todo: Explain basics of the `Package.json` in relation to TextMate syntaxes.  

## [Rules](./rules.md)

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
- https://www.regular-expressions.info/refquick.html\
- https://github.com/microsoft/vscode/tree/main/extensions
- https://github.com/microsoft/vscode/blob/main/extensions/json/syntaxes/JSON.tmLanguage.json
- https://gist.github.com/DamnedScholar/622926bcd222eb1ddc483d12103fd315
- https://github.com/bevry/cson#what-is-cson
- https://github.com/microsoft/vscode-textmate/issues/208
- https://github.com/microsoft/vscode-textmate/issues/193
- https://github.com/microsoft/vscode-textmate/issues/167
- https://github.com/microsoft/vscode-textmate/issues/140
- https://github.com/microsoft/vscode-textmate/issues/127
- https://github.com/microsoft/vscode-textmate/issues/83
- https://github.com/microsoft/vscode-textmate/issues/74
- https://github.com/microsoft/vscode-textmate/issues/52
- https://github.com/microsoft/vscode-textmate/issues/48
- https://github.com/dunstontc/textmate/blob/master/readme.md
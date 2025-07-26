## Introduction

TextMate is a general purpose GUI text editor for MacOS released by [MacroMates](https://macromates.com/).  
It is also a language grammar specification that is mainly used for syntax highlighting.  
Supported by [VSCode](https://code.visualstudio.com/), [Github](https://github.com/github-linguist/linguist), [Sublime](https://www.sublimetext.com/), [Atom](https://github.com/atom) and of course [TextMate](https://macromates.com/manual/en/language_grammars).  

TextMate has a lot of incomplete and fragmented [documentation](https://macromates.com/manual/en/).  
Hopefully this can be a comprehensive guide for VSCode's JSON TextMate.  

Supported formats:
* VSCode
  * [JSON](https://www.json.org/json-en.html) `.tmLanguage.json`
  * [XML](https://en.wikipedia.org/wiki/XML) `.tmLanguage`
* [TextMate](https://macromates.com/manual/en/appendix#property-list-format)
  * [Ascii Plist](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/PropertyLists/OldStylePlists/OldStylePLists.html) `.tmLanguage` Old-style property list format [parser](https://github.com/textmate/textmate/blob/master/Frameworks/plist/src/ascii.rl)
* Sublime
  * [YAML](https://yaml.org/) `.yaml`
* Atom
  * [CSON](https://github.com/lifthrasiir/cson) `.cson`
* [Github-Linguist](https://github.com/github-linguist/linguist)
  * JSON `.json`
  * XML `.plist`, `.tmlanguage`
  * YAML `.yaml-tmlanguage`
  * CSON `.cson`

TextMate is a top down line based lexer. This was done for performance reasons.  
Meaning you can't match past/over new lines `\n`.  


## Package.json
VSCode's TextMate grammar files use the file extension `.tmLanguage.json` & `.tmLanguage` and are located in `./extensions/publisher.extension_name.version/syntaxes/*`.  
Todo: Explain basics of the `Package.json` in relation to TextMate syntaxes.  

## [Rules](rules.md)

## [Injections](injections.md)

## Regex
List of TextMate engines and their regex engines:
* [VSCode](https://github.com/microsoft/vscode)
  * [vscode-textmate](https://github.com/microsoft/vscode-textmate/tree/v9.2.0) v9.2.0
    * [vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma/tree/v1.7.0) v1.7.0
      * [oniguruma](https://github.com/kkos/oniguruma/tree/v6.9.8) v6.9.8
* [TextMate](https://github.com/textmate/textmate) v2.0
  * [textmate/Onigmo](https://github.com/textmate/Onigmo/tree/Onigmo-5.13.5) v5.13.5
    * [k-takata/Onigmo](https://github.com/k-takata/Onigmo/tree/Onigmo-5.13.5) v5.13.5
      * [oniguruma](https://github.com/kkos/oniguruma/tree/65a9b1aa03c9bc2dc01b074295b9603232cb3b78) v5.9.2
* [GitHub](https://github.com/)
  * [Linguist](https://github.com/github-linguist)
  * PrettyLights
    * [PCRE](https://github.com/vmg/libpcre) v8.36
  * Pygments
* [NovaLightshow](https://github.com/Nixinova/NovaLightshow)
  * [starry-night](https://github.com/wooorm/starry-night)
    * [vscode-textmate](https://github.com/microsoft/vscode-textmate)
      * [vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma)
        * [oniguruma](https://github.com/kkos/oniguruma/tree/v6.9.8) v6.9.8
* [ShikiJS](https://github.com/shikijs/shiki)
  * [@shikijs/vscode-textmate](https://github.com/shikijs/vscode-textmate)
    * [@shikijs/engine-oniguruma](https://github.com/shikijs/shiki/tree/main/packages/engine-oniguruma)
      * [vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma)
        * [oniguruma](https://github.com/kkos/oniguruma/tree/v6.9.8) v6.9.8
  * [@shikijs/engine-javascript](https://github.com/shikijs/shiki/tree/main/packages/engine-javascript)
    * [oniguruma-to-es](https://github.com/slevithan/oniguruma-to-es)
      * [oniguruma-parser](https://github.com/slevithan/oniguruma-parser) v0.12.1

[regex.tmLanguage.json](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/syntaxes/regex.tmLanguage.json).  
`\\K` [Keep](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE#L183) effectively moves the start position of the captured text.  
`\\G` [MatchAnchor](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE#L182) matches against the end of a [begin](./rules.md#begin) rule.  
Capture groups inside a positive-lookaround can be targeted by [capture](rules.md#capture).  
Capture groups inside a negative-lookaround will cause an error. Use non-capture group `(?:...)` instead.  

## Embedded Languages
[embedded-languages](https://code.visualstudio.com/api/language-extensions/embedded-languages)  
Todo:


## More Links
* Guides
  - [VSCode syntax-highlight-guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
  - [VSCode embedded-languages-guide](https://code.visualstudio.com/api/language-extensions/embedded-languages)
  - [TextMate 1.0 manual](https://macromates.com/manual/en/)
  - [TextMate 2.0 manual](https://macromates.com/textmate/manual/)
  - [Writing a TextMate Grammar: Some Lessons Learned](https://www.apeth.com/nonblog/stories/textmatebundle.html)
  - [How to create syntax highlighting for VSCode](https://techblog.kayac.com/vscode-extension-syntax-highlight)
  - [A guide to writing a language grammar (TextMate) in Atom](https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1)
  - [TextMate grammar guide](https://markdown-all-in-one.github.io/docs/contributing/textmate-language-grammar.html)
  - [Scope Naming](https://www.sublimetext.com/docs/3/scope_naming.html)
  - [Syntax Naming Conventions](https://github.com/chbk/flight-manual.atom.io/blob/scopes/content/hacking-atom/sections/syntax-naming-conventions.md)
  - [Naming conventions for syntax scopes](https://github.com/atom/flight-manual.atom.io/pull/564)
  - [Github theme scope-previews](https://github.com/Alhadis/language-etc/blob/master/samples/lists/scope-previews.nanorc)
* Resources
  - [VSCode TextMate Oniguruma regex syntax](https://github.com/kkos/oniguruma/blob/v6.9.8/doc/RE)
  - [TextMate Language Grammars](https://github.com/dunstontc/textmate/blob/master/readme.md)
  - [VSCode textmate_while](https://github.com/jeff-hykin/better-cpp-syntax/blob/master/documentation/library/textmate_while.md)
  - [VSCode Markdown Fenced Code Block Grammar Injection Example](https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example)
  - [language-sampleGrammar.cson](https://gist.github.com/DamnedScholar/622926bcd222eb1ddc483d12103fd315)
  - [Regular Expressions Quick Reference](https://www.regular-expressions.info/refquick.html)
  - [Test your textmate grammars in TextMate](https://github.com/github-linguist/linguist/discussions/6756)
  - [Github List: VSCode TextMate Grammar Tools](https://github.com/stars/RedCMD/lists/vscode-textmate-grammar-tools)
  - [VSCode TmLanguage-Syntax-Highlighter Extension](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
  - [VSCode Extensions repo](https://github.com/microsoft/vscode/tree/main/extensions)
  - [VSCode JSON Grammar](https://github.com/microsoft/vscode/blob/main/extensions/json/syntaxes/JSON.tmLanguage.json)
* Bugs
  - [Scopes on Recursive Regex Cause Problems](https://github.com/microsoft/vscode-textmate/issues/208)
  - [Textmate engine bug for \k<> backreferences](https://github.com/microsoft/vscode-textmate/issues/193)
  - [Capturing and applying a pattern causes performance loss](https://github.com/microsoft/vscode-textmate/issues/167)
  - [Repository works only when it defined at top level of grammar file](https://github.com/microsoft/vscode-textmate/issues/140)
  - [multiply applied capture groups seems to ignore some captures](https://github.com/microsoft/vscode-textmate/issues/127)
  - [injections to not cover forward scoped regions](https://github.com/microsoft/vscode-textmate/issues/83)
  - [possible unexpected behavior from capture sub-patterns (sub-tokenized capture)](https://github.com/microsoft/vscode-textmate/issues/74)
  - [TextMate scope selectors: scope exclusion is not implemented](https://github.com/microsoft/vscode-textmate/issues/52)
  - [Format strings not being handled in grammar](https://github.com/microsoft/vscode-textmate/issues/48)
  - [VSCode's tmLanguage support cannot match zero-width begin and end correctly.](https://github.com/Microsoft/vscode-textmate/issues/12)

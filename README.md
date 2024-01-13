# TmLanguage-Syntax-Highlighter
Syntax Highlighting for JSON based TextMate Language and Regex

## Features
Now features basic Intellisense, ctrl+click definitions, breadcrumbs and right click => formatting  

Example code:  
![example-code](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/images/Example%20Code%20V1.2.png?raw=true)

Highlights scope names with their own themed colour in realtime:  
![list-of-VSCode-Dark+-scopenames-and-their-colours](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/images/VSCode%20Dark+%20theme%20coloured%20scope-names.png?raw=true)

Invalid code is highlighted in red and underlined  
Incorrect code is highlighted in red and with italics  
Unsupported json keys and values default back to their standard json colours  
Unknown code is highlighted red  


## Requirements
This extension was designed with VSCode's default Dark+ theme in mind  
Other themes may work with various successes  
If you would like me to add support for a theme, please just message me  


### For more information
* [Github - TextMate](https://github.com/textmate/textmate)
* [Github - VSCode TextMate](https://github.com/microsoft/vscode-textmate)
* [Github - Oniguruma](https://github.com/kkos/oniguruma)
* [Github - Oniguruma: list of all expressions](https://github.com/kkos/oniguruma/blob/master/doc/RE)
* [Github - TmLanguage-Syntax-Highlighter](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
* [Github - Documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)


### Todo
* Support unicode character insertions `\u00b0`
* Allow spaces, underscores and dashes in all places inside Unicode Categorys `\\p{  Let _te--r}`: [Github - List of unicode properties](https://github.com/kkos/oniguruma/blob/bb31b4d402ee3f3a3bc4855c9d0271f43a3e4793/doc/UNICODE_PROPERTIES)
* Try* to fix contention between backreferences `\\1` and character codes `\\1`
* Detect and limit backreferences/subroutines/conditional-capture-groups `\\1`/`\\k<1>`/`\\g<1>`/`(?(<1>))` to the actual amount of capture groups available
* Detect all invalid character class ranges `[z-a]`
* Correctly invalidate look-around capture groups inside all types of capture groups nested inside look-behind capture groups
* Improve bracket features: Colourization, matching, autocomplete, surround
* Limit look-behind length to 65536 characters
* Limit all repeating quantifiers to 100000
* Unify ways of displaying errors
* Improve performance: [Github Issue - Capturing and applying a pattern causes performance loss](https://github.com/microsoft/vscode-textmate/issues/167)
* Enable squiggle based error checking
* Finish ctrl+click definitions and references
* Add range formatting
* Add hovers
* Improve tree-sitter grammar
* Update README.md pictures
* Improve TextMate [documentation](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/documentation/index.md)
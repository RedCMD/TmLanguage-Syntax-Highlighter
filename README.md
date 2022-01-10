# TmLanguage-Syntax-Highlighter
Syntax Highlighting for JSON based TextMate Language and Regex

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/redcmd.tmlanguage-syntax-highlighter.svg)](https://marketplace.visualstudio.com/items?itemName=redcmd.tmlanguage-syntax-highlighter)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short//RedCMD.tmlanguage-syntax-highlighter.svg)](https://marketplace.visualstudio.com/items?itemName=RedCMD.tmlanguage-syntax-highlighter)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short//RedCMD.tmlanguage-syntax-highlighter.svg)](https://marketplace.visualstudio.com/items?itemName=RedCMD.tmlanguage-syntax-highlighter)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short//RedCMD.tmlanguage-syntax-highlighter.svg)](https://marketplace.visualstudio.com/items?itemName=RedCMD.tmlanguage-syntax-highlighter)


## Features
Big update, almost supports 100% of the textmate specification

![example-code](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/images/Example%20Code%20V1.2.png?raw=true)

Highlights scope names with their own themed colour in realtime
![list-of-VSCode-Dark+-scopenames-and-their-colours](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/images/VSCode%20Dark+%20theme%20coloured%20scope-names.png?raw=true)

Invalid code is highlighted in red and underlined  
Incorrect code is highlighted in red and with italics  
Unsupported json keys and values default back to their standard json colours  
Unknown code is highlighted red  

### JSON error checking
JSON based error squiggles can be enabled by manually adding the language id to the json language server code  
Open the file at `\Microsoft VS Code\resources\app\extensions\json-language-features\client\dist\node\jsonClientMain.js`  
Ctrl+F to find the text `"jonsc"` and immediately copy/paste `,"json-tmLanguage"` after it. (take note that the `L` is capitalised)  
It should look like this: `const S=["json","jsonc","json-tmLanguage"],`  
![enable-json-lanuage-server](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter/blob/main/images/Enable%20Json%20language%20server.png?raw=true)  



## Requirements
This extension was designed with VSCode's default Dark+ theme in mind  
Other themes may work with various successes  
If you would like me to add support for a theme, please just message me  


### For more information
* [Github - VSCode TextMate](https://github.com/microsoft/vscode-textmate)
* [Github - Oniguruma](https://github.com/kkos/oniguruma)
* [Github - TmLanguage-Syntax-Highlighter](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
* [Github - TextMates Schema](https://github.com/martinring/tmlanguage)


### Todo
* Support JSON Keys: `"information_for_contributors"`, `"version"` and `"injections"`
* Support posix's super buggy behaviour: [Github Issue - Funky Posix Classes](https://github.com/microsoft/vscode-textmate/issues/165)
* Fix char ranges in character classes or wait for vscode to fix textmate bug (`[\\\\-\\\\]`): [Github Issue - Subroutines breaking tokenization](https://github.com/microsoft/vscode-textmate/issues/164)
* Allow spaces, underscores and dashes in all places inside Unicode Categorys `\\p{  Let _te--r}`: [Github - List of unicode properties](https://github.com/kkos/oniguruma/blob/bb31b4d402ee3f3a3bc4855c9d0271f43a3e4793/doc/UNICODE_PROPERTIES)
* Correctly mark unnecessary backslahes infront of `&` inside character classes when mix with `&` based char ranges
* Correctly mark unnecessary backslahes around `\\{1\\,9\\}`
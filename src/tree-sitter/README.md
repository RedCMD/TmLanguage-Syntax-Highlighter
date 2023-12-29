Tree-sitter -> wasm

https://emscripten.org/docs/getting_started/downloads.html
https://github.com/tree-sitter/tree-sitter/blob/master/lib/binding_web/README.md
https://tree-sitter.github.io/tree-sitter/creating-parsers


install python with optional `py` launcher and `PATH` option

install emscripten in a separate private folder
`git clone https://github.com/emscripten-core/emsdk.git`
`cd emsdk`
`git pull`
(the latest version (`3.X.X`) doesn't seem to work with the `vscode-parse-tree` extension on Windows. Install version `2.0.34` instead)
`./emsdk install 2.0.34`
`./emsdk activate 2.0.34 --permanent`
`./emsdk_env.bat`
restart powershell and/or vscode

install tree-sitter in the extension folder
cd `/out/tree-sitter/`
`npm install tree-sitter-cli`

compile wasm
run `build_grammar.ps1`


to install tree-sitter in your own personal extension
`mkdir tree-sitter-your_language`
`cd tree-sitter-your_language`
`npm init` (creates `package.json`)
`npm install --save nan`
`npm install --save-dev tree-sitter-cli`
add `./node_modules/.bin` to `PATH`
`grammar.js` => ```js
module.exports = grammar({
  name: 'your_language',

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => 'hello'
  }
});```
`tree-sitter generate`
`example-file` => `hello` (UTF8 encoding!!)
`tree-sitter parse example-file`


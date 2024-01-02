# Install Python with optional `py` launcher and `PATH` option
# Install Emscripten and restart VSCode (use version 2.0.34 on Windows)
# Install Tree-sitter-cli globally with `npm install -g tree-sitter-cli`
# (Windows) Make sure to add `./node_modules/.bin/` to your `PATH`

# jump to location relative to build_grammar.ps1
Push-Location $PSScriptRoot

# `./node_modules/.bin/tree-sitter` is faster than `npx tree-sitter`

# generate the json parser files
cd ./tree-sitter-json/
./../../../node_modules/.bin/tree-sitter generate --no-bindings

# generate the regex parser files
cd ./../tree-sitter-regex/
./../../../node_modules/.bin/tree-sitter generate --no-bindings

# build the wasm files
cd ./../../../out/
./../node_modules/.bin/tree-sitter build-wasm ./../src/tree-sitter/tree-sitter-json/
# ./../node_modules/.bin/tree-sitter build-wasm ./../src/tree-sitter/tree-sitter-regex/


# return to previous location
Pop-Location
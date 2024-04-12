# Install Python with optional `py` launcher and `PATH` option
# Install Emscripten and restart VSCode
# Install `tree-sitter-cli` globally with `npm install -g tree-sitter-cli`
# (Windows) Make sure to add `./node_modules/.bin/` to your `PATH`

# jump to location relative to build_grammar.ps1
Push-Location $PSScriptRoot

# `./node_modules/.bin/tree-sitter` is faster than `npx tree-sitter`

# generate and build the json wasm
cd tree-sitter-json
../../../node_modules/.bin/tree-sitter generate --no-bindings
../../../node_modules/.bin/tree-sitter build --wasm -o ../../../out/tree-sitter-jsontm.wasm

# generate and build the regex wasm
cd ../tree-sitter-regex
../../../node_modules/.bin/tree-sitter generate --no-bindings
../../../node_modules/.bin/tree-sitter build --wasm -o ../../../out/tree-sitter-regextm.wasm

# return to previous location
Pop-Location
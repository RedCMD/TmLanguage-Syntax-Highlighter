# Install Python with optional `py` launcher and `PATH` option
# Install Emscripten and restart VSCode (use version 2.0.34 on Windows)
# Install Tree-sitter-cli with `npm install tree-sitter-cli`
# (Windows) Make sure to add `./out/tree-sitter/node_modules/.bin/` to your `PATH`

# jump to location relative to build_grammar.ps1
Push-Location $PSScriptRoot

# generate the grammar files
./node_modules/.bin/tree-sitter generate

# build the wasm file
./node_modules/.bin/tree-sitter build-wasm

# return to previous location
Pop-Location
## Injections

There are two different injection types:  
`"injectionSelector"` which is used with `"injectTo"` in `package.json`.  
`"injections"` which is only used within a TextMate grammar and doesn't work from embedded grammars.  

```json textmate
"injectionSelector": "L:text.html.markdown -meta.embedded.block.json.textmate"

"injections": {
  "L:capture-group-lookbehind -capture-group-modify-extended -character-class -comment": {
    "patterns": [
      { "include": "source.syntax.regexp.tmLanguage#capture-group-lookbehind-invalid" },
      { "include": "source.syntax.regexp.tmLanguage#absent-invalid" }
    ]
  }
}
```


## Priority order

1. `L:injection` - `L:` stands for `left` side ordering or priority `-1` (lower is **higher**)
2. [end](rules.md#end) - The ending rule to [begin](rules.md#begin)
3. [patterns](rules.md#patterns) - Items within the array. First is **higher**
4. [applyEndPatternLast](rules.md#applyEndPatternLast) - The ending rule to [begin](rules.md#begin) (delayed)
5. `injection` - Default injection priority `0`
6. `R:injection` - `R:` stands for `right` side ordering or priority `1` (lower is **higher**)
7. Parsed - The order in which the rules are specified within [injections](rules.md#injections). First is **higher**
8. Grammar - The order in which the grammars are loaded. First is **lower**. Builtin VSCode grammars are **lowest**, installed extensions, extensionHost is the **highest**
9. [injections](rules.md#injections)/[injectionSelector](rules.md#injectionSelector) - Unknown


## Syntax
https://github.com/microsoft/vscode-textmate/blob/main/src/matcher.ts  
The injection syntax is parsed into the following tokens

1. `L:` - `left` side priority selector `-1` to following the scopeName
1. `R:` - `right` side priority selector `1` to following the scopeName
1. __*__`:` - any char followed by `:` colon. Defaults to priority `0` to following the scopeName
1. `(` - Open bracket group
1. `)` - Close bracket group
1. `-` - Negate following scopeName or group (negates each scopeName individually if inside group)
1. `,` - Logical `OR`
1. `|` - Logical `OR` (only when inside group)
1. `/[\w\.:][\w\.:\-]*/` - Regex for scopeNames (`identifier`)
1. __*__ - any other character left over (including whitespace ` `) becomes whitespace

Any rogue closing bracket `)` or `|` (when at root level) will cause all text afterwards to be ignored.  
Duplicate `,` commas or `|` are ignored.  
Double `-` just inverts twice. Negitive + Negitive = Positive.  
The order of (positive) scopeNames (`identifier`'s) matters.  
However the order of negated scopeNames does not.  
Negating multiple scopeNames must be separated with non-whitespace tokens
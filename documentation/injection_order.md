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

## Pattern order


1. L:injection
2. end
3. patterns
4. applyEndPatternLast
5. injection
6. R:injection

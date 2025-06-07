## TextMate Injections

There are two different injection types:  
`"injectionSelector"` which is used with `"injectTo"` in `package.json`.  
`"injections"` which is only used within a (non-injected) grammar.  

```json textmate
"injectionSelector": "L:text.html.markdown -meta.embedded.block.json.textmate"

"injections": {
  "L:capture-group-lookbehind -capture-group-modify-extended -character-class -comment": {
    "patterns": [
      { "include": "source.json.textmate.regexp#capture-group-lookbehind-invalid" },
      { "include": "source.json.textmate.regexp#absent-invalid" }
    ]
  }
}
```

## Syntax

A typical injection will look something like this:
```json textmate
"injectionSelector": "L:source.js meta.function.js -string -comment, L:source.ts meta.function.ts -string -comment"
```
* `L:` will prioritize the injected grammar over the host grammar
* `source.js` scope matches the JavaScript scopeName
* `meta.function.js` narrows the injection to only within `functions`
* `-string` not inject into `strings`
* `,` separates multiple injection selectors

https://github.com/microsoft/vscode-textmate/blob/main/src/matcher.ts  
The injection syntax is parsed into the following tokens

* `L:` - `left` side priority selector `-1` to following the scopeName
* `R:` - `right` side priority selector `1` to following the scopeName
* `B:` - Both `left` and `right` side priority selectors (Github and [TextMate](https://github.com/textmate/textmate/blob/master/Frameworks/scope/src/types.h#L74) only. VSCode doesn't support it)
* __*__`:` - any char followed by `:` colon. Defaults to priority `0` to following the scopeName
* `(` - Open bracket group
* `)` - Close bracket group
* `-` - Negate following scopeName or group (negates each scopeName individually if inside group)
* `,` - Logical `OR`
* `|` - Logical `OR` (only when inside group)
* `/[\w.:][\w.:-]*/` - Regex for scopeNames (`identifier`)
* __*__ - any other character left over (including whitespace ` ` and asterisk `*`) becomes whitespace
* `*` - Asterisk matches against any scope; TextMate 2.0 only. VSCode treats it as whitespace

Any rogue closing bracket `)` or `|` (when at root level) will cause all text afterwards to be ignored.  
Duplicate `,` commas or `|` are ignored.  
Double `-` just inverts twice. Negative + Negative = Positive.  
The order of (positive) scopeNames (`identifier`'s) matters.  
However the order of negated scopeNames does not.  
Negating multiple scopeNames must be separated with non-whitespace tokens


## Priority order

1. `L:injection` - `L:` stands for `left` side ordering or priority `-1` (lower is **higher**)
2. [end](rules.md#end) - The ending rule to [begin](rules.md#begin)
3. [patterns](rules.md#patterns) - Items within the array. First is **higher**
4. [injections](injections.md#injections) - are checked before injected grammars ([injectionSelector](injections.md#injectionselector))
5. [applyEndPatternLast](rules.md#applyEndPatternLast) - The ending rule to [begin](rules.md#begin) (delayed)
6. `injection` - Default injection priority `0`
7. `R:injection` - `R:` stands for `right` side ordering or priority `1` (lower is **higher**)
8. Parsed - The order in which the rules are specified within [injections](injections.md#injections-1). First is **higher**
9. Grammar - The order in which the grammars are loaded. VSCode loads extensions in alphabetical order. Later extensions having **higher** priority. Builtin VSCode grammars are the **lower** (loaded first), installed extensions in the **middle**, extensionHost is the **higher** (loaded last)


## `injectionSelector`

`"injectionSelector"` is used inconjunction with `"injectTo"` under `"grammars"` in your `package.json` file.  
It controls which scopeNames to inject your entire grammar into.  

`"injectTo"` tells VSCode which _root level_ scopeNames to attempt to inject the grammar into.  
_root level_ scopeNames are only the ones that show up under `"grammars"` in all loaded `package.json` files.  
So if you wish to inject into an embedded grammar.  
You will need to first inject into the parent grammar.  

You can only inject into a `"patterns"` array.  
`"begin"`/`"end"`/`"while"` and root have an implied array.  
So you can't inject into a `"match"`. Unless it is recaptured with a `"captures"` that has a `"patterns"` array.  

TextMate will inject the grammar into the entire document.  
Including recursively into the injected grammar.  

## `injections`

`"injections"` injects rules into the grammar based on the scopeNames specified.  

Sadly in VSCode injections do not work if the grammar is embedded inside another grammar.  
You will need put the injections inside the parent grammar.  

TextMate will inject the rules into the entire document.  
Including recursively into the injected rules.  

### Warning
TextMate 2.0 and Github have a bug where a injected `include` won't be applied if the `include` is already present in the same instance.  
Causing `L:` to effectively be ignored.  

For example in this grammar:
```json textmate
{
	"scopeName": "source.languageId",
	"injections": {
		"L:source.languageId": {
			"patterns": [ { "include": "#any" } ]
		}
	},
	"patterns": [
		{ "include": "#abc" },
		{ "include": "#any" }
	],
	"repository": {
		"abc": {
			"match": "abc",
			"name": "string.abc"
		},
		"any": {
			"match": ".",
			"name": "comment.any"
		},
		"any2": {
			"match": ".",
			"name": "comment.any"
		}
	}
}
```
It would be expected that this grammar matches the text `abc` with `comment.any`.  
But instead it is matched with `string.abc`.  
Even tho the injection has high priority `L:`.  
TextMate and Github see that `#any` was already included from within the root level `patterns`.  
Then proceeding to simply ignore it.  
Forgetting that the order/priority of the `include` needs to be changed.  

As you will see changing one of the `#any` to `#any2` fixes it.  
Also removing `#any` from the root level `patterns` fixes it.  

VSCode handles this correctly by not ignoring the duplicate injection `include`.  
https://github.com/github-linguist/linguist/discussions/6756  
https://github.com/lifeart/vsc-ember-syntax/pull/77  
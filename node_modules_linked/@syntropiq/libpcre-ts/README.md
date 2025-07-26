# @syntropiq/libpcre-ts

**WebAssembly wrapper for the original PCRE (Perl Compatible Regular Expressions) library with TypeScript bindings.**

This package wraps the **original** PCRE library (not PCRE2), which is more permissive and forgiving than modern regex engines. While the original PCRE is considered "antiquated," this makes it valuable for compatibility with older systems and more lenient pattern matching.

## Why Use This?

- **Legacy compatibility** - Works with patterns that newer regex engines reject
- **More permissive** - The original PCRE accepts patterns that PCRE2 considers invalid
- **WebAssembly performance** - Near-native speed in browsers and Node.js
- **Full PCRE features** - Named groups, lookbehinds, recursion (features missing from JavaScript regex)
- **TypeScript support** - Complete type definitions included

Perfect for porting legacy regex patterns or when you need maximum pattern compatibility.

## Installation

```bash
npm install @syntropiq/libpcre-ts
```

## Build & Module Support (ESM & CJS)

- **Dual ESM/CJS support:** This package now ships with both modern ESM and legacy CommonJS builds, fully tree-shakable and optimized for all environments.
- **Automatic WASM handling:** The WebAssembly and its JS loader are bundled for both module formats. No manual copying or import hacks needed.
- **TypeScript types:** Complete type definitions are generated and published for both ESM and CJS consumers.
- **Modern build system:** Uses Vite for bundling/optimization and TypeScript for type safety. All build, setup, and submodule steps are automated via scripts.

**Usage:**
- In ESM (Node.js or browser):
  ```js
  import { PCRE } from '@syntropiq/libpcre-ts';
  ```
- In CommonJS (Node.js):
  ```js
  const { PCRE } = require('@syntropiq/libpcre-ts');
  ```

## Quick Start

```typescript
import { PCRE } from '@syntropiq/libpcre-ts';

const pcre = new PCRE();
await pcre.init();

// Quick pattern testing
const isMatch = pcre.test('\\d+', 'Hello 123');
console.log(isMatch); // true

// Get match details
const matches = pcre.match('(\\w+)\\s+(\\d+)', 'Hello 123');
console.log(matches); // [{ value: 'Hello 123', index: 0, length: 9 }]
```

## Compiled Pattern Usage

For better performance with repeated use:

```typescript
import { PCRE } from '@syntropiq/libpcre-ts';

const pcre = new PCRE();
await pcre.init();

// Compile pattern once
const regex = pcre.compile('(?P<word>\\w+)\\s+(?P<number>\\d+)');

// Use multiple times
console.log(regex.test('Hello 123')); // true
console.log(regex.test('No numbers here')); // false

// Get matches with named groups
const matches = regex.exec('Hello 123');
if (matches) {
  console.log(matches[0].value); // 'Hello 123'
  console.log(matches[1].value); // 'Hello' (first capturing group)
  console.log(matches[2].value); // '123' (second capturing group)
}

// Get named group mappings
const namedGroups = regex.getNamedGroups();
console.log(namedGroups); // { word: 1, number: 2 }
```

## Advanced Features

```typescript
// Case-insensitive matching with constants
const regex = pcre.compile('hello', pcre.constants.CASELESS);
console.log(regex.test('HELLO')); // true

// Global matching (find all occurrences)
const allMatches = regex.globalMatch('Hello hello HELLO');
console.log(allMatches.length); // 3

// String replacement
const result = regex.replace('Hello world', 'Hi', true);
console.log(result); // 'Hi world'
```

## PCRE-Specific Features

Features not available in JavaScript's built-in RegExp:

```typescript
// Named capture groups (Python-style)
const datePattern = '(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})';
const regex = pcre.compile(datePattern);
const namedGroups = regex.getNamedGroups();
console.log(namedGroups); // { year: 1, month: 2, day: 3 }

// Lookbehind assertions
const pricePattern = '(?<=\\$)\\d+\\.\\d{2}';
const priceMatch = pcre.match(pricePattern, 'Price: $19.99');

// Recursive patterns (balanced parentheses)
const balancedParens = '\\((?:[^()]++|(?R))*\\)';
const isBalanced = pcre.test(balancedParens, '(a(b(c)d)e)');
```

## Constants and Options

```typescript
// Common PCRE options
const options = 
  pcre.constants.CASELESS |      // Case-insensitive
  pcre.constants.MULTILINE |     // ^ and $ match line boundaries  
  pcre.constants.DOTALL;         // . matches newlines

const regex = pcre.compile('pattern', options);
```

Available constants:
- `CASELESS` - Case-insensitive matching
- `MULTILINE` - `^` and `$` match line boundaries
- `DOTALL` - `.` matches newlines
- `EXTENDED` - Ignore whitespace and comments
- `UTF8` - Enable UTF-8 mode
- `UNGREEDY` - Make quantifiers non-greedy by default

## Error Handling

```typescript
try {
  const regex = pcre.compile('[invalid pattern');
} catch (error) {
  console.error('Pattern compilation failed:', error.message);
}
```

## Performance Tips

1. **Compile once, use many times**: Use `pcre.compile()` for patterns you'll reuse
2. **Use quick methods for one-off tests**: Use `pcre.test()` and `pcre.match()` for single use
3. **Consider options**: Some PCRE options can significantly impact performance

## Browser Support

Works in all modern browsers that support WebAssembly. For older browsers, include a WebAssembly polyfill.

## Node.js Support

Works in Node.js 12+ with WebAssembly support.

## Platform Support

**Cloudflare Workers are not supported at this time, feel free to submit a PR if you get it working.**

## Contributing

This library wraps the original PCRE C library. For bug reports or feature requests, please open an issue on [GitHub](https://github.com/syntropiq/libpcre-ts).

## License

BSD-3-Clause (same as PCRE)

---

**Note**: This library wraps the original PCRE, not PCRE2. While PCRE2 is the modern standard, the original PCRE can be more permissive with certain patterns, making it useful for legacy compatibility and forgiving pattern matching.

```
    'Contact us at support@example.com',
    'Send reports to admin@test.org',
    'No email here!'
  ];
```

```
  emails.forEach((text, i) => {
    const result = emailRegex.exec(text, 0);
    console.log(`Email ${i + 1}:`, result.success ? result.match : 'Not found');
  });
  
  // Important: Clean up memory
  emailRegex.delete();
}
```

## API Reference

### Quick Functions

```typescript
// Test if pattern matches (boolean result)
pcre.quickTest(pattern: string, text: string, options: number): boolean

// Get detailed match information
pcre.quickMatch(pattern: string, text: string, options: number): MatchResult
```

### PCRERegex Class

```typescript
// Compile a regex pattern
const regex = new pcre.PCRERegex(pattern: string, options: number);

// Execute against text
const result = regex.exec(text: string, startOffset: number): MatchResult;

// Clean up (important!)
regex.delete(): void;
```

### Match Result

```typescript
interface MatchResult {
  success: boolean;    // Whether the pattern matched
  match?: string;      // The full matched text
  start?: number;      // Start position of match
  end?: number;        // End position of match  
  groups?: string[];   // Capture groups (numbered)
}
```

### Common Options

```typescript
pcre.PCRE_CASELESS      // Case insensitive matching
pcre.PCRE_MULTILINE     // ^ and $ match line boundaries
pcre.PCRE_DOTALL        // . matches newlines
pcre.PCRE_EXTENDED      // Ignore whitespace in patterns
pcre.PCRE_UTF8          // Enable UTF-8 mode
```

## Node.js vs Browser

### Node.js
```javascript
const PCRE = require('@syntropiq/libpcre-ts');
// Works out of the box
```

### Browser (ES Modules)
```javascript
import PCRE from '@syntropiq/libpcre-ts';
// Ensure your bundler supports WebAssembly
```

### Browser (Script Tag)
```html
<script src="https://unpkg.com/@syntropiq/libpcre-ts/dist/index.js"></script>
<script>
  PCRE().then(pcre => {
    // Use pcre here
  });
</script>
```

## Memory Management

**Important**: Always call `.delete()` on compiled regex objects to prevent memory leaks:

```typescript
const regex = new pcre.PCRERegex('pattern', 0);
// ... use regex ...
regex.delete(); // Essential!

// Or use try/finally
const regex = new pcre.PCRERegex('pattern', 0);
try {
  // Use regex
} finally {
  regex.delete();
}
```

## Error Handling

```typescript
try {
  // Invalid regex pattern
  const regex = new pcre.PCRERegex('[invalid', 0);
} catch (error) {
  console.error('Pattern compilation failed:', error.message);
}

// Check match results
const result = pcre.quickMatch('pattern', 'text', 0);
if (!result.success) {
  console.log('No match found');
}
```

## PCRE vs JavaScript Regex

| Feature | JavaScript | PCRE |
|---------|------------|------|
| Lookbehind | Limited | Full support |
| Named groups | ✅ | ✅ |
| Recursion | ❌ | ✅ |
| Unicode properties | Limited | Full |
| Pattern strictness | Strict | Permissive |

## Contributing

- All build and setup is automated via scripts in the `scripts/` directory.
- See `PLAN.md` and `TODO.md` for current development status and workflow.
- To build and test locally, just run:
  ```bash
  npm run build && npm test
  ```

## License

- PCRE library: BSD-style license
- Wrapper code: MIT license

---

**Note**: This wraps the original PCRE library (version 8.x), not the newer PCRE2. While PCRE2 is more modern, the original PCRE's permissive nature makes it valuable for compatibility scenarios.
  
  // Use with full type safety
  const regex = new pcre.PCRERegex('\\d+', 0);
  const result = regex.exec('Found 123 numbers', 0);
  
  if (result.success) {
    console.log(`Matched: ${result.match} at position ${result.start}`);
  }
  
  regex.delete();
}
```

### Browser

```html
<!DOCTYPE html>
<html>
<head>
  <title>PCRE WebAssembly Example</title>
</head>
<body>
  <script type="module">
    import PCRE from './build/libpcre.js';
    
    async function demo() {
      const pcre = await PCRE();
      
      // Test complex regex patterns not supported by JavaScript
      const result = pcre.quickMatch(
        '(?P<protocol>https?)://(?P<domain>[^/]+)',
        'Visit https://example.com for more info',
        0
      );
      
      console.log('Parsed URL:', result);
    }
    
    demo();
  </script>
</body>
</html>
```

## API Reference

### Quick Functions

#### `quickTest(pattern: string, text: string, options: number): boolean`
Returns true if the pattern matches the text.

#### `quickMatch(pattern: string, text: string, options: number): MatchResult`
Returns detailed match information including capture groups.

```typescript
interface MatchResult {
  success: boolean;
  match?: string;      // Full match text
  start?: number;      // Start position
  end?: number;        // End position
  groups?: string[];   // Capture groups
}
```

### PCRERegex Class

#### `new PCRERegex(pattern: string, options: number)`
Creates a compiled regex object.

#### `exec(text: string, startOffset: number): MatchResult`
Executes the regex against the text starting at the given offset.

#### `delete(): void`
Frees the compiled regex memory. Important for preventing memory leaks.

### PCRE Options

| Constant | Description |
|----------|-------------|
| `PCRE_CASELESS` | Case insensitive matching |
| `PCRE_MULTILINE` | ^ and $ match newlines |
| `PCRE_DOTALL` | . matches newlines |
| `PCRE_EXTENDED` | Ignore whitespace and # comments |
| `PCRE_ANCHORED` | Match only at start of subject |
| `PCRE_UTF8` | Enable UTF-8 mode |
| `PCRE_UNGREEDY` | Make quantifiers non-greedy by default |
| `PCRE_NO_AUTO_CAPTURE` | Disable automatic capturing |

### Utility Functions

#### `getVersionString(): string`
Returns the PCRE version string.

#### `getConfigInfo(): object`
Returns PCRE build configuration information.

## Advanced Features

### Named Capture Groups

```javascript
const regex = new pcre.PCRERegex(
  '(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})',
  0
);
const result = regex.exec('Date: 2023-12-25', 6);
// result.groups will contain named captures
```

### Look-ahead and Look-behind

```javascript
// Positive lookbehind (not supported in JavaScript regex)
const regex = new pcre.PCRERegex('(?<=\\$)\\d+\\.\\d{2}', 0);
const result = regex.exec('Price: $19.99', 0);
```

### Recursive Patterns

```javascript
// Match balanced parentheses (impossible with JavaScript regex)
const regex = new pcre.PCRERegex('\\((?:[^()]++|(?R))*\\)', 0);
```

## Error Handling

```javascript
try {
  const regex = new pcre.PCRERegex('[invalid', 0);
} catch (error) {
  console.error('Compilation failed:', error.message);
}

const result = regex.exec('test', 0);
if (!result.success) {
  console.log('No match found');
}
```

## Performance Tips

1. **Reuse compiled regexes** - Don't create new PCRERegex objects for each match
2. **Call delete()** - Always clean up PCRERegex objects to prevent memory leaks
3. **Use quickTest()** - For simple boolean tests, it's faster than creating objects
4. **Study patterns** - PCRE automatically optimizes frequently used patterns

## Building from Source

### Requirements

- Emscripten SDK 3.1.6+
- CMake 3.16+
- Git

### Automated Build & Setup

All setup, submodule, and build steps are automated:

```bash
npm run build
```

This will:
- Check/install required tools (git, cmake, emcc)
- Initialize submodules
- Build the WASM binary and loader
- Build ESM and CJS outputs (with Vite and TypeScript)
- Generate and copy type definitions

**Manual build steps are no longer required.**

## License

This project combines:
- PCRE library: BSD-style license
- WebAssembly wrapper: MIT license

See the individual license files for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Troubleshooting

### Common Issues

**Module loading fails in browser:**
Ensure you're serving files over HTTP/HTTPS, not file:// protocol.

**Memory errors:**
Make sure to call `.delete()` on PCRERegex objects when done.

**Pattern compilation fails:**
PCRE uses slightly different syntax than JavaScript. Check the [PCRE documentation](https://www.pcre.org/original/doc/html/pcrepattern.html).

### Getting Help

- [PCRE Documentation](https://www.pcre.org/original/doc/html/)
- [WebAssembly Troubleshooting](https://emscripten.org/docs/porting/Debugging.html)
- [GitHub Issues](https://github.com/syntropiq/libpcre-ts/issues)

## Examples

See the `test/*` directory for more detailed usage examples:
- Basic pattern matching
- Complex regex features
- Performance benchmarks
- Browser integration
- Node.js applications

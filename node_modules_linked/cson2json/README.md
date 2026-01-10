# cson2json

A super-lightweight library for converting CSON objects to JSON objects.

## Features

The only reason for this library's existence is because all other available CSON parsers for JavaScript load the entirety of CoffeeScript for parsing CSON objects, they basically load an entire language for parsing a relatively simple data format. This library on the other hand is tiny, has 0 dependencies, and can work in the browser too.

## Install

```sh
npm install --save cson2json
```

## Usage

```ts
import cson2json from 'cson2json';

const cson = '[foo:true]';
const json = cson2json ( cson ); // => [{ foo: true }]
```

## License

MIT © Fabio Spampinato

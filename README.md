# set-interval-manager

[![npm version](https://img.shields.io/npm/v/set-interval-manager.svg)](https://www.npmjs.com/package/set-interval-manager)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ftonato/set-interval-manager/blob/main/LICENSE)

A utility class for managing intervals created by `setInterval`.

## Installation

You can install the package using npm:

```bash
npm install set-interval-manager
```

## Examples

```js
// ES6 import
import SetInterval from 'set-interval-manager';

// (or) CommonJS require
const SetInterval = require('set-interval-manager');


const mockFn = () => 'set-interval-manager';

// --- (start + clear) ---

SetInterval.start(mockFn, 1000, 'basic-example');

SetInterval.clear('basic-example');

// --- (start + clearAll) ---

SetInterval.start(mockFn, 1000, 'interval-one');
SetInterval.start(mockFn, 1500, 'interval-two');
SetInterval.start(mockFn, 2000, 'interval-three');

SetInterval.clearAll();

// --- (start + listAll) ---

SetInterval.start(mockFn, 1000, 'interval-one');
SetInterval.start(mockFn, 1500, 'interval-two');

SetInterval.listAll(); // => ['interval-one', 'interval-two']

SetInterval.clear('interval-one');

SetInterval.listAll(); // => ['interval-two']
```

----

## API

### `SetInterval`

The main class exported by the package.

#### `start(fn: IntervalFn, interval: number, key: string): void`

Starts a new interval that calls the specified function at the specified interval.

- `fn` (required): The function to call.
- `interval` (required): The interval (in milliseconds) at which to call the function.
- `key` (required): A unique string identifier for the interval.

#### `clear(key: string): void`

Stops the interval with the specified key.

- `key` (required): The string identifier for the interval to stop.

#### `clearAll(): void`

Stops all intervals managed by this utility.

#### `listAll(): string[]`

Gets an array of all keys currently being used to manage intervals.

----

## License

This package is released under the [MIT License](https://github.com/ftonato/set-interval-manager/blob/main/LICENSE).
# @diatche/parse-time

[![Node.js CI](https://github.com/diatche/parse-time/actions/workflows/node.js.yml/badge.svg)](https://github.com/diatche/parse-time/actions/workflows/node.js.yml)

A utility for parsing time duration and time of the day strings.

No external dependencies.

## Installation

```sh
yarn add @diatche/parse-time
```

Or with npm:

```sh
npm install --save @diatche/parse-time
```

## Usage

The main method `parseTime()` (`timeParse()` is an alias) parses human input time values into an object containing the hours, minutes and total milliseconds from the start of the day.

```javascript
import { parseTime } from 'parse-time';
const lunchtime = parseTime('12:30 pm');
const { hours, minutes, totalMs } = lunchtime;
```

You can also compare the returned object directly (as total milliseconds from the start of the day), thanks to `valueOf()` method implementation.

```javascript
const time = new Date('2021-06-03T12:31:00.000Z') % 86400000;
console.log('is it time for lunch?: ' + (time > lunchtime));
```

To limit the time to a specific amount, use the `max` option:

```javascript
let invalidTime = parseTime('25:00', { max: 86400e3 });
assert(typeof invalidTime === 'undefined');
```

Or use the `parseTimeOfDay()` method to limit the time to 24 hours. This is useful when parsing the date and time separately.

```javascript
import { parseTimeOfDay } from 'parse-time';
const { hours, minutes, totalMs } = parseTimeOfDay('09:00');
```

## Parsed Formats

Multiple input formats are supported. Have a look at the [unit tests](./tests/index.test.js) for a comprehensive list.

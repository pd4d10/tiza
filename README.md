# Tiza

[<img src="https://raw.githubusercontent.com/pd4d10/tiza/master/assets/demo.png" alt="demo" width="468">](https://tiza.js.org)

[![build](https://img.shields.io/travis/pd4d10/tiza.svg)](https://travis-ci.org/pd4d10/tiza)
[![coverage](https://img.shields.io/codecov/c/github/pd4d10/tiza.svg)](https://codecov.io/gh/pd4d10/tiza)
[![npm](https://img.shields.io/npm/v/tiza.svg)](https://www.npmjs.com/package/tiza)
[![gzip size](http://img.badgesize.io/https://unpkg.com/tiza/dist/tiza.min.js?compression=gzip)](https://unpkg.com/tiza/dist/tiza.min.js)

Tiza is a JavaScript library for browsers' console styling.

View demo here: https://tiza.js.org

## Installation

### NPM

```sh
npm install --save tiza
```

Then import it:

```js
import tiza from 'tiza'
// or via require if you are using commonjs
const tiza = require('tiza').default
```

### UMD bundle

Add script tag to your HTML file:

```html
<script src="https://unpkg.com/tiza/dist/tiza.min.js"></script>
```

## Usage

```js
import tiza from 'tiza'

tiza
  .color('#fff') // Set color, all CSS colors are supported
  .bgColor('purple') // Set background color
  .bold() // Set bold font
  .italic() // Set italic font
  .size(20) // Set font size

  // Support custom styles too!
  .style(`padding: 4px; border-radius: 2px;`)

  // After styles done right, it's time to add text now
  .text('Hey, I have styling now!')

  .space(8) // Add spaces
  .text('Hey, I am far away from previous one')

  .newline(2) // Add newline

  .reset() // Reset all styles set before

  .text('I lost my styles, because `reset` is called')

  .log() // log all texts above to console
```

**Always remember** to call `log` method at last.

### Styles reusing

To reuse styles, just make them nested like this:

```js
const error = tiza.color('red').text
const info = tiza.bold().bgColor('yellow').text

tiza.log(
  error('I am some error'),
  'I am some normal message',
  error('I am some error again!'),
  info('I am some info', error('I am still some error!')),
)
```

Notice that inside texts will not extend outside texts' styles.

For more detail see [API](#api)

## How does it work?

https://developers.google.com/web/tools/chrome-devtools/console/console-write

Find _Styling console output with CSS_

## Who's using Tiza

[Console Importer](https://github.com/pd4d10/console-importer)

## API

| Method                         | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tiza.color('#f00')`           | Set font color, support all CSS colors                                                                                                                                                                                                                                                                                   |
| `tiza.bgColor('#f00')`         | Set background color, support all CSS colors                                                                                                                                                                                                                                                                             |
| `tiza.bold()`                  | Set font weight to bold                                                                                                                                                                                                                                                                                                  |
| `tiza.italic()`                | Set font style to italic                                                                                                                                                                                                                                                                                                 |
| `tiza.size(14)`                | Set font size, number will be converted to `px`                                                                                                                                                                                                                                                                          |
| `tiza.style('color:#f00')`     | Set custom style, using inline style format                                                                                                                                                                                                                                                                              |
| `tiza.reset()`                 | Reset styles set before                                                                                                                                                                                                                                                                                                  |
| `tiza.text(...args: string[])` | Add text(s), support multiple arguments. Every text added here will be styled with styles set previously. Notice that every argument will be converted to string, and there will be no space between them(This behaviour is different with `console.log`). If you want to add a space, use `text('a').space().text('b')` |
| `tiza.space(count?: number)`   | Add space. The default count is 1                                                                                                                                                                                                                                                                                        |
| `tiza.newline(count?: number)` | Add newline. The default count is 1                                                                                                                                                                                                                                                                                      |
| `tiza.log()`                   | Log all texts to console with `console.log`. Always remember to call `log` at last. Arguments are also supported, `log(...args)` equals to `text(...args).log()`                                                                                                                                                         |
| `tiza.info()`                  | The same as `tiza.log`, but output with `console.info`                                                                                                                                                                                                                                                                   |
| `tiza.warn()`                  | The same as `tiza.log`, but output with `console.warn`                                                                                                                                                                                                                                                                   |
| `tiza.error()`                 | The same as `tiza.log`, but output with `console.error`                                                                                                                                                                                                                                                                  |

## License

MIT

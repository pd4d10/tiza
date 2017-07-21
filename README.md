# Tiza

Console styling for browsers. Demo here: https://pd4d10.github.io/tiza/

<img src="assets/demo.png" alt="demo" width="462">

## Installation

### NPM

```sh
npm install --save tiza
```

### UMD bundle

Add `<script src="https://rawgit.com/pd4d10/tiza/master/dist/tiza.min.js"></script>` to your HTML file

Or download [dist/tiza.min.js](dist/tiza.min.js)

## Usage

```js
tiza()                // Create an instance first
  .color('#fff')      // Set color, all CSS colors are supported
  .bgColor('purple')  // Set background color
  .bold()             // Set bold font
  .italic()           // Set italic font
  .size(20)           // Set font size

  // Support custom styles too!
  .style(`
    padding: 4px;
    border-radius: 2px;
  `)

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

To reuse styles, just make them nesting like this:

```js
const error = tiza().color('red').text
const info = tiza().bold().bgColor('yellow').text

tiza().log(
  error('I am some error'),
  'I am some normal message',
  error('I am some error again!'),
  info(
    'I am some info',
    error('I am still some error!')
  ),
)
```

Notice that it will not extend outside texts' styles.

## License

MIT

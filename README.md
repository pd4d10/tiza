# Cholk

Console styling for browsers

## Usage

```js
const cholk = require('cholk')

cholk.log(cholk.red('I am red'), cholk.blue('I am blue'))

cholk.log(cholk.style(`
  background: linear-gradient(to right, red, orange, yellow, green, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`)('I have custom style!'))
```

## License

MIT

# Tiza

Console styling for browsers

## Usage

```js
import tiza from 'tiza'

tiza.log(tiza.red('I am red'), tiza.blue('I am blue'))

tiza.log(tiza.style(`
  background: linear-gradient(to right, red, orange, yellow, green, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`)('I have custom style!'))
```

## License

MIT

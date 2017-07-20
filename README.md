# Tiza

Console styling for browsers

## Usage

```js
import tiza from 'tiza'

tiza()
  .color('red').size(16).log('Tiza')
  .reset().log(' is a tiny library for browsers\' console styling.')

  .newline(2)

  .log('Support')
  .space().color('#CC3399').log('All')
  .space().color('#FF6666').log('CSS')
  .space().color('#336699').log('colors')
  .reset().log(',')

  .space().color('#fff').bgColor('blue').log('background color')

  .reset()
  .log(', ')
  .bold().log('bold')

  .reset()
  .log(', ')
  .italic().log('italic')

  .reset()
  .log(', and ')
  .size(20).log('size')

  .reset().newline(2)

  .log('Support ')
  .color('#fff')
  .style({
    background: 'linear-gradient(to right, red, orange, green, blue)',
    padding: '4px',
    'border-radius': '4px'
  })
  .log('Custom styles')
  .reset().log(' too!')

  .reset().newline(2).log('Give it a try! https://github.com/pd4d10/tiza')

  // Always remember to call `flush` at last to put all to console
  .flush()
```

## API

## License

MIT

---
layout: default
---

**Open the console** to see how it works.

- macOS: `Option + Meta + I`
- Windows and Linux: `Ctrl + Shift + I`

<!-- prettier-ignore -->
```js
tiza
  .color('#CC3399').bold().text('Tiza')
  .reset().text(' is a JavaScript library for browsers\' console styling.')

  .text("\n\n")

  .text('Support')
  .text(' ').color('#FF6666').text('All')
  .text(' ').color('#6666CC').text('CSS')
  .text(' ').color('#009933').text('colors')
  .reset().text(',')

  .text(' ').color('#fff').bgColor('#9933CC').text('background')

  .reset().text(', ')
  .bold().text('bold')

  .reset().text(', ')
  .italic().text('italic')

  .reset().text(', and ')
  .size(18).text('size')

  .reset().text('\n\n')

  .text('Support ')
  .color('#fff').style(`
    background: linear-gradient(to right, red, orange, green, blue);
    padding: 4px;
    border-radius: 4px;
  `)
  .text('custom styles')
  .reset().text(' too!')

  .reset().text('\n\n').text('Give it a try! ⚡️ https://github.com/pd4d10/tiza')

  // Always remember to call `log` at last to put all texts to console
  .log()
```

{% include script.html %}

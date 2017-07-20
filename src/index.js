import { stringify, repeat } from './utils'

class Tiza {
  constructor() {
    this.currentStyle = {}
    this.texts = []
    this.styles = []
  }

  style(s) {
    if (typeof style === 'string') {
      this.currentStyle = style
    } else {
      Object.assign(this.currentStyle, s)
    }
    return this
  }

  color(c) {
    this.currentStyle.color = c
    return this
  }

  bgColor(c) {
    this.currentStyle['background-color'] = c
    return this
  }

  bold() {
    this.currentStyle['font-weight'] = 'bold'
    return this
  }

  italic() {
    this.currentStyle['font-style'] = 'italic'
    return this
  }

  size(n) {
    if (typeof n === 'number') {
      n = `${n}px`
    }
    this.currentStyle['font-size'] = n
    return this
  }

  reset() {
    this.currentStyle = {}
    return this
  }

  log(text) {
    this.texts.push(`%c${text}`)
    this.styles.push(
      typeof this.currentStyle === 'string'
        ? this.currentStyle
        : stringify(this.currentStyle)
    )
    return this
  }

  space(count = 1) {
    this.log(repeat(' ', count))
    return this
  }

  newline(count = 1) {
    this.log(repeat('\n', count))
    return this
  }

  flush() {
    console.log(this.texts.join(''), ...this.styles)
  }
}

export default function tiza() {
  return new Tiza()
}

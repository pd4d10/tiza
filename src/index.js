import { stringify, repeat } from './utils'

class Tiza {
  constructor() {
    this.style = {}
    this.texts = []
    this.styles = []
  }

  style(s) {
    Object.assign(this.style, s)
    return this
  }

  color(c) {
    this.style.color = c
    return this
  }

  bgColor(c) {
    this.style['background-color'] = c
    return this
  }

  bold() {
    this.style['font-weight'] = 'bold'
    return this
  }

  italic() {
    this.style['font-style'] = 'italic'
    return this
  }

  reset() {
    this.style = {}
    return this
  }

  log(text) {
    this.texts.push(`%c${text}`)
    this.styles.push(stringify(this.style))
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
    console.log(...this.texts, ...this.styles)
  }
}

export default function tiza() {
  return new Tiza()
}

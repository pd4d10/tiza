import { stringify, repeat } from './utils'

class Tiza {
  constructor() {
    this.currentStyles = []
    this.texts = []
    this.styles = []
  }

  style(s) {
    this.currentStyles.push(s)
    return this
  }

  color(c) {
    this.currentStyles.push({ color: c })
    return this
  }

  bgColor(c) {
    this.currentStyles.push({ 'background-color': c })
    return this
  }

  bold() {
    this.currentStyles.push({ 'font-weight': 'bold' })
    return this
  }

  italic() {
    this.currentStyles.push({ 'font-style': 'italic' })
    return this
  }

  size(n) {
    this.currentStyles.push({
      'font-size': typeof n === 'number' ? `${n}px` : n,
    })
    return this
  }

  reset() {
    this.currentStyles = []
    return this
  }

  log(text) {
    this.texts.push(`%c${text}`)

    const styles = []
    this.currentStyles.forEach(style => {
      styles.push(typeof style === 'string' ? style : stringify(style))
    })
    this.styles.push(styles.join(';'))
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

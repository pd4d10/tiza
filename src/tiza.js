import { repeat } from './utils'

function repeat(text, count) {
  return Array(count + 1).join(text)
}

export default class Tiza {
  constructor(currentStyles = [], texts = [], styles = []) {
    this._currentStyles = currentStyles
    this._texts = texts
    this._styles = styles
  }

  // Get method
  getCurrentStyles = () => this._currentStyles

  getTexts = () => this._texts

  getStyles = () => this._styles

  // Push a style to current Styles
  style = s => new Tiza([...this._currentStyles, s], this._texts, this._styles)

  // Alias for style method
  color = c => this.style(`color:${c}`)

  bgColor = c => this.style(`background-color:${c}`)

  bold = () => this.style('font-weight:bold')

  italic = () => this.style('font-style:italic')

  size = n => {
    const s = typeof n === 'number' ? `${n}px` : n // Convert number to px
    return this.style(`font-size:${s}`)
  }

  // Clear all current styles
  reset = () => new Tiza([], this._texts, this._styles)

  text = (...args) => {
    const texts = [...this._texts]
    const styles = [...this._styles]
    args.forEach(arg => {
      if (arg instanceof Tiza) {
        texts.push(...arg.getTexts())
        styles.push(...arg.getStyles())
      } else {
        texts.push(arg)
        styles.push(this._currentStyles.join(';'))
      }
    })
    return new Tiza(this._currentStyles, texts, styles)
  }

  // Alias for text method
  space = (count = 1) => this.text(repeat(' ', count))

  newline = (count = 1) => this.text(repeat('\n', count))

  log = (...args) => {
    const ins = this.text(...args)
    console.log(ins.getTexts().map(t => `%c${t}`).join(''), ...ins._styles)
    return new Tiza(ins.getCurrentStyles(), [], [])
  }
}

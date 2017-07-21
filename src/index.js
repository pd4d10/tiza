import { repeat } from './utils'

export class Tiza {
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
  style = s => tiza([...this._currentStyles, s], this._texts, this._styles)

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
  reset = () => tiza([], this._texts, this._styles)

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
    return tiza(this._currentStyles, texts, styles)
  }

  // Alias for text method
  space = (count = 1) => this.text(repeat(' ', count))

  newline = (count = 1) => this.text(repeat('\n', count))

  log = (...args) => {
    const ins = this.text(...args)
    console.log(`%c${ins.getTexts()}`.join(''), ...ins._styles)
    return tiza(ins.getCurrentStyles(), [], [])
  }
}

// Factory function
export default function tiza(...args) {
  return new Tiza(...args)
}

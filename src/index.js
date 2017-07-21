import { stringify, repeat } from './utils'

class Tiza {
  _currentStyles = []
  _texts = []
  _styles = []

  getTexts = () => {
    return this._texts
  }

  getStyles = () => {
    return this._styles
  }

  style = s => {
    this._currentStyles.push(s)
    return this
  }

  color = c => {
    this.style({ color: c })
    return this
  }

  bgColor = c => {
    this.style({ 'background-color': c })
    return this
  }

  bold = () => {
    this.style({ 'font-weight': 'bold' })
    return this
  }

  italic = () => {
    this.style({ 'font-style': 'italic' })
    return this
  }

  size = n => {
    this.style({
      'font-size': typeof n === 'number' ? `${n}px` : n,
    })
    return this
  }

  reset = () => {
    this._currentStyles = []
    return this
  }

  log = (...args) => {
    args.forEach(arg => {
      if (arg instanceof Tiza) {
        this._texts.push(...arg.getTexts())
        this._styles.push(...arg.getStyles())
      } else {
        this._texts.push(`%c${arg}`)

        const styles = []
        this._currentStyles.forEach(style => {
          styles.push(typeof style === 'string' ? style : stringify(style))
        })
        this._styles.push(styles.join(';'))
      }
    })
    return this
  }

  space = (count = 1) => {
    this.log(repeat(' ', count))
    return this
  }

  newline = (count = 1) => {
    this.log(repeat('\n', count))
    return this
  }

  flush = () => {
    console.log(this._texts.join(''), ...this._styles)
  }
}

export default function tiza() {
  return new Tiza()
}

function repeat(text: string, count: number) {
  return Array(count + 1).join(text)
}

export default class Tiza {
  _currentStyles: string[]
  _texts: string[]
  _styles: string[]

  constructor(
    currentStyles: string[] = [],
    texts: string[] = [],
    styles: string[] = [],
  ) {
    this._currentStyles = currentStyles
    this._texts = texts
    this._styles = styles
  }

  // Get method
  getCurrentStyles = () => this._currentStyles

  getTexts = () => this._texts

  getStyles = () => this._styles

  // Push a style to current Styles
  style = (s: string) =>
    new Tiza([...this._currentStyles, s], this._texts, this._styles)

  // Alias for style method
  color = (c: string) => this.style(`color:${c}`)

  bgColor = (c: string) => this.style(`background-color:${c}`)

  bold = () => this.style('font-weight:bold')

  italic = () => this.style('font-style:italic')

  size = (n: number | string) => {
    const s = typeof n === 'number' ? `${n}px` : n // Convert number to px
    return this.style(`font-size:${s}`)
  }

  // Clear all current styles
  reset = () => new Tiza([], this._texts, this._styles)

  text = (...args: (string | Tiza)[]) => {
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

  _output = (type: 'log' | 'info' | 'warn' | 'error') => (
    ...args: string[]
  ) => {
    const ins = this.text(...args)
    console[type](
      ins
        .getTexts()
        .map(t => `%c${t}`)
        .join(''),
      ...ins._styles,
    )
    return new Tiza(ins.getCurrentStyles(), [], [])
  }

  log = this._output('log')

  info = this._output('info')

  warn = this._output('warn')

  error = this._output('error')
}

import { stringify, capitalize, assign } from './utils'

const props = Object.create(null)

// Add common colors
// For font color and background color
const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
]
colors.forEach(color => {
  props[color] = {
    get() {
      return createChalk({ color }, this._styles)
    },
  }
  props[`bg${capitalize(color)}`] = {
    get() {
      return createChalk({ 'background-color': color }, this._styles)
    },
  }
})

// Font style
props.italic = {
  get() {
    return createChalk({ 'font-style': 'italic' }, this._styles)
  },
}

// Font weight
props.bold = {
  get() {
    return createChalk({ 'font-weight': 'bold' }, this._styles)
  },
}

const proto = Object.create(null)
Object.defineProperties(proto, props)

// Custom style
proto.style = styles => {
  return createChalk(styles)
}

proto.log = (...args) => {
  const results = []
  const styles = []
  args.forEach(arg => {
    if (typeof arg === 'object' && arg.style) {
      results.push(`%c${arg.text}`)
      styles.push(
        typeof arg.style === 'string' ? arg.style : stringify(arg.style)
      )
    } else {
      results.push(`%c${arg}`)
      styles.push('')
    }
  })
  console.log(results.join(''), ...styles)
}

function createChalk(style = {}, previousStyles) {
  if (previousStyles) {
    style = Object.assign(previousStyles, style)
  }
  function chalk(...args) {
    return {
      text: args.join(''),
      style,
    }
  }
  Object.setPrototypeOf(chalk, proto)
  chalk._styles = style
  return chalk
}

module.exports = createChalk()

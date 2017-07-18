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
      return createTiza({ color }, this)
    },
  }
  props[`bg${capitalize(color)}`] = {
    get() {
      return createTiza({ 'background-color': color }, this)
    },
  }
})

// Font style
props.italic = {
  get() {
    return createTiza({ 'font-style': 'italic' }, this)
  },
}

// Font weight
props.bold = {
  get() {
    return createTiza({ 'font-weight': 'bold' }, this)
  },
}

const proto = Object.create(null)
Object.defineProperties(proto, props)

// Custom style
proto.style = styles => {
  return createTiza(styles)
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

function createTiza(style = {}, previous) {
  if (previous) {
    style = Object.assign({}, previous._styles, style)
  }
  function tiza(...args) {
    return {
      text: args.join(''),
      style,
    }
  }
  Object.setPrototypeOf(tiza, proto)
  tiza._styles = style
  return tiza
}

module.exports = createTiza()

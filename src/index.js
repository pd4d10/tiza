// Stringify styles
function stringify(style) {
  if (typeof style === 'string') {
    return style
  }

  return Object.keys(style)
    .map(key => {
      return `${key}:${style[key]}`
    })
    .join(';')
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}

function cholk(text) {
  return {
    style: stringify(cholk._style),
    text,
  }
}

cholk._style = {}
cholk.log = (...args) => {
  const results = []
  const styles = []
  args.forEach(arg => {
    if (typeof arg === 'object' && arg.style) {
      results.push(`%c${arg.text}`)
      styles.push(arg.style)
    } else {
      results.push(`%c${arg}`)
      styles.push('')
    }
  })
  console.log(results.join(''), ...styles)
}

const proto = Object.create(null)
const properties = {}

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
  properties[color] = {
    get() {
      cholk._style.color = color
      return cholk
    },
  }
  properties[`bg${capitalize(color)}`] = {
    get() {
      cholk._style['background-color'] = color
      return cholk
    },
  }
})

// Font style
properties.italic = {
  get() {
    cholk._style['font-style'] = 'italic'
    return cholk
  },
}

// Font weight
properties.bold = {
  get() {
    cholk._style['font-weight'] = 'bold'
    return cholk
  },
}

// Custom style
proto.style = styleString => {
  cholk._style = styleString
  return cholk
}

Object.defineProperties(proto, properties)

cholk.__proto__ = proto

export default cholk

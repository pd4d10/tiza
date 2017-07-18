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

// Add common colors
const colors = ['red', 'blue', 'green']
const properties = colors.reduce((props, color) => {
  props[color] = {
    get() {
      cholk._style.color = color
      return cholk
    },
  }
  return props
}, {})

// Custom style
proto.style = styleString => {
  cholk._style = styleString
  return cholk
}

Object.defineProperties(proto, properties)

cholk.__proto__ = proto

export default cholk

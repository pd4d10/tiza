const colors = ['red', 'blue', 'green']

// Stringify styles
function stringify(obj) {
  return Object.keys(obj)
    .map(key => {
      return `${key}:${obj[key]}`
    })
    .join(';')
}

function cholk(text) {
  return {
    style: cholk._style,
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
      styles.push(stringify(arg.style))
    } else {
      results.push(`%c${arg}`)
      styles.push('')
    }
  })
  console.log(results.join(''), ...styles)
}

const proto = Object.create(null)
const properties = colors.reduce((props, color) => {
  props[color] = {
    get() {
      cholk._style.color = color
      return cholk
    },
  }
  return props
}, {})

Object.defineProperties(proto, properties)

cholk.__proto__ = proto

export default cholk

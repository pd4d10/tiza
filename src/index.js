const colors = ['red', 'blue', 'green']

function cholk(text) {
  return {
    style: cholk._style,
    text,
  }
}

cholk._style = {}

const proto = Object.create(null)
const properties = colors.reduce((props, color) => {
  props[color] = {
    get() {
      cholk._style.color = color
      return cholk
    }
  }
  return props
}, {})

Object.defineProperties(proto, properties)

cholk.__proto__ = proto

export default cholk

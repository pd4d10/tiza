const colors = ['red', 'blue', 'green']

function Cholk(text) {
  this._style = {}
  if (!this instanceof Cholk) {
    const cholk = Object.create(null)
    return
  }
}

const proto = Object.create(null)
const properties = colors.reduce((props, color) => {
  props[color] = {
    get() {
      this._style.color = color
      return this
    }
  }
  return props
}, {})

Object.defineProperties(proto, properties)
Cholk.prototype = proto

const cholk = new Cholk()

export default cholk

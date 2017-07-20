// Stringify styles
export function stringify(style) {
  return Object.keys(style)
    .map(key => {
      return `${key}:${style[key]}`
    })
    .join(';')
}

export function repeat(text, count) {
  return Array(count + 1).join(text)
}

// Stringify styles
export function stringify(style) {
  return Object.keys(style)
    .map(key => {
      return `${key}:${style[key]}`
    })
    .join(';')
}

export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}

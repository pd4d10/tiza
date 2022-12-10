type t = {
  currentStyles: array<string>,
  texts: array<string>,
  styles: array<string>,
}

let style = (t, v) => {
  ...t,
  currentStyles: t.currentStyles->Js.Array2.concat([v]),
}

let reset = (t, v) => {
  ...t,
  currentStyles: [],
}

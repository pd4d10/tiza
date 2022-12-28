type t = {
  currentStyles: array<string>,
  texts: array<string>,
  styles: array<string>,
}

@genType
let tiza = {
  currentStyles: [],
  texts: [],
  styles: [],
}

@genType
let style = (t, v) => {
  ...t,
  currentStyles: t.currentStyles->Js.Array2.concat([v]),
}

@genType
let color = (t, color) => style(t, "color:" ++ color)

@genType
let bgColor = (t, color) => style(t, "background-color:" ++ color)

@genType
let bold = style(_, "font-weight:bold")

@genType
let italic = style(_, "font-style:italic")

@genType
let sizeRaw = (t, s) => style(t, "font-size:" ++ s)

@genType
let size = (t, i) => sizeRaw(t, i->Belt.Int.toString ++ "px")

@genType
let reset = t => {
  ...t,
  currentStyles: [],
}

@genType
let text = (t, v) => {
  ...t,
  texts: t.texts->Js.Array2.concat([v]),
  styles: t.styles->Js.Array2.concat([t.currentStyles->Js.Array2.joinWith(";")]),
}

@genType
let combine = (t, t1) => {
  ...t,
  texts: t.texts->Js.Array2.concat(t1.texts),
  styles: t.styles->Js.Array2.concat(t1.styles),
}

let _output = (logFn, t, texts) => {
  let ins = texts->Js.Array2.reduce(text, t)

  let text =
    ins.texts
    ->Js.Array2.map(v => {
      "%c" ++ v
    })
    ->Js.Array2.joinWith("")

  let results = [text]->Js.Array2.concat(ins.styles)
  logFn(results)

  {
    ...t,
    texts: [],
    styles: [],
  }
}

@genType
let logN = _output(Js.Console.logMany)

let log = (t, s) => logN(t, [s])

@genType
let infoN = _output(Js.Console.infoMany)

let info = (t, s) => infoN(t, [s])

@genType
let warnN = _output(Js.Console.warnMany)

let warn = (t, s) => warnN(t, [s])

@genType
let errorN = _output(Js.Console.errorMany)

let error = (t, s) => errorN(t, [s])

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
let size = (t, s) => style(t, "font-size:" ++ s)

@genType
let sizeF = (t, f) => size(t, f->Belt.Float.toString ++ "px")

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
let textN = (t, vs) => {
  ...t,
  texts: t.texts->Js.Array2.concat(vs),
  styles: t.styles->Js.Array2.concat([t.currentStyles->Js.Array2.joinWith(";")]),
}

@genType
let space = text(_, " ")

@genType
let spaceN = (t, n) => text(t, " "->Js.String2.repeat(n))

@genType
let newline = text(_, "\n")

@genType
let newlineN = (t, n) => text(t, "\n"->Js.String2.repeat(n))

let _output = (logFn, t, args) => {
  let ins = t->textN(args)
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

import {
  t as T,
  tiza,
  style,
  color,
  bgColor,
  bold,
  italic,
  sizeS,
  size,
  reset,
  textN,
  spaceN,
  newlineN,
  logN,
  infoN,
  warnN,
  errorN,
} from "./Tiza.bs";

function wrap<T>(t: T, methods: Record<string, Function>): T {
  const proto: Record<string, any> = {};
  Object.keys(methods).forEach((name) => {
    proto[name] = function (...args: any[]) {
      const next = methods[name](this, ...args);
      Object.setPrototypeOf(next, proto);
      return next;
    };
  });
  Object.setPrototypeOf(t, proto);
  return t;
}

export default wrap(tiza, {
  style,
  color,
  bgColor,
  bold,
  italic,
  size(t: T, n: number | string) {
    return typeof n === "number" ? size(t, n) : sizeS(t, n);
  },
  reset,
  text(t: T, ...args: string[]) {
    return textN(t, args);
  },
  space(t: T, count = 1) {
    return spaceN(t, count);
  },
  newline(t: T, count = 1) {
    return newlineN(t, count);
  },
  log(t: T, ...args: string[]) {
    return logN(t, args);
  },
  info(t: T, ...args: string[]) {
    return infoN(t, args);
  },
  warn(t: T, ...args: string[]) {
    return warnN(t, args);
  },
  error(t: T, ...args: string[]) {
    return errorN(t, args);
  },
});

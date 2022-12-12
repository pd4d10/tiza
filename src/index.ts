import {
  t as T,
  tiza,
  style,
  color,
  bgColor,
  bold,
  italic,
  sizeRaw,
  size,
  reset,
  text,
  combine,
  space,
  newline,
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
    return typeof n === "number" ? size(t, n) : sizeRaw(t, n);
  },
  reset,
  text(t: T, ...args: (string | T)[]) {
    for (let arg of args) {
      t = typeof arg === "string" ? text(t, arg) : combine(t, arg);
    }
    return t;
  },
  space(t: T, count = 1) {
    for (let i = 0; i < count; i++) {
      t = space(t);
    }
    return t;
  },
  newline(t: T, count = 1) {
    for (let i = 0; i < count; i++) {
      t = newline(t);
    }
    return t;
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

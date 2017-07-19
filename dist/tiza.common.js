'use strict';

// Stringify styles
function stringify(style) {
  return Object.keys(style).map(function (key) {
    return key + ':' + style[key];
  }).join(';');
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var props = Object.create(null);

// Add common colors
// For font color and background color
var colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];
colors.forEach(function (color) {
  props[color] = {
    get: function get() {
      return createTiza({ color: color }, this);
    }
  };
  props['bg' + capitalize(color)] = {
    get: function get() {
      return createTiza({ 'background-color': color }, this);
    }
  };
});

// Font style
props.italic = {
  get: function get() {
    return createTiza({ 'font-style': 'italic' }, this);
  }
};

// Font weight
props.bold = {
  get: function get() {
    return createTiza({ 'font-weight': 'bold' }, this);
  }
};

var proto = Object.create(null);
Object.defineProperties(proto, props);

// Custom style
proto.style = function (styles) {
  return createTiza(styles);
};

proto.log = function () {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var results = [];
  var styles = [];
  args.forEach(function (arg) {
    if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.style) {
      results.push('%c' + arg.text);
      styles.push(typeof arg.style === 'string' ? arg.style : stringify(arg.style));
    } else {
      results.push('%c' + arg);
      styles.push('');
    }
  });
  (_console = console).log.apply(_console, [results.join('')].concat(styles));
};

function createTiza() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var previous = arguments[1];

  if (previous) {
    style = Object.assign({}, previous._styles, style);
  }
  function tiza() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return {
      text: args.join(''),
      style: style
    };
  }
  Object.setPrototypeOf(tiza, proto);
  tiza._styles = style;
  return tiza;
}

var index = createTiza();

module.exports = index;

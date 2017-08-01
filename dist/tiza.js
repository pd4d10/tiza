/**
 * Tiza v2.1.0
 * Copyright (c) 2017 pd4d10
 * Released under the MIT License.
 * https://github.com/pd4d10/tiza
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.tiza = factory());
}(this, (function () { 'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function repeat(text, count) {
  return Array(count + 1).join(text);
}

var Tiza = function Tiza() {
  var currentStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var texts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  _classCallCheck(this, Tiza);

  _initialiseProps.call(this);

  this._currentStyles = currentStyles;
  this._texts = texts;
  this._styles = styles;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getCurrentStyles = function () {
    return _this._currentStyles;
  };

  this.getTexts = function () {
    return _this._texts;
  };

  this.getStyles = function () {
    return _this._styles;
  };

  this.style = function (s) {
    return new Tiza([].concat(_toConsumableArray(_this._currentStyles), [s]), _this._texts, _this._styles);
  };

  this.color = function (c) {
    return _this.style('color:' + c);
  };

  this.bgColor = function (c) {
    return _this.style('background-color:' + c);
  };

  this.bold = function () {
    return _this.style('font-weight:bold');
  };

  this.italic = function () {
    return _this.style('font-style:italic');
  };

  this.size = function (n) {
    var s = typeof n === 'number' ? n + 'px' : n; // Convert number to px
    return _this.style('font-size:' + s);
  };

  this.reset = function () {
    return new Tiza([], _this._texts, _this._styles);
  };

  this.text = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var texts = [].concat(_toConsumableArray(_this._texts));
    var styles = [].concat(_toConsumableArray(_this._styles));
    args.forEach(function (arg) {
      if (arg instanceof Tiza) {
        texts.push.apply(texts, _toConsumableArray(arg.getTexts()));
        styles.push.apply(styles, _toConsumableArray(arg.getStyles()));
      } else {
        texts.push(arg);
        styles.push(_this._currentStyles.join(';'));
      }
    });
    return new Tiza(_this._currentStyles, texts, styles);
  };

  this.space = function () {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return _this.text(repeat(' ', count));
  };

  this.newline = function () {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return _this.text(repeat('\n', count));
  };

  this._output = function (type) {
    return function () {
      var _console;

      var ins = _this.text.apply(_this, arguments);
      (_console = console)[type].apply(_console, [ins.getTexts().map(function (t) {
        return '%c' + t;
      }).join('')].concat(_toConsumableArray(ins._styles)));
      return new Tiza(ins.getCurrentStyles(), [], []);
    };
  };

  this.log = this._output('log');
  this.info = this._output('info');
  this.warn = this._output('warn');
  this.error = this._output('error');
};

var index = new Tiza();

return index;

})));

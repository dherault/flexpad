/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* --------------------------- */
/* JS helper for inline-styles */
/* --------------------------- */

var Flexpad = __webpack_require__(1);

var flexpad = function flexpad(code) {
  return new Flexpad(code).toJs();
};

module.exports = flexpad;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ------------------------------------------------------------------- */
/* Main class: converts a class string to corresponding CSS properties */
/* can output the result as a CSS string or an inline-style JS object  */
/* ------------------------------------------------------------------- */

var start = 'flex-start';
var center = 'center';
var end = 'flex-end';

var isTop = function isTop(i) {
  return i > 6;
};
var isMiddle = function isMiddle(i) {
  return i > 3 && i < 7;
};
var isBottom = function isBottom(i) {
  return i < 4;
};
var isLeft = function isLeft(i) {
  return i == 1 || i == 4 || i == 7;
};
var isCenter = function isCenter(i) {
  return i == 2 || i == 5 || i == 8;
};
var isRight = function isRight(i) {
  return i == 3 || i == 6 || i == 9;
};

function decode(code) {
  if (!(typeof code === 'string' && code.length > 1)) return null;

  var _ = 0;

  var x = code[0] === 'x';
  var i = code[1];
  var j = parseInt(code[2]);

  if (j || j === 0) _++;

  var a = code[_ + 2] === 'a';
  var b = code[_ + 2] === 'b';

  if (a || b) _++;

  var s = code[_ + 2] === 's';

  var isNorth = x ? isTop : isLeft;
  var atEquator = x ? isMiddle : isCenter;
  var isSouth = x ? isBottom : isRight;
  var isWest = x ? isLeft : isTop;
  var atGreenwitch = x ? isCenter : isMiddle;
  var isEast = x ? isRight : isBottom;

  var props = {};

  if (isWest(i)) props.jc = start;else if (isEast(i)) props.jc = end;else props.jc = a ? 'space-around' : b ? 'space-between' : center;

  if (isNorth(i)) props.ac = props.ai = start;else if (isSouth(i)) props.ac = props.ai = end;else props.ac = props.ai = center;

  if (j) {
    props.d = '' + (x ? 'row' : 'column') + (isEast(j) ? '-reverse' : '');
    props.w = 'wrap' + (isSouth(j) ? '-reverse' : '');

    if (isEast(j) && !atGreenwitch(i)) props.jc = props.jc === end ? start : end;
    if (isSouth(j) && !atEquator(i)) props.ac = props.ai = props.ai === end ? start : end;
  } else {
    props.d = x ? 'row' : 'column';
    props.w = 'nowrap';

    if (j === 0) {
      props.d += '-reverse';

      if (!atGreenwitch(i)) props.jc = props.jc === end ? start : end;
    }
  }

  if (s) props.ai = 'stretch';

  return props;
}

var cssConversion = {
  d: 'flex-direction',
  w: 'flex-wrap',
  jc: 'justify-content',
  ai: 'align-items',
  ac: 'align-content'
};

var jsConversion = {
  d: 'flexDirection',
  w: 'flexWrap',
  jc: 'justifyContent',
  ai: 'alignItems',
  ac: 'alignContent'
};

var propertyKeys = Object.keys(cssConversion);

var Flexpad = function () {
  function Flexpad(code) {
    _classCallCheck(this, Flexpad);

    Object.assign(this, {
      code: code,
      d: 'row',
      w: 'nowrap',
      jc: start,
      ai: start,
      ac: center
    }, decode(code));
  }

  _createClass(Flexpad, [{
    key: 'toCss',
    value: function toCss() {
      var _this = this;

      var css = '';

      propertyKeys.forEach(function (p) {
        return css += '  ' + cssConversion[p] + ': ' + _this[p] + ';\n';
      });

      return '.' + this.code + ' {\n  display: flex;\n' + css + '}\n';
    }
  }, {
    key: 'toJs',
    value: function toJs() {
      var _this2 = this;

      var obj = { display: 'flex' };

      propertyKeys.forEach(function (p) {
        return obj[jsConversion[p]] = _this2[p];
      });

      return obj;
    }
  }]);

  return Flexpad;
}();

module.exports = Flexpad;

/***/ })
/******/ ]);
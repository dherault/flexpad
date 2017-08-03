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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _document$getElements = document.getElementsByTagName('button'),
    _document$getElements2 = _slicedToArray(_document$getElements, 12),
    bX = _document$getElements2[0],
    bY = _document$getElements2[1],
    bA = _document$getElements2[2],
    bB = _document$getElements2[3],
    bS = _document$getElements2[4],
    b7 = _document$getElements2[5],
    b9 = _document$getElements2[6],
    b1 = _document$getElements2[7],
    b3 = _document$getElements2[8],
    b0 = _document$getElements2[9],
    bLock = _document$getElements2[10],
    bGrow = _document$getElements2[11];

var _document$getElements3 = document.getElementsByTagName('input'),
    _document$getElements4 = _slicedToArray(_document$getElements3, 1),
    sliderN = _document$getElements4[0];

var divWrap = document.getElementById('wrap-origin');

var sections = [];
for (var i = 1; i < 10; i++) {
  sections.push(document.getElementById(i));
}var traverseSections = function traverseSections(fn) {
  for (var _i = 1; _i < 10; _i++) {
    fn(document.getElementById(_i), _i);
  }
};

var activateButton = function activateButton(el, bool) {
  return el.classList[bool ? 'add' : 'remove']('button-active');
};
var activateButtonLock = function activateButtonLock(bool, x) {
  return bLock.classList[bool ? 'add' : 'remove']('lock-' + (x ? 'x' : 'y'));
};

var state = {
  n: 3,
  x: true,
  origin: -1,
  xLocked: true,
  yLocked: true,
  lockIndex: 0
  /*  y ȳ
    x 0 1
    x̄ 2 3
  */
};

function render() {
  // Ui as pure function of state
  var x = state.x,
      ab = state.ab,
      s = state.s,
      origin = state.origin,
      xLocked = state.xLocked,
      yLocked = state.yLocked;

  // Assign selected classname to containers

  traverseSections(function (section, i) {
    var className = '' + (x ? 'x' : 'y') + i + (origin >= 0 ? origin : '');

    if (ab && (x ? i % 3 === 2 : i > 3 && i < 7)) {
      if (ab === 1) className += 'a';else if (ab === 2) className += 'b';
    }
    if (s) className += 's';

    section.children[0].innerText = className;
    section.children[1].className = '' + className + (xLocked ? ' x-locked' : '') + (yLocked ? ' y-locked' : '') + ' container';
  });

  // Update menu
  activateButton(bX, x);
  activateButton(bY, !x);
  activateButton(bS, s);
  activateButton(bA, ab === 1);
  activateButton(bB, ab === 2);
  activateButton(b1, origin === 1);
  activateButton(b3, origin === 3);
  activateButton(b7, origin === 7);
  activateButton(b9, origin === 9);
  activateButton(b0, origin === 0);
  activateButtonLock(xLocked, true);
  activateButtonLock(yLocked, false);
  divWrap.style.borderTopColor = origin > 6 ? 'GoldenRod' : 'SlateGray';
  divWrap.style.borderLeftColor = origin % 3 === 1 ? 'GoldenRod' : 'SlateGray';
  divWrap.style.borderRightColor = origin === 3 || origin === 9 ? 'GoldenRod' : 'SlateGray';
  divWrap.style.borderBottomColor = origin === 1 || origin === 3 ? 'GoldenRod' : 'SlateGray';
  // The slider is not controled
}

// Events mutate state and render
var onclick = function onclick(el, fn) {
  return el.onclick = function () {
    return [fn(), render()];
  };
};

onclick(bX, function () {
  return state.x = true;
});
onclick(bY, function () {
  return state.x = false;
});
onclick(bS, function () {
  return state.s = !state.s;
});
onclick(bA, function () {
  return state.ab = state.ab === 1 ? 0 : 1;
});
onclick(bB, function () {
  return state.ab = state.ab === 2 ? 0 : 2;
});
onclick(b7, function () {
  return state.origin = state.origin !== 7 ? 7 : -1;
});
onclick(b9, function () {
  return state.origin = state.origin !== 9 ? 9 : -1;
});
onclick(b1, function () {
  return state.origin = state.origin !== 1 ? 1 : -1;
});
onclick(b3, function () {
  return state.origin = state.origin !== 3 ? 3 : -1;
});
onclick(b0, function () {
  return state.origin = state.origin !== 0 ? 0 : -1;
});

onclick(bLock, function () {
  var i = (state.lockIndex + 1) % 4;

  if (i === 0) state.xLocked = state.yLocked = true;else if (i === 1) state.xLocked = state.yLocked = false;else if (i === 2) (state.xLocked = true) && (state.yLocked = false);else (state.xLocked = false) || (state.yLocked = true);

  state.lockIndex = i;
});

// Containers content has a separate render scope
function renderBoxes() {
  var n = state.n,
      grow = state.grow;


  activateButton(bGrow, grow);

  traverseSections(function (section) {
    var container = section.children[1];

    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }for (var _i2 = 0; _i2 < n; _i2++) {
      var box = document.createElement('div');

      box.innerText = _i2 + 1;
      box.className = 'x5 box' + (grow ? ' grow' : '');
      container.appendChild(box);
    }
  });
}

bGrow.onclick = function () {
  return [state.grow = !state.grow, renderBoxes()];
};

sliderN.oninput = function (e) {
  var n = e.target.value;

  if (state.n === n) return;

  state.n = n;
  renderBoxes();
};

renderBoxes();
render();

/***/ })
/******/ ]);
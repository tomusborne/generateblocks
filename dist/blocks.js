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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/blocks.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/dompurify/dist/purify.js":
/*!***********************************************!*\
  !*** ./node_modules/dompurify/dist/purify.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.2.2/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen,
      getPrototypeOf = Object.getPrototypeOf,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var freeze = Object.freeze,
      seal = Object.seal,
      create = Object.create; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);

  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);

  var regExpTest = unapply(RegExp.prototype.test);

  var typeErrorCreate = unconstruct(TypeError);

  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }

  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }

  /* Add properties to a lookup table */
  function addToSet(set, array) {
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;
    while (l--) {
      var element = array[l];
      if (typeof element === 'string') {
        var lcElement = stringToLowerCase(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }

  /* Shallow clone an object */
  function clone(object) {
    var newObject = create(null);

    var property = void 0;
    for (property in object) {
      if (apply(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }

  /* IE10 doesn't support __lookupGetter__ so lets'
   * simulate it. It also automatically checks
   * if the prop is function or getter and behaves
   * accordingly. */
  function lookupGetter(object, prop) {
    while (object !== null) {
      var desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  var html = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  var svg = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);

  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.
  var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'feimage', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);

  var mathMl = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

  // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.
  var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);

  var text = freeze(['#text']);

  var html$1 = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);

  var svg$1 = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

  var mathMl$1 = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  // eslint-disable-next-line unicorn/better-regex
  var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';
    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html$$1) {
          return html$$1;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '2.2.8';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;

      return DOMPurify;
    }

    var originalDocument = window.document;

    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        Element = window.Element,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        Text = window.Text,
        Comment = window.Comment,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes;


    var ElementPrototype = Element.prototype;

    var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    var getParentNode = lookupGetter(ElementPrototype, 'parentNode');

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.
    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
    var emptyHTML = trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML('') : '';

    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        createDocumentFragment = _document.createDocumentFragment;
    var importNode = originalDocument.importNode;


    var documentMode = {};
    try {
      documentMode = clone(document).documentMode ? document.documentMode : {};
    } catch (_) {}

    var hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;

    var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
        ERB_EXPR$$1 = ERB_EXPR,
        DATA_ATTR$$1 = DATA_ATTR,
        ARIA_ATTR$$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;

    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));

    /* Allowed attribute names */
    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    var FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    var FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    var ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    var ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    var ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    var SAFE_FOR_TEMPLATES = false;

    /* Decide if document with <html>... should be returned */
    var WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    var SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    var FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    var RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    var RETURN_DOM_FRAGMENT = false;

    /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
     * `Node` is imported into the current `Document`. If this flag is not enabled the
     * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
     * DOMPurify.
     *
     * This defaults to `true` starting DOMPurify 2.2.0. Note that setting it to `false`
     * might cause XSS from attacks hidden in closed shadowroots in case the browser
     * supports Declarative Shadow: DOM https://web.dev/declarative-shadow-dom/
     */
    var RETURN_DOM_IMPORT = true;

    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    var RETURN_TRUSTED_TYPE = false;

    /* Output should be free from DOM clobbering attacks? */
    var SANITIZE_DOM = true;

    /* Keep element content when removing element? */
    var KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    var IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    var USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    var FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

    /* Tags that are safe for data: URIs */
    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

    /* Attributes safe for values like "javascript:" */
    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);

    var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */
    var NAMESPACE = HTML_NAMESPACE;

    /* Keep a reference to config to pass to hooks */
    var CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    var formElement = document.createElement('form');

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
        cfg = {};
      }

      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);

      /* Set configuration parameters */
      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT !== false; // Default true
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
      NAMESPACE = cfg.NAMESPACE || NAMESPACE;
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html);
          addToSet(ALLOWED_ATTR, html$1);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl);
          addToSet(ALLOWED_ATTR, mathMl$1);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);

    var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']);

    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */
    var ALL_SVG_TAGS = addToSet({}, svg);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);

    var ALL_MATHML_TAGS = addToSet({}, mathMl);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);

    /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */
    var _checkValidNamespace = function _checkValidNamespace(element) {
      var parent = getParentNode(element);

      // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: HTML_NAMESPACE,
          tagName: 'template'
        };
      }

      var tagName = stringToLowerCase(element.tagName);
      var parentTagName = stringToLowerCase(parent.tagName);

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        }

        // The only way to switch from MathML to SVG is via
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }

        // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.
        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        }

        // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        }

        // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        // Certain elements are allowed in both SVG and HTML
        // namespace. We need to specify them explicitly
        // so that they don't get erronously deleted from
        // HTML namespace.
        var commonSvgAndHTMLElements = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

        // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace
        return !ALL_MATHML_TAGS[tagName] && (commonSvgAndHTMLElements[tagName] || !ALL_SVG_TAGS[tagName]);
      }

      // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG or MathML). Return false just in case.
      return false;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, { element: node });
      try {
        node.parentNode.removeChild(node);
      } catch (_) {
        try {
          node.outerHTML = emptyHTML;
        } catch (_) {
          node.remove();
        }
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name);

      // We void attribute values for unremovable "is"" attributes
      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc = void 0;
      var leadingWhitespace = void 0;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
        } catch (_) {}
      }

      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);
        doc.documentElement.innerHTML = dirtyPayload;
      }

      var body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };

    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */
    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
        return NodeFilter.FILTER_ACCEPT;
      }, false);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    var _isClobbered = function _isClobbered(elm) {
      if (elm instanceof Text || elm instanceof Comment) {
        return false;
      }

      if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function') {
        return true;
      }

      return false;
    };

    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    var _isNode = function _isNode(object) {
      return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content = void 0;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Check if tagname contains Unicode */
      if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      var tagName = stringToLowerCase(currentNode.nodeName);

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Detect mXSS attempts abusing namespace confusion */
      if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          var parentNode = getParentNode(currentNode) || currentNode.parentNode;
          var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            var childCount = childNodes.length;

            for (var i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);
        return true;
      }

      /* Check whether element has a valid namespace */
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
        content = stringReplace(content, ERB_EXPR$$1, ' ');
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        return false;

        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr = void 0;
      var value = void 0;
      var lcName = void 0;
      var l = void 0;
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;

      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;

        value = stringTrim(attr.value);
        lcName = stringToLowerCase(name);

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }

        /* Remove attribute */
        _removeAttribute(name, currentNode);

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Work around a security issue in jQuery 3.0 */
        if (regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
          value = stringReplace(value, ERB_EXPR$$1, ' ');
        }

        /* Is `value` valid for this attribute? */
        var lcTag = currentNode.nodeName.toLowerCase();
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode = void 0;
      var shadowIterator = _createIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty, cfg) {
      var body = void 0;
      var importedNode = void 0;
      var currentNode = void 0;
      var oldNode = void 0;
      var returnNode = void 0;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      if (!dirty) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }

      /* Check we can run. Otherwise fall back or ignore */
      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) ; else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : emptyHTML;
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }

        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (RETURN_DOM_IMPORT) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = stringToLowerCase(tag);
      var lcName = stringToLowerCase(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        arrayPop(hooks[entryPoint]);
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./src/blocks.js":
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_grid_block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/grid/block.js */ "./src/blocks/grid/block.js");
/* harmony import */ var _blocks_container_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/container/block.js */ "./src/blocks/container/block.js");
/* harmony import */ var _blocks_button_container_block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/button-container/block.js */ "./src/blocks/button-container/block.js");
/* harmony import */ var _blocks_button_block_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/button/block.js */ "./src/blocks/button/block.js");
/* harmony import */ var _blocks_headline_block_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/headline/block.js */ "./src/blocks/headline/block.js");
/* harmony import */ var _shared_style_imports_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/style-imports.js */ "./src/shared/style-imports.js");
/**
 * GenerateBlocks
 */







/***/ }),

/***/ "./src/blocks/button-container/attributes.js":
/*!***************************************************!*\
  !*** ./src/blocks/button-container/attributes.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* harmony default export */ __webpack_exports__["default"] = ({
  uniqueId: {
    type: 'string',
    default: ''
  },
  anchor: {
    type: 'string',
    default: ''
  },
  alignment: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.alignment
  },
  alignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.alignment
  },
  alignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.alignment
  },
  marginTop: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginTop
  },
  marginRight: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginRight
  },
  marginBottom: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginBottom
  },
  marginLeft: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginLeft
  },
  marginUnit: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginUnit
  },
  marginTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginTopTablet
  },
  marginRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginRightTablet
  },
  marginBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginBottomTablet
  },
  marginLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginLeftTablet
  },
  marginTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginTopMobile
  },
  marginRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginRightMobile
  },
  marginBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginBottomMobile
  },
  marginLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.buttonContainer.marginLeftMobile
  },
  stack: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.stack
  },
  stackTablet: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.stackTablet
  },
  stackMobile: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.stackMobile
  },
  fillHorizontalSpace: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.fillHorizontalSpace
  },
  fillHorizontalSpaceTablet: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.fillHorizontalSpaceTablet
  },
  fillHorizontalSpaceMobile: {
    type: 'boolean',
    default: generateBlocksDefaults.buttonContainer.fillHorizontalSpaceMobile
  },
  isDynamic: {
    type: 'boolean'
  },
  blockVersion: {
    type: 'number'
  },
  // deprecated since 1.2.0.
  elementId: {
    type: 'string',
    default: ''
  },
  cssClasses: {
    type: 'string',
    default: ''
  }
});
/* eslint-enable no-undef */

/***/ }),

/***/ "./src/blocks/button-container/block.js":
/*!**********************************************!*\
  !*** ./src/blocks/button-container/block.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/button-container/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/button-container/edit.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deprecated */ "./src/blocks/button-container/deprecated.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attributes */ "./src/blocks/button-container/attributes.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);


/**
 * Block: Button Container
 */
//import './style.scss';








/**
 * Register our Button Container block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__["registerBlockType"])('generateblocks/button-container', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Buttons', 'generateblocks'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Drive conversions with beautiful buttons.', 'generateblocks'),
  icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('button'),
  category: 'generateblocks',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('button'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('buttons'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('generate')],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_4__["default"],
  supports: {
    className: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: () => {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__["InnerBlocks"].Content, null);
  },
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/button-container/css/desktop.js":
/*!****************************************************!*\
  !*** ./src/blocks/button-container/css/desktop.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DesktopCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





class DesktopCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      alignment,
      stack,
      fillHorizontalSpace
    } = attributes;
    let cssObj = [];
    cssObj['.gb-button-wrapper-' + uniqueId] = [{
      display: fillHorizontalSpace ? 'block' : false,
      'flex-direction': stack ? 'column' : false,
      'align-items': stack ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignment) : false
    }];
    cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'flex-direction': stack ? 'column' : false,
      'align-items': stack ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignment) : false
    }];

    if (fillHorizontalSpace) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        flex: '1'
      }];
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .components-button'] = [{
        background: '#fff',
        border: '1px solid #ddd',
        'margin-top': '10px'
      }];
    }

    if (stack && fillHorizontalSpace) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        width: '100% !important',
        'box-sizing': 'border-box'
      }];
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.desktopCSS', cssObj, this.props, 'button-container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/button-container/css/main.js":
/*!*************************************************!*\
  !*** ./src/blocks/button-container/css/main.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/shorthand-css */ "./src/utils/shorthand-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class MainCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      alignment,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginUnit
    } = attributes;
    let cssObj = [];
    cssObj['.gb-button-wrapper-' + uniqueId] = [{
      'margin': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTop, marginRight, marginBottom, marginLeft, marginUnit),
      // eslint-disable-line quote-props
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__["default"])(alignment)
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.mainCSS', cssObj, this.props, 'button-container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/button-container/css/mobile.js":
/*!***************************************************!*\
  !*** ./src/blocks/button-container/css/mobile.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MobileCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class MobileCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      alignmentMobile,
      marginTopMobile,
      marginRightMobile,
      marginBottomMobile,
      marginLeftMobile,
      marginUnit,
      stackMobile,
      fillHorizontalSpaceMobile
    } = attributes;
    let cssObj = [];
    cssObj['.gb-button-wrapper-' + uniqueId] = [{
      'display': fillHorizontalSpaceMobile ? 'block' : false,
      // eslint-disable-line quote-props
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopMobile, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightMobile, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomMobile, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftMobile, marginUnit),
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__["default"])(alignmentMobile),
      'flex-direction': stackMobile ? 'column' : false,
      'align-items': stackMobile ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__["default"])(alignmentMobile) : false
    }];
    cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'flex-direction': stackMobile ? 'column' : false,
      'align-items': stackMobile ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__["default"])(alignmentMobile) : false
    }];

    if (fillHorizontalSpaceMobile) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        'flex': '1' // eslint-disable-line quote-props

      }];
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .components-button'] = [{
        'background': '#fff',
        // eslint-disable-line quote-props
        'border': '1px solid #ddd',
        // eslint-disable-line quote-props
        'margin-top': '10px'
      }];
    }

    if (stackMobile && fillHorizontalSpaceMobile) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        'width': '100% !important',
        // eslint-disable-line quote-props
        'box-sizing': 'border-box'
      }];
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.mobileCSS', cssObj, this.props, 'button-container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/button-container/css/tablet-only.js":
/*!********************************************************!*\
  !*** ./src/blocks/button-container/css/tablet-only.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletOnlyCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





class TabletOnlyCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      alignmentTablet,
      stackTablet,
      fillHorizontalSpaceTablet
    } = attributes;
    let cssObj = [];
    cssObj['.gb-button-wrapper-' + uniqueId] = [{
      display: fillHorizontalSpaceTablet ? 'block' : false,
      'flex-direction': stackTablet ? 'column' : false,
      'align-items': stackTablet ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentTablet) : false
    }];
    cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'flex-direction': stackTablet ? 'column' : false,
      'align-items': stackTablet ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentTablet) : false
    }];

    if (fillHorizontalSpaceTablet) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        flex: '1'
      }];
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .components-button'] = [{
        background: '#fff',
        border: '1px solid #ddd',
        'margin-top': '10px'
      }];
    }

    if (stackTablet && fillHorizontalSpaceTablet) {
      cssObj['.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
        width: '100% !important',
        'box-sizing': 'border-box'
      }];
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'button-container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/button-container/css/tablet.js":
/*!***************************************************!*\
  !*** ./src/blocks/button-container/css/tablet.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class TabletCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      alignmentTablet,
      marginTopTablet,
      marginRightTablet,
      marginBottomTablet,
      marginLeftTablet,
      marginUnit
    } = attributes;
    let cssObj = [];
    cssObj['.gb-button-wrapper-' + uniqueId] = [{
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopTablet, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightTablet, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomTablet, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftTablet, marginUnit),
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_3__["default"])(alignmentTablet)
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.tabletCSS', cssObj, this.props, 'button-container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/button-container/deprecated.js":
/*!***************************************************!*\
  !*** ./src/blocks/button-container/deprecated.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/blocks/button-container/attributes.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);


/**
 * External dependencies
 */




const deprecated = [// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
{
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_2__["default"],
  supports: {
    anchor: false,
    className: false,
    customClassName: false
  },

  migrate(attributes) {
    const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
    const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;
    return { ...attributes,
      className: oldClasses,
      anchor: oldAnchor,
      cssClasses: '',
      elementId: ''
    };
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      elementId,
      cssClasses
    } = attributes;
    let htmlAttributes = {
      id: !!elementId ? elementId : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'gb-button-wrapper': true,
        [`gb-button-wrapper-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses
      })
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", htmlAttributes, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InnerBlocks"].Content, null));
  }

}];
/* harmony default export */ __webpack_exports__["default"] = (deprecated);

/***/ }),

/***/ "./src/blocks/button-container/edit.js":
/*!*********************************************!*\
  !*** ./src/blocks/button-container/edit.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_dimensions___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/dimensions/ */ "./src/components/dimensions/index.js");
/* harmony import */ var _components_responsive_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/responsive-tabs */ "./src/components/responsive-tabs/index.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _css_main_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/main.js */ "./src/blocks/button-container/css/main.js");
/* harmony import */ var _css_desktop_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/desktop.js */ "./src/blocks/button-container/css/desktop.js");
/* harmony import */ var _css_tablet_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/tablet.js */ "./src/blocks/button-container/css/tablet.js");
/* harmony import */ var _css_tablet_only_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/tablet-only.js */ "./src/blocks/button-container/css/tablet-only.js");
/* harmony import */ var _css_mobile_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/mobile.js */ "./src/blocks/button-container/css/mobile.js");
/* harmony import */ var _components_panel_area___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/panel-area/ */ "./src/components/panel-area/index.js");
/* harmony import */ var _utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/get-all-unique-ids */ "./src/utils/get-all-unique-ids/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_19__);



/**
 * Block: Button Container
 */



















/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */

const ANCHOR_REGEX = /[\s#]/g;
const ALIGNMENT_CONTROLS = [{
  icon: 'editor-alignleft',
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Align Buttons Left', 'generateblocks'),
  align: 'left'
}, {
  icon: 'editor-aligncenter',
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Align Buttons Center', 'generateblocks'),
  align: 'center'
}, {
  icon: 'editor-alignright',
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Align Buttons Right', 'generateblocks'),
  align: 'right'
}];

class GenerateButtonContainer extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      selectedDevice: 'Desktop'
    };
    this.getDeviceType = this.getDeviceType.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    // Generate a unique ID if none exists or if the same ID exists on this page.
    const allBlocks = wp.data.select('core/block-editor').getBlocks();
    const uniqueIds = Object(_utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_12__["default"])(allBlocks, [], this.props.clientId);

    if (!this.props.attributes.uniqueId || uniqueIds.includes(this.props.attributes.uniqueId)) {
      this.props.setAttributes({
        uniqueId: this.props.clientId.substr(2, 9).replace('-', '')
      });
    }

    const thisBlock = wp.data.select('core/block-editor').getBlocksByClientId(this.props.clientId)[0];

    if (thisBlock) {
      const childBlocks = thisBlock.innerBlocks;

      if (0 === childBlocks.length) {
        wp.data.dispatch('core/block-editor').insertBlocks(Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__["createBlock"])('generateblocks/button', generateBlocksStyling.button), undefined, this.props.clientId);
      }
    } // This block used to be static. Set it to dynamic by default from now on.


    if ('undefined' === typeof this.props.attributes.isDynamic || !this.props.attributes.isDynamic) {
      this.props.setAttributes({
        isDynamic: true
      });
    } // Set our responsive stack and fill options if set on desktop.
    // @since 1.4.0.


    if ('undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < 2) {
      if (this.props.attributes.stack || this.props.attributes.fillHorizontalSpace) {
        if (this.props.attributes.stack) {
          this.props.setAttributes({
            stackTablet: true,
            stackMobile: true
          });
        }

        if (this.props.attributes.fillHorizontalSpace) {
          this.props.setAttributes({
            fillHorizontalSpaceTablet: true,
            fillHorizontalSpaceMobile: true
          });
        }
      }
    } // Update block version flag if it's out of date.


    const blockVersion = 2;

    if ('undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < blockVersion) {
      this.props.setAttributes({
        blockVersion
      });
    }
  }

  getDeviceType() {
    let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

    if (!generateBlocksInfo.syncResponsivePreviews) {
      deviceType = this.state.selectedDevice;
    }

    return deviceType;
  }

  setDeviceType(deviceType) {
    if (generateBlocksInfo.syncResponsivePreviews && this.props.deviceType) {
      this.props.setDeviceType(deviceType);
      this.setState({
        selectedDevice: deviceType
      });
    } else {
      this.setState({
        selectedDevice: deviceType
      });
    }
  }

  render() {
    const {
      attributes,
      setAttributes,
      clientId
    } = this.props;
    const {
      uniqueId,
      className,
      anchor,
      alignment,
      alignmentTablet,
      alignmentMobile,
      stack,
      stackTablet,
      stackMobile,
      fillHorizontalSpace,
      fillHorizontalSpaceTablet,
      fillHorizontalSpaceMobile
    } = attributes;
    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        'gb-button-wrapper': true,
        [`gb-button-wrapper-${uniqueId}`]: true,
        [`${className}`]: undefined !== className
      }),
      id: anchor ? anchor : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToolbarGroup"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToolbarButton"], {
      className: "gblocks-add-new-button",
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('insert'),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Add Button', 'generateblocks'),
      onClick: () => {
        const thisBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];

        if (thisBlock) {
          const childBlocks = thisBlock.innerBlocks;
          const keys = Object.keys(childBlocks);
          const lastKey = keys[keys.length - 1];

          if (typeof childBlocks[lastKey] !== 'undefined') {
            const blockToCopyId = childBlocks[lastKey].clientId;

            if (blockToCopyId) {
              const blockToCopy = wp.data.select('core/block-editor').getBlocksByClientId(blockToCopyId)[0];
              const clonedBlock = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__["cloneBlock"])(blockToCopy, {
                uniqueId: ''
              });
              wp.data.dispatch('core/block-editor').insertBlocks(clonedBlock, undefined, clientId);
            }
          } else if (0 === childBlocks.length) {
            wp.data.dispatch('core/block-editor').insertBlocks(Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__["createBlock"])('generateblocks/button', generateBlocksStyling.button), undefined, clientId);
          }
        }
      },
      showTooltip: true
    })), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["AlignmentToolbar"], {
      value: alignment,
      alignmentControls: ALIGNMENT_CONTROLS,
      onChange: nextAlign => {
        setAttributes({
          alignment: nextAlign
        });
      }
    }), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["AlignmentToolbar"], {
      value: alignmentTablet,
      alignmentControls: ALIGNMENT_CONTROLS,
      onChange: value => {
        setAttributes({
          alignmentTablet: value
        });
      }
    }), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["AlignmentToolbar"], {
      value: alignmentMobile,
      alignmentControls: ALIGNMENT_CONTROLS,
      onChange: value => {
        setAttributes({
          alignmentMobile: value
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_responsive_tabs__WEBPACK_IMPORTED_MODULE_4__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      selectedDevice: this.getDeviceType(),
      onClick: device => {
        this.setDeviceType(device);
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Spacing', 'generateblocks'),
      initialOpen: true,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('spacing'),
      className: 'gblocks-panel-label',
      id: 'buttonContainerSpacing',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_3__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTop',
      attrRight: 'marginRight',
      attrBottom: 'marginBottom',
      attrLeft: 'marginLeft',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.buttonContainer,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Stack Vertically', 'generateblocks'),
      checked: !!stack,
      onChange: value => {
        setAttributes({
          stack: value,
          stackTablet: !!value && !stackTablet ? value : stackTablet,
          stackMobile: !!value && !stackMobile ? value : stackMobile
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Fill Horizontal Space', 'generateblocks'),
      checked: !!fillHorizontalSpace,
      onChange: value => {
        setAttributes({
          fillHorizontalSpace: value,
          fillHorizontalSpaceTablet: !!value && !fillHorizontalSpaceTablet ? value : fillHorizontalSpaceTablet,
          fillHorizontalSpaceMobile: !!value && !fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile
        });
      }
    })), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_3__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopTablet',
      attrRight: 'marginRightTablet',
      attrBottom: 'marginBottomTablet',
      attrLeft: 'marginLeftTablet',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.buttonContainer,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Stack Vertically', 'generateblocks'),
      checked: !!stackTablet,
      onChange: value => {
        setAttributes({
          stackTablet: value,
          stackMobile: !!value && !stackMobile ? value : stackMobile
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Fill Horizontal Space', 'generateblocks'),
      checked: !!fillHorizontalSpaceTablet,
      onChange: value => {
        setAttributes({
          fillHorizontalSpaceTablet: value,
          fillHorizontalSpaceMobile: !!value && !fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile
        });
      }
    })), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_3__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopMobile',
      attrRight: 'marginRightMobile',
      attrBottom: 'marginBottomMobile',
      attrLeft: 'marginLeftMobile',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.buttonContainer,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Stack Vertically', 'generateblocks'),
      checked: !!stackMobile,
      onChange: value => {
        setAttributes({
          stackMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Fill Horizontal Space', 'generateblocks'),
      checked: !!fillHorizontalSpaceMobile,
      onChange: value => {
        setAttributes({
          fillHorizontalSpaceMobile: value
        });
      }
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])('generateblocks.editor.controls', '', 'buttonContainerSpacing', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Documentation', 'generateblocks'),
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('documentation'),
      initialOpen: false,
      className: 'gblocks-panel-label',
      id: 'buttonContainerDocumentation',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Need help with this block?', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      href: "https://docs.generateblocks.com/collection/buttons/",
      target: "_blank",
      rel: "noreferrer noopener"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Visit our documentation', 'generateblocks')), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])('generateblocks.editor.controls', '', 'buttonContainerDocumentation', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["InspectorAdvancedControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('HTML Anchor', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Anchors lets you link directly to a section on a page.', 'generateblocks'),
      value: anchor || '',
      onChange: nextValue => {
        nextValue = nextValue.replace(ANCHOR_REGEX, '-');
        setAttributes({
          anchor: nextValue
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_main_js__WEBPACK_IMPORTED_MODULE_6__["default"], this.props), this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'Desktop' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_desktop_js__WEBPACK_IMPORTED_MODULE_7__["default"], this.props), ('Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_js__WEBPACK_IMPORTED_MODULE_8__["default"], this.props), 'Tablet' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_only_js__WEBPACK_IMPORTED_MODULE_9__["default"], this.props), 'Mobile' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_mobile_js__WEBPACK_IMPORTED_MODULE_10__["default"], this.props)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", htmlAttributes, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_15__["InnerBlocks"], {
      allowedBlocks: ['generateblocks/button'],
      renderAppender: () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["Tooltip"], {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_13__["__"])('Add Button', 'generateblocks')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["Button"], {
        className: "gblocks-add-new-button gblocks-button-container-appender",
        icon: 'insert',
        onClick: () => {
          wp.data.dispatch('core/block-editor').insertBlocks(Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_16__["createBlock"])('generateblocks/button', generateBlocksStyling.button), undefined, clientId);
        }
      }))
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_19__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_18__["withDispatch"])(dispatch => ({
  setDeviceType(type) {
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = dispatch('core/edit-post');

    if (!setPreviewDeviceType) {
      return;
    }

    setPreviewDeviceType(type);
  }

})), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_18__["withSelect"])(select => {
  const {
    __experimentalGetPreviewDeviceType: getPreviewDeviceType
  } = select('core/edit-post');

  if (!getPreviewDeviceType) {
    return {
      deviceType: null
    };
  }

  return {
    deviceType: getPreviewDeviceType()
  };
})])(GenerateButtonContainer));

/***/ }),

/***/ "./src/blocks/button-container/editor.scss":
/*!*************************************************!*\
  !*** ./src/blocks/button-container/editor.scss ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/button/attributes.js":
/*!*****************************************!*\
  !*** ./src/blocks/button/attributes.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* harmony default export */ __webpack_exports__["default"] = ({
  uniqueId: {
    type: 'string',
    default: ''
  },
  anchor: {
    type: 'string',
    default: ''
  },
  url: {
    type: 'string',
    source: 'attribute',
    selector: '.gb-button',
    attribute: 'href'
  },
  hasUrl: {
    type: 'boolean'
  },
  target: {
    type: 'boolean'
  },
  relNoFollow: {
    type: 'boolean'
  },
  relSponsored: {
    type: 'boolean'
  },
  text: {
    type: 'string',
    source: 'html',
    selector: '.gb-button-text',
    default: 'Button'
  },
  icon: {
    type: 'string',
    source: 'html',
    selector: '.gb-icon'
  },
  hasIcon: {
    type: 'boolean',
    default: false
  },
  iconLocation: {
    type: 'string',
    default: generateBlocksDefaults.button.iconLocation
  },
  customIcon: {
    type: 'boolean',
    default: false
  },
  removeText: {
    type: 'boolean',
    default: generateBlocksDefaults.button.removeText
  },
  ariaLabel: {
    type: 'string',
    default: generateBlocksDefaults.button.ariaLabel
  },
  backgroundColor: {
    type: 'string',
    default: generateBlocksDefaults.button.backgroundColor
  },
  backgroundColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.backgroundColorOpacity
  },
  textColor: {
    type: 'string',
    default: generateBlocksDefaults.button.textColor
  },
  backgroundColorHover: {
    type: 'string',
    default: generateBlocksDefaults.button.backgroundColorHover
  },
  backgroundColorHoverOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.backgroundColorHoverOpacity
  },
  textColorHover: {
    type: 'string',
    default: generateBlocksDefaults.button.textColorHover
  },
  borderColor: {
    type: 'string',
    default: generateBlocksDefaults.button.borderColor
  },
  borderColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.borderColorOpacity
  },
  borderColorHover: {
    type: 'string',
    default: generateBlocksDefaults.button.borderColorHover
  },
  borderColorHoverOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.borderColorHoverOpacity
  },
  fontFamily: {
    type: 'string',
    default: generateBlocksDefaults.button.fontFamily
  },
  fontFamilyFallback: {
    type: 'string',
    default: generateBlocksDefaults.button.fontFamilyFallback
  },
  googleFont: {
    type: 'boolean',
    default: generateBlocksDefaults.button.googleFont
  },
  googleFontVariants: {
    type: 'string',
    default: generateBlocksDefaults.button.googleFontVariants
  },
  fontWeight: {
    type: 'string',
    default: generateBlocksDefaults.button.fontWeight
  },
  fontSize: {
    type: 'number',
    default: generateBlocksDefaults.button.fontSize
  },
  fontSizeTablet: {
    type: 'number',
    default: generateBlocksDefaults.button.fontSizeTablet
  },
  fontSizeMobile: {
    type: 'number',
    default: generateBlocksDefaults.button.fontSizeMobile
  },
  fontSizeUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.fontSizeUnit
  },
  textTransform: {
    type: 'string',
    default: generateBlocksDefaults.button.textTransform
  },
  letterSpacing: {
    type: 'number',
    default: generateBlocksDefaults.button.letterSpacing
  },
  letterSpacingTablet: {
    type: 'number',
    default: generateBlocksDefaults.button.letterSpacingTablet
  },
  letterSpacingMobile: {
    type: 'number',
    default: generateBlocksDefaults.button.letterSpacingMobile
  },
  marginTop: {
    type: 'string',
    default: generateBlocksDefaults.button.marginTop
  },
  marginRight: {
    type: 'string',
    default: generateBlocksDefaults.button.marginRight
  },
  marginBottom: {
    type: 'string',
    default: generateBlocksDefaults.button.marginBottom
  },
  marginLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.marginLeft
  },
  marginUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.marginUnit
  },
  marginTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.marginTopTablet
  },
  marginRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.marginRightTablet
  },
  marginBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.marginBottomTablet
  },
  marginLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.marginLeftTablet
  },
  marginTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.marginTopMobile
  },
  marginRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.marginRightMobile
  },
  marginBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.marginBottomMobile
  },
  marginLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.marginLeftMobile
  },
  paddingTop: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingTop
  },
  paddingRight: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingRight
  },
  paddingBottom: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingBottom
  },
  paddingLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingLeft
  },
  paddingUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingUnit
  },
  paddingTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingTopTablet
  },
  paddingRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingRightTablet
  },
  paddingBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingBottomTablet
  },
  paddingLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingLeftTablet
  },
  paddingTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingTopMobile
  },
  paddingRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingRightMobile
  },
  paddingBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingBottomMobile
  },
  paddingLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.paddingLeftMobile
  },
  borderSizeTop: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeTop
  },
  borderSizeRight: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeRight
  },
  borderSizeBottom: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeBottom
  },
  borderSizeLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeLeft
  },
  borderSizeTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeTopTablet
  },
  borderSizeRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeRightTablet
  },
  borderSizeBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeBottomTablet
  },
  borderSizeLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeLeftTablet
  },
  borderSizeTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeTopMobile
  },
  borderSizeRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeRightMobile
  },
  borderSizeBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeBottomMobile
  },
  borderSizeLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderSizeLeftMobile
  },
  borderRadiusTopRight: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopRight
  },
  borderRadiusBottomRight: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomRight
  },
  borderRadiusBottomLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomLeft
  },
  borderRadiusTopLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopLeft
  },
  borderRadiusUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusUnit
  },
  borderRadiusTopRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopRightTablet
  },
  borderRadiusBottomRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomRightTablet
  },
  borderRadiusBottomLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomLeftTablet
  },
  borderRadiusTopLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopLeftTablet
  },
  borderRadiusTopRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopRightMobile
  },
  borderRadiusBottomRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomRightMobile
  },
  borderRadiusBottomLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusBottomLeftMobile
  },
  borderRadiusTopLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.borderRadiusTopLeftMobile
  },
  gradient: {
    type: 'boolean',
    default: generateBlocksDefaults.button.gradient
  },
  gradientDirection: {
    type: 'number',
    default: generateBlocksDefaults.button.gradientDirection
  },
  gradientColorOne: {
    type: 'string',
    default: generateBlocksDefaults.button.gradientColorOne
  },
  gradientColorOneOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.gradientColorOneOpacity
  },
  gradientColorStopOne: {
    type: 'number',
    default: generateBlocksDefaults.button.gradientColorStopOne
  },
  gradientColorTwo: {
    type: 'string',
    default: generateBlocksDefaults.button.gradientColorTwo
  },
  gradientColorTwoOpacity: {
    type: 'number',
    default: generateBlocksDefaults.button.gradientColorTwoOpacity
  },
  gradientColorStopTwo: {
    type: 'number',
    default: generateBlocksDefaults.button.gradientColorStopTwo
  },
  iconPaddingTop: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingTop
  },
  iconPaddingRight: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingRight
  },
  iconPaddingBottom: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingBottom
  },
  iconPaddingLeft: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingLeft
  },
  iconPaddingTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingTopTablet
  },
  iconPaddingRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingRightTablet
  },
  iconPaddingBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingBottomTablet
  },
  iconPaddingLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingLeftTablet
  },
  iconPaddingTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingTopMobile
  },
  iconPaddingRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingRightMobile
  },
  iconPaddingBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingBottomMobile
  },
  iconPaddingLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingLeftMobile
  },
  iconPaddingUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.iconPaddingUnit
  },
  iconPaddingSyncUnits: {
    type: 'boolean',
    default: false
  },
  iconSize: {
    type: 'number',
    default: generateBlocksDefaults.button.iconSize
  },
  iconSizeTablet: {
    type: 'number',
    default: generateBlocksDefaults.button.iconSizeTablet
  },
  iconSizeMobile: {
    type: 'number',
    default: generateBlocksDefaults.button.iconSizeMobile
  },
  iconSizeUnit: {
    type: 'string',
    default: generateBlocksDefaults.button.iconSizeUnit
  },
  // deprecated since 1.2.0
  elementId: {
    type: 'string',
    default: ''
  },
  cssClasses: {
    type: 'string',
    default: ''
  }
});
/* eslint-enable no-undef */

/***/ }),

/***/ "./src/blocks/button/block.js":
/*!************************************!*\
  !*** ./src/blocks/button/block.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/button/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/button/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/button/save.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deprecated */ "./src/blocks/button/deprecated.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attributes */ "./src/blocks/button/attributes.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Block: Buttons
 */








/**
 * Register our Button block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__["registerBlockType"])('generateblocks/button', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Button', 'generateblocks'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('Drive conversions with beautiful buttons.', 'generateblocks'),
  parent: ['generateblocks/button-container'],
  icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('button'),
  category: 'generateblocks',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('button'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('buttons'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('generate')],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_4__["default"],
  supports: {
    className: false,
    inserter: false,
    reusable: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"],
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/button/css/desktop.js":
/*!******************************************!*\
  !*** ./src/blocks/button/css/desktop.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DesktopCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);


/* eslint-disable quotes */



class DesktopCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.desktopCSS', cssObj, this.props, 'button');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/button/css/main.js":
/*!***************************************!*\
  !*** ./src/blocks/button/css/main.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/shorthand-css */ "./src/utils/shorthand-css/index.js");
/* harmony import */ var _utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/hex-to-rgba */ "./src/utils/hex-to-rgba/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);


/* eslint-disable quotes */






class MainCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      url,
      uniqueId,
      removeText,
      backgroundColor,
      backgroundColorOpacity,
      textColor,
      backgroundColorHover,
      backgroundColorHoverOpacity,
      textColorHover,
      fontFamily,
      fontFamilyFallback,
      fontWeight,
      textTransform,
      letterSpacing,
      fontSize,
      fontSizeUnit,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginUnit,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingUnit,
      borderSizeTop,
      borderSizeRight,
      borderSizeBottom,
      borderSizeLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft,
      borderRadiusTopLeft,
      borderRadiusUnit,
      borderColor,
      borderColorOpacity,
      borderColorHover,
      borderColorHoverOpacity,
      gradient,
      gradientDirection,
      gradientColorOne,
      gradientColorOneOpacity,
      gradientColorStopOne,
      gradientColorTwo,
      gradientColorTwoOpacity,
      gradientColorStopTwo,
      iconPaddingTop,
      iconPaddingRight,
      iconPaddingBottom,
      iconPaddingLeft,
      iconPaddingUnit,
      iconSize,
      iconSizeUnit
    } = attributes;
    let fontFamilyFallbackValue = '',
        backgroundImageValue,
        gradientColorStopOneValue = '',
        gradientColorStopTwoValue = '';

    if (gradient) {
      if (gradientColorOne && '' !== gradientColorStopOne) {
        gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
      }

      if (gradientColorTwo && '' !== gradientColorStopTwo) {
        gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
      }
    }

    if (gradient) {
      backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(gradientColorOne, gradientColorOneOpacity) + gradientColorStopOneValue + ', ' + Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(gradientColorTwo, gradientColorTwoOpacity) + gradientColorStopTwoValue + ');';
    }

    if (fontFamily && fontFamilyFallback) {
      fontFamilyFallbackValue = ', ' + fontFamilyFallback;
    }

    let selector = 'a.gb-button-' + uniqueId;

    if (!url) {
      selector = '.gb-button-' + uniqueId;
    }

    let cssObj = [];
    cssObj['.block-editor-block-list__block ' + selector] = [{
      'background-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(backgroundColor, backgroundColorOpacity),
      'background-image': backgroundImageValue,
      'color': textColor,
      // eslint-disable-line quote-props
      'padding': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit),
      // eslint-disable-line quote-props
      'border-radius': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit),
      'font-family': fontFamily + fontFamilyFallbackValue,
      'font-weight': fontWeight,
      'text-transform': textTransform,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(fontSize, fontSizeUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(letterSpacing, 'em'),
      'margin': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__["default"])(marginTop, marginRight, marginBottom, marginLeft, marginUnit),
      // eslint-disable-line quote-props
      'border-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(borderColor, borderColorOpacity)
    }];

    if (borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft) {
      cssObj['.block-editor-block-list__block ' + selector].push({
        'border-width': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj[`.block-editor-block-list__block ` + selector + `:hover,
		.block-editor-block-list__block ` + selector + `:focus,
		.block-editor-block-list__block ` + selector + `:active`] = [{
      'background-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(backgroundColorHover, backgroundColorHoverOpacity),
      'color': textColorHover,
      // eslint-disable-line quote-props
      'border-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_4__["default"])(borderColorHover, borderColorHoverOpacity)
    }];
    cssObj['.block-editor-block-list__block ' + selector + ' .gb-icon'] = [{
      'padding': !removeText ? Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit) : false,
      // eslint-disable-line quote-props
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconSize, iconSizeUnit)
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__["applyFilters"])('generateblocks.editor.mainCSS', cssObj, this.props, 'button');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/button/css/mobile.js":
/*!*****************************************!*\
  !*** ./src/blocks/button/css/mobile.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MobileCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);


/* eslint-disable quotes */




class MobileCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      url,
      uniqueId,
      removeText,
      letterSpacingMobile,
      fontSizeMobile,
      fontSizeUnit,
      marginTopMobile,
      marginRightMobile,
      marginBottomMobile,
      marginLeftMobile,
      marginUnit,
      paddingTopMobile,
      paddingRightMobile,
      paddingBottomMobile,
      paddingLeftMobile,
      paddingUnit,
      borderSizeTopMobile,
      borderSizeRightMobile,
      borderSizeBottomMobile,
      borderSizeLeftMobile,
      borderRadiusTopRightMobile,
      borderRadiusBottomRightMobile,
      borderRadiusBottomLeftMobile,
      borderRadiusTopLeftMobile,
      borderRadiusUnit,
      iconPaddingTopMobile,
      iconPaddingRightMobile,
      iconPaddingBottomMobile,
      iconPaddingLeftMobile,
      iconPaddingUnit,
      iconSizeMobile,
      iconSizeUnit
    } = attributes;
    let selector = 'a.gb-button-' + uniqueId;

    if (!url) {
      selector = '.gb-button-' + uniqueId;
    }

    let cssObj = [];
    cssObj['.block-editor-block-list__block ' + selector] = [{
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingTopMobile, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingRightMobile, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingBottomMobile, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingLeftMobile, paddingUnit),
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftMobile, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightMobile, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightMobile, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftMobile, borderRadiusUnit),
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(fontSizeMobile, fontSizeUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(letterSpacingMobile, 'em'),
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopMobile, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightMobile, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomMobile, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftMobile, marginUnit)
    }];

    if (borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile) {
      cssObj['.block-editor-block-list__block ' + selector].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeTopMobile, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeRightMobile, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeBottomMobile, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeLeftMobile, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj['.block-editor-block-list__block ' + selector + ' .gb-icon'] = [{
      'padding-top': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingTopMobile, iconPaddingUnit) : false,
      'padding-right': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingRightMobile, iconPaddingUnit) : false,
      'padding-bottom': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingBottomMobile, iconPaddingUnit) : false,
      'padding-left': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingLeftMobile, iconPaddingUnit) : false,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconSizeMobile, iconSizeUnit)
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.mobileCSS', cssObj, this.props, 'button');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/button/css/tablet-only.js":
/*!**********************************************!*\
  !*** ./src/blocks/button/css/tablet-only.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletOnlyCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);


/* eslint-disable quotes */



class TabletOnlyCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'button');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/button/css/tablet.js":
/*!*****************************************!*\
  !*** ./src/blocks/button/css/tablet.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);


/* eslint-disable quotes */




class TabletCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      url,
      uniqueId,
      removeText,
      letterSpacingTablet,
      fontSizeTablet,
      fontSizeUnit,
      marginTopTablet,
      marginRightTablet,
      marginBottomTablet,
      marginLeftTablet,
      marginUnit,
      paddingTopTablet,
      paddingRightTablet,
      paddingBottomTablet,
      paddingLeftTablet,
      paddingUnit,
      borderSizeTopTablet,
      borderSizeRightTablet,
      borderSizeBottomTablet,
      borderSizeLeftTablet,
      borderRadiusTopRightTablet,
      borderRadiusBottomRightTablet,
      borderRadiusBottomLeftTablet,
      borderRadiusTopLeftTablet,
      borderRadiusUnit,
      iconPaddingTopTablet,
      iconPaddingRightTablet,
      iconPaddingBottomTablet,
      iconPaddingLeftTablet,
      iconPaddingUnit,
      iconSizeTablet,
      iconSizeUnit
    } = attributes;
    let selector = 'a.gb-button-' + uniqueId;

    if (!url) {
      selector = '.gb-button-' + uniqueId;
    }

    let cssObj = [];
    cssObj['.block-editor-block-list__block ' + selector] = [{
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingTopTablet, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingRightTablet, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingBottomTablet, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingLeftTablet, paddingUnit),
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftTablet, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightTablet, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightTablet, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftTablet, borderRadiusUnit),
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(fontSizeTablet, fontSizeUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(letterSpacingTablet, 'em'),
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopTablet, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightTablet, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomTablet, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftTablet, marginUnit)
    }];

    if (borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet) {
      cssObj['.block-editor-block-list__block ' + selector].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeTopTablet, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeRightTablet, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeBottomTablet, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeLeftTablet, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj['.block-editor-block-list__block ' + selector + ' .gb-icon'] = [{
      'padding-top': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingTopTablet, iconPaddingUnit) : false,
      'padding-right': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingRightTablet, iconPaddingUnit) : false,
      'padding-bottom': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingBottomTablet, iconPaddingUnit) : false,
      'padding-left': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconPaddingLeftTablet, iconPaddingUnit) : false,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(iconSizeTablet, iconSizeUnit)
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.tabletCSS', cssObj, this.props, 'button');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/button/deprecated.js":
/*!*****************************************!*\
  !*** ./src/blocks/button/deprecated.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/blocks/button/attributes.js");
/* harmony import */ var _utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/sanitize-svg */ "./src/utils/sanitize-svg/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);


/**
 * External dependencies
 */





const deprecated = [// v1 of button block.
{
  attributes: { ..._attributes__WEBPACK_IMPORTED_MODULE_2__["default"],
    text: {
      type: 'array',
      source: 'children',
      selector: '.gb-button .button-text',
      default: 'Button'
    }
  },
  supports: {
    anchor: false,
    className: false,
    customClassName: false,
    inserter: false,
    reusable: false
  },

  migrate(attributes) {
    const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
    const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;
    return { ...attributes,
      className: oldClasses,
      anchor: oldAnchor,
      cssClasses: '',
      elementId: ''
    };
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      elementId,
      cssClasses,
      text,
      url,
      target,
      relNoFollow,
      relSponsored,
      icon,
      iconLocation,
      removeText,
      ariaLabel
    } = attributes;
    const relAttributes = [];

    if (relNoFollow) {
      relAttributes.push('nofollow');
    }

    if (target) {
      relAttributes.push('noopener', 'noreferrer');
    }

    if (relSponsored) {
      relAttributes.push('sponsored');
    }

    let htmlAttributes = {
      id: !!elementId ? elementId : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'gb-button': true,
        [`gb-button-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses
      }),
      href: !!url ? url : undefined,
      target: !!target ? '_blank' : undefined,
      rel: relAttributes && relAttributes.length > 0 ? relAttributes.join(' ') : undefined,
      'aria-label': !!ariaLabel ? ariaLabel : undefined
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", htmlAttributes, icon && 'left' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "gb-icon",
      dangerouslySetInnerHTML: {
        __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(icon)
      }
    }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["RichText"].Content, {
      tagName: "span",
      className: "button-text",
      value: text,
      key: "button-text"
    }), icon && 'right' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "gb-icon",
      dangerouslySetInnerHTML: {
        __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(icon)
      }
    }));
  }

}];
/* harmony default export */ __webpack_exports__["default"] = (deprecated);

/***/ }),

/***/ "./src/blocks/button/edit.js":
/*!***********************************!*\
  !*** ./src/blocks/button/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_color_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/color-picker */ "./src/components/color-picker/index.js");
/* harmony import */ var _components_unit_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _components_icon_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icon-picker */ "./src/components/icon-picker/index.js");
/* harmony import */ var _components_url_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/url-input */ "./src/components/url-input/index.js");
/* harmony import */ var _components_dimensions___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/dimensions/ */ "./src/components/dimensions/index.js");
/* harmony import */ var _components_typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/typography */ "./src/components/typography/index.js");
/* harmony import */ var _components_gradient___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/gradient/ */ "./src/components/gradient/index.js");
/* harmony import */ var _components_responsive_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/responsive-tabs */ "./src/components/responsive-tabs/index.js");
/* harmony import */ var _components_panel_area___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/panel-area/ */ "./src/components/panel-area/index.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _css_main_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./css/main.js */ "./src/blocks/button/css/main.js");
/* harmony import */ var _css_desktop_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./css/desktop.js */ "./src/blocks/button/css/desktop.js");
/* harmony import */ var _css_tablet_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./css/tablet.js */ "./src/blocks/button/css/tablet.js");
/* harmony import */ var _css_tablet_only_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./css/tablet-only.js */ "./src/blocks/button/css/tablet-only.js");
/* harmony import */ var _css_mobile_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./css/mobile.js */ "./src/blocks/button/css/mobile.js");
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utils/get-all-unique-ids */ "./src/utils/get-all-unique-ids/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_26__);



/**
 * Block: Buttons
 */


























/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */

const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockButton extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      selectedDevice: 'Desktop',
      fontSizePlaceholder: '17'
    };
    this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind(this);
    this.getDeviceType = this.getDeviceType.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    // Generate a unique ID if none exists or if the same ID exists on this page.
    const allBlocks = wp.data.select('core/block-editor').getBlocks();
    const uniqueIds = Object(_utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_19__["default"])(allBlocks, [], this.props.clientId);

    if (!this.props.attributes.uniqueId || uniqueIds.includes(this.props.attributes.uniqueId)) {
      this.props.setAttributes({
        uniqueId: this.props.clientId.substr(2, 9).replace('-', '')
      });
    }

    const tempFontSizePlaceholder = this.getFontSizePlaceholder();

    if (tempFontSizePlaceholder !== this.state.fontSizePlaceholder) {
      this.setState({
        fontSizePlaceholder: tempFontSizePlaceholder
      });
    } // hasIcon came late, so let's set it on mount if we have an icon.


    if (!this.props.attributes.hasIcon && this.props.attributes.icon) {
      this.props.setAttributes({
        hasIcon: true
      });
    } // hasUrl came late, so let's set it if it doesn't exist.


    if ('undefined' === typeof this.props.attributes.hasUrl) {
      if (!this.props.attributes.url) {
        this.props.setAttributes({
          hasUrl: false
        });
      } else {
        this.props.setAttributes({
          hasUrl: true
        });
      }
    }
  }

  componentDidUpdate() {
    const tempFontSizePlaceholder = this.getFontSizePlaceholder();

    if (tempFontSizePlaceholder !== this.state.fontSizePlaceholder) {
      this.setState({
        fontSizePlaceholder: tempFontSizePlaceholder
      });
    }
  }

  getFontSizePlaceholder() {
    let placeholder = '17';
    const buttonId = document.querySelector('.gb-button-' + this.props.attributes.uniqueId);

    if (buttonId) {
      placeholder = parseFloat(window.getComputedStyle(buttonId).fontSize);
    }

    return placeholder;
  }

  getDeviceType() {
    let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

    if (!generateBlocksInfo.syncResponsivePreviews) {
      deviceType = this.state.selectedDevice;
    }

    return deviceType;
  }

  setDeviceType(deviceType) {
    if (generateBlocksInfo.syncResponsivePreviews && this.props.deviceType) {
      this.props.setDeviceType(deviceType);
      this.setState({
        selectedDevice: deviceType
      });
    } else {
      this.setState({
        selectedDevice: deviceType
      });
    }
  }

  render() {
    const {
      attributes,
      setAttributes,
      isSelected,
      clientId
    } = this.props;
    const {
      fontSizePlaceholder
    } = this.state;
    const {
      uniqueId,
      className,
      anchor,
      text,
      url,
      target,
      relNoFollow,
      relSponsored,
      icon,
      iconLocation,
      removeText,
      ariaLabel,
      backgroundColor,
      backgroundColorOpacity,
      textColor,
      backgroundColorHover,
      backgroundColorHoverOpacity,
      textColorHover,
      fontFamily,
      googleFont,
      googleFontVariants,
      borderColor,
      borderColorOpacity,
      borderColorHover,
      borderColorHoverOpacity,
      iconSize,
      iconSizeTablet,
      iconSizeMobile,
      iconSizeUnit
    } = attributes; // Stop the buttons from doing anything in the editor.

    const links = document.querySelectorAll('a.gb-button');

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        if (links[i].getAttribute('href')) {
          links[i].removeAttribute('href');
          e.preventDefault();
        }
      }, false);
    }

    const relAttributes = [];

    if (relNoFollow) {
      relAttributes.push('nofollow');
    }

    if (target) {
      relAttributes.push('noopener', 'noreferrer');
    }

    if (relSponsored) {
      relAttributes.push('sponsored');
    }

    let googleFontsAttr = '';

    if (googleFontVariants) {
      googleFontsAttr = ':' + googleFontVariants;
    }

    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        'gb-button': true,
        [`gb-button-${uniqueId}`]: true,
        'gb-button-text': !icon,
        [`${className}`]: undefined !== className
      }),
      href: !!url ? url : null,
      target: !!target ? '_blank' : null,
      rel: relAttributes && relAttributes.length > 0 ? relAttributes.join(' ') : null,
      'aria-label': !!ariaLabel ? ariaLabel : null,
      id: anchor ? anchor : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToolbarGroup"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToolbarButton"], {
      className: "gblocks-add-new-button",
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('insert'),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Add Button', 'generateblocks'),
      onClick: () => {
        let parentBlockId = false;

        if (typeof wp.data.select('core/block-editor').getBlockParentsByBlockName === 'function') {
          parentBlockId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, 'generateblocks/button-container', true)[0];
        } else {
          parentBlockId = wp.data.select('core/block-editor').getBlockRootClientId(clientId);
        }

        const thisBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
        const clonedBlock = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_23__["cloneBlock"])(thisBlock, {
          uniqueId: ''
        });
        wp.data.dispatch('core/block-editor').insertBlocks(clonedBlock, undefined, parentBlockId);
      },
      showTooltip: true
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_responsive_tabs__WEBPACK_IMPORTED_MODULE_10__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      selectedDevice: this.getDeviceType(),
      onClick: device => {
        this.setDeviceType(device);
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Typography', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('typography'),
      className: 'gblocks-panel-label',
      id: 'buttonTypography',
      state: this.state,
      showPanel: !removeText || false
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      showFontFamily: true,
      showFontWeight: true,
      showTextTransform: true,
      showFontSize: true,
      showLetterSpacing: true,
      fontSizePlaceholder: fontSizePlaceholder,
      defaultFontSize: generateBlocksDefaults.button.fontSize,
      defaultFontSizeUnit: generateBlocksDefaults.button.fontSizeUnit,
      defaultLetterSpacing: generateBlocksDefaults.button.letterSpacing
    }))), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Tablet',
      showFontSize: true,
      showLetterSpacing: true,
      disableAdvancedToggle: true,
      defaultFontSize: generateBlocksDefaults.button.fontSizeTablet,
      defaultFontSizeUnit: generateBlocksDefaults.button.fontSizeUnit,
      defaultLetterSpacing: generateBlocksDefaults.button.letterSpacingTablet
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Mobile',
      showFontSize: true,
      showLetterSpacing: true,
      disableAdvancedToggle: true,
      defaultFontSize: generateBlocksDefaults.button.fontSizeMobile,
      defaultFontSizeUnit: generateBlocksDefaults.button.fontSizeUnit,
      defaultLetterSpacing: generateBlocksDefaults.button.letterSpacingMobile
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonTypography', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Spacing', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('spacing'),
      className: 'gblocks-panel-label',
      id: 'buttonSpacing',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTop',
      attrRight: 'paddingRight',
      attrBottom: 'paddingBottom',
      attrLeft: 'paddingLeft',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTop',
      attrRight: 'marginRight',
      attrBottom: 'marginBottom',
      attrLeft: 'marginLeft',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTop',
      attrRight: 'borderSizeRight',
      attrBottom: 'borderSizeBottom',
      attrLeft: 'borderSizeLeft',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeft',
      attrRight: 'borderRadiusTopRight',
      attrBottom: 'borderRadiusBottomRight',
      attrLeft: 'borderRadiusBottomLeft',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopTablet',
      attrRight: 'paddingRightTablet',
      attrBottom: 'paddingBottomTablet',
      attrLeft: 'paddingLeftTablet',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopTablet',
      attrRight: 'marginRightTablet',
      attrBottom: 'marginBottomTablet',
      attrLeft: 'marginLeftTablet',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopTablet',
      attrRight: 'borderSizeRightTablet',
      attrBottom: 'borderSizeBottomTablet',
      attrLeft: 'borderSizeLeftTablet',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftTablet',
      attrRight: 'borderRadiusTopRightTablet',
      attrBottom: 'borderRadiusBottomRightTablet',
      attrLeft: 'borderRadiusBottomLeftTablet',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopMobile',
      attrRight: 'paddingRightMobile',
      attrBottom: 'paddingBottomMobile',
      attrLeft: 'paddingLeftMobile',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopMobile',
      attrRight: 'marginRightMobile',
      attrBottom: 'marginBottomMobile',
      attrLeft: 'marginLeftMobile',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopMobile',
      attrRight: 'borderSizeRightMobile',
      attrBottom: 'borderSizeBottomMobile',
      attrLeft: 'borderSizeLeftMobile',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftMobile',
      attrRight: 'borderRadiusTopRightMobile',
      attrBottom: 'borderRadiusBottomRightMobile',
      attrLeft: 'borderRadiusBottomLeftMobile',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonSpacing', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Colors', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('colors'),
      className: 'gblocks-panel-label',
      id: 'buttonColors',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TabPanel"], {
      className: "layout-tab-panel gblocks-control-tabs",
      activeClass: "active-tab",
      tabs: [{
        name: 'button-colors',
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Normal', 'generateblocks'),
        className: 'button-colors'
      }, {
        name: 'button-colors-hover',
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Hover', 'generateblocks'),
        className: 'button-colors-hover'
      }]
    }, tab => {
      const isNormal = tab.name === 'button-colors';
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", null, isNormal ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Background Color', 'generateblocks'),
        value: backgroundColor,
        alpha: true,
        valueOpacity: backgroundColorOpacity,
        attrOpacity: 'backgroundColorOpacity',
        key: 'buttonBackgroundColor',
        onChange: nextBackgroundColor => setAttributes({
          backgroundColor: nextBackgroundColor
        }),
        onOpacityChange: value => setAttributes({
          backgroundColorOpacity: value
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Text Color', 'generateblocks'),
        value: textColor,
        alpha: false,
        key: 'buttonTextColor',
        onChange: nextTextColor => setAttributes({
          textColor: nextTextColor
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Color', 'generateblocks'),
        value: borderColor,
        alpha: true,
        valueOpacity: borderColorOpacity,
        attrOpacity: 'borderColorOpacity',
        key: 'buttonBorderColor',
        onChange: value => setAttributes({
          borderColor: value
        }),
        onOpacityChange: value => setAttributes({
          borderColorOpacity: value
        })
      }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonColorsNormal', this.props, this.state)) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Background Color', 'generateblocks'),
        value: backgroundColorHover,
        alpha: true,
        valueOpacity: backgroundColorHoverOpacity,
        attrOpacity: 'backgroundColorHoverOpacity',
        key: 'buttonBackgroundColorHover',
        onChange: nextBackgroundColorHover => setAttributes({
          backgroundColorHover: nextBackgroundColorHover
        }),
        onOpacityChange: value => setAttributes({
          backgroundColorHoverOpacity: value
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Text Color', 'generateblocks'),
        value: textColorHover,
        alpha: false,
        key: 'buttonTextColorHover',
        onChange: nextTextColorHover => setAttributes({
          textColorHover: nextTextColorHover
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Color', 'generateblocks'),
        value: borderColorHover,
        alpha: true,
        valueOpacity: borderColorHoverOpacity,
        attrOpacity: 'borderColorHoverOpacity',
        key: 'buttonBorderColorHover',
        onChange: value => setAttributes({
          borderColorHover: value
        }),
        onOpacityChange: value => setAttributes({
          borderColorHoverOpacity: value
        })
      }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonColorsHover', this.props, this.state)));
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonColors', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Background Gradient', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('gradients'),
      className: 'gblocks-panel-label',
      id: 'buttonBackgroundGradient',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_gradient___WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      attrGradient: 'gradient',
      attrGradientDirection: 'gradientDirection',
      attrGradientColorOne: 'gradientColorOne',
      attrGradientColorOneOpacity: 'gradientColorOneOpacity',
      attrGradientColorStopOne: 'gradientColorStopOne',
      attrGradientColorTwo: 'gradientColorTwo',
      attrGradientColorTwoOpacity: 'gradientColorTwoOpacity',
      attrGradientColorStopTwo: 'gradientColorStopTwo',
      defaultColorOne: generateBlocksDefaults.button.gradientColorOne,
      defaultColorTwo: generateBlocksDefaults.button.gradientColorTwo
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonBackgroundGradient', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('icons'),
      className: 'gblocks-panel-label',
      id: 'buttonIcon',
      state: this.state,
      showPanel: 'Desktop' === this.getDeviceType() || !!icon ? true : false
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_icon_picker__WEBPACK_IMPORTED_MODULE_5__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      attrIcon: 'icon',
      attrIconLocation: 'iconLocation',
      attrRemoveText: 'removeText',
      locationOptions: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Left', 'generateblocks'),
        value: 'left'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Right', 'generateblocks'),
        value: 'right'
      }]
    })), 'Desktop' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTop',
      attrRight: 'iconPaddingRight',
      attrBottom: 'iconPaddingBottom',
      attrLeft: 'iconPaddingLeft',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSize || '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      onChange: value => {
        setAttributes({
          iconSize: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSize: parseFloat(iconSize)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSize: generateBlocksDefaults.button.iconSize
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), 'Tablet' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTopTablet',
      attrRight: 'iconPaddingRightTablet',
      attrBottom: 'iconPaddingBottomTablet',
      attrLeft: 'iconPaddingLeftTablet',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSizeTablet || '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      placeholder: "1",
      onChange: value => {
        setAttributes({
          iconSizeTablet: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSizeTablet: parseFloat(iconSizeTablet)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSizeTablet: generateBlocksDefaults.button.iconSizeTablet
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), 'Mobile' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTopMobile',
      attrRight: 'iconPaddingRightMobile',
      attrBottom: 'iconPaddingBottomMobile',
      attrLeft: 'iconPaddingLeftMobile',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.button,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSizeMobile || '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      placeholder: "1",
      onChange: value => {
        setAttributes({
          iconSizeMobile: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSizeMobile: parseFloat(iconSizeMobile)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSizeMobile: generateBlocksDefaults.button.iconSizeMobile
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonIcon', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Documentation', 'generateblocks'),
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_12__["default"])('documentation'),
      initialOpen: false,
      className: 'gblocks-panel-label',
      id: 'buttonDocumentation',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Need help with this block?', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      href: "https://docs.generateblocks.com/collection/buttons/",
      target: "_blank",
      rel: "noreferrer noopener"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Visit our documentation', 'generateblocks')), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'buttonDocumentation', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["InspectorAdvancedControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('HTML Anchor', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Anchors lets you link directly to a section on a page.', 'generateblocks'),
      value: anchor || '',
      onChange: nextValue => {
        nextValue = nextValue.replace(ANCHOR_REGEX, '-');
        setAttributes({
          anchor: nextValue
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('ARIA Label', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Helpful to people using screen readers.', 'generateblocks'),
      value: ariaLabel,
      onChange: value => {
        setAttributes({
          ariaLabel: value
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_main_js__WEBPACK_IMPORTED_MODULE_13__["default"], this.props), this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'Desktop' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_desktop_js__WEBPACK_IMPORTED_MODULE_14__["default"], this.props), ('Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_js__WEBPACK_IMPORTED_MODULE_15__["default"], this.props), 'Tablet' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_only_js__WEBPACK_IMPORTED_MODULE_16__["default"], this.props), 'Mobile' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_mobile_js__WEBPACK_IMPORTED_MODULE_17__["default"], this.props)), fontFamily && googleFont && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("link", {
      rel: "stylesheet",
      href: 'https://fonts.googleapis.com/css?family=' + fontFamily.replace(/ /g, '+') + googleFontsAttr
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_18__["default"], {
      tagName: url ? 'a' : 'span',
      htmlAttrs: htmlAttributes
    }, !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'left' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-icon",
      dangerouslySetInnerHTML: {
        __html: icon
      }
    }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: 'gb-button-text'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["RichText"], {
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Add text…', 'generateblocks'),
      value: text,
      onChange: value => setAttributes({
        text: value
      }),
      allowedFormats: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.buttonDisableFormatting', false, this.props) ? [] : ['core/bold', 'core/italic', 'core/strikethrough'],
      isSelected: isSelected,
      keepPlaceholderOnFocus: true
    })), 'right' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-icon",
      dangerouslySetInnerHTML: {
        __html: icon
      }
    })), !icon && !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["RichText"], {
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Add text…', 'generateblocks'),
      value: text,
      onChange: value => setAttributes({
        text: value
      }),
      allowedFormats: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.buttonDisableFormatting', false, this.props) ? [] : ['core/bold', 'core/italic', 'core/strikethrough'],
      isSelected: isSelected,
      keepPlaceholderOnFocus: true
    })), isSelected && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_url_input__WEBPACK_IMPORTED_MODULE_6__["default"], {
      url: url,
      target: target,
      relNoFollow: relNoFollow,
      relSponsored: relSponsored,
      onChange: data => {
        setAttributes(data);

        if ('' !== data.url) {
          setAttributes({
            hasUrl: true
          });
        } else {
          setAttributes({
            hasUrl: false
          });
        }
      },
      autoFocus: false // eslint-disable-line jsx-a11y/no-autofocus
      ,
      className: "gblocks-component-url-input-float"
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_26__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__["withDispatch"])(dispatch => ({
  setDeviceType(type) {
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = dispatch('core/edit-post');

    if (!setPreviewDeviceType) {
      return;
    }

    setPreviewDeviceType(type);
  }

})), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__["withSelect"])(select => {
  const {
    __experimentalGetPreviewDeviceType: getPreviewDeviceType
  } = select('core/edit-post');

  if (!getPreviewDeviceType) {
    return {
      deviceType: null
    };
  }

  return {
    deviceType: getPreviewDeviceType()
  };
})])(GenerateBlockButton));

/***/ }),

/***/ "./src/blocks/button/editor.scss":
/*!***************************************!*\
  !*** ./src/blocks/button/editor.scss ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/button/save.js":
/*!***********************************!*\
  !*** ./src/blocks/button/save.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);


/**
 * Block: Buttons
 */




/* harmony default export */ __webpack_exports__["default"] = (({
  attributes
}) => {
  const {
    uniqueId,
    className,
    text,
    url,
    target,
    relNoFollow,
    relSponsored,
    icon,
    iconLocation,
    removeText,
    ariaLabel,
    anchor
  } = attributes;
  const relAttributes = [];

  if (relNoFollow) {
    relAttributes.push('nofollow');
  }

  if (target) {
    relAttributes.push('noopener', 'noreferrer');
  }

  if (relSponsored) {
    relAttributes.push('sponsored');
  }

  let htmlAttributes = {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'gb-button': true,
      [`gb-button-${uniqueId}`]: true,
      'gb-button-text': !icon,
      [`${className}`]: undefined !== className
    }),
    href: !!url ? url : null,
    target: !!target ? '_blank' : null,
    rel: relAttributes && relAttributes.length > 0 ? relAttributes.join(' ') : null,
    'aria-label': !!ariaLabel ? ariaLabel : null,
    id: anchor ? anchor : null
  };
  htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tagName: url ? 'a' : 'span',
    htmlAttrs: htmlAttributes
  }, !!icon && 'left' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "gb-icon",
    dangerouslySetInnerHTML: {
      __html: icon
    }
  }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["RichText"].Content, {
    value: text,
    tagName: !!icon ? 'span' : null,
    className: !!icon ? 'gb-button-text' : null
  }), !!icon && 'right' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "gb-icon",
    dangerouslySetInnerHTML: {
      __html: icon
    }
  }));
});

/***/ }),

/***/ "./src/blocks/container/attributes.js":
/*!********************************************!*\
  !*** ./src/blocks/container/attributes.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
const attributes = {
  uniqueId: {
    type: 'string',
    default: ''
  },
  anchor: {
    type: 'string',
    default: ''
  },
  isGrid: {
    type: 'boolean',
    default: false
  },
  gridId: {
    type: 'string',
    default: ''
  },
  tagName: {
    type: 'string',
    default: generateBlocksDefaults.container.tagName
  },
  width: {
    type: 'number',
    default: generateBlocksDefaults.container.width
  },
  widthTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.widthTablet
  },
  widthMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.widthMobile
  },
  autoWidth: {
    type: 'boolean',
    default: generateBlocksDefaults.container.autoWidth
  },
  autoWidthTablet: {
    type: 'boolean',
    default: generateBlocksDefaults.container.autoWidthTablet
  },
  autoWidthMobile: {
    type: 'boolean',
    default: generateBlocksDefaults.container.autoWidthMobile
  },
  flexGrow: {
    type: 'number',
    default: generateBlocksDefaults.container.flexGrow
  },
  flexGrowTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.flexGrowTablet
  },
  flexGrowMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.flexGrowMobile
  },
  flexShrink: {
    type: 'number',
    default: generateBlocksDefaults.container.flexShrink
  },
  flexShrinkTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.flexShrinkTablet
  },
  flexShrinkMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.flexShrinkMobile
  },
  flexBasis: {
    type: 'string',
    default: generateBlocksDefaults.container.flexBasis
  },
  flexBasisTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.flexBasisTablet
  },
  flexBasisMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.flexBasisMobile
  },
  flexBasisUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.flexBasisUnit
  },
  orderTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.orderTablet
  },
  orderMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.orderMobile
  },
  outerContainer: {
    type: 'string',
    default: generateBlocksDefaults.container.outerContainer
  },
  innerContainer: {
    type: 'string',
    default: generateBlocksDefaults.container.innerContainer
  },
  containerWidth: {
    type: 'number',
    default: generateBlocksDefaults.container.containerWidth
  },
  minHeight: {
    type: 'number',
    default: generateBlocksDefaults.container.minHeight
  },
  minHeightUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.minHeightUnit
  },
  minHeightTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.minHeightTablet
  },
  minHeightUnitTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.minHeightUnitTablet
  },
  minHeightMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.minHeightMobile
  },
  minHeightUnitMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.minHeightUnitMobile
  },
  paddingTop: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingTop
  },
  paddingRight: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingRight
  },
  paddingBottom: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingBottom
  },
  paddingLeft: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingLeft
  },
  paddingUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingUnit
  },
  paddingSyncUnits: {
    type: 'boolean',
    default: false
  },
  paddingTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingTopTablet
  },
  paddingRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingRightTablet
  },
  paddingBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingBottomTablet
  },
  paddingLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingLeftTablet
  },
  paddingTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingTopMobile
  },
  paddingRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingRightMobile
  },
  paddingBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingBottomMobile
  },
  paddingLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.paddingLeftMobile
  },
  marginTop: {
    type: 'string',
    default: generateBlocksDefaults.container.marginTop
  },
  marginRight: {
    type: 'string',
    default: generateBlocksDefaults.container.marginRight
  },
  marginBottom: {
    type: 'string',
    default: generateBlocksDefaults.container.marginBottom
  },
  marginLeft: {
    type: 'string',
    default: generateBlocksDefaults.container.marginLeft
  },
  marginUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.marginUnit
  },
  marginSyncUnits: {
    type: 'boolean',
    default: false
  },
  marginTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.marginTopTablet
  },
  marginRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.marginRightTablet
  },
  marginBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.marginBottomTablet
  },
  marginLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.marginLeftTablet
  },
  marginTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.marginTopMobile
  },
  marginRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.marginRightMobile
  },
  marginBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.marginBottomMobile
  },
  marginLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.marginLeftMobile
  },
  borderSizeTop: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeTop
  },
  borderSizeRight: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeRight
  },
  borderSizeBottom: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeBottom
  },
  borderSizeLeft: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeLeft
  },
  borderSizeTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeTopTablet
  },
  borderSizeRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeRightTablet
  },
  borderSizeBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeBottomTablet
  },
  borderSizeLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeLeftTablet
  },
  borderSizeTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeTopMobile
  },
  borderSizeRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeRightMobile
  },
  borderSizeBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeBottomMobile
  },
  borderSizeLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderSizeLeftMobile
  },
  borderRadiusTopRight: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopRight
  },
  borderRadiusBottomRight: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomRight
  },
  borderRadiusBottomLeft: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomLeft
  },
  borderRadiusTopLeft: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopLeft
  },
  borderRadiusUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusUnit
  },
  borderRadiusTopRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopRightTablet
  },
  borderRadiusBottomRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomRightTablet
  },
  borderRadiusBottomLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomLeftTablet
  },
  borderRadiusTopLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopLeftTablet
  },
  borderRadiusTopRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopRightMobile
  },
  borderRadiusBottomRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomRightMobile
  },
  borderRadiusBottomLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusBottomLeftMobile
  },
  borderRadiusTopLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.borderRadiusTopLeftMobile
  },
  borderColor: {
    type: 'string',
    default: generateBlocksDefaults.container.borderColor
  },
  borderColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.container.borderColorOpacity
  },
  backgroundColor: {
    type: 'string',
    default: generateBlocksDefaults.container.backgroundColor
  },
  backgroundColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.container.backgroundColorOpacity
  },
  gradient: {
    type: 'boolean',
    default: generateBlocksDefaults.container.gradient
  },
  gradientDirection: {
    type: 'number',
    default: generateBlocksDefaults.container.gradientDirection
  },
  gradientColorOne: {
    type: 'string',
    default: generateBlocksDefaults.container.gradientColorOne
  },
  gradientColorOneOpacity: {
    type: 'number',
    default: generateBlocksDefaults.container.gradientColorOneOpacity
  },
  gradientColorStopOne: {
    type: 'number',
    default: generateBlocksDefaults.container.gradientColorStopOne
  },
  gradientColorTwo: {
    type: 'string',
    default: generateBlocksDefaults.container.gradientColorTwo
  },
  gradientColorTwoOpacity: {
    type: 'number',
    default: generateBlocksDefaults.container.gradientColorTwoOpacity
  },
  gradientColorStopTwo: {
    type: 'number',
    default: generateBlocksDefaults.container.gradientColorStopTwo
  },
  gradientSelector: {
    type: 'string',
    default: 'element'
  },
  textColor: {
    type: 'string',
    default: generateBlocksDefaults.container.textColor
  },
  linkColor: {
    type: 'string',
    default: generateBlocksDefaults.container.linkColor
  },
  linkColorHover: {
    type: 'string',
    default: generateBlocksDefaults.container.linkColorHover
  },
  bgImage: {
    type: 'object',
    default: generateBlocksDefaults.container.bgImage
  },
  bgOptions: {
    type: 'object',
    default: {
      selector: generateBlocksDefaults.container.bgOptions.selector,
      opacity: generateBlocksDefaults.container.bgOptions.opacity,
      overlay: generateBlocksDefaults.container.bgOptions.overlay,
      position: generateBlocksDefaults.container.bgOptions.position,
      size: generateBlocksDefaults.container.bgOptions.size,
      repeat: generateBlocksDefaults.container.bgOptions.repeat,
      attachment: generateBlocksDefaults.container.bgOptions.attachment
    }
  },
  bgImageSize: {
    type: 'string',
    default: generateBlocksDefaults.container.bgImageSize
  },
  verticalAlignment: {
    type: 'string',
    default: generateBlocksDefaults.container.verticalAlignment
  },
  verticalAlignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.verticalAlignmentTablet
  },
  verticalAlignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.verticalAlignmentMobile
  },
  zindex: {
    type: 'number',
    default: generateBlocksDefaults.container.zindex
  },
  innerZindex: {
    type: 'number',
    default: generateBlocksDefaults.container.innerZindex
  },
  removeVerticalGap: {
    type: 'boolean',
    default: generateBlocksDefaults.container.removeVerticalGap
  },
  removeVerticalGapTablet: {
    type: 'boolean',
    default: generateBlocksDefaults.container.removeVerticalGapTablet
  },
  removeVerticalGapMobile: {
    type: 'boolean',
    default: generateBlocksDefaults.container.removeVerticalGapMobile
  },
  alignment: {
    type: 'string',
    default: generateBlocksDefaults.container.alignment
  },
  alignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.container.alignmentTablet
  },
  alignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.container.alignmentMobile
  },
  fontFamily: {
    type: 'string',
    default: generateBlocksDefaults.container.fontFamily
  },
  fontFamilyFallback: {
    type: 'string',
    default: generateBlocksDefaults.container.fontFamilyFallback
  },
  googleFont: {
    type: 'boolean',
    default: generateBlocksDefaults.container.googleFont
  },
  googleFontVariants: {
    type: 'string',
    default: generateBlocksDefaults.container.googleFontVariants
  },
  fontWeight: {
    type: 'string',
    default: generateBlocksDefaults.container.fontWeight
  },
  fontSize: {
    type: 'number',
    default: generateBlocksDefaults.container.fontSize
  },
  fontSizeTablet: {
    type: 'number',
    default: generateBlocksDefaults.container.fontSizeTablet
  },
  fontSizeMobile: {
    type: 'number',
    default: generateBlocksDefaults.container.fontSizeMobile
  },
  fontSizeUnit: {
    type: 'string',
    default: generateBlocksDefaults.container.fontSizeUnit
  },
  textTransform: {
    type: 'string',
    default: ''
  },
  align: {
    type: 'string',
    default: ''
  },
  shapeDividers: {
    type: 'array',
    default: []
  },
  isDynamic: {
    type: 'boolean'
  },
  blockVersion: {
    type: 'number'
  },
  // deprecated since 1.2.0.
  elementId: {
    type: 'string',
    default: ''
  },
  cssClasses: {
    type: 'string',
    default: ''
  }
};

if (generateBlocksInfo.hasCustomFields) {
  Object.assign(attributes, {
    fullWidthContent: {
      type: 'string',
      source: 'meta',
      meta: '_generate-full-width-content'
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (attributes);
/* eslint-enable no-undef */

/***/ }),

/***/ "./src/blocks/container/block-controls.js":
/*!************************************************!*\
  !*** ./src/blocks/container/block-controls.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__);


/**
 * WordPress Dependencies
 */








const hasWideAlignSupport = generateBlocksInfo.hasWideAlignSupport;
const WIDE_ALIGNMENTS = ['wide', 'full'];
/**
 * Add controls to the Container block toolbar.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */

const withAdvancedControls = Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__["createHigherOrderComponent"])(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      isSelected,
      clientId,
      setAttributes
    } = props;
    const {
      isGrid,
      align
    } = attributes;
    let parentGridId = false;

    if (typeof wp.data.select('core/block-editor').getBlockParentsByBlockName === 'function') {
      parentGridId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, 'generateblocks/grid', true)[0];
    } else {
      parentGridId = wp.data.select('core/block-editor').getBlockRootClientId(clientId);
    }

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, isSelected && isGrid && parentGridId && 'generateblocks/container' === name && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToolbarGroup"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToolbarButton"], {
      className: "gblocks-block-control-icon gblocks-add-grid-item",
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_1__["default"])('addContainer'),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Duplicate Grid Item', 'generateblocks'),
      onClick: () => {
        const thisBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
        const clonedBlock = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__["cloneBlock"])(thisBlock, {
          uniqueId: ''
        });
        wp.data.dispatch('core/block-editor').insertBlocks(clonedBlock, undefined, parentGridId);
      },
      showTooltip: true
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToolbarGroup"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToolbarButton"], {
      className: "gblocks-block-control-icon",
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_1__["default"])('grid'),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Select Parent Grid', 'generateblocks'),
      onClick: () => {
        wp.data.dispatch('core/block-editor').selectBlock(parentGridId);
      },
      showTooltip: true
    }))), isSelected && hasWideAlignSupport && !isGrid && 'generateblocks/container' === name && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["BlockAlignmentToolbar"], {
      value: align,
      onChange: value => {
        setAttributes({
          align: value
        });

        if ('full' === value) {
          setAttributes({
            outerContainer: 'full'
          });
        }
      },
      controls: WIDE_ALIGNMENTS
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockEdit, props));
  };
}, 'withAdvancedControls');
Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["addFilter"])('editor.BlockEdit', 'generateblocks/container-block-controls', withAdvancedControls);

/***/ }),

/***/ "./src/blocks/container/block.js":
/*!***************************************!*\
  !*** ./src/blocks/container/block.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/container/editor.scss");
/* harmony import */ var _block_controls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block-controls.js */ "./src/blocks/container/block-controls.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/blocks/container/edit.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attributes */ "./src/blocks/container/attributes.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deprecated */ "./src/blocks/container/deprecated.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__);


/**
 * Block: Container
 */









/**
 * Register our Container block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__["registerBlockType"])('generateblocks/container', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Container', 'generateblocks'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Organize your content into rows and sections.', 'generateblocks'),
  icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_6__["default"])('container'),
  category: 'generateblocks',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('section'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('container'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('generate')],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_4__["default"],
  supports: {
    align: false,
    className: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: () => {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__["InnerBlocks"].Content, null);
  },
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./src/blocks/container/css/desktop.js":
/*!*********************************************!*\
  !*** ./src/blocks/container/css/desktop.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DesktopCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);


/* eslint-disable quotes */



class DesktopCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      removeVerticalGap
    } = attributes;
    let cssObj = [];
    cssObj['.block-editor-block-list__layout > #block-' + clientId] = [{
      'margin-bottom': removeVerticalGap ? '0px !important' : false
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.desktopCSS', cssObj, this.props, 'container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/container/css/main.js":
/*!******************************************!*\
  !*** ./src/blocks/container/css/main.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/shorthand-css */ "./src/utils/shorthand-css/index.js");
/* harmony import */ var _utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/hex-to-rgba */ "./src/utils/hex-to-rgba/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _utils_get_background_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/get-background-image */ "./src/utils/get-background-image/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);


/* eslint-disable quotes */







class MainCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      isGrid,
      width,
      autoWidth,
      flexGrow,
      flexShrink,
      flexBasis,
      flexBasisUnit,
      outerContainer,
      innerContainer,
      containerWidth,
      minHeight,
      minHeightUnit,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingUnit,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginUnit,
      borderSizeTop,
      borderSizeRight,
      borderSizeBottom,
      borderSizeLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft,
      borderRadiusTopLeft,
      borderRadiusUnit,
      borderColor,
      borderColorOpacity,
      backgroundColor,
      backgroundColorOpacity,
      gradient,
      gradientSelector,
      textColor,
      linkColor,
      linkColorHover,
      bgImage,
      bgOptions,
      verticalAlignment,
      zindex,
      innerZindex,
      alignment,
      fontFamily,
      fontFamilyFallback,
      fontWeight,
      fontSize,
      fontSizeUnit,
      textTransform,
      shapeDividers
    } = attributes;
    let containerWidthPreview = containerWidth;

    if (!containerWidthPreview) {
      containerWidthPreview = generateBlocksDefaults.container.containerWidth;
    }

    let fontFamilyFallbackValue = '';

    if (fontFamily && fontFamilyFallback) {
      fontFamilyFallbackValue = ', ' + fontFamilyFallback;
    }

    const hasBgImage = !!bgImage;
    const backgroundImageValue = Object(_utils_get_background_image__WEBPACK_IMPORTED_MODULE_5__["default"])('image', this.props);
    const gradientValue = Object(_utils_get_background_image__WEBPACK_IMPORTED_MODULE_5__["default"])('gradient', this.props);
    let cssObj = [];
    cssObj['.gb-container-' + uniqueId] = [{
      'background-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__["default"])(backgroundColor, backgroundColorOpacity),
      'color': textColor,
      // eslint-disable-line quote-props
      'border-radius': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit),
      'margin': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTop, marginRight, marginBottom, marginLeft, marginUnit),
      // eslint-disable-line quote-props
      'z-index': zindex,
      'text-align': alignment,
      'font-family': fontFamily + fontFamilyFallbackValue,
      'font-weight': fontWeight,
      'text-transform': textTransform,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(fontSize, fontSizeUnit),
      'min-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(minHeight, minHeightUnit),
      'border-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__["default"])(borderColor, borderColorOpacity)
    }];

    if (hasBgImage && 'element' === bgOptions.selector && backgroundImageValue) {
      cssObj['.gb-container-' + uniqueId].push({
        'background-image': backgroundImageValue,
        'background-size': bgOptions.size,
        'background-position': bgOptions.position,
        'background-repeat': bgOptions.repeat,
        'background-attachment': bgOptions.attachment
      });
    } else if (gradient && 'element' === gradientSelector) {
      cssObj['.gb-container-' + uniqueId].push({
        'background-image': gradientValue
      });
    }

    if (hasBgImage && 'pseudo-element' === bgOptions.selector || zindex || gradient && 'pseudo-element' === gradientSelector) {
      cssObj['.gb-container-' + uniqueId].push({
        'position': 'relative' // eslint-disable-line quote-props

      });
    }

    if (hasBgImage && 'pseudo-element' === bgOptions.selector || gradient && 'pseudo-element' === gradientSelector) {
      cssObj['.gb-container-' + uniqueId].push({
        'overflow': 'hidden' // eslint-disable-line quote-props

      });
      cssObj['.gb-container-' + uniqueId + ' .block-list-appender'] = [{
        'z-index': 10
      }];
    }

    cssObj[`.editor-styles-wrapper .gb-container-` + uniqueId + ` h1,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h2,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h3,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h4,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h5,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h6`] = [{
      'color': textColor // eslint-disable-line quote-props

    }];

    if (borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft) {
      cssObj['.gb-container-' + uniqueId].push({
        'border-width': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px'),
        'border-style': 'solid'
      });
    }

    if (minHeight && !isGrid) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'row',
        'align-items': verticalAlignment
      });
    }

    if (isGrid) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'column',
        'height': '100%',
        // eslint-disable-line quote-props
        'justify-content': verticalAlignment
      });
      cssObj['.block-editor-block-list__layout > #block-' + clientId] = [{
        'height': '100%' // eslint-disable-line quote-props

      }];
    }

    if (hasBgImage && 'pseudo-element' === bgOptions.selector) {
      cssObj['.gb-container-' + uniqueId + ':before'] = [{
        'content': '""',
        // eslint-disable-line quote-props
        'background-image': backgroundImageValue,
        'background-repeat': bgOptions.repeat,
        'background-position': bgOptions.position,
        'background-size': bgOptions.size,
        'background-attachment': bgOptions.attachment,
        'z-index': '0',
        'position': 'absolute',
        // eslint-disable-line quote-props
        'top': '0',
        // eslint-disable-line quote-props
        'right': '0',
        // eslint-disable-line quote-props
        'bottom': '0',
        // eslint-disable-line quote-props
        'left': '0',
        // eslint-disable-line quote-props
        'border-radius': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit)
      }];

      if (typeof bgOptions.opacity !== 'undefined' && 1 !== bgOptions.opacity) {
        cssObj['.gb-container-' + uniqueId + ':before'].push({
          'opacity': bgOptions.opacity // eslint-disable-line quote-props

        });
      }
    }

    if (gradient && 'pseudo-element' === gradientSelector) {
      cssObj['.gb-container-' + uniqueId + ':after'] = [{
        'content': '""',
        // eslint-disable-line quote-props
        'background-image': gradientValue,
        'z-index': '0',
        'position': 'absolute',
        // eslint-disable-line quote-props
        'top': '0',
        // eslint-disable-line quote-props
        'right': '0',
        // eslint-disable-line quote-props
        'bottom': '0',
        // eslint-disable-line quote-props
        'left': '0' // eslint-disable-line quote-props

      }];
    }

    cssObj['.gb-container-' + uniqueId + ' a, .gb-container-' + uniqueId + ' a:visited'] = [{
      'color': linkColor // eslint-disable-line quote-props

    }];
    cssObj['.gb-container-' + uniqueId + ' a:hover'] = [{
      'color': linkColorHover // eslint-disable-line quote-props

    }];
    cssObj['.gb-container-' + uniqueId + ' > .gb-inside-container'] = [{
      'padding': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit),
      // eslint-disable-line quote-props
      'width': minHeight && !isGrid ? '100%' : false // eslint-disable-line quote-props

    }];

    if (innerZindex || 0 === innerZindex) {
      cssObj['.gb-container-' + uniqueId + ' > .gb-inside-container'].push({
        'z-index': innerZindex,
        position: 'relative'
      });
    }

    if ('contained' === innerContainer && !isGrid) {
      cssObj['.gb-container-' + uniqueId + ' > .gb-inside-container'].push({
        'max-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(containerWidthPreview, 'px'),
        'margin-left': 'auto',
        'margin-right': 'auto'
      });
    }

    cssObj['.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId] = [{
      width: !autoWidth ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(width, '%') : false,
      'flex-grow': flexGrow,
      'flex-shrink': flexShrink,
      'flex-basis': isNaN(flexBasis) ? flexBasis : Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(flexBasis, flexBasisUnit),
      'display': 'flex',
      // eslint-disable-line quote-props
      'flex-direction': 'column',
      'margin-left': '0px',
      'margin-right': '0px'
    }];
    cssObj['.block-editor-block-list__layout > #block-' + clientId] = [{
      'max-width': 'contained' === outerContainer && !isGrid ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(containerWidthPreview, 'px') : false
    }];
    cssObj[`.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit,
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"]`] = [{
      'height': '100%' // eslint-disable-line quote-props

    }];
    cssObj[`#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child),
		#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-editor-block-list__layout > div:not(:first-child) > .block-list-appender`] = [{
      'display': 'none' // eslint-disable-line quote-props

    }];

    if (shapeDividers.length) {
      cssObj['.gb-container-' + uniqueId].push({
        position: 'relative'
      });
      cssObj['.gb-container-' + uniqueId + ' .block-list-appender'] = [{
        position: 'relative',
        'z-index': 100
      }];
      shapeDividers.forEach((location, index) => {
        const shapeTransforms = [];
        const shapeNumber = index + 1;

        if ('top' === shapeDividers[index].location) {
          shapeTransforms.push('scaleY(-1)');
        }

        if (shapeDividers[index].flipHorizontally) {
          shapeTransforms.push('scaleX(-1)');
          cssObj['.gblocks-shape-container > .gblocks-shape-toggle-preview-' + shapeNumber + ' .gblocks-shape-divider-preview'] = [{
            transform: 'scaleX(-1)'
          }];
        }

        cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber] = [{
          color: Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__["default"])(shapeDividers[index].color, shapeDividers[index].colorOpacity),
          'z-index': shapeDividers[index].zindex
        }];

        if ('top' === shapeDividers[index].location || 'bottom' === shapeDividers[index].location) {
          cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber].push({
            left: '0',
            right: '0'
          });
        }

        if ('bottom' === shapeDividers[index].location) {
          cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber].push({
            bottom: '-1px'
          });
        }

        if ('top' === shapeDividers[index].location) {
          cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber].push({
            top: '-1px'
          });
        }

        if (shapeTransforms.length) {
          cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber].push({
            transform: shapeTransforms.join(' ')
          });
        }

        let shapeWidth = shapeDividers[index].width + '%';

        if (100 === shapeDividers[index].width) {
          shapeWidth = 'calc(' + shapeWidth + ' + 1.3px)';
        }

        cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg'] = [{
          height: Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_4__["default"])(shapeDividers[index].height, 'px'),
          width: shapeWidth
        }];

        if ('top' === shapeDividers[index].location || 'bottom' === shapeDividers[index].location) {
          cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg'].push({
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            'min-width': '100%'
          });
        }
      });
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.editor.mainCSS', cssObj, this.props, 'container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/container/css/mobile.js":
/*!********************************************!*\
  !*** ./src/blocks/container/css/mobile.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MobileCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);


/* eslint-disable quotes */




class MobileCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      isGrid,
      widthMobile,
      autoWidthMobile,
      flexGrowMobile,
      flexShrinkMobile,
      flexBasisMobile,
      flexBasisUnit,
      minHeightMobile,
      minHeightUnitMobile,
      paddingTopMobile,
      paddingRightMobile,
      paddingBottomMobile,
      paddingLeftMobile,
      paddingUnit,
      marginTopMobile,
      marginRightMobile,
      marginBottomMobile,
      marginLeftMobile,
      marginUnit,
      borderSizeTopMobile,
      borderSizeRightMobile,
      borderSizeBottomMobile,
      borderSizeLeftMobile,
      borderRadiusTopRightMobile,
      borderRadiusBottomRightMobile,
      borderRadiusBottomLeftMobile,
      borderRadiusTopLeftMobile,
      borderRadiusUnit,
      verticalAlignmentMobile,
      removeVerticalGapMobile,
      alignmentMobile,
      fontSizeMobile,
      fontSizeUnit,
      orderMobile,
      shapeDividers,
      bgImage,
      bgOptions
    } = attributes;
    let cssObj = [];
    cssObj['.gb-container-' + uniqueId] = [{
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftMobile, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightMobile, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightMobile, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftMobile, borderRadiusUnit),
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopMobile, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightMobile, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomMobile, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftMobile, marginUnit),
      'text-align': alignmentMobile,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(fontSizeMobile, fontSizeUnit),
      'min-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(minHeightMobile, minHeightUnitMobile)
    }];

    if (borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile) {
      cssObj['.gb-container-' + uniqueId].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeTopMobile, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeRightMobile, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeBottomMobile, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeLeftMobile, 'px'),
        'border-style': 'solid'
      });
    }

    if ('inherit' !== verticalAlignmentMobile && minHeightMobile && !isGrid) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'row',
        'align-items': verticalAlignmentMobile
      });
    }

    if (isGrid && 'inherit' !== verticalAlignmentMobile) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'column',
        'height': '100%',
        // eslint-disable-line quote-props
        'justify-content': verticalAlignmentMobile
      });
    }

    cssObj['.gb-container-' + uniqueId + ' > .gb-inside-container'] = [{
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingTopMobile, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingRightMobile, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingBottomMobile, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingLeftMobile, paddingUnit),
      'width': minHeightMobile && !isGrid ? '100%' : false // eslint-disable-line quote-props

    }];
    cssObj['.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId] = [{
      width: !autoWidthMobile ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(widthMobile, '%') : 'auto',
      'flex-grow': flexGrowMobile,
      'flex-shrink': flexShrinkMobile,
      'flex-basis': isNaN(flexBasisMobile) ? flexBasisMobile : Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(flexBasisMobile, flexBasisUnit),
      'order': orderMobile // eslint-disable-line quote-props

    }];

    if (removeVerticalGapMobile) {
      cssObj['.block-editor-block-list__layout > #block-' + clientId] = [{
        'margin-bottom': '0px !important'
      }];
    }

    if (!!bgImage && 'pseudo-element' === bgOptions.selector) {
      cssObj['.gb-container-' + uniqueId + ':before'] = [{
        'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftMobile, borderRadiusUnit),
        'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightMobile, borderRadiusUnit),
        'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightMobile, borderRadiusUnit),
        'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftMobile, borderRadiusUnit)
      }];
    }

    if (shapeDividers.length) {
      shapeDividers.forEach((location, index) => {
        const shapeNumber = index + 1;
        cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg'] = [{
          height: Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(shapeDividers[index].heightMobile, 'px'),
          width: Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(shapeDividers[index].widthMobile, '%')
        }];
      });
    }

    if (!!bgImage && 'fixed' === bgOptions.attachment) {
      if ('element' === bgOptions.selector) {
        cssObj['.gb-container-' + uniqueId].push({
          'background-attachment': 'initial'
        });
      }

      if ('pseudo-element' === bgOptions.selector) {
        cssObj['.gb-container-' + uniqueId + ':before'] = [{
          'background-attachment': 'initial'
        }];
      }
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.mobileCSS', cssObj, this.props, 'container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/container/css/tablet-only.js":
/*!*************************************************!*\
  !*** ./src/blocks/container/css/tablet-only.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletOnlyCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);


/* eslint-disable quotes */



class TabletOnlyCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      removeVerticalGapTablet
    } = attributes;
    let cssObj = [];

    if (removeVerticalGapTablet) {
      cssObj['.block-editor-block-list__layout > #block-' + clientId] = [{
        'margin-bottom': '0px !important'
      }];
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/container/css/tablet.js":
/*!********************************************!*\
  !*** ./src/blocks/container/css/tablet.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);


/* eslint-disable quotes */




class TabletCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      isGrid,
      widthTablet,
      autoWidthTablet,
      flexGrowTablet,
      flexShrinkTablet,
      flexBasisTablet,
      flexBasisUnit,
      minHeightTablet,
      minHeightUnitTablet,
      paddingTopTablet,
      paddingRightTablet,
      paddingBottomTablet,
      paddingLeftTablet,
      paddingUnit,
      marginTopTablet,
      marginRightTablet,
      marginBottomTablet,
      marginLeftTablet,
      marginUnit,
      borderSizeTopTablet,
      borderSizeRightTablet,
      borderSizeBottomTablet,
      borderSizeLeftTablet,
      borderRadiusTopRightTablet,
      borderRadiusBottomRightTablet,
      borderRadiusBottomLeftTablet,
      borderRadiusTopLeftTablet,
      borderRadiusUnit,
      verticalAlignmentTablet,
      alignmentTablet,
      fontSizeTablet,
      fontSizeUnit,
      orderTablet,
      shapeDividers,
      bgImage,
      bgOptions
    } = attributes;
    let cssObj = [];
    cssObj['.gb-container-' + uniqueId] = [{
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftTablet, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightTablet, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightTablet, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftTablet, borderRadiusUnit),
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginTopTablet, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginRightTablet, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginBottomTablet, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(marginLeftTablet, marginUnit),
      'text-align': alignmentTablet,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(fontSizeTablet, fontSizeUnit),
      'min-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(minHeightTablet, minHeightUnitTablet)
    }];

    if (borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet) {
      cssObj['.gb-container-' + uniqueId].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeTopTablet, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeRightTablet, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeBottomTablet, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderSizeLeftTablet, 'px'),
        'border-style': 'solid'
      });
    }

    if (minHeightTablet && !isGrid) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'row',
        'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null
      });
    }

    if (isGrid && 'inherit' !== verticalAlignmentTablet) {
      cssObj['.gb-container-' + uniqueId].push({
        'display': 'flex',
        // eslint-disable-line quote-props
        'flex-direction': 'column',
        'height': '100%',
        // eslint-disable-line quote-props
        'justify-content': verticalAlignmentTablet
      });
    }

    cssObj['.gb-container-' + uniqueId + ' > .gb-inside-container'] = [{
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingTopTablet, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingRightTablet, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingBottomTablet, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(paddingLeftTablet, paddingUnit),
      'width': minHeightTablet && !isGrid ? '100%' : false // eslint-disable-line quote-props

    }];
    cssObj['.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId] = [{
      width: !autoWidthTablet ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(widthTablet, '%') : 'auto',
      'flex-grow': flexGrowTablet,
      'flex-shrink': flexShrinkTablet,
      'flex-basis': isNaN(flexBasisTablet) ? flexBasisTablet : Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(flexBasisTablet, flexBasisUnit),
      order: orderTablet
    }];

    if (!!bgImage && 'pseudo-element' === bgOptions.selector) {
      cssObj['.gb-container-' + uniqueId + ':before'] = [{
        'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopLeftTablet, borderRadiusUnit),
        'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusTopRightTablet, borderRadiusUnit),
        'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomRightTablet, borderRadiusUnit),
        'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(borderRadiusBottomLeftTablet, borderRadiusUnit)
      }];
    }

    if (shapeDividers.length) {
      shapeDividers.forEach((location, index) => {
        const shapeNumber = index + 1;
        cssObj['.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg'] = [{
          height: Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(shapeDividers[index].heightTablet, 'px'),
          width: Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(shapeDividers[index].widthTablet, '%')
        }];
      });
    }

    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.tabletCSS', cssObj, this.props, 'container');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}
/* eslint-enable quotes */

/***/ }),

/***/ "./src/blocks/container/deprecated.js":
/*!********************************************!*\
  !*** ./src/blocks/container/deprecated.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attributes */ "./src/blocks/container/attributes.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);


/**
 * External dependencies
 */





const deprecated = [// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
{
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_3__["default"],
  supports: {
    align: false,
    anchor: false,
    className: false,
    customClassName: false
  },

  migrate(attributes) {
    const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
    const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;
    return { ...attributes,
      className: oldClasses,
      anchor: oldAnchor,
      cssClasses: '',
      elementId: ''
    };
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      tagName,
      elementId,
      cssClasses,
      isGrid,
      align
    } = attributes;

    const ConditionalWrap = ({
      condition,
      wrap,
      children
    }) => condition ? wrap(children) : children;

    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'gb-container': true,
        [`gb-container-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses,
        [`align${align}`]: !!align && !isGrid
      }),
      id: elementId ? elementId : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/container', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ConditionalWrap, {
      condition: isGrid,
      wrap: children => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
          'gb-grid-column': true,
          [`gb-grid-column-${uniqueId}`]: true
        })
      }, children)
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_2__["default"], {
      tagName: tagName,
      htmlAttrs: htmlAttributes
    }, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.insideContainer', '', attributes), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'gb-inside-container': true
      })
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["InnerBlocks"].Content, null))));
  }

}];
/* harmony default export */ __webpack_exports__["default"] = (deprecated);

/***/ }),

/***/ "./src/blocks/container/edit.js":
/*!**************************************!*\
  !*** ./src/blocks/container/edit.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _components_color_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/color-picker */ "./src/components/color-picker/index.js");
/* harmony import */ var _components_unit_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_dimensions___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/dimensions/ */ "./src/components/dimensions/index.js");
/* harmony import */ var _components_panel_area___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/panel-area/ */ "./src/components/panel-area/index.js");
/* harmony import */ var _components_typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/typography */ "./src/components/typography/index.js");
/* harmony import */ var _components_gradient___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/gradient/ */ "./src/components/gradient/index.js");
/* harmony import */ var _utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/sanitize-svg */ "./src/utils/sanitize-svg/index.js");
/* harmony import */ var _components_responsive_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/responsive-tabs */ "./src/components/responsive-tabs/index.js");
/* harmony import */ var _css_main_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./css/main.js */ "./src/blocks/container/css/main.js");
/* harmony import */ var _css_desktop_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./css/desktop.js */ "./src/blocks/container/css/desktop.js");
/* harmony import */ var _css_tablet_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./css/tablet.js */ "./src/blocks/container/css/tablet.js");
/* harmony import */ var _css_tablet_only_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./css/tablet-only.js */ "./src/blocks/container/css/tablet-only.js");
/* harmony import */ var _css_mobile_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./css/mobile.js */ "./src/blocks/container/css/mobile.js");
/* harmony import */ var _utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/get-all-unique-ids */ "./src/utils/get-all-unique-ids/index.js");
/* harmony import */ var _utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utils/get-responsive-placeholder */ "./src/utils/get-responsive-placeholder/index.js");
/* harmony import */ var _utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/has-numeric-value */ "./src/utils/has-numeric-value/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_26__);



/**
 * Block: Container
 */


























/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */

const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockContainer extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      selectedDevice: 'Desktop'
    };
    this.getDeviceType = this.getDeviceType.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    // Generate a unique ID if none exists or if the same ID exists on this page.
    const allBlocks = wp.data.select('core/block-editor').getBlocks();
    const uniqueIds = Object(_utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_18__["default"])(allBlocks, [], this.props.clientId);

    if (!this.props.attributes.uniqueId || uniqueIds.includes(this.props.attributes.uniqueId)) {
      this.props.setAttributes({
        uniqueId: this.props.clientId.substr(2, 9).replace('-', '')
      });
    }

    const thisBlock = document.getElementById('block-' + this.props.clientId);

    if (thisBlock && 'full' === this.props.attributes.align) {
      thisBlock.setAttribute('data-align', 'full');
    } // This block used to be static. Set it to dynamic by default from now on.


    if ('undefined' === typeof this.props.attributes.isDynamic || !this.props.attributes.isDynamic) {
      this.props.setAttributes({
        isDynamic: true
      });
    } // Set our inner z-index if we're using a gradient overlay or pseudo background.
    // @since 1.4.0.


    if ('undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < 2) {
      let updateOldZindex = this.props.attributes.gradient && 'pseudo-element' === this.props.attributes.gradientSelector && !Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_20__["default"])(this.props.attributes.innerZindex);

      if (!updateOldZindex) {
        updateOldZindex = !!this.props.attributes.bgImage && 'undefined' !== typeof this.props.attributes.bgOptions.selector && 'pseudo-element' === this.props.attributes.bgOptions.selector;
      }

      if (updateOldZindex) {
        this.props.setAttributes({
          innerZindex: 1
        });
      }
    } // Update block version flag if it's out of date.


    const blockVersion = 2;

    if ('undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < blockVersion) {
      this.props.setAttributes({
        blockVersion
      });
    }
  }

  componentDidUpdate() {
    const thisBlock = document.getElementById('block-' + this.props.clientId);

    if (thisBlock) {
      const alignValue = this.props.attributes.align;
      let currentDataAlign = '';

      if (thisBlock.getAttribute('data-align')) {
        currentDataAlign = thisBlock.getAttribute('data-align');
      }

      if (alignValue !== currentDataAlign) {
        if (('' === alignValue || undefined === alignValue) && '' !== currentDataAlign) {
          thisBlock.removeAttribute('data-align');
        } else {
          thisBlock.setAttribute('data-align', alignValue);
        }
      }
    }
  }

  getDeviceType() {
    let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

    if (!generateBlocksInfo.syncResponsivePreviews) {
      deviceType = this.state.selectedDevice;
    }

    return deviceType;
  }

  setDeviceType(deviceType) {
    if (generateBlocksInfo.syncResponsivePreviews && this.props.deviceType) {
      this.props.setDeviceType(deviceType);
      this.setState({
        selectedDevice: deviceType
      });
    } else {
      this.setState({
        selectedDevice: deviceType
      });
    }
  }

  render() {
    const {
      attributes,
      setAttributes,
      hasChildBlocks,
      clientId
    } = this.props;
    const {
      uniqueId,
      className,
      anchor,
      tagName,
      isGrid,
      width,
      widthTablet,
      widthMobile,
      autoWidth,
      autoWidthTablet,
      autoWidthMobile,
      flexGrow,
      flexGrowTablet,
      flexGrowMobile,
      flexShrink,
      flexShrinkTablet,
      flexShrinkMobile,
      flexBasis,
      flexBasisTablet,
      flexBasisMobile,
      flexBasisUnit,
      outerContainer,
      innerContainer,
      containerWidth,
      minHeight,
      minHeightUnit,
      minHeightTablet,
      minHeightUnitTablet,
      minHeightMobile,
      minHeightUnitMobile,
      borderColor,
      borderColorOpacity,
      backgroundColor,
      backgroundColorOpacity,
      textColor,
      linkColor,
      linkColorHover,
      bgImage,
      bgOptions,
      bgImageSize,
      verticalAlignment,
      verticalAlignmentTablet,
      verticalAlignmentMobile,
      zindex,
      innerZindex,
      removeVerticalGap,
      removeVerticalGapTablet,
      removeVerticalGapMobile,
      orderTablet,
      orderMobile,
      alignment,
      alignmentTablet,
      alignmentMobile,
      fontFamily,
      googleFont,
      googleFontVariants,
      align,
      shapeDividers
    } = attributes; // Attribute defaults added to an object late don't get defaults.

    if ('undefined' === typeof attributes.bgOptions.selector) {
      attributes.bgOptions.selector = 'element';
    }

    if ('undefined' === typeof attributes.bgOptions.opacity) {
      attributes.bgOptions.opacity = 1;
    }

    const tagNames = [{
      label: 'div',
      value: 'div'
    }, {
      label: 'section',
      value: 'section'
    }, {
      label: 'header',
      value: 'header'
    }, {
      label: 'footer',
      value: 'footer'
    }, {
      label: 'aside',
      value: 'aside'
    }];
    let googleFontsAttr = '';

    if (googleFontVariants) {
      googleFontsAttr = ':' + googleFontVariants;
    }

    let parentBlockId = false,
        parentBlock = false,
        hasGridContainer = false,
        gridContainerId = '';

    if (typeof wp.data.select('core/block-editor').getBlockParents === 'function') {
      parentBlockId = wp.data.select('core/block-editor').getBlockParents(clientId, true)[0];

      if (parentBlockId) {
        parentBlock = wp.data.select('core/block-editor').getBlocksByClientId(parentBlockId);

        if (parentBlock && 'generateblocks/grid' === parentBlock[0].name) {
          hasGridContainer = true;
          gridContainerId = parentBlock[0].attributes.uniqueId;
        }
      }
    }

    const handleAddShape = () => {
      const shapeDividersValues = [...shapeDividers];
      shapeDividersValues.push({
        shape: generateBlocksStyling.container.shapeDividers.shape,
        color: generateBlocksStyling.container.shapeDividers.color,
        colorOpacity: generateBlocksStyling.container.shapeDividers.colorOpacity,
        location: generateBlocksStyling.container.shapeDividers.location,
        height: generateBlocksStyling.container.shapeDividers.height,
        heightTablet: generateBlocksStyling.container.shapeDividers.heightTablet,
        heightMobile: generateBlocksStyling.container.shapeDividers.heightMobile,
        width: generateBlocksStyling.container.shapeDividers.width,
        widthTablet: generateBlocksStyling.container.shapeDividers.widthTablet,
        widthMobile: generateBlocksStyling.container.shapeDividers.widthMobile,
        flipHorizontally: generateBlocksStyling.container.shapeDividers.flipHorizontally,
        zindex: generateBlocksStyling.container.shapeDividers.zindex
      });
      setAttributes({
        shapeDividers: shapeDividersValues
      });
    };

    const handleRemoveShape = index => {
      const shapeDividersValues = [...shapeDividers];
      shapeDividersValues.splice(index, 1);
      setAttributes({
        shapeDividers: shapeDividersValues
      });
    };

    const allShapes = [];
    Object.keys(generateBlocksInfo.svgShapes).forEach(key => {
      const shapes = generateBlocksInfo.svgShapes[key].svgs;
      Object.keys(shapes).forEach(name => {
        allShapes[name] = {
          label: shapes[name].label,
          icon: shapes[name].icon
        };
      });
    });

    const allShapeDividers = () => {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !!attributes.shapeDividers.length && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: "gb-shapes"
      }, attributes.shapeDividers.map((location, index) => {
        const shapeNumber = index + 1;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
          key: index
        }, 'undefined' !== typeof allShapes[shapeDividers[index].shape] && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
          className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
            'gb-shape': true,
            [`gb-shape-${shapeNumber}`]: true
          }),
          dangerouslySetInnerHTML: {
            __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_11__["default"])(allShapes[shapeDividers[index].shape].icon)
          }
        }));
      })));
    };

    const bgImageSizes = [];
    Object.keys(generateBlocksInfo.imageSizes).forEach(size => {
      bgImageSizes.push({
        label: generateBlocksInfo.imageSizes[size],
        value: generateBlocksInfo.imageSizes[size]
      });
    });
    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
        'gb-container': true,
        [`gb-container-${uniqueId}`]: true,
        [`${className}`]: undefined !== className
      }),
      id: anchor ? anchor : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/container', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["BlockControls"], null, 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["AlignmentToolbar"], {
      value: alignment,
      onChange: value => {
        setAttributes({
          alignment: value
        });
      }
    }), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["AlignmentToolbar"], {
      value: alignmentTablet,
      onChange: value => {
        setAttributes({
          alignmentTablet: value
        });
      }
    }), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["AlignmentToolbar"], {
      value: alignmentMobile,
      onChange: value => {
        setAttributes({
          alignmentMobile: value
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_responsive_tabs__WEBPACK_IMPORTED_MODULE_12__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      selectedDevice: this.getDeviceType(),
      onClick: device => {
        this.setDeviceType(device);
      }
    })), !isGrid && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Layout', 'generateblocks'),
      initialOpen: true,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('layout'),
      className: 'gblocks-panel-label',
      id: 'containerLayout',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, hasGridContainer && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Grid Item', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('This Container is inside a Grid Block but is not set as a grid item. Enable this option for optimal results.', 'generateblocks'),
      checked: !!isGrid,
      onChange: value => {
        setAttributes({
          isGrid: value,
          gridId: gridContainerId
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Container', 'generateblocks'),
      value: outerContainer,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Full width', 'generateblocks'),
        value: 'full'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Contained width', 'generateblocks'),
        value: 'contained'
      }],
      onChange: value => {
        setAttributes({
          outerContainer: value
        });

        if ('contained' === value && 'full' === align) {
          setAttributes({
            align: ''
          });
        }
      }
    }), 'full' === outerContainer && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inner Container', 'generateblocks'),
      value: innerContainer,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Full width', 'generateblocks'),
        value: 'full'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Contained width', 'generateblocks'),
        value: 'contained'
      }],
      onChange: value => {
        setAttributes({
          innerContainer: value
        });
      }
    }), ('contained' === outerContainer || 'contained' === innerContainer) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Container Width', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      className: "gblocks-container-width",
      value: parseFloat(containerWidth) || '',
      placeholder: generateBlocksDefaults.container.containerWidth,
      onChange: value => {
        setAttributes({
          containerWidth: '' !== value ? parseFloat(value) : undefined
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Tag Name', 'generateblocks'),
      value: tagName,
      options: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.containerTagNames', tagNames, this.props, this.state),
      onChange: value => {
        setAttributes({
          tagName: value
        });
      }
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerAfterElementTag', this.props, this.state)), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerLayout', this.props, this.state)), isGrid && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Layout', 'generateblocks'),
      initialOpen: true,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('layout'),
      className: 'gblocks-panel-label',
      id: 'containerGridLayout',
      state: this.state
    }), !hasGridContainer && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Grid Item', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('This container is set as a grid item but is not inside a grid block. Deactivate this option for optimal results.', 'generateblocks'),
      checked: !!isGrid,
      onChange: value => {
        setAttributes({
          isGrid: value,
          gridId: ''
        });
      }
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Container Width', 'generateblocks'),
      value: '%',
      units: ['%'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ButtonGroup"], {
      className: 'widthButtons'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: !!autoWidth,
      onClick: () => {
        if (autoWidth) {
          setAttributes({
            autoWidth: false
          });
        } else {
          setAttributes({
            autoWidth: true
          });
        }
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Auto', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 25 && !autoWidth,
      onClick: () => setAttributes({
        width: 25,
        autoWidth: false
      })
    }, "25"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 33.33 && !autoWidth,
      onClick: () => setAttributes({
        width: 33.33,
        autoWidth: false
      })
    }, "33"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 50 && !autoWidth,
      onClick: () => setAttributes({
        width: 50,
        autoWidth: false
      })
    }, "50"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 66.66 && !autoWidth,
      onClick: () => setAttributes({
        width: 66.66,
        autoWidth: false
      })
    }, "66"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 75 && !autoWidth,
      onClick: () => setAttributes({
        width: 75,
        autoWidth: false
      })
    }, "75"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: width === 100 && !autoWidth,
      onClick: () => setAttributes({
        width: 100,
        autoWidth: false
      })
    }, "100"))), !autoWidth && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["RangeControl"], {
      className: 'gblocks-column-width-control',
      value: width || '',
      onChange: value => {
        setAttributes({
          width: value,
          autoWidth: false
        });
      },
      min: 0,
      max: 100,
      step: 0.01,
      initialPosition: generateBlocksDefaults.container.width
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
      className: "gblocks-flex-controls",
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Flex', 'generateblocks'),
      id: "gblocks-flex-grow-desktop"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-controls-inner"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Grow', 'generateblocks'),
      id: "gblocks-flex-grow-desktop",
      type: 'number',
      value: flexGrow,
      min: "0",
      step: "1",
      placeholder: "0",
      onChange: value => {
        setAttributes({
          flexGrow: value
        });
      },
      onBlur: () => {
        if ('' !== flexGrow) {
          setAttributes({
            flexGrow: parseFloat(flexGrow)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Shrink', 'generateblocks'),
      type: 'number',
      value: flexShrink,
      min: "0",
      step: "1",
      placeholder: "1",
      onChange: value => {
        setAttributes({
          flexShrink: value
        });
      },
      onBlur: () => {
        if ('' !== flexShrink) {
          setAttributes({
            flexShrink: parseFloat(flexShrink)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-basis-wrapper"
    }, !isNaN(flexBasis) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      value: flexBasisUnit,
      units: ['px', '%'],
      onClick: value => {
        setAttributes({
          flexBasisUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Basis', 'generateblocks'),
      type: 'text',
      placeholder: "auto",
      value: flexBasis,
      onChange: value => {
        setAttributes({
          flexBasis: value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks'),
      value: verticalAlignment,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignment: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Remove Vertical Gap', 'generateblocks'),
      checked: !!removeVerticalGap,
      onChange: value => {
        setAttributes({
          removeVerticalGap: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Tag Name', 'generateblocks'),
      value: tagName,
      options: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.containerTagNames', tagNames, this.props, this.state),
      onChange: value => {
        setAttributes({
          tagName: value
        });
      }
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerAfterElementTag', this.props, this.state)), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Container Width', 'generateblocks'),
      value: '%',
      units: ['%'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ButtonGroup"], {
      className: 'widthButtons'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: !!autoWidthTablet,
      onClick: () => {
        if (autoWidthTablet) {
          setAttributes({
            autoWidthTablet: false
          });
        } else {
          setAttributes({
            autoWidthTablet: true
          });
        }
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Auto', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 25 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 25,
        autoWidthTablet: false
      })
    }, "25"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 33.33 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 33.33,
        autoWidthTablet: false
      })
    }, "33"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 50 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 50,
        autoWidthTablet: false
      })
    }, "50"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 66.66 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 66.66,
        autoWidthTablet: false
      })
    }, "66"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 75 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 75,
        autoWidthTablet: false
      })
    }, "75"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthTablet === 100 && !autoWidthTablet,
      onClick: () => setAttributes({
        widthTablet: 100,
        autoWidthTablet: false
      })
    }, "100"))), !autoWidthTablet && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["RangeControl"], {
      className: 'gblocks-column-width-control',
      value: widthTablet || '',
      onChange: value => {
        setAttributes({
          widthTablet: value,
          autoWidthTablet: false
        });
      },
      min: 0,
      max: 100,
      step: 0.01,
      initialPosition: generateBlocksDefaults.container.widthTablet
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
      className: "gblocks-flex-controls",
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Flex', 'generateblocks'),
      id: "gblocks-flex-grow-tablet"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-controls-inner"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Grow', 'generateblocks'),
      id: "gblocks-flex-grow-tablet",
      type: 'number',
      value: flexGrowTablet,
      min: "0",
      step: "1",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexGrow', attributes, 'Tablet', '0'),
      onChange: value => {
        setAttributes({
          flexGrowTablet: value
        });
      },
      onBlur: () => {
        if ('' !== flexGrowTablet) {
          setAttributes({
            flexGrowTablet: parseFloat(flexGrowTablet)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Shrink', 'generateblocks'),
      type: 'number',
      value: flexShrinkTablet,
      min: "0",
      step: "1",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexShrink', attributes, 'Tablet', '1'),
      onChange: value => {
        setAttributes({
          flexShrinkTablet: value
        });
      },
      onBlur: () => {
        if ('' !== flexShrinkTablet) {
          setAttributes({
            flexShrinkTablet: parseFloat(flexShrinkTablet)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-basis-wrapper"
    }, !isNaN(flexBasisTablet) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      value: flexBasisUnit,
      units: ['px', '%'],
      onClick: value => {
        setAttributes({
          flexBasisUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Basis', 'generateblocks'),
      type: 'text',
      value: flexBasisTablet,
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexBasis', attributes, 'Tablet', 'auto'),
      onChange: value => {
        setAttributes({
          flexBasisTablet: value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks'),
      value: verticalAlignmentTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Remove Vertical Gap', 'generateblocks'),
      checked: !!removeVerticalGapTablet,
      onChange: value => {
        setAttributes({
          removeVerticalGapTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Order', 'generateblocks'),
      value: orderTablet || 0 === orderTablet ? orderTablet : '',
      onChange: value => {
        setAttributes({
          orderTablet: parseFloat(value)
        });
      }
    })), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Container Width', 'generateblocks'),
      value: '%',
      units: ['%'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ButtonGroup"], {
      className: 'widthButtons'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: !!autoWidthMobile,
      onClick: () => {
        if (autoWidthMobile) {
          setAttributes({
            autoWidthMobile: false
          });
        } else {
          setAttributes({
            autoWidthMobile: true
          });
        }
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Auto', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 25 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 25,
        autoWidthMobile: false
      })
    }, "25"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 33.33 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 33.33,
        autoWidthMobile: false
      })
    }, "33"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 50 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 50,
        autoWidthMobile: false
      })
    }, "50"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 66.66 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 66.66,
        autoWidthMobile: false
      })
    }, "66"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 75 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 75,
        autoWidthMobile: false
      })
    }, "75"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isPrimary: widthMobile === 100 && !autoWidthMobile,
      onClick: () => setAttributes({
        widthMobile: 100,
        autoWidthMobile: false
      })
    }, "100"))), !autoWidthMobile && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["RangeControl"], {
      className: 'gblocks-column-width-control',
      value: widthMobile || '',
      onChange: value => {
        setAttributes({
          widthMobile: value,
          autoWidthMobile: false
        });
      },
      min: 0,
      max: 100,
      step: 0.01,
      initialPosition: generateBlocksDefaults.container.widthMobile
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
      className: "gblocks-flex-controls",
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Flex', 'generateblocks'),
      id: "gblocks-flex-grow-mobile"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-controls-inner"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Grow', 'generateblocks'),
      id: "gblocks-flex-grow-mobile",
      type: 'number',
      value: flexGrowMobile,
      min: "0",
      step: "1",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexGrow', attributes, 'Mobile', '0'),
      onChange: value => {
        setAttributes({
          flexGrowMobile: value
        });
      },
      onBlur: () => {
        if ('' !== flexGrowMobile) {
          setAttributes({
            flexGrowMobile: parseFloat(flexGrowMobile)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Shrink', 'generateblocks'),
      type: 'number',
      value: flexShrinkMobile,
      min: "0",
      step: "1",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexShrink', attributes, 'Mobile', '1'),
      onChange: value => {
        setAttributes({
          flexShrinkMobile: value
        });
      },
      onBlur: () => {
        if ('' !== flexShrinkMobile) {
          setAttributes({
            flexShrinkMobile: parseFloat(flexShrinkMobile)
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-flex-basis-wrapper"
    }, !isNaN(flexBasisMobile) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      value: flexBasisUnit,
      units: ['px', '%'],
      onClick: value => {
        setAttributes({
          flexBasisUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Basis', 'generateblocks'),
      type: 'text',
      value: flexBasisMobile,
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_19__["default"])('flexBasis', attributes, 'Mobile', 'auto'),
      onChange: value => {
        setAttributes({
          flexBasisMobile: value
        });
      }
    })))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks'),
      value: verticalAlignmentMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Remove Vertical Gap', 'generateblocks'),
      checked: !!removeVerticalGapMobile,
      onChange: value => {
        setAttributes({
          removeVerticalGapMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Order', 'generateblocks'),
      value: orderMobile || 0 === orderMobile ? orderMobile : '',
      onChange: value => {
        setAttributes({
          orderMobile: parseFloat(value)
        });
      }
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerGridLayout', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Typography', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('typography'),
      className: 'gblocks-panel-label',
      id: 'containerTypography',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      showFontFamily: true,
      showFontWeight: true,
      showTextTransform: true,
      showFontSize: true,
      defaultFontSize: generateBlocksDefaults.container.fontSize,
      defaultFontSizeUnit: generateBlocksDefaults.container.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.container.lineHeight,
      defaultLineHeightUnit: generateBlocksDefaults.container.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.container.letterSpacing
    }))), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Tablet',
      showFontSize: true,
      disableAdvancedToggle: true,
      defaultFontSize: generateBlocksDefaults.container.fontSizeTablet,
      defaultFontSizeUnit: generateBlocksDefaults.container.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.container.lineHeightTablet,
      defaultLineHeightUnit: generateBlocksDefaults.container.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.container.letterSpacingTablet
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_9__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Mobile',
      showFontSize: true,
      disableAdvancedToggle: true,
      defaultFontSize: generateBlocksDefaults.container.fontSizeMobile,
      defaultFontSizeUnit: generateBlocksDefaults.container.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.container.lineHeightMobile,
      defaultLineHeightUnit: generateBlocksDefaults.container.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.container.letterSpacingMobile
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerTypography', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Spacing', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('spacing'),
      className: 'gblocks-panel-label',
      id: 'containerSpacing',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Minimum Height', 'generateblocks'),
      value: minHeightUnit,
      units: ['px', 'vh', 'vw'],
      onClick: value => {
        setAttributes({
          minHeightUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      value: minHeight ? minHeight : '',
      onChange: value => {
        setAttributes({
          minHeight: parseFloat(value)
        });
      }
    }), !!minHeight && !isGrid && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      value: verticalAlignment,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignment: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTop',
      attrRight: 'paddingRight',
      attrBottom: 'paddingBottom',
      attrLeft: 'paddingLeft',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTop',
      attrRight: 'marginRight',
      attrBottom: 'marginBottom',
      attrLeft: 'marginLeft',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTop',
      attrRight: 'borderSizeRight',
      attrBottom: 'borderSizeBottom',
      attrLeft: 'borderSizeLeft',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeft',
      attrRight: 'borderRadiusTopRight',
      attrBottom: 'borderRadiusBottomRight',
      attrLeft: 'borderRadiusBottomLeft',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Outer z-index', 'generateblocks'),
      type: 'number',
      value: zindex || 0 === zindex ? zindex : '',
      onChange: value => {
        setAttributes({
          zindex: value
        });
      },
      onBlur: () => {
        setAttributes({
          zindex: parseFloat(zindex)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inner z-index', 'generateblocks'),
      type: 'number',
      value: innerZindex || 0 === innerZindex ? innerZindex : '',
      onChange: value => {
        setAttributes({
          innerZindex: value
        });
      },
      onBlur: () => {
        setAttributes({
          innerZindex: parseFloat(innerZindex)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    })), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Minimum Height', 'generateblocks'),
      value: minHeightUnitTablet,
      units: ['px', 'vh', 'vw'],
      onClick: value => {
        setAttributes({
          minHeightUnitTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      value: minHeightTablet ? minHeightTablet : '',
      onChange: value => {
        setAttributes({
          minHeightTablet: parseFloat(value)
        });
      }
    }), (!!minHeight || !!minHeightTablet) && !isGrid && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      value: verticalAlignmentTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopTablet',
      attrRight: 'paddingRightTablet',
      attrBottom: 'paddingBottomTablet',
      attrLeft: 'paddingLeftTablet',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopTablet',
      attrRight: 'marginRightTablet',
      attrBottom: 'marginBottomTablet',
      attrLeft: 'marginLeftTablet',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopTablet',
      attrRight: 'borderSizeRightTablet',
      attrBottom: 'borderSizeBottomTablet',
      attrLeft: 'borderSizeLeftTablet',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftTablet',
      attrRight: 'borderRadiusTopRightTablet',
      attrBottom: 'borderRadiusBottomRightTablet',
      attrLeft: 'borderRadiusBottomLeftTablet',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Minimum Height', 'generateblocks'),
      value: minHeightUnitMobile,
      units: ['px', 'vh', 'vw'],
      onClick: value => {
        setAttributes({
          minHeightUnitMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'number',
      value: minHeightMobile ? minHeightMobile : '',
      onChange: value => {
        setAttributes({
          minHeightMobile: parseFloat(value)
        });
      }
    }), (!!minHeight || !!minHeightTablet || !!minHeightMobile) && !isGrid && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Vertical Alignment', 'generateblocks'),
      value: verticalAlignmentMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopMobile',
      attrRight: 'paddingRightMobile',
      attrBottom: 'paddingBottomMobile',
      attrLeft: 'paddingLeftMobile',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopMobile',
      attrRight: 'marginRightMobile',
      attrBottom: 'marginBottomMobile',
      attrLeft: 'marginLeftMobile',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopMobile',
      attrRight: 'borderSizeRightMobile',
      attrBottom: 'borderSizeBottomMobile',
      attrLeft: 'borderSizeLeftMobile',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.container,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftMobile',
      attrRight: 'borderRadiusTopRightMobile',
      attrBottom: 'borderRadiusBottomRightMobile',
      attrLeft: 'borderRadiusBottomLeftMobile',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.container,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerSpacing', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Colors', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('colors'),
      className: 'gblocks-panel-label',
      id: 'containerColors',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Background Color', 'generateblocks'),
      value: backgroundColor,
      alpha: true,
      valueOpacity: backgroundColorOpacity,
      attrOpacity: 'backgroundColorOpacity',
      onChange: nextBackgroundColor => setAttributes({
        backgroundColor: nextBackgroundColor
      }),
      onOpacityChange: value => setAttributes({
        backgroundColorOpacity: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Text Color', 'generateblocks'),
      value: textColor,
      alpha: false,
      onChange: nextTextColor => setAttributes({
        textColor: nextTextColor
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Link Color', 'generateblocks'),
      value: linkColor,
      alpha: false,
      onChange: nextLinkColor => setAttributes({
        linkColor: nextLinkColor
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Link Color Hover', 'generateblocks'),
      value: linkColorHover,
      alpha: false,
      onChange: nextLinkColorHover => setAttributes({
        linkColorHover: nextLinkColorHover
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Border Color', 'generateblocks'),
      value: borderColor,
      alpha: true,
      valueOpacity: borderColorOpacity,
      attrOpacity: 'borderColorOpacity',
      onChange: value => setAttributes({
        borderColor: value
      }),
      onOpacityChange: value => setAttributes({
        borderColorOpacity: value
      })
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerColors', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Backgrounds', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('gradients'),
      className: 'gblocks-panel-label',
      id: 'containerBackground',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
      id: "gblocks-background-image-upload",
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Image URL', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-bg-image-wrapper"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      type: 'text',
      value: !!bgImage ? bgImage.image.url : '',
      onChange: value => {
        if (!value) {
          setAttributes({
            bgImage: null
          });
        } else {
          setAttributes({
            bgImage: {
              id: '',
              image: {
                url: value
              }
            }
          });
        }
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-background-image-action-buttons"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["MediaUpload"], {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Set background image', 'generateblocks'),
      onSelect: media => {
        let size = generateBlocksDefaults.container.bgImageSize;

        if ('undefined' === typeof media.sizes[size]) {
          size = 'full';
        }

        setAttributes({
          bgImage: {
            id: media.id,
            image: media.sizes[size]
          }
        });
      },
      onClose: () => {
        document.querySelector('.gblocks-bg-image-wrapper input').focus();
      },
      allowedTypes: ['image'],
      value: !!bgImage ? bgImage.id : '',
      modalClass: "editor-gb-container-background__media-modal",
      render: ({
        open
      }) => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Tooltip"], {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Open the Media Library', 'generateblocks')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
        onClick: open,
        className: "is-secondary is-small"
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Browse', 'generateblocks')))
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.backgroundImageActions', '', this.props, this.state)))), !!bgImage && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !!bgOptions.overlay ? // This option is deprecated, so only show it if it's in use.
    Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Background Color Overlay', 'generateblocks'),
      checked: !!bgOptions.overlay,
      onChange: nextOverlay => {
        setAttributes({
          bgOptions: { ...bgOptions,
            overlay: nextOverlay
          }
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Notice"], {
      className: "gblocks-option-notice",
      status: "info",
      isDismissible: false
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('The background color overlay option is deprecated. Toggle this option to use the new method.', 'generateblocks'))) : // These options is only for people not using the deprecated overlay option.
    Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'undefined' !== typeof bgImage.id && bgImage.id && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Image Size', 'generateblocks'),
      value: bgImageSize,
      options: bgImageSizes,
      onChange: value => {
        setAttributes({
          bgImageSize: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Selector', 'generateblocks'),
      value: bgOptions.selector,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Element', 'generateblocks'),
        value: 'element'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Pseudo Element', 'generateblocks'),
        value: 'pseudo-element'
      }],
      onChange: value => {
        setAttributes({
          bgOptions: { ...bgOptions,
            selector: value
          }
        });

        if ('pseudo-element' === value && !innerZindex && 0 !== innerZindex) {
          setAttributes({
            innerZindex: 1
          });
        }
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Image Opacity', 'generateblocks'),
      value: bgOptions.opacity,
      onChange: value => {
        setAttributes({
          bgOptions: { ...bgOptions,
            opacity: value,
            selector: 'pseudo-element'
          }
        });

        if (!innerZindex && 0 !== innerZindex) {
          setAttributes({
            innerZindex: 1
          });
        }
      },
      min: 0,
      max: 1,
      step: 0.1,
      initialPosition: generateBlocksDefaults.container.bgOptions.opacity
    }), 1 !== bgOptions.opacity && 'pseudo-element' !== bgOptions.selector && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Notice"], {
      className: "gblocks-option-notice",
      status: "info",
      isDismissible: false
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Your selector must be set to Pseudo Element to use opacity.', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Size', 'generateblocks'),
      value: bgOptions.size,
      onChange: nextSize => {
        setAttributes({
          bgOptions: { ...bgOptions,
            size: nextSize
          }
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Position', 'generateblocks'),
      value: bgOptions.position,
      onChange: nextPosition => {
        setAttributes({
          bgOptions: { ...bgOptions,
            position: nextPosition
          }
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Repeat', 'generateblocks'),
      value: bgOptions.repeat,
      options: [{
        label: 'no-repeat',
        value: 'no-repeat'
      }, {
        label: 'repeat',
        value: 'repeat'
      }, {
        label: 'repeat-x',
        value: 'repeat-x'
      }, {
        label: 'repeat-y',
        value: 'repeat-y'
      }],
      onChange: nextRepeat => {
        setAttributes({
          bgOptions: { ...bgOptions,
            repeat: nextRepeat
          }
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Attachment', 'generateblocks'),
      value: bgOptions.attachment,
      options: [{
        label: 'scroll',
        value: ''
      }, {
        label: 'fixed',
        value: 'fixed'
      }, {
        label: 'local',
        value: 'local'
      }],
      onChange: nextAttachment => {
        setAttributes({
          bgOptions: { ...bgOptions,
            attachment: nextAttachment
          }
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_gradient___WEBPACK_IMPORTED_MODULE_10__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      attrGradient: 'gradient',
      attrGradientDirection: 'gradientDirection',
      attrGradientColorOne: 'gradientColorOne',
      attrGradientColorStopOne: 'gradientColorStopOne',
      attrGradientColorTwo: 'gradientColorTwo',
      attrGradientColorStopTwo: 'gradientColorStopTwo',
      attrGradientColorOneOpacity: 'gradientColorOneOpacity',
      attrGradientColorTwoOpacity: 'gradientColorTwoOpacity',
      defaultColorOne: generateBlocksDefaults.container.gradientColorOne,
      defaultColorTwo: generateBlocksDefaults.container.gradientColorTwo
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerBackground', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Shapes', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('shapes'),
      className: 'gblocks-panel-label',
      id: 'containerShapes',
      state: this.state,
      showPanel: 'Desktop' === this.getDeviceType() || attributes.shapeDividers.length ? true : false
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
      className: "gb-icon-chooser gb-shape-chooser"
    }, shapeDividers.map((location, index) => {
      const shapeNumber = index + 1;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        key: index
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: "gblocks-shape-container"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
          'gblocks-shape-toggle-preview': true,
          [`gblocks-shape-toggle-preview-${shapeNumber}`]: true
        }),
        style: {
          backgroundColor
        }
      }, 'undefined' !== typeof allShapes[shapeDividers[index].shape] && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: "gblocks-shape-divider-preview",
        style: {
          color: shapeDividers[index].color
        },
        dangerouslySetInnerHTML: {
          __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_11__["default"])(allShapes[shapeDividers[index].shape].icon)
        }
      })),
      /* translators: Shape number */
      Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Shape %s', 'generateblocks'), shapeNumber), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Dropdown"], {
        contentClassName: "gblocks-shapes-dropdown",
        renderToggle: ({
          isOpen,
          onToggle
        }) => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Tooltip"], {
          text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Edit Shape', 'generateblocks')
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
          className: "gblocks-shape-dropdown",
          isSecondary: isOpen ? undefined : true,
          isPrimary: isOpen ? true : undefined,
          icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('wrench'),
          onClick: onToggle,
          "aria-expanded": isOpen
        })),
        renderContent: () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
          className: "gblocks-shape-controls"
        }, 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], {
          className: "gb-icon-chooser"
        }, Object.keys(generateBlocksInfo.svgShapes).map((svg, i) => {
          const svgItems = generateBlocksInfo.svgShapes[svg].svgs;
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["PanelBody"], {
            title: generateBlocksInfo.svgShapes[svg].group,
            initialOpen: svgItems.hasOwnProperty(shapeDividers[index].shape),
            key: i
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("ul", {
            className: "gblocks-icon-chooser gblocks-shape-chooser"
          }, Object.keys(svgItems).map((svgItem, iconIndex) => {
            return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("li", {
              key: `editor-pblock-types-list-item-${iconIndex}`
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Tooltip"], {
              text: svgItems[svgItem].label
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
              className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
                'editor-block-list-item-button': true,
                'gblocks-shape-is-active': shapeDividers[index].shape === svgItem
              }),
              onClick: () => {
                const shapes = [...shapeDividers];
                shapes[index] = { ...shapes[index],
                  shape: svgItem
                };
                setAttributes({
                  shapeDividers: shapes
                });
              }
            }, 'string' === typeof svgItems[svgItem].icon ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
              className: "editor-block-types-list__item-icon",
              dangerouslySetInnerHTML: {
                __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_11__["default"])(svgItems[svgItem].icon)
              }
            })) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
              className: "editor-block-types-list__item-icon"
            }, svgItems[svgItem].icon)))));
          })))));
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Color', 'generateblocks'),
          value: shapeDividers[index].color,
          alpha: true,
          valueOpacity: shapeDividers[index].colorOpacity,
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              color: value
            };
            setAttributes({
              shapeDividers: shapes
            });
          },
          onOpacityChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              colorOpacity: value
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["SelectControl"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Location', 'generateblocks'),
          value: shapeDividers[index].location,
          options: [{
            label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Top', 'generateblocks'),
            value: 'top'
          }, {
            label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Bottom', 'generateblocks'),
            value: 'bottom'
          }],
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              location: value
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Height', 'generateblocks'),
          value: 'px',
          units: ['px'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].height ? shapeDividers[index].height : '',
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              height: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Width', 'generateblocks'),
          value: '%',
          units: ['%'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].width ? shapeDividers[index].width : '',
          min: "100",
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              width: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["ToggleControl"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Flip Horizontally', 'generateblocks'),
          checked: !!shapeDividers[index].flipHorizontally,
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              flipHorizontally: value
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('z-index', 'generateblocks'),
          type: 'number',
          min: "0",
          value: shapeDividers[index].zindex || 0 === shapeDividers[index].zindex ? shapeDividers[index].zindex : '',
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              zindex: value
            };
            setAttributes({
              shapeDividers: shapes
            });
          },
          onBlur: () => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              zindex: parseFloat(shapeDividers[index].zindex)
            };
            setAttributes({
              shapeDividers: shapes
            });
          },
          onClick: e => {
            // Make sure onBlur fires in Firefox.
            e.currentTarget.focus();
          }
        })), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Height', 'generateblocks'),
          value: 'px',
          units: ['px'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].heightTablet ? shapeDividers[index].heightTablet : '',
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              heightTablet: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Width', 'generateblocks'),
          value: '%',
          units: ['%'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].widthTablet ? shapeDividers[index].widthTablet : '',
          min: "100",
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              widthTablet: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        })), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Height', 'generateblocks'),
          value: 'px',
          units: ['px'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].heightMobile ? shapeDividers[index].heightMobile : '',
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              heightMobile: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Width', 'generateblocks'),
          value: '%',
          units: ['%'],
          onClick: () => {
            return false;
          }
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
          type: 'number',
          value: shapeDividers[index].widthMobile ? shapeDividers[index].widthMobile : '',
          min: "100",
          onChange: value => {
            const shapes = [...shapeDividers];
            shapes[index] = { ...shapes[index],
              widthMobile: parseFloat(value)
            };
            setAttributes({
              shapeDividers: shapes
            });
          }
        })))
      })), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Tooltip"], {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Delete Shape', 'generateblocks')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
        className: "gblocks-remove-shape",
        onClick: () => {
          // eslint-disable-next-line
          if (window.confirm(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('This will permanently delete this shape.', 'generateblocks'))) {
            handleRemoveShape(index);
          }
        },
        icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('x')
      }))));
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gblocks-add-new-shape"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["Button"], {
      isSecondary: true,
      onClick: handleAddShape.bind(this)
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Add Shape', 'generateblocks')))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerShapeDivider', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Documentation', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_5__["default"])('documentation'),
      className: 'gblocks-panel-label',
      id: 'containerDocumentation',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Need help with this block?', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      href: "https://docs.generateblocks.com/collection/container/",
      target: "_blank",
      rel: "noreferrer noopener"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Visit our documentation', 'generateblocks')), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.editor.controls', '', 'containerDocumentation', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["InspectorAdvancedControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_22__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('HTML Anchor', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_21__["__"])('Anchors lets you link directly to a section on a page.', 'generateblocks'),
      value: anchor || '',
      onChange: nextValue => {
        nextValue = nextValue.replace(ANCHOR_REGEX, '-');
        setAttributes({
          anchor: nextValue
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_main_js__WEBPACK_IMPORTED_MODULE_13__["default"], this.props), this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'Desktop' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_desktop_js__WEBPACK_IMPORTED_MODULE_14__["default"], this.props), ('Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_js__WEBPACK_IMPORTED_MODULE_15__["default"], this.props), 'Tablet' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_only_js__WEBPACK_IMPORTED_MODULE_16__["default"], this.props), 'Mobile' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_mobile_js__WEBPACK_IMPORTED_MODULE_17__["default"], this.props)), fontFamily && googleFont && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("link", {
      rel: "stylesheet",
      href: 'https://fonts.googleapis.com/css?family=' + fontFamily.replace(/ /g, '+') + googleFontsAttr
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_2__["default"], {
      tagName: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.containerTagName', tagName, attributes),
      htmlAttrs: htmlAttributes
    }, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.afterContainerOpen', '', attributes), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
        'gb-inside-container': true
      })
    }, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.insideContainer', '', attributes), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["InnerBlocks"], {
      templateLock: false,
      renderAppender: hasChildBlocks ? undefined : () => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_23__["InnerBlocks"].ButtonBlockAppender, null)
    })), allShapeDividers(), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_24__["applyFilters"])('generateblocks.frontend.beforeContainerClose', '', attributes)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_26__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__["withDispatch"])(dispatch => ({
  setDeviceType(type) {
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = dispatch('core/edit-post');

    if (!setPreviewDeviceType) {
      return;
    }

    setPreviewDeviceType(type);
  }

})), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_25__["withSelect"])(select => {
  const {
    __experimentalGetPreviewDeviceType: getPreviewDeviceType
  } = select('core/edit-post');
  const {
    getMedia
  } = select('core');
  const {
    getEditedPostAttribute
  } = select('core/editor');
  const featuredImageId = getEditedPostAttribute('featured_media');

  if (!getPreviewDeviceType) {
    return {
      media: featuredImageId ? getMedia(featuredImageId) : null,
      deviceType: null
    };
  }

  return {
    media: featuredImageId ? getMedia(featuredImageId) : null,
    deviceType: getPreviewDeviceType()
  };
})])(GenerateBlockContainer));

/***/ }),

/***/ "./src/blocks/container/editor.scss":
/*!******************************************!*\
  !*** ./src/blocks/container/editor.scss ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/grid/attributes.js":
/*!***************************************!*\
  !*** ./src/blocks/grid/attributes.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* harmony default export */ __webpack_exports__["default"] = ({
  uniqueId: {
    type: 'string',
    default: ''
  },
  anchor: {
    type: 'string',
    default: ''
  },
  columns: {
    type: 'number',
    default: ''
  },
  horizontalGap: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalGap
  },
  verticalGap: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalGap
  },
  verticalAlignment: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalAlignment
  },
  horizontalGapTablet: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalGapTablet
  },
  verticalGapTablet: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalGapTablet
  },
  verticalAlignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalAlignmentTablet
  },
  horizontalGapMobile: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalGapMobile
  },
  verticalGapMobile: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalGapMobile
  },
  verticalAlignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.verticalAlignmentMobile
  },
  horizontalAlignment: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalAlignment
  },
  horizontalAlignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalAlignmentTablet
  },
  horizontalAlignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.gridContainer.horizontalAlignmentMobile
  },
  isDynamic: {
    type: 'boolean'
  },
  // deprecated since 1.2.0
  elementId: {
    type: 'string',
    default: ''
  },
  cssClasses: {
    type: 'string',
    default: ''
  }
});
/* eslint-enable no-undef */

/***/ }),

/***/ "./src/blocks/grid/block.js":
/*!**********************************!*\
  !*** ./src/blocks/grid/block.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/grid/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/grid/edit.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attributes */ "./src/blocks/grid/attributes.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deprecated */ "./src/blocks/grid/deprecated.js");
/* harmony import */ var _migrate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./migrate */ "./src/blocks/grid/migrate.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__);


/**
 * Block: Grid
 */









/**
 * Register our Grid block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__["registerBlockType"])('generateblocks/grid', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Grid', 'generateblocks'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Create advanced layouts with flexible grids.', 'generateblocks'),
  icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_4__["default"])('grid'),
  category: 'generateblocks',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('grid'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('column'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('generate')],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_3__["default"],
  supports: {
    className: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: () => {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_9__["InnerBlocks"].Content, null);
  },
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./src/blocks/grid/css/desktop.js":
/*!****************************************!*\
  !*** ./src/blocks/grid/css/desktop.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DesktopCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);




class DesktopCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.desktopCSS', cssObj, this.props, 'grid');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/grid/css/main.js":
/*!*************************************!*\
  !*** ./src/blocks/grid/css/main.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





class MainCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      horizontalGap,
      verticalGap,
      verticalAlignment,
      horizontalAlignment
    } = attributes;
    let cssObj = [];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'align-items': verticalAlignment,
      'justify-content': horizontalAlignment,
      'margin-left': '-' + horizontalGap / 2 + 'px',
      'margin-right': '-' + horizontalGap / 2 + 'px'
    }];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
      'padding-left': horizontalGap / 2 + 'px',
      'padding-right': horizontalGap / 2 + 'px',
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(verticalGap, 'px')
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.mainCSS', cssObj, this.props, 'grid');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/grid/css/mobile.js":
/*!***************************************!*\
  !*** ./src/blocks/grid/css/mobile.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MobileCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





class MobileCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      horizontalGapMobile,
      verticalGapMobile,
      verticalAlignmentMobile,
      horizontalAlignmentMobile
    } = attributes;
    let cssObj = [];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'align-items': 'inherit' !== verticalAlignmentMobile ? verticalAlignmentMobile : null,
      'justify-content': 'inherit' !== horizontalAlignmentMobile ? horizontalAlignmentMobile : null,
      'margin-left': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + horizontalGapMobile / 2 + 'px' : null,
      'margin-right': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + horizontalGapMobile / 2 + 'px' : null
    }];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
      'padding-left': horizontalGapMobile || 0 === horizontalGapMobile ? horizontalGapMobile / 2 + 'px' : null,
      'padding-right': horizontalGapMobile || 0 === horizontalGapMobile ? horizontalGapMobile / 2 + 'px' : null,
      'margin-bottom': verticalGapMobile || 0 === verticalGapMobile ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(verticalGapMobile, 'px') : null
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.mobileCSS', cssObj, this.props, 'grid');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/grid/css/tablet-only.js":
/*!********************************************!*\
  !*** ./src/blocks/grid/css/tablet-only.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletOnlyCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);




class TabletOnlyCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'grid');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/grid/css/tablet.js":
/*!***************************************!*\
  !*** ./src/blocks/grid/css/tablet.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





class TabletCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      uniqueId,
      horizontalGapTablet,
      verticalGapTablet,
      verticalAlignmentTablet,
      horizontalAlignmentTablet
    } = attributes;
    let cssObj = [];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout'] = [{
      'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
      'justify-content': 'inherit' !== horizontalAlignmentTablet ? horizontalAlignmentTablet : null,
      'margin-left': horizontalGapTablet || 0 === horizontalGapTablet ? '-' + horizontalGapTablet / 2 + 'px' : null,
      'margin-right': horizontalGapTablet || 0 === horizontalGapTablet ? '-' + horizontalGapTablet / 2 + 'px' : null
    }];
    cssObj['.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block'] = [{
      'padding-left': horizontalGapTablet || 0 === horizontalGapTablet ? horizontalGapTablet / 2 + 'px' : null,
      'padding-right': horizontalGapTablet || 0 === horizontalGapTablet ? horizontalGapTablet / 2 + 'px' : null,
      'margin-bottom': verticalGapTablet || 0 === verticalGapTablet ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_2__["default"])(verticalGapTablet, 'px') : null
    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.tabletCSS', cssObj, this.props, 'grid');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/grid/deprecated.js":
/*!***************************************!*\
  !*** ./src/blocks/grid/deprecated.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/blocks/grid/attributes.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);


/**
 * External dependencies
 */




const deprecated = [// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
{
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_2__["default"],
  supports: {
    anchor: false,
    className: false,
    customClassName: false
  },

  migrate(attributes) {
    const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
    const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;
    return { ...attributes,
      className: oldClasses,
      anchor: oldAnchor,
      cssClasses: '',
      elementId: ''
    };
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      elementId,
      cssClasses
    } = attributes;
    let htmlAttributes = {
      id: !!elementId ? elementId : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'gb-grid-wrapper': true,
        [`gb-grid-wrapper-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses
      })
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", htmlAttributes, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["InnerBlocks"].Content, null));
  }

}];
/* harmony default export */ __webpack_exports__["default"] = (deprecated);

/***/ }),

/***/ "./src/blocks/grid/edit.js":
/*!*********************************!*\
  !*** ./src/blocks/grid/edit.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _components_responsive_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/responsive-tabs */ "./src/components/responsive-tabs/index.js");
/* harmony import */ var _components_unit_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _css_main_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/main.js */ "./src/blocks/grid/css/main.js");
/* harmony import */ var _css_desktop_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/desktop.js */ "./src/blocks/grid/css/desktop.js");
/* harmony import */ var _css_tablet_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/tablet.js */ "./src/blocks/grid/css/tablet.js");
/* harmony import */ var _css_tablet_only_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/tablet-only.js */ "./src/blocks/grid/css/tablet-only.js");
/* harmony import */ var _css_mobile_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/mobile.js */ "./src/blocks/grid/css/mobile.js");
/* harmony import */ var _components_panel_area___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/panel-area/ */ "./src/components/panel-area/index.js");
/* harmony import */ var _utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/get-all-unique-ids */ "./src/utils/get-all-unique-ids/index.js");
/* harmony import */ var _utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/get-responsive-placeholder */ "./src/utils/get-responsive-placeholder/index.js");
/* harmony import */ var _utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/has-numeric-value */ "./src/utils/has-numeric-value/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_21__);



/**
 * Block: Grid
 */





















/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */

const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockGridContainer extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      selectedLayout: false,
      selectedDevice: 'Desktop'
    };
    this.onLayoutSelect = this.onLayoutSelect.bind(this);
    this.getColumnsFromLayout = this.getColumnsFromLayout.bind(this);
    this.getLayoutsSelector = this.getLayoutsSelector.bind(this);
    this.getDeviceType = this.getDeviceType.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    // Generate a unique ID if none exists or if the same ID exists on this page.
    const allBlocks = wp.data.select('core/block-editor').getBlocks();
    const uniqueIds = Object(_utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_12__["default"])(allBlocks, [], this.props.clientId);

    if (!this.props.attributes.uniqueId || uniqueIds.includes(this.props.attributes.uniqueId)) {
      this.props.setAttributes({
        uniqueId: this.props.clientId.substr(2, 9).replace('-', '')
      });
    } // This block used to be static. Set it to dynamic by default from now on.


    if ('undefined' === typeof this.props.attributes.isDynamic || !this.props.attributes.isDynamic) {
      this.props.setAttributes({
        isDynamic: true
      });
    }
  }

  componentDidUpdate() {
    const {
      attributes,
      setAttributes,
      clientId
    } = this.props;
    let {
      columns
    } = attributes;

    if (this.state.selectedLayout) {
      const columnsData = this.getColumnsFromLayout(this.state.selectedLayout);
      columnsData.forEach(colAttrs => {
        wp.data.dispatch('core/block-editor').insertBlocks(Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_18__["createBlock"])('generateblocks/container', colAttrs), undefined, clientId, false);
      });
      columns = columnsData.length;
      setAttributes({
        columns
      });
      this.setState({
        selectedLayout: false
      });
    } else {
      const parentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];

      if (parentBlock) {
        const childBlocks = parentBlock.innerBlocks;
        columns = childBlocks.length;
        setAttributes({
          columns
        });
      }
    }
  }
  /**
   * Get columns sizes array from layout string
   *
   * @param {string} layout - layout data. Example: `3-6-3`
   *
   * @return {Array}.
   */


  getColumnsFromLayout(layout) {
    const result = [];
    const columnsData = layout.split('-');
    let i = 0;
    columnsData.forEach(() => {
      const colAttrs = {
        isGrid: true,
        gridId: this.props.attributes.uniqueId,
        paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '0',
        paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '0',
        paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '0',
        paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '0'
      };
      colAttrs.width = Number(columnsData[i]);
      i++;
      result.push(colAttrs);
    });
    return result;
  }
  /**
   * Layouts selector when no columns selected.
   *
   * @return {JSX}.
   */


  getLayoutsSelector() {
    const layouts = ['100', '50-50', '33.33-33.33-33.33', '25-25-25-25', '25-75', '75-25', '25-25-50', '25-50-25', '50-25-25', '20-60-20', '20-20-20-20-20', '16-16-16-16-16-16'];
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Placeholder"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Grid', 'generateblocks'),
      instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Select one layout to get started.', 'generateblocks'),
      className: "gb-select-layout"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "gb-grid-wrapper-layout-preview"
    }, layouts.map(layout => {
      const columnsData = this.getColumnsFromLayout(layout);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("button", {
        key: `layout-${layout}`,
        className: "gb-grid-wrapper-layout-preview-btn",
        onClick: () => this.onLayoutSelect(layout)
      }, columnsData.map((colAttrs, i) => {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
          key: `layout-${layout}-col-${i}`,
          className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('gb-col', `gb-col-${colAttrs.width}`)
        });
      }));
    })));
  }
  /**
   * Select predefined layout.
   *
   * @param {string} layout layout string.
   */


  onLayoutSelect(layout) {
    this.setState({
      selectedLayout: layout
    });
  }

  getDeviceType() {
    let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

    if (!generateBlocksInfo.syncResponsivePreviews) {
      deviceType = this.state.selectedDevice;
    }

    return deviceType;
  }

  setDeviceType(deviceType) {
    if (generateBlocksInfo.syncResponsivePreviews && this.props.deviceType) {
      this.props.setDeviceType(deviceType);
      this.setState({
        selectedDevice: deviceType
      });
    } else {
      this.setState({
        selectedDevice: deviceType
      });
    }
  }

  render() {
    const {
      attributes,
      setAttributes,
      clientId
    } = this.props;
    const {
      uniqueId,
      className,
      anchor,
      columns,
      horizontalGap,
      verticalGap,
      verticalAlignment,
      horizontalGapTablet,
      verticalGapTablet,
      verticalAlignmentTablet,
      horizontalGapMobile,
      verticalGapMobile,
      verticalAlignmentMobile,
      horizontalAlignment,
      horizontalAlignmentTablet,
      horizontalAlignmentMobile
    } = attributes;
    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        'gb-grid-wrapper': true,
        [`gb-grid-wrapper-${uniqueId}`]: true,
        [`${className}`]: undefined !== className
      }),
      id: anchor ? anchor : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_19__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, (columns > 0 || this.state.selectedLayout) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["ToolbarGroup"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["ToolbarButton"], {
      className: "gblocks-block-control-icon gblocks-add-grid-item",
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_3__["default"])('addContainer'),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Add Grid Item', 'generateblocks'),
      onClick: () => {
        wp.data.dispatch('core/block-editor').insertBlocks(Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_18__["createBlock"])('generateblocks/container', {
          isGrid: true,
          gridId: uniqueId,
          paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '0',
          paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '0',
          paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '0',
          paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '0'
        }), undefined, clientId);
      },
      showTooltip: true
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_responsive_tabs__WEBPACK_IMPORTED_MODULE_4__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      selectedDevice: this.getDeviceType(),
      onClick: device => {
        this.setDeviceType(device);
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      id: 'gridLayout',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(horizontalGap) ? horizontalGap : '',
      min: "0",
      onChange: value => {
        // No hyphens allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          horizontalGap: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          horizontalGap: generateBlocksDefaults.gridContainer.horizontalGap
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(verticalGap) ? verticalGap : '',
      min: "0",
      onChange: value => {
        // No negative values allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          verticalGap: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          verticalGap: generateBlocksDefaults.gridContainer.verticalGap
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Alignment', 'generateblocks'),
      value: verticalAlignment,
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks'),
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignment: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Alignment', 'generateblocks'),
      value: horizontalAlignment,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Left', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Right', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          horizontalAlignment: value
        });
      }
    })), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(horizontalGapTablet) ? horizontalGapTablet : '',
      min: "0",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_13__["default"])('horizontalGap', attributes, 'Tablet', ''),
      onChange: value => {
        // No negative values allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          horizontalGapTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          horizontalGapTablet: generateBlocksDefaults.gridContainer.horizontalGapTablet
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(verticalGapTablet) ? verticalGapTablet : '',
      min: "0",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_13__["default"])('verticalGap', attributes, 'Tablet', ''),
      onChange: value => {
        // No negative values allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          verticalGapTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          verticalGapTablet: generateBlocksDefaults.gridContainer.verticalGapTablet
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Alignment', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks'),
      value: verticalAlignmentTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Alignment', 'generateblocks'),
      value: horizontalAlignmentTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Left', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Right', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          horizontalAlignmentTablet: value
        });
      }
    })), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(horizontalGapMobile) ? horizontalGapMobile : '',
      min: "0",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_13__["default"])('horizontalGap', attributes, 'Mobile', ''),
      onChange: value => {
        // No negative values allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          horizontalGapMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          horizontalGapMobile: generateBlocksDefaults.gridContainer.horizontalGapMobile
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Gap', 'generateblocks'),
      value: 'px',
      units: ['px'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      type: 'number',
      value: Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_14__["default"])(verticalGapMobile) ? verticalGapMobile : '',
      min: "0",
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_13__["default"])('verticalGap', attributes, 'Mobile', ''),
      onChange: value => {
        // No negative values allowed here.
        value = value.toString().replace(/-/g, '');
        setAttributes({
          verticalGapMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          verticalGapMobile: generateBlocksDefaults.gridContainer.verticalGapMobile
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Reset', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Vertical Alignment', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks'),
      value: verticalAlignmentMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Top', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Bottom', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          verticalAlignmentMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Horizontal Alignment', 'generateblocks'),
      value: horizontalAlignmentMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Inherit', 'generateblocks'),
        value: 'inherit'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Default', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Left', 'generateblocks'),
        value: 'flex-start'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Right', 'generateblocks'),
        value: 'flex-end'
      }],
      onChange: value => {
        setAttributes({
          horizontalAlignmentMobile: value
        });
      }
    })), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_19__["applyFilters"])('generateblocks.editor.controls', '', 'gridLayout', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_11__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Documentation', 'generateblocks'),
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_3__["default"])('documentation'),
      initialOpen: false,
      className: 'gblocks-panel-label',
      id: 'gridDocumentation',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Need help with this block?', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      href: "https://docs.generateblocks.com/collection/grid/",
      target: "_blank",
      rel: "noreferrer noopener"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Visit our documentation', 'generateblocks')), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_19__["applyFilters"])('generateblocks.editor.controls', '', 'gridDocumentation', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__["InspectorAdvancedControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('HTML Anchor', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Anchors lets you link directly to a section on a page.', 'generateblocks'),
      value: anchor || '',
      onChange: nextValue => {
        nextValue = nextValue.replace(ANCHOR_REGEX, '-');
        setAttributes({
          anchor: nextValue
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_main_js__WEBPACK_IMPORTED_MODULE_6__["default"], this.props), this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'Desktop' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_desktop_js__WEBPACK_IMPORTED_MODULE_7__["default"], this.props), ('Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_js__WEBPACK_IMPORTED_MODULE_8__["default"], this.props), 'Tablet' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_only_js__WEBPACK_IMPORTED_MODULE_9__["default"], this.props), 'Mobile' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_mobile_js__WEBPACK_IMPORTED_MODULE_10__["default"], this.props)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", htmlAttributes, columns > 0 || this.state.selectedLayout ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_17__["InnerBlocks"], {
      allowedBlocks: ['generateblocks/container'],
      renderAppender: false
    })) : this.getLayoutsSelector()));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_21__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_20__["withDispatch"])(dispatch => ({
  setDeviceType(type) {
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = dispatch('core/edit-post');

    if (!setPreviewDeviceType) {
      return;
    }

    setPreviewDeviceType(type);
  }

})), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_20__["withSelect"])(select => {
  const {
    __experimentalGetPreviewDeviceType: getPreviewDeviceType
  } = select('core/edit-post');

  if (!getPreviewDeviceType) {
    return {
      deviceType: null
    };
  }

  return {
    deviceType: getPreviewDeviceType()
  };
})])(GenerateBlockGridContainer));

/***/ }),

/***/ "./src/blocks/grid/editor.scss":
/*!*************************************!*\
  !*** ./src/blocks/grid/editor.scss ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/grid/migrate.js":
/*!************************************!*\
  !*** ./src/blocks/grid/migrate.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Convert number attribute type to strings.
 */

Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__["addFilter"])('blocks.getBlockAttributes', 'generateblocks/grid/migrate-attributes', (blockAttributes, blockType, innerHTML, attributes) => {
  if ('generateblocks/grid' === blockType.name) {
    const attributesToConvert = ['horizontalGap', 'horizontalGapTablet', 'horizontalGapMobile', 'verticalGap', 'verticalGapTablet', 'verticalGapMobile'];
    attributesToConvert.forEach(attribute => {
      if ('number' === typeof attributes[attribute]) {
        blockAttributes[attribute] = attributes[attribute].toString();
      }
    });
  }

  return blockAttributes;
});

/***/ }),

/***/ "./src/blocks/headline/attributes.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/attributes.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* harmony default export */ __webpack_exports__["default"] = ({
  uniqueId: {
    type: 'string',
    default: ''
  },
  anchor: {
    type: 'string',
    default: ''
  },
  content: {
    type: 'string',
    source: 'html',
    selector: '.gb-headline-text'
  },
  element: {
    type: 'string',
    default: 'h2'
  },
  alignment: {
    type: 'string',
    default: generateBlocksDefaults.headline.alignment
  },
  alignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.alignmentTablet
  },
  alignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.alignmentMobile
  },
  backgroundColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.backgroundColor
  },
  backgroundColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.headline.backgroundColorOpacity
  },
  textColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.textColor
  },
  linkColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.linkColor
  },
  linkColorHover: {
    type: 'string',
    default: generateBlocksDefaults.headline.linkColorHover
  },
  borderColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderColor
  },
  borderColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.headline.borderColorOpacity
  },
  highlightTextColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.highlightTextColor
  },
  fontFamily: {
    type: 'string',
    default: generateBlocksDefaults.headline.fontFamily
  },
  fontFamilyFallback: {
    type: 'string',
    default: generateBlocksDefaults.headline.fontFamilyFallback
  },
  googleFont: {
    type: 'boolean',
    default: generateBlocksDefaults.headline.googleFont
  },
  googleFontVariants: {
    type: 'string',
    default: generateBlocksDefaults.headline.googleFontVariants
  },
  fontWeight: {
    type: 'string',
    default: generateBlocksDefaults.headline.fontWeight
  },
  fontSize: {
    type: 'number',
    default: generateBlocksDefaults.headline.fontSize
  },
  fontSizeTablet: {
    type: 'number',
    default: generateBlocksDefaults.headline.fontSizeTablet
  },
  fontSizeMobile: {
    type: 'number',
    default: generateBlocksDefaults.headline.fontSizeMobile
  },
  fontSizeUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.fontSizeUnit
  },
  textTransform: {
    type: 'string',
    default: ''
  },
  lineHeight: {
    type: 'number',
    default: generateBlocksDefaults.headline.lineHeight
  },
  lineHeightTablet: {
    type: 'number',
    default: generateBlocksDefaults.headline.lineHeightTablet
  },
  lineHeightMobile: {
    type: 'number',
    default: generateBlocksDefaults.headline.lineHeightMobile
  },
  lineHeightUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.lineHeightUnit
  },
  letterSpacing: {
    type: 'number',
    default: generateBlocksDefaults.headline.letterSpacing
  },
  letterSpacingTablet: {
    type: 'number',
    default: generateBlocksDefaults.headline.letterSpacingTablet
  },
  letterSpacingMobile: {
    type: 'number',
    default: generateBlocksDefaults.headline.letterSpacingMobile
  },
  marginTop: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginTop
  },
  marginRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginRight
  },
  marginBottom: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginBottom
  },
  marginLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginLeft
  },
  marginUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginUnit
  },
  marginSyncUnits: {
    type: 'boolean',
    default: false
  },
  marginTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginTopTablet
  },
  marginRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginRightTablet
  },
  marginBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginBottomTablet
  },
  marginLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginLeftTablet
  },
  marginTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginTopMobile
  },
  marginRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginRightMobile
  },
  marginBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginBottomMobile
  },
  marginLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.marginLeftMobile
  },
  paddingTop: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingTop
  },
  paddingRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingRight
  },
  paddingBottom: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingBottom
  },
  paddingLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingLeft
  },
  paddingTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingTopTablet
  },
  paddingRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingRightTablet
  },
  paddingBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingBottomTablet
  },
  paddingLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingLeftTablet
  },
  paddingTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingTopMobile
  },
  paddingRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingRightMobile
  },
  paddingBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingBottomMobile
  },
  paddingLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingLeftMobile
  },
  paddingUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.paddingUnit
  },
  paddingSyncUnits: {
    type: 'boolean',
    default: false
  },
  borderSizeTop: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeTop
  },
  borderSizeRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeRight
  },
  borderSizeBottom: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeBottom
  },
  borderSizeLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeLeft
  },
  borderSizeTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeTopTablet
  },
  borderSizeRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeRightTablet
  },
  borderSizeBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeBottomTablet
  },
  borderSizeLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeLeftTablet
  },
  borderSizeTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeTopMobile
  },
  borderSizeRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeRightMobile
  },
  borderSizeBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeBottomMobile
  },
  borderSizeLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderSizeLeftMobile
  },
  borderRadiusTopRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopRight
  },
  borderRadiusBottomRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomRight
  },
  borderRadiusBottomLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomLeft
  },
  borderRadiusTopLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopLeft
  },
  borderRadiusUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusUnit
  },
  borderRadiusTopRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopRightTablet
  },
  borderRadiusBottomRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomRightTablet
  },
  borderRadiusBottomLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomLeftTablet
  },
  borderRadiusTopLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopLeftTablet
  },
  borderRadiusTopRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopRightMobile
  },
  borderRadiusBottomRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomRightMobile
  },
  borderRadiusBottomLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusBottomLeftMobile
  },
  borderRadiusTopLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.borderRadiusTopLeftMobile
  },
  icon: {
    type: 'string',
    source: 'html',
    selector: '.gb-icon'
  },
  hasIcon: {
    type: 'boolean',
    default: false
  },
  iconColor: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconColor
  },
  iconColorOpacity: {
    type: 'number',
    default: generateBlocksDefaults.headline.iconColorOpacity
  },
  customIcon: {
    type: 'boolean',
    default: false
  },
  iconLocation: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconLocation
  },
  iconLocationTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconLocationTablet
  },
  iconLocationMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconLocationMobile
  },
  iconVerticalAlignment: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconVerticalAlignment
  },
  iconVerticalAlignmentTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconVerticalAlignmentTablet
  },
  iconVerticalAlignmentMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconVerticalAlignmentMobile
  },
  iconPaddingTop: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingTop
  },
  iconPaddingRight: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingRight
  },
  iconPaddingBottom: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingBottom
  },
  iconPaddingLeft: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingLeft
  },
  iconPaddingTopTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingTopTablet
  },
  iconPaddingRightTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingRightTablet
  },
  iconPaddingBottomTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingBottomTablet
  },
  iconPaddingLeftTablet: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingLeftTablet
  },
  iconPaddingTopMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingTopMobile
  },
  iconPaddingRightMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingRightMobile
  },
  iconPaddingBottomMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingBottomMobile
  },
  iconPaddingLeftMobile: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingLeftMobile
  },
  iconPaddingUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconPaddingUnit
  },
  iconPaddingSyncUnits: {
    type: 'boolean',
    default: false
  },
  iconSize: {
    type: 'number',
    default: generateBlocksDefaults.headline.iconSize
  },
  iconSizeTablet: {
    type: 'number',
    default: generateBlocksDefaults.headline.iconSizeTablet
  },
  iconSizeMobile: {
    type: 'number',
    default: generateBlocksDefaults.headline.iconSizeMobile
  },
  iconSizeUnit: {
    type: 'string',
    default: generateBlocksDefaults.headline.iconSizeUnit
  },
  inlineWidth: {
    type: 'boolean',
    default: generateBlocksDefaults.headline.inlineWidth
  },
  inlineWidthTablet: {
    type: 'boolean',
    default: generateBlocksDefaults.headline.inlineWidthTablet
  },
  inlineWidthMobile: {
    type: 'boolean',
    default: generateBlocksDefaults.headline.inlineWidthMobile
  },
  removeText: {
    type: 'boolean',
    default: generateBlocksDefaults.headline.removeText
  },
  ariaLabel: {
    type: 'string',
    default: generateBlocksDefaults.headline.ariaLabel
  },
  // deprecated since 1.2.0.
  elementId: {
    type: 'string',
    default: ''
  },
  cssClasses: {
    type: 'string',
    default: ''
  }
});
/* eslint-enable no-undef */

/***/ }),

/***/ "./src/blocks/headline/block.js":
/*!**************************************!*\
  !*** ./src/blocks/headline/block.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/headline/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/headline/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/headline/save.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attributes */ "./src/blocks/headline/attributes.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transforms */ "./src/blocks/headline/transforms.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deprecated */ "./src/blocks/headline/deprecated.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__);
/**
 * Block: Headline
 */
//import './style.scss';









/**
 * Register our Headline block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_8__["registerBlockType"])('generateblocks/headline', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Headline', 'generateblocks'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Craft text-rich content with advanced typography.', 'generateblocks'),
  icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_6__["default"])('headline'),
  category: 'generateblocks',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('heading'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('headline'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('title'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('generate')],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_3__["default"],
  supports: {
    className: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"],
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./src/blocks/headline/css/desktop.js":
/*!********************************************!*\
  !*** ./src/blocks/headline/css/desktop.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DesktopCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);




class DesktopCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.desktopCSS', cssObj, this.props, 'headline');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/headline/css/main.js":
/*!*****************************************!*\
  !*** ./src/blocks/headline/css/main.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _utils_shorthand_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/shorthand-css */ "./src/utils/shorthand-css/index.js");
/* harmony import */ var _utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/hex-to-rgba */ "./src/utils/hex-to-rgba/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);








class MainCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      element,
      alignment,
      backgroundColor,
      backgroundColorOpacity,
      textColor,
      linkColor,
      borderColor,
      borderColorOpacity,
      highlightTextColor,
      fontFamily,
      fontFamilyFallback,
      fontWeight,
      fontSize,
      fontSizeUnit,
      textTransform,
      lineHeight,
      lineHeightUnit,
      letterSpacing,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginUnit,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingUnit,
      borderSizeTop,
      borderSizeRight,
      borderSizeBottom,
      borderSizeLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft,
      borderRadiusTopLeft,
      borderRadiusUnit,
      icon,
      iconColor,
      iconColorOpacity,
      iconLocation,
      iconVerticalAlignment,
      iconPaddingTop,
      iconPaddingRight,
      iconPaddingBottom,
      iconPaddingLeft,
      iconPaddingUnit,
      iconSize,
      iconSizeUnit,
      inlineWidth,
      removeText
    } = attributes;
    let fontFamilyFallbackValue = '',
        inlineWidthValue = 'inline-block';

    if (fontFamily && fontFamilyFallback) {
      fontFamilyFallbackValue = ', ' + fontFamilyFallback;
    }

    const selector = element + '.gb-headline-' + uniqueId;
    let cssObj = [];
    cssObj['.editor-styles-wrapper ' + selector] = [{
      color: textColor,
      'font-family': fontFamily + fontFamilyFallbackValue,
      'font-weight': fontWeight,
      'text-transform': textTransform,
      'text-align': alignment,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(fontSize, fontSizeUnit),
      'line-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(lineHeight, lineHeightUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(letterSpacing, 'em'),
      display: !!icon ? 'flex' : false,
      'align-items': 'inline' === iconLocation ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(iconVerticalAlignment) : Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignment),
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignment),
      'flex-direction': icon && 'above' === iconLocation ? 'column' : false
    }];
    cssObj['.editor-styles-wrapper .gb-container ' + selector] = [{
      color: textColor
    }];

    if (icon) {
      inlineWidthValue = 'inline-flex';
    }

    cssObj['.editor-styles-wrapper ' + selector].push({
      'background-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_5__["default"])(backgroundColor, backgroundColorOpacity),
      'color': textColor,
      // eslint-disable-line quote-props
      'display': inlineWidth ? inlineWidthValue : false,
      // eslint-disable-line quote-props
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginTop, marginUnit),
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginRight, marginUnit),
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginBottom, marginUnit),
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginLeft, marginUnit),
      'padding': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_4__["default"])(paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit),
      // eslint-disable-line quote-props
      'border-radius': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_4__["default"])(borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit),
      'border-color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_5__["default"])(borderColor, borderColorOpacity)
    });

    if (borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft) {
      cssObj['.editor-styles-wrapper ' + selector].push({
        'border-width': Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_4__["default"])(borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj['.editor-styles-wrapper ' + selector + ' a'] = [{
      'color': linkColor // eslint-disable-line quote-props

    }];
    cssObj[selector + ' .gb-icon'] = [{
      'padding': !removeText ? Object(_utils_shorthand_css__WEBPACK_IMPORTED_MODULE_4__["default"])(iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit) : false,
      // eslint-disable-line quote-props
      'align-self': icon && 'above' === iconLocation ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignment) : false,
      'color': Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_5__["default"])(iconColor, iconColorOpacity),
      // eslint-disable-line quote-props
      'display': icon && 'above' === iconLocation ? 'inline' : false // eslint-disable-line quote-props

    }];
    cssObj[selector + ' .gb-icon svg'] = [{
      'width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSize, iconSizeUnit),
      // eslint-disable-line quote-props
      'height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSize, iconSizeUnit) // eslint-disable-line quote-props

    }];
    cssObj[selector + ' .gb-highlight'] = [{
      'color': highlightTextColor // eslint-disable-line quote-props

    }];
    cssObj['#block-' + clientId] = [{
      'display': inlineWidth ? 'inline-flex' : false // eslint-disable-line quote-props

    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.editor.mainCSS', cssObj, this.props, 'headline');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/headline/css/mobile.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/css/mobile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MobileCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class MobileCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      element,
      alignmentMobile,
      fontSizeMobile,
      fontSizeUnit,
      lineHeightMobile,
      lineHeightUnit,
      letterSpacingMobile,
      marginTopMobile,
      marginRightMobile,
      marginBottomMobile,
      marginLeftMobile,
      marginUnit,
      paddingTopMobile,
      paddingRightMobile,
      paddingBottomMobile,
      paddingLeftMobile,
      paddingUnit,
      borderSizeTopMobile,
      borderSizeRightMobile,
      borderSizeBottomMobile,
      borderSizeLeftMobile,
      borderRadiusTopRightMobile,
      borderRadiusBottomRightMobile,
      borderRadiusBottomLeftMobile,
      borderRadiusTopLeftMobile,
      borderRadiusUnit,
      icon,
      iconLocationMobile,
      iconVerticalAlignmentMobile,
      iconPaddingTopMobile,
      iconPaddingRightMobile,
      iconPaddingBottomMobile,
      iconPaddingLeftMobile,
      iconPaddingUnit,
      iconSizeMobile,
      iconSizeUnit,
      inlineWidthMobile,
      removeText
    } = attributes;
    const selector = element + '.gb-headline-' + uniqueId;
    let inlineWidthValue = 'inline-block';
    let cssObj = [];
    cssObj['.editor-styles-wrapper ' + selector] = [{
      'text-align': alignmentMobile,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(fontSizeMobile, fontSizeUnit),
      'line-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(lineHeightMobile, lineHeightUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(letterSpacingMobile, 'em'),
      display: !!icon ? 'flex' : false,
      'align-items': 'inline' === iconLocationMobile ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(iconVerticalAlignmentMobile) : Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentMobile),
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentMobile),
      'flex-direction': icon && 'above' === iconLocationMobile ? 'column' : false,
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginTopMobile, marginUnit) + ' !important',
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginRightMobile, marginUnit) + ' !important',
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginBottomMobile, marginUnit) + ' !important',
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginLeftMobile, marginUnit) + ' !important',
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingTopMobile, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingRightMobile, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingBottomMobile, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingLeftMobile, paddingUnit),
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusTopLeftMobile, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusTopRightMobile, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusBottomRightMobile, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusBottomLeftMobile, borderRadiusUnit)
    }];

    if (icon) {
      inlineWidthValue = 'inline-flex';
      cssObj['.editor-styles-wrapper ' + selector].push({
        'display': inlineWidthMobile ? inlineWidthValue : false // eslint-disable-line quote-props

      });
    }

    if (borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile) {
      cssObj['.editor-styles-wrapper ' + selector].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeTopMobile, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeRightMobile, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeBottomMobile, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeLeftMobile, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj[selector + ' .gb-icon'] = [{
      'padding-top': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingTopMobile, iconPaddingUnit) : false,
      'padding-right': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingRightMobile, iconPaddingUnit) : false,
      'padding-bottom': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingBottomMobile, iconPaddingUnit) : false,
      'padding-left': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingLeftMobile, iconPaddingUnit) : false,
      'align-self': icon && 'above' === iconLocationMobile ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentMobile) : false,
      'display': icon && 'above' === iconLocationMobile ? 'inline' : false // eslint-disable-line quote-props

    }];
    cssObj[selector + ' .gb-icon svg'] = [{
      'width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSizeMobile, iconSizeUnit),
      // eslint-disable-line quote-props
      'height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSizeMobile, iconSizeUnit) // eslint-disable-line quote-props

    }];
    cssObj['#block-' + clientId] = [{
      'display': inlineWidthMobile ? 'inline-flex' : false // eslint-disable-line quote-props

    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.mobileCSS', cssObj, this.props, 'headline');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/headline/css/tablet-only.js":
/*!************************************************!*\
  !*** ./src/blocks/headline/css/tablet-only.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletOnlyCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);




class TabletOnlyCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let cssObj = [];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__["applyFilters"])('generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'headline');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/headline/css/tablet.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/css/tablet.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabletCSS; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_build_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/build-css */ "./src/utils/build-css/index.js");
/* harmony import */ var _utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/flexbox-alignment */ "./src/utils/flexbox-alignment/index.js");
/* harmony import */ var _utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/value-with-unit */ "./src/utils/value-with-unit/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class TabletCSS extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.cssAttrs', this.props.attributes, this.props);
    const {
      clientId
    } = this.props;
    const {
      uniqueId,
      element,
      alignmentTablet,
      fontSizeTablet,
      fontSizeUnit,
      lineHeightTablet,
      lineHeightUnit,
      letterSpacingTablet,
      marginTopTablet,
      marginRightTablet,
      marginBottomTablet,
      marginLeftTablet,
      marginUnit,
      paddingTopTablet,
      paddingRightTablet,
      paddingBottomTablet,
      paddingLeftTablet,
      paddingUnit,
      borderSizeTopTablet,
      borderSizeRightTablet,
      borderSizeBottomTablet,
      borderSizeLeftTablet,
      borderRadiusTopRightTablet,
      borderRadiusBottomRightTablet,
      borderRadiusBottomLeftTablet,
      borderRadiusTopLeftTablet,
      borderRadiusUnit,
      icon,
      iconLocationTablet,
      iconVerticalAlignmentTablet,
      iconPaddingTopTablet,
      iconPaddingRightTablet,
      iconPaddingBottomTablet,
      iconPaddingLeftTablet,
      iconPaddingUnit,
      iconSizeTablet,
      iconSizeUnit,
      inlineWidthTablet,
      removeText
    } = attributes;
    const selector = element + '.gb-headline-' + uniqueId;
    let inlineWidthValue = 'inline-block';
    let cssObj = [];
    cssObj['.editor-styles-wrapper ' + selector] = [{
      'text-align': alignmentTablet,
      'font-size': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(fontSizeTablet, fontSizeUnit),
      'line-height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(lineHeightTablet, lineHeightUnit),
      'letter-spacing': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(letterSpacingTablet, 'em'),
      display: !!icon ? 'flex' : false,
      'align-items': 'inline' === iconLocationTablet ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(iconVerticalAlignmentTablet) : Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentTablet),
      'justify-content': Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentTablet),
      'flex-direction': icon && 'above' === iconLocationTablet ? 'column' : false,
      'margin-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginTopTablet, marginUnit) + ' !important',
      'margin-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginRightTablet, marginUnit) + ' !important',
      'margin-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginBottomTablet, marginUnit) + ' !important',
      'margin-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(marginLeftTablet, marginUnit) + ' !important',
      'padding-top': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingTopTablet, paddingUnit),
      'padding-right': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingRightTablet, paddingUnit),
      'padding-bottom': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingBottomTablet, paddingUnit),
      'padding-left': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(paddingLeftTablet, paddingUnit),
      'border-top-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusTopLeftTablet, borderRadiusUnit),
      'border-top-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusTopRightTablet, borderRadiusUnit),
      'border-bottom-right-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusBottomRightTablet, borderRadiusUnit),
      'border-bottom-left-radius': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderRadiusBottomLeftTablet, borderRadiusUnit)
    }];

    if (icon) {
      inlineWidthValue = 'inline-flex';
      cssObj['.editor-styles-wrapper ' + selector].push({
        'display': inlineWidthTablet ? inlineWidthValue : false // eslint-disable-line quote-props

      });
    }

    if (borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet) {
      cssObj['.editor-styles-wrapper ' + selector].push({
        'border-top-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeTopTablet, 'px'),
        'border-right-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeRightTablet, 'px'),
        'border-bottom-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeBottomTablet, 'px'),
        'border-left-width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(borderSizeLeftTablet, 'px'),
        'border-style': 'solid'
      });
    }

    cssObj[selector + ' .gb-icon'] = [{
      'padding-top': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingTopTablet, iconPaddingUnit) : false,
      'padding-right': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingRightTablet, iconPaddingUnit) : false,
      'padding-bottom': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingBottomTablet, iconPaddingUnit) : false,
      'padding-left': !removeText ? Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconPaddingLeftTablet, iconPaddingUnit) : false,
      'align-self': icon && 'above' === iconLocationTablet ? Object(_utils_flexbox_alignment__WEBPACK_IMPORTED_MODULE_2__["default"])(alignmentTablet) : false,
      'display': icon && 'above' === iconLocationTablet ? 'inline' : false // eslint-disable-line quote-props

    }];
    cssObj[selector + ' .gb-icon svg'] = [{
      'width': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSizeTablet, iconSizeUnit),
      // eslint-disable-line quote-props
      'height': Object(_utils_value_with_unit__WEBPACK_IMPORTED_MODULE_3__["default"])(iconSizeTablet, iconSizeUnit) // eslint-disable-line quote-props

    }];
    cssObj['#block-' + clientId] = [{
      'display': inlineWidthTablet ? 'inline-flex' : false // eslint-disable-line quote-props

    }];
    cssObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.tabletCSS', cssObj, this.props, 'text');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style", null, Object(_utils_build_css__WEBPACK_IMPORTED_MODULE_1__["default"])(cssObj));
  }

}

/***/ }),

/***/ "./src/blocks/headline/deprecated.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/deprecated.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/blocks/headline/attributes.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/sanitize-svg */ "./src/utils/sanitize-svg/index.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);







const deprecated = [// v2 - remove wrapper.
{
  attributes: { ..._attributes__WEBPACK_IMPORTED_MODULE_2__["default"],
    content: {
      type: 'array',
      source: 'children',
      selector: 'p,h1,h2,h3,h4,h5,h6'
    }
  },
  supports: {
    anchor: false,
    className: false,
    customClassName: false
  },

  migrate(attributes) {
    const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
    const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;
    let currentElement = attributes.element ? attributes.element : generateBlocksDefaults.headline.element;

    if (attributes.icon && attributes.removeText && 'div' !== currentElement) {
      currentElement = 'div';
    }

    return { ...attributes,
      className: oldClasses,
      anchor: oldAnchor,
      cssClasses: '',
      elementId: '',
      element: currentElement
    };
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      elementId,
      cssClasses,
      element,
      content,
      icon,
      removeText,
      ariaLabel
    } = attributes;

    const ConditionalWrap = ({
      condition,
      wrap,
      children
    }) => condition ? wrap(children) : children;

    let htmlAttributes = {
      id: !!elementId ? elementId : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()({
        'gb-headline': true,
        [`gb-headline-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses
      })
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ConditionalWrap, {
      condition: icon,
      wrap: children => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()({
          'gb-headline-wrapper': true,
          [`gb-headline-wrapper-${uniqueId}`]: true
        })
      }, children)
    }, icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-icon",
      "aria-label": !!removeText && !!ariaLabel ? ariaLabel : undefined,
      dangerouslySetInnerHTML: {
        __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__["default"])(icon)
      }
    }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["RichText"].Content, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      tagName: element,
      value: content
    }, htmlAttributes)));
  }

}, // v1 - change default h2 to p.
{
  attributes: { ..._attributes__WEBPACK_IMPORTED_MODULE_2__["default"],
    element: {
      type: 'string',
      default: 'p'
    },
    content: {
      type: 'array',
      source: 'children',
      selector: 'p,h1,h2,h3,h4,h5,h6'
    }
  },

  save({
    attributes
  }) {
    const {
      uniqueId,
      elementId,
      cssClasses,
      element,
      content,
      icon,
      removeText,
      ariaLabel
    } = attributes;

    const ConditionalWrap = ({
      condition,
      wrap,
      children
    }) => condition ? wrap(children) : children;

    let htmlAttributes = {
      id: !!elementId ? elementId : undefined,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()({
        'gb-headline': true,
        [`gb-headline-${uniqueId}`]: true,
        [`${cssClasses}`]: '' !== cssClasses
      })
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ConditionalWrap, {
      condition: icon,
      wrap: children => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()({
          'gb-headline-wrapper': true,
          [`gb-headline-wrapper-${uniqueId}`]: true
        })
      }, children)
    }, icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-icon",
      "aria-label": !!removeText && !!ariaLabel ? ariaLabel : undefined,
      dangerouslySetInnerHTML: {
        __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__["default"])(icon)
      }
    }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["RichText"].Content, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      tagName: element,
      value: content
    }, htmlAttributes)));
  }

}];
/* harmony default export */ __webpack_exports__["default"] = (deprecated);

/***/ }),

/***/ "./src/blocks/headline/edit.js":
/*!*************************************!*\
  !*** ./src/blocks/headline/edit.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_color_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/color-picker */ "./src/components/color-picker/index.js");
/* harmony import */ var _components_icon_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icon-picker */ "./src/components/icon-picker/index.js");
/* harmony import */ var _components_unit_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _components_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/typography */ "./src/components/typography/index.js");
/* harmony import */ var _components_dimensions___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/dimensions/ */ "./src/components/dimensions/index.js");
/* harmony import */ var _components_responsive_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/responsive-tabs */ "./src/components/responsive-tabs/index.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _css_main_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/main.js */ "./src/blocks/headline/css/main.js");
/* harmony import */ var _css_desktop_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./css/desktop.js */ "./src/blocks/headline/css/desktop.js");
/* harmony import */ var _css_tablet_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./css/tablet.js */ "./src/blocks/headline/css/tablet.js");
/* harmony import */ var _css_tablet_only_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./css/tablet-only.js */ "./src/blocks/headline/css/tablet-only.js");
/* harmony import */ var _css_mobile_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./css/mobile.js */ "./src/blocks/headline/css/mobile.js");
/* harmony import */ var _components_panel_area___WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/panel-area/ */ "./src/components/panel-area/index.js");
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _markformat__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./markformat */ "./src/blocks/headline/markformat.js");
/* harmony import */ var _element_icons__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./element-icons */ "./src/blocks/headline/element-icons.js");
/* harmony import */ var _utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utils/get-all-unique-ids */ "./src/utils/get-all-unique-ids/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_25__);



/**
 * Block: Headline
 */

























/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */

const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockHeadline extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super(...arguments);
    this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind(this);
    this.getDeviceType = this.getDeviceType.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
    this.state = {
      selectedDevice: 'Desktop',
      fontSizePlaceholder: '17'
    };
  }

  componentDidMount() {
    // Generate a unique ID if none exists or if the same ID exists on this page.
    const allBlocks = wp.data.select('core/block-editor').getBlocks();
    const uniqueIds = Object(_utils_get_all_unique_ids__WEBPACK_IMPORTED_MODULE_19__["default"])(allBlocks, [], this.props.clientId);

    if (!this.props.attributes.uniqueId || uniqueIds.includes(this.props.attributes.uniqueId)) {
      this.props.setAttributes({
        uniqueId: this.props.clientId.substr(2, 9).replace('-', '')
      });
    }

    const tempFontSizePlaceholder = this.getFontSizePlaceholder();

    if (tempFontSizePlaceholder !== this.state.fontSizePlaceholder) {
      this.setState({
        fontSizePlaceholder: tempFontSizePlaceholder
      });
    } // hasIcon came late, so let's set it on mount if we have an icon.


    if (!this.props.attributes.hasIcon && this.props.attributes.icon) {
      this.props.setAttributes({
        hasIcon: true
      });
    }
  }

  componentDidUpdate() {
    const tempFontSizePlaceholder = this.getFontSizePlaceholder();

    if (tempFontSizePlaceholder !== this.state.fontSizePlaceholder) {
      this.setState({
        fontSizePlaceholder: tempFontSizePlaceholder
      });
    }
  }

  getFontSizePlaceholder() {
    let placeholder = '25';

    if ('em' === this.props.attributes.fontSizeUnit) {
      placeholder = '1';
    } else if ('%' === this.props.attributes.fontSizeUnit) {
      placeholder = '100';
    } else {
      const headlineId = document.querySelector('.gb-headline-' + this.props.attributes.uniqueId);

      if (headlineId) {
        placeholder = parseFloat(window.getComputedStyle(headlineId).fontSize);
      }
    }

    return placeholder;
  }

  getDeviceType() {
    let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

    if (!generateBlocksInfo.syncResponsivePreviews) {
      deviceType = this.state.selectedDevice;
    }

    return deviceType;
  }

  setDeviceType(deviceType) {
    if (generateBlocksInfo.syncResponsivePreviews && this.props.deviceType) {
      this.props.setDeviceType(deviceType);
      this.setState({
        selectedDevice: deviceType
      });
    } else {
      this.setState({
        selectedDevice: deviceType
      });
    }
  }

  render() {
    const {
      attributes,
      setAttributes
    } = this.props;
    const {
      fontSizePlaceholder
    } = this.state;
    const {
      uniqueId,
      anchor,
      className,
      content,
      element,
      alignment,
      alignmentTablet,
      alignmentMobile,
      backgroundColor,
      backgroundColorOpacity,
      textColor,
      linkColor,
      linkColorHover,
      borderColor,
      borderColorOpacity,
      highlightTextColor,
      fontFamily,
      googleFont,
      googleFontVariants,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      icon,
      hasIcon,
      iconColor,
      iconColorOpacity,
      iconLocation,
      iconLocationTablet,
      iconLocationMobile,
      iconVerticalAlignment,
      iconVerticalAlignmentTablet,
      iconVerticalAlignmentMobile,
      iconSize,
      iconSizeTablet,
      iconSizeMobile,
      iconSizeUnit,
      inlineWidth,
      inlineWidthTablet,
      inlineWidthMobile,
      removeText,
      ariaLabel
    } = attributes;
    let googleFontsAttr = '';

    if (googleFontVariants) {
      googleFontsAttr = ':' + googleFontVariants;
    }

    let iconSizePlaceholderMobile = '';

    if (iconSizeTablet || 0 === iconSizeTablet) {
      iconSizePlaceholderMobile = iconSizeTablet;
    } else if (iconSize || 0 === iconSize) {
      iconSizePlaceholderMobile = iconSize;
    } else {
      iconSizePlaceholderMobile = '';
    }

    let htmlAttributes = {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        'gb-headline': true,
        [`gb-headline-${uniqueId}`]: true,
        'gb-headline-text': !hasIcon,
        [className]: undefined !== className
      }),
      id: anchor ? anchor : null
    };
    htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["BlockControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToolbarGroup"], {
      isCollapsed: true,
      icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
        level: element
      }),
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Change Headline Element', 'generateblocks'),
      controls: [{
        isActive: 'h1' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h1'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '1'),
        onClick: () => {
          setAttributes({
            element: 'h1'
          });
        }
      }, {
        isActive: 'h2' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h2'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '2'),
        onClick: () => {
          setAttributes({
            element: 'h2'
          });
        }
      }, {
        isActive: 'h3' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h3'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '3'),
        onClick: () => {
          setAttributes({
            element: 'h3'
          });
        }
      }, {
        isActive: 'h4' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h4'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '4'),
        onClick: () => {
          setAttributes({
            element: 'h4'
          });
        }
      }, {
        isActive: 'h5' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h5'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '5'),
        onClick: () => {
          setAttributes({
            element: 'h5'
          });
        }
      }, {
        isActive: 'h6' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'h6'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["sprintf"])( // translators: %s: heading level e.g: "1", "2", "3"
        Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Heading %s', 'generateblocks'), '6'),
        onClick: () => {
          setAttributes({
            element: 'h6'
          });
        }
      }, {
        isActive: 'p' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'p'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Paragraph', 'generateblocks'),
        onClick: () => {
          setAttributes({
            element: 'p'
          });
        }
      }, {
        isActive: 'div' === element,
        icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_element_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
          level: 'div'
        }),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Div', 'generateblocks'),
        onClick: () => {
          setAttributes({
            element: 'div'
          });
        }
      }]
    }), 'Desktop' === this.getDeviceType() && !inlineWidth && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["AlignmentToolbar"], {
      value: alignment,
      onChange: value => {
        setAttributes({
          alignment: value
        });
      }
    }), 'Tablet' === this.getDeviceType() && !inlineWidthTablet && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["AlignmentToolbar"], {
      value: alignmentTablet,
      onChange: value => {
        setAttributes({
          alignmentTablet: value
        });
      }
    }), 'Mobile' === this.getDeviceType() && !inlineWidthMobile && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["AlignmentToolbar"], {
      value: alignmentMobile,
      onChange: value => {
        setAttributes({
          alignmentMobile: value
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_responsive_tabs__WEBPACK_IMPORTED_MODULE_8__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      selectedDevice: this.getDeviceType(),
      onClick: device => {
        this.setDeviceType(device);
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      id: 'headlineElement',
      state: this.state,
      showPanel: 'Desktop' === this.getDeviceType() ? true : false
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Tag Name', 'generateblocks'),
      value: element,
      options: [{
        label: 'h1',
        value: 'h1'
      }, {
        label: 'h2',
        value: 'h2'
      }, {
        label: 'h3',
        value: 'h3'
      }, {
        label: 'h4',
        value: 'h4'
      }, {
        label: 'h5',
        value: 'h5'
      }, {
        label: 'h6',
        value: 'h6'
      }, {
        label: 'paragraph',
        value: 'p'
      }, {
        label: 'div',
        value: 'div'
      }],
      onChange: value => {
        setAttributes({
          element: value
        });

        if (!marginTop && !marginRight && !marginBottom && !marginLeft) {
          if ('p' === value) {
            setAttributes({
              marginUnit: 'em'
            });
          } else {
            setAttributes({
              marginUnit: generateBlocksDefaults.headline.marginUnit
            });
          }
        }
      }
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.controls', '', 'headlineElement', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Typography', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_9__["default"])('typography'),
      className: 'gblocks-panel-label',
      id: 'headlineTypography',
      state: this.state,
      showPanel: !removeText || false
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_6__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      showFontFamily: true,
      showFontWeight: true,
      showTextTransform: true,
      showFontSize: true,
      showLineHeight: true,
      showLetterSpacing: true,
      fontSizePlaceholder: fontSizePlaceholder,
      defaultFontSize: generateBlocksDefaults.headline.fontSize,
      defaultFontSizeUnit: generateBlocksDefaults.headline.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.headline.lineHeight,
      defaultLineHeightUnit: generateBlocksDefaults.headline.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.headline.letterSpacing
    }))), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_6__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Tablet',
      showFontSize: true,
      showLineHeight: true,
      showLetterSpacing: true,
      defaultFontSize: generateBlocksDefaults.headline.fontSizeTablet,
      defaultFontSizeUnit: generateBlocksDefaults.headline.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.headline.lineHeightTablet,
      defaultLineHeightUnit: generateBlocksDefaults.headline.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.headline.letterSpacingTablet
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_typography__WEBPACK_IMPORTED_MODULE_6__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: 'Mobile',
      showFontSize: true,
      showLineHeight: true,
      showLetterSpacing: true,
      defaultFontSize: generateBlocksDefaults.headline.fontSizeMobile,
      defaultFontSizeUnit: generateBlocksDefaults.headline.fontSizeUnit,
      defaultLineHeight: generateBlocksDefaults.headline.lineHeightMobile,
      defaultLineHeightUnit: generateBlocksDefaults.headline.lineHeightUnit,
      defaultLetterSpacing: generateBlocksDefaults.headline.letterSpacingMobile
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.controls', '', 'headlineTypography', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Spacing', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_9__["default"])('spacing'),
      className: 'gblocks-panel-label',
      id: 'headlineSpacing',
      state: this.state
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline Width', 'generateblocks'),
      checked: !!inlineWidth,
      onChange: value => {
        setAttributes({
          inlineWidth: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTop',
      attrRight: 'paddingRight',
      attrBottom: 'paddingBottom',
      attrLeft: 'paddingLeft',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      block: 'headline',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTop',
      attrRight: 'marginRight',
      attrBottom: 'marginBottom',
      attrLeft: 'marginLeft',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTop',
      attrRight: 'borderSizeRight',
      attrBottom: 'borderSizeBottom',
      attrLeft: 'borderSizeLeft',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeft',
      attrRight: 'borderRadiusTopRight',
      attrBottom: 'borderRadiusBottomRight',
      attrLeft: 'borderRadiusBottomLeft',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), 'Tablet' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline Width', 'generateblocks'),
      checked: !!inlineWidthTablet,
      onChange: value => {
        setAttributes({
          inlineWidthTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopTablet',
      attrRight: 'paddingRightTablet',
      attrBottom: 'paddingBottomTablet',
      attrLeft: 'paddingLeftTablet',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      block: 'headline',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopTablet',
      attrRight: 'marginRightTablet',
      attrBottom: 'marginBottomTablet',
      attrLeft: 'marginLeftTablet',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopTablet',
      attrRight: 'borderSizeRightTablet',
      attrBottom: 'borderSizeBottomTablet',
      attrLeft: 'borderSizeLeftTablet',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftTablet',
      attrRight: 'borderRadiusTopRightTablet',
      attrBottom: 'borderRadiusBottomRightTablet',
      attrLeft: 'borderRadiusBottomLeftTablet',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), 'Mobile' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline Width', 'generateblocks'),
      checked: !!inlineWidthMobile,
      onChange: value => {
        setAttributes({
          inlineWidthMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'paddingTopMobile',
      attrRight: 'paddingRightMobile',
      attrBottom: 'paddingBottomMobile',
      attrLeft: 'paddingLeftMobile',
      attrUnit: 'paddingUnit',
      attrSyncUnits: 'paddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'margin',
      block: 'headline',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Margin', 'generateblocks'),
      attrTop: 'marginTopMobile',
      attrRight: 'marginRightMobile',
      attrBottom: 'marginBottomMobile',
      attrLeft: 'marginLeftMobile',
      attrUnit: 'marginUnit',
      attrSyncUnits: 'marginSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Size', 'generateblocks'),
      attrTop: 'borderSizeTopMobile',
      attrRight: 'borderSizeRightMobile',
      attrBottom: 'borderSizeBottomMobile',
      attrLeft: 'borderSizeLeftMobile',
      attrSyncUnits: 'borderSizeSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px']
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Radius', 'generateblocks'),
      attrTop: 'borderRadiusTopLeftMobile',
      attrRight: 'borderRadiusTopRightMobile',
      attrBottom: 'borderRadiusBottomRightMobile',
      attrLeft: 'borderRadiusBottomLeftMobile',
      attrUnit: 'borderRadiusUnit',
      attrSyncUnits: 'borderRadiusSyncUnits',
      labelTop: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Left', 'generateblocks'),
      labelRight: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('T-Right', 'generateblocks'),
      labelBottom: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Right', 'generateblocks'),
      labelLeft: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('B-Left', 'generateblocks'),
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.controls', '', 'headlineSpacing', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Colors', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_9__["default"])('colors'),
      className: 'gblocks-panel-label',
      id: 'headlineColors',
      state: this.state,
      showPanel: 'Desktop' === this.getDeviceType() || false
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Background Color', 'generateblocks'),
      value: backgroundColor,
      alpha: true,
      valueOpacity: backgroundColorOpacity,
      attrOpacity: 'backgroundColorOpacity',
      onChange: value => setAttributes({
        backgroundColor: value
      }),
      onOpacityChange: value => setAttributes({
        backgroundColorOpacity: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Text Color', 'generateblocks'),
      value: textColor,
      alpha: false,
      onChange: value => setAttributes({
        textColor: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Link Color', 'generateblocks'),
      value: linkColor,
      alpha: false,
      onChange: value => setAttributes({
        linkColor: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Link Color Hover', 'generateblocks'),
      value: linkColorHover,
      alpha: false,
      onChange: value => setAttributes({
        linkColorHover: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Border Color', 'generateblocks'),
      value: borderColor,
      alpha: true,
      valueOpacity: borderColorOpacity,
      attrOpacity: 'borderColorOpacity',
      onChange: value => setAttributes({
        borderColor: value
      }),
      onOpacityChange: value => setAttributes({
        borderColorOpacity: value
      })
    }), icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Color', 'generateblocks'),
      value: iconColor,
      alpha: true,
      valueOpacity: iconColorOpacity,
      attrOpacity: 'iconColorOpacity',
      onChange: value => setAttributes({
        iconColor: value
      }),
      onOpacityChange: value => setAttributes({
        iconColorOpacity: value
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_color_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Highlight Text', 'generateblocks'),
      value: highlightTextColor,
      alpha: false,
      onChange: value => setAttributes({
        highlightTextColor: value
      })
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon', 'generateblocks'),
      initialOpen: false,
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_9__["default"])('icons'),
      className: 'gblocks-panel-label',
      id: 'headlineIcon',
      state: this.state,
      showPanel: 'Desktop' === this.getDeviceType() || !!icon ? true : false
    }), 'Desktop' === this.getDeviceType() && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_icon_picker__WEBPACK_IMPORTED_MODULE_4__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      attrIcon: 'icon',
      attrRemoveText: 'removeText',
      attrAriaLabel: 'ariaLabel'
    })), 'Desktop' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Location', 'generateblocks'),
      value: iconLocation,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline', 'generateblocks'),
        value: 'inline'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Above', 'generateblocks'),
        value: 'above'
      }],
      onChange: value => {
        setAttributes({
          iconLocation: value,
          iconPaddingRight: 'inline' === value ? '0.5' : '',
          iconPaddingBottom: 'above' === value ? '0.5' : ''
        });
      }
    }), 'inline' === iconLocation && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Alignment', 'generateblocks'),
      value: iconVerticalAlignment,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Top', 'generateblocks'),
        value: 'top'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Bottom', 'generateblocks'),
        value: 'bottom'
      }],
      onChange: value => {
        setAttributes({
          iconVerticalAlignment: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTop',
      attrRight: 'iconPaddingRight',
      attrBottom: 'iconPaddingBottom',
      attrLeft: 'iconPaddingLeft',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSize || 0 === iconSize ? iconSize : '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      onChange: value => {
        setAttributes({
          iconSize: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSize: parseFloat(iconSize)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSize: generateBlocksDefaults.headline.iconSize
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), 'Tablet' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Location', 'generateblocks'),
      value: iconLocationTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inherit', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline', 'generateblocks'),
        value: 'inline'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Above', 'generateblocks'),
        value: 'above'
      }],
      onChange: value => {
        setAttributes({
          iconLocationTablet: value,
          iconPaddingRightTablet: 'inline' === value ? '0.5' : '',
          iconPaddingBottomTablet: 'above' === value ? '0.5' : ''
        });
      }
    }), 'inline' === iconLocationTablet && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Alignment', 'generateblocks'),
      value: iconVerticalAlignmentTablet,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inherit', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Top', 'generateblocks'),
        value: 'top'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Bottom', 'generateblocks'),
        value: 'bottom'
      }],
      onChange: value => {
        setAttributes({
          iconVerticalAlignmentTablet: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTopTablet',
      attrRight: 'iconPaddingRightTablet',
      attrBottom: 'iconPaddingBottomTablet',
      attrLeft: 'iconPaddingLeftTablet',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSizeTablet || 0 === iconSizeTablet ? iconSizeTablet : '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      placeholder: iconSize || 0 === iconSize ? iconSize : '',
      onChange: value => {
        setAttributes({
          iconSizeTablet: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSizeTablet: parseFloat(iconSizeTablet)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSizeTablet: generateBlocksDefaults.headline.iconSizeTablet
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), 'Mobile' === this.getDeviceType() && !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Location', 'generateblocks'),
      value: iconLocationMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inherit', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inline', 'generateblocks'),
        value: 'inline'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Above', 'generateblocks'),
        value: 'above'
      }],
      onChange: value => {
        setAttributes({
          iconLocationMobile: value,
          iconPaddingRightMobile: 'inline' === value ? '0.5' : '',
          iconPaddingBottomMobile: 'above' === value ? '0.5' : ''
        });
      }
    }), 'inline' === iconLocationMobile && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Alignment', 'generateblocks'),
      value: iconVerticalAlignmentMobile,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Inherit', 'generateblocks'),
        value: ''
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Top', 'generateblocks'),
        value: 'top'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Center', 'generateblocks'),
        value: 'center'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Bottom', 'generateblocks'),
        value: 'bottom'
      }],
      onChange: value => {
        setAttributes({
          iconVerticalAlignmentMobile: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_dimensions___WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      device: this.getDeviceType(),
      type: 'padding',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Padding', 'generateblocks'),
      attrTop: 'iconPaddingTopMobile',
      attrRight: 'iconPaddingRightMobile',
      attrBottom: 'iconPaddingBottomMobile',
      attrLeft: 'iconPaddingLeftMobile',
      attrUnit: 'iconPaddingUnit',
      attrSyncUnits: 'iconPaddingSyncUnits',
      defaults: generateBlocksDefaults.headline,
      units: ['px', 'em', '%']
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_unit_picker__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Icon Size', 'generateblocks'),
      value: iconSizeUnit,
      units: ['px', 'em'],
      onClick: value => {
        setAttributes({
          iconSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
      className: "components-base-control components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      type: 'number',
      value: iconSizeMobile || 0 === iconSizeMobile ? iconSizeMobile : '',
      step: 'em' === iconSizeUnit ? .1 : 1,
      placeholder: iconSizePlaceholderMobile,
      onChange: value => {
        setAttributes({
          iconSizeMobile: value
        });
      },
      onBlur: () => {
        setAttributes({
          iconSizeMobile: parseFloat(iconSizeMobile)
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        setAttributes({
          iconSizeMobile: generateBlocksDefaults.headline.iconSizeMobile
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Reset', 'generateblocks')))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.controls', '', 'headlineIcon', this.props, this.state)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_panel_area___WEBPACK_IMPORTED_MODULE_15__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Documentation', 'generateblocks'),
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_9__["default"])('documentation'),
      initialOpen: false,
      className: 'gblocks-panel-label',
      id: 'headlineDocumentation',
      state: this.state
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Need help with this block?', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("a", {
      href: "https://docs.generateblocks.com/collection/headline/",
      target: "_blank",
      rel: "noreferrer noopener"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Visit our documentation', 'generateblocks')), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.controls', '', 'headlineDocumentation', this.props, this.state))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["InspectorAdvancedControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_21__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('HTML Anchor', 'generateblocks'),
      help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Anchors lets you link directly to a section on a page.', 'generateblocks'),
      value: anchor || '',
      onChange: nextValue => {
        nextValue = nextValue.replace(ANCHOR_REGEX, '-');
        setAttributes({
          anchor: nextValue
        });
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_main_js__WEBPACK_IMPORTED_MODULE_10__["default"], this.props), this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, 'Desktop' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_desktop_js__WEBPACK_IMPORTED_MODULE_11__["default"], this.props), ('Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType) && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_js__WEBPACK_IMPORTED_MODULE_12__["default"], this.props), 'Tablet' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_tablet_only_js__WEBPACK_IMPORTED_MODULE_13__["default"], this.props), 'Mobile' === this.props.deviceType && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_css_mobile_js__WEBPACK_IMPORTED_MODULE_14__["default"], this.props)), fontFamily && googleFont && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("link", {
      rel: "stylesheet",
      href: 'https://fonts.googleapis.com/css?family=' + fontFamily.replace(/ /g, '+') + googleFontsAttr
    }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.beforeHeadlineElement', '', this.props), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_16__["default"], {
      tagName: element,
      htmlAttrs: htmlAttributes
    }, hasIcon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-icon",
      "aria-label": !!removeText && !!ariaLabel ? ariaLabel : undefined,
      dangerouslySetInnerHTML: {
        __html: icon
      }
    }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("span", {
      className: "gb-headline-text"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["RichText"], {
      tagName: "span",
      value: content,
      onChange: value => setAttributes({
        content: value
      }),
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Headline', 'generateblocks'),
      keepPlaceholderOnFocus: true,
      allowedFormats: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.headlineDisableFormatting', false, this.props) ? [] : null
    }))), !hasIcon && !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_22__["RichText"], {
      tagName: "span",
      value: content,
      onChange: value => setAttributes({
        content: value
      }),
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_20__["__"])('Headline', 'generateblocks'),
      keepPlaceholderOnFocus: true,
      allowedFormats: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('generateblocks.editor.headlineDisableFormatting', false, this.props) ? [] : null
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_25__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_24__["withDispatch"])(dispatch => ({
  setDeviceType(type) {
    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType
    } = dispatch('core/edit-post');

    if (!setPreviewDeviceType) {
      return;
    }

    setPreviewDeviceType(type);
  }

})), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_24__["withSelect"])(select => {
  const {
    __experimentalGetPreviewDeviceType: getPreviewDeviceType
  } = select('core/edit-post');

  if (!getPreviewDeviceType) {
    return {
      deviceType: null
    };
  }

  return {
    deviceType: getPreviewDeviceType()
  };
})])(GenerateBlockHeadline));

/***/ }),

/***/ "./src/blocks/headline/editor.scss":
/*!*****************************************!*\
  !*** ./src/blocks/headline/editor.scss ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/headline/element-icons.js":
/*!**********************************************!*\
  !*** ./src/blocks/headline/element-icons.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeadingLevelIcon; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

/**
 * HeadingLevelIcon props.
 *
 * @typedef WPHeadingLevelIconProps
 *
 * @property {number}   level     The heading level to show an icon for.
 * @property {?boolean} isPressed Whether or not the icon should appear pressed; default: false.
 */

/**
 * Heading level icon.
 *
 * @param {WPHeadingLevelIconProps} props Component props.
 *
 * @return {?WPComponent} The icon.
 */

function HeadingLevelIcon({
  level
}) {
  const levelToPath = {
    h1: 'M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z',
    h2: 'M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z',
    h3: 'M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z',
    h4: 'M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z',
    h5: 'M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z',
    h6: 'M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z',
    p: 'M7.411 18V6.005h3.887c1.474 0 2.429.067 2.881.184.687.185 1.257.57 1.726 1.173.452.603.687 1.374.687 2.329 0 .737-.135 1.357-.403 1.86-.268.502-.603.904-1.021 1.189-.403.284-.821.469-1.257.57-.57.117-1.407.167-2.496.167H9.823V18H7.411zm2.412-9.968v3.401h1.324c.955 0 1.591-.05 1.926-.184.319-.118.57-.319.754-.587.185-.268.268-.57.268-.938 0-.435-.117-.787-.385-1.072a1.607 1.607 0 00-.972-.536c-.284-.05-.87-.084-1.742-.084H9.823z',
    div: 'M6.969 6.005h4.423c1.005 0 1.759.084 2.295.235.703.2 1.306.57 1.809 1.105.503.52.871 1.173 1.14 1.944.267.754.385 1.708.385 2.83 0 .99-.118 1.844-.369 2.547-.302.871-.72 1.592-1.273 2.128-.419.402-.989.72-1.709.955-.536.167-1.24.251-2.144.251H6.969V6.005zm2.43 2.027v7.94h1.808c.67 0 1.156-.033 1.458-.1.402-.1.72-.268.972-.502.268-.235.485-.62.636-1.156.168-.536.251-1.273.251-2.195 0-.938-.083-1.641-.25-2.144-.152-.486-.386-.888-.688-1.156-.285-.285-.67-.469-1.122-.57-.335-.067-.989-.117-1.977-.117H9.398z'
  };

  if (!levelToPath.hasOwnProperty(level)) {
    return null;
  }

  let viewBox = '0 0 20 20';

  if ('p' === level || 'div' === level) {
    viewBox = '0 0 24 24';
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["SVG"], {
    width: "24",
    height: "24",
    viewBox: viewBox,
    xmlns: "http://www.w3.org/2000/svg"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Path"], {
    d: levelToPath[level]
  }));
}

/***/ }),

/***/ "./src/blocks/headline/markformat.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/markformat.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);







const icon = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg",
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinejoin: "round",
  strokeMiterlimit: "1.414"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M4.331,15.598l2.193,1.693c0,0 -0.813,1.215 -0.992,1.215c-1.129,0.003 -1.424,0.008 -2.603,-0.001c-0.741,-0.006 -0.04,-0.955 0.187,-1.269c0.502,-0.694 1.215,-1.638 1.215,-1.638Zm7.632,-14.107c0.364,-0.061 5.412,3.896 5.439,4.272c0.031,0.438 -4.887,8.469 -5.635,9.648c-0.251,0.397 -1.185,0.206 -2.064,0.472c-0.801,0.243 -1.89,1.336 -2.193,1.105c-1.047,-0.796 -2.217,-1.646 -3.117,-2.49c-0.367,-0.343 0.388,-1.241 0.405,-2.188c0.015,-0.811 -0.644,-2.029 -0.196,-2.575c0.836,-1.019 6.931,-8.172 7.361,-8.244Zm0.144,1.454l3.95,3.105l-4.972,8.1l-5.197,-4.053l6.219,-7.152Z"
}));
const name = 'generateblocks/mark';

const GenerateBlocksMarkHightlightButton = function (props) {
  const onToggle = () => props.onChange(Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_2__["toggleFormat"])(props.value, {
    type: name
  }));

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["RichTextShortcut"], {
    type: "primary",
    character: "m",
    onUse: onToggle
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["RichTextToolbarButton"], {
    icon: icon,
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Highlight', 'generateblocks'),
    onClick: onToggle,
    isActive: props.isActive,
    shortcutType: "access",
    shortcutCharacter: "m",
    className: `toolbar-button-with-text toolbar-button__${name}`
  }));
};

const ConditionalButton = Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__["compose"])(Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["withSelect"])(function (select) {
  return {
    selectedBlock: select('core/block-editor').getSelectedBlock()
  };
}), Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__["ifCondition"])(function (props) {
  return props.selectedBlock && props.selectedBlock.name === 'generateblocks/headline';
}))(GenerateBlocksMarkHightlightButton);
const GenerateBlocksMarkHighlight = {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Highlight', 'generateblocks'),
  tagName: 'mark',
  className: 'gb-highlight',
  edit: ConditionalButton
};
Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_2__["registerFormatType"])(name, GenerateBlocksMarkHighlight);

/***/ }),

/***/ "./src/blocks/headline/save.js":
/*!*************************************!*\
  !*** ./src/blocks/headline/save.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/element */ "./src/components/element/index.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);


/**
 * Block: Headline
 */




/* harmony default export */ __webpack_exports__["default"] = (({
  attributes
}) => {
  const {
    uniqueId,
    className,
    anchor,
    element,
    content,
    icon,
    removeText,
    ariaLabel
  } = attributes;
  let htmlAttributes = {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'gb-headline': true,
      [`gb-headline-${uniqueId}`]: true,
      'gb-headline-text': !icon,
      [className]: undefined !== className
    }),
    id: anchor ? anchor : null
  };
  htmlAttributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_element__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tagName: element,
    htmlAttrs: htmlAttributes
  }, !!icon && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: "gb-icon",
    "aria-label": !!removeText && !!ariaLabel ? ariaLabel : undefined,
    dangerouslySetInnerHTML: {
      __html: icon
    }
  }), !removeText && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["RichText"].Content, {
    value: content,
    tagName: !!icon ? 'span' : null,
    className: !!icon ? 'gb-headline-text' : null
  }));
});

/***/ }),

/***/ "./src/blocks/headline/transforms.js":
/*!*******************************************!*\
  !*** ./src/blocks/headline/transforms.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const transforms = {
  from: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: ({
      content
    }) => {
      return Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["createBlock"])('generateblocks/headline', {
        content
      });
    }
  }, {
    type: 'block',
    blocks: ['core/heading'],
    transform: ({
      content
    }) => {
      return Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["createBlock"])('generateblocks/headline', {
        content
      });
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: ({
      content
    }) => {
      return Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["createBlock"])('core/paragraph', {
        content
      });
    }
  }, {
    type: 'block',
    blocks: ['core/heading'],
    transform: ({
      content
    }) => {
      return Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["createBlock"])('core/heading', {
        content
      });
    }
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (transforms);

/***/ }),

/***/ "./src/components/apply-filters/index.js":
/*!***********************************************!*\
  !*** ./src/components/apply-filters/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplyFilters; });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * Component Class
 */

class ApplyFilters extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  render() {
    const {
      name,
      children
    } = this.props;
    return Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__["applyFilters"])(name, children || '', this.props);
  }

}

/***/ }),

/***/ "./src/components/color-picker/editor.scss":
/*!*************************************************!*\
  !*** ./src/components/color-picker/editor.scss ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/color-picker/index.js":
/*!**********************************************!*\
  !*** ./src/components/color-picker/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GenerateBlocksColorPicker; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/hex-to-rgba */ "./src/utils/hex-to-rgba/index.js");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/components/color-picker/editor.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);



 // Import CSS






class GenerateBlocksColorPicker extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      colorKey: false
    };
  }

  render() {
    const {
      value,
      onChange,
      onOpacityChange,
      label,
      alpha = false,
      valueOpacity
    } = this.props;
    const {
      colorKey
    } = this.state;

    const toggleVisible = () => {
      this.setState({
        isVisible: true
      });
    };

    const toggleClose = () => {
      if (this.state.isVisible === true) {
        this.setState({
          isVisible: false
        });
      }
    };

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      className: "gblocks-component-color-picker-wrapper"
    }, !!label && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-color-component-label"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", null, label)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-color-picker-area"
    }, !this.state.isVisible && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Choose Color', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      type: "button",
      "aria-expanded": this.state.isVisible,
      className: "components-color-palette__item components-circular-option-picker__option",
      onClick: toggleVisible,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Custom color picker', 'generateblocks'),
      style: {
        color: value ? Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__["default"])(value, valueOpacity) : 'transparent'
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-color-palette__custom-color-gradient"
    })))), this.state.isVisible && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Choose Color', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      type: "button",
      "aria-expanded": this.state.isVisible,
      className: "components-color-palette__item components-circular-option-picker__option",
      onClick: toggleClose,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Custom color picker', 'generateblocks'),
      style: {
        color: value ? Object(_utils_hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__["default"])(value, valueOpacity) : 'transparent'
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-color-palette__custom-color-gradient"
    })))), this.state.isVisible && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Popover"], {
      position: "top left",
      className: "gblocks-component-color-picker",
      onClose: toggleClose
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      key: colorKey
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["ColorPicker"], {
      key: colorKey,
      color: value ? value : '',
      onChangeComplete: color => {
        let colorString;

        if ('undefined' === typeof color.rgb || color.rgb.a === 1) {
          colorString = color.hex;
        } else {
          const {
            r,
            g,
            b,
            a
          } = color.rgb;
          colorString = `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        onChange(colorString);
      },
      disableAlpha: !alpha || 1 !== valueOpacity
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-color-input-wrapper"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      className: "gblocks-color-input",
      type: 'text',
      value: value || '',
      onChange: color => {
        onChange(color);
      },
      onBlur: () => {
        this.setState({
          colorKey: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-color-clear-color",
      onClick: () => {
        onChange('');
        onOpacityChange(1);
        this.setState({
          colorKey: false
        });
        setTimeout(function () {
          document.querySelector('.gblocks-color-input-wrapper input').focus();
        }, 10);
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Clear Color', 'generateblocks')))), alpha && 1 !== valueOpacity && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-component-color-opacity"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Opacity', 'generateblocks')
    }, Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_3__["default"])('gradient')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["RangeControl"], {
      value: valueOpacity ? valueOpacity : 0,
      onChange: opacityValue => onOpacityChange(opacityValue),
      min: 0,
      max: 1,
      step: 0.01,
      initialPosition: 1
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      className: "gblocks-component-color-picker-palette"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__["ColorPalette"], {
      value: value,
      onChange: color => {
        onChange(color);
        this.setState({
          colorKey: color
        });
        setTimeout(function () {
          document.querySelector('.gblocks-color-input-wrapper input').focus();
        }, 10);
      },
      disableCustomColors: true,
      clearable: false
    })))));
  }

}

/***/ }),

/***/ "./src/components/dimensions/editor.scss":
/*!***********************************************!*\
  !*** ./src/components/dimensions/editor.scss ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/dimensions/index.js":
/*!********************************************!*\
  !*** ./src/components/dimensions/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/components/dimensions/editor.scss");
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);


/**
 * External dependencies
 */




/**
 * WordPress dependencies
 */





class DimensionsControl extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super(...arguments);
    this.onChangeTop = this.onChangeTop.bind(this);
    this.onChangeRight = this.onChangeRight.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.onChangeLeft = this.onChangeLeft.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.syncUnits = this.syncUnits.bind(this);
    this.onChangeUnits = this.onChangeUnits.bind(this);
  }

  onReset(type) {
    this.props.setAttributes({
      [this.props[type]]: ''
    });
  }

  onChangeTop(value) {
    this.props.setAttributes({
      [this.props['attrTop']]: value
    }); // eslint-disable-line dot-notation
  }

  onChangeRight(value) {
    this.props.setAttributes({
      [this.props['attrRight']]: value
    }); // eslint-disable-line dot-notation
  }

  onChangeBottom(value) {
    this.props.setAttributes({
      [this.props['attrBottom']]: value
    }); // eslint-disable-line dot-notation
  }

  onChangeLeft(value) {
    this.props.setAttributes({
      [this.props['attrLeft']]: value
    }); // eslint-disable-line dot-notation
  }

  onChangeAll(value) {
    this.props.setAttributes({
      [this.props['attrTop']]: value,
      [this.props['attrRight']]: value,
      [this.props['attrBottom']]: value,
      [this.props['attrLeft']]: value
    }); // eslint-disable-line dot-notation
  }

  syncUnits() {
    const numbers = [this.props.attributes[this.props.attrTop], this.props.attributes[this.props.attrRight], this.props.attributes[this.props.attrBottom], this.props.attributes[this.props.attrLeft]];
    const syncValue = Math.max.apply(null, numbers);
    this.props.setAttributes({
      [this.props['attrSyncUnits']]: !this.props.attributes[this.props.attrSyncUnits],
      // eslint-disable-line dot-notation
      [this.props['attrTop']]: syncValue.toString(),
      [this.props['attrRight']]: syncValue.toString(),
      [this.props['attrBottom']]: syncValue.toString(),
      [this.props['attrLeft']]: syncValue.toString() // eslint-disable-line dot-notation

    });
  }

  onChangeUnits(value) {
    this.props.setAttributes({
      [this.props['attrUnit']]: value
    }); // eslint-disable-line dot-notation
  }

  render() {
    const {
      attributes,
      label = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Margin', 'generateblocks'),
      type = 'margin',
      attrTop,
      attrRight,
      attrBottom,
      attrLeft,
      attrSyncUnits,
      attrUnit,
      labelTop = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Top', 'generateblocks'),
      labelRight = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Right', 'generateblocks'),
      labelBottom = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Bottom', 'generateblocks'),
      labelLeft = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Left', 'generateblocks'),
      device,
      block,
      defaults,
      units
    } = this.props;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-base-control', 'components-gblocks-dimensions-control');

    const onChangeTopValue = event => {
      let newValue = event.target.value;

      if ('padding' === type) {
        // No negative values allowed here.
        newValue = newValue.toString().replace(/-/g, '');
      }

      if ('' === newValue) {
        this.onReset('attrTop');
        return;
      }

      if (this.props.attributes[this.props.attrSyncUnits]) {
        this.onChangeAll(newValue);
      } else {
        this.onChangeTop(newValue);
      }
    };

    const onChangeRightValue = event => {
      let newValue = event.target.value;

      if ('padding' === type) {
        // No negative values allowed here.
        newValue = newValue.toString().replace(/-/g, '');
      }

      if ('' === newValue) {
        this.onReset('attrRight');
        return;
      }

      if (this.props.attributes[this.props.attrSyncUnits]) {
        this.onChangeAll(newValue);
      } else {
        this.onChangeRight(newValue);
      }
    };

    const onChangeBottomValue = event => {
      let newValue = event.target.value;

      if ('padding' === type) {
        // No negative values allowed here.
        newValue = newValue.toString().replace(/-/g, '');
      }

      if ('' === newValue) {
        this.onReset('attrBottom');
        return;
      }

      if (this.props.attributes[this.props.attrSyncUnits]) {
        this.onChangeAll(newValue);
      } else {
        this.onChangeBottom(newValue);
      }
    };

    const onChangeLeftValue = event => {
      let newValue = event.target.value;

      if ('padding' === type) {
        // No negative values allowed here.
        newValue = newValue.toString().replace(/-/g, '');
      }

      if ('' === newValue) {
        this.onReset('attrLeft');
        return;
      }

      if (this.props.attributes[this.props.attrSyncUnits]) {
        this.onChangeAll(newValue);
      } else {
        this.onChangeLeft(newValue);
      }
    };

    let topPlaceholder = '',
        rightPlaceholder = '',
        bottomPlaceholder = '',
        leftPlaceholder = '';

    if ('headline' === block && attrBottom.includes('marginBottom')) {
      if ('px' === this.props.attributes.marginUnit) {
        const headlineId = document.querySelector('.gb-headline-' + this.props.attributes.uniqueId);

        if (headlineId) {
          bottomPlaceholder = parseFloat(window.getComputedStyle(headlineId).marginBottom);
        }
      } else if ('em' === this.props.attributes.marginUnit && 'undefined' !== typeof generateBlocksStyling.headline) {
        if ('undefined' !== typeof generateBlocksStyling.headline[attributes.element] && 'undefined' !== typeof generateBlocksStyling.headline[attributes.element].marginBottom) {
          if (generateBlocksStyling.headline[attributes.element].marginUnit === attributes.marginUnit) {
            bottomPlaceholder = generateBlocksStyling.headline[attributes.element].marginBottom;
          }
        }
      }

      if ('div' === this.props.attributes.element || 'span' === this.props.attributes.element) {
        bottomPlaceholder = '';
      }
    }

    if ('Tablet' === device) {
      const topAttrName = attrTop.replace('Tablet', ''),
            rightAttrName = attrRight.replace('Tablet', ''),
            bottomAttrName = attrBottom.replace('Tablet', ''),
            leftAttrName = attrLeft.replace('Tablet', '');
      topPlaceholder = attributes[topAttrName] ? attributes[topAttrName] : topPlaceholder;
      rightPlaceholder = attributes[rightAttrName] ? attributes[rightAttrName] : rightPlaceholder;
      bottomPlaceholder = attributes[bottomAttrName] ? attributes[bottomAttrName] : bottomPlaceholder;
      leftPlaceholder = attributes[leftAttrName] ? attributes[leftAttrName] : leftPlaceholder;
    }

    if ('Mobile' === device) {
      const topAttrName = attrTop.replace('Mobile', ''),
            rightAttrName = attrRight.replace('Mobile', ''),
            bottomAttrName = attrBottom.replace('Mobile', ''),
            leftAttrName = attrLeft.replace('Mobile', '');

      if (attributes[topAttrName + 'Tablet']) {
        topPlaceholder = attributes[topAttrName + 'Tablet'];
      } else if (attributes[topAttrName]) {
        topPlaceholder = attributes[topAttrName];
      }

      if (attributes[rightAttrName + 'Tablet']) {
        rightPlaceholder = attributes[rightAttrName + 'Tablet'];
      } else if (attributes[rightAttrName]) {
        rightPlaceholder = attributes[rightAttrName];
      }

      if (attributes[bottomAttrName + 'Tablet']) {
        bottomPlaceholder = attributes[bottomAttrName + 'Tablet'];
      } else if (attributes[bottomAttrName]) {
        bottomPlaceholder = attributes[bottomAttrName];
      }

      if (attributes[leftAttrName + 'Tablet']) {
        leftPlaceholder = attributes[leftAttrName + 'Tablet'];
      } else if (attributes[leftAttrName]) {
        leftPlaceholder = attributes[leftAttrName];
      }
    }

    const usingGlobalStyle = 'undefined' !== typeof attributes.useGlobalStyle && attributes.useGlobalStyle;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: classes
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: label,
      value: 'undefined' !== typeof attributes[attrUnit] ? attributes[attrUnit] : 'px',
      units: units,
      onClick: value => {
        if ('undefined' !== typeof attributes[attrUnit]) {
          this.onChangeUnits(value);
        } else {
          return false;
        }
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-dimensions-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      className: "components-gblocks-dimensions-control__number",
      placeholder: topPlaceholder,
      type: "number",
      onChange: onChangeTopValue,
      onBlur: () => {
        if (!usingGlobalStyle && '' === attributes[attrTop] && '' !== defaults[attrTop]) {
          // If we have no value and a default exists, set to 0 to prevent default from coming back.
          if (this.props.attributes[this.props.attrSyncUnits]) {
            this.onChangeAll('0');
          } else {
            this.onChangeTop('0');
          }
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
      /* translators: Dimension label (padding, margin, border) */
      ,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('%s Top', 'generateblocks'), label),
      value: attributes[attrTop] ? attributes[attrTop] : '',
      min: type === 'padding' ? 0 : undefined,
      "data-attribute": type
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      className: "components-gblocks-dimensions-control__number",
      placeholder: rightPlaceholder,
      type: "number",
      onChange: onChangeRightValue,
      onBlur: () => {
        if (!usingGlobalStyle && '' === attributes[attrRight] && '' !== defaults[attrRight]) {
          // If we have no value and a default exists, set to 0 to prevent default from coming back.
          if (this.props.attributes[this.props.attrSyncUnits]) {
            this.onChangeAll('0');
          } else {
            this.onChangeRight('0');
          }
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
      /* translators: Dimension label (padding, margin, border) */
      ,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('%s Right', 'generateblocks'), label),
      value: attributes[attrRight] ? attributes[attrRight] : '',
      min: type === 'padding' ? 0 : undefined,
      "data-attribute": type
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      className: "components-gblocks-dimensions-control__number",
      placeholder: bottomPlaceholder,
      type: "number",
      onChange: onChangeBottomValue,
      onBlur: () => {
        if (!usingGlobalStyle && '' === attributes[attrBottom] && '' !== defaults[attrBottom]) {
          // If we have no value and a default exists, set to 0 to prevent default from coming back.
          if (this.props.attributes[this.props.attrSyncUnits]) {
            this.onChangeAll('0');
          } else {
            this.onChangeBottom('0');
          }
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
      /* translators: Dimension label (padding, margin, border) */
      ,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('%s Bottom', 'generateblocks'), label),
      value: attributes[attrBottom] ? attributes[attrBottom] : '',
      min: type === 'padding' ? 0 : undefined,
      "data-attribute": type
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
      className: "components-gblocks-dimensions-control__number",
      placeholder: leftPlaceholder,
      type: "number",
      onChange: onChangeLeftValue,
      onBlur: () => {
        if (!usingGlobalStyle && '' === attributes[attrLeft] && '' !== defaults[attrLeft]) {
          // If we have no value and a default exists, set to 0 to prevent default from coming back.
          if (this.props.attributes[this.props.attrSyncUnits]) {
            this.onChangeAll('0');
          } else {
            this.onChangeLeft('0');
          }
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
      /* translators: Dimension label (padding, margin, border) */
      ,
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('%s Left', 'generateblocks'), label),
      value: attributes[attrLeft] ? attributes[attrLeft] : '',
      min: type === 'padding' ? 0 : undefined,
      "data-attribute": type
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
      text: !!attributes[attrSyncUnits] ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Unsync', 'generateblocks') : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Sync', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      className: "components-gblocks-dimensions-control_sync",
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Sync Units', 'generateblocks'),
      isPrimary: attributes[attrSyncUnits] ? attributes[attrSyncUnits] : false,
      "aria-pressed": attributes[attrSyncUnits] ? attributes[attrSyncUnits] : false,
      onClick: value => this.syncUnits(value, ''),
      isSmall: true
    }, !!attributes[attrSyncUnits] ? Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_3__["default"])('sync') : Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_3__["default"])('sync')))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-dimensions-control__input-labels"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-gblocks-dimensions-control__number-label"
    }, labelTop), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-gblocks-dimensions-control__number-label"
    }, labelRight), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-gblocks-dimensions-control__number-label"
    }, labelBottom), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-gblocks-dimensions-control__number-label"
    }, labelLeft), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-gblocks-dimensions-control__number-label"
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (DimensionsControl);

/***/ }),

/***/ "./src/components/element/index.js":
/*!*****************************************!*\
  !*** ./src/components/element/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function Element({
  tagName,
  htmlAttrs,
  children
}) {
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(tagName, htmlAttrs, children);
}

/***/ }),

/***/ "./src/components/gradient/editor.scss":
/*!*********************************************!*\
  !*** ./src/components/gradient/editor.scss ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/gradient/index.js":
/*!******************************************!*\
  !*** ./src/components/gradient/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/gradient/editor.scss");
/* harmony import */ var _color_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../color-picker */ "./src/components/color-picker/index.js");
/* harmony import */ var _utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/has-numeric-value */ "./src/utils/has-numeric-value/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);


/**
 * Internal dependencies
 */



/**
 * WordPress dependencies
 */




/**
 * Typography Component
 */

class GradientControl extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const {
      attributes,
      setAttributes,
      attrGradient,
      attrGradientDirection,
      attrGradientColorOne,
      attrGradientColorOneOpacity,
      attrGradientColorStopOne,
      attrGradientColorTwo,
      attrGradientColorTwoOpacity,
      attrGradientColorStopTwo,
      defaultColorOne,
      defaultColorTwo
    } = this.props;
    const {
      gradientSelector,
      innerZindex
    } = attributes;
    const selectorHelp = 'element' === gradientSelector ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Displays behind the background image.', 'generateblocks') : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Displays in front of the background image.', 'generateblocks');
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Use Gradient', 'generateblocks'),
      checked: !!attributes[attrGradient],
      onChange: value => {
        setAttributes({
          [this.props['attrGradient']]: value // eslint-disable-line dot-notation

        });
      }
    }), !!attributes[attrGradient] && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, 'undefined' !== typeof gradientSelector && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Selector', 'generateblocks'),
      help: selectorHelp,
      value: gradientSelector,
      options: [{
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Element', 'generateblocks'),
        value: 'element'
      }, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Pseudo Element', 'generateblocks'),
        value: 'pseudo-element'
      }],
      onChange: value => {
        setAttributes({
          gradientSelector: value
        });

        if (!Object(_utils_has_numeric_value__WEBPACK_IMPORTED_MODULE_3__["default"])(innerZindex) && 'pseudo-element' === value) {
          setAttributes({
            innerZindex: 1
          });
        }
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Direction', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["RangeControl"], {
      value: attributes[attrGradientDirection] ? attributes[attrGradientDirection] : 1,
      onChange: value => {
        setAttributes({
          [attrGradientDirection]: value
        });
      },
      min: 0,
      max: 360,
      step: 1,
      initialPosition: 90
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Color One', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-component-gradient-control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_color_picker__WEBPACK_IMPORTED_MODULE_2__["default"], {
      value: attributes[attrGradientColorOne],
      alpha: true,
      valueOpacity: attributes[attrGradientColorOneOpacity],
      attrOpacity: 'gradientColorOneOpacity',
      onChange: value => setAttributes({
        [attrGradientColorOne]: value
      }),
      onOpacityChange: value => setAttributes({
        [attrGradientColorOneOpacity]: value
      }),
      onClear: () => setAttributes({
        [attrGradientColorOne]: defaultColorOne
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["TextControl"], {
      className: 'gblocks-component-gradient-stop-value',
      type: 'text',
      value: attributes[attrGradientColorStopOne] || 0 === attributes[attrGradientColorStopOne] ? attributes[attrGradientColorStopOne] : '',
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Stop position (%)', 'generateblocks'),
      onChange: value => {
        setAttributes({
          [attrGradientColorStopOne]: value
        });
      },
      onBlur: () => {
        if (attributes[attrGradientColorStopOne] || 0 === attributes[attrGradientColorStopOne]) {
          setAttributes({
            [attrGradientColorStopOne]: parseFloat(attributes[attrGradientColorStopOne])
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Color Two', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-component-gradient-control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_color_picker__WEBPACK_IMPORTED_MODULE_2__["default"], {
      value: attributes[attrGradientColorTwo],
      alpha: true,
      valueOpacity: attributes[attrGradientColorTwoOpacity],
      attrOpacity: 'gradientColorTwoOpacity',
      onChange: value => setAttributes({
        [attrGradientColorTwo]: value
      }),
      onOpacityChange: value => setAttributes({
        [attrGradientColorTwoOpacity]: value
      }),
      onClear: () => setAttributes({
        [attrGradientColorTwo]: defaultColorTwo
      })
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["TextControl"], {
      className: 'gblocks-component-gradient-stop-value',
      type: 'text',
      value: attributes[attrGradientColorStopTwo] || 0 === attributes[attrGradientColorStopTwo] ? attributes[attrGradientColorStopTwo] : '',
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Stop position (%)', 'generateblocks'),
      onChange: value => {
        setAttributes({
          [attrGradientColorStopTwo]: value
        });
      },
      onBlur: () => {
        if (attributes[attrGradientColorStopTwo] || 0 === attributes[attrGradientColorStopTwo]) {
          setAttributes({
            [attrGradientColorStopTwo]: parseFloat(attributes[attrGradientColorStopTwo])
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      }
    })))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (GradientControl);

/***/ }),

/***/ "./src/components/icon-picker/editor.scss":
/*!************************************************!*\
  !*** ./src/components/icon-picker/editor.scss ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/icon-picker/index.js":
/*!*********************************************!*\
  !*** ./src/components/icon-picker/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/icon-picker/editor.scss");
/* harmony import */ var _svgs_social__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgs-social */ "./src/components/icon-picker/svgs-social.js");
/* harmony import */ var _svgs_general__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svgs-general */ "./src/components/icon-picker/svgs-general.js");
/* harmony import */ var _utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/sanitize-svg */ "./src/utils/sanitize-svg/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__);


/**
 * Internal dependencies
 */




/**
 * WordPress dependencies
 */





/**
 * Typography Component
 */

class IconPicker extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      showIcons: false,
      showGeneralIcons: false,
      showSocialIcons: false
    };
  }

  render() {
    const {
      attributes,
      setAttributes,
      attrIcon,
      attrIconLocation,
      locationOptions,
      attrRemoveText
    } = this.props;
    let iconSVGSets = {
      general: {
        group: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('General', 'generateblocks'),
        svgs: _svgs_general__WEBPACK_IMPORTED_MODULE_3__["default"]
      },
      social: {
        group: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Social', 'generateblocks'),
        svgs: _svgs_social__WEBPACK_IMPORTED_MODULE_2__["default"]
      }
    };
    iconSVGSets = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__["applyFilters"])('generateblocks.editor.iconSVGSets', iconSVGSets);
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      className: "gb-svg-html"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Icon SVG HTML', 'generateblocks'),
      value: attributes[attrIcon],
      onChange: value => {
        setAttributes({
          [this.props['attrIcon']]: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__["default"])(value) // eslint-disable-line dot-notation

        });

        if ('' !== value) {
          setAttributes({
            'hasIcon': true // eslint-disable-line quote-props

          });
        } else {
          setAttributes({
            'hasIcon': false // eslint-disable-line quote-props

          });
        }
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gb-icon-preview"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      dangerouslySetInnerHTML: {
        __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__["default"])(attributes[attrIcon])
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      isSmall: true,
      className: "reset-icon is-secondary",
      onClick: () => {
        setAttributes({
          [this.props['attrIcon']]: '',
          // eslint-disable-line dot-notation
          'hasIcon': false // eslint-disable-line quote-props

        });
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "editor-block-types-list__item-icon"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Clear', 'generateblocks'))))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      className: "gb-icon-chooser"
    }, Object.keys(iconSVGSets).map((svg, i) => {
      const svgItems = iconSVGSets[svg].svgs;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["PanelBody"], {
        title: iconSVGSets[svg].group,
        initialOpen: false,
        key: i
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["PanelRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", {
        className: "gblocks-icon-chooser"
      }, Object.keys(svgItems).map((svgItem, index) => {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("li", {
          key: `editor-pblock-types-list-item-${index}`
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
          text: svgItems[svgItem].label
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
          className: "editor-block-list-item-button",
          onClick: () => {
            let iconValue = svgItems[svgItem].icon;

            if ('string' !== typeof iconValue) {
              iconValue = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["renderToString"])(iconValue);
            }

            setAttributes({
              [this.props.attrIcon]: iconValue,
              hasIcon: true
            });
          }
        }, 'string' === typeof svgItems[svgItem].icon ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
          className: "editor-block-types-list__item-icon",
          dangerouslySetInnerHTML: {
            __html: Object(_utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_4__["default"])(svgItems[svgItem].icon)
          }
        })) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
          className: "editor-block-types-list__item-icon"
        }, svgItems[svgItem].icon)))));
      })))));
    })), typeof attributes[attrIconLocation] !== 'undefined' && !attributes[attrRemoveText] && !!attributes[attrIcon] && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Icon Location', 'generateblocks'),
      value: attributes[attrIconLocation],
      options: locationOptions,
      onChange: value => {
        const leftPadding = attributes.iconPaddingLeft,
              rightPadding = attributes.iconPaddingRight,
              rightPaddingTablet = attributes.iconPaddingRightTablet,
              leftPaddingTablet = attributes.iconPaddingLeftTablet,
              rightPaddingMobile = attributes.iconPaddingRightMobile,
              leftPaddingMobile = attributes.iconPaddingLeftMobile;

        if ('right' === value) {
          if (!leftPadding && rightPadding) {
            setAttributes({
              iconPaddingLeft: rightPadding,
              iconPaddingRight: ''
            });
          }

          if (!leftPaddingTablet && rightPaddingTablet) {
            setAttributes({
              iconPaddingLeftTablet: rightPaddingTablet,
              iconPaddingRightTablet: ''
            });
          }

          if (!leftPaddingMobile && rightPaddingMobile) {
            setAttributes({
              iconPaddingLeftMobile: rightPaddingMobile,
              iconPaddingRightMobile: ''
            });
          }
        }

        if ('left' === value) {
          if (!rightPadding && leftPadding) {
            setAttributes({
              iconPaddingRight: leftPadding,
              iconPaddingLeft: ''
            });
          }

          if (!rightPaddingTablet && leftPaddingTablet) {
            setAttributes({
              iconPaddingRightTablet: leftPaddingTablet,
              iconPaddingLeftTablet: ''
            });
          }

          if (!rightPaddingMobile && leftPaddingMobile) {
            setAttributes({
              iconPaddingRightMobile: leftPaddingMobile,
              iconPaddingLeftMobile: ''
            });
          }
        }

        setAttributes({
          [this.props['attrIconLocation']]: value // eslint-disable-line dot-notation

        });
      }
    }), typeof attributes[attrRemoveText] !== 'undefined' && !!attributes[attrIcon] && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Remove Text', 'generateblocks'),
      checked: !!attributes[attrRemoveText],
      onChange: value => {
        setAttributes({
          [this.props['attrRemoveText']]: value // eslint-disable-line dot-notation

        });
      }
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (IconPicker);

/***/ }),

/***/ "./src/components/icon-picker/svgs-general.js":
/*!****************************************************!*\
  !*** ./src/components/icon-picker/svgs-general.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const svgs = {
  clock: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Clock', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm92.49 313l-20 25a16 16 0 01-22.49 2.5l-67-49.72a40 40 0 01-15-31.23V112a16 16 0 0116-16h32a16 16 0 0116 16v144l58 42.5a16 16 0 012.49 22.5z"
    }))
  },
  clockAlt: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Clock Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
    }))
  },
  asterisk: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Asterisk', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
    }))
  },
  at: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('At', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"
    }))
  },
  award: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Award', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 384 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z"
    }))
  },
  ban: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Ban', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"
    }))
  },
  bars: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Bars', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
    }))
  },
  beer: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Beer', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M368 96h-48V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56v400c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24v-42.11l80.606-35.977C429.396 365.063 448 336.388 448 304.86V176c0-44.112-35.888-80-80-80zm16 208.86a16.018 16.018 0 0 1-9.479 14.611L320 343.805V160h48c8.822 0 16 7.178 16 16v128.86zM208 384c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16zm-96 0c-8.836 0-16-7.164-16-16V144c0-8.836 7.164-16 16-16s16 7.164 16 16v224c0 8.836-7.164 16-16 16z"
    }))
  },
  bolt: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Bolt', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 320 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"
    }))
  },
  book: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Book', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"
    }))
  },
  boxOpen: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Box - Open', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 640 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"
    }))
  },
  bullhorn: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Bullhorn', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 576 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"
    }))
  },
  bullseye: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Bullseye', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 496 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"
    }))
  },
  burn: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Burn', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 384 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M192 0C79.7 101.3 0 220.9 0 300.5 0 425 79 512 192 512s192-87 192-211.5c0-79.9-80.2-199.6-192-300.5zm0 448c-56.5 0-96-39-96-94.8 0-13.5 4.6-61.5 96-161.2 91.4 99.7 96 147.7 96 161.2 0 55.8-39.5 94.8-96 94.8z"
    }))
  },
  calendarAlt: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Calender', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
    }))
  },
  check: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Check', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
    }))
  },
  checkCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Check - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
    }))
  },
  checkCircleOutline: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Check - Circle Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
    }))
  },
  checkSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Check - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"
    }))
  },
  checkSquareOutline: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Check - Square Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
    }))
  },
  chevronDown: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Chevron - Down', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
    }))
  },
  chevronLeft: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Chevron - Left', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 256 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
    }))
  },
  chevronRight: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Chevron - Right', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 256 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
    }))
  },
  chevronUp: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Chevron - Up', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
    }))
  },
  circle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
    }))
  },
  circleOutline: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Circle - Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
    }))
  },
  coffee: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Coffee', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 640 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"
    }))
  },
  dotCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Dot - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
    }))
  },
  dotCircleOutline: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Dot - Circle Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"
    }))
  },
  ellipsesH: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Ellipses - Horizontal', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
    }))
  },
  ellipsesV: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Ellipses - Vertical', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 192 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
    }))
  },
  envelope: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Envelope', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
    }))
  },
  fireAlt: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Fire', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"
    }))
  },
  heart: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Heart', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
    }))
  },
  mapMarkerAlt: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Map Marker', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 384 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
    }))
  },
  paperPlane: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Paper Plane', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"
    }))
  },
  phone: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Phone', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
    }))
  },
  plus: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Plus', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    }))
  },
  plusCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Plus - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
    }))
  },
  plusSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Plus - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
    }))
  },
  plusSquareOutline: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Plus - Square Outline', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
    }))
  },
  shield: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Shield', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
    }))
  },
  star: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Star', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 576 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
    }))
  },
  tags: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Tags', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 640 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
    }))
  },
  userCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('User - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 496 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
    }))
  }
};
/* harmony default export */ __webpack_exports__["default"] = (svgs);

/***/ }),

/***/ "./src/components/icon-picker/svgs-social.js":
/*!***************************************************!*\
  !*** ./src/components/icon-picker/svgs-social.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const svgs = {
  facebook: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Facebook', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 320 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
    }))
  },
  facebookCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Facebook - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
    }))
  },
  facebookSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Facebook - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
    }))
  },
  instagram: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Instagram', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
    }))
  },
  linkedin: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('LinkedIn', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
    }))
  },
  linkedinSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('LinkedIn - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
    }))
  },
  pinterest: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Pinterest', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 384 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"
    }))
  },
  pinterestCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Pinterest - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 496 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"
    }))
  },
  pinterestSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Pinterest - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"
    }))
  },
  reddit: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Reddit', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"
    }))
  },
  redditCircle: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Reddit - Circle', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"
    }))
  },
  redditSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Reddit - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M283.2 345.5c2.7 2.7 2.7 6.8 0 9.2-24.5 24.5-93.8 24.6-118.4 0-2.7-2.4-2.7-6.5 0-9.2 2.4-2.4 6.5-2.4 8.9 0 18.7 19.2 81 19.6 100.5 0 2.4-2.3 6.6-2.3 9 0zm-91.3-53.8c0-14.9-11.9-26.8-26.5-26.8-14.9 0-26.8 11.9-26.8 26.8 0 14.6 11.9 26.5 26.8 26.5 14.6 0 26.5-11.9 26.5-26.5zm90.7-26.8c-14.6 0-26.5 11.9-26.5 26.8 0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-11.9 26.8-26.5 0-14.9-11.9-26.8-26.8-26.8zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-99.7 140.6c-10.1 0-19 4.2-25.6 10.7-24.1-16.7-56.5-27.4-92.5-28.6l18.7-84.2 59.5 13.4c0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-12.2 26.8-26.8 0-14.6-11.9-26.8-26.8-26.8-10.4 0-19.3 6.2-23.8 14.9l-65.7-14.6c-3.3-.9-6.5 1.5-7.4 4.8l-20.5 92.8c-35.7 1.5-67.8 12.2-91.9 28.9-6.5-6.8-15.8-11-25.9-11-37.5 0-49.8 50.4-15.5 67.5-1.2 5.4-1.8 11-1.8 16.7 0 56.5 63.7 102.3 141.9 102.3 78.5 0 142.2-45.8 142.2-102.3 0-5.7-.6-11.6-2.1-17 33.6-17.2 21.2-67.2-16.1-67.2z"
    }))
  },
  snapchat: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Snapchat', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M510.846 392.673c-5.211 12.157-27.239 21.089-67.36 27.318-2.064 2.786-3.775 14.686-6.507 23.956-1.625 5.566-5.623 8.869-12.128 8.869l-.297-.005c-9.395 0-19.203-4.323-38.852-4.323-26.521 0-35.662 6.043-56.254 20.588-21.832 15.438-42.771 28.764-74.027 27.399-31.646 2.334-58.025-16.908-72.871-27.404-20.714-14.643-29.828-20.582-56.241-20.582-18.864 0-30.736 4.72-38.852 4.72-8.073 0-11.213-4.922-12.422-9.04-2.703-9.189-4.404-21.263-6.523-24.13-20.679-3.209-67.31-11.344-68.498-32.15a10.627 10.627 0 0 1 8.877-11.069c69.583-11.455 100.924-82.901 102.227-85.934.074-.176.155-.344.237-.515 3.713-7.537 4.544-13.849 2.463-18.753-5.05-11.896-26.872-16.164-36.053-19.796-23.715-9.366-27.015-20.128-25.612-27.504 2.437-12.836 21.725-20.735 33.002-15.453 8.919 4.181 16.843 6.297 23.547 6.297 5.022 0 8.212-1.204 9.96-2.171-2.043-35.936-7.101-87.29 5.687-115.969C158.122 21.304 229.705 15.42 250.826 15.42c.944 0 9.141-.089 10.11-.089 52.148 0 102.254 26.78 126.723 81.643 12.777 28.65 7.749 79.792 5.695 116.009 1.582.872 4.357 1.942 8.599 2.139 6.397-.286 13.815-2.389 22.069-6.257 6.085-2.846 14.406-2.461 20.48.058l.029.01c9.476 3.385 15.439 10.215 15.589 17.87.184 9.747-8.522 18.165-25.878 25.018-2.118.835-4.694 1.655-7.434 2.525-9.797 3.106-24.6 7.805-28.616 17.271-2.079 4.904-1.256 11.211 2.46 18.748.087.168.166.342.239.515 1.301 3.03 32.615 74.46 102.23 85.934 6.427 1.058 11.163 7.877 7.725 15.859z"
    }))
  },
  soundcloud: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Soundcloud', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 640 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M111.4 256.3l5.8 65-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.2-4.4l-5.6-68.3 5.6-65c0-2.2 1.9-4.2 4.2-4.2 2.2 0 4.1 2 4.4 4.2zm21.4-45.6c-2.8 0-4.7 2.2-5 5l-5 105.6 5 68.3c.3 2.8 2.2 5 5 5 2.5 0 4.7-2.2 4.7-5l5.8-68.3-5.8-105.6c0-2.8-2.2-5-4.7-5zm25.5-24.1c-3.1 0-5.3 2.2-5.6 5.3l-4.4 130 4.4 67.8c.3 3.1 2.5 5.3 5.6 5.3 2.8 0 5.3-2.2 5.3-5.3l5.3-67.8-5.3-130c0-3.1-2.5-5.3-5.3-5.3zM7.2 283.2c-1.4 0-2.2 1.1-2.5 2.5L0 321.3l4.7 35c.3 1.4 1.1 2.5 2.5 2.5s2.2-1.1 2.5-2.5l5.6-35-5.6-35.6c-.3-1.4-1.1-2.5-2.5-2.5zm23.6-21.9c-1.4 0-2.5 1.1-2.5 2.5l-6.4 57.5 6.4 56.1c0 1.7 1.1 2.8 2.5 2.8s2.5-1.1 2.8-2.5l7.2-56.4-7.2-57.5c-.3-1.4-1.4-2.5-2.8-2.5zm25.3-11.4c-1.7 0-3.1 1.4-3.3 3.3L47 321.3l5.8 65.8c.3 1.7 1.7 3.1 3.3 3.1 1.7 0 3.1-1.4 3.1-3.1l6.9-65.8-6.9-68.1c0-1.9-1.4-3.3-3.1-3.3zm25.3-2.2c-1.9 0-3.6 1.4-3.6 3.6l-5.8 70 5.8 67.8c0 2.2 1.7 3.6 3.6 3.6s3.6-1.4 3.9-3.6l6.4-67.8-6.4-70c-.3-2.2-2-3.6-3.9-3.6zm241.4-110.9c-1.1-.8-2.8-1.4-4.2-1.4-2.2 0-4.2.8-5.6 1.9-1.9 1.7-3.1 4.2-3.3 6.7v.8l-3.3 176.7 1.7 32.5 1.7 31.7c.3 4.7 4.2 8.6 8.9 8.6s8.6-3.9 8.6-8.6l3.9-64.2-3.9-177.5c-.4-3-2-5.8-4.5-7.2zm-26.7 15.3c-1.4-.8-2.8-1.4-4.4-1.4s-3.1.6-4.4 1.4c-2.2 1.4-3.6 3.9-3.6 6.7l-.3 1.7-2.8 160.8s0 .3 3.1 65.6v.3c0 1.7.6 3.3 1.7 4.7 1.7 1.9 3.9 3.1 6.4 3.1 2.2 0 4.2-1.1 5.6-2.5 1.7-1.4 2.5-3.3 2.5-5.6l.3-6.7 3.1-58.6-3.3-162.8c-.3-2.8-1.7-5.3-3.9-6.7zm-111.4 22.5c-3.1 0-5.8 2.8-5.8 6.1l-4.4 140.6 4.4 67.2c.3 3.3 2.8 5.8 5.8 5.8 3.3 0 5.8-2.5 6.1-5.8l5-67.2-5-140.6c-.2-3.3-2.7-6.1-6.1-6.1zm376.7 62.8c-10.8 0-21.1 2.2-30.6 6.1-6.4-70.8-65.8-126.4-138.3-126.4-17.8 0-35 3.3-50.3 9.4-6.1 2.2-7.8 4.4-7.8 9.2v249.7c0 5 3.9 8.6 8.6 9.2h218.3c43.3 0 78.6-35 78.6-78.3.1-43.6-35.2-78.9-78.5-78.9zm-296.7-60.3c-4.2 0-7.5 3.3-7.8 7.8l-3.3 136.7 3.3 65.6c.3 4.2 3.6 7.5 7.8 7.5 4.2 0 7.5-3.3 7.5-7.5l3.9-65.6-3.9-136.7c-.3-4.5-3.3-7.8-7.5-7.8zm-53.6-7.8c-3.3 0-6.4 3.1-6.4 6.7l-3.9 145.3 3.9 66.9c.3 3.6 3.1 6.4 6.4 6.4 3.6 0 6.4-2.8 6.7-6.4l4.4-66.9-4.4-145.3c-.3-3.6-3.1-6.7-6.7-6.7zm26.7 3.4c-3.9 0-6.9 3.1-6.9 6.9L227 321.3l3.9 66.4c.3 3.9 3.1 6.9 6.9 6.9s6.9-3.1 6.9-6.9l4.2-66.4-4.2-141.7c0-3.9-3-6.9-6.9-6.9z"
    }))
  },
  twitch: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Twitch', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M40.1 32L10 108.9v314.3h107V480h60.2l56.8-56.8h87l117-117V32H40.1zm357.8 254.1L331 353H224l-56.8 56.8V353H76.9V72.1h321v214zM331 149v116.9h-40.1V149H331zm-107 0v116.9h-40.1V149H224z"
    }))
  },
  twitter: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Twitter', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
    }))
  },
  twitterSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Twitter - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
    }))
  },
  vimeo: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Vimeo', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z"
    }))
  },
  vimeoSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('Vimeo - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M403.2 32H44.8C20.1 32 0 52.1 0 76.8v358.4C0 459.9 20.1 480 44.8 480h358.4c24.7 0 44.8-20.1 44.8-44.8V76.8c0-24.7-20.1-44.8-44.8-44.8zM377 180.8c-1.4 31.5-23.4 74.7-66 129.4-44 57.2-81.3 85.8-111.7 85.8-18.9 0-34.8-17.4-47.9-52.3-25.5-93.3-36.4-148-57.4-148-2.4 0-10.9 5.1-25.4 15.2l-15.2-19.6c37.3-32.8 72.9-69.2 95.2-71.2 25.2-2.4 40.7 14.8 46.5 51.7 20.7 131.2 29.9 151 67.6 91.6 13.5-21.4 20.8-37.7 21.8-48.9 3.5-33.2-25.9-30.9-45.8-22.4 15.9-52.1 46.3-77.4 91.2-76 33.3.9 49 22.5 47.1 64.7z"
    }))
  },
  whatsapp: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('WhatsApp', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    }))
  },
  whatsappSquare: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('WhatsApp - Square', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 448 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"
    }))
  },
  youtube: {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["_x"])('YouTube', 'label', 'generateblocks'),
    icon: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      "aria-hidden": "true",
      role: "img",
      height: "1em",
      width: "1em",
      viewBox: "0 0 576 512",
      xmlns: "http://www.w3.org/2000/svg"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      fill: "currentColor",
      d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
    }))
  }
};
/* harmony default export */ __webpack_exports__["default"] = (svgs);

/***/ }),

/***/ "./src/components/panel-area/index.js":
/*!********************************************!*\
  !*** ./src/components/panel-area/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PanelArea; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apply_filters___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apply-filters/ */ "./src/components/apply-filters/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Component Class
 */

class PanelArea extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const {
      title = false,
      initialOpen = false,
      icon,
      className,
      id,
      state,
      showPanel = true,
      children
    } = this.props;
    const show = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.showPanel', showPanel, id, this.props);

    if (!show) {
      return null;
    }

    let hasChildren = true;

    if ('' === children) {
      hasChildren = false;
    } // If we have items in the panel, make sure they're not empty.


    if ('object' === typeof children) {
      hasChildren = Object.values(children).some(x => x !== null && x !== false && x !== '');
    }

    if (!hasChildren) {
      return null;
    }

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_apply_filters___WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: 'generateblocks.panel.' + id,
      props: this.props,
      state: state
    }, title ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
      title: title,
      initialOpen: initialOpen,
      icon: icon,
      className: className
    }, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.panelContents', children, id, this.props)) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], null, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__["applyFilters"])('generateblocks.editor.panelContents', children, id, this.props)));
  }

}

/***/ }),

/***/ "./src/components/responsive-tabs/editor.scss":
/*!****************************************************!*\
  !*** ./src/components/responsive-tabs/editor.scss ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/responsive-tabs/index.js":
/*!*************************************************!*\
  !*** ./src/components/responsive-tabs/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponsiveTabs; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/responsive-tabs/editor.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);






class ResponsiveTabs extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const {
      onClick,
      selectedDevice
    } = this.props;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gb-responsive-tabs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Show options for all devices', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      isPressed: 'Desktop' === selectedDevice ? true : false,
      onClick: () => {
        onClick('Desktop');
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Desktop', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Show options for tablet devices', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      isPressed: 'Tablet' === selectedDevice ? true : false,
      onClick: () => {
        onClick('Tablet');
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Tablet', 'generateblocks'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Show options for mobile devices', 'generateblocks')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      isPressed: 'Mobile' === selectedDevice ? true : false,
      onClick: () => {
        onClick('Mobile');
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Mobile', 'generateblocks')))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])('generateblocks.editor.controls', '', 'afterResponsiveTabs', this.props, this.state));
  }

}

/***/ }),

/***/ "./src/components/typography/editor.scss":
/*!***********************************************!*\
  !*** ./src/components/typography/editor.scss ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/typography/google-fonts.json":
/*!*****************************************************!*\
  !*** ./src/components/typography/google-fonts.json ***!
  \*****************************************************/
/*! exports provided: Roboto, Open Sans, Noto Sans JP, Lato, Montserrat, Roboto Condensed, Source Sans Pro, Oswald, Poppins, Roboto Mono, Noto Sans, Raleway, PT Sans, Roboto Slab, Merriweather, Ubuntu, Playfair Display, Nunito, Noto Sans KR, Open Sans Condensed, Rubik, Lora, Work Sans, Mukta, Noto Sans TC, Nunito Sans, PT Serif, Nanum Gothic, Inter, Fira Sans, Noto Serif, Quicksand, Titillium Web, Hind Siliguri, Karla, Barlow, Inconsolata, Heebo, Noto Sans SC, Oxygen, Source Code Pro, Anton, Josefin Sans, Arimo, PT Sans Narrow, IBM Plex Sans, Dosis, Noto Sans HK, Libre Franklin, Libre Baskerville, Cabin, Hind, Bitter, Crimson Text, Bebas Neue, Lobster, Yanone Kaffeesatz, Dancing Script, Cairo, Abel, Fjalla One, Varela Round, Source Serif Pro, Arvo, EB Garamond, Barlow Condensed, Architects Daughter, Zilla Slab, Indie Flower, Mulish, Comfortaa, DM Sans, Pacifico, Exo 2, Kanit, Prompt, Shadows Into Light, Questrial, Merriweather Sans, Teko, Balsamiq Sans, Asap, Hind Madurai, Cormorant Garamond, Antic Slab, Archivo Narrow, Overpass, Abril Fatface, Slabo 27px, Exo, Assistant, Maven Pro, Domine, Fira Sans Condensed, Caveat, Rajdhani, IBM Plex Serif, Martel, Play, Amatic SC, Bree Serif, Tajawal, Noto Serif JP, Righteous, Satisfy, Signika, Catamaran, Acme, Manrope, Fredoka One, Nanum Myeongjo, ABeeZee, Amiri, Patrick Hand, PT Sans Caption, Archivo, Alfa Slab One, Cinzel, Crete Round, Permanent Marker, Alegreya Sans, Almarai, Barlow Semi Condensed, Russo One, Vollkorn, Sarabun, Krona One, M PLUS Rounded 1c, Noticia Text, Courgette, Monda, Alegreya, Frank Ruhl Libre, Patua One, Ubuntu Condensed, Great Vibes, Quattrocento Sans, M PLUS 1p, Spartan, Yantramanav, Lobster Two, Archivo Black, Kaushan Script, Tinos, Cardo, Orbitron, Sacramento, IBM Plex Mono, Francois One, Luckiest Guy, Gothic A1, Kalam, Parisienne, Gloria Hallelujah, Didact Gothic, Cantarell, Press Start 2P, Jost, Rokkitt, Paytone One, Prata, Baloo 2, Cuprum, Chivo, Encode Sans, News Cycle, Old Standard TT, Hind Guntur, Pathway Gothic One, Red Hat Display, Public Sans, Secular One, Volkhov, Concert One, Asap Condensed, Montserrat Alternates, Ropa Sans, Josefin Slab, Poiret One, Passion One, Padauk, Changa, Saira Condensed, Ultra, Quattrocento, Arapey, Vidaloka, Playfair Display SC, Cookie, Chakra Petch, Istok Web, Cormorant, DM Serif Display, Neuton, Spectral, Sawarabi Mincho, Lemonada, Yellowtail, Handlee, Merienda, Philosopher, Sanchez, Hammersmith One, Special Elite, Economica, Staatliches, Sriracha, Hind Vadodara, Monoton, Ruda, Advent Pro, Saira, Homemade Apple, Sigmar One, Mitr, Bangers, Khand, Faustina, Saira Semi Condensed, Cabin Condensed, Gudea, Fira Sans Extra Condensed, DM Serif Text, El Messiri, Electrolize, Taviraj, PT Mono, Gentium Basic, Space Mono, Alice, Unica One, Ubuntu Mono, Pragati Narrow, Noto Serif TC, Amaranth, Karma, Actor, Nanum Pen Script, Noto Serif SC, Tangerine, Carter One, Neucha, Unna, Pontano Sans, Bai Jamjuree, Marck Script, BenchNine, Fugaz One, Yeseva One, Eczar, Bad Script, Viga, Gentium Book Basic, Jura, Allura, Palanquin, Sawarabi Gothic, Rock Salt, Lusitana, Alef, Julius Sans One, Tenor Sans, Nothing You Could Do, Cutive Mono, Khula, Adamina, Playball, Audiowide, Jaldi, Black Ops One, Signika Negative, Shadows Into Light Two, Armata, Mali, Antic, Varela, Berkshire Swash, Aleo, Gelasio, Rufina, Markazi Text, Nanum Gothic Coding, Allan, Noto Serif KR, Abhaya Libre, Quantico, Marcellus, Sorts Mill Goudy, Alata, Knewave, Alex Brush, Aclonica, Gruppo, Damion, Itim, Bungee, Gochi Hand, Mr Dafoe, Freckle Face, Baloo Chettan 2, Trirong, Kosugi Maru, Rubik Mono One, Fira Mono, Cantata One, Suez One, Niconne, Six Caps, Miriam Libre, Sarala, Sintony, Titan One, Encode Sans Condensed, Cousine, PT Serif Caption, Courier Prime, Overlock, Allerta, Arsenal, Black Han Sans, Squada One, Lateef, Arima Madurai, Ramabhadra, Covered By Your Grace, Martel Sans, Rancho, Enriqueta, Syncopate, Pinyon Script, Chewy, Oleo Script, Kreon, Candal, Spinnaker, Reem Kufi, Krub, Michroma, Annie Use Your Telescope, Lilita One, Coda, Fredericka the Great, Mukta Malar, Bowlby One SC, Average, Londrina Solid, New Tegomin, Glegoo, Pridi, Boogaloo, Red Hat Text, Aldrich, Basic, Capriola, Forum, Reenie Beanie, Laila, Alegreya Sans SC, Share Tech Mono, Italianno, Lalezar, Lexend Deca, Caveat Brush, Shrikhand, Creepster, Kameron, Coda Caption, Goudy Bookletter 1911, Coming Soon, Saira Extra Condensed, Yrsa, Telex, Bevan, Voltaire, Days One, Cabin Sketch, Norican, Rambla, Mukta Vaani, Average Sans, Arbutus Slab, Sansita, Mada, Just Another Hand, Nobile, Gilda Display, VT323, Mandali, Caudex, Anonymous Pro, Bentham, Overpass Mono, Sen, Kadwa, Cambay, Yesteryear, Molengo, Nixie One, Scada, Crimson Pro, Arizonia, Racing Sans One, Scheherazade, Seaweed Script, Belleza, Harmattan, Leckerli One, Ovo, Merienda One, Holtwood One SC, Cinzel Decorative, Literata, Mrs Saint Delafield, Schoolbell, Bungee Inline, Herr Von Muellerhoff, Oranienbaum, Baloo Tamma 2, Sniglet, Bubblegum Sans, Rochester, Judson, Marcellus SC, Darker Grotesque, Changa One, Alegreya SC, Pattaya, Mallanna, Share, Podkova, Allerta Stencil, Charm, Niramit, Halant, Graduate, Nanum Brush Script, Amita, Rozha One, Kristi, Biryani, Lustria, Delius, Suranna, Amethysta, Contrail One, Averia Serif Libre, Do Hyeon, IBM Plex Sans Condensed, Marvel, Rye, Fauna One, Corben, Cedarville Cursive, Jockey One, Libre Caslon Text, Carrois Gothic, Calligraffitti, Trocchi, Spectral SC, Coustard, Copse, Athiti, Carme, Rosario, Limelight, Jua, Petit Formal Script, Love Ya Like A Sister, GFS Didot, Aladin, Palanquin Dark, Amiko, Cormorant Infant, Wallpoet, Magra, Grand Hotel, Sunflower, Big Shoulders Display, Slabo 13px, Pangolin, Mr De Haviland, K2D, Marmelad, Thasadith, La Belle Aurore, Hanuman, Metrophobic, Epilogue, Radley, Poly, Commissioner, Averia Libre, IM Fell Double Pica, Comic Neue, Baskervville, Kelly Slab, Oxygen Mono, Maitree, Buenard, Duru Sans, Baloo Da 2, Grandstander, Balthazar, ZCOOL XiaoWei, Cutive, Antic Didone, Waiting for the Sunrise, B612 Mono, Chonburi, Montaga, UnifrakturMaguntia, Kosugi, Gravitas One, Mirza, Manjari, Alike, Lekton, Sora, Gabriela, Lemon, Esteban, Alatsi, Turret Road, Monsieur La Doulaise, Pompiere, Cormorant SC, Kurale, Frijole, Rammetto One, Chelsea Market, Megrim, IM Fell English, Oregano, Andada, Mate, Convergence, Rouge Script, Bowlby One, Emilys Candy, Wendy One, Fira Code, Dawning of a New Day, Sue Ellen Francisco, Gurajada, David Libre, Sofia, Short Stack, Chau Philomene One, Bellefair, Belgrano, Expletus Sans, Original Surfer, Doppio One, Be Vietnam, Sail, Inder, Give You Glory, IM Fell DW Pica, McLaren, Encode Sans Semi Condensed, Bungee Shade, Baumans, Brawler, Tenali Ramakrishna, Ceviche One, B612, Zeyada, Mountains of Christmas, Sedgwick Ave, Gugi, Oleo Script Swash Caps, Skranji, Meddon, NTR, Finger Paint, Blinker, Fanwood Text, Grenze Gotisch, Hepta Slab, Anaheim, Major Mono Display, Quando, Andika, Qwigley, Vast Shadow, Happy Monkey, Montez, Proza Libre, Homenaje, Ma Shan Zheng, Loved by the King, Trade Winds, Stardos Stencil, Raleway Dots, Libre Barcode 39, Recursive, Numans, RocknRoll One, Rakkas, Mouse Memoirs, BioRhyme, Ranchers, Patrick Hand SC, Codystar, Rasa, Meera Inimai, Clicker Script, DM Mono, Gaegu, Aguafina Script, Unkempt, Over the Rainbow, Fondamento, Battambang, Cambo, Crafty Girls, Nova Mono, Tillana, Alike Angular, Kumbh Sans, Katibeh, Sarpanch, Antonio, Mansalva, Faster One, Federo, Dokdo, Hi Melody, Euphoria Script, Orienta, Space Grotesk, Galada, Timmana, JetBrains Mono, Baloo Thambi 2, Averia Sans Libre, UnifrakturCook, Tauri, Share Tech, Walter Turncoat, Geo, Atma, Almendra, Jomhuria, Strait, Encode Sans Expanded, Metamorphous, Iceland, Ledger, Poller One, Vollkorn SC, Vesper Libre, Aref Ruqaa, Livvic, Caladea, Montserrat Subrayada, Vampiro One, Farro, New Rocker, Delius Swash Caps, Calistoga, Carrois Gothic SC, Italiana, Inknut Antiqua, Life Savers, Imprima, Mako, Lily Script One, Bilbo Swash Caps, IM Fell English SC, Red Rose, Shojumaru, Prosto One, Bodoni Moda, Mukta Mahee, Bubbler One, The Girl Next Door, Artifika, Cantora One, Scope One, Yusei Magic, Oxanium, Tienne, Salsa, Flamenco, Port Lligat Sans, Denk One, Fontdiner Swanky, Nova Round, Gafata, Cormorant Upright, Cherry Cream Soda, Asul, Big Shoulders Text, Voces, Dynalight, Peralta, Mina, Headland One, Medula One, Englebert, Nova Square, Delius Unicase, Sumana, Bilbo, Engagement, ZCOOL QingKe HuangYou, Fresca, Ranga, Orelega One, Zen Dots, Shippori Mincho, Henny Penny, Della Respira, Cherry Swash, Notable, Arya, Slackey, Vibur, Coiny, Lexend Zetta, Elsie, Fjord One, Puritan, Just Me Again Down Here, Khmer, Girassol, Bellota Text, Yatra One, Stalemate, Wire One, Spicy Rice, Saira Stencil One, Kite One, Port Lligat Slab, Baloo Bhaina 2, Pavanam, Eater, Text Me One, Ribeye, Pirata One, Amarante, Milonga, Habibi, Ruslan Display, Encode Sans Semi Expanded, Nokora, Rowdies, Kranky, Bigelow Rules, League Script, Swanky and Moo Moo, Karantina, Lovers Quarrel, Mate SC, Manuale, Germania One, Sura, Sarina, Macondo Swash Caps, Kotta One, IM Fell French Canon SC, Julee, Charmonman, Shanti, Gamja Flower, Averia Gruesa Libre, Stint Ultra Expanded, Uncial Antiqua, Mystery Quest, Goldman, Paprika, IM Fell French Canon, Prociono, Kodchasan, Libre Barcode 39 Text, Quintessential, Moul, Libre Barcode 128, Ramaraja, Modak, Song Myung, East Sea Dokdo, Crushed, Dekko, Chilanka, Hanalei Fill, Mogra, Baloo Tammudu 2, Baloo Bhai 2, Libre Barcode 39 Extended Text, Rosarivo, KoHo, Offside, Reggae One, Syne, Zilla Slab Highlight, Donegal One, Bellota, Stoke, Cormorant Unicase, Cagliostro, Rationale, Margarine, Sancreek, Inria Serif, Overlock SC, Nosifer, Libre Barcode EAN13 Text, Yeon Sung, Ruluko, Simonetta, Lakki Reddy, Baloo Paaji 2, Chango, Galdeano, Fahkwang, Elsie Swash Caps, Buda, Condiment, Barrio, Chicle, Angkor, Akronim, Tomorrow, Sonsie One, Kumar One, Autour One, Libre Caslon Display, Farsan, Fenix, Solway, Kulim Park, Stint Ultra Condensed, Metal, Rum Raisin, Redressed, Tulpen One, Petrona, Marko One, Asar, Nova Flat, Koulen, Lexend Exa, Londrina Outline, Cute Font, IM Fell Great Primer, Junge, Stylish, Lexend, Spirax, Piazzolla, Piedra, Ribeye Marrow, Dorsa, Ibarra Real Nova, IM Fell DW Pica SC, Wellfleet, Eagle Lake, Meie Script, Goblin One, Flavors, Gotu, Linden Hill, Chathura, Croissant One, Jomolhari, Srisakdi, Modern Antiqua, Joti One, Kavoon, Sulphur Point, Castoro, Chela One, Atomic Age, Maiden Orange, Ruthie, Bayon, Potta One, Iceberg, Bigshot One, Gorditas, Sree Krushnadevaraya, Trykker, Kufam, Diplomata SC, Poor Story, Sirin Stencil, Kavivanar, Syne Mono, Metal Mania, Arbutus, Unlock, MuseoModerno, Glass Antiqua, Miniver, Griffy, Bokor, Felipa, Inika, Princess Sofia, Mrs Sheppards, Monofett, Sahitya, Dela Gothic One, Shippori Mincho B1, Beth Ellen, Lancelot, Rhodium Libre, Fraunces, Hachi Maru Pop, Snippet, Content, Revalia, Diplomata, Libre Barcode 128 Text, Jacques Francois Shadow, Long Cang, Caesar Dressing, Odor Mean Chey, Jolly Lodger, Texturina, DotGothic16, Ewert, Romanesco, Kantumruy, Asset, Odibee Sans, Emblema One, Kdam Thmor, Dr Sugiyama, Bahiana, GFS Neohellenic, Oldenburg, Molle, Ravi Prakash, Gayathri, Almendra SC, Varta, Risque, Sansita Swashed, Kiwi Maru, Dangrek, Devonshire, Big Shoulders Stencil Text, Jim Nightshade, Smythe, Stick, Lexend Mega, Siemreap, Londrina Shadow, Train One, IM Fell Great Primer SC, Barriecito, Underdog, Stalinist One, Mr Bedfort, Freehand, MedievalSharp, Lexend Giga, Keania One, Peddana, Galindo, Fascinate, Londrina Sketch, Gupter, Nova Slim, Snowburst One, ZCOOL KuaiLe, Plaster, Fascinate Inline, Newsreader, Purple Purse, Sedgwick Ave Display, Jacques Francois, Almendra Display, Irish Grover, Kumar One Outline, Andika New Basic, Libre Barcode 39 Extended, Taprom, Miss Fajardose, IM Fell Double Pica SC, Macondo, Ruge Boogie, Sunshiney, Brygada 1918, Grenze, Erica One, Seymour One, Supermercado One, Zhi Mang Xing, Butterfly Kids, Kirang Haerang, Federant, Liu Jian Mao Cao, Chenla, Hanalei, Langar, Trochut, Smokum, Black And White Picture, Preahvihear, Bungee Outline, Astloch, Fasthand, Akaya Telivigala, Inria Sans, Bonbon, Combo, Nova Script, Sofadi One, Passero One, Suwannaphum, Miltonian Tattoo, Bungee Hairline, Gidugu, Geostar Fill, Nerko One, Lacquer, Butcherman, Sevillana, Nova Oval, Aubrey, Akaya Kanadaka, Nova Cut, Vibes, Miltonian, Moulpali, BioRhyme Expanded, Bahianita, Suravaram, Fruktur, Single Day, Imbue, Lexend Tera, Big Shoulders Inline Text, Dhurjati, Warnes, Kenia, Lexend Peta, Big Shoulders Stencil Display, Geostar, Big Shoulders Inline Display, Oi, Xanh Mono, Viaoda Libre, Truculenta, Syne Tactile, Trispace, Ballet, Benne, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Roboto\":{\"weight\":[\"100\",\"100italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Open Sans\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Noto Sans JP\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Lato\":{\"weight\":[\"100\",\"100italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Montserrat\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Roboto Condensed\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Source Sans Pro\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Oswald\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Poppins\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Roboto Mono\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"monospace\"},\"Noto Sans\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Raleway\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"PT Sans\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Roboto Slab\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Merriweather\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Ubuntu\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Playfair Display\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Nunito\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Noto Sans KR\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Open Sans Condensed\":{\"weight\":[\"300\",\"300italic\",\"700\"],\"fallback\":\"sans-serif\"},\"Rubik\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Lora\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"Work Sans\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Mukta\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Noto Sans TC\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Nunito Sans\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"PT Serif\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Nanum Gothic\":{\"weight\":[\"regular\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Inter\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Fira Sans\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Noto Serif\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Quicksand\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Titillium Web\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"900\"],\"fallback\":\"sans-serif\"},\"Hind Siliguri\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Karla\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Barlow\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Inconsolata\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"monospace\"},\"Heebo\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Noto Sans SC\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Oxygen\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Source Code Pro\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"monospace\"},\"Anton\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Josefin Sans\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Arimo\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"PT Sans Narrow\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"IBM Plex Sans\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Dosis\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Noto Sans HK\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Libre Franklin\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Libre Baskerville\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"serif\"},\"Cabin\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Hind\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Bitter\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Crimson Text\":{\"weight\":[\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Bebas Neue\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lobster\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Yanone Kaffeesatz\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Dancing Script\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"handwriting\"},\"Cairo\":{\"weight\":[\"200\",\"300\",\"regular\",\"600\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Abel\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Fjalla One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Varela Round\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Source Serif Pro\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Arvo\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"EB Garamond\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\"],\"fallback\":\"serif\"},\"Barlow Condensed\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Architects Daughter\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Zilla Slab\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Indie Flower\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mulish\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Comfortaa\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"display\"},\"DM Sans\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Pacifico\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Exo 2\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Kanit\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Prompt\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Shadows Into Light\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Questrial\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Merriweather Sans\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Teko\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Balsamiq Sans\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Asap\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Hind Madurai\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Cormorant Garamond\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Antic Slab\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Archivo Narrow\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Overpass\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Abril Fatface\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Slabo 27px\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Exo\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Assistant\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Maven Pro\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Domine\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Fira Sans Condensed\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Caveat\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"handwriting\"},\"Rajdhani\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"IBM Plex Serif\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Martel\":{\"weight\":[\"200\",\"300\",\"regular\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Play\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Amatic SC\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Bree Serif\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Tajawal\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Noto Serif JP\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Righteous\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Satisfy\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Signika\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Catamaran\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Acme\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Manrope\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Fredoka One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nanum Myeongjo\":{\"weight\":[\"regular\",\"700\",\"800\"],\"fallback\":\"serif\"},\"ABeeZee\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"sans-serif\"},\"Amiri\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Patrick Hand\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"PT Sans Caption\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Archivo\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Alfa Slab One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Cinzel\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Crete Round\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Permanent Marker\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Alegreya Sans\":{\"weight\":[\"100\",\"100italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Almarai\":{\"weight\":[\"300\",\"regular\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Barlow Semi Condensed\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Russo One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Vollkorn\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Sarabun\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Krona One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"M PLUS Rounded 1c\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Noticia Text\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Courgette\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Monda\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Alegreya\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Frank Ruhl Libre\":{\"weight\":[\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Patua One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ubuntu Condensed\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Great Vibes\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Quattrocento Sans\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"M PLUS 1p\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Spartan\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Yantramanav\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Lobster Two\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Archivo Black\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Kaushan Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Tinos\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Cardo\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"serif\"},\"Orbitron\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Sacramento\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"IBM Plex Mono\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Francois One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Luckiest Guy\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gothic A1\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Kalam\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Parisienne\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Gloria Hallelujah\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Didact Gothic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Cantarell\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Press Start 2P\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jost\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Rokkitt\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Paytone One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Prata\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Baloo 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Cuprum\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Chivo\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Encode Sans\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"News Cycle\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Old Standard TT\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"serif\"},\"Hind Guntur\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Pathway Gothic One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Red Hat Display\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Public Sans\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Secular One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Volkhov\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Concert One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Asap Condensed\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Montserrat Alternates\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Ropa Sans\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"sans-serif\"},\"Josefin Slab\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"Poiret One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Passion One\":{\"weight\":[\"regular\",\"700\",\"900\"],\"fallback\":\"display\"},\"Padauk\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Changa\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Saira Condensed\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Ultra\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Quattrocento\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Arapey\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Vidaloka\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Playfair Display SC\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Cookie\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Chakra Petch\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Istok Web\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Cormorant\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"DM Serif Display\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Neuton\":{\"weight\":[\"200\",\"300\",\"regular\",\"italic\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Spectral\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"serif\"},\"Sawarabi Mincho\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Lemonada\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"display\"},\"Yellowtail\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Handlee\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Merienda\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Philosopher\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Sanchez\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Hammersmith One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Special Elite\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Economica\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Staatliches\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sriracha\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Hind Vadodara\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Monoton\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ruda\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Advent Pro\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Saira\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Homemade Apple\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Sigmar One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mitr\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Bangers\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Khand\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Faustina\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"Saira Semi Condensed\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Cabin Condensed\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Gudea\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"sans-serif\"},\"Fira Sans Extra Condensed\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"DM Serif Text\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"El Messiri\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Electrolize\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Taviraj\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"PT Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Gentium Basic\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Space Mono\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Alice\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Unica One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ubuntu Mono\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Pragati Narrow\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Noto Serif TC\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Amaranth\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Karma\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Actor\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Nanum Pen Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Noto Serif SC\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Tangerine\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Carter One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Neucha\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Unna\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Pontano Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Bai Jamjuree\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Marck Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"BenchNine\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Fugaz One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Yeseva One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Eczar\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Bad Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Viga\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Gentium Book Basic\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Jura\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Allura\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Palanquin\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Sawarabi Gothic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rock Salt\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Lusitana\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Alef\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Julius Sans One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Tenor Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Nothing You Could Do\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Cutive Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Khula\":{\"weight\":[\"300\",\"regular\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Adamina\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Playball\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Audiowide\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jaldi\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Black Ops One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Signika Negative\":{\"weight\":[\"300\",\"regular\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Shadows Into Light Two\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Armata\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Mali\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"handwriting\"},\"Antic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Varela\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Berkshire Swash\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Aleo\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Gelasio\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Rufina\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Markazi Text\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Nanum Gothic Coding\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"monospace\"},\"Allan\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Noto Serif KR\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Abhaya Libre\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Quantico\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Marcellus\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Sorts Mill Goudy\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Alata\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Knewave\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Alex Brush\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Aclonica\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Gruppo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Damion\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Itim\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Bungee\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gochi Hand\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mr Dafoe\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Freckle Face\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Baloo Chettan 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Trirong\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Kosugi Maru\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rubik Mono One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Fira Mono\":{\"weight\":[\"regular\",\"500\",\"700\"],\"fallback\":\"monospace\"},\"Cantata One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Suez One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Niconne\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Six Caps\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Miriam Libre\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Sarala\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Sintony\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Titan One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Encode Sans Condensed\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Cousine\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"PT Serif Caption\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Courier Prime\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Overlock\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"display\"},\"Allerta\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Arsenal\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Black Han Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Squada One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lateef\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Arima Madurai\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Ramabhadra\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Covered By Your Grace\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Martel Sans\":{\"weight\":[\"200\",\"300\",\"regular\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Rancho\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Enriqueta\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Syncopate\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Pinyon Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Chewy\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Oleo Script\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Kreon\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Candal\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Spinnaker\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Reem Kufi\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Krub\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Michroma\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Annie Use Your Telescope\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Lilita One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Coda\":{\"weight\":[\"regular\",\"800\"],\"fallback\":\"display\"},\"Fredericka the Great\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mukta Malar\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Bowlby One SC\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Average\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Londrina Solid\":{\"weight\":[\"100\",\"300\",\"regular\",\"900\"],\"fallback\":\"display\"},\"New Tegomin\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Glegoo\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Pridi\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Boogaloo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Red Hat Text\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Aldrich\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Basic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Capriola\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Forum\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Reenie Beanie\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Laila\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Alegreya Sans SC\":{\"weight\":[\"100\",\"100italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Share Tech Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Italianno\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Lalezar\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lexend Deca\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Caveat Brush\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Shrikhand\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Creepster\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kameron\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Coda Caption\":{\"weight\":[\"800\"],\"fallback\":\"sans-serif\"},\"Goudy Bookletter 1911\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Coming Soon\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Saira Extra Condensed\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Yrsa\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Telex\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Bevan\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Voltaire\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Days One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Cabin Sketch\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Norican\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Rambla\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Mukta Vaani\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Average Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Arbutus Slab\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Sansita\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Mada\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"900\"],\"fallback\":\"sans-serif\"},\"Just Another Hand\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Nobile\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Gilda Display\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"VT323\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Mandali\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Caudex\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Anonymous Pro\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Bentham\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Overpass Mono\":{\"weight\":[\"300\",\"regular\",\"600\",\"700\"],\"fallback\":\"monospace\"},\"Sen\":{\"weight\":[\"regular\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Kadwa\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Cambay\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Yesteryear\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Molengo\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Nixie One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Scada\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Crimson Pro\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Arizonia\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Racing Sans One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Scheherazade\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Seaweed Script\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Belleza\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Harmattan\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Leckerli One\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Ovo\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Merienda One\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Holtwood One SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Cinzel Decorative\":{\"weight\":[\"regular\",\"700\",\"900\"],\"fallback\":\"display\"},\"Literata\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Mrs Saint Delafield\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Schoolbell\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Bungee Inline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Herr Von Muellerhoff\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Oranienbaum\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Baloo Tamma 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Sniglet\":{\"weight\":[\"regular\",\"800\"],\"fallback\":\"display\"},\"Bubblegum Sans\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Rochester\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Judson\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"serif\"},\"Marcellus SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Darker Grotesque\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Changa One\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"display\"},\"Alegreya SC\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Pattaya\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Mallanna\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Share\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Podkova\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Allerta Stencil\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Charm\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Niramit\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Halant\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Graduate\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nanum Brush Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Amita\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Rozha One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Kristi\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Biryani\":{\"weight\":[\"200\",\"300\",\"regular\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Lustria\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Delius\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Suranna\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Amethysta\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Contrail One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Averia Serif Libre\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Do Hyeon\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"IBM Plex Sans Condensed\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Marvel\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Rye\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Fauna One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Corben\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Cedarville Cursive\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Jockey One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Libre Caslon Text\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"serif\"},\"Carrois Gothic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Calligraffitti\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Trocchi\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Spectral SC\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"serif\"},\"Coustard\":{\"weight\":[\"regular\",\"900\"],\"fallback\":\"serif\"},\"Copse\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Athiti\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Carme\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rosario\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Limelight\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jua\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Petit Formal Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Love Ya Like A Sister\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"GFS Didot\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Aladin\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Palanquin Dark\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Amiko\":{\"weight\":[\"regular\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Cormorant Infant\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Wallpoet\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Magra\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Grand Hotel\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Sunflower\":{\"weight\":[\"300\",\"500\",\"700\"],\"fallback\":\"sans-serif\"},\"Big Shoulders Display\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Slabo 13px\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Pangolin\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mr De Haviland\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"K2D\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Marmelad\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Thasadith\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"La Belle Aurore\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Hanuman\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Metrophobic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Epilogue\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Radley\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Poly\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Commissioner\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Averia Libre\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"IM Fell Double Pica\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Comic Neue\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"handwriting\"},\"Baskervville\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Kelly Slab\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Oxygen Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Maitree\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Buenard\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Duru Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Baloo Da 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Grandstander\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"display\"},\"Balthazar\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"ZCOOL XiaoWei\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Cutive\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Antic Didone\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Waiting for the Sunrise\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"B612 Mono\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"monospace\"},\"Chonburi\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Montaga\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"UnifrakturMaguntia\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kosugi\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Gravitas One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mirza\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"display\"},\"Manjari\":{\"weight\":[\"100\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Alike\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Lekton\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"sans-serif\"},\"Sora\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Gabriela\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Lemon\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Esteban\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Alatsi\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Turret Road\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"700\",\"800\"],\"fallback\":\"display\"},\"Monsieur La Doulaise\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Pompiere\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Cormorant SC\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Kurale\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Frijole\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Rammetto One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Chelsea Market\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Megrim\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"IM Fell English\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Oregano\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"display\"},\"Andada\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Mate\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Convergence\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rouge Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Bowlby One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Emilys Candy\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Wendy One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Fira Code\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"monospace\"},\"Dawning of a New Day\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Sue Ellen Francisco\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Gurajada\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"David Libre\":{\"weight\":[\"regular\",\"500\",\"700\"],\"fallback\":\"serif\"},\"Sofia\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Short Stack\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Chau Philomene One\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"sans-serif\"},\"Bellefair\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Belgrano\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Expletus Sans\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Original Surfer\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Doppio One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Be Vietnam\":{\"weight\":[\"100\",\"100italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Sail\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Inder\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Give You Glory\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"IM Fell DW Pica\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"McLaren\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Encode Sans Semi Condensed\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Bungee Shade\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Baumans\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Brawler\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Tenali Ramakrishna\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ceviche One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"B612\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Zeyada\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mountains of Christmas\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Sedgwick Ave\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Gugi\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Oleo Script Swash Caps\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Skranji\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Meddon\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"NTR\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Finger Paint\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Blinker\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Fanwood Text\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Grenze Gotisch\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Hepta Slab\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Anaheim\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Major Mono Display\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Quando\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Andika\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Qwigley\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Vast Shadow\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Happy Monkey\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Montez\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Proza Libre\":{\"weight\":[\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\"],\"fallback\":\"sans-serif\"},\"Homenaje\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ma Shan Zheng\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Loved by the King\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Trade Winds\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Stardos Stencil\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Raleway Dots\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Libre Barcode 39\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Recursive\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Numans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"RocknRoll One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rakkas\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mouse Memoirs\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"BioRhyme\":{\"weight\":[\"200\",\"300\",\"regular\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Ranchers\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Patrick Hand SC\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Codystar\":{\"weight\":[\"300\",\"regular\"],\"fallback\":\"display\"},\"Rasa\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Meera Inimai\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Clicker Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"DM Mono\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\"],\"fallback\":\"monospace\"},\"Gaegu\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Aguafina Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Unkempt\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Over the Rainbow\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Fondamento\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"handwriting\"},\"Battambang\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Cambo\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Crafty Girls\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Nova Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Tillana\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"handwriting\"},\"Alike Angular\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Kumbh Sans\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Katibeh\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sarpanch\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Antonio\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Mansalva\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Faster One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Federo\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Dokdo\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Hi Melody\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Euphoria Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Orienta\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Space Grotesk\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Galada\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Timmana\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"JetBrains Mono\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\"],\"fallback\":\"monospace\"},\"Baloo Thambi 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Averia Sans Libre\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"UnifrakturCook\":{\"weight\":[\"700\"],\"fallback\":\"display\"},\"Tauri\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Share Tech\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Walter Turncoat\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Geo\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"sans-serif\"},\"Atma\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"display\"},\"Almendra\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Jomhuria\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Strait\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Encode Sans Expanded\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Metamorphous\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Iceland\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ledger\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Poller One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Vollkorn SC\":{\"weight\":[\"regular\",\"600\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Vesper Libre\":{\"weight\":[\"regular\",\"500\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Aref Ruqaa\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Livvic\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Caladea\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Montserrat Subrayada\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Vampiro One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Farro\":{\"weight\":[\"300\",\"regular\",\"500\",\"700\"],\"fallback\":\"sans-serif\"},\"New Rocker\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Delius Swash Caps\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Calistoga\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Carrois Gothic SC\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Italiana\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Inknut Antiqua\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Life Savers\":{\"weight\":[\"regular\",\"700\",\"800\"],\"fallback\":\"display\"},\"Imprima\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Mako\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Lily Script One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bilbo Swash Caps\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"IM Fell English SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Red Rose\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"display\"},\"Shojumaru\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Prosto One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bodoni Moda\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Mukta Mahee\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Bubbler One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"The Girl Next Door\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Artifika\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Cantora One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Scope One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Yusei Magic\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Oxanium\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Tienne\":{\"weight\":[\"regular\",\"700\",\"900\"],\"fallback\":\"serif\"},\"Salsa\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Flamenco\":{\"weight\":[\"300\",\"regular\"],\"fallback\":\"display\"},\"Port Lligat Sans\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Denk One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Fontdiner Swanky\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nova Round\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gafata\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Cormorant Upright\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Cherry Cream Soda\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Asul\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Big Shoulders Text\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Voces\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Dynalight\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Peralta\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mina\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Headland One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Medula One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Englebert\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Nova Square\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Delius Unicase\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Sumana\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Bilbo\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Engagement\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"ZCOOL QingKe HuangYou\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Fresca\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ranga\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Orelega One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Zen Dots\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Shippori Mincho\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Henny Penny\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Della Respira\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Cherry Swash\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Notable\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Arya\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Slackey\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Vibur\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Coiny\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lexend Zetta\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Elsie\":{\"weight\":[\"regular\",\"900\"],\"fallback\":\"display\"},\"Fjord One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Puritan\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Just Me Again Down Here\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Khmer\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Girassol\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bellota Text\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Yatra One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Stalemate\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Wire One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Spicy Rice\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Saira Stencil One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kite One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Port Lligat Slab\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Baloo Bhaina 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Pavanam\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Eater\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Text Me One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ribeye\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Pirata One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Amarante\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Milonga\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Habibi\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Ruslan Display\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Encode Sans Semi Expanded\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Nokora\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Rowdies\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"display\"},\"Kranky\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bigelow Rules\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"League Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Swanky and Moo Moo\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Karantina\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"display\"},\"Lovers Quarrel\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mate SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Manuale\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"Germania One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sura\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Sarina\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Macondo Swash Caps\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kotta One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"IM Fell French Canon SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Julee\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Charmonman\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"handwriting\"},\"Shanti\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Gamja Flower\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Averia Gruesa Libre\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Stint Ultra Expanded\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Uncial Antiqua\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mystery Quest\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Goldman\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Paprika\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"IM Fell French Canon\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Prociono\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Kodchasan\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Libre Barcode 39 Text\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Quintessential\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Moul\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Libre Barcode 128\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ramaraja\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Modak\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Song Myung\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"East Sea Dokdo\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Crushed\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Dekko\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Chilanka\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Hanalei Fill\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mogra\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Baloo Tammudu 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Baloo Bhai 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Libre Barcode 39 Extended Text\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Rosarivo\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"KoHo\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Offside\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Reggae One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Syne\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Zilla Slab Highlight\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Donegal One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Bellota\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"display\"},\"Stoke\":{\"weight\":[\"300\",\"regular\"],\"fallback\":\"serif\"},\"Cormorant Unicase\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"serif\"},\"Cagliostro\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Rationale\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Margarine\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sancreek\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Inria Serif\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"serif\"},\"Overlock SC\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nosifer\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Libre Barcode EAN13 Text\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Yeon Sung\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ruluko\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Simonetta\":{\"weight\":[\"regular\",\"italic\",\"900\",\"900italic\"],\"fallback\":\"display\"},\"Lakki Reddy\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Baloo Paaji 2\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"display\"},\"Chango\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Galdeano\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Fahkwang\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Elsie Swash Caps\":{\"weight\":[\"regular\",\"900\"],\"fallback\":\"display\"},\"Buda\":{\"weight\":[\"300\"],\"fallback\":\"display\"},\"Condiment\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Barrio\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Chicle\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Angkor\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Akronim\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Tomorrow\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"sans-serif\"},\"Sonsie One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kumar One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Autour One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Libre Caslon Display\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Farsan\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Fenix\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Solway\":{\"weight\":[\"300\",\"regular\",\"500\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Kulim Park\":{\"weight\":[\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"600\",\"600italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Stint Ultra Condensed\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Metal\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Rum Raisin\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Redressed\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Tulpen One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Petrona\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Marko One\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Asar\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Nova Flat\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Koulen\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lexend Exa\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Londrina Outline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Cute Font\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"IM Fell Great Primer\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Junge\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Stylish\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Lexend\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Spirax\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Piazzolla\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Piedra\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ribeye Marrow\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Dorsa\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ibarra Real Nova\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"IM Fell DW Pica SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Wellfleet\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Eagle Lake\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Meie Script\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Goblin One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Flavors\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gotu\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Linden Hill\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Chathura\":{\"weight\":[\"100\",\"300\",\"regular\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Croissant One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jomolhari\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Srisakdi\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Modern Antiqua\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Joti One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kavoon\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sulphur Point\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Castoro\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"serif\"},\"Chela One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Atomic Age\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Maiden Orange\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ruthie\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Bayon\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Potta One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Iceberg\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bigshot One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gorditas\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Sree Krushnadevaraya\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Trykker\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Kufam\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"display\"},\"Diplomata SC\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Poor Story\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sirin Stencil\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kavivanar\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Syne Mono\":{\"weight\":[\"regular\"],\"fallback\":\"monospace\"},\"Metal Mania\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Arbutus\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Unlock\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"MuseoModerno\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Glass Antiqua\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Miniver\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Griffy\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bokor\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Felipa\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Inika\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Princess Sofia\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Mrs Sheppards\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Monofett\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sahitya\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"serif\"},\"Dela Gothic One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Shippori Mincho B1\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Beth Ellen\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Lancelot\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Rhodium Libre\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Fraunces\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"Hachi Maru Pop\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Snippet\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Content\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Revalia\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Diplomata\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Libre Barcode 128 Text\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jacques Francois Shadow\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Long Cang\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Caesar Dressing\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Odor Mean Chey\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Jolly Lodger\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Texturina\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\",\"100italic\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\",\"900italic\"],\"fallback\":\"serif\"},\"DotGothic16\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Ewert\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Romanesco\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Kantumruy\":{\"weight\":[\"300\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Asset\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Odibee Sans\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Emblema One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kdam Thmor\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Dr Sugiyama\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Bahiana\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"GFS Neohellenic\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Oldenburg\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Molle\":{\"weight\":[\"italic\"],\"fallback\":\"handwriting\"},\"Ravi Prakash\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gayathri\":{\"weight\":[\"100\",\"regular\",\"700\"],\"fallback\":\"sans-serif\"},\"Almendra SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Varta\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\"],\"fallback\":\"sans-serif\"},\"Risque\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sansita Swashed\":{\"weight\":[\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Kiwi Maru\":{\"weight\":[\"300\",\"regular\",\"500\"],\"fallback\":\"serif\"},\"Dangrek\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Devonshire\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Big Shoulders Stencil Text\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Jim Nightshade\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Smythe\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Stick\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Lexend Mega\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Siemreap\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Londrina Shadow\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Train One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"IM Fell Great Primer SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Barriecito\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Underdog\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Stalinist One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Mr Bedfort\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Freehand\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"MedievalSharp\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lexend Giga\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Keania One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Peddana\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Galindo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Fascinate\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Londrina Sketch\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gupter\":{\"weight\":[\"regular\",\"500\",\"700\"],\"fallback\":\"serif\"},\"Nova Slim\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Snowburst One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"ZCOOL KuaiLe\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Plaster\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Fascinate Inline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Newsreader\":{\"weight\":[\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"200italic\",\"300italic\",\"italic\",\"500italic\",\"600italic\",\"700italic\",\"800italic\"],\"fallback\":\"serif\"},\"Purple Purse\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sedgwick Ave Display\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Jacques Francois\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Almendra Display\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Irish Grover\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kumar One Outline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Andika New Basic\":{\"weight\":[\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Libre Barcode 39 Extended\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Taprom\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Miss Fajardose\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"IM Fell Double Pica SC\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Macondo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Ruge Boogie\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Sunshiney\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Brygada 1918\":{\"weight\":[\"regular\",\"500\",\"600\",\"700\",\"italic\",\"500italic\",\"600italic\",\"700italic\"],\"fallback\":\"serif\"},\"Grenze\":{\"weight\":[\"100\",\"100italic\",\"200\",\"200italic\",\"300\",\"300italic\",\"regular\",\"italic\",\"500\",\"500italic\",\"600\",\"600italic\",\"700\",\"700italic\",\"800\",\"800italic\",\"900\",\"900italic\"],\"fallback\":\"serif\"},\"Erica One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Seymour One\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Supermercado One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Zhi Mang Xing\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Butterfly Kids\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Kirang Haerang\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Federant\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Liu Jian Mao Cao\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Chenla\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Hanalei\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Langar\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Trochut\":{\"weight\":[\"regular\",\"italic\",\"700\"],\"fallback\":\"display\"},\"Smokum\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Black And White Picture\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Preahvihear\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bungee Outline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Astloch\":{\"weight\":[\"regular\",\"700\"],\"fallback\":\"display\"},\"Fasthand\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Akaya Telivigala\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Inria Sans\":{\"weight\":[\"300\",\"300italic\",\"regular\",\"italic\",\"700\",\"700italic\"],\"fallback\":\"sans-serif\"},\"Bonbon\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Combo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nova Script\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sofadi One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Passero One\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Suwannaphum\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Miltonian Tattoo\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Bungee Hairline\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Gidugu\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Geostar Fill\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nerko One\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Lacquer\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Butcherman\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Sevillana\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nova Oval\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Aubrey\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Akaya Kanadaka\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Nova Cut\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Vibes\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Miltonian\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Moulpali\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"BioRhyme Expanded\":{\"weight\":[\"200\",\"300\",\"regular\",\"700\",\"800\"],\"fallback\":\"serif\"},\"Bahianita\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Suravaram\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"},\"Fruktur\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Single Day\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Imbue\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"serif\"},\"Lexend Tera\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Big Shoulders Inline Text\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Dhurjati\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Warnes\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Kenia\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Lexend Peta\":{\"weight\":[\"regular\"],\"fallback\":\"sans-serif\"},\"Big Shoulders Stencil Display\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Geostar\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Big Shoulders Inline Display\":{\"weight\":[\"100\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"display\"},\"Oi\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Xanh Mono\":{\"weight\":[\"regular\",\"italic\"],\"fallback\":\"monospace\"},\"Viaoda Libre\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Truculenta\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\",\"900\"],\"fallback\":\"sans-serif\"},\"Syne Tactile\":{\"weight\":[\"regular\"],\"fallback\":\"display\"},\"Trispace\":{\"weight\":[\"100\",\"200\",\"300\",\"regular\",\"500\",\"600\",\"700\",\"800\"],\"fallback\":\"sans-serif\"},\"Ballet\":{\"weight\":[\"regular\"],\"fallback\":\"handwriting\"},\"Benne\":{\"weight\":[\"regular\"],\"fallback\":\"serif\"}}");

/***/ }),

/***/ "./src/components/typography/index.js":
/*!********************************************!*\
  !*** ./src/components/typography/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/typography/editor.scss");
/* harmony import */ var _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./google-fonts.json */ "./src/components/typography/google-fonts.json");
var _google_fonts_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./google-fonts.json */ "./src/components/typography/google-fonts.json", 1);
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../unit-picker */ "./src/components/unit-picker/index.js");
/* harmony import */ var _utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/get-responsive-placeholder */ "./src/utils/get-responsive-placeholder/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);


/**
 * Internal dependencies
 */




/**
 * WordPress dependencies
 */




/**
 * Typography Component
 */

class TypographyControls extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      showAdvancedTypography: 'true' === localStorage.getItem('generateblocksShowAdvancedTypography') || false
    };
  }

  render() {
    const {
      setAttributes,
      attributes,
      device = '',
      showFontSize = false,
      showFontFamily = false,
      showFontWeight = false,
      showTextTransform = false,
      showLineHeight = false,
      showLetterSpacing = false,
      disableAdvancedToggle = false,
      fontSizePlaceholder = '17'
    } = this.props;
    const fonts = [{
      value: '',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Select font', 'generateblocks')
    }, {
      value: 'Arial',
      label: 'Arial'
    }, {
      value: 'Helvetica',
      label: 'Helvetica'
    }, {
      value: 'Times New Roman',
      label: 'Times New Roman'
    }, {
      value: 'Georgia',
      label: 'Georgia'
    }];
    Object.keys(_google_fonts_json__WEBPACK_IMPORTED_MODULE_2__).slice(0, 20).forEach(k => {
      fonts.push({
        value: k,
        label: k
      });
    });
    fonts.push({
      value: 'other',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Other', 'generateblocks')
    });
    let weight = [{
      value: '',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Default', 'generateblocks')
    }, {
      value: 'normal',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Normal', 'generateblocks')
    }, {
      value: 'bold',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Bold', 'generateblocks')
    }, {
      value: '100',
      label: '100'
    }, {
      value: '200',
      label: '200'
    }, {
      value: '300',
      label: '300'
    }, {
      value: '400',
      label: '400'
    }, {
      value: '500',
      label: '500'
    }, {
      value: '600',
      label: '600'
    }, {
      value: '700',
      label: '700'
    }, {
      value: '800',
      label: '800'
    }, {
      value: '900',
      label: '900'
    }];
    const transform = [{
      value: '',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Default', 'generateblocks')
    }, {
      value: 'uppercase',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Uppercase', 'generateblocks')
    }, {
      value: 'lowercase',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Lowercase', 'generateblocks')
    }, {
      value: 'capitalize',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Capitalize', 'generateblocks')
    }, {
      value: 'initial',
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Normal', 'generateblocks')
    }];

    if (typeof _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily] !== 'undefined' && typeof _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily].weight !== 'undefined') {
      weight = [{
        value: '',
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Default', 'generateblocks')
      }, {
        value: 'normal',
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Normal', 'generateblocks')
      }, {
        value: 'bold',
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Bold', 'generateblocks')
      }];
      _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily].weight.filter(function (k) {
        const hasLetters = k.match(/[a-z]/g);
        const hasNumbers = k.match(/[0-9]/g);

        if (hasLetters && hasNumbers || 'italic' === k || 'regular' === k) {
          return false;
        }

        return true;
      }).forEach(k => {
        weight.push({
          value: k,
          label: k
        });
      });
    }

    const onFontChange = value => {
      if ('other' === value) {
        value = '';
      }

      let fontWeight = attributes.fontWeight; // eslint-disable-line no-unused-vars

      setAttributes({
        fontFamily: value
      });

      if (attributes.fontWeight && Object.values(weight).indexOf(attributes.fontWeight) < 0) {
        fontWeight = ''; // eslint-disable-line no-unused-vars
      }

      if (typeof _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[value] !== 'undefined') {
        setAttributes({
          'googleFont': true,
          // eslint-disable-line quote-props
          'fontFamilyFallback': _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[value].fallback,
          // eslint-disable-line quote-props
          'googleFontVariants': _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[value].weight.join(', ') // eslint-disable-line quote-props

        });
      } else {
        setAttributes({
          'googleFont': false,
          // eslint-disable-line quote-props
          'fontFamilyFallback': '',
          // eslint-disable-line quote-props
          'googleFontVariants': '' // eslint-disable-line quote-props

        });
      }
    };

    const onFontShortcut = event => {
      setAttributes({
        'fontFamily': event.target.value
      }); // eslint-disable-line quote-props

      onFontChange(event.target.value);
    };

    const getValue = (value, setDevice) => {
      const valueName = value + setDevice;
      return attributes[valueName];
    };

    const getAttributeName = (name, setDevice) => {
      const attributeName = name + setDevice;
      return attributeName;
    };

    let showAdvancedToggle = this.state.showAdvancedTypography;

    if (disableAdvancedToggle) {
      showAdvancedToggle = true;
    }

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: 'components-gblocks-typography-weight-transform'
    }, showFontWeight && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Weight', 'generateblocks'),
      value: attributes.fontWeight,
      options: weight,
      onChange: value => {
        setAttributes({
          'fontWeight': value // eslint-disable-line quote-props

        });
      },
      className: "components-base-control"
    }), showTextTransform && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Transform', 'generateblocks'),
      value: attributes.textTransform,
      options: transform,
      onChange: value => {
        setAttributes({
          'textTransform': value // eslint-disable-line quote-props

        });
      },
      className: "components-base-control"
    })), !disableAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Show Advanced Typography', 'generateblocks'),
      checked: !!this.state.showAdvancedTypography,
      onChange: value => {
        localStorage.setItem('generateblocksShowAdvancedTypography', value);
        this.setState({
          showAdvancedTypography: value
        });
      }
    }), showFontFamily && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], {
      className: 'gblocks-font-family-shortcuts'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Font Family', 'generateblocks')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("select", {
      className: "components-select-control__input components-select-control__input--gblocks-fontfamily",
      onChange: onFontShortcut,
      onBlur: onFontShortcut
    }, fonts.map((option, index) => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("option", {
      key: `${option.label}-${option.value}-${index}`,
      value: option.value
    }, option.label)))), showFontFamily && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      value: attributes.fontFamily,
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Enter font name', 'generateblocks'),
      onChange: nextFontFamily => onFontChange(nextFontFamily)
    }), showFontFamily && '' !== attributes.fontFamily && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Google Font', 'generateblocks'),
      checked: !!attributes.googleFont,
      onChange: value => {
        setAttributes({
          'googleFont': value // eslint-disable-line quote-props

        });

        if (value) {
          if (typeof _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily] !== 'undefined') {
            setAttributes({
              'fontFamilyFallback': _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily].fallback,
              // eslint-disable-line quote-props
              'googleFontVariants': _google_fonts_json__WEBPACK_IMPORTED_MODULE_2__[attributes.fontFamily].weight.join(', ') // eslint-disable-line quote-props

            });
          }
        }
      }
    }), !!attributes.googleFont && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Variants', 'generateblocks'),
      value: attributes.googleFontVariants,
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('300, 400, 400i', 'generateblocks'),
      onChange: value => {
        setAttributes({
          'googleFontVariants': value // eslint-disable-line quote-props

        });
      }
    })), showFontFamily && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Font Family Fallback', 'generateblocks'),
      value: attributes.fontFamilyFallback,
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('sans-serif', 'generateblocks'),
      onChange: value => {
        setAttributes({
          'fontFamilyFallback': value // eslint-disable-line quote-props

        });
      }
    }), showFontSize && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_unit_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Font Size', 'generateblocks'),
      value: attributes.fontSizeUnit,
      units: ['px', 'em', '%'],
      onClick: value => {
        setAttributes({
          fontSizeUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      type: 'number',
      value: getValue('fontSize', device) || '',
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_4__["default"])('fontSize', attributes, device, fontSizePlaceholder),
      onChange: value => {
        const name = getAttributeName('fontSize', device);
        setAttributes({
          [name]: parseFloat(value)
        });
      },
      min: 1,
      autoComplete: "off"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        const name = getAttributeName('fontSize', device);
        setAttributes({
          [name]: this.props.defaultFontSize
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Reset', 'generateblocks')))), showLineHeight && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_unit_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Line Height', 'generateblocks'),
      value: attributes.lineHeightUnit,
      units: ['px', 'em', '%'],
      onClick: value => {
        setAttributes({
          lineHeightUnit: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      type: 'number',
      value: getValue('lineHeight', device) || 0 === getValue('lineHeight', device) ? getValue('lineHeight', device) : '',
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_4__["default"])('lineHeight', attributes, device, ''),
      onChange: value => {
        const name = getAttributeName('lineHeight', device);
        setAttributes({
          [name]: value
        });
      },
      onBlur: () => {
        const name = getAttributeName('lineHeight', device);
        setAttributes({
          [name]: parseFloat(getValue('lineHeight', device))
        });
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      },
      min: 0,
      step: .1,
      autoComplete: "off"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        const name = getAttributeName('lineHeight', device);
        setAttributes({
          [name]: this.props.defaultLineHeight
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Reset', 'generateblocks')))), showLetterSpacing && showAdvancedToggle && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["BaseControl"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_unit_picker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Letter Spacing', 'generateblocks'),
      value: 'em',
      units: ['em'],
      onClick: () => {
        return false;
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-typography-control__inputs"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["TextControl"], {
      type: 'number',
      value: getValue('letterSpacing', device) || '',
      placeholder: Object(_utils_get_responsive_placeholder__WEBPACK_IMPORTED_MODULE_4__["default"])('letterSpacing', attributes, device, '0.01'),
      onChange: value => {
        const name = getAttributeName('letterSpacing', device);
        setAttributes({
          [name]: value
        });
      },
      onBlur: () => {
        const name = getAttributeName('letterSpacing', device);

        if ('' !== getValue('letterSpacing', device)) {
          setAttributes({
            [name]: parseFloat(getValue('letterSpacing', device))
          });
        }
      },
      onClick: e => {
        // Make sure onBlur fires in Firefox.
        e.currentTarget.focus();
      },
      min: -1,
      step: .01,
      autoComplete: "off"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      isSmall: true,
      isSecondary: true,
      className: "components-gblocks-default-number",
      onClick: () => {
        const name = getAttributeName('letterSpacing', device);
        setAttributes({
          [name]: this.props.defaultLetterSpacing
        });
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Reset', 'generateblocks')))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TypographyControls);

/***/ }),

/***/ "./src/components/unit-picker/editor.scss":
/*!************************************************!*\
  !*** ./src/components/unit-picker/editor.scss ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/unit-picker/index.js":
/*!*********************************************!*\
  !*** ./src/components/unit-picker/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnitChooser; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/unit-picker/editor.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);

// Import CSS




class UnitChooser extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const {
      label,
      value,
      onClick,
      units,
      id
    } = this.props;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-units-control-header__units"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-units-control-label__units"
    }, !!id ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      htmlFor: id
    }, label) : label), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-gblocks-control__units"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["ButtonGroup"], {
      className: "components-gblocks-control-buttons__units",
      "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Select Units', 'generateblocks')
    }, units.map(unit => {
      let unitName = unit;

      if ('px' === unit) {
        unitName = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["_x"])('Pixel', 'A size unit for CSS markup', 'generateblocks');
      }

      if ('em' === unit) {
        unitName = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["_x"])('Em', 'A size unit for CSS markup', 'generateblocks');
      }

      if ('%' === unit) {
        unitName = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["_x"])('Percentage', 'A size unit for CSS markup', 'generateblocks');
      }

      if ('deg' === unit) {
        unitName = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["_x"])('Degree', 'A size unit for CSS markup', 'generateblocks');
      }

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"]
      /* translators: Unit type (px, em, %) */
      , {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('%s Units', 'generateblocks'), unitName),
        key: unit
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        key: unit,
        className: 'components-gblocks-control-button__units--' + unit,
        isSmall: true,
        isPrimary: value === unit,
        "aria-pressed": value === unit
        /* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
        ,
        "aria-label": Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["sprintf"])(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('%s Units', 'generateblocks'), unitName),
        onClick: () => onClick(unit)
      }, unit));
    }))));
  }

}

/***/ }),

/***/ "./src/components/url-input/editor.scss":
/*!**********************************************!*\
  !*** ./src/components/url-input/editor.scss ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/url-input/index.js":
/*!*******************************************!*\
  !*** ./src/components/url-input/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ButtonURLInput; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_get_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/get-icon */ "./src/utils/get-icon/index.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/components/url-input/editor.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__);


 // Import CSS







class ButtonURLInput extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super(...arguments);
    this.state = {
      moreOptions: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(data) {
    const {
      url,
      target,
      relNoFollow,
      relSponsored
    } = this.props;
    this.props.onChange({ ...{
        url,
        target,
        relNoFollow,
        relSponsored
      },
      ...data
    });
  }

  render() {
    const {
      url,
      target,
      relNoFollow,
      relSponsored,
      className,
      autoFocus
    } = this.props;
    const {
      onChange
    } = this;
    const {
      moreOptions
    } = this.state;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gblocks-component-url-input', className)
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-component-url-input-flex"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__["URLInput"], {
      value: url,
      onChange: value => {
        onChange({
          url: value
        });
      },
      autoFocus: autoFocus // eslint-disable-line jsx-a11y/no-autofocus

    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["Button"], {
      icon: Object(_utils_get_icon__WEBPACK_IMPORTED_MODULE_2__["default"])('ellipsis'),
      label: moreOptions ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Hide More Options', 'generateblocks') : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Show More Options', 'generateblocks'),
      onClick: () => {
        this.setState({
          moreOptions: !moreOptions
        });
      }
    })), moreOptions && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "gblocks-component-url-input-more-options"
    }, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_7__["applyFilters"])('generateblocks.editor.urlInputMoreOptions', '', this.props, this.state), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Open link in a new tab', 'generateblocks'),
      checked: target || '',
      onChange: value => {
        onChange({
          target: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add rel="nofollow"', 'generateblocks'),
      checked: relNoFollow || '',
      onChange: value => {
        onChange({
          relNoFollow: value
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["ToggleControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add rel="sponsored"', 'generateblocks'),
      checked: relSponsored || '',
      onChange: value => {
        onChange({
          relSponsored: value
        });
      }
    })));
  }

}

/***/ }),

/***/ "./src/shared/editor.scss":
/*!********************************!*\
  !*** ./src/shared/editor.scss ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/style-imports.js":
/*!*************************************!*\
  !*** ./src/shared/style-imports.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/shared/editor.scss");


/***/ }),

/***/ "./src/utils/build-css/index.js":
/*!**************************************!*\
  !*** ./src/utils/build-css/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildCSS; });
function buildCSS(cssObj) {
  let css = '';

  for (const [key, value] of Object.entries(cssObj)) {
    if (value.length < 1) {
      continue;
    }

    let tempOutput = key + '{';
    let elementsAdded = 0;

    for (const [index, properties] of Object.entries(value)) {
      // eslint-disable-line no-unused-vars
      for (const [attribute, val] of Object.entries(properties)) {
        if (!val && 0 !== val) {
          continue;
        }

        elementsAdded++;
        tempOutput += attribute + ': ' + val + ';';
      }
    }

    tempOutput += '}';

    if (elementsAdded > 0) {
      css += tempOutput;
    }
  }

  return css;
}

/***/ }),

/***/ "./src/utils/flexbox-alignment/index.js":
/*!**********************************************!*\
  !*** ./src/utils/flexbox-alignment/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return flexboxAlignment; });
function flexboxAlignment(value) {
  if ('left' === value || 'top' === value) {
    return 'flex-start';
  }

  if ('right' === value || 'bottom' === value) {
    return 'flex-end';
  }

  return value;
}

/***/ }),

/***/ "./src/utils/get-all-unique-ids/index.js":
/*!***********************************************!*\
  !*** ./src/utils/get-all-unique-ids/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAllUniqueIds; });
function getAllUniqueIds(allBlocks, data, currentClientId) {
  Object.keys(allBlocks).forEach(key => {
    const clientId = 'undefined' !== typeof allBlocks[key].clientId ? allBlocks[key].clientId : '';
    const blockName = 'undefined' !== typeof allBlocks[key].name ? allBlocks[key].name : '';

    if (clientId !== currentClientId && blockName.includes('generateblocks')) {
      data.push(allBlocks[key].attributes.uniqueId);
    }

    if ('undefined' !== typeof allBlocks[key].innerBlocks && allBlocks[key].innerBlocks.length > 0) {
      getAllUniqueIds(allBlocks[key].innerBlocks, data, currentClientId);
    }
  });
  return data;
}

/***/ }),

/***/ "./src/utils/get-background-image/index.js":
/*!*************************************************!*\
  !*** ./src/utils/get-background-image/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBackgroundImageCSS; });
/* harmony import */ var _hex_to_rgba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hex-to-rgba */ "./src/utils/hex-to-rgba/index.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);


function getBackgroundImageCSS(type, props) {
  const attributes = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])('generateblocks.editor.cssAttrs', props.attributes, props);
  const {
    backgroundColor,
    backgroundColorOpacity,
    bgImage,
    gradient,
    bgOptions,
    gradientColorOne,
    gradientColorOneOpacity,
    gradientColorTwo,
    gradientColorTwoOpacity,
    gradientColorStopOne,
    gradientColorStopTwo,
    gradientDirection
  } = attributes;
  let gradientValue = '';

  if (gradient) {
    let gradientColorStopOneValue = '',
        gradientColorStopTwoValue = '';
    const gradientColorOneValue = Object(_hex_to_rgba__WEBPACK_IMPORTED_MODULE_0__["default"])(gradientColorOne, gradientColorOneOpacity);
    const gradientColorTwoValue = Object(_hex_to_rgba__WEBPACK_IMPORTED_MODULE_0__["default"])(gradientColorTwo, gradientColorTwoOpacity);

    if (gradientColorOne && '' !== gradientColorStopOne) {
      gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
    }

    if (gradientColorTwo && '' !== gradientColorStopTwo) {
      gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
    }

    gradientValue = 'linear-gradient(' + gradientDirection + 'deg, ' + gradientColorOneValue + gradientColorStopOneValue + ', ' + gradientColorTwoValue + gradientColorStopTwoValue + ')';
  }

  if ('gradient' === type) {
    return gradientValue;
  }

  let backgroundImage = false;
  const backgroundColorValue = Object(_hex_to_rgba__WEBPACK_IMPORTED_MODULE_0__["default"])(backgroundColor, backgroundColorOpacity);

  if (!!bgImage) {
    let url = bgImage.image.url;
    url = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])('generateblocks.editor.bgImageURL', url, props);

    if ('element' === bgOptions.selector && (backgroundColorValue || gradient) && 'undefined' !== typeof bgOptions.overlay && bgOptions.overlay) {
      // Old background image overlays mixed with our gradients.
      if (gradient) {
        backgroundImage = gradientValue + ', url(' + url + ')';
      } else if (backgroundColorValue) {
        backgroundImage = 'linear-gradient(0deg, ' + backgroundColorValue + ', ' + backgroundColorValue + '), url(' + url + ')';
      }
    } else {
      backgroundImage = 'url(' + url + ')';
    }
  }

  return backgroundImage;
}

/***/ }),

/***/ "./src/utils/get-icon/index.js":
/*!*************************************!*\
  !*** ./src/utils/get-icon/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getIcon; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const el = wp.element.createElement;
function getIcon(icon) {
  if ('tabs-desktop' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none'
    }, el('path', {
      d: 'M18.95 4H4.55C3.55589 4 2.75 4.76751 2.75 5.71429V14.2857C2.75 15.2325 3.55589 16 4.55 16H18.95C19.9441 16 20.75 15.2325 20.75 14.2857V5.71429C20.75 4.76751 19.9441 4 18.95 4Z',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }), el('path', {
      d: 'M1.75 18C1.19772 18 0.75 18.4477 0.75 19C0.75 19.5523 1.19772 20 1.75 20H21.75C22.3023 20 22.75 19.5523 22.75 19C22.75 18.4477 22.3023 18 21.75 18H1.75ZM9 18.8C8.86193 18.8 8.75 18.9119 8.75 19.05C8.75 19.1881 8.86193 19.3 9 19.3H14.5C14.6381 19.3 14.75 19.1881 14.75 19.05C14.75 18.9119 14.6381 18.8 14.5 18.8H9Z',
      stroke: 'currentColor',
      fillRule: 'evenodd',
      clipRule: 'evenodd'
    }));
  }

  if ('tabs-tablet' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24'
    }, el('path', {
      d: 'M16.6429 4H7.35714C6.33147 4 5.5 4.71634 5.5 5.6V18.4C5.5 19.2837 6.33147 20 7.35714 20H16.6429C17.6685 20 18.5 19.2837 18.5 18.4V5.6C18.5 4.71634 17.6685 4 16.6429 4Z'
    }), el('path', {
      d: 'M12 17.5H12.01'
    }));
  }

  if ('tabs-mobile' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24'
    }, el('path', {
      d: 'M15.5714 4H8.42857C7.63959 4 7 4.71634 7 5.6V18.4C7 19.2837 7.63959 20 8.42857 20H15.5714C16.3604 20 17 19.2837 17 18.4V5.6C17 4.71634 16.3604 4 15.5714 4Z'
    }), el('path', {
      d: 'M12 17.5H12.01'
    }));
  }

  if ('sync' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24'
    }, el('path', {
      d: 'm7.34133533 6.23855964v-1.98499625c-2.17404351.03150788-4.03300825 1.38634659-4.85221305 3.27681921-.31507877.72468117-.44111028 1.51237809-.4096024 2.33158289.06301575 1.13428361.47261815 2.20555141 1.16579145 3.05626411.37809452.4411102.28357089 1.1027757-.18904726 1.4493623-.44111028.3150788-1.07126782.2205551-1.41785447-.1890473-.85071268-1.0397599-1.38634658-2.3315829-1.54388597-3.7179294-.12603151-1.00825211-.03150788-2.01650417.25206302-2.9302326.88222055-3.02475619 3.6864216-5.26181546 6.99474868-5.29332334v-1.98499624c0-.09452363.12603151-.15753939.22055514-.09452363l4.09602403 2.99324831c.0630157.06301575.0630157.15753938 0 .18904726l-4.09602403 2.99324831c-.09452363.06301575-.22055514 0-.22055514-.09452363zm.22055514 13.17029256c.09452363.0630158.22055514 0 .22055514-.0945236v-1.9849963c3.30832709-.0315078 6.11252809-2.2685671 6.99474869-5.2933233.252063-.9137284.3780945-1.8904726.252063-2.93023256-.1575394-1.38634658-.7246812-2.67816954-1.543886-3.71792948-.3465866-.44111028-.9767441-.53563391-1.4178544-.18904726-.4726182.34658665-.5671418 1.00825206-.1890473 1.44936234.6931733.85071268 1.1027757 1.89047262 1.1657915 3.05626407.0315078.81920479-.1260315 1.63840959-.4096024 2.33158289-.787697 1.8904726-2.6466617 3.2453113-4.85221309 3.2768192v-1.9849962c0-.0945237-.12603151-.1575394-.22055514-.0945237l-4.096024 2.9932483c-.06301576.0630158-.06301576.1575394 0 .1890473z',
      transform: 'translate(4 2)'
    }));
  }

  if ('headline' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 20 20',
      style: {
        padding: '1px'
      }
    }, el('path', {
      d: 'M12.5 4v5.2h-5V4H5v13h2.5v-5.2h5V17H15V4',
      fill: '#1e72bd'
    }));
  }

  if ('grid' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      style: {
        padding: '1px'
      }
    }, el('path', {
      d: 'M20 .6c0-.3-.2-.6-.5-.6H.5C.2 0 0 .3 0 .6v4.6c0 .3.2.6.5.6h19c.3 0 .5-.3.5-.6V.6zM6.7 7.7c0-.3-.2-.6-.5-.6H.5c-.3 0-.5.3-.5.6v4.6c0 .3.2.6.5.6h5.6c.3 0 .5-.3.5-.6l.1-4.6zM19.9 7.7c0-.3-.2-.6-.6-.6H8.6c-.4 0-.6.3-.6.6v4.5c0 .3.2.6.6.6h10.8c.3 0 .6-.3.6-.6l-.1-4.5z',
      fill: '#1d72ba'
    }), el('path', {
      d: 'M20 14.8c0-.3-.2-.6-.5-.6h-5.6c-.3 0-.5.2-.5.6v4.6c0 .3.2.6.5.6h5.6c.3 0 .5-.2.5-.6v-4.6zM12 14.8c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.5.5v4.6c0 .4.2.6.5.6h11c.3 0 .5-.2.5-.5v-4.7z',
      fill: '#1d72ba'
    }));
  }

  if ('container' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      style: {
        padding: '1px'
      }
    }, el('path', {
      d: 'M2.8 3.4c0-.4.3-.7.7-.7h1.2V0H3.4C1.5 0 0 1.5 0 3.4v1.2h2.8V3.4zM0 7.4h2.8v5.3H0zM17.2 7.4H20v5.3h-2.8zM17.2 16.6c0 .4-.3.7-.7.7h-1.2V20h1.2c1.9 0 3.4-1.5 3.4-3.4v-1.2h-2.8v1.2h.1zM7.4 0h5.3v2.8H7.4zM3.4 17.2c-.4 0-.7-.3-.7-.7v-1.2H0v1.2c0 2 1.5 3.5 3.4 3.5h1.2v-2.8H3.4zM7.4 17.2h5.3V20H7.4zM16.6 2.8c.4 0 .7.3.7.7v1.2H20V3.4C20 1.5 18.5 0 16.6 0h-1.2v2.8h1.2z',
      fill: '#1e72bd'
    }));
  }

  if ('button' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      style: {
        padding: '1px'
      }
    }, el('path', {
      d: 'M19.2 0H.8C.4 0 0 .4 0 .8v6.4c0 .4.4.8.8.8h18.4c.4 0 .8-.4.8-.8V.8c0-.4-.4-.8-.8-.8zM18.4 12H1.6c-.9 0-1.6.7-1.6 1.6v4.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6v-4.8c0-.9-.7-1.6-1.6-1.6zm.4 6.4c0 .2-.2.4-.4.4H1.6c-.2 0-.4-.2-.4-.4v-4.8c0-.2.2-.4.4-.4h16.8c.2 0 .4.2.4.4v4.8z',
      fill: '#1e72bd'
    }));
  }

  if ('paragraph' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20'
    }, el('path', {
      d: 'M15 2H7.54c-.83 0-1.59.2-2.28.6-.7.41-1.25.96-1.65 1.65C3.2 4.94 3 5.7 3 6.52s.2 1.58.61 2.27c.4.69.95 1.24 1.65 1.64.69.41 1.45.61 2.28.61h.43V17c0 .27.1.51.29.71.2.19.44.29.71.29.28 0 .51-.1.71-.29.2-.2.3-.44.3-.71V5c0-.27.09-.51.29-.71.2-.19.44-.29.71-.29s.51.1.71.29c.19.2.29.44.29.71v12c0 .27.1.51.3.71.2.19.43.29.71.29.27 0 .51-.1.71-.29.19-.2.29-.44.29-.71V4H15c.27 0 .5-.1.7-.3.2-.19.3-.43.3-.7s-.1-.51-.3-.71A.984.984 0 0 0 15 2z'
    }));
  }

  if ('spacing' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.283,6.217c8.289,8.29 8.289,91.776 0,100.066c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.29,-8.289 91.776,-8.289 100.066,0Zm-10.007,10.007c6.632,6.632 6.632,73.42 0,80.052c-6.632,6.632 -73.42,6.632 -80.052,0c-6.632,-6.632 -6.632,-73.42 0,-80.052c6.632,-6.632 73.42,-6.632 80.052,0Z'
    }), el('path', {
      d: 'M40.452,77.705c7.802,1.393 23.794,1.393 31.596,0l13.635,13.635c-12.215,3.213 -46.652,3.213 -58.866,0l13.635,-13.635Zm50.888,-50.888c3.213,12.215 3.213,46.653 0,58.866l-13.635,-13.635c1.393,-7.801 1.393,-23.794 0,-31.596l13.635,-13.635Zm-70.18,0l13.635,13.635c-1.393,7.802 -1.393,23.794 0,31.596l-13.635,13.635c-3.213,-12.213 -3.213,-46.651 0,-58.866Zm5.657,-5.657c12.214,-3.213 46.652,-3.213 58.866,0l-13.635,13.635c-7.801,-1.393 -23.795,-1.393 -31.596,0l-13.635,-13.635Z'
    }));
  }

  if ('advanced' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.283,6.217c8.289,8.29 8.289,91.776 0,100.066c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.29,-8.289 91.776,-8.289 100.066,0Zm-10.007,37.215c6.632,2.124 6.632,23.512 0,25.636c-6.632,2.124 -73.42,2.124 -80.052,0c-6.632,-2.124 -6.632,-23.512 0,-25.636c6.632,-2.124 73.42,-2.124 80.052,0Z'
    }), el('path', {
      d: 'M48.61,51.916c2.243,0.718 2.243,7.95 0,8.668c-2.242,0.718 -24.823,0.718 -27.065,0c-2.243,-0.718 -2.243,-7.95 0,-8.668c2.242,-0.718 24.823,-0.718 27.065,0Z'
    }), el('path', {
      d: 'M90.955,51.916c2.243,0.718 2.243,7.95 0,8.668c-2.242,0.718 -24.823,0.718 -27.065,0c-2.243,-0.718 -2.243,-7.95 0,-8.668c2.242,-0.718 24.823,-0.718 27.065,0Z'
    }));
  }

  if ('backgrounds' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M1.491,87.777l37.79,-37.79l31.352,31.352c2.412,2.171 5.656,0 5.656,0l17.248,-17.247l13.186,13.186l4.796,4.797c-0.971,12.199 -2.726,21.685 -5.249,24.208c-8.29,8.289 -91.776,8.289 -100.066,0c-2.113,-2.113 -3.687,-9.113 -4.713,-18.506Z'
    }), el('path', {
      d: 'M0.631,77.323c-1.742,-27.728 0.125,-65.658 5.573,-71.106c8.29,-8.289 91.776,-8.289 100.066,0c5.07,5.07 7.039,38.265 5.89,65.185l-15.795,-15.795c-2.412,-2.172 -5.657,0 -5.657,0l-17.247,17.246l-31.351,-31.351c-0.731,-0.658 -1.036,-1 -2.619,-1.166c-0.263,0 -0.477,-0.075 -1.245,0.131c-0.912,0.244 -1.793,1.035 -1.793,1.035l-35.822,35.821Zm76.434,-59.584c7.115,0 12.891,5.776 12.891,12.89c0,7.114 -5.776,12.89 -12.891,12.89c-7.114,0 -12.89,-5.776 -12.89,-12.89c0,-7.114 5.776,-12.89 12.89,-12.89Z'
    }));
  }

  if ('colors' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.283,6.217c8.289,8.29 8.289,91.776 0,100.066c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.29,-8.289 91.776,-8.289 100.066,0Zm-50.033,12.818c-20.551,0 -37.215,16.664 -37.215,37.215c0,20.551 16.664,37.215 37.215,37.215c3.432,0 6.202,-2.77 6.202,-6.203c0,-1.612 -0.62,-3.059 -1.612,-4.176c-0.951,-1.075 -1.571,-2.522 -1.571,-4.094c0,-3.432 2.77,-6.202 6.202,-6.202l7.319,0c11.413,0 20.675,-9.262 20.675,-20.675c0,-18.277 -16.664,-33.08 -37.215,-33.08Zm-22.742,37.215c-3.433,0 -6.203,-2.77 -6.203,-6.202c0,-3.433 2.77,-6.203 6.203,-6.203c3.432,0 6.202,2.77 6.202,6.203c0,3.432 -2.77,6.202 -6.202,6.202Zm45.484,0c-3.432,0 -6.202,-2.77 -6.202,-6.202c0,-3.433 2.77,-6.203 6.202,-6.203c3.433,0 6.203,2.77 6.203,6.203c0,3.432 -2.77,6.202 -6.203,6.202Zm-33.079,-16.54c-3.433,0 -6.203,-2.77 -6.203,-6.202c0,-3.433 2.77,-6.203 6.203,-6.203c3.432,0 6.202,2.77 6.202,6.203c0,3.432 -2.77,6.202 -6.202,6.202Zm20.674,0c-3.432,0 -6.202,-2.77 -6.202,-6.202c0,-3.433 2.77,-6.203 6.202,-6.203c3.433,0 6.203,2.77 6.203,6.203c0,3.432 -2.77,6.202 -6.203,6.202Z'
    }));
  }

  if ('gradients' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M112.426,48.746c0.503,25.204 -1.545,52.939 -6.143,57.537c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.289,-8.288 91.748,-8.289 100.061,-0.004c0,0 0.005,0.004 0.005,0.004c3.691,3.692 5.739,22.295 6.143,42.529Zm-16.154,-32.526c-6.656,-6.628 -73.418,-6.627 -80.048,0.004c-6.631,6.63 -6.632,73.392 -0.004,80.048l80.052,-80.052Z'
    }));
  }

  if ('icons' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.283,6.217c8.289,8.29 8.289,91.776 0,100.066c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.29,-8.289 91.776,-8.289 100.066,0Zm-10.007,10.007c6.632,6.632 6.632,73.42 0,80.052c-6.632,6.632 -73.42,6.632 -80.052,0c-6.632,-6.632 -6.632,-73.42 0,-80.052c6.632,-6.632 73.42,-6.632 80.052,0Z'
    }), el('path', {
      d: 'M89.605,22.895c5.527,5.526 5.527,61.184 0,66.71c-5.526,5.527 -61.184,5.527 -66.71,0c-5.527,-5.526 -5.527,-61.184 0,-66.71c5.526,-5.527 61.184,-5.527 66.71,0Zm-21.066,62.31l0,-2.731c-0.648,-0.074 -1.272,-0.199 -1.87,-0.374c-0.599,-0.174 -1.148,-0.374 -1.646,-0.598c-0.699,-0.299 -1.235,-0.755 -1.609,-1.366c-0.374,-0.611 -0.561,-1.353 -0.561,-2.226l0,-29.703l-0.561,-0.561l-18.331,0.972l0,2.731c0.748,0.075 1.577,0.25 2.488,0.524c0.91,0.274 1.589,0.561 2.038,0.86c0.599,0.399 1.098,0.929 1.497,1.59c0.399,0.661 0.598,1.428 0.598,2.301l0,21.773c0,0.923 -0.162,1.665 -0.486,2.226c-0.324,0.561 -0.885,0.991 -1.683,1.29c-0.449,0.175 -0.986,0.3 -1.609,0.374c-0.624,0.075 -1.26,0.138 -1.908,0.187l0,2.731l23.643,0Zm-12.978,-59.459c4.76,0 8.625,3.864 8.625,8.625c0,4.76 -3.865,8.625 -8.625,8.625c-4.76,0 -8.625,-3.865 -8.625,-8.625c0,-4.761 3.865,-8.625 8.625,-8.625Z'
    }));
  }

  if ('typography' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.283,6.217c8.289,8.29 8.289,91.776 0,100.066c-8.29,8.289 -91.776,8.289 -100.066,0c-8.289,-8.29 -8.289,-91.776 0,-100.066c8.29,-8.289 91.776,-8.289 100.066,0Zm-8.783,78.583l0,-2.817c-0.661,-0.026 -1.481,-0.165 -2.46,-0.417c-0.979,-0.251 -1.773,-0.562 -2.381,-0.932c-0.9,-0.609 -1.601,-1.23 -2.103,-1.865c-0.503,-0.635 -0.953,-1.468 -1.349,-2.5l-18.769,-48.569l-3.175,0c-2.672,6.878 -5.714,14.721 -9.126,23.53c-3.266,8.43 -6.265,16.06 -8.998,22.891l-11.672,-28.684l-2.304,0c-1.939,4.742 -4.148,10.149 -6.625,16.222c-2.477,6.072 -4.743,11.543 -6.798,16.412c-0.403,0.949 -0.816,1.692 -1.238,2.23c-0.423,0.538 -1.018,1.053 -1.786,1.545c-0.48,0.292 -1.095,0.524 -1.844,0.698c-0.749,0.173 -1.373,0.278 -1.872,0.314l0,1.942l15.382,0l0,-1.942c-1.518,-0.073 -2.881,-0.31 -4.091,-0.711c-1.209,-0.401 -1.814,-0.966 -1.814,-1.696c0,-0.31 0.048,-0.711 0.144,-1.204c0.096,-0.492 0.268,-1.13 0.518,-1.914c0.269,-0.803 0.571,-1.678 0.907,-2.626c0.336,-0.948 0.773,-2.061 1.311,-3.338l14.316,0l3.399,8.699c0.012,0.03 0.024,0.06 0.036,0.092c-0.161,0.119 -0.329,0.237 -0.503,0.355c-0.661,0.423 -1.508,0.76 -2.539,1.012c-1.032,0.251 -1.892,0.403 -2.58,0.456l0,2.817l21.19,0l0,-2.817c-2.09,-0.106 -3.968,-0.45 -5.635,-1.032c-1.666,-0.582 -2.499,-1.402 -2.499,-2.46c0,-0.45 0.066,-1.032 0.198,-1.746c0.132,-0.714 0.37,-1.64 0.714,-2.777c0.371,-1.164 0.787,-2.434 1.25,-3.81c0.463,-1.375 1.065,-2.989 1.806,-4.841l19.721,0l4.682,12.619c0.106,0.264 0.186,0.568 0.238,0.912c0.053,0.344 0.08,0.635 0.08,0.873c0,0.582 -0.681,1.072 -2.044,1.468c-1.362,0.397 -3.075,0.662 -5.138,0.794l0,2.817l23.451,0Zm-56.864,-15.865l-6.193,-15.045l-6.078,15.045l12.271,0Zm34.167,-7.15l-8.532,-21.824l-8.373,21.824l16.905,0Z'
    }));
  }

  if ('addContainer' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 64 64',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M41.454,57.126l0,6.409c-6.088,0.286 -12.82,0.286 -18.908,0l0,-6.409c5.957,0.366 12.951,0.366 18.908,0Zm-33.93,-8.899c0.458,3.226 1.086,5.568 1.883,6.366c0.798,0.797 3.14,1.425 6.366,1.883l0,6.592c-6.084,-0.578 -10.706,-1.519 -12.015,-2.826c-1.307,-1.309 -2.248,-5.931 -2.826,-12.015l6.592,0Zm55.544,0c-0.578,6.084 -1.519,10.706 -2.826,12.015c-1.309,1.307 -5.931,2.248 -12.015,2.826l0,-6.592c3.226,-0.458 5.568,-1.086 6.366,-1.883c0.797,-0.798 1.425,-3.14 1.883,-6.366l6.592,0Zm0.467,-25.681c0.286,6.088 0.286,12.82 0,18.908l-6.409,0c0.366,-5.957 0.366,-12.951 0,-18.908l6.409,0Zm-56.661,0c-0.366,5.957 -0.366,12.951 0,18.908l-6.409,0c-0.286,-6.088 -0.286,-12.82 0,-18.908l6.409,0Zm41.353,-21.614c6.084,0.578 10.706,1.519 12.015,2.826c1.307,1.309 2.248,5.931 2.826,12.015l-6.592,0c-0.458,-3.226 -1.086,-5.568 -1.883,-6.366c-0.798,-0.797 -3.14,-1.425 -6.366,-1.883l0,-6.592Zm-32.454,0l0,6.592c-3.226,0.458 -5.568,1.086 -6.366,1.883c-0.797,0.798 -1.425,3.14 -1.883,6.366l-6.592,0c0.578,-6.084 1.519,-10.706 2.826,-12.015c1.309,-1.307 5.931,-2.248 12.015,-2.826Zm6.773,-0.467c6.088,-0.286 12.82,-0.286 18.908,0l0,6.409c-5.957,-0.366 -12.951,-0.366 -18.908,0l0,-6.409Z'
    }), el('path', {
      d: 'M18.03,29.037l11.007,0l0,-11.007l6.773,0l0,11.007l11.007,0l0,6.773l-11.007,0l0,11.007l-6.773,0l0,-11.007l-11.007,0l0,-6.773Z'
    }));
  }

  if ('gradient' === icon) {
    return el('svg', {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M17.66 8L12 2.35L6.34 8A8.02 8.02 0 0 0 4 13.64c0 2 .78 4.11 2.34 5.67a7.99 7.99 0 0 0 11.32 0c1.56-1.56 2.34-3.67 2.34-5.67S19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z'
    }));
  }

  if ('documentation' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.755 6.245c8.327 8.326 8.327 92.184 0 100.51-8.326 8.327-92.184 8.327-100.51 0-8.327-8.326-8.327-92.184 0-100.51 8.326-8.327 92.184-8.327 100.51 0zm-92.661 93.896C9.279 84 9.781 23.714 15.834 17.661c2.491-2.491 19.588-4.132 26.354-4.712 4.748-.408 10.115.671 14.243 1.23 4.128-.559 9.495-1.638 14.243-1.23 6.766.58 23.863 2.221 26.354 4.712 6.053 6.053 6.791 66.339 1.976 82.48-4.729-1.977-19.708-3.436-26.784-3.853-5.234-.308-11.129.739-15.671 1.354-4.543-.615-10.437-1.662-15.672-1.354-7.075.417-22.054 1.876-26.783 3.853z'
    }), el('path', {
      d: 'M50.188 32.738c2.252.536 2.252 5.927 0 6.463-2.252.535-24.934.535-27.186 0-2.252-.536-2.252-5.927 0-6.463 2.252-.535 24.934-.535 27.186 0zM50.277 46.846c2.252.535 2.252 5.927 0 6.462-2.252.535-24.934.535-27.186 0-2.252-.535-2.252-5.927 0-6.462 2.252-.535 24.934-.535 27.186 0zM50.277 60.037c2.252.535 2.252 5.927 0 6.462-2.252.535-24.934.535-27.186 0-2.252-.535-2.252-5.927 0-6.462 2.252-.535 24.934-.535 27.186 0zM50.277 73.799c2.252.536 2.252 5.927 0 6.463-2.252.535-24.934.535-27.186 0-2.252-.536-2.252-5.927 0-6.463 2.252-.535 24.934-.535 27.186 0z'
    }), el('path', {
      d: 'M89.909 32.738c2.252.536 2.252 5.927 0 6.463-2.252.535-24.934.535-27.186 0-2.252-.536-2.252-5.927 0-6.463 2.252-.535 24.934-.535 27.186 0zM89.998 46.846c2.252.535 2.252 5.927 0 6.462-2.252.535-24.934.535-27.186 0-2.252-.535-2.252-5.927 0-6.462 2.252-.535 24.934-.535 27.186 0zM89.998 60.037c2.252.535 2.252 5.927 0 6.462-2.252.535-24.934.535-27.186 0-2.252-.535-2.252-5.927 0-6.462 2.252-.535 24.934-.535 27.186 0z'
    }));
  }

  if ('layout' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.719 6.238c8.362 8.362 8.362 92.208 0 100.57-8.362 8.287-92.208 8.287-100.495 0-8.362-8.362-8.362-92.208 0-100.57 8.287-8.286 92.133-8.286 100.495 0zm-9.417 9.417c6.78 6.78 6.78 74.957 0 81.737-6.78 6.78-74.956 6.78-81.661 0-6.78-6.78-6.78-74.957 0-81.737 6.705-6.78 74.881-6.78 81.661 0z'
    }), el('path', {
      d: 'M93.988 48.877c.602 17.477-.754 37.893-3.993 41.132-3.164 3.164-22.75 4.52-40.002 4.068v-45.2h43.995zm-75.108 0h23.58v44.899c-9.718-.603-17.553-1.808-19.512-3.767-3.24-3.24-4.595-23.655-4.068-41.132zm.377-7.533c.678-9.19 1.883-16.498 3.691-18.306 5.575-5.575 61.472-5.575 67.047 0 1.808 1.808 3.013 9.115 3.691 18.306h-74.43z'
    }));
  }

  if ('shapes' === icon) {
    return el('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 113 113',
      fillRule: 'evenodd'
    }, el('path', {
      d: 'M106.756,6.244C115.081,14.571 115.081,98.429 106.756,106.756C98.429,115.081 14.571,115.081 6.244,106.756C-2.081,98.429 -2.081,14.571 6.244,6.244C14.571,-2.081 98.429,-2.081 106.756,6.244ZM67.875,88.052C67.875,86.977 67.003,86.105 65.928,86.105L47.072,86.105C45.997,86.105 45.125,86.977 45.125,88.052L45.125,91.948C45.125,93.023 45.997,93.896 47.072,93.896L65.928,93.896C67.003,93.896 67.875,93.023 67.875,91.948L67.875,88.052ZM57.899,31.409L59.305,31.409C60.853,31.409 62.11,30.152 62.11,28.604L62.11,28.089L73.263,57.543C73.757,58.333 73.731,59.161 73.731,59.403C73.729,62.659 65.231,69.414 65.375,83.611L47.625,83.611C47.769,69.414 39.271,62.659 39.269,59.403C39.269,59.161 39.243,58.333 39.737,57.543L50.89,28.089L50.89,28.604C50.89,30.152 52.147,31.409 53.695,31.409L55.101,31.409C55.111,35.738 55.142,50.367 55.098,54.109C55.093,54.494 54.907,54.988 54.68,55.45C52.915,56.169 51.669,57.903 51.669,59.925C51.669,62.592 53.834,64.756 56.5,64.756C59.166,64.756 61.331,62.592 61.331,59.925C61.331,57.903 60.085,56.169 58.32,55.45C58.093,54.988 57.907,54.494 57.902,54.109C57.858,50.367 57.889,35.738 57.899,31.409ZM52.227,19.451L52.227,18.881C52.227,17.702 53.185,16.745 54.364,16.745L58.636,16.745C59.815,16.745 60.773,17.702 60.773,18.881L60.773,19.451L88.831,19.451C89.457,17.867 91.002,16.745 92.807,16.745C95.165,16.745 97.08,18.66 97.08,21.018C97.08,23.376 95.165,25.29 92.807,25.29C91.03,25.29 89.505,24.203 88.861,22.658L71.798,22.658C83.83,28.003 92.531,39.501 93.898,53.148L94.93,53.148C96.109,53.148 97.067,54.105 97.067,55.284L97.067,59.557C97.067,60.736 96.109,61.693 94.93,61.693L90.657,61.693C89.478,61.693 88.521,60.736 88.521,59.557L88.521,55.284C88.521,54.105 89.478,53.148 90.657,53.148L90.922,53.148C89.19,37.24 76.627,24.564 60.773,22.659L60.773,23.154C60.773,24.333 59.815,25.29 58.636,25.29L54.364,25.29C53.185,25.29 52.227,24.333 52.227,23.154L52.227,22.688C36.484,24.689 24.036,37.318 22.312,53.148L22.329,53.148C23.508,53.148 24.466,54.105 24.466,55.284L24.466,59.557C24.466,60.736 23.508,61.693 22.329,61.693L18.056,61.693C16.877,61.693 15.92,60.736 15.92,59.557L15.92,55.284C15.92,54.105 16.877,53.148 18.056,53.148L19.336,53.148C20.703,39.501 29.405,28.003 41.437,22.658L24.139,22.658C23.495,24.203 21.97,25.29 20.193,25.29C17.835,25.29 15.92,23.376 15.92,21.018C15.92,18.66 17.835,16.745 20.193,16.745C21.998,16.745 23.543,17.867 24.169,19.451L52.227,19.451Z'
    }));
  }

  if ('wrench' === icon) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
      x: "0",
      fill: "none",
      width: "20",
      height: "20"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      d: "M16.68 9.77c-1.34 1.34-3.3 1.67-4.95.99l-5.41 6.52c-.99.99-2.59.99-3.58 0s-.99-2.59 0-3.57l6.52-5.42c-.68-1.65-.35-3.61.99-4.95 1.28-1.28 3.12-1.62 4.72-1.06l-2.89 2.89 2.82 2.82 2.86-2.87c.53 1.58.18 3.39-1.08 4.65zM3.81 16.21c.4.39 1.04.39 1.43 0 .4-.4.4-1.04 0-1.43-.39-.4-1.03-.4-1.43 0-.39.39-.39 1.03 0 1.43z"
    })));
  }

  if ('x' === icon) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
      x: "0",
      fill: "none",
      width: "20",
      height: "20"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      d: "M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"
    })));
  }

  if ('ellipsis' === icon) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
      x: "0",
      fill: "none",
      width: "20",
      height: "20"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      d: "M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    })));
  }

  if ('insert' === icon) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
      x: "0",
      fill: "none",
      width: "20",
      height: "20"
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
      d: "M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"
    })));
  }
}

/***/ }),

/***/ "./src/utils/get-responsive-placeholder/index.js":
/*!*******************************************************!*\
  !*** ./src/utils/get-responsive-placeholder/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getResponsivePlaceholder; });
function getResponsivePlaceholder(name, attributes, device, fallback) {
  let responsivePlaceholder = attributes[name];

  if ('Mobile' === device && attributes[name + 'Tablet']) {
    responsivePlaceholder = attributes[name + 'Tablet'];
  }

  if ('' === responsivePlaceholder || false === responsivePlaceholder) {
    responsivePlaceholder = fallback;
  }

  return responsivePlaceholder;
}

/***/ }),

/***/ "./src/utils/has-numeric-value/index.js":
/*!**********************************************!*\
  !*** ./src/utils/has-numeric-value/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hasNumericValue; });
/**
 * Check if we have a numeric value.
 *
 * @param {string} value The value to check.
 * @return {boolean} Whether a value exists.
 */
function hasNumericValue(value) {
  return value || 0 === value;
}

/***/ }),

/***/ "./src/utils/hex-to-rgba/index.js":
/*!****************************************!*\
  !*** ./src/utils/hex-to-rgba/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hexToRGBA; });
/**
 * Turn hex values to RGBA.
 *
 * @param {string} hex the color hex.
 * @param {number} alpha the alpha number.
 * @return {string} rgba color.
 */
function hexToRGBA(hex, alpha) {
  if (!hex) {
    return '';
  }

  if (!alpha && 0 !== alpha) {
    return hex;
  }

  if (1 === alpha) {
    return hex;
  }

  hex = hex.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

/***/ }),

/***/ "./src/utils/sanitize-svg/index.js":
/*!*****************************************!*\
  !*** ./src/utils/sanitize-svg/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sanitizeSVG; });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);

function sanitizeSVG(svg) {
  return dompurify__WEBPACK_IMPORTED_MODULE_0___default.a.sanitize(svg, {
    USE_PROFILES: {
      svg: true,
      svgFilters: true
    }
  });
}

/***/ }),

/***/ "./src/utils/shorthand-css/index.js":
/*!******************************************!*\
  !*** ./src/utils/shorthand-css/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return shorthandCSS; });
function shorthandCSS(top, right, bottom, left, unit) {
  if ('' === top && '' === right && '' === bottom && '' === left) {
    return;
  }

  top = parseFloat(top) != 0 && '' !== top ? parseFloat(top) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  right = parseFloat(right) != 0 && '' !== right ? parseFloat(right) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  bottom = parseFloat(bottom) != 0 && '' !== bottom ? parseFloat(bottom) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  left = parseFloat(left) != 0 && '' !== left ? parseFloat(left) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  if (right === left) {
    left = '';

    if (top === bottom) {
      bottom = '';

      if (top === right) {
        right = '';
      }
    }
  }

  const output = top + right + bottom + left;
  return output.trim();
}

/***/ }),

/***/ "./src/utils/value-with-unit/index.js":
/*!********************************************!*\
  !*** ./src/utils/value-with-unit/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return valueWithUnit; });
function valueWithUnit(value, unit) {
  if (!value && 0 !== value) {
    return false;
  }

  return value + unit;
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["compose"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["hooks"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["richText"]; }());

/***/ })

/******/ });
//# sourceMappingURL=blocks.js.map
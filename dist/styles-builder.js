/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@edge22/styles-builder/dist/generateblocks.js":
/*!********************************************************************!*\
  !*** ./node_modules/@edge22/styles-builder/dist/generateblocks.js ***!
  \********************************************************************/
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8937:
/***/ ((module) => {

"use strict";
/*! https://mths.be/cssesc v3.0.0 by @mathias */


var object = {};
var hasOwnProperty = object.hasOwnProperty;
var merge = function merge(options, defaults) {
	if (!options) {
		return defaults;
	}
	var result = {};
	for (var key in defaults) {
		// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
		// only recognized option names are used.
		result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
	}
	return result;
};

var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
var regexAlwaysEscape = /['"\\]/;
var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

// https://mathiasbynens.be/notes/css-escapes#css
var cssesc = function cssesc(string, options) {
	options = merge(options, cssesc.options);
	if (options.quotes != 'single' && options.quotes != 'double') {
		options.quotes = 'single';
	}
	var quote = options.quotes == 'double' ? '"' : '\'';
	var isIdentifier = options.isIdentifier;

	var firstChar = string.charAt(0);
	var output = '';
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var character = string.charAt(counter++);
		var codePoint = character.charCodeAt();
		var value = void 0;
		// If it’s not a printable ASCII character…
		if (codePoint < 0x20 || codePoint > 0x7E) {
			if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
				// It’s a high surrogate, and there is a next character.
				var extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// next character is low surrogate
					codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
				} else {
					// It’s an unmatched surrogate; only append this code unit, in case
					// the next code unit is the high surrogate of a surrogate pair.
					counter--;
				}
			}
			value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
		} else {
			if (options.escapeEverything) {
				if (regexAnySingleEscape.test(character)) {
					value = '\\' + character;
				} else {
					value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
				}
			} else if (/[\t\n\f\r\x0B]/.test(character)) {
				value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
			} else if (character == '\\' || !isIdentifier && (character == '"' && quote == character || character == '\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
				value = '\\' + character;
			} else {
				value = character;
			}
		}
		output += value;
	}

	if (isIdentifier) {
		if (/^-[-\d]/.test(output)) {
			output = '\\-' + output.slice(1);
		} else if (/\d/.test(firstChar)) {
			output = '\\3' + firstChar + ' ' + output.slice(1);
		}
	}

	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
	// since they’re redundant. Note that this is only possible if the escape
	// sequence isn’t preceded by an odd number of backslashes.
	output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
		if ($1 && $1.length % 2) {
			// It’s not safe to remove the space, so don’t.
			return $0;
		}
		// Strip the space.
		return ($1 || '') + $2;
	});

	if (!isIdentifier && options.wrap) {
		return quote + output + quote;
	}
	return output;
};

// Expose default options (so they can be overridden globally).
cssesc.options = {
	'escapeEverything': false,
	'isIdentifier': false,
	'quotes': 'single',
	'wrap': false
};

cssesc.version = '3.0.0';

module.exports = cssesc;


/***/ }),

/***/ 4190:
/***/ ((__unused_webpack_module, exports) => {

// Copyright (c) 2014 Rafael Caricio. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var GradientParser = (GradientParser || {});

GradientParser.stringify = (function() {

  var visitor = {

    'visit_linear-gradient': function(node) {
      return visitor.visit_gradient(node);
    },

    'visit_repeating-linear-gradient': function(node) {
      return visitor.visit_gradient(node);
    },

    'visit_radial-gradient': function(node) {
      return visitor.visit_gradient(node);
    },

    'visit_repeating-radial-gradient': function(node) {
      return visitor.visit_gradient(node);
    },

    'visit_gradient': function(node) {
      var orientation = visitor.visit(node.orientation);
      if (orientation) {
        orientation += ', ';
      }

      return node.type + '(' + orientation + visitor.visit(node.colorStops) + ')';
    },

    'visit_shape': function(node) {
      var result = node.value,
          at = visitor.visit(node.at),
          style = visitor.visit(node.style);

      if (style) {
        result += ' ' + style;
      }

      if (at) {
        result += ' at ' + at;
      }

      return result;
    },

    'visit_default-radial': function(node) {
      var result = '',
          at = visitor.visit(node.at);

      if (at) {
        result += at;
      }
      return result;
    },

    'visit_extent-keyword': function(node) {
      var result = node.value,
          at = visitor.visit(node.at);

      if (at) {
        result += ' at ' + at;
      }

      return result;
    },

    'visit_position-keyword': function(node) {
      return node.value;
    },

    'visit_position': function(node) {
      return visitor.visit(node.value.x) + ' ' + visitor.visit(node.value.y);
    },

    'visit_%': function(node) {
      return node.value + '%';
    },

    'visit_em': function(node) {
      return node.value + 'em';
    },

    'visit_px': function(node) {
      return node.value + 'px';
    },

    'visit_literal': function(node) {
      return visitor.visit_color(node.value, node);
    },

    'visit_hex': function(node) {
      return visitor.visit_color('#' + node.value, node);
    },

    'visit_rgb': function(node) {
      return visitor.visit_color('rgb(' + node.value.join(', ') + ')', node);
    },

    'visit_rgba': function(node) {
      return visitor.visit_color('rgba(' + node.value.join(', ') + ')', node);
    },

    'visit_color': function(resultColor, node) {
      var result = resultColor,
          length = visitor.visit(node.length);

      if (length) {
        result += ' ' + length;
      }
      return result;
    },

    'visit_angular': function(node) {
      return node.value + 'deg';
    },

    'visit_directional': function(node) {
      return 'to ' + node.value;
    },

    'visit_array': function(elements) {
      var result = '',
          size = elements.length;

      elements.forEach(function(element, i) {
        result += visitor.visit(element);
        if (i < size - 1) {
          result += ', ';
        }
      });

      return result;
    },

    'visit': function(element) {
      if (!element) {
        return '';
      }
      var result = '';

      if (element instanceof Array) {
        return visitor.visit_array(element, result);
      } else if (element.type) {
        var nodeVisitor = visitor['visit_' + element.type];
        if (nodeVisitor) {
          return nodeVisitor(element);
        } else {
          throw Error('Missing visitor visit_' + element.type);
        }
      } else {
        throw Error('Invalid node.');
      }
    }

  };

  return function(root) {
    return visitor.visit(root);
  };
})();

// Copyright (c) 2014 Rafael Caricio. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var GradientParser = (GradientParser || {});

GradientParser.parse = (function() {

  var tokens = {
    linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
    repeatingLinearGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
    radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
    repeatingRadialGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
    sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,
    extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^\#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    rgbaColor: /^rgba/i,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
  };

  var input = '';

  function error(msg) {
    var err = new Error(input + ': ' + msg);
    err.source = input;
    throw err;
  }

  function getAST() {
    var ast = matchListDefinitions();

    if (input.length > 0) {
      error('Invalid input not EOF');
    }

    return ast;
  }

  function matchListDefinitions() {
    return matchListing(matchDefinition);
  }

  function matchDefinition() {
    return matchGradient(
            'linear-gradient',
            tokens.linearGradient,
            matchLinearOrientation) ||

          matchGradient(
            'repeating-linear-gradient',
            tokens.repeatingLinearGradient,
            matchLinearOrientation) ||

          matchGradient(
            'radial-gradient',
            tokens.radialGradient,
            matchListRadialOrientations) ||

          matchGradient(
            'repeating-radial-gradient',
            tokens.repeatingRadialGradient,
            matchListRadialOrientations);
  }

  function matchGradient(gradientType, pattern, orientationMatcher) {
    return matchCall(pattern, function(captures) {

      var orientation = orientationMatcher();
      if (orientation) {
        if (!scan(tokens.comma)) {
          error('Missing comma before color stops');
        }
      }

      return {
        type: gradientType,
        orientation: orientation,
        colorStops: matchListing(matchColorStop)
      };
    });
  }

  function matchCall(pattern, callback) {
    var captures = scan(pattern);

    if (captures) {
      if (!scan(tokens.startCall)) {
        error('Missing (');
      }

      var result = callback(captures);

      if (!scan(tokens.endCall)) {
        error('Missing )');
      }

      return result;
    }
  }

  function matchLinearOrientation() {
    return matchSideOrCorner() ||
      matchAngle();
  }

  function matchSideOrCorner() {
    return match('directional', tokens.sideOrCorner, 1);
  }

  function matchAngle() {
    return match('angular', tokens.angleValue, 1);
  }

  function matchListRadialOrientations() {
    var radialOrientations,
        radialOrientation = matchRadialOrientation(),
        lookaheadCache;

    if (radialOrientation) {
      radialOrientations = [];
      radialOrientations.push(radialOrientation);

      lookaheadCache = input;
      if (scan(tokens.comma)) {
        radialOrientation = matchRadialOrientation();
        if (radialOrientation) {
          radialOrientations.push(radialOrientation);
        } else {
          input = lookaheadCache;
        }
      }
    }

    return radialOrientations;
  }

  function matchRadialOrientation() {
    var radialType = matchCircle() ||
      matchEllipse();

    if (radialType) {
      radialType.at = matchAtPosition();
    } else {
      var extent = matchExtentKeyword();
      if (extent) {
        radialType = extent;
        var positionAt = matchAtPosition();
        if (positionAt) {
          radialType.at = positionAt;
        }
      } else {
        var defaultPosition = matchPositioning();
        if (defaultPosition) {
          radialType = {
            type: 'default-radial',
            at: defaultPosition
          };
        }
      }
    }

    return radialType;
  }

  function matchCircle() {
    var circle = match('shape', /^(circle)/i, 0);

    if (circle) {
      circle.style = matchLength() || matchExtentKeyword();
    }

    return circle;
  }

  function matchEllipse() {
    var ellipse = match('shape', /^(ellipse)/i, 0);

    if (ellipse) {
      ellipse.style =  matchDistance() || matchExtentKeyword();
    }

    return ellipse;
  }

  function matchExtentKeyword() {
    return match('extent-keyword', tokens.extentKeywords, 1);
  }

  function matchAtPosition() {
    if (match('position', /^at/, 0)) {
      var positioning = matchPositioning();

      if (!positioning) {
        error('Missing positioning value');
      }

      return positioning;
    }
  }

  function matchPositioning() {
    var location = matchCoordinates();

    if (location.x || location.y) {
      return {
        type: 'position',
        value: location
      };
    }
  }

  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance()
    };
  }

  function matchListing(matcher) {
    var captures = matcher(),
      result = [];

    if (captures) {
      result.push(captures);
      while (scan(tokens.comma)) {
        captures = matcher();
        if (captures) {
          result.push(captures);
        } else {
          error('One extra comma');
        }
      }
    }

    return result;
  }

  function matchColorStop() {
    var color = matchColor();

    if (!color) {
      error('Expected color definition');
    }

    color.length = matchDistance();
    return color;
  }

  function matchColor() {
    return matchHexColor() ||
      matchRGBAColor() ||
      matchRGBColor() ||
      matchLiteralColor();
  }

  function matchLiteralColor() {
    return match('literal', tokens.literalColor, 0);
  }

  function matchHexColor() {
    return match('hex', tokens.hexColor, 1);
  }

  function matchRGBColor() {
    return matchCall(tokens.rgbColor, function() {
      return  {
        type: 'rgb',
        value: matchListing(matchNumber)
      };
    });
  }

  function matchRGBAColor() {
    return matchCall(tokens.rgbaColor, function() {
      return  {
        type: 'rgba',
        value: matchListing(matchNumber)
      };
    });
  }

  function matchNumber() {
    return scan(tokens.number)[1];
  }

  function matchDistance() {
    return match('%', tokens.percentageValue, 1) ||
      matchPositionKeyword() ||
      matchLength();
  }

  function matchPositionKeyword() {
    return match('position-keyword', tokens.positionKeywords, 1);
  }

  function matchLength() {
    return match('px', tokens.pixelValue, 1) ||
      match('em', tokens.emValue, 1);
  }

  function match(type, pattern, captureIndex) {
    var captures = scan(pattern);
    if (captures) {
      return {
        type: type,
        value: captures[captureIndex]
      };
    }
  }

  function scan(regexp) {
    var captures,
        blankCaptures;

    blankCaptures = /^[\n\r\t\s]+/.exec(input);
    if (blankCaptures) {
        consume(blankCaptures[0].length);
    }

    captures = regexp.exec(input);
    if (captures) {
        consume(captures[0].length);
    }

    return captures;
  }

  function consume(size) {
    input = input.substr(size);
  }

  return function(code) {
    input = code.toString();
    return getAST();
  };
})();

exports.parse = GradientParser.parse;
exports.stringify = GradientParser.stringify;


/***/ }),

/***/ 9456:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_15762__) => {

module.exports.all = __nested_webpack_require_15762__(9817).properties;


/***/ }),

/***/ 8633:
/***/ ((module) => {

var x=String;
var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x}};
module.exports=create();
module.exports.createColors = create;


/***/ }),

/***/ 3268:
/***/ ((module) => {

"use strict";

const plugin = 'postcss-discard-empty';
/**
 * @param {import('postcss').Root} css
 * @param {import('postcss').Result} result
 * @return {void}
 */
function discardAndReport(css, result) {
  /**
   * @param {import('postcss').AnyNode} node
   * @return {void}
   */
  function discardEmpty(node) {
    const { type } = node;
    /** @type {(import('postcss').ChildNode | import('postcss').ChildProps)[] | undefined} */
    const sub = /** @type {any} */ (node).nodes;
    if (sub) {
      /** @type {import('postcss').Container} */ (node).each(discardEmpty);
    }

    if (
      (type === 'decl' && !node.value && !node.prop.startsWith('--')) ||
      (type === 'rule' && !node.selector) ||
      (sub && !sub.length && !(type === 'atrule' && node.name === 'layer')) ||
      (type === 'atrule' &&
        ((!sub && !node.params) ||
          (!node.params &&
            !(/** @type {import('postcss').ChildNode[]}*/ (sub).length))))
    ) {
      node.remove();

      result.messages.push({
        type: 'removal',
        plugin,
        node,
      });
    }
  }

  css.each(discardEmpty);
}

/**
 * @type {import('postcss').PluginCreator<void>}
 * @return {import('postcss').Plugin}
 */
function pluginCreator() {
  return {
    postcssPlugin: plugin,
    OnceExit(css, { result }) {
      discardAndReport(css, result);
    },
  };
}

pluginCreator.postcss = true;
module.exports = pluginCreator;


/***/ }),

/***/ 691:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_17791__) => {

const selectorParser = __nested_webpack_require_17791__(7149);
const valueParser = __nested_webpack_require_17791__(5482);

const selectorProcessor = selectorParser((selectors) => {
  selectors.walk((selector) => {
    selector.spaces = { before: '', after: '' }
    if (selector.raws && selector.raws.spaces) {
      selector.raws.spaces = {}
    }
  })
})

function minifySelector(str) {
  return selectorProcessor.processSync(str)
}

function minifyValue(str) {
  const parsed = valueParser(str.trim())
  parsed.walk((node) => {
    if (node.before) node.before = ""
    if (node.after) node.after = ""
    if (node.type === "space") node.value = " "
  })
  return parsed.toString()
}

module.exports = () => {
  return {
    postcssPlugin: "postcss-minify",

    AtRule: (atrule) => {
      atrule.raws = { before: "", after: "", afterName: " " }
      atrule.params = minifyValue(atrule.params)
    },

    Comment: (comment) => {
      if (comment.text[0] === '!') {
        comment.raws.before = ""
        comment.raws.after = ""
      } else {
        comment.remove()
      }
    },

    Declaration: (decl) => {
      decl.raws = { before: "", between: ":" }
      decl.value = minifyValue(decl.value);
    },

    Rule: (rule) => {
      rule.raws = { before: "", between: "", after: "", semicolon: false }
      rule.selector = minifySelector(rule.selector)
    }
  }
}

module.exports.postcss = true


/***/ }),

/***/ 7149:
/***/ ((module, exports, __nested_webpack_require_19256__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _processor = _interopRequireDefault(__nested_webpack_require_19256__(8349));
var selectors = _interopRequireWildcard(__nested_webpack_require_19256__(680));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var parser = function parser(processor) {
  return new _processor["default"](processor);
};
Object.assign(parser, selectors);
delete parser.__esModule;
var _default = parser;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 5170:
/***/ ((module, exports, __nested_webpack_require_21023__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _root = _interopRequireDefault(__nested_webpack_require_21023__(518));
var _selector = _interopRequireDefault(__nested_webpack_require_21023__(339));
var _className = _interopRequireDefault(__nested_webpack_require_21023__(4195));
var _comment = _interopRequireDefault(__nested_webpack_require_21023__(425));
var _id = _interopRequireDefault(__nested_webpack_require_21023__(7071));
var _tag = _interopRequireDefault(__nested_webpack_require_21023__(9720));
var _string = _interopRequireDefault(__nested_webpack_require_21023__(5799));
var _pseudo = _interopRequireDefault(__nested_webpack_require_21023__(7324));
var _attribute = _interopRequireWildcard(__nested_webpack_require_21023__(5588));
var _universal = _interopRequireDefault(__nested_webpack_require_21023__(1669));
var _combinator = _interopRequireDefault(__nested_webpack_require_21023__(1704));
var _nesting = _interopRequireDefault(__nested_webpack_require_21023__(2918));
var _sortAscending = _interopRequireDefault(__nested_webpack_require_21023__(263));
var _tokenize = _interopRequireWildcard(__nested_webpack_require_21023__(2648));
var tokens = _interopRequireWildcard(__nested_webpack_require_21023__(71));
var types = _interopRequireWildcard(__nested_webpack_require_21023__(1581));
var _util = __nested_webpack_require_21023__(9606);
var _WHITESPACE_TOKENS, _Object$assign;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
function tokenStart(token) {
  return {
    line: token[_tokenize.FIELDS.START_LINE],
    column: token[_tokenize.FIELDS.START_COL]
  };
}
function tokenEnd(token) {
  return {
    line: token[_tokenize.FIELDS.END_LINE],
    column: token[_tokenize.FIELDS.END_COL]
  };
}
function getSource(startLine, startColumn, endLine, endColumn) {
  return {
    start: {
      line: startLine,
      column: startColumn
    },
    end: {
      line: endLine,
      column: endColumn
    }
  };
}
function getTokenSource(token) {
  return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
}
function getTokenSourceSpan(startToken, endToken) {
  if (!startToken) {
    return undefined;
  }
  return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
}
function unescapeProp(node, prop) {
  var value = node[prop];
  if (typeof value !== "string") {
    return;
  }
  if (value.indexOf("\\") !== -1) {
    (0, _util.ensureObject)(node, 'raws');
    node[prop] = (0, _util.unesc)(value);
    if (node.raws[prop] === undefined) {
      node.raws[prop] = value;
    }
  }
  return node;
}
function indexesOf(array, item) {
  var i = -1;
  var indexes = [];
  while ((i = array.indexOf(item, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}
function uniqs() {
  var list = Array.prototype.concat.apply([], arguments);
  return list.filter(function (item, i) {
    return i === list.indexOf(item);
  });
}
var Parser = /*#__PURE__*/function () {
  function Parser(rule, options) {
    if (options === void 0) {
      options = {};
    }
    this.rule = rule;
    this.options = Object.assign({
      lossy: false,
      safe: false
    }, options);
    this.position = 0;
    this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;
    this.tokens = (0, _tokenize["default"])({
      css: this.css,
      error: this._errorGenerator(),
      safe: this.options.safe
    });
    var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
    this.root = new _root["default"]({
      source: rootSource
    });
    this.root.errorGenerator = this._errorGenerator();
    var selector = new _selector["default"]({
      source: {
        start: {
          line: 1,
          column: 1
        }
      },
      sourceIndex: 0
    });
    this.root.append(selector);
    this.current = selector;
    this.loop();
  }
  var _proto = Parser.prototype;
  _proto._errorGenerator = function _errorGenerator() {
    var _this = this;
    return function (message, errorOptions) {
      if (typeof _this.rule === 'string') {
        return new Error(message);
      }
      return _this.rule.error(message, errorOptions);
    };
  };
  _proto.attribute = function attribute() {
    var attr = [];
    var startingToken = this.currToken;
    this.position++;
    while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
      attr.push(this.currToken);
      this.position++;
    }
    if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
      return this.expected('closing square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
    }
    var len = attr.length;
    var node = {
      source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
      sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
    };
    if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
      return this.expected('attribute', attr[0][_tokenize.FIELDS.START_POS]);
    }
    var pos = 0;
    var spaceBefore = '';
    var commentBefore = '';
    var lastAdded = null;
    var spaceAfterMeaningfulToken = false;
    while (pos < len) {
      var token = attr[pos];
      var content = this.content(token);
      var next = attr[pos + 1];
      switch (token[_tokenize.FIELDS.TYPE]) {
        case tokens.space:
          // if (
          //     len === 1 ||
          //     pos === 0 && this.content(next) === '|'
          // ) {
          //     return this.expected('attribute', token[TOKEN.START_POS], content);
          // }
          spaceAfterMeaningfulToken = true;
          if (this.options.lossy) {
            break;
          }
          if (lastAdded) {
            (0, _util.ensureObject)(node, 'spaces', lastAdded);
            var prevContent = node.spaces[lastAdded].after || '';
            node.spaces[lastAdded].after = prevContent + content;
            var existingComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || null;
            if (existingComment) {
              node.raws.spaces[lastAdded].after = existingComment + content;
            }
          } else {
            spaceBefore = spaceBefore + content;
            commentBefore = commentBefore + content;
          }
          break;
        case tokens.asterisk:
          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
            if (spaceBefore) {
              (0, _util.ensureObject)(node, 'spaces', 'attribute');
              node.spaces.attribute.before = spaceBefore;
              spaceBefore = '';
            }
            if (commentBefore) {
              (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
              node.raws.spaces.attribute.before = spaceBefore;
              commentBefore = '';
            }
            node.namespace = (node.namespace || "") + content;
            var rawValue = (0, _util.getProp)(node, 'raws', 'namespace') || null;
            if (rawValue) {
              node.raws.namespace += content;
            }
            lastAdded = 'namespace';
          }
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.dollar:
          if (lastAdded === "value") {
            var oldRawValue = (0, _util.getProp)(node, 'raws', 'value');
            node.value += "$";
            if (oldRawValue) {
              node.raws.value = oldRawValue + "$";
            }
            break;
          }
        // Falls through
        case tokens.caret:
          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          }
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.combinator:
          if (content === '~' && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          }
          if (content !== '|') {
            spaceAfterMeaningfulToken = false;
            break;
          }
          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          } else if (!node.namespace && !node.attribute) {
            node.namespace = true;
          }
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.word:
          if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals &&
          // this look-ahead probably fails with comment nodes involved.
          !node.operator && !node.namespace) {
            node.namespace = content;
            lastAdded = 'namespace';
          } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
            if (spaceBefore) {
              (0, _util.ensureObject)(node, 'spaces', 'attribute');
              node.spaces.attribute.before = spaceBefore;
              spaceBefore = '';
            }
            if (commentBefore) {
              (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
              node.raws.spaces.attribute.before = commentBefore;
              commentBefore = '';
            }
            node.attribute = (node.attribute || "") + content;
            var _rawValue = (0, _util.getProp)(node, 'raws', 'attribute') || null;
            if (_rawValue) {
              node.raws.attribute += content;
            }
            lastAdded = 'attribute';
          } else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
            var _unescaped = (0, _util.unesc)(content);
            var _oldRawValue = (0, _util.getProp)(node, 'raws', 'value') || '';
            var oldValue = node.value || '';
            node.value = oldValue + _unescaped;
            node.quoteMark = null;
            if (_unescaped !== content || _oldRawValue) {
              (0, _util.ensureObject)(node, 'raws');
              node.raws.value = (_oldRawValue || oldValue) + content;
            }
            lastAdded = 'value';
          } else {
            var insensitive = content === 'i' || content === "I";
            if ((node.value || node.value === '') && (node.quoteMark || spaceAfterMeaningfulToken)) {
              node.insensitive = insensitive;
              if (!insensitive || content === "I") {
                (0, _util.ensureObject)(node, 'raws');
                node.raws.insensitiveFlag = content;
              }
              lastAdded = 'insensitive';
              if (spaceBefore) {
                (0, _util.ensureObject)(node, 'spaces', 'insensitive');
                node.spaces.insensitive.before = spaceBefore;
                spaceBefore = '';
              }
              if (commentBefore) {
                (0, _util.ensureObject)(node, 'raws', 'spaces', 'insensitive');
                node.raws.spaces.insensitive.before = commentBefore;
                commentBefore = '';
              }
            } else if (node.value || node.value === '') {
              lastAdded = 'value';
              node.value += content;
              if (node.raws.value) {
                node.raws.value += content;
              }
            }
          }
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.str:
          if (!node.attribute || !node.operator) {
            return this.error("Expected an attribute followed by an operator preceding the string.", {
              index: token[_tokenize.FIELDS.START_POS]
            });
          }
          var _unescapeValue = (0, _attribute.unescapeValue)(content),
            unescaped = _unescapeValue.unescaped,
            quoteMark = _unescapeValue.quoteMark;
          node.value = unescaped;
          node.quoteMark = quoteMark;
          lastAdded = 'value';
          (0, _util.ensureObject)(node, 'raws');
          node.raws.value = content;
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.equals:
          if (!node.attribute) {
            return this.expected('attribute', token[_tokenize.FIELDS.START_POS], content);
          }
          if (node.value) {
            return this.error('Unexpected "=" found; an operator was already defined.', {
              index: token[_tokenize.FIELDS.START_POS]
            });
          }
          node.operator = node.operator ? node.operator + content : content;
          lastAdded = 'operator';
          spaceAfterMeaningfulToken = false;
          break;
        case tokens.comment:
          if (lastAdded) {
            if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === 'insensitive') {
              var lastComment = (0, _util.getProp)(node, 'spaces', lastAdded, 'after') || '';
              var rawLastComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || lastComment;
              (0, _util.ensureObject)(node, 'raws', 'spaces', lastAdded);
              node.raws.spaces[lastAdded].after = rawLastComment + content;
            } else {
              var lastValue = node[lastAdded] || '';
              var rawLastValue = (0, _util.getProp)(node, 'raws', lastAdded) || lastValue;
              (0, _util.ensureObject)(node, 'raws');
              node.raws[lastAdded] = rawLastValue + content;
            }
          } else {
            commentBefore = commentBefore + content;
          }
          break;
        default:
          return this.error("Unexpected \"" + content + "\" found.", {
            index: token[_tokenize.FIELDS.START_POS]
          });
      }
      pos++;
    }
    unescapeProp(node, "attribute");
    unescapeProp(node, "namespace");
    this.newNode(new _attribute["default"](node));
    this.position++;
  }

  /**
   * return a node containing meaningless garbage up to (but not including) the specified token position.
   * if the token position is negative, all remaining tokens are consumed.
   *
   * This returns an array containing a single string node if all whitespace,
   * otherwise an array of comment nodes with space before and after.
   *
   * These tokens are not added to the current selector, the caller can add them or use them to amend
   * a previous node's space metadata.
   *
   * In lossy mode, this returns only comments.
   */;
  _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
    if (stopPosition < 0) {
      stopPosition = this.tokens.length;
    }
    var startPosition = this.position;
    var nodes = [];
    var space = "";
    var lastComment = undefined;
    do {
      if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
        if (!this.options.lossy) {
          space += this.content();
        }
      } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
        var spaces = {};
        if (space) {
          spaces.before = space;
          space = "";
        }
        lastComment = new _comment["default"]({
          value: this.content(),
          source: getTokenSource(this.currToken),
          sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
          spaces: spaces
        });
        nodes.push(lastComment);
      }
    } while (++this.position < stopPosition);
    if (space) {
      if (lastComment) {
        lastComment.spaces.after = space;
      } else if (!this.options.lossy) {
        var firstToken = this.tokens[startPosition];
        var lastToken = this.tokens[this.position - 1];
        nodes.push(new _string["default"]({
          value: '',
          source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
          sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
          spaces: {
            before: space,
            after: ''
          }
        }));
      }
    }
    return nodes;
  }

  /**
   *
   * @param {*} nodes
   */;
  _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
    var _this2 = this;
    if (requiredSpace === void 0) {
      requiredSpace = false;
    }
    var space = "";
    var rawSpace = "";
    nodes.forEach(function (n) {
      var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
      var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
      space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
      rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
    });
    if (rawSpace === space) {
      rawSpace = undefined;
    }
    var result = {
      space: space,
      rawSpace: rawSpace
    };
    return result;
  };
  _proto.isNamedCombinator = function isNamedCombinator(position) {
    if (position === void 0) {
      position = this.position;
    }
    return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
  };
  _proto.namedCombinator = function namedCombinator() {
    if (this.isNamedCombinator()) {
      var nameRaw = this.content(this.tokens[this.position + 1]);
      var name = (0, _util.unesc)(nameRaw).toLowerCase();
      var raws = {};
      if (name !== nameRaw) {
        raws.value = "/" + nameRaw + "/";
      }
      var node = new _combinator["default"]({
        value: "/" + name + "/",
        source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
        sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
        raws: raws
      });
      this.position = this.position + 3;
      return node;
    } else {
      this.unexpected();
    }
  };
  _proto.combinator = function combinator() {
    var _this3 = this;
    if (this.content() === '|') {
      return this.namespace();
    }
    // We need to decide between a space that's a descendant combinator and meaningless whitespace at the end of a selector.
    var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
    if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
      var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
      if (nodes.length > 0) {
        var last = this.current.last;
        if (last) {
          var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes),
            space = _this$convertWhitespa.space,
            rawSpace = _this$convertWhitespa.rawSpace;
          if (rawSpace !== undefined) {
            last.rawSpaceAfter += rawSpace;
          }
          last.spaces.after += space;
        } else {
          nodes.forEach(function (n) {
            return _this3.newNode(n);
          });
        }
      }
      return;
    }
    var firstToken = this.currToken;
    var spaceOrDescendantSelectorNodes = undefined;
    if (nextSigTokenPos > this.position) {
      spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
    }
    var node;
    if (this.isNamedCombinator()) {
      node = this.namedCombinator();
    } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
      node = new _combinator["default"]({
        value: this.content(),
        source: getTokenSource(this.currToken),
        sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
      });
      this.position++;
    } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
      // pass
    } else if (!spaceOrDescendantSelectorNodes) {
      this.unexpected();
    }
    if (node) {
      if (spaceOrDescendantSelectorNodes) {
        var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes),
          _space = _this$convertWhitespa2.space,
          _rawSpace = _this$convertWhitespa2.rawSpace;
        node.spaces.before = _space;
        node.rawSpaceBefore = _rawSpace;
      }
    } else {
      // descendant combinator
      var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true),
        _space2 = _this$convertWhitespa3.space,
        _rawSpace2 = _this$convertWhitespa3.rawSpace;
      if (!_rawSpace2) {
        _rawSpace2 = _space2;
      }
      var spaces = {};
      var raws = {
        spaces: {}
      };
      if (_space2.endsWith(' ') && _rawSpace2.endsWith(' ')) {
        spaces.before = _space2.slice(0, _space2.length - 1);
        raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
      } else if (_space2.startsWith(' ') && _rawSpace2.startsWith(' ')) {
        spaces.after = _space2.slice(1);
        raws.spaces.after = _rawSpace2.slice(1);
      } else {
        raws.value = _rawSpace2;
      }
      node = new _combinator["default"]({
        value: ' ',
        source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
        sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
        spaces: spaces,
        raws: raws
      });
    }
    if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
      node.spaces.after = this.optionalSpace(this.content());
      this.position++;
    }
    return this.newNode(node);
  };
  _proto.comma = function comma() {
    if (this.position === this.tokens.length - 1) {
      this.root.trailingComma = true;
      this.position++;
      return;
    }
    this.current._inferEndPosition();
    var selector = new _selector["default"]({
      source: {
        start: tokenStart(this.tokens[this.position + 1])
      },
      sourceIndex: this.tokens[this.position + 1][_tokenize.FIELDS.START_POS]
    });
    this.current.parent.append(selector);
    this.current = selector;
    this.position++;
  };
  _proto.comment = function comment() {
    var current = this.currToken;
    this.newNode(new _comment["default"]({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };
  _proto.error = function error(message, opts) {
    throw this.root.error(message, opts);
  };
  _proto.missingBackslash = function missingBackslash() {
    return this.error('Expected a backslash preceding the semicolon.', {
      index: this.currToken[_tokenize.FIELDS.START_POS]
    });
  };
  _proto.missingParenthesis = function missingParenthesis() {
    return this.expected('opening parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
  };
  _proto.missingSquareBracket = function missingSquareBracket() {
    return this.expected('opening square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
  };
  _proto.unexpected = function unexpected() {
    return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
  };
  _proto.unexpectedPipe = function unexpectedPipe() {
    return this.error("Unexpected '|'.", this.currToken[_tokenize.FIELDS.START_POS]);
  };
  _proto.namespace = function namespace() {
    var before = this.prevToken && this.content(this.prevToken) || true;
    if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
      this.position++;
      return this.word(before);
    } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
      this.position++;
      return this.universal(before);
    }
    this.unexpectedPipe();
  };
  _proto.nesting = function nesting() {
    if (this.nextToken) {
      var nextContent = this.content(this.nextToken);
      if (nextContent === "|") {
        this.position++;
        return;
      }
    }
    var current = this.currToken;
    this.newNode(new _nesting["default"]({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };
  _proto.parentheses = function parentheses() {
    var last = this.current.last;
    var unbalanced = 1;
    this.position++;
    if (last && last.type === types.PSEUDO) {
      var selector = new _selector["default"]({
        source: {
          start: tokenStart(this.tokens[this.position])
        },
        sourceIndex: this.tokens[this.position][_tokenize.FIELDS.START_POS]
      });
      var cache = this.current;
      last.append(selector);
      this.current = selector;
      while (this.position < this.tokens.length && unbalanced) {
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          unbalanced++;
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          unbalanced--;
        }
        if (unbalanced) {
          this.parse();
        } else {
          this.current.source.end = tokenEnd(this.currToken);
          this.current.parent.source.end = tokenEnd(this.currToken);
          this.position++;
        }
      }
      this.current = cache;
    } else {
      // I think this case should be an error. It's used to implement a basic parse of media queries
      // but I don't think it's a good idea.
      var parenStart = this.currToken;
      var parenValue = "(";
      var parenEnd;
      while (this.position < this.tokens.length && unbalanced) {
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          unbalanced++;
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          unbalanced--;
        }
        parenEnd = this.currToken;
        parenValue += this.parseParenthesisToken(this.currToken);
        this.position++;
      }
      if (last) {
        last.appendToPropertyAndEscape("value", parenValue, parenValue);
      } else {
        this.newNode(new _string["default"]({
          value: parenValue,
          source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
          sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
        }));
      }
    }
    if (unbalanced) {
      return this.expected('closing parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
    }
  };
  _proto.pseudo = function pseudo() {
    var _this4 = this;
    var pseudoStr = '';
    var startingToken = this.currToken;
    while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
      pseudoStr += this.content();
      this.position++;
    }
    if (!this.currToken) {
      return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
    }
    if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
      this.splitWord(false, function (first, length) {
        pseudoStr += first;
        _this4.newNode(new _pseudo["default"]({
          value: pseudoStr,
          source: getTokenSourceSpan(startingToken, _this4.currToken),
          sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        }));
        if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          _this4.error('Misplaced parenthesis.', {
            index: _this4.nextToken[_tokenize.FIELDS.START_POS]
          });
        }
      });
    } else {
      return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[_tokenize.FIELDS.START_POS]);
    }
  };
  _proto.space = function space() {
    var content = this.content();
    // Handle space before and after the selector
    if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function (node) {
      return node.type === 'comment';
    })) {
      this.spaces = this.optionalSpace(content);
      this.position++;
    } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
      this.current.last.spaces.after = this.optionalSpace(content);
      this.position++;
    } else {
      this.combinator();
    }
  };
  _proto.string = function string() {
    var current = this.currToken;
    this.newNode(new _string["default"]({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };
  _proto.universal = function universal(namespace) {
    var nextToken = this.nextToken;
    if (nextToken && this.content(nextToken) === '|') {
      this.position++;
      return this.namespace();
    }
    var current = this.currToken;
    this.newNode(new _universal["default"]({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }), namespace);
    this.position++;
  };
  _proto.splitWord = function splitWord(namespace, firstCallback) {
    var _this5 = this;
    var nextToken = this.nextToken;
    var word = this.content();
    while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
      this.position++;
      var current = this.content();
      word += current;
      if (current.lastIndexOf('\\') === current.length - 1) {
        var next = this.nextToken;
        if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
          word += this.requiredSpace(this.content(next));
          this.position++;
        }
      }
      nextToken = this.nextToken;
    }
    var hasClass = indexesOf(word, '.').filter(function (i) {
      // Allow escaped dot within class name
      var escapedDot = word[i - 1] === '\\';
      // Allow decimal numbers percent in @keyframes
      var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
      return !escapedDot && !isKeyframesPercent;
    });
    var hasId = indexesOf(word, '#').filter(function (i) {
      return word[i - 1] !== '\\';
    });
    // Eliminate Sass interpolations from the list of id indexes
    var interpolations = indexesOf(word, '#{');
    if (interpolations.length) {
      hasId = hasId.filter(function (hashIndex) {
        return !~interpolations.indexOf(hashIndex);
      });
    }
    var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
    indices.forEach(function (ind, i) {
      var index = indices[i + 1] || word.length;
      var value = word.slice(ind, index);
      if (i === 0 && firstCallback) {
        return firstCallback.call(_this5, value, indices.length);
      }
      var node;
      var current = _this5.currToken;
      var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
      var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
      if (~hasClass.indexOf(ind)) {
        var classNameOpts = {
          value: value.slice(1),
          source: source,
          sourceIndex: sourceIndex
        };
        node = new _className["default"](unescapeProp(classNameOpts, "value"));
      } else if (~hasId.indexOf(ind)) {
        var idOpts = {
          value: value.slice(1),
          source: source,
          sourceIndex: sourceIndex
        };
        node = new _id["default"](unescapeProp(idOpts, "value"));
      } else {
        var tagOpts = {
          value: value,
          source: source,
          sourceIndex: sourceIndex
        };
        unescapeProp(tagOpts, "value");
        node = new _tag["default"](tagOpts);
      }
      _this5.newNode(node, namespace);
      // Ensure that the namespace is used only once
      namespace = null;
    });
    this.position++;
  };
  _proto.word = function word(namespace) {
    var nextToken = this.nextToken;
    if (nextToken && this.content(nextToken) === '|') {
      this.position++;
      return this.namespace();
    }
    return this.splitWord(namespace);
  };
  _proto.loop = function loop() {
    while (this.position < this.tokens.length) {
      this.parse(true);
    }
    this.current._inferEndPosition();
    return this.root;
  };
  _proto.parse = function parse(throwOnParenthesis) {
    switch (this.currToken[_tokenize.FIELDS.TYPE]) {
      case tokens.space:
        this.space();
        break;
      case tokens.comment:
        this.comment();
        break;
      case tokens.openParenthesis:
        this.parentheses();
        break;
      case tokens.closeParenthesis:
        if (throwOnParenthesis) {
          this.missingParenthesis();
        }
        break;
      case tokens.openSquare:
        this.attribute();
        break;
      case tokens.dollar:
      case tokens.caret:
      case tokens.equals:
      case tokens.word:
        this.word();
        break;
      case tokens.colon:
        this.pseudo();
        break;
      case tokens.comma:
        this.comma();
        break;
      case tokens.asterisk:
        this.universal();
        break;
      case tokens.ampersand:
        this.nesting();
        break;
      case tokens.slash:
      case tokens.combinator:
        this.combinator();
        break;
      case tokens.str:
        this.string();
        break;
      // These cases throw; no break needed.
      case tokens.closeSquare:
        this.missingSquareBracket();
      case tokens.semicolon:
        this.missingBackslash();
      default:
        this.unexpected();
    }
  }

  /**
   * Helpers
   */;
  _proto.expected = function expected(description, index, found) {
    if (Array.isArray(description)) {
      var last = description.pop();
      description = description.join(', ') + " or " + last;
    }
    var an = /^[aeiou]/.test(description[0]) ? 'an' : 'a';
    if (!found) {
      return this.error("Expected " + an + " " + description + ".", {
        index: index
      });
    }
    return this.error("Expected " + an + " " + description + ", found \"" + found + "\" instead.", {
      index: index
    });
  };
  _proto.requiredSpace = function requiredSpace(space) {
    return this.options.lossy ? ' ' : space;
  };
  _proto.optionalSpace = function optionalSpace(space) {
    return this.options.lossy ? '' : space;
  };
  _proto.lossySpace = function lossySpace(space, required) {
    if (this.options.lossy) {
      return required ? ' ' : '';
    } else {
      return space;
    }
  };
  _proto.parseParenthesisToken = function parseParenthesisToken(token) {
    var content = this.content(token);
    if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
      return this.requiredSpace(content);
    } else {
      return content;
    }
  };
  _proto.newNode = function newNode(node, namespace) {
    if (namespace) {
      if (/^ +$/.test(namespace)) {
        if (!this.options.lossy) {
          this.spaces = (this.spaces || '') + namespace;
        }
        namespace = true;
      }
      node.namespace = namespace;
      unescapeProp(node, "namespace");
    }
    if (this.spaces) {
      node.spaces.before = this.spaces;
      this.spaces = '';
    }
    return this.current.append(node);
  };
  _proto.content = function content(token) {
    if (token === void 0) {
      token = this.currToken;
    }
    return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
  };
  /**
   * returns the index of the next non-whitespace, non-comment token.
   * returns -1 if no meaningful token is found.
   */
  _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
    if (startPosition === void 0) {
      startPosition = this.position + 1;
    }
    var searchPosition = startPosition;
    while (searchPosition < this.tokens.length) {
      if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
        searchPosition++;
        continue;
      } else {
        return searchPosition;
      }
    }
    return -1;
  };
  _createClass(Parser, [{
    key: "currToken",
    get: function get() {
      return this.tokens[this.position];
    }
  }, {
    key: "nextToken",
    get: function get() {
      return this.tokens[this.position + 1];
    }
  }, {
    key: "prevToken",
    get: function get() {
      return this.tokens[this.position - 1];
    }
  }]);
  return Parser;
}();
exports["default"] = Parser;
module.exports = exports.default;

/***/ }),

/***/ 8349:
/***/ ((module, exports, __nested_webpack_require_60130__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _parser = _interopRequireDefault(__nested_webpack_require_60130__(5170));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Processor = /*#__PURE__*/function () {
  function Processor(func, options) {
    this.func = func || function noop() {};
    this.funcRes = null;
    this.options = options;
  }
  var _proto = Processor.prototype;
  _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
    if (options === void 0) {
      options = {};
    }
    var merged = Object.assign({}, this.options, options);
    if (merged.updateSelector === false) {
      return false;
    } else {
      return typeof rule !== "string";
    }
  };
  _proto._isLossy = function _isLossy(options) {
    if (options === void 0) {
      options = {};
    }
    var merged = Object.assign({}, this.options, options);
    if (merged.lossless === false) {
      return true;
    } else {
      return false;
    }
  };
  _proto._root = function _root(rule, options) {
    if (options === void 0) {
      options = {};
    }
    var parser = new _parser["default"](rule, this._parseOptions(options));
    return parser.root;
  };
  _proto._parseOptions = function _parseOptions(options) {
    return {
      lossy: this._isLossy(options)
    };
  };
  _proto._run = function _run(rule, options) {
    var _this = this;
    if (options === void 0) {
      options = {};
    }
    return new Promise(function (resolve, reject) {
      try {
        var root = _this._root(rule, options);
        Promise.resolve(_this.func(root)).then(function (transform) {
          var string = undefined;
          if (_this._shouldUpdateSelector(rule, options)) {
            string = root.toString();
            rule.selector = string;
          }
          return {
            transform: transform,
            root: root,
            string: string
          };
        }).then(resolve, reject);
      } catch (e) {
        reject(e);
        return;
      }
    });
  };
  _proto._runSync = function _runSync(rule, options) {
    if (options === void 0) {
      options = {};
    }
    var root = this._root(rule, options);
    var transform = this.func(root);
    if (transform && typeof transform.then === "function") {
      throw new Error("Selector processor returned a promise to a synchronous call.");
    }
    var string = undefined;
    if (options.updateSelector && typeof rule !== "string") {
      string = root.toString();
      rule.selector = string;
    }
    return {
      transform: transform,
      root: root,
      string: string
    };
  }

  /**
   * Process rule into a selector AST.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {Promise<parser.Root>} The AST of the selector after processing it.
   */;
  _proto.ast = function ast(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.root;
    });
  }

  /**
   * Process rule into a selector AST synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {parser.Root} The AST of the selector after processing it.
   */;
  _proto.astSync = function astSync(rule, options) {
    return this._runSync(rule, options).root;
  }

  /**
   * Process a selector into a transformed value asynchronously
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {Promise<any>} The value returned by the processor.
   */;
  _proto.transform = function transform(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.transform;
    });
  }

  /**
   * Process a selector into a transformed value synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {any} The value returned by the processor.
   */;
  _proto.transformSync = function transformSync(rule, options) {
    return this._runSync(rule, options).transform;
  }

  /**
   * Process a selector into a new selector string asynchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {string} the selector after processing.
   */;
  _proto.process = function process(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.string || result.root.toString();
    });
  }

  /**
   * Process a selector into a new selector string synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {string} the selector after processing.
   */;
  _proto.processSync = function processSync(rule, options) {
    var result = this._runSync(rule, options);
    return result.string || result.root.toString();
  };
  return Processor;
}();
exports["default"] = Processor;
module.exports = exports.default;

/***/ }),

/***/ 5588:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_65441__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
exports.unescapeValue = unescapeValue;
var _cssesc = _interopRequireDefault(__nested_webpack_require_65441__(8937));
var _unesc = _interopRequireDefault(__nested_webpack_require_65441__(5286));
var _namespace = _interopRequireDefault(__nested_webpack_require_65441__(3295));
var _types = __nested_webpack_require_65441__(1581);
var _CSSESC_QUOTE_OPTIONS;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var deprecate = __nested_webpack_require_65441__(4643);
var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
var warnOfDeprecatedValueAssignment = deprecate(function () {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. " + "Call attribute.setValue() instead.");
var warnOfDeprecatedQuotedAssignment = deprecate(function () {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
var warnOfDeprecatedConstructor = deprecate(function () {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
function unescapeValue(value) {
  var deprecatedUsage = false;
  var quoteMark = null;
  var unescaped = value;
  var m = unescaped.match(WRAPPED_IN_QUOTES);
  if (m) {
    quoteMark = m[1];
    unescaped = m[2];
  }
  unescaped = (0, _unesc["default"])(unescaped);
  if (unescaped !== value) {
    deprecatedUsage = true;
  }
  return {
    deprecatedUsage: deprecatedUsage,
    unescaped: unescaped,
    quoteMark: quoteMark
  };
}
function handleDeprecatedContructorOpts(opts) {
  if (opts.quoteMark !== undefined) {
    return opts;
  }
  if (opts.value === undefined) {
    return opts;
  }
  warnOfDeprecatedConstructor();
  var _unescapeValue = unescapeValue(opts.value),
    quoteMark = _unescapeValue.quoteMark,
    unescaped = _unescapeValue.unescaped;
  if (!opts.raws) {
    opts.raws = {};
  }
  if (opts.raws.value === undefined) {
    opts.raws.value = opts.value;
  }
  opts.value = unescaped;
  opts.quoteMark = quoteMark;
  return opts;
}
var Attribute = /*#__PURE__*/function (_Namespace) {
  _inheritsLoose(Attribute, _Namespace);
  function Attribute(opts) {
    var _this;
    if (opts === void 0) {
      opts = {};
    }
    _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
    _this.type = _types.ATTRIBUTE;
    _this.raws = _this.raws || {};
    Object.defineProperty(_this.raws, 'unquoted', {
      get: deprecate(function () {
        return _this.value;
      }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
      set: deprecate(function () {
        return _this.value;
      }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
    });
    _this._constructed = true;
    return _this;
  }

  /**
   * Returns the Attribute's value quoted such that it would be legal to use
   * in the value of a css file. The original value's quotation setting
   * used for stringification is left unchanged. See `setValue(value, options)`
   * if you want to control the quote settings of a new value for the attribute.
   *
   * You can also change the quotation used for the current value by setting quoteMark.
   *
   * Options:
   *   * quoteMark {'"' | "'" | null} - Use this value to quote the value. If this
   *     option is not set, the original value for quoteMark will be used. If
   *     indeterminate, a double quote is used. The legal values are:
   *     * `null` - the value will be unquoted and characters will be escaped as necessary.
   *     * `'` - the value will be quoted with a single quote and single quotes are escaped.
   *     * `"` - the value will be quoted with a double quote and double quotes are escaped.
   *   * preferCurrentQuoteMark {boolean} - if true, prefer the source quote mark
   *     over the quoteMark option value.
   *   * smart {boolean} - if true, will select a quote mark based on the value
   *     and the other options specified here. See the `smartQuoteMark()`
   *     method.
   **/
  var _proto = Attribute.prototype;
  _proto.getQuotedValue = function getQuotedValue(options) {
    if (options === void 0) {
      options = {};
    }
    var quoteMark = this._determineQuoteMark(options);
    var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
    var escaped = (0, _cssesc["default"])(this._value, cssescopts);
    return escaped;
  };
  _proto._determineQuoteMark = function _determineQuoteMark(options) {
    return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
  }

  /**
   * Set the unescaped value with the specified quotation options. The value
   * provided must not include any wrapping quote marks -- those quotes will
   * be interpreted as part of the value and escaped accordingly.
   */;
  _proto.setValue = function setValue(value, options) {
    if (options === void 0) {
      options = {};
    }
    this._value = value;
    this._quoteMark = this._determineQuoteMark(options);
    this._syncRawValue();
  }

  /**
   * Intelligently select a quoteMark value based on the value's contents. If
   * the value is a legal CSS ident, it will not be quoted. Otherwise a quote
   * mark will be picked that minimizes the number of escapes.
   *
   * If there's no clear winner, the quote mark from these options is used,
   * then the source quote mark (this is inverted if `preferCurrentQuoteMark` is
   * true). If the quoteMark is unspecified, a double quote is used.
   *
   * @param options This takes the quoteMark and preferCurrentQuoteMark options
   * from the quoteValue method.
   */;
  _proto.smartQuoteMark = function smartQuoteMark(options) {
    var v = this.value;
    var numSingleQuotes = v.replace(/[^']/g, '').length;
    var numDoubleQuotes = v.replace(/[^"]/g, '').length;
    if (numSingleQuotes + numDoubleQuotes === 0) {
      var escaped = (0, _cssesc["default"])(v, {
        isIdentifier: true
      });
      if (escaped === v) {
        return Attribute.NO_QUOTE;
      } else {
        var pref = this.preferredQuoteMark(options);
        if (pref === Attribute.NO_QUOTE) {
          // pick a quote mark that isn't none and see if it's smaller
          var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
          var opts = CSSESC_QUOTE_OPTIONS[quote];
          var quoteValue = (0, _cssesc["default"])(v, opts);
          if (quoteValue.length < escaped.length) {
            return quote;
          }
        }
        return pref;
      }
    } else if (numDoubleQuotes === numSingleQuotes) {
      return this.preferredQuoteMark(options);
    } else if (numDoubleQuotes < numSingleQuotes) {
      return Attribute.DOUBLE_QUOTE;
    } else {
      return Attribute.SINGLE_QUOTE;
    }
  }

  /**
   * Selects the preferred quote mark based on the options and the current quote mark value.
   * If you want the quote mark to depend on the attribute value, call `smartQuoteMark(opts)`
   * instead.
   */;
  _proto.preferredQuoteMark = function preferredQuoteMark(options) {
    var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
    if (quoteMark === undefined) {
      quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
    }
    if (quoteMark === undefined) {
      quoteMark = Attribute.DOUBLE_QUOTE;
    }
    return quoteMark;
  };
  _proto._syncRawValue = function _syncRawValue() {
    var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
    if (rawValue === this._value) {
      if (this.raws) {
        delete this.raws.value;
      }
    } else {
      this.raws.value = rawValue;
    }
  };
  _proto._handleEscapes = function _handleEscapes(prop, value) {
    if (this._constructed) {
      var escaped = (0, _cssesc["default"])(value, {
        isIdentifier: true
      });
      if (escaped !== value) {
        this.raws[prop] = escaped;
      } else {
        delete this.raws[prop];
      }
    }
  };
  _proto._spacesFor = function _spacesFor(name) {
    var attrSpaces = {
      before: '',
      after: ''
    };
    var spaces = this.spaces[name] || {};
    var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
    return Object.assign(attrSpaces, spaces, rawSpaces);
  };
  _proto._stringFor = function _stringFor(name, spaceName, concat) {
    if (spaceName === void 0) {
      spaceName = name;
    }
    if (concat === void 0) {
      concat = defaultAttrConcat;
    }
    var attrSpaces = this._spacesFor(spaceName);
    return concat(this.stringifyProperty(name), attrSpaces);
  }

  /**
   * returns the offset of the attribute part specified relative to the
   * start of the node of the output string.
   *
   * * "ns" - alias for "namespace"
   * * "namespace" - the namespace if it exists.
   * * "attribute" - the attribute name
   * * "attributeNS" - the start of the attribute or its namespace
   * * "operator" - the match operator of the attribute
   * * "value" - The value (string or identifier)
   * * "insensitive" - the case insensitivity flag;
   * @param part One of the possible values inside an attribute.
   * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
   */;
  _proto.offsetOf = function offsetOf(name) {
    var count = 1;
    var attributeSpaces = this._spacesFor("attribute");
    count += attributeSpaces.before.length;
    if (name === "namespace" || name === "ns") {
      return this.namespace ? count : -1;
    }
    if (name === "attributeNS") {
      return count;
    }
    count += this.namespaceString.length;
    if (this.namespace) {
      count += 1;
    }
    if (name === "attribute") {
      return count;
    }
    count += this.stringifyProperty("attribute").length;
    count += attributeSpaces.after.length;
    var operatorSpaces = this._spacesFor("operator");
    count += operatorSpaces.before.length;
    var operator = this.stringifyProperty("operator");
    if (name === "operator") {
      return operator ? count : -1;
    }
    count += operator.length;
    count += operatorSpaces.after.length;
    var valueSpaces = this._spacesFor("value");
    count += valueSpaces.before.length;
    var value = this.stringifyProperty("value");
    if (name === "value") {
      return value ? count : -1;
    }
    count += value.length;
    count += valueSpaces.after.length;
    var insensitiveSpaces = this._spacesFor("insensitive");
    count += insensitiveSpaces.before.length;
    if (name === "insensitive") {
      return this.insensitive ? count : -1;
    }
    return -1;
  };
  _proto.toString = function toString() {
    var _this2 = this;
    var selector = [this.rawSpaceBefore, '['];
    selector.push(this._stringFor('qualifiedAttribute', 'attribute'));
    if (this.operator && (this.value || this.value === '')) {
      selector.push(this._stringFor('operator'));
      selector.push(this._stringFor('value'));
      selector.push(this._stringFor('insensitiveFlag', 'insensitive', function (attrValue, attrSpaces) {
        if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
          attrSpaces.before = " ";
        }
        return defaultAttrConcat(attrValue, attrSpaces);
      }));
    }
    selector.push(']');
    selector.push(this.rawSpaceAfter);
    return selector.join('');
  };
  _createClass(Attribute, [{
    key: "quoted",
    get: function get() {
      var qm = this.quoteMark;
      return qm === "'" || qm === '"';
    },
    set: function set(value) {
      warnOfDeprecatedQuotedAssignment();
    }

    /**
     * returns a single (`'`) or double (`"`) quote character if the value is quoted.
     * returns `null` if the value is not quoted.
     * returns `undefined` if the quotation state is unknown (this can happen when
     * the attribute is constructed without specifying a quote mark.)
     */
  }, {
    key: "quoteMark",
    get: function get() {
      return this._quoteMark;
    }

    /**
     * Set the quote mark to be used by this attribute's value.
     * If the quote mark changes, the raw (escaped) value at `attr.raws.value` of the attribute
     * value is updated accordingly.
     *
     * @param {"'" | '"' | null} quoteMark The quote mark or `null` if the value should be unquoted.
     */,
    set: function set(quoteMark) {
      if (!this._constructed) {
        this._quoteMark = quoteMark;
        return;
      }
      if (this._quoteMark !== quoteMark) {
        this._quoteMark = quoteMark;
        this._syncRawValue();
      }
    }
  }, {
    key: "qualifiedAttribute",
    get: function get() {
      return this.qualifiedName(this.raws.attribute || this.attribute);
    }
  }, {
    key: "insensitiveFlag",
    get: function get() {
      return this.insensitive ? 'i' : '';
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set:
    /**
     * Before 3.0, the value had to be set to an escaped value including any wrapped
     * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
     * is unescaped during parsing and any quote marks are removed.
     *
     * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
     * a deprecation warning is raised when the new value contains any characters that would
     * require escaping (including if it contains wrapped quotes).
     *
     * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
     * how the new value is quoted.
     */
    function set(v) {
      if (this._constructed) {
        var _unescapeValue2 = unescapeValue(v),
          deprecatedUsage = _unescapeValue2.deprecatedUsage,
          unescaped = _unescapeValue2.unescaped,
          quoteMark = _unescapeValue2.quoteMark;
        if (deprecatedUsage) {
          warnOfDeprecatedValueAssignment();
        }
        if (unescaped === this._value && quoteMark === this._quoteMark) {
          return;
        }
        this._value = unescaped;
        this._quoteMark = quoteMark;
        this._syncRawValue();
      } else {
        this._value = v;
      }
    }
  }, {
    key: "insensitive",
    get: function get() {
      return this._insensitive;
    }

    /**
     * Set the case insensitive flag.
     * If the case insensitive flag changes, the raw (escaped) value at `attr.raws.insensitiveFlag`
     * of the attribute is updated accordingly.
     *
     * @param {true | false} insensitive true if the attribute should match case-insensitively.
     */,
    set: function set(insensitive) {
      if (!insensitive) {
        this._insensitive = false;

        // "i" and "I" can be used in "this.raws.insensitiveFlag" to store the original notation.
        // When setting `attr.insensitive = false` both should be erased to ensure correct serialization.
        if (this.raws && (this.raws.insensitiveFlag === 'I' || this.raws.insensitiveFlag === 'i')) {
          this.raws.insensitiveFlag = undefined;
        }
      }
      this._insensitive = insensitive;
    }
  }, {
    key: "attribute",
    get: function get() {
      return this._attribute;
    },
    set: function set(name) {
      this._handleEscapes("attribute", name);
      this._attribute = name;
    }
  }]);
  return Attribute;
}(_namespace["default"]);
exports["default"] = Attribute;
Attribute.NO_QUOTE = null;
Attribute.SINGLE_QUOTE = "'";
Attribute.DOUBLE_QUOTE = '"';
var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
  "'": {
    quotes: 'single',
    wrap: true
  },
  '"': {
    quotes: 'double',
    wrap: true
  }
}, _CSSESC_QUOTE_OPTIONS[null] = {
  isIdentifier: true
}, _CSSESC_QUOTE_OPTIONS);
function defaultAttrConcat(attrValue, attrSpaces) {
  return "" + attrSpaces.before + attrValue + attrSpaces.after;
}

/***/ }),

/***/ 4195:
/***/ ((module, exports, __nested_webpack_require_82385__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _cssesc = _interopRequireDefault(__nested_webpack_require_82385__(8937));
var _util = __nested_webpack_require_82385__(9606);
var _node = _interopRequireDefault(__nested_webpack_require_82385__(4646));
var _types = __nested_webpack_require_82385__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ClassName = /*#__PURE__*/function (_Node) {
  _inheritsLoose(ClassName, _Node);
  function ClassName(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.CLASS;
    _this._constructed = true;
    return _this;
  }
  var _proto = ClassName.prototype;
  _proto.valueToString = function valueToString() {
    return '.' + _Node.prototype.valueToString.call(this);
  };
  _createClass(ClassName, [{
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(v) {
      if (this._constructed) {
        var escaped = (0, _cssesc["default"])(v, {
          isIdentifier: true
        });
        if (escaped !== v) {
          (0, _util.ensureObject)(this, "raws");
          this.raws.value = escaped;
        } else if (this.raws) {
          delete this.raws.value;
        }
      }
      this._value = v;
    }
  }]);
  return ClassName;
}(_node["default"]);
exports["default"] = ClassName;
module.exports = exports.default;

/***/ }),

/***/ 1704:
/***/ ((module, exports, __nested_webpack_require_84839__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_84839__(4646));
var _types = __nested_webpack_require_84839__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Combinator = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Combinator, _Node);
  function Combinator(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.COMBINATOR;
    return _this;
  }
  return Combinator;
}(_node["default"]);
exports["default"] = Combinator;
module.exports = exports.default;

/***/ }),

/***/ 425:
/***/ ((module, exports, __nested_webpack_require_85920__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_85920__(4646));
var _types = __nested_webpack_require_85920__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Comment = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Comment, _Node);
  function Comment(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.COMMENT;
    return _this;
  }
  return Comment;
}(_node["default"]);
exports["default"] = Comment;
module.exports = exports.default;

/***/ }),

/***/ 4451:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_87001__) => {

"use strict";


exports.__esModule = true;
exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
var _attribute = _interopRequireDefault(__nested_webpack_require_87001__(5588));
var _className = _interopRequireDefault(__nested_webpack_require_87001__(4195));
var _combinator = _interopRequireDefault(__nested_webpack_require_87001__(1704));
var _comment = _interopRequireDefault(__nested_webpack_require_87001__(425));
var _id = _interopRequireDefault(__nested_webpack_require_87001__(7071));
var _nesting = _interopRequireDefault(__nested_webpack_require_87001__(2918));
var _pseudo = _interopRequireDefault(__nested_webpack_require_87001__(7324));
var _root = _interopRequireDefault(__nested_webpack_require_87001__(518));
var _selector = _interopRequireDefault(__nested_webpack_require_87001__(339));
var _string = _interopRequireDefault(__nested_webpack_require_87001__(5799));
var _tag = _interopRequireDefault(__nested_webpack_require_87001__(9720));
var _universal = _interopRequireDefault(__nested_webpack_require_87001__(1669));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var attribute = function attribute(opts) {
  return new _attribute["default"](opts);
};
exports.attribute = attribute;
var className = function className(opts) {
  return new _className["default"](opts);
};
exports.className = className;
var combinator = function combinator(opts) {
  return new _combinator["default"](opts);
};
exports.combinator = combinator;
var comment = function comment(opts) {
  return new _comment["default"](opts);
};
exports.comment = comment;
var id = function id(opts) {
  return new _id["default"](opts);
};
exports.id = id;
var nesting = function nesting(opts) {
  return new _nesting["default"](opts);
};
exports.nesting = nesting;
var pseudo = function pseudo(opts) {
  return new _pseudo["default"](opts);
};
exports.pseudo = pseudo;
var root = function root(opts) {
  return new _root["default"](opts);
};
exports.root = root;
var selector = function selector(opts) {
  return new _selector["default"](opts);
};
exports.selector = selector;
var string = function string(opts) {
  return new _string["default"](opts);
};
exports.string = string;
var tag = function tag(opts) {
  return new _tag["default"](opts);
};
exports.tag = tag;
var universal = function universal(opts) {
  return new _universal["default"](opts);
};
exports.universal = universal;

/***/ }),

/***/ 3631:
/***/ ((module, exports, __nested_webpack_require_89511__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_89511__(4646));
var types = _interopRequireWildcard(__nested_webpack_require_89511__(1581));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Container = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Container, _Node);
  function Container(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    if (!_this.nodes) {
      _this.nodes = [];
    }
    return _this;
  }
  var _proto = Container.prototype;
  _proto.append = function append(selector) {
    selector.parent = this;
    this.nodes.push(selector);
    return this;
  };
  _proto.prepend = function prepend(selector) {
    selector.parent = this;
    this.nodes.unshift(selector);
    return this;
  };
  _proto.at = function at(index) {
    return this.nodes[index];
  };
  _proto.index = function index(child) {
    if (typeof child === 'number') {
      return child;
    }
    return this.nodes.indexOf(child);
  };
  _proto.removeChild = function removeChild(child) {
    child = this.index(child);
    this.at(child).parent = undefined;
    this.nodes.splice(child, 1);
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }
    return this;
  };
  _proto.removeAll = function removeAll() {
    for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done;) {
      var node = _step.value;
      node.parent = undefined;
    }
    this.nodes = [];
    return this;
  };
  _proto.empty = function empty() {
    return this.removeAll();
  };
  _proto.insertAfter = function insertAfter(oldNode, newNode) {
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    this.nodes.splice(oldIndex + 1, 0, newNode);
    newNode.parent = this;
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (oldIndex <= index) {
        this.indexes[id] = index + 1;
      }
    }
    return this;
  };
  _proto.insertBefore = function insertBefore(oldNode, newNode) {
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    this.nodes.splice(oldIndex, 0, newNode);
    newNode.parent = this;
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (index <= oldIndex) {
        this.indexes[id] = index + 1;
      }
    }
    return this;
  };
  _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
    var found = undefined;
    this.each(function (node) {
      if (node.atPosition) {
        var foundChild = node.atPosition(line, col);
        if (foundChild) {
          found = foundChild;
          return false;
        }
      } else if (node.isAtPosition(line, col)) {
        found = node;
        return false;
      }
    });
    return found;
  }

  /**
   * Return the most specific node at the line and column number given.
   * The source location is based on the original parsed location, locations aren't
   * updated as selector nodes are mutated.
   * 
   * Note that this location is relative to the location of the first character
   * of the selector, and not the location of the selector in the overall document
   * when used in conjunction with postcss.
   *
   * If not found, returns undefined.
   * @param {number} line The line number of the node to find. (1-based index)
   * @param {number} col  The column number of the node to find. (1-based index)
   */;
  _proto.atPosition = function atPosition(line, col) {
    if (this.isAtPosition(line, col)) {
      return this._findChildAtPosition(line, col) || this;
    } else {
      return undefined;
    }
  };
  _proto._inferEndPosition = function _inferEndPosition() {
    if (this.last && this.last.source && this.last.source.end) {
      this.source = this.source || {};
      this.source.end = this.source.end || {};
      Object.assign(this.source.end, this.last.source.end);
    }
  };
  _proto.each = function each(callback) {
    if (!this.lastEach) {
      this.lastEach = 0;
    }
    if (!this.indexes) {
      this.indexes = {};
    }
    this.lastEach++;
    var id = this.lastEach;
    this.indexes[id] = 0;
    if (!this.length) {
      return undefined;
    }
    var index, result;
    while (this.indexes[id] < this.length) {
      index = this.indexes[id];
      result = callback(this.at(index), index);
      if (result === false) {
        break;
      }
      this.indexes[id] += 1;
    }
    delete this.indexes[id];
    if (result === false) {
      return false;
    }
  };
  _proto.walk = function walk(callback) {
    return this.each(function (node, i) {
      var result = callback(node, i);
      if (result !== false && node.length) {
        result = node.walk(callback);
      }
      if (result === false) {
        return false;
      }
    });
  };
  _proto.walkAttributes = function walkAttributes(callback) {
    var _this2 = this;
    return this.walk(function (selector) {
      if (selector.type === types.ATTRIBUTE) {
        return callback.call(_this2, selector);
      }
    });
  };
  _proto.walkClasses = function walkClasses(callback) {
    var _this3 = this;
    return this.walk(function (selector) {
      if (selector.type === types.CLASS) {
        return callback.call(_this3, selector);
      }
    });
  };
  _proto.walkCombinators = function walkCombinators(callback) {
    var _this4 = this;
    return this.walk(function (selector) {
      if (selector.type === types.COMBINATOR) {
        return callback.call(_this4, selector);
      }
    });
  };
  _proto.walkComments = function walkComments(callback) {
    var _this5 = this;
    return this.walk(function (selector) {
      if (selector.type === types.COMMENT) {
        return callback.call(_this5, selector);
      }
    });
  };
  _proto.walkIds = function walkIds(callback) {
    var _this6 = this;
    return this.walk(function (selector) {
      if (selector.type === types.ID) {
        return callback.call(_this6, selector);
      }
    });
  };
  _proto.walkNesting = function walkNesting(callback) {
    var _this7 = this;
    return this.walk(function (selector) {
      if (selector.type === types.NESTING) {
        return callback.call(_this7, selector);
      }
    });
  };
  _proto.walkPseudos = function walkPseudos(callback) {
    var _this8 = this;
    return this.walk(function (selector) {
      if (selector.type === types.PSEUDO) {
        return callback.call(_this8, selector);
      }
    });
  };
  _proto.walkTags = function walkTags(callback) {
    var _this9 = this;
    return this.walk(function (selector) {
      if (selector.type === types.TAG) {
        return callback.call(_this9, selector);
      }
    });
  };
  _proto.walkUniversals = function walkUniversals(callback) {
    var _this10 = this;
    return this.walk(function (selector) {
      if (selector.type === types.UNIVERSAL) {
        return callback.call(_this10, selector);
      }
    });
  };
  _proto.split = function split(callback) {
    var _this11 = this;
    var current = [];
    return this.reduce(function (memo, node, index) {
      var split = callback.call(_this11, node);
      current.push(node);
      if (split) {
        memo.push(current);
        current = [];
      } else if (index === _this11.length - 1) {
        memo.push(current);
      }
      return memo;
    }, []);
  };
  _proto.map = function map(callback) {
    return this.nodes.map(callback);
  };
  _proto.reduce = function reduce(callback, memo) {
    return this.nodes.reduce(callback, memo);
  };
  _proto.every = function every(callback) {
    return this.nodes.every(callback);
  };
  _proto.some = function some(callback) {
    return this.nodes.some(callback);
  };
  _proto.filter = function filter(callback) {
    return this.nodes.filter(callback);
  };
  _proto.sort = function sort(callback) {
    return this.nodes.sort(callback);
  };
  _proto.toString = function toString() {
    return this.map(String).join('');
  };
  _createClass(Container, [{
    key: "first",
    get: function get() {
      return this.at(0);
    }
  }, {
    key: "last",
    get: function get() {
      return this.at(this.length - 1);
    }
  }, {
    key: "length",
    get: function get() {
      return this.nodes.length;
    }
  }]);
  return Container;
}(_node["default"]);
exports["default"] = Container;
module.exports = exports.default;

/***/ }),

/***/ 8500:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_101471__) => {

"use strict";


exports.__esModule = true;
exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
exports.isContainer = isContainer;
exports.isIdentifier = void 0;
exports.isNamespace = isNamespace;
exports.isNesting = void 0;
exports.isNode = isNode;
exports.isPseudo = void 0;
exports.isPseudoClass = isPseudoClass;
exports.isPseudoElement = isPseudoElement;
exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = void 0;
var _types = __nested_webpack_require_101471__(1581);
var _IS_TYPE;
var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
function isNode(node) {
  return typeof node === "object" && IS_TYPE[node.type];
}
function isNodeType(type, node) {
  return isNode(node) && node.type === type;
}
var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
exports.isAttribute = isAttribute;
var isClassName = isNodeType.bind(null, _types.CLASS);
exports.isClassName = isClassName;
var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
exports.isCombinator = isCombinator;
var isComment = isNodeType.bind(null, _types.COMMENT);
exports.isComment = isComment;
var isIdentifier = isNodeType.bind(null, _types.ID);
exports.isIdentifier = isIdentifier;
var isNesting = isNodeType.bind(null, _types.NESTING);
exports.isNesting = isNesting;
var isPseudo = isNodeType.bind(null, _types.PSEUDO);
exports.isPseudo = isPseudo;
var isRoot = isNodeType.bind(null, _types.ROOT);
exports.isRoot = isRoot;
var isSelector = isNodeType.bind(null, _types.SELECTOR);
exports.isSelector = isSelector;
var isString = isNodeType.bind(null, _types.STRING);
exports.isString = isString;
var isTag = isNodeType.bind(null, _types.TAG);
exports.isTag = isTag;
var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
exports.isUniversal = isUniversal;
function isPseudoElement(node) {
  return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
}
function isPseudoClass(node) {
  return isPseudo(node) && !isPseudoElement(node);
}
function isContainer(node) {
  return !!(isNode(node) && node.walk);
}
function isNamespace(node) {
  return isAttribute(node) || isTag(node);
}

/***/ }),

/***/ 7071:
/***/ ((module, exports, __nested_webpack_require_104247__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_104247__(4646));
var _types = __nested_webpack_require_104247__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ID = /*#__PURE__*/function (_Node) {
  _inheritsLoose(ID, _Node);
  function ID(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.ID;
    return _this;
  }
  var _proto = ID.prototype;
  _proto.valueToString = function valueToString() {
    return '#' + _Node.prototype.valueToString.call(this);
  };
  return ID;
}(_node["default"]);
exports["default"] = ID;
module.exports = exports.default;

/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_105442__) => {

"use strict";


exports.__esModule = true;
var _types = __nested_webpack_require_105442__(1581);
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
var _constructors = __nested_webpack_require_105442__(4451);
Object.keys(_constructors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constructors[key]) return;
  exports[key] = _constructors[key];
});
var _guards = __nested_webpack_require_105442__(8500);
Object.keys(_guards).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _guards[key]) return;
  exports[key] = _guards[key];
});

/***/ }),

/***/ 3295:
/***/ ((module, exports, __nested_webpack_require_106307__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _cssesc = _interopRequireDefault(__nested_webpack_require_106307__(8937));
var _util = __nested_webpack_require_106307__(9606);
var _node = _interopRequireDefault(__nested_webpack_require_106307__(4646));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Namespace = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Namespace, _Node);
  function Namespace() {
    return _Node.apply(this, arguments) || this;
  }
  var _proto = Namespace.prototype;
  _proto.qualifiedName = function qualifiedName(value) {
    if (this.namespace) {
      return this.namespaceString + "|" + value;
    } else {
      return value;
    }
  };
  _proto.valueToString = function valueToString() {
    return this.qualifiedName(_Node.prototype.valueToString.call(this));
  };
  _createClass(Namespace, [{
    key: "namespace",
    get: function get() {
      return this._namespace;
    },
    set: function set(namespace) {
      if (namespace === true || namespace === "*" || namespace === "&") {
        this._namespace = namespace;
        if (this.raws) {
          delete this.raws.namespace;
        }
        return;
      }
      var escaped = (0, _cssesc["default"])(namespace, {
        isIdentifier: true
      });
      this._namespace = namespace;
      if (escaped !== namespace) {
        (0, _util.ensureObject)(this, "raws");
        this.raws.namespace = escaped;
      } else if (this.raws) {
        delete this.raws.namespace;
      }
    }
  }, {
    key: "ns",
    get: function get() {
      return this._namespace;
    },
    set: function set(namespace) {
      this.namespace = namespace;
    }
  }, {
    key: "namespaceString",
    get: function get() {
      if (this.namespace) {
        var ns = this.stringifyProperty("namespace");
        if (ns === true) {
          return '';
        } else {
          return ns;
        }
      } else {
        return '';
      }
    }
  }]);
  return Namespace;
}(_node["default"]);
exports["default"] = Namespace;
;
module.exports = exports.default;

/***/ }),

/***/ 2918:
/***/ ((module, exports, __nested_webpack_require_109469__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_109469__(4646));
var _types = __nested_webpack_require_109469__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Nesting = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Nesting, _Node);
  function Nesting(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.NESTING;
    _this.value = '&';
    return _this;
  }
  return Nesting;
}(_node["default"]);
exports["default"] = Nesting;
module.exports = exports.default;

/***/ }),

/***/ 4646:
/***/ ((module, exports, __nested_webpack_require_110556__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _util = __nested_webpack_require_110556__(9606);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var cloneNode = function cloneNode(obj, parent) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  var cloned = new obj.constructor();
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    var value = obj[i];
    var type = typeof value;
    if (i === 'parent' && type === 'object') {
      if (parent) {
        cloned[i] = parent;
      }
    } else if (value instanceof Array) {
      cloned[i] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      cloned[i] = cloneNode(value, cloned);
    }
  }
  return cloned;
};
var Node = /*#__PURE__*/function () {
  function Node(opts) {
    if (opts === void 0) {
      opts = {};
    }
    Object.assign(this, opts);
    this.spaces = this.spaces || {};
    this.spaces.before = this.spaces.before || '';
    this.spaces.after = this.spaces.after || '';
  }
  var _proto = Node.prototype;
  _proto.remove = function remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = undefined;
    return this;
  };
  _proto.replaceWith = function replaceWith() {
    if (this.parent) {
      for (var index in arguments) {
        this.parent.insertBefore(this, arguments[index]);
      }
      this.remove();
    }
    return this;
  };
  _proto.next = function next() {
    return this.parent.at(this.parent.index(this) + 1);
  };
  _proto.prev = function prev() {
    return this.parent.at(this.parent.index(this) - 1);
  };
  _proto.clone = function clone(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    var cloned = cloneNode(this);
    for (var name in overrides) {
      cloned[name] = overrides[name];
    }
    return cloned;
  }

  /**
   * Some non-standard syntax doesn't follow normal escaping rules for css.
   * This allows non standard syntax to be appended to an existing property
   * by specifying the escaped value. By specifying the escaped value,
   * illegal characters are allowed to be directly inserted into css output.
   * @param {string} name the property to set
   * @param {any} value the unescaped value of the property
   * @param {string} valueEscaped optional. the escaped value of the property.
   */;
  _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
    if (!this.raws) {
      this.raws = {};
    }
    var originalValue = this[name];
    var originalEscaped = this.raws[name];
    this[name] = originalValue + value; // this may trigger a setter that updates raws, so it has to be set first.
    if (originalEscaped || valueEscaped !== value) {
      this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
    } else {
      delete this.raws[name]; // delete any escaped value that was created by the setter.
    }
  }

  /**
   * Some non-standard syntax doesn't follow normal escaping rules for css.
   * This allows the escaped value to be specified directly, allowing illegal
   * characters to be directly inserted into css output.
   * @param {string} name the property to set
   * @param {any} value the unescaped value of the property
   * @param {string} valueEscaped the escaped value of the property.
   */;
  _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
    if (!this.raws) {
      this.raws = {};
    }
    this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.
    this.raws[name] = valueEscaped;
  }

  /**
   * When you want a value to passed through to CSS directly. This method
   * deletes the corresponding raw value causing the stringifier to fallback
   * to the unescaped value.
   * @param {string} name the property to set.
   * @param {any} value The value that is both escaped and unescaped.
   */;
  _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
    this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.
    if (this.raws) {
      delete this.raws[name];
    }
  }

  /**
   *
   * @param {number} line The number (starting with 1)
   * @param {number} column The column number (starting with 1)
   */;
  _proto.isAtPosition = function isAtPosition(line, column) {
    if (this.source && this.source.start && this.source.end) {
      if (this.source.start.line > line) {
        return false;
      }
      if (this.source.end.line < line) {
        return false;
      }
      if (this.source.start.line === line && this.source.start.column > column) {
        return false;
      }
      if (this.source.end.line === line && this.source.end.column < column) {
        return false;
      }
      return true;
    }
    return undefined;
  };
  _proto.stringifyProperty = function stringifyProperty(name) {
    return this.raws && this.raws[name] || this[name];
  };
  _proto.valueToString = function valueToString() {
    return String(this.stringifyProperty("value"));
  };
  _proto.toString = function toString() {
    return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join('');
  };
  _createClass(Node, [{
    key: "rawSpaceBefore",
    get: function get() {
      var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
      if (rawSpace === undefined) {
        rawSpace = this.spaces && this.spaces.before;
      }
      return rawSpace || "";
    },
    set: function set(raw) {
      (0, _util.ensureObject)(this, "raws", "spaces");
      this.raws.spaces.before = raw;
    }
  }, {
    key: "rawSpaceAfter",
    get: function get() {
      var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
      if (rawSpace === undefined) {
        rawSpace = this.spaces.after;
      }
      return rawSpace || "";
    },
    set: function set(raw) {
      (0, _util.ensureObject)(this, "raws", "spaces");
      this.raws.spaces.after = raw;
    }
  }]);
  return Node;
}();
exports["default"] = Node;
module.exports = exports.default;

/***/ }),

/***/ 7324:
/***/ ((module, exports, __nested_webpack_require_117331__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(__nested_webpack_require_117331__(3631));
var _types = __nested_webpack_require_117331__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Pseudo = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Pseudo, _Container);
  function Pseudo(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.PSEUDO;
    return _this;
  }
  var _proto = Pseudo.prototype;
  _proto.toString = function toString() {
    var params = this.length ? '(' + this.map(String).join(',') + ')' : '';
    return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join('');
  };
  return Pseudo;
}(_container["default"]);
exports["default"] = Pseudo;
module.exports = exports.default;

/***/ }),

/***/ 518:
/***/ ((module, exports, __nested_webpack_require_118673__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(__nested_webpack_require_118673__(3631));
var _types = __nested_webpack_require_118673__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Root = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Root, _Container);
  function Root(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.ROOT;
    return _this;
  }
  var _proto = Root.prototype;
  _proto.toString = function toString() {
    var str = this.reduce(function (memo, selector) {
      memo.push(String(selector));
      return memo;
    }, []).join(',');
    return this.trailingComma ? str + ',' : str;
  };
  _proto.error = function error(message, options) {
    if (this._error) {
      return this._error(message, options);
    } else {
      return new Error(message);
    }
  };
  _createClass(Root, [{
    key: "errorGenerator",
    set: function set(handler) {
      this._error = handler;
    }
  }]);
  return Root;
}(_container["default"]);
exports["default"] = Root;
module.exports = exports.default;

/***/ }),

/***/ 339:
/***/ ((module, exports, __nested_webpack_require_120906__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(__nested_webpack_require_120906__(3631));
var _types = __nested_webpack_require_120906__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Selector = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Selector, _Container);
  function Selector(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.SELECTOR;
    return _this;
  }
  return Selector;
}(_container["default"]);
exports["default"] = Selector;
module.exports = exports.default;

/***/ }),

/***/ 5799:
/***/ ((module, exports, __nested_webpack_require_122001__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(__nested_webpack_require_122001__(4646));
var _types = __nested_webpack_require_122001__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var String = /*#__PURE__*/function (_Node) {
  _inheritsLoose(String, _Node);
  function String(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.STRING;
    return _this;
  }
  return String;
}(_node["default"]);
exports["default"] = String;
module.exports = exports.default;

/***/ }),

/***/ 9720:
/***/ ((module, exports, __nested_webpack_require_123059__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _namespace = _interopRequireDefault(__nested_webpack_require_123059__(3295));
var _types = __nested_webpack_require_123059__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Tag = /*#__PURE__*/function (_Namespace) {
  _inheritsLoose(Tag, _Namespace);
  function Tag(opts) {
    var _this;
    _this = _Namespace.call(this, opts) || this;
    _this.type = _types.TAG;
    return _this;
  }
  return Tag;
}(_namespace["default"]);
exports["default"] = Tag;
module.exports = exports.default;

/***/ }),

/***/ 1581:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.UNIVERSAL = exports.TAG = exports.STRING = exports.SELECTOR = exports.ROOT = exports.PSEUDO = exports.NESTING = exports.ID = exports.COMMENT = exports.COMBINATOR = exports.CLASS = exports.ATTRIBUTE = void 0;
var TAG = 'tag';
exports.TAG = TAG;
var STRING = 'string';
exports.STRING = STRING;
var SELECTOR = 'selector';
exports.SELECTOR = SELECTOR;
var ROOT = 'root';
exports.ROOT = ROOT;
var PSEUDO = 'pseudo';
exports.PSEUDO = PSEUDO;
var NESTING = 'nesting';
exports.NESTING = NESTING;
var ID = 'id';
exports.ID = ID;
var COMMENT = 'comment';
exports.COMMENT = COMMENT;
var COMBINATOR = 'combinator';
exports.COMBINATOR = COMBINATOR;
var CLASS = 'class';
exports.CLASS = CLASS;
var ATTRIBUTE = 'attribute';
exports.ATTRIBUTE = ATTRIBUTE;
var UNIVERSAL = 'universal';
exports.UNIVERSAL = UNIVERSAL;

/***/ }),

/***/ 1669:
/***/ ((module, exports, __nested_webpack_require_125047__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _namespace = _interopRequireDefault(__nested_webpack_require_125047__(3295));
var _types = __nested_webpack_require_125047__(1581);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Universal = /*#__PURE__*/function (_Namespace) {
  _inheritsLoose(Universal, _Namespace);
  function Universal(opts) {
    var _this;
    _this = _Namespace.call(this, opts) || this;
    _this.type = _types.UNIVERSAL;
    _this.value = '*';
    return _this;
  }
  return Universal;
}(_namespace["default"]);
exports["default"] = Universal;
module.exports = exports.default;

/***/ }),

/***/ 263:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = sortAscending;
function sortAscending(list) {
  return list.sort(function (a, b) {
    return a - b;
  });
}
;
module.exports = exports.default;

/***/ }),

/***/ 71:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.word = exports.tilde = exports.tab = exports.str = exports.space = exports.slash = exports.singleQuote = exports.semicolon = exports.plus = exports.pipe = exports.openSquare = exports.openParenthesis = exports.newline = exports.greaterThan = exports.feed = exports.equals = exports.doubleQuote = exports.dollar = exports.cr = exports.comment = exports.comma = exports.combinator = exports.colon = exports.closeSquare = exports.closeParenthesis = exports.caret = exports.bang = exports.backslash = exports.at = exports.asterisk = exports.ampersand = void 0;
var ampersand = 38; // `&`.charCodeAt(0);
exports.ampersand = ampersand;
var asterisk = 42; // `*`.charCodeAt(0);
exports.asterisk = asterisk;
var at = 64; // `@`.charCodeAt(0);
exports.at = at;
var comma = 44; // `,`.charCodeAt(0);
exports.comma = comma;
var colon = 58; // `:`.charCodeAt(0);
exports.colon = colon;
var semicolon = 59; // `;`.charCodeAt(0);
exports.semicolon = semicolon;
var openParenthesis = 40; // `(`.charCodeAt(0);
exports.openParenthesis = openParenthesis;
var closeParenthesis = 41; // `)`.charCodeAt(0);
exports.closeParenthesis = closeParenthesis;
var openSquare = 91; // `[`.charCodeAt(0);
exports.openSquare = openSquare;
var closeSquare = 93; // `]`.charCodeAt(0);
exports.closeSquare = closeSquare;
var dollar = 36; // `$`.charCodeAt(0);
exports.dollar = dollar;
var tilde = 126; // `~`.charCodeAt(0);
exports.tilde = tilde;
var caret = 94; // `^`.charCodeAt(0);
exports.caret = caret;
var plus = 43; // `+`.charCodeAt(0);
exports.plus = plus;
var equals = 61; // `=`.charCodeAt(0);
exports.equals = equals;
var pipe = 124; // `|`.charCodeAt(0);
exports.pipe = pipe;
var greaterThan = 62; // `>`.charCodeAt(0);
exports.greaterThan = greaterThan;
var space = 32; // ` `.charCodeAt(0);
exports.space = space;
var singleQuote = 39; // `'`.charCodeAt(0);
exports.singleQuote = singleQuote;
var doubleQuote = 34; // `"`.charCodeAt(0);
exports.doubleQuote = doubleQuote;
var slash = 47; // `/`.charCodeAt(0);
exports.slash = slash;
var bang = 33; // `!`.charCodeAt(0);
exports.bang = bang;
var backslash = 92; // '\\'.charCodeAt(0);
exports.backslash = backslash;
var cr = 13; // '\r'.charCodeAt(0);
exports.cr = cr;
var feed = 12; // '\f'.charCodeAt(0);
exports.feed = feed;
var newline = 10; // '\n'.charCodeAt(0);
exports.newline = newline;
var tab = 9; // '\t'.charCodeAt(0);

// Expose aliases primarily for readability.
exports.tab = tab;
var str = singleQuote;

// No good single character representation!
exports.str = str;
var comment = -1;
exports.comment = comment;
var word = -2;
exports.word = word;
var combinator = -3;
exports.combinator = combinator;

/***/ }),

/***/ 2648:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_129221__) => {

"use strict";


exports.__esModule = true;
exports.FIELDS = void 0;
exports["default"] = tokenize;
var t = _interopRequireWildcard(__nested_webpack_require_129221__(71));
var _unescapable, _wordDelimiters;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
var hex = {};
var hexChars = "0123456789abcdefABCDEF";
for (var i = 0; i < hexChars.length; i++) {
  hex[hexChars.charCodeAt(i)] = true;
}

/**
 *  Returns the last index of the bar css word
 * @param {string} css The string in which the word begins
 * @param {number} start The index into the string where word's first letter occurs
 */
function consumeWord(css, start) {
  var next = start;
  var code;
  do {
    code = css.charCodeAt(next);
    if (wordDelimiters[code]) {
      return next - 1;
    } else if (code === t.backslash) {
      next = consumeEscape(css, next) + 1;
    } else {
      // All other characters are part of the word
      next++;
    }
  } while (next < css.length);
  return next - 1;
}

/**
 *  Returns the last index of the escape sequence
 * @param {string} css The string in which the sequence begins
 * @param {number} start The index into the string where escape character (`\`) occurs.
 */
function consumeEscape(css, start) {
  var next = start;
  var code = css.charCodeAt(next + 1);
  if (unescapable[code]) {
    // just consume the escape char
  } else if (hex[code]) {
    var hexDigits = 0;
    // consume up to 6 hex chars
    do {
      next++;
      hexDigits++;
      code = css.charCodeAt(next + 1);
    } while (hex[code] && hexDigits < 6);
    // if fewer than 6 hex chars, a trailing space ends the escape
    if (hexDigits < 6 && code === t.space) {
      next++;
    }
  } else {
    // the next char is part of the current word
    next++;
  }
  return next;
}
var FIELDS = {
  TYPE: 0,
  START_LINE: 1,
  START_COL: 2,
  END_LINE: 3,
  END_COL: 4,
  START_POS: 5,
  END_POS: 6
};
exports.FIELDS = FIELDS;
function tokenize(input) {
  var tokens = [];
  var css = input.css.valueOf();
  var _css = css,
    length = _css.length;
  var offset = -1;
  var line = 1;
  var start = 0;
  var end = 0;
  var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
  function unclosed(what, fix) {
    if (input.safe) {
      // fyi: this is never set to true.
      css += fix;
      next = css.length - 1;
    } else {
      throw input.error('Unclosed ' + what, line, start - offset, start);
    }
  }
  while (start < length) {
    code = css.charCodeAt(start);
    if (code === t.newline) {
      offset = start;
      line += 1;
    }
    switch (code) {
      case t.space:
      case t.tab:
      case t.newline:
      case t.cr:
      case t.feed:
        next = start;
        do {
          next += 1;
          code = css.charCodeAt(next);
          if (code === t.newline) {
            offset = next;
            line += 1;
          }
        } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
        tokenType = t.space;
        endLine = line;
        endColumn = next - offset - 1;
        end = next;
        break;
      case t.plus:
      case t.greaterThan:
      case t.tilde:
      case t.pipe:
        next = start;
        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
        tokenType = t.combinator;
        endLine = line;
        endColumn = start - offset;
        end = next;
        break;

      // Consume these characters as single tokens.
      case t.asterisk:
      case t.ampersand:
      case t.bang:
      case t.comma:
      case t.equals:
      case t.dollar:
      case t.caret:
      case t.openSquare:
      case t.closeSquare:
      case t.colon:
      case t.semicolon:
      case t.openParenthesis:
      case t.closeParenthesis:
        next = start;
        tokenType = code;
        endLine = line;
        endColumn = start - offset;
        end = next + 1;
        break;
      case t.singleQuote:
      case t.doubleQuote:
        quote = code === t.singleQuote ? "'" : '"';
        next = start;
        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);
          if (next === -1) {
            unclosed('quote', quote);
          }
          escapePos = next;
          while (css.charCodeAt(escapePos - 1) === t.backslash) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);
        tokenType = t.str;
        endLine = line;
        endColumn = start - offset;
        end = next + 1;
        break;
      default:
        if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
          next = css.indexOf('*/', start + 2) + 1;
          if (next === 0) {
            unclosed('comment', '*/');
          }
          content = css.slice(start, next + 1);
          lines = content.split('\n');
          last = lines.length - 1;
          if (last > 0) {
            nextLine = line + last;
            nextOffset = next - lines[last].length;
          } else {
            nextLine = line;
            nextOffset = offset;
          }
          tokenType = t.comment;
          line = nextLine;
          endLine = nextLine;
          endColumn = next - nextOffset;
        } else if (code === t.slash) {
          next = start;
          tokenType = code;
          endLine = line;
          endColumn = start - offset;
          end = next + 1;
        } else {
          next = consumeWord(css, start);
          tokenType = t.word;
          endLine = line;
          endColumn = next - offset;
        }
        end = next + 1;
        break;
    }

    // Ensure that the token structure remains consistent
    tokens.push([tokenType,
    // [0] Token type
    line,
    // [1] Starting line
    start - offset,
    // [2] Starting column
    endLine,
    // [3] Ending line
    endColumn,
    // [4] Ending column
    start,
    // [5] Start position / Source index
    end // [6] End position
    ]);

    // Reset offset for the next token
    if (nextOffset) {
      offset = nextOffset;
      nextOffset = null;
    }
    start = end;
  }
  return tokens;
}

/***/ }),

/***/ 1557:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = ensureObject;
function ensureObject(obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  while (props.length > 0) {
    var prop = props.shift();
    if (!obj[prop]) {
      obj[prop] = {};
    }
    obj = obj[prop];
  }
}
module.exports = exports.default;

/***/ }),

/***/ 6291:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = getProp;
function getProp(obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  while (props.length > 0) {
    var prop = props.shift();
    if (!obj[prop]) {
      return undefined;
    }
    obj = obj[prop];
  }
  return obj;
}
module.exports = exports.default;

/***/ }),

/***/ 9606:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_138749__) => {

"use strict";


exports.__esModule = true;
exports.unesc = exports.stripComments = exports.getProp = exports.ensureObject = void 0;
var _unesc = _interopRequireDefault(__nested_webpack_require_138749__(5286));
exports.unesc = _unesc["default"];
var _getProp = _interopRequireDefault(__nested_webpack_require_138749__(6291));
exports.getProp = _getProp["default"];
var _ensureObject = _interopRequireDefault(__nested_webpack_require_138749__(1557));
exports.ensureObject = _ensureObject["default"];
var _stripComments = _interopRequireDefault(__nested_webpack_require_138749__(8354));
exports.stripComments = _stripComments["default"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ 8354:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = stripComments;
function stripComments(str) {
  var s = "";
  var commentStart = str.indexOf("/*");
  var lastEnd = 0;
  while (commentStart >= 0) {
    s = s + str.slice(lastEnd, commentStart);
    var commentEnd = str.indexOf("*/", commentStart + 2);
    if (commentEnd < 0) {
      return s;
    }
    lastEnd = commentEnd + 2;
    commentStart = str.indexOf("/*", lastEnd);
  }
  s = s + str.slice(lastEnd);
  return s;
}
module.exports = exports.default;

/***/ }),

/***/ 5286:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = unesc;
// Many thanks for this post which made this migration much easier.
// https://mathiasbynens.be/notes/css-escapes

/**
 * 
 * @param {string} str 
 * @returns {[string, number]|undefined}
 */
function gobbleHex(str) {
  var lower = str.toLowerCase();
  var hex = '';
  var spaceTerminated = false;
  for (var i = 0; i < 6 && lower[i] !== undefined; i++) {
    var code = lower.charCodeAt(i);
    // check to see if we are dealing with a valid hex char [a-f|0-9]
    var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
    // https://drafts.csswg.org/css-syntax/#consume-escaped-code-point
    spaceTerminated = code === 32;
    if (!valid) {
      break;
    }
    hex += lower[i];
  }
  if (hex.length === 0) {
    return undefined;
  }
  var codePoint = parseInt(hex, 16);
  var isSurrogate = codePoint >= 0xD800 && codePoint <= 0xDFFF;
  // Add special case for
  // "If this number is zero, or is for a surrogate, or is greater than the maximum allowed code point"
  // https://drafts.csswg.org/css-syntax/#maximum-allowed-code-point
  if (isSurrogate || codePoint === 0x0000 || codePoint > 0x10FFFF) {
    return ["\uFFFD", hex.length + (spaceTerminated ? 1 : 0)];
  }
  return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
}
var CONTAINS_ESCAPE = /\\/;
function unesc(str) {
  var needToProcess = CONTAINS_ESCAPE.test(str);
  if (!needToProcess) {
    return str;
  }
  var ret = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      var gobbled = gobbleHex(str.slice(i + 1, i + 7));
      if (gobbled !== undefined) {
        ret += gobbled[0];
        i += gobbled[1];
        continue;
      }

      // Retain a pair of \\ if double escaped `\\\\`
      // https://github.com/postcss/postcss-selector-parser/commit/268c9a7656fb53f543dc620aa5b73a30ec3ff20e
      if (str[i + 1] === "\\") {
        ret += "\\";
        i++;
        continue;
      }

      // if \\ is at the end of the string retain it
      // https://github.com/postcss/postcss-selector-parser/commit/01a6b346e3612ce1ab20219acc26abdc259ccefb
      if (str.length === i + 1) {
        ret += str[i];
      }
      continue;
    }
    ret += str[i];
  }
  return ret;
}
module.exports = exports.default;

/***/ }),

/***/ 5482:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_142472__) => {

var parse = __nested_webpack_require_142472__(8809);
var walk = __nested_webpack_require_142472__(8449);
var stringify = __nested_webpack_require_142472__(9063);

function ValueParser(value) {
  if (this instanceof ValueParser) {
    this.nodes = parse(value);
    return this;
  }
  return new ValueParser(value);
}

ValueParser.prototype.toString = function() {
  return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
};

ValueParser.prototype.walk = function(cb, bubble) {
  walk(this.nodes, cb, bubble);
  return this;
};

ValueParser.unit = __nested_webpack_require_142472__(2882);

ValueParser.walk = walk;

ValueParser.stringify = stringify;

module.exports = ValueParser;


/***/ }),

/***/ 8809:
/***/ ((module) => {

var openParentheses = "(".charCodeAt(0);
var closeParentheses = ")".charCodeAt(0);
var singleQuote = "'".charCodeAt(0);
var doubleQuote = '"'.charCodeAt(0);
var backslash = "\\".charCodeAt(0);
var slash = "/".charCodeAt(0);
var comma = ",".charCodeAt(0);
var colon = ":".charCodeAt(0);
var star = "*".charCodeAt(0);
var uLower = "u".charCodeAt(0);
var uUpper = "U".charCodeAt(0);
var plus = "+".charCodeAt(0);
var isUnicodeRange = /^[a-f0-9?-]+$/i;

module.exports = function(input) {
  var tokens = [];
  var value = input;

  var next,
    quote,
    prev,
    token,
    escape,
    escapePos,
    whitespacePos,
    parenthesesOpenPos;
  var pos = 0;
  var code = value.charCodeAt(pos);
  var max = value.length;
  var stack = [{ nodes: tokens }];
  var balanced = 0;
  var parent;

  var name = "";
  var before = "";
  var after = "";

  while (pos < max) {
    // Whitespaces
    if (code <= 32) {
      next = pos;
      do {
        next += 1;
        code = value.charCodeAt(next);
      } while (code <= 32);
      token = value.slice(pos, next);

      prev = tokens[tokens.length - 1];
      if (code === closeParentheses && balanced) {
        after = token;
      } else if (prev && prev.type === "div") {
        prev.after = token;
        prev.sourceEndIndex += token.length;
      } else if (
        code === comma ||
        code === colon ||
        (code === slash &&
          value.charCodeAt(next + 1) !== star &&
          (!parent ||
            (parent && parent.type === "function" && parent.value !== "calc")))
      ) {
        before = token;
      } else {
        tokens.push({
          type: "space",
          sourceIndex: pos,
          sourceEndIndex: next,
          value: token
        });
      }

      pos = next;

      // Quotes
    } else if (code === singleQuote || code === doubleQuote) {
      next = pos;
      quote = code === singleQuote ? "'" : '"';
      token = {
        type: "string",
        sourceIndex: pos,
        quote: quote
      };
      do {
        escape = false;
        next = value.indexOf(quote, next + 1);
        if (~next) {
          escapePos = next;
          while (value.charCodeAt(escapePos - 1) === backslash) {
            escapePos -= 1;
            escape = !escape;
          }
        } else {
          value += quote;
          next = value.length - 1;
          token.unclosed = true;
        }
      } while (escape);
      token.value = value.slice(pos + 1, next);
      token.sourceEndIndex = token.unclosed ? next : next + 1;
      tokens.push(token);
      pos = next + 1;
      code = value.charCodeAt(pos);

      // Comments
    } else if (code === slash && value.charCodeAt(pos + 1) === star) {
      next = value.indexOf("*/", pos);

      token = {
        type: "comment",
        sourceIndex: pos,
        sourceEndIndex: next + 2
      };

      if (next === -1) {
        token.unclosed = true;
        next = value.length;
        token.sourceEndIndex = next;
      }

      token.value = value.slice(pos + 2, next);
      tokens.push(token);

      pos = next + 2;
      code = value.charCodeAt(pos);

      // Operation within calc
    } else if (
      (code === slash || code === star) &&
      parent &&
      parent.type === "function" &&
      parent.value === "calc"
    ) {
      token = value[pos];
      tokens.push({
        type: "word",
        sourceIndex: pos - before.length,
        sourceEndIndex: pos + token.length,
        value: token
      });
      pos += 1;
      code = value.charCodeAt(pos);

      // Dividers
    } else if (code === slash || code === comma || code === colon) {
      token = value[pos];

      tokens.push({
        type: "div",
        sourceIndex: pos - before.length,
        sourceEndIndex: pos + token.length,
        value: token,
        before: before,
        after: ""
      });
      before = "";

      pos += 1;
      code = value.charCodeAt(pos);

      // Open parentheses
    } else if (openParentheses === code) {
      // Whitespaces after open parentheses
      next = pos;
      do {
        next += 1;
        code = value.charCodeAt(next);
      } while (code <= 32);
      parenthesesOpenPos = pos;
      token = {
        type: "function",
        sourceIndex: pos - name.length,
        value: name,
        before: value.slice(parenthesesOpenPos + 1, next)
      };
      pos = next;

      if (name === "url" && code !== singleQuote && code !== doubleQuote) {
        next -= 1;
        do {
          escape = false;
          next = value.indexOf(")", next + 1);
          if (~next) {
            escapePos = next;
            while (value.charCodeAt(escapePos - 1) === backslash) {
              escapePos -= 1;
              escape = !escape;
            }
          } else {
            value += ")";
            next = value.length - 1;
            token.unclosed = true;
          }
        } while (escape);
        // Whitespaces before closed
        whitespacePos = next;
        do {
          whitespacePos -= 1;
          code = value.charCodeAt(whitespacePos);
        } while (code <= 32);
        if (parenthesesOpenPos < whitespacePos) {
          if (pos !== whitespacePos + 1) {
            token.nodes = [
              {
                type: "word",
                sourceIndex: pos,
                sourceEndIndex: whitespacePos + 1,
                value: value.slice(pos, whitespacePos + 1)
              }
            ];
          } else {
            token.nodes = [];
          }
          if (token.unclosed && whitespacePos + 1 !== next) {
            token.after = "";
            token.nodes.push({
              type: "space",
              sourceIndex: whitespacePos + 1,
              sourceEndIndex: next,
              value: value.slice(whitespacePos + 1, next)
            });
          } else {
            token.after = value.slice(whitespacePos + 1, next);
            token.sourceEndIndex = next;
          }
        } else {
          token.after = "";
          token.nodes = [];
        }
        pos = next + 1;
        token.sourceEndIndex = token.unclosed ? next : pos;
        code = value.charCodeAt(pos);
        tokens.push(token);
      } else {
        balanced += 1;
        token.after = "";
        token.sourceEndIndex = pos + 1;
        tokens.push(token);
        stack.push(token);
        tokens = token.nodes = [];
        parent = token;
      }
      name = "";

      // Close parentheses
    } else if (closeParentheses === code && balanced) {
      pos += 1;
      code = value.charCodeAt(pos);

      parent.after = after;
      parent.sourceEndIndex += after.length;
      after = "";
      balanced -= 1;
      stack[stack.length - 1].sourceEndIndex = pos;
      stack.pop();
      parent = stack[balanced];
      tokens = parent.nodes;

      // Words
    } else {
      next = pos;
      do {
        if (code === backslash) {
          next += 1;
        }
        next += 1;
        code = value.charCodeAt(next);
      } while (
        next < max &&
        !(
          code <= 32 ||
          code === singleQuote ||
          code === doubleQuote ||
          code === comma ||
          code === colon ||
          code === slash ||
          code === openParentheses ||
          (code === star &&
            parent &&
            parent.type === "function" &&
            parent.value === "calc") ||
          (code === slash &&
            parent.type === "function" &&
            parent.value === "calc") ||
          (code === closeParentheses && balanced)
        )
      );
      token = value.slice(pos, next);

      if (openParentheses === code) {
        name = token;
      } else if (
        (uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) &&
        plus === token.charCodeAt(1) &&
        isUnicodeRange.test(token.slice(2))
      ) {
        tokens.push({
          type: "unicode-range",
          sourceIndex: pos,
          sourceEndIndex: next,
          value: token
        });
      } else {
        tokens.push({
          type: "word",
          sourceIndex: pos,
          sourceEndIndex: next,
          value: token
        });
      }

      pos = next;
    }
  }

  for (pos = stack.length - 1; pos; pos -= 1) {
    stack[pos].unclosed = true;
    stack[pos].sourceEndIndex = value.length;
  }

  return stack[0].nodes;
};


/***/ }),

/***/ 9063:
/***/ ((module) => {

function stringifyNode(node, custom) {
  var type = node.type;
  var value = node.value;
  var buf;
  var customResult;

  if (custom && (customResult = custom(node)) !== undefined) {
    return customResult;
  } else if (type === "word" || type === "space") {
    return value;
  } else if (type === "string") {
    buf = node.quote || "";
    return buf + value + (node.unclosed ? "" : buf);
  } else if (type === "comment") {
    return "/*" + value + (node.unclosed ? "" : "*/");
  } else if (type === "div") {
    return (node.before || "") + value + (node.after || "");
  } else if (Array.isArray(node.nodes)) {
    buf = stringify(node.nodes, custom);
    if (type !== "function") {
      return buf;
    }
    return (
      value +
      "(" +
      (node.before || "") +
      buf +
      (node.after || "") +
      (node.unclosed ? "" : ")")
    );
  }
  return value;
}

function stringify(nodes, custom) {
  var result, i;

  if (Array.isArray(nodes)) {
    result = "";
    for (i = nodes.length - 1; ~i; i -= 1) {
      result = stringifyNode(nodes[i], custom) + result;
    }
    return result;
  }
  return stringifyNode(nodes, custom);
}

module.exports = stringify;


/***/ }),

/***/ 2882:
/***/ ((module) => {

var minus = "-".charCodeAt(0);
var plus = "+".charCodeAt(0);
var dot = ".".charCodeAt(0);
var exp = "e".charCodeAt(0);
var EXP = "E".charCodeAt(0);

// Check if three code points would start a number
// https://www.w3.org/TR/css-syntax-3/#starts-with-a-number
function likeNumber(value) {
  var code = value.charCodeAt(0);
  var nextCode;

  if (code === plus || code === minus) {
    nextCode = value.charCodeAt(1);

    if (nextCode >= 48 && nextCode <= 57) {
      return true;
    }

    var nextNextCode = value.charCodeAt(2);

    if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
      return true;
    }

    return false;
  }

  if (code === dot) {
    nextCode = value.charCodeAt(1);

    if (nextCode >= 48 && nextCode <= 57) {
      return true;
    }

    return false;
  }

  if (code >= 48 && code <= 57) {
    return true;
  }

  return false;
}

// Consume a number
// https://www.w3.org/TR/css-syntax-3/#consume-number
module.exports = function(value) {
  var pos = 0;
  var length = value.length;
  var code;
  var nextCode;
  var nextNextCode;

  if (length === 0 || !likeNumber(value)) {
    return false;
  }

  code = value.charCodeAt(pos);

  if (code === plus || code === minus) {
    pos++;
  }

  while (pos < length) {
    code = value.charCodeAt(pos);

    if (code < 48 || code > 57) {
      break;
    }

    pos += 1;
  }

  code = value.charCodeAt(pos);
  nextCode = value.charCodeAt(pos + 1);

  if (code === dot && nextCode >= 48 && nextCode <= 57) {
    pos += 2;

    while (pos < length) {
      code = value.charCodeAt(pos);

      if (code < 48 || code > 57) {
        break;
      }

      pos += 1;
    }
  }

  code = value.charCodeAt(pos);
  nextCode = value.charCodeAt(pos + 1);
  nextNextCode = value.charCodeAt(pos + 2);

  if (
    (code === exp || code === EXP) &&
    ((nextCode >= 48 && nextCode <= 57) ||
      ((nextCode === plus || nextCode === minus) &&
        nextNextCode >= 48 &&
        nextNextCode <= 57))
  ) {
    pos += nextCode === plus || nextCode === minus ? 3 : 2;

    while (pos < length) {
      code = value.charCodeAt(pos);

      if (code < 48 || code > 57) {
        break;
      }

      pos += 1;
    }
  }

  return {
    number: value.slice(0, pos),
    unit: value.slice(pos)
  };
};


/***/ }),

/***/ 8449:
/***/ ((module) => {

module.exports = function walk(nodes, cb, bubble) {
  var i, max, node, result;

  for (i = 0, max = nodes.length; i < max; i += 1) {
    node = nodes[i];
    if (!bubble) {
      result = cb(node, i, nodes);
    }

    if (
      result !== false &&
      node.type === "function" &&
      Array.isArray(node.nodes)
    ) {
      walk(node.nodes, cb, bubble);
    }

    if (bubble) {
      cb(node, i, nodes);
    }
  }
};


/***/ }),

/***/ 396:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_155623__) => {

"use strict";


let Container = __nested_webpack_require_155623__(7793)

class AtRule extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'atrule'
  }

  append(...children) {
    if (!this.proxyOf.nodes) this.nodes = []
    return super.append(...children)
  }

  prepend(...children) {
    if (!this.proxyOf.nodes) this.nodes = []
    return super.prepend(...children)
  }
}

module.exports = AtRule
AtRule.default = AtRule

Container.registerAtRule(AtRule)


/***/ }),

/***/ 9371:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_156193__) => {

"use strict";


let Node = __nested_webpack_require_156193__(3152)

class Comment extends Node {
  constructor(defaults) {
    super(defaults)
    this.type = 'comment'
  }
}

module.exports = Comment
Comment.default = Comment


/***/ }),

/***/ 7793:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_156500__) => {

"use strict";


let { isClean, my } = __nested_webpack_require_156500__(4151)
let Declaration = __nested_webpack_require_156500__(5238)
let Comment = __nested_webpack_require_156500__(9371)
let Node = __nested_webpack_require_156500__(3152)

let parse, Rule, AtRule, Root

function cleanSource(nodes) {
  return nodes.map(i => {
    if (i.nodes) i.nodes = cleanSource(i.nodes)
    delete i.source
    return i
  })
}

function markTreeDirty(node) {
  node[isClean] = false
  if (node.proxyOf.nodes) {
    for (let i of node.proxyOf.nodes) {
      markTreeDirty(i)
    }
  }
}

class Container extends Node {
  append(...children) {
    for (let child of children) {
      let nodes = this.normalize(child, this.last)
      for (let node of nodes) this.proxyOf.nodes.push(node)
    }

    this.markDirty()

    return this
  }

  cleanRaws(keepBetween) {
    super.cleanRaws(keepBetween)
    if (this.nodes) {
      for (let node of this.nodes) node.cleanRaws(keepBetween)
    }
  }

  each(callback) {
    if (!this.proxyOf.nodes) return undefined
    let iterator = this.getIterator()

    let index, result
    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
      index = this.indexes[iterator]
      result = callback(this.proxyOf.nodes[index], index)
      if (result === false) break

      this.indexes[iterator] += 1
    }

    delete this.indexes[iterator]
    return result
  }

  every(condition) {
    return this.nodes.every(condition)
  }

  getIterator() {
    if (!this.lastEach) this.lastEach = 0
    if (!this.indexes) this.indexes = {}

    this.lastEach += 1
    let iterator = this.lastEach
    this.indexes[iterator] = 0

    return iterator
  }

  getProxyProcessor() {
    return {
      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (!node[prop]) {
          return node[prop]
        } else if (
          prop === 'each' ||
          (typeof prop === 'string' && prop.startsWith('walk'))
        ) {
          return (...args) => {
            return node[prop](
              ...args.map(i => {
                if (typeof i === 'function') {
                  return (child, index) => i(child.toProxy(), index)
                } else {
                  return i
                }
              })
            )
          }
        } else if (prop === 'every' || prop === 'some') {
          return cb => {
            return node[prop]((child, ...other) =>
              cb(child.toProxy(), ...other)
            )
          }
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else if (prop === 'nodes') {
          return node.nodes.map(i => i.toProxy())
        } else if (prop === 'first' || prop === 'last') {
          return node[prop].toProxy()
        } else {
          return node[prop]
        }
      },

      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value
        if (prop === 'name' || prop === 'params' || prop === 'selector') {
          node.markDirty()
        }
        return true
      }
    }
  }

  index(child) {
    if (typeof child === 'number') return child
    if (child.proxyOf) child = child.proxyOf
    return this.proxyOf.nodes.indexOf(child)
  }

  insertAfter(exist, add) {
    let existIndex = this.index(exist)
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse()
    existIndex = this.index(exist)
    for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (existIndex < index) {
        this.indexes[id] = index + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  insertBefore(exist, add) {
    let existIndex = this.index(exist)
    let type = existIndex === 0 ? 'prepend' : false
    let nodes = this.normalize(
      add,
      this.proxyOf.nodes[existIndex],
      type
    ).reverse()
    existIndex = this.index(exist)
    for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (existIndex <= index) {
        this.indexes[id] = index + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  normalize(nodes, sample) {
    if (typeof nodes === 'string') {
      nodes = cleanSource(parse(nodes).nodes)
    } else if (typeof nodes === 'undefined') {
      nodes = []
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0)
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore')
      }
    } else if (nodes.type === 'root' && this.type !== 'document') {
      nodes = nodes.nodes.slice(0)
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore')
      }
    } else if (nodes.type) {
      nodes = [nodes]
    } else if (nodes.prop) {
      if (typeof nodes.value === 'undefined') {
        throw new Error('Value field is missed in node creation')
      } else if (typeof nodes.value !== 'string') {
        nodes.value = String(nodes.value)
      }
      nodes = [new Declaration(nodes)]
    } else if (nodes.selector || nodes.selectors) {
      nodes = [new Rule(nodes)]
    } else if (nodes.name) {
      nodes = [new AtRule(nodes)]
    } else if (nodes.text) {
      nodes = [new Comment(nodes)]
    } else {
      throw new Error('Unknown node type in node creation')
    }

    let processed = nodes.map(i => {
      /* c8 ignore next */
      if (!i[my]) Container.rebuild(i)
      i = i.proxyOf
      if (i.parent) i.parent.removeChild(i)
      if (i[isClean]) markTreeDirty(i)
      if (typeof i.raws.before === 'undefined') {
        if (sample && typeof sample.raws.before !== 'undefined') {
          i.raws.before = sample.raws.before.replace(/\S/g, '')
        }
      }
      i.parent = this.proxyOf
      return i
    })

    return processed
  }

  prepend(...children) {
    children = children.reverse()
    for (let child of children) {
      let nodes = this.normalize(child, this.first, 'prepend').reverse()
      for (let node of nodes) this.proxyOf.nodes.unshift(node)
      for (let id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  push(child) {
    child.parent = this
    this.proxyOf.nodes.push(child)
    return this
  }

  removeAll() {
    for (let node of this.proxyOf.nodes) node.parent = undefined
    this.proxyOf.nodes = []

    this.markDirty()

    return this
  }

  removeChild(child) {
    child = this.index(child)
    this.proxyOf.nodes[child].parent = undefined
    this.proxyOf.nodes.splice(child, 1)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (index >= child) {
        this.indexes[id] = index - 1
      }
    }

    this.markDirty()

    return this
  }

  replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts
      opts = {}
    }

    this.walkDecls(decl => {
      if (opts.props && !opts.props.includes(decl.prop)) return
      if (opts.fast && !decl.value.includes(opts.fast)) return

      decl.value = decl.value.replace(pattern, callback)
    })

    this.markDirty()

    return this
  }

  some(condition) {
    return this.nodes.some(condition)
  }

  walk(callback) {
    return this.each((child, i) => {
      let result
      try {
        result = callback(child, i)
      } catch (e) {
        throw child.addToError(e)
      }
      if (result !== false && child.walk) {
        result = child.walk(callback)
      }

      return result
    })
  }

  walkAtRules(name, callback) {
    if (!callback) {
      callback = name
      return this.walk((child, i) => {
        if (child.type === 'atrule') {
          return callback(child, i)
        }
      })
    }
    if (name instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'atrule' && name.test(child.name)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'atrule' && child.name === name) {
        return callback(child, i)
      }
    })
  }

  walkComments(callback) {
    return this.walk((child, i) => {
      if (child.type === 'comment') {
        return callback(child, i)
      }
    })
  }

  walkDecls(prop, callback) {
    if (!callback) {
      callback = prop
      return this.walk((child, i) => {
        if (child.type === 'decl') {
          return callback(child, i)
        }
      })
    }
    if (prop instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'decl' && prop.test(child.prop)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'decl' && child.prop === prop) {
        return callback(child, i)
      }
    })
  }

  walkRules(selector, callback) {
    if (!callback) {
      callback = selector

      return this.walk((child, i) => {
        if (child.type === 'rule') {
          return callback(child, i)
        }
      })
    }
    if (selector instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'rule' && selector.test(child.selector)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'rule' && child.selector === selector) {
        return callback(child, i)
      }
    })
  }

  get first() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[0]
  }

  get last() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
  }
}

Container.registerParse = dependant => {
  parse = dependant
}

Container.registerRule = dependant => {
  Rule = dependant
}

Container.registerAtRule = dependant => {
  AtRule = dependant
}

Container.registerRoot = dependant => {
  Root = dependant
}

module.exports = Container
Container.default = Container

/* c8 ignore start */
Container.rebuild = node => {
  if (node.type === 'atrule') {
    Object.setPrototypeOf(node, AtRule.prototype)
  } else if (node.type === 'rule') {
    Object.setPrototypeOf(node, Rule.prototype)
  } else if (node.type === 'decl') {
    Object.setPrototypeOf(node, Declaration.prototype)
  } else if (node.type === 'comment') {
    Object.setPrototypeOf(node, Comment.prototype)
  } else if (node.type === 'root') {
    Object.setPrototypeOf(node, Root.prototype)
  }

  node[my] = true

  if (node.nodes) {
    node.nodes.forEach(child => {
      Container.rebuild(child)
    })
  }
}
/* c8 ignore stop */


/***/ }),

/***/ 3614:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_167230__) => {

"use strict";


let pico = __nested_webpack_require_167230__(8633)

let terminalHighlight = __nested_webpack_require_167230__(9746)

class CssSyntaxError extends Error {
  constructor(message, line, column, source, file, plugin) {
    super(message)
    this.name = 'CssSyntaxError'
    this.reason = message

    if (file) {
      this.file = file
    }
    if (source) {
      this.source = source
    }
    if (plugin) {
      this.plugin = plugin
    }
    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      if (typeof line === 'number') {
        this.line = line
        this.column = column
      } else {
        this.line = line.line
        this.column = line.column
        this.endLine = column.line
        this.endColumn = column.column
      }
    }

    this.setMessage()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CssSyntaxError)
    }
  }

  setMessage() {
    this.message = this.plugin ? this.plugin + ': ' : ''
    this.message += this.file ? this.file : '<css input>'
    if (typeof this.line !== 'undefined') {
      this.message += ':' + this.line + ':' + this.column
    }
    this.message += ': ' + this.reason
  }

  showSourceCode(color) {
    if (!this.source) return ''

    let css = this.source
    if (color == null) color = pico.isColorSupported
    if (terminalHighlight) {
      if (color) css = terminalHighlight(css)
    }

    let lines = css.split(/\r?\n/)
    let start = Math.max(this.line - 3, 0)
    let end = Math.min(this.line + 2, lines.length)

    let maxWidth = String(end).length

    let mark, aside
    if (color) {
      let { bold, gray, red } = pico.createColors(true)
      mark = text => bold(red(text))
      aside = text => gray(text)
    } else {
      mark = aside = str => str
    }

    return lines
      .slice(start, end)
      .map((line, index) => {
        let number = start + 1 + index
        let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | '
        if (number === this.line) {
          let spacing =
            aside(gutter.replace(/\d/g, ' ')) +
            line.slice(0, this.column - 1).replace(/[^\t]/g, ' ')
          return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^')
        }
        return ' ' + aside(gutter) + line
      })
      .join('\n')
  }

  toString() {
    let code = this.showSourceCode()
    if (code) {
      code = '\n\n' + code + '\n'
    }
    return this.name + ': ' + this.message + code
  }
}

module.exports = CssSyntaxError
CssSyntaxError.default = CssSyntaxError


/***/ }),

/***/ 5238:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_169848__) => {

"use strict";


let Node = __nested_webpack_require_169848__(3152)

class Declaration extends Node {
  constructor(defaults) {
    if (
      defaults &&
      typeof defaults.value !== 'undefined' &&
      typeof defaults.value !== 'string'
    ) {
      defaults = { ...defaults, value: String(defaults.value) }
    }
    super(defaults)
    this.type = 'decl'
  }

  get variable() {
    return this.prop.startsWith('--') || this.prop[0] === '$'
  }
}

module.exports = Declaration
Declaration.default = Declaration


/***/ }),

/***/ 145:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_170446__) => {

"use strict";


let Container = __nested_webpack_require_170446__(7793)

let LazyResult, Processor

class Document extends Container {
  constructor(defaults) {
    // type needs to be passed to super, otherwise child roots won't be normalized correctly
    super({ type: 'document', ...defaults })

    if (!this.nodes) {
      this.nodes = []
    }
  }

  toResult(opts = {}) {
    let lazy = new LazyResult(new Processor(), this, opts)

    return lazy.stringify()
  }
}

Document.registerLazyResult = dependant => {
  LazyResult = dependant
}

Document.registerProcessor = dependant => {
  Processor = dependant
}

module.exports = Document
Document.default = Document


/***/ }),

/***/ 3438:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_171199__) => {

"use strict";


let Declaration = __nested_webpack_require_171199__(5238)
let PreviousMap = __nested_webpack_require_171199__(3878)
let Comment = __nested_webpack_require_171199__(9371)
let AtRule = __nested_webpack_require_171199__(396)
let Input = __nested_webpack_require_171199__(1106)
let Root = __nested_webpack_require_171199__(5644)
let Rule = __nested_webpack_require_171199__(1534)

function fromJSON(json, inputs) {
  if (Array.isArray(json)) return json.map(n => fromJSON(n))

  let { inputs: ownInputs, ...defaults } = json
  if (ownInputs) {
    inputs = []
    for (let input of ownInputs) {
      let inputHydrated = { ...input, __proto__: Input.prototype }
      if (inputHydrated.map) {
        inputHydrated.map = {
          ...inputHydrated.map,
          __proto__: PreviousMap.prototype
        }
      }
      inputs.push(inputHydrated)
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(n => fromJSON(n, inputs))
  }
  if (defaults.source) {
    let { inputId, ...source } = defaults.source
    defaults.source = source
    if (inputId != null) {
      defaults.source.input = inputs[inputId]
    }
  }
  if (defaults.type === 'root') {
    return new Root(defaults)
  } else if (defaults.type === 'decl') {
    return new Declaration(defaults)
  } else if (defaults.type === 'rule') {
    return new Rule(defaults)
  } else if (defaults.type === 'comment') {
    return new Comment(defaults)
  } else if (defaults.type === 'atrule') {
    return new AtRule(defaults)
  } else {
    throw new Error('Unknown node type: ' + json.type)
  }
}

module.exports = fromJSON
fromJSON.default = fromJSON


/***/ }),

/***/ 1106:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_172834__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __nested_webpack_require_172834__(1866)
let { fileURLToPath, pathToFileURL } = __nested_webpack_require_172834__(2739)
let { isAbsolute, resolve } = __nested_webpack_require_172834__(197)
let { nanoid } = __nested_webpack_require_172834__(5042)

let terminalHighlight = __nested_webpack_require_172834__(9746)
let CssSyntaxError = __nested_webpack_require_172834__(3614)
let PreviousMap = __nested_webpack_require_172834__(3878)

let fromOffsetCache = Symbol('fromOffsetCache')

let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator)
let pathAvailable = Boolean(resolve && isAbsolute)

class Input {
  constructor(css, opts = {}) {
    if (
      css === null ||
      typeof css === 'undefined' ||
      (typeof css === 'object' && !css.toString)
    ) {
      throw new Error(`PostCSS received ${css} instead of CSS string`)
    }

    this.css = css.toString()

    if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
      this.hasBOM = true
      this.css = this.css.slice(1)
    } else {
      this.hasBOM = false
    }

    if (opts.from) {
      if (
        !pathAvailable ||
        /^\w+:\/\//.test(opts.from) ||
        isAbsolute(opts.from)
      ) {
        this.file = opts.from
      } else {
        this.file = resolve(opts.from)
      }
    }

    if (pathAvailable && sourceMapAvailable) {
      let map = new PreviousMap(this.css, opts)
      if (map.text) {
        this.map = map
        let file = map.consumer().file
        if (!this.file && file) this.file = this.mapResolve(file)
      }
    }

    if (!this.file) {
      this.id = '<input css ' + nanoid(6) + '>'
    }
    if (this.map) this.map.file = this.from
  }

  error(message, line, column, opts = {}) {
    let result, endLine, endColumn

    if (line && typeof line === 'object') {
      let start = line
      let end = column
      if (typeof start.offset === 'number') {
        let pos = this.fromOffset(start.offset)
        line = pos.line
        column = pos.col
      } else {
        line = start.line
        column = start.column
      }
      if (typeof end.offset === 'number') {
        let pos = this.fromOffset(end.offset)
        endLine = pos.line
        endColumn = pos.col
      } else {
        endLine = end.line
        endColumn = end.column
      }
    } else if (!column) {
      let pos = this.fromOffset(line)
      line = pos.line
      column = pos.col
    }

    let origin = this.origin(line, column, endLine, endColumn)
    if (origin) {
      result = new CssSyntaxError(
        message,
        origin.endLine === undefined
          ? origin.line
          : { column: origin.column, line: origin.line },
        origin.endLine === undefined
          ? origin.column
          : { column: origin.endColumn, line: origin.endLine },
        origin.source,
        origin.file,
        opts.plugin
      )
    } else {
      result = new CssSyntaxError(
        message,
        endLine === undefined ? line : { column, line },
        endLine === undefined ? column : { column: endColumn, line: endLine },
        this.css,
        this.file,
        opts.plugin
      )
    }

    result.input = { column, endColumn, endLine, line, source: this.css }
    if (this.file) {
      if (pathToFileURL) {
        result.input.url = pathToFileURL(this.file).toString()
      }
      result.input.file = this.file
    }

    return result
  }

  fromOffset(offset) {
    let lastLine, lineToIndex
    if (!this[fromOffsetCache]) {
      let lines = this.css.split('\n')
      lineToIndex = new Array(lines.length)
      let prevIndex = 0

      for (let i = 0, l = lines.length; i < l; i++) {
        lineToIndex[i] = prevIndex
        prevIndex += lines[i].length + 1
      }

      this[fromOffsetCache] = lineToIndex
    } else {
      lineToIndex = this[fromOffsetCache]
    }
    lastLine = lineToIndex[lineToIndex.length - 1]

    let min = 0
    if (offset >= lastLine) {
      min = lineToIndex.length - 1
    } else {
      let max = lineToIndex.length - 2
      let mid
      while (min < max) {
        mid = min + ((max - min) >> 1)
        if (offset < lineToIndex[mid]) {
          max = mid - 1
        } else if (offset >= lineToIndex[mid + 1]) {
          min = mid + 1
        } else {
          min = mid
          break
        }
      }
    }
    return {
      col: offset - lineToIndex[min] + 1,
      line: min + 1
    }
  }

  mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file
    }
    return resolve(this.map.consumer().sourceRoot || this.map.root || '.', file)
  }

  origin(line, column, endLine, endColumn) {
    if (!this.map) return false
    let consumer = this.map.consumer()

    let from = consumer.originalPositionFor({ column, line })
    if (!from.source) return false

    let to
    if (typeof endLine === 'number') {
      to = consumer.originalPositionFor({ column: endColumn, line: endLine })
    }

    let fromUrl

    if (isAbsolute(from.source)) {
      fromUrl = pathToFileURL(from.source)
    } else {
      fromUrl = new URL(
        from.source,
        this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
      )
    }

    let result = {
      column: from.column,
      endColumn: to && to.column,
      endLine: to && to.line,
      line: from.line,
      url: fromUrl.toString()
    }

    if (fromUrl.protocol === 'file:') {
      if (fileURLToPath) {
        result.file = fileURLToPath(fromUrl)
      } else {
        /* c8 ignore next 2 */
        throw new Error(`file: protocol is not available in this PostCSS build`)
      }
    }

    let source = consumer.sourceContentFor(from.source)
    if (source) result.source = source

    return result
  }

  toJSON() {
    let json = {}
    for (let name of ['hasBOM', 'css', 'file', 'id']) {
      if (this[name] != null) {
        json[name] = this[name]
      }
    }
    if (this.map) {
      json.map = { ...this.map }
      if (json.map.consumerCache) {
        json.map.consumerCache = undefined
      }
    }
    return json
  }

  get from() {
    return this.file || this.id
  }
}

module.exports = Input
Input.default = Input

if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input)
}


/***/ }),

/***/ 6966:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_179128__) => {

"use strict";


let { isClean, my } = __nested_webpack_require_179128__(4151)
let MapGenerator = __nested_webpack_require_179128__(3604)
let stringify = __nested_webpack_require_179128__(3303)
let Container = __nested_webpack_require_179128__(7793)
let Document = __nested_webpack_require_179128__(145)
let warnOnce = __nested_webpack_require_179128__(6156)
let Result = __nested_webpack_require_179128__(3717)
let parse = __nested_webpack_require_179128__(9577)
let Root = __nested_webpack_require_179128__(5644)

const TYPE_TO_CLASS_NAME = {
  atrule: 'AtRule',
  comment: 'Comment',
  decl: 'Declaration',
  document: 'Document',
  root: 'Root',
  rule: 'Rule'
}

const PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
}

const NOT_VISITORS = {
  Once: true,
  postcssPlugin: true,
  prepare: true
}

const CHILDREN = 0

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

function getEvents(node) {
  let key = false
  let type = TYPE_TO_CLASS_NAME[node.type]
  if (node.type === 'decl') {
    key = node.prop.toLowerCase()
  } else if (node.type === 'atrule') {
    key = node.name.toLowerCase()
  }

  if (key && node.append) {
    return [
      type,
      type + '-' + key,
      CHILDREN,
      type + 'Exit',
      type + 'Exit-' + key
    ]
  } else if (key) {
    return [type, type + '-' + key, type + 'Exit', type + 'Exit-' + key]
  } else if (node.append) {
    return [type, CHILDREN, type + 'Exit']
  } else {
    return [type, type + 'Exit']
  }
}

function toStack(node) {
  let events
  if (node.type === 'document') {
    events = ['Document', CHILDREN, 'DocumentExit']
  } else if (node.type === 'root') {
    events = ['Root', CHILDREN, 'RootExit']
  } else {
    events = getEvents(node)
  }

  return {
    eventIndex: 0,
    events,
    iterator: 0,
    node,
    visitorIndex: 0,
    visitors: []
  }
}

function cleanMarks(node) {
  node[isClean] = false
  if (node.nodes) node.nodes.forEach(i => cleanMarks(i))
  return node
}

let postcss = {}

class LazyResult {
  constructor(processor, css, opts) {
    this.stringified = false
    this.processed = false

    let root
    if (
      typeof css === 'object' &&
      css !== null &&
      (css.type === 'root' || css.type === 'document')
    ) {
      root = cleanMarks(css)
    } else if (css instanceof LazyResult || css instanceof Result) {
      root = cleanMarks(css.root)
      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {}
        if (!opts.map.inline) opts.map.inline = false
        opts.map.prev = css.map
      }
    } else {
      let parser = parse
      if (opts.syntax) parser = opts.syntax.parse
      if (opts.parser) parser = opts.parser
      if (parser.parse) parser = parser.parse

      try {
        root = parser(css, opts)
      } catch (error) {
        this.processed = true
        this.error = error
      }

      if (root && !root[my]) {
        /* c8 ignore next 2 */
        Container.rebuild(root)
      }
    }

    this.result = new Result(processor, root, opts)
    this.helpers = { ...postcss, postcss, result: this.result }
    this.plugins = this.processor.plugins.map(plugin => {
      if (typeof plugin === 'object' && plugin.prepare) {
        return { ...plugin, ...plugin.prepare(this.result) }
      } else {
        return plugin
      }
    })
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    if (this.processed) return Promise.resolve(this.result)
    if (!this.processing) {
      this.processing = this.runAsync()
    }
    return this.processing
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  getAsyncError() {
    throw new Error('Use process(css).then(cb) to work with async plugins')
  }

  handleError(error, node) {
    let plugin = this.result.lastPlugin
    try {
      if (node) node.addToError(error)
      this.error = error
      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin
        error.setMessage()
      } else if (plugin.postcssVersion) {
        if (false) {}
      }
    } catch (err) {
      /* c8 ignore next 3 */
      // eslint-disable-next-line no-console
      if (console && console.error) console.error(err)
    }
    return error
  }

  prepareVisitors() {
    this.listeners = {}
    let add = (plugin, type, cb) => {
      if (!this.listeners[type]) this.listeners[type] = []
      this.listeners[type].push([plugin, cb])
    }
    for (let plugin of this.plugins) {
      if (typeof plugin === 'object') {
        for (let event in plugin) {
          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
            throw new Error(
              `Unknown event ${event} in ${plugin.postcssPlugin}. ` +
                `Try to update PostCSS (${this.processor.version} now).`
            )
          }
          if (!NOT_VISITORS[event]) {
            if (typeof plugin[event] === 'object') {
              for (let filter in plugin[event]) {
                if (filter === '*') {
                  add(plugin, event, plugin[event][filter])
                } else {
                  add(
                    plugin,
                    event + '-' + filter.toLowerCase(),
                    plugin[event][filter]
                  )
                }
              }
            } else if (typeof plugin[event] === 'function') {
              add(plugin, event, plugin[event])
            }
          }
        }
      }
    }
    this.hasListener = Object.keys(this.listeners).length > 0
  }

  async runAsync() {
    this.plugin = 0
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin = this.plugins[i]
      let promise = this.runOnRoot(plugin)
      if (isPromise(promise)) {
        try {
          await promise
        } catch (error) {
          throw this.handleError(error)
        }
      }
    }

    this.prepareVisitors()
    if (this.hasListener) {
      let root = this.result.root
      while (!root[isClean]) {
        root[isClean] = true
        let stack = [toStack(root)]
        while (stack.length > 0) {
          let promise = this.visitTick(stack)
          if (isPromise(promise)) {
            try {
              await promise
            } catch (e) {
              let node = stack[stack.length - 1].node
              throw this.handleError(e, node)
            }
          }
        }
      }

      if (this.listeners.OnceExit) {
        for (let [plugin, visitor] of this.listeners.OnceExit) {
          this.result.lastPlugin = plugin
          try {
            if (root.type === 'document') {
              let roots = root.nodes.map(subRoot =>
                visitor(subRoot, this.helpers)
              )

              await Promise.all(roots)
            } else {
              await visitor(root, this.helpers)
            }
          } catch (e) {
            throw this.handleError(e)
          }
        }
      }
    }

    this.processed = true
    return this.stringify()
  }

  runOnRoot(plugin) {
    this.result.lastPlugin = plugin
    try {
      if (typeof plugin === 'object' && plugin.Once) {
        if (this.result.root.type === 'document') {
          let roots = this.result.root.nodes.map(root =>
            plugin.Once(root, this.helpers)
          )

          if (isPromise(roots[0])) {
            return Promise.all(roots)
          }

          return roots
        }

        return plugin.Once(this.result.root, this.helpers)
      } else if (typeof plugin === 'function') {
        return plugin(this.result.root, this.result)
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  stringify() {
    if (this.error) throw this.error
    if (this.stringified) return this.result
    this.stringified = true

    this.sync()

    let opts = this.result.opts
    let str = stringify
    if (opts.syntax) str = opts.syntax.stringify
    if (opts.stringifier) str = opts.stringifier
    if (str.stringify) str = str.stringify

    let map = new MapGenerator(str, this.result.root, this.result.opts)
    let data = map.generate()
    this.result.css = data[0]
    this.result.map = data[1]

    return this.result
  }

  sync() {
    if (this.error) throw this.error
    if (this.processed) return this.result
    this.processed = true

    if (this.processing) {
      throw this.getAsyncError()
    }

    for (let plugin of this.plugins) {
      let promise = this.runOnRoot(plugin)
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }

    this.prepareVisitors()
    if (this.hasListener) {
      let root = this.result.root
      while (!root[isClean]) {
        root[isClean] = true
        this.walkSync(root)
      }
      if (this.listeners.OnceExit) {
        if (root.type === 'document') {
          for (let subRoot of root.nodes) {
            this.visitSync(this.listeners.OnceExit, subRoot)
          }
        } else {
          this.visitSync(this.listeners.OnceExit, root)
        }
      }
    }

    return this.result
  }

  then(onFulfilled, onRejected) {
    if (false) {}
    return this.async().then(onFulfilled, onRejected)
  }

  toString() {
    return this.css
  }

  visitSync(visitors, node) {
    for (let [plugin, visitor] of visitors) {
      this.result.lastPlugin = plugin
      let promise
      try {
        promise = visitor(node, this.helpers)
      } catch (e) {
        throw this.handleError(e, node.proxyOf)
      }
      if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
        return true
      }
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }
  }

  visitTick(stack) {
    let visit = stack[stack.length - 1]
    let { node, visitors } = visit

    if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
      stack.pop()
      return
    }

    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
      let [plugin, visitor] = visitors[visit.visitorIndex]
      visit.visitorIndex += 1
      if (visit.visitorIndex === visitors.length) {
        visit.visitors = []
        visit.visitorIndex = 0
      }
      this.result.lastPlugin = plugin
      try {
        return visitor(node.toProxy(), this.helpers)
      } catch (e) {
        throw this.handleError(e, node)
      }
    }

    if (visit.iterator !== 0) {
      let iterator = visit.iterator
      let child
      while ((child = node.nodes[node.indexes[iterator]])) {
        node.indexes[iterator] += 1
        if (!child[isClean]) {
          child[isClean] = true
          stack.push(toStack(child))
          return
        }
      }
      visit.iterator = 0
      delete node.indexes[iterator]
    }

    let events = visit.events
    while (visit.eventIndex < events.length) {
      let event = events[visit.eventIndex]
      visit.eventIndex += 1
      if (event === CHILDREN) {
        if (node.nodes && node.nodes.length) {
          node[isClean] = true
          visit.iterator = node.getIterator()
        }
        return
      } else if (this.listeners[event]) {
        visit.visitors = this.listeners[event]
        return
      }
    }
    stack.pop()
  }

  walkSync(node) {
    node[isClean] = true
    let events = getEvents(node)
    for (let event of events) {
      if (event === CHILDREN) {
        if (node.nodes) {
          node.each(child => {
            if (!child[isClean]) this.walkSync(child)
          })
        }
      } else {
        let visitors = this.listeners[event]
        if (visitors) {
          if (this.visitSync(visitors, node.toProxy())) return
        }
      }
    }
  }

  warnings() {
    return this.sync().warnings()
  }

  get content() {
    return this.stringify().content
  }

  get css() {
    return this.stringify().css
  }

  get map() {
    return this.stringify().map
  }

  get messages() {
    return this.sync().messages
  }

  get opts() {
    return this.result.opts
  }

  get processor() {
    return this.result.processor
  }

  get root() {
    return this.sync().root
  }

  get [Symbol.toStringTag]() {
    return 'LazyResult'
  }
}

LazyResult.registerPostcss = dependant => {
  postcss = dependant
}

module.exports = LazyResult
LazyResult.default = LazyResult

Root.registerLazyResult(LazyResult)
Document.registerLazyResult(LazyResult)


/***/ }),

/***/ 1752:
/***/ ((module) => {

"use strict";


let list = {
  comma(string) {
    return list.split(string, [','], true)
  },

  space(string) {
    let spaces = [' ', '\n', '\t']
    return list.split(string, spaces)
  },

  split(string, separators, last) {
    let array = []
    let current = ''
    let split = false

    let func = 0
    let inQuote = false
    let prevQuote = ''
    let escape = false

    for (let letter of string) {
      if (escape) {
        escape = false
      } else if (letter === '\\') {
        escape = true
      } else if (inQuote) {
        if (letter === prevQuote) {
          inQuote = false
        }
      } else if (letter === '"' || letter === "'") {
        inQuote = true
        prevQuote = letter
      } else if (letter === '(') {
        func += 1
      } else if (letter === ')') {
        if (func > 0) func -= 1
      } else if (func === 0) {
        if (separators.includes(letter)) split = true
      }

      if (split) {
        if (current !== '') array.push(current.trim())
        current = ''
        split = false
      } else {
        current += letter
      }
    }

    if (last || current !== '') array.push(current.trim())
    return array
  }
}

module.exports = list
list.default = list


/***/ }),

/***/ 3604:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_193018__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __nested_webpack_require_193018__(1866)
let { dirname, relative, resolve, sep } = __nested_webpack_require_193018__(197)
let { pathToFileURL } = __nested_webpack_require_193018__(2739)

let Input = __nested_webpack_require_193018__(1106)

let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator)
let pathAvailable = Boolean(dirname && resolve && relative && sep)

class MapGenerator {
  constructor(stringify, root, opts, cssString) {
    this.stringify = stringify
    this.mapOpts = opts.map || {}
    this.root = root
    this.opts = opts
    this.css = cssString
    this.originalCSS = cssString
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute

    this.memoizedFileURLs = new Map()
    this.memoizedPaths = new Map()
    this.memoizedURLs = new Map()
  }

  addAnnotation() {
    let content

    if (this.isInline()) {
      content =
        'data:application/json;base64,' + this.toBase64(this.map.toString())
    } else if (typeof this.mapOpts.annotation === 'string') {
      content = this.mapOpts.annotation
    } else if (typeof this.mapOpts.annotation === 'function') {
      content = this.mapOpts.annotation(this.opts.to, this.root)
    } else {
      content = this.outputFile() + '.map'
    }
    let eol = '\n'
    if (this.css.includes('\r\n')) eol = '\r\n'

    this.css += eol + '/*# sourceMappingURL=' + content + ' */'
  }

  applyPrevMaps() {
    for (let prev of this.previous()) {
      let from = this.toUrl(this.path(prev.file))
      let root = prev.root || dirname(prev.file)
      let map

      if (this.mapOpts.sourcesContent === false) {
        map = new SourceMapConsumer(prev.text)
        if (map.sourcesContent) {
          map.sourcesContent = null
        }
      } else {
        map = prev.consumer()
      }

      this.map.applySourceMap(map, from, this.toUrl(this.path(root)))
    }
  }

  clearAnnotation() {
    if (this.mapOpts.annotation === false) return

    if (this.root) {
      let node
      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
        node = this.root.nodes[i]
        if (node.type !== 'comment') continue
        if (node.text.indexOf('# sourceMappingURL=') === 0) {
          this.root.removeChild(i)
        }
      }
    } else if (this.css) {
      this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, '')
    }
  }

  generate() {
    this.clearAnnotation()
    if (pathAvailable && sourceMapAvailable && this.isMap()) {
      return this.generateMap()
    } else {
      let result = ''
      this.stringify(this.root, i => {
        result += i
      })
      return [result]
    }
  }

  generateMap() {
    if (this.root) {
      this.generateString()
    } else if (this.previous().length === 1) {
      let prev = this.previous()[0].consumer()
      prev.file = this.outputFile()
      this.map = SourceMapGenerator.fromSourceMap(prev, {
        ignoreInvalidMapping: true
      })
    } else {
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      })
      this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : '<no source>'
      })
    }

    if (this.isSourcesContent()) this.setSourcesContent()
    if (this.root && this.previous().length > 0) this.applyPrevMaps()
    if (this.isAnnotation()) this.addAnnotation()

    if (this.isInline()) {
      return [this.css]
    } else {
      return [this.css, this.map]
    }
  }

  generateString() {
    this.css = ''
    this.map = new SourceMapGenerator({
      file: this.outputFile(),
      ignoreInvalidMapping: true
    })

    let line = 1
    let column = 1

    let noSource = '<no source>'
    let mapping = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ''
    }

    let lines, last
    this.stringify(this.root, (str, node, type) => {
      this.css += str

      if (node && type !== 'end') {
        mapping.generated.line = line
        mapping.generated.column = column - 1
        if (node.source && node.source.start) {
          mapping.source = this.sourcePath(node)
          mapping.original.line = node.source.start.line
          mapping.original.column = node.source.start.column - 1
          this.map.addMapping(mapping)
        } else {
          mapping.source = noSource
          mapping.original.line = 1
          mapping.original.column = 0
          this.map.addMapping(mapping)
        }
      }

      lines = str.match(/\n/g)
      if (lines) {
        line += lines.length
        last = str.lastIndexOf('\n')
        column = str.length - last
      } else {
        column += str.length
      }

      if (node && type !== 'start') {
        let p = node.parent || { raws: {} }
        let childless =
          node.type === 'decl' || (node.type === 'atrule' && !node.nodes)
        if (!childless || node !== p.last || p.raws.semicolon) {
          if (node.source && node.source.end) {
            mapping.source = this.sourcePath(node)
            mapping.original.line = node.source.end.line
            mapping.original.column = node.source.end.column - 1
            mapping.generated.line = line
            mapping.generated.column = column - 2
            this.map.addMapping(mapping)
          } else {
            mapping.source = noSource
            mapping.original.line = 1
            mapping.original.column = 0
            mapping.generated.line = line
            mapping.generated.column = column - 1
            this.map.addMapping(mapping)
          }
        }
      }
    })
  }

  isAnnotation() {
    if (this.isInline()) {
      return true
    }
    if (typeof this.mapOpts.annotation !== 'undefined') {
      return this.mapOpts.annotation
    }
    if (this.previous().length) {
      return this.previous().some(i => i.annotation)
    }
    return true
  }

  isInline() {
    if (typeof this.mapOpts.inline !== 'undefined') {
      return this.mapOpts.inline
    }

    let annotation = this.mapOpts.annotation
    if (typeof annotation !== 'undefined' && annotation !== true) {
      return false
    }

    if (this.previous().length) {
      return this.previous().some(i => i.inline)
    }
    return true
  }

  isMap() {
    if (typeof this.opts.map !== 'undefined') {
      return !!this.opts.map
    }
    return this.previous().length > 0
  }

  isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
      return this.mapOpts.sourcesContent
    }
    if (this.previous().length) {
      return this.previous().some(i => i.withContent())
    }
    return true
  }

  outputFile() {
    if (this.opts.to) {
      return this.path(this.opts.to)
    } else if (this.opts.from) {
      return this.path(this.opts.from)
    } else {
      return 'to.css'
    }
  }

  path(file) {
    if (this.mapOpts.absolute) return file
    if (file.charCodeAt(0) === 60 /* `<` */) return file
    if (/^\w+:\/\//.test(file)) return file
    let cached = this.memoizedPaths.get(file)
    if (cached) return cached

    let from = this.opts.to ? dirname(this.opts.to) : '.'

    if (typeof this.mapOpts.annotation === 'string') {
      from = dirname(resolve(from, this.mapOpts.annotation))
    }

    let path = relative(from, file)
    this.memoizedPaths.set(file, path)

    return path
  }

  previous() {
    if (!this.previousMaps) {
      this.previousMaps = []
      if (this.root) {
        this.root.walk(node => {
          if (node.source && node.source.input.map) {
            let map = node.source.input.map
            if (!this.previousMaps.includes(map)) {
              this.previousMaps.push(map)
            }
          }
        })
      } else {
        let input = new Input(this.originalCSS, this.opts)
        if (input.map) this.previousMaps.push(input.map)
      }
    }

    return this.previousMaps
  }

  setSourcesContent() {
    let already = {}
    if (this.root) {
      this.root.walk(node => {
        if (node.source) {
          let from = node.source.input.from
          if (from && !already[from]) {
            already[from] = true
            let fromUrl = this.usesFileUrls
              ? this.toFileUrl(from)
              : this.toUrl(this.path(from))
            this.map.setSourceContent(fromUrl, node.source.input.css)
          }
        }
      })
    } else if (this.css) {
      let from = this.opts.from
        ? this.toUrl(this.path(this.opts.from))
        : '<no source>'
      this.map.setSourceContent(from, this.css)
    }
  }

  sourcePath(node) {
    if (this.mapOpts.from) {
      return this.toUrl(this.mapOpts.from)
    } else if (this.usesFileUrls) {
      return this.toFileUrl(node.source.input.from)
    } else {
      return this.toUrl(this.path(node.source.input.from))
    }
  }

  toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString('base64')
    } else {
      return window.btoa(unescape(encodeURIComponent(str)))
    }
  }

  toFileUrl(path) {
    let cached = this.memoizedFileURLs.get(path)
    if (cached) return cached

    if (pathToFileURL) {
      let fileURL = pathToFileURL(path).toString()
      this.memoizedFileURLs.set(path, fileURL)

      return fileURL
    } else {
      throw new Error(
        '`map.absolute` option is not available in this PostCSS build'
      )
    }
  }

  toUrl(path) {
    let cached = this.memoizedURLs.get(path)
    if (cached) return cached

    if (sep === '\\') {
      path = path.replace(/\\/g, '/')
    }

    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent)
    this.memoizedURLs.set(path, url)

    return url
  }
}

module.exports = MapGenerator


/***/ }),

/***/ 4211:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_202866__) => {

"use strict";


let MapGenerator = __nested_webpack_require_202866__(3604)
let stringify = __nested_webpack_require_202866__(3303)
let warnOnce = __nested_webpack_require_202866__(6156)
let parse = __nested_webpack_require_202866__(9577)
const Result = __nested_webpack_require_202866__(3717)

class NoWorkResult {
  constructor(processor, css, opts) {
    css = css.toString()
    this.stringified = false

    this._processor = processor
    this._css = css
    this._opts = opts
    this._map = undefined
    let root

    let str = stringify
    this.result = new Result(this._processor, root, this._opts)
    this.result.css = css

    let self = this
    Object.defineProperty(this.result, 'root', {
      get() {
        return self.root
      }
    })

    let map = new MapGenerator(str, root, this._opts, css)
    if (map.isMap()) {
      let [generatedCSS, generatedMap] = map.generate()
      if (generatedCSS) {
        this.result.css = generatedCSS
      }
      if (generatedMap) {
        this.result.map = generatedMap
      }
    } else {
      map.clearAnnotation()
      this.result.css = map.css
    }
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    return Promise.resolve(this.result)
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  sync() {
    if (this.error) throw this.error
    return this.result
  }

  then(onFulfilled, onRejected) {
    if (false) {}

    return this.async().then(onFulfilled, onRejected)
  }

  toString() {
    return this._css
  }

  warnings() {
    return []
  }

  get content() {
    return this.result.css
  }

  get css() {
    return this.result.css
  }

  get map() {
    return this.result.map
  }

  get messages() {
    return []
  }

  get opts() {
    return this.result.opts
  }

  get processor() {
    return this.result.processor
  }

  get root() {
    if (this._root) {
      return this._root
    }

    let root
    let parser = parse

    try {
      root = parser(this._css, this._opts)
    } catch (error) {
      this.error = error
    }

    if (this.error) {
      throw this.error
    } else {
      this._root = root
      return root
    }
  }

  get [Symbol.toStringTag]() {
    return 'NoWorkResult'
  }
}

module.exports = NoWorkResult
NoWorkResult.default = NoWorkResult


/***/ }),

/***/ 3152:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_205280__) => {

"use strict";


let { isClean, my } = __nested_webpack_require_205280__(4151)
let CssSyntaxError = __nested_webpack_require_205280__(3614)
let Stringifier = __nested_webpack_require_205280__(7668)
let stringify = __nested_webpack_require_205280__(3303)

function cloneNode(obj, parent) {
  let cloned = new obj.constructor()

  for (let i in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i)) {
      /* c8 ignore next 2 */
      continue
    }
    if (i === 'proxyCache') continue
    let value = obj[i]
    let type = typeof value

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent
    } else if (i === 'source') {
      cloned[i] = value
    } else if (Array.isArray(value)) {
      cloned[i] = value.map(j => cloneNode(j, cloned))
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value)
      cloned[i] = value
    }
  }

  return cloned
}

class Node {
  constructor(defaults = {}) {
    this.raws = {}
    this[isClean] = false
    this[my] = true

    for (let name in defaults) {
      if (name === 'nodes') {
        this.nodes = []
        for (let node of defaults[name]) {
          if (typeof node.clone === 'function') {
            this.append(node.clone())
          } else {
            this.append(node)
          }
        }
      } else {
        this[name] = defaults[name]
      }
    }
  }

  addToError(error) {
    error.postcssNode = this
    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
      let s = this.source
      error.stack = error.stack.replace(
        /\n\s{4}at /,
        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
      )
    }
    return error
  }

  after(add) {
    this.parent.insertAfter(this, add)
    return this
  }

  assign(overrides = {}) {
    for (let name in overrides) {
      this[name] = overrides[name]
    }
    return this
  }

  before(add) {
    this.parent.insertBefore(this, add)
    return this
  }

  cleanRaws(keepBetween) {
    delete this.raws.before
    delete this.raws.after
    if (!keepBetween) delete this.raws.between
  }

  clone(overrides = {}) {
    let cloned = cloneNode(this)
    for (let name in overrides) {
      cloned[name] = overrides[name]
    }
    return cloned
  }

  cloneAfter(overrides = {}) {
    let cloned = this.clone(overrides)
    this.parent.insertAfter(this, cloned)
    return cloned
  }

  cloneBefore(overrides = {}) {
    let cloned = this.clone(overrides)
    this.parent.insertBefore(this, cloned)
    return cloned
  }

  error(message, opts = {}) {
    if (this.source) {
      let { end, start } = this.rangeBy(opts)
      return this.source.input.error(
        message,
        { column: start.column, line: start.line },
        { column: end.column, line: end.line },
        opts
      )
    }
    return new CssSyntaxError(message)
  }

  getProxyProcessor() {
    return {
      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else {
          return node[prop]
        }
      },

      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value
        if (
          prop === 'prop' ||
          prop === 'value' ||
          prop === 'name' ||
          prop === 'params' ||
          prop === 'important' ||
          /* c8 ignore next */
          prop === 'text'
        ) {
          node.markDirty()
        }
        return true
      }
    }
  }

  markDirty() {
    if (this[isClean]) {
      this[isClean] = false
      let next = this
      while ((next = next.parent)) {
        next[isClean] = false
      }
    }
  }

  next() {
    if (!this.parent) return undefined
    let index = this.parent.index(this)
    return this.parent.nodes[index + 1]
  }

  positionBy(opts, stringRepresentation) {
    let pos = this.source.start
    if (opts.index) {
      pos = this.positionInside(opts.index, stringRepresentation)
    } else if (opts.word) {
      stringRepresentation = this.toString()
      let index = stringRepresentation.indexOf(opts.word)
      if (index !== -1) pos = this.positionInside(index, stringRepresentation)
    }
    return pos
  }

  positionInside(index, stringRepresentation) {
    let string = stringRepresentation || this.toString()
    let column = this.source.start.column
    let line = this.source.start.line

    for (let i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1
        line += 1
      } else {
        column += 1
      }
    }

    return { column, line }
  }

  prev() {
    if (!this.parent) return undefined
    let index = this.parent.index(this)
    return this.parent.nodes[index - 1]
  }

  rangeBy(opts) {
    let start = {
      column: this.source.start.column,
      line: this.source.start.line
    }
    let end = this.source.end
      ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      }
      : {
        column: start.column + 1,
        line: start.line
      }

    if (opts.word) {
      let stringRepresentation = this.toString()
      let index = stringRepresentation.indexOf(opts.word)
      if (index !== -1) {
        start = this.positionInside(index, stringRepresentation)
        end = this.positionInside(index + opts.word.length, stringRepresentation)
      }
    } else {
      if (opts.start) {
        start = {
          column: opts.start.column,
          line: opts.start.line
        }
      } else if (opts.index) {
        start = this.positionInside(opts.index)
      }

      if (opts.end) {
        end = {
          column: opts.end.column,
          line: opts.end.line
        }
      } else if (typeof opts.endIndex === 'number') {
        end = this.positionInside(opts.endIndex)
      } else if (opts.index) {
        end = this.positionInside(opts.index + 1)
      }
    }

    if (
      end.line < start.line ||
      (end.line === start.line && end.column <= start.column)
    ) {
      end = { column: start.column + 1, line: start.line }
    }

    return { end, start }
  }

  raw(prop, defaultType) {
    let str = new Stringifier()
    return str.raw(this, prop, defaultType)
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this)
    }
    this.parent = undefined
    return this
  }

  replaceWith(...nodes) {
    if (this.parent) {
      let bookmark = this
      let foundSelf = false
      for (let node of nodes) {
        if (node === this) {
          foundSelf = true
        } else if (foundSelf) {
          this.parent.insertAfter(bookmark, node)
          bookmark = node
        } else {
          this.parent.insertBefore(bookmark, node)
        }
      }

      if (!foundSelf) {
        this.remove()
      }
    }

    return this
  }

  root() {
    let result = this
    while (result.parent && result.parent.type !== 'document') {
      result = result.parent
    }
    return result
  }

  toJSON(_, inputs) {
    let fixed = {}
    let emitInputs = inputs == null
    inputs = inputs || new Map()
    let inputsNextIndex = 0

    for (let name in this) {
      if (!Object.prototype.hasOwnProperty.call(this, name)) {
        /* c8 ignore next 2 */
        continue
      }
      if (name === 'parent' || name === 'proxyCache') continue
      let value = this[name]

      if (Array.isArray(value)) {
        fixed[name] = value.map(i => {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON(null, inputs)
          } else {
            return i
          }
        })
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON(null, inputs)
      } else if (name === 'source') {
        let inputId = inputs.get(value.input)
        if (inputId == null) {
          inputId = inputsNextIndex
          inputs.set(value.input, inputsNextIndex)
          inputsNextIndex++
        }
        fixed[name] = {
          end: value.end,
          inputId,
          start: value.start
        }
      } else {
        fixed[name] = value
      }
    }

    if (emitInputs) {
      fixed.inputs = [...inputs.keys()].map(input => input.toJSON())
    }

    return fixed
  }

  toProxy() {
    if (!this.proxyCache) {
      this.proxyCache = new Proxy(this, this.getProxyProcessor())
    }
    return this.proxyCache
  }

  toString(stringifier = stringify) {
    if (stringifier.stringify) stringifier = stringifier.stringify
    let result = ''
    stringifier(this, i => {
      result += i
    })
    return result
  }

  warn(result, text, opts) {
    let data = { node: this }
    for (let i in opts) data[i] = opts[i]
    return result.warn(text, data)
  }

  get proxyOf() {
    return this
  }
}

module.exports = Node
Node.default = Node


/***/ }),

/***/ 9577:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_214134__) => {

"use strict";


let Container = __nested_webpack_require_214134__(7793)
let Parser = __nested_webpack_require_214134__(8339)
let Input = __nested_webpack_require_214134__(1106)

function parse(css, opts) {
  let input = new Input(css, opts)
  let parser = new Parser(input)
  try {
    parser.parse()
  } catch (e) {
    if (false) {}
    throw e
  }

  return parser.root
}

module.exports = parse
parse.default = parse

Container.registerParse(parse)


/***/ }),

/***/ 8339:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_214639__) => {

"use strict";


let Declaration = __nested_webpack_require_214639__(5238)
let tokenizer = __nested_webpack_require_214639__(5781)
let Comment = __nested_webpack_require_214639__(9371)
let AtRule = __nested_webpack_require_214639__(396)
let Root = __nested_webpack_require_214639__(5644)
let Rule = __nested_webpack_require_214639__(1534)

const SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
}

function findLastWithPosition(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i]
    let pos = token[3] || token[2]
    if (pos) return pos
  }
}

class Parser {
  constructor(input) {
    this.input = input

    this.root = new Root()
    this.current = this.root
    this.spaces = ''
    this.semicolon = false

    this.createTokenizer()
    this.root.source = { input, start: { column: 1, line: 1, offset: 0 } }
  }

  atrule(token) {
    let node = new AtRule()
    node.name = token[1].slice(1)
    if (node.name === '') {
      this.unnamedAtrule(node, token)
    }
    this.init(node, token[2])

    let type
    let prev
    let shift
    let last = false
    let open = false
    let params = []
    let brackets = []

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken()
      type = token[0]

      if (type === '(' || type === '[') {
        brackets.push(type === '(' ? ')' : ']')
      } else if (type === '{' && brackets.length > 0) {
        brackets.push('}')
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop()
      }

      if (brackets.length === 0) {
        if (type === ';') {
          node.source.end = this.getPosition(token[2])
          node.source.end.offset++
          this.semicolon = true
          break
        } else if (type === '{') {
          open = true
          break
        } else if (type === '}') {
          if (params.length > 0) {
            shift = params.length - 1
            prev = params[shift]
            while (prev && prev[0] === 'space') {
              prev = params[--shift]
            }
            if (prev) {
              node.source.end = this.getPosition(prev[3] || prev[2])
              node.source.end.offset++
            }
          }
          this.end(token)
          break
        } else {
          params.push(token)
        }
      } else {
        params.push(token)
      }

      if (this.tokenizer.endOfFile()) {
        last = true
        break
      }
    }

    node.raws.between = this.spacesAndCommentsFromEnd(params)
    if (params.length) {
      node.raws.afterName = this.spacesAndCommentsFromStart(params)
      this.raw(node, 'params', params)
      if (last) {
        token = params[params.length - 1]
        node.source.end = this.getPosition(token[3] || token[2])
        node.source.end.offset++
        this.spaces = node.raws.between
        node.raws.between = ''
      }
    } else {
      node.raws.afterName = ''
      node.params = ''
    }

    if (open) {
      node.nodes = []
      this.current = node
    }
  }

  checkMissedSemicolon(tokens) {
    let colon = this.colon(tokens)
    if (colon === false) return

    let founded = 0
    let token
    for (let j = colon - 1; j >= 0; j--) {
      token = tokens[j]
      if (token[0] !== 'space') {
        founded += 1
        if (founded === 2) break
      }
    }
    // If the token is a word, e.g. `!important`, `red` or any other valid property's value.
    // Then we need to return the colon after that word token. [3] is the "end" colon of that word.
    // And because we need it after that one we do +1 to get the next one.
    throw this.input.error(
      'Missed semicolon',
      token[0] === 'word' ? token[3] + 1 : token[2]
    )
  }

  colon(tokens) {
    let brackets = 0
    let token, type, prev
    for (let [i, element] of tokens.entries()) {
      token = element
      type = token[0]

      if (type === '(') {
        brackets += 1
      }
      if (type === ')') {
        brackets -= 1
      }
      if (brackets === 0 && type === ':') {
        if (!prev) {
          this.doubleColon(token)
        } else if (prev[0] === 'word' && prev[1] === 'progid') {
          continue
        } else {
          return i
        }
      }

      prev = token
    }
    return false
  }

  comment(token) {
    let node = new Comment()
    this.init(node, token[2])
    node.source.end = this.getPosition(token[3] || token[2])
    node.source.end.offset++

    let text = token[1].slice(2, -2)
    if (/^\s*$/.test(text)) {
      node.text = ''
      node.raws.left = text
      node.raws.right = ''
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/)
      node.text = match[2]
      node.raws.left = match[1]
      node.raws.right = match[3]
    }
  }

  createTokenizer() {
    this.tokenizer = tokenizer(this.input)
  }

  decl(tokens, customProperty) {
    let node = new Declaration()
    this.init(node, tokens[0][2])

    let last = tokens[tokens.length - 1]
    if (last[0] === ';') {
      this.semicolon = true
      tokens.pop()
    }

    node.source.end = this.getPosition(
      last[3] || last[2] || findLastWithPosition(tokens)
    )
    node.source.end.offset++

    while (tokens[0][0] !== 'word') {
      if (tokens.length === 1) this.unknownWord(tokens)
      node.raws.before += tokens.shift()[1]
    }
    node.source.start = this.getPosition(tokens[0][2])

    node.prop = ''
    while (tokens.length) {
      let type = tokens[0][0]
      if (type === ':' || type === 'space' || type === 'comment') {
        break
      }
      node.prop += tokens.shift()[1]
    }

    node.raws.between = ''

    let token
    while (tokens.length) {
      token = tokens.shift()

      if (token[0] === ':') {
        node.raws.between += token[1]
        break
      } else {
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token])
        }
        node.raws.between += token[1]
      }
    }

    if (node.prop[0] === '_' || node.prop[0] === '*') {
      node.raws.before += node.prop[0]
      node.prop = node.prop.slice(1)
    }

    let firstSpaces = []
    let next
    while (tokens.length) {
      next = tokens[0][0]
      if (next !== 'space' && next !== 'comment') break
      firstSpaces.push(tokens.shift())
    }

    this.precheckMissedSemicolon(tokens)

    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i]
      if (token[1].toLowerCase() === '!important') {
        node.important = true
        let string = this.stringFrom(tokens, i)
        string = this.spacesFromEnd(tokens) + string
        if (string !== ' !important') node.raws.important = string
        break
      } else if (token[1].toLowerCase() === 'important') {
        let cache = tokens.slice(0)
        let str = ''
        for (let j = i; j > 0; j--) {
          let type = cache[j][0]
          if (str.trim().indexOf('!') === 0 && type !== 'space') {
            break
          }
          str = cache.pop()[1] + str
        }
        if (str.trim().indexOf('!') === 0) {
          node.important = true
          node.raws.important = str
          tokens = cache
        }
      }

      if (token[0] !== 'space' && token[0] !== 'comment') {
        break
      }
    }

    let hasWord = tokens.some(i => i[0] !== 'space' && i[0] !== 'comment')

    if (hasWord) {
      node.raws.between += firstSpaces.map(i => i[1]).join('')
      firstSpaces = []
    }
    this.raw(node, 'value', firstSpaces.concat(tokens), customProperty)

    if (node.value.includes(':') && !customProperty) {
      this.checkMissedSemicolon(tokens)
    }
  }

  doubleColon(token) {
    throw this.input.error(
      'Double colon',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }

  emptyRule(token) {
    let node = new Rule()
    this.init(node, token[2])
    node.selector = ''
    node.raws.between = ''
    this.current = node
  }

  end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon
    }
    this.semicolon = false

    this.current.raws.after = (this.current.raws.after || '') + this.spaces
    this.spaces = ''

    if (this.current.parent) {
      this.current.source.end = this.getPosition(token[2])
      this.current.source.end.offset++
      this.current = this.current.parent
    } else {
      this.unexpectedClose(token)
    }
  }

  endFile() {
    if (this.current.parent) this.unclosedBlock()
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon
    }
    this.current.raws.after = (this.current.raws.after || '') + this.spaces
    this.root.source.end = this.getPosition(this.tokenizer.position())
  }

  freeSemicolon(token) {
    this.spaces += token[1]
    if (this.current.nodes) {
      let prev = this.current.nodes[this.current.nodes.length - 1]
      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces
        this.spaces = ''
      }
    }
  }

  // Helpers

  getPosition(offset) {
    let pos = this.input.fromOffset(offset)
    return {
      column: pos.col,
      line: pos.line,
      offset
    }
  }

  init(node, offset) {
    this.current.push(node)
    node.source = {
      input: this.input,
      start: this.getPosition(offset)
    }
    node.raws.before = this.spaces
    this.spaces = ''
    if (node.type !== 'comment') this.semicolon = false
  }

  other(start) {
    let end = false
    let type = null
    let colon = false
    let bracket = null
    let brackets = []
    let customProperty = start[1].startsWith('--')

    let tokens = []
    let token = start
    while (token) {
      type = token[0]
      tokens.push(token)

      if (type === '(' || type === '[') {
        if (!bracket) bracket = token
        brackets.push(type === '(' ? ')' : ']')
      } else if (customProperty && colon && type === '{') {
        if (!bracket) bracket = token
        brackets.push('}')
      } else if (brackets.length === 0) {
        if (type === ';') {
          if (colon) {
            this.decl(tokens, customProperty)
            return
          } else {
            break
          }
        } else if (type === '{') {
          this.rule(tokens)
          return
        } else if (type === '}') {
          this.tokenizer.back(tokens.pop())
          end = true
          break
        } else if (type === ':') {
          colon = true
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop()
        if (brackets.length === 0) bracket = null
      }

      token = this.tokenizer.nextToken()
    }

    if (this.tokenizer.endOfFile()) end = true
    if (brackets.length > 0) this.unclosedBracket(bracket)

    if (end && colon) {
      if (!customProperty) {
        while (tokens.length) {
          token = tokens[tokens.length - 1][0]
          if (token !== 'space' && token !== 'comment') break
          this.tokenizer.back(tokens.pop())
        }
      }
      this.decl(tokens, customProperty)
    } else {
      this.unknownWord(tokens)
    }
  }

  parse() {
    let token
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken()

      switch (token[0]) {
        case 'space':
          this.spaces += token[1]
          break

        case ';':
          this.freeSemicolon(token)
          break

        case '}':
          this.end(token)
          break

        case 'comment':
          this.comment(token)
          break

        case 'at-word':
          this.atrule(token)
          break

        case '{':
          this.emptyRule(token)
          break

        default:
          this.other(token)
          break
      }
    }
    this.endFile()
  }

  precheckMissedSemicolon(/* tokens */) {
    // Hook for Safe Parser
  }

  raw(node, prop, tokens, customProperty) {
    let token, type
    let length = tokens.length
    let value = ''
    let clean = true
    let next, prev

    for (let i = 0; i < length; i += 1) {
      token = tokens[i]
      type = token[0]
      if (type === 'space' && i === length - 1 && !customProperty) {
        clean = false
      } else if (type === 'comment') {
        prev = tokens[i - 1] ? tokens[i - 1][0] : 'empty'
        next = tokens[i + 1] ? tokens[i + 1][0] : 'empty'
        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
          if (value.slice(-1) === ',') {
            clean = false
          } else {
            value += token[1]
          }
        } else {
          clean = false
        }
      } else {
        value += token[1]
      }
    }
    if (!clean) {
      let raw = tokens.reduce((all, i) => all + i[1], '')
      node.raws[prop] = { raw, value }
    }
    node[prop] = value
  }

  rule(tokens) {
    tokens.pop()

    let node = new Rule()
    this.init(node, tokens[0][2])

    node.raws.between = this.spacesAndCommentsFromEnd(tokens)
    this.raw(node, 'selector', tokens)
    this.current = node
  }

  spacesAndCommentsFromEnd(tokens) {
    let lastTokenType
    let spaces = ''
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0]
      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
      spaces = tokens.pop()[1] + spaces
    }
    return spaces
  }

  // Errors

  spacesAndCommentsFromStart(tokens) {
    let next
    let spaces = ''
    while (tokens.length) {
      next = tokens[0][0]
      if (next !== 'space' && next !== 'comment') break
      spaces += tokens.shift()[1]
    }
    return spaces
  }

  spacesFromEnd(tokens) {
    let lastTokenType
    let spaces = ''
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0]
      if (lastTokenType !== 'space') break
      spaces = tokens.pop()[1] + spaces
    }
    return spaces
  }

  stringFrom(tokens, from) {
    let result = ''
    for (let i = from; i < tokens.length; i++) {
      result += tokens[i][1]
    }
    tokens.splice(from, tokens.length - from)
    return result
  }

  unclosedBlock() {
    let pos = this.current.source.start
    throw this.input.error('Unclosed block', pos.line, pos.column)
  }

  unclosedBracket(bracket) {
    throw this.input.error(
      'Unclosed bracket',
      { offset: bracket[2] },
      { offset: bracket[2] + 1 }
    )
  }

  unexpectedClose(token) {
    throw this.input.error(
      'Unexpected }',
      { offset: token[2] },
      { offset: token[2] + 1 }
    )
  }

  unknownWord(tokens) {
    throw this.input.error(
      'Unknown word',
      { offset: tokens[0][2] },
      { offset: tokens[0][2] + tokens[0][1].length }
    )
  }

  unnamedAtrule(node, token) {
    throw this.input.error(
      'At-rule without name',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }
}

module.exports = Parser


/***/ }),

/***/ 2895:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_229490__) => {

"use strict";


let CssSyntaxError = __nested_webpack_require_229490__(3614)
let Declaration = __nested_webpack_require_229490__(5238)
let LazyResult = __nested_webpack_require_229490__(6966)
let Container = __nested_webpack_require_229490__(7793)
let Processor = __nested_webpack_require_229490__(6846)
let stringify = __nested_webpack_require_229490__(3303)
let fromJSON = __nested_webpack_require_229490__(3438)
let Document = __nested_webpack_require_229490__(145)
let Warning = __nested_webpack_require_229490__(38)
let Comment = __nested_webpack_require_229490__(9371)
let AtRule = __nested_webpack_require_229490__(396)
let Result = __nested_webpack_require_229490__(3717)
let Input = __nested_webpack_require_229490__(1106)
let parse = __nested_webpack_require_229490__(9577)
let list = __nested_webpack_require_229490__(1752)
let Rule = __nested_webpack_require_229490__(1534)
let Root = __nested_webpack_require_229490__(5644)
let Node = __nested_webpack_require_229490__(3152)

function postcss(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0]
  }
  return new Processor(plugins)
}

postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false
  function creator(...args) {
    // eslint-disable-next-line no-console
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true
      // eslint-disable-next-line no-console
      console.warn(
        name +
          ': postcss.plugin was deprecated. Migration guide:\n' +
          'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
      )
      if (process.env.LANG && process.env.LANG.startsWith('cn')) {
        /* c8 ignore next 7 */
        // eslint-disable-next-line no-console
        console.warn(
          name +
            ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
            'https://www.w3ctech.com/topic/2226'
        )
      }
    }
    let transformer = initializer(...args)
    transformer.postcssPlugin = name
    transformer.postcssVersion = new Processor().version
    return transformer
  }

  let cache
  Object.defineProperty(creator, 'postcss', {
    get() {
      if (!cache) cache = creator()
      return cache
    }
  })

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts)
  }

  return creator
}

postcss.stringify = stringify
postcss.parse = parse
postcss.fromJSON = fromJSON
postcss.list = list

postcss.comment = defaults => new Comment(defaults)
postcss.atRule = defaults => new AtRule(defaults)
postcss.decl = defaults => new Declaration(defaults)
postcss.rule = defaults => new Rule(defaults)
postcss.root = defaults => new Root(defaults)
postcss.document = defaults => new Document(defaults)

postcss.CssSyntaxError = CssSyntaxError
postcss.Declaration = Declaration
postcss.Container = Container
postcss.Processor = Processor
postcss.Document = Document
postcss.Comment = Comment
postcss.Warning = Warning
postcss.AtRule = AtRule
postcss.Result = Result
postcss.Input = Input
postcss.Rule = Rule
postcss.Root = Root
postcss.Node = Node

LazyResult.registerPostcss(postcss)

module.exports = postcss
postcss.default = postcss


/***/ }),

/***/ 3878:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_232541__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __nested_webpack_require_232541__(1866)
let { existsSync, readFileSync } = __nested_webpack_require_232541__(9977)
let { dirname, join } = __nested_webpack_require_232541__(197)

function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString()
  } else {
    /* c8 ignore next 2 */
    return window.atob(str)
  }
}

class PreviousMap {
  constructor(css, opts) {
    if (opts.map === false) return
    this.loadAnnotation(css)
    this.inline = this.startWith(this.annotation, 'data:')

    let prev = opts.map ? opts.map.prev : undefined
    let text = this.loadMap(opts.from, prev)
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from
    }
    if (this.mapFile) this.root = dirname(this.mapFile)
    if (text) this.text = text
  }

  consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new SourceMapConsumer(this.text)
    }
    return this.consumerCache
  }

  decodeInline(text) {
    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/
    let baseUri = /^data:application\/json;base64,/
    let charsetUri = /^data:application\/json;charset=utf-?8,/
    let uri = /^data:application\/json,/

    let uriMatch = text.match(charsetUri) || text.match(uri)
    if (uriMatch) {
      return decodeURIComponent(text.substr(uriMatch[0].length))
    }

    let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri)
    if (baseUriMatch) {
      return fromBase64(text.substr(baseUriMatch[0].length))
    }

    let encoding = text.match(/data:application\/json;([^,]+),/)[1]
    throw new Error('Unsupported source map encoding ' + encoding)
  }

  getAnnotationURL(sourceMapString) {
    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, '').trim()
  }

  isMap(map) {
    if (typeof map !== 'object') return false
    return (
      typeof map.mappings === 'string' ||
      typeof map._mappings === 'string' ||
      Array.isArray(map.sections)
    )
  }

  loadAnnotation(css) {
    let comments = css.match(/\/\*\s*# sourceMappingURL=/g)
    if (!comments) return

    // sourceMappingURLs from comments, strings, etc.
    let start = css.lastIndexOf(comments.pop())
    let end = css.indexOf('*/', start)

    if (start > -1 && end > -1) {
      // Locate the last sourceMappingURL to avoid pickin
      this.annotation = this.getAnnotationURL(css.substring(start, end))
    }
  }

  loadFile(path) {
    this.root = dirname(path)
    if (existsSync(path)) {
      this.mapFile = path
      return readFileSync(path, 'utf-8').toString().trim()
    }
  }

  loadMap(file, prev) {
    if (prev === false) return false

    if (prev) {
      if (typeof prev === 'string') {
        return prev
      } else if (typeof prev === 'function') {
        let prevPath = prev(file)
        if (prevPath) {
          let map = this.loadFile(prevPath)
          if (!map) {
            throw new Error(
              'Unable to load previous source map: ' + prevPath.toString()
            )
          }
          return map
        }
      } else if (prev instanceof SourceMapConsumer) {
        return SourceMapGenerator.fromSourceMap(prev).toString()
      } else if (prev instanceof SourceMapGenerator) {
        return prev.toString()
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev)
      } else {
        throw new Error(
          'Unsupported previous source map format: ' + prev.toString()
        )
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation)
    } else if (this.annotation) {
      let map = this.annotation
      if (file) map = join(dirname(file), map)
      return this.loadFile(map)
    }
  }

  startWith(string, start) {
    if (!string) return false
    return string.substr(0, start.length) === start
  }

  withContent() {
    return !!(
      this.consumer().sourcesContent &&
      this.consumer().sourcesContent.length > 0
    )
  }
}

module.exports = PreviousMap
PreviousMap.default = PreviousMap


/***/ }),

/***/ 6846:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_236643__) => {

"use strict";


let NoWorkResult = __nested_webpack_require_236643__(4211)
let LazyResult = __nested_webpack_require_236643__(6966)
let Document = __nested_webpack_require_236643__(145)
let Root = __nested_webpack_require_236643__(5644)

class Processor {
  constructor(plugins = []) {
    this.version = '8.4.41'
    this.plugins = this.normalize(plugins)
  }

  normalize(plugins) {
    let normalized = []
    for (let i of plugins) {
      if (i.postcss === true) {
        i = i()
      } else if (i.postcss) {
        i = i.postcss
      }

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins)
      } else if (typeof i === 'object' && i.postcssPlugin) {
        normalized.push(i)
      } else if (typeof i === 'function') {
        normalized.push(i)
      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
        if (false) {}
      } else {
        throw new Error(i + ' is not a PostCSS plugin')
      }
    }
    return normalized
  }

  process(css, opts = {}) {
    if (
      !this.plugins.length &&
      !opts.parser &&
      !opts.stringifier &&
      !opts.syntax
    ) {
      return new NoWorkResult(this, css, opts)
    } else {
      return new LazyResult(this, css, opts)
    }
  }

  use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]))
    return this
  }
}

module.exports = Processor
Processor.default = Processor

Root.registerProcessor(Processor)
Document.registerProcessor(Processor)


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_238197__) => {

"use strict";


let Warning = __nested_webpack_require_238197__(38)

class Result {
  constructor(processor, root, opts) {
    this.processor = processor
    this.messages = []
    this.root = root
    this.opts = opts
    this.css = undefined
    this.map = undefined
  }

  toString() {
    return this.css
  }

  warn(text, opts = {}) {
    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin
      }
    }

    let warning = new Warning(text, opts)
    this.messages.push(warning)

    return warning
  }

  warnings() {
    return this.messages.filter(i => i.type === 'warning')
  }

  get content() {
    return this.css
  }
}

module.exports = Result
Result.default = Result


/***/ }),

/***/ 5644:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_239041__) => {

"use strict";


let Container = __nested_webpack_require_239041__(7793)

let LazyResult, Processor

class Root extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'root'
    if (!this.nodes) this.nodes = []
  }

  normalize(child, sample, type) {
    let nodes = super.normalize(child)

    if (sample) {
      if (type === 'prepend') {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before
        } else {
          delete sample.raws.before
        }
      } else if (this.first !== sample) {
        for (let node of nodes) {
          node.raws.before = sample.raws.before
        }
      }
    }

    return nodes
  }

  removeChild(child, ignore) {
    let index = this.index(child)

    if (!ignore && index === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index].raws.before
    }

    return super.removeChild(child)
  }

  toResult(opts = {}) {
    let lazy = new LazyResult(new Processor(), this, opts)
    return lazy.stringify()
  }
}

Root.registerLazyResult = dependant => {
  LazyResult = dependant
}

Root.registerProcessor = dependant => {
  Processor = dependant
}

module.exports = Root
Root.default = Root

Container.registerRoot(Root)


/***/ }),

/***/ 1534:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_240379__) => {

"use strict";


let Container = __nested_webpack_require_240379__(7793)
let list = __nested_webpack_require_240379__(1752)

class Rule extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'rule'
    if (!this.nodes) this.nodes = []
  }

  get selectors() {
    return list.comma(this.selector)
  }

  set selectors(values) {
    let match = this.selector ? this.selector.match(/,\s*/) : null
    let sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen')
    this.selector = values.join(sep)
  }
}

module.exports = Rule
Rule.default = Rule

Container.registerRule(Rule)


/***/ }),

/***/ 7668:
/***/ ((module) => {

"use strict";


const DEFAULT_RAW = {
  after: '\n',
  beforeClose: '\n',
  beforeComment: '\n',
  beforeDecl: '\n',
  beforeOpen: ' ',
  beforeRule: '\n',
  colon: ': ',
  commentLeft: ' ',
  commentRight: ' ',
  emptyBody: '',
  indent: '    ',
  semicolon: false
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

class Stringifier {
  constructor(builder) {
    this.builder = builder
  }

  atrule(node, semicolon) {
    let name = '@' + node.name
    let params = node.params ? this.rawValue(node, 'params') : ''

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName
    } else if (params) {
      name += ' '
    }

    if (node.nodes) {
      this.block(node, name + params)
    } else {
      let end = (node.raws.between || '') + (semicolon ? ';' : '')
      this.builder(name + params + end, node)
    }
  }

  beforeAfter(node, detect) {
    let value
    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl')
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment')
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule')
    } else {
      value = this.raw(node, null, 'beforeClose')
    }

    let buf = node.parent
    let depth = 0
    while (buf && buf.type !== 'root') {
      depth += 1
      buf = buf.parent
    }

    if (value.includes('\n')) {
      let indent = this.raw(node, null, 'indent')
      if (indent.length) {
        for (let step = 0; step < depth; step++) value += indent
      }
    }

    return value
  }

  block(node, start) {
    let between = this.raw(node, 'between', 'beforeOpen')
    this.builder(start + between + '{', node, 'start')

    let after
    if (node.nodes && node.nodes.length) {
      this.body(node)
      after = this.raw(node, 'after')
    } else {
      after = this.raw(node, 'after', 'emptyBody')
    }

    if (after) this.builder(after)
    this.builder('}', node, 'end')
  }

  body(node) {
    let last = node.nodes.length - 1
    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break
      last -= 1
    }

    let semicolon = this.raw(node, 'semicolon')
    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i]
      let before = this.raw(child, 'before')
      if (before) this.builder(before)
      this.stringify(child, last !== i || semicolon)
    }
  }

  comment(node) {
    let left = this.raw(node, 'left', 'commentLeft')
    let right = this.raw(node, 'right', 'commentRight')
    this.builder('/*' + left + node.text + right + '*/', node)
  }

  decl(node, semicolon) {
    let between = this.raw(node, 'between', 'colon')
    let string = node.prop + between + this.rawValue(node, 'value')

    if (node.important) {
      string += node.raws.important || ' !important'
    }

    if (semicolon) string += ';'
    this.builder(string, node)
  }

  document(node) {
    this.body(node)
  }

  raw(node, own, detect) {
    let value
    if (!detect) detect = own

    // Already had
    if (own) {
      value = node.raws[own]
      if (typeof value !== 'undefined') return value
    }

    let parent = node.parent

    if (detect === 'before') {
      // Hack for first rule in CSS
      if (!parent || (parent.type === 'root' && parent.first === node)) {
        return ''
      }

      // `root` nodes in `document` should use only their own raws
      if (parent && parent.type === 'document') {
        return ''
      }
    }

    // Floating child without parent
    if (!parent) return DEFAULT_RAW[detect]

    // Detect style by other nodes
    let root = node.root()
    if (!root.rawCache) root.rawCache = {}
    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect]
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect)
    } else {
      let method = 'raw' + capitalize(detect)
      if (this[method]) {
        value = this[method](root, node)
      } else {
        root.walk(i => {
          value = i.raws[own]
          if (typeof value !== 'undefined') return false
        })
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect]

    root.rawCache[detect] = value
    return value
  }

  rawBeforeClose(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '')
          }
          return false
        }
      }
    })
    if (value) value = value.replace(/\S/g, '')
    return value
  }

  rawBeforeComment(root, node) {
    let value
    root.walkComments(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '')
        }
        return false
      }
    })
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl')
    } else if (value) {
      value = value.replace(/\S/g, '')
    }
    return value
  }

  rawBeforeDecl(root, node) {
    let value
    root.walkDecls(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '')
        }
        return false
      }
    })
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule')
    } else if (value) {
      value = value.replace(/\S/g, '')
    }
    return value
  }

  rawBeforeOpen(root) {
    let value
    root.walk(i => {
      if (i.type !== 'decl') {
        value = i.raws.between
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawBeforeRule(root) {
    let value
    root.walk(i => {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '')
          }
          return false
        }
      }
    })
    if (value) value = value.replace(/\S/g, '')
    return value
  }

  rawColon(root) {
    let value
    root.walkDecls(i => {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '')
        return false
      }
    })
    return value
  }

  rawEmptyBody(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawIndent(root) {
    if (root.raws.indent) return root.raws.indent
    let value
    root.walk(i => {
      let p = i.parent
      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          let parts = i.raws.before.split('\n')
          value = parts[parts.length - 1]
          value = value.replace(/\S/g, '')
          return false
        }
      }
    })
    return value
  }

  rawSemicolon(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawValue(node, prop) {
    let value = node[prop]
    let raw = node.raws[prop]
    if (raw && raw.value === value) {
      return raw.raw
    }

    return value
  }

  root(node) {
    this.body(node)
    if (node.raws.after) this.builder(node.raws.after)
  }

  rule(node) {
    this.block(node, this.rawValue(node, 'selector'))
    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end')
    }
  }

  stringify(node, semicolon) {
    /* c8 ignore start */
    if (!this[node.type]) {
      throw new Error(
        'Unknown AST node type ' +
          node.type +
          '. ' +
          'Maybe you need to change PostCSS stringifier.'
      )
    }
    /* c8 ignore stop */
    this[node.type](node, semicolon)
  }
}

module.exports = Stringifier
Stringifier.default = Stringifier


/***/ }),

/***/ 3303:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_249324__) => {

"use strict";


let Stringifier = __nested_webpack_require_249324__(7668)

function stringify(node, builder) {
  let str = new Stringifier(builder)
  str.stringify(node)
}

module.exports = stringify
stringify.default = stringify


/***/ }),

/***/ 4151:
/***/ ((module) => {

"use strict";


module.exports.isClean = Symbol('isClean')

module.exports.my = Symbol('my')


/***/ }),

/***/ 5781:
/***/ ((module) => {

"use strict";


const SINGLE_QUOTE = "'".charCodeAt(0)
const DOUBLE_QUOTE = '"'.charCodeAt(0)
const BACKSLASH = '\\'.charCodeAt(0)
const SLASH = '/'.charCodeAt(0)
const NEWLINE = '\n'.charCodeAt(0)
const SPACE = ' '.charCodeAt(0)
const FEED = '\f'.charCodeAt(0)
const TAB = '\t'.charCodeAt(0)
const CR = '\r'.charCodeAt(0)
const OPEN_SQUARE = '['.charCodeAt(0)
const CLOSE_SQUARE = ']'.charCodeAt(0)
const OPEN_PARENTHESES = '('.charCodeAt(0)
const CLOSE_PARENTHESES = ')'.charCodeAt(0)
const OPEN_CURLY = '{'.charCodeAt(0)
const CLOSE_CURLY = '}'.charCodeAt(0)
const SEMICOLON = ';'.charCodeAt(0)
const ASTERISK = '*'.charCodeAt(0)
const COLON = ':'.charCodeAt(0)
const AT = '@'.charCodeAt(0)

const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g
const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g
const RE_BAD_BRACKET = /.[\r\n"'(/\\]/
const RE_HEX_ESCAPE = /[\da-f]/i

module.exports = function tokenizer(input, options = {}) {
  let css = input.css.valueOf()
  let ignore = options.ignoreErrors

  let code, next, quote, content, escape
  let escaped, escapePos, prev, n, currentToken

  let length = css.length
  let pos = 0
  let buffer = []
  let returned = []

  function position() {
    return pos
  }

  function unclosed(what) {
    throw input.error('Unclosed ' + what, pos)
  }

  function endOfFile() {
    return returned.length === 0 && pos >= length
  }

  function nextToken(opts) {
    if (returned.length) return returned.pop()
    if (pos >= length) return

    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false

    code = css.charCodeAt(pos)

    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos
        do {
          next += 1
          code = css.charCodeAt(next)
        } while (
          code === SPACE ||
          code === NEWLINE ||
          code === TAB ||
          code === CR ||
          code === FEED
        )

        currentToken = ['space', css.slice(pos, next)]
        pos = next - 1
        break
      }

      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code)
        currentToken = [controlChar, controlChar, pos]
        break
      }

      case OPEN_PARENTHESES: {
        prev = buffer.length ? buffer.pop()[1] : ''
        n = css.charCodeAt(pos + 1)
        if (
          prev === 'url' &&
          n !== SINGLE_QUOTE &&
          n !== DOUBLE_QUOTE &&
          n !== SPACE &&
          n !== NEWLINE &&
          n !== TAB &&
          n !== FEED &&
          n !== CR
        ) {
          next = pos
          do {
            escaped = false
            next = css.indexOf(')', next + 1)
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos
                break
              } else {
                unclosed('bracket')
              }
            }
            escapePos = next
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1
              escaped = !escaped
            }
          } while (escaped)

          currentToken = ['brackets', css.slice(pos, next + 1), pos, next]

          pos = next
        } else {
          next = css.indexOf(')', pos + 1)
          content = css.slice(pos, next + 1)

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ['(', '(', pos]
          } else {
            currentToken = ['brackets', content, pos, next]
            pos = next
          }
        }

        break
      }

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE: {
        quote = code === SINGLE_QUOTE ? "'" : '"'
        next = pos
        do {
          escaped = false
          next = css.indexOf(quote, next + 1)
          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1
              break
            } else {
              unclosed('string')
            }
          }
          escapePos = next
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1
            escaped = !escaped
          }
        } while (escaped)

        currentToken = ['string', css.slice(pos, next + 1), pos, next]
        pos = next
        break
      }

      case AT: {
        RE_AT_END.lastIndex = pos + 1
        RE_AT_END.test(css)
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1
        } else {
          next = RE_AT_END.lastIndex - 2
        }

        currentToken = ['at-word', css.slice(pos, next + 1), pos, next]

        pos = next
        break
      }

      case BACKSLASH: {
        next = pos
        escape = true
        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1
          escape = !escape
        }
        code = css.charCodeAt(next + 1)
        if (
          escape &&
          code !== SLASH &&
          code !== SPACE &&
          code !== NEWLINE &&
          code !== TAB &&
          code !== CR &&
          code !== FEED
        ) {
          next += 1
          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1
            }
            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1
            }
          }
        }

        currentToken = ['word', css.slice(pos, next + 1), pos, next]

        pos = next
        break
      }

      default: {
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf('*/', pos + 2) + 1
          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length
            } else {
              unclosed('comment')
            }
          }

          currentToken = ['comment', css.slice(pos, next + 1), pos, next]
          pos = next
        } else {
          RE_WORD_END.lastIndex = pos + 1
          RE_WORD_END.test(css)
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1
          } else {
            next = RE_WORD_END.lastIndex - 2
          }

          currentToken = ['word', css.slice(pos, next + 1), pos, next]
          buffer.push(currentToken)
          pos = next
        }

        break
      }
    }

    pos++
    return currentToken
  }

  function back(token) {
    returned.push(token)
  }

  return {
    back,
    endOfFile,
    nextToken,
    position
  }
}


/***/ }),

/***/ 6156:
/***/ ((module) => {

"use strict";
/* eslint-disable no-console */


let printed = {}

module.exports = function warnOnce(message) {
  if (printed[message]) return
  printed[message] = true

  if (typeof console !== 'undefined' && console.warn) {
    console.warn(message)
  }
}


/***/ }),

/***/ 38:
/***/ ((module) => {

"use strict";


class Warning {
  constructor(text, opts = {}) {
    this.type = 'warning'
    this.text = text

    if (opts.node && opts.node.source) {
      let range = opts.node.rangeBy(opts)
      this.line = range.start.line
      this.column = range.start.column
      this.endLine = range.end.line
      this.endColumn = range.end.column
    }

    for (let opt in opts) this[opt] = opts[opt]
  }

  toString() {
    if (this.node) {
      return this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        word: this.word
      }).message
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text
    }

    return this.text
  }
}

module.exports = Warning
Warning.default = Warning


/***/ }),

/***/ 2694:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_257452__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __nested_webpack_require_257452__(6925);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 5556:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_259174__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __nested_webpack_require_259174__(2694)();
}


/***/ }),

/***/ 6925:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 2799:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}__webpack_unused_export__=h;__webpack_unused_export__=g;__webpack_unused_export__=b;__webpack_unused_export__=l;__webpack_unused_export__=d;__webpack_unused_export__=q;__webpack_unused_export__=p;__webpack_unused_export__=c;__webpack_unused_export__=f;__webpack_unused_export__=e;__webpack_unused_export__=m;
__webpack_unused_export__=n;__webpack_unused_export__=function(){return!1};__webpack_unused_export__=function(){return!1};__webpack_unused_export__=function(a){return v(a)===h};__webpack_unused_export__=function(a){return v(a)===g};__webpack_unused_export__=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===b};__webpack_unused_export__=function(a){return v(a)===l};__webpack_unused_export__=function(a){return v(a)===d};__webpack_unused_export__=function(a){return v(a)===q};__webpack_unused_export__=function(a){return v(a)===p};
__webpack_unused_export__=function(a){return v(a)===c};__webpack_unused_export__=function(a){return v(a)===f};__webpack_unused_export__=function(a){return v(a)===e};__webpack_unused_export__=function(a){return v(a)===m};__webpack_unused_export__=function(a){return v(a)===n};
__webpack_unused_export__=function(a){return"string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};__webpack_unused_export__=v;


/***/ }),

/***/ 4363:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_262597__) => {

"use strict";


if (true) {
  /* unused reexport */ __nested_webpack_require_262597__(2799);
} else {}


/***/ }),

/***/ 4643:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_262780__) => {


/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__nested_webpack_require_262780__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __nested_webpack_require_262780__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


/***/ }),

/***/ 9746:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 9977:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 197:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1866:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 2739:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5042:
/***/ ((module) => {

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = ''
    let i = size
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}
let nanoid = (size = 21) => {
  let id = ''
  let i = size
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}
module.exports = { nanoid, customAlphabet }


/***/ }),

/***/ 9817:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"properties":["-epub-caption-side","-epub-hyphens","-epub-text-combine","-epub-text-emphasis","-epub-text-emphasis-color","-epub-text-emphasis-style","-epub-text-orientation","-epub-text-transform","-epub-word-break","-epub-writing-mode","-internal-text-autosizing-status","accelerator","accent-color","-wap-accesskey","additive-symbols","align-content","-webkit-align-content","align-items","-webkit-align-items","align-self","-webkit-align-self","alignment-baseline","all","alt","-webkit-alt","anchor-default","anchor-name","anchor-scroll","animation","animation-composition","animation-delay","-moz-animation-delay","-ms-animation-delay","-webkit-animation-delay","animation-direction","-moz-animation-direction","-ms-animation-direction","-webkit-animation-direction","animation-duration","-moz-animation-duration","-ms-animation-duration","-webkit-animation-duration","animation-fill-mode","-moz-animation-fill-mode","-ms-animation-fill-mode","-webkit-animation-fill-mode","animation-iteration-count","-moz-animation-iteration-count","-ms-animation-iteration-count","-webkit-animation-iteration-count","-moz-animation","-ms-animation","animation-name","-moz-animation-name","-ms-animation-name","-webkit-animation-name","animation-play-state","-moz-animation-play-state","-ms-animation-play-state","-webkit-animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","-moz-animation-timing-function","-ms-animation-timing-function","-webkit-animation-timing-function","-webkit-animation-trigger","-webkit-animation","app-region","-webkit-app-region","appearance","-moz-appearance","-webkit-appearance","ascent-override","aspect-ratio","-webkit-aspect-ratio","audio-level","azimuth","backdrop-filter","-webkit-backdrop-filter","backface-visibility","-moz-backface-visibility","-ms-backface-visibility","-webkit-backface-visibility","background","background-attachment","-webkit-background-attachment","background-blend-mode","background-clip","-moz-background-clip","-webkit-background-clip","background-color","-webkit-background-color","-webkit-background-composite","background-image","-webkit-background-image","-moz-background-inline-policy","background-origin","-moz-background-origin","-webkit-background-origin","background-position","-webkit-background-position","background-position-x","-webkit-background-position-x","background-position-y","-webkit-background-position-y","background-repeat","-webkit-background-repeat","background-repeat-x","background-repeat-y","background-size","-moz-background-size","-webkit-background-size","-webkit-background","base-palette","baseline-shift","baseline-source","behavior","-moz-binding","block-ellipsis","-ms-block-progression","block-size","block-step","block-step-align","block-step-insert","block-step-round","block-step-size","bookmark-label","bookmark-level","bookmark-state","border","-webkit-border-after-color","-webkit-border-after-style","-webkit-border-after","-webkit-border-after-width","-webkit-border-before-color","-webkit-border-before-style","-webkit-border-before","-webkit-border-before-width","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","-moz-border-bottom-colors","border-bottom-left-radius","-webkit-border-bottom-left-radius","border-bottom-right-radius","-webkit-border-bottom-right-radius","border-bottom-style","border-bottom-width","border-boundary","border-collapse","border-color","-moz-border-end-color","-webkit-border-end-color","border-end-end-radius","-moz-border-end","border-end-start-radius","-moz-border-end-style","-webkit-border-end-style","-webkit-border-end","-moz-border-end-width","-webkit-border-end-width","-webkit-border-fit","-webkit-border-horizontal-spacing","border-image","-moz-border-image","-o-border-image","border-image-outset","-webkit-border-image-outset","border-image-repeat","-webkit-border-image-repeat","border-image-slice","-webkit-border-image-slice","border-image-source","-webkit-border-image-source","-webkit-border-image","border-image-width","-webkit-border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","-moz-border-left-colors","border-left-style","border-left-width","border-radius","-moz-border-radius-bottomleft","-moz-border-radius-bottomright","-moz-border-radius","-moz-border-radius-topleft","-moz-border-radius-topright","-webkit-border-radius","border-right","border-right-color","-moz-border-right-colors","border-right-style","border-right-width","border-spacing","-moz-border-start-color","-webkit-border-start-color","border-start-end-radius","-moz-border-start","border-start-start-radius","-moz-border-start-style","-webkit-border-start-style","-webkit-border-start","-moz-border-start-width","-webkit-border-start-width","border-style","border-top","border-top-color","-moz-border-top-colors","border-top-left-radius","-webkit-border-top-left-radius","border-top-right-radius","-webkit-border-top-right-radius","border-top-style","border-top-width","-webkit-border-vertical-spacing","border-width","bottom","-moz-box-align","-webkit-box-align","box-decoration-break","-webkit-box-decoration-break","-moz-box-direction","-webkit-box-direction","-webkit-box-flex-group","-moz-box-flex","-webkit-box-flex","-webkit-box-lines","-moz-box-ordinal-group","-webkit-box-ordinal-group","-moz-box-orient","-webkit-box-orient","-moz-box-pack","-webkit-box-pack","-webkit-box-reflect","box-shadow","-moz-box-shadow","-webkit-box-shadow","box-sizing","-moz-box-sizing","-webkit-box-sizing","box-snap","break-after","break-before","break-inside","buffered-rendering","caption-side","caret","caret-animation","caret-color","caret-shape","chains","clear","clip","clip-path","-webkit-clip-path","clip-rule","color","color-adjust","-webkit-color-correction","-apple-color-filter","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","-webkit-column-axis","-webkit-column-break-after","-webkit-column-break-before","-webkit-column-break-inside","column-count","-moz-column-count","-webkit-column-count","column-fill","-moz-column-fill","-webkit-column-fill","column-gap","-moz-column-gap","-webkit-column-gap","column-progression","-webkit-column-progression","column-rule","column-rule-color","-moz-column-rule-color","-webkit-column-rule-color","-moz-column-rule","column-rule-style","-moz-column-rule-style","-webkit-column-rule-style","-webkit-column-rule","column-rule-width","-moz-column-rule-width","-webkit-column-rule-width","column-span","-moz-column-span","-webkit-column-span","column-width","-moz-column-width","-webkit-column-width","columns","-moz-columns","-webkit-columns","-webkit-composition-fill-color","-webkit-composition-frame-color","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","-ms-content-zoom-chaining","-ms-content-zoom-limit-max","-ms-content-zoom-limit-min","-ms-content-zoom-limit","-ms-content-zoom-snap","-ms-content-zoom-snap-points","-ms-content-zoom-snap-type","-ms-content-zooming","continue","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","-webkit-cursor-visibility","cx","cy","d","-apple-dashboard-region","-webkit-dashboard-region","descent-override","direction","display","display-align","dominant-baseline","elevation","empty-cells","enable-background","epub-caption-side","epub-hyphens","epub-text-combine","epub-text-emphasis","epub-text-emphasis-color","epub-text-emphasis-style","epub-text-orientation","epub-text-transform","epub-word-break","epub-writing-mode","fallback","field-sizing","fill","fill-break","fill-color","fill-image","fill-opacity","fill-origin","fill-position","fill-repeat","fill-rule","fill-size","filter","-ms-filter","-webkit-filter","flex","-ms-flex-align","-webkit-flex-align","flex-basis","-webkit-flex-basis","flex-direction","-ms-flex-direction","-webkit-flex-direction","flex-flow","-ms-flex-flow","-webkit-flex-flow","flex-grow","-webkit-flex-grow","-ms-flex-item-align","-webkit-flex-item-align","-ms-flex-line-pack","-webkit-flex-line-pack","-ms-flex","-ms-flex-negative","-ms-flex-order","-webkit-flex-order","-ms-flex-pack","-webkit-flex-pack","-ms-flex-positive","-ms-flex-preferred-size","flex-shrink","-webkit-flex-shrink","-webkit-flex","flex-wrap","-ms-flex-wrap","-webkit-flex-wrap","float","float-defer","-moz-float-edge","float-offset","float-reference","flood-color","flood-opacity","flow","flow-from","-ms-flow-from","-webkit-flow-from","flow-into","-ms-flow-into","-webkit-flow-into","font","font-display","font-family","font-feature-settings","-moz-font-feature-settings","-ms-font-feature-settings","-webkit-font-feature-settings","font-kerning","-webkit-font-kerning","font-language-override","-moz-font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","-webkit-font-size-delta","-webkit-font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","-webkit-font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","font-width","footnote-display","footnote-policy","-moz-force-broken-image-icon","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","-webkit-grid-after","grid-area","grid-auto-columns","-webkit-grid-auto-columns","grid-auto-flow","-webkit-grid-auto-flow","grid-auto-rows","-webkit-grid-auto-rows","-webkit-grid-before","grid-column","-ms-grid-column-align","grid-column-end","grid-column-gap","-ms-grid-column","-ms-grid-column-span","grid-column-start","-webkit-grid-column","-ms-grid-columns","-webkit-grid-columns","-webkit-grid-end","grid-gap","grid-row","-ms-grid-row-align","grid-row-end","grid-row-gap","-ms-grid-row","-ms-grid-row-span","grid-row-start","-webkit-grid-row","-ms-grid-rows","-webkit-grid-rows","-webkit-grid-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","-ms-high-contrast-adjust","-webkit-highlight","hyphenate-character","-webkit-hyphenate-character","-webkit-hyphenate-limit-after","-webkit-hyphenate-limit-before","hyphenate-limit-chars","-ms-hyphenate-limit-chars","hyphenate-limit-last","hyphenate-limit-lines","-ms-hyphenate-limit-lines","-webkit-hyphenate-limit-lines","hyphenate-limit-zone","-ms-hyphenate-limit-zone","hyphens","-moz-hyphens","-ms-hyphens","-webkit-hyphens","image-orientation","-moz-image-region","image-rendering","image-resolution","-ms-ime-align","ime-mode","inherits","initial-letter","initial-letter-align","-webkit-initial-letter","initial-letter-wrap","initial-value","inline-size","inline-sizing","input-format","-wap-input-format","-wap-input-required","input-security","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","-ms-interpolation-mode","isolation","justify-content","-webkit-justify-content","justify-items","-webkit-justify-items","justify-self","-webkit-justify-self","kerning","layout-flow","layout-grid","layout-grid-char","layout-grid-line","layout-grid-mode","layout-grid-type","left","letter-spacing","lighting-color","-webkit-line-align","-webkit-line-box-contain","line-break","-webkit-line-break","line-clamp","-webkit-line-clamp","line-gap-override","line-grid","-webkit-line-grid-snap","-webkit-line-grid","line-height","line-height-step","line-increment","line-padding","line-snap","-webkit-line-snap","-o-link","-o-link-source","list-style","list-style-image","list-style-position","list-style-type","-webkit-locale","-webkit-logical-height","-webkit-logical-width","margin","-webkit-margin-after-collapse","-webkit-margin-after","-webkit-margin-before-collapse","-webkit-margin-before","margin-block","margin-block-end","margin-block-start","margin-bottom","-webkit-margin-bottom-collapse","margin-break","-webkit-margin-collapse","-moz-margin-end","-webkit-margin-end","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","-moz-margin-start","-webkit-margin-start","margin-top","-webkit-margin-top-collapse","margin-trim","marker","marker-end","marker-knockout-left","marker-knockout-right","marker-mid","marker-offset","marker-pattern","marker-segment","marker-side","marker-start","marks","-wap-marquee-dir","-webkit-marquee-direction","-webkit-marquee-increment","-wap-marquee-loop","-webkit-marquee-repetition","-wap-marquee-speed","-webkit-marquee-speed","-wap-marquee-style","-webkit-marquee-style","-webkit-marquee","mask","-webkit-mask-attachment","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","-webkit-mask-box-image-outset","-webkit-mask-box-image-repeat","-webkit-mask-box-image-slice","-webkit-mask-box-image-source","-webkit-mask-box-image","-webkit-mask-box-image-width","mask-clip","-webkit-mask-clip","mask-composite","-webkit-mask-composite","mask-image","-webkit-mask-image","mask-mode","mask-origin","-webkit-mask-origin","mask-position","-webkit-mask-position","mask-position-x","-webkit-mask-position-x","mask-position-y","-webkit-mask-position-y","mask-repeat","-webkit-mask-repeat","-webkit-mask-repeat-x","-webkit-mask-repeat-y","mask-size","-webkit-mask-size","mask-source-type","-webkit-mask-source-type","mask-type","-webkit-mask","-webkit-match-nearest-mail-blockquote-color","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-lines","-webkit-max-logical-height","-webkit-max-logical-width","max-width","max-zoom","min-block-size","min-height","min-inline-size","min-intrinsic-sizing","-webkit-min-logical-height","-webkit-min-logical-width","min-width","min-zoom","mix-blend-mode","motion","motion-offset","motion-path","motion-rotation","nav-down","nav-index","nav-left","nav-right","nav-up","-webkit-nbsp-mode","negative","object-fit","-o-object-fit","object-position","-o-object-position","object-view-box","offset","offset-anchor","offset-block-end","offset-block-start","offset-distance","offset-inline-end","offset-inline-start","offset-path","offset-position","offset-rotate","offset-rotation","opacity","-moz-opacity","-webkit-opacity","order","-webkit-order","-moz-orient","orientation","orphans","-moz-osx-font-smoothing","outline","outline-color","-moz-outline-color","-moz-outline","outline-offset","-moz-outline-offset","-moz-outline-radius-bottomleft","-moz-outline-radius-bottomright","-moz-outline-radius","-moz-outline-radius-topleft","-moz-outline-radius-topright","outline-style","-moz-outline-style","outline-width","-moz-outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-clip-margin-block","overflow-clip-margin-block-end","overflow-clip-margin-block-start","overflow-clip-margin-bottom","overflow-clip-margin-inline","overflow-clip-margin-inline-end","overflow-clip-margin-inline-start","overflow-clip-margin-left","overflow-clip-margin-right","overflow-clip-margin-top","overflow-inline","-webkit-overflow-scrolling","-ms-overflow-style","overflow-wrap","overflow-x","overflow-y","overlay","override-colors","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","pad","padding","-webkit-padding-after","-webkit-padding-before","padding-block","padding-block-end","padding-block-start","padding-bottom","-moz-padding-end","-webkit-padding-end","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","-moz-padding-start","-webkit-padding-start","padding-top","page","page-break-after","page-break-before","page-break-inside","page-orientation","paint-order","pause","pause-after","pause-before","-apple-pay-button-style","-apple-pay-button-type","pen-action","perspective","-moz-perspective","-ms-perspective","perspective-origin","-moz-perspective-origin","-ms-perspective-origin","-webkit-perspective-origin","perspective-origin-x","-webkit-perspective-origin-x","perspective-origin-y","-webkit-perspective-origin-y","-webkit-perspective","pitch","pitch-range","place-content","place-items","place-self","play-during","pointer-events","position","position-animation","position-fallback","position-fallback-bounds","position-try","position-try-options","position-try-order","prefix","print-color-adjust","-webkit-print-color-adjust","property-name","quotes","r","range","-webkit-region-break-after","-webkit-region-break-before","-webkit-region-break-inside","region-fragment","-webkit-region-fragment","-webkit-region-overflow","resize","rest","rest-after","rest-before","richness","right","rotate","row-gap","-webkit-rtl-ordering","ruby-align","ruby-merge","ruby-overhang","ruby-position","-webkit-ruby-position","running","rx","ry","scale","scroll-behavior","-ms-scroll-chaining","-ms-scroll-limit","-ms-scroll-limit-x-max","-ms-scroll-limit-x-min","-ms-scroll-limit-y-max","-ms-scroll-limit-y-min","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","-ms-scroll-rails","scroll-snap-align","scroll-snap-coordinate","-webkit-scroll-snap-coordinate","scroll-snap-destination","-webkit-scroll-snap-destination","scroll-snap-margin","scroll-snap-margin-bottom","scroll-snap-margin-left","scroll-snap-margin-right","scroll-snap-margin-top","scroll-snap-points-x","-ms-scroll-snap-points-x","-webkit-scroll-snap-points-x","scroll-snap-points-y","-ms-scroll-snap-points-y","-webkit-scroll-snap-points-y","scroll-snap-stop","scroll-snap-type","-ms-scroll-snap-type","-webkit-scroll-snap-type","scroll-snap-type-x","scroll-snap-type-y","-ms-scroll-snap-x","-ms-scroll-snap-y","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","-ms-scroll-translation","scrollbar-arrow-color","scrollbar-base-color","scrollbar-color","scrollbar-dark-shadow-color","scrollbar-darkshadow-color","scrollbar-face-color","scrollbar-gutter","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-track-color","scrollbar-width","scrollbar3d-light-color","scrollbar3dlight-color","shape-image-threshold","-webkit-shape-image-threshold","shape-inside","-webkit-shape-inside","shape-margin","-webkit-shape-margin","shape-outside","-webkit-shape-outside","-webkit-shape-padding","shape-rendering","size","size-adjust","snap-height","solid-color","solid-opacity","spatial-navigation-action","spatial-navigation-contain","spatial-navigation-function","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","src","-moz-stack-sizing","stop-color","stop-opacity","stress","string-set","stroke","stroke-align","stroke-alignment","stroke-break","stroke-color","stroke-dash-corner","stroke-dash-justify","stroke-dashadjust","stroke-dasharray","stroke-dashcorner","stroke-dashoffset","stroke-image","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-origin","stroke-position","stroke-repeat","stroke-size","stroke-width","suffix","supported-color-schemes","-webkit-svg-shadow","symbols","syntax","system","tab-size","-moz-tab-size","-o-tab-size","-o-table-baseline","table-layout","-webkit-tap-highlight-color","text-align","text-align-all","text-align-last","-moz-text-align-last","text-anchor","text-autospace","-moz-text-blink","text-box-edge","text-box-trim","-ms-text-combine-horizontal","text-combine-upright","-webkit-text-combine","text-decoration","text-decoration-blink","text-decoration-color","-moz-text-decoration-color","-webkit-text-decoration-color","text-decoration-line","-moz-text-decoration-line","text-decoration-line-through","-webkit-text-decoration-line","text-decoration-none","text-decoration-overline","text-decoration-skip","text-decoration-skip-box","text-decoration-skip-ink","text-decoration-skip-inset","text-decoration-skip-self","text-decoration-skip-spaces","-webkit-text-decoration-skip","text-decoration-style","-moz-text-decoration-style","-webkit-text-decoration-style","text-decoration-thickness","text-decoration-trim","text-decoration-underline","-webkit-text-decoration","-webkit-text-decorations-in-effect","text-emphasis","text-emphasis-color","-webkit-text-emphasis-color","text-emphasis-position","-webkit-text-emphasis-position","text-emphasis-skip","text-emphasis-style","-webkit-text-emphasis-style","-webkit-text-emphasis","-webkit-text-fill-color","text-group-align","text-indent","text-justify","text-justify-trim","text-kashida","text-kashida-space","text-line-through","text-line-through-color","text-line-through-mode","text-line-through-style","text-line-through-width","text-orientation","-webkit-text-orientation","text-overflow","text-overline","text-overline-color","text-overline-mode","text-overline-style","text-overline-width","text-rendering","-webkit-text-security","text-shadow","text-size-adjust","-moz-text-size-adjust","-ms-text-size-adjust","-webkit-text-size-adjust","text-spacing","text-spacing-trim","-webkit-text-stroke-color","-webkit-text-stroke","-webkit-text-stroke-width","text-transform","text-underline","text-underline-color","text-underline-mode","text-underline-offset","text-underline-position","-webkit-text-underline-position","text-underline-style","text-underline-width","text-wrap","text-wrap-mode","text-wrap-style","-webkit-text-zoom","timeline-scope","top","touch-action","touch-action-delay","-ms-touch-action","-webkit-touch-callout","-ms-touch-select","-apple-trailing-word","transform","transform-box","-moz-transform","-ms-transform","-o-transform","transform-origin","-moz-transform-origin","-ms-transform-origin","-o-transform-origin","-webkit-transform-origin","transform-origin-x","-webkit-transform-origin-x","transform-origin-y","-webkit-transform-origin-y","transform-origin-z","-webkit-transform-origin-z","transform-style","-moz-transform-style","-ms-transform-style","-webkit-transform-style","-webkit-transform","transition","transition-behavior","transition-delay","-moz-transition-delay","-ms-transition-delay","-o-transition-delay","-webkit-transition-delay","transition-duration","-moz-transition-duration","-ms-transition-duration","-o-transition-duration","-webkit-transition-duration","-moz-transition","-ms-transition","-o-transition","transition-property","-moz-transition-property","-ms-transition-property","-o-transition-property","-webkit-transition-property","transition-timing-function","-moz-transition-timing-function","-ms-transition-timing-function","-o-transition-timing-function","-webkit-transition-timing-function","-webkit-transition","translate","uc-alt-skin","uc-skin","unicode-bidi","unicode-range","-webkit-user-drag","-moz-user-focus","-moz-user-input","-moz-user-modify","-webkit-user-modify","user-select","-moz-user-select","-ms-user-select","-webkit-user-select","user-zoom","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","viewport-fill","viewport-fill-opacity","viewport-fit","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","white-space-collapse","white-space-trim","-webkit-widget-region","widows","width","will-change","-moz-window-dragging","-moz-window-shadow","word-break","word-space-transform","word-spacing","word-wrap","wrap-after","wrap-before","wrap-flow","-ms-wrap-flow","-webkit-wrap-flow","wrap-inside","-ms-wrap-margin","-webkit-wrap-margin","-webkit-wrap-padding","-webkit-wrap-shape-inside","-webkit-wrap-shape-outside","wrap-through","-ms-wrap-through","-webkit-wrap-through","-webkit-wrap","writing-mode","-webkit-writing-mode","x","y","z-index","zoom"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_290554__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_290554__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_290554__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_290554__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_290554__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_290554__.o(definition, key) && !__nested_webpack_require_290554__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__nested_webpack_require_290554__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_290554__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_290554__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nested_webpack_require_290554__.r(__nested_webpack_exports__);

// EXPORTS
__nested_webpack_require_290554__.d(__nested_webpack_exports__, {
  ActiveSelectors: () => (/* reexport */ ActiveSelectors),
  AtRules: () => (/* reexport */ AtRules),
  BackgroundControl: () => (/* reexport */ BackgroundControl),
  BoxShadowControl: () => (/* reexport */ BoxShadowControl),
  BuildAtRule: () => (/* reexport */ BuildAtRule),
  BuildSelector: () => (/* reexport */ BuildSelector),
  ButtonIconControl: () => (/* reexport */ ButtonIconControl),
  Control: () => (/* reexport */ Control),
  CustomSelect: () => (/* reexport */ CustomSelect),
  DimensionsControl: () => (/* reexport */ DimensionsControl),
  EffectControl: () => (/* reexport */ EffectControl),
  EffectEdit: () => (/* reexport */ EffectEdit),
  EffectList: () => (/* reexport */ EffectList),
  FilterControl: () => (/* reexport */ FilterControl),
  ImageControl: () => (/* reexport */ ImageControl),
  Selector: () => (/* reexport */ Selector),
  StylesBuilder: () => (/* reexport */ StylesBuilder),
  TransformControl: () => (/* reexport */ TransformControl),
  TransitionControl: () => (/* reexport */ TransitionControl),
  UnitControl: () => (/* reexport */ UnitControl),
  atRuleActions: () => (/* reexport */ at_rule_actions),
  atRuleReducer: () => (/* reexport */ at_rule_reducer),
  atRuleSelectors: () => (/* reexport */ at_rule_selectors),
  cleanStylesObject: () => (/* reexport */ cleanStylesObject),
  currentStyleActions: () => (/* reexport */ current_style_actions),
  currentStyleReducer: () => (/* reexport */ current_style_reducer),
  currentStyleSelectors: () => (/* reexport */ current_style_selectors),
  defaultAtRules: () => (/* reexport */ defaultAtRules),
  filterActions: () => (/* reexport */ filters_actions),
  filterReducer: () => (/* reexport */ filters_reducer),
  filterSelectors: () => (/* reexport */ filters_selectors),
  getCss: () => (/* reexport */ getCss),
  getElementStyles: () => (/* reexport */ getElementStyles),
  nestedRuleActions: () => (/* reexport */ nested_rule_actions),
  nestedRuleReducer: () => (/* reexport */ nested_rule_reducer),
  nestedRuleSelectors: () => (/* reexport */ nested_rule_selectors),
  styleActions: () => (/* reexport */ actions),
  styleReducer: () => (/* reexport */ reducer),
  styleSelectors: () => (/* reexport */ selectors),
  usePanelSections: () => (/* reexport */ usePanelSections),
  useSelectedBlockElement: () => (/* reexport */ useSelectedBlockElement),
  useSelectedBlockElements: () => (/* reexport */ useSelectedBlockElements)
});

;// CONCATENATED MODULE: external "React"
const external_React_namespaceObject = window["React"];
var external_React_default = /*#__PURE__*/__nested_webpack_require_290554__.n(external_React_namespaceObject);
;// CONCATENATED MODULE: external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// CONCATENATED MODULE: external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// CONCATENATED MODULE: external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// CONCATENATED MODULE: external ["wp","primitives"]
const external_wp_primitives_namespaceObject = window["wp"]["primitives"];
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/more-vertical.js

/**
 * WordPress dependencies
 */

const moreVertical = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
}));
/* harmony default export */ const more_vertical = (moreVertical);
//# sourceMappingURL=more-vertical.js.map
;// CONCATENATED MODULE: ./src/components/StylesBuilder/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const editor_module = ({"component":"x6M6VsXk0AT2pEMU0NJj","label":"Oq3jpW_AYjy6wgH2wSY1","list":"I6_3yRXw7Mz9NY4lHZxw","options":"Lmx9goGqn93uK5h0sNbu","buildSelector":"ea0ZEG30ZixHrWuPlsvw","item":"o_cV5J7iAi6GRKHplJOb","dot":"B_mDRN5Vnqkv2ssj7V6g","selector":"wc1UkmH4LsBI1NNLnKOy","build":"IHf2eld47hzFERmUvTZ2","errors":"kY6XghCFNaCJAXTTkDUx","selectors":"whmVeyPQHOEshVh8DOlg","actions":"HFQU6k6HF_jPXvvIfc9A","name":"YKw1DRQlh9reGO97gl_n","notice":"PXfIYFE9zQQNjEkf82Bt","button":"slZkQEVdHfbQWyi7wuwW","more":"Rvqt87skrcdjHnCGKpSB","shortcuts":"n_aN6EGpCkYS3YKiAmGq","icon":"dOWjbKhUk9scttptIaBj","delete":"HDiZMARI6t20yrMXHSNS","atRules":"eXjSol7OB3Xs3T0VODvc","preview":"ttM7fB8TtTQIuoqGeyNt","filters":"oIGGOHhmeojgqpwbIJa0","filtersPopover":"L_S8v8l6Wk4k7UrfyWM9","filtersDropdown":"c5_TSmflyai9dPLKhtDg","search":"YMMRtsh5V2u0F7okMENA","atRuleFilters":"XoCtszmLxB5Fun_AK2Us"});
;// CONCATENATED MODULE: ./src/components/StylesBuilder/ActiveSelectors.jsx






function activeSelectorLabel(value, selectorShortcuts) {
  for (const category in selectorShortcuts) {
    const items = selectorShortcuts[category].items;
    const foundItem = items.find(item => item.value === value);
    if (foundItem) {
      return foundItem.label;
    }
  }
  return value.replace('&', '');
}
function ActiveSelectors({
  activeSelectors,
  nestedRule,
  onNestedRuleChange,
  setShowSelectorOptions,
  setShowBuildSelector,
  setEditSelector,
  onDeleteStyle,
  allStyles,
  selectorShortcuts,
  currentSelector,
  allowCustomAdvancedSelector
}) {
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  function getNestedSelectorPreview(nestedSelector) {
    if (!nestedSelector) {
      return '';
    }
    const selector = nestedSelector.startsWith('&') ? nestedSelector.replace('&', '') : String.fromCharCode(160) + nestedSelector;
    return selector;
  }
  function StylesIndicator({
    selector
  }) {
    if (selector && !allStyles[selector]) {
      return null;
    }
    if (!selector) {
      const hasMainSelectorStyles = Object.values(allStyles).some(value => typeof value !== 'object' || value === null);
      if (!hasMainSelectorStyles) {
        return null;
      }
    }
    return (0,external_React_namespaceObject.createElement)("span", {
      title: (0,external_wp_i18n_namespaceObject.__)('Custom styles exist for this selector', 'generateblocks-pro'),
      className: editor_module.dot
    });
  }
  function SelectorName({
    currentSelectorName
  }) {
    return (0,external_React_namespaceObject.createElement)("span", {
      style: {
        fontFamily: 'monospace'
      }
    }, currentSelectorName);
  }
  return (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.options
  }, !!activeSelectors.length && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    label: (0,external_wp_i18n_namespaceObject.__)('Selectors', 'generateblocks-pro'),
    id: ""
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.list
  }, (0,external_React_namespaceObject.createElement)("span", {
    className: editor_module.item
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    size: "small",
    onClick: () => {
      onNestedRuleChange('');
      setShowSelectorOptions(false);
    },
    isPressed: !nestedRule,
    title: currentSelector
  }, (0,external_wp_i18n_namespaceObject.__)('Main Selector', 'generateblocks-pro'), (0,external_React_namespaceObject.createElement)(StylesIndicator, {
    selector: ''
  }))), activeSelectors.map(activeSelector => (0,external_React_namespaceObject.createElement)("span", {
    key: activeSelector,
    className: editor_module.item
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    size: "small",
    onClick: () => {
      const value = activeSelector === nestedRule ? '' : activeSelector;
      onNestedRuleChange(value);
      setShowSelectorOptions(false);
    },
    isPressed: activeSelector === nestedRule,
    title: currentSelector + getNestedSelectorPreview(activeSelector)
  }, activeSelectorLabel(activeSelector, selectorShortcuts), (0,external_React_namespaceObject.createElement)(StylesIndicator, {
    selector: activeSelector
  })), !!allowCustomAdvancedSelector && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    icon: more_vertical,
    label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro'),
    toggleProps: {
      isPressed: activeSelector === nestedRule
    }
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, !confirmDelete ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      setShowBuildSelector(true);
      setEditSelector(activeSelector);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Edit selector', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      setConfirmDelete(true);
    },
    disabled: !allStyles[activeSelector],
    title: !allStyles[activeSelector] ? (0,external_wp_i18n_namespaceObject.__)('No styles to be deleted.', 'generateblocks-pro') : ''
  }, (0,external_wp_i18n_namespaceObject.__)('Delete selector', 'generateblocks-pro'))) : (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.delete
  }, (0,external_React_namespaceObject.createElement)("p", null, (0,external_wp_element_namespaceObject.createInterpolateElement)(
  // Translators: the at-rule for deletion.
  (0,external_wp_i18n_namespaceObject.__)('This will delete the <SelectorName /> selector and its styles. This operation cannot be undone.', 'generateblocks-pro'), {
    SelectorName: (0,external_React_namespaceObject.createElement)(SelectorName, {
      currentSelectorName: activeSelector
    })
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "secondary",
    size: "compact",
    onClick: () => {
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    isDestructive: true,
    variant: "secondary",
    size: "compact",
    onClick: () => {
      onDeleteStyle(activeSelector);
      if (nestedRule === activeSelector) {
        onNestedRuleChange('');
      }
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Confirm', 'generateblocks-pro'))))))))))));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/settings.js

/**
 * WordPress dependencies
 */

const settings = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z"
}), (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z"
}));
/* harmony default export */ const library_settings = (settings);
//# sourceMappingURL=settings.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/plus.js

/**
 * WordPress dependencies
 */

const plus = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
}));
/* harmony default export */ const library_plus = (plus);
//# sourceMappingURL=plus.js.map
;// CONCATENATED MODULE: ./src/components/StylesBuilder/ActiveAtRules.jsx






function activeAtRuleLabel(value, defaultAtRules) {
  var _defaultAtRules$find$;
  return (_defaultAtRules$find$ = defaultAtRules.find(item => item.value === value)?.label) !== null && _defaultAtRules$find$ !== void 0 ? _defaultAtRules$find$ : value;
}
function ActiveAtRules({
  nestedRule,
  onAtRuleChange,
  onNestedRuleChange,
  atRule,
  setShowAtRuleOptions,
  setShowBuildAtRule,
  setEditAtRule,
  onDeleteStyle,
  allStyles,
  currentSelector,
  activeAtRules,
  defaultAtRules,
  allowCustomAtRule
}) {
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  function StylesIndicator({
    selector = '',
    atRuleValue = ' '
  }) {
    var _allStyles$selector$a, _allStyles$atRuleValu;
    const currentStyles = selector ? (_allStyles$selector$a = allStyles?.[selector]?.[atRuleValue]) !== null && _allStyles$selector$a !== void 0 ? _allStyles$selector$a : {} : (_allStyles$atRuleValu = allStyles?.[atRuleValue]) !== null && _allStyles$atRuleValu !== void 0 ? _allStyles$atRuleValu : {};
    if (!Object.keys(currentStyles).length) {
      return null;
    }
    return (0,external_React_namespaceObject.createElement)("span", {
      title: (0,external_wp_i18n_namespaceObject.__)('Custom styles exist for this at rule', 'generateblocks-pro'),
      className: editor_module.indicator
    });
  }
  const getCurrentStyles = (0,external_wp_element_namespaceObject.useCallback)(rule => {
    if (nestedRule) {
      return allStyles?.[nestedRule]?.[rule];
    }
    return allStyles?.[rule];
  }, [allStyles]);
  function AtRuleName({
    currentAtRule
  }) {
    return (0,external_React_namespaceObject.createElement)("span", {
      style: {
        fontFamily: 'monospace'
      }
    }, currentAtRule);
  }
  return (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.options
  }, !!activeAtRules.length && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    label: (0,external_wp_i18n_namespaceObject.__)('At-Rules', 'generateblocks-pro'),
    id: ""
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.list
  }, (0,external_React_namespaceObject.createElement)("span", {
    className: editor_module.item
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    size: "small",
    onClick: () => {
      onAtRuleChange('');
      setShowAtRuleOptions(false);
    },
    isPressed: !atRule,
    title: currentSelector
  }, (0,external_wp_i18n_namespaceObject.__)('All devices', 'generateblocks-pro'), (0,external_React_namespaceObject.createElement)(StylesIndicator, null))), activeAtRules.map(activeAtRule => (0,external_React_namespaceObject.createElement)("span", {
    key: nestedRule + activeAtRule,
    className: editor_module.item
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    size: "small",
    onClick: () => {
      const value = activeAtRule === atRule ? '' : activeAtRule;
      onNestedRuleChange(nestedRule);
      onAtRuleChange(value);
      setShowAtRuleOptions(false);
    },
    isPressed: activeAtRule === atRule,
    title: activeAtRule !== activeAtRuleLabel(activeAtRule, defaultAtRules) ? activeAtRule : ''
  }, activeAtRuleLabel(activeAtRule, defaultAtRules), (0,external_React_namespaceObject.createElement)(StylesIndicator, {
    selector: nestedRule,
    atRuleValue: activeAtRule
  })), !!allowCustomAtRule && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    icon: more_vertical,
    label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro'),
    toggleProps: {
      isPressed: activeAtRule === atRule
    }
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, !confirmDelete ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      setShowBuildAtRule(true);
      setEditAtRule(activeAtRule);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Edit at-rule', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      setConfirmDelete(true);
    },
    disabled: !getCurrentStyles(activeAtRule),
    title: !getCurrentStyles(activeAtRule) ? (0,external_wp_i18n_namespaceObject.__)('No styles to be deleted.', 'generateblocks-pro') : ''
  }, (0,external_wp_i18n_namespaceObject.__)('Delete at-rule', 'generateblocks-pro'))) : (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.delete
  }, (0,external_React_namespaceObject.createElement)("p", null, (0,external_wp_element_namespaceObject.createInterpolateElement)(
  // Translators: the at-rule for deletion.
  (0,external_wp_i18n_namespaceObject.__)('This will delete the <AtRuleName /> at-rule and its styles. This operation cannot be undone.', 'generateblocks-pro'), {
    AtRuleName: (0,external_React_namespaceObject.createElement)(AtRuleName, {
      currentAtRule: activeAtRule
    })
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "secondary",
    size: "compact",
    onClick: () => {
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    isDestructive: true,
    variant: "secondary",
    size: "compact",
    onClick: () => {
      const objectToTarget = nestedRule ? allStyles?.[nestedRule] : {};
      onDeleteStyle(activeAtRule, objectToTarget);
      if (atRule === activeAtRule) {
        onAtRuleChange('');
      }
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Confirm', 'generateblocks-pro'))))))))))));
}
;// CONCATENATED MODULE: external ["wp","hooks"]
const external_wp_hooks_namespaceObject = window["wp"]["hooks"];
;// CONCATENATED MODULE: external ["wp","blockEditor"]
const external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
// EXTERNAL MODULE: ./node_modules/postcss/lib/postcss.js
var postcss = __nested_webpack_require_290554__(2895);
;// CONCATENATED MODULE: ./node_modules/postcss/lib/postcss.mjs


/* harmony default export */ const lib_postcss = (postcss);

const stringify = postcss.stringify
const fromJSON = postcss.fromJSON
const postcss_plugin = postcss.plugin
const parse = postcss.parse
const list = postcss.list

const postcss_document = postcss.document
const comment = postcss.comment
const atRule = postcss.atRule
const rule = postcss.rule
const decl = postcss.decl
const root = postcss.root

const CssSyntaxError = postcss.CssSyntaxError
const Declaration = postcss.Declaration
const Container = postcss.Container
const Processor = postcss.Processor
const Document = postcss.Document
const Comment = postcss.Comment
const Warning = postcss.Warning
const AtRule = postcss.AtRule
const Result = postcss.Result
const Input = postcss.Input
const Rule = postcss.Rule
const Root = postcss.Root
const Node = postcss.Node

// EXTERNAL MODULE: ./node_modules/postcss-discard-empty/src/index.js
var src = __nested_webpack_require_290554__(3268);
var src_default = /*#__PURE__*/__nested_webpack_require_290554__.n(src);
// EXTERNAL MODULE: ./node_modules/postcss-minify/index.js
var postcss_minify = __nested_webpack_require_290554__(691);
var postcss_minify_default = /*#__PURE__*/__nested_webpack_require_290554__.n(postcss_minify);
;// CONCATENATED MODULE: ./src/postcss/mergeLonghand.js
function buildBorderString(declarations) {
  let width = '';
  let style = '';
  let color = '';
  declarations.forEach(decl => {
    const {
      prop,
      value
    } = decl;
    if (prop.includes('width')) {
      width = value;
    } else if (prop.includes('style')) {
      style = value;
    } else if (prop.includes('color')) {
      color = value;
    }
  });
  if (!width || !style || !color) {
    return '';
  }
  return `${width} ${style} ${color}`;
}
function buildBorderRadiusString(declarations) {
  let topLeft = '';
  let topRight = '';
  let bottomRight = '';
  let bottomLeft = '';
  declarations.forEach(decl => {
    const {
      prop,
      value
    } = decl;
    if (prop.includes('top-left')) {
      topLeft = value;
    } else if (prop.includes('top-right')) {
      topRight = value;
    } else if (prop.includes('bottom-right')) {
      bottomRight = value;
    } else if (prop.includes('bottom-left')) {
      bottomLeft = value;
    }
  });
  if (!topLeft || !topRight || !bottomRight || !bottomLeft) {
    return '';
  }
  if (topLeft === bottomRight && topRight === bottomLeft) {
    if (topLeft === topRight) {
      return topLeft;
    }
    return `${topLeft} ${topRight}`;
  }
  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
}
function buildSpacingString(declarations) {
  let top = '';
  let right = '';
  let bottom = '';
  let left = '';
  declarations.forEach(decl => {
    const {
      prop,
      value
    } = decl;
    if (prop.includes('top')) {
      top = value;
    } else if (prop.includes('right')) {
      right = value;
    } else if (prop.includes('bottom')) {
      bottom = value;
    } else if (prop.includes('left')) {
      left = value;
    }
  });

  // If any side is empty, don't attempt to optimize
  if ([top, right, bottom, left].some(side => '' === side)) {
    return '';
  }
  if (top === bottom && right === left) {
    if (top === right) {
      return top;
    }
    return `${top} ${right}`;
  }
  return `${top} ${right} ${bottom} ${left}`;
}
function mergeLonghand() {
  return {
    postcssPlugin: 'gb-merge-longhand',
    OnceExit(css) {
      css.walkRules(rule => {
        const border = rule.nodes.filter(node => node.prop && node.prop.startsWith('border-') && !node.prop.includes('radius'));
        const borderRadius = rule.nodes.filter(node => node.prop && node.prop.startsWith('border-') && node.prop.includes('radius'));
        const margin = rule.nodes.filter(node => node.prop && node.prop.startsWith('margin-'));
        const padding = rule.nodes.filter(node => node.prop && node.prop.startsWith('padding-'));
        if (border) {
          const borders = [];

          // Get each side and see if all three props are set
          const top = border.filter(node => node.prop.startsWith('border-top'));
          const right = border.filter(node => node.prop.startsWith('border-right'));
          const bottom = border.filter(node => node.prop.startsWith('border-bottom'));
          const left = border.filter(node => node.prop.startsWith('border-left'));
          const mergableSides = {
            top: false,
            left: false,
            bottom: false,
            right: false
          };
          const topText = buildBorderString(top);
          if (topText) {
            borders.push(buildBorderString(top));
            mergableSides.top = true;
          }
          const rightText = buildBorderString(right);
          if (rightText) {
            borders.push(buildBorderString(right));
            mergableSides.right = true;
          }
          const bottomText = buildBorderString(bottom);
          if (bottomText) {
            borders.push(buildBorderString(bottom));
            mergableSides.bottom = true;
          }
          const leftText = buildBorderString(left);
          if (leftText) {
            borders.push(buildBorderString(left));
            mergableSides.left = true;
          }
          const canMergeAll = borders.length === 4 && borders.every(val => val === borders[0]);
          if (canMergeAll) {
            // Remove the longhand declarations
            border.forEach(decl => decl.remove());

            // Replace the shorthand declaration with the merged shorthand value
            rule.append({
              prop: 'border',
              value: borders[0]
            });
          } else {
            // Remove the longhand declarations
            if (mergableSides.top) {
              top.forEach(decl => decl.remove());
              rule.append({
                prop: 'border-top',
                value: topText
              });
            }
            if (mergableSides.right) {
              right.forEach(decl => decl.remove());
              rule.append({
                prop: 'border-right',
                value: rightText
              });
            }
            if (mergableSides.bottom) {
              bottom.forEach(decl => decl.remove());
              rule.append({
                prop: 'border-bottom',
                value: bottomText
              });
            }
            if (mergableSides.left) {
              left.forEach(decl => decl.remove());
              rule.append({
                prop: 'border-left',
                value: leftText
              });
            }
          }
        }
        if (borderRadius.length === 4) {
          const combinedValue = buildBorderRadiusString(borderRadius);
          // Remove the longhand declarations
          borderRadius.forEach(decl => decl.remove());

          // Replace the shorthand declaration with the merged shorthand value
          rule.append({
            prop: 'border-radius',
            value: combinedValue
          });
        }
        if (margin.length === 4) {
          const combinedValue = buildSpacingString(margin);
          // Remove the longhand declarations
          margin.forEach(decl => decl.remove());

          // Replace the shorthand declaration with the merged shorthand value
          rule.append({
            prop: 'margin',
            value: combinedValue
          });
        }
        if (padding.length === 4) {
          const combinedValue = buildSpacingString(padding);
          // Remove the longhand declarations
          padding.forEach(decl => decl.remove());

          // Replace the shorthand declaration with the merged shorthand value
          rule.append({
            prop: 'padding',
            value: combinedValue
          });
        }
      });
    }
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/utils.js
function isNumeric(value) {
  return isNaN(parseFloat(value)) && isFinite(value);
}

// Test if the value starts with a number, decimal or a single dash.
const startsWithNumber = number => /^([-]?\d|[-]?\.)/.test(number);

/**
 * Take a URL string and make it absolute if it's relative
 *
 * @param {string} url  The URL to check
 * @param {string} base The base hostname for the URL
 * @return {string} The absolute URL.
 */
function getAbsoluteUrl(url, base = '') {
  if (!url) {
    return '';
  }
  const isAbsolute = /^https?:\/\//i.test(url);
  return isAbsolute ? url : new URL(url, base ? base : location.origin).href;
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/background/utils.js


/**
 *
 * @param {object[]} settings An array of background settings objects
 * @return {string} The CSS value for the background style
 */
function buildBackgroundCSS(settings = []) {
  return settings.reduce((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }
    const {
      type,
      backgroundAttachment = '',
      backgroundImage = '',
      backgroundSize = '',
      backgroundRepeat = '',
      backgroundPosition = ''
    } = cur;

    // Bail if required property(s) missing
    if (!backgroundImage) {
      return acc;
    }

    // Build the background property
    let background = '';
    if (backgroundImage) {
      // Remove quotes from URLs
      const cleanBackgroundImage = backgroundImage.replace("'", '').replace('"', '');
      background += `${cleanBackgroundImage}`;
    }
    if ('image' === type) {
      if (backgroundPosition) {
        background += ` ${backgroundPosition}`;
      }
      if (backgroundSize) {
        if (!backgroundPosition) {
          background += '0% 0% ';
        }
        background += ` / ${backgroundSize}`;
      }
      if (backgroundRepeat) {
        background += ` ${backgroundRepeat}`;
      }
      if (backgroundAttachment) {
        background += ` ${backgroundAttachment}`;
      }
    }

    // Return nothing if the background is empty
    if (!background.length) {
      return acc;
    }
    return acc.length > 0 ? `${acc}, ${background}` : `${background}`;
  }, '').replace(/,$/, '').trim();
}
function camelToKebab(camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function getPreviewCSS(setting = {}) {
  var _setting$backgroundIm;
  const backgroundImageEntry = ['backgroundImage', (_setting$backgroundIm = setting.backgroundImage) !== null && _setting$backgroundIm !== void 0 ? _setting$backgroundIm : ''];
  const backgroundEntries = [backgroundImageEntry, ...Object.entries(setting).filter(([key]) => key.startsWith('background') && key !== 'backgroundImage')];
  return backgroundEntries.reduce((acc, [key, value]) => {
    // Bail if key isn't a background property or there isn't a value
    if (!key.startsWith('background') || !value) {
      return acc;
    }

    // Indenting is weird to prevent adding extra tab/space characters at the front of the new lines
    return acc ? `${acc}
${camelToKebab(key)}: ${value};` : `${camelToKebab(key)}: ${value};`;
  }, '');
}

// Matches any colors in a string
const colorRegex = /(?:#(?:[0-9a-fA-F]{3}){1,2}|(?:rgb|rgba|hsl|hsla)\(\s*\d+%?\s*(?:,\s*\d+%?\s*){2,3}(?:,\s*(?:0?\.\d+|1|100%))?\))/g;
const splitBackgroundRegex = /(linear-gradient|radial-gradient)\([^)]*\)(?:\s*\d+%?,\s*(?:rgba?\([^)]*\)|#[0-9a-fA-F]+)\s*\d*%?)+\s*\)|url\([^)]*\)[^,)]*/g;
function parseBackground(css) {
  const backgroundList = css.match(splitBackgroundRegex) || [];
  return backgroundList.map(background => {
    const fakeElement = document.createElement('div');
    fakeElement.style.background = background;
    if (fakeElement.style.background === '') {
      return {
        type: 'image'
      };
    }
    const {
      backgroundAttachment = '',
      backgroundImage = '',
      backgroundSize = '',
      backgroundRepeat = '',
      backgroundPosition = ''
    } = fakeElement.style;
    const isGradient = backgroundImage.includes('gradient(');
    const isImage = backgroundImage.startsWith('url(');

    // Bail If type isn't recognized
    if (!isGradient && !isImage) {
      return {
        type: 'image'
      };
    }
    let type = 'image';
    let overlayColor = '';
    if (isGradient) {
      type = 'gradient';
      const gradientColors = backgroundImage.match(colorRegex);
      if (gradientColors) {
        // Gradient is considered an overlay if all colors are the same
        if (gradientColors.every(color => color === gradientColors[0])) {
          type = 'overlay';
          overlayColor = gradientColors[0];
        }
      }
    }
    return {
      type,
      backgroundAttachment: backgroundAttachment === 'initial' ? '' : backgroundAttachment,
      backgroundImage: backgroundImage.replace('"', '').replace("'", ''),
      backgroundSize,
      backgroundRepeat,
      backgroundPosition,
      overlayColor
    };
  });
}
function getDefaultBackground(atRule = '') {
  const defaultImageUrl = getAbsoluteUrl('/wp-content/plugins/generateblocks-pro/dist/assets/placeholder-lg.min.jpg');
  return atRule === '' ? {
    type: 'image',
    media: {
      selectedSize: 'full',
      sizes: {}
    },
    backgroundAttachment: '',
    backgroundImage: `url(${defaultImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'normal'
  } : {
    type: 'image',
    media: {
      id: 0
    },
    backgroundAttachment: '',
    backgroundImage: '',
    backgroundPosition: '',
    backgroundSize: '',
    backgroundRepeat: '',
    backgroundBlendMode: ''
  };
}
function getDefaultBackgroundOverlay() {
  const defaultOverlayColor = 'rgba(0, 0, 0, .25)';
  const defaultGradient = `linear-gradient(to right, ${defaultOverlayColor} 0%, ${defaultOverlayColor} 100%)`;
  return {
    ...getDefaultBackground(),
    type: 'overlay',
    backgroundBlendMode: 'normal',
    backgroundImage: defaultGradient,
    overlayColor: defaultOverlayColor
  };
}
;// CONCATENATED MODULE: ./src/postcss/combineBackgroundProperties.js



function combineBackgroundProperties() {
  const shorthandProperties = ['background-attachment', 'background-image', 'background-size', 'background-repeat', 'background-position'];
  function processRule(rule) {
    var _backgroundProperties;
    const backgroundProperties = rule.nodes.filter(node => node.prop && node.prop.startsWith('background-'));
    // Bail if no background properties found
    if (backgroundProperties.length === 0) {
      return;
    }
    const backgroundImage = (_backgroundProperties = backgroundProperties.find(node => node.prop === 'background-image')) !== null && _backgroundProperties !== void 0 ? _backgroundProperties : {
      value: ''
    };
    const backgroundImageValues = getBackgroundImageValue(backgroundImage.value);
    const multipleBackgrounds = backgroundImageValues ? backgroundImageValues.length > 1 : false;
    if (multipleBackgrounds) {
      try {
        var _backgroundProperties2, _backgroundProperties3, _backgroundProperties4, _backgroundProperties5;
        // Get the values of all shorthand properties
        const backgroundAttachment = (_backgroundProperties2 = backgroundProperties.find(node => node.prop === 'background-attachment')) !== null && _backgroundProperties2 !== void 0 ? _backgroundProperties2 : {
          value: ''
        };
        const backgroundSize = (_backgroundProperties3 = backgroundProperties.find(node => node.prop === 'background-size')) !== null && _backgroundProperties3 !== void 0 ? _backgroundProperties3 : {
          value: ''
        };
        const backgroundRepeat = (_backgroundProperties4 = backgroundProperties.find(node => node.prop === 'background-repeat')) !== null && _backgroundProperties4 !== void 0 ? _backgroundProperties4 : {
          value: ''
        };
        const backgroundPosition = (_backgroundProperties5 = backgroundProperties.find(node => node.prop === 'background-position')) !== null && _backgroundProperties5 !== void 0 ? _backgroundProperties5 : {
          value: ''
        };
        const backgrounds = parseBackgroundProperties({
          backgroundAttachment: backgroundAttachment.value,
          backgroundSize: backgroundSize.value,
          backgroundImage: backgroundImage.value,
          backgroundRepeat: backgroundRepeat.value,
          backgroundPosition: backgroundPosition.value
        });

        // Remove the combined properties from output
        backgroundProperties.forEach(backgroundDecl => {
          const prop = backgroundDecl.prop;
          if (shorthandProperties.includes(prop)) {
            backgroundDecl.remove();
          }
        });
        // Add the new combined background property
        rule.append(lib_postcss.decl({
          prop: 'background',
          value: buildBackgroundCSS(backgrounds)
        }));
      } catch (e) {
        console.error(e.messsage); // eslint-disable-line no-console
      }
    }
  }
  return {
    postcssPlugin: 'combine-background-properties',
    Once(root) {
      const rules = root.nodes.filter(node => node.type === 'rule');
      const atRules = root.nodes.filter(node => node.type === 'atrule');
      rules.forEach(processRule);
      atRules.forEach(atRule => {
        atRule.nodes.forEach(processRule);
      });
    }
  };
}
;// CONCATENATED MODULE: ./src/postcss/sortMediaQueries.js
// ----------------------------------------
// Private
// ----------------------------------------

const minMaxWidth = /(!?\(\s*min(-device)?-width)(.|\n)+\(\s*max(-device)?-width|\(\s*width\s*>(=)?(.|\n)+\(\s*width\s*<(=)?|(!?\(.*<(=)?\s*width\s*<(=)?)/i;
const minWidth = /\(\s*min(-device)?-width|\(\s*width\s*>(=)?/i;
const maxMinWidth = /(!?\(\s*max(-device)?-width)(.|\n)+\(\s*min(-device)?-width|\(\s*width\s*<(=)?(.|\n)+\(\s*width\s*>(=)?|(!?\(.*>(=)?\s*width\s*>(=)?)/i;
const maxWidth = /\(\s*max(-device)?-width|\(\s*width\s*<(=)?/i;
const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);
const minMaxHeight = /(!?\(\s*min(-device)?-height)(.|\n)+\(\s*max(-device)?-height|\(\s*height\s*>(=)?(.|\n)+\(\s*height\s*<(=)?|(!?\(.*<(=)?\s*height\s*<(=)?)/i;
const minHeight = /\(\s*min(-device)?-height|\(\s*height\s*>(=)?/i;
const maxMinHeight = /(!?\(\s*max(-device)?-height)(.|\n)+\(\s*min(-device)?-height|\(\s*height\s*<(=)?(.|\n)+\(\s*height\s*>(=)?|(!?\(.*>(=)?\s*height\s*>(=)?)/i;
const maxHeight = /\(\s*max(-device)?-height|\(\s*height\s*<(=)?/i;
const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);
const isPrint = /print/i;
const isPrintOnly = /^print$/i;
const maxValue = Number.MAX_VALUE;

/**
 * Obtain the length of the media request in pixels.
 * Copy from original source `function inspectLength (length)`
 * {@link https://github.com/hail2u/node-css-mqpacker/blob/master/index.js#L58}
 *
 * @private
 * @param { string } query The media query to inspect
 * @return {number} The length of the query
 */
function _getQueryLength(query) {
  let length = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(query);
  if (length === null && (isMinWidth(query) || isMinHeight(query))) {
    length = /(\d)/.exec(query);
  }
  if (length === '0') {
    return 0;
  }
  if (length === null) {
    return maxValue;
  }
  let number = length[1];
  const unit = length[2];
  switch (unit) {
    case 'ch':
      number = parseFloat(number) * 8.8984375;
      break;
    case 'em':
    case 'rem':
      number = parseFloat(number) * 16;
      break;
    case 'ex':
      number = parseFloat(number) * 8.296875;
      break;
    case 'px':
      number = parseFloat(number);
      break;
  }
  return +number;
}

/**
 * Wrapper for creating test functions
 *
 * @private
 * @param {RegExp} doubleTestTrue  Test value that should evaluate to true
 * @param {RegExp} doubleTestFalse Test value that should evaluate to false
 * @param {RegExp} singleTest      The single test value
 * @return {boolean} The result of the test
 */
function _testQuery(doubleTestTrue, doubleTestFalse, singleTest) {
  /**
   * @param {string} query The media query to test
   * @return {boolean} The result of the test
   */
  return function (query) {
    if (doubleTestTrue.test(query)) {
      return true;
    } else if (doubleTestFalse.test(query)) {
      return false;
    }
    return singleTest.test(query);
  };
}

/**
 * @private
 * @param {string} a Test value 1
 * @param {string} b Test value 2
 * @return {number|null} The result of the test
 */
function _testIsPrint(a, b) {
  const isPrintA = isPrint.test(a);
  const isPrintOnlyA = isPrintOnly.test(a);
  const isPrintB = isPrint.test(b);
  const isPrintOnlyB = isPrintOnly.test(b);
  if (isPrintA && isPrintB) {
    if (!isPrintOnlyA && isPrintOnlyB) {
      return 1;
    }
    if (isPrintOnlyA && !isPrintOnlyB) {
      return -1;
    }
    return a.localeCompare(b);
  }
  if (isPrintA) {
    return 1;
  }
  if (isPrintB) {
    return -1;
  }
  return null;
}

// TODO: update to make this a dynamic option (do we even need it?)
const UNITLESS_MQ_ALWAYS_FIRST = true;

/**
 * Sorting an array with media queries
 * according to the mobile-first methodology.
 *
 * @param {string} a the first media query
 * @param {string} b the media query to compare against
 * @return {number} 1 / 0 / -1
 */
function sortQueriesArray(a, b) {
  const testIsPrint = _testIsPrint(a, b);
  if (testIsPrint !== null) {
    return testIsPrint;
  }
  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);
  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);
  if (UNITLESS_MQ_ALWAYS_FIRST && (!minA && !maxA || !minB && !maxB)) {
    if (!minA && !maxA && !minB && !maxB) {
      return a.localeCompare(b);
    }
    return !minB && !maxB ? 1 : -1;
  }
  if (minA && maxB) {
    return -1;
  }
  if (maxA && minB) {
    return 1;
  }
  const lengthA = _getQueryLength(a);
  const lengthB = _getQueryLength(b);
  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }
  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }
    return 1;
  }
  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }
    return -1;
  }
  return a.localeCompare(b);
}
function sortMediaQueriesDesktopFirst(a, b) {
  const testIsPrint = _testIsPrint(a, b);
  if (testIsPrint !== null) {
    return testIsPrint;
  }
  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);
  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);
  if (UNITLESS_MQ_ALWAYS_FIRST && (!minA && !maxA || !minB && !maxB)) {
    if (!minA && !maxA && !minB && !maxB) {
      return a.localeCompare(b);
    }
    return !minB && !maxB ? 1 : -1;
  }
  if (minA && maxB) {
    return 1;
  }
  if (maxA && minB) {
    return -1;
  }
  const lengthA = _getQueryLength(a);
  const lengthB = _getQueryLength(b);
  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }
  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }
    return 1;
  }
  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }
    return -1;
  }
  return -a.localeCompare(b);
}
function sortMediaQueries(opts = {
  onlyTopLevel: false
}) {
  return {
    postcssPlugin: 'postcss-gb-sort-media-queries',
    Once(root, {
      AtRule
    }) {
      const atRules = [];
      root.walkAtRules('media', atRule => {
        if (opts.onlyTopLevel && atRule.parent.type === 'root') {
          const query = atRule.params;
          if (!atRules[query]) {
            atRules[query] = new AtRule({
              name: atRule.name,
              params: atRule.params,
              source: atRule.source
            });
          }
          atRule.nodes.forEach(node => {
            atRules[query].append(node.clone());
          });
          atRule.remove();
        }
        if (!opts.onlyTopLevel) {
          const query = atRule.params;
          if (!atRules[query]) {
            atRules[query] = new AtRule({
              name: atRule.name,
              params: atRule.params,
              source: atRule.source
            });
          }
          atRule.nodes.forEach(node => {
            atRules[query].append(node.clone());
          });
          atRule.remove();
        }
      });
      if (atRules) {
        Object.keys(atRules).sort(sortQueriesArray).forEach(query => {
          root.append(atRules[query]);
        });
      }
    }
  };
}
;// CONCATENATED MODULE: ./src/postcss/editorTransforms.js
const transforms = {
  a: 'a:where(:not(.components-external-link))',
  button: 'button:where(:not(.components-button))'
};
function editorTransforms() {
  return {
    postcssPlugin: 'gb-editor-transforms',
    Rule(rule) {
      let selector = rule.selector;

      // Transform 'a' and 'button' selectors if they haven't already been transformed
      Object.keys(transforms).forEach(key => {
        // Use word boundaries to target standalone tag selectors, not parts of class names
        const regex = new RegExp(`(^|\\s|>|\\+|~)(${key})(\\s|$|>|\\+|~)(?!:where)`, 'g');
        selector = selector.replace(regex, `$1${transforms[key]}$3`);
      });
      rule.selector = selector;
    }
  };
}
;// CONCATENATED MODULE: ./src/utils.js








function getColorFromCustomProperty(value) {
  if (String(value).startsWith('var(')) {
    const variableName = value.match(/\(([^)]+)\)/);
    if (variableName) {
      const variableValue = getComputedStyle(document.documentElement).getPropertyValue(variableName[1]);
      if (variableValue) {
        value = variableValue;
      }
    }
  }
  return value;
}
function getBackgroundImageValue(value) {
  const result = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '(') {
      depth++;
    } else if (value[i] === ')') {
      depth--;
    } else if (value[i] === ',' && depth === 0) {
      result.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  result.push(value.slice(start).trim());
  return result;
}
function parseBackgroundProperties({
  backgroundAttachment = '',
  backgroundImage = '',
  backgroundSize = '',
  backgroundRepeat = '',
  backgroundPosition = '',
  backgroundBlendMode = ''
}) {
  const colorRegex = /(?:#(?:[0-9a-fA-F]{3}){1,2}|(?:rgb|rgba|hsl|hsla)\(\s*\d+%?\s*(?:,\s*\d+%?\s*){2,3}(?:,\s*(?:0?\.\d+|1|100%))?\)|var\(--[^\s)]+\))/g;
  const backgroundAttachmentValues = backgroundAttachment.split(',');
  const backgroundSizeValues = backgroundSize.split(',');
  const backgroundRepeatValues = backgroundRepeat.split(',');
  const backgroundPositionValues = backgroundPosition.split(',');
  const backgroundImageValues = getBackgroundImageValue(backgroundImage);
  const backgroundBlendModeValues = backgroundBlendMode.split(',');
  let currentIndex = 0;
  const background = [];
  while (currentIndex < backgroundImageValues.length) {
    var _backgroundAttachment, _backgroundSizeValues, _backgroundRepeatValu, _backgroundPositionVa, _backgroundBlendModeV;
    const bgImage = backgroundImageValues[currentIndex];
    const isGradient = bgImage.includes('gradient(');
    let type = 'image';
    let overlayColor = '';
    if (isGradient) {
      type = 'gradient';
      const gradientColors = bgImage.match(colorRegex);
      if (gradientColors) {
        // Gradient is considered an overlay if all colors are the same
        if (gradientColors.every(color => color === gradientColors[0])) {
          type = 'overlay';
          overlayColor = gradientColors[0];
        }
      }
    }
    background.push({
      backgroundAttachment: (_backgroundAttachment = backgroundAttachmentValues[currentIndex]) !== null && _backgroundAttachment !== void 0 ? _backgroundAttachment : '',
      backgroundSize: (_backgroundSizeValues = backgroundSizeValues[currentIndex]) !== null && _backgroundSizeValues !== void 0 ? _backgroundSizeValues : '',
      backgroundRepeat: (_backgroundRepeatValu = backgroundRepeatValues[currentIndex]) !== null && _backgroundRepeatValu !== void 0 ? _backgroundRepeatValu : '',
      backgroundPosition: (_backgroundPositionVa = backgroundPositionValues[currentIndex]) !== null && _backgroundPositionVa !== void 0 ? _backgroundPositionVa : '',
      backgroundImage: backgroundImageValues[currentIndex],
      backgroundBlendMode: (_backgroundBlendModeV = backgroundBlendModeValues[currentIndex]) !== null && _backgroundBlendModeV !== void 0 ? _backgroundBlendModeV : '',
      type,
      overlayColor,
      media: {
        id: 0
      }
    });
    currentIndex++;
  }
  return background;
}

/**
 * Sort our styles object into standard, @ and pseudo rules.
 *
 * @param {Object} data Our styles object data.
 * @return {Object} Sorted styles object.
 */
function sortStylesObject(data) {
  const result = {
    atRules: {},
    nestedRules: {},
    propertyRules: {}
  };
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith('@')) {
      var _result$atRules$key;
      const existingRule = (_result$atRules$key = result?.atRules?.[key]) !== null && _result$atRules$key !== void 0 ? _result$atRules$key : {};

      // Top level @ rules.
      result.atRules[key] = {
        ...existingRule,
        ...value
      };
    } else if ('object' === typeof value) {
      // Nested rules. ie: &:hover.
      Object.entries(value).forEach(([nestedRuleKey, nestedRuleValue]) => {
        if (nestedRuleKey.startsWith('@')) {
          var _result$atRules$neste;
          const existingAtRules = (_result$atRules$neste = result?.atRules?.[nestedRuleKey]) !== null && _result$atRules$neste !== void 0 ? _result$atRules$neste : {};

          // Store all @ rules under the `atRules` key.
          // This allows us to group all @ rules together when generating the CSS.
          result.atRules[nestedRuleKey] = {
            ...existingAtRules,
            [key]: nestedRuleValue
          };
        } else {
          var _result$nestedRules$k;
          const existingNestedRules = (_result$nestedRules$k = result?.nestedRules?.[key]) !== null && _result$nestedRules$k !== void 0 ? _result$nestedRules$k : {};
          result.nestedRules[key] = {
            ...existingNestedRules,
            [nestedRuleKey]: nestedRuleValue
          };
        }
      });
    } else {
      result.propertyRules[key] = value;
    }
  }

  /**
   * Sorts an object alphabetically by key.
   *
   * @param {Object} obj The object to be sorted.
   * @return {Object} The sorted object.
   */
  function sortObject(obj) {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  }
  return {
    atRules: sortObject(result.atRules),
    nestedRules: sortObject(result.nestedRules),
    propertyRules: sortObject(result.propertyRules)
  };
}

/**
 * Replace camel-case with kebab-case.
 *
 * @param {string} property The camel-case CSS property.
 * @return {string} Kebab-case property.
 */
function getKebabCaseProperty(property) {
  return property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Output our CSS block with the selector and inner properties/values.
 *
 * @param {string} css      The existing CSS.
 * @param {string} selector The CSS selector.
 * @param {Object} data     The object of CSS properties and values.
 * @return {string} The block of CSS.
 */
function getCssBlock(css, selector, data) {
  css += `${selector} {`;
  for (let [property, value] of Object.entries(data)) {
    if ('settings' === property) {
      continue;
    }
    property = getKebabCaseProperty(property);
    css += `${property}:${value.toString()};`;
  }
  css += '}';
  return css;
}

/**
 * Get our selector with nested rules.
 *
 * @param {string} selector   The plain selector.
 * @param {string} nestedRule Any associated nested rule to attach to the selector.
 * @return {string} The selector with nested rules.
 */
function getSelector(selector, nestedRule = '') {
  if (!nestedRule) {
    return selector;
  }

  // Allow for comma separated selectors.
  const multiSelector = selector.split(',').map(sel => sel.trim());
  const selectorsWithNestedRules = [];
  multiSelector.forEach(sel => {
    selectorsWithNestedRules.push(nestedRule.startsWith('&') ? sel + nestedRule.replace('&', '') : sel + ' ' + nestedRule);
  });
  return selectorsWithNestedRules.join(',');
}

/**
 * Generate our raw CSS based on our styles object.
 *
 * @param {string} selector The CSS selector.
 * @param {Object} styles   The styles object.
 * @return {string} The raw CSS.
 */
function getRawCss(selector, styles) {
  if (!selector) {
    return '';
  }
  let classCss = '';
  styles = sortStylesObject(styles);

  // Build the CSS for our standard properties.
  if (styles.propertyRules && Object.keys(styles.propertyRules).length > 0) {
    classCss = getCssBlock(classCss, getSelector(selector), styles.propertyRules);
  }

  // Build the CSS for our nested rules. ie: &:before.
  if (styles.nestedRules && Object.keys(styles.nestedRules).length > 0) {
    for (const nestedRule in styles.nestedRules) {
      classCss = getCssBlock(classCss, getSelector(selector, nestedRule), styles.nestedRules[nestedRule]);
    }
  }

  // Build the CSS for our @ rules.
  if (styles.atRules && Object.keys(styles.atRules).length > 0) {
    for (const atRule in styles.atRules) {
      const atRuleStyles = sortStylesObject(styles.atRules[atRule]);
      classCss += `${atRule} {`;
      if (atRuleStyles.propertyRules && Object.keys(atRuleStyles.propertyRules).length > 0) {
        classCss = getCssBlock(classCss, selector, atRuleStyles.propertyRules);
      }
      if (atRuleStyles.nestedRules && Object.keys(atRuleStyles.nestedRules).length > 0) {
        for (const nestedRule in atRuleStyles.nestedRules) {
          classCss = getCssBlock(classCss, getSelector(selector, nestedRule), atRuleStyles.nestedRules[nestedRule]);
        }
      }
      classCss += '}';
    }
  }
  return classCss;
}

/**
 * Generate our CSS and optimize it.
 *
 * @param {string} selector The CSS selector.
 * @param {Object} styles   The styles object.
 * @param {string} context  Context for postCSS plugins.
 * @return {Promise<string>} The optimized CSS.
 */
async function getCss(selector, styles, context = 'frontend') {
  var _optimizedCss$css;
  const rawCss = (0,external_wp_hooks_namespaceObject.applyFilters)('generateStylesBuilder.rawCss', getRawCss(selector, styles));
  const editorStyles = [{
    css: rawCss
  }];
  const maybePrefixedCss = 'editor' === context ? (0,external_wp_blockEditor_namespaceObject.transformStyles)(editorStyles, '.editor-styles-wrapper')?.[0] : rawCss;
  let plugins = [src_default()(), mergeLonghand(), combineBackgroundProperties(), sortMediaQueries(), postcss_minify_default()()];
  if ('editor' === context) {
    plugins = [src_default()(), mergeLonghand(), combineBackgroundProperties(), sortMediaQueries(), editorTransforms(), postcss_minify_default()()];
  }
  const optimizedCss = await lib_postcss(plugins).process(maybePrefixedCss, {
    from: undefined
  }).catch(e => {
    console.error(e.message); // eslint-disable-line no-console
  });
  return (_optimizedCss$css = optimizedCss?.css) !== null && _optimizedCss$css !== void 0 ? _optimizedCss$css : maybePrefixedCss;
}

/**
 * Sanitize our class name.
 *
 * @param {string} className The class name.
 * @return {string} The sanitized class name.
 */
function sanitizeClassName(className) {
  return className.replace(/[^a-zA-Z0-9-_]/g, '');
}

/**
 * Clean our styles object by removing empty objects and properties.
 *
 * @param {Object} obj The styles object.
 * @return {Object} The cleaned styles object.
 */
function cleanStylesObject(obj) {
  if ('object' !== typeof obj) {
    return {};
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      // Recursively clean nested objects.
      const normalized = cleanStylesObject(value);

      // Only add the property if the nested object is not empty.
      if (Object.keys(normalized).length > 0) {
        acc[key] = normalized;
      }
    } else if (value !== '' && value !== null && value !== undefined) {
      const normalized = value.toString().replace(';', '').replace('{', '').replace('}', '');

      // Add the property if it's not an empty string or null/undefined.
      acc[key] = normalized;
    }
    return acc;
  }, {});
}

/**
 * Class interface for styles objects that contain settings.
 * This is used to store the value and settings for a CSS property that uses a list.
 */
class StylesObjectValue {
  constructor({
    value,
    settings = []
  }) {
    this.value = value;
    this.settings = settings;
  }
  toString() {
    return this.value;
  }
}

/**
 * This function adds a new property to the styles object, or updates an existing property.
 * If a nested rule or at-rule is provided, the property is added within that rule.
 * The function uses the spread operator to create a new object rather than mutating the original one,
 * following the principle of immutability.
 *
 * @param {Object}        object        - The original styles object.
 * @param {string}        property      - The CSS property to add.
 * @param {string|Object} propertyValue - The value of the CSS property, or an object that contains the value and an array of settings
 * @param {string}        atRule        - The at-rule (@media, @supports, etc.) under which the property should be added.
 * @param {string}        nestedRule    - The nested rule (e.g., '&:hover', '&:focus') under which the property should be added.
 * @return {Object} - The new styles object with the added property.
 */
function addPropertyToStylesObject(object, property, propertyValue, atRule, nestedRule) {
  let newData = {};
  const value = 'object' === typeof propertyValue && null !== propertyValue ? new StylesObjectValue(propertyValue) : propertyValue;
  if (nestedRule) {
    var _object$nestedRule;
    const existingNestedRule = (_object$nestedRule = object?.[nestedRule]) !== null && _object$nestedRule !== void 0 ? _object$nestedRule : {};
    if (atRule) {
      var _object$nestedRule$at;
      const existingNestedRuleAtRule = (_object$nestedRule$at = object?.[nestedRule]?.[atRule]) !== null && _object$nestedRule$at !== void 0 ? _object$nestedRule$at : {};
      newData = {
        ...object,
        [nestedRule]: {
          ...existingNestedRule,
          [atRule]: {
            ...existingNestedRuleAtRule,
            [property]: value
          }
        }
      };
    } else {
      newData = {
        ...object,
        [nestedRule]: {
          ...existingNestedRule,
          [property]: value
        }
      };
    }
  } else if (atRule) {
    var _object$atRule;
    const existingAtRule = (_object$atRule = object?.[atRule]) !== null && _object$atRule !== void 0 ? _object$atRule : {};
    newData = {
      ...object,
      [atRule]: {
        ...existingAtRule,
        [property]: value
      }
    };
  } else {
    newData = {
      ...object,
      [property]: value
    };
  }
  return cleanStylesObject(newData);
}

/**
 * This function updates a key in a styles object.
 *
 * @param {Object} object - The original styles object.
 * @param {string} oldKey - The key to be updated.
 * @param {string} newKey - The new key.
 * @return {Object} - The new styles object with the updated key.
 */
function updateStylesObjectKey(object, oldKey, newKey) {
  const newData = {};
  Object.entries(object).forEach(([key, value]) => {
    if (key === oldKey) {
      newData[newKey] = value;
    } else {
      newData[key] = value;
    }
  });
  return newData;
}

/**
 * This function deletes a key in a styles object.
 *
 * @param {Object} object - The original styles object.
 * @param {string} key    - The key to be deleted.
 * @return {Object} - The new styles object without the deleted key.
 */
function deleteStylesObjectKey(object, key) {
  const newData = {};
  Object.entries(object).forEach(([k, value]) => {
    if (k !== key) {
      newData[k] = value;
    }
  });
  return newData;
}

/**
 * This function gets a styles object from the store. If a nested rule or at-rule is provided,
 * the function returns the object within that rule.
 *
 * @param {Object} object     - The original styles object.
 * @param {string} atRule     - The at-rule (@media, @supports, etc.) under which the property should be added.
 * @param {string} nestedRule - The nested rule (e.g., '&:hover', '&:focus') under which the property should be added.
 * @return {Object} - The styles object.
 */
function getStylesObject(object, atRule = '', nestedRule = '') {
  if (nestedRule) {
    var _object$nestedRule2;
    if (atRule) {
      var _object$nestedRule$at2;
      return (_object$nestedRule$at2 = object?.[nestedRule]?.[atRule]) !== null && _object$nestedRule$at2 !== void 0 ? _object$nestedRule$at2 : {};
    }
    return (_object$nestedRule2 = object?.[nestedRule]) !== null && _object$nestedRule2 !== void 0 ? _object$nestedRule2 : {};
  } else if (atRule) {
    var _object$atRule2;
    return (_object$atRule2 = object?.[atRule]) !== null && _object$atRule2 !== void 0 ? _object$atRule2 : {};
  }
  return object !== null && object !== void 0 ? object : {};
}
function getAtRuleType(rule) {
  if (rule.constructor.name === 'CSSMediaRule') {
    return {
      name: 'media',
      type: CSSMediaRule
    };
  }
  if (rule.constructor.name === 'CSSSupportsRule') {
    return {
      name: 'supports',
      type: CSSSupportsRule
    };
  }
  if (rule.constructor.name === 'CSSContainerRule') {
    return {
      name: 'container',
      type: window.CSSContainerRule
    };
  }
  return {
    name: 'unknown',
    type: Error
  };
}

/**
 *
 * @typedef  GetComputedStyleSourcesOptions
 * @property {HTMLElement}              element               The element to check
 * @property {string[]}                 properties            The CSS properties to check
 * @property {string[]}                 sources               The sources to check (e.g., 'inline', 'tag', 'stylesheet')
 * @property {CSSStyleDeclaration|null} computedStyles        CSSStyleDeclarationObject to use for the check. Default null. If null, the computed styles of the element will be used.
 * @param    {Object}                   args.deviceAttributes (Deprecated) Object of device-specific block attributes for 1.x local blocks.
 */

/**
 *
 * @param {GetComputedStyleSourcesOptions} options Options for the function
 * @return {Object} An object of objects containing the source, selector, and value of each CSS property
 */
function utils_getComputedStyleSources({
  element,
  properties,
  sources = ['inline', 'tag'],
  computedStyles = null,
  deviceAttributes = {},
  atRule = ''
}) {
  if (!properties || properties.length === 0) {
    throw new Error('properties must be specified');
  }
  const queryDocument = document.querySelector('iframe[name="editor-canvas"]')?.contentDocument || document;
  const styles = computedStyles !== null && computedStyles !== void 0 ? computedStyles : getComputedStyle(element);
  const result = {};
  const styleTags = sources.includes('tag') ? queryDocument.querySelectorAll('style') : [];
  const styleSheets = sources.includes('stylesheet') ? queryDocument.styleSheets : [];
  const sizingProperties = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'];
  const typographyProperites = ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'textAlign', 'textTransform'];
  const isValidValue = string => {
    return null !== string && undefined !== string && '' !== string;
  };
  for (const property of properties) {
    var _styles$property;
    // BEGIN Legacy local attribute checks.

    /**
     * Check attributes to confirm if a local style applies for this property
     * and if so, skip it.
     */
    const isSpacingProperty = property.startsWith('padding') || property.startsWith('margin');
    const isSizingProperty = sizingProperties.includes(property);
    const isBorderProperty = property.startsWith('border');
    const isTypographyProperty = typographyProperites.includes(property);
    if (isTypographyProperty) {
      var _deviceAttributes$typ;
      const typographyPropertyValue = (_deviceAttributes$typ = deviceAttributes?.typography?.[property]) !== null && _deviceAttributes$typ !== void 0 ? _deviceAttributes$typ : '';

      // If we can find a local value, skip this property.
      if (isValidValue(typographyPropertyValue)) {
        result[property] = {
          source: 'local',
          selector: '',
          value: typographyPropertyValue
        };
        continue;
      }
    } else if (isBorderProperty) {
      var _deviceAttributes$bor;
      const borderPropertyValue = (_deviceAttributes$bor = deviceAttributes?.borders?.[property]) !== null && _deviceAttributes$bor !== void 0 ? _deviceAttributes$bor : '';

      // If we can find a local value, skip this property.
      if (isValidValue(borderPropertyValue)) {
        result[property] = {
          source: 'local',
          selector: '',
          value: borderPropertyValue
        };
        continue;
      }
    } else if (isSpacingProperty) {
      var _deviceAttributes$spa;
      const spacingPropertyValue = (_deviceAttributes$spa = deviceAttributes?.spacing?.[property]) !== null && _deviceAttributes$spa !== void 0 ? _deviceAttributes$spa : '';

      // If we can find a local value, skip this property.
      if (isValidValue(spacingPropertyValue)) {
        result[property] = {
          source: 'local',
          selector: '',
          value: spacingPropertyValue
        };
        continue;
      }
    } else if (isSizingProperty) {
      var _deviceAttributes$siz;
      const sizingPropertyValue = (_deviceAttributes$siz = deviceAttributes?.sizing?.[property]) !== null && _deviceAttributes$siz !== void 0 ? _deviceAttributes$siz : '';

      // If we can find a local value, skip this property.
      if (isValidValue(sizingPropertyValue)) {
        result[property] = {
          source: 'local',
          selector: '',
          value: sizingPropertyValue
        };
        continue;
      }
    } else if (isValidValue(deviceAttributes?.[property])) {
      result[property] = {
        source: 'local',
        selector: '',
        value: deviceAttributes[property]
      };
      continue;
    }

    // END Legacy attribute checks.

    const value = (_styles$property = styles[property]) !== null && _styles$property !== void 0 ? _styles$property : null;
    if (null === value) {
      // Property isn't applied to this element
      result[property] = {
        source: null,
        selector: '',
        value
      };
      continue;
    }
    const selectorsToIgnore = [
    // This selector is used to reset v1 block styles and shouldn't be used for indicators.
    '.editor-styles-wrapper .gb-container, .editor-styles-wrapper .gb-headline, .editor-styles-wrapper .gb-button'];
    function processStyleRules(rules, source, ruleAtRule = '') {
      for (const rule of rules) {
        const hasRules = rule?.cssRules ? rule.cssRules.length > 0 : false;
        const hasConditionText = rule?.conditionText ? true : false;
        if ('CSSStyleRule' === rule.constructor.name) {
          let valueRaw = property in rule.style ? rule.style[property] : null;
          if (valueRaw?.startsWith('var(')) {
            // Temporarily set the property on the element to get it's computed value.
            element.style[property] = valueRaw;
            valueRaw = styles[property] || valueRaw;
            element.style[property] = '';
          }
          if (!isValidValue(valueRaw)) {
            continue;
          }
          if (selectorsToIgnore.includes(rule.selectorText)) {
            continue;
          }
          if (element.matches(rule.selectorText)) {
            let matches = false;
            const checkUsedValue = isSpacingProperty || isSizingProperty || isBorderProperty || ['fontSize', 'lineHeight', 'letterSpacing', 'transform'].includes(property);
            if (checkUsedValue) {
              element.style[property] = valueRaw;
              const usedValue = computedStyles?.[property];
              element.style[property] = '';
              if (usedValue === value) {
                matches = true;
              }
            } else if (valueRaw === value) {
              matches = true;
            }
            if (matches) {
              result[property] = {
                source,
                selector: rule.selectorText,
                value,
                valueRaw,
                atRule: ruleAtRule
              };
              break;
            }
          }
        } else if (hasRules && hasConditionText) {
          const atRuleType = getAtRuleType(rule);

          // TODO: Add support for other at-rules
          if ('media' !== atRuleType.name) {
            return;
          }
          const atRuleText = normalizeAtRule(`@${atRuleType.name} ${rule.conditionText}`);
          return processStyleRules(rule.cssRules, source, atRuleText);
        }
      }
    }

    // Check inline if enabled and no active atRule
    if (sources.includes('inline') && !atRule) {
      // Check inline styles first
      const valueRaw = element.style[property];
      if (valueRaw && null !== value) {
        result[property] = {
          source: 'inline',
          selector: '',
          // TODO: Consider returning the element here instead of an empty string or a selector for that inline style
          value,
          valueRaw
        };
        continue;
      }
    }
    if (sources.includes('tag')) {
      // Check all <style> tags
      for (const styleTag of styleTags) {
        try {
          processStyleRules(styleTag.sheet.cssRules, 'tag');
        } catch (error) {
          // Some stylesheets may throw a SecurityError when trying to access them
          console.error(error.message); // eslint-disable-line no-console
        }
      }
      if (property in result) {
        continue;
      }
    }
    if (sources.includes('stylesheet')) {
      // Check external stylesheets
      for (const styleSheet of styleSheets) {
        try {
          const rules = styleSheet.rules || styleSheet.cssRules;
          processStyleRules(rules, 'stylesheet');
        } catch (error) {
          // Some stylesheets may throw a SecurityError when trying to access them
          console.error('Error accessing stylesheet:', error.message); // eslint-disable-line no-console
        }
      }
      if (property in result) {
        continue;
      }
    }

    // User agent style or style not found
    result[property] = {
      source: 'other',
      selector: '',
      value
    };
  }
  return result;
}

/**
 * Get the source and computed value of a CSS property for a list of elements
 * or a single element.
 *
 * @param {Object}                   args                  Function args object
 * @param {NodeList|HTMLElement}     args.elements         A list of elements or a single element
 * @param {string|string[]}          args.properties       A single CSS property or a list of CSS property to check
 * @param {CSSStyleDeclaration|null} args.computedStyles   CSSStyleDeclarationObject to use for the check. Default null. If null, the computed styles of the element will be used.
 * @param {Object}                   args.deviceAttributes (Deprecated) Object of device-specific block attributes for 1.x local blocks.
 * @param {string}                   args.atRule           The current active atRule to check
 * @param {string[]}                 args.sources          Array of source types used for the check.
 * @return {Object[]}                An array of objects containing the source and value of the CSS property or a single object if a single element was passed.
 */
function getElementStyles({
  elements,
  properties,
  computedStyles = null,
  deviceAttributes = {},
  atRule = '',
  sources = ['inline', 'tag']
}) {
  const singleProp = !Array.isArray(properties);
  const props = singleProp ? [properties] : properties;
  if (Array.isArray(elements)) {
    return elements.map(element => {
      const result = utils_getComputedStyleSources({
        element,
        properties: props,
        computedStyles,
        deviceAttributes,
        atRule,
        sources
      });
      return singleProp ? result[properties] : result;
    });
  }
  const result = utils_getComputedStyleSources({
    element: elements,
    properties: props,
    computedStyles,
    deviceAttributes,
    atRule,
    sources
  });
  return singleProp ? result[properties] : result;
}
function normalizeAtRule(atRule) {
  let normalized = atRule;

  // Ensure the at-rule has a space after the @media.
  normalized = normalized.replace('@media(', '@media (');

  // Ensure the at-rule has a space after the @supports.
  normalized = normalized.replace('@supports(', '@supports (');

  // Ensure the at-rule has a space after the @container.
  normalized = normalized.replace('@container(', '@container (');

  // Remove spaces inside (), but only if we're using : in our at-rule.
  // This allows for spaces when using range syntax.
  if (normalized.includes(':')) {
    normalized = normalized.replace(/\([^()]*\)/g, match => {
      return match.replace(/\s+/g, '');
    });
  }
  return normalized;
}
const defaultAtRules = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.styles.defaultAtRules', [{
  label: (0,external_wp_i18n_namespaceObject.__)('All devices', 'generateblocks-pro'),
  value: '',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M57.128 31.707h5.556v5.556h-5.556zM75.489 50.836h3.703v3.704H75.49z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M93.396 15.181c1.926.074 3.598 1.704 3.673 3.676.263 20.76 0 41.528 0 62.287-.025 1.972-1.691 3.695-3.673 3.769-28.896.37-57.797.009-86.695.009-1.966-.028-3.694-1.695-3.769-3.676-.263-20.76-.001-41.528-.001-62.287.025-1.972 1.692-3.695 3.673-3.778 28.928-.361 57.864-.361 86.792 0Zm-4.772 65.111h3.816V19.811H7.56v60.481h31.664c-.21-17.342.006-34.676.006-52.009.027-2.13 1.792-4.037 4.014-4.12 11.109-.14 22.222-.14 33.331 0 2.113.083 3.93 1.86 4.012 4.009.07 5.565.096 11.12.1 16.685 1.907.01 3.817.028 5.725.046 1.147.047 2.139 1.028 2.183 2.186.14 11.064.15 22.13.03 33.203Zm-3.886 0V48.764H69.946v31.528h14.792Zm-7.962-35.444c-.023-5.51-.045-11.028-.045-16.537 0-.167-.107-.278-.245-.287-11.03-.417-22.075 0-33.112 0-.163 0-.28.11-.285.25-.225 17.333-.005 34.676-.001 52.018H66.06c-.12-11.074-.11-22.139.029-33.203.044-1.149 1.028-2.14 2.183-2.186 2.835-.037 5.67-.055 8.504-.055Z"
  })),
  show: true,
  id: 'all'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Desktop', 'generateblocks-pro'),
  value: '@media (min-width:1025px)',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 417 417",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M389.233 63.228c7.989.304 14.98 7.083 15.229 15.28 1.082 86.514 0 173.028 0 259.542-.083 8.196-6.99 15.38-15.23 15.684-120.42 1.518-240.84 0-361.26 0-8.155-.101-15.395-7.083-15.728-15.28-1.082-86.513 0-173.028 0-259.542.083-8.196 7.074-15.38 15.312-15.684a13466.862 13466.862 0 0 1 361.677 0ZM31.55 82.454v251.953h353.687V82.454H31.551Z"
  })),
  show: false,
  id: 'largeWidth'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Desktop & tablet', 'generateblocks-pro'),
  value: '@media (min-width:768px)',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 417 417",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M389.145 63.263c8.025.309 15.008 7.099 15.317 15.316 1.08 86.497 0 173.033 0 259.53-.116 8.217-7.06 15.393-15.317 15.702-120.409 1.543-240.818.038-361.227.038-8.179-.115-15.393-7.06-15.702-15.316-1.08-86.497 0-173.032 0-259.53.077-8.217 7.06-15.393 15.317-15.74a14485.169 14485.169 0 0 1 361.612 0Zm-3.973 19.29H31.506v252.006h145.487c-.926-72.762 0-145.524 0-218.287.115-8.873 7.484-16.82 16.705-17.168 46.296-.579 92.592-.579 138.889 0 8.796.347 16.396 7.755 16.744 16.705.926 72.917 0 145.834 0 218.75h35.84V82.553Zm-51.89 252.006c2.7-72.685-.04-145.486-.04-218.21 0-.617-.424-1.119-1.002-1.157-45.988-1.736-91.976 0-137.963 0-.695 0-1.196.463-1.196 1.042-.926 72.762 0 145.524 0 218.325h140.2Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M251.558 132.111h23.148v23.15h-23.148z"
  })),
  show: false,
  id: 'mediumLargeWidth'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Tablet', 'generateblocks-pro'),
  value: '@media (max-width:1024px) and (min-width:768px)',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M0 0h24v24H0z",
    style: {
      fill: 'none',
      transform: 'scale(4.16667)'
    }
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M69.096 15.124c2.445.045 4.626 2.189 4.659 4.673.132 20.139.396 40.278 0 60.417-.066 2.396-2.181 4.525-4.593 4.599a969.265 969.265 0 0 1-38.233 0c-2.412-.074-4.527-2.174-4.61-4.599-.38-20.154-.38-40.322 0-60.491.083-2.395 2.181-4.525 4.61-4.599 12.722-.236 25.444-.074 38.167 0ZM31.06 19.131c-.38 0-.727.311-.743.695-.397 20.08 0 40.175 0 60.255 0 .385.314.725.694.74 12.672.413 25.345 0 38.017 0 .397 0 .727-.34.727-.74.017-20.065.017-40.145 0-60.21 0-.4-.314-.725-.694-.74-12.656-.414-25.328 0-38 0Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M46.842 22.597h6.4v6.4h-6.4z"
  })),
  show: false,
  id: 'mediumWidth'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Tablet & mobile', 'generateblocks-pro'),
  value: '@media (max-width:1024px)',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M42.284 22.603h6.4v6.4h-6.4zM63.082 45.178h4.8v4.8h-4.8z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M61.364 84.873c-11.663.184-23.333.168-34.996-.056-2.4-.072-4.528-2.183-4.6-4.6a1588.412 1588.412 0 0 1 0-60.489c.072-2.4 2.184-4.527 4.6-4.599 12.726-.24 25.453-.08 38.18 0 2.431.04 4.615 2.192 4.663 4.663.04 6.36.088 12.711.128 19.07 2.184.008 4.368.032 6.551.056 1.312.048 2.456 1.184 2.504 2.504.176 13.63.176 27.261 0 40.892-.048 1.32-1.176 2.455-2.504 2.503-4.839.064-9.678.08-14.526.056Zm3.104-65.744H26.504c-.4 0-.728.336-.736.711-.112 20.078 0 40.164 0 60.242 0 .368.32.72.688.736 8.703.28 17.398.176 26.101.088a1665.8 1665.8 0 0 1 .016-39.484c.056-1.32 1.184-2.456 2.504-2.504 3.423-.04 6.839-.064 10.255-.064a1880.03 1880.03 0 0 1-.12-18.99.751.751 0 0 0-.744-.735Zm9.927 23.789H56.573v37.9h17.822v-37.9Z"
  })),
  show: true,
  id: 'mediumSmallWidth'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Mobile', 'generateblocks-pro'),
  value: '@media (max-width:767px)',
  icon: () => (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M62.043 23.435c1.52.056 2.841 1.364 2.893 2.897.208 15.781.208 31.563 0 47.333-.052 1.533-1.363 2.84-2.893 2.897-8.025.101-16.06.101-24.085 0-1.53-.056-2.84-1.364-2.903-2.897-.198-15.77-.198-31.552 0-47.333.062-1.522 1.363-2.84 2.903-2.897 8.025-.102 16.06-.102 24.085 0Zm-22.357 4.633V71.94h20.629V28.068H39.686Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M47.22 30.36h5.556v5.557h-5.555z"
  })),
  show: true,
  id: 'smallWidth'
}]);
;// CONCATENATED MODULE: ./src/components/StylesBuilder/BuildAtRule.jsx






function BuildAtRule({
  editAtRule = '',
  setShowBuildAtRule,
  allStyles,
  onAtRuleChange,
  setTempAtRule,
  onUpdateKey,
  defaultAtRules,
  setShowAtRuleOptions,
  setEditAtRule,
  nestedRule
}) {
  const [atRule, setAtRule] = (0,external_wp_element_namespaceObject.useState)('');
  const [errorMessage, setErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    setAtRule(editAtRule || '');
  }, []);
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.options
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    label: (0,external_wp_i18n_namespaceObject.__)('At-Rule', 'generateblocks-pro'),
    className: editor_module.build,
    id: "class-selector"
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TextControl, {
    id: "class-selector",
    value: atRule,
    onChange: value => {
      setErrorMessage('');
      setAtRule(value);
    },
    onBlur: () => {
      if (!atRule) {
        return;
      }
      const allowedStarts = ['@media', '@supports', '@container'];
      if (!allowedStarts.some(start => atRule.startsWith(start))) {
        setErrorMessage((0,external_wp_i18n_namespaceObject.__)('Invalid at-rule.', 'generateblocks-pro'));
        return;
      }
      setAtRule(normalizeAtRule(atRule));
    }
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.list
  }, defaultAtRules.filter(item => item.value).map(option => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    key: option.value,
    size: "small",
    onClick: () => {
      const value = option.value === atRule ? '' : option.value;
      setAtRule(value);
    },
    isPressed: option.value === atRule
  }, option.label)))), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "tertiary",
    onClick: () => {
      setShowBuildAtRule(false);
      setEditAtRule('');
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), !editAtRule && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    disabled: !atRule || errorMessage,
    onClick: () => {
      const currentStyles = nestedRule ? allStyles?.[nestedRule] : allStyles;
      if (currentStyles[atRule]) {
        setErrorMessage((0,external_wp_i18n_namespaceObject.__)('At-rule already exists.', 'generateblocks-pro'));
        return;
      }
      onAtRuleChange(atRule);
      setTempAtRule(atRule);
      setShowBuildAtRule(false);
      setShowAtRuleOptions(false);
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Create', 'generateblocks-pro')), !!editAtRule && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    disabled: !atRule || editAtRule === atRule,
    onClick: () => {
      const currentStyles = nestedRule ? allStyles?.[nestedRule] : allStyles;
      if (currentStyles[atRule]) {
        setErrorMessage((0,external_wp_i18n_namespaceObject.__)('At-rule already exists.', 'generateblocks-pro'));
        return;
      }
      onUpdateKey(editAtRule, atRule, currentStyles);
      onAtRuleChange(atRule);
      setTempAtRule(atRule);
      setShowBuildAtRule(false);
      setShowAtRuleOptions(false);
      setEditAtRule('');
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Update', 'generateblocks-pro'))), !!errorMessage && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    status: "error",
    isDismissible: false,
    style: editor_module.notice
  }, errorMessage));
}
;// CONCATENATED MODULE: ./src/components/StylesBuilder/AtRules.jsx








function AtRules({
  atRule,
  onAtRuleChange,
  onNestedRuleChange,
  defaultAtRules,
  allStyles,
  showAtRuleOptions,
  setShowAtRuleOptions,
  onUpdateKey,
  nestedRule,
  onDeleteStyle,
  allowCustomAtRule
}) {
  const [tempAtRules, setTempAtRules] = (0,external_wp_element_namespaceObject.useState)([]);
  const [showBuildAtRule, setShowBuildAtRule] = (0,external_wp_element_namespaceObject.useState)(false);
  const [editAtRule, setEditAtRule] = (0,external_wp_element_namespaceObject.useState)('');
  const shouldShowRule = (0,external_wp_element_namespaceObject.useCallback)(rule => {
    var _allStyles$rule$value;
    return rule.show || !!rule.icon && (Object.keys((_allStyles$rule$value = allStyles?.[rule.value]) !== null && _allStyles$rule$value !== void 0 ? _allStyles$rule$value : {})?.length > 0 || rule.value === atRule);
  }, [allStyles, atRule]);
  function setTempAtRule(atRuleValue) {
    setTempAtRules([...tempAtRules, atRuleValue]);
  }
  const activeAtRules = (0,external_wp_element_namespaceObject.useMemo)(() => {
    var _allStyles$nestedRule;
    const newActiveAtRules = [];
    defaultAtRules.forEach(item => {
      if (!item.value) {
        return;
      }
      newActiveAtRules.push(item.value);
    });
    const currentStyles = nestedRule ? (_allStyles$nestedRule = allStyles?.[nestedRule]) !== null && _allStyles$nestedRule !== void 0 ? _allStyles$nestedRule : {} : allStyles;
    Object.keys(currentStyles)?.forEach(key => {
      if (key.startsWith('@') && !newActiveAtRules.includes(key)) {
        newActiveAtRules.push(key);
      }
    });
    tempAtRules.forEach(tempAtRule => {
      if (!newActiveAtRules.includes(tempAtRule)) {
        newActiveAtRules.push(tempAtRule);
      }
    });
    return Array.from(new Set(newActiveAtRules));
  }, [allStyles, tempAtRules]);

  // Check if the current at-rule is visible.
  const isAtRuleVisible = defaultAtRules.some(rule => rule.value === atRule);
  return (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.atRules
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.ButtonGroup, null, defaultAtRules.map(rule => {
    if (!shouldShowRule(rule)) {
      return null;
    }
    return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      key: rule.label,
      onClick: () => {
        if (rule.value === atRule) {
          return;
        }
        onAtRuleChange(rule.value);
        setShowAtRuleOptions(false);
      },
      isPressed: rule.value === atRule,
      icon: rule.icon,
      label: rule.label,
      size: "compact"
    });
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    onClick: () => setShowAtRuleOptions(!showAtRuleOptions),
    isPressed: showAtRuleOptions || !isAtRuleVisible,
    icon: library_settings,
    label: showAtRuleOptions ? (0,external_wp_i18n_namespaceObject.__)('Hide at-rule options', 'generateblocks-pro') : (0,external_wp_i18n_namespaceObject.__)('Show at-rule options', 'generateblocks-pro'),
    size: "compact",
    iconSize: "18"
  })), !!atRule && (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.preview
  }, atRule), showAtRuleOptions && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, !showBuildAtRule && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(ActiveAtRules, {
    atRule: atRule,
    onAtRuleChange: onAtRuleChange,
    onNestedRuleChange: onNestedRuleChange,
    allStyles: allStyles,
    setShowAtRuleOptions: setShowAtRuleOptions,
    defaultAtRules: defaultAtRules,
    activeAtRules: activeAtRules,
    showBuildAtRule: showBuildAtRule,
    setShowBuildAtRule: setShowBuildAtRule,
    editAtRule: editAtRule,
    setEditAtRule: setEditAtRule,
    nestedRule: nestedRule,
    onDeleteStyle: onDeleteStyle,
    allowCustomAtRule: allowCustomAtRule
  }), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "tertiary",
    size: "compact",
    onClick: () => setShowAtRuleOptions(false)
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), !!allowCustomAtRule && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    size: "compact",
    showTooltip: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Add a new custom at-rule', 'generateblocks-pro'),
    icon: library_plus,
    onClick: () => {
      setShowBuildAtRule(true);
    }
  }, (0,external_wp_i18n_namespaceObject.__)('New', 'generateblocks-pro')))), !!showBuildAtRule && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    className: editor_module.notice,
    isDismissible: false
  }, !!editAtRule ? (0,external_wp_i18n_namespaceObject.sprintf)(
  // translators: %s: selector name.
  (0,external_wp_i18n_namespaceObject.__)('You are editing an at-rule: %s', 'generateblocks-pro'), editAtRule) : (0,external_wp_i18n_namespaceObject.__)('You are creating a new custom at-rule.', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(BuildAtRule, {
    editAtRule: editAtRule,
    setShowBuildAtRule: setShowBuildAtRule,
    allStyles: allStyles,
    onAtRuleChange: onAtRuleChange,
    setTempAtRule: setTempAtRule,
    onUpdateKey: onUpdateKey,
    defaultAtRules: defaultAtRules,
    setShowAtRuleOptions: setShowAtRuleOptions,
    setEditAtRule: setEditAtRule
  }))));
}
;// CONCATENATED MODULE: external ["gb","components"]
const external_gb_components_namespaceObject = window["gb"]["components"];
;// CONCATENATED MODULE: ./src/components/StylesBuilder/BuildSelector.jsx






function BuildSelector({
  editSelector = '',
  setShowBuildSelector,
  allStyles,
  onNestedRuleChange,
  setTempSelector,
  onUpdateKey,
  selectorShortcuts,
  setShowSelectorOptions,
  setEditSelector
}) {
  const [compoundSelector, setCompoundSelector] = (0,external_wp_element_namespaceObject.useState)(false);
  const [selector, setSelector] = (0,external_wp_element_namespaceObject.useState)('');
  const [errorMessage, setErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    setSelector(editSelector || '');
  }, []);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (selector.startsWith('&') && !compoundSelector) {
      setCompoundSelector(true);
    } else if (!selector.startsWith('&') && compoundSelector) {
      setCompoundSelector(false);
    }
    if (!selectorIsCompoundable) {
      setCompoundSelector(false);
    }
  }, [selector]);
  const selectorIsCompoundable = (0,external_wp_element_namespaceObject.useMemo)(() => {
    const selectorWithoutCompound = selector.replace('&', '');
    const compoundableSelectorCharacters = [':', '.', '#', '['];
    return '' === selector || '&' === selector || compoundableSelectorCharacters.some(char => selectorWithoutCompound.startsWith(char));
  }, [selector]);
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.options
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    label: (0,external_wp_i18n_namespaceObject.__)('Selector', 'generateblocks-pro'),
    className: "gb-styles-builder__selector-options--build",
    id: "class-selector"
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    className: editor_module.buildSelector,
    direction: "vertical",
    gap: "12px"
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TextControl, {
    id: "class-selector",
    value: selector,
    onChange: value => setSelector(value)
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.ToggleControl, {
    label: (0,external_wp_i18n_namespaceObject.__)('Compound selector', 'generateblocks-pro'),
    checked: !!compoundSelector,
    disabled: !selectorIsCompoundable,
    onChange: value => {
      if (value && !selector.startsWith('&')) {
        setSelector('&' + selector);
      }
      if (!value && selector.startsWith('&')) {
        setSelector(selector.replace('&', ''));
      }
    }
  }))), Object.entries(selectorShortcuts).map(([category, shortcut]) => {
    if ('default' === category) {
      return null;
    }
    return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
      key: shortcut?.label,
      label: shortcut?.label,
      id: ""
    }, (0,external_React_namespaceObject.createElement)("div", {
      className: editor_module.list
    }, shortcut?.items.map(option => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      key: option.value,
      size: "small",
      onClick: () => {
        const value = option.value === selector ? '' : option.value;
        setSelector(value);
      },
      isPressed: option.value === selector
    }, option.label))));
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "tertiary",
    onClick: () => {
      setShowBuildSelector(false);
      setEditSelector('');
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), !editSelector && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    disabled: !selector || '&' === selector,
    onClick: () => {
      if (allStyles[selector]) {
        setErrorMessage((0,external_wp_i18n_namespaceObject.__)('Selector already exists.', 'generateblocks-pro'));
        return;
      }
      onNestedRuleChange(selector);
      setTempSelector(selector);
      setShowBuildSelector(false);
      setShowSelectorOptions(false);
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Create', 'generateblocks-pro')), !!editSelector && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    disabled: !selector || '&' === selector || editSelector === selector,
    onClick: () => {
      if (allStyles[selector]) {
        setErrorMessage((0,external_wp_i18n_namespaceObject.__)('Selector already exists.', 'generateblocks-pro'));
        return;
      }
      onUpdateKey(editSelector, selector);
      onNestedRuleChange(selector);
      setTempSelector(selector);
      setShowBuildSelector(false);
      setShowSelectorOptions(false);
      setEditSelector('');
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Update', 'generateblocks-pro'))), !!errorMessage && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    status: "error",
    isDismissible: false,
    className: editor_module.notice
  }, errorMessage));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/icon/index.js
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,external_wp_element_namespaceObject.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const icon = ((0,external_wp_element_namespaceObject.forwardRef)(Icon));
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/check.js

/**
 * WordPress dependencies
 */

const check = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
}));
/* harmony default export */ const library_check = (check);
//# sourceMappingURL=check.js.map
;// CONCATENATED MODULE: ./node_modules/clsx/dist/clsx.mjs
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const dist_clsx = (clsx);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  return extends_extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, extends_extends.apply(null, arguments);
}

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __nested_webpack_require_290554__(5556);
var prop_types_default = /*#__PURE__*/__nested_webpack_require_290554__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __nested_webpack_require_290554__(4363);
;// CONCATENATED MODULE: ./node_modules/compute-scroll-into-view/dist/index.js
const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e(o.overflowY,n)||e(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return!1},o=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},dist_r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return[];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&p(W);){if(W=l(W),W===m){w.push(W);break}null!=W&&W===document.body&&n(W)&&!n(document.documentElement)||null!=W&&n(W,g)&&w.push(W)}const b=null!=(s=null==(i=window.visualViewport)?void 0:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?void 0:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return{top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:n,width:l,top:r,right:i,bottom:s,left:d}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&x>=r&&I<=s&&R>=d&&C<=i)return L;const h=getComputedStyle(e),a=parseInt(h.borderLeftWidth,10),g=parseInt(h.borderTopWidth,10),p=parseInt(h.borderRightWidth,10),W=parseInt(h.borderBottomWidth,10);let T=0,B=0;const F="offsetWidth"in e?e.offsetWidth-e.clientWidth-a-p:0,V="offsetHeight"in e?e.offsetHeight-e.clientHeight-g-W:0,S="offsetWidth"in e?0===e.offsetWidth?0:l/e.offsetWidth:0,X="offsetHeight"in e?0===e.offsetHeight?0:n/e.offsetHeight:0;if(m===e)T="start"===f?k:"end"===f?k-H:"nearest"===f?o(M,M+H,H,g,W,M+k,M+k+v,v):k-H/2,B="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:o(y,y+b,b,a,p,y+D,y+D+E,E),T=Math.max(0,T+M),B=Math.max(0,B+y);else{T="start"===f?k-r-g:"end"===f?k-s+W+V:"nearest"===f?o(r,s,n,g,W+V,k,k+v,v):k-(r+n/2)+V/2,B="start"===u?D-d-a:"center"===u?D-(d+l/2)+F/2:"end"===u?D-i+p+F:o(d,i,l,a,p+F,D,D+E,E);const{scrollLeft:t,scrollTop:h}=e;T=0===X?0:Math.max(0,Math.min(h+T/X,e.scrollHeight-n/X+V)),B=0===S?0:Math.max(0,Math.min(t+B/S,e.scrollWidth-l/S+F)),k+=h-T,D+=t-B}L.push({el:e,top:T,left:B})}return L};//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const tslib_es6 = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});

;// CONCATENATED MODULE: ./node_modules/downshift/dist/downshift.esm.js









var idCounter = 0;

/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @param {Function} cb the callback
 * @return {Function} a function
 */
function cbToCb(cb) {
  return typeof cb === 'function' ? cb : noop;
}
function noop() {}

/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} menuNode the menu element of the component
 */
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = dist_r(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
  actions.forEach(function (_ref) {
    var el = _ref.el,
      top = _ref.top,
      left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}

/**
 * @param {HTMLElement} parent the parent node
 * @param {HTMLElement} child the child node
 * @param {Window} environment The window context where downshift renders.
 * @return {Boolean} whether the parent is the child or the child is in the parent
 */
function isOrContainsNode(parent, child, environment) {
  var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}

/**
 * Simple debounce implementation. Will call the given
 * function once after the time given has passed since
 * it was last called.
 * @param {Function} fn the function to call after the time
 * @param {Number} time the time to wait
 * @return {Function} the debounced function
 */
function debounce(fn, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function () {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}

/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function (fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return event.preventDownshiftDefault || event.hasOwnProperty('nativeEvent') && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return function (node) {
    refs.forEach(function (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
function generateId() {
  return String(idCounter++);
}

/**
 * Resets idCounter to 0. Used for SSR.
 */
function resetIdCounter() {
  // istanbul ignore next
  if ('useId' in React) {
    console.warn("It is not necessary to call resetIdCounter when using React 18+");
    return;
  }
  idCounter = 0;
}

/**
 * Default implementation for status message. Only added when menu is open.
 * Will specify if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */
function getA11yStatusMessage(_ref2) {
  var isOpen = _ref2.isOpen,
    resultCount = _ref2.resultCount,
    previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return '';
  }
  if (!resultCount) {
    return 'No results are available.';
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? ' is' : 's are') + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }
  return '';
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}

/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */
function isDOMElement(element) {

  // then we assume this is react
  return typeof element.type === 'string';
}

/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */
function getElementProps(element) {
  return element.props;
}

/**
 * Throws a helpful error message for required properties. Useful
 * to be used as a default in destructuring or object params.
 * @param {String} fnName the function name
 * @param {String} propName the prop name
 */
function requiredProp(fnName, propName) {
  // eslint-disable-next-line no-console
  console.error("The property \"" + propName + "\" is required in \"" + fnName + "\"");
}
var stateKeys = (/* unused pure expression or super */ null && (0));
/**
 * @param {Object} state the state object
 * @return {Object} state that is relevant to downshift
 */
function pickState(state) {
  if (state === void 0) {
    state = {};
  }
  var result = {};
  stateKeys.forEach(function (k) {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}

/**
 * This will perform a shallow merge of the given state object
 * with the state coming from props
 * (for the controlled component scenario)
 * This is used in state updater functions so they're referencing
 * the right state regardless of where it comes from.
 *
 * @param {Object} state The state of the component/hook.
 * @param {Object} props The props that may contain controlled values.
 * @returns {Object} The merged controlled state.
 */
function getState(state, props) {
  if (!state || !props) {
    return state;
  }
  return Object.keys(state).reduce(function (prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}

/**
 * This determines whether a prop is a "controlled prop" meaning it is
 * state which is controlled by the outside of this component rather
 * than within this component.
 *
 * @param {Object} props The props that may contain controlled values.
 * @param {String} key the key to check
 * @return {Boolean} whether it is a controlled controlled prop
 */
function isControlledProp(props, key) {
  return props[key] !== undefined;
}

/**
 * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
 * @param {Object} event a keyboardEvent object
 * @return {String} keyboard key
 */
function normalizeArrowKey(event) {
  var key = event.key,
    keyCode = event.keyCode;
  /* istanbul ignore next (ie) */
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return "Arrow" + key;
  }
  return key;
}

/**
 * Simple check if the value passed is object literal
 * @param {*} obj any things
 * @return {Boolean} whether it's object literal
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Returns the next non-disabled highlightedIndex value.
 *
 * @param {number} start The current highlightedIndex.
 * @param {number} offset The offset from the current highlightedIndex to start searching.
 * @param {unknown[]} items The items array.
 * @param {(item: unknown, index: number) => boolean} isItemDisabled Function that tells if an item is disabled or not.
 * @param {boolean?} circular If the search reaches the end, if it can search again starting from the other end.
 * @returns {number} The next highlightedIndex.
 */
function getHighlightedIndex(start, offset, items, isItemDisabled, circular) {
  if (circular === void 0) {
    circular = false;
  }
  var count = items.length;
  if (count === 0) {
    return -1;
  }
  var itemsLastIndex = count - 1;
  if (typeof start !== 'number' || start < 0 || start > itemsLastIndex) {
    start = offset > 0 ? -1 : itemsLastIndex + 1;
  }
  var current = start + offset;
  if (current < 0) {
    current = circular ? itemsLastIndex : 0;
  } else if (current > itemsLastIndex) {
    current = circular ? 0 : itemsLastIndex;
  }
  var highlightedIndex = getNonDisabledIndex(current, offset < 0, items, isItemDisabled, circular);
  if (highlightedIndex === -1) {
    return start >= count ? -1 : start;
  }
  return highlightedIndex;
}

/**
 * Returns the next non-disabled highlightedIndex value.
 *
 * @param {number} start The current highlightedIndex.
 * @param {boolean} backwards If true, it will search backwards from the start.
 * @param {unknown[]} items The items array.
 * @param {(item: unknown, index: number) => boolean} isItemDisabled Function that tells if an item is disabled or not.
 * @param {boolean} circular If the search reaches the end, if it can search again starting from the other end.
 * @returns {number} The next non-disabled index.
 */
function getNonDisabledIndex(start, backwards, items, isItemDisabled, circular) {
  if (circular === void 0) {
    circular = false;
  }
  var count = items.length;
  if (backwards) {
    for (var index = start; index >= 0; index--) {
      if (!isItemDisabled(items[index], index)) {
        return index;
      }
    }
  } else {
    for (var _index = start; _index < count; _index++) {
      if (!isItemDisabled(items[_index], _index)) {
        return _index;
      }
    }
  }
  if (circular) {
    return getNonDisabledIndex(backwards ? count - 1 : 0, backwards, items, isItemDisabled);
  }
  return -1;
}

/**
 * Checks if event target is within the downshift elements.
 *
 * @param {EventTarget} target Target to check.
 * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
 * @param {Window} environment The window context where downshift renders.
 * @param {boolean} checkActiveElement Whether to also check activeElement.
 *
 * @returns {boolean} Whether or not the target is within downshift elements.
 */
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return environment && downshiftElements.some(function (contextNode) {
    return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
  });
}

// eslint-disable-next-line import/no-mutable-exports
var validateControlledUnchanged = (/* unused pure expression or super */ null && (0));
/* istanbul ignore next */
if (false) {}

var cleanupStatus = debounce(function (documentProp) {
  getStatusDiv(documentProp).textContent = '';
}, 500);

/**
 * Get the status node or create it if it does not already exist.
 * @param {Object} documentProp document passed by the user.
 * @return {HTMLElement} the status node.
 */
function getStatusDiv(documentProp) {
  var statusDiv = documentProp.getElementById('a11y-status-message');
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement('div');
  statusDiv.setAttribute('id', 'a11y-status-message');
  statusDiv.setAttribute('role', 'status');
  statusDiv.setAttribute('aria-live', 'polite');
  statusDiv.setAttribute('aria-relevant', 'additions text');
  Object.assign(statusDiv.style, {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px'
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}

/**
 * @param {String} status the status message
 * @param {Object} documentProp document passed by the user.
 */
function setStatus(status, documentProp) {
  if (!status || !documentProp) {
    return;
  }
  var div = getStatusDiv(documentProp);
  div.textContent = status;
  cleanupStatus(documentProp);
}

/**
 * Removes the status element from the DOM
 * @param {Document} documentProp 
 */
function cleanupStatusDiv(documentProp) {
  var statusDiv = documentProp == null ? void 0 : documentProp.getElementById('a11y-status-message');
  if (statusDiv) {
    statusDiv.remove();
  }
}

var unknown =   false ? 0 : 0;
var mouseUp =   false ? 0 : 1;
var itemMouseEnter =   false ? 0 : 2;
var keyDownArrowUp =   false ? 0 : 3;
var keyDownArrowDown =   false ? 0 : 4;
var keyDownEscape =   false ? 0 : 5;
var keyDownEnter =   false ? 0 : 6;
var keyDownHome =   false ? 0 : 7;
var keyDownEnd =   false ? 0 : 8;
var clickItem =   false ? 0 : 9;
var blurInput =   false ? 0 : 10;
var changeInput =   false ? 0 : 11;
var keyDownSpaceButton =   false ? 0 : 12;
var clickButton =   false ? 0 : 13;
var blurButton =   false ? 0 : 14;
var controlledPropUpdatedSelectedItem =   false ? 0 : 15;
var touchEnd =   false ? 0 : 16;

var stateChangeTypes$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  blurButton: blurButton,
  blurInput: blurInput,
  changeInput: changeInput,
  clickButton: clickButton,
  clickItem: clickItem,
  controlledPropUpdatedSelectedItem: controlledPropUpdatedSelectedItem,
  itemMouseEnter: itemMouseEnter,
  keyDownArrowDown: keyDownArrowDown,
  keyDownArrowUp: keyDownArrowUp,
  keyDownEnd: keyDownEnd,
  keyDownEnter: keyDownEnter,
  keyDownEscape: keyDownEscape,
  keyDownHome: keyDownHome,
  keyDownSpaceButton: keyDownSpaceButton,
  mouseUp: mouseUp,
  touchEnd: touchEnd,
  unknown: unknown
});

var _excluded$3 = (/* unused pure expression or super */ null && (0)),
  _excluded2$3 = (/* unused pure expression or super */ null && (0)),
  _excluded3$2 = (/* unused pure expression or super */ null && (0)),
  _excluded4$2 = (/* unused pure expression or super */ null && (0)),
  _excluded5 = (/* unused pure expression or super */ null && (0));
var Downshift = /*#__PURE__*/(/* unused pure expression or super */ null && (0));
  false ? 0 : void 0;
var Downshift$1 = (/* unused pure expression or super */ null && (0));
function validateGetMenuPropsCalledCorrectly(node, _ref12) {
  var refKey = _ref12.refKey;
  if (!node) {
    // eslint-disable-next-line no-console
    console.error("downshift: The ref prop \"" + refKey + "\" from getMenuProps was not applied correctly on your menu element.");
  }
}
function validateGetRootPropsCalledCorrectly(element, _ref13) {
  var refKey = _ref13.refKey;
  var refKeySpecified = refKey !== 'ref';
  var isComposite = !isDOMElement(element);
  if (isComposite && !refKeySpecified && !isForwardRef(element)) {
    // eslint-disable-next-line no-console
    console.error('downshift: You returned a non-DOM element. You must specify a refKey in getRootProps');
  } else if (!isComposite && refKeySpecified) {
    // eslint-disable-next-line no-console
    console.error("downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified \"" + refKey + "\"");
  }
  if (!isForwardRef(element) && !getElementProps(element)[refKey]) {
    // eslint-disable-next-line no-console
    console.error("downshift: You must apply the ref prop \"" + refKey + "\" from getRootProps onto your root element.");
  }
}

var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ''
};
function callOnChangeProps(action, state, newState) {
  var props = action.props,
    type = action.type;
  var changes = {};
  Object.keys(state).forEach(function (key) {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange(extends_extends({
      type: type
    }, changes));
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  var props = action.props,
    type = action.type;
  var handler = "on" + capitalizeString(key) + "Change";
  if (props[handler] && newState[key] !== undefined && newState[key] !== state[key]) {
    props[handler](extends_extends({
      type: type
    }, newState));
  }
}

/**
 * Default state reducer that returns the changes.
 *
 * @param {Object} s state.
 * @param {Object} a action with changes.
 * @returns {Object} changes.
 */
function stateReducer(s, a) {
  return a.changes;
}

/**
 * Debounced call for updating the a11y message.
 */
var updateA11yStatus = debounce(function (status, document) {
  setStatus(status, document);
}, 200);

// istanbul ignore next
var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? external_React_namespaceObject.useLayoutEffect : external_React_namespaceObject.useEffect;

// istanbul ignore next
var useElementIds = "useId" in (external_React_default()) // Avoid conditional useId call
? function useElementIds(_ref) {
  var id = _ref.id,
    labelId = _ref.labelId,
    menuId = _ref.menuId,
    getItemId = _ref.getItemId,
    toggleButtonId = _ref.toggleButtonId,
    inputId = _ref.inputId;
  // Avoid conditional useId call
  var reactId = "downshift-" + external_React_default().useId();
  if (!id) {
    id = reactId;
  }
  var elementIdsRef = (0,external_React_namespaceObject.useRef)({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId: getItemId || function (index) {
      return id + "-item-" + index;
    },
    toggleButtonId: toggleButtonId || id + "-toggle-button",
    inputId: inputId || id + "-input"
  });
  return elementIdsRef.current;
} : function useElementIds(_ref2) {
  var _ref2$id = _ref2.id,
    id = _ref2$id === void 0 ? "downshift-" + generateId() : _ref2$id,
    labelId = _ref2.labelId,
    menuId = _ref2.menuId,
    getItemId = _ref2.getItemId,
    toggleButtonId = _ref2.toggleButtonId,
    inputId = _ref2.inputId;
  var elementIdsRef = (0,external_React_namespaceObject.useRef)({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId: getItemId || function (index) {
      return id + "-item-" + index;
    },
    toggleButtonId: toggleButtonId || id + "-toggle-button",
    inputId: inputId || id + "-input"
  });
  return elementIdsRef.current;
};
function getItemAndIndex(itemProp, indexProp, items, errorMessage) {
  var item, index;
  if (itemProp === undefined) {
    if (indexProp === undefined) {
      throw new Error(errorMessage);
    }
    item = items[indexProp];
    index = indexProp;
  } else {
    index = indexProp === undefined ? items.indexOf(itemProp) : indexProp;
    item = itemProp;
  }
  return [item, index];
}
function isAcceptedCharacterKey(key) {
  return /^\S{1}$/.test(key);
}
function capitalizeString(string) {
  return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function useLatestRef(val) {
  var ref = (0,external_React_namespaceObject.useRef)(val);
  // technically this is not "concurrent mode safe" because we're manipulating
  // the value during render (so it's not idempotent). However, the places this
  // hook is used is to support memoizing callbacks which will be called
  // *during* render, so we need the latest values *during* render.
  // If not for this, then we'd probably want to use useLayoutEffect instead.
  ref.current = val;
  return ref;
}

/**
 * Computes the controlled state using a the previous state, props,
 * two reducers, one from downshift and an optional one from the user.
 * Also calls the onChange handlers for state values that have changed.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} props The hook props, also passed to createInitialState.
 * @param {Function} createInitialState Function that returns the initial state.
 * @param {Function} isStateEqual Function that checks if a previous state is equal to the next.
 * @returns {Array} An array with the state and an action dispatcher.
 */
function useEnhancedReducer(reducer, props, createInitialState, isStateEqual) {
  var prevStateRef = (0,external_React_namespaceObject.useRef)();
  var actionRef = (0,external_React_namespaceObject.useRef)();
  var enhancedReducer = (0,external_React_namespaceObject.useCallback)(function (state, action) {
    actionRef.current = action;
    state = getState(state, action.props);
    var changes = reducer(state, action);
    var newState = action.props.stateReducer(state, extends_extends({}, action, {
      changes: changes
    }));
    return newState;
  }, [reducer]);
  var _useReducer = (0,external_React_namespaceObject.useReducer)(enhancedReducer, props, createInitialState),
    state = _useReducer[0],
    dispatch = _useReducer[1];
  var propsRef = useLatestRef(props);
  var dispatchWithProps = (0,external_React_namespaceObject.useCallback)(function (action) {
    return dispatch(extends_extends({
      props: propsRef.current
    }, action));
  }, [propsRef]);
  var action = actionRef.current;
  (0,external_React_namespaceObject.useEffect)(function () {
    var prevState = getState(prevStateRef.current, action == null ? void 0 : action.props);
    var shouldCallOnChangeProps = action && prevStateRef.current && !isStateEqual(prevState, state);
    if (shouldCallOnChangeProps) {
      callOnChangeProps(action, prevState, state);
    }
    prevStateRef.current = state;
  }, [state, action, isStateEqual]);
  return [state, dispatchWithProps];
}

/**
 * Wraps the useEnhancedReducer and applies the controlled prop values before
 * returning the new state.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} props The hook props, also passed to createInitialState.
 * @param {Function} createInitialState Function that returns the initial state.
 * @param {Function} isStateEqual Function that checks if a previous state is equal to the next.
 * @returns {Array} An array with the state and an action dispatcher.
 */
function useControlledReducer$1(reducer, props, createInitialState, isStateEqual) {
  var _useEnhancedReducer = useEnhancedReducer(reducer, props, createInitialState, isStateEqual),
    state = _useEnhancedReducer[0],
    dispatch = _useEnhancedReducer[1];
  return [getState(state, props), dispatch];
}
var defaultProps$3 = {
  itemToString: function itemToString(item) {
    return item ? String(item) : '';
  },
  itemToKey: function itemToKey(item) {
    return item;
  },
  stateReducer: stateReducer,
  scrollIntoView: scrollIntoView,
  environment: /* istanbul ignore next (ssr) */
  typeof window === 'undefined' || false ? undefined : window
};
function getDefaultValue$1(props, propKey, defaultStateValues) {
  if (defaultStateValues === void 0) {
    defaultStateValues = dropdownDefaultStateValues;
  }
  var defaultValue = props["default" + capitalizeString(propKey)];
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  return defaultStateValues[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues) {
  if (defaultStateValues === void 0) {
    defaultStateValues = dropdownDefaultStateValues;
  }
  var value = props[propKey];
  if (value !== undefined) {
    return value;
  }
  var initialValue = props["initial" + capitalizeString(propKey)];
  if (initialValue !== undefined) {
    return initialValue;
  }
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState$2(props) {
  var selectedItem = getInitialValue$1(props, 'selectedItem');
  var isOpen = getInitialValue$1(props, 'isOpen');
  var highlightedIndex = getInitialHighlightedIndex(props);
  var inputValue = getInitialValue$1(props, 'inputValue');
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.findIndex(function (item) {
      return props.itemToKey(item) === props.itemToKey(selectedItem);
    }) : highlightedIndex,
    isOpen: isOpen,
    selectedItem: selectedItem,
    inputValue: inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset) {
  var items = props.items,
    initialHighlightedIndex = props.initialHighlightedIndex,
    defaultHighlightedIndex = props.defaultHighlightedIndex,
    isItemDisabled = props.isItemDisabled,
    itemToKey = props.itemToKey;
  var selectedItem = state.selectedItem,
    highlightedIndex = state.highlightedIndex;
  if (items.length === 0) {
    return -1;
  }

  // initialHighlightedIndex will give value to highlightedIndex on initial state only.
  if (initialHighlightedIndex !== undefined && highlightedIndex === initialHighlightedIndex && !isItemDisabled(items[initialHighlightedIndex], initialHighlightedIndex)) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== undefined && !isItemDisabled(items[defaultHighlightedIndex], defaultHighlightedIndex)) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    return items.findIndex(function (item) {
      return itemToKey(selectedItem) === itemToKey(item);
    });
  }
  if (offset < 0 && !isItemDisabled(items[items.length - 1], items.length - 1)) {
    return items.length - 1;
  }
  if (offset > 0 && !isItemDisabled(items[0], 0)) {
    return 0;
  }
  return -1;
}
/**
 * Tracks mouse and touch events, such as mouseDown, touchMove and touchEnd.
 *
 * @param {Window} environment The environment to add the event listeners to, for instance window.
 * @param {() => void} handleBlur The function that is called if mouseDown or touchEnd occured outside the downshiftElements.
 * @param {Array<{current: HTMLElement}>} downshiftElementsRefs The refs for the elements that should not trigger a blur action from mouseDown or touchEnd.
 * @returns {{isMouseDown: boolean, isTouchMove: boolean, isTouchEnd: boolean}} The mouse and touch events information, if any of are happening.
 */
function useMouseAndTouchTracker(environment, handleBlur, downshiftElementsRefs) {
  var mouseAndTouchTrackersRef = (0,external_React_namespaceObject.useRef)({
    isMouseDown: false,
    isTouchMove: false,
    isTouchEnd: false
  });
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!environment) {
      return noop;
    }
    var downshiftElements = downshiftElementsRefs.map(function (ref) {
      return ref.current;
    });
    function onMouseDown() {
      mouseAndTouchTrackersRef.current.isTouchEnd = false; // reset this one.
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    }
    function onMouseUp(event) {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (!targetWithinDownshift(event.target, downshiftElements, environment)) {
        handleBlur();
      }
    }
    function onTouchStart() {
      mouseAndTouchTrackersRef.current.isTouchEnd = false;
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    }
    function onTouchMove() {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    }
    function onTouchEnd(event) {
      mouseAndTouchTrackersRef.current.isTouchEnd = true;
      if (!mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElements, environment, false)) {
        handleBlur();
      }
    }
    environment.addEventListener('mousedown', onMouseDown);
    environment.addEventListener('mouseup', onMouseUp);
    environment.addEventListener('touchstart', onTouchStart);
    environment.addEventListener('touchmove', onTouchMove);
    environment.addEventListener('touchend', onTouchEnd);
    return function cleanup() {
      environment.removeEventListener('mousedown', onMouseDown);
      environment.removeEventListener('mouseup', onMouseUp);
      environment.removeEventListener('touchstart', onTouchStart);
      environment.removeEventListener('touchmove', onTouchMove);
      environment.removeEventListener('touchend', onTouchEnd);
    };
  }, [downshiftElementsRefs, environment, handleBlur]);
  return mouseAndTouchTrackersRef.current;
}

/* istanbul ignore next */
// eslint-disable-next-line import/no-mutable-exports
var useGetterPropsCalledChecker = function useGetterPropsCalledChecker() {
  return noop;
};
/**
 * Custom hook that checks if getter props are called correctly.
 *
 * @param  {...any} propKeys Getter prop names to be handled.
 * @returns {Function} Setter function called inside getter props to set call information.
 */
/* istanbul ignore next */
if (false) {}

/**
 * Adds an a11y aria live status message if getA11yStatusMessage is passed.
 * @param {(options: Object) => string} getA11yStatusMessage The function that builds the status message.
 * @param {Object} options The options to be passed to getA11yStatusMessage if called.
 * @param {Array<unknown>} dependencyArray The dependency array that triggers the status message setter via useEffect.
 * @param {{document: Document}} environment The environment object containing the document.
 */
function useA11yMessageStatus(getA11yStatusMessage, options, dependencyArray, environment) {
  if (environment === void 0) {
    environment = {};
  }
  var document = environment.document;
  var isInitialMount = useIsInitialMount();

  // Adds an a11y aria live status message if getA11yStatusMessage is passed.
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!getA11yStatusMessage || isInitialMount || false || !document) {
      return;
    }
    var status = getA11yStatusMessage(options);
    updateA11yStatus(status, document);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyArray);

  // Cleanup the status message container.
  (0,external_React_namespaceObject.useEffect)(function () {
    return function () {
      updateA11yStatus.cancel();
      cleanupStatusDiv(document);
    };
  }, [document]);
}
function useScrollIntoView(_ref3) {
  var highlightedIndex = _ref3.highlightedIndex,
    isOpen = _ref3.isOpen,
    itemRefs = _ref3.itemRefs,
    getItemNodeFromIndex = _ref3.getItemNodeFromIndex,
    menuElement = _ref3.menuElement,
    scrollIntoViewProp = _ref3.scrollIntoView;
  // used not to scroll on highlight by mouse.
  var shouldScrollRef = (0,external_React_namespaceObject.useRef)(true);
  // Scroll on highlighted item if change comes from keyboard.
  useIsomorphicLayoutEffect(function () {
    if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedIndex]);
  return shouldScrollRef;
}

// eslint-disable-next-line import/no-mutable-exports
var useControlPropsValidator = noop;
/* istanbul ignore next */
if (false) {}

/**
 * Handles selection on Enter / Alt + ArrowUp. Closes the menu and resets the highlighted index, unless there is a highlighted.
 * In that case, selects the item and resets to defaults for open state and highlighted idex.
 * @param {Object} props The useCombobox props.
 * @param {number} highlightedIndex The index from the state.
 * @param {boolean} inputValue Also return the input value for state.
 * @returns The changes for the state.
 */
function getChangesOnSelection(props, highlightedIndex, inputValue) {
  var _props$items;
  if (inputValue === void 0) {
    inputValue = true;
  }
  var shouldSelect = ((_props$items = props.items) == null ? void 0 : _props$items.length) && highlightedIndex >= 0;
  return extends_extends({
    isOpen: false,
    highlightedIndex: -1
  }, shouldSelect && extends_extends({
    selectedItem: props.items[highlightedIndex],
    isOpen: getDefaultValue$1(props, 'isOpen'),
    highlightedIndex: getDefaultValue$1(props, 'highlightedIndex')
  }, inputValue && {
    inputValue: props.itemToString(props.items[highlightedIndex])
  }));
}

/**
 * Check if a state is equal for dropdowns, by comparing isOpen, inputValue, highlightedIndex and selected item.
 * Used by useSelect and useCombobox.
 *
 * @param {Object} prevState
 * @param {Object} newState
 * @returns {boolean} Wheather the states are deeply equal.
 */
function isDropdownsStateEqual(prevState, newState) {
  return prevState.isOpen === newState.isOpen && prevState.inputValue === newState.inputValue && prevState.highlightedIndex === newState.highlightedIndex && prevState.selectedItem === newState.selectedItem;
}

/**
 * Tracks if it's the first render.
 */
function useIsInitialMount() {
  var isInitialMountRef = external_React_default().useRef(true);
  external_React_default().useEffect(function () {
    isInitialMountRef.current = false;
    return function () {
      isInitialMountRef.current = true;
    };
  }, []);
  return isInitialMountRef.current;
}

/**
 * Returns the new highlightedIndex based on the defaultHighlightedIndex prop, if it's not disabled.
 *
 * @param {Object} props Props from useCombobox or useSelect.
 * @returns {number} The highlighted index.
 */
function getDefaultHighlightedIndex(props) {
  var highlightedIndex = getDefaultValue$1(props, 'highlightedIndex');
  if (highlightedIndex > -1 && props.isItemDisabled(props.items[highlightedIndex], highlightedIndex)) {
    return -1;
  }
  return highlightedIndex;
}

/**
 * Returns the new highlightedIndex based on the initialHighlightedIndex prop, if not disabled.
 *
 * @param {Object} props Props from useCombobox or useSelect.
 * @returns {number} The highlighted index.
 */
function getInitialHighlightedIndex(props) {
  var highlightedIndex = getInitialValue$1(props, 'highlightedIndex');
  if (highlightedIndex > -1 && props.isItemDisabled(props.items[highlightedIndex], highlightedIndex)) {
    return -1;
  }
  return highlightedIndex;
}

// Shared between all exports.
var commonPropTypes = {
  environment: prop_types_default().shape({
    addEventListener: (prop_types_default()).func.isRequired,
    removeEventListener: (prop_types_default()).func.isRequired,
    document: prop_types_default().shape({
      createElement: (prop_types_default()).func.isRequired,
      getElementById: (prop_types_default()).func.isRequired,
      activeElement: (prop_types_default()).any.isRequired,
      body: (prop_types_default()).any.isRequired
    }).isRequired,
    Node: (prop_types_default()).func.isRequired
  }),
  itemToString: (prop_types_default()).func,
  itemToKey: (prop_types_default()).func,
  stateReducer: (prop_types_default()).func
};

// Shared between useSelect, useCombobox, Downshift.
var commonDropdownPropTypes = extends_extends({}, commonPropTypes, {
  getA11yStatusMessage: (prop_types_default()).func,
  highlightedIndex: (prop_types_default()).number,
  defaultHighlightedIndex: (prop_types_default()).number,
  initialHighlightedIndex: (prop_types_default()).number,
  isOpen: (prop_types_default()).bool,
  defaultIsOpen: (prop_types_default()).bool,
  initialIsOpen: (prop_types_default()).bool,
  selectedItem: (prop_types_default()).any,
  initialSelectedItem: (prop_types_default()).any,
  defaultSelectedItem: (prop_types_default()).any,
  id: (prop_types_default()).string,
  labelId: (prop_types_default()).string,
  menuId: (prop_types_default()).string,
  getItemId: (prop_types_default()).func,
  toggleButtonId: (prop_types_default()).string,
  onSelectedItemChange: (prop_types_default()).func,
  onHighlightedIndexChange: (prop_types_default()).func,
  onStateChange: (prop_types_default()).func,
  onIsOpenChange: (prop_types_default()).func,
  scrollIntoView: (prop_types_default()).func
});

function downshiftCommonReducer(state, action, stateChangeTypes) {
  var type = action.type,
    props = action.props;
  var changes;
  switch (type) {
    case stateChangeTypes.ItemMouseMove:
      changes = {
        highlightedIndex: action.disabled ? -1 : action.index
      };
      break;
    case stateChangeTypes.MenuMouseLeave:
      changes = {
        highlightedIndex: -1
      };
      break;
    case stateChangeTypes.ToggleButtonClick:
    case stateChangeTypes.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case stateChangeTypes.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: props.isItemDisabled(props.items[action.highlightedIndex], action.highlightedIndex) ? -1 : action.highlightedIndex
      };
      break;
    case stateChangeTypes.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case stateChangeTypes.FunctionReset:
      changes = {
        highlightedIndex: getDefaultHighlightedIndex(props),
        isOpen: getDefaultValue$1(props, 'isOpen'),
        selectedItem: getDefaultValue$1(props, 'selectedItem'),
        inputValue: getDefaultValue$1(props, 'inputValue')
      };
      break;
    default:
      throw new Error('Reducer called without proper action type.');
  }
  return extends_extends({}, state, changes);
}
/* eslint-enable complexity */

function getItemIndexByCharacterKey(_a) {
    var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString = _a.itemToString, isItemDisabled = _a.isItemDisabled;
    var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
    for (var index = 0; index < items.length; index++) {
        // if we already have a search query in progress, we also consider the current highlighted item.
        var offsetIndex = (index + highlightedIndex + (keysSoFar.length < 2 ? 1 : 0)) % items.length;
        var item = items[offsetIndex];
        if (item !== undefined &&
            itemToString(item).toLowerCase().startsWith(lowerCasedKeysSoFar) &&
            !isItemDisabled(item, offsetIndex)) {
            return offsetIndex;
        }
    }
    return highlightedIndex;
}
var propTypes$2 = __assign(__assign({}, commonDropdownPropTypes), { items: (prop_types_default()).array.isRequired, isItemDisabled: (prop_types_default()).func });
var defaultProps$2 = __assign(__assign({}, defaultProps$3), { isItemDisabled: function () {
        return false;
    } });
// eslint-disable-next-line import/no-mutable-exports
var validatePropTypes$2 = noop;
/* istanbul ignore next */
if (false) {}

var ToggleButtonClick$1 =   false ? 0 : 0;
var ToggleButtonKeyDownArrowDown =   false ? 0 : 1;
var ToggleButtonKeyDownArrowUp =   false ? 0 : 2;
var ToggleButtonKeyDownCharacter =   false ? 0 : 3;
var ToggleButtonKeyDownEscape =   false ? 0 : 4;
var ToggleButtonKeyDownHome =   false ? 0 : 5;
var ToggleButtonKeyDownEnd =   false ? 0 : 6;
var ToggleButtonKeyDownEnter =   false ? 0 : 7;
var ToggleButtonKeyDownSpaceButton =   false ? 0 : 8;
var ToggleButtonKeyDownPageUp =   false ? 0 : 9;
var ToggleButtonKeyDownPageDown =   false ? 0 : 10;
var ToggleButtonBlur =   false ? 0 : 11;
var MenuMouseLeave$1 =   false ? 0 : 12;
var ItemMouseMove$1 =   false ? 0 : 13;
var ItemClick$1 =   false ? 0 : 14;
var FunctionToggleMenu$1 =   false ? 0 : 15;
var FunctionOpenMenu$1 =   false ? 0 : 16;
var FunctionCloseMenu$1 =   false ? 0 : 17;
var FunctionSetHighlightedIndex$1 =   false ? 0 : 18;
var FunctionSelectItem$1 =   false ? 0 : 19;
var FunctionSetInputValue$1 =   false ? 0 : 20;
var FunctionReset$2 =   false ? 0 : 21;

var stateChangeTypes$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FunctionCloseMenu: FunctionCloseMenu$1,
  FunctionOpenMenu: FunctionOpenMenu$1,
  FunctionReset: FunctionReset$2,
  FunctionSelectItem: FunctionSelectItem$1,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
  FunctionSetInputValue: FunctionSetInputValue$1,
  FunctionToggleMenu: FunctionToggleMenu$1,
  ItemClick: ItemClick$1,
  ItemMouseMove: ItemMouseMove$1,
  MenuMouseLeave: MenuMouseLeave$1,
  ToggleButtonBlur: ToggleButtonBlur,
  ToggleButtonClick: ToggleButtonClick$1,
  ToggleButtonKeyDownArrowDown: ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp: ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownCharacter: ToggleButtonKeyDownCharacter,
  ToggleButtonKeyDownEnd: ToggleButtonKeyDownEnd,
  ToggleButtonKeyDownEnter: ToggleButtonKeyDownEnter,
  ToggleButtonKeyDownEscape: ToggleButtonKeyDownEscape,
  ToggleButtonKeyDownHome: ToggleButtonKeyDownHome,
  ToggleButtonKeyDownPageDown: ToggleButtonKeyDownPageDown,
  ToggleButtonKeyDownPageUp: ToggleButtonKeyDownPageUp,
  ToggleButtonKeyDownSpaceButton: ToggleButtonKeyDownSpaceButton
});

/* eslint-disable complexity */
function downshiftSelectReducer(state, action) {
  var _props$items;
  var type = action.type,
    props = action.props,
    altKey = action.altKey;
  var changes;
  switch (type) {
    case ItemClick$1:
      changes = {
        isOpen: getDefaultValue$1(props, 'isOpen'),
        highlightedIndex: getDefaultHighlightedIndex(props),
        selectedItem: props.items[action.index]
      };
      break;
    case ToggleButtonKeyDownCharacter:
      {
        var lowercasedKey = action.key;
        var inputValue = "" + state.inputValue + lowercasedKey;
        var prevHighlightedIndex = !state.isOpen && state.selectedItem ? props.items.findIndex(function (item) {
          return props.itemToKey(item) === props.itemToKey(state.selectedItem);
        }) : state.highlightedIndex;
        var highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: prevHighlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          isItemDisabled: props.isItemDisabled
        });
        changes = {
          inputValue: inputValue,
          highlightedIndex: highlightedIndex,
          isOpen: true
        };
      }
      break;
    case ToggleButtonKeyDownArrowDown:
      {
        var _highlightedIndex = state.isOpen ? getHighlightedIndex(state.highlightedIndex, 1, props.items, props.isItemDisabled) : altKey && state.selectedItem == null ? -1 : getHighlightedIndexOnOpen(props, state, 1);
        changes = {
          highlightedIndex: _highlightedIndex,
          isOpen: true
        };
      }
      break;
    case ToggleButtonKeyDownArrowUp:
      if (state.isOpen && altKey) {
        changes = getChangesOnSelection(props, state.highlightedIndex, false);
      } else {
        var _highlightedIndex2 = state.isOpen ? getHighlightedIndex(state.highlightedIndex, -1, props.items, props.isItemDisabled) : getHighlightedIndexOnOpen(props, state, -1);
        changes = {
          highlightedIndex: _highlightedIndex2,
          isOpen: true
        };
      }
      break;
    // only triggered when menu is open.
    case ToggleButtonKeyDownEnter:
    case ToggleButtonKeyDownSpaceButton:
      changes = getChangesOnSelection(props, state.highlightedIndex, false);
      break;
    case ToggleButtonKeyDownHome:
      changes = {
        highlightedIndex: getNonDisabledIndex(0, false, props.items, props.isItemDisabled),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownEnd:
      changes = {
        highlightedIndex: getNonDisabledIndex(props.items.length - 1, true, props.items, props.isItemDisabled),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownPageUp:
      changes = {
        highlightedIndex: getHighlightedIndex(state.highlightedIndex, -10, props.items, props.isItemDisabled)
      };
      break;
    case ToggleButtonKeyDownPageDown:
      changes = {
        highlightedIndex: getHighlightedIndex(state.highlightedIndex, 10, props.items, props.isItemDisabled)
      };
      break;
    case ToggleButtonKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case ToggleButtonBlur:
      changes = extends_extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && {
        selectedItem: props.items[state.highlightedIndex]
      });
      break;
    case FunctionSelectItem$1:
      changes = {
        selectedItem: action.selectedItem
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$2);
  }
  return extends_extends({}, state, changes);
}
/* eslint-enable complexity */

var _excluded$2 = ["onClick"],
  _excluded2$2 = ["onMouseLeave", "refKey", "ref"],
  _excluded3$1 = ["onBlur", "onClick", "onPress", "onKeyDown", "refKey", "ref"],
  _excluded4$1 = ["item", "index", "onMouseMove", "onClick", "onMouseDown", "onPress", "refKey", "disabled", "ref"];
useSelect.stateChangeTypes = stateChangeTypes$2;
function useSelect(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$2(userProps, useSelect);
  // Props defaults and destructuring.
  var props = extends_extends({}, defaultProps$2, userProps);
  var scrollIntoView = props.scrollIntoView,
    environment = props.environment,
    getA11yStatusMessage = props.getA11yStatusMessage;
  // Initial state depending on controlled props.
  var _useControlledReducer = useControlledReducer$1(downshiftSelectReducer, props, getInitialState$2, isDropdownsStateEqual),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen,
    highlightedIndex = state.highlightedIndex,
    selectedItem = state.selectedItem,
    inputValue = state.inputValue;
  // Element efs.
  var toggleButtonRef = (0,external_React_namespaceObject.useRef)(null);
  var menuRef = (0,external_React_namespaceObject.useRef)(null);
  var itemRefs = (0,external_React_namespaceObject.useRef)({});

  // used to keep the inputValue clearTimeout object between renders.
  var clearTimeoutRef = (0,external_React_namespaceObject.useRef)(null);
  // prevent id re-generation between renders.
  var elementIds = useElementIds(props);
  // utility callback to get item element.
  var latest = useLatestRef({
    state: state,
    props: props
  });

  // Some utils.
  var getItemNodeFromIndex = (0,external_React_namespaceObject.useCallback)(function (index) {
    return itemRefs.current[elementIds.getItemId(index)];
  }, [elementIds]);

  // Effects.
  // Adds an a11y aria live status message if getA11yStatusMessage is passed.
  useA11yMessageStatus(getA11yStatusMessage, state, [isOpen, highlightedIndex, selectedItem, inputValue], environment);
  // Scroll on highlighted item if change comes from keyboard.
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex: highlightedIndex,
    isOpen: isOpen,
    itemRefs: itemRefs,
    scrollIntoView: scrollIntoView,
    getItemNodeFromIndex: getItemNodeFromIndex
  });
  // Sets cleanup for the keysSoFar callback, debounded after 500ms.
  (0,external_React_namespaceObject.useEffect)(function () {
    // init the clean function here as we need access to dispatch.
    clearTimeoutRef.current = debounce(function (outerDispatch) {
      outerDispatch({
        type: FunctionSetInputValue$1,
        inputValue: ''
      });
    }, 500);

    // Cancel any pending debounced calls on mount
    return function () {
      clearTimeoutRef.current.cancel();
    };
  }, []);
  // Invokes the keysSoFar callback set up above.
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!inputValue) {
      return;
    }
    clearTimeoutRef.current(dispatch);
  }, [dispatch, inputValue]);
  useControlPropsValidator({
    props: props,
    state: state
  });
  // Focus the toggle button on first render if required.
  (0,external_React_namespaceObject.useEffect)(function () {
    var focusOnOpen = getInitialValue$1(props, 'isOpen');
    if (focusOnOpen && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var mouseAndTouchTrackers = useMouseAndTouchTracker(environment, (0,external_React_namespaceObject.useCallback)(function handleBlur() {
    if (latest.current.state.isOpen) {
      dispatch({
        type: ToggleButtonBlur
      });
    }
  }, [dispatch, latest]), (0,external_React_namespaceObject.useMemo)(function () {
    return [menuRef, toggleButtonRef];
  }, [menuRef.current, toggleButtonRef.current]));
  var setGetterPropCallInfo = useGetterPropsCalledChecker('getMenuProps', 'getToggleButtonProps');
  // Reset itemRefs on close.
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);

  // Event handler functions.
  var toggleButtonKeyDownHandlers = (0,external_React_namespaceObject.useMemo)(function () {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowDown,
          altKey: event.altKey
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowUp,
          altKey: event.altKey
        });
      },
      Home: function Home(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownHome
        });
      },
      End: function End(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownEnd
        });
      },
      Escape: function Escape() {
        if (latest.current.state.isOpen) {
          dispatch({
            type: ToggleButtonKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        event.preventDefault();
        dispatch({
          type: latest.current.state.isOpen ? ToggleButtonKeyDownEnter : ToggleButtonClick$1
        });
      },
      PageUp: function PageUp(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownPageUp
          });
        }
      },
      PageDown: function PageDown(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownPageDown
          });
        }
      },
      ' ': function _(event) {
        event.preventDefault();
        var currentState = latest.current.state;
        if (!currentState.isOpen) {
          dispatch({
            type: ToggleButtonClick$1
          });
          return;
        }
        if (currentState.inputValue) {
          dispatch({
            type: ToggleButtonKeyDownCharacter,
            key: ' '
          });
        } else {
          dispatch({
            type: ToggleButtonKeyDownSpaceButton
          });
        }
      }
    };
  }, [dispatch, latest]);

  // Action functions.
  var toggleMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionToggleMenu$1
    });
  }, [dispatch]);
  var closeMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionCloseMenu$1
    });
  }, [dispatch]);
  var openMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionOpenMenu$1
    });
  }, [dispatch]);
  var setHighlightedIndex = (0,external_React_namespaceObject.useCallback)(function (newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex$1,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0,external_React_namespaceObject.useCallback)(function (newSelectedItem) {
    dispatch({
      type: FunctionSelectItem$1,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var reset = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionReset$2
    });
  }, [dispatch]);
  var setInputValue = (0,external_React_namespaceObject.useCallback)(function (newInputValue) {
    dispatch({
      type: FunctionSetInputValue$1,
      inputValue: newInputValue
    });
  }, [dispatch]);
  // Getter functions.
  var getLabelProps = (0,external_React_namespaceObject.useCallback)(function (_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      onClick = _ref.onClick,
      labelProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, _excluded$2);
    var labelHandleClick = function labelHandleClick() {
      var _toggleButtonRef$curr;
      (_toggleButtonRef$curr = toggleButtonRef.current) == null || _toggleButtonRef$curr.focus();
    };
    return extends_extends({
      id: elementIds.labelId,
      htmlFor: elementIds.toggleButtonId,
      onClick: callAllEventHandlers(onClick, labelHandleClick)
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0,external_React_namespaceObject.useCallback)(function (_temp2, _temp3) {
    var _extends2;
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
      onMouseLeave = _ref2.onMouseLeave,
      _ref2$refKey = _ref2.refKey,
      refKey = _ref2$refKey === void 0 ? 'ref' : _ref2$refKey,
      ref = _ref2.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, _excluded2$2);
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
      _ref3$suppressRefErro = _ref3.suppressRefError,
      suppressRefError = _ref3$suppressRefErro === void 0 ? false : _ref3$suppressRefErro;
    var menuHandleMouseLeave = function menuHandleMouseLeave() {
      dispatch({
        type: MenuMouseLeave$1
      });
    };
    setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
    return extends_extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = 'listbox', _extends2['aria-labelledby'] = rest && rest['aria-label'] ? undefined : "" + elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, menuHandleMouseLeave), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getToggleButtonProps = (0,external_React_namespaceObject.useCallback)(function (_temp4, _temp5) {
    var _extends3;
    var _ref4 = _temp4 === void 0 ? {} : _temp4,
      onBlur = _ref4.onBlur,
      onClick = _ref4.onClick;
      _ref4.onPress;
      var onKeyDown = _ref4.onKeyDown,
      _ref4$refKey = _ref4.refKey,
      refKey = _ref4$refKey === void 0 ? 'ref' : _ref4$refKey,
      ref = _ref4.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref4, _excluded3$1);
    var _ref5 = _temp5 === void 0 ? {} : _temp5,
      _ref5$suppressRefErro = _ref5.suppressRefError,
      suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
    var latestState = latest.current.state;
    var toggleButtonHandleClick = function toggleButtonHandleClick() {
      dispatch({
        type: ToggleButtonClick$1
      });
    };
    var toggleButtonHandleBlur = function toggleButtonHandleBlur() {
      if (latestState.isOpen && !mouseAndTouchTrackers.isMouseDown) {
        dispatch({
          type: ToggleButtonBlur
        });
      }
    };
    var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown(event) {
      var key = normalizeArrowKey(event);
      if (key && toggleButtonKeyDownHandlers[key]) {
        toggleButtonKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: ToggleButtonKeyDownCharacter,
          key: key
        });
      }
    };
    var toggleProps = extends_extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends3['aria-activedescendant'] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : '', _extends3['aria-controls'] = elementIds.menuId, _extends3['aria-expanded'] = latest.current.state.isOpen, _extends3['aria-haspopup'] = 'listbox', _extends3['aria-labelledby'] = rest && rest['aria-label'] ? undefined : "" + elementIds.labelId, _extends3.id = elementIds.toggleButtonId, _extends3.role = 'combobox', _extends3.tabIndex = 0, _extends3.onBlur = callAllEventHandlers(onBlur, toggleButtonHandleBlur), _extends3), rest);
    if (!rest.disabled) {
      /* istanbul ignore if (react-native) */
      {
        toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
        toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
      }
    }
    setGetterPropCallInfo('getToggleButtonProps', suppressRefError, refKey, toggleButtonRef);
    return toggleProps;
  }, [dispatch, elementIds, latest, mouseAndTouchTrackers, setGetterPropCallInfo, toggleButtonKeyDownHandlers]);
  var getItemProps = (0,external_React_namespaceObject.useCallback)(function (_temp6) {
    var _extends4;
    var _ref6 = _temp6 === void 0 ? {} : _temp6,
      itemProp = _ref6.item,
      indexProp = _ref6.index,
      onMouseMove = _ref6.onMouseMove,
      onClick = _ref6.onClick,
      onMouseDown = _ref6.onMouseDown;
      _ref6.onPress;
      var _ref6$refKey = _ref6.refKey,
      refKey = _ref6$refKey === void 0 ? 'ref' : _ref6$refKey,
      disabledProp = _ref6.disabled,
      ref = _ref6.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref6, _excluded4$1);
    if (disabledProp !== undefined) {
      console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useSelect.');
    }
    var _latest$current = latest.current,
      latestState = _latest$current.state,
      latestProps = _latest$current.props;
    var _getItemAndIndex = getItemAndIndex(itemProp, indexProp, latestProps.items, 'Pass either item or index to getItemProps!'),
      item = _getItemAndIndex[0],
      index = _getItemAndIndex[1];
    var disabled = latestProps.isItemDisabled(item, index);
    var itemHandleMouseMove = function itemHandleMouseMove() {
      if (mouseAndTouchTrackers.isTouchEnd || index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove$1,
        index: index,
        disabled: disabled
      });
    };
    var itemHandleClick = function itemHandleClick() {
      dispatch({
        type: ItemClick$1,
        index: index
      });
    };
    var itemHandleMouseDown = function itemHandleMouseDown(e) {
      return e.preventDefault();
    }; // keep focus on the toggle after item click select.

    var itemProps = extends_extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function (itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(index)] = itemNode;
      }
    }), _extends4['aria-disabled'] = disabled, _extends4['aria-selected'] = item === latestState.selectedItem, _extends4.id = elementIds.getItemId(index), _extends4.role = 'option', _extends4), rest);
    if (!disabled) {
      /* istanbul ignore next (react-native) */
      {
        itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
      }
    }
    itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
    itemProps.onMouseDown = callAllEventHandlers(onMouseDown, itemHandleMouseDown);
    return itemProps;
  }, [latest, elementIds, mouseAndTouchTrackers, shouldScrollRef, dispatch]);
  return {
    // prop getters.
    getToggleButtonProps: getToggleButtonProps,
    getLabelProps: getLabelProps,
    getMenuProps: getMenuProps,
    getItemProps: getItemProps,
    // actions.
    toggleMenu: toggleMenu,
    openMenu: openMenu,
    closeMenu: closeMenu,
    setHighlightedIndex: setHighlightedIndex,
    selectItem: selectItem,
    reset: reset,
    setInputValue: setInputValue,
    // state.
    highlightedIndex: highlightedIndex,
    isOpen: isOpen,
    selectedItem: selectedItem,
    inputValue: inputValue
  };
}

var InputKeyDownArrowDown =   false ? 0 : 0;
var InputKeyDownArrowUp =   false ? 0 : 1;
var InputKeyDownEscape =   false ? 0 : 2;
var InputKeyDownHome =   false ? 0 : 3;
var InputKeyDownEnd =   false ? 0 : 4;
var InputKeyDownPageUp =   false ? 0 : 5;
var InputKeyDownPageDown =   false ? 0 : 6;
var InputKeyDownEnter =   false ? 0 : 7;
var InputChange =   false ? 0 : 8;
var InputBlur =   false ? 0 : 9;
var InputClick =   false ? 0 : 10;
var MenuMouseLeave =   false ? 0 : 11;
var ItemMouseMove =   false ? 0 : 12;
var ItemClick =   false ? 0 : 13;
var ToggleButtonClick =   false ? 0 : 14;
var FunctionToggleMenu =   false ? 0 : 15;
var FunctionOpenMenu =   false ? 0 : 16;
var FunctionCloseMenu =   false ? 0 : 17;
var FunctionSetHighlightedIndex =   false ? 0 : 18;
var FunctionSelectItem =   false ? 0 : 19;
var FunctionSetInputValue =   false ? 0 : 20;
var FunctionReset$1 =   false ? 0 : 21;
var ControlledPropUpdatedSelectedItem =   false ? 0 : 22;

var stateChangeTypes$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ControlledPropUpdatedSelectedItem: ControlledPropUpdatedSelectedItem,
  FunctionCloseMenu: FunctionCloseMenu,
  FunctionOpenMenu: FunctionOpenMenu,
  FunctionReset: FunctionReset$1,
  FunctionSelectItem: FunctionSelectItem,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex,
  FunctionSetInputValue: FunctionSetInputValue,
  FunctionToggleMenu: FunctionToggleMenu,
  InputBlur: InputBlur,
  InputChange: InputChange,
  InputClick: InputClick,
  InputKeyDownArrowDown: InputKeyDownArrowDown,
  InputKeyDownArrowUp: InputKeyDownArrowUp,
  InputKeyDownEnd: InputKeyDownEnd,
  InputKeyDownEnter: InputKeyDownEnter,
  InputKeyDownEscape: InputKeyDownEscape,
  InputKeyDownHome: InputKeyDownHome,
  InputKeyDownPageDown: InputKeyDownPageDown,
  InputKeyDownPageUp: InputKeyDownPageUp,
  ItemClick: ItemClick,
  ItemMouseMove: ItemMouseMove,
  MenuMouseLeave: MenuMouseLeave,
  ToggleButtonClick: ToggleButtonClick
});

function getInitialState$1(props) {
  var initialState = getInitialState$2(props);
  var selectedItem = initialState.selectedItem;
  var inputValue = initialState.inputValue;
  if (inputValue === '' && selectedItem && props.defaultInputValue === undefined && props.initialInputValue === undefined && props.inputValue === undefined) {
    inputValue = props.itemToString(selectedItem);
  }
  return extends_extends({}, initialState, {
    inputValue: inputValue
  });
}
var propTypes$1 = extends_extends({}, commonDropdownPropTypes, {
  items: (prop_types_default()).array.isRequired,
  isItemDisabled: (prop_types_default()).func,
  inputValue: (prop_types_default()).string,
  defaultInputValue: (prop_types_default()).string,
  initialInputValue: (prop_types_default()).string,
  inputId: (prop_types_default()).string,
  onInputValueChange: (prop_types_default()).func
});

/**
 * The useCombobox version of useControlledReducer, which also
 * checks if the controlled prop selectedItem changed between
 * renders. If so, it will also update inputValue with its
 * string equivalent. It uses the common useEnhancedReducer to
 * compute the rest of the state.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} props The hook props, also passed to createInitialState.
 * @param {Function} createInitialState Function that returns the initial state.
 * @param {Function} isStateEqual Function that checks if a previous state is equal to the next.
 * @returns {Array} An array with the state and an action dispatcher.
 */
function useControlledReducer(reducer, props, createInitialState, isStateEqual) {
  var previousSelectedItemRef = (0,external_React_namespaceObject.useRef)();
  var _useEnhancedReducer = useEnhancedReducer(reducer, props, createInitialState, isStateEqual),
    state = _useEnhancedReducer[0],
    dispatch = _useEnhancedReducer[1];
  var isInitialMount = useIsInitialMount();
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!isControlledProp(props, 'selectedItem')) {
      return;
    }
    if (!isInitialMount // on first mount we already have the proper inputValue for a initial selected item.
    ) {
      var shouldCallDispatch = props.itemToKey(props.selectedItem) !== props.itemToKey(previousSelectedItemRef.current);
      if (shouldCallDispatch) {
        dispatch({
          type: ControlledPropUpdatedSelectedItem,
          inputValue: props.itemToString(props.selectedItem)
        });
      }
    }
    previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedItem, props.selectedItem]);
  return [getState(state, props), dispatch];
}

// eslint-disable-next-line import/no-mutable-exports
var validatePropTypes$1 = noop;
/* istanbul ignore next */
if (false) {}
var defaultProps$1 = extends_extends({}, defaultProps$3, {
  isItemDisabled: function isItemDisabled() {
    return false;
  }
});

/* eslint-disable complexity */
function downshiftUseComboboxReducer(state, action) {
  var _props$items;
  var type = action.type,
    props = action.props,
    altKey = action.altKey;
  var changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, 'isOpen'),
        highlightedIndex: getDefaultHighlightedIndex(props),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getHighlightedIndex(state.highlightedIndex, 1, props.items, props.isItemDisabled, true)
        };
      } else {
        changes = {
          highlightedIndex: altKey && state.selectedItem == null ? -1 : getHighlightedIndexOnOpen(props, state, 1),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        if (altKey) {
          changes = getChangesOnSelection(props, state.highlightedIndex);
        } else {
          changes = {
            highlightedIndex: getHighlightedIndex(state.highlightedIndex, -1, props.items, props.isItemDisabled, true)
          };
        }
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownEnter:
      changes = getChangesOnSelection(props, state.highlightedIndex);
      break;
    case InputKeyDownEscape:
      changes = extends_extends({
        isOpen: false,
        highlightedIndex: -1
      }, !state.isOpen && {
        selectedItem: null,
        inputValue: ''
      });
      break;
    case InputKeyDownPageUp:
      changes = {
        highlightedIndex: getHighlightedIndex(state.highlightedIndex, -10, props.items, props.isItemDisabled, true)
      };
      break;
    case InputKeyDownPageDown:
      changes = {
        highlightedIndex: getHighlightedIndex(state.highlightedIndex, 10, props.items, props.isItemDisabled, true)
      };
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNonDisabledIndex(0, false, props.items, props.isItemDisabled)
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNonDisabledIndex(props.items.length - 1, true, props.items, props.isItemDisabled)
      };
      break;
    case InputBlur:
      changes = extends_extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && action.selectItem && {
        selectedItem: props.items[state.highlightedIndex],
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultHighlightedIndex(props),
        inputValue: action.inputValue
      };
      break;
    case InputClick:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return extends_extends({}, state, changes);
}
/* eslint-enable complexity */

var _excluded$1 = ["onMouseLeave", "refKey", "ref"],
  _excluded2$1 = ["item", "index", "refKey", "ref", "onMouseMove", "onMouseDown", "onClick", "onPress", "disabled"],
  _excluded3 = ["onClick", "onPress", "refKey", "ref"],
  _excluded4 = ["onKeyDown", "onChange", "onInput", "onBlur", "onChangeText", "onClick", "refKey", "ref"];
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$1(userProps, useCombobox);
  // Props defaults and destructuring.
  var props = extends_extends({}, defaultProps$1, userProps);
  var items = props.items,
    scrollIntoView = props.scrollIntoView,
    environment = props.environment,
    getA11yStatusMessage = props.getA11yStatusMessage;
  // Initial state depending on controlled props.
  var _useControlledReducer = useControlledReducer(downshiftUseComboboxReducer, props, getInitialState$1, isDropdownsStateEqual),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen,
    highlightedIndex = state.highlightedIndex,
    selectedItem = state.selectedItem,
    inputValue = state.inputValue;

  // Element refs.
  var menuRef = (0,external_React_namespaceObject.useRef)(null);
  var itemRefs = (0,external_React_namespaceObject.useRef)({});
  var inputRef = (0,external_React_namespaceObject.useRef)(null);
  var toggleButtonRef = (0,external_React_namespaceObject.useRef)(null);
  var isInitialMount = useIsInitialMount();

  // prevent id re-generation between renders.
  var elementIds = useElementIds(props);
  // used to keep track of how many items we had on previous cycle.
  var previousResultCountRef = (0,external_React_namespaceObject.useRef)();
  // utility callback to get item element.
  var latest = useLatestRef({
    state: state,
    props: props
  });
  var getItemNodeFromIndex = (0,external_React_namespaceObject.useCallback)(function (index) {
    return itemRefs.current[elementIds.getItemId(index)];
  }, [elementIds]);

  // Effects.
  // Adds an a11y aria live status message if getA11yStatusMessage is passed.
  useA11yMessageStatus(getA11yStatusMessage, state, [isOpen, highlightedIndex, selectedItem, inputValue], environment);
  // Scroll on highlighted item if change comes from keyboard.
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex: highlightedIndex,
    isOpen: isOpen,
    itemRefs: itemRefs,
    scrollIntoView: scrollIntoView,
    getItemNodeFromIndex: getItemNodeFromIndex
  });
  useControlPropsValidator({
    props: props,
    state: state
  });
  // Focus the input on first render if required.
  (0,external_React_namespaceObject.useEffect)(function () {
    var focusOnOpen = getInitialValue$1(props, 'isOpen');
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!isInitialMount) {
      previousResultCountRef.current = items.length;
    }
  });
  var mouseAndTouchTrackers = useMouseAndTouchTracker(environment, (0,external_React_namespaceObject.useCallback)(function handleBlur() {
    if (latest.current.state.isOpen) {
      dispatch({
        type: InputBlur,
        selectItem: false
      });
    }
  }, [dispatch, latest]), (0,external_React_namespaceObject.useMemo)(function () {
    return [menuRef, toggleButtonRef, inputRef];
  }, [menuRef.current, toggleButtonRef.current, inputRef.current]));
  var setGetterPropCallInfo = useGetterPropsCalledChecker('getInputProps', 'getMenuProps');
  // Reset itemRefs on close.
  (0,external_React_namespaceObject.useEffect)(function () {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  // Reset itemRefs on close.
  (0,external_React_namespaceObject.useEffect)(function () {
    var _inputRef$current;
    if (!isOpen || !(environment != null && environment.document) || !(inputRef != null && (_inputRef$current = inputRef.current) != null && _inputRef$current.focus)) {
      return;
    }
    if (environment.document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, environment]);

  /* Event handler functions */
  var inputKeyDownHandlers = (0,external_React_namespaceObject.useMemo)(function () {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowDown,
          altKey: event.altKey
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowUp,
          altKey: event.altKey
        });
      },
      Home: function Home(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownHome
        });
      },
      End: function End(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnd
        });
      },
      Escape: function Escape(event) {
        var latestState = latest.current.state;
        if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        var latestState = latest.current.state;
        // if closed or no highlighted index, do nothing.
        if (!latestState.isOpen || event.which === 229 // if IME composing, wait for next Enter keydown event.
        ) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnter
        });
      },
      PageUp: function PageUp(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownPageUp
          });
        }
      },
      PageDown: function PageDown(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownPageDown
          });
        }
      }
    };
  }, [dispatch, latest]);

  // Getter props.
  var getLabelProps = (0,external_React_namespaceObject.useCallback)(function (labelProps) {
    return extends_extends({
      id: elementIds.labelId,
      htmlFor: elementIds.inputId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0,external_React_namespaceObject.useCallback)(function (_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp,
      onMouseLeave = _ref.onMouseLeave,
      _ref$refKey = _ref.refKey,
      refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
      ref = _ref.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, _excluded$1);
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
      _ref2$suppressRefErro = _ref2.suppressRefError,
      suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
    setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
    return extends_extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = 'listbox', _extends2['aria-labelledby'] = rest && rest['aria-label'] ? undefined : "" + elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, function () {
      dispatch({
        type: MenuMouseLeave
      });
    }), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getItemProps = (0,external_React_namespaceObject.useCallback)(function (_temp3) {
    var _extends3, _ref4;
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
      itemProp = _ref3.item,
      indexProp = _ref3.index,
      _ref3$refKey = _ref3.refKey,
      refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
      ref = _ref3.ref,
      onMouseMove = _ref3.onMouseMove,
      onMouseDown = _ref3.onMouseDown,
      onClick = _ref3.onClick;
      _ref3.onPress;
      var disabledProp = _ref3.disabled,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref3, _excluded2$1);
    if (disabledProp !== undefined) {
      console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');
    }
    var _latest$current = latest.current,
      latestProps = _latest$current.props,
      latestState = _latest$current.state;
    var _getItemAndIndex = getItemAndIndex(itemProp, indexProp, latestProps.items, 'Pass either item or index to getItemProps!'),
      item = _getItemAndIndex[0],
      index = _getItemAndIndex[1];
    var disabled = latestProps.isItemDisabled(item, index);
    var onSelectKey = 'onClick';
    var customClickHandler = onClick;
    var itemHandleMouseMove = function itemHandleMouseMove() {
      if (mouseAndTouchTrackers.isTouchEnd || index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index: index,
        disabled: disabled
      });
    };
    var itemHandleClick = function itemHandleClick() {
      dispatch({
        type: ItemClick,
        index: index
      });
    };
    var itemHandleMouseDown = function itemHandleMouseDown(e) {
      return e.preventDefault();
    }; // keep focus on the input after item click select.

    return extends_extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(index)] = itemNode;
      }
    }), _extends3['aria-disabled'] = disabled, _extends3['aria-selected'] = index === latestState.highlightedIndex, _extends3.id = elementIds.getItemId(index), _extends3.role = 'option', _extends3), !disabled && (_ref4 = {}, _ref4[onSelectKey] = callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), {
      onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
      onMouseDown: callAllEventHandlers(onMouseDown, itemHandleMouseDown)
    }, rest);
  }, [dispatch, elementIds, latest, mouseAndTouchTrackers, shouldScrollRef]);
  var getToggleButtonProps = (0,external_React_namespaceObject.useCallback)(function (_temp4) {
    var _extends4;
    var _ref5 = _temp4 === void 0 ? {} : _temp4,
      onClick = _ref5.onClick;
      _ref5.onPress;
      var _ref5$refKey = _ref5.refKey,
      refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
      ref = _ref5.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref5, _excluded3);
    var latestState = latest.current.state;
    var toggleButtonHandleClick = function toggleButtonHandleClick() {
      dispatch({
        type: ToggleButtonClick
      });
    };
    return extends_extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function (toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends4['aria-controls'] = elementIds.menuId, _extends4['aria-expanded'] = latestState.isOpen, _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && extends_extends({}, {
      onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
    }), rest);
  }, [dispatch, latest, elementIds]);
  var getInputProps = (0,external_React_namespaceObject.useCallback)(function (_temp5, _temp6) {
    var _extends5;
    var _ref6 = _temp5 === void 0 ? {} : _temp5,
      onKeyDown = _ref6.onKeyDown,
      onChange = _ref6.onChange,
      onInput = _ref6.onInput,
      onBlur = _ref6.onBlur;
      _ref6.onChangeText;
      var onClick = _ref6.onClick,
      _ref6$refKey = _ref6.refKey,
      refKey = _ref6$refKey === void 0 ? 'ref' : _ref6$refKey,
      ref = _ref6.ref,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref6, _excluded4);
    var _ref7 = _temp6 === void 0 ? {} : _temp6,
      _ref7$suppressRefErro = _ref7.suppressRefError,
      suppressRefError = _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;
    setGetterPropCallInfo('getInputProps', suppressRefError, refKey, inputRef);
    var latestState = latest.current.state;
    var inputHandleKeyDown = function inputHandleKeyDown(event) {
      var key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    var inputHandleChange = function inputHandleChange(event) {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    var inputHandleBlur = function inputHandleBlur(event) {
      /* istanbul ignore else */
      if (environment != null && environment.document && latestState.isOpen && !mouseAndTouchTrackers.isMouseDown) {
        var isBlurByTabChange = event.relatedTarget === null && environment.document.activeElement !== environment.document.body;
        dispatch({
          type: InputBlur,
          selectItem: !isBlurByTabChange
        });
      }
    };
    var inputHandleClick = function inputHandleClick() {
      dispatch({
        type: InputClick
      });
    };

    /* istanbul ignore next (preact) */
    var onChangeKey = 'onChange';
    var eventHandlers = {};
    if (!rest.disabled) {
      var _eventHandlers;
      eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers.onClick = callAllEventHandlers(onClick, inputHandleClick), _eventHandlers);
    }
    return extends_extends((_extends5 = {}, _extends5[refKey] = handleRefs(ref, function (inputNode) {
      inputRef.current = inputNode;
    }), _extends5['aria-activedescendant'] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : '', _extends5['aria-autocomplete'] = 'list', _extends5['aria-controls'] = elementIds.menuId, _extends5['aria-expanded'] = latestState.isOpen, _extends5['aria-labelledby'] = rest && rest['aria-label'] ? undefined : elementIds.labelId, _extends5.autoComplete = 'off', _extends5.id = elementIds.inputId, _extends5.role = 'combobox', _extends5.value = latestState.inputValue, _extends5), eventHandlers, rest);
  }, [dispatch, elementIds, environment, inputKeyDownHandlers, latest, mouseAndTouchTrackers, setGetterPropCallInfo]);

  // returns
  var toggleMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  var closeMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  var openMenu = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  var setHighlightedIndex = (0,external_React_namespaceObject.useCallback)(function (newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0,external_React_namespaceObject.useCallback)(function (newSelectedItem) {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var setInputValue = (0,external_React_namespaceObject.useCallback)(function (newInputValue) {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var reset = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionReset$1
    });
  }, [dispatch]);
  return {
    // prop getters.
    getItemProps: getItemProps,
    getLabelProps: getLabelProps,
    getMenuProps: getMenuProps,
    getInputProps: getInputProps,
    getToggleButtonProps: getToggleButtonProps,
    // actions.
    toggleMenu: toggleMenu,
    openMenu: openMenu,
    closeMenu: closeMenu,
    setHighlightedIndex: setHighlightedIndex,
    setInputValue: setInputValue,
    selectItem: selectItem,
    reset: reset,
    // state.
    highlightedIndex: highlightedIndex,
    isOpen: isOpen,
    selectedItem: selectedItem,
    inputValue: inputValue
  };
}

var defaultStateValues = {
  activeIndex: -1,
  selectedItems: []
};

/**
 * Returns the initial value for a state key in the following order:
 * 1. controlled prop, 2. initial prop, 3. default prop, 4. default
 * value from Downshift.
 *
 * @param {Object} props Props passed to the hook.
 * @param {string} propKey Props key to generate the value for.
 * @returns {any} The initial value for that prop.
 */
function getInitialValue(props, propKey) {
  return getInitialValue$1(props, propKey, defaultStateValues);
}

/**
 * Returns the default value for a state key in the following order:
 * 1. controlled prop, 2. default prop, 3. default value from Downshift.
 *
 * @param {Object} props Props passed to the hook.
 * @param {string} propKey Props key to generate the value for.
 * @returns {any} The initial value for that prop.
 */
function getDefaultValue(props, propKey) {
  return getDefaultValue$1(props, propKey, defaultStateValues);
}

/**
 * Gets the initial state based on the provided props. It uses initial, default
 * and controlled props related to state in order to compute the initial value.
 *
 * @param {Object} props Props passed to the hook.
 * @returns {Object} The initial state.
 */
function getInitialState(props) {
  var activeIndex = getInitialValue(props, 'activeIndex');
  var selectedItems = getInitialValue(props, 'selectedItems');
  return {
    activeIndex: activeIndex,
    selectedItems: selectedItems
  };
}

/**
 * Returns true if dropdown keydown operation is permitted. Should not be
 * allowed on keydown with modifier keys (ctrl, alt, shift, meta), on
 * input element with text content that is either highlighted or selection
 * cursor is not at the starting position.
 *
 * @param {KeyboardEvent} event The event from keydown.
 * @returns {boolean} Whether the operation is allowed.
 */
function isKeyDownOperationPermitted(event) {
  if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  var element = event.target;
  if (element instanceof HTMLInputElement &&
  // if element is a text input
  element.value !== '' && (
  // and we have text in it
  // and cursor is either not at the start or is currently highlighting text.
  element.selectionStart !== 0 || element.selectionEnd !== 0)) {
    return false;
  }
  return true;
}

/**
 * Check if a state is equal for taglist, by comparing active index and selected items.
 * Used by useSelect and useCombobox.
 *
 * @param {Object} prevState
 * @param {Object} newState
 * @returns {boolean} Wheather the states are deeply equal.
 */
function isStateEqual(prevState, newState) {
  return prevState.selectedItems === newState.selectedItems && prevState.activeIndex === newState.activeIndex;
}
var propTypes = {
  stateReducer: commonPropTypes.stateReducer,
  itemToKey: commonPropTypes.itemToKey,
  environment: commonPropTypes.environment,
  selectedItems: (prop_types_default()).array,
  initialSelectedItems: (prop_types_default()).array,
  defaultSelectedItems: (prop_types_default()).array,
  getA11yStatusMessage: (prop_types_default()).func,
  activeIndex: (prop_types_default()).number,
  initialActiveIndex: (prop_types_default()).number,
  defaultActiveIndex: (prop_types_default()).number,
  onActiveIndexChange: (prop_types_default()).func,
  onSelectedItemsChange: (prop_types_default()).func,
  keyNavigationNext: (prop_types_default()).string,
  keyNavigationPrevious: (prop_types_default()).string
};
var defaultProps = {
  itemToKey: defaultProps$3.itemToKey,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  keyNavigationNext: 'ArrowRight',
  keyNavigationPrevious: 'ArrowLeft'
};

// eslint-disable-next-line import/no-mutable-exports
var validatePropTypes = noop;
/* istanbul ignore next */
if (false) {}

var SelectedItemClick =   false ? 0 : 0;
var SelectedItemKeyDownDelete =   false ? 0 : 1;
var SelectedItemKeyDownBackspace =   false ? 0 : 2;
var SelectedItemKeyDownNavigationNext =   false ? 0 : 3;
var SelectedItemKeyDownNavigationPrevious =   false ? 0 : 4;
var DropdownKeyDownNavigationPrevious =   false ? 0 : 5;
var DropdownKeyDownBackspace =   false ? 0 : 6;
var DropdownClick =   false ? 0 : 7;
var FunctionAddSelectedItem =   false ? 0 : 8;
var FunctionRemoveSelectedItem =   false ? 0 : 9;
var FunctionSetSelectedItems =   false ? 0 : 10;
var FunctionSetActiveIndex =   false ? 0 : 11;
var FunctionReset =   false ? 0 : 12;

var stateChangeTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DropdownClick: DropdownClick,
  DropdownKeyDownBackspace: DropdownKeyDownBackspace,
  DropdownKeyDownNavigationPrevious: DropdownKeyDownNavigationPrevious,
  FunctionAddSelectedItem: FunctionAddSelectedItem,
  FunctionRemoveSelectedItem: FunctionRemoveSelectedItem,
  FunctionReset: FunctionReset,
  FunctionSetActiveIndex: FunctionSetActiveIndex,
  FunctionSetSelectedItems: FunctionSetSelectedItems,
  SelectedItemClick: SelectedItemClick,
  SelectedItemKeyDownBackspace: SelectedItemKeyDownBackspace,
  SelectedItemKeyDownDelete: SelectedItemKeyDownDelete,
  SelectedItemKeyDownNavigationNext: SelectedItemKeyDownNavigationNext,
  SelectedItemKeyDownNavigationPrevious: SelectedItemKeyDownNavigationPrevious
});

/* eslint-disable complexity */
function downshiftMultipleSelectionReducer(state, action) {
  var type = action.type,
    index = action.index,
    props = action.props,
    selectedItem = action.selectedItem;
  var activeIndex = state.activeIndex,
    selectedItems = state.selectedItems;
  var changes;
  switch (type) {
    case SelectedItemClick:
      changes = {
        activeIndex: index
      };
      break;
    case SelectedItemKeyDownNavigationPrevious:
      changes = {
        activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
      };
      break;
    case SelectedItemKeyDownNavigationNext:
      changes = {
        activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
      };
      break;
    case SelectedItemKeyDownBackspace:
    case SelectedItemKeyDownDelete:
      {
        if (activeIndex < 0) {
          break;
        }
        var newActiveIndex = activeIndex;
        if (selectedItems.length === 1) {
          newActiveIndex = -1;
        } else if (activeIndex === selectedItems.length - 1) {
          newActiveIndex = selectedItems.length - 2;
        }
        changes = extends_extends({
          selectedItems: [].concat(selectedItems.slice(0, activeIndex), selectedItems.slice(activeIndex + 1))
        }, {
          activeIndex: newActiveIndex
        });
        break;
      }
    case DropdownKeyDownNavigationPrevious:
      changes = {
        activeIndex: selectedItems.length - 1
      };
      break;
    case DropdownKeyDownBackspace:
      changes = {
        selectedItems: selectedItems.slice(0, selectedItems.length - 1)
      };
      break;
    case FunctionAddSelectedItem:
      changes = {
        selectedItems: [].concat(selectedItems, [selectedItem])
      };
      break;
    case DropdownClick:
      changes = {
        activeIndex: -1
      };
      break;
    case FunctionRemoveSelectedItem:
      {
        var _newActiveIndex = activeIndex;
        var selectedItemIndex = selectedItems.findIndex(function (item) {
          return props.itemToKey(item) === props.itemToKey(selectedItem);
        });
        if (selectedItemIndex < 0) {
          break;
        }
        if (selectedItems.length === 1) {
          _newActiveIndex = -1;
        } else if (selectedItemIndex === selectedItems.length - 1) {
          _newActiveIndex = selectedItems.length - 2;
        }
        changes = {
          selectedItems: [].concat(selectedItems.slice(0, selectedItemIndex), selectedItems.slice(selectedItemIndex + 1)),
          activeIndex: _newActiveIndex
        };
        break;
      }
    case FunctionSetSelectedItems:
      {
        var newSelectedItems = action.selectedItems;
        changes = {
          selectedItems: newSelectedItems
        };
        break;
      }
    case FunctionSetActiveIndex:
      {
        var _newActiveIndex2 = action.activeIndex;
        changes = {
          activeIndex: _newActiveIndex2
        };
        break;
      }
    case FunctionReset:
      changes = {
        activeIndex: getDefaultValue(props, 'activeIndex'),
        selectedItems: getDefaultValue(props, 'selectedItems')
      };
      break;
    default:
      throw new Error('Reducer called without proper action type.');
  }
  return extends_extends({}, state, changes);
}

var _excluded = ["refKey", "ref", "onClick", "onKeyDown", "selectedItem", "index"],
  _excluded2 = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyAction"];
useMultipleSelection.stateChangeTypes = stateChangeTypes;
function useMultipleSelection(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes(userProps, useMultipleSelection);
  // Props defaults and destructuring.
  var props = extends_extends({}, defaultProps, userProps);
  var getA11yStatusMessage = props.getA11yStatusMessage,
    environment = props.environment,
    keyNavigationNext = props.keyNavigationNext,
    keyNavigationPrevious = props.keyNavigationPrevious;

  // Reducer init.
  var _useControlledReducer = useControlledReducer$1(downshiftMultipleSelectionReducer, props, getInitialState, isStateEqual),
    state = _useControlledReducer[0],
    dispatch = _useControlledReducer[1];
  var activeIndex = state.activeIndex,
    selectedItems = state.selectedItems;

  // Refs.
  var isInitialMount = useIsInitialMount();
  var dropdownRef = (0,external_React_namespaceObject.useRef)(null);
  var selectedItemRefs = (0,external_React_namespaceObject.useRef)();
  selectedItemRefs.current = [];
  var latest = useLatestRef({
    state: state,
    props: props
  });

  // Effects.
  // Adds an a11y aria live status message if getA11yStatusMessage is passed.
  useA11yMessageStatus(getA11yStatusMessage, state, [activeIndex, selectedItems], environment);
  // Sets focus on active item.
  (0,external_React_namespaceObject.useEffect)(function () {
    if (isInitialMount) {
      return;
    }
    if (activeIndex === -1 && dropdownRef.current) {
      dropdownRef.current.focus();
    } else if (selectedItemRefs.current[activeIndex]) {
      selectedItemRefs.current[activeIndex].focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);
  useControlPropsValidator({
    props: props,
    state: state
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker('getDropdownProps');

  // Event handler functions.
  var selectedItemKeyDownHandlers = (0,external_React_namespaceObject.useMemo)(function () {
    var _ref;
    return _ref = {}, _ref[keyNavigationPrevious] = function () {
      dispatch({
        type: SelectedItemKeyDownNavigationPrevious
      });
    }, _ref[keyNavigationNext] = function () {
      dispatch({
        type: SelectedItemKeyDownNavigationNext
      });
    }, _ref.Delete = function Delete() {
      dispatch({
        type: SelectedItemKeyDownDelete
      });
    }, _ref.Backspace = function Backspace() {
      dispatch({
        type: SelectedItemKeyDownBackspace
      });
    }, _ref;
  }, [dispatch, keyNavigationNext, keyNavigationPrevious]);
  var dropdownKeyDownHandlers = (0,external_React_namespaceObject.useMemo)(function () {
    var _ref2;
    return _ref2 = {}, _ref2[keyNavigationPrevious] = function (event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownNavigationPrevious
        });
      }
    }, _ref2.Backspace = function Backspace(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownBackspace
        });
      }
    }, _ref2;
  }, [dispatch, keyNavigationPrevious]);

  // Getter props.
  var getSelectedItemProps = (0,external_React_namespaceObject.useCallback)(function (_temp) {
    var _extends2;
    var _ref3 = _temp === void 0 ? {} : _temp,
      _ref3$refKey = _ref3.refKey,
      refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
      ref = _ref3.ref,
      onClick = _ref3.onClick,
      onKeyDown = _ref3.onKeyDown,
      selectedItemProp = _ref3.selectedItem,
      indexProp = _ref3.index,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref3, _excluded);
    var latestState = latest.current.state;
    var _getItemAndIndex = getItemAndIndex(selectedItemProp, indexProp, latestState.selectedItems, 'Pass either item or index to getSelectedItemProps!'),
      index = _getItemAndIndex[1];
    var isFocusable = index > -1 && index === latestState.activeIndex;
    var selectedItemHandleClick = function selectedItemHandleClick() {
      dispatch({
        type: SelectedItemClick,
        index: index
      });
    };
    var selectedItemHandleKeyDown = function selectedItemHandleKeyDown(event) {
      var key = normalizeArrowKey(event);
      if (key && selectedItemKeyDownHandlers[key]) {
        selectedItemKeyDownHandlers[key](event);
      }
    };
    return extends_extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (selectedItemNode) {
      if (selectedItemNode) {
        selectedItemRefs.current.push(selectedItemNode);
      }
    }), _extends2.tabIndex = isFocusable ? 0 : -1, _extends2.onClick = callAllEventHandlers(onClick, selectedItemHandleClick), _extends2.onKeyDown = callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown), _extends2), rest);
  }, [dispatch, latest, selectedItemKeyDownHandlers]);
  var getDropdownProps = (0,external_React_namespaceObject.useCallback)(function (_temp2, _temp3) {
    var _extends3;
    var _ref4 = _temp2 === void 0 ? {} : _temp2,
      _ref4$refKey = _ref4.refKey,
      refKey = _ref4$refKey === void 0 ? 'ref' : _ref4$refKey,
      ref = _ref4.ref,
      onKeyDown = _ref4.onKeyDown,
      onClick = _ref4.onClick,
      _ref4$preventKeyActio = _ref4.preventKeyAction,
      preventKeyAction = _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref4, _excluded2);
    var _ref5 = _temp3 === void 0 ? {} : _temp3,
      _ref5$suppressRefErro = _ref5.suppressRefError,
      suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
    setGetterPropCallInfo('getDropdownProps', suppressRefError, refKey, dropdownRef);
    var dropdownHandleKeyDown = function dropdownHandleKeyDown(event) {
      var key = normalizeArrowKey(event);
      if (key && dropdownKeyDownHandlers[key]) {
        dropdownKeyDownHandlers[key](event);
      }
    };
    var dropdownHandleClick = function dropdownHandleClick() {
      dispatch({
        type: DropdownClick
      });
    };
    return extends_extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (dropdownNode) {
      if (dropdownNode) {
        dropdownRef.current = dropdownNode;
      }
    }), _extends3), !preventKeyAction && {
      onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
      onClick: callAllEventHandlers(onClick, dropdownHandleClick)
    }, rest);
  }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]);

  // returns
  var addSelectedItem = (0,external_React_namespaceObject.useCallback)(function (selectedItem) {
    dispatch({
      type: FunctionAddSelectedItem,
      selectedItem: selectedItem
    });
  }, [dispatch]);
  var removeSelectedItem = (0,external_React_namespaceObject.useCallback)(function (selectedItem) {
    dispatch({
      type: FunctionRemoveSelectedItem,
      selectedItem: selectedItem
    });
  }, [dispatch]);
  var setSelectedItems = (0,external_React_namespaceObject.useCallback)(function (newSelectedItems) {
    dispatch({
      type: FunctionSetSelectedItems,
      selectedItems: newSelectedItems
    });
  }, [dispatch]);
  var setActiveIndex = (0,external_React_namespaceObject.useCallback)(function (newActiveIndex) {
    dispatch({
      type: FunctionSetActiveIndex,
      activeIndex: newActiveIndex
    });
  }, [dispatch]);
  var reset = (0,external_React_namespaceObject.useCallback)(function () {
    dispatch({
      type: FunctionReset
    });
  }, [dispatch]);
  return {
    getSelectedItemProps: getSelectedItemProps,
    getDropdownProps: getDropdownProps,
    addSelectedItem: addSelectedItem,
    removeSelectedItem: removeSelectedItem,
    setSelectedItems: setSelectedItems,
    setActiveIndex: setActiveIndex,
    reset: reset,
    selectedItems: selectedItems,
    activeIndex: activeIndex
  };
}



;// CONCATENATED MODULE: ./src/icons.js

const DblVerticalDots = () => {
  return createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256"
  }, createElement("rect", {
    width: "256",
    height: "256",
    fill: "none"
  }), createElement("circle", {
    cx: "91",
    cy: "60",
    r: "16"
  }), createElement("circle", {
    cx: "91",
    cy: "128",
    r: "16"
  }), createElement("circle", {
    cx: "91",
    cy: "196",
    r: "16"
  }), createElement("circle", {
    cx: "161",
    cy: "60",
    r: "16"
  }), createElement("circle", {
    cx: "161",
    cy: "128",
    r: "16"
  }), createElement("circle", {
    cx: "161",
    cy: "196",
    r: "16"
  }));
};
const Close = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M9.414 8l3.293-3.293-1.414-1.414L8 6.586 4.707 3.293 3.293 4.707 6.586 8l-3.293 3.293 1.414 1.414L8 9.414l3.293 3.293 1.414-1.414L9.414 8z"
  }));
};
const Line = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M1 7h14v2H1z"
  }));
};
const LineDashed = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M0 7h4v2H0zm6 0h4v2H6zm6 0h4v2h-4z"
  }));
};
const LineDotted = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M1 7h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2z"
  }));
};
const Square = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "16",
    height: "16",
    viewBox: "0 0 256 256",
    style: {
      opacity: 0.1
    }
  }, (0,external_React_namespaceObject.createElement)("rect", {
    width: "256",
    height: "256",
    fill: "none"
  }), (0,external_React_namespaceObject.createElement)("rect", {
    x: "32",
    y: "32",
    width: "192",
    height: "192",
    rx: "16"
  }));
};
const RoundedSquare = () => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fillRule: "evenodd",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M18.895,1.105C20.368,2.579 20.368,17.421 18.895,18.895C17.421,20.368 2.579,20.368 1.105,18.895C-0.368,17.421 -0.368,2.579 1.105,1.105C2.579,-0.368 17.421,-0.368 18.895,1.105ZM17.116,2.884C18.295,4.063 18.295,15.937 17.116,17.116C15.937,18.295 4.063,18.295 2.884,17.116C1.705,15.937 1.705,4.063 2.884,2.884C4.063,1.705 15.937,1.705 17.116,2.884Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M15.93,4.07C16.912,5.053 16.912,14.947 15.93,15.93C14.947,16.912 5.053,16.912 4.07,15.93C3.088,14.947 3.088,5.053 4.07,4.07C5.053,3.088 14.947,3.088 15.93,4.07Z"
  }));
};
const ArrowLeft = () => {
  return createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), createElement("path", {
    d: "m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z"
  }));
};
const ArrowUp = () => {
  return createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), createElement("path", {
    d: "m5 9 1.41 1.41L11 5.83V22h2V5.83l4.59 4.59L19 9l-7-7-7 7z"
  }));
};
const DropdownArrow = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    viewBox: "0 0 20 20",
    width: size ? size : 20,
    height: size ? size : 20,
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M5 6l5 5 5-5 2 1-7 7-7-7 2-1z",
    fill: "#0a0a0a",
    style: {
      transformOrigin: 'center'
    }
  }));
};
const NotAllowed = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 18.5A6.5 6.5 0 0 1 6.93 7.931l9.139 9.138A6.473 6.473 0 0 1 12 18.5Zm5.123-2.498a6.5 6.5 0 0 0-9.124-9.124l9.124 9.124ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
  }));
};
const OverlineIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M7 4v1h10V4H7zm5 14c1.5 0 2.6-.4 3.4-1.2.8-.8 1.1-2 1.1-3.5V7H15v5.8c0 1.2-.2 2.1-.6 2.8-.4.7-1.2 1-2.4 1s-2-.3-2.4-1c-.4-.7-.6-1.6-.6-2.8V7H7.5v6.2c0 1.5.4 2.7 1.1 3.5.8.9 1.9 1.3 3.4 1.3z"
  }));
};
const LayoutIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M14 22H2V10h12v12ZM3.999 12v8h8v-8h-8ZM22 22h-6V10h6v12Zm-4-10v8h2v-8h-2ZM22 8H2V2h20v6ZM4 4v2h16V4H4Z"
  }));
};
const SizingIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    fillRule: "evenodd",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M7.95 22v-6.95H2v-2.1h5.95V5H6l3-3 3 3h-1.95v7.95H19V11l3 3-3 3v-1.95h-8.95V22h-2.1Z"
  }));
};
const SpacingIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    fillRule: "evenodd",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M22 2v20H2V2h20Zm-2 2H4v16h16V4Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M16.586 18H7.414l2-2h5.172l2 2ZM8 9.414v5.172l-2 2V7.414l2 2Zm10 7.172-2-2V9.414l2-2v9.172ZM14.586 8H9.414l-2-2h9.172l-2 2Z"
  }));
};
const BordersIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    fillRule: "evenodd",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M2 6.036v-4.03c4.298 0 8.596-.026 12.893.001 3.746.071 7.083 3.41 7.107 7.199v12.8h-4.03v-2H20c0-3.645.067-7.29-.002-10.935-.084-2.665-2.439-5.013-5.13-5.064-3.618-.023-7.235-.001-10.852-.001H4v2.03H2Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M4 10.036v-2H2v2h2ZM4 14.036v-2H2v2h2ZM4 18.031v-2H2v2h2ZM4 22.006v-2H2v2h2Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "M2 20.006h2v2H2zM6 20.006h2v2H6zM10 20.006h2v2h-2zM13.996 20.006h2v2h-2z"
  }));
};
const TypographyIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "m8.824 5.832 4.448 12.164H11.11l-1.304-3.554H5.43a70.44 70.44 0 0 1-.661 1.768c-.214.607-.429 1.197-.643 1.786H2.001L6.448 5.832h2.376ZM7.609 8.386l-1.536 4.323h3.09L7.609 8.386ZM22.002 17.764a3.626 3.626 0 0 1-.446.232 2.065 2.065 0 0 1-.34.125c-.107.036-.196.036-.268.054h-.178c-.215 0-.411-.036-.572-.125a1.361 1.361 0 0 1-.464-.286 2.916 2.916 0 0 1-.34-.447 2.712 2.712 0 0 1-.232-.518c-.268.268-.518.501-.75.661a4.194 4.194 0 0 1-.679.429 2.666 2.666 0 0 1-.679.214 3.101 3.101 0 0 1-.714.072c-.393 0-.768-.072-1.126-.197a2.638 2.638 0 0 1-.893-.536 2.148 2.148 0 0 1-.607-.821 2.698 2.698 0 0 1-.214-1.09c0-.339.071-.643.232-.893.143-.232.357-.464.607-.643.25-.196.536-.339.858-.482.321-.125.66-.25.982-.357.339-.108.679-.215 1-.322.322-.089.608-.196.858-.304.25-.107.464-.232.607-.375a.622.622 0 0 0 .232-.482.808.808 0 0 0-.143-.482 1.185 1.185 0 0 0-.357-.304 2.376 2.376 0 0 0-.5-.161 3.087 3.087 0 0 0-.536-.053c-.179 0-.357.018-.536.071a1.628 1.628 0 0 0-.464.232 1.41 1.41 0 0 0-.375.411c-.09.161-.161.357-.179.59h-2.09c.036-.518.161-.965.375-1.34.215-.393.5-.697.84-.947.339-.25.714-.446 1.143-.571a5.085 5.085 0 0 1 1.286-.179c.464 0 .929.054 1.358.161.428.107.821.268 1.143.5.339.214.607.518.804.857.196.358.285.786.285 1.269v4.322a.42.42 0 0 0 .125.304.363.363 0 0 0 .322.161c.018 0 .071-.018.179-.036.125-.018.267-.072.446-.161v1.447Zm-3.126-4.019a3.016 3.016 0 0 1-.518.214c-.214.072-.446.125-.696.197-.25.071-.501.143-.769.214-.25.072-.464.161-.678.268a1.481 1.481 0 0 0-.5.357.66.66 0 0 0-.197.483c0 .178.036.339.089.464a.814.814 0 0 0 .233.304.706.706 0 0 0 .321.178c.125.036.25.072.375.072.393 0 .804-.143 1.215-.411.429-.268.804-.679 1.125-1.233v-1.107Z",
    style: {
      fillRule: 'nonzero'
    }
  }));
};
const BackgroundsIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "m17.588 3.708.721.595L4.303 18.31l-.595-.721-.533-.98L16.608 3.176l.98.532ZM14.013 2.202l.565.176-12.2 12.2-.176-.565-.191-1.896L12.116 2.011l1.897.191ZM8.696 2.603 2.602 8.696c.979-2.868 3.238-5.134 6.094-6.093ZM20.29 6.41l.56 1.031L7.441 20.85l-1.032-.56-.677-.559L19.731 5.732l.559.678ZM21.795 9.985l.194 1.921L11.906 21.99l-1.921-.194-.545-.169L21.626 9.441l.169.544ZM21.393 15.31c-.978 2.863-3.236 5.128-6.083 6.083l6.083-6.083Z"
  }));
};
const EffectsIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    width: size ? size : 24,
    height: size ? size : 24,
    viewBox: "0 0 24 24",
    fillRule: "evenodd",
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M14.694 9.306 21.976 12l-7.282 2.694L12 21.976l-2.694-7.282L2.024 12l7.282-2.694L12 2.024l2.694 7.282Zm-3.832 1.556L7.787 12l3.075 1.138L12 16.213l1.138-3.075L16.213 12l-3.075-1.138L12 7.787l-1.138 3.075Z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    d: "m18.746 3.024.81 2.19 2.19.81-2.19.81-.81 2.19-.81-2.19-2.19-.81 2.19-.81.81-2.19ZM18.746 14.976l.81 2.19 2.19.81-2.19.81-.81 2.19-.81-2.19-2.19-.81 2.19-.81.81-2.19Z"
  }));
};
const PositionIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    width: size ? size : 24,
    height: size ? size : 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "m14.879 16.293 1.414 1.415L12 22l-4.293-4.292 1.415-1.415L12 19.172l2.879-2.879ZM6.293 7.708l1.414 1.414L4.829 12l2.878 2.879-1.414 1.414L2 12l4.293-4.292ZM22 12l-4.293 4.293-1.414-1.414L19.172 12l-2.879-2.878 1.414-1.414L22 12Zm-5.707-5.707-1.414 1.415L12 4.829 9.122 7.708 7.707 6.293 12 2l4.293 4.293ZM14.879 12.05l-2.829 2.829-2.928-2.928 2.829-2.829 2.928 2.928Zm-2.929-.099.099.099-.099-.099Z"
  }));
};
const MediaIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    width: size ? size : 24,
    height: size ? size : 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("path", {
    d: "M3.013 4h2v2h-2zM3.013 18h2v2h-2zM7.013 4h2v2h-2zM7.013 18h2v2h-2zM11.013 4h2v2h-2zM11.013 18h2v2h-2zM15.008 4h2v2h-2zM15.008 18h2v2h-2zM18.983 4h2v2h-2zM18.983 18h2v2h-2zM20.998 15.12H2.999l4.284-4.286 2.144 2.143 4.714-4.715 6.857 6.858Z"
  }));
};
const MoreIcon = ({
  size,
  ...props
}) => {
  return (0,external_React_namespaceObject.createElement)("svg", {
    viewBox: "0 0 24 24",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,external_React_namespaceObject.createElement)("rect", {
    x: "7.052",
    y: "10.981",
    width: "2",
    height: "2"
  }), (0,external_React_namespaceObject.createElement)("rect", {
    x: "11.052",
    y: "10.981",
    width: "2",
    height: "2"
  }), (0,external_React_namespaceObject.createElement)("rect", {
    x: "15.052",
    y: "10.981",
    width: "2",
    height: "2"
  }));
};
;// CONCATENATED MODULE: ./src/components/CustomSelect/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const CustomSelect_editor_module = ({"button":"F6FAGOiS5rfiLeQw3Gtn","control":"Pxggqdzg_v6d33mlECgQ","open":"uwAkXU3I8l01k0qCAX56","icon":"o5tTlhRMIHahbKUJuoWQ","dropdown":"NXzqCgqf_9fWTPj4lTf7","hidden":"ohNCGRXHpBrRdxh8VHre","item":"N8HkywMZc25sTg3IBSds","highlighted":"LDaY7rXOgLrbtNTI03Pl","selected":"U0TZVWwYhensoftfG_Rb","has-icon":"S8waB8_ufJhw9MMNEcZX","help":"JQyR0eCHwTDKnurHZ1lz"});
;// CONCATENATED MODULE: ./src/components/CustomSelect/CustomSelect.jsx








function DefaultItemComponent({
  item
}) {
  return (0,external_React_namespaceObject.createElement)("span", null, item.label);
}
function CustomSelect({
  label,
  onChange,
  id,
  help,
  className = '',
  items = [],
  selectedItem = null,
  selectedStyle = 'highlight',
  defaultText = (0,external_wp_i18n_namespaceObject.__)('Select…', 'generateblocks-pro'),
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
  itemToString = item => {
    return item ? item.label : '';
  },
  ItemComponent = DefaultItemComponent
}) {
  const hookProps = {
    items,
    itemToString,
    selectedItem
  };
  if (onChange) {
    hookProps.onSelectedItemChange = ({
      selectedItem: selected
    }) => {
      onChange(selected);
    };
  }
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect(hookProps);
  const toggleButtonProps = getToggleButtonProps({
    id,
    'aria-describedby': help && id ? `${id}__help` : undefined
  });
  const showSelectedIcon = 'icon' === selectedStyle;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    className: dist_clsx(CustomSelect_editor_module.control, className),
    label: label,
    id: toggleButtonProps.id,
    help: help
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: CustomSelect_editor_module.header
  }, label && (0,external_React_namespaceObject.createElement)("div", {
    ...getLabelProps({
      className: CustomSelect_editor_module.label
    })
  }, label), (0,external_React_namespaceObject.createElement)("button", {
    className: dist_clsx(CustomSelect_editor_module.button, isOpen && CustomSelect_editor_module.open),
    ...toggleButtonProps
  }, selectedItem ? (0,external_React_namespaceObject.createElement)(ItemComponent, {
    item: selectedItem
  }) : defaultText, (0,external_React_namespaceObject.createElement)("span", {
    className: CustomSelect_editor_module.icon
  }, (0,external_React_namespaceObject.createElement)(DropdownArrow, {
    size: "12"
  })))), (0,external_React_namespaceObject.createElement)("ul", {
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel,
    className: dist_clsx(CustomSelect_editor_module.dropdown, !isOpen && CustomSelect_editor_module.hidden),
    ...getMenuProps()
  }, isOpen && items.map((item, index) => {
    const isSelected = selectedItem === item;
    const isHighlighted = highlightedIndex === index;
    return (0,external_React_namespaceObject.createElement)("li", {
      key: item.id,
      className: dist_clsx(isHighlighted && CustomSelect_editor_module.highlighted, !showSelectedIcon && isSelected && CustomSelect_editor_module.selected, CustomSelect_editor_module.item, showSelectedIcon && CustomSelect_editor_module['has-icon']),
      ...getItemProps({
        item,
        index
      })
    }, (0,external_React_namespaceObject.createElement)(ItemComponent, {
      item: item
    }), showSelectedIcon && isSelected && (0,external_React_namespaceObject.createElement)(icon, {
      icon: library_check,
      size: "18"
    }));
  })));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/trash.js

/**
 * WordPress dependencies
 */

const trash = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"
}));
/* harmony default export */ const library_trash = (trash);
//# sourceMappingURL=trash.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/external.js

/**
 * WordPress dependencies
 */

const external = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M19.5 4.5h-7V6h4.44l-5.97 5.97 1.06 1.06L18 7.06v4.44h1.5v-7Zm-13 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3H17v3a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h3V5.5h-3Z"
}));
/* harmony default export */ const library_external = (external);
//# sourceMappingURL=external.js.map
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify_stringify(arr, offset = 0) {
  var uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (0)));
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/close.js

/**
 * WordPress dependencies
 */

const close_close = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
}));
/* harmony default export */ const library_close = (close_close);
//# sourceMappingURL=close.js.map
;// CONCATENATED MODULE: external ["wp","compose"]
const external_wp_compose_namespaceObject = window["wp"]["compose"];
;// CONCATENATED MODULE: ./node_modules/parsel-js/dist/parsel.js
const TOKENS = {
    attribute: /\[\s*(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu,
    id: /#(?<name>[-\w\P{ASCII}]+)/gu,
    class: /\.(?<name>[-\w\P{ASCII}]+)/gu,
    comma: /\s*,\s*/g,
    combinator: /\s*[\s>+~]\s*/g,
    'pseudo-element': /::(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
    'pseudo-class': /:(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
    universal: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?\*/gu,
    type: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)/gu, // this must be last
};
const TRIM_TOKENS = new Set(['combinator', 'comma']);
const RECURSIVE_PSEUDO_CLASSES = new Set([
    'not',
    'is',
    'where',
    'has',
    'matches',
    '-moz-any',
    '-webkit-any',
    'nth-child',
    'nth-last-child',
]);
const nthChildRegExp = /(?<index>[\dn+-]+)\s+of\s+(?<subtree>.+)/;
const RECURSIVE_PSEUDO_CLASSES_ARGS = {
    'nth-child': nthChildRegExp,
    'nth-last-child': nthChildRegExp,
};
const getArgumentPatternByType = (type) => {
    switch (type) {
        case 'pseudo-element':
        case 'pseudo-class':
            return new RegExp(TOKENS[type].source.replace('(?<argument>¶*)', '(?<argument>.*)'), 'gu');
        default:
            return TOKENS[type];
    }
};
function gobbleParens(text, offset) {
    let nesting = 0;
    let result = '';
    for (; offset < text.length; offset++) {
        const char = text[offset];
        switch (char) {
            case '(':
                ++nesting;
                break;
            case ')':
                --nesting;
                break;
        }
        result += char;
        if (nesting === 0) {
            return result;
        }
    }
    return result;
}
function tokenizeBy(text, grammar = TOKENS) {
    if (!text) {
        return [];
    }
    const tokens = [text];
    for (const [type, pattern] of Object.entries(grammar)) {
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (typeof token !== 'string') {
                continue;
            }
            pattern.lastIndex = 0;
            const match = pattern.exec(token);
            if (!match) {
                continue;
            }
            const from = match.index - 1;
            const args = [];
            const content = match[0];
            const before = token.slice(0, from + 1);
            if (before) {
                args.push(before);
            }
            args.push({
                ...match.groups,
                type,
                content,
            });
            const after = token.slice(from + content.length + 1);
            if (after) {
                args.push(after);
            }
            tokens.splice(i, 1, ...args);
        }
    }
    let offset = 0;
    for (const token of tokens) {
        switch (typeof token) {
            case 'string':
                throw new Error(`Unexpected sequence ${token} found at index ${offset}`);
            case 'object':
                offset += token.content.length;
                token.pos = [offset - token.content.length, offset];
                if (TRIM_TOKENS.has(token.type)) {
                    token.content = token.content.trim() || ' ';
                }
                break;
        }
    }
    return tokens;
}
const STRING_PATTERN = /(['"])([^\\\n]+?)\1/g;
const ESCAPE_PATTERN = /\\./g;
function tokenize(selector, grammar = TOKENS) {
    // Prevent leading/trailing whitespaces from being interpreted as combinators
    selector = selector.trim();
    if (selector === '') {
        return [];
    }
    const replacements = [];
    // Replace escapes with placeholders.
    selector = selector.replace(ESCAPE_PATTERN, (value, offset) => {
        replacements.push({ value, offset });
        return '\uE000'.repeat(value.length);
    });
    // Replace strings with placeholders.
    selector = selector.replace(STRING_PATTERN, (value, quote, content, offset) => {
        replacements.push({ value, offset });
        return `${quote}${'\uE001'.repeat(content.length)}${quote}`;
    });
    // Replace parentheses with placeholders.
    {
        let pos = 0;
        let offset;
        while ((offset = selector.indexOf('(', pos)) > -1) {
            const value = gobbleParens(selector, offset);
            replacements.push({ value, offset });
            selector = `${selector.substring(0, offset)}(${'¶'.repeat(value.length - 2)})${selector.substring(offset + value.length)}`;
            pos = offset + value.length;
        }
    }
    // Now we have no nested structures and we can parse with regexes
    const tokens = tokenizeBy(selector, grammar);
    // Replace placeholders in reverse order.
    const changedTokens = new Set();
    for (const replacement of replacements.reverse()) {
        for (const token of tokens) {
            const { offset, value } = replacement;
            if (!(token.pos[0] <= offset &&
                offset + value.length <= token.pos[1])) {
                continue;
            }
            const { content } = token;
            const tokenOffset = offset - token.pos[0];
            token.content =
                content.slice(0, tokenOffset) +
                    value +
                    content.slice(tokenOffset + value.length);
            if (token.content !== content) {
                changedTokens.add(token);
            }
        }
    }
    // Update changed tokens.
    for (const token of changedTokens) {
        const pattern = getArgumentPatternByType(token.type);
        if (!pattern) {
            throw new Error(`Unknown token type: ${token.type}`);
        }
        pattern.lastIndex = 0;
        const match = pattern.exec(token.content);
        if (!match) {
            throw new Error(`Unable to parse content for ${token.type}: ${token.content}`);
        }
        Object.assign(token, match.groups);
    }
    return tokens;
}
/**
 *  Convert a flat list of tokens into a tree of complex & compound selectors
 */
function nestTokens(tokens, { list = true } = {}) {
    if (list && tokens.find((t) => t.type === 'comma')) {
        const selectors = [];
        const temp = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'comma') {
                if (temp.length === 0) {
                    throw new Error('Incorrect comma at ' + i);
                }
                selectors.push(nestTokens(temp, { list: false }));
                temp.length = 0;
            }
            else {
                temp.push(tokens[i]);
            }
        }
        if (temp.length === 0) {
            throw new Error('Trailing comma');
        }
        else {
            selectors.push(nestTokens(temp, { list: false }));
        }
        return { type: 'list', list: selectors };
    }
    for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        if (token.type === 'combinator') {
            let left = tokens.slice(0, i);
            let right = tokens.slice(i + 1);
            return {
                type: 'complex',
                combinator: token.content,
                left: nestTokens(left),
                right: nestTokens(right),
            };
        }
    }
    switch (tokens.length) {
        case 0:
            throw new Error('Could not build AST.');
        case 1:
            // If we're here, there are no combinators, so it's just a list.
            return tokens[0];
        default:
            return {
                type: 'compound',
                list: [...tokens], // clone to avoid pointers messing up the AST
            };
    }
}
/**
 * Traverse an AST in depth-first order
 */
function* flatten(node, 
/**
 * @internal
 */
parent) {
    switch (node.type) {
        case 'list':
            for (let child of node.list) {
                yield* flatten(child, node);
            }
            break;
        case 'complex':
            yield* flatten(node.left, node);
            yield* flatten(node.right, node);
            break;
        case 'compound':
            yield* node.list.map((token) => [token, node]);
            break;
        default:
            yield [node, parent];
    }
}
/**
 * Traverse an AST (or part thereof), in depth-first order
 */
function walk(node, visit, 
/**
 * @internal
 */
parent) {
    if (!node) {
        return;
    }
    for (const [token, ast] of flatten(node, parent)) {
        visit(token, ast);
    }
}
/**
 * Parse a CSS selector
 *
 * @param selector - The selector to parse
 * @param options.recursive - Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @param options.list - Whether this can be a selector list (A, B, C etc). Defaults to true.
 */
function parsel_parse(selector, { recursive = true, list = true } = {}) {
    const tokens = tokenize(selector);
    if (!tokens) {
        return;
    }
    const ast = nestTokens(tokens, { list });
    if (!recursive) {
        return ast;
    }
    for (const [token] of flatten(ast)) {
        if (token.type !== 'pseudo-class' || !token.argument) {
            continue;
        }
        if (!RECURSIVE_PSEUDO_CLASSES.has(token.name)) {
            continue;
        }
        let argument = token.argument;
        const childArg = RECURSIVE_PSEUDO_CLASSES_ARGS[token.name];
        if (childArg) {
            const match = childArg.exec(argument);
            if (!match) {
                continue;
            }
            Object.assign(token, match.groups);
            argument = match.groups['subtree'];
        }
        if (!argument) {
            continue;
        }
        Object.assign(token, {
            subtree: parsel_parse(argument, {
                recursive: true,
                list: true,
            }),
        });
    }
    return ast;
}
/**
 * Converts the given list or (sub)tree to a string.
 */
function parsel_stringify(listOrNode) {
    let tokens;
    if (Array.isArray(listOrNode)) {
        tokens = listOrNode;
    }
    else {
        tokens = [...flatten(listOrNode)].map(([token]) => token);
    }
    return tokens.map(token => token.content).join('');
}
/**
 * To convert the specificity array to a number
 */
function specificityToNumber(specificity, base) {
    base = base || Math.max(...specificity) + 1;
    return (specificity[0] * (base << 1) + specificity[1] * base + specificity[2]);
}
/**
 * Calculate specificity of a selector.
 *
 * If the selector is a list, the max specificity is returned.
 */
function specificity(selector) {
    let ast = selector;
    if (typeof ast === 'string') {
        ast = parsel_parse(ast, { recursive: true });
    }
    if (!ast) {
        return [];
    }
    if (ast.type === 'list' && 'list' in ast) {
        let base = 10;
        const specificities = ast.list.map((ast) => {
            const sp = specificity(ast);
            base = Math.max(base, ...specificity(ast));
            return sp;
        });
        const numbers = specificities.map((ast) => specificityToNumber(ast, base));
        return specificities[numbers.indexOf(Math.max(...numbers))];
    }
    const ret = [0, 0, 0];
    for (const [token] of flatten(ast)) {
        switch (token.type) {
            case 'id':
                ret[0]++;
                break;
            case 'class':
            case 'attribute':
                ret[1]++;
                break;
            case 'pseudo-element':
            case 'type':
                ret[2]++;
                break;
            case 'pseudo-class':
                if (token.name === 'where') {
                    break;
                }
                if (!RECURSIVE_PSEUDO_CLASSES.has(token.name) ||
                    !token.subtree) {
                    ret[1]++;
                    break;
                }
                const sub = specificity(token.subtree);
                sub.forEach((s, i) => (ret[i] += s));
                // :nth-child() & :nth-last-child() add (0, 1, 0) to the specificity of their most complex selector
                if (token.name === 'nth-child' ||
                    token.name === 'nth-last-child') {
                    ret[1]++;
                }
        }
    }
    return ret;
}



;// CONCATENATED MODULE: external ["wp","data"]
const external_wp_data_namespaceObject = window["wp"]["data"];
;// CONCATENATED MODULE: external ["wp","coreData"]
const external_wp_coreData_namespaceObject = window["wp"]["coreData"];
;// CONCATENATED MODULE: ./src/hooks.js





function getSelectedBlockSelector(clientId) {
  return `.editor-styles-wrapper [data-block="${clientId}"]:not(.gb-is-root-block):not([data-block-wrapper])`;
}
function useSelectedBlockElements() {
  const {
    getSelectedBlockClientIds
  } = (0,external_wp_data_namespaceObject.useSelect)(select => select('core/block-editor'), []);
  const clientIds = getSelectedBlockClientIds();
  const deviceType = useDeviceType();
  const [elements, setElements] = (0,external_wp_element_namespaceObject.useState)([]);
  (0,external_wp_element_namespaceObject.useLayoutEffect)(() => {
    if (!clientIds.length) {
      return;
    }
    const queryDocument = document.querySelector('iframe[name="editor-canvas"]')?.contentDocument || document;
    setElements(clientIds.map(clientId => {
      return queryDocument.querySelector(getSelectedBlockSelector(clientId));
    }).filter(element => null !== element));
  }, [clientIds, deviceType]); // Device type included to trigger re-render when device type changes.

  return elements;
}
function useSelectedBlockElement() {
  const {
    getSelectedBlockClientId
  } = (0,external_wp_data_namespaceObject.useSelect)(select => select('core/block-editor'), []);
  const clientId = getSelectedBlockClientId();
  const selector = getSelectedBlockSelector(clientId);
  const [element, setElement] = (0,external_wp_element_namespaceObject.useState)(document.querySelector(selector));
  const deviceType = useDeviceType();
  (0,external_wp_element_namespaceObject.useLayoutEffect)(() => {
    if (!clientId) {
      return;
    }
    const iframe = document.querySelector('iframe[name="editor-canvas"]');
    if (iframe) {
      iframe.addEventListener('load', () => {
        setElement(iframe.contentDocument.querySelector(selector));
      }, {
        once: true
      });
      setElement(iframe.contentDocument.querySelector(selector));
      return;
    }
    setElement(document.querySelector(selector));
  }, [clientId, deviceType]); // Device type included to trigger re-render when device type changes.

  return element;
}

/**
 * Get the current preview device type (Desktop, Tablet, Mobile, etc). Uses the correct getter
 * function based on WordPress version.
 *
 * @return {string} The device type or an empty string if lookup fails.
 */
function useDeviceType() {
  return (0,external_wp_data_namespaceObject.useSelect)(select => {
    const {
      getDeviceType
    } = select('core/editor') || {};
    if ('function' === typeof getDeviceType) {
      return getDeviceType();
    }
    const {
      __experimentalGetPreviewDeviceType: getPreviewDeviceType = () => ''
    } = select('core/edit-post');

    /**
     * Experiemental fallback defaults to a simple empty string return to ensure
     * consistent handling if both functions aren't available.
     */
    return getPreviewDeviceType();
  }, []);
}
function usePanelSections({
  sectionState,
  setSectionState,
  storageKey,
  filtersActive = false,
  search = ''
}) {
  const allOpen = Object.values(sectionState).every(value => value);
  const cachedState = sessionStorage.getItem(storageKey);
  const stringifiedState = JSON.stringify(sectionState);
  if ((filtersActive || search) && !allOpen) {
    // Force all panels open
    setSectionState(prevState => {
      const newState = {
        ...prevState
      };
      for (const key in newState) {
        newState[key] = true;
      }
      return newState;
    });
  } else if (!filtersActive && !search && cachedState && cachedState !== stringifiedState) {
    setSectionState(JSON.parse(cachedState));
  }
  return {
    onSectionToggle: (key, value) => {
      if (key in sectionState) {
        /**
         * Reason: ToggleEvent fires for details elements with an open
         * prop on element mount (with no user interaction). This ensures
         * it only fires on interaction or if a state update has occured.
         *
         * State shouldn't be set or tracked if controls are being filtered.
         */
        if (sectionState[key] === value || filtersActive || search) {
          return;
        }
        setSectionState(prevState => {
          const newState = {
            ...prevState,
            [key]: value
          };
          sessionStorage.setItem(storageKey, JSON.stringify(newState));
          return newState;
        });
      }
    }
  };
}

/**
 * Get user permissions for the Styles Builder.
 *
 * @return {Object} Object of user permissions
 */
function usePermissions() {
  const canManageStyles = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.permissions.canManageStyles', () => canManageStyles);

  // Return other relevant permissions here.
  return {
    canManageStyles
  };
}
function useGlobalStyles() {
  return (0,external_wp_data_namespaceObject.useSelect)(select => {
    const {
      getEntityRecords
    } = select(external_wp_coreData_namespaceObject.store);
    const records = getEntityRecords('postType', 'gblocks_styles', {
      per_page: -1
    });
    return null === records ? [] : records.map(record => {
      return {
        classNameSelector: record.gb_style_selector,
        className: record.gb_style_selector.replace('.', ''),
        id: record.id
      };
    });
  }, []);
}

/**
 * Get the source and computed value of a CSS property for a list of elements
 * or a single element.
 *
 * @param {Object}                   props                The hook props.
 * @param {NodeList|HTMLElement}     props.elements       A list of elements or a single element
 * @param {string|string[]}          props.properties     A single CSS property or a list of CSS property to check
 * @param {CSSStyleDeclaration|null} props.computedStyles CSSStyleDeclarationObject to use for the check. Default null. If null, the computed styles of the element will be used.
 * @param {Object}                   props.appliedStyles  Object of device-specific block attributes
 * @param {string[]}                 props.sources        An array of sources to check.
 * @return {Object[]|Object|null}    An array of objects containing the source and value of the CSS property or a single object if a single element was passed.
 */
function useElementStyles({
  elements = null,
  properties,
  computedStyles = null,
  appliedStyles = {},
  sources = ['inline', 'tag']
}) {
  const singleProp = !Array.isArray(properties);
  const props = singleProp ? properties : [properties];
  if (null === elements) {
    return null;
  }
  if (Array.isArray(elements)) {
    const result = elements.map(element => {
      return getComputedStyleSources({
        element,
        props,
        computedStyles,
        appliedStyles,
        sources
      });
    });
    return singleProp ? result[properties] : result;
  }
  const result = getComputedStyleSources({
    element: elements,
    properties,
    computedStyles,
    appliedStyles,
    sources
  });
  return singleProp ? result[properties] : result;
}
;// CONCATENATED MODULE: external ["wp","editPost"]
const external_wp_editPost_namespaceObject = window["wp"]["editPost"];
;// CONCATENATED MODULE: ./src/inspector-controls/controls/control/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const control_editor_module = ({"header":"lAWoLNwAgMetvAjAip5R","label":"_6hlX93wnUqNe7D5PJcW","options":"MYZcghIOCUpCxfeO7nyl","dropdown":"LWnYnMCha0a2K6CJVFZr","popover":"gUS05NUlqvGvlL1dMoFe","control":"l04Ui1KOeLXiNizaChpP","inline":"UA22f7X2mbMaaCqY2PQi","description":"KHYMET8dBUWOaTH0w7hQ","close":"gyS5hbg0iksCut_ud7PA","pill":"ai57tIKAZG3UiBWbB7eA","local":"jb8Gxq2jbpNRmQgbV3yj","dot":"jSkbteW4cJrLeNap37wS","labelWrap":"IfV8tCYnj8aKYefykfIs","popoverContent":"HpciSCpHXNfl92dxbfjI","resetButton":"l51lmmC1EO0Z3V5JSqI2","indent":"qtyQwmD9PUHrSq7n3swk","rule":"lZfz0oxNC6bJyIin8ThN","button":"MhakxdDgMt4JjaHTOJt3","css":"GcOO1zAh1w3sDADo2YJ2"});
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/pencil.js

/**
 * WordPress dependencies
 */

const pencil = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z"
}));
/* harmony default export */ const library_pencil = (pencil);
//# sourceMappingURL=pencil.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/edit.js
/**
 * Internal dependencies
 */


/* harmony default export */ const edit = (library_pencil);
//# sourceMappingURL=edit.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/close-small.js

/**
 * WordPress dependencies
 */

const closeSmall = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ const close_small = (closeSmall);
//# sourceMappingURL=close-small.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/controls/control/IndicatorDot.jsx













function groupedSources(matchedSources) {
  const groups = {};
  for (const property in matchedSources) {
    const matchedSource = matchedSources[property];

    // Convert default atRule '' to 'all'.
    const atRule = matchedSource.atRule ? matchedSource.atRule : 'all';
    const selector = matchedSource.selector;
    if (!groups[atRule]) {
      groups[atRule] = {};
    }
    if (!groups[atRule][selector]) {
      groups[atRule][selector] = {};
    }
    groups[atRule][selector][property] = matchedSource;
  }
  return groups;
}
function SelectorGroup({
  selectorGroup,
  editStyle,
  setSearch,
  setLocalTab,
  cancelEditStyle,
  onAtRuleChange,
  canManageStyles,
  openGeneralSidebar,
  type,
  isNested = false
}) {
  const sanitizedSelector = selectorGroup[0].replace('.editor-styles-wrapper ', '');
  const parsedSelector = tokenize(sanitizedSelector);
  const className = parsedSelector[0].name;
  const classNameSelector = `.${className}`;
  return (0,external_React_namespaceObject.createElement)("div", {
    "data-declaration": true,
    key: selectorGroup[0],
    className: dist_clsx(isNested && control_editor_module.indent)
  }, (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)("span", {
    "data-selector": true
  }, classNameSelector), " ", (0,external_React_namespaceObject.createElement)("span", {
    "data-bracket": "open"
  }, '{')), (0,external_React_namespaceObject.createElement)("div", {
    "data-rules": true,
    className: control_editor_module.indent
  }, Object.entries(selectorGroup[1]).map(([property, matchedSource]) => (0,external_React_namespaceObject.createElement)("div", {
    key: property,
    "data-rule": true,
    className: control_editor_module.rule,
    tabIndex: "0"
  }, (0,external_React_namespaceObject.createElement)("span", {
    "data-property": property
  }, getKebabCaseProperty(property)), ": ", (0,external_React_namespaceObject.createElement)("span", {
    "data-value": true
  }, matchedSource.valueRaw), ";", !!canManageStyles && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    className: control_editor_module.button,
    variant: "link",
    label: (0,external_wp_i18n_namespaceObject.__)('Go to style source', 'generateblocks-pro'),
    showTooltip: true,
    size: "small",
    iconSize: "18",
    icon: edit,
    onClick: async () => {
      try {
        const options = {
          atRule: matchedSource.atRule
        };
        let addAmpersand = false;
        const filteredSelector = parsel_stringify(parsedSelector.filter((token, i) => {
          if (token.name === className && i === 0) {
            return false;
          }
          if (token.type === 'combinator' && i === 1) {
            return false;
          } else if (i === 1 && token.type !== 'combinator') {
            addAmpersand = true;
          }
          return true;
        }));
        if (filteredSelector) {
          options.nestedRule = addAmpersand ? `&${filteredSelector}` : filteredSelector;
        }
        if ('global' === type) {
          await editStyle(classNameSelector, options);
          setSearch(property, type);
        } else if ('local' === type && setLocalTab && cancelEditStyle && openGeneralSidebar) {
          await cancelEditStyle();
          setSearch(property, type);
          setLocalTab('styles');
          openGeneralSidebar('edit-post/block');
          onAtRuleChange(matchedSource.atRule);
        }
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    }
  })))), (0,external_React_namespaceObject.createElement)("div", {
    "data-bracket": "close"
  }, '}'));
}

/**
 * Display an indicator dot next to a control.
 *
 * @param {Object} props                Component props.
 * @param {Object} props.matchedSources An object of styles that match this element.
 * @param {string} props.atRule         The current atRule value.
 * @param {string} props.type           The type of indicator dot (local or global).
 * @return {JSX.Element} The component.
 */
function IndicatorDot({
  matchedSources,
  atRule,
  type
}) {
  const editStyle = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.indicators.onEditStyle', () => {});
  const setSearch = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.indicators.setSearch', () => {});
  const setLocalTab = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.indicators.setLocalTab', () => {});
  const cancelEditStyle = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.indicators.cancelEditStyle', () => {});
  const onAtRuleChange = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.indicators.onAtRuleChange', () => {});
  const {
    canManageStyles
  } = usePermissions();
  const {
    openGeneralSidebar
  } = (0,external_wp_data_namespaceObject.useDispatch)(external_wp_editPost_namespaceObject.store);
  const hasMatches = Object.keys(matchedSources).length > 0;
  const showDot = hasMatches && type;
  return showDot && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Dropdown, {
    className: dist_clsx(control_editor_module.popover, control_editor_module[type]),
    contentClassName: control_editor_module.popoverContent,
    renderToggle: ({
      onToggle
    }) => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      className: dist_clsx(control_editor_module.dot, control_editor_module[type]),
      onClick: onToggle
    }),
    renderContent: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      icon: close_small,
      label: (0,external_wp_i18n_namespaceObject.__)('Close', 'generateblocks-pro'),
      size: "small",
      className: control_editor_module.close,
      onClick: onClose
    }), (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
      direction: "vertical",
      gap: "2px",
      className: control_editor_module.css
    }, Object.entries(groupedSources(matchedSources)).map(atRuleGroup => {
      // If the atRule is 'all', don't output an at-rule around it.
      if ('all' === atRuleGroup[0]) {
        return Object.entries(atRuleGroup[1]).map(selectorGroup => (0,external_React_namespaceObject.createElement)(SelectorGroup, {
          key: selectorGroup[0],
          selectorGroup: selectorGroup,
          atRule: atRule,
          editStyle: editStyle,
          setSearch: setSearch,
          setLocalTab: setLocalTab,
          cancelEditStyle: cancelEditStyle,
          onAtRuleChange: onAtRuleChange,
          canManageStyles: canManageStyles,
          openGeneralSidebar: openGeneralSidebar,
          type: type
        }));
      }
      return (0,external_React_namespaceObject.createElement)("div", {
        className: control_editor_module.group,
        key: atRuleGroup[0],
        "data-at-rule-declaration": true
      }, (0,external_React_namespaceObject.createElement)("div", {
        "data-at-rule": atRuleGroup[0]
      }, atRuleGroup[0], " ", (0,external_React_namespaceObject.createElement)("span", {
        "data-bracket": "open"
      }, '{')), Object.entries(atRuleGroup[1]).map(selectorGroup => (0,external_React_namespaceObject.createElement)(SelectorGroup, {
        key: selectorGroup[0],
        selectorGroup: selectorGroup,
        atRule: atRule,
        editStyle: editStyle,
        setSearch: setSearch,
        setLocalTab: setLocalTab,
        cancelEditStyle: cancelEditStyle,
        onAtRuleChange: onAtRuleChange,
        canManageStyles: canManageStyles,
        openGeneralSidebar: openGeneralSidebar,
        type: type,
        isNested: true
      })), (0,external_React_namespaceObject.createElement)("div", {
        "data-bracket": "close"
      }, '}'));
    })))
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/control/ControlMenu.jsx






const ControlMenu = (0,external_wp_element_namespaceObject.memo)(function ControlMenu({
  dropdownOptions,
  dropdownChildren,
  allowCustomValue,
  usingCustomValue,
  setUsingCustomValue,
  learnMoreUrl,
  learnMoreLabel,
  beforeDropdownMenu,
  menuVisible = false
}) {
  return (0,external_React_namespaceObject.createElement)("div", {
    className: control_editor_module.options
  }, beforeDropdownMenu, menuVisible && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    className: control_editor_module.dropdown,
    icon: more_vertical,
    label: (0,external_wp_i18n_namespaceObject.__)('More options', 'generateblocks-pro'),
    controls: dropdownOptions,
    popoverProps: {
      className: control_editor_module.popover
    }
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, dropdownChildren && dropdownChildren({
    onClose
  }), allowCustomValue && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      setUsingCustomValue(!usingCustomValue);
      onClose();
    },
    suffix: usingCustomValue ? library_check : ''
  }, (0,external_wp_i18n_namespaceObject.__)('Enter Custom Value', 'generateblocks-pro'))), learnMoreUrl && learnMoreLabel && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: library_external,
    iconSize: 10,
    onClick: () => {
      window.open(learnMoreUrl, '_blank');
      onClose();
    }
  }, learnMoreLabel)))));
});
;// CONCATENATED MODULE: ./node_modules/react-use/esm/useFirstMountState.js

function useFirstMountState() {
    var isFirst = (0,external_React_namespaceObject.useRef)(true);
    if (isFirst.current) {
        isFirst.current = false;
        return true;
    }
    return isFirst.current;
}

;// CONCATENATED MODULE: ./node_modules/react-use/esm/useUpdateEffect.js


var useUpdateEffect = function (effect, deps) {
    var isFirstMount = useFirstMountState();
    (0,external_React_namespaceObject.useEffect)(function () {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
};
/* harmony default export */ const esm_useUpdateEffect = (useUpdateEffect);

;// CONCATENATED MODULE: ./src/inspector-controls/controls/control/Control.jsx














const textControlPropKeys = ['label', 'hideLabelFromVision', 'value', 'help', 'id', 'className', 'onChange', 'type'];
const HIDING_EMPTY_STORAGE_KEY = 'gbp-hide-empty-controls';
const SHOW_INHERITED_STORAGE_KEY = 'gbp-show-indicators';


const noDebounce = ['ColorPicker'];

/**
 * Wrapping component for Styles Builder controls.
 *
 *
 * @param {Object}                props                    - The component props.
 * @param {string}                props.id                 - The HTML ID of the control.
 * @param {JSX.Element}           props.children           - The child elements of the control.
 * @param {string}                props.label              - The label for the control.
 * @param {Array}                 props.dropdownOptions    - The options for the DropdownMenu.
 * @param {JSX.Element}           props.dropdownChildren   - The child elements of the DropdownMenu.
 * @param {string}                props.learnMoreLabel     - The label for the learn more link. The link displays at the bottom of the DropdownMenu.
 * @param {string}                props.learnMoreUrl       - The URL for the learn more link. The link displays at the bottom of the DropdownMenu.
 * @param {JSX.Element}           props.beforeDropdownMenu - The child elements to render before the DropdownMenu.
 * @param {JSX.Element}           props.afterLabel         - String or elements to display after the label.
 * @param {JSX.Element}           props.as                 - The component to render as. Component changes to a TextControl when a custom value is being entered.
 * @param {boolean}               props.allowCustomValue   - Whether to allow a custom value.
 * @param {boolean}               props.hasCustomValue     - If the value is a custom value. If true, displays the custom value input by default.
 * @param {string}                props.customValueHelp    - The help text that displays when a custom value is being entered.
 * @param {Function}              props.onChange           - onChange event handler for the component.
 * @param {Array}                 props.searchKeywords     - Array of keywords for search filtering.
 * @param {string}                props.value              - The current value of the control.
 * @param {Object}                props.style              - The inline style for the control.
 * @param {string|Object|boolean} props.cssProp            - CSS property(s) associated with the control. Used for style indicators and fallback value (if enabled).
 * @param {boolean}               props.fallback           - If true, the component will attempt to find the inherited style and display that in the control as a placeholder.
 * @param {Function}              props.onVisibilityChange - Callback that fires when the control's visibility state changes to a new value.
 * @param {boolean}               props.alwaysVisible      - If true, the component will never be hidden by searches or filters.
 *
 * @return {JSX.Element} The rendered Control component.
 */
const Control = (0,external_wp_element_namespaceObject.forwardRef)(function Control(props, ref) {
  var _as$constructor$name;
  const {
    id,
    children,
    label,
    dropdownOptions,
    dropdownChildren,
    learnMoreLabel,
    learnMoreUrl,
    style,
    beforeDropdownMenu,
    afterLabel,
    onVisibilityChange,
    value,
    cssProp = false,
    fallback = false,
    as = null,
    allowCustomValue = false,
    hasCustomValue = false,
    customValueHelp = (0,external_wp_i18n_namespaceObject.__)('Enter a custom value.', 'generateblocks-pro'),
    onChange,
    searchKeywords = [],
    className = '',
    alwaysVisible = false,
    ...unusedProps
  } = props;
  const atRule = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.control.atRule', '');
  const currentSelector = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.control.currentSelector', '');
  const controlFilters = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.control.filters', {});
  const globalStyles = useGlobalStyles();
  const wrapperId = `control-wrapper-${esm_browser_v4()}`;
  const controlId = id || `control-${esm_browser_v4()}`;
  const selectedBlock = useSelectedBlockElement();
  const computedStyles = selectedBlock ? getComputedStyle(selectedBlock) : null;

  // State.
  const [usingCustomValue, setUsingCustomValue] = (0,external_wp_element_namespaceObject.useState)(hasCustomValue && '' !== value);
  const Component = allowCustomValue && usingCustomValue ? external_wp_components_namespaceObject.TextControl : as;
  const menuVisible = learnMoreUrl || dropdownChildren || allowCustomValue;
  const [componentValue, setComponentValue, debouncedComponentValue] = (0,external_wp_compose_namespaceObject.useDebouncedInput)(value);
  const [elementStyles, setElementStyles] = (0,external_wp_element_namespaceObject.useState)(null);
  const [matchedSources, setMatchedSources] = (0,external_wp_element_namespaceObject.useState)({});
  const [matchType, setMatchType] = (0,external_wp_element_namespaceObject.useState)('');
  const [fallbackValue, setFallbackValue] = (0,external_wp_element_namespaceObject.useState)(() => getFallbackValue({
    cssProp,
    fallback,
    matchedSources,
    computedStyles
  }));
  /**
   * This is used to make sure the control doesn't hide itself
   * unexpectedly when controls are being filtered.
   */
  const [forceVisible, setForceVisible] = (0,external_wp_element_namespaceObject.useState)({
    [atRule]: false
  });

  // Refs.
  const fallbackRef = (0,external_wp_element_namespaceObject.useRef)();
  const wrapperRef = ref || fallbackRef;
  (0,external_wp_element_namespaceObject.useLayoutEffect)(() => {
    if (!cssProp) {
      return;
    }
    const cssProps = 'string' === typeof cssProp ? cssProp : Object.keys(cssProp);
    setElementStyles(selectedBlock ? getElementStyles({
      elements: selectedBlock,
      properties: cssProps,
      computedStyles,
      atRule,
      sources: ['tag']
    }) : null);
  }, [selectedBlock, atRule, currentSelector, cssProp, fallback]);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    // Stop here if no cssProp is specified.
    if (!cssProp) {
      return;
    }

    // Clear matchedSources and fallback value
    setMatchType('');
    setMatchedSources({});
    setFallbackValue('');
    if (!elementStyles) {
      return;
    }
    const singleProp = 'string' === typeof cssProp;
    const cssPropsAndValues = Object.entries(singleProp ? {
      [cssProp]: value
    } : cssProp);
    function setMatches(type = 'global', property, propStyle) {
      setMatchedSources(prevState => {
        const newState = {
          ...prevState,
          [property]: propStyle
        };
        setFallbackValue(getFallbackValue({
          cssProp,
          fallback,
          matchedSources: newState,
          computedStyles
        }));
        setMatchType(type);
        return newState;
      });
    }
    for (const [property, propValue] of cssPropsAndValues) {
      var _ref;
      // Skip checking the indicator if the control has a valid value.
      if (!!propValue) {
        continue;
      }
      const propStyle = (_ref = singleProp ? elementStyles : elementStyles[property]) !== null && _ref !== void 0 ? _ref : {};
      const {
        source = null,
        selector = '',
        value: computedValue = '',
        valueRaw = '',
        atRule: propStyleAtRule = ''
      } = propStyle;
      const sanitizedSelector = selector.replace('.editor-styles-wrapper ', '');

      // Bail if the selector and atRule match
      if (sanitizedSelector === currentSelector && atRule === propStyleAtRule) {
        continue;
      }

      // If source is null or no computed value, skip this rule
      if ([null, 'other', ''].includes(source) || !computedValue) {
        continue;
      }
      const parsedSelector = tokenize(sanitizedSelector);
      const leadingSelectorSegment = parsedSelector ? parsedSelector[0] : false;
      if (!leadingSelectorSegment) {
        continue;
      }
      let matchFound = false;
      for (const globalStyle of globalStyles) {
        const startsWithClass = leadingSelectorSegment.type === 'class' && leadingSelectorSegment.name === globalStyle.className;
        const matches = startsWithClass && (computedValue !== propValue || valueRaw !== propValue);
        if (matches) {
          setMatches('global', property, propStyle);
          matchFound = true;
          break;
        }
      }

      // If no match found yet, check for local matches
      if (!matchFound && sanitizedSelector.startsWith('.gb-')) {
        const matches = computedValue !== propValue || valueRaw !== propValue;
        if (matches) {
          setMatches('local', property, propStyle);
        }
      }
    }
  }, [globalStyles, value, currentSelector, atRule, elementStyles]);
  const componentProps = {
    ...unusedProps,
    onChange: newValue => {
      setComponentValue(newValue);
      const hidingEmpty = 'hide-empty' === controlFilters?.activeFilter;
      setForceVisible(prevState => {
        return {
          ...prevState,
          [atRule]: !newValue && value && hidingEmpty
        };
      });
    },
    value: componentValue,
    placeholder: fallbackValue
  };
  let maybeDebouncedValue = debouncedComponentValue;
  if (as && noDebounce.includes((_as$constructor$name = as?.constructor?.name) !== null && _as$constructor$name !== void 0 ? _as$constructor$name : '')) {
    maybeDebouncedValue = componentValue;
  }
  esm_useUpdateEffect(() => {
    if (onChange) {
      onChange(componentValue);
    }
  }, [maybeDebouncedValue]);
  esm_useUpdateEffect(() => {
    if (value !== componentValue) {
      setComponentValue(value);
    }
  }, [value]);
  const hasChildren = external_wp_element_namespaceObject.Children.count(children) > 0;
  const labelProps = {
    className: control_editor_module.label
  };
  const componentsWithoutIdSupport = [external_wp_components_namespaceObject.RangeControl];
  const shouldUseId = !componentsWithoutIdSupport.includes(as);

  // Handle labels and label props.
  if (!shouldUseId) {
    // Ensure these work as expected since they don't allow you to pass an id prop
    componentProps.label = label || componentProps['aria-label'];
    componentProps.hideLabelFromVision = true;
  } else if (as === external_wp_components_namespaceObject.AnglePickerControl && label) {
    // Set label to empty string to avoid a duplicate
    componentProps.label = '';
  }
  if (shouldUseId) {
    componentProps.id = controlId;
    labelProps.htmlFor = controlId;
  } else {
    labelProps['aria-hidden'] = 'true';
  }
  if (usingCustomValue) {
    componentProps.help = customValueHelp;

    // Remove any props that aren't needed for a TextControl
    Object.keys(componentProps).forEach(key => {
      if (!textControlPropKeys.includes(key)) {
        delete componentProps[key];
      }
    });
  }

  /**
   * Add a special Custom option to a select control if it doesn't exist
   * and a custom value is being used.
   */

  if (allowCustomValue) {
    if (as === external_wp_components_namespaceObject.SelectControl) {
      const {
        options = []
      } = componentProps;
      const isCustomValue = options.every(option => option.value !== componentValue.trim());
      if (isCustomValue) {
        options.unshift({
          label: (0,external_wp_i18n_namespaceObject.sprintf)(
          // Translators: %s is the value of the select control.
          (0,external_wp_i18n_namespaceObject.__)('%s (Custom)', 'generateblocks-pro'), componentValue),
          componentValue
        });
        componentProps.options = options;
      }
    }
  }

  // Setup props for ControlMenu.
  const menuProps = {
    menuVisible,
    dropdownOptions,
    dropdownChildren,
    allowCustomValue,
    usingCustomValue,
    setUsingCustomValue,
    learnMoreUrl,
    learnMoreLabel,
    beforeDropdownMenu
  };
  if (!menuProps.learnMoreLabel && 'string' === typeof cssProp) {
    const propText = cssProp.replace(/([A-Z])/g, ' $1').trim();
    menuProps.learnMoreLabel = (0,external_wp_i18n_namespaceObject.sprintf)(
    // Translators: %s is the CSS property.
    (0,external_wp_i18n_namespaceObject.__)('Learn more about %s', 'generateblocks-pro'), propText.slice(0, 1).toUpperCase() + propText.slice(1));
  }
  let updatedSearchKeywords = [...searchKeywords];
  if ('string' === typeof cssProp) {
    updatedSearchKeywords.push(cssProp);
  } else if ('object' === typeof cssProp) {
    updatedSearchKeywords.push(...Object.keys(cssProp));
  }
  updatedSearchKeywords = Array.from(new Set([...updatedSearchKeywords, ...updatedSearchKeywords.map(keyword => getKebabCaseProperty(keyword))]));

  // Setup props for filtering.
  const filterData = {
    componentProps,
    props,
    wrapperRef,
    label,
    labelProps,
    controlId,
    unusedProps,
    matchType,
    cssProp,
    searchKeywords: updatedSearchKeywords,
    alwaysVisible
  };
  const filteredProps = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.control.props', componentProps, filterData);
  if (as && hasChildren) {
    throw new Error((0,external_wp_i18n_namespaceObject.__)('Control component cannot have both a component and children.', 'generateblocks-pro'));
  }

  // Handle component visibility.
  const isVisible = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.control.visible', true, filterData, filteredProps);
  const showControl = alwaysVisible || forceVisible[atRule] || isVisible;
  return (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx('gb-styles-builder-control', control_editor_module.control, !label && control_editor_module.inline, showControl ? 'visible' : 'hidden', className),
    id: hasChildren ? controlId : wrapperId,
    ref: wrapperRef,
    style: style
  }, label && (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx('gb-styles-builder-control__header', control_editor_module.header)
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx(control_editor_module.labelWrap, 'gb-styles-builder-control__header--label')
  }, (0,external_React_namespaceObject.createElement)("label", {
    ...labelProps
  }, " ", label), afterLabel, (0,external_React_namespaceObject.createElement)(IndicatorDot, {
    type: matchType,
    matchedSources: matchedSources,
    atRule: atRule,
    currentSelector: currentSelector,
    key: value
  })), (0,external_React_namespaceObject.createElement)(ControlMenu, {
    ...menuProps
  })), !children && Component && (0,external_React_namespaceObject.createElement)(Component, {
    ...filteredProps
  }), children, !label && (0,external_React_namespaceObject.createElement)(ControlMenu, {
    ...menuProps
  }));
});
function ControlDescription({
  label,
  children,
  onClick
}) {
  return children && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
    label: label
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: control_editor_module.description
  }, children, onClick && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    className: control_editor_module.close,
    variant: "none",
    onClick: onClick,
    label: (0,external_wp_i18n_namespaceObject.__)('Close', 'generateblocks-pro'),
    icon: library_close
  })));
}
Control.Description = ControlDescription;
function getFallbackValue({
  fallback,
  matchedSources,
  cssProp,
  computedStyles = null
}) {
  var _computedStyles$cssPr;
  const singleProp = 'string' === typeof cssProp;

  // Check fallback requirements
  if (!singleProp || !fallback || !computedStyles) {
    return '';
  }
  const propSource = matchedSources?.[cssProp];
  const computedValue = (_computedStyles$cssPr = computedStyles?.[cssProp]) !== null && _computedStyles$cssPr !== void 0 ? _computedStyles$cssPr : '';
  const value = propSource?.valueRaw || propSource?.value || '';
  return computedValue === propSource?.value ? value : '';
}
;// CONCATENATED MODULE: ./src/components/Effects/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const Effects_editor_module = ({"list":"T32esrjO61eXBU5j8CGJ","options":"t03MbWBAy29buTlg8OtA","swatch":"O6suCCJHptmjHyMFNoqY","circle":"nN4v6Cz9YPj_4onycNy7","swatch-wrapper":"wzXvgmlD2KxKdy18Deyw","item":"iMnfJaU2X6qOSxJWU2zF","css":"O8bnOtMjsj_BltRIGN9b","control":"K5AL_cik6ABiNMuoolaR","icons":"Ji3y3RjBzM_km3F2DPGK","toggle":"O6r32WEY1HPLMSYTCjQj","body":"lyP3jAtUPV331nd068SO","dropdown":"LAf_uc0GOmtOGSGPDQoL","dropdown-popover":"E2iXybsdLulPZPDWMz2Q","is-disabled":"fxNn95azeOWHa4IP0TVF","dropdown-content":"bbpOeZZsLE3nbp2G_E_g","dropdown-actions":"Tn1PTWyWTxb8tnrLDcSN","edit":"tWhP6_92vLaI1TKqRHoK","modal-description":"DZYBASsoNDqQhGVjkUNV","modal-actions":"q0AhxQNeFEzWIQb0AgfR","modal-confirm":"er8WiZ0KMgVGVUCy9eNX"});
;// CONCATENATED MODULE: ./src/components/Effects/EffectControl.jsx









function EffectControl({
  children,
  label,
  dropdownControls,
  dropdownChildren,
  onAdd,
  onClickDone,
  onClickDelete,
  isEditing,
  id,
  cssProp,
  searchKeywords = [],
  showAdd = true,
  items = []
}) {
  const fallbackId = `effect-control-${esm_browser_v4()}`;
  return (0,external_React_namespaceObject.createElement)(Control, {
    label: label,
    beforeDropdownMenu: (0,external_React_namespaceObject.createElement)("div", {
      className: Effects_editor_module.icons
    }, isEditing ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      variant: "primary",
      size: "small",
      icon: library_check,
      onClick: onClickDone,
      label: (0,external_wp_i18n_namespaceObject.__)('Done', 'generateblocks-pro'),
      showTooltip: true
    }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      variant: "tertiary",
      size: "small",
      isDestructive: true,
      icon: library_trash,
      onClick: onClickDelete,
      label: (0,external_wp_i18n_namespaceObject.__)('Delete', 'generateblocks-pro'),
      showTooltip: true
    })) : showAdd && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      variant: "tertiary",
      size: "small",
      icon: library_plus,
      onClick: onAdd,
      label: (0,external_wp_i18n_namespaceObject.__)('Add new', 'generateblocks-pro')
    })),
    id: id || fallbackId,
    className: `gb-effects-control ${Effects_editor_module.control}`,
    dropdownControls: dropdownControls,
    dropdownChildren: dropdownChildren,
    popoverProps: {
      className: Effects_editor_module['dropdown-popover']
    },
    searchKeywords: searchKeywords,
    cssProp: cssProp,
    value: items.length > 0 ? items.length : ''
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module.body,
    style: {
      display: items.length > 0 ? 'block' : 'none'
    }
  }, children));
}

/**
 * Outputs the Learn More Dropdown MenuItem inside it's own MenuGroup.
 *
 * @param {Object}   props                The component props.
 * @param {string}   props.learnMoreLabel The text for the link
 * @param {string}   props.learnMoreURL   The Link URL (typically to the corresponding MDN page)
 * @param {Function} props.onClose        The onClose callback from the DropdownMenu render props function
 * @return { JSX.Element } The Learn More Dropdown MenuGroup
 */
const EffectControlLearnMore = ({
  learnMoreLabel,
  learnMoreURL,
  onClose
}) => {
  return learnMoreLabel && learnMoreURL && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: library_external,
    iconSize: 10,
    onClick: () => {
      window.open(learnMoreURL, '_blank');
      onClose();
    }
  }, learnMoreLabel));
};
EffectControl.LearnMore = EffectControlLearnMore;
function EffectControlDeleteAll({
  label,
  content,
  confirmDelete,
  items,
  setConfirmDelete,
  onClose,
  onDelete
}) {
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, !confirmDelete ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: library_trash,
    onClick: () => {
      if (items.length > 0) {
        setConfirmDelete(true);
      }
    },
    className: dist_clsx(items.length === 0 && Effects_editor_module['is-disabled']),
    tabIndex: items.length > 0 ? 0 : -1
  }, label)) : (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['dropdown-content']
  }, content, (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['dropdown-actions']
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "secondary",
    size: "compact",
    onClick: () => {
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    isDestructive: true,
    variant: "secondary",
    size: "compact",
    onClick: () => {
      onDelete([]);
      setConfirmDelete(false);
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Confirm', 'generateblocks-pro')))));
}
EffectControl.DeleteAll = EffectControlDeleteAll;
function EffectPasteModal({
  showPasteStyles,
  setShowPasteStyles,
  property,
  onAddStyles,
  errorMessage,
  learnMoreUrl = `https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`
}) {
  const [pastedValue, setPastedValue] = (0,external_wp_element_namespaceObject.useState)('');
  const [replaceStyles, setReplaceStyles] = (0,external_wp_element_namespaceObject.useState)(true);
  const propertyTitleCase = property.charAt(0).toUpperCase() + property.slice(1);
  function LearnMoreLink() {
    return (0,external_React_namespaceObject.createElement)("a", {
      href: learnMoreUrl,
      target: "_blank",
      rel: "noreferrer"
    }, property);
  }
  return !!showPasteStyles && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Modal, {
    title: (0,external_wp_i18n_namespaceObject.sprintf)(
    // Translators: %s: CSS property string in title case
    (0,external_wp_i18n_namespaceObject.__)('Paste %s Styles', 'generateblocks-pro'), propertyTitleCase),
    isDismissible: true,
    onRequestClose: () => setShowPasteStyles(false),
    style: {
      maxWidth: '425px',
      width: '425px'
    }
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TextareaControl, {
    rows: 5,
    value: pastedValue,
    onChange: val => {
      setPastedValue(val);
    },
    help: errorMessage
  }), (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['modal-description']
  }, (0,external_wp_element_namespaceObject.createInterpolateElement)(
  // Translators: %s is the learn more link, property prop is the inner text.
  (0,external_wp_i18n_namespaceObject.__)('Paste in valid CSS <Link /> styles to add to the current list.', 'generateblocks-pro'), {
    Link: (0,external_React_namespaceObject.createElement)(LearnMoreLink, null)
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['modal-confirm']
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.CheckboxControl, {
    checked: replaceStyles,
    label: (0,external_wp_i18n_namespaceObject.sprintf)(
    // Translators: %s: CSS property string
    (0,external_wp_i18n_namespaceObject.__)('Replace %s styles.', 'generateblocks-pro'), property),
    help: (0,external_wp_i18n_namespaceObject.sprintf)(
    // Translators: %s: CSS property string
    (0,external_wp_i18n_namespaceObject.__)('If checked this will replace all existing %s styles.', 'generateblocks-pro'), property),
    onChange: newValue => {
      setReplaceStyles(newValue);
    }
  })), (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['modal-actions']
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "secondary",
    onClick: () => setShowPasteStyles(false)
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    disabled: !pastedValue || pastedValue.length === 0,
    variant: "primary",
    onClick: () => {
      if (onAddStyles) {
        const addStylesStatus = onAddStyles({
          pastedValue,
          replaceStyles
        });
        if (addStylesStatus) {
          setPastedValue('');
        }
      }
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Add Styles', 'generateblocks-pro'))));
}
EffectControl.PasteModal = EffectPasteModal;
;// CONCATENATED MODULE: ./src/components/Effects/EffectEdit.jsx



function EffectEdit({
  children
}) {
  return (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    className: Effects_editor_module.edit,
    gap: "12px",
    "data-component": "EffectEdit"
  }, children);
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/copy.js

/**
 * WordPress dependencies
 */

const copy = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M5 4.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5ZM3 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm17 3v10.75c0 .69-.56 1.25-1.25 1.25H6v1.5h12.75a2.75 2.75 0 0 0 2.75-2.75V8H20Z"
}));
/* harmony default export */ const library_copy = (copy);
//# sourceMappingURL=copy.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/unseen.js

/**
 * WordPress dependencies
 */

const unseen = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M4.67 10.664s-2.09 1.11-2.917 1.582l.494.87 1.608-.914.002.002c.343.502.86 1.17 1.563 1.84.348.33.742.663 1.185.976L5.57 16.744l.858.515 1.02-1.701a9.1 9.1 0 0 0 4.051 1.18V19h1v-2.263a9.1 9.1 0 0 0 4.05-1.18l1.021 1.7.858-.514-1.034-1.723c.442-.313.837-.646 1.184-.977.703-.669 1.22-1.337 1.563-1.839l.002-.003 1.61.914.493-.87c-1.75-.994-2.918-1.58-2.918-1.58l-.003.005a8.29 8.29 0 0 1-.422.689 10.097 10.097 0 0 1-1.36 1.598c-1.218 1.16-3.042 2.293-5.544 2.293-2.503 0-4.327-1.132-5.546-2.293a10.099 10.099 0 0 1-1.359-1.599 8.267 8.267 0 0 1-.422-.689l-.003-.005Z"
}));
/* harmony default export */ const library_unseen = (unseen);
//# sourceMappingURL=unseen.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/seen.js

/**
 * WordPress dependencies
 */

const seen = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M3.99961 13C4.67043 13.3354 4.6703 13.3357 4.67017 13.3359L4.67298 13.3305C4.67621 13.3242 4.68184 13.3135 4.68988 13.2985C4.70595 13.2686 4.7316 13.2218 4.76695 13.1608C4.8377 13.0385 4.94692 12.8592 5.09541 12.6419C5.39312 12.2062 5.84436 11.624 6.45435 11.0431C7.67308 9.88241 9.49719 8.75 11.9996 8.75C14.502 8.75 16.3261 9.88241 17.5449 11.0431C18.1549 11.624 18.6061 12.2062 18.9038 12.6419C19.0523 12.8592 19.1615 13.0385 19.2323 13.1608C19.2676 13.2218 19.2933 13.2686 19.3093 13.2985C19.3174 13.3135 19.323 13.3242 19.3262 13.3305L19.3291 13.3359C19.3289 13.3357 19.3288 13.3354 19.9996 13C20.6704 12.6646 20.6703 12.6643 20.6701 12.664L20.6697 12.6632L20.6688 12.6614L20.6662 12.6563L20.6583 12.6408C20.6517 12.6282 20.6427 12.6108 20.631 12.5892C20.6078 12.5459 20.5744 12.4852 20.5306 12.4096C20.4432 12.2584 20.3141 12.0471 20.1423 11.7956C19.7994 11.2938 19.2819 10.626 18.5794 9.9569C17.1731 8.61759 14.9972 7.25 11.9996 7.25C9.00203 7.25 6.82614 8.61759 5.41987 9.9569C4.71736 10.626 4.19984 11.2938 3.85694 11.7956C3.68511 12.0471 3.55605 12.2584 3.4686 12.4096C3.42484 12.4852 3.39142 12.5459 3.36818 12.5892C3.35656 12.6108 3.34748 12.6282 3.34092 12.6408L3.33297 12.6563L3.33041 12.6614L3.32948 12.6632L3.32911 12.664C3.32894 12.6643 3.32879 12.6646 3.99961 13ZM11.9996 16C13.9326 16 15.4996 14.433 15.4996 12.5C15.4996 10.567 13.9326 9 11.9996 9C10.0666 9 8.49961 10.567 8.49961 12.5C8.49961 14.433 10.0666 16 11.9996 16Z"
}));
/* harmony default export */ const library_seen = (seen);
//# sourceMappingURL=seen.js.map
;// CONCATENATED MODULE: ./src/components/Effects/EffectList.jsx









/**
 * Wrapper for SortableList designed for a list of effects in an EffectControl.
 * Accepts all props from SortableList.
 *
 * @param {Object} props
 * @param {Array}  props.items     The list of items for sorting.
 * @param {string} props.className One or more classes to add to the wrapper.
 * @param {Object} ref
 * @return {JSX.Element} The EffectList component.
 */
const EffectList = (0,external_wp_element_namespaceObject.forwardRef)(({
  items,
  className,
  ...props
}, ref) => {
  return (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.SortableList, {
    ...props,
    items: items,
    className: dist_clsx('gb-effect-list', Effects_editor_module.list, className),
    ref: ref
  });
});
function EffectListItem({
  hidden,
  onDuplicate,
  onHidden,
  onEdit,
  css = '',
  label = '',
  swatchColor = null,
  canDuplicate = true,
  canHide = false,
  canEdit = true
}) {
  return (0,external_React_namespaceObject.createElement)("div", {
    className: `gb-effect-list-item ${Effects_editor_module.item}`
  }, swatchColor && (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module['swatch-wrapper']
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module.swatch
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module.circle,
    style: {
      backgroundColor: swatchColor
    }
  }))), (0,external_React_namespaceObject.createElement)("div", {
    title: css,
    className: Effects_editor_module.css,
    style: hidden ? {
      opacity: '0.4'
    } : {}
  }, (0,external_React_namespaceObject.createElement)("span", null, label.length ? label : css)), (0,external_React_namespaceObject.createElement)("div", {
    className: Effects_editor_module.options
  }, canDuplicate && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    label: (0,external_wp_i18n_namespaceObject.__)('Duplicate', 'generateblocks-pro'),
    showTooltip: true,
    variant: "tertiary",
    size: "small",
    icon: library_copy,
    onClick: onDuplicate
  }), canHide && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    label: hidden ? (0,external_wp_i18n_namespaceObject.__)('Show', 'generateblocks-pro') : (0,external_wp_i18n_namespaceObject.__)('Hide', 'generateblocks-pro'),
    showTooltip: true,
    variant: "tertiary",
    size: "small",
    icon: hidden ? library_unseen : library_seen,
    onClick: onHidden
  }), canEdit && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    label: (0,external_wp_i18n_namespaceObject.__)('Edit', 'generateblocks-pro'),
    showTooltip: true,
    variant: "tertiary",
    size: "small",
    icon: edit,
    onClick: onEdit
  })));
}
EffectList.Item = EffectListItem;
;// CONCATENATED MODULE: external ["wp","dom"]
const external_wp_dom_namespaceObject = window["wp"]["dom"];
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/chevron-down.js

/**
 * WordPress dependencies
 */

const chevronDown = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"
}));
/* harmony default export */ const chevron_down = (chevronDown);
//# sourceMappingURL=chevron-down.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/chevron-up.js

/**
 * WordPress dependencies
 */

const chevronUp = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"
}));
/* harmony default export */ const chevron_up = (chevronUp);
//# sourceMappingURL=chevron-up.js.map
;// CONCATENATED MODULE: ./src/components/StylesBuilder/Selector.jsx









function Selector({
  allStyles,
  onNestedRuleChange,
  onUpdateKey,
  currentSelector,
  nestedRule,
  showSelectorOptions,
  setShowSelectorOptions,
  onDeleteStyle,
  selectorShortcuts,
  visibleSelectors,
  allowCustomAdvancedSelector
}) {
  const [tempSelectors, setTempSelectors] = (0,external_wp_element_namespaceObject.useState)([]);
  const [showBuildSelector, setShowBuildSelector] = (0,external_wp_element_namespaceObject.useState)(false);
  const [editSelector, setEditSelector] = (0,external_wp_element_namespaceObject.useState)('');
  function setTempSelector(selector) {
    setTempSelectors([...tempSelectors, selector]);
  }
  const activeSelectors = (0,external_wp_element_namespaceObject.useMemo)(() => {
    const newActiveSelectors = [];
    selectorShortcuts?.default?.items.forEach(item => {
      newActiveSelectors.push(item.value);
    });
    Object.keys(allStyles)?.forEach(key => {
      if ('object' === typeof allStyles[key] && !key.startsWith('@') && !newActiveSelectors.includes(key)) {
        newActiveSelectors.push(key);
      }
    });
    tempSelectors.forEach(selector => {
      if (!newActiveSelectors.includes(selector)) {
        newActiveSelectors.push(selector);
      }
    });
    return Array.from(new Set(newActiveSelectors));
  }, [allStyles, tempSelectors]);
  const previewSelector = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (!nestedRule) {
      return (0,external_React_namespaceObject.createElement)("span", {
        className: editor_module.name
      }, currentSelector);
    }
    const currentSelectorElement = sel => (0,external_React_namespaceObject.createElement)("span", {
      style: {
        opacity: !!nestedRule ? 0.5 : 1
      }
    }, sel);
    const multiSelector = currentSelector.split(',').map(sel => (0,external_wp_element_namespaceObject.renderToString)(currentSelectorElement(sel)));
    const selectorsWithNestedRules = [];
    multiSelector.forEach(sel => {
      selectorsWithNestedRules.push(nestedRule.startsWith('&') ? sel + nestedRule.replace('&', '') : sel + ' ' + nestedRule);
    });
    return (0,external_React_namespaceObject.createElement)("span", {
      className: editor_module.name,
      dangerouslySetInnerHTML: {
        __html: (0,external_wp_dom_namespaceObject.safeHTML)(selectorsWithNestedRules.join(', '))
      }
    });
  }, [currentSelector, nestedRule]);
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.selectors
  }, previewSelector, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.shortcuts
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.icon
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.ButtonGroup, null, visibleSelectors && visibleSelectors.map(selector => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    key: selector.label,
    className: editor_module.button,
    label: (0,external_wp_i18n_namespaceObject.sprintf)( /* translators: %s: selector name. */
    (0,external_wp_i18n_namespaceObject.__)('%s selector', 'generateblocks-pro'), selector.label),
    showTooltip: true,
    isPressed: nestedRule === selector.value,
    onClick: () => {
      onNestedRuleChange(selector.value);
      setShowSelectorOptions(false);
    },
    size: "small"
  }, selector.label))), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    className: editor_module.more,
    label: (0,external_wp_i18n_namespaceObject.__)('Manage selectors', 'generateblocks-pro'),
    showTooltip: true,
    isPressed: !!showSelectorOptions,
    onClick: () => {
      setShowSelectorOptions(!showSelectorOptions);
    },
    icon: !showSelectorOptions ? chevron_down : chevron_up,
    size: "small",
    iconPosition: "right"
  }, (0,external_wp_i18n_namespaceObject.__)('More', 'generateblocks-pro')))), !!showSelectorOptions && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, !showBuildSelector && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, !!selectorShortcuts && Object.keys(selectorShortcuts).length > 0 && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    className: editor_module.notice,
    isDismissible: false
  }, (0,external_wp_i18n_namespaceObject.__)('Choose a selector from the list below, or create a new custom one.', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(ActiveSelectors, {
    activeSelectors: activeSelectors,
    nestedRule: nestedRule,
    onNestedRuleChange: onNestedRuleChange,
    setShowSelectorOptions: setShowSelectorOptions,
    setShowBuildSelector: setShowBuildSelector,
    setEditSelector: setEditSelector,
    onDeleteStyle: onDeleteStyle,
    allStyles: allStyles,
    selectorShortcuts: selectorShortcuts,
    currentSelector: currentSelector,
    allowCustomAdvancedSelector: allowCustomAdvancedSelector
  }), (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.actions
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "tertiary",
    size: "compact",
    onClick: () => setShowSelectorOptions(false)
  }, (0,external_wp_i18n_namespaceObject.__)('Cancel', 'generateblocks-pro')), !!allowCustomAdvancedSelector && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    size: "compact",
    showTooltip: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Add a new custom selector', 'generateblocks-pro'),
    icon: library_plus,
    onClick: () => {
      setShowBuildSelector(true);
    }
  }, (0,external_wp_i18n_namespaceObject.__)('New', 'generateblocks-pro')))), !!showBuildSelector && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    className: editor_module.notice,
    isDismissible: false
  }, !!editSelector ? (0,external_wp_i18n_namespaceObject.sprintf)(
  // translators: %s: selector name.
  (0,external_wp_i18n_namespaceObject.__)('You are editing a selector: %s', 'generateblocks-pro'), editSelector) : (0,external_wp_i18n_namespaceObject.__)('You are creating a new custom selector.', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(BuildSelector, {
    editSelector: editSelector,
    setShowBuildSelector: setShowBuildSelector,
    allStyles: allStyles,
    onNestedRuleChange: onNestedRuleChange,
    setTempSelector: setTempSelector,
    onUpdateKey: onUpdateKey,
    selectorShortcuts: selectorShortcuts,
    setShowSelectorOptions: setShowSelectorOptions,
    setEditSelector: setEditSelector
  }))));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/funnel.js

/**
 * WordPress dependencies
 */

const funnel = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M10 17.5H14V16H10V17.5ZM6 6V7.5H18V6H6ZM8 12.5H16V11H8V12.5Z"
}));
/* harmony default export */ const library_funnel = (funnel);
//# sourceMappingURL=funnel.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/controls/button-icon/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const button_icon_editor_module = ({"control":"FiEQaJ8wawlK0nalVOMk","multiRow":"rHBl4kHUPP1Vga4BSE6K","button":"M9NzJL05Awia6HinnLfg","fallback":"IEmF3WaJ3k4UDjmmokpg"});
;// CONCATENATED MODULE: ./src/inspector-controls/controls/button-icon/ButtonIconControl.jsx






/**
 * @typedef {Object} ButtonObject
 * @property {JSX.Element} icon  - The icon to display on the button.
 * @property {JSX.Element} label - The label to display in the tooltip.
 * @property {string}      value - The value associated with the button.
 */
/**
 * Renders a group of buttons with tooltips.
 *
 * @param {Object}         props               - The component props.
 * @param {ButtonObject[]} props.buttons       - An array of button objects.
 * @param {string}         props.value         - The currently selected button value.
 * @param {Function}       props.onChange      - Callback function to handle button selection changes.
 * @param {string}         props.fallbackValue - The inherited fallback value.
 * @param {string}         props.className     - The class name for the button group.
 * @param {boolean}        props.multiRow      - Whether to display the buttons in multiple rows.
 * @return {JSX.Element} The rendered button group.
 */
function ButtonIconControl({
  buttons,
  value,
  fallbackValue = '',
  onChange,
  className,
  multiRow
}) {
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.ButtonGroup, {
    className: dist_clsx('gb-button-icon-control', button_icon_editor_module.control, className, multiRow && button_icon_editor_module.multiRow)
  }, Object.values(buttons).map(button => {
    return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      key: button.value,
      isPrimary: button.value === value,
      onClick: () => {
        onChange(button.value !== value ? button.value : '');
      },
      label: button.label,
      showTooltip: !!button.icon,
      className: dist_clsx(button_icon_editor_module.button, !value && fallbackValue === button.value && button_icon_editor_module.fallback)
    }, button.icon ? button.icon : button.label);
  }));
}
(0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.control.props', 'generateblocks-pro/button-icon-control/component-props', (componentProps, {
  props
}) => {
  if (ButtonIconControl !== props.as) {
    return componentProps;
  }
  if (!componentProps?.placeholder) {
    return componentProps;
  }
  return {
    ...componentProps,
    fallbackValue: componentProps.placeholder
  };
}, 10, 2);
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const layout_editor_module = ({"alignItems":"sFuUt9gOCzrXglUBnSej","flexColumn":"sEfkrsARlWqjXSQ0siAR","justifyContent":"rIGyjhfYNIWMtcLBZb1m","flexReverse":"UZd1DMVwHXYjDkntlmpA","buttonGroup":"Da2ErNHxmv9NmywBrioS","isInherited":"HhL553XVre3FT4BXQ1Uz","presets":"eX05c714VegjZcxdV23I","presetButton":"qEzpAkssvU5UK_oaEHY_","preview":"A4UL_u2h9Qk5pVmLmtwv","gridTemplateColumns":"X3Km1z17E56zapraL30N"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/AlignItems.jsx





const buttons = [{
  value: 'flex-start',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 0h16v1H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M3.5 2.5h3v7h-3zm5 0h3v5h-3z"
  })),
  label: 'Align Start'
}, {
  value: 'center',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M3.5 3.5h3v8h-3zm5 1h3v6h-3z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 7h16v1H0z"
  })),
  label: 'Align Center'
}, {
  value: 'flex-end',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 15h16v1H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M3.5 6.5h3v7h-3zm5 2h3v5h-3z"
  })),
  label: 'Align End'
}, {
  value: 'stretch',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 0h16v1H0zm0 15h16v1H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M3.5 2.5h3v11h-3zm5 0h3v11h-3z"
  })),
  label: 'Stretch'
}, {
  value: 'baseline',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 7h16v1H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 3H8v7h4V3zm-1 1H9v3h2V4zM7 3H3v9h4V3zM6 4H4v3h2V4z",
    fill: "currentColor"
  })),
  label: 'Baseline'
}];
function AlignItems({
  value,
  onChange,
  flexDirection
}) {
  const usingCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    hasCustomValue: usingCustomValue,
    label: "Align Items",
    id: "gblocks-align-items",
    value: value,
    onChange: onChange,
    buttons: buttons,
    cssProp: "alignItems",
    className: dist_clsx(layout_editor_module.alignItems, flexDirection.includes('column') && layout_editor_module.flexColumn, flexDirection.includes('reverse') && layout_editor_module.flexReverse)
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/FlexDirection.jsx





function FlexDirection({
  value,
  onChange
}) {
  var _useMemo;
  const selectedBlock = useSelectedBlockElement();
  const fallbackValue = (_useMemo = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return selectedBlock ? getElementStyles({
      elements: selectedBlock,
      properties: 'flexDirection'
    })?.flexDirection?.value : '';
  }, [selectedBlock])) !== null && _useMemo !== void 0 ? _useMemo : '';
  const buttons = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return [{
      label: 'Row',
      value: 'row'
    }, {
      label: 'Column',
      value: 'column'
    }, {
      label: 'Row Reverse',
      value: 'row-reverse'
    }, {
      label: 'Column Reverse',
      value: 'column-reverse'
    }];
  }, [value, fallbackValue]);
  const usingCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    multiRow: true,
    allowCustomValue: true,
    hasCustomValue: usingCustomValue,
    label: "Flex Direction",
    id: "gblocks-flex-direction",
    value: value,
    onChange: onChange,
    buttons: buttons,
    cssProp: "flexDirection"
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/FlexWrap.jsx



const FlexWrap_buttons = [{
  label: 'No Wrap',
  value: 'nowrap'
}, {
  label: 'Wrap',
  value: 'wrap'
}, {
  label: 'Reverse Wrap',
  value: 'wrap-reverse'
}];
function FlexWrap({
  value,
  onChange
}) {
  const usingCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => FlexWrap_buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    hasCustomValue: usingCustomValue,
    label: "Flex Wrap",
    id: "gblocks-flex-wrap",
    value: value,
    onChange: onChange,
    buttons: FlexWrap_buttons,
    cssProp: "flexWrap"
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/GridTemplateSelector.jsx



function GridTemplateSelector({
  onClick,
  value
}) {
  const layouts = {
    '1fr': 1,
    'repeat(2, minmax(0, 1fr))': 2,
    'repeat(3, minmax(0, 1fr))': 3,
    'repeat(4, minmax(0, 1fr))': 4,
    '1fr 3fr': 2,
    '3fr 1fr': 2,
    '1fr 1fr 2fr': 3,
    '1fr 2fr 1fr': 3,
    '2fr 1fr 1fr': 3,
    '1fr 3fr 1fr': 3,
    'repeat(5, minmax(0, 1fr))': 5,
    'repeat(6, minmax(0, 1fr))': 6
  };
  return (0,external_React_namespaceObject.createElement)("div", {
    className: layout_editor_module.presets
  }, Object.keys(layouts).map(layout => {
    return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      label: layout,
      showTooltip: true,
      key: `layout-${layout}`,
      className: layout_editor_module.presetButton,
      onClick: () => onClick(layout),
      isPressed: layout === value,
      style: {
        '--grid-template-columns': layout
      }
    }, Array.from({
      length: layouts[layout]
    }, (_, index) => (0,external_React_namespaceObject.createElement)("div", {
      key: `layout-${index}`,
      className: layout_editor_module.preview
    })));
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/GridTemplateColumns.jsx







function GridTemplateColumns({
  value,
  onChange
}) {
  const [showGridTemplateColumns, setShowGridTemplateColumns] = (0,external_wp_element_namespaceObject.useState)(false);
  return (0,external_React_namespaceObject.createElement)(Control, {
    label: "Grid Template Columns",
    id: "grid-template-columns",
    value: value,
    cssProp: "gridTemplateColumns"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: layout_editor_module.gridTemplateColumns
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TextControl, {
    id: "grid-template-columns",
    value: value,
    onChange: onChange
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    size: "small",
    onClick: () => setShowGridTemplateColumns(!showGridTemplateColumns),
    icon: () => (0,external_React_namespaceObject.createElement)("svg", {
      style: {
        width: '100%'
      },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256"
    }, (0,external_React_namespaceObject.createElement)("rect", {
      width: "256",
      height: "256",
      fill: "none"
    }), (0,external_React_namespaceObject.createElement)("rect", {
      x: "32",
      y: "56",
      width: "192",
      height: "144",
      rx: "8",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "12"
    }), (0,external_React_namespaceObject.createElement)("line", {
      x1: "96",
      y1: "56",
      x2: "96",
      y2: "200",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "12"
    }), (0,external_React_namespaceObject.createElement)("line", {
      x1: "160",
      y1: "56",
      x2: "160",
      y2: "200",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "12"
    }), (0,external_React_namespaceObject.createElement)("line", {
      x1: "32",
      y1: "104",
      x2: "224",
      y2: "104",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "12"
    }), (0,external_React_namespaceObject.createElement)("line", {
      x1: "32",
      y1: "152",
      x2: "224",
      y2: "152",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "12"
    })),
    isPressed: showGridTemplateColumns,
    label: (0,external_wp_i18n_namespaceObject.__)('Choose a preset', 'generateblocks-pro'),
    showTooltip: true
  })), !!showGridTemplateColumns && (0,external_React_namespaceObject.createElement)(GridTemplateSelector, {
    value: value,
    onClick: onChange
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/JustifyContent.jsx





const JustifyContent_buttons = [{
  value: 'flex-start',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M2.5 4.5h3v7h-3zm5 0h3v7h-3z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M0 0h1v16H0z"
  })),
  label: 'Flex Start'
}, {
  value: 'center',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M2.5 4.5h3v7h-3zm7 0h3v7h-3z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M7 0h1v16H7z"
  })),
  label: 'Center'
}, {
  value: 'flex-end',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M15 0h1v16h-1z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M5.5 4.5h3v7h-3zm5 0h3v7h-3z"
  })),
  label: 'Flex End'
}, {
  value: 'space-between',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M15 0h1v16h-1zM0 0h1v16H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M10.5 4.5h3v7h-3zm-8 0h3v7h-3z"
  })),
  label: 'Space Between'
}, {
  value: 'space-around',
  icon: (0,external_React_namespaceObject.createElement)("svg", {
    "aria-hidden": "true",
    style: {
      width: '16px',
      height: '16px'
    },
    viewBox: "0 0 16 16"
  }, (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    d: "M15 0h1v16h-1zM0 0h1v16H0z"
  }), (0,external_React_namespaceObject.createElement)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M9.5 4.5h3v7h-3zm-6 0h3v7h-3z"
  })),
  label: 'Space Around'
}];
function JustifyContent({
  value,
  onChange,
  flexDirection
}) {
  const usingCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => JustifyContent_buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    hasCustomValue: usingCustomValue,
    label: "Justify Content",
    id: "gblocks-justify-content",
    value: value,
    onChange: onChange,
    buttons: JustifyContent_buttons,
    cssProp: "justifyContent",
    className: dist_clsx(layout_editor_module.justifyContent, flexDirection.includes('column') && layout_editor_module.flexColumn, flexDirection.includes('reverse') && layout_editor_module.flexReverse)
  });
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/help.js

/**
 * WordPress dependencies
 */

const help = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"
}));
/* harmony default export */ const library_help = (help);
//# sourceMappingURL=help.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/controls/unit/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const unit_editor_module = ({"wrapper":"qPUs1nCzfQ_wmsJeZLhA","action":"qK1eV9Xi2RpUr1YVjir2","overrideAction":"tHZXnh3m3YOstd1H6PRQ","units":"TKou5VJBjRiiGHjqKyhL","popover":"wxhagLTw3P5Pxw6Dk4C1","disabled":"_1sBQ40zRjGmYGVSLEnP"});
;// CONCATENATED MODULE: ./src/inspector-controls/controls/unit/UnitDropdown.jsx





function UnitDropdown({
  value,
  onChange,
  units = [],
  disabled
}) {
  if (!units.length) {
    return null;
  }
  const unitList = [...units];

  // Replace the last item with our value if it's not a part of the visible list.
  if (!unitList.includes(value)) {
    unitList[unitList.length - 1] = value;
  }
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    className: unit_editor_module.units,
    label: (0,external_wp_i18n_namespaceObject.__)('Select a unit', 'generateblocks-pro'),
    icon: null,
    toggleProps: {
      children: value || String.fromCharCode(0x2014),
      disabled
    },
    popoverProps: {
      className: unit_editor_module.popover,
      focusOnMount: true,
      noArrow: false
    }
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, unitList.map(unit => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    key: unit,
    onClick: () => {
      onChange(unit);
      onClose();
    },
    isSelected: unit === value,
    variant: unit === value ? 'primary' : ''
  }, unit || String.fromCharCode(0x2014))), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    onClick: () => {
      window.open('https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units', '_blank').focus();
    },
    label: (0,external_wp_i18n_namespaceObject.__)('Learn more about units', 'generateblocks-pro'),
    showTooltip: true
  }, library_help)))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/unit/unit-list.js
const unitList = [
// Popular units.
'px', 'em', '%', 'rem', 'vw', 'vh', 'ch',
// Absolute length units.
'cm', 'mm', 'in', 'pt', 'pc',
// Relative length units.
'ex', 'lh', 'rlh', 'vmin', 'vmax', 'vb', 'vi', 'svw', 'svh', 'svb', 'svi', 'svmax', 'svmin', 'lvw', 'lvh', 'lvb', 'lvi', 'lvmax', 'lvmin', 'dvw', 'dvh', 'dvb', 'dvi', 'dvmax', 'dvmin', 'fr'];
;// CONCATENATED MODULE: ./src/inspector-controls/controls/unit/UnitControl.jsx








const defaultUnits = ['px', 'em', '%', 'rem', 'vw', 'vh', 'ch'];

/**
 * Splits a string into a numeric value and a unit.
 * If the CSSUnitValue.parse method is available, it will be used to parse the input.
 * If not, the input will be split using a regular expression based on the unit list.
 *
 * @param {string} value       - The unit value string to be parsed.
 * @param {string} defaultUnit - Default unit to use for numbers with no unit.
 * @return {Object}            - An array containing the numeric value and the unit.
 */
function parseValue(value, defaultUnit = '') {
  var _parsed$0$trim, _parsed$1$trim;
  if ('' === value) {
    return {
      value: '',
      unit: defaultUnit
    };
  }
  if (0 === value || '0' === value) {
    return {
      value: '0',
      unit: ''
    };
  }
  if (!startsWithNumber(value)) {
    return {
      value,
      unit: 'none'
    };
  }

  // Use CSSUnitValue.parse if available.
  if (window?.CSSUnitValue?.parse) {
    try {
      var _parsed$value;
      const parsed = window?.CSSUnitValue.parse(value);
      let unit = parsed?.unit;
      const parsedValue = (_parsed$value = parsed?.value) !== null && _parsed$value !== void 0 ? _parsed$value : '';

      // We don't use "number" as a type in the UI, so set it to empty.
      if ('number' === unit) {
        unit = defaultUnit;
      } else if ('percent' === unit) {
        unit = '%';
      }
      return {
        value: parsedValue,
        unit
      };
    } catch (e) {
      /**
       * If an error occurs default to the fallback handling.
       */
    }
  }
  const regex = new RegExp(`(${unitList.join('|')})`);
  const parsed = value ? value.toString().toLowerCase().split(regex).filter(singleValue => '' !== singleValue) : [];
  return {
    value: (_parsed$0$trim = parsed[0]?.trim()) !== null && _parsed$0$trim !== void 0 ? _parsed$0$trim : '',
    unit: (_parsed$1$trim = parsed[1]?.trim()) !== null && _parsed$1$trim !== void 0 ? _parsed$1$trim : ''
  };
}
function UnitControl(props) {
  var _parsedValue$value;
  const {
    label,
    units = defaultUnits,
    defaultUnit,
    min = 0,
    max,
    step,
    id,
    disabled = false,
    onChange,
    value,
    placeholder,
    help = '',
    onFocus = () => null,
    overrideAction = () => null
  } = props;
  const defaultUnitValue = 'string' === typeof defaultUnit ? defaultUnit : units[0];
  const parsedValue = (0,external_wp_element_namespaceObject.useMemo)(() => parseValue(value, defaultUnitValue), [value, defaultUnitValue]);
  const parsedPlaceholder = (0,external_wp_element_namespaceObject.useMemo)(() => value ? undefined : parseValue(placeholder, defaultUnitValue), [value, placeholder, defaultUnitValue]);
  const [inputValue, setInputValue] = (0,external_wp_element_namespaceObject.useState)((_parsedValue$value = parsedValue?.value) !== null && _parsedValue$value !== void 0 ? _parsedValue$value : '');

  // Callbacks
  const onValueKeyDown = (0,external_wp_element_namespaceObject.useCallback)(function onValueKeyDown(event) {
    var _parsedValue$unit, _parsedValue$unit2;
    const keyPressed = event.key;
    const currentValue = event.target.value;

    // Bail here if the value isn't number-like.
    if (isNaN(currentValue)) {
      return;
    }
    let newValue = currentValue;
    switch (keyPressed) {
      case 'ArrowUp':
        newValue = +currentValue + 1;
        onChange(`${newValue}${(_parsedValue$unit = parsedValue?.unit) !== null && _parsedValue$unit !== void 0 ? _parsedValue$unit : ''}`);
        setInputValue(newValue);
        break;
      case 'ArrowDown':
        newValue = +currentValue - 1;
        onChange(`${newValue}${(_parsedValue$unit2 = parsedValue?.unit) !== null && _parsedValue$unit2 !== void 0 ? _parsedValue$unit2 : ''}`);
        setInputValue(newValue);
        break;
      default:
    }
  }, [parsedValue?.unit]);
  const onValueChange = (0,external_wp_element_namespaceObject.useCallback)(function onValueChange(newValue) {
    var _parsedNewValue$value, _ref, _parsedNewValue$unit;
    const parsedNewValue = parseValue(newValue, defaultUnitValue);
    const newInputValue = (_parsedNewValue$value = parsedNewValue?.value) !== null && _parsedNewValue$value !== void 0 ? _parsedNewValue$value : '';
    setInputValue(newInputValue);
    if ('' === newInputValue) {
      onChange('');
      return;
    }

    // Check if the new value has a unit and if not, fallback to the previous one.
    const unit = (_ref = (_parsedNewValue$unit = parsedNewValue?.unit) !== null && _parsedNewValue$unit !== void 0 ? _parsedNewValue$unit : parsedValue?.unit) !== null && _ref !== void 0 ? _ref : '';

    // If there is no unit or the current unit is none, return the input value.
    if (!unit || 'none' === unit) {
      onChange(newValue);
      return;
    }
    const newValueWithUnit = `${newInputValue}${unit}`;
    onChange(newValueWithUnit);
  }, [parsedValue?.unit, defaultUnitValue]);
  const onUnitChange = (0,external_wp_element_namespaceObject.useCallback)(function onUnitChange(newValue) {
    if (parsedValue?.value) {
      onChange(`${parsedValue.value}${newValue}`);
    }
  }, [inputValue]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.BaseControl, {
    label: label,
    help: help,
    id: id,
    className: dist_clsx('gb-unit-control', disabled && unit_editor_module.disabled),
    __nextHasNoMarginBottom: true
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: unit_editor_module.wrapper,
    "data-component": "UnitControl"
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TextControl, {
    type: "text",
    value: inputValue,
    placeholder: parsedPlaceholder?.value,
    id: id,
    min: min,
    max: max,
    step: step,
    autoComplete: "off",
    disabled: disabled,
    onKeyDown: onValueKeyDown,
    onChange: onValueChange,
    onFocus: onFocus
  }), (0,external_React_namespaceObject.createElement)("div", {
    className: unit_editor_module.action
  }, !!overrideAction && (0,external_React_namespaceObject.createElement)("div", {
    className: unit_editor_module.overrideAction
  }, overrideAction(onValueChange)), 'none' !== parsedValue?.unit && (0,external_React_namespaceObject.createElement)(UnitDropdown, {
    value: parsedValue?.unit,
    disabled: disabled || 1 === units.length || '' === inputValue,
    units: units,
    onChange: onUnitChange
  }))));
}
UnitControl.defaultUnits = defaultUnits;
;// CONCATENATED MODULE: ./src/components/PanelSection/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const PanelSection_editor_module = ({"details":"yAM3kl6l0ZJPJoNPvou8","summary":"r6ArFaQUgtIejv7YxFwp","filtersActive":"_SH9v9hqMjE0s0UqxoiQ","summaryIcon":"p0_2sBEwaP2RJMWuAEFG","separator":"QtBMWg4mQCP8FkqSZdQ4"});
;// CONCATENATED MODULE: ./src/components/PanelSection/PanelSection.jsx








function PanelSection({
  children,
  title,
  onClick,
  open = true,
  filtersActive = false,
  search = ''
}) {
  if (!title) {
    throw new Error('PanelSection requires a title');
  }
  const ref = (0,external_wp_element_namespaceObject.useRef)(null);

  // Initialize as undefined.
  let openAttr;
  if (filtersActive || open) {
    openAttr = true;
  }
  return (0,external_React_namespaceObject.createElement)("details", {
    ref: ref,
    className: dist_clsx('gb-panel-section', PanelSection_editor_module.details, (filtersActive || search) && PanelSection_editor_module.filtersActive),
    open: openAttr,
    onToggle: () => {
      if (onClick) {
        const openState = ref.current?.hasAttribute('open');
        onClick(openState);
      }
    }
  }, (0,external_React_namespaceObject.createElement)("summary", {
    className: PanelSection_editor_module.summary
  }, title, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.VisuallyHidden, null, (0,external_wp_i18n_namespaceObject.__)('style controls', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)("div", {
    className: PanelSection_editor_module.summaryIcon
  }, (0,external_React_namespaceObject.createElement)(icon, {
    icon: open ? chevron_up : chevron_down,
    size: "18"
  }))), (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "10px",
    className: PanelSection_editor_module.children
  }, children));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/layout/LayoutPanel.jsx















const SESSION_STORAGE_KEY = 'gbp-panel-state-layout';
function LayoutPanel(props) {
  const {
    styles,
    onStyleChange,
    filtersActive,
    search,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    display = '',
    flexDirection = '',
    alignItems = '',
    justifyContent = '',
    flexWrap = '',
    columnGap = '',
    rowGap = '',
    gridTemplateColumns = '',
    gridTemplateRows = '',
    gridAutoFlow = '',
    flexGrow = '',
    flexShrink = '',
    flexBasis = '',
    gridColumn = '',
    gridRow = '',
    containerType = '',
    containerName = ''
  } = styles;
  const cachedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
  const [sectionState, setSectionState] = (0,external_wp_element_namespaceObject.useState)(() => cachedState && !filtersActive ? JSON.parse(cachedState) : {
    alignment: true,
    grid: true,
    flex: true,
    containerQueries: true
  });
  const {
    onSectionToggle
  } = usePanelSections({
    sectionState,
    setSectionState,
    filtersActive,
    search,
    storageKey: SESSION_STORAGE_KEY
  });
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Layout', 'generateblocks-pro'),
    initialOpen: initialOpen,
    opened: opened ? true : undefined,
    icon: (0,external_React_namespaceObject.createElement)(LayoutIcon, null),
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: "Display",
    value: display,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Block',
      value: 'block'
    }, {
      label: 'Inline Block',
      value: 'inline-block'
    }, {
      label: 'Flex',
      value: 'flex'
    }, {
      label: 'Inline Flex',
      value: 'inline-flex'
    }, {
      label: 'Grid',
      value: 'grid'
    }, {
      label: 'Inline',
      value: 'inline'
    }, {
      label: 'List Item',
      value: 'list-item'
    }, {
      label: 'None',
      value: 'none'
    }],
    onChange: value => onStyleChange('display', value),
    searchKeywords: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline', 'list-item'],
    cssProp: "display"
  }), (0,external_React_namespaceObject.createElement)(PanelSection, {
    title: "Alignment",
    onClick: newValue => onSectionToggle('alignment', newValue),
    open: sectionState.alignment,
    filtersActive: filtersActive,
    search: search
  }, (0,external_React_namespaceObject.createElement)(AlignItems, {
    flexDirection: flexDirection,
    value: alignItems,
    onChange: value => onStyleChange('alignItems', value !== alignItems ? value : '')
  }), (0,external_React_namespaceObject.createElement)(JustifyContent, {
    flexDirection: flexDirection,
    value: justifyContent,
    onChange: value => onStyleChange('justifyContent', value !== justifyContent ? value : '')
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Flex, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Column Gap",
    id: "gblocks-column-gap",
    value: columnGap,
    onChange: value => onStyleChange('columnGap', value),
    cssProp: "columnGap"
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Row Gap",
    id: "gblocks-row-gap",
    value: rowGap,
    onChange: value => onStyleChange('rowGap', value),
    cssProp: "rowGap"
  })))), (0,external_React_namespaceObject.createElement)(PanelSection, {
    title: "Grid Layout",
    onClick: newValue => onSectionToggle('grid', newValue),
    open: sectionState.grid,
    filtersActive: filtersActive,
    search: search
  }, (0,external_React_namespaceObject.createElement)(GridTemplateColumns, {
    value: gridTemplateColumns,
    onChange: value => {
      if (value === gridTemplateColumns) {
        onStyleChange('gridTemplateColumns', '');
        return;
      }
      onStyleChange('gridTemplateColumns', value);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Grid Template Rows",
    value: gridTemplateRows,
    onChange: value => onStyleChange('gridTemplateRows', value),
    cssProp: "gridTemplateRows"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Grid Auto Flow",
    value: gridAutoFlow,
    onChange: value => onStyleChange('gridAutoFlow', value),
    cssProp: "gridAutoFlow"
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Flex, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Grid Column",
    id: "gblocks-grid-column",
    value: gridColumn,
    onChange: value => onStyleChange('gridColumn', value),
    cssProp: "gridColumn"
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Grid Row",
    id: "gblocks-grid-row",
    value: gridRow,
    onChange: value => onStyleChange('gridRow', value),
    cssProp: "gridRow"
  })))), (0,external_React_namespaceObject.createElement)(PanelSection, {
    title: "Flex Layout",
    onClick: newValue => onSectionToggle('flex', newValue),
    open: sectionState.flex,
    filtersActive: filtersActive,
    search: search
  }, (0,external_React_namespaceObject.createElement)(FlexDirection, {
    value: flexDirection,
    onChange: value => {
      onStyleChange('flexDirection', value !== flexDirection ? value : '');
    }
  }), (0,external_React_namespaceObject.createElement)(FlexWrap, {
    value: flexWrap,
    onChange: value => onStyleChange('flexWrap', value !== flexWrap ? value : '')
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Flex, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Flex Grow",
    id: "gblocks-flex-grow",
    value: flexGrow,
    onChange: value => onStyleChange('flexGrow', value),
    cssProp: "flexGrow"
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Flex Shrink",
    id: "gblocks-flex-shrink",
    value: flexShrink,
    onChange: value => onStyleChange('flexShrink', value),
    cssProp: "flexShrink"
  }))), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Flex Basis",
    id: "gblocks-flex-basis",
    value: flexBasis,
    onChange: value => onStyleChange('flexBasis', value),
    cssProp: "flexBasis"
  })), (0,external_React_namespaceObject.createElement)(PanelSection, {
    title: "Container Queries",
    onClick: newValue => onSectionToggle('containerQueries', newValue),
    open: sectionState.containerQueries,
    filtersActive: filtersActive,
    search: search
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: "Container Type",
    value: containerType,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Size',
      value: 'size'
    }, {
      label: 'Inline Size',
      value: 'inline-size'
    }, {
      label: 'Normal',
      value: 'normal'
    }],
    onChange: value => onStyleChange('containerType', value),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro'),
    cssProp: "containerType"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Container Name",
    id: "gblocks-container-name",
    value: containerName,
    onChange: value => onStyleChange('containerName', value),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro'),
    cssProp: "containerName"
  }))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/sizing/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const sizing_editor_module = ({"panel":"WHrfsBd_ynWsjFJA03jf","filtersActive":"ME_uAH5Bxck9NAu6bbHk"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/sizing/SizingPanel.jsx








function SizingPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    filtersActive,
    search,
    onToggle,
    initialOpen
  } = props;
  const {
    width = '',
    height = '',
    minWidth = '',
    minHeight = '',
    maxWidth = '',
    maxHeight = '',
    aspectRatio = ''
  } = styles;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Sizing', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(SizingIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    className: dist_clsx(sizing_editor_module.panel, (search || filtersActive) && sizing_editor_module.filtersActive),
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    wrap: true,
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    wrap: true,
    layout: "flex",
    direction: "horizontal",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Width",
    id: "width",
    value: width,
    onChange: value => onStyleChange('width', value),
    cssProp: "width",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: 'Height',
    id: "height",
    value: height,
    onChange: value => onStyleChange('height', value),
    cssProp: "height",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Min Width",
    id: "min-width",
    value: minWidth,
    onChange: value => onStyleChange('minWidth', value),
    cssProp: "minWidth",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Min Height",
    id: "min-height",
    value: minHeight,
    onChange: value => onStyleChange('minHeight', value),
    cssProp: "minHeight",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Max Width",
    id: "max-width",
    value: maxWidth,
    onChange: value => onStyleChange('maxWidth', value),
    cssProp: "maxWidth",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Max Height",
    id: "max-height",
    value: maxHeight,
    onChange: value => onStyleChange('maxHeight', value),
    cssProp: "maxHeight",
    fallback: true
  })), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Aspect Ratio",
    id: "gblocks-aspect-ratio",
    value: aspectRatio,
    onChange: value => onStyleChange('aspectRatio', value),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro'),
    cssProp: "aspectRatio",
    fallback: true
  })));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/link.js

/**
 * WordPress dependencies
 */

const link_link = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"
}));
/* harmony default export */ const library_link = (link_link);
//# sourceMappingURL=link.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/sides-all.js

/**
 * WordPress dependencies
 */

const sidesAll = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z"
}));
/* harmony default export */ const sides_all = (sidesAll);
//# sourceMappingURL=sides-all.js.map
;// CONCATENATED MODULE: ./src/components/SyncButtons/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const SyncButtons_editor_module = ({"component":"C9DdSihqQ6pNjlEPfKY4"});
;// CONCATENATED MODULE: ./src/components/SyncButtons/SyncButtons.jsx





function SyncButtons({
  sync,
  setSync,
  syncTypes = ['all', 'axis'],
  onClick = () => {}
}) {
  const canSyncAxis = syncTypes.includes('axis');
  const canSyncAll = syncTypes.includes('all');
  const canSync = canSyncAll || canSyncAxis;
  return canSync && (0,external_React_namespaceObject.createElement)("div", {
    className: SyncButtons_editor_module.component
  }, canSyncAll && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    icon: library_link,
    isPressed: 'all' === sync,
    size: "small",
    iconSize: 18,
    onClick: () => {
      if ('all' === sync) {
        setSync(false);
        onClick(false);
        return;
      }
      setSync('all');
      onClick('all');
    },
    label: (0,external_wp_i18n_namespaceObject.__)('Link all sides', 'generateblocks-pro'),
    showTooltip: true
  }), canSyncAxis && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    icon: sides_all,
    isPressed: 'axis' === sync,
    size: "small",
    iconSize: 18,
    onClick: () => {
      if ('axis' === sync) {
        setSync(false);
        onClick(false);
        return;
      }
      setSync('axis');
      onClick('axis');
    },
    label: (0,external_wp_i18n_namespaceObject.__)('Link axis', 'generateblocks-pro'),
    showTooltip: true
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/dimensions/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const dimensions_editor_module = ({"control":"z0al1K49Ic9QSke2unNu","inputs":"jYvWjzX_1ehxNKpCeZzk","circle":"Ajn7gpGC6owbGLMwONw0","syncActive":"QVCTzwDP8z9lQT90FiKd","top":"_6y9cLgAyvj4UgacJafhB","left":"RZNOWIOGdipUZZKUM7hu","right":"FiKD9c_ePt9jkWyWaPay","bottom":"ER00mshCAg_CR5d5seOB","label":"ScuKUnAn9F5EDq8eFJQf","syncItems":"QrVoEI1dQIUV50Wipbtw"});
;// CONCATENATED MODULE: ./src/inspector-controls/controls/dimensions/DimensionsControl.jsx

/**
 * External dependencies
 */




/**
 * Internal dependencies
 */




function getDominantValue(values) {
  // Loop through the values array and return the value that is used the most often. If all are unique, return the first value.
  const counts = {};
  let dominantValue;
  values.forEach(value => {
    if (!value) {
      return;
    }
    if (counts[value]) {
      counts[value] += 1;
    } else {
      counts[value] = 1;
    }
    if (!dominantValue || counts[value] > counts[dominantValue]) {
      dominantValue = value;
    }
  });
  return dominantValue || '';
}
function normalizeValueObject(values) {
  return Object.values(values).reduce((acc, {
    prop,
    value
  }) => {
    acc[prop] = value;
    return acc;
  }, {});
}
function getAxisValueMatch(values, sides = []) {
  var _values$find, _match$1$value;
  const match = (_values$find = values.find(entry => sides.includes(entry[0].toLowerCase().trim()))) !== null && _values$find !== void 0 ? _values$find : ['', ''];
  return (_match$1$value = match[1].value) !== null && _match$1$value !== void 0 ? _match$1$value : '';
}
function DimensionsControl(props) {
  const {
    onChange,
    id,
    units,
    label = '',
    cssProps = {},
    layout = 'circle',
    syncTypes = ['all', 'axis']
  } = props;
  const [sync, setSync] = (0,external_wp_element_namespaceObject.useState)(false);
  const [lastFocused, setLastFocused] = (0,external_wp_element_namespaceObject.useState)('');
  const canSyncAxis = syncTypes.includes('axis');
  const canSyncAll = syncTypes.includes('all');

  // Memos and refs.
  const entries = Object.entries(cssProps);
  const allValue = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (!canSyncAll || 'all' !== sync) {
      return '';
    }
    return getDominantValue(entries.map(entry => entry[1].value));
  }, [entries, sync]);
  const verticalValue = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (!canSyncAxis || 'axis' !== sync) {
      return '';
    }
    return getAxisValueMatch(entries, ['top', 'bottom']);
  }, [entries, canSyncAxis, sync]);
  const horizontalValue = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (!canSyncAxis || 'axis' !== sync) {
      return '';
    }
    return getAxisValueMatch(entries, ['left', 'right']);
  }, [entries, canSyncAxis, sync]);

  // Check sync for axis and all sides

  (0,external_wp_element_namespaceObject.useEffect)(() => {
    const someEmpty = entries.some(entry => !entry[1].value);
    if (someEmpty || sync) {
      return;
    }
    const allEqual = entries.every(entry => entry[1].value === entries[0][1].value);

    // If all values match and aren't empty, set sync to all for the user.
    if (allEqual && !sync) {
      setSync('all');
    }
  }, [JSON.stringify(entries)]);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    document.getElementById(lastFocused)?.focus();
  }, [sync]);

  // Take our cssProps and format them in a way our style indicators understand.
  const cssProp = normalizeValueObject(cssProps);
  const cssPropVertical = [cssProps?.Top?.prop, cssProps?.Bottom?.prop].filter(Boolean);
  const cssPropHorizontal = [cssProps?.Top?.prop, cssProps?.Bottom?.prop].filter(Boolean);
  return (0,external_React_namespaceObject.createElement)(Control, {
    id: id,
    value: Object.values(cssProp).filter(Boolean).join(','),
    searchKeywords: Object.keys(cssProps),
    cssProp: cssProp,
    className: dist_clsx(dimensions_editor_module.control),
    label: label,
    beforeDropdownMenu: (0,external_React_namespaceObject.createElement)(SyncButtons, {
      sync: sync,
      setSync: setSync,
      syncTypes: syncTypes,
      onClick: syncValue => {
        if ('axis' === syncValue) {
          const verticalMatch = getAxisValueMatch(entries, ['top', 'bottom']);
          const horizontalMatch = getAxisValueMatch(entries, ['left', 'right']);
          const newCssProps = {
            ...cssProps
          };
          for (const key in newCssProps) {
            if (['top', 'bottom'].includes(key.toLowerCase().trim())) {
              newCssProps[key].value = verticalMatch;
            }
            if (['left', 'right'].includes(key.toLowerCase().trim())) {
              newCssProps[key].value = horizontalMatch;
            }
          }
          const normalizedValues = normalizeValueObject(newCssProps);
          onChange(normalizedValues);
        }
        if ('all' === syncValue) {
          const dominantValue = getDominantValue(entries.map(entry => entry[1].value));
          if (!dominantValue) {
            return;
          }
          const newCssProps = {
            ...cssProps
          };
          for (const key in newCssProps) {
            newCssProps[key].value = dominantValue;
          }
          const normalizedValues = normalizeValueObject(newCssProps);
          onChange(normalizedValues);
        }
      }
    })
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx(dimensions_editor_module.inputs, dimensions_editor_module[layout], sync && dimensions_editor_module.syncActive)
  }, 'all' === sync && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    id: `${id}-all-control`,
    value: allValue,
    units: units,
    onChange: newValue => {
      const newValues = {
        ...cssProps
      };
      for (const prop in newValues) {
        newValues[prop].value = newValue;
      }
      const normalizedValues = normalizeValueObject(newValues);
      onChange(normalizedValues);
    },
    onFocus: () => setLastFocused(`${id}-all-control`),
    label: (0,external_wp_i18n_namespaceObject.__)('All sides', 'generateblocks-pro'),
    cssProp: cssProp
  }), 'axis' === sync && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: (0,external_wp_i18n_namespaceObject.__)('Vertical', 'generateblocks-pro'),
    id: `${id}-vertical-control`,
    value: verticalValue,
    units: units,
    onChange: newValue => {
      const newCssProps = {
        ...cssProps
      };
      for (const key in newCssProps) {
        if (['top', 'bottom'].includes(key.toLowerCase().trim())) {
          newCssProps[key].value = newValue;
        }
      }
      const normalizedValues = normalizeValueObject(newCssProps);
      onChange(normalizedValues);
    },
    onFocus: () => setLastFocused(`${id}-vertical-control`),
    cssProp: cssPropVertical
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: (0,external_wp_i18n_namespaceObject.__)('Horizontal', 'generateblocks-pro'),
    id: `${id}-horizontal-control`,
    value: horizontalValue,
    units: units,
    onChange: newValue => {
      const newCssProps = {
        ...cssProps
      };
      for (const key in newCssProps) {
        if (['left', 'right'].includes(key.toLowerCase().trim())) {
          newCssProps[key].value = newValue;
        }
      }
      const normalizedValues = normalizeValueObject(newCssProps);
      onChange(normalizedValues);
    },
    onFocus: () => setLastFocused(`${id}-horizontal-control`),
    cssProp: cssPropHorizontal
  })), false === sync && entries.map(entry => {
    const value = entry[1].value;
    const property = entry[1].prop;
    const controlId = `${property}-control`;
    const classKey = entry[0].toLowerCase().trim();
    return (0,external_React_namespaceObject.createElement)(Control, {
      key: controlId,
      className: dist_clsx(dimensions_editor_module[classKey]),
      as: UnitControl,
      id: controlId,
      value: value,
      units: units,
      onChange: newValue => {
        const newValues = {
          [property]: newValue
        };
        onChange(newValues);
      },
      onFocus: () => setLastFocused(controlId),
      label: entry[0],
      cssProp: property
    });
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/spacing/SpacingPanel.jsx







function SpacingPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    marginTop = '',
    marginRight = '',
    marginBottom = '',
    marginLeft = '',
    paddingTop = '',
    paddingRight = '',
    paddingBottom = '',
    paddingLeft = ''
  } = styles;
  const paddingProps = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return {
      Top: {
        prop: 'paddingTop',
        value: paddingTop
      },
      Left: {
        prop: 'paddingLeft',
        value: paddingLeft
      },
      Bottom: {
        prop: 'paddingBottom',
        value: paddingBottom
      },
      Right: {
        prop: 'paddingRight',
        value: paddingRight
      }
    };
  }, [paddingTop, paddingRight, paddingBottom, paddingLeft]);
  const marginProps = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return {
      Top: {
        prop: 'marginTop',
        value: marginTop
      },
      Left: {
        prop: 'marginLeft',
        value: marginLeft
      },
      Bottom: {
        prop: 'marginBottom',
        value: marginBottom
      },
      Right: {
        prop: 'marginRight',
        value: marginRight
      }
    };
  }, [marginTop, marginRight, marginBottom, marginLeft]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Spacing', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(SpacingIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(DimensionsControl, {
    id: "padding",
    label: "Padding",
    cssProps: paddingProps,
    onChange: values => Object.keys(values).forEach(property => onStyleChange(property, values[property]))
  }), (0,external_React_namespaceObject.createElement)(DimensionsControl, {
    id: "margin",
    label: "Margin",
    cssProps: marginProps,
    onChange: values => Object.keys(values).forEach(property => onStyleChange(property, values[property]))
  })));
}
;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = window["lodash"];
;// CONCATENATED MODULE: ./src/inspector-controls/panels/borders/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const borders_editor_module = ({"parentControl":"UcrSHa7HoG_ONn8tQKpE","control":"tBdj7EZ6jXU3fJomYyk_","dropdown":"HZaGgJ1p34CP5sZ6DWsn","colors":"fBhmX_SJFI6xwA5o5Xo9","sync":"RWGNrp7YHDaJSUF0gJHr","flexShrink":"P9ns52uEVrDEtWdgFc1b"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/borders/StyleDropdown.jsx





function BorderIcon({
  icon
}) {
  if ('border-none' === icon) {
    return (0,external_React_namespaceObject.createElement)(Close, null);
  }
  if ('border-solid' === icon) {
    return (0,external_React_namespaceObject.createElement)(Line, null);
  }
  if ('border-dashed' === icon) {
    return (0,external_React_namespaceObject.createElement)(LineDashed, null);
  }
  if ('border-dotted' === icon) {
    return (0,external_React_namespaceObject.createElement)(LineDotted, null);
  }
  if ('border-default' === icon) {
    return (0,external_React_namespaceObject.createElement)(Square, null);
  }
  if ('borders' === icon) {
    return (0,external_React_namespaceObject.createElement)(RoundedSquare, null);
  }
}
function StyleDropdown({
  value,
  onChange
}) {
  const currentIcon = {
    none: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-none"
    }),
    solid: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-solid"
    }),
    dashed: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-dashed"
    }),
    dotted: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-dotted"
    })
  };
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    className: borders_editor_module.dropdown,
    icon: currentIcon[value] || (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-default"
    }),
    label: (0,external_wp_i18n_namespaceObject.__)('Select a style', 'generateblocks-pro')
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-default"
    }),
    onClick: () => {
      onChange('');
      onClose();
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-none"
    }),
    onClick: () => {
      onChange('none');
      onClose();
    }
  }, "None"), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-solid"
    }),
    onClick: () => {
      onChange('solid');
      onClose();
    }
  }, "Solid"), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-dashed"
    }),
    onClick: () => {
      onChange('dashed');
      onClose();
    }
  }, "Dashed"), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
    icon: (0,external_React_namespaceObject.createElement)(BorderIcon, {
      icon: "border-dotted"
    }),
    onClick: () => {
      onChange('dotted');
      onClose();
    }
  }, "Dotted")))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/borders/BordersPanel.jsx













function BordersPanel(props) {
  const borderAreas = ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'];
  const [sync, setSync] = (0,external_wp_element_namespaceObject.useState)('all');
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    border = '',
    borderTopWidth = '',
    borderTopStyle = '',
    borderTopColor = '',
    borderRightWidth = '',
    borderRightStyle = '',
    borderRightColor = '',
    borderBottomWidth = '',
    borderBottomStyle = '',
    borderBottomColor = '',
    borderLeftWidth = '',
    borderLeftStyle = '',
    borderLeftColor = '',
    borderTopLeftRadius = '',
    borderTopRightRadius = '',
    borderBottomRightRadius = '',
    borderBottomLeftRadius = ''
  } = styles;
  const borderValues = {
    border,
    borderTopWidth,
    borderTopStyle,
    borderTopColor,
    borderRightWidth,
    borderRightStyle,
    borderRightColor,
    borderBottomWidth,
    borderBottomStyle,
    borderBottomColor,
    borderLeftWidth,
    borderLeftStyle,
    borderLeftColor
  };
  const borderLabels = {
    borderTop: 'Top',
    borderRight: 'Right',
    borderBottom: 'Bottom',
    borderLeft: 'Left'
  };
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    const allValues = borderAreas.map(area => {
      return Object.entries(borderValues).reduce((newObject, [key, value]) => {
        if (key.startsWith(area) && value) {
          const newKey = key.replace(area, '');
          newObject = {
            ...newObject,
            [newKey]: value
          };
        }
        return newObject;
      }, {});
    });
    if (allValues.every(obj => !(0,external_lodash_namespaceObject.isEmpty)(obj) && !(0,external_lodash_namespaceObject.isEqual)(obj, allValues[0]))) {
      setSync(false);
    }
  }, []);
  const manualSync = (0,external_wp_element_namespaceObject.useCallback)(function manualSync() {
    const areasWithWidth = borderAreas.filter(area => borderValues[area + 'Width'] || isNumeric(borderValues[area + 'Width']));
    if (!areasWithWidth.length) {
      return;
    }
    const firstArea = areasWithWidth[0];
    const valuesToSync = Object.entries(borderValues).reduce((newObject, [key, value]) => {
      if (key.startsWith(firstArea)) {
        const newKey = key.replace(firstArea, '');
        newObject[newKey] = value;
      }
      return newObject;
    }, {});
    const newStyles = Object.entries(valuesToSync).reduce((newObject, [key, value]) => {
      if (!value) {
        return newObject;
      }
      borderAreas.forEach(area => {
        newObject[area + key] = value;
      });
      return newObject;
    }, {});
    Object.keys(newStyles).forEach(property => onStyleChange(property, newStyles[property]));
  }, [borderValues, onStyleChange]);
  const borderRadiusProps = {
    'Top Left': {
      prop: 'borderTopLeftRadius',
      value: borderTopLeftRadius
    },
    'Top Right': {
      prop: 'borderTopRightRadius',
      value: borderTopRightRadius
    },
    'Bottom Left': {
      prop: 'borderBottomLeftRadius',
      value: borderBottomLeftRadius
    },
    'Bottom Right': {
      prop: 'borderBottomRightRadius',
      value: borderBottomRightRadius
    }
  };
  const values = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (sync) {
      return border;
    }
    return Object.values(borderValues).filter(Boolean).join(',');
  }, [borderValues, sync]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Borders', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(BordersIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    label: "Border",
    id: "gblocks-border",
    className: dist_clsx('gb-borders', borders_editor_module.parentControl),
    beforeDropdownMenu: (0,external_React_namespaceObject.createElement)(SyncButtons, {
      sync: sync,
      setSync: setSync,
      syncTypes: ['all'],
      onClick: newSync => {
        if (newSync) {
          manualSync();
        }
      }
    }),
    searchKeywords: Object.keys(borderValues),
    cssProp: borderValues,
    value: values
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px"
  }, borderAreas.map((borderArea, areaIndex) => {
    if (sync && areaIndex > 0) {
      return null;
    }
    const label = sync ? (0,external_wp_i18n_namespaceObject.__)('All sides', 'generateblocks-pro') : borderLabels[borderArea];
    const areaSearchKeywords = sync ? Object.keys(borderValues) : [borderArea + 'Width', borderArea + 'Style', borderArea + 'Color'];
    const areaValue = sync ? values : [borderValues[borderArea + 'Width'], borderValues[borderArea + 'Style'], borderValues[borderArea + 'Color']].filter(Boolean).join(',');
    const key = sync ? 'all-sides' : borderArea;
    return (0,external_React_namespaceObject.createElement)(Control, {
      key: key,
      label: label,
      searchKeywords: areaSearchKeywords,
      value: areaValue
    }, (0,external_React_namespaceObject.createElement)("div", {
      className: borders_editor_module.control,
      "data-border-area": key
    }, (0,external_React_namespaceObject.createElement)(Control, {
      as: UnitControl,
      id: 'gblocks-' + borderArea + '-width',
      value: borderValues[borderArea + 'Width'] || '',
      cssProp: false,
      "aria-label": `border ${borderArea} width`,
      onChange: value => {
        const newStyles = {
          [borderArea + 'Width']: value
        };
        if (sync) {
          newStyles.borderRightWidth = value;
          newStyles.borderBottomWidth = value;
          newStyles.borderLeftWidth = value;
        }
        if (!value) {
          newStyles[borderArea + 'Style'] = '';
          if (sync) {
            newStyles.borderRightStyle = '';
            newStyles.borderBottomStyle = '';
            newStyles.borderLeftStyle = '';
          }
        } else if (!borderValues[borderArea + 'Style']) {
          newStyles[borderArea + 'Style'] = 'solid';
          if (sync) {
            newStyles.borderRightStyle = 'solid';
            newStyles.borderBottomStyle = 'solid';
            newStyles.borderLeftStyle = 'solid';
          }
        }
        Object.keys(newStyles).forEach(property => onStyleChange(property, newStyles[property]));
      }
    }), (0,external_React_namespaceObject.createElement)(StyleDropdown, {
      value: borderValues[borderArea + 'Style'],
      onChange: value => {
        const newStyles = {
          [borderArea + 'Style']: value
        };
        if (sync) {
          newStyles.borderRightStyle = value;
          newStyles.borderBottomStyle = value;
          newStyles.borderLeftStyle = value;
        }
        Object.keys(newStyles).forEach(property => onStyleChange(property, newStyles[property]));
      },
      "aria-label": `border ${borderArea} style`,
      className: borders_editor_module.flexShrink
    }), (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.ColorPicker, {
      as: external_gb_components_namespaceObject.ColorPicker,
      value: borderValues[borderArea + 'Color'] || '',
      alpha: true,
      onChange: nextBackgroundColor => {
        const newStyles = {
          [borderArea + 'Color']: nextBackgroundColor
        };
        if (sync) {
          newStyles.borderRightColor = nextBackgroundColor;
          newStyles.borderBottomColor = nextBackgroundColor;
          newStyles.borderLeftColor = nextBackgroundColor;
        }
        Object.keys(newStyles).forEach(property => onStyleChange(property, newStyles[property]));
      },
      "aria-label": `border ${borderArea} color`
    })));
  }))), (0,external_React_namespaceObject.createElement)(DimensionsControl, {
    id: "border-radius",
    label: "Border Radius",
    onChange: newValues => Object.keys(newValues).forEach(property => onStyleChange(property, newValues[property])),
    cssProps: borderRadiusProps,
    syncTypes: ['all'],
    layout: "corners"
  })));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/align-left.js

/**
 * WordPress dependencies
 */

const alignLeft = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M13 5.5H4V4h9v1.5Zm7 7H4V11h16v1.5Zm-7 7H4V18h9v1.5Z"
}));
/* harmony default export */ const align_left = (alignLeft);
//# sourceMappingURL=align-left.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/align-center.js

/**
 * WordPress dependencies
 */

const alignCenter = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M7.5 5.5h9V4h-9v1.5Zm-3.5 7h16V11H4v1.5Zm3.5 7h9V18h-9v1.5Z"
}));
/* harmony default export */ const align_center = (alignCenter);
//# sourceMappingURL=align-center.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/align-right.js

/**
 * WordPress dependencies
 */

const alignRight = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M11.111 5.5H20V4h-8.889v1.5ZM4 12.5h16V11H4v1.5Zm7.111 7H20V18h-8.889v1.5Z"
}));
/* harmony default export */ const align_right = (alignRight);
//# sourceMappingURL=align-right.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/align-justify.js

/**
 * WordPress dependencies
 */

const alignJustify = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M4 12.8h16v-1.5H4v1.5zm0 7h12.4v-1.5H4v1.5zM4 4.3v1.5h16V4.3H4z"
}));
/* harmony default export */ const align_justify = (alignJustify);
//# sourceMappingURL=align-justify.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/TextAlign.jsx




const TextAlign_buttons = [{
  icon: align_left,
  title: 'Align text left',
  value: 'left'
}, {
  icon: align_center,
  title: 'Align text center',
  value: 'center'
}, {
  icon: align_right,
  title: 'Align text right',
  value: 'right'
}, {
  icon: align_justify,
  title: 'Justify text',
  value: 'justify'
}];
function TextAlign({
  value,
  onChange,
  cssProp
}) {
  const hasCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => TextAlign_buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    hasCustomValue: hasCustomValue,
    as: ButtonIconControl,
    label: "Text Alignment",
    id: "text-align",
    buttons: TextAlign_buttons,
    value: value,
    onChange: onChange,
    cssProp: cssProp
  });
}
;// CONCATENATED MODULE: external ["wp","apiFetch"]
const external_wp_apiFetch_namespaceObject = window["wp"]["apiFetch"];
var external_wp_apiFetch_default = /*#__PURE__*/__nested_webpack_require_290554__.n(external_wp_apiFetch_namespaceObject);
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const typography_editor_module = ({"preview":"wxAVEumQCJJAdp77_hoc","fallback":"pHSzMU3g1wugDJpJofM6"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/FontPreview.jsx





const FontPreview = (0,external_wp_element_namespaceObject.memo)(function FontPreview({
  font,
  loading = 'lazy',
  fallbackText = '',
  showPreviewSvg = false
}) {
  const {
    name,
    alias,
    preview,
    fontFamily,
    cssVariable = ''
  } = font;
  return (0,external_React_namespaceObject.createElement)("div", {
    className: typography_editor_module.preview
  }, showPreviewSvg && preview ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("img", {
    className: typography_editor_module.image,
    src: preview,
    alt: (0,external_wp_i18n_namespaceObject.__)('A graphical rendering of the font family', 'gp-premium'),
    height: "23",
    loading: loading
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.VisuallyHidden, null, fallbackText ? fallbackText : name)) : (0,external_React_namespaceObject.createElement)("span", {
    className: typography_editor_module.fallback,
    style: {
      fontFamily: cssVariable ? `var(${cssVariable})` : fontFamily
    }
  }, name, " ", alias && `(${alias})`));
});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/FontFamily.jsx








const controller = typeof AbortController === 'undefined' ? undefined : new AbortController();
const FONT_LIBRARY_PAGE_SLUG = 'generatepress-font-library';
const FontFamily_CustomSelect = (0,external_wp_element_namespaceObject.memo)(CustomSelect);
const CustomSelectItem = (0,external_wp_element_namespaceObject.memo)(function CustomSelectItem({
  item
}) {
  return item ? (0,external_React_namespaceObject.createElement)(FontPreview, {
    font: item
  }) : null;
});
function getDefaultFonts() {
  const {
    typographyFontFamilyList
  } = window?.generateBlocksInfo;
  const systemFonts = [{
    id: 'default',
    name: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
    fontFamily: ''
  }, {
    id: 'inherit',
    name: 'Inherit',
    fontFamily: 'inherit'
  }, {
    id: 'system',
    name: 'System Font',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif'
  }];
  if (typographyFontFamilyList) {
    typographyFontFamilyList.forEach(group => {
      if ('System Fonts' === group.label) {
        systemFonts.push(...group.options.map(({
          label,
          value
        }, i) => {
          const offsetIndex = i + 1;
          return {
            id: `system-${offsetIndex}`,
            name: label,
            fontFamily: value
          };
        }));
      }
    });
    return systemFonts;
  }
  return [];
}
function FontFamily({
  onStyleChange,
  fontFamily = '',
  cssProp = ''
}) {
  // State.
  const [fonts, setFonts] = (0,external_wp_element_namespaceObject.useState)(() => getDefaultFonts());
  const [fontFamilyValue, setFontFamilyValue] = (0,external_wp_element_namespaceObject.useState)(fontFamily);
  const [hasCustomValue, setHasCustomValue] = (0,external_wp_element_namespaceObject.useState)(false);
  const [selectedFont, setSelectedFont] = (0,external_wp_element_namespaceObject.useState)(null);
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.debounce)(onStyleChange, 100);

  // Memos and Refs.
  const availableFonts = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (selectedFont?.id === 'custom') {
      return [selectedFont, ...fonts];
    }
    return fonts;
  }, [selectedFont, fonts.length]);
  const fontFamilyVariableName = (0,external_wp_element_namespaceObject.useMemo)(() => {
    const regex = /var\((--[^)]+)\)/;
    const matches = fontFamily.match(regex);
    return matches ? matches[1] : null;
  }, [fontFamily]);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (!window?.generateBlocksEditor?.hasGPFontLibrary) {
      return;
    }
    async function fetchFontList() {
      try {
        const result = await external_wp_apiFetch_default()({
          path: `/generatepress-font-library/v1/get-fonts`,
          method: 'GET'
        });
        if (!result.response) {
          throw new Error('Request failed');
        }
        setFonts([...getDefaultFonts(), ...result.response]);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Request has been aborted'); // eslint-disable-line no-console
        }
        controller?.abort();
      }
    }
    fetchFontList();
  }, []);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (fontFamilyValue !== fontFamily) {
      setFontFamilyValue(fontFamily);
    }
  }, [fontFamilyValue, fontFamily]);

  // Effects.
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    // Check if the font matches one in the list.
    let font = fonts.find(item => {
      return fontFamilyVariableName === item?.cssVariable || fontFamily === item?.fontFamily;
    });
    if (font) {
      setHasCustomValue(false);
      setSelectedFont(font);
      return;
    }

    // Setup the custom font object.
    font = {
      id: 'custom',
      name: fontFamily,
      fontFamily
    };

    // If the value is a CSS variable, attempt to update the name.
    if (fontFamilyVariableName) {
      // If the value is a variable that doesn't match a registered font, treat it as a custom value.
      const variableValue = fontFamilyVariableName ? getComputedStyle(document.documentElement).getPropertyValue(fontFamilyVariableName) : null;

      // If we can get the variable value, use that as the label.
      if (variableValue) {
        font.name = variableValue;
        return;
      }

      // Set hasCustomValue if the variable can't be identified or it's some other value.
      setHasCustomValue(true);
    }

    // If the font-family includes comma separated values, only use the first one.
    font.name = font.name.split(',')[0].trim();
    setSelectedFont(font);
  }, [fontFamily, fonts, fontFamilyVariableName]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    className: "gb-styles-builder__font-family",
    as: FontFamily_CustomSelect,
    label: "Font Family",
    id: "gblocks-font-family",
    value: fontFamilyValue,
    onChange: value => {
      let newFontFamily = value?.fontFamily;
      if (value?.cssVariable) {
        newFontFamily = `var(${value.cssVariable})`;
      }
      debouncedOnStyleChange('fontFamily', newFontFamily);
    },
    items: availableFonts,
    itemToString: item => {
      if (!item?.fontFamily && !item?.cssVariable) {
        return '';
      }

      // Support custom values that may or may not be a CSS variable.
      return item.cssVariable || item.fontFamily;
    },
    ItemComponent: CustomSelectItem,
    allowCustomValue: true,
    hasCustomValue: hasCustomValue,
    selectedItem: selectedFont,
    setSelectedItem: setSelectedFont,
    dropdownChildren: ({
      onClose
    }) => {
      return (0,external_React_namespaceObject.createElement)(Control.Description, {
        label: (0,external_wp_i18n_namespaceObject.__)('About Font Family', 'generateblocks-pro'),
        onClick: onClose
      }, (0,external_wp_i18n_namespaceObject.__)('Select a font from the list or enter your own custom value.', 'generateblocks-pro'));
    },
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Manage Fonts', 'generateblocks-pro'),
    learnMoreUrl: `/wp-admin/themes.php?page=${FONT_LIBRARY_PAGE_SLUG}`,
    cssProp: cssProp,
    selectedStyle: "icon"
  });
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-uppercase.js

/**
 * WordPress dependencies
 */

const formatUppercase = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M6.1 6.8L2.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H6.1zm-.8 6.8L7 8.9l1.7 4.7H5.3zm15.1-.7c-.4-.5-.9-.8-1.6-1 .4-.2.7-.5.8-.9.2-.4.3-.9.3-1.4 0-.9-.3-1.6-.8-2-.6-.5-1.3-.7-2.4-.7h-3.5V18h4.2c1.1 0 2-.3 2.6-.8.6-.6 1-1.4 1-2.4-.1-.8-.3-1.4-.6-1.9zm-5.7-4.7h1.8c.6 0 1.1.1 1.4.4.3.2.5.7.5 1.3 0 .6-.2 1.1-.5 1.3-.3.2-.8.4-1.4.4h-1.8V8.2zm4 8c-.4.3-.9.5-1.5.5h-2.6v-3.8h2.6c1.4 0 2 .6 2 1.9.1.6-.1 1-.5 1.4z"
}));
/* harmony default export */ const format_uppercase = (formatUppercase);
//# sourceMappingURL=format-uppercase.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-lowercase.js

/**
 * WordPress dependencies
 */

const formatLowercase = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M11 16.8c-.1-.1-.2-.3-.3-.5v-2.6c0-.9-.1-1.7-.3-2.2-.2-.5-.5-.9-.9-1.2-.4-.2-.9-.3-1.6-.3-.5 0-1 .1-1.5.2s-.9.3-1.2.6l.2 1.2c.4-.3.7-.4 1.1-.5.3-.1.7-.2 1-.2.6 0 1 .1 1.3.4.3.2.4.7.4 1.4-1.2 0-2.3.2-3.3.7s-1.4 1.1-1.4 2.1c0 .7.2 1.2.7 1.6.4.4 1 .6 1.8.6.9 0 1.7-.4 2.4-1.2.1.3.2.5.4.7.1.2.3.3.6.4.3.1.6.1 1.1.1h.1l.2-1.2h-.1c-.4.1-.6 0-.7-.1zM9.2 16c-.2.3-.5.6-.9.8-.3.1-.7.2-1.1.2-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.9 0-.6.2-1 .7-1.3.5-.3 1.3-.4 2.5-.5v2zm10.6-3.9c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2s-.2 1.4-.6 2z"
}));
/* harmony default export */ const format_lowercase = (formatLowercase);
//# sourceMappingURL=format-lowercase.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-capitalize.js

/**
 * WordPress dependencies
 */

const formatCapitalize = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M7.1 6.8L3.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H7.1zm-.8 6.8L8 8.9l1.7 4.7H6.3zm14.5-1.5c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2 .1.8-.2 1.4-.6 2z"
}));
/* harmony default export */ const format_capitalize = (formatCapitalize);
//# sourceMappingURL=format-capitalize.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/TextTransform.jsx





const TextTransform_buttons = [{
  label: 'None',
  value: 'none',
  icon: (0,external_React_namespaceObject.createElement)(NotAllowed, null)
}, {
  label: 'Uppercase',
  value: 'uppercase',
  icon: format_uppercase
}, {
  label: 'Lowercase',
  value: 'lowercase',
  icon: format_lowercase
}, {
  label: 'Capitalize',
  value: 'capitalize',
  icon: format_capitalize
}];
function TextTransform({
  value,
  onChange,
  cssProp
}) {
  const hasCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => TextTransform_buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    hasCustomValue: hasCustomValue,
    label: "Text Transform",
    id: "gblocks-text-transform",
    value: value,
    buttons: TextTransform_buttons,
    onChange: onChange,
    cssProp: cssProp
  });
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-underline.js

/**
 * WordPress dependencies
 */

const formatUnderline = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M7 18v1h10v-1H7zm5-2c1.5 0 2.6-.4 3.4-1.2.8-.8 1.1-2 1.1-3.5V5H15v5.8c0 1.2-.2 2.1-.6 2.8-.4.7-1.2 1-2.4 1s-2-.3-2.4-1c-.4-.7-.6-1.6-.6-2.8V5H7.5v6.2c0 1.5.4 2.7 1.1 3.5.8.9 1.9 1.3 3.4 1.3z"
}));
/* harmony default export */ const format_underline = (formatUnderline);
//# sourceMappingURL=format-underline.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-strikethrough.js

/**
 * WordPress dependencies
 */

const formatStrikethrough = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M9.1 9v-.5c0-.6.2-1.1.7-1.4.5-.3 1.2-.5 2-.5.7 0 1.4.1 2.1.3.7.2 1.4.5 2.1.9l.2-1.9c-.6-.3-1.2-.5-1.9-.7-.8-.1-1.6-.2-2.4-.2-1.5 0-2.7.3-3.6 1-.8.7-1.2 1.5-1.2 2.6V9h2zM20 12H4v1h8.3c.3.1.6.2.8.3.5.2.9.5 1.1.8.3.3.4.7.4 1.2 0 .7-.2 1.1-.8 1.5-.5.3-1.2.5-2.1.5-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.5-2.2-.8L7 18.1c.5.2 1.2.4 2 .6.8.2 1.6.3 2.4.3 1.7 0 3-.3 3.9-1 .9-.7 1.3-1.6 1.3-2.8 0-.9-.2-1.7-.7-2.2H20v-1z"
}));
/* harmony default export */ const format_strikethrough = (formatStrikethrough);
//# sourceMappingURL=format-strikethrough.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/TextDecoration.jsx




const TextDecoration_buttons = [{
  label: 'None',
  value: 'none',
  icon: (0,external_React_namespaceObject.createElement)(NotAllowed, null)
}, {
  label: 'Underline',
  value: 'underline',
  icon: format_underline
}, {
  label: 'Overline',
  value: 'overline',
  icon: (0,external_React_namespaceObject.createElement)(OverlineIcon, null)
}, {
  label: 'Line-through',
  value: 'line-through',
  icon: format_strikethrough
}];
function TextDecoration({
  value,
  onChange,
  cssProp
}) {
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    label: "Text Decoration",
    id: "gblocks-text-decoration",
    value: value,
    onChange: onChange,
    buttons: TextDecoration_buttons,
    cssProp: cssProp
  });
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/format-italic.js

/**
 * WordPress dependencies
 */

const formatItalic = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M12.5 5L10 19h1.9l2.5-14z"
}));
/* harmony default export */ const format_italic = (formatItalic);
//# sourceMappingURL=format-italic.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/FontStyle.jsx





const FontStyle_buttons = [{
  label: 'None',
  value: 'none',
  icon: (0,external_React_namespaceObject.createElement)(NotAllowed, null)
}, {
  label: 'Normal',
  value: 'normal',
  icon: format_capitalize
}, {
  label: 'Italic',
  value: 'italic',
  icon: format_italic
}];
function FontStyle({
  value,
  onChange,
  cssProp
}) {
  const usingCustomValue = (0,external_wp_element_namespaceObject.useMemo)(() => FontStyle_buttons.every(button => button.value !== value), [value]);
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: ButtonIconControl,
    allowCustomValue: true,
    hasCustomValue: usingCustomValue,
    label: "Font Style",
    id: "gblocks-font-style",
    value: value,
    onChange: onChange,
    buttons: FontStyle_buttons,
    cssProp: cssProp
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/typography/TypographyPanel.jsx











function TypographyPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    fontSize = '',
    color = '',
    lineHeight = '',
    letterSpacing = '',
    textAlign = '',
    fontWeight = '',
    fontStyle = '',
    textDecoration = '',
    fontFamily = '',
    textTransform = ''
  } = styles;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Typography', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(TypographyIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_gb_components_namespaceObject.ColorPicker,
    label: "Text Color",
    value: color,
    onChange: value => onStyleChange('color', value),
    cssProp: "color"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: "Font Weight",
    id: "gblocks-font-weight",
    value: fontWeight,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Normal',
      value: 'normal'
    }, {
      label: 'Bold',
      value: 'bold'
    }, {
      label: '100',
      value: '100'
    }, {
      label: '200',
      value: '200'
    }, {
      label: '300',
      value: '300'
    }, {
      label: '400',
      value: '400'
    }, {
      label: '500',
      value: '500'
    }, {
      label: '600',
      value: '600'
    }, {
      label: '700',
      value: '700'
    }, {
      label: '800',
      value: '800'
    }, {
      label: '900',
      value: '900'
    }],
    onChange: value => onStyleChange('fontWeight', value),
    cssProp: "fontWeight"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Font Size",
    id: "gblocks-font-size",
    value: fontSize,
    onChange: value => onStyleChange('fontSize', value),
    fallbackProp: true,
    cssProp: "fontSize"
  }), (0,external_React_namespaceObject.createElement)(FontStyle, {
    value: fontStyle,
    onChange: value => onStyleChange('fontStyle', value),
    cssProp: "fontStyle"
  }), (0,external_React_namespaceObject.createElement)(TextAlign, {
    value: textAlign,
    onChange: value => onStyleChange('textAlign', value),
    cssProp: "textAlign"
  }), (0,external_React_namespaceObject.createElement)(TextTransform, {
    value: textTransform,
    onChange: value => onStyleChange('textTransform', value),
    cssProp: "textTransform"
  }), (0,external_React_namespaceObject.createElement)(TextDecoration, {
    value: textDecoration,
    onChange: value => onStyleChange('textDecoration', value),
    cssProp: "textDecoration"
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Flex, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Line Height",
    id: "gblocks-line-height",
    value: lineHeight,
    onChange: value => onStyleChange('lineHeight', value),
    cssProp: "lineHeight",
    units: [...UnitControl.defaultUnits, ''],
    defaultUnit: ""
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FlexBlock, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Letter Spacing",
    id: "gblocks-letter-spacing",
    value: letterSpacing,
    onChange: value => onStyleChange('letterSpacing', value),
    cssProp: "letterSpacing"
  }))), (0,external_React_namespaceObject.createElement)(FontFamily, {
    fontFamily: fontFamily,
    onStyleChange: onStyleChange,
    cssProp: "fontFamily"
  })));
}
// EXTERNAL MODULE: ./node_modules/gradient-parser/build/node.js
var node = __nested_webpack_require_290554__(4190);
;// CONCATENATED MODULE: ./node_modules/color-parse/node_modules/color-name/index.js
/* harmony default export */ const color_name = ({
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkgrey: [169, 169, 169],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkslategrey: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dimgrey: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	grey: [128, 128, 128],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgray: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightgrey: [211, 211, 211],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightslategrey: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 219],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [219, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	rebeccapurple: [102, 51, 153],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	slategrey: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50]
});

;// CONCATENATED MODULE: ./node_modules/color-parse/index.js
/**
 * @module color-parse
 */


/* harmony default export */ const color_parse = (color_parse_parse);

/**
 * Base hues
 * http://dev.w3.org/csswg/css-color/#typedef-named-hue
 */
//FIXME: use external hue detector
var baseHues = {
	red: 0,
	orange: 60,
	yellow: 120,
	green: 180,
	blue: 240,
	purple: 300
}

/**
 * Parse color from the string passed
 *
 * @return {Object} A space indicator `space`, an array `values` and `alpha`
 */
function color_parse_parse(cstr) {
	var m, parts = [], alpha = 1, space

	//numeric case
	if (typeof cstr === 'number') {
		return { space: 'rgb', values: [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff], alpha: 1 }
	}
	if (typeof cstr === 'number') return { space: 'rgb', values: [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff], alpha: 1 }

	cstr = String(cstr).toLowerCase();

	//keyword
	if (color_name[cstr]) {
		parts = color_name[cstr].slice()
		space = 'rgb'
	}

	//reserved words
	else if (cstr === 'transparent') {
		alpha = 0
		space = 'rgb'
		parts = [0, 0, 0]
	}

	//hex
	else if (cstr[0] === '#') {
		var base = cstr.slice(1)
		var size = base.length
		var isShort = size <= 4
		alpha = 1

		if (isShort) {
			parts = [
				parseInt(base[0] + base[0], 16),
				parseInt(base[1] + base[1], 16),
				parseInt(base[2] + base[2], 16)
			]
			if (size === 4) {
				alpha = parseInt(base[3] + base[3], 16) / 255
			}
		}
		else {
			parts = [
				parseInt(base[0] + base[1], 16),
				parseInt(base[2] + base[3], 16),
				parseInt(base[4] + base[5], 16)
			]
			if (size === 8) {
				alpha = parseInt(base[6] + base[7], 16) / 255
			}
		}

		if (!parts[0]) parts[0] = 0
		if (!parts[1]) parts[1] = 0
		if (!parts[2]) parts[2] = 0

		space = 'rgb'
	}

	// color space
	else if (m = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(cstr)) {
		var name = m[1]
		space = name.replace(/a$/, '')
		var dims = space === 'cmyk' ? 4 : space === 'gray' ? 1 : 3
		parts = m[2].trim().split(/\s*[,\/]\s*|\s+/)

		// color(srgb-linear x x x) -> srgb-linear(x x x)
		if (space === 'color') space = parts.shift()

		parts = parts.map(function (x, i) {
			//<percentage>
			if (x[x.length - 1] === '%') {
				x = parseFloat(x) / 100
				// alpha -> 0..1
				if (i === 3) return x
				// rgb -> 0..255
				if (space === 'rgb') return x * 255
				// hsl, hwb H -> 0..100
				if (space[0] === 'h') return x * 100
				// lch, lab L -> 0..100
				if (space[0] === 'l' && !i) return x * 100
				// lab A B -> -125..125
				if (space === 'lab') return x * 125
				// lch C -> 0..150, H -> 0..360
				if (space === 'lch') return i < 2 ? x * 150 : x * 360
				// oklch/oklab L -> 0..1
				if (space[0] === 'o' && !i) return x
				// oklab A B -> -0.4..0.4
				if (space === 'oklab') return x * 0.4
				// oklch C -> 0..0.4, H -> 0..360
				if (space === 'oklch') return i < 2 ? x * 0.4 : x * 360
				// color(xxx) -> 0..1
				return x
			}

			//hue
			if (space[i] === 'h' || (i === 2 && space[space.length - 1] === 'h')) {
				//<base-hue>
				if (baseHues[x] !== undefined) return baseHues[x]
				//<deg>
				if (x.endsWith('deg')) return parseFloat(x)
				//<turn>
				if (x.endsWith('turn')) return parseFloat(x) * 360
				if (x.endsWith('grad')) return parseFloat(x) * 360 / 400
				if (x.endsWith('rad')) return parseFloat(x) * 180 / Math.PI
			}
			if (x === 'none') return 0
			return parseFloat(x)
		});

		alpha = parts.length > dims ? parts.pop() : 1
	}

	//named channels case
	else if (/[0-9](?:\s|\/|,)/.test(cstr)) {
		parts = cstr.match(/([0-9]+)/g).map(function (value) {
			return parseFloat(value)
		})

		space = cstr.match(/([a-z])/ig)?.join('')?.toLowerCase() || 'rgb'
	}

	return {
		space,
		values: parts,
		alpha
	}
}

;// CONCATENATED MODULE: ./src/inspector-controls/controls/background/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const background_editor_module = ({"control":"coDrJTdl0NPp2U6yKoW7","gradient":"Pp6ctzaF8masxyqyEIBc","preview":"ge_yjNFwwAQrJ9x5RvUQ","bar":"wNapH7q19yDiYItO4_o3","settings":"CEwHVGKBU2XY1H8fvYyu","setting":"PYmp7A77hkWquKO3ycyE","gb-styles-builder-control":"ULt8SsOuyMTzbpdi9TYy","remove":"jow7xAj7G82A48dbFe6X","stops":"pFX16OzkIqgVovlM0iDS"});
;// CONCATENATED MODULE: ./src/inspector-controls/controls/background/GradientPicker.jsx













function GradientStop({
  onChange,
  setCurrentGradient,
  currentGradient,
  index
}) {
  const {
    colorStops
  } = currentGradient;
  const colorStop = colorStops[index];
  const [color, setColor] = (0,external_wp_element_namespaceObject.useState)(`${colorStop.type}(${colorStop.value})`); // @TODO - Fix this to support other color types than RGB/HSL, etc
  const [stop, setStop] = (0,external_wp_element_namespaceObject.useState)(colorStop.length.value);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (onChange) {
      const alphaSpaces = ['rgb', 'hsl'];
      const parsedColor = color_parse(getColorFromCustomProperty(color));
      const valueWithAlpha = parsedColor.alpha !== 1 ? [...parsedColor.values, parsedColor.alpha] : parsedColor.values;
      const typeWithAlpha = alphaSpaces.includes(parsedColor.space) && parsedColor.alpha !== 1 ? parsedColor.space + 'a' : parsedColor.space;
      onChange({
        type: typeWithAlpha,
        value: valueWithAlpha
      }, {
        type: '%',
        value: stop
      });
    }
  }, [color, stop]);
  return (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    direction: "horizontal",
    layout: "flex"
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.ColorPicker, {
    "aria-label": "Color",
    value: color,
    onChange: setColor
  }), (0,external_React_namespaceObject.createElement)("div", {
    style: {
      flexGrow: 1
    }
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.RangeControl, {
    initialPosition: parseInt(stop),
    label: "Stop",
    hideLabelFromVision: true,
    onChange: setStop
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    disabled: colorStops.length < 3,
    tooltip: colorStops.length < 3 ? (0,external_wp_i18n_namespaceObject.__)('At least 2 color stops are required', 'generateblocks-pro') : null,
    className: background_editor_module.remove,
    icon: close_small,
    onClick: () => {
      setCurrentGradient(prevState => {
        const newColorStops = [...prevState.colorStops];
        newColorStops.splice(index, 1);
        return {
          ...prevState,
          colorStops: newColorStops
        };
      });
    },
    "aria-label": (0,external_wp_i18n_namespaceObject.sprintf)(
    // translators: %s is the color stop number.
    (0,external_wp_i18n_namespaceObject.__)('Remove stop %s', 'generateblocks-pro'), index)
  }));
}
function GradientPicker({
  onChange,
  value = '',
  presets = [],
  selectingPreset,
  setSelectingPreset = false
}) {
  var _orientation$value;
  const [currentGradient, setCurrentGradient] = (0,external_wp_element_namespaceObject.useState)(node.parse(value)[0]);
  const {
    type: gradientType,
    orientation,
    colorStops = []
  } = currentGradient;
  const gradientPresets = (0,external_wp_hooks_namespaceObject.applyFilters)('generateblocks.editor.gradientPresets', presets);
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    try {
      onChange(node.stringify([currentGradient]));
    } catch (e) {
      console.error(e.message); // eslint-disable-line no-console
    }
  }, [currentGradient]);
  const orientationMap = {
    right: '90',
    bottom: '180',
    left: '270',
    top: '0'
  };
  const orientationValue = (_orientation$value = orientation?.value) !== null && _orientation$value !== void 0 ? _orientation$value : orientation;
  return (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.gradient
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.preview
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.bar,
    style: {
      backgroundImage: value
    }
  })), selectingPreset && gradientPresets ? (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, gradientPresets.map(group => (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.preset,
    key: group.name
  }, (0,external_React_namespaceObject.createElement)("span", {
    className: control_editor_module.label
  }, group.name), (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    direction: "horizontal",
    layout: "flex",
    gap: "2px"
  }, group.gradients.map(groupGradients => {
    return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      key: groupGradients.slug,
      onClick: () => {
        setCurrentGradient(node.parse(groupGradients.gradient)[0]);
      }
    }, (0,external_React_namespaceObject.createElement)("span", {
      style: {
        background: groupGradients.gradient ? groupGradients.gradient : null
      }
    }));
  })))), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "link",
    onClick: () => setSelectingPreset(false)
  }, (0,external_wp_i18n_namespaceObject.__)('Back', 'generateblocks-pro'))) : (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.settings
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    layout: "flex",
    direction: "horizontal",
    wrap: false
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    label: (0,external_wp_i18n_namespaceObject.__)('Type', 'generateblocks-pro'),
    value: gradientType,
    options: [{
      label: 'Linear',
      value: 'linear-gradient'
    }, {
      label: 'Radial',
      value: 'radial-gradient'
    }],
    onChange: newType => {
      setCurrentGradient(prevState => {
        return {
          ...prevState,
          type: newType,
          orientation: 'radial-gradient' === newType ? undefined : prevState.orientation || {
            type: 'angular',
            value: '90'
          }
        };
      });
    },
    style: {
      flexGrow: 1
    }
  }), 'linear-gradient' === gradientType && (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.AnglePickerControl,
    label: "Angle",
    value: orientationMap[orientationValue] || orientationValue,
    onChange: newOrientation => {
      setCurrentGradient(prevState => {
        return {
          ...prevState,
          orientation: {
            type: 'angular',
            value: newOrientation
          }
        };
      });
    }
  }))), (0,external_React_namespaceObject.createElement)("ul", {
    // eslint-disable-line jsx-a11y/no-redundant-roles
    className: background_editor_module.stops,
    role: "list"
  }, colorStops.map((colorStop, index) => (0,external_React_namespaceObject.createElement)("li", {
    key: index,
    style: {
      marginBottom: 0
    }
  }, (0,external_React_namespaceObject.createElement)(GradientStop, {
    index: index,
    currentGradient: currentGradient,
    setCurrentGradient: setCurrentGradient,
    colorStop: colorStop,
    onChange: (newColor, newStop) => {
      setCurrentGradient(prevState => {
        const newColorStops = [...prevState.colorStops];
        const currentValues = newColorStops[index];

        // Update the current stop with new values
        newColorStops[index] = {
          ...currentValues,
          ...newColor,
          length: newStop
        };
        return {
          ...prevState,
          colorStops: newColorStops
        };
      });
    }
  }))), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    variant: "primary",
    size: "compact",
    onClick: () => {
      setCurrentGradient(prevState => {
        return {
          ...prevState,
          colorStops: [...prevState.colorStops, {
            type: 'rgb',
            value: [0, 0, 0],
            length: {
              type: '%',
              value: 0
            }
          }]
        };
      });
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Add Color', 'generateblocks-pro'))))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/image/utils.js
const keywordValues = {
  left: 0,
  center: 0.5,
  top: 0,
  right: 1,
  bottom: 1
};
function maybeValidPosition(position) {
  const fakeElement = document.createElement('div');
  fakeElement.style.backgroundPosition = position;
  return '' !== fakeElement.style.backgroundPosition;
}
function parsePosition(position, {
  width,
  height
}) {
  var _parseFloat, _parseFloat2;
  const fakeElement = document.createElement('div');
  fakeElement.style.backgroundPosition = position;
  if ('' === fakeElement.style.backgroundPosition) {
    return position;
  }
  if (width) {
    fakeElement.style.width = `${width}px`;
  }
  if (height) {
    fakeElement.style.height = `${height}px`;
  }
  document.body.appendChild(fakeElement);
  const style = getComputedStyle(fakeElement);
  const x = style.backgroundPositionX;
  const y = style.backgroundPositionY;
  document.body.removeChild(fakeElement);
  let parsedX = null;
  let parsedY = null;
  if (x.endsWith('%')) {
    parsedX = parseFloat(x) / 100;
  } else if (x.endsWith('px')) {
    parsedX = parseFloat(y) / width;
  } else if (x in keywordValues) {
    parsedX = keywordValues[x];
  }
  if (y.endsWith('%')) {
    parsedY = parseFloat(y) / 100;
  } else if (y.endsWith('px')) {
    parsedY = parseFloat(y) / width;
  } else if (y in keywordValues) {
    parsedY = keywordValues[x];
  }
  return {
    x: (_parseFloat = parseFloat(Math.round(parsedX * 100) / 100)) !== null && _parseFloat !== void 0 ? _parseFloat : 0.5,
    y: (_parseFloat2 = parseFloat(Math.round(parsedY * 100) / 100)) !== null && _parseFloat2 !== void 0 ? _parseFloat2 : 0.5
  };
}
function findObjectByURL(obj, url) {
  const foundKey = Object.keys(obj).find(key => Object.values(obj[key]).some(subObj => subObj.url === url));
  return foundKey ? obj[foundKey] : null;
}
function getCleanUrl(url) {
  if (url.startsWith('url(')) {
    const imageUrlMatch = url.match(/url\((.*?)\)/);
    const match = imageUrlMatch ? imageUrlMatch[1] : '';
    return match.replace('"', '').replace("'", '');
  }
  return url;
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/image/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const image_editor_module = ({"control":"RkuufhTFNYbG1xE0tYx6","selectButton":"J3RGV0IZ4xfXWG6kWeR_","url":"PwPRx0HRp3H4P7BdHQKH","flex":"TxdFR4x5Rg92mOBMtHfg"});
;// CONCATENATED MODULE: ./src/inspector-controls/controls/image/ImageControl.jsx













const FALLBACK_IMAGE = getAbsoluteUrl('/wp-content/plugins/generateblocks-pro/dist/assets/placeholder-lg.min.jpg');
function ImageControl({
  onUrlChange,
  onPositionChange,
  onSizeChange,
  onMediaSelect,
  url,
  urlInputLabel,
  imageSizeLabel = (0,external_wp_i18n_namespaceObject.__)('Media Size', 'generateblocks-pro'),
  position = 'center',
  size = 'full'
}) {
  const ref = (0,external_wp_element_namespaceObject.useRef)(null);

  // State.
  const [previewCanvasSize, setPreviewCanvasSize] = (0,external_wp_element_namespaceObject.useState)({
    width: 240,
    height: 131
  });
  const [focalPoint, setFocalPoint] = (0,external_wp_element_namespaceObject.useState)(() => parsePosition(position, previewCanvasSize));
  const defaultPositionInputHelp = (0,external_wp_i18n_namespaceObject.__)('Enter any valid background position.', 'generateblocks-pro');
  const [positionInputHelp, setPositionInputHelp] = (0,external_wp_element_namespaceObject.useState)(defaultPositionInputHelp);
  const [positionInputValue, setPositionInputValue, debouncedPositionInputValue] = (0,external_wp_compose_namespaceObject.useDebouncedInput)(position);
  const [imageSizes, setImageSizes] = (0,external_wp_element_namespaceObject.useState)(() => {
    var _JSON$parse;
    return (_JSON$parse = JSON.parse(sessionStorage.getItem('gb_image_sizes'))) !== null && _JSON$parse !== void 0 ? _JSON$parse : {};
  });
  const [imageUrl, setImageUrl] = (0,external_wp_element_namespaceObject.useState)(() => getCleanUrl(url));
  const [isValidUrl, setIsValidUrl] = (0,external_wp_element_namespaceObject.useState)(true);
  const [imagePreviewUrl, setImagePreviewUrl] = (0,external_wp_element_namespaceObject.useState)(imageUrl);

  // Memos.
  const currentImageData = (0,external_wp_element_namespaceObject.useMemo)(() => {
    var _findObjectByURL;
    return (_findObjectByURL = findObjectByURL(imageSizes, imageUrl)) !== null && _findObjectByURL !== void 0 ? _findObjectByURL : {};
  }, [imageSizes, imageUrl]);
  const sizes = (0,external_wp_element_namespaceObject.useMemo)(() => {
    const options = Object.keys(currentImageData).map(imageSize => {
      return {
        label: imageSize.charAt(0).toUpperCase() + imageSize.slice(1),
        value: imageSize
      };
    });
    if (!options.length) {
      options.unshift({
        label: (0,external_wp_i18n_namespaceObject.__)('Full', 'generateblocks-pro'),
        value: ''
      });
    }
    return options;
  }, [currentImageData]);
  const currentImageSize = (0,external_wp_element_namespaceObject.useMemo)(() => {
    var _Object$entries$find$;
    if (!Object.keys(currentImageData).length) {
      return '';
    }
    return (_Object$entries$find$ = Object.entries(currentImageData).find(([, value]) => value.url === imageUrl)[0]) !== null && _Object$entries$find$ !== void 0 ? _Object$entries$find$ : '';
  }, [currentImageData, imageUrl]);

  // Functions
  const handlePickerUpdate = (0,external_wp_element_namespaceObject.useCallback)(function handlePickerUpdate(newFocalPoint) {
    const newX = Math.round(newFocalPoint.x * 100);
    const newY = Math.round(newFocalPoint.y * 100);
    const newPositionInputValue = `${newX}% ${newY}%`;
    setFocalPoint(newFocalPoint);
    setPositionInputValue(newPositionInputValue);
  }, [onPositionChange]);
  const handlePositionInputChange = (0,external_wp_element_namespaceObject.useCallback)(function handlePositionInputChange(newPosition) {
    const isValidPosition = maybeValidPosition(newPosition);
    setPositionInputValue(newPosition);
    if (isValidPosition) {
      setPositionInputHelp(defaultPositionInputHelp);
      setFocalPoint(parsePosition(newPosition, previewCanvasSize));
    } else {
      setPositionInputHelp((0,external_wp_i18n_namespaceObject.__)('Invalid background position.', 'generateblocks-pro'));
    }
  }, []);
  const handleUrlChange = (0,external_wp_element_namespaceObject.useCallback)(function handleUrlChange(newUrl) {
    if (onUrlChange) {
      onUrlChange(newUrl);
      setImagePreviewUrl(newUrl);
    }
    setIsValidUrl(true);
  }, [onUrlChange]);

  // Determine the size of the previewCanvas
  (0,external_wp_element_namespaceObject.useLayoutEffect)(() => {
    if (!ref.current) {
      return;
    }
    const previewCanvas = ref.current.querySelector('.components-focal-point-picker__media--image');
    function handleError() {
      if (!imageUrl.startsWith('var(') && imageUrl !== 'none') {
        setIsValidUrl(false);
      }
      setImagePreviewUrl(FALLBACK_IMAGE);
      previewCanvas.style.width = '240px';
      previewCanvas.style.height = '131px';
    }
    if (previewCanvas) {
      previewCanvas.addEventListener('error', handleError);
      const width = previewCanvas.clientWidth || 240;
      const height = previewCanvas.clientHeight || 131;
      setPreviewCanvasSize({
        width,
        height
      });
    }
    return () => {
      if (previewCanvas) {
        previewCanvas.removeEventListener('error', handleError);
      }
    };
  }, [imageUrl]);

  // Debouncing required here since this component doesn't use Control and has extra event handler props.
  esm_useUpdateEffect(() => {
    if (onPositionChange) {
      onPositionChange(positionInputValue);
    }
  }, [debouncedPositionInputValue]);
  return (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx('gb-image-control', image_editor_module.control),
    ref: ref
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: image_editor_module.flex
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    className: image_editor_module.url,
    type: 'text',
    value: imageUrl,
    onChange: handleUrlChange,
    label: urlInputLabel,
    help: !isValidUrl && (0,external_wp_i18n_namespaceObject.__)('Could not load image.', 'generateblocks-pro')
  }), (0,external_React_namespaceObject.createElement)(external_wp_blockEditor_namespaceObject.MediaUploadCheck, null, (0,external_React_namespaceObject.createElement)(external_wp_blockEditor_namespaceObject.MediaUpload, {
    title: (0,external_wp_i18n_namespaceObject.__)('Choose Media', 'generateblocks-pro'),
    onSelect: selectedMedia => {
      var _ref, _selectedMedia$sizes$;
      const newImageSizes = {
        ...imageSizes,
        [selectedMedia.id]: selectedMedia.sizes
      };
      sessionStorage.setItem('gb_image_sizes', JSON.stringify(newImageSizes));
      setImageSizes(newImageSizes);
      const newUrl = (_ref = (_selectedMedia$sizes$ = selectedMedia.sizes?.[size].url) !== null && _selectedMedia$sizes$ !== void 0 ? _selectedMedia$sizes$ : selectedMedia?.url) !== null && _ref !== void 0 ? _ref : '';
      handleUrlChange(newUrl);
      if (onMediaSelect) {
        onMediaSelect(selectedMedia);
      }
    },
    allowedTypes: ['image'],
    value: imageUrl,
    modalClass: "gb-image-control-modal",
    render: ({
      open
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Tooltip, {
      text: (0,external_wp_i18n_namespaceObject.__)('Open the Media Library', 'generateblocks-pro')
    }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
      variant: "secondary",
      onClick: () => {
        open();
      },
      className: image_editor_module.selectButton
    }, (0,external_wp_i18n_namespaceObject.__)('Select', 'generateblocks-pro'))))
  }))), imageUrl !== 'none' && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_blockEditor_namespaceObject.MediaUploadCheck, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    value: currentImageSize,
    options: sizes,
    disabled: !Object.keys(currentImageData).length,
    onChange: value => {
      var _currentImageData$val;
      const foundSize = (_currentImageData$val = currentImageData?.[value]) !== null && _currentImageData$val !== void 0 ? _currentImageData$val : null;

      // If a new size can be found, update the chosen URL automatically
      if (foundSize) {
        setImageUrl(currentImageData?.[value].url);
      }
      if (onSizeChange) {
        onSizeChange(value);
      }
    },
    label: imageSizeLabel,
    help: !!Object.keys(currentImageData).length ? (0,external_wp_i18n_namespaceObject.__)('Sets the size of the image chosen from the Media Library.', 'generateblocks-pro') : (0,external_wp_i18n_namespaceObject.__)('Size information is not available. Try re-inserting the image from the Media Library.', 'generateblocks-pro')
  })), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.FocalPointPicker, {
    url: imagePreviewUrl,
    value: focalPoint,
    onDragStart: handlePickerUpdate,
    onDrag: handlePickerUpdate,
    onChange: handlePickerUpdate
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Background Position",
    value: positionInputValue,
    help: positionInputHelp,
    onChange: handlePositionInputChange
  }))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/background/BackgroundControlOptions.jsx










const CSSBackgroundBlendModes = [{
  label: 'Default',
  value: ''
}, {
  label: 'Normal',
  value: 'normal'
}, {
  label: 'Multiply',
  value: 'multiply'
}, {
  label: 'Screen',
  value: 'screen'
}, {
  label: 'Overlay',
  value: 'overlay'
}, {
  label: 'Darken',
  value: 'darken'
}, {
  label: 'Lighten',
  value: 'lighten'
}, {
  label: 'Color-dodge',
  value: 'color-dodge'
}, {
  label: 'Color-burn',
  value: 'color-burn'
}, {
  label: 'Hard-light',
  value: 'hard-light'
}, {
  label: 'Soft-light',
  value: 'soft-light'
}, {
  label: 'Difference',
  value: 'difference'
}, {
  label: 'Exclusion',
  value: 'exclusion'
}, {
  label: 'Hue',
  value: 'hue'
}, {
  label: 'Saturation',
  value: 'saturation'
}, {
  label: 'Color',
  value: 'color'
}, {
  label: 'Luminosity',
  value: 'luminosity'
}];
const labels = {
  backgroundImage: 'Background Image',
  backgroundGradient: 'Gradient',
  backgroundSize: 'Size',
  backgroundRepeat: 'Repeat',
  backgroundPosition: 'Position',
  backgroundOrigin: 'Origin',
  backgroundClip: 'Clip',
  backgroundBlendMode: 'Blend Mode',
  backgroundAttachment: 'Attachment Type'
};
const typeDescriptions = {
  image: (0,external_wp_i18n_namespaceObject.__)('Choose a background image from the Media Library or enter a URL to a remote image.', 'generateblocks-pro'),
  gradient: (0,external_wp_i18n_namespaceObject.__)('Use this to create a linear or radial gradient. To overlay a gradient over another background, the gradient colors must be semi-transparent.', 'generateblocks-pro'),
  overlay: (0,external_wp_i18n_namespaceObject.__)('Use this to overlay a single color over one or more backgrounds. The chosen color must semi-transparent.', 'generateblocks-pro'),
  none: (0,external_wp_i18n_namespaceObject.__)('Disables the background for this at-rule (sets background: none', 'generateblocks-pro')
};
const defaultGradient = 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(10, 10, 10, 0.5) 100%)';
const defaultOverlayColor = 'rgba(0, 0, 0, .25)';
function BackgroundControlOptions({
  currentOption,
  findBackgroundIndex,
  setSettings
}) {
  const themeJsonGradients = (0,external_wp_blockEditor_namespaceObject.useSetting)('color.gradients') || [];
  const [selectingPreset, setSelectingPreset] = (0,external_wp_element_namespaceObject.useState)(false);
  const gradientPresets = [];
  if (themeJsonGradients.length) {
    gradientPresets.push({
      name: (0,external_wp_i18n_namespaceObject.__)('Theme.JSON Presets', 'generateblocks-pro'),
      gradients: themeJsonGradients
    });
  }
  const {
    styles,
    index
  } = findBackgroundIndex();
  const {
    type,
    backgroundImage = '',
    backgroundSize = '',
    backgroundRepeat = '',
    backgroundPosition = '',
    backgroundBlendMode = '',
    backgroundAttachment = '',
    overlayColor = ''
  } = currentOption;
  const [previousBackgroundImage, setPreviousBackgroundImage] = (0,external_wp_element_namespaceObject.useState)(() => {
    return {
      prevType: type,
      prevValue: backgroundImage
    };
  });
  const [gradient, setGradient] = (0,external_wp_element_namespaceObject.useState)(() => 'gradient' === type ? backgroundImage : defaultGradient);
  const [overlayPickerColor, setOverlayPickerColor] = (0,external_wp_element_namespaceObject.useState)(() => overlayColor || defaultOverlayColor);
  if ('gradient' === type && backgroundImage !== gradient) {
    styles[index].backgroundImage = gradient;
    setSettings(styles);
  }
  return currentOption && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Image', 'generateblocks-pro'),
      value: 'image'
    }, {
      label: (0,external_wp_i18n_namespaceObject.__)('Gradient', 'generateblocks-pro'),
      value: 'gradient'
    }, {
      label: (0,external_wp_i18n_namespaceObject.__)('Overlay', 'generateblocks-pro'),
      value: 'overlay'
    }, {
      label: (0,external_wp_i18n_namespaceObject.__)('None', 'generateblocks-pro'),
      value: 'none'
    }],
    label: (0,external_wp_i18n_namespaceObject.__)('Background Type', 'generateblocks-pro'),
    onChange: newType => {
      const currentBackgroundImage = styles[index].backgroundImage;
      const {
        prevType = '',
        prevValue = ''
      } = previousBackgroundImage;
      styles[index].type = newType;
      if (['overlay', 'gradient'].includes(newType)) {
        if ('overlay' === newType) {
          styles[index].overlayColor = overlayPickerColor;
          styles[index].backgroundImage = 'overlay' === prevType ? prevValue : `linear-gradient(to left, ${overlayPickerColor} 0%, ${overlayPickerColor} 100%)`;
        }
        if ('gradient' === newType) {
          styles[index].backgroundImage = 'gradient' === prevType ? prevValue : defaultGradient;
        }
      } else if ('image' === newType) {
        styles[index].backgroundImage = 'image' === prevType ? prevValue : '';
      } else if ('none' === newType) {
        styles[index].backgroundImage = 'none';
      }

      // Rebuild the CSS for the current option
      setPreviousBackgroundImage({
        prevType: type,
        prevValue: currentBackgroundImage
      });
      setSettings(styles);
    },
    dropdownChildren: ({
      onClose
    }) => {
      return (0,external_React_namespaceObject.createElement)(Control.Description, {
        label: (0,external_wp_i18n_namespaceObject.__)('About Background Types', 'generateblocks-pro'),
        onClick: onClose
      }, (0,external_React_namespaceObject.createElement)("dl", null, (0,external_React_namespaceObject.createElement)("dt", null, (0,external_wp_i18n_namespaceObject.__)('Image', 'generateblocks-pro'), " ", type === 'image' && (0,external_wp_i18n_namespaceObject.__)('(Current)', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)("dd", null, typeDescriptions.image), (0,external_React_namespaceObject.createElement)("dt", null, (0,external_wp_i18n_namespaceObject.__)('Gradient', 'generateblocks-pro'), " ", type === 'gradient' && (0,external_wp_i18n_namespaceObject.__)('(Current)', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)("dd", null, typeDescriptions.gradient), (0,external_React_namespaceObject.createElement)("dt", null, (0,external_wp_i18n_namespaceObject.__)('Overlay', 'generateblocks-pro'), " ", type === 'overlay' && (0,external_wp_i18n_namespaceObject.__)('(Current)', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)("dd", null, typeDescriptions.overlay)));
    },
    value: type
  }), 'overlay' === type && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_gb_components_namespaceObject.ColorPicker,
    label: (0,external_wp_i18n_namespaceObject.__)('Overlay Color', 'generateblocks-pro'),
    help: (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, !overlayPickerColor.includes('rgba') && !overlayPickerColor.includes('hsla') && (0,external_wp_i18n_namespaceObject.__)('The chosen color must have some transparency for the background(s) beneath to be visible.', 'generateblocks-pro')),
    value: overlayPickerColor,
    onChange: value => {
      styles[index].overlayColor = value;
      styles[index].backgroundImage = `linear-gradient(to left, ${value} 0%, ${value} 100%)`;
      setOverlayPickerColor(value);
      setSettings(styles);
    },
    dropdownChildren: ({
      onClose
    }) => {
      return (0,external_React_namespaceObject.createElement)(Control.Description, {
        label: (0,external_wp_i18n_namespaceObject.__)('About Background Overlay', 'generateblocks-pro'),
        onClick: onClose
      }, typeDescriptions.overlay);
    }
  }), 'image' === type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: ImageControl,
    label: labels.backgroundImage,
    url: backgroundImage,
    position: backgroundPosition,
    onUrlChange: value => {
      const isUrl = value.startsWith('http') || value.startsWith('://') || value.startsWith('/');
      styles[index].backgroundImage = isUrl ? `url(${value})` : value;
      setSettings(styles);
    },
    onPositionChange: value => {
      styles[index].backgroundPosition = value;
      setSettings(styles);
    },
    onSizeChange: value => {
      styles[index].media.selectedSize = value;
      setSettings(styles);
    },
    onMediaSelect: value => {
      var _value$sizes;
      styles[index].media.sizes = (_value$sizes = value.sizes) !== null && _value$sizes !== void 0 ? _value$sizes : {};
      setSettings(styles);
    },
    dropdownChildren: ({
      onClose
    }) => {
      return (0,external_React_namespaceObject.createElement)(Control.Description, {
        label: (0,external_wp_i18n_namespaceObject.__)('About Background Image', 'generateblocks-pro'),
        onClick: onClose
      }, typeDescriptions.image);
    }
  }), backgroundImage !== 'none' && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: labels.backgroundRepeat,
    value: backgroundRepeat,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'repeat',
      value: 'repeat'
    }, {
      label: 'repeat-x',
      value: 'repeat-x'
    }, {
      label: 'repeat-y',
      value: 'repeat-y'
    }, {
      label: 'round',
      value: 'round'
    }, {
      label: 'space',
      value: 'space'
    }, {
      label: 'no-repeat',
      value: 'no-repeat'
    }],
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(Control.Description, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Background Blend Mode', 'generateblocks-pro'),
      onClick: onClose
    }, (0,external_wp_i18n_namespaceObject.__)('The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.', 'generateblocks-pro')),
    onChange: (newValue = 0) => {
      styles[index].backgroundRepeat = newValue;
      setSettings(styles);
    },
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro')
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: labels.backgroundSize,
    value: backgroundSize,
    placeholder: (0,external_wp_i18n_namespaceObject.__)('100px 50%, cover, contain, etc', 'generateblocks-pro'),
    options: [{
      id: 1,
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      id: 2,
      label: 'cover',
      value: 'cover'
    }, {
      id: 3,
      label: 'contain',
      value: 'contain'
    }, {
      id: 4,
      label: 'auto',
      value: 'auto'
    }],
    onChange: value => {
      styles[index].backgroundSize = value;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: labels.backgroundAttachment,
    value: backgroundAttachment,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Fixed',
      value: 'fixed'
    }, {
      label: 'Scroll with Content (scroll)',
      value: 'scroll'
    }, {
      label: 'Local',
      value: 'local'
    }],
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(Control.Description, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Background Attachment', 'generateblocks-pro'),
      onClick: onClose
    }, (0,external_wp_i18n_namespaceObject.__)("The background-attachment CSS property sets whether a background image's position is fixed within the viewport, or scrolls with its containing block.", 'generateblocks-pro')),
    onChange: (newValue = 0) => {
      styles[index].backgroundAttachment = newValue;
      setSettings(styles);
    },
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro')
  }))), 'gradient' === type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: GradientPicker,
    selectingPreset: selectingPreset,
    setSelectingPreset: setSelectingPreset,
    presets: gradientPresets,
    label: labels.backgroundGradient,
    onChange: setGradient,
    value: backgroundImage.includes('gradient') ? backgroundImage : defaultGradient,
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control.Description, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Gradients', 'generateblocks-pro'),
      onClick: onClose
    }, typeDescriptions.gradient), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        onClose();
        setSelectingPreset(!selectingPreset);
      }
    }, selectingPreset ? (0,external_wp_i18n_namespaceObject.__)('Cancel select preset', 'generateblocks-pro') : (0,external_wp_i18n_namespaceObject.__)('Select preset', 'generateblocks-pro')))),
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about gradients.', 'generateblocks-pro'),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient"
  })), 'none' !== backgroundImage && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: labels.backgroundBlendMode,
    value: backgroundBlendMode,
    options: CSSBackgroundBlendModes,
    onChange: (newValue = 0) => {
      styles[index].backgroundBlendMode = newValue;
      setSettings(styles);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(Control.Description, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Background Blend Mode', 'generateblocks-pro'),
      onClick: onClose
    }, (0,external_wp_i18n_namespaceObject.__)("The background-blend-mode CSS property sets how an element's background images should blend with each other and with the element's background color.", 'generateblocks-pro')),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro')
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/background/BackgroundControl.jsx










function getSettings(value) {
  const {
    background = '',
    backgroundBlendMode = '',
    backgroundAttachment = '',
    backgroundImage = '',
    backgroundPosition = '',
    backgroundSize = '',
    backgroundRepeat = ''
  } = value;
  if (Object.values(value).every(val => val === '')) {
    return [];
  }
  if (background) {
    const blendModeList = backgroundBlendMode.split(',');
    return parseBackground(background).map((setting, i) => {
      setting.backgroundBlendMode = blendModeList[i] || 'normal';
      if (setting.type === 'image') {
        setting.media = {
          id: 0
        };
      }
      return setting;
    });
  }
  return parseBackgroundProperties({
    backgroundBlendMode,
    backgroundAttachment,
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat
  });
}
const BackgroundControl = ({
  onStyleChange,
  value,
  atRule
}) => {
  var _backgroundSettings$n;
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [backgroundSettings, setBackgroundSettings] = (0,external_wp_element_namespaceObject.useState)(() => getSettings(value));
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const isDisabled = backgroundSettings.some(setting => setting.backgroundImage === 'none');
  const currentSetting = (_backgroundSettings$n = backgroundSettings[nextEditIndex]) !== null && _backgroundSettings$n !== void 0 ? _backgroundSettings$n : null;
  const isEditing = null !== currentSetting;

  // Functions.
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setBackgroundSettings(settings);

    // Update CSS.
    const backgroundBlendModeCSS = settings.reduce((acc, cur) => {
      const {
        backgroundBlendMode: css = 'normal'
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '').trim();
    const backgroundAttachmentCSS = settings.reduce((acc, cur) => {
      const {
        backgroundAttachment: css = ''
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '');
    const backgroundImageCSS = settings.reduce((acc, cur) => {
      const {
        backgroundImage: css = ''
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '');
    const backgroundSizeCSS = settings.reduce((acc, cur) => {
      const {
        backgroundSize: css = ''
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '');
    const backgroundRepeatCSS = settings.reduce((acc, cur) => {
      const {
        backgroundRepeat: css = ''
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '');
    const backgroundPositionCSS = settings.reduce((acc, cur) => {
      const {
        backgroundPosition: css = ''
      } = cur;
      return acc.length > 0 ? `${acc},${css.trim()}` : `${css.trim()}`;
    }, '');
    debouncedOnStyleChange([{
      property: 'backgroundAttachment',
      value: backgroundAttachmentCSS
    }, {
      property: 'backgroundImage',
      value: backgroundImageCSS
    }, {
      property: 'backgroundSize',
      value: backgroundSizeCSS
    }, {
      property: 'backgroundRepeat',
      value: backgroundRepeatCSS
    }, {
      property: 'backgroundPosition',
      value: backgroundPositionCSS
    }, {
      property: 'backgroundBlendMode',
      value: backgroundBlendModeCSS
    }]);
  }, [debouncedOnStyleChange]);
  const findBackgroundIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...backgroundSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [backgroundSettings, nextEditIndex]);
  function BackgroundListItem({
    item,
    index: listItemIndex
  }) {
    const css = getPreviewCSS(item);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Empty', 'generateblocks-pro');
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      label: item.label,
      css: cssText,
      canDuplicate: css.length > 0,
      onDuplicate: () => {
        const newSettings = [...backgroundSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findBackgroundIndex();
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(EffectControl, {
    id: "BackgroundControl",
    items: backgroundSettings,
    label: (0,external_wp_i18n_namespaceObject.__)('Backgrounds', 'generateblocks-pro'),
    isEditing: isEditing,
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      setNextEditIndex(null);
    },
    showAdd: !isDisabled,
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all background styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all background styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: backgroundSettings,
      onDelete: () => {
        updateCSS([]);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about Backgrounds', 'generateblocks-pro'),
      learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
      onClose: onClose
    })),
    onAdd: () => {
      const hasImage = backgroundSettings.some(style => 'image' === style.type);
      setNextEditIndex(0);
      updateCSS([hasImage ? getDefaultBackgroundOverlay() : getDefaultBackground(atRule), ...backgroundSettings]);
    },
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about Backgrounds', 'generateblocks-pro'),
    learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
    help: isDisabled && (0,external_wp_i18n_namespaceObject.__)('Remove the disabled background to enable.', 'generateblocks-pro'),
    searchKeywords: ['image', 'gradient', 'blend mode', 'bg'],
    cssProp: value
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.control
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: background_editor_module.wrapper
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: backgroundSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Background', 'generateblocks-pro'),
    setItems: reorderedSettings => {
      updateCSS(reorderedSettings);
    },
    itemComponent: BackgroundListItem,
    dragHandle: true
  })), isEditing && (0,external_React_namespaceObject.createElement)(BackgroundControlOptions, {
    isEditing: isEditing,
    currentOption: currentSetting,
    findBackgroundIndex: findBackgroundIndex,
    setSettings: updateCSS
  })))));
};
;// CONCATENATED MODULE: ./src/inspector-controls/panels/backgrounds/BackgroundsPanel.jsx








function BackgroundsPanel(props) {
  const {
    styles,
    onStyleChange,
    nestedRule,
    atRule,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    background = '',
    backgroundColor = '',
    backgroundClip = '',
    backgroundOrigin = '',
    backgroundBlendMode = '',
    backgroundAttachment = '',
    backgroundImage = '',
    backgroundPosition = '',
    backgroundSize = '',
    backgroundRepeat = ''
  } = styles;
  const backgroundValue = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return {
      background,
      backgroundBlendMode,
      backgroundAttachment,
      backgroundImage,
      backgroundPosition,
      backgroundSize,
      backgroundRepeat
    };
  }, [background, backgroundBlendMode, backgroundAttachment, backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Backgrounds', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(BackgroundsIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(BackgroundControl, {
    value: backgroundValue,
    onStyleChange: onStyleChange,
    nestedRule: nestedRule,
    atRule: atRule
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_gb_components_namespaceObject.ColorPicker,
    label: "Background Color",
    value: backgroundColor,
    cssProp: "backgroundColor",
    onChange: value => onStyleChange('backgroundColor', value),
    searchKeywords: ['bg']
  }), (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Background Clip",
    value: backgroundClip,
    cssProp: "backgroundClip",
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'border-box',
      value: 'border-box'
    }, {
      label: 'padding-box',
      value: 'padding-box'
    }, {
      label: 'content-box',
      value: 'content-box'
    }, {
      label: 'text',
      value: 'text'
    }],
    onChange: value => onStyleChange('backgroundClip', value),
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property', 'generateblocks-pro'),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip",
    dropdownChildren: () => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Background Clip', 'generateblocks-pro')
    }, (0,external_React_namespaceObject.createElement)("p", {
      style: {
        padding: '0 8px'
      }
    }, (0,external_wp_i18n_namespaceObject.__)('This property only will apply if a background color or image is set, or if the element has a border with transparency.', 'generateblocks-pro')))
  }), (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Background Origin",
    value: backgroundOrigin,
    cssProp: "backgroundOrigin",
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'border-box',
      value: 'border-box'
    }, {
      label: 'padding-box',
      value: 'padding-box'
    }, {
      label: 'content-box',
      value: 'content-box'
    }],
    onChange: value => onStyleChange('backgroundOrigin', value),
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property', 'generateblocks-pro'),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin",
    dropdownChildren: () => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('About Background Origin', 'generateblocks-pro')
    }, (0,external_React_namespaceObject.createElement)("p", {
      style: {
        padding: '0 8px'
      }
    }, (0,external_wp_i18n_namespaceObject.__)("This property property sets the background's origin: from the border start, inside the border, or inside the padding.", 'generateblocks-pro')))
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/position/PositionPanel.jsx







function PositionPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    position = '',
    overflowX = '',
    overflowY = '',
    zIndex = '',
    top = '',
    right = '',
    bottom = '',
    left = ''
  } = styles;
  const overflowOptions = [{
    label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
    value: ''
  }, {
    label: 'visible',
    value: 'visible'
  }, {
    label: 'hidden',
    value: 'hidden'
  }, {
    label: 'clip',
    value: 'clip'
  }, {
    label: 'scroll',
    value: 'scroll'
  }, {
    label: 'auto',
    value: 'auto'
  }];
  const positionProps = (0,external_wp_element_namespaceObject.useMemo)(() => {
    return {
      Top: {
        prop: 'top',
        value: top
      },
      Left: {
        prop: 'left',
        value: left
      },
      Bottom: {
        prop: 'bottom',
        value: bottom
      },
      Right: {
        prop: 'right',
        value: right
      }
    };
  }, [top, right, bottom, left]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Position', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(PositionIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: 'position',
    value: position,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Relative',
      value: 'relative'
    }, {
      label: 'Absolute',
      value: 'absolute'
    }, {
      label: 'Sticky',
      value: 'sticky'
    }, {
      label: 'Fixed',
      value: 'fixed'
    }],
    onChange: value => onStyleChange('position', value),
    cssProp: "position"
  }), (0,external_React_namespaceObject.createElement)(DimensionsControl, {
    id: "direction",
    cssProps: positionProps,
    onChange: values => Object.keys(values).forEach(property => onStyleChange(property, values[property])),
    syncTypes: ['all'],
    label: 'Inset'
  }), (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Overflow-X",
    value: overflowX,
    options: overflowOptions,
    onChange: value => onStyleChange('overflowX', value),
    cssProp: "overflowX"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Overflow-Y",
    value: overflowY,
    options: overflowOptions,
    onChange: value => onStyleChange('overflowY', value),
    cssProp: "overflowY"
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "z-index",
    value: zIndex,
    cssProp: "zIndex",
    onChange: value => {
      onStyleChange('zIndex', value);
      if (!position) {
        onStyleChange('position', 'relative');
      }
    }
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/effects/Opacity.jsx



function Opacity({
  opacity,
  onStyleChange
}) {
  let value = parseFloat(opacity) * 100;
  const isInteger = Number.isInteger(value);
  if (isNaN(value)) {
    value = opacity;
  }
  return (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.RangeControl,
    label: "Opacity",
    hasCustomValue: !isInteger && opacity !== '',
    value: value,
    step: 1,
    cssProp: "opacity",
    onChange: newOpacity => {
      let newValue = parseFloat(newOpacity) / 100;

      /**
       * If value wasn't a number (ex: a CSS variable or other string),
       * use that directly.
       */
      if (isNaN(newValue)) {
        newValue = newOpacity;
      }
      onStyleChange('opacity', newValue);
    },
    min: 0,
    max: 100,
    allowCustomValue: true
  });
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/box-shadow/utils.js
// Remove -webkit-box-shadow and -moz-box-shadow vendor prefixes.
const removeVendorBoxShadows = shadowString => {
  return shadowString.replace(/-webkit-box-shadow:[^;]+;|-moz-box-shadow:[^;]+;/g, '');
};

// Clean up the box shadow string before parsing.
const cleanString = inputString => {
  const step1 = inputString.replace(/box-shadow/g, '');
  const step2 = step1.replace(/webkit/g, '');
  const step3 = step2.replace(/\r?\n|\r/g, '');
  const step4 = step3.replace(/;/g, '');
  const step5 = step4.replace(/:/g, '');
  return step5.trim();
};
const buildBoxShadowCSS = (settings = []) => {
  return settings.reduce((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }
    const {
      offsetX = '',
      offsetY = '',
      blur = '',
      spread = '',
      color = '',
      inset = false
    } = cur;
    const boxShadow = `${inset ? 'inset' : ''} ${offsetX} ${offsetY} ${blur} ${spread} ${color}`.trim();

    // Return nothing if the background is empty
    if (!boxShadow.trim().length) {
      return acc;
    }
    return acc.length > 0 ? `${acc}, ${boxShadow}` : `${boxShadow}`;
  }, '').replace(/,$/, '').trim();
};
function cssBoxShadowParser() {
  const VALUES_REG = /,(?![^\(]*\))/;
  const PARTS_REG = /\s(?![^(]*\))/;
  const LENGTH_REG = /^[0-9]+[a-zA-Z%]+$/;
  const parseValue = str => {
    const parts = str.split(PARTS_REG);
    const inset = parts.includes('inset');
    const last = parts.slice(-1)[0];
    const color = !isLength(last) ? last : undefined;
    const values = parts.filter(n => n !== 'inset').filter(n => n !== color);
    const [offsetX, offsetY, blur, spread] = values;
    return {
      inset,
      offsetX,
      offsetY,
      blur,
      spread,
      color
    };
  };
  const stringifyValue = obj => {
    const {
      inset,
      offsetX = 0,
      offsetY = 0,
      blur = 0,
      spread,
      color
    } = obj || {};
    return [inset ? 'inset' : null, offsetX, offsetY, blur, spread, color].filter(v => v !== null && v !== undefined).map(s => ('' + s).trim()).join(' ');
  };
  const isLength = v => LENGTH_REG.test(v);
  const parse = str => str ? str.split(VALUES_REG).map(s => s.trim()).map(parseValue) : [];
  const stringify = arr => arr?.length ? arr.map(stringifyValue).join(', ') : '';
  return {
    parse,
    stringify
  };
}
const cssBoxShadow = cssBoxShadowParser();
function getDefaultBoxShadow() {
  return {
    offsetX: '10px',
    offsetY: '10px',
    blur: '5px',
    spread: '7px',
    color: 'rgba(0,0,0,0.1)',
    inset: false
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/box-shadow/BoxShadowControlOptions.jsx






const units = ['px', 'em', 'rem', 'vw', 'vh', 'ch'];
function BoxShadowControlOptions({
  findBoxShadowIndex,
  setSettings,
  currentOption = null
}) {
  const {
    styles,
    index
  } = findBoxShadowIndex();
  return currentOption && (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.CheckboxControl, {
    checked: currentOption.inset,
    label: "Inset",
    onChange: newValue => {
      styles[index].inset = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_gb_components_namespaceObject.ColorPicker,
    value: currentOption?.color || 'rgba(0,0,0,.1)',
    tooltip: "Box Shadow Color",
    onChange: newValue => {
      styles[index].color = newValue;
      setSettings(styles);
    }
  })), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "x-Offset",
    units: units,
    value: currentOption.offsetX,
    onChange: newValue => {
      styles[index].offsetX = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "y-Offset",
    units: units,
    value: currentOption.offsetY,
    onChange: newValue => {
      styles[index].offsetY = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "blur",
    units: units,
    value: currentOption?.blur,
    onChange: newValue => {
      styles[index].blur = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "spread",
    units: units,
    value: currentOption?.spread,
    onChange: newValue => {
      styles[index].spread = newValue;
      setSettings(styles);
    }
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/box-shadow/BoxShadowControl.jsx








function BoxShadowControl({
  onStyleChange,
  value
}) {
  var _boxShadowSettings$ne;
  const [showPasteStyles, setShowPasteStyles] = (0,external_wp_element_namespaceObject.useState)(false);
  const [pasteModalErrorMessage, setPasteModalErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [boxShadowSettings, setBoxShadowSettings] = (0,external_wp_element_namespaceObject.useState)(() => cssBoxShadow.parse(value));
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const currentSetting = (_boxShadowSettings$ne = boxShadowSettings[nextEditIndex]) !== null && _boxShadowSettings$ne !== void 0 ? _boxShadowSettings$ne : null;
  const isEditing = currentSetting !== null;

  // Functions.
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setBoxShadowSettings(settings);

    // Update CSS.
    debouncedOnStyleChange('boxShadow', buildBoxShadowCSS(settings));
  }, [debouncedOnStyleChange]);
  const findBoxShadowIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...boxShadowSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [boxShadowSettings, nextEditIndex]);
  function BoxShadowListItem({
    item,
    index: listItemIndex
  }) {
    const css = buildBoxShadowCSS([item]);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Invalid box shadow', 'generateblocks-pro');
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      css: cssText,
      swatchColor: item.color,
      canDuplicate: css.length > 0,
      onDuplicate: () => {
        const newSettings = [...boxShadowSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findBoxShadowIndex();
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(EffectControl, {
    items: boxShadowSettings,
    label: "Box Shadow",
    searchKeywords: ['shadows', 'box-shadow'],
    cssProp: "boxShadow",
    onAdd: () => {
      const newSettings = [...boxShadowSettings, getDefaultBoxShadow()];
      setNextEditIndex(newSettings.length - 1);
      updateCSS(newSettings);
    },
    isEditing: isEditing,
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      setNextEditIndex(null);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, !confirmDelete && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        setShowPasteStyles(true);
        onClose();
      }
    }, (0,external_wp_i18n_namespaceObject.__)('Add via paste…', 'generateblocks-pro'))), (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all box shadow styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all box shadow styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: boxShadowSettings,
      onDelete: newSettings => {
        updateCSS(newSettings);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Box Shadows', 'generateblocks-pro'),
      learnMoreURL: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow',
      onClose: onClose
    }))
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-box-shadow"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-box-shadow__wrapper"
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: boxShadowSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Box Shadow', 'generateblocks-pro'),
    setItems: reorderedSettings => {
      updateCSS(reorderedSettings);
    },
    itemComponent: BoxShadowListItem,
    dragHandle: true
  })), (0,external_React_namespaceObject.createElement)(BoxShadowControlOptions, {
    isEditing: isEditing,
    currentOption: currentSetting,
    findBoxShadowIndex: findBoxShadowIndex,
    setSettings: updateCSS
  }))), (0,external_React_namespaceObject.createElement)(EffectControl.PasteModal, {
    property: "box-shadow",
    errorMessage: pasteModalErrorMessage,
    showPasteStyles: showPasteStyles,
    setShowPasteStyles: setShowPasteStyles,
    onAddStyles: ({
      pastedValue,
      replaceStyles
    }) => {
      if (!pastedValue || pastedValue.length === 0) {
        return false;
      }
      try {
        const pastedSettings = cssBoxShadow.parse(cleanString(removeVendorBoxShadows(pastedValue)));
        const newSettings = replaceStyles ? [...pastedSettings] : [...boxShadowSettings, ...pastedSettings];
        updateCSS(newSettings);
        setShowPasteStyles(false);
        setPasteModalErrorMessage('');
        return true;
      } catch (e) {
        setPasteModalErrorMessage((0,external_wp_i18n_namespaceObject.__)('Error parsing pasted styles. Please check your CSS and try again.', 'generateblocks-pro'));
        return false;
      }
    }
  })));
}
// EXTERNAL MODULE: ./node_modules/known-css-properties/index.js
var known_css_properties = __nested_webpack_require_290554__(9456);
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transition/utils.js

function parseTransition(transitionString) {
  if (!transitionString) {
    return [];
  }
  const transitionArray = transitionString.split(',');
  return transitionArray.map(transition => {
    const fakeElement = document.createElement('div');
    fakeElement.style.transition = transition;
    if (fakeElement.style.transition === '') {
      return false;
    }
    const {
      transitionProperty = '',
      transitionDuration = '',
      transitionTimingFunction = '',
      transitionDelay = ''
    } = fakeElement.style;
    return {
      transitionProperty,
      transitionDuration,
      transitionTimingFunction,
      transitionDelay
    };
  }).filter(Boolean);
}

// Clean up the transition string before parsing.
const utils_cleanString = inputString => {
  const step1 = inputString.replace(/transition/g, '');
  const step2 = step1.replace(/webkit/g, '');
  const step3 = step2.replace(/\r?\n|\r/g, '');
  const step4 = step3.replace(/;/g, '');
  const step5 = step4.replace(/:/g, '');
  return step5.trim();
};
const buildTransitionCSS = (settings = []) => {
  return settings.reduce((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }
    const {
      transitionProperty,
      transitionDuration,
      transitionDelay,
      transitionTimingFunction
    } = cur;
    const transition = `${transitionProperty} ${transitionDuration} ${transitionTimingFunction} ${transitionDelay}`.trim();

    // Return nothing if the transition is empty.
    if (!transition.length) {
      return acc;
    }
    return acc.length > 0 ? `${acc}, ${transition}` : `${transition}`;
  }, '').replace(/,$/, '').trim();
};
const validateTimingFunction = (input = '') => {
  const cubicBezierRegex = /^cubic-bezier\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)\)$/;
  const stepsRegex = /^steps\(([^,]+),\s*(.+)\)$/;
  const cubicBezierMatch = input.match(cubicBezierRegex);
  if (cubicBezierMatch) {
    const [, p1,, p3] = cubicBezierMatch;
    if (p1 < 0 || p1 > 1 || p3 < 0 || p3 > 1) {
      return [false, (0,external_wp_i18n_namespaceObject.__)('Invalid cubic-bezier definition.', 'generateblocks-pro')];
    }
    return [true, ''];
  }
  const stepsMatch = input.match(stepsRegex);
  if (stepsMatch) {
    const [, countStr, keyword] = stepsMatch;
    const count = parseInt(countStr, 10);
    const validKeywords = ['jump-start', 'jump-end', 'jump-none', 'jump-both', 'start', 'end'];
    if (isNaN(count) || count < 1 || !validKeywords.includes(keyword)) {
      return [false, (0,external_wp_i18n_namespaceObject.__)('Invalid steps definition.', 'generateblocks-pro')];
    }
    return [true, ''];
  }

  // Skip CSS variables and assume valid value.
  if (input.startsWith('var(--')) {
    return [true, ''];
  }
  const keywords = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'initial', 'inherit'];
  if (keywords.includes(input)) {
    return [true, ''];
  }
  return [false, (0,external_wp_i18n_namespaceObject.__)('Unknown timing function.', 'generateblocks-pro')];
};
function getDefaultTransition() {
  return {
    transitionProperty: 'all',
    transitionDuration: '0.5s',
    transitionDelay: '0s',
    transitionTimingFunction: 'ease'
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transition/TransitionControlOptions.jsx








const TransitionControlOptions_units = ['s'];
function TransitionControlOptions({
  currentOption,
  findTransitionIndex,
  setSettings,
  cssPropertyError,
  cssTimingError
}) {
  const {
    styles,
    index
  } = findTransitionIndex();
  if (currentOption) {
    var _currentOption$transi;
    let update = false;

    // Validate the current transition property.
    if (!known_css_properties.all.includes((_currentOption$transi = currentOption.transitionProperty) !== null && _currentOption$transi !== void 0 ? _currentOption$transi : '')) {
      styles[index].transitionProperty = 'all';
      update = true;
    }

    // Validate the current timing function.
    if (!validateTimingFunction(currentOption.transitionTimingFunction)) {
      styles[index].transitionTimingFunction = 'ease';
      update = true;
    }

    // Only call setSettings if an update was made above.
    if (update) {
      setSettings(styles);
    }
  }
  return currentOption && (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Duration",
    units: TransitionControlOptions_units,
    value: currentOption.transitionDuration,
    defaultUnitValue: "s",
    onChange: newValue => {
      styles[index].transitionDuration = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: "Delay",
    units: TransitionControlOptions_units,
    value: currentOption.transitionDelay,
    defaultUnitValue: "s",
    onChange: newValue => {
      styles[index].transitionDelay = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Transition Property",
    value: currentOption.transitionProperty,
    onChange: newValue => {
      styles[index].transitionProperty = newValue;
      setSettings(styles);
    },
    help: cssPropertyError,
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: "Timing Function",
    value: currentOption.transitionTimingFunction,
    options: [{
      label: 'Ease',
      value: 'ease'
    }, {
      label: 'Linear',
      value: 'linear'
    }, {
      label: 'Ease-in',
      value: 'ease-in'
    }, {
      label: 'Ease-out',
      value: 'ease-out'
    }, {
      label: 'Ease-in-out',
      value: 'ease-in-out'
    }, {
      label: 'Step-start',
      value: 'step-start'
    }, {
      label: 'Step-end',
      value: 'step-end'
    }, {
      label: 'Initial',
      value: 'initial'
    }, {
      label: 'Inherit',
      value: 'inherit'
    }],
    help: cssTimingError,
    customValueHelp: cssTimingError || (0,external_wp_i18n_namespaceObject.__)('Enter any valid CSS timing function.', 'generateblocks-pro'),
    onChange: newType => {
      styles[index].transitionTimingFunction = newType;
      setSettings(styles);
    }
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transition/TransitionControl.jsx









function TransitionControl({
  onStyleChange,
  value
}) {
  var _transitionSettings$n;
  const [showPasteStyles, setShowPasteStyles] = (0,external_wp_element_namespaceObject.useState)(false);
  const [pasteModalErrorMessage, setPasteModalErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [transitionSettings, setTransitionSettings] = (0,external_wp_element_namespaceObject.useState)(() => parseTransition(value));
  const [cssPropertyError, setCssPropertyError] = (0,external_wp_element_namespaceObject.useState)(null);
  const [cssTimingError, setCssTimingError] = (0,external_wp_element_namespaceObject.useState)(null);
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const currentSetting = (_transitionSettings$n = transitionSettings[nextEditIndex]) !== null && _transitionSettings$n !== void 0 ? _transitionSettings$n : null;
  const isEditing = null !== currentSetting;

  // Functions
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setTransitionSettings(settings);

    // Update CSS.
    debouncedOnStyleChange('transition', buildTransitionCSS(transitionSettings));
  }, [debouncedOnStyleChange]);
  const findTransitionIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...transitionSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [transitionSettings, nextEditIndex]);
  function TransitionListItem({
    item,
    index: listItemIndex
  }) {
    const css = buildTransitionCSS([item]);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Invalid transition', 'generateblocks-pro');
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      css: cssText,
      swatchColor: item.color,
      onDuplicate: () => {
        const newSettings = [...transitionSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findTransitionIndex();
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(EffectControl, {
    items: transitionSettings,
    label: "Transition",
    cssProp: "transition",
    searchKeywords: ['tween', 'timing', 'duration', 'delay', 'timing-function'],
    onAdd: () => {
      const newSettings = [...transitionSettings, getDefaultTransition()];
      setNextEditIndex(newSettings.length - 1);
      updateCSS(newSettings);
    },
    isEditing: isEditing,
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      const validateTimingFn = validateTimingFunction(currentSetting.transitionTimingFunction);
      let flag = false;
      setCssPropertyError(null);
      setCssTimingError(null);
      if (!known_css_properties.all.includes(currentSetting.transitionProperty)) {
        setCssPropertyError((0,external_wp_i18n_namespaceObject.__)('Please enter a valid CSS property!', 'generateblocks-pro'));
        flag = true;
      }
      if (!validateTimingFn[0]) {
        setCssTimingError(validateTimingFn[1]);
        flag = true;
      }
      if (!flag) {
        setCssPropertyError(null);
        setCssTimingError(null);
      }
      setNextEditIndex(null);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, !confirmDelete && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        setShowPasteStyles(true);
        onClose();
      }
    }, (0,external_wp_i18n_namespaceObject.__)('Paste in transition styles', 'generateblocks-pro'))), (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all transition styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all transition styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: transitionSettings,
      onDelete: newSettings => {
        updateCSS(newSettings);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Transitions', 'generateblocks-pro'),
      learnMoreURL: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition',
      onClose: onClose
    }))
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-transition"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-transition__wrapper"
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: transitionSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Transition', 'generateblocks-pro'),
    setItems: reorderedSettings => {
      updateCSS(reorderedSettings);
    },
    itemComponent: TransitionListItem,
    dragHandle: true
  })), (0,external_React_namespaceObject.createElement)(TransitionControlOptions, {
    currentOption: currentSetting,
    findTransitionIndex: findTransitionIndex,
    setSettings: updateCSS,
    cssPropertyError: cssPropertyError,
    cssTimingError: cssTimingError
  }))), (0,external_React_namespaceObject.createElement)(EffectControl.PasteModal, {
    property: "transition",
    errorMessage: pasteModalErrorMessage,
    showPasteStyles: showPasteStyles,
    setShowPasteStyles: setShowPasteStyles,
    onAddStyles: ({
      pastedValue,
      replaceStyles
    }) => {
      if (!pastedValue || pastedValue.length === 0) {
        return false;
      }
      try {
        const pastedTransitions = parseTransition(utils_cleanString(pastedValue));
        const formattedPastedTransitions = pastedTransitions.map(transition => {
          const {
            transitionProperty,
            transitionDuration,
            transitionDelay,
            transitionTimingFunction
          } = transition;
          return {
            transitionProperty,
            transitionDuration,
            transitionDelay,
            transitionTimingFunction
          };
        });
        const newSettings = replaceStyles ? [...formattedPastedTransitions] : [...transitionSettings, ...formattedPastedTransitions];
        updateCSS(newSettings);
        setShowPasteStyles(false);
        setPasteModalErrorMessage('');
        return true;
      } catch (e) {
        setPasteModalErrorMessage((0,external_wp_i18n_namespaceObject.__)('Error parsing pasted styles. Please check your CSS and try again.', 'generateblocks-pro'));
        console.error(e); // eslint-disable-line
        return false;
      }
    }
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/filter/utils.js
function buildFilterCSS(settings = []) {
  return settings.reduce((acc, cur) => {
    if (cur?.hidden) {
      return acc;
    }
    const {
      type,
      value,
      dropShadow: {
        xOffset = '',
        yOffset = '',
        blur = '',
        color = ''
      } = {}
    } = cur;
    let filter = `${type}(${value})`;
    if ('drop-shadow' === type) {
      filter = `${type}(${xOffset} ${yOffset} ${blur} ${color})`;
    }
    return acc.length > 0 ? `${acc} ${filter}` : `${filter}`;
  }, '').trim();
}
function parseFilter(filterString) {
  const regex = /\b(blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|opacity|saturate|sepia)\(([^)]+)\)/g;
  const matches = filterString.match(regex);
  const validFilters = [];
  if (matches) {
    matches.forEach(match => {
      const filterName = match.split('(')[0];
      const value = match.match(/\(([^)]+)\)/)[1];
      if ('drop-shadow' === filterName) {
        const dropShadowValues = parseFilterDropShadow(value);
        if (dropShadowValues) {
          validFilters.push({
            type: 'drop-shadow',
            dropShadow: dropShadowValues
          });
        }
      } else if (validateFilter(match)) {
        validFilters.push({
          type: filterName,
          value,
          dropShadow: {}
        });
      }
    });

    // Remove duplicates by converting it to a Set and then back to an array
    return Array.from(new Set(validFilters.map(JSON.stringify))).map(JSON.parse);
  }
  return [];
}
function parseFilterDropShadow(valueString) {
  const parts = valueString.split(' ').filter(Boolean);
  if (parts.length !== 4) {
    return null;
  }
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  let color = parts.pop(); // The last part is expected to be the color

  // If the color is not a valid hex color, use default '#cccccc'
  if (!hexColorRegex.test(color)) {
    color = '#cccccc';
  }
  return {
    xOffset: parts[0],
    yOffset: parts[1],
    blur: parts[2],
    color
  };
}
function validateFilter(filter) {
  const fakeElement = document.createElement('div');
  fakeElement.style.filter = filter;
  return '' !== fakeElement.style.filter;
}
function getDefaultFilter() {
  return {
    type: 'blur',
    value: '5px',
    dropShadow: {
      xOffset: '10px',
      yOffset: '10px',
      blur: '5px',
      color: '#cccccc'
    }
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/filter/FilterControlOptions.jsx









const filterUnits = {
  blur: ['px'],
  brightness: ['%'],
  contrast: ['%'],
  'drop-shadow': ['px', 'em', 'rem', 'vw', 'vh', 'ch'],
  grayscale: ['%'],
  'hue-rotate': ['deg'],
  invert: ['%'],
  opacity: ['%'],
  saturate: ['%'],
  sepia: ['%']
};
const defaultValues = {
  blur: '5px',
  brightness: '100%',
  contrast: '100%',
  'drop-shadow': {
    xOffset: '10px',
    yOffset: '10px',
    blur: '5px',
    color: '#cccccc'
  },
  grayscale: '100%',
  'hue-rotate': '0deg',
  invert: '100%',
  opacity: '100%',
  saturate: '100%',
  sepia: '100%'
};
const FilterControlOptions_labels = {
  blur: 'Blur',
  brightness: 'Brightness',
  contrast: 'Contrast',
  'drop-shadow': 'Drop Shadow',
  grayscale: 'Grayscale',
  'hue-rotate': 'Hue Rotate',
  invert: 'Invert',
  opacity: 'Opacity',
  saturate: 'Saturate',
  sepia: 'Sepia'
};
function FilterControlOptions({
  findFilterIndex,
  setSettings,
  transitionSettings,
  onStyleChange,
  currentOption = null
}) {
  const {
    styles,
    index
  } = findFilterIndex();
  const showAddTransition = !transitionSettings.some(setting => {
    return ['all', 'filter'].includes(setting.transitionProperty);
  });
  return currentOption && (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    label: (0,external_wp_i18n_namespaceObject.__)('Filter type', 'generateblocks-pro'),
    value: currentOption.type,
    options: [{
      label: FilterControlOptions_labels.blur,
      value: 'blur'
    }, {
      label: FilterControlOptions_labels.brightness,
      value: 'brightness'
    }, {
      label: FilterControlOptions_labels.contrast,
      value: 'contrast'
    }, {
      label: FilterControlOptions_labels['drop-shadow'],
      value: 'drop-shadow'
    }, {
      label: FilterControlOptions_labels.grayscale,
      value: 'grayscale'
    }, {
      label: FilterControlOptions_labels['hue-rotate'],
      value: 'hue-rotate'
    }, {
      label: FilterControlOptions_labels.invert,
      value: 'invert'
    }, {
      label: FilterControlOptions_labels.opacity,
      value: 'opacity'
    }, {
      label: FilterControlOptions_labels.saturate,
      value: 'saturate'
    }, {
      label: FilterControlOptions_labels.sepia,
      value: 'sepia'
    }],
    onChange: newType => {
      styles[index].type = newType;
      styles[index].value = defaultValues[newType];
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'blur' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.blur,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'brightness' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.brightness,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'contrast' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.contrast,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'drop-shadow' === currentOption.type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    allowCustomValue: true,
    label: "X-Offset",
    units: filterUnits[currentOption.type],
    value: currentOption.dropShadow.xOffset[0],
    onChange: newValue => {
      styles[index].dropShadow.xOffset = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    allowCustomValue: true,
    label: "Y-Offset",
    units: filterUnits[currentOption.type],
    value: currentOption.dropShadow.yOffset[0],
    onChange: newValue => {
      styles[index].dropShadow.yOffset = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    allowCustomValue: true,
    label: "Blur",
    units: filterUnits[currentOption.type],
    value: currentOption.dropShadow.blur[0],
    onChange: newValue => {
      styles[index].dropShadow.blur = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_gb_components_namespaceObject.ColorPicker,
    value: currentOption.dropShadow.color,
    label: "Color",
    tooltip: (0,external_wp_i18n_namespaceObject.__)('Filter color', 'generateblocks-pro'),
    onChange: newValue => {
      styles[index].dropShadow.color = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  })), 'grayscale' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.grayscale,
    allowCustomValue: true,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'hue-rotate' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels['hue-rotate'],
    allowCustomValue: true,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'invert' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.invert,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'opacity' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.opacity,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'saturate' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.saturate,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    },
    alwaysVisible: true
  }), 'sepia' === currentOption.type && (0,external_React_namespaceObject.createElement)(Control, {
    as: UnitControl,
    label: FilterControlOptions_labels.sepia,
    units: filterUnits[currentOption.type],
    value: currentOption.value,
    onChange: newValue => {
      styles[index].value = newValue;
      setSettings(styles);
    }
  }), showAddTransition && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    style: {
      marginTop: '10px'
    },
    label: (0,external_wp_i18n_namespaceObject.__)('Automatically add a smooth transition for filters', 'generateblocks-pro'),
    showTooltip: true,
    variant: "secondary",
    size: "compact",
    icon: library_plus,
    onClick: () => {
      const newSetting = {
        ...getDefaultTransition(),
        transitionProperty: 'filter'
      };
      const newSettings = [...transitionSettings, newSetting];
      onStyleChange('transition', buildTransitionCSS(newSettings), newSettings);
    }
  }, "Transition"));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/filter/FilterControl.jsx









function FilterControl({
  onStyleChange,
  value = '',
  transition = ''
}) {
  var _filterSettings$nextE;
  const transitionSettings = (0,external_wp_element_namespaceObject.useMemo)(() => parseTransition(transition), [transition]);
  const [showPasteStyles, setShowPasteStyles] = (0,external_wp_element_namespaceObject.useState)(false);
  const [pasteModalErrorMessage, setPasteModalErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [filterSettings, setFilterSettings] = (0,external_wp_element_namespaceObject.useState)(() => parseFilter(value));
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const currentSetting = (_filterSettings$nextE = filterSettings[nextEditIndex]) !== null && _filterSettings$nextE !== void 0 ? _filterSettings$nextE : null;
  const isEditing = (0,external_wp_element_namespaceObject.useMemo)(() => currentSetting !== null, [currentSetting]);

  // Functions.
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setFilterSettings(settings);

    // Update CSS.
    debouncedOnStyleChange('filter', buildFilterCSS(settings));
  }, [debouncedOnStyleChange]);
  const findFilterIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...filterSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [filterSettings, nextEditIndex]);
  function FilterListItem({
    item,
    index: listItemIndex
  }) {
    const css = buildFilterCSS([item]);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Invalid transform', 'generateblocks-pro');
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      css: cssText,
      swatchColor: item.type === 'drop-shadow' && item?.dropShadow?.color,
      onDuplicate: () => {
        const newSettings = [...filterSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findFilterIndex();
  return (0,external_React_namespaceObject.createElement)(EffectControl, {
    items: filterSettings,
    label: "Filter",
    cssProp: "filter",
    isEditing: isEditing,
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      setNextEditIndex(null);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, !confirmDelete && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        setShowPasteStyles(true);
        onClose();
      }
    }, (0,external_wp_i18n_namespaceObject.__)('Add via paste…', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all filter styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all filter styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: filterSettings,
      onDelete: newSettings => {
        updateCSS(newSettings);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Filters', 'generateblocks-pro'),
      learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/filter",
      onClose: onClose
    })),
    onAdd: () => {
      const newSettings = [...filterSettings, getDefaultFilter()];
      setNextEditIndex(newSettings.length - 1);
      updateCSS(newSettings);
    },
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Filters', 'generateblocks-pro'),
    learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-filter"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-filter__wrapper"
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: filterSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Filter', 'generateblocks-pro'),
    setItems: reorderedStyles => {
      updateCSS(reorderedStyles);
    },
    itemComponent: FilterListItem,
    dragHandle: true
  })), isEditing && (0,external_React_namespaceObject.createElement)(FilterControlOptions, {
    currentOption: currentSetting,
    findFilterIndex: findFilterIndex,
    settings: filterSettings,
    setSettings: updateCSS,
    transitionSettings: transitionSettings,
    onStyleChange: onStyleChange
  }))), (0,external_React_namespaceObject.createElement)(EffectControl.PasteModal, {
    property: "filter",
    errorMessage: pasteModalErrorMessage,
    showPasteStyles: showPasteStyles,
    setShowPasteStyles: setShowPasteStyles,
    onAddStyles: ({
      pastedValue,
      replaceStyles
    }) => {
      if (!pastedValue || pastedValue.length === 0) {
        return false;
      }
      try {
        const parsedFilterStyles = parseFilter(pastedValue);
        const newSettings = replaceStyles ? [...parsedFilterStyles] : [...filterSettings, ...parsedFilterStyles];
        updateCSS(newSettings);
        setShowPasteStyles(false);
        setPasteModalErrorMessage('');
        return true;
      } catch (e) {
        setPasteModalErrorMessage((0,external_wp_i18n_namespaceObject.__)('Error parsing pasted styles. Please check your CSS and try again.', 'generateblocks-pro'));
        return false;
      }
    }
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/text-shadow/utils.js
// Remove -webkit-text-shadow and -moz-text-shadow vendor prefixes.
const removeVendorTextShadows = shadowString => {
  return shadowString.replace(/-webkit-text-shadow:[^;]+;|-moz-text-shadow:[^;]+;/g, '');
};

// Clean up the text shadow string before parsing.
const text_shadow_utils_cleanString = inputString => {
  const step1 = inputString.replace(/text-shadow/g, '');
  const step2 = step1.replace(/webkit/g, '');
  const step3 = step2.replace(/\r?\n|\r/g, '');
  const step4 = step3.replace(/;/g, '');
  const step5 = step4.replace(/:/g, '');
  return step5.trim();
};
const buildTextShadowCSS = (settings = []) => {
  return settings.reduce((acc, cur) => {
    if (cur.hidden) {
      return acc;
    }
    const {
      offsetX = '',
      offsetY = '',
      blur = '',
      color = ''
    } = cur;
    const textShadow = `${color} ${offsetX} ${offsetY} ${blur}`.trim();

    // Return nothing if the background is empty
    if (!textShadow.trim().length) {
      return acc;
    }
    return acc.length > 0 ? `${acc}, ${textShadow}` : `${textShadow}`;
  }, '').replace(/,$/, '').trim();
};
function cssTextShadowParser() {
  const VALUES_REG = /,(?![^\(]*\))/;
  const PARTS_REG = /\s(?![^(]*\))/;
  const LENGTH_REG = /^[0-9]+[a-zA-Z%]+$/;
  const parseValue = str => {
    const parts = str.split(PARTS_REG);
    const color = !isLength(parts[0]) ? parts[0] : undefined;
    const values = parts.filter(n => n !== color);
    const [offsetX, offsetY, blur] = values;
    return {
      offsetX,
      offsetY,
      blur,
      color
    };
  };
  const stringifyValue = obj => {
    const {
      offsetX = 0,
      offsetY = 0,
      blur = 0,
      color
    } = obj || {};
    return [color, offsetX, offsetY, blur].filter(v => v !== null && v !== undefined).map(s => ('' + s).trim()).join(' ');
  };
  const isLength = v => LENGTH_REG.test(v);
  const parse = str => str ? str.split(VALUES_REG).map(s => s.trim()).map(parseValue) : [];
  const stringify = arr => arr?.length ? arr.map(stringifyValue).join(', ') : '';
  return {
    parse,
    stringify
  };
}
const cssTextShadow = cssTextShadowParser();
function getDefaultTextShadow() {
  return {
    offsetX: '1px',
    offsetY: '1px',
    blur: '2px',
    color: 'rgba(0,0,0,1)'
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/text-shadow/TextShadowControlOptions.jsx





const TextShadowControlOptions_units = ['px', 'em', 'rem', 'vw', 'vh', 'ch'];
function TextShadowControlOptions({
  findTextShadowIndex,
  setSettings,
  currentOption = null
}) {
  const {
    styles,
    index
  } = findTextShadowIndex();
  return currentOption && (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_gb_components_namespaceObject.ColorPicker,
    value: currentOption?.color || 'rgba(0,0,0,1)',
    tooltip: "Text Shadow Color",
    onChange: newValue => {
      styles[index].color = newValue;
      setSettings(styles);
    }
  })), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "x-Offset",
    units: TextShadowControlOptions_units,
    value: currentOption.offsetX,
    onChange: newValue => {
      styles[index].offsetX = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "y-Offset",
    units: TextShadowControlOptions_units,
    value: currentOption.offsetY,
    onChange: newValue => {
      styles[index].offsetY = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    label: "blur",
    units: TextShadowControlOptions_units,
    value: currentOption?.blur,
    onChange: newValue => {
      styles[index].blur = newValue;
      setSettings(styles);
    }
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/text-shadow/TextShadowControl.jsx








function TextShadowControl({
  onStyleChange,
  value
}) {
  var _textShadowSettings$n;
  const [showPasteStyles, setShowPasteStyles] = (0,external_wp_element_namespaceObject.useState)(false);
  const [pasteModalErrorMessage, setPasteModalErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [textShadowSettings, setTextShadowSettings] = (0,external_wp_element_namespaceObject.useState)(() => cssTextShadow.parse(value));
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const currentSetting = (_textShadowSettings$n = textShadowSettings[nextEditIndex]) !== null && _textShadowSettings$n !== void 0 ? _textShadowSettings$n : null;
  const isEditing = currentSetting !== null;

  // Functions.
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setTextShadowSettings(settings);

    // Update CSS.
    debouncedOnStyleChange('textShadow', buildTextShadowCSS(settings));
  }, [debouncedOnStyleChange]);
  const findTextShadowIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...textShadowSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [textShadowSettings, nextEditIndex]);
  function TextShadowListItem({
    item,
    index: listItemIndex
  }) {
    const css = buildTextShadowCSS([item]);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Invalid text shadow', 'generateblocks-pro');
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      css: cssText,
      swatchColor: item.color,
      canDuplicate: css.length > 0,
      onDuplicate: () => {
        const newSettings = [...textShadowSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findTextShadowIndex();
  return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(EffectControl, {
    items: textShadowSettings,
    label: "Text Shadow",
    searchKeywords: ['shadows', 'text-shadow'],
    cssProp: "textShadow",
    onAdd: () => {
      const newSettings = [...textShadowSettings, getDefaultTextShadow()];
      setNextEditIndex(newSettings.length - 1);
      updateCSS(newSettings);
    },
    isEditing: isEditing,
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      setNextEditIndex(null);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, !confirmDelete && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        setShowPasteStyles(true);
        onClose();
      }
    }, (0,external_wp_i18n_namespaceObject.__)('Add via paste…', 'generateblocks-pro'))), (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all text shadow styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all text shadow styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: textShadowSettings,
      onDelete: newSettings => {
        updateCSS(newSettings);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Text Shadows', 'generateblocks-pro'),
      learnMoreURL: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow',
      onClose: onClose
    }))
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-text-shadow"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-text-shadow__wrapper"
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: textShadowSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Text Shadow', 'generateblocks-pro'),
    setItems: reorderedSettings => {
      updateCSS(reorderedSettings);
    },
    itemComponent: TextShadowListItem,
    dragHandle: true
  })), (0,external_React_namespaceObject.createElement)(TextShadowControlOptions, {
    isEditing: isEditing,
    currentOption: currentSetting,
    findTextShadowIndex: findTextShadowIndex,
    setSettings: updateCSS
  }))), (0,external_React_namespaceObject.createElement)(EffectControl.PasteModal, {
    property: "text-shadow",
    errorMessage: pasteModalErrorMessage,
    showPasteStyles: showPasteStyles,
    setShowPasteStyles: setShowPasteStyles,
    onAddStyles: ({
      pastedValue,
      replaceStyles
    }) => {
      if (!pastedValue || pastedValue.length === 0) {
        return false;
      }
      try {
        const pastedSettings = cssTextShadow.parse(text_shadow_utils_cleanString(removeVendorTextShadows(pastedValue)));
        const newSettings = replaceStyles ? [...pastedSettings] : [...textShadowSettings, ...pastedSettings];
        updateCSS(newSettings);
        setShowPasteStyles(false);
        setPasteModalErrorMessage('');
        return true;
      } catch (e) {
        setPasteModalErrorMessage((0,external_wp_i18n_namespaceObject.__)('Error parsing pasted styles. Please check your CSS and try again.', 'generateblocks-pro'));
        return false;
      }
    }
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transform/utils.js
const AVAILABLE_TRANSFORMS = ['perspective', 'rotate', 'rotate3d', 'scale', 'scale3d', 'skew', 'translate3d'];
function buildTransformCSS(settings = []) {
  return settings.reduce((acc, cur) => {
    const {
      hidden = false,
      values = [],
      type = ''
    } = cur;
    const cssText = `${type}(${values.join(', ').trim()})`;
    if (hidden) {
      return acc;
    }
    if (!cssText) {
      return acc;
    }
    return acc.length > 0 ? `${acc} ${cssText}` : `${cssText}`;
  }, '').trim();
}

/**
 * Check if a given transform rule is valid or not.
 *
 * @param {string} transform The transform rule string to be validated
 * @return {boolean} Whether the transform rule is valid or not
 */
function isValidTransform(transform) {
  const fakeElement = document.createElement('div');
  fakeElement.style.transform = transform;
  return fakeElement.style.transform;
}

/**
 * Returns a object representation of the transform string supplied. It parses the string and
 * converts them to an object.
 *
 * @param {string} transformString String containing the transforms
 * @return {Object|null} Object representation of the transform string or null if the transform string is invalid.
 */
function parseTransform(transformString = '') {
  const maybeValidTransform = isValidTransform(transformString);
  if (!maybeValidTransform) {
    return null;
  }

  // If the transform is a keyword, stop here.
  if (['unset', 'inherit', 'initial'].includes(maybeValidTransform)) {
    return {
      [maybeValidTransform]: true
    };
  }

  // Temporarily replace the wrapping var() characters around CSS variables
  const transforms = maybeValidTransform.replaceAll(/var\(([^)]+)\)/g, '$1').match(/([A-z\d]+)\(([^)]+)\)/g);
  return transforms ? transforms.reduce((acc, transform) => {
    if (!transform) {
      return acc;
    }
    const [name, transformValue] = transform.match(/(^[a-z\d]*)|\(([^)]+)\)/g);
    const valueArray = transformValue.replace('(', '').replace(')', '').split(',');
    const values = valueArray.map(val => {
      const trimmedValue = val.trim();
      const isCssVariable = trimmedValue.startsWith('--');
      return isCssVariable ? `var(${trimmedValue})` : trimmedValue;
    });
    return {
      ...acc,
      ...{
        [name]: {
          type: name,
          values,
          cssText: `${name}${transformValue}`
        }
      }
    };
  }, {}) : null;
}
function getDefaultTransform() {
  return {
    type: 'translate3d',
    values: ['0px', '0px', '0px'],
    cssText: 'translate3d(0px, 0px, 0px)'
  };
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transform/TransformControlOptions.jsx










const transformUnits = {
  perspective: ['px', 'em', '%', 'vh', 'vw'],
  // Could filter this in the future to allow for container units if in a container query context
  rotate: ['deg'],
  rotate3d: ['deg'],
  // X, Y, and Z are integers so these are handled manually.
  scale: [],
  scale3d: [],
  skew: ['deg'],
  translate3d: ['px', 'em', '%', 'vh', 'vw'] // Could filter this in the future to allow for container units if in a container query context
};
const defaults = {
  perspective: {
    cssText: 'perspective(0px)',
    values: ['0px']
  },
  rotate: {
    cssText: 'rotate(0deg)',
    values: ['0deg']
  },
  scale: {
    cssText: 'scale(1)',
    values: ['1']
  },
  scale3d: {
    cssText: 'scale3d(1, 1, 1)',
    values: ['1', '1', '1']
  },
  skew: {
    cssText: 'skew(0deg)',
    values: ['0deg']
  },
  translate3d: {
    cssText: 'translate3d(0px, 0px, 0px)',
    values: ['0px', '0px', '0px']
  },
  rotate3d: {
    cssText: 'rotate3d(0, 0, 0, 0deg)',
    values: ['0', '0', '0', '0deg']
  },
  custom: {
    cssText: '',
    values: ['']
  }
};
const TransformControlOptions_labels = {
  perspective: 'Perspective',
  translate3d: 'Translate',
  rotate: 'Rotate',
  rotate3d: 'Rotate (3d)',
  scale: 'Scale',
  scale3d: 'Scale (3d)',
  skew: 'Skew',
  custom: (0,external_wp_i18n_namespaceObject.__)('Custom', 'generateblocks-pro')
};
const customHelpText = (0,external_wp_i18n_namespaceObject.__)('Enter any valid transform value here.', 'generateblocks-pro');
function TransformControlOptions({
  findTransformIndex,
  setSettings,
  settings,
  onStyleChange,
  setNextEditIndex,
  currentOption = null,
  transitionSettings = []
}) {
  var _currentOption$values, _currentOption$cssTex;
  const [customInputHelpText, setCustomInputHelpText] = (0,external_wp_element_namespaceObject.useState)(customHelpText);
  const {
    styles,
    index
  } = findTransformIndex();
  const values = (_currentOption$values = currentOption?.values) !== null && _currentOption$values !== void 0 ? _currentOption$values : [];
  const cssText = (_currentOption$cssTex = currentOption?.cssText) !== null && _currentOption$cssTex !== void 0 ? _currentOption$cssTex : '';
  let type = currentOption?.type || 'custom';
  const showAddTransition = !transitionSettings.some(setting => {
    return ['all', 'transform'].includes(setting.transitionProperty);
  });
  const isCustomType = !AVAILABLE_TRANSFORMS.includes(type);
  if (isCustomType && 'custom' !== type) {
    type = 'custom';
  }
  return currentOption && (0,external_React_namespaceObject.createElement)(EffectEdit, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: (0,external_wp_i18n_namespaceObject.__)('Transform type', 'generateblocks-pro'),
    value: type,
    options: [{
      label: TransformControlOptions_labels.perspective,
      value: 'perspective',
      disabled: settings.some(style => 'perspective' === style.type)
    }, {
      label: TransformControlOptions_labels.rotate,
      value: 'rotate'
    }, {
      label: TransformControlOptions_labels.rotate3d,
      value: 'rotate3d'
    }, {
      label: TransformControlOptions_labels.translate3d,
      value: 'translate3d'
    }, {
      label: TransformControlOptions_labels.scale,
      value: 'scale'
    }, {
      label: TransformControlOptions_labels.scale3d,
      value: 'scale3d'
    }, {
      label: TransformControlOptions_labels.skew,
      value: 'skew'
    }, {
      label: TransformControlOptions_labels.custom,
      value: 'custom'
    }],
    onChange: newType => {
      // If custom, just change the type and use the previous valid transform value.
      styles[index].type = newType;
      if ('custom' !== newType) {
        styles[index] = {
          ...styles[index],
          ...defaults[newType]
        };
      }
      if ('perspective' === newType) {
        // Move this transform to the top of the list if it's not already
        if (index > 0) {
          styles.unshift(styles.splice(index, 1)[0]);
          setNextEditIndex(0);
        }
      }
      setSettings(styles);
    }
  }), isCustomType && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: external_wp_components_namespaceObject.TextControl,
    label: TransformControlOptions_labels[type],
    help: customInputHelpText ? customInputHelpText : customHelpText,
    placeholder: "e.g. rotate(45deg)",
    onChange: (newValue = '') => {
      // If the value is empty, clear the transform
      if ('' === newValue) {
        styles[index].values = [''];
        styles[index].cssText = '';
        setSettings(styles);
        setCustomInputHelpText(customHelpText);
        return;
      }
      const parsedValue = parseTransform(newValue);
      if (null === parsedValue) {
        setCustomInputHelpText((0,external_wp_i18n_namespaceObject.__)('Invalid value'));
        return;
      }
      if (Object.keys(parsedValue).length > 1) {
        setCustomInputHelpText((0,external_wp_i18n_namespaceObject.__)('Only one transform value is allowed.', 'generateblocks-pro'));
        return;
      }
      if (customInputHelpText !== customHelpText) {
        setCustomInputHelpText(customHelpText);
      }
      const newType = Object.keys(parsedValue)[0];
      styles[index] = {
        type: newType,
        ...parsedValue[newType]
      };
      setSettings(styles);
    },
    value: cssText
  }), 'translate3d' === type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} X`,
    value: values[0],
    onChange: newValue => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} Y`,
    value: values[1],
    onChange: newValue => {
      styles[index].values[1] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} Z`,
    value: values[2],
    onChange: newValue => {
      styles[index].values[2] = newValue;
      setSettings(styles);
    }
  })), ['rotate', 'skew'].includes(type) && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: TransformControlOptions_labels[type],
    value: values[0],
    onChange: (newValue = 0) => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), 'scale' === type && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: TransformControlOptions_labels[type],
    value: values[0],
    onChange: newValue => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), 'perspective' === type && (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: TransformControlOptions_labels[type],
    value: values[0],
    onChange: newValue => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), 'rotate3d' === type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: [],
    label: `${TransformControlOptions_labels[type]} X`,
    value: values[0],
    onChange: newValue => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: [],
    label: `${TransformControlOptions_labels[type]} Y`,
    value: values[1],
    onChange: newValue => {
      styles[index].values[1] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: [],
    label: `${TransformControlOptions_labels[type]} Z`,
    value: values[2],
    onChange: newValue => {
      styles[index].values[2] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} Angle`,
    value: values[3],
    onChange: newValue => {
      styles[index].values[3] = newValue;
      setSettings(styles);
    }
  })), 'scale3d' === type && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} X`,
    value: values[0],
    onChange: newValue => {
      styles[index].values[0] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} Y`,
    value: values[1],
    onChange: newValue => {
      styles[index].values[1] = newValue;
      setSettings(styles);
    }
  }), (0,external_React_namespaceObject.createElement)(Control, {
    alwaysVisible: true,
    as: UnitControl,
    units: transformUnits[type],
    label: `${TransformControlOptions_labels[type]} Z`,
    value: values[2],
    onChange: newValue => {
      styles[index].values[2] = newValue;
      setSettings(styles);
    }
  })), showAddTransition && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    label: (0,external_wp_i18n_namespaceObject.__)('Automatically add a smooth transition for transforms', 'generateblocks-pro'),
    showTooltip: true,
    variant: "secondary",
    size: "compact",
    icon: library_plus,
    onClick: () => {
      const newSetting = {
        ...getDefaultTransition(),
        transitionProperty: 'transform'
      };
      const newSettings = [...transitionSettings, newSetting];
      const transitionCSS = buildTransitionCSS(newSettings);
      onStyleChange('transition', transitionCSS, newSettings);
    }
  }, "Transition"));
}
;// CONCATENATED MODULE: ./src/inspector-controls/controls/transform/TransformControl.jsx










function TransformControl_getSettings(value) {
  if (!value) {
    return [];
  }
  const parsedTransform = parseTransform(value);
  if (null === parsedTransform) {
    return [];
  }
  return Object.entries(parsedTransform).map(([type, transform]) => {
    const {
      disabled = false
    } = transform;
    return {
      type,
      ...transform,
      id: esm_browser_v4(),
      disabled: 'perspective' === type || disabled
    };
  });
}
function TransformControl({
  onStyleChange,
  value = '',
  transition = ''
}) {
  var _transformSettings$ne;
  const transitionSettings = (0,external_wp_element_namespaceObject.useMemo)(() => parseTransition(transition), [transition]);
  const [transformSettings, setTransformSettings] = (0,external_wp_element_namespaceObject.useState)(() => TransformControl_getSettings(value));

  // State
  const [showPasteStyles, setShowPasteStyles] = (0,external_wp_element_namespaceObject.useState)(false);
  const [pasteModalErrorMessage, setPasteModalErrorMessage] = (0,external_wp_element_namespaceObject.useState)('');
  const [confirmDelete, setConfirmDelete] = (0,external_wp_element_namespaceObject.useState)(false);
  const [nextEditIndex, setNextEditIndex] = (0,external_wp_element_namespaceObject.useState)(null);
  const currentSetting = (_transformSettings$ne = transformSettings[nextEditIndex]) !== null && _transformSettings$ne !== void 0 ? _transformSettings$ne : null;
  const isEditing = currentSetting !== null;

  // Functions
  const debouncedOnStyleChange = (0,external_wp_compose_namespaceObject.useDebounce)(onStyleChange, 0);
  const updateCSS = (0,external_wp_element_namespaceObject.useCallback)(function updateCSS(settings) {
    // Update component state.
    setTransformSettings(settings);

    // Update CSS.
    debouncedOnStyleChange('transform', buildTransformCSS(settings));
  }, [debouncedOnStyleChange]);
  const findTransformIndex = (0,external_wp_element_namespaceObject.useCallback)(() => {
    const newSettings = [...transformSettings];
    const index = newSettings[nextEditIndex] ? nextEditIndex : -1;
    return {
      styles: newSettings,
      index
    };
  }, [transformSettings, nextEditIndex]);
  function TransformListItem({
    item,
    index: listItemIndex
  }) {
    const css = buildTransformCSS([item]);
    const cssText = css.length > 0 ? css : (0,external_wp_i18n_namespaceObject.__)('Invalid transform', 'generateblocks-pro');
    const {
      type,
      color
    } = item;
    return (0,external_React_namespaceObject.createElement)(EffectList.Item, {
      css: cssText,
      swatchColor: color,
      canDuplicate: type !== 'perspective',
      onDuplicate: () => {
        const newSettings = [...transformSettings, {
          ...item
        }];
        setNextEditIndex(newSettings.length - 1);
        updateCSS(newSettings);
      },
      onEdit: () => {
        setNextEditIndex(listItemIndex);
      }
    });
  }
  const {
    styles,
    index
  } = findTransformIndex();
  return (0,external_React_namespaceObject.createElement)(EffectControl, {
    items: transformSettings,
    label: "Transform",
    isEditing: isEditing,
    cssProp: "transform",
    onClickDelete: () => {
      styles.splice(index, 1);
      updateCSS(styles);
      setNextEditIndex(null);
    },
    onClickDone: () => {
      setNextEditIndex(null);
    },
    dropdownChildren: ({
      onClose
    }) => (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
      label: (0,external_wp_i18n_namespaceObject.__)('Options', 'generateblocks-pro')
    }, !confirmDelete && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItem, {
      onClick: () => {
        setShowPasteStyles(true);
        onClose();
      }
    }, (0,external_wp_i18n_namespaceObject.__)('Add via paste…', 'generateblocks-pro')), (0,external_React_namespaceObject.createElement)(EffectControl.DeleteAll, {
      label: (0,external_wp_i18n_namespaceObject.__)('Delete all transform styles', 'generateblocks-pro'),
      content: (0,external_wp_i18n_namespaceObject.__)('This will delete all transform styles for the current selector. This operation cannot be undone.', 'generateblocks-pro'),
      items: transformSettings,
      onDelete: newSettings => {
        updateCSS(newSettings);
        setNextEditIndex(null);
      },
      onClose: onClose,
      confirmDelete: confirmDelete,
      setConfirmDelete: setConfirmDelete
    })), !confirmDelete && (0,external_React_namespaceObject.createElement)(EffectControl.LearnMore, {
      learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Transforms', 'generateblocks-pro'),
      learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform",
      onClose: onClose
    })),
    onAdd: () => {
      const newSettings = [...transformSettings, getDefaultTransform()];
      setNextEditIndex(newSettings.length - 1);
      updateCSS(newSettings);
    },
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about CSS Transforms', 'generateblocks-pro'),
    learnMoreURL: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-transform"
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: "gb-transform__wrapper"
  }, !isEditing && (0,external_React_namespaceObject.createElement)("div", null, (0,external_React_namespaceObject.createElement)(EffectList, {
    items: transformSettings,
    dragHandleLabel: (0,external_wp_i18n_namespaceObject.__)('Reorder Transform', 'generateblocks-pro'),
    setItems: reorderedSettings => {
      updateCSS(reorderedSettings.map(setting => {
        return {
          ...setting,
          disabled: setting.type === 'perspective'
        };
      }));
    },
    itemComponent: TransformListItem,
    dragHandle: true
  })), isEditing && (0,external_React_namespaceObject.createElement)(TransformControlOptions, {
    isEditing: isEditing,
    currentOption: currentSetting,
    findTransformIndex: findTransformIndex,
    settings: transformSettings,
    setSettings: updateCSS,
    transitionSettings: transitionSettings,
    onStyleChange: onStyleChange,
    setNextEditIndex: setNextEditIndex
  }))), (0,external_React_namespaceObject.createElement)(EffectControl.PasteModal, {
    property: "transform",
    errorMessage: pasteModalErrorMessage,
    showPasteStyles: showPasteStyles,
    setShowPasteStyles: setShowPasteStyles,
    onAddStyles: ({
      pastedValue,
      replaceStyles
    }) => {
      if (!pastedValue || pastedValue.length === 0) {
        return false;
      }
      try {
        const parsedPastedValue = TransformControl_getSettings(pastedValue);
        const newSettings = replaceStyles ? [...parsedPastedValue] : [...transformSettings, ...parsedPastedValue];
        const perspectiveIndex = newSettings.findIndex(({
          type
        }) => type === 'perspective');

        // Move the perspective transform to the top of the list if it's not already
        if (perspectiveIndex > 0) {
          newSettings.unshift(newSettings.splice(perspectiveIndex, 1)[0]);
        }
        updateCSS(newSettings);
        setShowPasteStyles(false);
        setPasteModalErrorMessage('');
        return true;
      } catch (e) {
        setPasteModalErrorMessage((0,external_wp_i18n_namespaceObject.__)('Error parsing pasted styles. Please check your CSS and try again.', 'generateblocks-pro'));
        return false;
      }
    }
  }));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/effects/EffectsPanel.jsx







function EffectsPanel(props) {
  const {
    styles,
    onStyleChange,
    atRule,
    nestedRule,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    backdropFilter = '',
    boxShadow = '',
    filter = '',
    mixBlendMode = '',
    opacity = '',
    transform = '',
    transformOrigin = '',
    transition = '',
    visibility = '',
    textShadow = ''
  } = styles;
  let opacityValue = parseFloat(opacity);

  /**
   * If value wasn't a number (ex: a CSS variable or other string),
   * use that directly.
   */
  if (isNaN(opacityValue)) {
    opacityValue = opacity;
  }
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Effects', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(EffectsIcon, null),
    open: open,
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(BoxShadowControl, {
    value: boxShadow,
    onStyleChange: onStyleChange,
    atRule: atRule,
    nestedRule: nestedRule
  }), (0,external_React_namespaceObject.createElement)(TransitionControl, {
    value: transition,
    onStyleChange: onStyleChange,
    atRule: atRule,
    nestedRule: nestedRule
  }), (0,external_React_namespaceObject.createElement)(FilterControl, {
    value: filter,
    transition: transition,
    onStyleChange: onStyleChange,
    atRule: atRule,
    nestedRule: nestedRule
  }), (0,external_React_namespaceObject.createElement)(TextShadowControl, {
    value: textShadow,
    onStyleChange: onStyleChange,
    atRule: atRule,
    nestedRule: nestedRule
  }), (0,external_React_namespaceObject.createElement)(TransformControl, {
    value: transform,
    transformOrigin: transformOrigin,
    transition: transition,
    onStyleChange: onStyleChange,
    atRule: atRule,
    nestedRule: nestedRule
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Transform Origin",
    value: transformOrigin,
    placeholder: "ex: center, 50% -100%, etc.",
    onChange: newValue => onStyleChange('transformOrigin', newValue),
    cssProp: "transformOrigin",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about transform origin', 'generateblocks-pro'),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
  }), (0,external_React_namespaceObject.createElement)(Opacity, {
    onStyleChange: onStyleChange,
    opacity: opacity
  }), (0,external_React_namespaceObject.createElement)(Control, {
    allowCustomValue: true,
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Visibility",
    value: visibility,
    cssProp: "visibility",
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Visible',
      value: 'visible'
    }, {
      label: 'Hidden',
      value: 'hidden'
    }],
    onChange: value => onStyleChange('visibility', value),
    help: (0,external_wp_i18n_namespaceObject.__)('Using the "hidden" value may cause some block editor elements to become invisible.', 'generateblocks-pro')
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    allowCustomValue: true,
    label: "Mix Blend Mode",
    value: mixBlendMode,
    cssProp: "mixBlendMode",
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Normal',
      value: 'normal'
    }, {
      label: 'Multiply',
      value: 'multiply'
    }, {
      label: 'Screen',
      value: 'screen'
    }, {
      label: 'Overlay',
      value: 'overlay'
    }, {
      label: 'Darken',
      value: 'darken'
    }, {
      label: 'Lighten',
      value: 'lighten'
    }, {
      label: 'Color Dodge',
      value: 'color-dodge'
    }, {
      label: 'Color Burn',
      value: 'color-burn'
    }, {
      label: 'Hard Light',
      value: 'hard-light'
    }, {
      label: 'Soft Light',
      value: 'soft-light'
    }, {
      label: 'Difference',
      value: 'difference'
    }, {
      label: 'Exclusion',
      value: 'exclusion'
    }, {
      label: 'Hue',
      value: 'hue'
    }, {
      label: 'Saturation',
      value: 'saturation'
    }, {
      label: 'Color',
      value: 'color'
    }, {
      label: 'Luminosity',
      value: 'luminosity'
    }],
    onChange: value => onStyleChange('mixBlendMode', value)
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Backdrop Filter",
    value: backdropFilter,
    cssProp: "backdropFilter",
    onChange: value => onStyleChange('backdropFilter', value)
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/media/MediaPanel.jsx






function MediaPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    objectFit = '',
    objectPosition = ''
  } = styles;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Media', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: (0,external_React_namespaceObject.createElement)(MediaIcon, null),
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Object Fit",
    id: "gblocks-object-fit",
    allowCustomValue: true,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'fill',
      value: 'fill'
    }, {
      label: 'contain',
      value: 'contain'
    }, {
      label: 'cover',
      value: 'cover'
    }, {
      label: 'none',
      value: 'none'
    }, {
      label: 'scale-down',
      value: 'scale-down'
    }],
    value: objectFit,
    onChange: value => onStyleChange('objectFit', value),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro'),
    cssProp: "objectFit",
    fallback: true
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Object Position",
    id: "gblocks-object-position",
    value: objectPosition,
    onChange: value => onStyleChange('objectPosition', value),
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-position",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro'),
    cssProp: "objectPosition",
    fallback: true
  })));
}
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/media-and-text.js

/**
 * WordPress dependencies
 */

const mediaAndText = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M3 6v11.5h8V6H3Zm11 3h7V7.5h-7V9Zm7 3.5h-7V11h7v1.5ZM14 16h7v-1.5h-7V16Z"
}));
/* harmony default export */ const media_and_text = (mediaAndText);
//# sourceMappingURL=media-and-text.js.map
;// CONCATENATED MODULE: ./src/inspector-controls/panels/lists/ListsPanel.jsx






function ListsPanel(props) {
  const {
    styles,
    onStyleChange,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    listStyleType = '',
    listStyleImage = '',
    listStylePosition = '',
    display = ''
  } = styles;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Lists', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: media_and_text,
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    label: "List Type",
    id: "gblocks-list-style-type",
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'none',
      value: 'none'
    }, {
      label: 'disc',
      value: 'disc'
    }, {
      label: 'circle',
      value: 'circle'
    }, {
      label: 'square',
      value: 'square'
    }, {
      label: 'decimal',
      value: 'decimal'
    }, {
      label: 'decimal-leading-zero',
      value: 'decimal-leading-zero'
    }, {
      label: 'lower-roman',
      value: 'lower-roman'
    }, {
      label: 'upper-roman',
      value: 'upper-roman'
    }, {
      label: 'lower-greek',
      value: 'lower-greek'
    }],
    value: listStyleType,
    cssProp: "listStyleType",
    allowCustomValue: true,
    onChange: value => onStyleChange('listStyleType', value)
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "List Image",
    id: "gblocks-list-style-image",
    value: listStyleImage,
    allowCustomValue: true,
    cssProp: "listStyleImage",
    onChange: value => onStyleChange('listStyleImage', value),
    help: (0,external_wp_i18n_namespaceObject.__)('The URL of an image to be used as the list item marker.', 'generateblocks-pro')
  }), (0,external_React_namespaceObject.createElement)(Control, {
    id: "gblocks-list-style-position",
    label: "List Position",
    as: external_wp_components_namespaceObject.SelectControl,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'Inside',
      value: 'inside'
    }, {
      label: 'Outside',
      value: 'outside'
    }],
    help: (0,external_wp_i18n_namespaceObject.__)('The position of the list item marker.', 'generateblocks-pro'),
    allowCustomValue: true,
    value: listStylePosition,
    cssProp: "listStylePosition",
    onChange: value => onStyleChange('listStylePosition', value)
  }), !['', 'list-item'].includes(display) && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,external_wp_i18n_namespaceObject.__)("List properties will not apply unless the element's display property is set to list-item", 'generateblocks-pro'))));
}
;// CONCATENATED MODULE: ./src/inspector-controls/panels/more/MorePanel.jsx






function MorePanel(props) {
  const {
    styles,
    onStyleChange,
    nestedRule,
    opened,
    scrollAfterOpen,
    onToggle,
    initialOpen
  } = props;
  const {
    content = '',
    pointerEvents = ''
  } = styles;
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('More', 'generateblocks-pro'),
    initialOpen: initialOpen,
    icon: MoreIcon,
    opened: opened ? true : undefined,
    scrollAfterOpen: scrollAfterOpen,
    onToggle: onToggle
  }, (0,external_React_namespaceObject.createElement)(external_gb_components_namespaceObject.Stack, {
    gap: "12px",
    className: "gb-styles-builder-panel__content"
  }, (nestedRule.includes(':before') || nestedRule.includes(':after')) && (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.TextControl,
    label: "Content",
    id: "gblocks-content",
    value: content,
    cssProp: "content",
    fallback: true,
    onChange: value => onStyleChange('content', value),
    help: (0,external_wp_i18n_namespaceObject.__)('The content property is used with the ::before and ::after pseudo-elements and must be wrapped in quotes.', 'generateblocks-pro')
  }), (0,external_React_namespaceObject.createElement)(Control, {
    as: external_wp_components_namespaceObject.SelectControl,
    label: "Pointer Events",
    id: "gblocks-pointer-events",
    allowCustomValue: true,
    options: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Default', 'generateblocks-pro'),
      value: ''
    }, {
      label: 'auto',
      value: 'auto'
    }, {
      label: 'none',
      value: 'none'
    }],
    value: pointerEvents,
    cssProp: "pointerEvents",
    fallback: true,
    onChange: value => onStyleChange('pointerEvents', value),
    dropdownChildren: ({
      onClose
    }) => {
      return (0,external_React_namespaceObject.createElement)(Control.Description, {
        label: (0,external_wp_i18n_namespaceObject.__)('About Pointer Events', 'generateblocks-pro'),
        onClick: onClose
      }, (0,external_wp_i18n_namespaceObject.__)('Use this property to control whether an element can be the target for click/keyboard events. See the documentation link below for a complete list (note: some only apply to SVG tags).', 'generateblocks-pro'));
    },
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events",
    learnMoreLabel: (0,external_wp_i18n_namespaceObject.__)('Learn more about this property.', 'generateblocks-pro')
  })));
}
;// CONCATENATED MODULE: ./src/inspector-controls/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const inspector_controls_editor_module = ({"controls":"yNVJmwMbOUt7WoLUItMY","noResults":"ZZujcGGD9_po_2TOZ5Pu","filtersActive":"d4h9WuPL5gIjywMNr2ox","addMargin":"fGlWn3a47GRLe5mGDrin","vertical":"EaiHWp4OxER_OoxByfh5"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const panels_editor_module = ({"panel":"_0h6ObjGIFFJuSgW0seR","filtersActive":"iPOw8xSit95PZTpOBEos"});
;// CONCATENATED MODULE: ./src/inspector-controls/panels/StylesBuilderPanel.jsx




function StylesBuilderPanel({
  filtersActive,
  scope,
  panel: Panel,
  search = '',
  atRule,
  id,
  ...props
}) {
  const ref = (0,external_wp_element_namespaceObject.useRef)(null);
  const opened = !!(filtersActive || search);
  const openedPanelKey = `gb-styles-builder-open-panels-${scope}`;
  const openedPanels = JSON.parse(sessionStorage.getItem(openedPanelKey)) || [];
  const initialOpened = openedPanels?.includes(id) || false;
  return (0,external_React_namespaceObject.createElement)("div", {
    ref: ref,
    className: dist_clsx(panels_editor_module.panel, (filtersActive || search) && panels_editor_module.filtersActive)
  }, (0,external_React_namespaceObject.createElement)(Panel, {
    ...props,
    opened: opened,
    atRule: atRule,
    scrollAfterOpen: false,
    filtersActive: filtersActive,
    search: search,
    initialOpen: initialOpened,
    onToggle: () => {
      if (opened) {
        return;
      }
      const existingOpenedPanels = JSON.parse(sessionStorage.getItem(openedPanelKey)) || [];
      const isOpened = existingOpenedPanels.includes(id);
      sessionStorage.setItem(openedPanelKey, isOpened ? JSON.stringify(existingOpenedPanels.filter(panelId => panelId !== id)) : JSON.stringify([...existingOpenedPanels, id]));
    }
  }));
}
;// CONCATENATED MODULE: ./src/components/ErrorBoundary/ErrorBoundary.jsx

class ErrorBoundary extends external_wp_element_namespaceObject.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error, info.componentStack); // eslint-disable-line no-console
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }
    return this.props.children;
  }
}
;// CONCATENATED MODULE: ./src/inspector-controls/InspectorControls.jsx









function InspectorControls({
  styles,
  settings,
  onStyleChange,
  nestedRule,
  atRule,
  deviceType,
  filters,
  dispatchFilters,
  currentSelector,
  scope = ''
}) {
  const hasStyles = (0,external_wp_element_namespaceObject.useMemo)(() => {
    const stylesToCheck = atRule ? styles?.[atRule] : styles;
    return stylesToCheck ? Object.keys(stylesToCheck).length > 0 : false;
  }, [JSON.stringify(styles), atRule]);
  const filtersActive = !!filters.activeFilter;
  const panelProps = {
    styles,
    settings,
    onStyleChange,
    nestedRule,
    atRule,
    deviceType,
    filtersActive,
    search: filters.search,
    scope
  };
  return (0,external_React_namespaceObject.createElement)("div", {
    key: currentSelector + atRule + nestedRule,
    className: dist_clsx('gb-inspector-controls', inspector_controls_editor_module.controls, (filters.search || filtersActive) && 'gb-inspector-controls--filtering')
  }, (0,external_React_namespaceObject.createElement)(ErrorBoundary, {
    fallback: (0,external_wp_i18n_namespaceObject.__)('An error has occured, please reload and try again', 'generateblocks-pro')
  }, (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "layout",
    panel: LayoutPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "sizing",
    panel: SizingPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "spacing",
    panel: SpacingPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "borders",
    panel: BordersPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "typography",
    panel: TypographyPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "backgrounds",
    panel: BackgroundsPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "position",
    panel: PositionPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "effects",
    panel: EffectsPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "media",
    panel: MediaPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "lists",
    panel: ListsPanel,
    ...panelProps
  }), (0,external_React_namespaceObject.createElement)(StylesBuilderPanel, {
    id: "more",
    panel: MorePanel,
    ...panelProps
  }), !hasStyles && 'hide-empty' === filters.activeFilter && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    className: dist_clsx(inspector_controls_editor_module.addMargin, inspector_controls_editor_module.vertical),
    isDismissible: false
  }, (0,external_wp_i18n_namespaceObject.__)('No styles set.', 'generateblocks-pro'), "\xA0", (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Button, {
    className: inspector_controls_editor_module.resetButton,
    variant: "link",
    onClick: () => {
      dispatchFilters({
        type: 'RESET'
      });
    }
  }, (0,external_wp_i18n_namespaceObject.__)('Reset filters', 'generateblocks-pro'))), hasStyles && (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    className: dist_clsx(inspector_controls_editor_module.addMargin, inspector_controls_editor_module.vertical, inspector_controls_editor_module.noResults, (filtersActive || filters.search) && inspector_controls_editor_module.filtersActive),
    isDismissible: false
  }, (0,external_wp_i18n_namespaceObject.__)('No results found.', 'generateblocks-pro'))));
}
;// CONCATENATED MODULE: ./src/components/StylesBuilder/StylesBuilder.jsx













function updateSearchParam({
  query,
  type
}) {
  const searchParam = new URLSearchParams(window.location.search);
  searchParam.set(`gb-${type}-styles-search`, query);
  window.history.replaceState(null, '', `${window.location.pathname}?${searchParam.toString()}`);
}
function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      const {
        query
      } = action.payload;
      updateSearchParam(action.payload);
      return {
        ...state,
        search: query
      };
    case 'SET_FILTER':
      return {
        ...state,
        activeFilter: action.payload
      };
    default:
      return state;
  }
}
function searchLabel(label, searchTerm) {
  if (Array.isArray(label)) {
    return label.some(theLabel => searchLabel(theLabel, searchTerm));
  }
  if (typeof label === 'string') {
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  }
  if ((0,external_wp_element_namespaceObject.isValidElement)(label)) {
    return searchJSXElement(label, searchTerm);
  }
  return false;
}
function searchJSXElement(element, searchTerm) {
  const {
    children
  } = element.props;
  if (typeof children === 'string') {
    return children.toLowerCase().includes(searchTerm.toLowerCase());
  }
  if (Array.isArray(children)) {
    return children.some(child => typeof child === 'string' ? child.toLowerCase().includes(searchTerm.toLowerCase()) : (0,external_wp_element_namespaceObject.isValidElement)(child) && searchJSXElement(child, searchTerm));
  }
  return false;
}
function StylesBuilder(props) {
  const {
    styles,
    settings,
    allStyles,
    onStyleChange,
    nestedRule,
    onNestedRuleChange,
    onAtRuleChange,
    onEditStyle,
    atRule,
    customAtRules = [],
    currentSelector,
    onUpdateKey,
    onDeleteStyle,
    selectorShortcuts = {},
    visibleSelectors = [],
    scope = '',
    canManageStyles = true,
    setLocalTab = () => {},
    cancelEditStyle = () => {},
    allowCustomAtRule = true,
    allowCustomAdvancedSelector = true
  } = props;
  const [showSelectorOptions, setShowSelectorOptions] = (0,external_wp_element_namespaceObject.useState)(false);
  const [showAtRuleOptions, setShowAtRuleOptions] = (0,external_wp_element_namespaceObject.useState)(false);
  const normalizedAtRule = (0,external_wp_element_namespaceObject.useMemo)(() => normalizeAtRule(atRule), [atRule]);
  const ref = (0,external_wp_element_namespaceObject.useRef)();
  const [panelHeader, setPanelHeader] = (0,external_wp_element_namespaceObject.useState)(null);
  const atRules = customAtRules.length > 0 ? customAtRules : defaultAtRules;
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (!ref?.current) {
      return;
    }
    const editorSidebar = ref.current.closest('.editor-sidebar');
    if (editorSidebar) {
      // Get all .components-panel__header elements
      const headers = editorSidebar.querySelectorAll('.components-panel__header');

      // Find the visible one
      const visibleHeader = Array.from(headers).find(header => header.offsetParent !== null);

      // Set the visible header to state
      if (visibleHeader) {
        setPanelHeader(visibleHeader);
      }
    }
  }, [panelHeader, ref?.current]);
  const panelHeaderOffset = (0,external_wp_element_namespaceObject.useMemo)(() => {
    if (panelHeader) {
      return panelHeader.getBoundingClientRect().height;
    }
    return '50';
  }, [panelHeader]);

  // Setup filters for Permissions, Controls and Style Indicators.
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.control.atRule', 'generateblocks-pro/control/functions', () => normalizedAtRule);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.control.currentSelector', 'generateblocks-pro/control/functions', () => currentSelector);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.permissions.canManageStyles', 'generateblocks-pro/permissions', () => canManageStyles);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.indicators.onEditStyle', 'generateblocks-pro/indicators/functions', () => onEditStyle);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.indicators.setLocalTab', 'generateblocks-pro/indicators/functions', () => setLocalTab);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.indicators.cancelEditStyle', 'generateblocks-pro/indicators/functions', () => cancelEditStyle);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.indicators.onAtRuleChange', 'generateblocks-pro/indicators/functions', () => onAtRuleChange);
  const [filters, dispatchFilters] = (0,external_wp_element_namespaceObject.useReducer)(filterReducer, {
    search: '',
    activeFilter: ''
  }, () => {
    var _params$get;
    const params = new URLSearchParams(window.location.search);
    const defaultSearch = (_params$get = params.get(`gb-${scope}-styles-search`)) !== null && _params$get !== void 0 ? _params$get : '';
    return {
      search: defaultSearch,
      activeFilter: ''
    };
  });
  const debouncedDispatchFilters = (0,external_wp_compose_namespaceObject.useDebounce)(dispatchFilters, 200);
  const filtersActive = !!filters.activeFilter;
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.control.filters', 'generateblocks-pro/styles-builder/filters', () => filters);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.control.visible', 'generateblocks-pro/styles-builder/controls-search', (isVisible, data, controlProps) => {
    let visible = true;

    // If no search or active filter, show all controls.
    if (!filters.search && !filters.activeFilter) {
      return visible;
    }
    const {
      label = '',
      searchKeywords = [],
      matchType = '',
      cssProp
    } = data;
    switch (filters.activeFilter) {
      case 'hide-empty':
        visible = controlProps?.value !== '' || undefined === controlProps?.value;
        break;
      case 'show-inherited':
        // If match type is set and a cssProp is set, show the control.
        visible = matchType !== '' || false === cssProp;
        break;
    }

    // Hide the control and stop here hidden by a filter or if the search query is empty.
    if (!visible || !filters.search) {
      return visible;
    }

    // From here, search the remaining visible controls
    const uniqueKeywords = Array.from(new Set(searchKeywords));
    const multipleTerms = filters.search.split(',').filter(Boolean);
    if (multipleTerms.length > 1) {
      return multipleTerms.some(term => searchLabel([label, ...uniqueKeywords], term.trim()));
    }
    return searchLabel([label, ...uniqueKeywords], filters.search);
  }, 10, 2);
  (0,external_wp_hooks_namespaceObject.addFilter)('generateblocks.indicators.setSearch', 'generateblocks-pro/styles-builder/indicators/props', () => (query, type) => {
    updateSearchParam({
      query,
      type
    });
    dispatchFilters({
      type: 'SET_SEARCH',
      payload: {
        query,
        type
      }
    });
  });
  return (0,external_React_namespaceObject.createElement)("div", {
    ref: ref
  }, (0,external_React_namespaceObject.createElement)("div", {
    className: dist_clsx('gb-styles-builder', editor_module.component)
  }, (0,external_React_namespaceObject.createElement)(Selector, {
    allStyles: allStyles,
    onUpdateKey: onUpdateKey,
    onNestedRuleChange: onNestedRuleChange,
    currentSelector: currentSelector,
    nestedRule: nestedRule,
    showSelectorOptions: showSelectorOptions,
    setShowSelectorOptions: setShowSelectorOptions,
    onDeleteStyle: onDeleteStyle,
    selectorShortcuts: selectorShortcuts,
    visibleSelectors: visibleSelectors,
    allowCustomAdvancedSelector: allowCustomAdvancedSelector
  }), !showSelectorOptions && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.atRuleFilters,
    style: {
      '--topOffset': `${panelHeaderOffset}px`
    }
  }, !!atRules.length > 0 && (0,external_React_namespaceObject.createElement)(AtRules, {
    atRule: normalizedAtRule,
    onAtRuleChange: onAtRuleChange,
    onNestedRuleChange: onNestedRuleChange,
    defaultAtRules: atRules,
    allStyles: allStyles,
    showAtRuleOptions: showAtRuleOptions,
    setShowAtRuleOptions: setShowAtRuleOptions,
    onUpdateKey: onUpdateKey,
    nestedRule: nestedRule,
    onDeleteStyle: onDeleteStyle,
    allowCustomAtRule: allowCustomAtRule
  }), !showAtRuleOptions && (0,external_React_namespaceObject.createElement)("div", {
    className: editor_module.filters
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.SearchControl, {
    __nextHasNoMarginBottom: true,
    value: filters.search,
    onChange: newSearch => {
      debouncedDispatchFilters({
        type: 'SET_SEARCH',
        payload: {
          query: newSearch,
          type: scope
        }
      });
    },
    label: (0,external_wp_i18n_namespaceObject.__)('Search Controls', 'generateblocks-pro'),
    hideLabelFromVision: true,
    className: editor_module.search
  }), (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.DropdownMenu, {
    variant: "link",
    size: "small",
    icon: library_funnel,
    label: (0,external_wp_i18n_namespaceObject.__)('Filter Controls', 'generateblocks-pro'),
    className: editor_module.filtersDropdown,
    popoverProps: {
      className: editor_module.filtersPopover
    },
    toggleProps: {
      size: 'compact',
      isPressed: filtersActive
    }
  }, ({
    onClose
  }) => (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuGroup, {
    label: (0,external_wp_i18n_namespaceObject.__)('Controls Visibility', 'generateblocks-pro')
  }, (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.MenuItemsChoice, {
    value: filters.activeFilter,
    choices: [{
      label: (0,external_wp_i18n_namespaceObject.__)('Show all', 'generateblocks-pro'),
      value: ''
    }, {
      info: (0,external_wp_i18n_namespaceObject.__)('Hide controls with no value set.', 'generateblocks-pro'),
      label: (0,external_wp_i18n_namespaceObject.__)('Hide empty controls', 'generateblocks-pro'),
      value: 'hide-empty'
    }, {
      info: (0,external_wp_i18n_namespaceObject.__)('Show inherited local or global styles.', 'generateblocks-pro'),
      label: (0,external_wp_i18n_namespaceObject.__)('Show inherited values', 'generateblocks-pro'),
      value: 'show-inherited'
    }],
    onSelect: filter => {
      dispatchFilters({
        type: 'SET_FILTER',
        payload: filter
      });
      onClose();
    }
  }))))), !showAtRuleOptions && (0,external_React_namespaceObject.createElement)(InspectorControls, {
    currentSelector: currentSelector,
    settings: settings,
    styles: styles,
    onStyleChange: onStyleChange,
    onNestedRuleChange: onNestedRuleChange,
    nestedRule: nestedRule,
    atRule: normalizedAtRule,
    filters: filters,
    dispatchFilters: dispatchFilters,
    scope: scope
  }))));
}
;// CONCATENATED MODULE: ./src/store/styles.js

const INITIAL_STATE = {
  data: {},
  settings: {}
};
const actions = {
  setStyles: data => ({
    type: 'SET_DATA',
    payload: data
  }),
  addStyle: (property, value, atRule, nestedRule) => ({
    type: 'ADD_STYLE',
    payload: {
      property,
      value,
      atRule,
      nestedRule
    }
  }),
  updateKey: (oldKey, newKey, object = {}) => ({
    type: 'UPDATE_KEY',
    payload: {
      oldKey,
      newKey,
      object
    }
  }),
  deleteStyle: (key, object = {}) => ({
    type: 'DELETE_STYLE',
    payload: {
      key,
      object
    }
  })
};
const selectors = {
  getStyles: (state, atRule = '', nestedRule = '') => {
    return getStylesObject(state.data, atRule, nestedRule);
  }
};

/**
 * This function is the reducer for the store. It handles all the actions.
 *
 * @param {Object} state  - The current state.
 * @param {Object} action - The action to be performed.
 * @return {Object} - The new state.
 */
function reducer(state = INITIAL_STATE, action) {
  if ('SET_DATA' === action.type) {
    return Object.assign({}, state, {
      data: action.payload
    });
  }
  if ('ADD_STYLE' === action.type) {
    const {
      property,
      value,
      atRule,
      nestedRule
    } = action.payload;
    let {
      data
    } = state;
    if (Array.isArray(property)) {
      property.forEach(prop => {
        data = addPropertyToStylesObject(data, prop.property, prop.value, atRule, nestedRule);
      });
    } else {
      data = addPropertyToStylesObject(state.data, property, value, atRule, nestedRule);
    }
    return {
      ...state,
      data
    };
  }
  if ('UPDATE_KEY' === action.type) {
    const {
      oldKey,
      newKey,
      object
    } = action.payload;
    const objectToTarget = Object.keys(object).length ? object : state.data;
    const newData = updateStylesObjectKey(objectToTarget, oldKey, newKey);
    return {
      ...state,
      data: newData
    };
  }
  if ('DELETE_STYLE' === action.type) {
    const {
      key,
      object
    } = action.payload;
    const objectToTarget = Object.keys(object).length ? object : state.data;
    const newData = deleteStylesObjectKey(objectToTarget, key);
    return {
      ...state,
      data: newData
    };
  }
  return {
    ...state
  };
}
;// CONCATENATED MODULE: ./src/store/nested-rule.js
const nested_rule_INITIAL_STATE = '';
const nested_rule_actions = {
  setNestedRule: data => ({
    type: 'SET_DATA',
    payload: data
  })
};

// Functions to get the state.
const nested_rule_selectors = {
  getNestedRule: state => state
};

// Function that changes the state based on the action type and payload.
function nested_rule_reducer(state = nested_rule_INITIAL_STATE, action) {
  if ('SET_DATA' === action.type) {
    return action.payload;
  }
  return state;
}
;// CONCATENATED MODULE: ./src/store/current-style.js
const current_style_INITIAL_STATE = {
  data: {}
};
const current_style_actions = {
  setCurrentStyle: data => ({
    type: 'SET_DATA',
    payload: data
  })
};

// Functions to get the state.
const current_style_selectors = {
  currentStyle: state => state.data
};

// Function that changes the state based on the action type and payload.
function current_style_reducer(state = current_style_INITIAL_STATE, action) {
  if ('SET_DATA' === action.type) {
    return Object.assign({}, state, {
      data: action.payload
    });
  }
  return {
    ...state
  };
}
;// CONCATENATED MODULE: ./src/store/at-rule.js
const at_rule_INITIAL_STATE = '';
const at_rule_actions = {
  setAtRule: data => ({
    type: 'SET_DATA',
    payload: data
  })
};

// Functions to get the state.
const at_rule_selectors = {
  getAtRule: state => state
};

// Function that changes the state based on the action type and payload.
function at_rule_reducer(state = at_rule_INITIAL_STATE, action) {
  if ('SET_DATA' === action.type) {
    return action.payload;
  }
  return state;
}
;// CONCATENATED MODULE: ./src/store/filters.js
const filters_INITIAL_STATE = '';
const filters_actions = {
  setFilters: data => ({
    type: 'SET_DATA',
    payload: data
  })
};

// Functions to get the state.
const filters_selectors = {
  getFilters: state => state
};

// Function that changes the state based on the action type and payload.
function filters_reducer(state = filters_INITIAL_STATE, action) {
  if ('SET_DATA' === action.type) {
    return action.payload;
  }
  return state;
}
;// CONCATENATED MODULE: ./src/index.js









})();

/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=generateblocks.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/@edge22/styles-builder/dist/generateblocks.js");
/******/ 	(window.gb = window.gb || {}).stylesBuilder = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=styles-builder.js.map
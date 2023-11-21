/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dashboard.scss":
/*!****************************!*\
  !*** ./src/dashboard.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/dashboard.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dashboard_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.scss */ "./src/dashboard.scss");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */

class App extends _wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isAPILoaded: false,
      isAPISaving: false,
      isRegeneratingCSS: false,
      settings: generateBlocksSettings.settings
    };
    this.getSetting = this.getSetting.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }
  componentDidMount() {
    this.setState({
      isAPILoaded: true
    });
  }
  getSetting(name, defaultVal) {
    let result = defaultVal;
    if ('undefined' !== typeof this.state.settings[name]) {
      result = this.state.settings[name];
    }
    return result;
  }
  updateSettings(e) {
    this.setState({
      isAPISaving: true
    });
    const message = e.target.nextElementSibling;
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: '/generateblocks/v1/settings',
      method: 'POST',
      data: {
        settings: this.state.settings
      }
    }).then(result => {
      this.setState({
        isAPISaving: false
      });
      message.classList.add('gblocks-action-message--show');
      message.textContent = result.response;
      if (!result.success || !result.response) {
        message.classList.add('gblocks-action-message--error');
      } else {
        setTimeout(function () {
          message.classList.remove('gblocks-action-message--show');
        }, 3000);
      }
    });
  }
  render() {
    if (!this.state.isAPILoaded) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
        className: "gblocks-settings-placeholder"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null));
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "generateblocks-settings-main"
    }, (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('generateblocks.dashboard.beforeSettings', '', this), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'generateblocks')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gblocks-dashboard-panel-row-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      className: "gblocks-container-width"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gblocks-units"
    }, "px"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      type: "number",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Global max-width', 'generateblocks'),
      help: !!generateBlocksSettings.gpContainerWidth ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The global max-width is set by GeneratePress in the Customizer.', 'generateblocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The global max-width value you can use in your blocks.', 'generateblocks'),
      disabled: !!generateBlocksSettings.gpContainerWidth,
      value: generateBlocksSettings.gpContainerWidth || this.getSetting('container_width'),
      onChange: value => {
        this.setState({
          settings: {
            ...this.state.settings,
            container_width: value
          }
        });
      }
    }), !!generateBlocksSettings.gpContainerWidthLink && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: generateBlocksSettings.gpContainerWidthLink,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        fontSize: '12px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Go to option →', 'generateblocks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      className: "gblocks-css-print-method"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('CSS Print Method', 'generateblocks'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generating your CSS in external files is better for overall performance.', 'generateblocks'),
      value: this.getSetting('css_print_method'),
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('External File', 'generateblocks'),
        value: 'file'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Inline Embedding', 'generateblocks'),
        value: 'inline'
      }],
      onChange: value => {
        this.setState({
          settings: {
            ...this.state.settings,
            css_print_method: value
          }
        });
      }
    })), 'file' === this.getSetting('css_print_method') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
      id: "gblocks-regenerate-css",
      className: "gblocks-regenerate-css",
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gblocks-action-button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isSecondary: true,
      onClick: e => {
        this.setState({
          isRegeneratingCSS: true
        });
        const message = e.target.nextElementSibling;
        _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
          path: '/generateblocks/v1/regenerate_css_files',
          method: 'POST'
        }).then(result => {
          this.setState({
            isRegeneratingCSS: false
          });
          message.classList.add('gblocks-action-message--show');
          message.textContent = result.response;
          if (!result.success || !result.response) {
            message.classList.add('gblocks-action-message--error');
          } else {
            setTimeout(function () {
              message.classList.remove('gblocks-action-message--show');
            }, 3000);
          }
        });
      }
    }, this.state.isRegeneratingCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !this.state.isRegeneratingCSS && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Regenerate CSS Files', 'generateblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "gblocks-action-message"
    })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync Responsive Previews', 'generateblocks'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync our responsive preview controls with the editor responsive previews.', 'generateblocks'),
      checked: this.getSetting('sync_responsive_previews'),
      onChange: value => {
        this.setState({
          settings: {
            ...this.state.settings,
            sync_responsive_previews: value
          }
        });
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable Google Fonts', 'generateblocks'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Prevent Google Fonts from being called on your website and remove them from the font family lists.', 'generateblocks'),
      checked: this.getSetting('disable_google_fonts'),
      onChange: value => {
        this.setState({
          settings: {
            ...this.state.settings,
            disable_google_fonts: value
          }
        });
      }
    })), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('generateblocks.dashboard.settings', '', this), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gblocks-action-button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: true,
      disabled: this.state.isAPISaving,
      onClick: e => this.updateSettings(e)
    }, this.state.isAPISaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !this.state.isAPISaving && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "gblocks-action-message"
    })))), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('generateblocks.dashboard.afterSettings', '', this)));
  }
}
window.addEventListener('DOMContentLoaded', () => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), document.getElementById('gblocks-block-default-settings'));
});
}();
/******/ })()
;
//# sourceMappingURL=dashboard.js.map
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/settings/blocks-version.js":
/*!****************************************!*\
  !*** ./src/settings/blocks-version.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _utils_compatible_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/compatible-render */ "./src/utils/compatible-render/index.js");






function BlocksVersionSettings() {
  const [isAPILoaded, setIsAPILoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [isAPISaving, setIsAPISaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [useV1Blocks, setUseV1Blocks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(generateBlocksSettings.useV1Blocks);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setIsAPILoaded(true);
  }, []);
  async function updateSetting(e, name, value) {
    setIsAPISaving(true);
    const message = e.target.nextElementSibling;
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: '/generateblocks/v1/setting',
      method: 'POST',
      data: {
        name,
        value
      }
    }).then(result => {
      setIsAPISaving(false);
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
  if (!generateBlocksSettings.useV1Blocks) {
    return null;
  }
  if (!isAPILoaded) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
      className: "gblocks-settings-placeholder"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "generateblocks-settings-main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blocks Version', 'generateblocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gblocks-dashboard-panel-row-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use version 1 blocks', 'generateblocks'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enabling this option will make it so only version 1 blocks display in the block inserter.', 'generateblocks'),
    checked: !!useV1Blocks,
    onChange: value => setUseV1Blocks(value)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gblocks-action-button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    disabled: !!isAPISaving,
    onClick: e => updateSetting(e, 'gb_use_v1_blocks', useV1Blocks)
  }, !!isAPISaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !isAPISaving && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'generateblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gblocks-action-message"
  }))))));
}
window.addEventListener('DOMContentLoaded', () => {
  (0,_utils_compatible_render__WEBPACK_IMPORTED_MODULE_5__["default"])(document.getElementById('gblocks-blocks-version-settings'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlocksVersionSettings, null));
});

/***/ }),

/***/ "./src/utils/compatible-render/index.js":
/*!**********************************************!*\
  !*** ./src/utils/compatible-render/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(root, component) {
  if (undefined !== _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(root).render(component);
  } else {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(component, root);
  }
}

/***/ }),

/***/ "./src/settings.scss":
/*!***************************!*\
  !*** ./src/settings.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
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
/* harmony import */ var _utils_compatible_render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/compatible-render */ "./src/utils/compatible-render/index.js");
/* harmony import */ var _settings_blocks_version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/blocks-version */ "./src/settings/blocks-version.js");
/* harmony import */ var _settings_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./settings.scss */ "./src/settings.scss");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */



function Settings() {
  const [isAPILoaded, setIsAPILoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [isAPISaving, setIsAPISaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [isRegeneratingCSS, setIsRegeneratingCSS] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(generateBlocksSettings.settings);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setIsAPILoaded(true);
  }, []);
  function getSetting(name, defaultVal) {
    let result = defaultVal;
    if ('undefined' !== typeof settings[name]) {
      result = settings[name];
    }
    return result;
  }
  function updateSettings(e) {
    setIsAPISaving(true);
    const message = e.target.nextElementSibling;
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: '/generateblocks/v1/settings',
      method: 'POST',
      data: {
        settings
      }
    }).then(result => {
      setIsAPISaving(false);
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
  if (!isAPILoaded) {
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
    value: generateBlocksSettings.gpContainerWidth || getSetting('container_width'),
    onChange: value => {
      setSettings({
        ...settings,
        container_width: value
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
    value: getSetting('css_print_method'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('External File', 'generateblocks'),
      value: 'file'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Inline Embedding', 'generateblocks'),
      value: 'inline'
    }],
    onChange: value => {
      setSettings({
        ...settings,
        css_print_method: value
      });
    }
  })), 'file' === getSetting('css_print_method') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    id: "gblocks-regenerate-css",
    className: "gblocks-regenerate-css",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gblocks-action-button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isSecondary: true,
    onClick: e => {
      setIsRegeneratingCSS(true);
      const message = e.target.nextElementSibling;
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/generateblocks/v1/regenerate_css_files',
        method: 'POST'
      }).then(result => {
        setIsRegeneratingCSS(false);
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
  }, isRegeneratingCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !isRegeneratingCSS && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Regenerate CSS Files', 'generateblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gblocks-action-message"
  })))), !!generateBlocksSettings.useV1Blocks && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync Responsive Previews', 'generateblocks'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync our responsive preview controls with the editor responsive previews.', 'generateblocks'),
    checked: getSetting('sync_responsive_previews'),
    onChange: value => {
      setSettings({
        ...settings,
        sync_responsive_previews: value
      });
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable Google Fonts', 'generateblocks'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Prevent Google Fonts from being called on your website and remove them from the font family lists.', 'generateblocks'),
    checked: getSetting('disable_google_fonts'),
    onChange: value => {
      setSettings({
        ...settings,
        disable_google_fonts: value
      });
    }
  }))), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('generateblocks.dashboard.settings', '', {
    settings,
    setSettings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gblocks-action-button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    disabled: isAPISaving,
    onClick: e => updateSettings(e)
  }, isAPISaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), !isAPISaving && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'generateblocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gblocks-action-message"
  })))), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.applyFilters)('generateblocks.dashboard.afterSettings', '', {
    setSettings,
    settings
  })));
}
window.addEventListener('DOMContentLoaded', () => {
  (0,_utils_compatible_render__WEBPACK_IMPORTED_MODULE_6__["default"])(document.getElementById('gblocks-block-default-settings'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Settings, null));
});
/******/ })()
;
//# sourceMappingURL=settings.js.map
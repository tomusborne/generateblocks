/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@edge22/block-styles/dist/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@edge22/block-styles/dist/index.js ***!
  \*********************************************************/
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(globalThis, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 17:
/***/ ((module) => {



// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ 774:
/***/ ((module) => {



// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        continue;
      }

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_3401__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_3401__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_3401__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_3401__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_3401__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_3401__.o(definition, key) && !__nested_webpack_require_3401__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_3401__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_3401__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__nested_webpack_require_3401__.r(__nested_webpack_exports__);

// EXPORTS
__nested_webpack_require_3401__.d(__nested_webpack_exports__, {
  BlockStyles: () => (/* reexport */ BlockStyles),
  getPreviewDevice: () => (/* reexport */ getPreviewDevice),
  useAtRuleEffect: () => (/* reexport */ useAtRuleEffect),
  useCurrentAtRule: () => (/* reexport */ useCurrentAtRule),
  useDeviceType: () => (/* reexport */ useDeviceType),
  useGenerateCSSEffect: () => (/* reexport */ useGenerateCSSEffect),
  useStyleSelectorEffect: () => (/* reexport */ useStyleSelectorEffect),
  useSyncStyles: () => (/* reexport */ useSyncStyles),
  useUpdateEditorCSS: () => (/* reexport */ useUpdateEditorCSS),
  useUpdateEditorCSSEffect: () => (/* reexport */ useUpdateEditorCSSEffect),
  withUniqueId: () => (/* reexport */ withUniqueId)
});

;// CONCATENATED MODULE: external "React"
const external_React_namespaceObject = window["React"];
;// CONCATENATED MODULE: external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// CONCATENATED MODULE: external ["wp","primitives"]
const external_wp_primitives_namespaceObject = window["wp"]["primitives"];
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/cog.js

/**
 * WordPress dependencies
 */

const cog = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  fillRule: "evenodd",
  d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
  clipRule: "evenodd"
}));
/* harmony default export */ const library_cog = (cog);
//# sourceMappingURL=cog.js.map
;// CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/styles.js

/**
 * WordPress dependencies
 */

const styles = (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,external_React_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
  d: "M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z"
}));
/* harmony default export */ const library_styles = (styles);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// CONCATENATED MODULE: external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// CONCATENATED MODULE: external ["wp","data"]
const external_wp_data_namespaceObject = window["wp"]["data"];
;// CONCATENATED MODULE: ./node_modules/clsx/dist/clsx.mjs
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const dist_clsx = (clsx);
;// CONCATENATED MODULE: ./src/editor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const editor_module = ({"settings":"AbFG05AEtpnF5LcM89qw","panel":"pYpRQCoPaDFz6HWiZiXd","styles":"_L3qhCA0Sch4S7sZPGx3"});
;// CONCATENATED MODULE: ./src/BlockStyles.jsx








const TABS_STORAGE_KEY = 'gb-block-styles-tab';
function MultiSelectedNotice() {
  const hasMultiSelectedBlocks = (0,external_wp_data_namespaceObject.useSelect)(select => {
    const selectedBlocks = select('core/block-editor')?.getMultiSelectedBlocks();
    return selectedBlocks && selectedBlocks.length > 0;
  }, []);
  if (!hasMultiSelectedBlocks) {
    return null;
  }
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,external_wp_i18n_namespaceObject.__)('You have multiple blocks selected. Any style changes you make will apply the entire set of styles to all selected blocks, which may overwrite other individual styles.', 'generateblocks'));
}

/**
 * Render the Block styles component that includes StylesBuilder controls and settings.
 *
 * @param {Object}   props             - The component props.
 * @param {Function} props.settingsTab - The settings tab component.
 * @param {Function} props.stylesTab   - The styles tab component.
 * @param {Function} props.onTabSelect - Pass a function that fires when we select a tab.
 * @return {JSX.Element} The rendered block styles component.
 */
function BlockStyles({
  settingsTab = () => null,
  stylesTab = () => null,
  onTabSelect = () => null
}) {
  var _sessionStorage$getIt;
  const tab = (_sessionStorage$getIt = sessionStorage.getItem(TABS_STORAGE_KEY)) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : 'settings';
  const [localTab, setLocalTab] = (0,external_wp_element_namespaceObject.useState)(tab);
  function setTab(tabName) {
    sessionStorage.setItem(TABS_STORAGE_KEY, tabName);
  }
  const tabs = [{
    name: 'settings',
    icon: library_cog,
    title: (0,external_wp_i18n_namespaceObject.__)('Settings', 'generateblocks')
  }, {
    name: 'styles',
    icon: library_styles,
    title: (0,external_wp_i18n_namespaceObject.__)('Styles', 'generateblocks')
  }];
  (0,external_wp_element_namespaceObject.useLayoutEffect)(() => {
    const inspectorControlsWrapper = document.querySelector('.block-editor-block-inspector');
    if (inspectorControlsWrapper) {
      tabs.forEach(tabItem => {
        inspectorControlsWrapper.classList.remove('gb-block-styles-tab--' + tabItem.name);
      });
      inspectorControlsWrapper.classList.add('gb-block-styles-tab--' + localTab);
    }
    return () => {
      inspectorControlsWrapper.classList.remove('gb-block-styles-tab--' + localTab);
    };
  }, [localTab]);
  return (0,external_React_namespaceObject.createElement)(external_wp_components_namespaceObject.TabPanel, {
    className: dist_clsx(editor_module.panel, 'gb-block-styles-tab-panel', editor_module[localTab]),
    activeClass: "is-active",
    onSelect: tabName => {
      setTab(tabName);
      setLocalTab(tabName);
      onTabSelect(tabName);
    },
    initialTabName: localTab,
    tabs: tabs
  }, () => {
    return (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, 'settings' === localTab && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, settingsTab), 'styles' === localTab && (0,external_React_namespaceObject.createElement)(external_React_namespaceObject.Fragment, null, (0,external_React_namespaceObject.createElement)(MultiSelectedNotice, null), stylesTab));
  });
}
;// CONCATENATED MODULE: ./src/utils/getEditorBlocks.js


/**
 * Return the blocks with their inner blocks, handling deep nesting.
 *
 * @return {Array} The blocks array.
 */
function getEditorBlocks() {
  const blocks = (0,external_wp_data_namespaceObject.select)('core/block-editor').getBlocks();

  // Recursive function to extract blocks with inner blocks
  const extractBlocksWithInnerBlocks = blocksToProcess => {
    return blocksToProcess.map(block => {
      if (block.name === 'core/widget-area') {
        // For the widget editor, we need to manually get the inner blocks.
        const innerBlocks = (0,external_wp_data_namespaceObject.select)('core/block-editor').getBlocks(block.clientId);
        return {
          ...block,
          innerBlocks: extractBlocksWithInnerBlocks(innerBlocks) // Recursively extract inner blocks
        };
      }

      // For other blocks, check for inner blocks
      return {
        ...block,
        innerBlocks: extractBlocksWithInnerBlocks(block.innerBlocks || [])
      };
    });
  };
  return extractBlocksWithInnerBlocks(blocks);
}
;// CONCATENATED MODULE: external ["wp","blockEditor"]
const external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
;// CONCATENATED MODULE: ./src/hoc/withUniqueId.js






/**
 * Search all blocks for uniqueIds
 *
 * @param {Array} blocks The blocks array
 * @return {Array} The array of uniqueIds
 */
const getUniqueIdFromBlocks = blocks => blocks.reduce((result, block) => {
  if (block.name && block.name.includes('generateblocks') && block.attributes && block.attributes.uniqueId) {
    result.uniqueIds.push(block.attributes.uniqueId);
    result.clientIds.push(block.clientId);
  }
  if (block.innerBlocks) {
    const {
      uniqueIds,
      clientIds
    } = getUniqueIdFromBlocks(block.innerBlocks);
    result.uniqueIds = result.uniqueIds.concat(uniqueIds);
    result.clientIds = result.clientIds.concat(clientIds);
  }
  return result;
}, {
  uniqueIds: [],
  clientIds: []
});

/**
 * Generates a unique id based on the clientId
 *
 * @param {string} clientId The block clientId
 * @return {string} The uniqueId
 */
const generateUniqueId = clientId => clientId.substr(2, 9).replace('-', '');

/**
 * Checks if the array contains duplicates of the value
 *
 * @param {Array}  arr          The array to check the values
 * @param {any}    value        The value to check if has duplicates
 * @param {number} currentIndex The current index
 * @return {boolean} If the array has duplicates
 */
const hasDuplicates = (arr, value, currentIndex) => arr.filter(el => el === value).length > 1 && currentIndex === arr.lastIndexOf(value);

/**
 * It will enhance a block component with the attributes.uniqueId property
 *
 * @param {any} WrappedComponent The component to add the uniqueId
 * @return {Function} The wrapped component
 */
function withUniqueId(WrappedComponent) {
  return props => {
    const {
      clientId,
      attributes,
      setAttributes
    } = props;
    const {
      wasBlockJustInserted
    } = (0,external_wp_data_namespaceObject.useSelect)(select => ({
      wasBlockJustInserted: select(external_wp_blockEditor_namespaceObject.store).wasBlockJustInserted(clientId)
    }));
    (0,external_wp_element_namespaceObject.useEffect)(() => {
      const editorBlocks = getEditorBlocks();
      const {
        uniqueIds,
        clientIds
      } = getUniqueIdFromBlocks(editorBlocks);
      if (!attributes.uniqueId || hasDuplicates(uniqueIds, attributes.uniqueId, clientIds.indexOf(clientId)) || wasBlockJustInserted) {
        const uniqueId = generateUniqueId(clientId);
        setAttributes({
          uniqueId
        });
      }
    }, [clientId]);
    return (0,external_React_namespaceObject.createElement)(WrappedComponent, {
      ...props
    });
  };
}
;// CONCATENATED MODULE: ./src/utils/getAtRuleId.js
function getAtRuleId(atRuleValue, defaultAtRules = []) {
  var _defaultAtRules$find$;
  return (_defaultAtRules$find$ = defaultAtRules?.find(rule => rule.value === atRuleValue)?.id) !== null && _defaultAtRules$find$ !== void 0 ? _defaultAtRules$find$ : 'all';
}
;// CONCATENATED MODULE: ./src/utils/getPreviewDevice.js

function getPreviewDevice(atRuleValue, deviceType, defaultAtRules) {
  let device = '';
  const atRuleId = getAtRuleId(atRuleValue, defaultAtRules);
  if (('' === atRuleValue || 'largeWidth' === atRuleId || 'mediumLargeWidth' === atRuleId) && 'Desktop' !== deviceType) {
    device = 'Desktop';
  } else if (('mediumWidth' === atRuleId || 'mediumSmallWidth' === atRuleId) && 'Tablet' !== deviceType) {
    device = 'Tablet';
  } else if ('smallWidth' === atRuleId && 'Mobile' !== deviceType) {
    device = 'Mobile';
  }
  return device;
}
;// CONCATENATED MODULE: external ["wp","url"]
const external_wp_url_namespaceObject = window["wp"]["url"];
;// CONCATENATED MODULE: ./src/hooks/useUpdateSettings.jsx


function useUpdateSettings() {
  const isSiteEditor = (0,external_wp_url_namespaceObject.getPath)(window.location.href)?.includes('site-editor.php');
  const store = (0,external_wp_data_namespaceObject.useDispatch)(isSiteEditor ? 'core/edit-site' : 'core/editor');
  return {
    updateSettings: isSiteEditor ? store.updateSettings : store.updateEditorSettings
  };
}
;// CONCATENATED MODULE: ./src/hooks/useGetSettings.jsx


function useGetSettings() {
  return (0,external_wp_data_namespaceObject.useSelect)(() => {
    const isSiteEditor = (0,external_wp_url_namespaceObject.getPath)(window.location.href)?.includes('site-editor.php');
    const store = (0,external_wp_data_namespaceObject.select)(isSiteEditor ? 'core/edit-site' : 'core/editor');
    return {
      getSettings: isSiteEditor ? store.getSettings : store.getEditorSettings
    };
  }, []);
}
;// CONCATENATED MODULE: ./src/hooks/useUpdateEditorCSS.jsx


function useUpdateEditorCSS() {
  const {
    updateSettings
  } = useUpdateSettings();
  const {
    getSettings
  } = useGetSettings();
  return async (selector, css = '') => {
    const editorSettings = getSettings();
    const existingSource = editorSettings?.styles?.find(style => 'gb_block:' + selector === style.source);
    if (existingSource) {
      const existingCSS = editorSettings?.styles?.find(style => 'gb_block:' + selector === style.source)?.css;
      if (existingCSS === css) {
        return;
      }

      // Update the CSS for an existing class.
      updateSettings({
        ...editorSettings,
        styles: editorSettings?.styles.map(style => {
          if ('gb_block:' + selector !== style.source) {
            return style;
          }
          return {
            ...style,
            css
          };
        })
      });
    } else {
      // Create a new style source for a new class.
      updateSettings({
        ...editorSettings,
        styles: [...editorSettings?.styles, {
          css,
          source: 'gb_block:' + selector
        }]
      });
    }
  };
}
;// CONCATENATED MODULE: ./src/utils/getAtRuleValueFromId.js
function getAtRuleValueFromId(atRuleId, defaultAtRules) {
  var _defaultAtRules$find$;
  return (_defaultAtRules$find$ = defaultAtRules.find(rule => rule.id === atRuleId)?.value) !== null && _defaultAtRules$find$ !== void 0 ? _defaultAtRules$find$ : '';
}
;// CONCATENATED MODULE: ./src/hooks/useAtRuleEffect.jsx



/**
 * Custom hook to handle the effect of the atRule based on the previewDeviceType.
 *
 * @param {Object}   props                - The props object.
 * @param {string}   props.deviceType     - The type of device being previewed.
 * @param {string}   props.atRule         - The current value of the atRule.
 * @param {Function} props.setAtRule      - The function to set the atRule value.
 * @param {Array}    props.defaultAtRules - The default atRules.
 */
function useAtRuleEffect({
  deviceType,
  atRule,
  setAtRule,
  defaultAtRules = []
}) {
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    const atRuleId = getAtRuleId(atRule, defaultAtRules);
    switch (deviceType) {
      case 'Desktop':
        if ('' !== atRule && 'largeWidth' !== atRuleId && 'mediumLargeWidth' !== atRuleId) {
          setAtRule('');
        }
        break;
      case 'Tablet':
        if ('mediumWidth' !== atRuleId && 'mediumSmallWidth' !== atRuleId) {
          setAtRule(getAtRuleValueFromId('mediumSmallWidth', defaultAtRules));
        }
        break;
      case 'Mobile':
        if ('smallWidth' !== atRuleId) {
          setAtRule(getAtRuleValueFromId('smallWidth', defaultAtRules));
        }
        break;
      default:
        break;
    }
  }, [deviceType, atRule, setAtRule, getAtRuleId, getAtRuleValueFromId]);
}
;// CONCATENATED MODULE: ./src/hooks/useGenerateCSSEffect.jsx


/**
 * Generate CSS for the block.
 *
 * @param {Object}   props               - The props object.
 * @param {string}   props.selector      - Selector.
 * @param {Object}   props.styles        - Styles.
 * @param {Function} props.setAttributes - Set attributes.
 * @param {Function} props.getCss        - Get CSS.
 */
function useGenerateCSSEffect({
  selector,
  styles,
  setAttributes,
  getCss
}) {
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (null === selector || '' === selector) {
      return;
    }
    (async function () {
      const generateCss = await getCss(selector, styles);
      setAttributes({
        css: generateCss
      });
    })();
  }, [selector, JSON.stringify(styles), setAttributes, getCss]);
}
;// CONCATENATED MODULE: ./src/hooks/useStyleSelectorEffect.jsx


/**
 * Hook that sets the current style when the selector changes.
 *
 * @param {Object}   props                 - The props object.
 * @param {boolean}  props.isSelected      - Whether the block is selected.
 * @param {Object}   props.currentStyle    - The current style.
 * @param {string}   props.selector        - The selector.
 * @param {Function} props.setCurrentStyle - Function to set the current style.
 * @param {Function} props.setNestedRule   - Function to set the nested rule.
 * @param {Function} props.setAtRule       - Function to set the at rule.
 * @param {Function} props.setStyles       - Function to set the styles.
 * @param {Object}   props.styles          - The styles.
 */
function useStyleSelectorEffect({
  isSelected,
  currentStyle,
  selector,
  setCurrentStyle,
  setNestedRule,
  setAtRule,
  setStyles,
  styles
}) {
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (!isSelected) {
      return;
    }
    if (!currentStyle?.selector || selector !== currentStyle?.selector) {
      setCurrentStyle({
        selector
      });
      setNestedRule('');
      setAtRule('');
      setStyles(styles);
    }
  }, [isSelected, currentStyle?.selector, selector, setCurrentStyle, setNestedRule, setAtRule, setStyles, styles]);
}
;// CONCATENATED MODULE: ./src/hooks/useUpdateEditorCSSEffect.jsx



/**
 * Hook that updates the editor CSS.
 *
 * @param {Object}   props                   - The props.
 * @param {string}   props.selector          - CSS selector.
 * @param {boolean}  props.isPreviewingBlock - Whether the block is being previewed.
 * @param {Object}   props.styles            - The styles object.
 * @param {Function} props.getCss            - The function to get the CSS.
 */
function useUpdateEditorCSSEffect({
  selector,
  styles,
  getCss,
  isPreviewingBlock = false
}) {
  const updateEditorCSS = useUpdateEditorCSS();
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    if (!selector) {
      return;
    }
    if (isPreviewingBlock) {
      return;
    }
    (async function () {
      const css = await getCss(selector, styles, 'editor');
      updateEditorCSS(selector, css);
    })();
  }, [styles, selector]);
}
;// CONCATENATED MODULE: ./src/hooks/useDeviceType.jsx

function useDeviceType() {
  const {
    setDeviceType = () => null
  } = (0,external_wp_data_namespaceObject.useDispatch)('core/editor');
  const deviceType = (0,external_wp_data_namespaceObject.useSelect)(select => {
    const {
      getDeviceType = () => 'Desktop'
    } = select('core/editor');
    return getDeviceType();
  }, []);
  return {
    deviceType,
    setDeviceType
  };
}
;// CONCATENATED MODULE: ./src/hooks/useCurrentAtRule.jsx


const mapDevices = {
  Desktop: 'all',
  Tablet: 'mediumSmallWidth',
  Mobile: 'smallWidth'
};
function useCurrentAtRule(defaultAtRules = []) {
  const {
    deviceType
  } = useDeviceType();
  const currentAtRule = (0,external_wp_element_namespaceObject.useMemo)(() => {
    var _defaultAtRules$find$;
    if (!deviceType || 'Desktop' === deviceType) {
      return '';
    }
    const currentId = mapDevices[deviceType];
    return (_defaultAtRules$find$ = defaultAtRules.find(rule => rule.id === currentId)?.value) !== null && _defaultAtRules$find$ !== void 0 ? _defaultAtRules$find$ : '';
  }, [deviceType]);
  return currentAtRule;
}
;// CONCATENATED MODULE: ./node_modules/react-use/esm/useCustomCompareEffect.js

var isPrimitive = function (val) { return val !== Object(val); };
var useCustomCompareEffect = function (effect, deps, depsEqual) {
    if (false) {}
    var ref = (0,external_React_namespaceObject.useRef)(undefined);
    if (!ref.current || !depsEqual(deps, ref.current)) {
        ref.current = deps;
    }
    (0,external_React_namespaceObject.useEffect)(effect, ref.current);
};
/* harmony default export */ const esm_useCustomCompareEffect = (useCustomCompareEffect);

// EXTERNAL MODULE: ./node_modules/fast-deep-equal/react.js
var react = __nested_webpack_require_3401__(774);
var react_default = /*#__PURE__*/__nested_webpack_require_3401__.n(react);
;// CONCATENATED MODULE: ./node_modules/react-use/esm/misc/isDeepEqual.js

/* harmony default export */ const isDeepEqual = ((react_default()));

;// CONCATENATED MODULE: ./node_modules/react-use/esm/useDeepCompareEffect.js


var useDeepCompareEffect_isPrimitive = function (val) { return val !== Object(val); };
var useDeepCompareEffect = function (effect, deps) {
    if (false) {}
    esm_useCustomCompareEffect(effect, deps, isDeepEqual);
};
/* harmony default export */ const esm_useDeepCompareEffect = (useDeepCompareEffect);

// EXTERNAL MODULE: ./node_modules/fast-deep-equal/index.js
var fast_deep_equal = __nested_webpack_require_3401__(17);
var fast_deep_equal_default = /*#__PURE__*/__nested_webpack_require_3401__.n(fast_deep_equal);
;// CONCATENATED MODULE: ./src/hooks/useSyncStyles.jsx



/**
 * Keep our styles store object synced with our styles attribute.
 *
 * @param {Object}   props                 The hook props.
 * @param {Object}   props.stylesAttribute The styles attribute.
 * @param {Object}   props.styles          The styles object from our store.
 * @param {Function} props.setStyles       The setStyles function from our store.
 * @param {boolean}  props.isSelected      Whether the block is selected.
 */
function useSyncStyles({
  stylesAttribute = {},
  styles = {},
  setStyles,
  isSelected
}) {
  esm_useDeepCompareEffect(() => {
    if (!isSelected) {
      return;
    }
    if (!fast_deep_equal_default()(stylesAttribute, styles)) {
      setStyles(stylesAttribute);
    }
  }, [stylesAttribute, setStyles]);
}
;// CONCATENATED MODULE: ./src/index.js





})();

/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map

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
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/@edge22/block-styles/dist/index.js");
/******/ 	(window.gb = window.gb || {}).blockStyles = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=block-styles.js.map
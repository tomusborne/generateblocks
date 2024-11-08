/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor/disable-blocks.js":
/*!**************************************!*\
  !*** ./src/editor/disable-blocks.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);

const v1Blocks = ['generateblocks/button', 'generateblocks/headline', 'generateblocks/container', 'generateblocks/grid', 'generateblocks/image', 'generateblocks/query-loop'];
function disableBlocks(settings, name) {
  const useV1Blocks = generateBlocksEditor.useV1Blocks;

  // Disable our version 1 blocks.
  if (v1Blocks.includes(name) && !useV1Blocks) {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        inserter: false
      }
    };
  }

  // Disable our new blocks if legacy blocks are enabled.
  if (!v1Blocks.includes(name) && name.startsWith('generateblocks') && useV1Blocks) {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        inserter: false
      }
    };
  }
  return settings;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'generateblocks/disableBlocks', disableBlocks);

/***/ }),

/***/ "./src/editor/global-max-width.js":
/*!****************************************!*\
  !*** ./src/editor/global-max-width.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);




function GlobeIcon({
  size,
  ...props
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 256 256",
    width: size ? size : 24,
    height: size ? size : 24,
    "aria-hidden": "true",
    focusable: "false",
    ...props
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    width: "256",
    height: "256",
    fill: "none"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
    x1: "32",
    y1: "128",
    x2: "224",
    y2: "128",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "12"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "128",
    cy: "128",
    r: "96",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "12"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "12"
  }));
}
function GlobalMaxWidthButton({
  value,
  onChange
}) {
  const valueKey = 'var(--gb-container-width)';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    text: valueKey === value ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove global max-width', 'generateblocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set global max-width', 'generateblocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobeIcon, null),
    variant: valueKey === value ? 'primary' : '',
    onClick: () => {
      if (valueKey === value) {
        onChange('');
      } else {
        onChange(valueKey);
      }
    }
  }));
}
function addGlobalMaxWidth(componentProps, data) {
  if ('maxWidth' !== data.cssProp) {
    return componentProps;
  }
  return {
    ...componentProps,
    overrideAction: onChange => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalMaxWidthButton, {
      value: componentProps.value,
      onChange: onChange
    }),
    disabled: 'var(--gb-container-width)' === componentProps.value ? true : componentProps.disabled
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('generateblocks.control.props', 'generateblocks/add-global-max-width', addGlobalMaxWidth);

/***/ }),

/***/ "./src/editor/index.js":
/*!*****************************!*\
  !*** ./src/editor/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores.js */ "./src/editor/stores.js");
/* harmony import */ var _disable_blocks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./disable-blocks.js */ "./src/editor/disable-blocks.js");
/* harmony import */ var _toolbar_appenders_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toolbar-appenders.js */ "./src/editor/toolbar-appenders.js");
/* harmony import */ var _global_max_width_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global-max-width.js */ "./src/editor/global-max-width.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor/editor.scss");






_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const searchParam = new URLSearchParams(window.location.search);
  searchParam.delete('gb-styles-search');
  window.history.replaceState(null, '', `${window.location.pathname}?${searchParam.toString()}`);
});

/***/ }),

/***/ "./src/editor/stores.js":
/*!******************************!*\
  !*** ./src/editor/stores.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_block_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/block-styles */ "./src/store/block-styles.js");


(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_store_block_styles__WEBPACK_IMPORTED_MODULE_1__.currentStyleStore);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_store_block_styles__WEBPACK_IMPORTED_MODULE_1__.stylesStore);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_store_block_styles__WEBPACK_IMPORTED_MODULE_1__.atRuleStore);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_store_block_styles__WEBPACK_IMPORTED_MODULE_1__.nestedRuleStore);

/***/ }),

/***/ "./src/editor/toolbar-appenders.js":
/*!*****************************************!*\
  !*** ./src/editor/toolbar-appenders.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks_useInnerBlocksCount__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @hooks/useInnerBlocksCount */ "./src/hooks/useInnerBlocksCount.js");










function AddInnerContainerIcon() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z",
    style: {
      fillOpacity: 0.5
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1.993,9L7.701,9L7.701,10.268L1.993,10.268L1.993,9ZM14.993,13.439L13.725,13.439L13.725,10.268L10.554,10.268L10.554,9L14.359,9C14.709,9 14.993,9.284 14.993,9.634L14.993,13.439ZM13.725,16.292L14.993,16.292L14.993,22L13.725,22L13.725,16.292Z",
    style: {
      fillRule: 'nonzero'
    }
  }));
}
function AddOuterContainerIcon() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M21.375,22L17.625,22L17.625,20.75L20.75,20.75L20.75,17.625L22,17.625L22,21.375C22,21.72 21.72,22 21.375,22ZM9.188,20.75L14.813,20.75L14.813,22L9.188,22L9.188,20.75ZM6.375,22L2.625,22C2.282,22 2,21.718 2,21.375L2,17.625L3.25,17.625L3.25,20.75L6.375,20.75L6.375,22ZM2,9.187L3.25,9.187L3.25,14.812L2,14.812L2,9.187ZM3.25,6.375L2,6.375L2,2.625C2,2.28 2.28,2 2.625,2L6.375,2L6.375,3.25L3.25,3.25L3.25,6.375ZM9.188,2L14.813,2L14.813,3.25L9.188,3.25L9.188,2ZM22,6.375L20.75,6.375L20.75,3.25L17.625,3.25L17.625,2L21.375,2C21.72,2 22,2.28 22,2.625L22,6.375ZM20.75,9.187L22,9.187L22,14.812L20.75,14.812L20.75,9.187Z",
    style: {
      fillRule: 'nonzero'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"
  }));
}
const withToolbarAppenders = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      name
    } = props;
    const {
      getBlocksByClientId,
      getSelectedBlockClientIds,
      getBlockRootClientId
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/block-editor'), []);
    const {
      replaceBlocks,
      insertBlocks
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');
    const clientIds = getSelectedBlockClientIds();
    const clientId = clientIds.length ? clientIds[0] : props.clientId;
    const innerBlocksCount = (0,_hooks_useInnerBlocksCount__WEBPACK_IMPORTED_MODULE_9__["default"])(clientId);
    const blocksSelection = getBlocksByClientId(clientIds);
    const hasParentBlock = getBlockRootClientId(clientId);
    const useV1Blocks = generateBlocksEditor.useV1Blocks;
    if (useV1Blocks) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    const onConvertToContainer = () => {
      if (!blocksSelection.length) {
        return;
      }
      const newChildBlocks = blocksSelection.map(block => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlock)(block.name, block.attributes, block.innerBlocks);
      });
      const newBlocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlock)('generateblocks/element', {}, newChildBlocks);
      if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEmpty)(newBlocks)) {
        replaceBlocks(clientIds, newBlocks);
      }
    };
    let buttons = '';
    if ('generateblocks/element' === name && !hasParentBlock && 0 === innerBlocksCount && 1 === clientIds.length) {
      buttons = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, buttons, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
        icon: AddInnerContainerIcon,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Inner Container', 'generateblocks'),
        onClick: () => {
          insertBlocks((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlock)('generateblocks/element', {
            styles: {
              maxWidth: 'var(--gb-container-width)',
              marginLeft: 'auto',
              marginRight: 'auto'
            }
          }), undefined, clientId);
        },
        showTooltip: true
      }));
    }
    buttons = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, buttons, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
      icon: AddOuterContainerIcon,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add to Container', 'generateblocks'),
      onClick: () => onConvertToContainer('')
    }));
    buttons = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.applyFilters)('generateblocks.editor.toolbarAppenders', buttons, props);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !!buttons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.BlockControls, {
      group: "parent"
    }, buttons), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }));
  };
}, 'withToolbarAppenders');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'generateblocks/blockControls/containerAppenders', withToolbarAppenders);

/***/ }),

/***/ "./src/hooks/useInnerBlocksCount.js":
/*!******************************************!*\
  !*** ./src/hooks/useInnerBlocksCount.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientId => {
  const block = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    return select('core/block-editor').getBlock(clientId);
  });
  return block ? block.innerBlocks.length : 0;
});

/***/ }),

/***/ "./src/store/block-styles.js":
/*!***********************************!*\
  !*** ./src/store/block-styles.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   atRuleStore: () => (/* binding */ atRuleStore),
/* harmony export */   currentStyleStore: () => (/* binding */ currentStyleStore),
/* harmony export */   nestedRuleStore: () => (/* binding */ nestedRuleStore),
/* harmony export */   stylesStore: () => (/* binding */ stylesStore)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @edge22/styles-builder */ "@edge22/styles-builder");
/* harmony import */ var _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__);


const currentStyleStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('gb-block-styles-current-style', {
  reducer: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.currentStyleReducer,
  actions: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.currentStyleActions,
  selectors: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.currentStyleSelectors
});
const atRuleStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('gb-block-styles-at-rule', {
  reducer: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.atRuleReducer,
  actions: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.atRuleActions,
  selectors: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.atRuleSelectors
});
const nestedRuleStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('gb-block-styles-nested-rule', {
  reducer: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.nestedRuleReducer,
  actions: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.nestedRuleActions,
  selectors: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.nestedRuleSelectors
});
const stylesStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('gb-block-styles', {
  reducer: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.styleReducer,
  actions: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.styleActions,
  selectors: _edge22_styles_builder__WEBPACK_IMPORTED_MODULE_1__.styleSelectors
});

/***/ }),

/***/ "./src/editor/editor.scss":
/*!********************************!*\
  !*** ./src/editor/editor.scss ***!
  \********************************/
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

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "@edge22/styles-builder":
/*!***************************************!*\
  !*** external ["gb","stylesBuilder"] ***!
  \***************************************/
/***/ ((module) => {

module.exports = window["gb"]["stylesBuilder"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

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
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor/index.js */ "./src/editor/index.js");

/******/ })()
;
//# sourceMappingURL=editor.js.map
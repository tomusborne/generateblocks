(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var r=e.n(t);const o=window.wp.data,n=window.gb.stylesBuilder,l=(0,o.createReduxStore)("gb-block-styles-current-style",{reducer:n.currentStyleReducer,actions:n.currentStyleActions,selectors:n.currentStyleSelectors}),c=(0,o.createReduxStore)("gb-block-styles-at-rule",{reducer:n.atRuleReducer,actions:n.atRuleActions,selectors:n.atRuleSelectors}),s=(0,o.createReduxStore)("gb-block-styles-nested-rule",{reducer:n.nestedRuleReducer,actions:n.nestedRuleActions,selectors:n.nestedRuleSelectors}),a=(0,o.createReduxStore)("gb-block-styles",{reducer:n.styleReducer,actions:n.styleActions,selectors:n.styleSelectors});(0,o.register)(l),(0,o.register)(a),(0,o.register)(c),(0,o.register)(s);const i=window.wp.hooks,L=["generateblocks/button","generateblocks/headline","generateblocks/container","generateblocks/grid","generateblocks/image","generateblocks/query-loop"];(0,i.addFilter)("blocks.registerBlockType","generateblocks/disableBlocks",(function(e,t){const r=generateBlocksEditor.useV1Blocks;return L.includes(t)&&!r||!L.includes(t)&&t.startsWith("generateblocks")&&r?{...e,supports:{...e.supports,inserter:!1}}:e}));const d=window.React,u=window.wp.components,g=window.wp.i18n,w=window.wp.blocks,k=window.wp.compose,b=window.wp.blockEditor,p=window.lodash;function m(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z",style:{fillOpacity:.5}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}),(0,d.createElement)("path",{d:"M1.993,9L7.701,9L7.701,10.268L1.993,10.268L1.993,9ZM14.993,13.439L13.725,13.439L13.725,10.268L10.554,10.268L10.554,9L14.359,9C14.709,9 14.993,9.284 14.993,9.634L14.993,13.439ZM13.725,16.292L14.993,16.292L14.993,22L13.725,22L13.725,16.292Z",style:{fillRule:"nonzero"}}))}function h(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M21.375,22L17.625,22L17.625,20.75L20.75,20.75L20.75,17.625L22,17.625L22,21.375C22,21.72 21.72,22 21.375,22ZM9.188,20.75L14.813,20.75L14.813,22L9.188,22L9.188,20.75ZM6.375,22L2.625,22C2.282,22 2,21.718 2,21.375L2,17.625L3.25,17.625L3.25,20.75L6.375,20.75L6.375,22ZM2,9.187L3.25,9.187L3.25,14.812L2,14.812L2,9.187ZM3.25,6.375L2,6.375L2,2.625C2,2.28 2.28,2 2.625,2L6.375,2L6.375,3.25L3.25,3.25L3.25,6.375ZM9.188,2L14.813,2L14.813,3.25L9.188,3.25L9.188,2ZM22,6.375L20.75,6.375L20.75,3.25L17.625,3.25L17.625,2L21.375,2C21.72,2 22,2.28 22,2.625L22,6.375ZM20.75,9.187L22,9.187L22,14.812L20.75,14.812L20.75,9.187Z",style:{fillRule:"nonzero"}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}))}const y=(0,k.createHigherOrderComponent)((e=>t=>{const{name:r}=t,{getBlocksByClientId:n,getSelectedBlockClientIds:l,getBlockRootClientId:c}=(0,o.useSelect)((e=>e("core/block-editor")),[]),{replaceBlocks:s,insertBlocks:a}=(0,o.useDispatch)("core/block-editor"),L=l(),k=L.length?L[0]:t.clientId,y=(e=>{const t=(0,o.useSelect)((t=>t("core/block-editor").getBlock(e)));return t?t.innerBlocks.length:0})(k),B=n(L),R=c(k);if(generateBlocksEditor.useV1Blocks)return(0,d.createElement)(e,{...t});let E="";return"generateblocks/element"!==r||R||0!==y||1!==L.length||(E=(0,d.createElement)(d.Fragment,null,E,(0,d.createElement)(u.ToolbarButton,{icon:m,label:(0,g.__)("Add Inner Container","generateblocks"),onClick:()=>{a((0,w.createBlock)("generateblocks/element",{styles:{maxWidth:"var(--gb-container-width)",marginLeft:"auto",marginRight:"auto"}}),void 0,k)},showTooltip:!0}))),E=(0,d.createElement)(d.Fragment,null,E,(0,d.createElement)(u.ToolbarButton,{icon:h,label:(0,g.__)("Add to Container","generateblocks"),onClick:()=>(()=>{if(!B.length)return;const e=B.map((e=>(0,w.createBlock)(e.name,e.attributes,e.innerBlocks))),t=(0,w.createBlock)("generateblocks/element",{},e);(0,p.isEmpty)(t)||s(L,t)})()})),E=(0,i.applyFilters)("generateblocks.editor.toolbarAppenders",E,t),(0,d.createElement)(d.Fragment,null,!!E&&(0,d.createElement)(b.BlockControls,{group:"parent"},E),(0,d.createElement)(e,{...t}))}),"withToolbarAppenders");(0,i.addFilter)("editor.BlockEdit","generateblocks/blockControls/containerAppenders",y),r()((()=>{const e=new URLSearchParams(window.location.search);e.delete("gb-styles-search"),window.history.replaceState(null,"",`${window.location.pathname}?${e.toString()}`)}))})();
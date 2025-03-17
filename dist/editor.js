(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var n=e.n(t);const o=window.wp.data,r=window.gb.stylesBuilder,l=(0,o.createReduxStore)("gb-block-styles-current-style",{reducer:r.currentStyleReducer,actions:r.currentStyleActions,selectors:r.currentStyleSelectors}),c=(0,o.createReduxStore)("gb-block-styles-at-rule",{reducer:r.atRuleReducer,actions:r.atRuleActions,selectors:r.atRuleSelectors}),a=(0,o.createReduxStore)("gb-block-styles-nested-rule",{reducer:r.nestedRuleReducer,actions:r.nestedRuleActions,selectors:r.nestedRuleSelectors});(0,o.register)(l),(0,o.register)(c),(0,o.register)(a);const s=window.wp.hooks,i=["generateblocks/button","generateblocks/headline","generateblocks/container","generateblocks/grid","generateblocks/image","generateblocks/query-loop"];(0,s.addFilter)("blocks.registerBlockType","generateblocks/disableBlocks",(function(e,t){const n=generateBlocksEditor.useV1Blocks;return i.includes(t)&&!n||!i.includes(t)&&t.startsWith("generateblocks")&&n?{...e,supports:{...e.supports,inserter:!1}}:e}));const d=window.React,u=window.wp.components,L=window.wp.i18n,g=window.wp.blocks,m=window.wp.compose,p=window.wp.blockEditor,b=window.lodash;function h(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z",style:{fillOpacity:.5}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}),(0,d.createElement)("path",{d:"M1.993,9L7.701,9L7.701,10.268L1.993,10.268L1.993,9ZM14.993,13.439L13.725,13.439L13.725,10.268L10.554,10.268L10.554,9L14.359,9C14.709,9 14.993,9.284 14.993,9.634L14.993,13.439ZM13.725,16.292L14.993,16.292L14.993,22L13.725,22L13.725,16.292Z",style:{fillRule:"nonzero"}}))}function k(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M21.375,22L17.625,22L17.625,20.75L20.75,20.75L20.75,17.625L22,17.625L22,21.375C22,21.72 21.72,22 21.375,22ZM9.188,20.75L14.813,20.75L14.813,22L9.188,22L9.188,20.75ZM6.375,22L2.625,22C2.282,22 2,21.718 2,21.375L2,17.625L3.25,17.625L3.25,20.75L6.375,20.75L6.375,22ZM2,9.187L3.25,9.187L3.25,14.812L2,14.812L2,9.187ZM3.25,6.375L2,6.375L2,2.625C2,2.28 2.28,2 2.625,2L6.375,2L6.375,3.25L3.25,3.25L3.25,6.375ZM9.188,2L14.813,2L14.813,3.25L9.188,3.25L9.188,2ZM22,6.375L20.75,6.375L20.75,3.25L17.625,3.25L17.625,2L21.375,2C21.72,2 22,2.28 22,2.625L22,6.375ZM20.75,9.187L22,9.187L22,14.812L20.75,14.812L20.75,9.187Z",style:{fillRule:"nonzero"}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}))}const w=(0,m.createHigherOrderComponent)((e=>t=>{const{name:n}=t,{getBlocksByClientId:r,getSelectedBlockClientIds:l,getBlockRootClientId:c}=(0,o.useSelect)((e=>e("core/block-editor")),[]),{replaceBlocks:a,insertBlocks:i}=(0,o.useDispatch)("core/block-editor"),m=l(),w=m.length?m[0]:t.clientId,y=(e=>{const t=(0,o.useSelect)((t=>t("core/block-editor").getBlock(e)));return t?t.innerBlocks.length:0})(w),v=r(m),f=c(w);if(generateBlocksEditor.useV1Blocks)return(0,d.createElement)(e,{...t});let R="";return"generateblocks/element"!==n||f||0!==y||1!==m.length||(R=(0,d.createElement)(d.Fragment,null,R,(0,d.createElement)(u.ToolbarButton,{icon:h,label:(0,L.__)("Add Inner Container","generateblocks"),onClick:()=>{i((0,g.createBlock)("generateblocks/element",{styles:{maxWidth:"var(--gb-container-width)",marginLeft:"auto",marginRight:"auto"}}),void 0,w)},showTooltip:!0}))),R=(0,d.createElement)(d.Fragment,null,R,(0,d.createElement)(u.ToolbarButton,{icon:k,label:(0,L.__)("Add to Container","generateblocks"),onClick:()=>(()=>{if(!v.length)return;const e=v.map((e=>(0,g.createBlock)(e.name,e.attributes,e.innerBlocks))),t=(0,g.createBlock)("generateblocks/element",{},e);(0,b.isEmpty)(t)||a(m,t)})()})),R=(0,s.applyFilters)("generateblocks.editor.toolbarAppenders",R,t),(0,d.createElement)(d.Fragment,null,!!R&&(0,d.createElement)(p.BlockControls,{group:"parent"},R),(0,d.createElement)(e,{...t}))}),"withToolbarAppenders");function y({size:e,...t}){return(0,d.createElement)("svg",{viewBox:"0 0 256 256",width:e||24,height:e||24,"aria-hidden":"true",focusable:"false",...t},(0,d.createElement)("rect",{width:"256",height:"256",fill:"none"}),(0,d.createElement)("line",{x1:"32",y1:"128",x2:"224",y2:"128",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),(0,d.createElement)("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),(0,d.createElement)("path",{d:"M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))}function v({value:e,onChange:t}){const n="var(--gb-container-width)";return(0,d.createElement)(u.Tooltip,{text:n===e?(0,L.__)("Remove global max-width","generateblocks"):(0,L.__)("Set global max-width","generateblocks")},(0,d.createElement)(u.Button,{icon:(0,d.createElement)(y,null),variant:n===e?"primary":"",onClick:()=>{t(n===e?"":n)}}))}(0,s.addFilter)("editor.BlockEdit","generateblocks/blockControls/containerAppenders",w),(0,s.addFilter)("generateblocks.control.props","generateblocks/add-global-max-width",(function(e,t){return"maxWidth"!==t.cssProp?e:{...e,overrideAction:t=>(0,d.createElement)(v,{value:e.value,onChange:t}),disabled:"var(--gb-container-width)"===e.value||e.disabled}}));const f=window.wp.apiFetch;var R=e.n(f);const E={};(0,s.addFilter)("generateblocks.editor.htmlAttributes.style","generateblocks/styleWithReplacements",(async(e,t)=>{const{context:n,clientId:o}=t;if("enabled"!==generateBlocksEditor?.dynamicTagsPreview)return e;if(!e.includes("{{")||!e)return e;const r=function(e,t){const{"generateblocks/loopIndex":n,postId:o}=t;let r="";return n&&(r+=`${n}_`),o&&(r+=`${o}_`),r+=e,r}(o,n);if(E[r]||(E[r]={}),E[r][e])return E[r][e];const l=await async function({content:e,context:t={},clientId:n}){try{return await R()({path:"/generateblocks/v1/dynamic-tag-replacements",method:"POST",data:{content:e,context:(0,s.applyFilters)("generateblocks.editor.preview.context",t,{content:e,clientId:n}),clientId:n}})}catch(e){return console.error("Error fetching data:",e),""}}({content:e,context:n,clientId:o});if(!l.length)return e;const c=l.reduce(((e,{original:t,replacement:n,fallback:o})=>n?e.replaceAll(t,n):e.replaceAll(t,o)),e)||e;return E[r][e]=c,c}));const C=window.wp.element,B=(0,C.memo)((function({getStyleValue:e,currentAtRule:t,onStyleChange:n,attributes:o}){const{tagName:l,icon:c}=o,a=(0,C.useMemo)((()=>function({tagName:e,icon:t}){const n=[{name:"Text",property:"color",colors:[{name:"Static",nestedRule:""},{name:"Hover",nestedRule:"&:hover"},{name:"Hover & Focus",nestedRule:"&:is(:hover, :focus)"}]},{name:"Background",property:"backgroundColor",colors:[{name:"Static",nestedRule:""},{name:"Hover",nestedRule:"&:hover"},{name:"Hover & Focus",nestedRule:"&:is(:hover, :focus)"}]}];return"a"!==e&&n.push({name:"Links",property:"color",colors:[{name:"Static",nestedRule:"a"},{name:"Hover",nestedRule:"a:hover"},{name:"Hover & Focus",nestedRule:"a:is(:hover, :focus)"}]}),t&&n.push({name:"Icon",property:"color",colors:[{name:"Static",nestedRule:".gb-shape svg"},{name:"Hover",nestedRule:"&:hover > .gb-shape svg"},{name:"Hover & Focus",nestedRule:"&:is(:hover, :focus) > .gb-shape svg"}]}),n}({tagName:l,icon:c})),[l,c]),s=(0,C.useCallback)((0,m.debounce)(((e,t,o,r)=>{n(e,t,o,r)}),250),[n]),{baseControlProps:i}=(0,u.useBaseControlProps)({label:(0,L.__)("Colors","generateblocks")});return(0,d.createElement)(u.BaseControl,{...i},a.map((n=>(0,d.createElement)("div",{key:n.name,className:"gb-color-shortcuts"},(0,d.createElement)("div",{className:"gb-color-shortcuts__label"},n.name),n.colors.map((o=>(0,d.createElement)(r.ColorPicker,{key:o.nestedRule,tooltip:o.name,value:e(n.property,t,o.nestedRule),onChange:e=>{s(n.property,e,t,o.nestedRule)}})))))))}));(0,s.addFilter)("generateblocks.blockSettings.openPanel","generateblocks/editor/design-shortcuts",(function(e,t){const{panelId:n="",onStyleChange:o=()=>null,getStyleValue:r=()=>null,attributes:l={},currentAtRule:c=""}=t;return"colors"!==n?e:(0,d.createElement)(B,{onStyleChange:o,getStyleValue:r,currentAtRule:c,attributes:l})})),n()((()=>{const e=new URLSearchParams(window.location.search);e.delete("gb-styles-search"),window.history.replaceState(null,"",`${window.location.pathname}?${e.toString()}`)}))})();
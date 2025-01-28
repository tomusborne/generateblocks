(()=>{var e={758:e=>{var t;globalThis,t=()=>(()=>{"use strict";var e={17:e=>{e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var r,o,s;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(o=r;0!=o--;)if(!e(t[o],n[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(s=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(o=r;0!=o--;)if(!Object.prototype.hasOwnProperty.call(n,s[o]))return!1;for(o=r;0!=o--;){var l=s[o];if(!e(t[l],n[l]))return!1}return!0}return t!=t&&n!=n}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{n.r(r),n.d(r,{BlockStyles:()=>b,Style:()=>S,buildChangedStylesObject:()=>E,getPreviewDevice:()=>I,getSelector:()=>A,useAtRuleEffect:()=>O,useCurrentAtRule:()=>T,useDecodeStyleKeys:()=>z,useDeviceType:()=>x,useGenerateCSSEffect:()=>j,useSetStyles:()=>C,useStyleSelectorEffect:()=>q,withUniqueId:()=>k});const e=window.React,t=window.wp.components,o=window.wp.primitives,s=(0,e.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(o.Path,{fillRule:"evenodd",d:"M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",clipRule:"evenodd"})),l=(0,e.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(o.Path,{d:"M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z"})),c=window.wp.element,i=window.wp.i18n;function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}const u=function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r},d={settings:"nVb5RLNRoywaXGdbfaVM",panel:"rWPlvjpNHbEoLelRk7YA",styles:"o7NMAl2O6VwgE3M0gJOK"},f="gb-block-styles-tab";function b({settingsTab:n=()=>null,stylesTab:r=()=>null,onTabSelect:o=()=>null}){var a;const b=null!==(a=sessionStorage.getItem(f))&&void 0!==a?a:"settings",[p,g]=(0,c.useState)(b),m=(0,c.useMemo)((()=>[{name:"settings",icon:s,title:(0,i.__)("Settings","generateblocks")},{name:"styles",icon:l,title:(0,i.__)("Styles","generateblocks")}]),[]);return(0,e.createElement)(t.TabPanel,{className:u(d.panel,"gb-block-styles-tab-panel",d[p]),activeClass:"is-active",onSelect:e=>{!function(e){sessionStorage.setItem(f,e)}(e),g(e),o(e)},initialTabName:p,tabs:m},(()=>(0,e.createElement)(e.Fragment,null,"settings"===p&&(0,e.createElement)(e.Fragment,null,n),"styles"===p&&(0,e.createElement)(e.Fragment,null,r))))}const p=window.wp.data,g=e=>e.reduce(((e,t)=>{if(t.name&&t.name.includes("generateblocks")&&t.attributes&&t.attributes.uniqueId&&(e.uniqueIds.push(t.attributes.uniqueId),e.clientIds.push(t.clientId)),t.innerBlocks){const{uniqueIds:n,clientIds:r}=g(t.innerBlocks);e.uniqueIds=e.uniqueIds.concat(n),e.clientIds=e.clientIds.concat(r)}return e}),{uniqueIds:[],clientIds:[]}),m=e=>e.substr(2,9).replace("-",""),y=(e,t,n)=>e.filter((e=>e===t)).length>1&&n===e.lastIndexOf(t);function k(t){return n=>{const{clientId:r,attributes:o,setAttributes:s}=n;return(0,c.useEffect)((()=>{const e=function(){const e=(0,p.select)("core/block-editor").getBlocks(),t=e=>e.map((e=>{if("core/widget-area"===e.name){const n=(0,p.select)("core/block-editor").getBlocks(e.clientId);return{...e,innerBlocks:t(n)}}return{...e,innerBlocks:t(e.innerBlocks||[])}}));return t(e)}(),{uniqueIds:t,clientIds:n}=g(e);if(!o.uniqueId||y(t,o.uniqueId,n.indexOf(r))){const e=m(r);s({uniqueId:e})}}),[r]),(0,e.createElement)(t,{...n})}}const v=window.wp.hooks;function w({editorCss:t,id:n}){return t?(0,e.createElement)("style",{id:n},t):null}function S({selector:t,styles:n,getCss:r,clientId:o,name:s}){const l=(0,c.useMemo)((()=>t.replace(".","")),[t]),[i,a]=(0,c.useState)(""),[u,d]=(0,c.useState)(null);(0,c.useEffect)((()=>{const e=document.querySelector('iframe[name="editor-canvas"]')?.contentDocument||document,t=e.querySelector(".is-root-container");let n=null;t&&(n=e.getElementById("generateblocks-block-styles"),n||(n=e.createElement("div"),n.style.display="none",n.id="generateblocks-block-styles",t.insertBefore(n,t.firstChild)),d(n))}),[]),(0,c.useEffect)((()=>{if(!t)return;let e=!0;return(async()=>{try{const o=await r(t,n,"editor");e&&a(o)}catch(e){console.error("Failed to fetch CSS:",e)}})(),()=>{e=!1}}),[n,t,r]);const f=(0,v.applyFilters)("generateblocks.editor.blockCss",i,{clientId:o,name:s});return u?(0,c.createPortal)((0,e.createElement)(w,{editorCss:f,id:l}),u):(0,e.createElement)(w,{editorCss:f,id:l})}function h(e,t=[]){var n;return null!==(n=t?.find((t=>t.value===e))?.id)&&void 0!==n?n:"all"}function I(e,t,n){let r="";const o=h(e,n);return""!==e&&"largeWidth"!==o&&"mediumLargeWidth"!==o||"Desktop"===t?"mediumWidth"!==o&&"mediumSmallWidth"!==o||"Tablet"===t?"smallWidth"===o&&"Mobile"!==t&&(r="Mobile"):r="Tablet":r="Desktop",r}function E(e,t,n){return t&&n?{[n]:{[t]:e}}:t?{[t]:e}:n?{[n]:e}:e}function A(e,t){const n={"generateblocks/text":"text","generateblocks/element":"element","generateblocks/loop-item":"loop-item","generateblocks/looper":"looper","generateblocks/media":"media","generateblocks/query":"query","generateblocks/query-page-numbers":"query-page-numbers","generateblocks/shape":"shape","generateblocks-pro/accordion":"accordion","generateblocks-pro/accordion-item":"accordion__item","generateblocks-pro/accordion-toggle":"accordion__toggle","generateblocks-pro/accordion-toggle-icon":"accordion__toggle-icon","generateblocks-pro/accordion-content":"accordion__content","generateblocks-pro/tab-item":"tabs__item","generateblocks-pro/tab-items":"tabs__items","generateblocks-pro/tab-menu-item":"tabs__menu-item","generateblocks-pro/tabs":"tabs","generateblocks-pro/tabs-menu":"tabs__menu"};if(n[e])return`.gb-${n[e]}-${t}`}function _(e,t){var n;return null!==(n=t.find((t=>t.id===e))?.value)&&void 0!==n?n:""}function O({deviceType:e,atRule:t,setAtRule:n,defaultAtRules:r=[],isSelected:o}){(0,c.useEffect)((()=>{if(!o)return;let s;switch(e){case"Desktop":s="";break;case"Tablet":s="mediumSmallWidth";break;case"Mobile":s="smallWidth";break;default:return}h(t,r)!==s&&n(_(s,r))}),[e,t,n,h,_,r,o])}function j({selector:e,styles:t,setAttributes:n,getCss:r,getSelector:o}){const s=(0,p.useSelect)((e=>e("core/block-editor")?.getMultiSelectedBlocks()||[]),[]),{updateBlockAttributes:l}=(0,p.useDispatch)("core/block-editor"),i=(0,c.useMemo)((()=>t),[JSON.stringify(t)]);(0,c.useEffect)((()=>{if(null===e||""===e)return;let c=!0;return async function(){if(Array.isArray(s)&&s.length>0){const e=s.map((async e=>{const t=o(e?.name,e?.attributes?.uniqueId);if(!t)return;const n=await r(t,e?.attributes?.styles);return{clientId:e.clientId,blockAttrs:{css:n}}})),t=(await Promise.all(e)).filter(Boolean);if(c){const e=t.map((e=>e.clientId)),n=t.reduce(((e,t)=>(e[t.clientId]=t.blockAttrs,e)),{});l(e,n,!0)}return}const i=await r(e,t);c&&n({css:i})}(),()=>{c=!1}}),[e,i,n,r])}function q({isSelected:e,currentStyle:t,selector:n,setCurrentStyle:r,setNestedRule:o}){(0,c.useEffect)((()=>{e&&(t?.selector&&n===t?.selector||(r({selector:n}),o("")))}),[e,t?.selector,n,r,o])}function x(){const{setDeviceType:e=()=>null}=(0,p.useDispatch)("core/editor");return{deviceType:(0,p.useSelect)((e=>{const{getDeviceType:t=()=>"Desktop"}=e("core/editor");return t()}),[]),setDeviceType:e}}const M={Desktop:"all",Tablet:"mediumSmallWidth",Mobile:"smallWidth"};function T(e=[]){const{deviceType:t}=x();return(0,c.useMemo)((()=>{var n;if(!t||"Desktop"===t)return"";const r=M[t];return null!==(n=e.find((e=>e.id===r))?.value)&&void 0!==n?n:""}),[t])}function B(e,...t){if(!t.length)return e;const n=t.shift();if(D(e)&&D(n))for(const t in n)D(n[t])?(e[t]||Object.assign(e,{[t]:{}}),B(e[t],n[t])):Object.assign(e,{[t]:n[t]});return B(e,...t)}function D(e){return e&&"object"==typeof e&&!Array.isArray(e)}function C(e,{cleanStylesObject:t}){const{setAttributes:n,clientId:r}=e,o=(0,p.useSelect)((e=>e("core/block-editor")?.getMultiSelectedBlocks()||[]),[]),s=(0,p.useSelect)((e=>e("core/block-editor")?.getBlock),[]),{updateBlockAttributes:l}=(0,p.useDispatch)("core/block-editor");return function(e){if(Array.isArray(o)&&o.length>0){const n=o.map((n=>{const r=s(n?.clientId)?.attributes?.styles,o=t(B({...r},e));return{clientId:n.clientId,blockAttrs:{styles:o}}})),r=n.map((e=>e.clientId)),c=n.reduce(((e,t)=>(e[t.clientId]=t.blockAttrs,e)),{});return void l(r,c,!0)}const c=s(r)?.attributes?.styles,i=t(B({...c},e));n({styles:i})}}const P=window.wp.blockEditor,R=window.wp.htmlEntities,W=new Set(["amp;","lt;","gt;","quot;","apos;","#39;"]);function N(e){return"object"!=typeof e||null===e?e:Object.entries(e).reduce(((e,[t,n])=>(e[(0,R.decodeEntities)(t)]="object"==typeof n?N(n):n,e)),{})}var V=n(17),F=n.n(V);function z({styles:e,setAttributes:t}){const{__unstableMarkNextChangeAsNotPersistent:n}=(0,p.useDispatch)(P.store);(0,c.useEffect)((()=>{if(e&&"object"==typeof e&&function(e){if("object"!=typeof e||null===e)return!1;const t=[e];for(;t.length>0;){const e=t.pop();for(const n in e){for(const e of W)if(n.includes(e))return!0;"object"==typeof e[n]&&null!==e[n]&&t.push(e[n])}}return!1}(e)){const r=N(e);F()(r,e)||("function"==typeof n&&n(),t({styles:r}))}}),[e,t])}})(),r})(),e.exports=t()}},t={},n=function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}(758);(window.gb=window.gb||{}).blockStyles=n})();
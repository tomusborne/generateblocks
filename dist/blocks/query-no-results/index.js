(()=>{"use strict";const e=window.React,s=window.wp.blocks,t=window.wp.blockEditor,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"generateblocks/query-no-results","title":"No Results","category":"generateblocks","description":"Display blocks when your query has no results.","keywords":["text","heading","headline","paragraph"],"version":"1.0.0","textdomain":"generateblocks","attributes":{},"ancestor":["generateblocks/query"],"supports":{"align":false,"className":false,"customClassName":false,"html":false},"editorScript":"file:./index.js","usesContext":["generateblocks/noResults"]}'),o=(wp.element.createElement,(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",className:"gblocks-block-icon","aria-hidden":"true",focusable:"false"},(0,e.createElement)("path",{d:"M12,4C16.415,4 20,7.585 20,12C20,16.415 16.415,20 12,20C7.585,20 4,16.415 4,12C4,7.585 7.585,4 12,4ZM17.181,7.676L7.676,17.181C8.847,18.16 10.355,18.75 12,18.75C15.725,18.75 18.75,15.725 18.75,12C18.75,10.355 18.16,8.847 17.181,7.676ZM16.324,6.819C15.153,5.84 13.645,5.25 12,5.25C8.275,5.25 5.25,8.275 5.25,12C5.25,13.645 5.84,15.153 6.819,16.324L16.324,6.819Z"})));(0,s.registerBlockType)(n,{edit:function(){const s=(0,t.useBlockProps)(),n=(0,t.useInnerBlocksProps)(s);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{...n}))},save:()=>(0,e.createElement)(t.InnerBlocks.Content,null),icon:o})})();
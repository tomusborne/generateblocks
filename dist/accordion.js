!function(){const e=e=>{const t=e.target.closest(".gb-accordion__item"),o=t.querySelectorAll(".gb-accordion__content")[0],c=t.querySelectorAll(".gb-accordion__toggle")[0],i=t.closest(".gb-accordion");if(i&&null===i.getAttribute("data-accordion-multiple-open")){const e=(r=t,Array.prototype.filter.call(r.parentNode.children,(e=>e!==r)));e&&e.forEach((e=>{if(e.classList.contains("gb-accordion__item-open")){const t=e.querySelectorAll(".gb-accordion__content")[0];t&&(t.style.maxHeight=t.scrollHeight+"px",setTimeout((()=>{e.classList.remove("gb-accordion__item-open"),t.style.maxHeight=null}),10));const o=e.querySelectorAll(".gb-accordion__toggle")[0];o&&o.setAttribute("aria-expanded",!1)}}))}var r;t.classList.contains("gb-accordion__item-open")?(o.style.maxHeight=o.scrollHeight+"px",setTimeout((()=>{c.setAttribute("aria-expanded",!1),t.classList.remove("gb-accordion__item-open"),o.style.maxHeight=null}),10)):(o.style.maxHeight=o.scrollHeight+"px",setTimeout((()=>{c.setAttribute("aria-expanded",!0),t.classList.add("gb-accordion__item-open"),addEventListener("transitionend",(e=>{"max-height"===e.propertyName&&(o.style.maxHeight=null)}),{once:!0})}),10))};document.querySelectorAll(".gb-accordion__item .gb-accordion__toggle").forEach((t=>{t.addEventListener("click",e)}));const t=document.querySelectorAll(".gb-accordion__item");t&&t.forEach((e=>{const t=e.querySelectorAll(".gb-accordion__toggle")[0],o=e.querySelectorAll(".gb-accordion__content")[0],c=t.getAttribute("id"),i=o.getAttribute("id");c&&o.setAttribute("aria-labelledby",c),i&&t.setAttribute("aria-controls",i),e.classList.contains("gb-accordion__item-open")&&t?t.setAttribute("aria-expanded",!0):t&&t.setAttribute("aria-expanded",!1)}))}();
function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var e=document.querySelector("button"),n=document.querySelector(".message_start"),r=document.querySelector(".message_lose"),o=document.querySelector(".message_win"),a=document.querySelector(".game_score"),c=document.querySelectorAll("td"),i=0,u=[],f={left:37,up:38,right:39,down:40},s=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];function l(){for(var t=0;t<4;t++)if(s.includes(0))return!1}function d(){for(;!l();){var t=Math.floor(4*Math.random()),e=Math.floor(4*Math.random());if(0===s[t][e]){s[t][e]=Math.random()>=.5?4:2;break}}}function v(t){var e=[],n=t.shift();if(n){for(var r=0;r<4;r++){var o=t.shift();if(o)n===o?(e.push(n+o),u.push(n+o),n=null):n!==o&&(n&&e.push(n),n=o);else{n&&e.push(n);break}}return e.slice()}}function h(t){var e=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];switch(t){case f.up:for(var n=0;n<4;n++)!function(t){for(var n=[],r=0;r<4;r++)n.push(s[r][t]);var o=v(n.filter(function(t){return t>0}));if(o)for(var a=0;a<o.length;a++)e[a][t]=o[a]}(n);break;case f.down:for(var r=0;r<4;r++)!function(t){for(var n=[],r=0;r<4;r++)n.push(s[3-r][t]);var o=v(n.filter(function(t){return t>0}));if(o)for(var a=0;a<o.length;a++)e[3-a][t]=o[a]}(r);break;case f.left:for(var o=0;o<4;o++)!function(t){var n=v(s[t].filter(function(t){return t>0}));if(n)for(var r=0;r<n.length;r++)e[t][r]=n[r]}(o);break;case f.right:for(var a=0;a<4;a++)!function(t){var n=v(s[t].filter(function(t){return t>0}).reverse());if(n)for(var r=0;r<n.length;r++)e[t][3-r]=n[r]}(a)}return e}function m(t){t?o.classList.remove("hidden"):r.classList.remove("hidden"),document.removeEventListener("keydown",p)}function y(){var t=[];s.forEach(function(e){e.forEach(function(e){t.push(e)})}),c.forEach(function(e){var n=t.shift();e.textContent=n||null,e.className="field_cell",e.classList.add("field_cell--".concat(e.textContent))})}function p(t){if(!(t.keyCode<36)&&!(t.keyCode>41)){var e,n;e=t.keyCode,u=[],n=h(e),"".concat(s)!=="".concat(n)&&(s=n,1)&&(u.includes(2048)&&m(!0),u.length>0&&(i+=u.reduce(function(t,e){return t+e}),a.textContent=i||0),d(),l()||function(){if("".concat(s)!=="".concat(h(f.up))||"".concat(s)!=="".concat(h(f.down))||"".concat(s)!=="".concat(h(f.left))||"".concat(s)!=="".concat(h(f.right)))return!0}()||m(!1),u=[],y())}}e.addEventListener("click",function(){e.classList.remove("start"),e.textContent="Restart",e.classList.add("restart"),n.classList.add("hidden"),o.classList.add("hidden"),r.classList.add("hidden"),a.textContent="0",i=0,((function(e){if(Array.isArray(e))return t(e)})(c)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(c)||function(e,n){if(e){if("string"==typeof e)return t(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,void 0)}}(c)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map(function(t){t.classList.remove("field_cell--".concat(t.textContent)),t.textContent=""}),s.map(function(t){return t.map(function(e,n){t[n]=0})}),d(),d(),y(),document.addEventListener("keydown",p)});
//# sourceMappingURL=index.23e68cc4.js.map
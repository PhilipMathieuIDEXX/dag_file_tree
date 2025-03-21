!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.dag_file_tree=t(require("react")):e.dag_file_tree=t(e.React)}(self,(e=>(()=>{"use strict";var t={80:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0,t.DagFileTree=void 0;var i=r(n(393));t.DagFileTree=i.default},295:t=>{t.exports=e},393:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t},l=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))};t.__esModule=!0;var c=a(n(295)),d={treeContainer:{fontFamily:"Arial, sans-serif",fontSize:"14px",padding:"10px",border:"1px solid #ddd",borderRadius:"4px",overflowY:"auto"},node:{margin:"2px 0"},nodeContent:{display:"flex",alignItems:"center",padding:"4px 0"},nodeChildren:{paddingLeft:"20px",borderLeft:"1px dashed #ccc",marginLeft:"7px"},expander:{cursor:"pointer",marginRight:"5px",fontSize:"10px",width:"15px",height:"15px",display:"inline-flex",alignItems:"center",justifyContent:"center"},checkbox:{marginRight:"5px"},nodeTitle:{cursor:"pointer"},selected:{fontWeight:"bold",color:"#2196F3"},disabled:{color:"#999",opacity:.6},searchContainer:{marginBottom:"10px"},searchInput:{width:"100%",padding:"8px",borderRadius:"4px",border:"1px solid #ddd",fontSize:"14px"}},u=function(e,t){return e.reduce((function(e,n){if(n.title.toLowerCase().includes(t.toLowerCase()))return e.push(r({},n)),e;if(n.children){var i=u(n.children,t);i.length>0&&e.push(r(r({},n),{children:i}))}return e}),[])},s=function(e){var t=e.id,n=e.data,i=e.selectedKeys,o=void 0===i?[]:i,a=e.expandedKeys,s=void 0===a?[]:a,f=(e.persistSelection,e.selectParents),p=void 0!==f&&f,h=e.maxHeight,y=void 0===h?500:h,v=e.searchQuery,x=void 0===v?"":v,g=e.debounceMs,m=void 0===g?300:g,b=e.setProps,_=(0,c.useState)(x),k=_[0],E=_[1];(0,c.useEffect)((function(){var e=setTimeout((function(){b&&b({searchQuery:k})}),m);return function(){return clearTimeout(e)}}),[k,m,b]),(0,c.useEffect)((function(){E(x)}),[x]);var C=function(e){var t;if(o.includes(e)){if(t=o.filter((function(t){return t!==e})),p){var r=function(e){var t=[],r=function(t){for(var n=0,i=t;n<i.length;n++){var o=i[n];if(o.key===e)return o;if(o.children&&o.children.length>0){var a=r(o.children);if(a)return a}}return null},i=function(e){e.children&&e.children.length>0&&e.children.forEach((function(e){t.push(e.key),i(e)}))},o=r(n);return o&&o.children&&i(o),t}(e);t=t.filter((function(e){return!r.includes(e)}))}}else if(t=l(l([],o,!0),[e],!1),p){var i=function(){var e={},t=function(n,r){n.forEach((function(n){r&&(e[n.key]||(e[n.key]=[]),e[n.key].push(r)),n.children&&n.children.length>0&&t(n.children,n.key)}))};return t(n),e}(),a=function(e,t){var n=[],r=function(e){var i=t[e];if(i)for(var o=0,a=i;o<a.length;o++){var l=a[o];n.includes(l)||(n.push(l),r(l))}};return r(e),n}(e,i);a.forEach((function(e){t.includes(e)||t.push(e)}))}b({selectedKeys:t})},j=function(e){var t=s.includes(e.key),n=o.includes(e.key),i=e.children&&e.children.length>0,a=!1===e.enabled;return c.default.createElement("div",{key:e.key,style:d.node},c.default.createElement("div",{style:d.nodeContent},i?c.default.createElement("span",{style:d.expander,onClick:function(){return t=e.key,n=s.includes(t)?s.filter((function(e){return e!==t})):l(l([],s,!0),[t],!1),void b({expandedKeys:n});var t,n}},t?"▼":"►"):c.default.createElement("span",{style:r(r({},d.expander),{visibility:"hidden"})},"►"),c.default.createElement("input",{type:"checkbox",checked:n,onChange:function(){return C(e.key)},style:r(r({},d.checkbox),a?d.disabled:{})}),c.default.createElement("span",{style:r(r(r({},d.nodeTitle),n?d.selected:{}),a?d.disabled:{}),onClick:function(){return C(e.key)}},e.title)),i&&t&&c.default.createElement("div",{style:d.nodeChildren},e.children.map((function(e){return j(e)}))))},O=""===k.trim()?n:u(n,k.trim().toLowerCase());return c.default.createElement("div",null,c.default.createElement("div",{style:d.searchContainer},c.default.createElement("input",{type:"text",placeholder:"Search...",value:k,onChange:function(e){return E(e.target.value)},style:d.searchInput})),c.default.createElement("div",{id:t,style:r(r({},d.treeContainer),{maxHeight:"".concat(y,"px")})},O&&O.length>0?O.map((function(e){return j(e)})):c.default.createElement("div",null,"No data to display")))};s.defaultProps={data:[],selectedKeys:[],expandedKeys:[],persistSelection:!0,selectParents:!1,maxHeight:500,searchQuery:"",debounceMs:300},t.default=s}},n={};return function e(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return t[r].call(o.exports,o,o.exports,e),o.exports}(80)})()));
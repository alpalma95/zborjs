(function(f,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(f=typeof globalThis<"u"?globalThis:f||self,u(f.reactivity={}))})(this,function(f){"use strict";let u=null,l=new WeakMap;class L{constructor(e){this.cb=e,this._set=new Set}unhook(){this._set.forEach(e=>e.delete(this))}}let d=t=>{u=new L(t),u.cb();let e=u;return u=null,e},S=(t,e)=>{if(u===null)return;let n;l.has(t)?n=l.get(t).get(e):l.set(t,new Map([[e,n=new Set]])),u._set.add(n),n.add(u)},R=(t,e,n)=>{if(!l.get(t))return;l.get(t).get(e).forEach(({cb:s})=>s(n))},T=t=>{if(Array.isArray(t)||typeof t!="function"&&typeof t!="object")return{val:t};if(typeof t=="function"){let e=E(1);return d(()=>e.val=t()),e}else return Object.fromEntries(Object.entries(t).map(([e,n])=>[e,typeof n=="object"||typeof n=="function"?E(n):n]))},E=t=>{let e=T(t);return new Proxy(e,{get(n,r,s){return S(n,r),Reflect.get(n,r,s)},set(n,r,s,c){if(n[r]!==s){let o=n[r];Reflect.set(n,r,s,c),R(n,r,o)}return!0}})};const D={selector:"data-class",construct:function({element:t},e){const n=[];for(let[r,s]of Object.entries(e)){let c=d(()=>{!t.classList.contains(r)&&s(t)&&t.classList.add(r),t.classList.contains(r)&&!s(t)&&t.classList.remove(r)});n.push(c)}return n}},W=(t,e,n)=>{const r=e.children,{trackBy:s}=e.dataset;t.length<r.length&&[...r].filter(o=>!t.some(a=>o.dataset.key==a[s])).forEach(o=>{g(e.querySelector(`[data-key="${o.dataset.key}"]`))}),t.forEach((c,o)=>{r[o]||e.appendChild(n(c));const a=c[s]==r[o].dataset.key,y=t.length===r.length,i=`[data-key="${c[s]}"]`;if(!a&&y){const h=e.querySelector(i)??n(c);e.replaceChild(h,r[o])}if(!a&&!y){const h=e.querySelector(i)??n(c);e.insertBefore(h,r[o])}})},v=[{selector:"data-for",construct:function({element:t},e){const[n,r]=e;return d(()=>{W(n.val,t,r)})}},{selector:"data-text",construct:function({element:t},e){return d(()=>{let n=typeof e=="function"?e(t):(e==null?void 0:e.val)??e;t.textContent===n||t instanceof Comment||(t.textContent=n)})}},D,{selector:"data-show",construct:function({element:t},e){return d(()=>t.style.display=e(t)?null:"none")}},{selector:"data-if",construct:function(t,e){let n=new Comment("data-if");return d(()=>{!e(t.element)&&!t.element.isConnected&&(t.replaceWith=n),n.isConnected&&e(t.element)&&(n.replaceWith(t.element),typeof t.element.init=="function"&&t.element.init(t.element)),t.element.isConnected&&!e(t.element)&&(typeof t.element.destroy=="function"&&t.element.destroy(t.element),t.element.replaceWith(n))})}},{selector:"data-model",construct:function({element:t},e){return t.addEventListener("input",()=>{e.val=t.value}),d(()=>{t.value=e.val})}}],F=Object.fromEntries(v.map(t=>[t.selector,t])),j=t=>{v.push(t)},p=new WeakMap,x=(t,e)=>p.has(t)?p.get(t).push(e):p.set(t,[e]),g=t=>{var e;typeof t.destroy=="function"&&t.destroy(t),(e=p.get(t))==null||e.forEach(n=>{Array.isArray(n)?n.forEach(r=>r.unhook()):n.unhook()}),p.delete(t),t==null||t.remove()},P=(t,e,n)=>{let r=d(()=>t.setAttribute(e,n(t)));x(t,r)},A=(t,e)=>(Array.isArray(t)&&(e=t,t={}),[t,e]),_=(t,e)=>{const n=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,function(c){var o;return c.getAttribute("ref")==e||c.getAttributeNames().some(a=>a.includes(":"))&&e==="createScope"?NodeFilter.FILTER_ACCEPT:(o=c.getAttribute("ref"))!=null&&o.toUpperCase().includes("CONTROLLER")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP});let s;for(;s=r.nextNode();)n.push(s);return n},m=t=>{for(const e in t.ctx){let n=F[e];const r=e.startsWith("on")&&typeof t.ctx[e]=="function";if(e==="init"){t.ctx[e](t.element),t.element.init=t.ctx[e];continue}if(e==="destroy"){t.element.destroy=t.ctx[e];continue}if(n){let s=n.construct(t,t.ctx[e]);x(t.element,s);continue}if(!n&&typeof t.ctx[e]=="function"&&!r){P(t.element,e,t.ctx[e]);continue}if(r){t.element.addEventListener(e.slice(2),t.ctx[e]);continue}t.element.setAttribute(e,t.ctx[e])}},w=(t,e)=>{e.length&&e.forEach(n=>{let r;n instanceof HTMLElement||n instanceof Comment||n instanceof DocumentFragment?r=n:r=new Text(n),t.appendChild(r)})},N=t=>function(e,n=[]){let[r,s]=A(e,n),c={element:t==="fragment"?new DocumentFragment:document.createElement(t),ctx:r};return m(c),w(c.element,s),c.replaceWith??c.element},q=new Proxy({},{get:function(t,e){return e in t||Reflect.set(t,e,N(e)),t[e]}});class I extends Array{mount(e){return this.forEach(n=>e(n)),this}}const $=(t,e)=>{var r;let n={};return(r=t.getAttributeNames())==null||r.forEach(s=>{s.startsWith(":")&&(n[s.replaceAll(":","")]=e[t.getAttribute(s)])&&t.removeAttribute(s)}),n},C=(t=document)=>new Proxy({},{get:(e,n)=>function(r,s=[]){let[c,o]=A(r,s);const a=[..._(t,n)];let y=n==="createScope"?c:null;return a.forEach(i=>{y&&(c=$(i,y)),m({element:i,ctx:c}),w(i,o),i.$=C(i),i.mount=function(h){h(i)},i.props=function(h){m({element:i,ctx:h}),w(i,o)}}),a.length===1?a[0]:new I(...a)}}),H=C();f.$=H,f.h=q,f.hook=d,f.registerDirective=j,f.safeRemove=g,f.stream=E,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});

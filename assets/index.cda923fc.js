var Y=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var F=(e,t,a)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,p=(e,t)=>{for(var a in t||(t={}))te.call(t,a)&&F(e,a,t[a]);if(B)for(var a of B(t))ne.call(t,a)&&F(e,a,t[a]);return e},v=(e,t)=>Z(e,ee(t));import{L as ae,m as se,I as re,n as oe,F as le,N as ie,E as ce,a as de,R as ue,b as he,c as me,i as fe,d as O,e as ge,j as xe,s as pe,f as ve,g as we,h as be,k as ye,l as Ce,o as Ne,p as ke,q as Ee,r as Re,t as Oe,u as Se,v as _e,w as Ie,x as Le,y as Me,z as Te,A as Ae,B as Be,C as i,D as Fe,M as $e,G as Pe,H as qe,J as We,K as je,O as De,P as He,T as Ve,Q as Ue,U as ze,S as Ke,V as Qe,W as n,X as Xe,Y as Ge,Z as D,_ as Je,$ as Ye,a0 as Ze,a1 as w,a2 as _,a3 as c,a4 as et,a5 as $,a6 as tt,a7 as nt,a8 as E,a9 as at,aa as st,ab as P,ac as H,ad as V,ae as U,af as rt,ag as ot,ah as lt,ai as it,aj as ct,ak as dt,al as ut,am as ht,an as mt,ao as ft,ap as gt,aq as xt,ar as R,as as pt,at as vt,au as wt,av as bt,aw as yt,ax as Ct,ay as Nt,az as kt,aA as Et,aB as Rt,aC as S,aD as Ot}from"./vendor.55cd5393.js";const St=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}};St();const _t="modulepreload",q={},It="/poche/",Lt=function(t,a){return!a||a.length===0?t():Promise.all(a.map(s=>{if(s=`${It}${s}`,s in q)return;q[s]=!0;const r=s.endsWith(".css"),o=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${o}`))return;const l=document.createElement("link");if(l.rel=r?"stylesheet":_t,r||(l.as="script",l.crossOrigin=""),l.href=s,document.head.appendChild(l),r)return new Promise((u,h)=>{l.addEventListener("load",u),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t())};class Mt extends ae{constructor(t){super(t);this.addHandler("onClick",(a,s)=>(window.open(s.href),!0))}createInputRules(){return[se({regexp:(()=>{try{return new RegExp("?<!!)[(.*?)]((.*?))")}catch{return/[^!]\[(.+?)\]\((.+?)\)/}})(),type:this.type,getAttributes:t=>{const[a,s,r]=t;return{text:s,href:r}}})]}createPasteRules(){return[]}}class Tt extends re{createInputRules(){return[oe({regexp:/!\[(.+?)\]\((.+?)\)/,type:this.type,getAttributes:t=>{const[a,s,r]=t;return{src:r,alt:s}}})]}}function At(e,t){for(let a of t){let s=a(e);if(s!==!1)return s}return!1}function Bt(e,t){return le.from(t.text(e))}function Ft(e){var a;let t=e.querySelector("img.mwe-math-fallback-image-inline[alt]");return(a=t==null?void 0:t.getAttribute("alt"))!=null?a:!1}function $t(e){var a;let t=e.querySelector("math[alttext]");return(a=t==null?void 0:t.getAttribute("alttext"))!=null?a:!1}function Pt(e){var a;let t=e.querySelector("math annotation[encoding='application/x-tex'");return(a=t==null?void 0:t.textContent)!=null?a:!1}function qt(e){return At(e,[Ft,$t,Pt])}const Wt={tag:"span",getAttrs(e){return e.classList.contains("mwe-math-element")?null:!1},getContent(e,t){let s=qt(e)||"\\text{\\color{red}(paste error)}";return Bt(s,t)}},jt=[Wt];var Dt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,z=(e,t,a,s)=>{for(var r=s>1?void 0:s?Ht(t,a):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(r=(s?l(t,a,r):l(r))||r);return s&&r&&Dt(t,a,r),r};let I=class extends ie{get name(){return"math_inline"}createTags(){return[ce.InlineNode]}createNodeSpec(e,t){return v(p({group:"inline math",content:"text*",inline:!0,atom:!0},t),{attrs:p({},e.defaults()),parseDOM:[{tag:"math-inline"},...jt],toDOM:()=>["math-inline",{class:"math-node"},0]})}createInputRules(){return[de(ue,this.type)]}createExternalPlugins(){return[he]}createKeymap(e){return{Backspace:me(O(be),O(ge),O(xe),O(pe))}}insertMathInline(){return e=>(fe(this.type),null)}};z([ve()],I.prototype,"insertMathInline",1);I=z([we({defaultOptions:{}})],I);const Vt=[ye,Ce,Ne,ke,Ee,Re,Oe,Se,_e,Ie,Le,Me,Te,Ae,Be],Ut=i.exports.forwardRef((e,t)=>{var u;const a=i.exports.useCallback(({json:h,invalidContent:d,transformers:f})=>f.remove(h,d),[]),{manager:s,state:r,setState:o,getContext:l}=Fe({extensions:()=>[new $e({}),new Pe({}),new qe,new We,new Mt({defaultTarget:"_blank",autoLink:!0}),new je({}),new De({enableSpine:!0}),new He,new Ve,new Tt({enableResizing:!0}),new Ue,new ze,new I,new Ke({supportedLanguages:Vt,defaultLanguage:"typescript"}),new Qe],onError:a,content:(u=e.state)==null?void 0:u.doc});return i.exports.useImperativeHandle(t,()=>l(),[l]),n("div",{id:e.id,className:"remirror-theme",children:n(Xe,{manager:s,initialContent:r,onChange:h=>{var d;o(h.state),(d=e.onChange)==null||d.call(e,h)},onFocus:(h,d)=>{var f;(f=e.onFocus)==null||f.call(e,h,d)},onBlur:(h,d)=>{var f;(f=e.onBlur)==null||f.call(e,h,d)},children:n(Ge,{})})})});D.plugin(Je);let b=new D("notes");const zt={type:"doc",content:[{type:"paragraph"}]};async function W(e){try{const t=e.id||e._id;return await b.upsert(t,s=>e)}catch(t){console.log(`ERROR: couldn't update 
${t}`)}}async function Kt(e,t,a,s,r,o){try{let l={_id:e||Ze(),id:null,title:t||null,meta:a||{},state:s||zt,createdTime:r||Date.now(),lastEditedTime:o||Date.now()};return l.id=l._id,await b.putIfNotExists(l)}catch(l){console.log(`ERROR: couldn't create doc ${l}`)}}async function Qt(e){try{const t=await b.get(e).then(s=>s._rev);return await b.remove(e,t)}catch(t){console.log(`ERROR: couldn't delete 
${t}`)}}async function T(e=25,t=0,a){var s;try{a||(a=(await b.allDocs({limit:1})).rows[0].id);let r=await b.allDocs({limit:e,skip:t,include_docs:!0,startkey:a});return(s=r==null?void 0:r.rows)==null?void 0:s.map(o=>o.doc)}catch(r){console.log(`ERROR fetching all notes 
${r}`)}}async function K(e){try{return await b.get(e)}catch(t){console.log(`ERROR fetching  ${e} 
${t}`)}}function Xt(e){b.changes({since:"now",live:!0}).on("change",()=>e())}async function Gt(e){return new Ye(await T(),{keys:["title","text"],includeMatches:!0,minMatchCharLength:2,includeScore:!0,threshold:.5,ignoreLocation:!0}).search(e)}let Q={items:[],addItem:()=>{},removeItem:()=>{},navOpen:!1,toggleNav:()=>{},searchOpen:!1,setSearchOpen:()=>{}};const Jt=(e,t)=>e.filter(a=>a!==t),Yt=(e,t)=>e.find(a=>a===t)?e:[...e,t],x=i.exports.createContext(Q);x.displayName="NotesContext";const Zt=e=>{const[t,a]=i.exports.useState(Q),s=i.exports.useCallback(u=>{const{items:h}=t;h.find(d=>d===u)||a(v(p({},t),{items:Yt(h,u)}))},[t]),r=i.exports.useCallback(u=>{const{items:h}=t;a(v(p({},t),{items:Jt(h,u)}))},[t]),o=i.exports.useCallback(()=>{a(v(p({},t),{navOpen:!t.navOpen}))},[t]),l=i.exports.useCallback(u=>{a(v(p({},t),{searchOpen:u}))},[t]);return n("div",{className:"App",children:n(x.Provider,{value:v(p({},t),{addItem:s,removeItem:r,toggleNav:o,setSearchOpen:l}),children:e.children})})},N=({children:e,className:t,onClick:a})=>n(w.button,{whileTap:{scale:.9},className:`h-12 w-full px-4 py-3 bg-gray-200 opacity-80 rounded-xl flex justify-between items-center hover:bg-gray-800 hover:text-white ${t}`,onClick:a,children:e});const X=e=>{var r,o,l;_.setAppElement("#root");const{items:t,removeItem:a}=i.exports.useContext(x),s=(r=e.note)==null?void 0:r.id;return n(_,{isOpen:(o=e.isOpen)!=null?o:!1,onAfterClose:e.onAfterOpen,onRequestClose:e.onRequestClose,overlayClassName:"fixed inset-0 bg-[rgba(30,30,30,.5)]",className:"z-20 bg-gray-100 backdrop-blur-lg rounded-t-xl absolute w-full bottom-0 left-0 right-0 p-4 mx-auto max-w-2xl ",children:c("div",{children:[c("div",{className:"flex justify-between mb-6",children:[c("div",{className:"flex items-center space-x-1 text-xl",children:[n(et,{}),n("h2",{children:(l=e.note)==null?void 0:l.title})]}),n("button",{className:"rounded-full h-8 w-8 bg-gray-200 opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center",onClick:e.onRequestClose,children:n($,{})})]}),c("div",{className:"flex flex-col space-y-4 items-center",children:[e.children,t.find(u=>u===s)&&c(N,{onClick:()=>{a(s),e.onRequestClose()},children:[n("span",{children:"Close"})," ",n($,{})]}),c(N,{onClick:()=>{a(s),Qt(s!=null?s:""),e.onRequestClose()},children:[n("span",{children:"Delete"})," ",n(tt,{})]})]})]})})},en=e=>{const{getHTML:t,getMarkdown:a}=nt();return c(E,{children:[c(N,{onClick:()=>{var h;const o=`<!DOCTYPE html>
    <html>
    <head>
      <link href="https://cdn.jsdelivr.net/npm/base-css-theme@1.1.3/base.css" rel="stylesheet">
    </head>
    <body style="padding: 16px;">${t()}</body>
    </html>`;let l=`${e.note.title}.html`,u=new Blob([o],{type:"text/plain;charset=utf-8"});P.saveAs(u,l),(h=e.onRequestClose)==null||h.call(e)},children:[n("span",{children:"Export HTML"})," ",n(at,{})]}),c(N,{onClick:()=>{var u;let o=`${e.note.title}.md`,l=new Blob([a()],{type:"text/plain;charset=utf-8"});P.saveAs(l,o),(u=e.onRequestClose)==null||u.call(e)},children:[n("span",{children:"Export Markdown"})," ",n(st,{})]})]})};const tn=e=>{const[t,a]=i.exports.useState(),[s,r]=i.exports.useState(!1),[o,l]=i.exports.useState(!1),u=i.exports.useRef(),h=i.exports.useRef(),d=H(),f=i.exports.useCallback(async()=>{if(e.id){let g=await K(e.id);g&&a(g)}},[e.id]);i.exports.useEffect(()=>(f(),()=>a(null)),[f]),i.exports.useEffect(()=>{if(d.hash){const g=d.hash.substring(1);e.id===g&&h.current&&h.current.scrollIntoView({behavior:"smooth"})}},[d.hash,e.id]);const m=i.exports.useCallback(g=>{const C=v(p({},t),{state:g.state.toJSON(),lastEditedTime:Date.now()});a(C)},[t]),k=i.exports.useCallback((g,C)=>{t.text=g.helpers.getText(),W(t),r(!1)},[t]),M=i.exports.useCallback((g,C)=>{var A;r(!0),(A=e.handleFocus)==null||A.call(e,u.current)},[e]);return t?c(E,{children:[n(V,{children:c(w.div,{initial:{scale:0},animate:{scale:1},exit:{scale:0},id:e.id,ref:h,className:"w-full md:w-3/4 lg:w-1/2 xl:w-1/3 hover:shadow-lg rounded-lg p-5 lg:mr-4 mb-4 scroll-smooth editor-container",children:[c("div",{className:"flex justify-between",children:[n("textarea",{placeholder:"Title",defaultValue:t==null?void 0:t.title,className:"font-semibold text-4xl w-11/12",onChange:g=>{let C=g.target.value;C.replace(/\n/,""),t.title=C,W(t)},wrap:"soft"}),n("div",{className:"flex space-x-2",children:n(w.button,{whileHover:{scale:1.1},whileTap:{scale:.9},className:`h-4 w-4 rounded-full opacity-80 border hover:bg-gray-800 hover:border-gray-800 ${s?"border-gray-200 bg-gray-200":"border-gray-200"}`,onClick:()=>l(!0)})})]}),n(Ut,{id:t.id,state:t.state,onChange:m,onBlur:k,onFocus:M,ref:u})]})}),u.current&&n(U.Provider,{value:u.current,children:n(X,{isOpen:o,note:t,onRequestClose:()=>{l(!1)},children:n(en,{note:t,onRequestClose:()=>{l(!1)}})})})]}):null};function G(e){const{addItem:t}=i.exports.useContext(x),a=async()=>{let s=await Kt();return t(s.id),s.id};return n(w.button,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:async()=>{var r;const s=await a();(r=e==null?void 0:e.handleClick)==null||r.call(e,s)},className:"bg-gray-200  text-black backdrop-blur-xl rounded-full h-16 w-16 fixed right-1 bottom-12 md:right-8 md:bottom-8 flex justify-center items-center shadow-md hover:pointer hover:opacity-100 hover:bg-green-500 hover:text-white",children:n(rt,{})})}const y=e=>e?"active":"",nn=()=>{const e=ot(),t=lt();return c("div",{className:"toolbar space-x-2",children:[n("button",{onClick:()=>{e.undo(),e.focus()},children:n(it,{})}),n("button",{onClick:()=>{e.redo(),e.focus()},children:n(ct,{})}),n("button",{className:y(t.bold()),onClick:()=>{e.toggleBold(),e.focus()},children:n(dt,{})}),n("button",{className:y(t.italic()),onClick:()=>{e.toggleItalic(),e.focus()},children:n(ut,{})}),n("button",{className:y(t.underline()),onClick:()=>{e.toggleUnderline(),e.focus()},children:n(ht,{})}),n("button",{className:y(t.code()),onClick:()=>{e.toggleCode(),e.focus()},children:n(mt,{})}),n("button",{className:y(t.blockquote()),onClick:()=>{e.toggleBlockquote(),e.focus()},children:n(ft,{})}),n("button",{className:y(t.bulletList()),onClick:()=>{e.toggleBulletList(),e.focus()},children:n(gt,{})}),n("button",{className:y(t.taskList()),onClick:()=>{e.toggleTaskList(),e.focus()},children:n(xt,{})})]})};function an(){const{items:e,addItem:t}=i.exports.useContext(x),[a,s]=i.exports.useState();R();const r=H();return i.exports.useEffect(()=>{if(r.hash){const o=r.hash.substring(1);o&&!e.includes(o)&&K(o).then(l=>{l&&t(o)})}},[r.hash]),c(E,{children:[e.length>0&&n("div",{className:"editor-list",children:e.map(o=>n(tn,{id:o,handleFocus:l=>s(l)},o))}),e.length===0&&c("div",{className:"absolute mx-auto top-1/2 w-full text-center text-gray-300",children:[n(pt,{className:"h-10 w-10 mx-auto"}),n("h1",{children:"Workspace Empty"})]}),a&&n(U.Provider,{value:a,children:n(nn,{})}),n(G,{})]})}function sn(){const[e,t]=i.exports.useState([]),[a,s]=i.exports.useState(!1),[r,o]=i.exports.useState(),l=R(),{items:u,addItem:h}=i.exports.useContext(x),d=i.exports.useCallback(async()=>{const m=await T();m&&t(m)},[t]),f=m=>{o(m),s(!0)};return i.exports.useEffect(()=>(d(),Xt(d),()=>{t([])}),[d]),c(E,{children:[c("div",{className:"p-5 md:px-14 lg:px-36",children:[c("table",{className:"rounded-lg divide-y divide-gray-200 note-list shadow-md",children:[n("thead",{children:c("tr",{children:[n("th",{className:"w-11/12 lg:w-9/12",children:"Note"}),n("th",{className:"hidden lg:block w-2/12",children:"Edited"}),n("th",{className:"w-1/12"})]})}),n("tbody",{children:e.sort((m,k)=>m.lastEditedTime<k.lastEditedTime?1:-1).map((m,k)=>c("tr",{id:`row-${m.id}`,children:[n("td",{children:n("button",{className:"truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200",onClick:()=>{h(m.id),l(`${L.panelWorkspace}#${m.id}`)},children:c("div",{className:"flex flex-col text-left",children:[c("div",{className:"font-medium flex space-x-1",children:[n("span",{children:m.title||"No Title"}),n("span",{className:`rounded-full h-2 w-2 bg-green-500 ${u.find(M=>M==m.id)?"inline":"hidden"} `})]}),n("span",{className:"text-sm text-gray-500 font-light",children:m.text||"empty"})]})})}),n("td",{className:"hidden lg:block",children:new Date(m.lastEditedTime).toLocaleString(navigator.language,{year:"numeric",month:"long",day:"numeric"})}),n("td",{children:n("button",{onClick:()=>f(m),children:n(vt,{})})})]},k))})]}),n(G,{handleClick:m=>l(`${L.panelWorkspace}#${m}`)})]}),n(X,{isOpen:a,note:r,onRequestClose:()=>{o(null),s(!1)}})]})}const rn=()=>{const e=R();return c("div",{className:"flex space-x-4",children:[n(w.button,{whileHover:{scale:1.1},whileTap:{scale:.9},className:"rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center",onClick:()=>e(-1),children:n(wt,{})}),n(w.button,{whileHover:{scale:1.1},whileTap:{scale:.9},className:"rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center",onClick:()=>e(1),children:n(bt,{})})]})},on=()=>{const{toggleNav:e}=i.exports.useContext(x);return n(w.button,{whileHover:{scale:1.1},whileTap:{scale:.9},className:"rounded-full h-8 w-8 bg-white opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center",onClick:e,children:n(yt,{})})},ln=()=>{const e=R(),{navOpen:t,setSearchOpen:a,searchOpen:s}=i.exports.useContext(x);return n(V,{children:t&&c(w.div,{initial:{scale:0,left:-50},animate:{scale:1,left:0},exit:{scale:0,left:-50},className:`h-fit bg-gray-200 backdrop-blur-lg rounded-r-xl shadow-lg flex flex-col space-y-2 items-center py-5 px-1  shrink-0 fixed bottom-0 top-0 left-0 my-auto 
      lg:w-32`,children:[c(N,{onClick:()=>e(L.home),children:[n(Ct,{})," ",n("span",{className:"hidden lg:block",children:"Home"})]}),c(N,{onClick:()=>a(!s),children:[n(Nt,{})," ",n("span",{className:"hidden lg:block",children:"Search"})]})]})})};function cn(){const[e,t]=i.exports.useState(""),[a,s]=i.exports.useState([]),{addItem:r,setSearchOpen:o}=i.exports.useContext(x),l=R();i.exports.useEffect(()=>(h().then(s),()=>{s([])}),[]);const u=d=>{Gt(d).then(f=>s(f))},h=async()=>(await T(10)).map(d=>({item:d,matches:[]}));return c("div",{className:"relative shadow-sm",children:[n("div",{className:"h-10 w-full  rounded-full flex justify-between pl-6 items-center relative",children:n("input",{placeholder:"Search",className:"w-full h-full bg-transparent overflow-ellipsis",type:"text",value:e,onChange:async d=>{const{value:f}=d.target;t(f),f?u(f):s(await h())}})}),a.length>0&&n("div",{className:"search-results rounded-b-lg overflow-hidden",children:a.map(d=>n(dn,{onResultClick:()=>{t(""),r(d.item.id),l(`${L.panelWorkspace}#${d.item.id}`),o(!1)},result:d},d.item.id))})]})}const dn=({result:e,onResultClick:t})=>{const a=e.matches.some(r=>r.key==="title"),s=e.matches.some(r=>r.key==="text");return c("button",{className:"result bg-white text-left py-2 px-6 h-14",onClick:()=>{t()},children:[c("div",{className:"text-sm",children:[a&&e.matches.map((r,o)=>r.key==="title"?n(j,{match:r},o):null),!a&&e.item.title,!a&&!e.item.title&&n("span",{className:"italic opacity-50",children:"No Title"})]}),c("div",{className:"text-xs font-extralight",children:[s&&e.matches.map((r,o)=>r.key==="text"?n(j,{match:r},o):null),!s&&e.item.text,!s&&!e.item.text&&n("span",{className:"italic opacity-50",children:"Empty"})]})]})},j=({match:e})=>{var s,r,o,l;const[[t,a]]=e.indices;return c(E,{children:[(s=e.value)==null?void 0:s.substring(0,t),n("span",{className:"bg-yellow-300",children:(r=e.value)==null?void 0:r.substring(t,a)}),(l=e.value)==null?void 0:l.substring(a,(o=e.value)==null?void 0:o.length)]})},un=()=>{_.setAppElement("#root");const{setSearchOpen:e,searchOpen:t}=i.exports.useContext(x);return n(_,{isOpen:t,onRequestClose:()=>e(!1),overlayClassName:"fixed inset-0 bg-[rgba(30,30,30,.5)]",className:"z-20 bg-gray-100 backdrop-blur-lg rounded-t-xl absolute w-full top-1/4 left-0 right-0 mx-auto max-w-2xl ",children:n(cn,{})})},hn=e=>c("div",{className:"min-h-screen max-w-full h-full",children:[c("div",{className:"w-full flex justify-between items-center mb-2 py-2 px-3",children:[n(on,{}),n("div",{children:n(rn,{})})]}),c("div",{className:"flex flex-row-reverse",children:[n("div",{className:"w-full overflow-scroll",children:n(kt,{})}),n(ln,{})]}),n(un,{})]}),mn=i.exports.lazy(()=>Lt(()=>import("./canvas-workspace.11c09c1a.js"),["assets/canvas-workspace.11c09c1a.js","assets/canvas-workspace.84cce56c.css","assets/vendor.55cd5393.js"]));function fn(e){return n(Et,{basename:"/poche",children:n(i.exports.Suspense,{fallback:n("div",{children:"Loading..."}),children:n(Rt,{children:c(S,{path:"/",element:n(hn,{}),children:[n(S,{index:!0,element:n(sn,{})}),n(S,{path:"canvas",element:n(mn,{})}),n(S,{path:"panel",element:n(an,{})})]})})})})}const L={home:"/",panelWorkspace:"/panel"};function gn(){return n(Zt,{children:n(fn,{})})}const xn=Boolean(window.location.hostname==="localhost"||window.location.hostname==="[::1]"||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function pn(e){if("serviceWorker"in navigator){if(new URL("poche",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const a="/poche/service-worker.js";xn?(vn(a,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")})):J(a,e)})}}function J(e,t){navigator.serviceWorker.register(e).then(a=>{a.onupdatefound=()=>{const s=a.installing;s!=null&&(s.onstatechange=()=>{s.state==="installed"&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(a)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(a)))})}}).catch(a=>{console.error("Error during service worker registration:",a)})}function vn(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then(a=>{const s=a.headers.get("content-type");a.status===404||s!=null&&s.indexOf("javascript")===-1?navigator.serviceWorker.ready.then(r=>{r.unregister().then(()=>{window.location.reload()})}):J(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}Ot.render(n(i.exports.StrictMode,{children:n(gn,{})}),document.getElementById("root"));pn();export{tn as E,cn as S,T as g,Xt as o};

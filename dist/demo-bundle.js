!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n,r){"use strict";for(var t=function(){return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,n){var r=[],t=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(t=(u=c.next()).done)&&(r.push(u.value),!n||r.length!==n);t=!0);}catch(e){o=!0,i=e}finally{try{!t&&c.return&&c.return()}finally{if(o)throw i}}return r}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=t(document.getElementsByTagName("button"),13),i=o[0],u=o[1],c=o[2],a=o[3],l=o[4],d=o[5],f=o[6],y=o[7],s=o[8],g=o[9],b=o[10],v=o[11],m=o[12],p=t(document.getElementsByTagName("input"),1)[0],x=document.getElementById("wrap-origin"),k=[],h=1;h<10;h++)k.push(document.getElementById(h));var L=function(e){for(var n=1;n<10;n++)e(document.getElementById(n),n)},S=function(e,n){return e.classList[n?"add":"remove"]("button-active")},w=function(e,n){return v.classList[e?"add":"remove"]("lock-"+(n?"x":"y"))},j={n:3,x:!0,origin:-1,xLocked:!0,yLocked:!0,lockIndex:0};function C(){var e=j.x,n=j.abe,r=j.s,t=j.origin,o=j.xLocked,v=j.yLocked;L(function(i,u){var c=(e?"x":"y")+u+(t>=0?t:"");n&&(e?u%3==2:u>3&&u<7)&&(1===n?c+="a":2===n?c+="b":3===n&&(c+="e")),r&&(c+="s"),i.children[0].innerText=c,i.children[1].className=c+(o?" x-locked":"")+(v?" y-locked":"")+" container"}),S(i,e),S(u,!e),S(d,r),S(c,1===n),S(a,2===n),S(l,3===n),S(s,1===t),S(g,3===t),S(f,7===t),S(y,9===t),S(b,0===t),w(o,!0),w(v,!1),x.style.borderTopColor=t>6?"GoldenRod":"SlateGray",x.style.borderLeftColor=t%3==1?"GoldenRod":"SlateGray",x.style.borderRightColor=3===t||9===t?"GoldenRod":"SlateGray",x.style.borderBottomColor=1===t||3===t?"GoldenRod":"SlateGray"}var G=function(e,n){return e.onclick=function(){return[n(),C()]}};function O(){var e=j.n,n=j.grow;S(m,n),L(function(r){for(var t=r.children[1];t.hasChildNodes();)t.removeChild(t.lastChild);for(var o=0;o<e;o++){var i=document.createElement("div");i.innerText=o+1,i.className="x5 box"+(n?" grow":""),t.appendChild(i)}})}G(i,function(){return j.x=!0}),G(u,function(){return j.x=!1}),G(d,function(){return j.s=!j.s}),G(c,function(){return j.abe=1===j.abe?0:1}),G(a,function(){return j.abe=2===j.abe?0:2}),G(l,function(){return j.abe=3===j.abe?0:3}),G(f,function(){return j.origin=7!==j.origin?7:-1}),G(y,function(){return j.origin=9!==j.origin?9:-1}),G(s,function(){return j.origin=1!==j.origin?1:-1}),G(g,function(){return j.origin=3!==j.origin?3:-1}),G(b,function(){return j.origin=0!==j.origin?0:-1}),G(v,function(){var e=(j.lockIndex+1)%4;0===e?j.xLocked=j.yLocked=!0:1===e?j.xLocked=j.yLocked=!1:2===e?(j.xLocked=!0)&&(j.yLocked=!1):(j.xLocked=!1)||(j.yLocked=!0),j.lockIndex=e}),m.onclick=function(){return[j.grow=!j.grow,O()]},p.oninput=function(e){var n=e.target.value;j.n!==n&&(j.n=n,O())},O(),C()}]);
!function(){function t(t){return o.cl_reduce.call(t,function(t,e,n){return t[n]={value:e},t},{})}var e={},n={},i={},o={},r=Array.prototype.slice;e.cl_each=function(t){for(var e=0,n=this.length;n>e;e++)t(this[e],e,this)},e.cl_map=function(t){for(var e=0,n=this.length,i=Array(n);n>e;e++)i[e]=t(this[e],e,this);return i},e.cl_reduce=function(t,e){for(var n=0,i=this.length;i>n;n++)e=t(e,this[n],n,this);return e},e.cl_some=function(t){for(var e=0,n=this.length;n>e;e++)if(t(this[e],e,this))return!0},e.cl_filter=function(t){for(var e=0,n=this.length,i=[];n>e;e++)t(this[e],e,this)&&i.push(this[e]);return i},n.cl_each=function(t){r.call(this).cl_each(t)},n.cl_map=function(t){return r.call(this).cl_map(t)},n.cl_reduce=function(t,e){return r.call(this).cl_reduce(t,e)},i.cl_bind=function(t){var e=this,n=r.call(arguments,1);return t=t||null,n.length?function(){return arguments.length?e.apply(t,n.concat(r.call(arguments))):e.apply(t,n)}:function(){return arguments.length?e.apply(t,arguments):e.call(t)}},o.cl_each=function(t){for(var e=0,n=Object.keys(this),i=n.length;i>e;e++)t(this[n[e]],n[e],this)},o.cl_map=function(t){for(var e=0,n=Object.keys(this),i=n.length,o=Array(i);i>e;e++)o[e]=t(this[n[e]],n[e],this);return o},o.cl_reduce=function(t,e){for(var n=0,i=Object.keys(this),o=i.length;o>n;n++)e=t(e,this[i[n]],i[n],this);return e},o.cl_extend=function(t){if(t)for(var e=0,n=Object.keys(t),i=n.length;i>e;e++)this[n[e]]=t[n[e]];return this},e=t(e),n=t(n),i=t(i),o=t(o),Object.defineProperties(Array.prototype,e),Object.defineProperties(Function.prototype,i),Object.defineProperties(Object.prototype,o),"undefined"!=typeof window&&(Object.defineProperties(HTMLCollection.prototype,n),Object.defineProperties(NodeList.prototype,n))}(),function(t){function e(n,i,o){function r(){var t=n.textContent.replace(/\r\n?/g,"\n");return"\n"!==t.slice(-1)&&(t+="\n"),t}function s(t,e){M=k.parseSections(t,e),b.$allElements=Array.prototype.slice.call(n.querySelectorAll(".cledit-section *")),b.$trigger("contentChanged",t,M)}function a(t){N.saveSelectionState(!0,!0,t)}function c(t,e,n){var i=Math.min(t,e),o=Math.max(t,e),r=N.createRange(i,o),s=""+r;return s.length!==o-i||s!=n?(r.deleteContents(),r.insertNode(b.$document.createTextNode(n)),r):void 0}function l(t,e,n){var i=r();n=void 0!==n&&n<i.length?n:i.length-1;var o=Math.min($.diff_commonPrefix(i,t),n),s=Math.min($.diff_commonSuffix(i,t),i.length-o,t.length-o),a=t.substring(o,t.length-s),l=c(o,i.length-s,a);return l&&(O=e,T=!0),{start:o,end:t.length-s,range:l}}function d(t,e,n){D.setDefaultMode("single"),c(t,e,n);var i=t+n.length;N.setSelectionStartEnd(i,i),N.updateCursorCoordinates(!0)}function f(t,e){D.setDefaultMode("single");var n=r(),i=n.replace(t,e);if(i!=n){var o=b.setContent(i);N.setSelectionStartEnd(o.end,o.end),N.updateCursorCoordinates(!0)}}function u(){N.restoreSelection()}function h(t){b.$markers[t.id]=t}function g(t){delete b.$markers[t.id]}function p(t){x.noWatch(function(){function e(t){for(;t&&t!==n;){if(t.section){var e=t.parentNode?o:i;return-1===e.indexOf(t.section)&&e.push(t.section)}t=t.parentNode}}var i=[],o=[];t.cl_each(function(t){e(t.target),t.addedNodes.cl_each(e),t.removedNodes.cl_each(e)}),k.fixContent(o,i,T),T=!1});var e=r();if(!e||e!=_){var i=$.diff_main(_,e);if(!O){var o=$.patch_make(_,i);D.addPatches(o),D.setDefaultMode("typing")}b.$markers.cl_each(function(t){t.adjustOffset(i)}),_=e,N.saveSelectionState(),s(_),O||D.saveState(),O=!1,L()}}function v(t,e){e=void 0===e?t:e,N.setSelectionStartEnd(t,e),N.updateCursorCoordinates()}function m(t){return function(e){17!==e.which&&91!==e.which&&18!==e.which&&16!==e.which&&t(e)}}function C(){b.$window.removeEventListener("keydown",w),b.$window.removeEventListener("mouseup",S)}function w(t){return b.$window.document.contains(n)?void m(function(){a()})(t):C()}function S(){return b.$window.document.contains(n)?void N.saveSelectionState(!0,!1):C()}function y(t){Array.isArray(t)||(t=[t]),b.$keystrokes=b.$keystrokes.concat(t).sort(function(t,e){return t.priority-e.priority})}i=i||n;var b={$contentElt:n,$scrollElt:i,$window:o||window,$keystrokes:[],$markers:{}};b.$document=b.$window.document,e.Utils.createEventHooks(b);var E=e.Utils.debounce;b.toggleEditable=function(t){void 0===t&&(t=!n.contentEditable),n.contentEditable=t},b.toggleEditable(!0);var M,_=r(),k=new e.Highlighter(b),x=new e.Watcher(b,p);x.startWatching();var $=new t,N=new e.SelectionMgr(b),O=!1,T=!1,D=new e.UndoMgr(b),L=E(function(){var t=b.$window.getSelection();N.hasFocus&&!k.isComposing&&N.selectionStart===N.selectionEnd&&t.modify&&(N.selectionStart?(t.modify("move","backward","character"),t.modify("move","forward","character")):(t.modify("move","forward","character"),t.modify("move","backward","character")))},10);return b.$window.addEventListener("keydown",w,!1),b.$window.addEventListener("mouseup",S),n.addEventListener("contextmenu",N.saveSelectionState.cl_bind(N,!0,!1)),n.addEventListener("keydown",m(function(t){N.saveSelectionState(),a();var e=b.getContent(),n=Math.min(N.selectionStart,N.selectionEnd),i=Math.max(N.selectionStart,N.selectionEnd),o={before:e.slice(0,n),after:e.slice(i),selection:e.slice(n,i),isBackwardSelection:N.selectionStart>N.selectionEnd};b.$keystrokes.cl_some(function(e){return e.handler(t,o,b)?(b.setContent(o.before+o.selection+o.after,!1,n),n=o.before.length,i=n+o.selection.length,N.setSelectionStartEnd(o.isBackwardSelection?i:n,o.isBackwardSelection?n:i),!0):void 0})}),!1),n.addEventListener("compositionstart",function(){k.isComposing++},!1),n.addEventListener("compositionend",function(){setTimeout(function(){k.isComposing&&k.isComposing--},0)},!1),n.addEventListener("paste",function(t){D.setCurrentMode("single"),t.preventDefault();var e,n=t.clipboardData;n?e=n.getData("text/plain"):(n=b.$window.clipboardData,e=n&&n.getData("Text")),e&&(d(N.selectionStart,N.selectionEnd,e),a())},!1),n.addEventListener("cut",function(){D.setCurrentMode("single"),a()},!1),n.addEventListener("focus",function(){N.hasFocus=!0,b.$trigger("focus")},!1),n.addEventListener("blur",function(){N.hasFocus=!1,b.$trigger("blur")},!1),y(e.defaultKeystrokes),b.selectionMgr=N,b.undoMgr=D,b.highlighter=k,b.watcher=x,b.adjustCursorPosition=a,b.setContent=l,b.replace=d,b.replaceAll=f,b.getContent=r,b.focus=u,b.setSelection=v,b.addKeystroke=y,b.addMarker=h,b.removeMarker=g,b.init=function(t){t={cursorFocusRatio:.5,highlighter:function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},sectionDelimiter:""}.cl_extend(t||{}),b.options=t,void 0!==t.content&&(_=t.content.toString(),"\n"!==_.slice(-1)&&(_+="\n")),s(_,!0),void 0!==t.selectionStart&&void 0!==t.selectionEnd?b.setSelection(t.selectionStart,t.selectionEnd):N.saveSelectionState(),D.init(),void 0!==t.scrollTop&&(i.scrollTop=t.scrollTop)},b}window.cledit=e}(window.diff_match_patch),function(t){function e(t){var e=t.createElement("style");e.type="text/css",e.innerHTML=".cledit-section * { display: inline; }",t.head.appendChild(e),i.push(e)}function n(n){function o(t){this.text=t}function r(t){var e=n.options.highlighter(t.text).replace(/\n/g,h),i=n.$document.createElement("div");i.className="cledit-section",i.innerHTML=e,t.setElement(i),s.$trigger("sectionHighlighted",t)}var s=this;t.Utils.createEventHooks(this),i.cl_some(function(t){return n.$document.head.contains(t)})||e(n.$document);var a=n.$contentElt;this.isComposing=0;var c,l=[],d=t.Utils.isWebkit,f="div",u='<br><span class="hd-lf" style="display: none">\n</span>',h='<span class="lf">'+(d?u:"\n")+"</span>";this.fixContent=function(t,e,i){t.cl_each(function(t){t.forceHighlighting=!0,i||(d&&(t.elt.getElementsByClassName("hd-lf").cl_each(function(t){t.parentNode.removeChild(t)}),t.elt.getElementsByTagName("br").cl_each(function(t){t.parentNode.replaceChild(n.$document.createTextNode("\n"),t)})),"\n"!==t.elt.textContent.slice(-1)&&t.elt.appendChild(n.$document.createTextNode("\n")))})},this.addTrailingNode=function(){this.trailingNode=n.$document.createElement(f),a.appendChild(this.trailingNode)},o.prototype.setElement=function(t){this.elt=t,t.section=this},this.parseSections=function(t,e){if(this.isComposing)return l;var i=n.options.sectionParser?n.options.sectionParser(t):[t];i=i.cl_map(function(t){return new o(t)});var d=[],f=[];if(c=void 0,e)f=l,l=i,d=i;else{var u=l.length;l.cl_some(function(t,e){var n=i[e];return e>=i.length||t.forceHighlighting||t.text!=n.text||t.elt.parentNode!==a||t.elt.textContent!=n.text?(u=e,!0):void 0});var h=-l.length;l.slice().reverse().cl_some(function(t,e){var n=i[i.length-e-1];return e>=i.length||t.forceHighlighting||t.text!=n.text||t.elt.parentNode!==a||t.elt.textContent!=n.text?(h=-e,!0):void 0}),u-h>l.length&&(h=u-l.length);var g=l.slice(0,u);d=i.slice(u,i.length+h);var p=l.slice(l.length+h,l.length);c=p[0],f=l.slice(u,l.length+h),l=g.concat(d).concat(p)}var v=n.$document.createDocumentFragment();return d.cl_each(function(t){t.forceHighlighting=!1,r(t),v.appendChild(t.elt)}),n.watcher.noWatch(function(){if(e)return a.innerHTML="",a.appendChild(v),this.addTrailingNode();f.cl_each(function(t){t.elt.parentNode===a&&a.removeChild(t.elt),t.elt.section=void 0}),void 0!==c?a.insertBefore(v,c.elt):a.appendChild(v);for(var t=a.firstChild;t;){var i=t.nextSibling;t.section||a.removeChild(t),t=i}this.addTrailingNode(),s.$trigger("highlighted"),n.selectionMgr.restoreSelection(),n.selectionMgr.updateCursorCoordinates()}.cl_bind(this)),l}}var i=[];t.Highlighter=n}(window.cledit),function(t){function e(t,e){this.handler=t,this.priority=e||100}function n(t,e,n){for(var i;n&&e>0||!n&&e<t.length;){var r=o[n?t[e-1]:t[e]]||"word";if(i&&r!==i&&("word"===i||"space"===r||"newLine"===i||"newLine"===r))break;i=r,n?e--:e++}return e}t.Keystroke=e;var i,o=Object.create(null);"./\\()\"'-:,.;<>~!@#$%^&*|+=[]{}`~?".split("").cl_each(function(t){o[t]="wordSeparator"}),o[" "]="space",o["	"]="space",o["\n"]="newLine",t.defaultKeystrokes=[new e(function(t,e,n){if((t.ctrlKey||t.metaKey)&&!t.altKey){var i,o=t.charCode||t.keyCode,r=String.fromCharCode(o).toLowerCase();switch(r){case"y":i="redo";break;case"z":i=t.shiftKey?"redo":"undo"}return i?(t.preventDefault(),setTimeout(function(){n.undoMgr[i]()},10),!0):void 0}}),new e(function(t,e){function n(t,e,n,i){return n=+n||0,i=i||"",t.slice(0,e)+i+t.slice(e+n)}if(9===t.which&&!t.metaKey&&!t.ctrlKey){t.preventDefault();var i=t.shiftKey,o=e.before.lastIndexOf("\n")+1;return i?(/\s/.test(e.before.charAt(o))&&(e.before=n(e.before,o,1)),e.selection=e.selection.replace(/^[ \t]/gm,"")):e.selection?(e.before=n(e.before,o,0,"	"),e.selection=e.selection.replace(/\n(?=[\s\S])/g,"\n	")):e.before+="	",!0}}),new e(function(t,e,n){if(13!==t.which)return void(i=!1);t.preventDefault();var o=e.before.lastIndexOf("\n")+1;if(i)return e.before=e.before.substring(0,o),e.selection="",i=!1,!0;i=!1;var r=e.before.slice(o),s=r.match(/^\s*/)[0];return s.length&&(i=!0),n.undoMgr.setCurrentMode("single"),e.before+="\n"+s,e.selection="",!0}),new e(function(e,i,o){if(8===e.which||46===e.which){if(o.undoMgr.setCurrentMode("delete"),i.selection)return i.selection="",e.preventDefault(),!0;var r=t.Utils.isMac&&e.altKey||!t.Utils.isMac&&e.ctrlKey;if(r){var s=i.before+i.after,a=n(s,i.before.length,8===e.which);return 8===e.which?i.before=i.before.slice(0,a):i.after=i.after.slice(a-s.length),e.preventDefault(),!0}return 8===e.which&&"\n"===i.before.slice(-1)?(i.before=i.before.slice(0,-1),e.preventDefault(),!0):46===e.which&&"\n"===i.after.slice(0,1)?(i.after=i.after.slice(1),e.preventDefault(),!0):void 0}}),new e(function(e,i,o){if(37===e.which||39===e.which){var r=t.Utils.isMac&&e.altKey||!t.Utils.isMac&&e.ctrlKey;if(r){var s=o.getContent(),a=n(s,o.selectionMgr.selectionEnd,37===e.which);if(e.shiftKey){var c=Math.min(o.selectionMgr.selectionStart,a),l=Math.max(o.selectionMgr.selectionStart,a);i.before=s.slice(0,c),i.after=s.slice(l),i.selection=s.slice(c,l),i.isBackwardSelection=o.selectionMgr.selectionStart>a}else i.before=s.slice(0,a),i.after=s.slice(a),i.selection="";return e.preventDefault(),!0}}})]}(window.cledit),function(t){function e(t){this.id=r++,this.offset=t}var n=-1,i=1,o=0,r=0;e.prototype.adjustOffset=function(t){var e=0;t.cl_each(function(t){var r=t[0],s=t[1],a=s.length;switch(r){case o:e+=a;break;case i:this.offset>e&&(this.offset+=a),e+=a;break;case n:this.offset>e&&(this.offset-=a)}}.cl_bind(this))},t.Marker=e}(window.cledit),function(t){function e(e){function n(t){return u&&u.startContainer===t.startContainer&&u.startOffset===t.startOffset&&u.endContainer===t.endContainer&&u.endOffset===t.endOffset?void 0:(u=t,a.$trigger("selectionChanged",a.selectionStart,a.selectionEnd,t),!0)}function i(t,e){void 0===t&&(t=a.selectionStart),0>t&&(t=0),void 0===e&&(e=this.selectionEnd),0>e&&(e=0),a.selectionStart=t,a.selectionEnd=e,h()}var o=t.Utils.debounce,r=e.$contentElt,s=e.$scrollElt;t.Utils.createEventHooks(this);var a=this,c=0,l=0;this.selectionStart=0,this.selectionEnd=0,this.cursorCoordinates={},this.adjustTop=0,this.adjustBottom=0,this.findContainer=function(e){var n=t.Utils.findContainer(r,e);if("\n"===n.container.nodeValue){var i=n.container.parentNode;"hd-lf"===i.className&&i.previousSibling&&"BR"===i.previousSibling.tagName&&(n.container=i.parentNode,n.offsetInContainer=Array.prototype.indexOf.call(n.container.childNodes,0===n.offsetInContainer?i.previousSibling:i))}return n},this.createRange=function(t,n){var i=e.$document.createRange();return t===n?n=t=isNaN(t)?t:this.findContainer(0>t?0:t):(t=isNaN(t)?t:this.findContainer(0>t?0:t),n=isNaN(n)?n:this.findContainer(0>n?0:n)),i.setStart(t.container,t.offsetInContainer),i.setEnd(n.container,n.offsetInContainer),i};var d,f=o(function(){var t=this.getCoordinates(this.selectionEnd,this.selectionEndContainer,this.selectionEndOffset);if((this.cursorCoordinates.top!==t.top||this.cursorCoordinates.height!==t.height||this.cursorCoordinates.left!==t.left)&&(this.cursorCoordinates=t,this.$trigger("cursorCoordinatesChanged",t)),d){var n,i;if(n=i=s.clientHeight/2*e.options.cursorFocusRatio,n=this.adjustTop||n,i=this.adjustBottom||n,n&&i){var o=s.scrollTop+n,r=s.scrollTop+s.clientHeight-i;this.cursorCoordinates.top<o?s.scrollTop+=this.cursorCoordinates.top-o:this.cursorCoordinates.top+this.cursorCoordinates.height>r&&(s.scrollTop+=this.cursorCoordinates.top+this.cursorCoordinates.height-r)}}d=!1}.cl_bind(this));this.updateCursorCoordinates=function(t){d=d||t,f()};var u;this.restoreSelection=function(){var t=Math.min(this.selectionStart,this.selectionEnd),i=Math.max(this.selectionStart,this.selectionEnd),o=this.createRange(t,i),r=e.$window.getSelection();r.removeAllRanges();var s=this.selectionStart>this.selectionEnd;if(s&&r.extend){var a=o.cloneRange();a.collapse(!1),r.addRange(a),r.extend(o.startContainer,o.startOffset)}else r.addRange(o);return n(o),o};var h=o(function(){c=a.selectionStart,l=a.selectionEnd},50);this.setSelectionStartEnd=function(t,e){return i(t,e),this.restoreSelection()},this.saveSelectionState=function(){function t(t,e){for(var n=t.length;n--;)if(t[n]===e)return!0;return!1}function s(t,e,n){for(var i,o=n?t:t.parentNode;o;){if(i=o.parentNode,i===e)return o;o=i}return null}function d(t){for(var e=0;t=t.previousSibling;)++e;return e}function f(e,n){var i,o=[];for(i=e;i;i=i.parentNode)o.push(i);for(i=n;i;i=i.parentNode)if(t(o,i))return i;return null}function u(t,e,n,i){var o,r,a,c,l;if(t==n)return e===i?0:i>e?-1:1;if(o=s(n,t,!0))return e<=d(o)?-1:1;if(o=s(t,n,!0))return d(o)<i?-1:1;if(r=f(t,n),!r)throw new Error("comparePoints error: nodes have no common ancestor");if(a=t===r?r:s(t,r,!0),c=n===r?r:s(n,r,!0),a===c)throw module.createError("comparePoints got to case 4 and childA and childB are the same!");for(l=r.firstChild;l;){if(l===a)return-1;if(l===c)return 1;l=l.nextSibling}}function h(){var t,o=a.selectionStart,s=a.selectionEnd,l=e.$window.getSelection();if(l.rangeCount>0){var d=l.getRangeAt(0),f=d.startContainer;if(r.compareDocumentPosition(f)&Node.DOCUMENT_POSITION_CONTAINED_BY||r===f){var h=d.startOffset;f.firstChild&&h>0&&(f=f.childNodes[h-1],h=f.textContent.length);for(var g=f;f!=r;){for(;f=f.previousSibling;)h+=(f.textContent||"").length;f=g=g.parentNode}var p=d+"",v=d.endContainer.firstChild;v&&"BR"===v.tagName&&1===d.endOffset&&(p+="\n"),1==u(l.anchorNode,l.anchorOffset,l.focusNode,l.focusOffset)?(o=h+p.length,s=h):(o=h,s=h+p.length),o===s&&o===e.getContent().length?(o=--s,t=a.setSelectionStartEnd(o,s)):(i(o,s),t=n(d),t=t||c!==a.selectionStart)}}return t}function g(){return h()&&(c!==a.selectionStart||l!==a.selectionEnd)}var p=!1,v=o(function(){a.updateCursorCoordinates(g()&&p),m()}),m=o(function(){a.updateCursorCoordinates(g()&&p),p=!1},10);return function(t,e,n){return n&&(c=void 0,l=void 0),t?(p=p||e,v()):void h()}}(),this.getSelectedText=function(){var t=Math.min(this.selectionStart,this.selectionEnd),n=Math.max(this.selectionStart,this.selectionEnd);return e.getContent().substring(t,n)},this.getCoordinates=function(t,n,i){if(!n){var o=this.findContainer(t);n=o.container,i=o.offsetInContainer}var s=n;s.hasChildNodes()||(s=n.parentNode);for(var a=!1,c=e.$allElements.indexOf(s);0===s.offsetHeight&&c>0;)a=!0,s=e.$allElements[--c];var l,d,f="left";if(a||"\n"==n.textContent)l=s.getBoundingClientRect();else{var u=e.getContent()[t],h={container:n,offsetInContainer:i},g={container:n,offsetInContainer:i};t>0&&(void 0===u||"\n"==u)?(f="right",0===h.offsetInContainer?h=t-1:h.offsetInContainer-=1):g.offset===n.textContent.length?g=t+1:g.offsetInContainer+=1;var p=this.createRange(h,g);l=p.getBoundingClientRect()}return d=r.getBoundingClientRect(),{top:Math.round(l.top-d.top+r.scrollTop),height:Math.round(l.height),left:Math.round(l[f]-d.left+r.scrollLeft)}},this.getClosestWordOffset=function(t){var n=0,i=0,o=0;return e.getContent().split(/\s/).cl_some(function(e){return e&&(n=o,i=o+e.length,i>t)?!0:void(o+=e.length+1)}),{start:n,end:i}}}t.SelectionMgr=e}(window.cledit),function(t,e){function n(n,i){function o(){}function r(t){return function(){t.push(this),this.patches=g,g=[]}}function s(){var t,e,n;this.isBufferState=function(){return t=Date.now(),"single"!=this.currentMode&&this.currentMode==n&&t-e<i.bufferStateUntilIdle},this.setDefaultMode=function(t){this.currentMode=this.currentMode||t},this.resetMode=function(){m.currentMode=void 0,n=void 0},this.saveMode=function(){n=this.currentMode,this.currentMode=void 0,e=t}}function a(){Array.prototype.push.apply(g,p),p=[]}function c(t,e){var i=n.getContent();e||(t=C.patch_deepCopy(t).reverse(),t.cl_each(function(t){t.diffs.cl_each(function(t){t[0]=-t[0]})}));var o=C.patch_apply(t,i)[0],r=n.setContent(o,!0),s=C.diff_main(i,o);n.$markers.cl_each(function(t){t.adjustOffset(s)}),l.setSelectionStartEnd(r.end,r.end),l.updateCursorCoordinates(!0),m.resetMode(),f.$trigger("undoStateChange"),n.adjustCursorPosition()}t.Utils.createEventHooks(this),i={undoStackMaxSize:200,bufferStateUntilIdle:1e3}.cl_extend(i||{});var l,d,f=this,u=[],h=[],g=[],p=[],v=t.Utils.debounce;o.prototype.addToUndoStack=r(u),o.prototype.addToRedoStack=r(h);var m=new s;this.setCurrentMode=function(t){m.currentMode=t},this.setDefaultMode=m.setDefaultMode.cl_bind(m);var C=new e;this.addPatches=function(t){p.push.apply(p,t)},this.saveState=v(function(){if(h.length=0,!m.isBufferState())for(d.addToUndoStack();u.length>i.undoStackMaxSize;)u.shift();a(),d=new o,m.saveMode(),f.$trigger("undoStateChange")}),this.canUndo=function(){return!!u.length},this.canRedo=function(){return!!h.length},this.undo=function(){var t=u.pop();t&&(a(),d.addToRedoStack(),c(d.patches),g=t.patches,d=t)},this.redo=function(){var t=h.pop();t&&(d.addToUndoStack(),c(t.patches,!0),g=t.patches,d=t)},this.init=function(){l=n.selectionMgr,d||(d=new o)}}t.UndoMgr=n}(window.cledit,window.diff_match_patch),function(t){var e={isGecko:"MozAppearance"in document.documentElement.style,isWebkit:"WebkitAppearance"in document.documentElement.style,isMsie:"msTransform"in document.documentElement.style,isMac:-1!==navigator.userAgent.indexOf("Mac OS X")};e.defer=function(){var t=[],e="deferMsg";return window.addEventListener("message",function(n){n.source==window&&n.data==e&&(n.stopPropagation(),t.length>0&&t.shift()())},!0),function(n){t.push(n),window.postMessage(e,"*")}}(),e.debounce=function(t,n){var i,o;return n?function(){clearTimeout(i),i=setTimeout(t,n)}:function(){o||(o=!0,e.defer(function(){o=!1,t()}))}},e.createEventHooks=function(t){var e={};t.$trigger=function(n){var i=e[n];if(i){var o=Array.prototype.slice.call(arguments,1);i.cl_each(function(e){try{e.apply(t,o)}catch(n){}})}},t.on=function(t,n){var i=e[t];i||(i=[],e[t]=i),i.push(n)},t.off=function(t,n){var i=e[t];if(i){var o=i.indexOf(n);o>-1&&i.splice(o,1)}}},e.findContainer=function(t,e){var n,i=0;do if(n=t,t=t.firstChild)do{var o=t.textContent.length;if(e>=i&&i+o>e)break;i+=o}while(t=t.nextSibling);while(t&&t.firstChild&&3!==t.nodeType);if(t)return{container:t,offsetInContainer:e-i};for(;n.lastChild;)n=n.lastChild;return{container:n,offsetInContainer:3===n.nodeType?n.textContent.length:0}},t.Utils=e}(window.cledit),function(t){function e(t,e){this.isWatching=!1;var n;this.startWatching=function(){this.stopWatching(),this.isWatching=!0,n=new MutationObserver(e),n.observe(t.$contentElt,{childList:!0,subtree:!0,characterData:!0})},this.stopWatching=function(){n&&(n.disconnect(),n=void 0),this.isWatching=!1},this.noWatch=function(t){return this.isWatching===!0?(this.stopWatching(),t(),this.startWatching()):void t()}}t.Watcher=e}(window.cledit);
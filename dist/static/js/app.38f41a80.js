(function(e){function n(n){for(var u,a,d=n[0],r=n[1],o=n[2],s=0,l=[];s<d.length;s++)a=d[s],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&l.push(c[a][0]),c[a]=0;for(u in r)Object.prototype.hasOwnProperty.call(r,u)&&(e[u]=r[u]);h&&h(n);while(l.length)l.shift()();return i.push.apply(i,o||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],u=!0,a=1;a<t.length;a++){var d=t[a];0!==c[d]&&(u=!1)}u&&(i.splice(n--,1),e=r(r.s=t[0]))}return e}var u={},a={app:0},c={app:0},i=[];function d(e){return r.p+"static/js/"+({}[e]||e)+"."+{"chunk-05e4a9ee":"a7b8b214","chunk-0cb5ca9a":"5a324d39","chunk-105db5f5":"926dc54a","chunk-3013d020":"c25f8683","chunk-327bc0dc":"1f6423b4","chunk-4f4e7ce4":"20c3077b","chunk-629bbb66":"51e51c5a","chunk-68d85571":"3756a9a2","chunk-7650795e":"4769ba13","chunk-79ff63a0":"027ad4be","chunk-7a20f746":"49293478","chunk-7d66d03c":"51bc697a","chunk-87d1a12e":"26c1f83a","chunk-9c399990":"6b836d74","chunk-a85bd842":"1e0fb9da","chunk-af510b4e":"3cb99d71","chunk-b35d8ad0":"53648dee","chunk-d3daef7c":"f03128e9","chunk-da0f53a2":"89aa9e35","chunk-fec824bc":"a57d9324"}[e]+".js"}function r(n){if(u[n])return u[n].exports;var t=u[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.e=function(e){var n=[],t={"chunk-05e4a9ee":1,"chunk-0cb5ca9a":1,"chunk-105db5f5":1,"chunk-3013d020":1,"chunk-327bc0dc":1,"chunk-4f4e7ce4":1,"chunk-629bbb66":1,"chunk-68d85571":1,"chunk-7650795e":1,"chunk-79ff63a0":1,"chunk-7a20f746":1,"chunk-7d66d03c":1,"chunk-87d1a12e":1,"chunk-9c399990":1,"chunk-a85bd842":1,"chunk-af510b4e":1,"chunk-b35d8ad0":1,"chunk-d3daef7c":1,"chunk-da0f53a2":1,"chunk-fec824bc":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var u="static/css/"+({}[e]||e)+"."+{"chunk-05e4a9ee":"f272ac55","chunk-0cb5ca9a":"1fa59309","chunk-105db5f5":"c73d6e98","chunk-3013d020":"83ec995a","chunk-327bc0dc":"708e7b4c","chunk-4f4e7ce4":"cb36468e","chunk-629bbb66":"3f05155d","chunk-68d85571":"e4135577","chunk-7650795e":"0c8d9eba","chunk-79ff63a0":"cfd36cc2","chunk-7a20f746":"e0f210fd","chunk-7d66d03c":"850bcde7","chunk-87d1a12e":"7fcfac3b","chunk-9c399990":"da7e1755","chunk-a85bd842":"e9e49cb9","chunk-af510b4e":"d687dbd6","chunk-b35d8ad0":"4e2d3333","chunk-d3daef7c":"c69f6542","chunk-da0f53a2":"885077ed","chunk-fec824bc":"621c21e9"}[e]+".css",c=r.p+u,i=document.getElementsByTagName("link"),d=0;d<i.length;d++){var o=i[d],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===u||s===c))return n()}var l=document.getElementsByTagName("style");for(d=0;d<l.length;d++){o=l[d],s=o.getAttribute("data-href");if(s===u||s===c)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var u=n&&n.target&&n.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=u,delete a[e],h.parentNode.removeChild(h),t(i)},h.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){a[e]=0})));var u=c[e];if(0!==u)if(u)n.push(u[2]);else{var i=new Promise((function(n,t){u=c[e]=[n,t]}));n.push(u[2]=i);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.src=d(e);var l=new Error;o=function(n){s.onerror=s.onload=null,clearTimeout(h);var t=c[e];if(0!==t){if(t){var u=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+u+": "+a+")",l.name="ChunkLoadError",l.type=u,l.request=a,t[1](l)}c[e]=void 0}};var h=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(n)},r.m=e,r.c=u,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var u in e)r.d(t,u,function(n){return e[n]}.bind(null,u));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r.oe=function(e){throw console.error(e),e};var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=n,o=o.slice();for(var l=0;l<o.length;l++)n(o[l]);var h=s;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},2395:function(e,n,t){},"3aff":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);var u=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},c=[],i=(t("7c55"),t("2877")),d={},r=Object(i["a"])(d,a,c,!1,null,null,null),o=r.exports,s=t("8c4f");u["default"].use(s["a"]);const l=()=>t.e("chunk-629bbb66").then(t.bind(null,"a4c1")),h=()=>t.e("chunk-a85bd842").then(t.bind(null,"45e6")),f=()=>t.e("chunk-05e4a9ee").then(t.bind(null,"a258")),p=()=>t.e("chunk-da0f53a2").then(t.bind(null,"456c")),b=()=>t.e("chunk-79ff63a0").then(t.bind(null,"0a5e")),m=()=>t.e("chunk-3013d020").then(t.bind(null,"bfaf")),k=()=>t.e("chunk-68d85571").then(t.bind(null,"d1b9")),v=()=>t.e("chunk-7a20f746").then(t.bind(null,"ef65")),g=()=>t.e("chunk-105db5f5").then(t.bind(null,"7356")),L=()=>t.e("chunk-7650795e").then(t.bind(null,"a1597")),y=()=>t.e("chunk-b35d8ad0").then(t.bind(null,"4920")),w=()=>t.e("chunk-fec824bc").then(t.bind(null,"b258")),M=()=>t.e("chunk-87d1a12e").then(t.bind(null,"972a")),S=()=>t.e("chunk-4f4e7ce4").then(t.bind(null,"68e2")),I=()=>t.e("chunk-9c399990").then(t.bind(null,"794be")),C=()=>t.e("chunk-327bc0dc").then(t.bind(null,"b78d")),P=()=>t.e("chunk-7d66d03c").then(t.bind(null,"3473")),T=()=>t.e("chunk-0cb5ca9a").then(t.bind(null,"6da8")),x=()=>t.e("chunk-af510b4e").then(t.bind(null,"3a4b")),O=[{path:"/",name:"Index",redirect:"/discover",component:()=>t.e("chunk-d3daef7c").then(t.bind(null,"d504")),children:[{path:"/discover",component:l,redirect:"/discover/recommend",children:[{path:"/discover/recommend",component:h},{path:"/discover/musiclist",component:f},{path:"/discover/ranking",component:p},{path:"/discover/singer",component:b}]},{path:"/video",component:m,redirect:"/video/videolist",children:[{path:"/video/videolist",component:v},{path:"/video/mvlist",component:g}]},{path:"/recommendmusic",component:L},{path:"/favorites",component:y},{path:"/musiclistdetail/:id",name:"musicListDetail",component:w},{path:"/Personal/:uid",name:"personal",component:M},{path:"/singerdetail/:id",name:"singerDetail",component:S},{path:"/videodetail/:id/:type",name:"videoDetail",component:k},{path:"/search/:id",name:"search",component:I,redirect:"/search/searchsong/:id",children:[{path:"/search/searchsong/:id",name:"searchSong",component:C},{path:"/search/searchsinger/:id",name:"searchSinger",component:P},{path:"/search/searchvideo/:id",name:"searchVideo",component:T},{path:"/search/searchmusiclist/:id",name:"searchMusicList",component:x}]}]}],j=new s["a"]({mode:"history",base:"",routes:O});var D=j,_=t("2f62");u["default"].use(_["a"]);const A={musicId:"",isPlay:!1,musicList:[],musicListId:"",isLogin:!1,currentIndex:-1,isMusicDetailCardShow:!1,currentTime:0,isMusicLoad:!1,currentRowInfo:{},likeMuiscList:[],subAlbumList:null,subSingerList:null,subVideoList:null,collectMusicList:[],createdMusicList:[],downloadMusicInfo:{name:"",url:""},likeVideoList:null},E=new _["a"].Store({state:A,mutations:{updateMusicId(e,n){e.musicId=n},changePlayState(e,n){e.isPlay=n},updateMusicList(e,n){n.musicListId!==e.musicListId&&(e.musicListId=n.musicListId,e.currentIndex=-1);const t=n.musicList.slice(0);e.musicList=t},updataLoginState(e,n=!1){e.isLogin=n},updateCurrentIndex(e,n){e.currentIndex=n},changeMusicDetailCardState(e){e.isMusicDetailCardShow=!e.isMusicDetailCardShow},updateCurrentTime(e,n){e.currentTime=n},updateMusicLoadState(e,n){e.isMusicLoad=n},updateCurrentRowInfo(e,n){e.currentRowInfo=n},updataLikeMuiscList(e,n){e.likeMuiscList=n},updateSubAlbumList(e,n){e.subAlbumList=n},updateSubSingerList(e,n){e.subSingerList=n},updateSubVideoList(e,n){e.subVideoList=n},updateCollectMusicList(e,n){e.collectMusicList=n},updateCreatedMusicList(e,n){e.createdMusicList=n},updateDownloadMusicInfo(e,n){e.downloadMusicInfo=n},updateLikeVideoList(e,n){e.likeVideoList=n}}});var V=E,N=t("5c96");u["default"].use(N["Container"]),u["default"].use(N["Header"]),u["default"].use(N["Aside"]),u["default"].use(N["Main"]),u["default"].use(N["Switch"]),u["default"].use(N["Menu"]),u["default"].use(N["MenuItem"]),u["default"].use(N["MenuItemGroup"]),u["default"].use(N["Submenu"]),u["default"].use(N["Carousel"]),u["default"].use(N["CarouselItem"]),u["default"].use(N["Pagination"]),u["default"].use(N["Tabs"]),u["default"].use(N["TabPane"]),u["default"].use(N["Table"]),u["default"].use(N["TableColumn"]),u["default"].use(N["Slider"]),u["default"].use(N["Input"]),u["default"].use(N["Popover"]),u["default"].use(N["Button"]),u["default"].use(N["Form"]),u["default"].use(N["FormItem"]),u["default"].use(N["Drawer"]),u["default"].use(N["InfiniteScroll"]),u["default"].use(N["Dialog"]),u["default"].use(N["Link"]),u["default"].use(N["Tooltip"]),u["default"].use(N["Loading"]),u["default"].prototype.$message=N["Message"];var B=t("bc3a"),R=t.n(B);u["default"].prototype.axios=R.a;const F=R.a.create({baseURL:"/api",timeout:3e4,withCredentials:!0});F.defaults.withCredentials=!0;const $=(e,n={},t=!0)=>new Promise((u,a)=>{let c=null;t&&(c=N["Loading"].service({fullscreen:!0}));const i={params:n};F.get(e,n?i:null).then(e=>{t&&c.close(),u(e.data)}).catch(e=>{console.log("黄err ==> ",e),a(e)})});R.a,t("3aff"),t("0fae");u["default"].prototype.get=$,u["default"].config.productionTip=!1,new u["default"]({router:D,store:V,render(e){return e(o)}}).$mount("#app")},"7c55":function(e,n,t){"use strict";t("2395")}});
//# sourceMappingURL=app.38f41a80.js.map
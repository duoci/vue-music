(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-82c226aa"],{2392:function(t,a,e){"use strict";e("6571")},2746:function(t,a,e){},"3a51":function(t,a,e){"use strict";e("2746")},5330:function(t,a,e){},6571:function(t,a,e){},7356:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mvList"},[e("div",{staticClass:"musicListNavBar"},[e("div",{staticClass:"selectorItem"},[e("div",{staticClass:"title"},[t._v("地区：")]),e("allNarbar",{staticClass:"secondNavBar",attrs:{allNavBarData:t.areaList},on:{clickNavBarItem:t.areaItem}})],1),e("div",{staticClass:"selectorItem"},[e("div",{staticClass:"title"},[t._v("类型：")]),e("allNarbar",{staticClass:"secondNavBar",attrs:{allNavBarData:t.typeList},on:{clickNavBarItem:t.typeItem}})],1),e("div",{staticClass:"selectorItem"},[e("div",{staticClass:"title"},[t._v("排序：")]),e("allNarbar",{staticClass:"secondNavBar",attrs:{allNavBarData:t.orderList},on:{clickNavBarItem:t.orderItem}})],1)]),e("video-list-card",{staticClass:"cardList",attrs:{videoList:t.mvList,isLoad:!0,videoType:"mv"},on:{clickListCardItem:t.goToMvDetail,bottomLoad:t.bottomLoad}})],1)},s=[],r=e("e47c"),n=e("cf90"),l={components:{allNarbar:r["a"],VideoListCard:n["a"]},name:"MvList",data(){return{areaList:[{name:"全部",path:""},{name:"内地",path:"内地"},{name:"港台",path:"港台"},{name:"欧美",path:"欧美"},{name:"日本",path:"日本"},{name:"韩国",path:"韩国"}],typeList:[{name:"全部",path:""},{name:"官方版",path:"官方版"},{name:"原生",path:"原生"},{name:"现场版",path:"现场版"},{name:"网易出品",path:"网易出品"}],orderList:[{name:"上升最快",path:""},{name:"最热",path:"最热"},{name:"最新",path:"最新"}],area:"",type:"",order:"",mvPage:1,hasMore:!1,mvList:[]}},methods:{async getMvList(){const t=await this.get("/mv/all",{area:this.area,type:this.type,order:this.order,offset:30*(this.mvPage-1)});this.hasMore=t.hasMore,this.mvList.push(...t.data)},areaItem(t){this.area=this.areaList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},typeItem(t){this.type=this.typeList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},orderItem(t){this.order=this.orderList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},goToMvDetail({id:t}){this.$router.push({name:"videoDetail",params:{id:t,type:"mv"}})},bottomLoad(){this.hasMore&&(this.mvPage+=1,this.getMvList())}},async created(){await this.getMvList()}},c=l,o=(e("928a"),e("2877")),d=Object(o["a"])(c,i,s,!1,null,"6f8a87fa",null);a["default"]=d.exports},"928a":function(t,a,e){"use strict";e("5330")},cf90:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",["singerMv"==t.videoType||"mv"==t.videoType?e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(a,i){return e("div",{key:i,staticClass:"cardItem",on:{click:function(e){return t.clickListCardItem(a.id,i,a.type)}}},[e("div",{staticClass:"videoCover"},[e("img",{attrs:{src:("singerMv"==t.videoType?a.imgurl:a.cover)+"?param=680y400",alt:""}}),e("div",{staticClass:"playCount"},[e("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(a.playCount)))]),"singerMv"==t.videoType?e("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(a.duration))+" ")]):t._e()]),e("div",{staticClass:"videoTitle"},[t._v(t._s(a.name))]),"mv"==t.videoType?e("div",{staticClass:"singer"},[t._v(t._s(a.artistName))]):t._e()])})),0):"video"==t.videoType?e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(a,i){return e("div",{key:i,staticClass:"cardItem",on:{click:function(e){return t.clickListCardItem(a.vid||a.data.vid,i,a.type)}}},[e("div",{staticClass:"videoCover"},[e("img",{attrs:{src:(a.coverUrl||a.data.coverUrl)+"?param=1260y800",alt:""}}),e("div",{staticClass:"playCount"},[e("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(a.playTime||a.data.playTime)))]),e("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(a.durationms||a.data.durationms))+" ")])]),e("div",{staticClass:"videoTitle"},[t._v(t._s(a.title||a.data.title))])])})),0):t._e()])},s=[],r=e("d930"),n={name:"VideoListCard",data(){return{disabled:!0}},props:{videoList:{type:Array,default(){return[]}},isLoad:{type:Boolean,default(){return!1}},videoType:{type:String,default(){return"singerMv"}}},methods:{clickListCardItem(t,a,e){this.$emit("clickListCardItem",{id:t,index:a,type:e})},load(){this.$emit("bottomLoad"),this.disabled=!0}},filters:{handleMusicTime:r["b"],handleNum:r["c"]},watch:{videoList(){!0===this.isLoad&&(0!==this.videoList.length?this.disabled=!1:this.disabled=!0)}}},l=n,c=(e("2392"),e("2877")),o=Object(c["a"])(l,i,s,!1,null,"2ef37bc3",null);a["a"]=o.exports},d930:function(t,a,e){"use strict";function i(t,a){/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(""+t.getFullYear()).substr(4-RegExp.$1.length)));const e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(const i in e)if(new RegExp(`(${i})`).test(a)){const t=""+e[i];a=a.replace(RegExp.$1,1===RegExp.$1.length?t:s(t))}return a}function s(t){return("00"+t).substr(t.length)}function r(t){return t>1e4?(t=(t/1e4).toFixed(1),t+"万"):t}function n(t){t=parseInt(t),t=t>1e4?Math.floor(t/1e3):Math.floor(t);let a=Math.floor(t/60),e=Math.floor(t%60);return a=a<10?"0"+a:a,e=e<10?"0"+e:e,`${a}:${e}`}function l(t){t=t.split(":");const a=parseInt(t[0]),e=parseInt(t[1]);return 60*a+e}e.d(a,"a",(function(){return i})),e.d(a,"c",(function(){return r})),e.d(a,"b",(function(){return n})),e.d(a,"d",(function(){return l}))},e47c:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"allNarbar"},[e("div",{staticClass:"navlist"},t._l(t.allNavBarData,(function(a,i){return e("div",{key:i,staticClass:"item",class:t.activeNum==i?"active":"",on:{click:function(a){return t.clickNavItem(i)}}},[t._v(" "+t._s(a.name)+" ")])})),0)])},s=[],r={name:"allNarbar",data(){return{activeNum:0}},props:{allNavBarData:{type:Array,default(){return[]}},itemWidth:{type:Number,default(){return 40}},currentTag:{type:Object,default(){return{}}}},methods:{clickNavItem(t){this.activeNum!==t&&(this.activeNum=t,this.$emit("clickNavBarItem",t))}}},n=r,l=(e("3a51"),e("2877")),c=Object(l["a"])(n,i,s,!1,null,"ef4c4be8",null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-82c226aa.340b16d7.js.map
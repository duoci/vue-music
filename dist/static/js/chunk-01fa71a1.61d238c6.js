(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01fa71a1"],{1727:function(t,i,e){},2392:function(t,i,e){"use strict";e("6571")},3587:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"musiclistnavbar"},[e("div",{staticClass:"left"},[e("el-popover",{attrs:{placement:"bottom-start",width:"350","popper-class":"sortPop",trigger:"click","visible-arrow":!1},on:{show:t.showSortPop},model:{value:t.isSortPopShow,callback:function(i){t.isSortPopShow=i},expression:"isSortPopShow"}},[e("div",{staticClass:"SortBox",attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(t.currentTag.name)+" "),e("i",{staticClass:"iconfont icon-arrow-right-bold"})]),0==t.sortList.length?e("div",{staticClass:"tips"},[t._v("正在加载分类数据...")]):e("div",{staticClass:"sortList"},t._l(t.sortList,(function(i,s){return e("div",{key:s,staticClass:"sortItme",class:t.currentTag.name==i.name?"currentItem":"",on:{click:function(e){return t.clickItem(i)}}},[t._v(" "+t._s(i.name)+" ")])})),0)])],1),e("div",{staticClass:"right"},[e("div",{staticClass:"navlist"},t._l(t.navData,(function(i,s){return e("div",{key:s,staticClass:"item",class:t.activeNum==s?"active":"",on:{click:function(i){return t.clickNavItem(s)}}},[t._v(" "+t._s(i.name)+" ")])})),0)])])},a=[],o={name:"musiclistnavbar",props:{sortList:{type:Array,default(){return[]}},currentTag:{type:Object,default(){return{}}},navData:{type:Array,default(){return[]}}},data(){return{isSortPopShow:!1,activeNum:0}},methods:{showSortPop(){0===this.sortList.length&&this.$emit("getSortList")},clickItem(t){this.$emit("clickSortBoxItem",t),this.isSortPopShow=!1},clickNavItem(t){this.activeNum!==t&&(this.activeNum=t,this.$emit("clickSecondBarItem",t))}},watch:{currentTag(t){this.activeNum=this.navData.findIndex(i=>i.name===t.name)}}},r=o,n=(e("7d5b"),e("2877")),c=Object(n["a"])(r,s,a,!1,null,"56e7d8c0",null);i["a"]=c.exports},4363:function(t,i,e){},6571:function(t,i,e){},"7d5b":function(t,i,e){"use strict";e("4363")},"81f1":function(t,i,e){"use strict";e("1727")},cf90:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",["singerMv"==t.videoType||"mv"==t.videoType?e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(i,s){return e("div",{key:s,staticClass:"cardItem",on:{click:function(e){return t.clickListCardItem(i.id,s,i.type)}}},[e("div",{staticClass:"videoCover"},[e("img",{attrs:{src:("singerMv"==t.videoType?i.imgurl:i.cover)+"?param=680y400",alt:""}}),e("div",{staticClass:"playCount"},[e("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(i.playCount)))]),"singerMv"==t.videoType?e("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(i.duration))+" ")]):t._e()]),e("div",{staticClass:"videoTitle"},[t._v(t._s(i.name))]),"mv"==t.videoType?e("div",{staticClass:"singer"},[t._v(t._s(i.artistName))]):t._e()])})),0):"video"==t.videoType?e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(i,s){return e("div",{key:s,staticClass:"cardItem",on:{click:function(e){return t.clickListCardItem(i.vid||i.data.vid,s,i.type)}}},[e("div",{staticClass:"videoCover"},[e("img",{attrs:{src:(i.coverUrl||i.data.coverUrl)+"?param=1260y800",alt:""}}),e("div",{staticClass:"playCount"},[e("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(i.playTime||i.data.playTime)))]),e("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(i.durationms||i.data.durationms))+" ")])]),e("div",{staticClass:"videoTitle"},[t._v(t._s(i.title||i.data.title))])])})),0):t._e()])},a=[],o=e("d930"),r={name:"VideoListCard",data(){return{disabled:!0}},props:{videoList:{type:Array,default(){return[]}},isLoad:{type:Boolean,default(){return!1}},videoType:{type:String,default(){return"singerMv"}}},methods:{clickListCardItem(t,i,e){this.$emit("clickListCardItem",{id:t,index:i,type:e})},load(){this.$emit("bottomLoad"),this.disabled=!0}},filters:{handleMusicTime:o["b"],handleNum:o["c"]},watch:{videoList(){!0===this.isLoad&&(0!==this.videoList.length?this.disabled=!1:this.disabled=!0)}}},n=r,c=(e("2392"),e("2877")),d=Object(c["a"])(n,s,a,!1,null,"2ef37bc3",null);i["a"]=d.exports},d930:function(t,i,e){"use strict";function s(t,i){/(y+)/.test(i)&&(i=i.replace(RegExp.$1,(""+t.getFullYear()).substr(4-RegExp.$1.length)));const e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(const s in e)if(new RegExp(`(${s})`).test(i)){const t=""+e[s];i=i.replace(RegExp.$1,1===RegExp.$1.length?t:a(t))}return i}function a(t){return("00"+t).substr(t.length)}function o(t){return t>1e4?(t=(t/1e4).toFixed(1),t+"万"):t}function r(t){t=parseInt(t),t=t>1e4?Math.floor(t/1e3):Math.floor(t);let i=Math.floor(t/60),e=Math.floor(t%60);return i=i<10?"0"+i:i,e=e<10?"0"+e:e,`${i}:${e}`}function n(t){t=t.split(":");const i=parseInt(t[0]),e=parseInt(t[1]);return 60*i+e}e.d(i,"a",(function(){return s})),e.d(i,"c",(function(){return o})),e.d(i,"b",(function(){return r})),e.d(i,"d",(function(){return n}))},ef65:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"videoList"},[0!=t.videoCategory.length?e("div",{staticClass:"musicListNavBar"},[e("musiclistnavbar",{attrs:{currentTag:t.currentTag,sortList:t.sortList,navData:t.videoCategory},on:{getSortList:t.getSortList,clickSortBoxItem:t.clickSortBoxItem,clickSecondBarItem:t.clickSecondBarItem}})],1):t._e(),e("video-list-card",{staticClass:"cardList",attrs:{videoList:t.videoList,isLoad:!0,videoType:"video"},on:{clickListCardItem:t.goToVideoDetail,bottomLoad:t.bottomLoad}})],1)},a=[],o=e("3587"),r=e("cf90"),n={components:{VideoListCard:r["a"],musiclistnavbar:o["a"]},name:"VideoList",data(){return{videoCategory:[],currentTag:{},videoPage:1,hasMore:!0,videoList:[],sortList:[]}},methods:{async getVideoCategory(){const t=await this.get("/video/category/list");this.videoCategory=t.data,this.currentTag=t.data[0]},async getVideoList(t){let i=2;while(i){if(!this.hasMore)return;{const e=await this.get("/video/group",{id:t,offset:8*(this.videoPage-1)});this.hasMore=e.hasmore,this.videoList.push(...e.datas),this.videoPage+=1,i--}}},async getSortList(){const t=await this.get("/video/group/list");this.sortList=t.data},clickSecondBarItem(t){this.videoPage=1,this.videoList=[],this.currentTag=this.videoCategory[t],this.getVideoList(this.currentTag.id)},goToVideoDetail({id:t}){this.$router.push({name:"videoDetail",params:{id:t,type:"video"}})},bottomLoad(){this.hasMore&&this.getVideoList(this.currentTag.id)},clickSortBoxItem(t){this.currentTag=t,this.videoPage=1,this.videoList=[],this.getVideoList(t.id)}},async created(){await this.getVideoCategory(),await this.getVideoList(this.currentTag.id)}},c=n,d=(e("81f1"),e("2877")),l=Object(d["a"])(c,s,a,!1,null,"6166ed8e",null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-01fa71a1.61d238c6.js.map
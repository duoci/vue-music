(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cb5ca9a"],{2392:function(e,t,i){"use strict";i("6571")},"3cc0":function(e,t,i){"use strict";i("c13e")},6571:function(e,t,i){},"6da8":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"SearchVideo"},[i("div",{staticClass:"tip"},[e._v("找到 "+e._s(e.videoCount)+" 个视频")]),i("video-list-card",{attrs:{videoList:e.searchVideoList,videoType:"video"},on:{clickListCardItem:e.clickListCardItem}}),0!=e.searchVideoList.length?i("div",{staticClass:"page"},[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.videoCount,small:"","page-size":30,"current-page":e.currentPage},on:{"current-change":e.pageChange}})],1):e._e()],1)},a=[],n=i("cf90"),r={components:{VideoListCard:n["a"]},name:"SearchVideo",data(){return{videoCount:0,searchVideoList:[],currentPage:1}},methods:{async getSearchVideo(){const e=await this.get("/cloudsearch",{keywords:this.$route.params.id,offset:30*(this.currentPage-1),type:1014});this.videoCount=e.result.videoCount,this.searchVideoList=e.result.videos},pageChange(e){this.currentPage=e,this.searchVideoList=[],this.getSearchVideo()},clickListCardItem({id:e,type:t}){0===t?this.$router.push({name:"videoDetail",params:{id:e,type:"mv"}}):this.$router.push({name:"videoDetail",params:{id:e,type:"video"}})}},created(){this.getSearchVideo()}},o=r,d=(i("3cc0"),i("2877")),c=Object(d["a"])(o,s,a,!1,null,"11d15320",null);t["default"]=c.exports},c13e:function(e,t,i){},cf90:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",["singerMv"==e.videoType||"mv"==e.videoType?i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":e.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},e._l(e.videoList,(function(t,s){return i("div",{key:s,staticClass:"cardItem",on:{click:function(i){return e.clickListCardItem(t.id,s,t.type)}}},[i("div",{staticClass:"videoCover"},[i("img",{attrs:{src:("singerMv"==e.videoType?t.imgurl:t.cover)+"?param=680y400",alt:""}}),i("div",{staticClass:"playCount"},[i("i",{staticClass:"iconfont icon-shipin"}),e._v(e._s(e._f("handleNum")(t.playCount)))]),"singerMv"==e.videoType?i("div",{staticClass:"videoTime"},[e._v(" "+e._s(e._f("handleMusicTime")(t.duration))+" ")]):e._e()]),i("div",{staticClass:"videoTitle"},[e._v(e._s(t.name))]),"mv"==e.videoType?i("div",{staticClass:"singer"},[e._v(e._s(t.artistName))]):e._e()])})),0):"video"==e.videoType?i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":e.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},e._l(e.videoList,(function(t,s){return i("div",{key:s,staticClass:"cardItem",on:{click:function(i){return e.clickListCardItem(t.vid||t.data.vid,s,t.type)}}},[i("div",{staticClass:"videoCover"},[i("img",{attrs:{src:(t.coverUrl||t.data.coverUrl)+"?param=1260y800",alt:""}}),i("div",{staticClass:"playCount"},[i("i",{staticClass:"iconfont icon-shipin"}),e._v(e._s(e._f("handleNum")(t.playTime||t.data.playTime)))]),i("div",{staticClass:"videoTime"},[e._v(" "+e._s(e._f("handleMusicTime")(t.durationms||t.data.durationms))+" ")])]),i("div",{staticClass:"videoTitle"},[e._v(e._s(t.title||t.data.title))])])})),0):e._e()])},a=[],n=i("d930"),r={name:"VideoListCard",data(){return{disabled:!0}},props:{videoList:{type:Array,default(){return[]}},isLoad:{type:Boolean,default(){return!1}},videoType:{type:String,default(){return"singerMv"}}},methods:{clickListCardItem(e,t,i){this.$emit("clickListCardItem",{id:e,index:t,type:i})},load(){this.$emit("bottomLoad"),this.disabled=!0}},filters:{handleMusicTime:n["b"],handleNum:n["c"]},watch:{videoList(){!0===this.isLoad&&(0!==this.videoList.length?this.disabled=!1:this.disabled=!0)}}},o=r,d=(i("2392"),i("2877")),c=Object(d["a"])(o,s,a,!1,null,"2ef37bc3",null);t["a"]=c.exports},d930:function(e,t,i){"use strict";function s(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(""+e.getFullYear()).substr(4-RegExp.$1.length)));const i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(const s in i)if(new RegExp(`(${s})`).test(t)){const e=""+i[s];t=t.replace(RegExp.$1,1===RegExp.$1.length?e:a(e))}return t}function a(e){return("00"+e).substr(e.length)}function n(e){return e>1e4?(e=(e/1e4).toFixed(1),e+"万"):e}function r(e){e=parseInt(e),e=e>1e4?Math.floor(e/1e3):Math.floor(e);let t=Math.floor(e/60),i=Math.floor(e%60);return t=t<10?"0"+t:t,i=i<10?"0"+i:i,`${t}:${i}`}function o(e){e=e.split(":");const t=parseInt(e[0]),i=parseInt(e[1]);return 60*t+i}i.d(t,"a",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"b",(function(){return r})),i.d(t,"d",(function(){return o}))}}]);
//# sourceMappingURL=chunk-0cb5ca9a.5a324d39.js.map
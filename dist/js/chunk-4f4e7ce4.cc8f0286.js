(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f4e7ce4"],{"08a8":function(i,t,s){i.exports=s.p+"img/topSongsLogo.3c321631.png"},1341:function(i,t,s){},2392:function(i,t,s){"use strict";s("6571")},6571:function(i,t,s){},"68e2":function(i,t,s){"use strict";s.r(t);var e=function(){var i=this,t=i.$createElement,e=i._self._c||t;return i.singerInfo.cover?e("div",{staticClass:"singerDetail"},[e("div",{staticClass:"listInfo"},[e("div",{staticClass:"listAvatar"},[e("img",{attrs:{src:i.singerInfo.cover+"?param=300y300",alt:""}})]),e("div",{staticClass:"right"},[e("div",{staticClass:"title"},[e("div",{staticClass:"titleContent"},[i._v(i._s(i.singerInfo.name))])]),e("div",{staticClass:"buttons"},[e("div",{staticClass:"buttonItem",on:{click:i.subSinger}},[e("i",{staticClass:"iconfont icon-xihuan",class:i.isSub?"red":""}),e("span",[i._v(i._s(i.isSub?"已收藏":"收藏"))])]),i._m(0)]),e("div",{staticClass:"otherInfo"},[e("div",{staticClass:"musicNum"},[i._v("单曲数 : "+i._s(i.singerInfo.musicSize))]),e("div",{staticClass:"musicNum"},[i._v("专辑数 : "+i._s(i.singerInfo.albumSize))]),e("div",{staticClass:"musicNum"},[i._v("MV数 : "+i._s(i.singerInfo.mvSize))])])])]),e("div",{staticClass:"musicList"},[e("el-tabs",{attrs:{value:"first"},on:{"tab-click":i.clickTab}},[e("el-tab-pane",{attrs:{label:"专辑",name:"first"}},[i.topSongs.topSongs?e("div",{staticClass:"topSongs"},[e("list-table",{attrs:{officialListDetailItem:i.topSongs,isCheckAllShow:i.isCheckAllShow,cover:s("08a8"),listId:this.$route.params.id.toString()},on:{handleRowClick:i.handleRowClick,handleRowDbClick:i.handleRowDbClick,clickCheckAll:i.allTopSongs}},[e("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"title"},[i._v("热门50首")])])])],1):i._e(),0!=i.singerAlbum.length?e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:i.load,expression:"load"}],staticClass:"albumItemContainer",attrs:{"infinite-scroll-disabled":i.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},i._l(i.singerAlbum,(function(t,s){return e("div",{key:s,staticClass:"albumItem"},[e("list-table",{attrs:{officialListDetailItem:t.songsObj,cover:t.album.blurPicUrl+"?param=300y300",listId:t.album.id.toString()},on:{handleRowClick:i.handleRowClick,handleRowDbClick:i.handleRowDbClick}},[e("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"title"},[i._v(i._s(t.album.name))])])])],1)})),0):i._e()]),e("el-tab-pane",{attrs:{label:"MV",name:"second"}},[e("video-list-card",{attrs:{videoList:i.singerMvInfo.mvs,isLoad:!0},on:{clickListCardItem:i.goToVideoDetail,bottomLoad:i.bottomLoad}})],1),e("el-tab-pane",{attrs:{label:"歌手详情",name:"third"}},[e("div",{staticClass:"singerDesc"},[i._v(i._s(i.singerInfo.briefDesc))])])],1)],1)]):i._e()},a=[function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"buttonItem"},[s("i",{staticClass:"iconfont icon-link"}),s("span",[i._v("个人主页")])])}],n=s("d930"),l=function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",[s("div",{staticClass:"officalItem"},[s("div",{staticClass:"listCover"},[s("img",{attrs:{src:i.officialListDetailItem.coverImgUrl||i.cover,alt:""},on:{click:function(t){i.officialListDetailItem.coverImgUrl&&i.clickCheckAll(i.officialListDetailItem.id)}}})]),s("div",{staticClass:"listContainer"},[i._t("header"),s("table",i._l(i.officialListDetailItem.tracks&&i.officialListDetailItem.tracks.slice(0,5)||i.officialListDetailItem.topSongs&&(i.officialListDetailItem.isOpen?i.officialListDetailItem.topSongs:i.officialListDetailItem.topSongs.slice(0,10))||i.officialListDetailItem.songs.slice(0,10),(function(t,e){return s("tr",{key:e,staticClass:"listRows",on:{click:i.handleRowClick,dblclick:function(s){return i.handleRowDbClick(i.officialListDetailItem.id||t.id,e)}}},[s("td",{staticClass:"index"},[i._v(i._s(e+1))]),s("td",{staticClass:"musicName"},[i._v(i._s(t.name))]),s("td",{staticClass:"singer"},[i._v(i._s(t.ar[0].name))])])})),0),s("div",{directives:[{name:"show",rawName:"v-show",value:i.isCheckAllShow,expression:"isCheckAllShow"}],staticClass:"checkAll",on:{click:function(t){return i.clickCheckAll(i.officialListDetailItem.id)}}},[i._v(" 查看全部 "),s("i",{staticClass:"iconfont icon-arrow-right-bold"})])],2)])])},o=[],r={name:"ListTable",data(){return{}},props:{officialListDetailItem:{type:Object,default(){return{}}},cover:{type:String,default(){return""}},listId:{type:String,default(){return""}},isCheckAllShow:{type:Boolean,default(){return!0}}},methods:{handleRowClick(i){let t;t="tr"===i.path[0].localName?i.path[0]:i.path[1],this.$emit("handleRowClick",t)},handleRowDbClick(i,t){const{listId:s}=this;this.$emit("handleRowDbClick",{id:i,index:t,listId:s})},clickCheckAll(i){const{listId:t}=this;this.$emit("clickCheckAll",{id:i,listId:t})}}},c=r,d=(s("907d"),s("2877")),u=Object(d["a"])(c,l,o,!1,null,"13e148ca",null),h=u.exports,m=s("cf90"),f=s("2f62");const g={};let v;var b={components:{ListTable:h,VideoListCard:m["a"]},name:"SingerDetail",data(){return{singerInfo:{},topSongs:{},singerAlbum:[],albumPage:1,disabled:!0,isAlbumMore:!1,isCheckAllShow:!0,singerMvInfo:{mvs:[],hasMore:!1},videoPage:1,isDbc:!1,isSub:!1}},computed:{...Object(f["c"])(["musicListId","isMusicLoad","currentRowInfo","isLogin","subSingerList","musicId"])},methods:{...Object(f["b"])(["updateSubSingerList","updateMusicId","updateMusicList","updateCurrentRowInfo"]),async getSingerInfo(){const i=await this.get("/artist/detail",{id:this.$route.params.id});this.singerInfo=i.data.artist},async getSingerTopSongs(){const i=await this.get("/artist/top/song",{id:this.$route.params.id}),t=i.songs;t.forEach((i,s)=>{t[s].dt=Object(n["b"])(i.dt)}),this.topSongs={topSongs:t,isOpen:!1}},async getAlbumInfo(){let i=await this.get("/artist/album",{id:this.$route.params.id,limit:20,offset:20*(this.albumPage-1)});this.isAlbumMore=i.more,i=i.hotAlbums,await i.forEach(i=>{this.getAlbumDetail(i.id)})},async getAlbumDetail(i){const t=await this.get("/album",{id:i}),{songs:s}=t;s.forEach((i,t)=>{s[t].dt=Object(n["b"])(i.dt)}),t.songsObj={songs:s},this.singerAlbum.push(t)},async getSingerMv(){const i=await this.get("/artist/mv",{id:this.$route.params.id,limit:20*this.videoPage});this.singerMvInfo=i},async getSubSingerList(){const i=Date.parse(new Date),t=await this.get("/artist/sublist",{limit:1e3,timestamp:i});this.updateSubSingerList(t.data)},handleRowClick(i){document.querySelector(".selectRow")&&document.querySelector(".selectRow").classList.remove("selectRow"),i.classList.add("selectRow")},handleRowDbClick({id:i,index:t,listId:s}){if(this.isDbc=!0,this.handleViewDOM(i,s,t),s!==this.$route.params.id){const t=this.singerAlbum.findIndex(i=>i.album.id===Number(s));this.updateMusicId(i),s!==this.musicListId&&this.updateMusicList({musicList:this.singerAlbum[t].songs,musicListId:s})}else this.$store.commit("updateMusicId",i),this.$route.params.id!==this.musicListId&&this.updateMusicList({musicList:this.topSongs.topSongs,musicListId:this.$route.params.id})},handleViewDOM(i,t,s){g.listId&&this.cleanStyle(g.i,g.listId);const e=document.querySelectorAll("table");let a=-1,n=-1;if(t===this.$route.params.id)n=0;else{if(n=this.singerAlbum.findIndex(i=>i.album.id===t),-1===n)return;n+=1}if(a=void 0===s?0===n?this.topSongs.topSongs.findIndex(t=>t.id===i):this.singerAlbum[n-1].songs.findIndex(t=>t.id===i):s,e[n]&&e[n].children[a]){const i=e[n].children[a];i.querySelector(".index").innerHTML="<i class='iconfont icon-yinliang' style='color:#ff4e4e'></i>",i.querySelector(".musicName").style.color="#ff4e4e",g.i=a,g.listId=t,g.singerId=this.$route.params.id,this.updateCurrentRowInfo(g)}},cleanStyle(i,t){const s=document.querySelectorAll("table");let e=-1;if(t===this.$route.params.id)e=0;else{if(e=this.singerAlbum.findIndex(i=>i.album.id===t),-1===e)return;e+=1}if(s[e]&&s[e].children[i]){const t=s[e].children[i];t.querySelector(".index").innerHTML=i+1,t.querySelector(".musicName").style.color="#1f1f1f"}},allTopSongs(){this.topSongs.isOpen=!0,this.isCheckAllShow=!1,setTimeout(()=>{this.currentRowInfo.singerId===this.$route.params.id&&this.handleViewDOM(this.musicId,this.musicListId)},500)},load(){this.disabled=!0,this.albumPage+=1,this.getAlbumInfo()},bottomLoad(){!0===this.singerMvInfo.hasMore&&(this.videoPage+=1,this.getSingerMv())},goToVideoDetail({id:i}){this.$store.state.isLogin?this.$router.push({name:"videoDetail",params:{id:i,type:"mv"}}):this.$message.error("登录后才能观看MV哦!")},clickTab(i){"1"===i.index&&0===this.singerMvInfo.mvs.length&&this.getSingerMv()},getIsSub(){this.isSub=this.subSingerList.find(i=>i.id===this.$route.params.id)},async subSinger(){this.isLogin?(this.isSub=!this.isSub,await this.get("/artist/sub",{id:this.$route.params.id,t:this.isSub?1:0}),this.getSubSingerList()):this.$message.error("请先登录!")}},created(){this.getSingerInfo()},watch:{singerAlbum(){0!==this.singerAlbum.length&&this.isAlbumMore?this.disabled=!1:this.disabled=!0},isMusicLoad(i){i||(this.isDbc=!1)},musicId(i,t){this.isDbc||this.handleViewDOM(this.musicId,this.musicListId)},singerAlbum(){clearTimeout(v),v=setTimeout(()=>{this.currentRowInfo.singerId===this.$route.params.id&&this.handleViewDOM(this.musicId,this.musicListId)},500)}},async mounted(){await this.getSingerTopSongs(),await this.getAlbumInfo(),this.$nextTick(()=>{this.currentRowInfo.singerId===this.$route.params.id&&this.handleViewDOM(this.musicId,this.musicListId)}),this.isLogin&&(null===this.subSingerList&&await this.getSubSingerList(),this.getIsSub())}},p=b,I=(s("8d06"),Object(d["a"])(p,e,a,!1,null,"6d12411c",null));t["default"]=I.exports},"8d06":function(i,t,s){"use strict";s("1341")},"907d":function(i,t,s){"use strict";s("f118")},cf90:function(i,t,s){"use strict";var e=function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",["singerMv"==i.videoType||"mv"==i.videoType?s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:i.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":i.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},i._l(i.videoList,(function(t,e){return s("div",{key:e,staticClass:"cardItem",on:{click:function(s){return i.clickListCardItem(t.id,e,t.type)}}},[s("div",{staticClass:"videoCover"},[s("img",{attrs:{src:("singerMv"==i.videoType?t.imgurl:t.cover)+"?param=680y400",alt:""}}),s("div",{staticClass:"playCount"},[s("i",{staticClass:"iconfont icon-shipin"}),i._v(i._s(i._f("handleNum")(t.playCount)))]),"singerMv"==i.videoType?s("div",{staticClass:"videoTime"},[i._v(" "+i._s(i._f("handleMusicTime")(t.duration))+" ")]):i._e()]),s("div",{staticClass:"videoTitle"},[i._v(i._s(t.name))]),"mv"==i.videoType?s("div",{staticClass:"singer"},[i._v(i._s(t.artistName))]):i._e()])})),0):"video"==i.videoType?s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:i.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":i.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},i._l(i.videoList,(function(t,e){return s("div",{key:e,staticClass:"cardItem",on:{click:function(s){return i.clickListCardItem(t.vid||t.data.vid,e,t.type)}}},[s("div",{staticClass:"videoCover"},[s("img",{attrs:{src:(t.coverUrl||t.data.coverUrl)+"?param=1260y800",alt:""}}),s("div",{staticClass:"playCount"},[s("i",{staticClass:"iconfont icon-shipin"}),i._v(i._s(i._f("handleNum")(t.playTime||t.data.playTime)))]),s("div",{staticClass:"videoTime"},[i._v(" "+i._s(i._f("handleMusicTime")(t.durationms||t.data.durationms))+" ")])]),s("div",{staticClass:"videoTitle"},[i._v(i._s(t.title||t.data.title))])])})),0):i._e()])},a=[],n=s("d930"),l={name:"VideoListCard",data(){return{disabled:!0}},props:{videoList:{type:Array,default(){return[]}},isLoad:{type:Boolean,default(){return!1}},videoType:{type:String,default(){return"singerMv"}}},methods:{clickListCardItem(i,t,s){this.$emit("clickListCardItem",{id:i,index:t,type:s})},load(){this.$emit("bottomLoad"),this.disabled=!0}},filters:{handleMusicTime:n["b"],handleNum:n["c"]},watch:{videoList(){!0===this.isLoad&&(0!==this.videoList.length?this.disabled=!1:this.disabled=!0)}}},o=l,r=(s("2392"),s("2877")),c=Object(r["a"])(o,e,a,!1,null,"2ef37bc3",null);t["a"]=c.exports},d930:function(i,t,s){"use strict";function e(i,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(""+i.getFullYear()).substr(4-RegExp.$1.length)));const s={"M+":i.getMonth()+1,"d+":i.getDate(),"h+":i.getHours(),"m+":i.getMinutes(),"s+":i.getSeconds()};for(const e in s)if(new RegExp(`(${e})`).test(t)){const i=""+s[e];t=t.replace(RegExp.$1,1===RegExp.$1.length?i:a(i))}return t}function a(i){return("00"+i).substr(i.length)}function n(i){return i>1e4?(i=(i/1e4).toFixed(1),i+"万"):i}function l(i){i=parseInt(i),i=i>1e4?Math.floor(i/1e3):Math.floor(i);let t=Math.floor(i/60),s=Math.floor(i%60);return t=t<10?"0"+t:t,s=s<10?"0"+s:s,`${t}:${s}`}function o(i){i=i.split(":");const t=parseInt(i[0]),s=parseInt(i[1]);return 60*t+s}s.d(t,"a",(function(){return e})),s.d(t,"c",(function(){return n})),s.d(t,"b",(function(){return l})),s.d(t,"d",(function(){return o}))},f118:function(i,t,s){}}]);
//# sourceMappingURL=chunk-4f4e7ce4.cc8f0286.js.map
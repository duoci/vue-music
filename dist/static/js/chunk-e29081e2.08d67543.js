(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e29081e2"],{b78d:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"SearchSong"},[s("div",{staticClass:"tip"},[t._v("找到 "+t._s(t.songCount)+" 首单曲")]),t.multiMatch.artist&&1==t.currentPage?s("div",{staticClass:"multiMatch"},[s("div",{staticClass:"matchTitle"},[t._v("最佳匹配")]),s("div",{staticClass:"matchResult",on:{click:function(e){return t.goToSingerDetail(t.multiMatch.artist[0].id)}}},[s("div",{staticClass:"matchCover"},[s("img",{attrs:{src:t.multiMatch.artist[0].img1v1Url+"?param==200y200",alt:""}})]),s("div",{staticClass:"matchName"},[t._v("歌手："+t._s(t.multiMatch.artist[0].name))]),s("i",{staticClass:"iconfont icon-arrow-right-bold"})])]):t._e(),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.searchSongList,size:"mini","highlight-current-row":"",stripe:""},on:{"row-dblclick":t.clickRow}},[s("el-table-column",{attrs:{label:"",width:"30",type:"index",index:t.handleIndex}}),s("el-table-column",{attrs:{prop:"name",label:"音乐标题","min-width":"200"}}),s("el-table-column",{attrs:{prop:"ar[0].name",label:"歌手","min-width":"100"}}),s("el-table-column",{attrs:{prop:"al.name",label:"专辑","min-width":"170"}}),s("el-table-column",{attrs:{prop:"dt",label:"时长","min-width":"60"}})],1),0!=t.searchSongList.length?s("div",{staticClass:"page"},[s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.songCount,small:"","page-size":30,"current-page":t.currentPage},on:{"current-change":t.pageChange}})],1):t._e()],1)},a=[],n=s("d930"),c=s("2f62"),r={name:"SearchSong",data(){return{multiMatch:{},searchSongList:[],songCount:0,currentPage:1}},computed:{...Object(c["c"])(["musicListId","musicList","currentIndex"])},methods:{...Object(c["b"])(["updateMusicId","changePlayState","updateMusicList"]),async getMultMath(){const t=await this.get("/search/multimatch",{keywords:this.$route.params.id});this.multiMatch=t.result},async getSearchSong(){const t=await this.get("/cloudsearch",{keywords:this.$route.params.id,offset:30*(this.currentPage-1)});this.songCount=t.result.songCount,this.searchSongList=t.result.songs,this.searchSongList.forEach((t,e)=>{this.searchSongList[e].dt=Object(n["b"])(t.dt)})},handleIndex(t){return t=t+1+30*(this.currentPage-1),t<10?"0"+t:t},async clickRow(t){const e=this.musicList.find(e=>e.id===t.id);e?this.updateMusicId(t.id):(this.changePlayState(!1),this.musicList.splice(this.currentIndex+1,0,t),this.updateMusicId(t.id),this.updateMusicList({musicList:this.musicList,musicListId:this.musicListId}))},pageChange(t){this.currentPage=t,this.searchSongList=[],this.getSearchSong()},goToSingerDetail(t){this.$router.push({name:"singerDetail",params:{id:t}})}},created(){this.getMultMath(),this.getSearchSong()},watch:{}},o=r,u=(s("fc8c"),s("2877")),l=Object(u["a"])(o,i,a,!1,null,"7cdca4b4",null);e["default"]=l.exports},d930:function(t,e,s){"use strict";function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(""+t.getFullYear()).substr(4-RegExp.$1.length)));const s={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(const i in s)if(new RegExp(`(${i})`).test(e)){const t=""+s[i];e=e.replace(RegExp.$1,1===RegExp.$1.length?t:a(t))}return e}function a(t){return("00"+t).substr(t.length)}function n(t){return t>1e4?(t=(t/1e4).toFixed(1),t+"万"):t}function c(t){t=parseInt(t),t=t>1e4?Math.floor(t/1e3):Math.floor(t);let e=Math.floor(t/60),s=Math.floor(t%60);return e=e<10?"0"+e:e,s=s<10?"0"+s:s,`${e}:${s}`}function r(t){t=t.split(":");const e=parseInt(t[0]),s=parseInt(t[1]);return 60*e+s}s.d(e,"a",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"b",(function(){return c})),s.d(e,"d",(function(){return r}))},e3e5:function(t,e,s){},fc8c:function(t,e,s){"use strict";s("e3e5")}}]);
//# sourceMappingURL=chunk-e29081e2.08d67543.js.map
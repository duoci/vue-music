(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68d85571"],{"003a":function(t,e,i){},"15bf":function(t,e,i){"use strict";i("9354")},"612c":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"hotComments"},[i("div",{staticClass:"commentHeader"},[t._t("title")],2),t._l(t.comments,(function(e,s){return i("div",{key:s,staticClass:"commentItem"},[i("div",{staticClass:"commentCreatorAvatar"},[i("img",{attrs:{src:e.user.avatarUrl+"?param=100y100",alt:""},on:{click:function(i){return t.goToPersonal(e.user.userId)}}})]),i("div",{staticClass:"commentMain"},[i("div",{staticClass:"commentContent"},[i("span",{staticClass:"commentUserNickName",on:{click:function(i){return t.goToPersonal(e.user.userId)}}},[t._v(t._s(e.user.nickname)+": ")]),i("span",[t._v(t._s(e.content))])]),i("div",{staticClass:"replied"},t._l(e.beReplied,(function(s,a){return i("div",{key:a,staticClass:"repliedItem"},[i("span",{staticClass:"repliedUser",on:{click:function(i){return t.goToPersonal(e.user.userId)}}},[t._v("@"+t._s(s.user.nickname)+": ")]),i("span",{staticClass:"repliedContent"},[t._v(t._s(s.content))])])})),0),i("div",{staticClass:"commentBottom"},[i("div",{staticClass:"commentCreatedTime"},[t._v(" "+t._s(t._f("showDate")(e.time))+" ")]),i("div",{staticClass:"commentButtons"},[i("div",{class:e.liked?"likeCurrentComment":"",on:{click:function(i){return t.likeCurrentComment(e.liked,e.commentId)}}},[i("i",{staticClass:"iconfont icon-good"}),t._v(" "+t._s(e.likedCount)+" ")]),t._m(0,!0),t._m(1,!0)])])])])}))],2)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("i",{staticClass:"iconfont icon-zhuanfa"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("i",{staticClass:"iconfont icon-pinglun"})])}],o=i("d930"),n=i("2f62"),r={name:"Comment",props:{comments:{type:Array,default(){return[]}},commentType:{type:String,default(){return""}},commentId:{type:String,default(){return""}},musicTitle:{type:String,default(){return""}},isHotComment:{type:Boolean,default(){return!0}}},methods:{...Object(n["b"])(["changeMusicDetailCardState"]),async likeCurrentComment(t,e){if(!this.$store.state.isLogin)return void this.$message.warning("只有登陆后才能点赞哦!");const i=Date.parse(new Date);let s;switch(this.commentType){case"album":s=3;break;case"musicList":s=2;break;case"music":s=0;break;case"mv":s=1;break;case"video":s=5;break}const a=await this.get("/comment/like",{id:this.commentId,cid:e,t:t?0:1,type:s,timestamp:i});200===a.code?this.$emit("getComment"):this.$message.error("点赞失败,请稍后重试!")},goToPersonal(t){this.$router.push({name:"personal",params:{uid:t}}),"music"===this.commentType&&this.changeMusicDetailCardState(!1)}},filters:{showDate(t){const e=new Date(t);return Object(o["a"])(e,"yyyy-MM-dd")}}},c=r,m=(i("15bf"),i("2877")),d=Object(m["a"])(c,s,a,!1,null,"65bbec1a",null);e["a"]=d.exports},"6c38":function(t,e,i){"use strict";i("003a")},9354:function(t,e,i){},d1b9:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.videoUrl?i("div",{staticClass:"videoDetail"},[i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[t._v(" "+t._s("mv"==t.$route.params.type?"MV详情":"视频详情")+" ")]),i("video",{staticClass:"videoPlayer",attrs:{src:t.videoUrl,controls:"",width:"496px",height:"284px",poster:"mv"==t.$route.params.type?t.videoInfo.cover:t.videoInfo.coverUrl},on:{play:t.playVideo}}),("mv"==t.$route.params.type?t.videoInfo.cover:t.videoInfo.coverUrl)?i("div",{staticClass:"videoInfo"},[i("div",{staticClass:"user"},[i("div",{staticClass:"avatar"},[i("img",{attrs:{src:("mv"==t.$route.params.type?t.videoInfo.artists[0].img1v1Url:t.videoInfo.avatarUrl)+"?param=100y100",alt:""},on:{click:function(e){return t.goToPersonal()}}})]),i("div",{staticClass:"userName",on:{click:function(e){return t.goToPersonal()}}},[t._v(" "+t._s("mv"==t.$route.params.type?t.videoInfo.artists[0].name:t.videoInfo.creator.nickname)+" ")])]),i("div",{staticClass:"videoTitle"},[t._v(" "+t._s("mv"==t.$route.params.type?t.videoInfo.name:t.videoInfo.title)+" ")]),i("div",{staticClass:"otherInfo"},[i("div",[t._v("发布："+t._s(t._f("showDate")((t.$route.params.type,t.videoInfo.publishTime))))]),i("div",[t._v("播放："+t._s(t._f("handleNum")("mv"==t.$route.params.type?t.videoInfo.playCount:t.videoInfo.playTime)))])]),i("div",{staticClass:"buttons"},[i("div",{staticClass:"buttonItem",on:{click:t.likeVideo}},[i("i",{staticClass:"iconfont icon-good",class:t.isLike?"red":""}),t._v(t._s(t.isLike?"已赞":"赞"))]),i("div",{staticClass:"buttonItem",on:{click:t.subVideo}},[i("i",{staticClass:"iconfont icon-xihuan",class:t.isSub?"red":""}),t._v(t._s(t.isSub?"已收藏":"收藏"))]),t._m(0)])]):t._e(),i("div",{staticClass:"comment"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isCommentLoading,expression:"isCommentLoading"}],staticClass:"commentList"},[i("comment",{attrs:{comments:t.comments.comments,commentType:"musicList",commentId:t.$route.params.id+"",isHotComment:!t.comments.hotComments},on:{getComment:function(e){"mv"==t.$route.params.type?t.getMvComment():t.getVideoComment()}}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("最新评论")])])],1),i("div",{staticClass:"page"},[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.comments.total,small:"","page-size":20,"current-page":t.commentsPage},on:{"current-change":t.commentPageChange}})],1)])]),0!=t.relatedVideo.length?i("div",{staticClass:"right"},[i("div",{staticClass:"title"},[t._v("相关推荐")]),t._l(t.relatedVideo,(function(e,s){return i("div",{key:s,staticClass:"relatedVideoItem",on:{click:function(i){return t.goToRelatedVideo(e.vid)}}},[i("div",{staticClass:"relatedVideoItemCover"},[i("img",{attrs:{src:e.coverUrl+"?param=300y180",alt:""}}),i("div",{staticClass:"relatedVideoItemPlayCount"},[i("i",{staticClass:"iconfont icon-shipin"}),t._v(" "+t._s(t._f("handleNum")(e.playTime)))]),i("div",{staticClass:"relatedVideoItemTime"},[t._v(" "+t._s(t._f("handleMusicTime")(e.durationms))+" ")])]),i("div",{staticClass:"relatedVideoItemInfo"},[i("div",{staticClass:"relatedVideoItemTitle"},[t._v(t._s(e.title))]),i("div",{staticClass:"creator"},[t._v("by "+t._s(e.creator[0].userName))])])])}))],2):t._e()]):t._e()},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"buttonItem"},[i("i",{staticClass:"iconfont icon-zhuanfa"}),t._v("分享")])}],o=i("d930"),n=i("612c"),r=i("2f62"),c={components:{Comment:n["a"]},name:"VideoDetail",data(){return{videoInfo:{},videoUrl:"",relatedVideo:[],comments:{},commentsPage:1,isSub:!1,isCommentLoading:!1,isLike:!1}},computed:{...Object(r["c"])(["likeVideoList","subVideoList"])},methods:{...Object(r["b"])(["updateSubVideoList","updateLikeVideoList","changePlayState"]),async getMvDetail(){const t=await this.get("/mv/detail",{mvid:this.$route.params.id});this.videoInfo=t.data},async getMvUrl(){const t=await this.get("/mv/url",{id:this.$route.params.id});this.videoUrl=t.data.url},async getRelatedVideo(){const t=await this.get("/related/allvideo",{id:this.$route.params.id});this.relatedVideo=t.data},async getMvComment(t){const e=Date.parse(new Date);this.isCommentLoading=!0,"changePage"===t&&this.scrollToComment();const i=await this.get("/comment/mv",{id:this.$route.params.id,offset:20*(this.commentsPage-1),timestamp:e});this.comments=i,this.isCommentLoading=!1},scrollToComment(){const t=document.querySelector(".videoDetail"),e=document.querySelector(".commentTitle");t.scrollTo({behavior:"smooth",top:e.offsetTop-70})},async getVideoDetail(){const t=await this.get("/video/detail",{id:this.$route.params.id});this.videoInfo=t.data},async getVideoUrl(){const t=await this.get("/video/url",{id:this.$route.params.id});this.videoUrl=t.urls[0].url},async getVideoComment(t){const e=Date.parse(new Date);if(this.isCommentLoading=!0,"changePage"===t){const t=document.querySelector(".videoDetail"),e=document.querySelector(".commentTitle");t.scrollTo({behavior:"smooth",top:e.offsetTop-70})}const i=await this.get("/comment/video",{id:this.$route.params.id,offset:20*(this.commentsPage-1),timestamp:e});this.isCommentLoading=!1,this.comments=i},async getSubVideoList(){const t=Date.parse(new Date),e=await this.get("/mv/sublist",{limit:1e3,timestamp:t});this.updateSubVideoList(e.data)},async getLikeVideoList(){const t=Date.parse(new Date),e=await this.get("/playlist/mylike",{limit:1e3,timestamp:t});this.updateLikeVideoList(e.data.feeds)},commentPageChange(t){this.commentsPage=t,"mv"===this.$route.params.type?this.getMvComment("changePage"):"video"===this.$route.params.type&&this.getVideoComment("changePage")},goToRelatedVideo(t){this.$router.push({name:"videoDetail",params:{id:t,type:"video"}})},playVideo(){this.changePlayState(!1)},getIsSub(){this.isSub=this.subVideoList.find(t=>t.vid===this.$route.params.id)},getIsLike(){"mv"===this.$route.params.type?this.isLike=this.likeVideoList.find(t=>t.mlogBaseData.id===this.$route.params.id):this.isLike=this.likeVideoList.find(t=>t.mlogBaseData.desc===this.videoInfo.description&&t.mlogBaseData.dration===this.videoInfo.durationms)},async subVideo(){this.isSub=!this.isSub;const t=Date.parse(new Date);"video"===this.$route.params.type?await this.get("/video/sub",{id:this.$route.params.id,t:this.isSub?1:0}):await this.get("/mv/sub",{mvid:this.$route.params.id,t:this.isSub?1:0,timestamp:t}),this.getSubVideoList()},async likeVideo(){this.isLike=!this.isLike;const t=Date.parse(new Date),e="mv"===this.$route.params.type?1:5;await this.$get("/resource/like",{type:e,id:this.$route.params.id,t:this.isLike?1:0,timestamp:t});this.getLikeVideoList()},goToPersonal(){const t="mv"===this.$route.params.type?this.videoInfo.artists[0].id:this.videoInfo.creator.userId;"mv"===this.$route.params.type?this.$router.push({name:"singerDetail",params:{id:t}}):this.$router.push({name:"personal",params:{uid:t}})}},async created(){this.getRelatedVideo(),"mv"===this.$route.params.type?(await this.getMvDetail(),this.getMvUrl(),this.getMvComment()):"video"===this.$route.params.type&&(await this.getVideoDetail(),this.getVideoUrl(),this.getVideoComment()),null===this.subVideoList&&await this.getSubVideoList(),this.getIsSub(),null===this.likeVideoList&&await this.getLikeVideoList(),this.getIsLike()},filters:{handleNum:o["c"],handleMusicTime:o["b"],showDate(t){const e=new Date(t);return Object(o["a"])(e,"yyyy-MM-dd")}},watch:{}},m=c,d=(i("6c38"),i("2877")),l=Object(d["a"])(m,s,a,!1,null,"d558a9ca",null);e["default"]=l.exports},d930:function(t,e,i){"use strict";function s(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(""+t.getFullYear()).substr(4-RegExp.$1.length)));const i={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(const s in i)if(new RegExp(`(${s})`).test(e)){const t=""+i[s];e=e.replace(RegExp.$1,1===RegExp.$1.length?t:a(t))}return e}function a(t){return("00"+t).substr(t.length)}function o(t){return t>1e4?(t=(t/1e4).toFixed(1),t+"万"):t}function n(t){t=parseInt(t),t=t>1e4?Math.floor(t/1e3):Math.floor(t);let e=Math.floor(t/60),i=Math.floor(t%60);return e=e<10?"0"+e:e,i=i<10?"0"+i:i,`${e}:${i}`}function r(t){t=t.split(":");const e=parseInt(t[0]),i=parseInt(t[1]);return 60*e+i}i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"b",(function(){return n})),i.d(e,"d",(function(){return r}))}}]);
//# sourceMappingURL=chunk-68d85571.3756a9a2.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3013d020"],{"484f":function(t,e,a){"use strict";a("f5a3")},"567e":function(t,e,a){},bfaf:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"video"},[a("nav-bar",{attrs:{navBarItem:t.navBarData},on:{clickBarItem:t.clickBarItem}}),a("router-view",{staticClass:"videoList"})],1)},i=[],n=a("ec63"),c={components:{NavBar:n["a"]},name:"Video",data(){return{navBarData:[{name:"视频",path:"/video/videolist"},{name:"MV",path:"/video/mvlist"}]}},methods:{clickBarItem(t){this.$router.push(t)}},created(){this.$store.state.isLogin||(this.$message.error("视频页面只有登录后才能访问哦!"),this.$router.replace("/discover/recommend"))}},s=c,o=(a("484f"),a("2877")),u=Object(o["a"])(s,r,i,!1,null,"6ac99660",null);e["default"]=u.exports},e796:function(t,e,a){"use strict";a("567e")},ec63:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navBarContainer"},[a("div",{staticClass:"navBar"},t._l(t.navBarItem,(function(e,r){return a("div",{key:r,staticClass:"barItem",class:r===t.activeIndex?"active":"",on:{click:function(a){return t.clickBarItem(e.path,r)}}},[t._v(" "+t._s(e.name)+" ")])})),0)])},i=[],n={name:"NavBar",data(){return{activeIndex:0}},props:{navBarItem:{type:Array,default(){return[]}}},created(){this.navBarItem.forEach((t,e)=>{-1!==decodeURI(this.$route.path).search(t.path)&&(this.activeIndex=e)})},methods:{clickBarItem(t,e){this.activeIndex!==e&&(this.activeIndex=e,this.$emit("clickBarItem",t))}}},c=n,s=(a("e796"),a("2877")),o=Object(s["a"])(c,r,i,!1,null,"0c5ede62",null);e["a"]=o.exports},f5a3:function(t,e,a){}}]);
//# sourceMappingURL=chunk-3013d020.c25f8683.js.map
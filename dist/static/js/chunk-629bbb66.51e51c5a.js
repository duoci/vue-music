(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-629bbb66"],{"567e":function(t,e,a){},a4c1:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"discoverContainer"},[a("nav-bar",{attrs:{navBarItem:t.navBarData},on:{clickBarItem:t.clickBarItem}}),a("router-view",{staticClass:"discover"})],1)},c=[],r=a("ec63"),i={name:"Discover",components:{NavBar:r["a"]},data(){return{index:0,navBarData:[{name:"个性推荐",path:"/discover/recommend"},{name:"歌单",path:"/discover/musiclist"},{name:"排行榜",path:"/discover/ranking"},{name:"歌手",path:"/discover/singer"}]}},methods:{clickBarItem(t){this.$router.push(t)}}},s=i,o=(a("babc"),a("2877")),u=Object(o["a"])(s,n,c,!1,null,"a153033e",null);e["default"]=u.exports},babc:function(t,e,a){"use strict";a("c547")},c547:function(t,e,a){},e796:function(t,e,a){"use strict";a("567e")},ec63:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navBarContainer"},[a("div",{staticClass:"navBar"},t._l(t.navBarItem,(function(e,n){return a("div",{key:n,staticClass:"barItem",class:n===t.activeIndex?"active":"",on:{click:function(a){return t.clickBarItem(e.path,n)}}},[t._v(" "+t._s(e.name)+" ")])})),0)])},c=[],r={name:"NavBar",data(){return{activeIndex:0}},props:{navBarItem:{type:Array,default(){return[]}}},created(){this.navBarItem.forEach((t,e)=>{-1!==decodeURI(this.$route.path).search(t.path)&&(this.activeIndex=e)})},methods:{clickBarItem(t,e){this.activeIndex!==e&&(this.activeIndex=e,this.$emit("clickBarItem",t))}}},i=r,s=(a("e796"),a("2877")),o=Object(s["a"])(i,n,c,!1,null,"0c5ede62",null);e["a"]=o.exports}}]);
//# sourceMappingURL=chunk-629bbb66.51e51c5a.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79ff63a0"],{"0a5e":function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"singerContainer"},[i("div",{staticClass:"singer"},[i("div",{staticClass:"selectors"},[i("div",{staticClass:"selectorItem"},[i("div",{staticClass:"title"},[t._v("语种：")]),i("allNarbar",{attrs:{allNavBarData:t.languageSort},on:{clickNavBarItem:t.areaItem}})],1),i("div",{staticClass:"selectorItem"},[i("div",{staticClass:"title"},[t._v("分类：")]),i("allNarbar",{attrs:{allNavBarData:t.typeSort},on:{clickNavBarItem:t.typeItem}})],1),i("div",{staticClass:"selectorItem"},[i("div",{staticClass:"title"},[t._v("筛选：")]),i("allNarbar",{attrs:{allNavBarData:t.initialSort},on:{clickNavBarItem:t.areaItem}})],1)]),i("div",{staticClass:"listCardContainer"},[i("list-card",{staticClass:"listCard",attrs:{listCardData:t.singerList,isLoad:""},on:{clickListCardItem:t.clickListCardItem,bottomLoad:t.bottomLoad}})],1)])])},s=[],n=i("e47c"),r=i("9916");const l=[{area:-1,name:"全部"},{area:7,name:"华语"},{area:96,name:"欧美"},{area:8,name:"日本"},{area:16,name:"韩国"},{area:0,name:"其它"}],c=[{type:-1,name:"全部"},{type:1,name:"男歌手"},{type:2,name:"女歌手"},{type:3,name:"乐队"}],m=[{initial:-1,name:"热门"},{initial:"a",name:"A"},{initial:"b",name:"B"},{initial:"c",name:"C"},{initial:"d",name:"D"},{initial:"e",name:"E"},{initial:"f",name:"F"},{initial:"g",name:"G"},{initial:"h",name:"H"},{initial:"i",name:"I"},{initial:"j",name:"J"},{initial:"k",name:"K"},{initial:"l",name:"L"},{initial:"m",name:"M"},{initial:"n",name:"N"},{initial:"o",name:"O"},{initial:"p",name:"P"},{initial:"q",name:"Q"},{initial:"r",name:"R"},{initial:"s",name:"S"},{initial:"t",name:"T"},{initial:"u",name:"U"},{initial:"v",name:"V"},{initial:"w",name:"W"},{initial:"x",name:"X"},{initial:"y",name:"Y"},{initial:"z",name:"Z"},{initial:0,name:"#"}];var d={name:"singer",components:{allNarbar:n["a"],ListCard:r["a"]},created(){this.getSingerList()},data(){return{languageSort:l,typeSort:c,initialSort:m,area:-1,type:-1,initial:-1,currentPage:1,singerList:[],isMore:!1}},methods:{async getSingerList(){const t=await this.get("/artist/list",{type:this.type,area:this.area,initial:this.initial,offset:30*(this.currentPage-1)});this.singerList.push(...t.artists),this.isMore=t.more},areaItem(t){this.area=this.languageSort[t].area,this.singerList=[],this.currentPage=1,this.getSingerList()},typeItem(t){this.type=this.typeSort[t].type,this.currentPage=1,this.singerList=[],this.getSingerList()},initialItem(t){this.initial=this.initialSort[t].initial,this.currentPage=1,this.singerList=[],this.getSingerList()},clickListCardItem(t){this.$router.push({name:"singerDetail",params:{id:t}})},bottomLoad(){!0===this.isMore&&(this.currentPage+=1,this.getSingerList())}}},o=d,u=(i("bc1d"),i("2877")),h=Object(u["a"])(o,e,s,!1,null,"24db7055",null);a["default"]=h.exports},2444:function(t,a,i){},2746:function(t,a,i){},"3a51":function(t,a,i){"use strict";i("2746")},9916:function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],ref:"listCard",staticClass:"listCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.listCardData,(function(a,e){return i("div",{key:e,staticClass:"listCardItem",on:{click:function(i){return t.clickListCardItem(a.id)}}},[i("div",{staticClass:"image"},[i("img",{attrs:{src:(a.picUrl||a.coverImgUrl)+"?param=400y400",alt:""}})]),i("div",{staticClass:"title"},[t._v(t._s(a.name))])])})),0)},s=[],n={name:"ListCard",props:{listCardData:{type:Array,default(){return[]}},isLoad:{type:Boolean,default(){return!1}}},data(){return{disabled:!0}},methods:{clickListCardItem(t){this.$emit("clickListCardItem",t)},load(){this.$emit("bottomLoad"),this.disabled=!0}},watch:{listCardData(){!0===this.isLoad&&(0!==this.listCardData.length?this.disabled=!1:this.disabled=!0)}}},r=n,l=(i("d33a"),i("2877")),c=Object(l["a"])(r,e,s,!1,null,"78ab9603",null);a["a"]=c.exports},bc1d:function(t,a,i){"use strict";i("c29d")},c29d:function(t,a,i){},d33a:function(t,a,i){"use strict";i("2444")},e47c:function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"allNarbar"},[i("div",{staticClass:"navlist"},t._l(t.allNavBarData,(function(a,e){return i("div",{key:e,staticClass:"item",class:t.activeNum==e?"active":"",on:{click:function(a){return t.clickNavItem(e)}}},[t._v(" "+t._s(a.name)+" ")])})),0)])},s=[],n={name:"allNarbar",data(){return{activeNum:0}},props:{allNavBarData:{type:Array,default(){return[]}},itemWidth:{type:Number,default(){return 40}},currentTag:{type:Object,default(){return{}}}},methods:{clickNavItem(t){this.activeNum!==t&&(this.activeNum=t,this.$emit("clickNavBarItem",t))}}},r=n,l=(i("3a51"),i("2877")),c=Object(l["a"])(r,e,s,!1,null,"ef4c4be8",null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-79ff63a0.027ad4be.js.map
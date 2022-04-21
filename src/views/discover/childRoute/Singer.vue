<template>
  <div class="singerContainer">
    <div class="singer">
      <div class="selectors">
        <div class="selectorItem">
          <div class="title">语种：</div>
          <!-- <second-nav-bar :SecondNavBarData="languageSort" @clickSecondBarItem="areaItem" class="secondNavBar"></second-nav-bar> -->
          <allNarbar :allNavBarData="languageSort" @clickNavBarItem="areaItem" />
        </div>
        <div class="selectorItem">
          <div class="title">分类：</div>
          <!-- <second-nav-bar :SecondNavBarData="typeSort" @clickSecondBarItem="typeItem" class="secondNavBar"></second-nav-bar> -->
          <allNarbar :allNavBarData="typeSort" @clickNavBarItem="typeItem" />
        </div>
        <div class="selectorItem">
          <div class="title">筛选：</div>
          <!-- <second-nav-bar :SecondNavBarData="initialSort" @clickSecondBarItem="initialItem" class="secondNavBar"></second-nav-bar> -->
          <allNarbar :allNavBarData="initialSort" @clickNavBarItem="areaItem" />
        </div>
      </div>
      <div class="listCardContainer">
        <!-- 歌手列表 -->
        <list-card class="listCard" :listCardData="singerList" @clickListCardItem="clickListCardItem" isLoad @bottomLoad="bottomLoad"></list-card>
      </div>
    </div>
  </div>
</template>

<script>
  import allNarbar from '../../../components/allNavbar/index.vue';
  import ListCard from '@/components/listCard/ListCard.vue';
  import { languageSort, typeSort, initialSort } from '../../../plugins/data';
  export default {
    name: 'singer',
    components: {
      allNarbar,
      ListCard,
    },
    created() {
      this.getSingerList();
    },
    data() {
      return {
        languageSort,
        typeSort,
        initialSort,
        area: -1,
        type: -1,
        initial: -1,
        // 当前所在页数
        currentPage: 1,
        singerList: [],
        // 是否还有更多数据
        isMore: false,
      };
    },
    methods: {
      // 请求歌手列表
      async getSingerList() {
        const res = await this.get('/artist/list', {
          type: this.type,
          area: this.area,
          initial: this.initial,
          offset: (this.currentPage - 1) * 30,
        });
        this.singerList.push(...res.artists);
        this.isMore = res.more;
      },
      // 地区
      areaItem(index) {
        this.area = this.languageSort[index].area;
        // 先清空list 再请求数据
        this.singerList = [];
        this.currentPage = 1;
        this.getSingerList();
      },
      typeItem(index) {
        this.type = this.typeSort[index].type;
        // 先清空list 再请求数据
        this.currentPage = 1;
        this.singerList = [];
        this.getSingerList();
      },
      // 筛选
      initialItem(index) {
        this.initial = this.initialSort[index].initial;
        // 先清空list 再请求数据
        this.currentPage = 1;
        this.singerList = [];
        this.getSingerList();
      },
      // 点击歌手item的回调
      clickListCardItem(id) {
        this.$router.push({ name: 'singerDetail', params: { id } });
      },
      // 卡片上拉触底触发
      bottomLoad() {
        // 如果还有更多数据 则发送请求 将数据 push到数组
        if (this.isMore === true) {
          this.currentPage += 1;
          this.getSingerList();
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .singerContainer {
    display: flex;
    justify-content: center;
    .singer {
      max-width: 1200px;
      padding: 0 10px;
      .selectors {
        margin-top: 10px;
        .selectorItem {
          display: flex;
          .title {
            width: 42px;
            font-size: 14px;
            line-height: 33px;
          }
        }
      }
    }
  }
</style>

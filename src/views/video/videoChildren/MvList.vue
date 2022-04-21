<template>
  <div class="mvList">
    <!-- 视频navbar -->
    <div class="musicListNavBar">
      <div class="selectorItem">
        <div class="title">地区：</div>
        <allNarbar :allNavBarData="areaList" @clickSecondBarItem="areaItem" class="secondNavBar"></allNarbar>
      </div>
      <div class="selectorItem">
        <div class="title">类型：</div>
        <allNarbar :allNavBarData="typeList" @clickSecondBarItem="typeItem" class="secondNavBar"></allNarbar>
      </div>
      <div class="selectorItem">
        <div class="title">排序：</div>
        <allNarbar :allNavBarData="orderList" @clickSecondBarItem="orderItem" class="secondNavBar"></allNarbar>
      </div>
    </div>
    <!-- 视频卡片列表 -->
    <video-list-card
      class="cardList"
      :videoList="mvList"
      :isLoad="true"
      :videoType="'mv'"
      @clickListCardItem="goToMvDetail"
      @bottomLoad="bottomLoad"
    ></video-list-card>
    <go-top scrollObj=".cardList"></go-top>
  </div>
</template>

<script>
  import allNarbar from '../../../components/allNavbar/index.vue';
  import VideoListCard from 'components/videoListCard/VideoListCard.vue';
  // import GoTop from 'components/goTop/GoTop.vue';

  export default {
    components: { allNarbar, VideoListCard },
    name: 'MvList',
    data() {
      return {
        // mv 地区
        areaList: [
          { name: '全部', path: '' },
          { name: '内地', path: '内地' },
          { name: '港台', path: '港台' },
          { name: '欧美', path: '欧美' },
          { name: '日本', path: '日本' },
          { name: '韩国', path: '韩国' },
        ],
        // mv 类型
        typeList: [
          { name: '全部', path: '' },
          { name: '官方版', path: '官方版' },
          { name: '原生', path: '原生' },
          { name: '现场版', path: '现场版' },
          { name: '网易出品', path: '网易出品' },
        ],
        // 排序
        orderList: [
          { name: '上升最快', path: '' },
          { name: '最热', path: '最热' },
          { name: '最新', path: '最新' },
        ],
        // 当前地区
        area: '',
        // 当前类型
        type: '',
        // 当前排序
        order: '',
        // 当前视频页数
        mvPage: 1,
        // 是否还有更多视频数据
        hasMore: false,
        // 视频列表数据
        mvList: [],
      };
    },
    methods: {
      // 请求视频分类
      // 获取全部mv
      async getMvList() {
        const res = await this.get('/mv/all', {
          area: this.area,
          type: this.type,
          order: this.order,
          offset: 30 * (this.mvPage - 1),
        });
        this.hasMore = res.hasMore;
        this.mvList.push(...res.data);
      },

      // 点击分类的回调
      areaItem(index) {
        this.area = this.areaList[index].path;
        this.mvList = [];
        this.mvPage = 1;
        this.getMvList();
      },
      typeItem(index) {
        this.type = this.typeList[index].path;
        this.mvList = [];
        this.mvPage = 1;
        this.getMvList();
      },
      orderItem(index) {
        this.order = this.orderList[index].path;
        this.mvList = [];
        this.mvPage = 1;
        this.getMvList();
      },
      // 进入视频详情页面
      goToMvDetail({ id }) {
        this.$router.push({
          name: 'videoDetail',
          params: { id, type: 'mv' },
        });
      },
      // 上拉触底的回调
      bottomLoad() {
        if (this.hasMore) {
          this.mvPage += 1;
          this.getMvList();
        }
      },
    },
    async created() {
      await this.getMvList();
    },
  };
</script>

<style scoped>
  .selectorItem {
    display: flex;
    margin-bottom: 10px;
  }

  .title {
    font-size: 12px;
    width: 40px;
    line-height: 33px;
  }

  .secondNavBar {
    width: calc(100% - 60px);
  }

  .musicListNavBar {
    padding: 0px 25px;
    transform: translateY(-10px);
  }

  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }

  .cardList {
    overflow-y: scroll;
    height: calc(92vh - 217px);
  }
</style>

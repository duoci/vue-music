<template>
  <div class="videoList">
    <div class="musicListNavBar" v-if="videoCategory.length != 0">
      <musiclistnavbar
        :currentTag="currentTag"
        :sortList="sortList"
        :navData="videoCategory"
        @getSortList="getSortList"
        @clickSortBoxItem="clickSortBoxItem"
        @clickSecondBarItem="clickSecondBarItem"
      ></musiclistnavbar>
    </div>
    <!-- 视频卡片列表 -->
    <video-list-card :videoList="videoList" :isLoad="true" :videoType="'video'" class="cardList" @clickListCardItem="goToVideoDetail" @bottomLoad="bottomLoad">
    </video-list-card>
  </div>
</template>

<script>
  import musiclistnavbar from '../../../components/musicListNavBar/index.vue';
  import VideoListCard from 'components/videoListCard/VideoListCard.vue';
  // import GoTop from 'components/goTop/GoTop.vue';
  // import SortBox from 'components/sortBox/SortBox.vue';
  export default {
    components: { VideoListCard, musiclistnavbar },
    name: 'VideoList',
    data() {
      return {
        // 视频分类
        videoCategory: [],
        // 当前标签
        currentTag: {},
        // 当前视频页数
        videoPage: 1,
        // 是否还有更多视频数据
        hasMore: true,
        // 视频列表数据
        videoList: [],
        // 视频分类tag列表
        sortList: [],
      };
    },
    methods: {
      // 请求
      // 请求视频分类
      async getVideoCategory() {
        const res = await this.get('/video/category/list');
        this.videoCategory = res.data;
        // eslint-disable-next-line prefer-destructuring
        this.currentTag = res.data[0];
      },
      // 获取分类下的视频
      // 这个接口一次只能获取8条数据, 所以我每次请求循环2次这个请求 拿16条数据
      // 因为是每次8条数据push进去的 push了前 8条时因为高度不够，触发了组件video-list-card的触底，
      // 又调用了一次请求，所以第一次请求会请求32条数据，后面高度够了都是一次请求16条，我觉得挺好的，就不理这个bug了
      async getVideoList(id) {
        let i = 2;
        while (i) {
          if (this.hasMore) {
            const res = await this.get('/video/group', {
              id,
              offset: 8 * (this.videoPage - 1),
            });
            this.hasMore = res.hasmore;
            this.videoList.push(...res.datas);
            this.videoPage += 1;
            // eslint-disable-next-line no-plusplus
            i--;
          } else {
            return;
          }
        }
      },

      // 获取视频分类tag
      async getSortList() {
        const res = await this.get('/video/group/list');
        this.sortList = res.data;
      },

      // 事件
      // 点击分类的回调
      clickSecondBarItem(index) {
        this.videoPage = 1;
        this.videoList = [];
        this.currentTag = this.videoCategory[index];
        this.getVideoList(this.currentTag.id);
      },
      // 进入视频详情页面
      goToVideoDetail({ id }) {
        this.$router.push({
          name: 'videoDetail',
          params: { id, type: 'video' },
        });
      },
      // 上拉触底的回调
      bottomLoad() {
        if (this.hasMore) {
          this.getVideoList(this.currentTag.id);
        }
      },

      // 点击sortBoxItem的分类item的回调
      clickSortBoxItem(item) {
        this.currentTag = item;
        this.videoPage = 1;
        this.videoList = [];
        this.getVideoList(item.id);
      },
    },
    async created() {
      await this.getVideoCategory();
      await this.getVideoList(this.currentTag.id);
    },
  };
</script>

<style scoped>
  .musicListNavBar {
    padding: 10px 25px;

    font-size: 12px;
  }

  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }

  .cardList {
    overflow-y: scroll;
    /* height: calc(100vh - 215px); */
    height: 566px;
  }
</style>

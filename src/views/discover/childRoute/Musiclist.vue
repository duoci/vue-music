<template>
  <div class="musiclistContainer">
    <div class="musiclist">
      <div class="showBox">
        <img :src="oneListData.coverImgUrl" alt="" class="bgimg auto-img" />
        <div class="imgBox">
          <img :src="oneListData.coverImgUrl" alt="" class="auto-img" />
        </div>
        <div class="EntryInfo">
          <div class="tag"><i class="iconfont icon-good"></i> 精品歌单</div>
          <div class="name">{{ oneListData.name }}</div>
          <div class="desc">{{ oneListData.copywriter }}</div>
        </div>
      </div>
      <div class="musiclistnavbar">
        <musiclistnavbar
          :currentTag="currentTag"
          :sortList="sortList"
          :navData="hotTags"
          @getSortList="getSortList"
          @clickSortBoxItem="clickSortBoxItem"
          @clickSecondBarItem="clickNavItem"
        ></musiclistnavbar>
      </div>
      <list-card :listCardData="musicList.playlists" @clickListCardItem="clickListCardItem"></list-card>
      <div class="page" v-if="musicList.playlists">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="musicList.total"
          :page-size="50"
          small
          :current-page="currentPage"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import musiclistnavbar from '../../../components/musicListNavBar/index.vue';
  import ListCard from '../../../components/listCard/ListCard.vue';
  export default {
    name: 'musiclist',
    components: {
      musiclistnavbar,
      ListCard,
    },
    data() {
      return {
        // 封面第一条数据
        oneListData: {},
        // 热门导航
        hotTags: [],
        // 音乐列表数据
        musicList: {},
        currentTag: {},
        // 页数
        currentPage: 1,
        // 分类数据
        sortList: [],
      };
    },
    async created() {
      await this.getHotTag();
      this.getTheFirstOfHighquality();
      this.getMusicList();
    },
    methods: {
      async getTheFirstOfHighquality() {
        const result = await this.get('/top/playlist/highquality', {
          limit: 2,
        });
        // eslint-disable-next-line prefer-destructuring
        this.oneListData = result.playlists[1];
      },
      // 获取歌单分类数据
      async getSortList() {
        const res = await this.get('/playlist/catlist');
        this.sortList = res.sub;
      },
      // 获取热门歌单tag数据
      async getHotTag() {
        const result = await this.get('/playlist/hot');
        // eslint-disable-next-line prefer-destructuring
        this.currentTag = result.tags[0];
        this.hotTags = result.tags;
      },
      // 点击left分类中数据触发函数
      clickSortBoxItem(item) {
        this.currentTag = item;
        this.currentPage = 1;
        this.getMusicList();
      },
      // 页数变化时触发函数根据页数获取数据
      async getMusicList() {
        this.musicList = {};
        const result = await this.get('/top/playlist', {
          cat: this.currentTag.name,
          offset: 50 * (this.currentPage - 1),
        });
        this.musicList = result;
      },
      pageChange(page) {
        // page是当前页数
        this.currentPage = page;
        this.getMusicList();
      },
      clickListCardItem(id) {
        this.$router.push({ name: 'musicListDetail', params: { id } });
      },
      // 点击热门导航根据index获取相对的数据
      clickNavItem(index) {
        this.currentTag = this.hotTags[index];
        this.currentPage = 1;
        // 先清空musicList
        this.getMusicList();
      },
    },
  };
</script>

<style lang="less" scoped>
  .musiclistContainer {
    min-width: 900px;
    .musiclist {
      width: 1200px;
      margin: 0 auto;
    }

    .showBox {
      display: flex;
      height: 170px;
      overflow: hidden;
      border-radius: 15px;
      position: relative;
      .bgimg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        transform: translateY(-80px);
        filter: blur(30px) brightness(70%);
      }
      .imgBox {
        padding: 15px;
        width: 165px;
      }
      .tag {
        color: #d59e54;
        border: 1px solid #d59e54;
        padding: 5px 10px;
        width: 88px;
        font-size: 12px;
        margin: 20px 10px 15px;
        border-radius: 15px;
      }

      .tag i {
        font-size: 14px;
      }

      .name {
        color: white;
        font-size: 14px;
        margin: 10px 0;
      }

      .desc {
        color: rgba(255, 255, 255, 0.5);
        /* 字体直接写小于12没有效果 */
        font-size: 12px;
        transform: scale(0.9, 0.9);
      }
    }
    .musiclistnavbar {
      margin: 20px 0;
    }
    .page {
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
    }
  }
</style>

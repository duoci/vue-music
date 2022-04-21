<template>
  <div class="recommendContainer">
    <div class="recommend">
      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="230px">
          <el-carousel-item v-for="(item, index) in bannerData" :key="index">
            <img :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="recommendMusicList">
        <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
        <list-card :listCardData="musicList" @clickListCardItem="clickListCardItem"></list-card>
      </div>
    </div>
  </div>
</template>

<script>
  import ListCard from '@/components/listCard/ListCard.vue';
  export default {
    name: 'recommend',
    components: { ListCard },
    data() {
      return {
        // 轮播图数据
        bannerData: [],
        // recommend页面显示的musicList
        musicList: [],
      };
    },
    created() {
      this.getBannerData();
      this.getMusicList();
    },
    methods: {
      async getBannerData() {
        const res = await this.get('/banner');
        this.bannerData = res.banners;
      },
      getMusicList() {
        this.get('/personalized', { limit: 10 }).then(res => {
          this.musicList = res.result;
        });
      },
      clickListCardItem(id) {
        this.$router.push({ name: 'musicListDetail', params: { id } });
      },
    },
  };
</script>

<style lang="less" scoped>
  /deep/.el-carousel {
    margin: auto;
    width: 1000px;
  }
  /deep/.el-carousel__item {
    border-radius: 20px;
    // overflow: hidden;
  }

  /deep/.el-carousel__item img {
    // width: 480px;
    height: 100%;
    // overflow: hidden;
  }
  .recommendContainer {
    display: flex;
    justify-content: center;
    .recommend {
      width: 1200px;
      .carousel {
        width: 100%;
      }

      .recommendMusicList {
        margin: 20px 10px;
      }

      .recommendMusicList h3 {
        color: #373737;
      }
    }
  }
</style>

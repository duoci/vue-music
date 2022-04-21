<template>
  <div class="searchSinger">
    <div class="tip">找到 {{ singerCount }} 位歌手</div>
    <list-card :listCardData="searchSingerList" @clickListCardItem="clickListCardItem"></list-card>
    <!-- 分页 -->
    <div class="page" v-if="searchSingerList.length != 0">
      <el-pagination background layout="prev, pager, next" :total="singerCount" small :page-size="30" :current-page="currentPage" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ListCard from 'components/listCard/ListCard.vue';
  export default {
    components: { ListCard },
    name: 'SearchSinger',
    data() {
      return {
        singerCount: 0,
        searchSingerList: [],
        currentPage: 1,
      };
    },
    methods: {
      // 请求搜索歌手
      async getSearchSinger() {
        const res = await this.get('/cloudsearch', {
          keywords: this.$route.params.id,
          offset: 30 * (this.currentPage - 1),
          type: 100,
        });
        this.singerCount = res.result.artistCount;
        this.searchSingerList = res.result.artists;
      },
      // 评论点击翻页的回调
      pageChange(page) {
        // 点击的页数赋值到请求的页数上
        this.currentPage = page;
        // 清空数据
        this.searchSingerList = [];
        this.getSearchSinger();
      },
      // 跳转至singerDetail页面
      clickListCardItem(id) {
        this.$router.push({ name: 'singerDetail', params: { id } });
      },
    },
    created() {
      this.getSearchSinger();
    },
  };
</script>

<style scoped>
  .searchSinger {
    max-width: 1000px;
    margin: auto;
  }

  .tip {
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin-bottom: 10px;
  }

  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    margin: 20px 0;
  }
</style>

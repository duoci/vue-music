<template>
  <div class="rankingContainer">
    <div class="ranking">
      <div class="title">官方榜</div>
      <rankingTab
        :officialListDetailItem="item"
        v-for="(item, index) in officialListDetail"
        :key="index"
        @handleRowDbClick="handleRowDbClick"
        @clickCheckAll="clickListCardItem"
      />
      <div class="global">
        <div class="title">全球榜</div>
        <!-- 展示歌单列表 -->
        <list-card class="listCard" :listCardData="globalList" @clickListCardItem="clickListCardItem"></list-card>
      </div>
    </div>
  </div>
</template>

<script>
  import rankingTab from '../../../components/rankingTab/index.vue';
  import ListCard from '@/components/listCard/ListCard.vue';
  import { handleMusicTime } from '@/plugins/utils';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'ranking',
    components: {
      rankingTab,
      ListCard,
    },
    data() {
      return {
        officialList: [],
        officialListDetail: [],
        globalList: [],
      };
    },
    computed: {
      ...mapState(['musicListId']),
    },
    async created() {
      await this.getAllRankings();
      this.officialList.forEach(item => {
        this.getMusicListDetail(item.id);
      });
    },
    methods: {
      ...mapMutations(['updateMusicList', 'updateMusicId']),
      async getAllRankings() {
        const res = await this.get('/toplist');
        this.officialList = res.list.slice(0, 4);
        this.globalList = res.list.slice(4);
      },
      async getMusicListDetail(id) {
        let result = await this.get('/playlist/detail', { id });
        result = result.playlist;
        // 对时间进行处理
        result.tracks.forEach((item, index) => {
          result.tracks[index].dt = handleMusicTime(item.dt);
        });
        this.officialListDetail.push(result);
      },
      clickListCardItem(id) {
        if (id.id) {
          // eslint-disable-next-line prefer-destructuring
          id = id.id;
        }
        this.$router.push({ name: 'musicListDetail', params: { id } });
      },
      handleRowDbClick({ id, index }) {
        const musicListIndex = this.officialListDetail.findIndex(item => item.id === id);
        this.updateMusicId(this.officialListDetail[musicListIndex].tracks[index].id);
        // 如果歌单发生变化,则提交歌单到vuex
        if (id !== this.musicListId) {
          // 将歌单传到vuex
          this.updateMusicList({
            musicList: this.officialListDetail[musicListIndex].tracks,
            musicListId: id,
          });
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .rankingContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 600px;
    .ranking {
      width: 1200px;
      margin: 0 auto;
      padding: 0 10px;
      min-width: 600px;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #000;
        margin-bottom: 10px;
      }
    }
  }
</style>

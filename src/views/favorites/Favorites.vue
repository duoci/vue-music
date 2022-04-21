<template>
  <div class="discoverContainer">
    <div class="FavoriteVideoContainer">
      <div class="FavoriteVideo">
        <div v-if="favoriteMvList.length == 0" class="tip">
          <div>暂无收藏视频</div>
        </div>
        <div>
          <div class="title" v-if="favoriteMvList.length != 0">收藏的视频和MV</div>
          <video-list-card
            :videoList="favoriteMvList"
            :videoType="'video'"
            :isLoad="true"
            @clickListCardItem="clickMvItem"
            @bottomLoad="bottomLoad"
          ></video-list-card>
        </div>
      </div>
    </div>
    <div class="FavoriteSingerContainer">
      <div class="FavoriteSinger">
        <div v-if="SingerListCount != 0">
          <div class="title">收藏的歌手({{ SingerListCount }})</div>
          <list-card :listCardData="favoriteSingerList" @clickListCardItem="clickListCardItem"></list-card>
        </div>
        <div v-else class="tip"><div>暂无收藏歌手</div></div>
      </div>
    </div>
    <div class="FavoriteAlbumContainer">
      <div class="FavoriteAlbum">
        <div v-if="AlbumListCount != 0">
          <div class="title">收藏的专辑({{ AlbumListCount }})</div>
          <list-card :listCardData="favoriteAlbumList" @clickListCardItem="clickListCardItem"></list-card>
        </div>
        <div v-else class="tip"><div>暂无收藏专辑</div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoListCard from '@/components/videoListCard/VideoListCard.vue';
  import ListCard from '@/components/listCard/ListCard.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'Discover',
    components: { ListCard, VideoListCard },
    data() {
      return {
        favoriteMvList: [],
        hasMore: false,
        currentPage: 1,
        favoriteSingerList: [],
        SingerListCount: 0,
        favoriteAlbumList: [],
        AlbumListCount: 0,
        navBarData: [
          {
            name: '个性推荐',
            path: '/discover/recommend',
          },
          {
            name: '歌单',
            path: '/discover/musiclist',
          },
          {
            name: '排行榜',
            path: '/discover/ranking',
          },
          {
            name: '歌手',
            path: '/discover/singer',
          },
        ],
      };
    },
    computed: {
      ...mapState(['isLogin', 'subAlbumList', 'subSingerList']),
    },
    methods: {
      ...mapMutations(['updateSubAlbumList', 'updateSubSingerList']),
      async getFavoriteAlbumList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/album/sublist', {
          limit: 1000,
          timestamp,
        });
        this.favoriteAlbumList = res.data;
        this.AlbumListCount = res.count;
        this.updateSubAlbumList(res.data);
      },

      // 事件
      // 点击卡片的事件
      clickListCardItem(id) {
        this.$router.push({ name: 'album', params: { id } });
      },
      async getFavoriteSingerList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/artist/sublist', timestamp);
        this.favoriteSingerList = res.data;
        this.SingerListCount = res.count;
        this.updateSubSingerList(res.data);
      },

      // 事件
      // 点击卡片的事件
      clickListCardItem(id) {
        this.$router.push({ name: 'singerDetail', params: { id } });
      },
      async getFavoriteMvList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/mv/sublist', {
          limit: 50,
          offset: 50 * (this.currentPage - 1),
          timestamp,
        });
        this.favoriteMvList.push(...res.data);
      },

      // 事件
      // 点击卡片的事件
      clickMvItem({ id, index }) {
        if (this.favoriteMvList[index].type === 0) {
          this.$router.push({ name: 'videoDetail', params: { id, type: 'mv' } });
        } else {
          this.$router.push({
            name: 'videoDetail',
            params: { id, type: 'video' },
          });
        }
      },
      // 上拉触底的回调
      bottomLoad() {
        if (this.hasMore) {
          this.currentPage += 1;
          this.getFavoriteMvList();
        }
      },
    },
    created() {
      if (!this.isLogin) {
        this.$message.error('收藏页面只有登录后才能访问哦!');
        this.$router.replace('/discover/recommend');
      }
      if (this.subAlbumList === null) {
        this.getFavoriteAlbumList();
      } else {
        this.favoriteAlbumList = this.subAlbumList;
        this.AlbumListCount = this.subAlbumList.length;
      }
      if (this.subSingerList === null) {
        this.getFavoriteSingerList();
      } else {
        this.favoriteSingerList = this.subSingerList;
        this.SingerListCount = this.subSingerList.length;
      }
    },
    watch: {
      subAlbumList(current) {
        this.favoriteAlbumList = current;
        this.AlbumListCount = current.length;
      },
      subSingerList(current) {
        this.favoriteSingerList = current;
        this.SingerListCount = current.length;
      },
    },
  };
</script>

<style lang="less" scoped>
  .discoverContainer {
    overflow: hidden;
    padding: 0 !important;
    .FavoriteSingerContainer,
    .FavoriteVideoContainer,
    .FavoriteAlbumContainer {
      width: 1200px;
      margin: 0 auto;
      min-width: 600px;
    }
  }
</style>

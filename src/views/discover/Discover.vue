<template>
  <div class="discoverContainer">
    <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar>
    <router-view class="discover"></router-view>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar/NavBar.vue';
  export default {
    name: 'Discover',
    components: {
      NavBar,
    },
    data() {
      return {
        index: 0,
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
    methods: {
      clickBarItem(path) {
        this.$router.push(path);
      },
    },
  };
</script>

<style lang="less" scoped>
  .discoverContainer {
    overflow: hidden;
    padding: 0 !important;
    min-width: 1000px;
    .discover {
      margin: auto;
      overflow: auto;
      height: calc(92vh - 167px);
      padding: 0 20px;
    }
  }
</style>

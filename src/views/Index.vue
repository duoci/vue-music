<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu active-text-color="black" router :default-active="defaultActive">
          <el-menu-item :index="item.router" v-for="(item, i) in elmenuitemData" :key="i">
            <i :class="item.class"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-menu-item-group v-if="createdMusicList.length != 0">
            <template slot="title" class="groupTitle">创建的歌单</template>
            <el-menu-item v-for="(item, index) in createdMusicList" :key="index" :index="'/musiclistdetail/' + item.id">
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>

          <el-menu-item-group v-if="collectMusicList.length != 0">
            <template slot="title" class="groupTitle">收藏的歌单</template>
            <el-menu-item v-for="(item, index) in collectMusicList" :key="index" :index="'/musiclistdetail/' + item.id">
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <!-- 给router-view添加key有可能对性能有一定的损耗，
        但是可以解决push同一个地址不同参数时不会重新渲染router-view的问题 -->
        <router-view class="routerView" :key="$route.fullPath"></router-view>
        <!-- 用于下载的a标签 -->
        <!-- <a href="downloadMusicInfo.url" download="downloadMusicInfo.name" target="_blank" id="downloadCurrentMusic"></a> -->
      </el-main>
    </el-container>
    <bottom-control></bottom-control>
    <music-detail-card class="musicDetailCard"></music-detail-card>
  </el-container>
</template>

<script>
  import HeaderBar from '@/components/headerBar/HeaderBar.vue';
  import BottomControl from '../components/BottomControl/BottomControl.vue';
  import MusicDetailCard from '@/views/musicDetailCard/MusicDetailCard.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'Index',
    components: {
      HeaderBar,
      BottomControl,
      MusicDetailCard,
    },
    data() {
      return {
        defaultActive: '',
        elmenuitemData: [
          {
            router: '/discover',
            class: 'iconfont icon-yinle',
            title: '发现音乐',
          },
          {
            router: '/video',
            class: 'iconfont icon-shipin',
            title: '视频',
          },
          {
            router: '/favorites',
            class: 'iconfont icon-more',
            title: '收藏',
          },
          {
            router: '/recommendmusic',
            class: 'iconfont icon-good',
            title: '每日推荐',
          },
        ],
      };
    },
    computed: {
      ...mapState(['collectMusicList', 'isLogin', 'createdMusicList']),
    },
    methods: {
      ...mapMutations(['updateCollectMusicList', 'updateCreatedMusicList']),
      // 获取用户的歌单
      async getUserMusicList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/user/playlist', {
          uid: window.localStorage.getItem('userId'),
          timestamp,
        });
        const { playlist = [] } = res;
        // 区分创建的和收藏的
        const index = playlist.findIndex(item => {
          return item.subscribed === true;
        });
        // 将收藏的歌单上传至vuex
        this.updateCollectMusicList(playlist.slice(index));
        // 将创建的歌单上传至vuex
        this.updateCreatedMusicList(playlist.slice(0, index));
        this.createdMusicList[0].name = '我喜欢的音乐';
      },
    },
    watch: {
      '$route.path'(current) {
        // 取路由中的首地址 用于侧边栏的导航active
        if (current.search('/musiclistdetail') === -1) {
          this.defaultActive = `/${current.split('/')[1]}`;
        } else {
          this.defaultActive = current;
        }
      },
      isLogin(current) {
        if (current) {
          this.getUserMusicList();
        } else {
          // 清空收藏和创建歌单
          this.updateCreatedMusicList([]);
          this.updateCollectMusicList([]);
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .el-header {
    background-color: #ec4141;
    height: 60px !important;
    padding: 0;
    margin: 0;
  }
  .el-aside {
    border-right: 1px solid #ccc;
    height: calc(95vh - 105px);
  }

  .el-menu {
    border: none;
  }

  .el-menu-item:hover {
    background-color: #f5f5f6 !important;
  }

  .el-menu-item {
    font-size: 16px;
    padding: 0 0 0 20px !important;
    margin: 20px 0 !important;
    height: 30px;
    line-height: 30px;
    color: #303133;
  }
  .el-menu-item i {
    color: black;
    font-size: 18px;
  }
  .el-menu-item-group {
    margin-top: 10px;
  }
  .is-active {
    font-weight: 600;
  }
  .el-main {
    padding: 0;
  }
</style>

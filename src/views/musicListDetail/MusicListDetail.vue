<template>
  <div class="musicListDetail" v-if="musicListDetail">
    <!-- 歌单信息 -->
    <div class="listInfo">
      <!-- 歌单封面 -->
      <div class="listAvatar">
        <img :src="musicListDetail.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <div class="titleTag">歌单</div>
          <div class="titleContent">{{ musicListDetail.name }}</div>
        </div>
        <!-- 用户信息 -->
        <div class="user">
          <div class="userAvatar">
            <img :src="musicListDetail.creator.avatarUrl" alt="" />
          </div>
          <div class="userName">
            {{ musicListDetail.creator.nickname }}
          </div>
          <div class="createTime">{{ musicListDetail.createTime | showDate }}创建</div>
        </div>
        <!-- 操作按钮 -->
        <div class="buttons">
          <div class="buttonItem playAll" @click="playAll">
            <i class="iconfont icon-bofang playAll"></i>
            <span>播放全部</span>
          </div>
          <div class="buttonItem" v-if="!isCreated" @click="collectList">
            <i class="iconfont icon-xihuan"></i>
            <span>{{ isSub ? '已收藏' : '收藏' }}</span>
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-zhuanfa"></i>
            <span>分享</span>
          </div>
        </div>
        <!-- 标签 -->
        <div class="tags">
          标签：
          <div class="tagItem" v-for="(item, index) in musicListDetail.tags" :key="index">
            {{ item }}
          </div>
          <div v-if="musicListDetail.tags.length == 0">暂无标签</div>
        </div>
        <!-- 歌曲列表的歌曲数量和播放量 -->
        <div class="otherInfo">
          <div class="musicNum">歌曲 : {{ musicListDetail.trackCount }}</div>
          <div class="playCount">播放 : {{ musicListDetail.playCount }}</div>
        </div>
        <div class="desc">
          简介 :
          {{ musicListDetail.description ? musicListDetail.description : '暂无简介' }}
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="musicList">
      <el-tabs value="first" @tab-click="clickTab">
        <el-tab-pane label="歌曲列表" name="first">
          <!-- 表格 -->
          <el-table
            :data="musicListDetail.tracks"
            size="mini"
            style="width: 100%"
            highlight-current-row
            stripe
            lazy
            @row-dblclick="clickRow"
            :row-key="
              row => {
                return row.id;
              }
            "
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="scrollLoadDisabled"
            :infinite-scroll-distance="1500"
            :infinite-scroll-immediate="false"
          >
            <el-table-column label="" width="60" type="index" :index="handleIndex"> </el-table-column>
            <el-table-column prop="name" label="音乐标题" min-width="300"> </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" min-width="120"> </el-table-column>
            <el-table-column prop="al.name" label="专辑" min-width="170"> </el-table-column>
            <el-table-column prop="dt" label="时长" min-width="100"> </el-table-column>
            <!-- <el-table-column prop="id"></el-table-column> -->
          </el-table>
          <div class="placeholder"></div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <div class="commentList">
            <comment
              :comments="comments.comments"
              :commentType="'musicList'"
              :commentId="musicListDetail.id + ''"
              :isHotComment="comments.hotComments ? false : true"
              @getComment="getMusicListComment"
              ><div slot="title">最新评论</div></comment
            >
          </div>
          <!-- 分页 -->
          <div class="page" v-show="comments.comments && comments.comments.length != 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="comments.total"
              small
              :page-size="50"
              :current-page="currentCommentPage"
              @current-change="commentPageChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <user-list-card userType="musicListDetailPage" :userList="followedsListData.followedsList" :isLoad="followedsListData.isMore"></user-list-card>
          <div class="tips" v-if="followedsListData.followedsList.length == 0 && followedsListData.isLoaded == true">暂无收藏者</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { formatDate, handleNum, handleMusicTime } from '@/plugins/utils';
  import Comment from '@/components/Comment/Comment.vue';
  import UserListCard from '@/components/userListCard/UserListCard.vue';
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'MusicListDetail',
    data() {
      return {
        musicListDetail: null,
        comments: {},
        // 当前评论页数
        currentCommentPage: 1,
        // 用户是否收藏了当前歌单
        isSub: false,
        // 是否是用户创建的歌单
        isCreated: false,
        // 评论是否在加载
        isCommentLoading: false,
        // 是否禁止滚动加载
        scrollLoadDisabled: false,
        // 收藏者列表的变量
        followedsListData: {
          // 当前页数
          currentPage: 1,
          // 列表
          followedsList: [],
          // 是否还有更多
          isMore: false,
          // 是否已经加载过列表数据 （用于点击收藏者tab后第一次加载数据）
          isLoaded: false,
        },
      };
    },
    computed: {
      ...mapState(['isLogin', 'createdMusicList', 'musicListId', 'collectMusicList', 'musicId']),
    },
    components: {
      Comment,
      UserListCard,
    },
    created() {
      this.getMusicListDetail();
      this.getUserMusicList();
      this.getIsSub();
    },
    methods: {
      ...mapMutations(['updateMusicId', 'updateMusicList', 'updateCollectMusicList']),
      // 请求
      // 根据传来的 id 查询歌单
      async getMusicListDetail() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/playlist/detail', {
          id: this.$route.params.id,
          timestamp,
        });
        this.musicListDetail = res.playlist;
        // 处理播放时间
        this.musicListDetail.tracks.forEach((item, index) => {
          this.musicListDetail.tracks[index].dt = handleMusicTime(item.dt);
        });
      },
      // 获取歌单评论
      async getMusicListComment(type) {
        // 获取时间戳
        const timestamp = Date.parse(new Date());
        this.isCommentLoading = true;
        if (type === 'changePage') {
          this.scrollToComment();
        }
        const res = await this.get('/comment/playlist', {
          id: this.$route.params.id,
          offset: (this.currentCommentPage - 1) * 50,
          limit: 50,
          timestamp,
        });

        this.comments = res;
        this.isCommentLoading = false;
      },
      // 滚动到上面
      scrollToComment() {
        const musicListDetail = document.querySelector('.musicListDetail');
        const listInfo = document.querySelector('.listInfo');
        musicListDetail.scrollTo({
          behavior: 'smooth',
          top: listInfo.clientHeight - 20,
        });
      },
      // 翻页函数
      commentPageChange(page) {
        this.currentCommentPage = page;
        this.getMusicListComment('changePage');
      },
      // 获取歌单收藏者
      async getMusicListFolloweds() {
        const res = await this.get('/playlist/subscribers', {
          id: this.$route.params.id,
          offset: (this.followedsListData.currentPage - 1) * 20,
        });
        this.followedsListData.followedsList.push(...res.subscribers);
      },
      // 点击小喇叭
      handleDOM(current, last) {
        if (document.querySelector('.musicListDetail')) {
          const tableRows = document.querySelector('.musicListDetail').querySelectorAll('.el-table__row');
          // 遍历当前musicList 找到当前播放的index的行进行渲染
          const index = this.musicListDetail.tracks.findIndex(item => {
            return item.id === current;
          });
          if (index !== -1) {
            // 直接修改dom样式的颜色无效  可能是因为第三方组件的原故
            // 通过引入全局样式解决
            // 将正在播放的音乐前面的索引换成小喇叭
            tableRows[index].children[0].querySelector('.cell').innerHTML = '<div><i class="iconfont icon-yinliang"></i></div>';
            tableRows[index].children[0].querySelector('.iconfont').classList.add('currentRow');
            tableRows[index].children[2].querySelector('.cell').classList.add('currentRow');
          }
          // 清除上一首的样式
          if (last !== -1) {
            const lastIndex = this.musicListDetail.tracks.findIndex(item => {
              return item.id === last;
            });
            if (lastIndex !== -1) {
              // 将上一个播放的dom的小喇叭换回索引
              tableRows[lastIndex].children[0].querySelector('.cell').innerHTML = `<div>${lastIndex + 1 < 10 ? `0${lastIndex + 1}` : lastIndex + 1}</div>`;

              // 将上一首的类名删掉  小喇叭的html已经被替换了，不需要再还原
              tableRows[lastIndex].children[2].querySelector('.cell').classList.remove('currentRow');
            }
          }
        }
      },
      // 少10加零函数
      handleIndex(index) {
        index += 1;
        if (index < 10) {
          return `0${index}`;
        }
        return index;
      },
      // 点击播放全部都函数处理
      playAll() {
        this.updateMusicId(this.musicListDetail.tracks[0].id);
        this.updateMusicList({
          musicList: this.musicListDetail.tracks,
          musicListId: this.musicListDetail.id,
        });
      },
      // 点击el-tab-pane的回调
      clickTab(e) {
        if (e.index === '1' && !this.comments.comments) {
          this.getMusicListComment();
        } else if (e.index === '2' && !this.followedsListData.isLoaded) {
          this.getMusicListFolloweds();
          this.followedsListData.isLoaded = true;
        }
      },
      // 音乐详情
      async getMusicDetail(ids) {
        if (this.isMore === false) return;
        this.scrollLoadDisabled = true;
        const res = await this.get('/song/detail', { ids });
        // 处理时间
        res.songs.forEach((item, index) => {
          res.songs[index].dt = handleMusicTime(item.dt);
        });
        this.musicListDetail.tracks.push(...res.songs);
      },
      // 双击table的row的回调
      async clickRow(row) {
        // 将musicId提交到vuex中 供bottomControl查询歌曲url和其它操作
        this.updateMusicId(row.id);
        // 如果歌单发生变化,则提交歌单到vuex
        if (this.musicListDetail.id !== this.musicListId) {
          // 将歌单传到vuex
          this.updateMusicList({
            musicList: this.musicListDetail.tracks,
            musicListId: this.musicListDetail.id,
          });
        }
      },
      // 请求用户歌单
      async getUserMusicList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/user/playlist', {
          uid: window.localStorage.getItem('userId'),
          timestamp,
        });
        // eslint-disable-next-line no-const-assign
        const arr = res.playlist;
        const index = arr.findIndex(item => {
          return item.subscribed === true;
        });
        this.collectedMusicList = arr.slice(index);
        // 将收藏的歌单上传至vuex
        this.updateCollectMusicList(this.collectedMusicList);
      },
      // 刷新获取歌单歌曲数据
      loadMore() {
        if (!this.isLogin) {
          this.$message.error('请先进行登录操作!');
          return;
        }
        let arr = this.musicListDetail.trackIds.slice(this.musicListDetail.tracks.length);
        if (arr.length > 100) {
          arr = arr.slice(0, 100);
        }
        let ids = '';
        arr.forEach(item => {
          ids += `${item.id},`;
        });
        ids = ids.substr(0, ids.length - 1);
        this.getMusicDetail(ids);
      },
      // 判断是否是用户创建的歌单
      getIsCreated() {
        this.isCreated = this.$store.state.createdMusicList.find(item => {
          return item.id === Number(this.$route.params.id);
        });
      },
      // 判断是否为收藏的歌单
      getIsSub() {
        const paramsId = Number(this.$route.params.id);
        this.isSub = this.collectMusicList.find(item => {
          return item.id === paramsId;
        });
      },
      // 点击收藏按钮的回调
      async collectList() {
        this.isSub = !this.isSub;
        const timestamp = Date.parse(new Date());
        const res = await this.get('/playlist/subscribe', {
          id: this.$route.params.id,
          t: this.isSub ? 1 : 2,
          timestamp,
        });
        // 请求收藏歌单列表并保存至vuex
        this.getUserMusicList();
      },
    },
    watch: {
      musicId(current, last) {
        this.handleDOM(current, last);
      },
      // 监听createdMusicList的变化
      createdMusicList(current, last) {
        if (last.length === 0) {
          this.getIsSub();
        }
      },
    },
    filters: {
      showDate(value) {
        // 1、先将时间戳转成Date对象
        const date = new Date(value);
        // 2、将date进行格式化
        return formatDate(date, 'yyyy-MM-dd');
      },
      handleNum,
    },
    async mounted() {
      if (this.isLogin) {
        // 先判断是否是用户创建的歌单
        this.getIsCreated();
        // 如果不是 再判断是否是收藏的歌单
        if (!this.isCreated) {
          this.getIsSub();
        }
      }
      await this.getMusicListDetail();
      this.$nextTick(() => {
        // 判断是否和上一次打开的歌单相同
        if (this.$route.params.id === this.musicListId) {
          this.handleDOM(this.musicId);
        }
      });
    },
  };
</script>

<style scoped>
  .musicListDetail {
    overflow-y: scroll;
    min-width: 1000px;
    padding: 0 20px;
    max-height: 785px;
  }

  .listInfo {
    display: flex;
    padding: 25px 20px;
    align-items: center;
  }

  .listAvatar {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 20px;
    position: relative;
  }

  .listAvatar::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    /* background: url('~assets/img/imgLoading.png') no-repeat; */
    background-size: contain;
    z-index: -1;
  }

  .listAvatar img {
    width: 100%;
  }

  .right {
    width: calc(100% - 208px);
  }

  .title {
    display: flex;
    align-items: center;
  }

  .titleTag {
    font-size: 23px;
    color: #ec4141;
    border: 1px solid #ec4141;
    padding: 1px 2px;
    border-radius: 2px;
    margin-right: 5px;
    transform: scale(0.8);
  }

  .titleContent {
    font-size: 27px;
    font-weight: 600;
    color: #373737;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
  }

  .user {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
  }

  .userAvatar {
    height: 25px;
    width: 25px;
    margin-right: 8px;
  }

  .userAvatar img {
    width: 100%;
    border-radius: 50%;
  }

  .userName {
    color: #6191c2;
    margin-right: 8px;
    cursor: pointer;
    font-size: 16px;
  }

  .createTime {
    transform: scale(0.9);
    font-size: 16px;
  }

  .buttons {
    margin: 8px 0 0 -5px;
    display: flex;
  }

  .buttonItem {
    font-size: 18px;
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    transform: scale(0.9);
  }

  .buttonItem i {
    font-size: 12px;
    margin-right: 3px;
    transform: scale(0.9);
  }

  .playAll {
    background-color: #ec4141;
    color: white;
  }

  .tags {
    width: 250px;
    margin: 8px 0 0 -12px;
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    transform: scale(0.9);
  }

  .tagItem {
    color: #6191c2;
    margin-right: 5px;
  }

  .otherInfo {
    width: 230px;
    margin: 5px 0 0 -10px;
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    transform: scale(0.9);
  }

  .musicNum {
    margin-right: 13px;
  }

  .desc {
    width: 500px;
    margin: 5px 0 0 -26px;
    font-size: 16px;
    transform: scale(0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .musicList {
    margin: -15px 15px 0;
  }

  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }

  .placeholder {
    width: 100%;
    height: 50px;
  }

  .loadMore {
    width: 100%;
    height: 50px;
    font-size: 12px;
    color: #aaa;
    text-align: center;
    line-height: 50px;
    transform: scale(0.9);
  }

  .red {
    color: #ec4141;
  }

  .commentList /deep/ .el-loading-spinner {
    top: 40px;
  }

  .tips {
    font-size: 14px;
    margin: 30px 0;
    text-align: center;
  }
</style>

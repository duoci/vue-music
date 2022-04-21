<template>
  <div class="videoDetail" v-if="videoUrl">
    <div class="left">
      <div class="title">
        {{ $route.params.type == 'mv' ? 'MV详情' : '视频详情' }}
      </div>
      <video
        class="videoPlayer"
        :src="videoUrl"
        controls
        width="496px"
        height="284px"
        @play="playVideo"
        :poster="$route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl"
      ></video>
      <!-- 视频详情信息 -->
      <div class="videoInfo" v-if="$route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl">
        <div class="user">
          <div class="avatar">
            <img @click="goToPersonal()" :src="($route.params.type == 'mv' ? videoInfo.artists[0].img1v1Url : videoInfo.avatarUrl) + '?param=100y100'" alt="" />
          </div>
          <div class="userName" @click="goToPersonal()">
            {{ $route.params.type == 'mv' ? videoInfo.artists[0].name : videoInfo.creator.nickname }}
          </div>
        </div>
        <div class="videoTitle">
          {{ $route.params.type == 'mv' ? videoInfo.name : videoInfo.title }}
        </div>
        <div class="otherInfo">
          <div>发布：{{ $route.params.type == 'mv' ? videoInfo.publishTime : videoInfo.publishTime | showDate }}</div>
          <div>播放：{{ ($route.params.type == 'mv' ? videoInfo.playCount : videoInfo.playTime) | handleNum }}</div>
        </div>
        <div class="buttons">
          <div class="buttonItem" @click="likeVideo"><i class="iconfont icon-good" :class="isLike ? 'red' : ''"></i>{{ isLike ? '已赞' : '赞' }}</div>
          <div class="buttonItem" @click="subVideo"><i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>{{ isSub ? '已收藏' : '收藏' }}</div>
          <div class="buttonItem"><i class="iconfont icon-zhuanfa"></i>分享</div>
        </div>
      </div>
      <!-- 视频评论 -->
      <div class="comment">
        <div class="commentList" v-loading="isCommentLoading">
          <!-- 精彩评论 -->
          <comment
            :comments="comments.comments"
            :commentType="'musicList'"
            :commentId="$route.params.id + ''"
            :isHotComment="comments.hotComments ? false : true"
            @getComment="$route.params.type == 'mv' ? getMvComment() : getVideoComment()"
            ><div slot="title">最新评论</div>
          </comment>
        </div>
        <!-- 分页 -->
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="comments.total"
            small
            :page-size="20"
            :current-page="commentsPage"
            @current-change="commentPageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="right" v-if="relatedVideo.length != 0">
      <div class="title">相关推荐</div>
      <div class="relatedVideoItem" v-for="(item, index) in relatedVideo" :key="index" @click="goToRelatedVideo(item.vid)">
        <div class="relatedVideoItemCover">
          <img :src="item.coverUrl + '?param=300y180'" alt="" />
          <div class="relatedVideoItemPlayCount"><i class="iconfont icon-shipin"></i> {{ item.playTime | handleNum }}</div>
          <div class="relatedVideoItemTime">
            {{ item.durationms | handleMusicTime }}
          </div>
        </div>
        <div class="relatedVideoItemInfo">
          <div class="relatedVideoItemTitle">{{ item.title }}</div>
          <div class="creator">by {{ item.creator[0].userName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { handleNum, handleMusicTime, formatDate } from 'plugins/utils.js';
  import Comment from '@/components/Comment/Comment.vue';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: { Comment },
    name: 'VideoDetail',
    data() {
      return {
        videoInfo: {},
        videoUrl: '',
        // 相关视频数据
        relatedVideo: [],
        comments: {},
        // 评论页数
        commentsPage: 1,
        // 用户是否收藏该视频
        isSub: false,
        // 是否正在加载评论
        isCommentLoading: false,
        // 用户是否喜欢该视频
        isLike: false,
      };
    },
    computed: {
      ...mapState(['likeVideoList', 'subVideoList']),
    },
    methods: {
      ...mapMutations(['updateSubVideoList', 'updateLikeVideoList', 'changePlayState']),
      // 根据传来的id查询mv详情
      async getMvDetail() {
        const res = await this.get('/mv/detail', {
          mvid: this.$route.params.id,
        });
        this.videoInfo = res.data;
      },
      // 请求mv地址
      async getMvUrl() {
        const res = await this.get('/mv/url', { id: this.$route.params.id });
        this.videoUrl = res.data.url;
      },
      // 请求相关视频
      async getRelatedVideo() {
        const res = await this.get('/related/allvideo', {
          id: this.$route.params.id,
        });
        this.relatedVideo = res.data;
      },
      // 请求mv评论数据
      async getMvComment(type) {
        // 获取时间戳
        const timestamp = Date.parse(new Date());
        this.isCommentLoading = true;
        if (type === 'changePage') {
          this.scrollToComment();
        }
        const res = await this.get('/comment/mv', {
          id: this.$route.params.id,
          offset: 20 * (this.commentsPage - 1),
          timestamp,
        });

        this.comments = res;
        this.isCommentLoading = false;
      },
      // 滚动到输入框
      scrollToComment() {
        const videoDetail = document.querySelector('.videoDetail');
        const commentTitle = document.querySelector('.commentTitle');
        videoDetail.scrollTo({
          behavior: 'smooth',
          top: commentTitle.offsetTop - 70,
        });
      },

      // 请求视频详情
      async getVideoDetail() {
        const res = await this.get('/video/detail', {
          id: this.$route.params.id,
        });
        this.videoInfo = res.data;
      },
      // 获取视频播放地址
      async getVideoUrl() {
        const res = await this.get('/video/url', {
          id: this.$route.params.id,
        });
        this.videoUrl = res.urls[0].url;
      },
      // 获取视频评论
      async getVideoComment(type) {
        const timestamp = Date.parse(new Date());
        this.isCommentLoading = true;
        if (type === 'changePage') {
          const videoDetail = document.querySelector('.videoDetail');
          const commentTitle = document.querySelector('.commentTitle');
          videoDetail.scrollTo({
            behavior: 'smooth',
            top: commentTitle.offsetTop - 70,
          });
        }
        const res = await this.get('/comment/video', {
          id: this.$route.params.id,
          offset: 20 * (this.commentsPage - 1),
          timestamp,
        });

        this.isCommentLoading = false;
        this.comments = res;
      },
      // 请求用户收藏的视频列表
      async getSubVideoList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/mv/sublist', { limit: 1000, timestamp });
        this.updateSubVideoList(res.data);
      },
      // 请求用户喜欢的视频列表
      async getLikeVideoList() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/playlist/mylike', {
          limit: 1000,
          timestamp,
        });
        this.updateLikeVideoList(res.data.feeds);
      },
      // 评论点击翻页的回调
      commentPageChange(page) {
        this.commentsPage = page;
        if (this.$route.params.type === 'mv') {
          this.getMvComment('changePage');
        } else if (this.$route.params.type === 'video') {
          this.getVideoComment('changePage');
        }
      },
      // 点击推荐视频的回调
      goToRelatedVideo(id) {
        this.$router.push({ name: 'videoDetail', params: { id, type: 'video' } });
      },
      // 监听vidoe播放的事件
      playVideo() {
        this.changePlayState(false);
      },
      // 判断用户是否收藏了该视频
      getIsSub() {
        this.isSub = this.subVideoList.find(item => item.vid === this.$route.params.id);
      },

      // 判断用户是否喜欢了该视频
      getIsLike() {
        if (this.$route.params.type === 'mv') {
          this.isLike = this.likeVideoList.find(item => item.mlogBaseData.id === this.$route.params.id);
        } else {
          // 因为请求的喜欢列表中的视频id是mlogid 要获取vid还需要另外单独请求  这里我直接对比标题和时长 若都对的上则认定为是同一个视频
          this.isLike = this.likeVideoList.find(
            item => item.mlogBaseData.desc === this.videoInfo.description && item.mlogBaseData.dration === this.videoInfo.durationms
          );
        }
      },

      // 用户点击了收藏按钮的回调
      async subVideo() {
        this.isSub = !this.isSub;
        const timestamp = Date.parse(new Date());

        // 请求
        if (this.$route.params.type === 'video') {
          await this.get('/video/sub', {
            id: this.$route.params.id,
            t: this.isSub ? 1 : 0,
          });
        } else {
          await this.get('/mv/sub', {
            mvid: this.$route.params.id,
            t: this.isSub ? 1 : 0,
            timestamp,
          });
        }
        this.getSubVideoList();
      },
      // 用户点击了点赞按钮的回调
      async likeVideo() {
        this.isLike = !this.isLike;
        const timestamp = Date.parse(new Date());
        const type = this.$route.params.type === 'mv' ? 1 : 5;
        // 请求
        const res = await this.$get('/resource/like', {
          type,
          id: this.$route.params.id,
          t: this.isLike ? 1 : 0,
          timestamp,
        });
        this.getLikeVideoList();
      },

      // 点击跳转至personal页面的回调
      goToPersonal() {
        const uid = this.$route.params.type === 'mv' ? this.videoInfo.artists[0].id : this.videoInfo.creator.userId;
        if (this.$route.params.type === 'mv') {
          this.$router.push({ name: 'singerDetail', params: { id: uid } });
        } else {
          this.$router.push({ name: 'personal', params: { uid } });
        }
      },
    },
    async created() {
      this.getRelatedVideo();
      if (this.$route.params.type === 'mv') {
        await this.getMvDetail();
        this.getMvUrl();
        this.getMvComment();
      } else if (this.$route.params.type === 'video') {
        await this.getVideoDetail();
        this.getVideoUrl();
        this.getVideoComment();
      }

      if (this.subVideoList === null) {
        await this.getSubVideoList();
      }
      this.getIsSub();
      if (this.likeVideoList === null) {
        await this.getLikeVideoList();
      }
      this.getIsLike();
    },
    filters: {
      handleNum,
      handleMusicTime,
      showDate(value) {
        // 1、先将时间戳转成Date对象
        const date = new Date(value);

        // 2、将date进行格式化
        return formatDate(date, 'yyyy-MM-dd');
      },
    },
    watch: {},
  };
</script>

<style scoped>
  .videoDetail {
    display: flex;
    justify-content: center;
    height: calc(95vh - 105px);
    overflow-y: scroll;
  }

  .left {
    width: 500px;
  }

  .right {
    margin-left: 20px;
  }

  .title {
    margin: 10px 0;
    color: black;
    font-weight: 600;
  }

  .relatedVideoItem {
    display: flex;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .relatedVideoItemCover {
    position: relative;
    margin-right: 10px;
  }

  .relatedVideoItemCover img {
    width: 150px;
    height: 90px;
    border-radius: 10px;
  }

  .relatedVideoItemPlayCount {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 12px;
    color: white;
    transform: scale(0.9);
  }

  .relatedVideoItemTime {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: white;
    transform: scale(0.9);
  }

  .relatedVideoItemInfo {
    font-size: 12px;
    color: rgb(31, 30, 30);
    margin: 12px 0;
    width: 140px;
  }

  .relatedVideoItemTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .creator {
    color: rgb(156, 156, 156);
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: scale(0.9) translateX(-5%);
  }

  .user {
    display: flex;
    margin: 10px 0;
    align-items: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .avatar img {
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
  }

  .userName {
    font-size: 12px;
    margin-left: 10px;
    color: rgb(36, 36, 36);
    cursor: pointer;
  }

  .videoTitle {
    color: #1b1b1b;
    font-size: 20px;
    margin: 20px 0 10px;
    font-weight: bold;
  }

  .otherInfo {
    display: flex;
    color: #aaa;
    font-size: 12px;
  }

  .otherInfo div {
    margin-right: 20px;
    transform: scale(0.9) translateX(-5%);
  }

  .buttons {
    display: flex;
    font-size: 12px;
    margin: 20px 0;
    color: #252525;
  }

  .buttonItem {
    padding: 5px 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
  }

  .buttonItem i {
    font-size: 12px;
    margin-right: 3px;
  }

  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }

  .videoPlayer {
    background-color: black;
  }

  .red {
    color: #ec4141;
  }

  .videoDetail /deep/ .el-loading-spinner {
    top: 40px;
  }
</style>

<template>
  <div class="hotComments">
    <div class="commentHeader"><slot name="title"></slot></div>
    <div class="commentItem" v-for="(item, index) in comments" :key="index">
      <div class="commentCreatorAvatar">
        <img :src="item.user.avatarUrl + '?param=100y100'" alt="" @click="goToPersonal(item.user.userId)" />
      </div>
      <div class="commentMain">
        <div class="commentContent">
          <span class="commentUserNickName" @click="goToPersonal(item.user.userId)">{{ item.user.nickname }}:&nbsp;</span>
          <span>{{ item.content }}</span>
        </div>
        <div class="replied">
          <div class="repliedItem" v-for="(item1, index1) in item.beReplied" :key="index1">
            <span class="repliedUser" @click="goToPersonal(item.user.userId)">@{{ item1.user.nickname }}:&nbsp;</span>
            <span class="repliedContent">{{ item1.content }}</span>
          </div>
        </div>
        <div class="commentBottom">
          <div class="commentCreatedTime">
            {{ item.time | showDate }}
          </div>
          <div class="commentButtons">
            <div @click="likeCurrentComment(item.liked, item.commentId)" :class="item.liked ? 'likeCurrentComment' : ''">
              <i class="iconfont icon-good"></i> {{ item.likedCount }}
            </div>
            <div><i class="iconfont icon-zhuanfa"></i></div>
            <div>
              <i class="iconfont icon-pinglun"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/plugins/utils';
  import { mapMutations } from 'vuex';
  export default {
    name: 'Comment',
    props: {
      // 评论数据
      comments: {
        type: Array,
        default() {
          return [];
        },
      },
      // 评论的类型
      commentType: {
        type: String,
        default() {
          return '';
        },
      },
      // 评论对象的id
      commentId: {
        type: String,
        default() {
          return '';
        },
      },
      // 歌曲评论需要歌曲名称
      musicTitle: {
        type: String,
        default() {
          return '';
        },
      },
      // 是否是热门评论
      isHotComment: {
        type: Boolean,
        default() {
          return true;
        },
      },
    },
    methods: {
      ...mapMutations(['changeMusicDetailCardState']),
      // 评论点赞
      async likeCurrentComment(flag, cid) {
        // 判断是否登录
        if (!this.$store.state.isLogin) {
          this.$message.warning('只有登陆后才能点赞哦!');
          return;
        }
        // 获取时间戳
        const timestamp = Date.parse(new Date());
        // 判断评论的类型
        let type;
        switch (this.commentType) {
          case 'album':
            type = 3;
            break;
          case 'musicList':
            type = 2;
            break;
          case 'music':
            type = 0;
            break;
          case 'mv':
            type = 1;
            break;
          case 'video':
            type = 5;
            break;
        }
        const res = await this.get('/comment/like', {
          id: this.commentId,
          cid,
          t: flag ? 0 : 1,
          type,
          timestamp,
        });
        if (res.code === 200) {
          this.$emit('getComment');
        } else {
          this.$message.error('点赞失败,请稍后重试!');
        }
      },
      // 跳转用户页面
      goToPersonal(userId) {
        this.$router.push({
          name: 'personal',
          params: { uid: userId },
        });
        if (this.commentType === 'music') {
          // this.$emit("closeMuiscDetailCard");
          this.changeMusicDetailCardState(false);
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
    },
  };
</script>

<style lang="less" scoped>
  .hotComments {
    .commentHeader {
      font-size: 18px;
      color: rgb(26, 26, 26);
      font-weight: 600;
      padding: 10px 0;
    }
    .commentItem {
      display: flex;
      margin: 5px 0;
      padding: 10px 0 20px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      .commentCreatorAvatar {
        width: 35px;
        height: 35px;
        margin: 0px 10px 0 0;
        & img {
          width: 100%;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .commentMain {
        .likeCurrentComment,
        .likeCurrentComment i {
          color: #ec4141 !important;
        }
        width: calc(100% - 50px);
        .commentUserNickName {
          color: #5a8ab9;
          cursor: pointer;
        }
        .commentBottom {
          margin-top: 2px;
          color: rgb(172, 172, 172);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .commentButtons {
          display: flex;
          align-items: center;
        }
        .commentButtons div {
          margin-top: -3px;
          padding: 0 8px;
          transform: scale(0.85);
        }

        .commentButtons div:nth-child(1) {
          font-size: 16px;
        }
      }
    }
  }
</style>

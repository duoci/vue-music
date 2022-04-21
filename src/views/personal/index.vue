<template>
  <div class="personal">
    <div class="personal-header">
      <div class="userBox">
        <div class="userBox-avatarUrl">
          <img class="auto-img da" :src="userInfo.avatarUrl + '?param=400y400'" alt="" />
        </div>
        <div class="userInfo">
          <div class="nameBox">
            <div class="uesrName">{{ userInfo.nickname }}</div>
            <div class="grade">{{ 'Lv' + userInfo.level }}</div>
          </div>
          <div class="information">
            <div class="attention">
              <div class="num">{{ userInfo.newFollows }}</div>
              <div class="title">关注</div>
            </div>
            <div class="attention">
              <div class="num">{{ userInfo.followeds }}</div>
              <div class="title">粉丝</div>
            </div>
            <div class="attention">
              <div class="num">{{ userInfo.eventCount }}</div>
              <div class="title">动态</div>
            </div>
          </div>
          <div class="desc">
            <span>个人介绍:</span>
            <span> {{ userInfo.signature == '' ? '暂无介绍' : userInfo.signature }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="musicList">
      <div class="musicListTitle" v-if="createdMusicList.length != 0">{{ userInfo.nickname }}创建的歌单({{ createdMusicList.length }})</div>
      <list-card :listCardData="createdMusicList" @clickListCardItem="clickListCardItem"></list-card>
      <div class="musicListTitle" v-if="collectedMusicList.length != 0">{{ userInfo.nickname }}收藏的歌单({{ collectedMusicList.length }})</div>
      <list-card :listCardData="collectedMusicList" @clickListCardItem="clickListCardItem"></list-card>
    </div>
    <div class="outLogin" @click="logout" v-if="isCurrentUser && this.isLogin">
      <i class="iconfont icon-zhuxiao1"></i>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
  import ListCard from '../../components/listCard/ListCard.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'personal',
    components: {
      ListCard,
    },
    data() {
      return {
        // 用户信息
        userInfo: {},
        // 是否为本账号登录
        isCurrentUser: false,
        // 创建的歌单
        createdMusicList: [],
        // 收藏的歌单
        collectedMusicList: [],
      };
    },
    computed: {
      ...mapState(['isLogin']),
    },
    async created() {
      await this.getUserInfo();
      this.getUserMusicList();
      // 判断该用户是不是当前登录用户
      if (window.localStorage.getItem('userId')) this.isCurrentUser = window.localStorage.getItem('userId') === this.$route.params.uid;
      if (!this.isCurrentUser) this.isCurrentUser = Number(window.localStorage.getItem('userId')) === this.$route.params.uid;
    },
    methods: {
      ...mapMutations(['updataLoginState']),
      async getUserInfo() {
        const { uid } = this.$route.params;
        const res = await this.get(`/user/detail?uid=${uid}`);
        if (!res) {
          this.$message.error('获取用户信息失败!');
          return;
        }
        res.profile.level = res.level;
        this.userInfo = res.profile;
      },
      // 请求用户歌单
      async getUserMusicList() {
        const timestamp = Date.parse(new Date());
        // 先从localStorage里面读取用户信息  如果登录成功是有存的
        let res = await this.get('/user/playlist', {
          uid: this.$route.params.uid,
          timestamp,
        });
        // 对数据进行处理分类
        if (res.playlist.length === 0) return;
        res = res.playlist;
        const index = res.findIndex(item => item.subscribed === true);
        res[0].name = `${this.userInfo.nickname}喜欢的音乐`;
        this.createdMusicList = res.slice(0, index);
        this.collectedMusicList = res.slice(index);
      },
      // 点击歌单的回调
      clickListCardItem(id) {
        this.$router.push({ name: 'musicListDetail', params: { id } });
      },
      async logout() {
        const res = await this.get('/logout');
        window.localStorage.removeItem('userId');
        //   在vuex中更新登录状态
        this.updataLoginState(false);
        this.$message.success('退出成功!');
        this.isCurrentUser = false;
      },
    },
  };
</script>

<style lang="less" scoped>
  .personal {
    height: 700px;
    position: relative;
    .personal-header {
      min-width: 900px;
      .userBox {
        width: 100%;
        margin: 0 auto;
        margin-top: 20px;
        background: #fff;
        padding: 20px;
        display: flex;
        justify-content: center;
        .userBox-avatarUrl {
          width: 200px;

          overflow: hidden;
          margin-right: 30px;
          .da {
            height: 100%;
            border-radius: 50%;
          }
        }
        .userInfo {
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .nameBox {
            display: flex;
            .uesrName {
              font-size: 28px;
              font-weight: 700;
            }
            .grade {
              width: 40px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background: #e4393c;
              border-radius: 15px;
              color: #fff;
              margin: 10px 0 0 10px;
            }
          }
          .information {
            display: flex;
            .attention {
              padding: 0 20px;
              &:nth-child(1) {
                padding-left: 0;
              }
            }
            .num {
              font-size: 27px;
            }
            .title {
              font-size: 12px;
            }
            .title {
              font-size: 12px;
            }
          }
        }
      }
    }
    .musicList {
      padding: 10px 20px;
      min-width: 900px;
      width: 100px;
      margin: 0 auto;
    }
    .outLogin {
      width: 100px;
      height: 40px;
      background-color: #fff;
      color: rgb(53, 52, 52);
      border: 1px solid #ccc;
      text-align: center;
      line-height: 40px;
      border-radius: 15px;
      position: absolute;
      right: 20px;
      top: 0;
      &:hover {
        background: rgb(158, 153, 153);
        color: #fff;
      }
    }
  }
</style>

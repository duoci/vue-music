<template>
  <div class="bottomControl">
    <audio
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
    ></audio>
    <!-- 左边 -->
    <div class="left">
      <div class="avatar" @click="$store.commit('changeMusicDetailCardState')">
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail.al" :draggable="false" />
        <img src="@/assets/img/test.jpg" alt="" v-else :draggable="false" />
      </div>
      <div class="musicInfo">
        <div class="musicName" v-if="musicDetail && musicDetail.name">
          {{ musicDetail.name }}
        </div>
        <div class="singer" v-if="musicDetail && musicDetail.name">
          {{ musicDetail.ar[0].name }}
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center">
      <div class="buttons">
        <span @click="playType = playType == 'order' ? 'random' : 'order'"
          ><i class="iconfont icon-xunhuan" v-if="playType == 'order'"></i><i class="iconfont icon-suiji1" v-else></i
        ></span>
        <span @click="musicList.length != 0 ? changeMusic('pre') : ''"><i class="iconfont icon-shangyishou"></i></span>
        <span @click="musicList.length != 0 ? changePlay() : ''">
          <i class="iconfont icon-icon_play" v-if="!isPlay"></i>
          <i class="iconfont icon-zantingtingzhi" v-else></i>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('next') : ''"><i class="iconfont icon-xiayishou"></i></span>
        <span><i class="iconfont icon-xihuan" :class="isUserLikeCurrentMusic ? 'like' : ''" @click="musicList.length != 0 ? likeIt() : ''"></i></span>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
        <!-- :value 是单向的  要实现双向要v-model -->
        <el-slider class="progressSlider" v-model="timeProgress" :show-tooltip="false" @change="changeProgress" :disabled="musicList.length == 0"></el-slider>
        <span class="totalTime">{{ duration }}</span>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <div class="volumeControl">
        <i class="iconfont icon-yinliang" @click="changeMutedState"></i>
        <el-slider class="volumeSlider" v-model="volume" @input="changeVolume" :show-tooltip="false"></el-slider>
      </div>
      <div class="playList" @click="openDrawer">
        <i class="iconfont icon-bofangliebiao"></i>
      </div>
    </div>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :with-header="false" width="300">
      <div class="drawerHeader">总{{ musicList.length }}首</div>
      <el-table :data="musicList" stripe style="width: 100%" :show-header="false" @row-dblclick="clickRow" highlight-current-row lazy>
        <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  import { handleMusicTime, returnSecond } from '@/plugins/utils';
  import { mapState, mapMutations } from 'vuex';
  let lastSecond = 0;
  // 总时长的秒数
  let durationNum = 0;
  // 保存当前音量
  let volumeSave = 0;

  export default {
    name: 'BottomControl',
    data() {
      return {
        musicDetail: {},
        musicUrl: '',
        // 记录当前音乐的index
        currentMusicIndex: 0,
        drawer: false,
        // 音乐总时长
        duration: '00:00',
        // 当前播放时间位置
        // 进度条的位置
        timeProgress: 0,
        // 音量
        volume: 30,
        // 是否静音
        isMuted: false,
        // 抽屉是否被打开过（如果没打开过，里面的数据是不会渲染的）
        hasDrawerOpend: false,
        // 用户的喜欢音乐列表
        likeMuiscList: [],
        // 用户是否喜欢当前音乐
        isUserLikeCurrentMusic: false,
        playType: 'order',
      };
    },
    computed: {
      ...mapState(['isPlay', 'musicList', 'musicId', 'currentIndex', 'isLogin', 'currentTime']),
    },
    methods: {
      ...mapMutations(['updateMusicLoadState', 'updataLikeMuiscList', 'changePlayState', 'updateCurrentIndex', 'updateMusicId', 'updateCurrentTime']),
      // 请求
      // 请求歌曲的url
      async getMusicDetail(id) {
        this.updateMusicLoadState(true);
        const result = await this.get('/song/url', { id });
        // 获取不到url
        if (result.data[0].url === null) {
          this.$message.error('该歌曲暂无版权，将为您播放下一首歌曲');
          this.changeMusic('next');
          return;
        }
        this.musicUrl = result.data[0].url;
        this.updateMusicLoadState(false);
      },
      // 喜欢该音乐
      // like参数:是否喜欢该音乐
      async likeMusic(id, like) {
        const res = await this.get('/like', { id, like });
      },
      // 获取喜欢音乐列表
      async getLikeMusicList() {
        // 获取时间戳
        const timestamp = Date.parse(new Date());
        // 因为喜欢音乐列表实时性较高，为了避免接口缓存，在请求后面加上一个时间戳
        const res = await this.get('/likelist', {
          uid: window.localStorage.getItem('userId'),
          timestamp,
        });
        this.likeMuiscList = res.ids;
        // 将喜欢列表提交到vuex 供歌单中显示喜欢使用 （因为性能问题暂时没做）
        this.updataLikeMuiscList(this.likeMuiscList);
      },

      // 点击播放键的回调
      changePlay() {
        !this.isPlay ? this.playMusic() : this.pauseMusic();
      },
      // 播放音乐的函数
      playMusic() {
        this.$refs.audioPlayer.play();
      },
      // 暂停音乐的函数
      pauseMusic() {
        this.$refs.audioPlayer.pause();
      },
      // audio开始或暂停播放的回调  在vuex中改变状态
      changeState(state) {
        this.changePlayState(state);
      },
      // 根据id找到 musicList中对应的musicDetail
      getMusicDetailFromMusicList() {
        this.musicList.forEach((item, index) => {
          if (item.id === this.musicId) {
            // 记录当前音乐的index
            this.currentMusicIndex = index;
            // 将索引传至vuex
            this.updateCurrentIndex(index);
            this.musicDetail = item;
            // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
            this.duration = this.musicList[index].dt;
          }
        });
        const index = this.musicList.findIndex(item => {
          return item.id === this.musicId;
        });
        if (index !== -1) {
          // 记录当前音乐的index
          this.currentMusicIndex = index;
          // 将索引传至vuex
          this.updateCurrentIndex(index);
          this.musicDetail = this.musicList[index];
          // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
          this.duration = this.musicList[index].dt;
        }
      },
      // 切歌函数
      changeMusic(type, id) {
        if (type === 'click') {
          // 点击抽屉row进行切歌
          this.updateMusicId(id);
        } else if (type === 'pre') {
          const { currentMusicIndex } = this;
          let preIndex;
          if (this.playType === 'order') {
            preIndex = currentMusicIndex - 1 < 0 ? this.musicList.length - 1 : currentMusicIndex - 1;
          } else if (this.playType === 'random') {
            if (this.musicList.length === 1) {
              preIndex = currentMusicIndex;
            } else {
              preIndex = currentMusicIndex;
              while (preIndex === currentMusicIndex) {
                preIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          }
          this.updateMusicId(this.musicList[preIndex].id);
        } else if (type === 'next') {
          const { currentMusicIndex } = this;
          let nextIndex;
          if (this.playType === 'order') {
            nextIndex = currentMusicIndex + 1 === this.musicList.length ? 0 : currentMusicIndex + 1;
          } else if (this.playType === 'random') {
            if (this.musicList.length === 1) {
              nextIndex = currentMusicIndex;
            } else {
              // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
              nextIndex = currentMusicIndex;
              while (nextIndex === currentMusicIndex) {
                nextIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          }
          this.updateMusicId(this.musicList[nextIndex].id);
        }
      },
      // 双击抽屉列表中的row的回调
      clickRow(row) {
        this.changeMusic('click', row.id);
      },
      // 当前播放时间位置
      timeupdate() {
        // 节流
        let time = this.$refs.audioPlayer.currentTime;
        // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
        this.updateCurrentTime(time);
        time = Math.floor(time);
        if (time !== lastSecond) {
          lastSecond = time;
          // 计算进度条的位置
          this.timeProgress = Math.floor((time / durationNum) * 100);
        }
      },
      // 拖动进度条的回调
      changeProgress(e) {
        // 修改当前播放时间
        const c = Math.floor((e / 100) * durationNum);
        this.updateCurrentTime(c);
        // 改变audio的实际当前播放时间
        this.$refs.audioPlayer.currentTime = this.currentTime;
      },
      // 拖动音量条的回调
      changeVolume(e) {
        // 改变audio的音量
        this.$refs.audioPlayer.volume = e / 100;
        if (this.isMuted && e > 0) {
          this.isMuted = false;
        } else if (e === 0 && this.isMuted === false) {
          this.isMuted = true;
        }
      },
      // 点击小喇叭的回调 （切换静音状态）
      changeMutedState() {
        if (this.isMuted) {
          this.volume = volumeSave;
        } else {
          volumeSave = this.volume;
          this.volume = 0;
        }
        this.isMuted = !this.isMuted;
      },
      // 操作drawerList中DOM的函数
      handleDrawerListDOM(currentIndex, lastIndex) {
        // currentIndex当前播放的index
        // lastIndex上一次点击的index
        // 目前没什么好思路 直接操作原生DOM
        this.$nextTick(() => {
          const tableRows = document.querySelector('.bottomControl').querySelectorAll('.el-table__row');
          // // 通过引入全局样式解决
          if (tableRows[currentIndex]) {
            tableRows[currentIndex].children[0].querySelector('.cell').classList.add('currentRow');
            tableRows[currentIndex].children[1].querySelector('.cell').classList.add('currentRow');
          }
          if ((lastIndex && lastIndex !== -1 && tableRows[lastIndex]) || lastIndex === 0) {
            // 将上一首的类名删掉
            tableRows[lastIndex].children[0].querySelector('.cell').classList.remove('currentRow');
            tableRows[lastIndex].children[1].querySelector('.cell').classList.remove('currentRow');
          }
        });
      },
      // 点击打开抽屉的回调
      openDrawer() {
        // 关闭也是这个回调，所以直接取反
        this.drawer = !this.drawer;
        this.hasDrawerOpend = true;
        this.handleDrawerListDOM(this.currentMusicIndex);
      },
      // 判断用户是否喜欢该音乐
      getIsUserLikeCurrentMusic() {
        this.isUserLikeCurrentMusic = this.likeMuiscList.find(item => {
          return item === this.musicId;
        });
      },
      // 用户点击喜欢该音乐的回调
      async likeIt() {
        if (!window.localStorage.getItem('userId')) {
          this.$message.error('请先登录!');
          return;
        }
        this.isUserLikeCurrentMusic = !this.isUserLikeCurrentMusic;
        await this.likeMusic(this.musicId, this.isUserLikeCurrentMusic);
        await this.getLikeMusicList();
      },
    },

    watch: {
      currentTime(currentTime, lastTime) {
        if (lastTime && Math.abs(currentTime - lastTime) >= 1) {
          this.$refs.audioPlayer.currentTime = currentTime;
        }
      },
      // 监听vuex中musicId的变化
      musicId(id) {
        // 先暂停当前播放的音乐
        this.pauseMusic();
        // 找到音乐的具体信息
        this.getMusicDetailFromMusicList();
        // 获取歌曲的url
        this.getMusicDetail(id);
        // 秒数转换
        durationNum = returnSecond(this.duration);
        // 判断用户是否喜欢当前音乐
        this.getIsUserLikeCurrentMusic();
      },
      // 监听currentIndex的变化
      currentIndex(currentIndex, lastIndex) {
        if (this.hasDrawerOpend) {
          this.handleDrawerListDOM(currentIndex, lastIndex);
        }
      },
      // 监听播放状态
      isPlay(isPlay) {
        if (isPlay) {
          this.playMusic();
        } else {
          this.pauseMusic();
        }
      },
      isLogin(current) {
        // console.log(current, '监测登录状态');
        if (current) {
          this.getLikeMusicList();
        } else {
          // 清空喜欢列表
          this.likeMuiscList = [];
        }
      },
    },
    filters: {
      handleMusicTime,
    },
  };
</script>

<style scoped>
  .bottomControl {
    border-top: 1px solid #ddd;
    width: 100%;
    height: 92px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    z-index: 10000;
    background-color: #fff;
  }

  .avatar {
    width: 50px;
    height: 50px;

    overflow: hidden;
    margin: 0 10px;
    cursor: pointer;
  }

  .avatar img {
    width: 100%;
    border-radius: 15px;
  }

  .left {
    display: flex;
    align-items: center;
    width: 200px;
  }

  .musicInfo {
    color: rgb(37, 37, 37);
    font-size: 16px;
    width: 120px;
  }

  .musicName {
    margin-bottom: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singer {
    transform: scale(0.9);
    margin-left: -3px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .center {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons {
    display: flex;
    align-items: center;
    height: 20px;
  }

  .buttons i {
    font-size: 25px;
    color: #313131;
  }

  .buttons span:nth-child(3) i {
    font-size: 30px;
  }

  .center .icon-xunhuan {
    font-size: 25px;
  }
  .center .icon-xihuan {
    font-size: 22px;
  }

  .right {
    display: flex;
    align-items: center;
    position: relative;
  }

  .volumeControl {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .icon-yinliang {
    font-size: 21px;
    margin-right: 7px;
  }

  .volumeSlider {
    width: 90px;
  }

  .icon-bofangliebiao {
    font-size: 25px;
    margin-right: 10px;
  }

  .progressSlider {
    width: 300px;
  }

  .buttons span {
    display: inline-block;
    width: 50px;
    box-sizing: border-box;
    text-align: center;
  }

  .icon-zantingtingzhi {
    font-size: 35px !important;
  }

  .drawerHeader {
    font-size: 12px;
    transform: scale(0.9);
    color: #aaa;
    padding: 15px 0;
  }

  .progressBar {
    display: flex;
    align-items: center;
  }

  .currentTime,
  .totalTime {
    font-size: 18px;
    transform: scale(0.85);
    color: #aaa;
    margin: 0 5px;
    width: 50px;
    text-align: center;
  }

  .progressBar {
    height: 15px;
    margin-top: 12px;
    overflow: hidden;
  }

  .like {
    color: #ec4141 !important;
  }

  .downloadContainer {
    height: 100%;
    position: relative;
  }

  .downloadContainer i {
    position: absolute;
    bottom: 5px;
  }

  .recondInfo {
    position: absolute;
    font-size: 12px;
    transform: scale(0.8);
    width: 140px;
    right: -5px;
    bottom: -5px;
  }

  .center .icon-suiji1 {
    font-size: 15px;
  }
</style>

<template>
  <div class="headerBar">
    <div class="headerBar-left">
      <img src="@/assets/img/logo.png" alt="" />
    </div>
    <div class="center">
      <div class="buttons">
        <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
      <div class="search">
        <el-popover placement="bottom" width="300" v-model="isSearchPopShow" popper-class="searchPop" trigger="focus">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="mini"
            slot="reference"
            @input="inputSearch"
            @keyup.enter.native="onSubmit"
            v-model="searchInput"
          >
          </el-input>
          <div class="hotSearch" v-if="!searchSuggestList.songs">
            <div class="hotSearchTitle">热搜榜</div>
            <div class="hotSearchItem" v-for="(item, index) in hotSearchList" :key="index" @click="clickHotSearchItem(item.searchWord)">
              <div class="hotSearchIndex" :class="index < 3 ? 'topThree' : ''">
                {{ index + 1 }}
              </div>
              <div class="hotSearchInfo">
                <div class="hotSearchWord" :class="index < 3 ? 'hotSearchWordTopThree' : ''">
                  {{ item.searchWord }}
                </div>
                <div class="hotSearchContent">{{ item.content }}</div>
              </div>
            </div>
          </div>
          <!-- 搜索建议 -->
          <div class="searchSuggest">
            <div class="hotSearchTitle" v-if="searchSuggestList.songs">搜索建议</div>
            <!-- 单曲 -->
            <div class="searchSuggestItem" v-if="searchSuggestList.songs && searchSuggestList.songs.length != 0">
              <div class="searchSuggestItemTitle"><i class="iconfont icon-yinle"></i> 单曲</div>
              <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.songs" :key="index" @click="clickSuggestSong(item.id)">
                {{ item.name + ' - ' + item.artists[0].name }}
              </div>
            </div>
            <!-- 歌手 -->
            <div class="searchSuggestItem" v-if="searchSuggestList.artists && searchSuggestList.artists.length != 0">
              <div class="searchSuggestItemTitle"><i class="iconfont icon-mic"></i> 歌手</div>
              <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.artists" :key="index" @click="clickSuggestSinger(item.id)">
                {{ item.name }}
              </div>
            </div>
            <!-- 歌单 -->
            <div class="searchSuggestItem" v-if="searchSuggestList.playlists && searchSuggestList.playlists.length != 0">
              <div class="searchSuggestItemTitle"><i class="iconfont icon-gedan"></i> 歌单</div>
              <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.playlists" :key="index" @click="clickSuggestMusicList(item.id)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="login">
      <el-popover placement="left-start" width="300" trigger="click" popper-class="my-popover" v-if="!isLogin">
        <div class="CheckUser">
          <h2 class="CheckUserH2">密码登陆</h2>
          <el-input v-model="loginPhone" type="number" placeholder="请输入手机号"></el-input>
          <el-input placeholder="请输入密码" v-model="loginPsw" show-password></el-input>
          <div class="subLogin" style="width: 70px; margin: 0px auto; margin-top: 10px"><el-button type="primary" plain @click="Login">登陆</el-button></div>
          <el-popover placement="bottom" title="二维码登陆" width="200" trigger="click">
            <div class="qrimg">
              <img :src="qrimg" alt="" />
            </div>
            <el-button slot="reference" class="erweima" @click="erweima">
              <img src="@/assets/img/erweima.png" alt="" class="auto-img erw" />
            </el-button>
          </el-popover>
        </div>
        <el-button slot="reference">登陆</el-button>
      </el-popover>
      <div class="userinfo" v-else>
        <div class="userinfo-img">
          <img :src="userInfo.avatarUrl" alt="" class="auto-img" @click="goToPersonal" />
        </div>
        <div class="userinfo-name">{{ userInfo.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // 节流定时器名称
  import { handleMusicTime } from 'plugins/utils';
  import { mapState, mapMutations } from 'vuex';
  let timer;
  export default {
    name: 'HeaderBar',
    data() {
      return {
        loginPhone: '',
        loginPsw: '',
        userInfo: null,
        isPopoverShow: false,
        // 是否显示searchPop
        isSearchPopShow: false,
        // 热搜列表数据
        hotSearchList: [],
        // 需要搜索的内容
        searchInput: '',
        // 搜索建议列表
        searchSuggestList: {},
        // 是否显示注册框
        isRegisteredShow: false,
        // 二维码key
        unikey: '',
        // 二维码base64
        qrimg: '',
        time: null,
      };
    },
    created() {
      this.getHotSearch();
      if (window.localStorage.getItem('userId')) {
        this.getInfo();
      }
    },
    computed: {
      ...mapState(['isLogin', 'musicListId']),
    },
    methods: {
      ...mapMutations(['updataLoginState', 'changePlayState', 'updateMusicId', 'updateMusicList']),
      // 点击热搜榜item的回调
      clickHotSearchItem(searchWord) {
        this.searchInput = searchWord;
        this.goSearch();
      },
      // 点击搜索建议中歌手的回调
      clickSuggestSinger(id) {
        this.$router.push({ name: 'singerDetail', params: { id } });
        this.isSearchPopShow = false;
      },
      // 点击搜索建议中歌单的回调
      clickSuggestMusicList(id) {
        this.$router.push({ name: 'musicListDetail', params: { id } });
        this.isSearchPopShow = false;
      },
      async getMusicInfo(ids) {
        const res = await this.get('/song/detail', { ids });
        // 处理时间
        res.songs[0].dt = handleMusicTime(res.songs[0].dt);
        return res.songs[0];
      },
      // 点击搜索建议中单曲的回调
      async clickSuggestSong(id) {
        const row = await this.getMusicInfo(id);
        this.isSearchPopShow = false;
        // 首先获取当前的歌单列表和歌曲索引
        const { musicList } = this.$store.state;
        const { currentIndex } = this.$store.state;
        // 先判断该歌曲是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
        const isExist = musicList.find(item => item.id === row.id);
        if (isExist) {
          // 如果已经存在 则只提交歌曲id并return出去
          this.updateMusicId(row.id);
          return;
        }
        this.changePlayState(false);
        // 将请求到的歌曲详情插入到歌单对应位置并提交至vuex
        musicList.splice(currentIndex + 1, 0, row);
        this.updateMusicId(row.id);
        this.updateMusicList({
          musicList,
          musicListId: this.musicListId,
        });
      },
      // 获取搜索建议
      async getSearchSuggest(keywords) {
        const res = await this.get('/search/suggest', { keywords });
        this.searchSuggestList = res.result;
      },
      // 在搜索框中输入的回调
      inputSearch(e) {
        // console.log(e);
        clearTimeout(timer);
        if (e !== '') {
          timer = setTimeout(() => {
            this.getSearchSuggest(e);
          }, 500);
        } else {
          // 清空searchSuggestList
          this.searchSuggestList = {};
          return;
        }
      },
      // 在输入框按下回车的回调
      onSubmit(e) {
        if (e.keyCode === 13 && this.searchInput !== '') {
          this.goSearch();
        }
      },
      // 获取热搜列表
      async getHotSearch() {
        const res = await this.get('/search/hot/detail');
        this.hotSearchList = res.data;
      },
      // 跳转至搜索详情页面
      goSearch() {
        this.isSearchPopShow = false;
        this.$router.push({ name: 'search', params: { id: this.searchInput } });
      },
      // 点击热搜榜item的回调
      clickHotSearchItem(searchWord) {
        this.searchInput = searchWord;
        this.goSearch();
      },
      // 密码登陆
      async Login() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('login/cellphone', {
          phone: this.loginPhone,
          password: this.loginPsw,
          timestamp,
        });
        if (res.code === 200) {
          this.$message.success(res.msg);
          window.localStorage.setItem('userId', res.account.id);
          this.$message.success('登录成功!');
          // 修改vuex中的登录状态
          this.updataLoginState(true);
        } else {
          this.$message.error(res.msg);
          this.loginPhone = '';
          this.loginPsw = '';
          return;
        }
        // 清空输入框的内容
        this.loginPhone = '';
        this.loginPsw = '';
        this.getInfo();
      },
      // 点击二维码
      erweima() {
        this.QRCodeLogin();
      },
      // 二维码登陆
      async QRCodeLogin() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/login/qr/key', { timestamp });
        this.unikey = res.data.unikey;
        this.QRCodeKey(this.unikey);
        this.time = setInterval(() => {
          this.QRCodeStote(this.unikey);
        }, 5000);
      },
      // 获取二维码照片
      async QRCodeKey(unikey) {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/login/qr/create', { key: unikey, qrimg: true, timestamp });
        this.qrimg = res.data.qrimg;
      },
      // 获取二维码状态
      async QRCodeStote(unikey) {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/login/qr/check', { key: unikey, timestamp }, false);
        if (res.code === 803) {
          this.$message.success('登录成功!');
          this.getuser();
          clearInterval(this.time);
        }
      },
      // 用户信息
      async getuser() {
        const res = await this.get('/user/account');
        this.userInfo = res.profile;
        window.localStorage.setItem('userId', res.account.id);
        this.updataLoginState(true);
      },
      async getInfo() {
        const timestamp = Date.parse(new Date());
        const res = await this.get('/user/detail', {
          uid: window.localStorage.getItem('userId'),
          timestamp,
        });
        if (!res.profile) return;
        this.userInfo = res.profile;
        this.updataLoginState(true);
      },
      // 点击头像转个人页面
      goToPersonal() {
        if (this.$route.path !== `/Personal/${this.userInfo.userId}`) {
          this.$router.push({
            name: 'personal',
            params: { uid: this.userInfo.userId },
          });
        }
      },
    },
    watch: {
      isLogin(current) {
        if (!current) this.userInfo = {};
        this.getInfo();
      },
    },
  };
</script>

<style lang="less" scoped>
  @import './HeaderBar-element.less';
</style>

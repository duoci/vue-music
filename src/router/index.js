import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Discover = () => import('../views/discover/Discover.vue');
const Recommend = () => import('../views/discover/childRoute/Recommend');
const Musiclist = () => import('../views/discover/childRoute/Musiclist');
const Ranking = () => import('../views/discover/childRoute/Ranking');
const Singer = () => import('../views/discover/childRoute/Singer');
const Video = () => import('../views/video/Video.vue');
const VideoDetail = () => import('../views/videoDetail/VideoDetail.vue');
const VideoList = () => import('../views/video/videoChildren/VideoList.vue');
const MvList = () => import('../views/video/videoChildren/MvList.vue');
const RecommendMusic = () => import('../views/recommendmusic/Recommendmusic.vue');
const Favorites = () => import('../views/favorites/Favorites.vue');
const MusicListDetail = () => import('../views/musicListDetail/MusicListDetail');
const Personal = () => import('../views/personal');
const SingerDetail = () => import('../views/singerDetail/SingerDetail.vue');
const Search = () => import('views/search/Search.vue');
const SearchSong = () => import('../views/search/searchChildren/SearchSong.vue');
const SearchSinger = () => import('../views/search/searchChildren/SearchSinger.vue');
const SearchVideo = () => import('../views/search/searchChildren/SearchVideo.vue');
const SearchMusicList = () => import('../views/search/searchChildren/SearchMusicList.vue');
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/discover',
    component: () => {
      return import('../views/Index.vue');
    },
    children: [
      {
        path: '/discover',
        component: Discover,
        redirect: '/discover/recommend',
        children: [
          { path: '/discover/recommend', component: Recommend },
          { path: '/discover/musiclist', component: Musiclist },
          { path: '/discover/ranking', component: Ranking },
          { path: '/discover/singer', component: Singer },
        ],
      },
      {
        path: '/video',
        component: Video,
        redirect: '/video/videolist',
        children: [
          { path: '/video/videolist', component: VideoList },
          { path: '/video/mvlist', component: MvList },
        ],
      },
      { path: '/recommendmusic', component: RecommendMusic },
      { path: '/favorites', component: Favorites },
      { path: '/musiclistdetail/:id', name: 'musicListDetail', component: MusicListDetail },
      { path: '/Personal/:uid', name: 'personal', component: Personal },
      { path: '/singerdetail/:id', name: 'singerDetail', component: SingerDetail },
      { path: '/videodetail/:id/:type', name: 'videoDetail', component: VideoDetail },
      {
        path: '/search/:id',
        name: 'search',
        component: Search,
        redirect: '/search/searchsong/:id',
        children: [
          { path: '/search/searchsong/:id', name: 'searchSong', component: SearchSong },
          { path: '/search/searchsinger/:id', name: 'searchSinger', component: SearchSinger },
          { path: '/search/searchvideo/:id', name: 'searchVideo', component: SearchVideo },
          { path: '/search/searchmusiclist/:id', name: 'searchMusicList', component: SearchMusicList },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

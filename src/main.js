import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element-ui';
import axios, { get } from '@/network/request';
Vue.prototype.get = get;
Vue.config.productionTip = false;
// 全局样式表
import './assets/css/base.css';
import 'element-ui/lib/theme-chalk/index.css';
new Vue({
  router,
  store,
  render(h) {
    return h(App);
  },
}).$mount('#app');

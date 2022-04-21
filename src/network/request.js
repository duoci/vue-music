import axios from 'axios';
import vuex from '../store/index';
import Vue from 'vue';
import { Loading } from 'element-ui';
Vue.prototype.axios = axios;
// 该项目所有请求均为 get请求
// axios.defaults.baseURL = 'https://apis.netstart.cn/music';
const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
});
instance.defaults.withCredentials = true;
export const get = (url, params = {}, loading = true) => {
  return new Promise((resolve, reject) => {
    let loadingInstance = null;
    if (loading) loadingInstance = Loading.service({ fullscreen: true });
    const paramsObj = {
      params,
    };
    instance
      .get(url, params ? paramsObj : null)
      .then(res => {
        if (loading) loadingInstance.close();
        resolve(res.data);
      })
      .catch(err => {
        console.log('黄err ==> ', err);
        reject(err);
      });
  });
};
export default axios;

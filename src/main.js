import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入Element Plus
import ElementPlus from 'element-plus';
import VuePanzoom from 'vue-panzoom';
import store from "@/store.js";
import axios from "axios";
import 'element-plus/dist/index.css';  // 确保正确加载 Element Plus 样式
const app = createApp(App)

//使用 Vue-router
app.use(router)
// 使用 Element Plus
app.use(ElementPlus);
app.use(VuePanzoom);
// 配置 Axios 基础 URL
axios.defaults.baseURL = 'http://localhost:5000'; // 根据实际情况调整
// 从 Vuex 中获取令牌并设置 Axios 头
const token = store.getters.getToken;
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// 使用 Vuex store
app.use(store);
app.mount('#app')

import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        username: localStorage.getItem('username') || '', // 从 localStorage 中恢复用户名
        token: localStorage.getItem('access_token') || '', // 从 localStorage 中恢复令牌
    },
    mutations: {
        SET_USERNAME(state, payload) {
            state.username = payload;
            localStorage.setItem('username', payload); // 保存到 localStorage
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
            localStorage.setItem('access_token', payload); // 保存令牌到 localStorage
            // 动态设置 Axios 的 Authorization 头部
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
        },
        CLEAR_AUTH(state) {
            state.username = '';
            state.token = '';
            localStorage.removeItem('username'); // 移除用户名
            localStorage.removeItem('access_token'); // 移除令牌
        },
    },
    actions: {
        setUsername({ commit }, username) {
            commit('SET_USERNAME', username); // 提交 mutation 更新用户名
        },
        setToken({ commit }, token) {
            commit('SET_TOKEN', token); // 提交 mutation 更新令牌
        },
        logout({ commit }) {
            commit('CLEAR_AUTH'); // 清除认证信息
        },
    },
    getters: {
        getUsername: (state) => state.username,
        getToken: (state) => state.token,
        isAuthenticated: (state) => !!state.token, // 根据是否有令牌判断是否已认证
    },
});

export default store;

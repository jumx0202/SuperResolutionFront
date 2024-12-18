<--这个写上了与后端交互的js部分,history是前端的静态展示-->
<--用户名和用户头像,还有历史记录都来自后端的返回-->
<template>
  <div class="container">
    <!-- Header Section -->
    <header class="header">
      <div class="user-info">
        <div class="avatar-wrapper">
          <!-- <el-avatar :src="avatarUrl" :size="40" class="cursor-pointer" />-->
          <img :src="avatarUrl" alt="User Avatar" class="avatar" />
        </div>
        <div class="user-details">
          <span class="username">{{ user.username }}</span>
        </div>
      </div>
      <div class="header-actions">
        <!--        <div class="history" @click="goToHistory">历史记录</div>-->
        <el-button class="home-button" type="success" round @click="goHome">主页面</el-button>
        <el-button class="logout-button" round @click="handleLogout">登出</el-button>
      </div>

    </header>

    <!-- History Records Section -->
    <div class="history-list">
      <div class="history-item" v-for="(record, index) in historyRecords" :key="index">
        <div class="left">
          <img :src="record.originalImage" alt="Uploaded Image" class="history-image" />
          <img :src="record.processedImage" alt="Uploaded Image" class="history-image" />
        </div>
        <div class="right">
          <span class="time">{{ record.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {mapActions, useStore} from "vuex";
import axios from "axios";
import {ElMessage} from "element-plus";
import { mapGetters } from 'vuex';
import {getHistory} from "@/api/imageAPI.js";
export default {
  data() {
    return {
      historyRecords: [
        // { image: '/src/assets/back1.png', time: '2024-12-10 12:00' },
        // { image: '/src/assets/back2.png', time: '2024-12-09 14:30' },
        // { image: '/src/assets/back3.png', time: '2024-12-08 16:45' },
      ],
      user: {
        avatar: '', // 用户头像
        username: '', // 用户名
      },
      avatarUrl: ref(''), // 存放头像 URL
    };
  },
  mounted() {
    // 获取用户信息
    this.fetchUserData();
    //获取图片历史记录
    this.getUserHistory();
  },
  methods: {
    ...mapActions(['logout']),
    goHome() {
      // 跳转到主页面
      this.$router.push('/home');
    },
    ...mapActions(['logout']),
    // 获取用户数据
    async fetchUserData() {
      try {
        const store = useStore();
        this.user.username = computed(() => store.getters.getUsername);
        console.log(this.user.username);
        // 生成文字头像
        this.avatarUrl = this.user.avatar
            ? this.user.avatar
            : this.generateAvatar(this.user.username);
      } catch (error) {
        console.error('获取用户数据失败', error);
      }
    },
    async getUserHistory(){
      try{
        const response = await getHistory();
        response.forEach(record => {
          this.historyRecords.push({
            originalImage: record.originalImageUrl,  // 原图片 URL
            processedImage: record.processedImageUrl,// 处理后的图片 URL
            time: record.created_at           // 创建时间
          });
        });
      }catch (error) {
        console.error('获取历史记录错误', error);
        ElMessage.error('未知错误，请稍后再试');
      }
    },
    // 生成文字头像函数
    generateAvatar(username) {
      if (!username) return '';

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;

      // 设置背景颜色
      context.fillStyle = '#007bff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 设置文字样式
      context.font = '40px Arial';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // 获取用户名的前两个字母
      const initials = username.substring(0, 2).toUpperCase();

      // 绘制文字到 Canvas
      context.fillText(initials, canvas.width / 2, canvas.height / 2);

      // 将 Canvas 转换为图片 URL
      return canvas.toDataURL('image/png');
    },
    async handleLogout() {
      try {
        // 清除 Vuex 中的认证信息
        this.logout();

        // 移除 Axios Authorization 头
        delete axios.defaults.headers.common['Authorization'];

        // 显示成功消息
        ElMessage.success('登出成功');

        // 重定向到登录页面
        this.$router.push('/login');
      } catch (error) {
        console.error('登出失败', error);
        ElMessage.error('登出失败，请稍后再试');
      }
    },
  },
  watch: {
    // 监听用户名变化，动态生成文字头像
    'user.username'(newUsername) {
      this.avatarUrl = newUsername ? this.generateAvatar(newUsername) : '';
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

.header {
  position: relative;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 6.5vh;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #007bff;
}

.username {
  font-size: 1.3em;
  font-weight: bold;
  color: #333;
}


.history-list {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-item {
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin: 12px 0;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, transform 0.3s;
}

.history-item:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.history-item .left {
  width: 50%;
  display: flex;
}

.history-item .right {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.history-image {
  width: 60%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 2vw;
}

.time {
  font-size: 1.1em;
  color: #555;
  font-weight: 500;
}

.header-actions{
  display: flex;
  margin-right: 1vw;
}
</style>

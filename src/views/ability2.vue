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
        <el-button class="history-button" round @click="goToHistory" style="background-color: black; color: white; border-color: black;">
          历史记录
        </el-button>
        <el-button class="logout-button" round @click="handleLogout">登出</el-button>
      </div>

    </header>

    <!-- Slider Section -->
    <div class="slider" ref="slider">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="slides"
          :style="{ backgroundImage: `url(${image})`, opacity: currentSlide === index ? 1 : 0 }"
      >
<!--        <img :src="image" alt="Slide Image" class="image-slide" />-->
      </div>
    </div>

    <!-- Buttons Section -->
    <div class="buttons">
      <div class="prev" @click="prevSlide"> < </div>
      <div class="next" @click="nextSlide"> > </div>
    </div>

    <!-- Indicator Section -->
    <div class="indicator">
      <span
          v-for="(image, index) in images"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      user: {
        avatar: '', // 用户头像
        username: '', // 用户名
      },
      images: [], // 处理前后的图像
      currentSlide: 0, // 当前图片索引
      avatarUrl: ref(''), // 存放头像 URL
    };
  },
  mounted() {
    // 获取 URL 参数中的图片地址
    const originalImageUrl = this.$route.query.originalImageUrl;
    const processedImageUrl = this.$route.query.processedImageUrl;

    if (originalImageUrl && processedImageUrl) {
      // 如果有处理前后的图片 URL，就加载图像
      this.images = [originalImageUrl, processedImageUrl];
      console.log(this.images);
    }

    // 获取用户信息
    this.fetchUserData();
  },
  methods: {
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

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
    },
    goToHistory() {
      this.$router.push('/history2');
    },
    goToSlide(index) {
      this.currentSlide = index;
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

body {
  font-family: 'Arial', sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f1f1f1, #d9d9d9);
  overflow: hidden;
  padding: 20px;
}

.header {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px);
  height: 6.5vh;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  width: 45px; /* 与 el-avatar 的 size 保持一致 */
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}


.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  font-size: 1.5em;
  font-weight: 700;
  color: #333;
}

.history {
  font-size: 1.3em;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: underline;
}

.history:hover {
  color: #007bff;
}

.slider {
  position: relative;
  width: 100%; /* Full width */
  height: 75%; /* Reduced height for better composition */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.slider .slides {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%; /* Limit width to 90% of the container */
  height: 90%; /* Limit height to 90% of the container */
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.7s ease-in-out;
  background-size: contain; /* 图片保持原比例，适配容器大小 */
  background-repeat: no-repeat; /* 禁止平铺 */
  background-position: center; /* 图片居中显示 */
}

.image-slide {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.buttons {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 20px;
}

.buttons > div {
  position: relative;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  font-size: 2.5em;
  transition: background 0.3s, transform 0.3s;
}

.buttons > div:hover {
  background: #007bff;
  transform: scale(1.1);
}

.indicator {
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.indicator .dot {
  width: 12px;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transition: background-color 0.3s;
}

.indicator .dot.active {
  background-color: #007bff;
}
.el-avatar {
  object-fit: contain; /* 修改为 contain 以确保整个图片显示 */
}

.header-actions{
  display: flex;
  margin-right: 1vw;
}

.logout-button{
  margin-left: 1vw;
  width: 5vw;
}

</style>

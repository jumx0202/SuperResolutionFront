<template>
  <div class="container">
    <!-- Header Section -->
    <header class="header">
      <div class="user-info">
        <div class="avatar-wrapper">
          <img src="/src/assets/back2.png" alt="User Avatar" class="avatar" />
        </div>
        <div class="user-details">
          <span class="username">你的名字</span>
        </div>
      </div>
      <div class="history" @click="goToHistory">历史记录</div>
    </header>

    <!-- Slider Section -->
    <div class="slider" ref="slider">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="slides"
          :style="{ backgroundImage: `url(${image})`, opacity: currentSlide === index ? 1 : 0 }"
      ></div>
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
export default {
  data() {
    return {
      images: [
        '/src/assets/back1.png',
        '/src/assets/back2.png',
      ],
      currentSlide: 0,
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
    },
    // 跳转到历史记录页面
    goToHistory() {
      this.$router.push('/history');
    },
    // 跳到特定图片
    goToSlide(index) {
      this.currentSlide = index;
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
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  width: 60px;
  height: 60px;
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

.role {
  font-size: 1em;
  font-weight: 400;
  color: #666;
  margin-top: 5px;
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
  background-size: cover;
  background-position: center;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.7s ease-in-out;
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

.buttons > div:active {
  background: #484848;
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

.indicator .dot:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.indicator .dot.active {
  background-color: #007bff;
}
</style>

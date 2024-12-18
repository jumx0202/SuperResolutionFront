<template>
  <div class="container">
    <!-- Header Section -->
    <header class="header">
      <div class="user-info">
        <img src="/src/assets/back1.png" alt="User Avatar" class="avatar" />
        <span class="username">你的名字</span>
      </div>
      <div class="home-button" @click="goHome">
        <span class="home-icon">🏠</span> 主页面
      </div>
    </header>

    <!-- History Records Section -->
    <div class="history-list">
      <div class="history-item" v-for="(record, index) in historyRecords" :key="index">
        <div class="left">
          <img :src="record.image" alt="Uploaded Image" class="history-image" />
        </div>
        <div class="right">
          <span class="time">{{ record.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyRecords: [
        { image: '/src/assets/back1.png', time: '2024-12-10 12:00' },
        { image: '/src/assets/back2.png', time: '2024-12-09 14:30' },
        { image: '/src/assets/back3.png', time: '2024-12-08 16:45' },
      ],
    };
  },
  methods: {
    goHome() {
      // 跳转到主页面
      this.$router.push('/home');
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

.home-button {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s, transform 0.3s;
}

.home-button .home-icon {
  margin-right: 10px;
}

.home-button:hover {
  color: #007bff;
  transform: scale(1.1);
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
  width: 40%;
}

.history-item .right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.history-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.time {
  font-size: 1.1em;
  color: #555;
  font-weight: 500;
}
</style>

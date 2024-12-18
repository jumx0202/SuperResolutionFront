<--第一个按钮"选择图片",图片会被临时保存,再按"开始超分辨率处理"后,才会传给后端处理-->
<template>
  <div class="main-container">
    <div class="text-section">
      <h1 class="title">图像超分辨率</h1>
      <p class="description">
        图像超分辨率（Image Super-Resolution）是指通过算法将低分辨率图像恢复为高分辨率图像，提升图像的清晰度和细节，广泛应用于图像处理、医疗影像、视频监控等领域。
        <br />
        具有高效、快速和精确的特点。
      </p>
    </div>
    <div class="image-container">
      <label for="file-upload" :class="{'upload-btn': true, 'disabled': !buttonStatus}">{{buttonText}}</label>
      <input type="file" id="file-upload" @change="handleFileChange" accept="image/*" />
    </div>
    <div class="function-area">
      <div class="buttons-container">
        <button @click="handleProcessImage" :disabled="!selectedImage">开始超分辨率处理</button>
        <button @click="resetImage" :disabled="!selectedImage">重置图片</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {ElMessage} from "element-plus";
import {uploadImage} from '@/api/imageAPI.js'

export default {
  name: 'MainPage',
  setup() {
    const selectedImage = ref(null); // 用于存储用户选择的文件
    const router = useRouter(); // 用于页面跳转
    //“选择图片”按钮文字
    const buttonText = ref("选择图片");
    //“选择图片”按钮状态
    const buttonStatus = ref(true);
    // 文件选择后处理函数
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedImage.value = file;
        console.log(selectedImage.value);
        buttonStatus.value = false;
        buttonText.value = "已选择图片";
      }
    };

    // 处理图像上传
    const handleProcessImage = async () => {
      if (!selectedImage.value) {
        ElMessage.error("您还没有选择图片");
        return;
      }
      console.log("开始上传图片到后端")
      try {
        // 调用上传图片 API
        const urlData = await uploadImage(selectedImage.value);
        const processedImageUrl = urlData.processedImageUrl;
        const originalImageUrl = urlData.originalImageUrl;
        ElMessage.success("处理完成")
        // 跳转到 Ability 页面并传递处理后的图片链接
        router.push({ name: 'ability2', query: { originalImageUrl: originalImageUrl, processedImageUrl: processedImageUrl } });
      } catch (error) {
        console.error('上传图片失败', error);
        ElMessage.error('上传图片失败，请稍后再试');
      }
    };
    // 重置图片
    const resetImage = () => {
      selectedImage.value = null;
      buttonText.value = "选择图片";
      buttonStatus.value = true;
    };

    return {
      selectedImage,
      handleFileChange,
      handleProcessImage,
      resetImage,
      buttonText,
      buttonStatus,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'); /* 引入艺术字字体 */

.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/back4.png"); /* 背景图片 */
  background-size: cover;
  background-position: center;
  padding: 20px;
  animation: revealBackground 10s ease-in-out infinite; /* 每 5 秒重复一次 */
  color: white;
}

@keyframes revealBackground {
  0% {
    background-size: 60%;
    background-position: top left;
  }
  50% {
    background-size: 100%;
    background-position: center;
  }
  100% {
    background-size: 120%;
    background-position: bottom right;
  }
}

.text-section {
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  font-size: 60px;
  font-family: 'Great Vibes', cursive;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.7);
}

.description {
  font-size: 18px;
  line-height: 1.8;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  font-family: Arial, sans-serif;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.image-container {
  position: relative;
  margin-bottom: 40px;
}

.upload-btn {
  display: inline-block;
  background-color: #45a049;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.upload-btn:hover {
  background-color: #3a8b3d;
  transform: scale(1.05);
}

#file-upload {
  display: none;
}

.function-area {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 控制按钮之间的间距 */
  justify-content: center;
  align-items: center;
}

.function-area button {
  padding: 12px 30px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  background-color: white;
  color: black;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  width: 250px;
}

.function-area button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.function-area button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-btn.disabled {
  background-color: #9e9e9e; /* 灰色背景 */
  color: #bdbdbd; /* 灰色文字 */
  cursor: not-allowed; /* 禁用光标 */
  box-shadow: none; /* 去除阴影 */
  transform: none; /* 禁用时不允许动画效果 */
}
</style>

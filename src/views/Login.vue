<template>
  <div class="login-container">
    <div class="slider">
      <!-- 登录表单 -->
      <div :class="active === 1 ? 'form' : 'form hidden'">
        <div class="title">欢迎 <b>回来</b></div>
        <div class="subtitle">登录你的账户</div>
        <div class="inputf">
          <input type="text" v-model="LoginParam.username" placeholder="用户名" />
          <span class="label">用户名</span>
        </div>
        <div class="inputf">
          <input type="password" v-model="LoginParam.password" placeholder="密码" />
          <span class="label">密码</span>
        </div>
        <button @click="handleLogin">登录</button>
      </div>

      <!-- 注册表单 -->
      <div :class="active === 2 ? 'form' : 'form hidden'">
        <div class="title">开始</div>
        <div class="subtitle">创建你的账户</div>
        <div class="inputf">
          <input type="text" v-model="RegisterParam.username" placeholder="用户名" />
          <span class="label">用户名</span>
        </div>
        <div class="inputf">
          <input type="password" v-model="RegisterParam.password" placeholder="密码" />
          <span class="label">密码</span>
        </div>
        <div class="inputf">
          <input type="email" v-model="RegisterParam.email" placeholder="邮箱" />
          <span class="label">邮箱</span>
        </div>
        <div class="inputf verification-container">
          <input type="text" v-model="RegisterParam.verificationCode" placeholder="验证码" />
          <el-button
              class="verify-btn"
              type="primary"
              :disabled="isCountingDown"
              @click="getVerificationCode">
            {{ isCountingDown ? countdown + '秒后重试' : '获取验证码' }}
          </el-button>
        </div>
        <button @click="handleRegister">注册</button>
      </div>

      <!-- 页面描述卡片 -->
      <div :class="active === 1 ? 'card' : 'card active'">
        <div class="head">
          <div class="name">图像  <span>超分辨</span></div>
        </div>
        <div class="desc">该项目致力于图片超分辨率技术，通过先进的算法将低分辨率或模糊的图片处理为高清晰度图像，提高图像细节与质量。</div>
        <div class="btn">
          {{ active === 1 ? '新用户 ?' : '已有账号' }}
          <button @click="active = (active === 1) ? 2 : 1">
            {{ active === 1 ? '去注册 ?' : '去登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import {userLogin, register, sendSMS} from "@/api/userAPI.js";
import {ElMessage} from "element-plus";
import axios from "axios";
const router = useRouter();
const active = ref(1);
const store = useStore();

const LoginParam = ref({
  username: "",
  password: "",
})
const RegisterParam = ref({
  username: "",
  password: "",
  email: "",
  verificationCode: "",
})


// 登录处理函数

const handleLogin = async () => {
  try {
    const response = await userLogin(LoginParam.value);
    if (response.status === 'success') {
      // 登录成功，存储用户名和令牌到 Vuex
      store.dispatch('setUsername', LoginParam.value.username);
      store.dispatch('setToken', response.access_token);

      ElMessage.success(response.message);
      await router.push('/home');
    } else if (response.status === 'error') {
      ElMessage.error(response.message);
    } else {
      ElMessage.warning(response.message);
    }
  } catch (error) {
    console.error('登录失败', error);
    ElMessage.error('未知错误，请稍后再试');
  }
};

// 注册处理函数
const handleRegister = async () => {
  try {
    const response = await register(RegisterParam.value);
    if (response.status === 'success') {
      // 注册成功，跳转到登录界面
      ElMessage.success(response.message)
      alert(response.message);
      active.value = 1;
      //传递用户名
      LoginParam.value.username = RegisterParam.value.username;
      //清除注册界面信息
      RegisterParam.value.username = "";
      RegisterParam.value.password = "";
      RegisterParam.value.verificationCode = "";
      RegisterParam.value.email = "";
    } else if (response.status === 'error'){
      ElMessage.error(response.message)
    }else {
      ElMessage.warning(response.message)
    }
  } catch (error) {
    console.error("注册失败", error);
    ElMessage.error("未知错误，请稍后再试")
  }
};

//获取验证码函数
const getVerificationCode = async () => {
  try{
    const response = await sendSMS(RegisterParam.value.email);
    if (response.status === 200) {
      startCountdown();
      ElMessage.success("发送验证码成功，请注意查收")
    }else{
      ElMessage.error("未知错误，请稍后再试")
    }
  }catch (error) {
    console.error("注册失败", error);
    ElMessage.error("未知错误，请稍后再试")
  }
}

const countdown = ref(60);
const isCountingDown = ref(false);
const timer = ref(null);
//倒计时函数
const startCountdown=()=> {

  // 重置倒计时
  countdown.value = 60;
  isCountingDown.value = true;

  // 开始计时器
  timer.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer.value);
      isCountingDown.value = false;
      countdown.value = 60;
    }
  }, 1000);
}
</script>

<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/back1.png") no-repeat center center;
  background-size: cover;

  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
      width: 400px;
      height: 500px;
      background: rgba(17, 25, 40, 0.75);
      backdrop-filter: blur(16px) saturate(0);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 40px 60px;
      box-shadow: rgba(50, 50, 93, 0.25) 50px 50px 100px -20px,
      rgba(0, 0, 0, 0.5) 30px 30px 60px -30px,
      rgba(212, 217, 222, 0.35) 2px -2px 6px 0px inset;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 10px;
      z-index: 3;
      transition: 0.25s ease-in-out;

      &.hidden {
        height: 395px;
        box-shadow: none;
        z-index: 1;
      }

      .title {
        font-size: 18px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        font-weight: 300;
      }

      .subtitle {
        font-size: 11px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        margin-bottom: 35px;
      }

      .inputf {
        width: 100%;
        position: relative;
        margin-bottom: 35px;
        input {
          width: 100%;
          height: 35px;
          border: none;
          outline: 1.5px solid rgb(200, 200, 220);
          background: transparent;
          border-radius: 8px;
          font-size: 12px;
          padding: 0 15px;
          color: rgb(246, 249, 255);
          &::placeholder {
            color: rgb(175, 180, 190);
          }
          &:focus {
            outline: 1.5px solid rgb(224, 229, 240);
            &::placeholder {
              opacity: 0;
            }
            & + .label {
              opacity: 1;
              top: -20px;
            }
          }
          &:not(:placeholder-shown) + .label {
            opacity: 1;
            top: -20px;
          }
        }

        .label {
          position: absolute;
          top: 0;
          left: 0;
          color: rgb(246, 249, 255);
          font-size: 11px;
          font-weight: bold;
          transition: 0.25s ease-out;
          opacity: 0;
        }
      }

      button {
        width: 100%;
        height: 35px;
        background: white;
        color: black;
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .card {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 430px;
      height: 400px;
      background: cornflowerblue;
      background-size: contain;
      padding: 40px;
      border-radius: 0 10px 10px 0;
      transition: 0.5s ease-in-out;
      z-index: 2;

      &.active {
        right: calc(100% - 440px);
        border-radius: 10px 0 0 10px;
      }

      .head {
        font-size: 40px;
        margin-bottom: 35px;
        .name {
          font-weight: 300;
          span {
            color: white;
            font-weight: bold;
          }
        }
      }

      .desc {
        font-size: 16px;
        color: white;
        text-align: justify;
        margin-bottom: 35px;
      }

      .btn {
        font-size: 14px;
        button {
          background: white;
          color: black;
          font-size: 14px;
          padding: 5px 15px;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
}
/* 添加样式 */
.verification-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 控制输入框和按钮之间的间距 */
}

.verification-input {
  flex: 1;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.verification-btn {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.el-message {
  z-index: 9999 !important;
}

</style>

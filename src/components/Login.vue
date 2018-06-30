<template>
  <div class="login-component">
    <swiper class="login-component__swiper" :options="swiperOption">
      <swiper-slide
        class="swiper-no-swiping"
        :key="index"
        v-for="(image, index) in images">
        <img
        class="login-component__image"
        :src="image"
        draggable="false"
        alt="'background' + index">
      </swiper-slide>
    </swiper>
    <div class="login-component__title">
      <img class="login-component__logo" src="@/assets/images/loginlogo.png" alt="">
      <p>AI云平台</p>
    </div>
    <div class="login-component__login">
      <el-card class="box-card login-component__login-card" shadow="never">
        <div class="login-component__login-title">AI云管理平台</div>
        <div class="login-card-user">用户名登录</div>
      </el-card>
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
        class="login-component_login-form">
        <el-form-item prop="userName">
          <el-input
            clearable
            type="text"
            auto-complete="off"
            class="login-component_login-input"
            v-model="loginForm.userName"
            placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            type="password"
            auto-complete="off"
            class="login-component_login-input"
            v-model="loginForm.password"
            @keyup.enter.native="onSubmit"
            placeholder="密码">
          </el-input>
        </el-form-item>
        <el-button :disabled="buttonDisabled" @click="onSubmit" class="login-component_login-button">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { mapMutations } from 'vuex';
import { showMessage } from '@/utils';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import CryptoJS from 'crypto-js';
import config from '@/config';
import api from '@/api';
import store from '@/store';

export default {
  name: 'Login',
  store,
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiper: null,
      images: [
        require('@/assets/images/background01.jpg'),
        require('@/assets/images/background02.jpg'),
        require('@/assets/images/background03.jpg')
      ],
      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 400
      },
      loginForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      buttonDisabled: false
    };
  },
  methods: {
    ...mapMutations([
      'LOGIN'
    ]),
    login(data) {
      return api.post(config.loginAPI, data);
    },
    async onSubmit () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          try {
            this.buttonDisabled = true;
            const data = {
              userName: this.loginForm.userName,
              password: this.loginForm.password
              // password: encrypt(this.loginForm.password)
            };
            const response = await this.login(data);
            this.buttonDisabled = false;
            if (response.data.resCode === '200') {
              this.LOGIN(response.data.data);
              this.$router.push('/product');
            } else {
              showMessage.call(this, 'error', response.data.resMsg);
              return;
            }
          } catch (error) {
            this.buttonDisabled = false;
          }
        } else {
          this.buttonDisabled = false;
          return false;
        }
      });
    },
    encrypt (string) {
      return CryptoJS.MD5(string).toString();
    }
  }
};
</script>

<style>
.login-component {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  border: none;
}
.login-component__swiper {
  height: 100%;
}
.login-component__image {
  width: 100%;
  height: 100%;
}
.login-component__title {
  position: absolute;
  top: 93px;
  left: 65px;
  width: 400px;
  color: white;
  font-size: 20px;
  z-index: 1;
}
.login-component__logo {
  width: 248px;
  height: 65px;
}
.login-component__title p {
  display: inline-block;
  margin-left: 16px;
  font-weight: bold;
  z-index: 1;
}
.login-component__login {
  position: absolute;
  top: 85px;
  right: 78px;
  width: 432px;
  height: 706px;
  z-index: 1;
  background-color: #fff;
  border-radius: 20px;
}
.login-component__login-title {
  margin-top: 30px;
  font-size: 32px;
  font-weight: bold;
}
.login-card-user {
  margin: 0 auto;
  margin-top: 98px;
  width: 140px;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 5px solid black;
}
.login-component .login-component__login-card {
  margin-top: 20px;
  border: none;
}
.login-component_login-form {
  margin: 20px 30px 20px 30px;
}
.login-component_login-button {
  margin-top: 135px;
  width: 329px;
  height: 49px;
  color: white;
  font-size: 20px;
  background-color: black;
  border: 1px solid white;
  border-radius: 15px;
}
.login-component_login-input input {
  color: black;
  font-size: 18px;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid lightgray;
}
.login-component_login-input input:focus {
  border-bottom: 1px solid black;
}
.login-component_login-button:hover {
  border: 1px solid black;
  background-color: white;
  color: black;
}
.login-component_login-button:focus {
  border: 1px solid black;
  background-color: white;
  color: black;
}
.login-component_login-button:active {
  border: 1px solid black;
  background-color: white;
  color: black;
}
.login-component_login-button:disabled {
  border: 1px solid lightgray;
  color: black;
}
</style>

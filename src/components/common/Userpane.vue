<template>
  <div class="nav-userpane">
    <div class="userinfo" @mouseover="toggleShow()" @mouseout="toggleShow()">
      <img class="avatar" :src="userInfo.avatar ? userInfo.avatar : avatar" alt="">
      <p class="username-title">{{ userInfo.userName }}</p>
    </div>
    <i :class="['nav-userpane_icon', 'iconfont', userInfo.authStatus === '1' ? 'icon-yes' : 'icon-x']"></i>
    <p class="user-identify">{{ userInfo.authStatus === '1' ? '用户已认证' : '用户未认证' }}</p>
    <div @mouseover="toggleShow()" @mouseout="toggleShow()" v-show="isShow" class="dropdown-menu">
      <div class="dropdown-setting" @click="toAccountSetting">
        账号设置
      </div>
      <div class="dropdown-logout" @click="logout">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config';
import api from '@/api';
import store from '@/store';
import { mapMutations } from 'vuex';
export default {
  name: 'NavUserPane',
  store,
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          avatar: require('@/assets/images/avatar.png'),
          userName: 'admin',
          authStatus: true
        };
      }
    }
  },
  data () {
    return {
      isShow: false,
      avatar: require('@/assets/images/avatar.png')
    };
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    toggleShow () {
      this.isShow = !this.isShow;
    },
    async logout () {
      const response = await api.post(config.logout);
      if (response.data.resCode === '200') {
        this.LOGOUT();
        this.$router.push('/login');
      }
    },
    toAccountSetting () {
      this.$router.push('/account');
    }
  }
};
</script>

<style>
.nav-userpane {
  position: absolute;
  top: 0;
  right: 20px;
  height: 62px;
}
.userinfo {
  display: inline-block;
  padding: 9px;
  width: 139px;
}
.userinfo:hover {
  cursor: pointer;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.username-title {
  position: relative;
  margin-left: 5px;
  display: inline;
  bottom: 10px;
  color: white;
  font-size: 16px;
}
.dropdown-menu {
  background-color: #4f4f4f;
  width: 158px;
  height: 104px;
  z-index: 999;
}
.dropdown-menu div {
  text-align: center;
  line-height: 52px;
  height: 52px;
  font-size: 14px;
  cursor: pointer;
  color: white;
}
.dropdown-menu div:hover {
  background-color: #3b3b3b;
}
.user-identify {
  position: relative;
  display: inline;
  color: white;
  bottom: 10px;
  font-size: 12px;
}
.nav-userpane_icon {
  position: relative;
  color: white;
  bottom: 8px;
}
</style>

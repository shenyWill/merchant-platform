<template>
  <el-card class="account__user-card">
    <div slot="header">
      <span>用户信息：</span>
      <i class="iconfont account__card-icon icon-user"></i>
    </div>
    <div class="account__avatar">
      <img :src="data.avatar ? data.avatar : avatar" alt="avatar">
    </div>
    <div class="account__username">
      {{ data.userName }}
    </div>
    <div class="account__info">
      <div class="account__info-label">
        用户名：
      </div>
      <div class="account__info-value">
        {{ data.userName }}
      </div>
    </div>
    <div class="account__info">
      <div class="account__info-label">
        用户昵称：
      </div>
      <div class="account__info-value">
        {{ data.userName }}
      </div>
    </div>
    <div class="account__info">
      <div class="account__info-label">
        邮箱：
      </div>
      <div class="account__info-value">
        {{ data.email }}
      </div>
    </div>
    <div class="account__info">
      <div class="account__info-label">
        手机：
      </div>
      <div class="account__info-value">
        {{ data.userPhone }}
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AccountUserCard',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
        };
      }
    }
  },
  data () {
    return {
      avatar: require('@/assets/images/logo.png')
    };
  }
};
</script>

<style>
.account__user-card {
  position: relative;
  min-height: 540px;
  border-radius: 10px;
  margin-right: 10px;
}
.account__avatar {
  text-align: center;
}
.account__avatar img {
  width: 155px;
  height: 155px;
  border-radius: 78px;
}
.account__username {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
.account__user-card .account__card-icon {
  font-size: 23px;
}
</style>

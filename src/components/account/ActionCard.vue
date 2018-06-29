<template>
  <el-card class="account__action-card">
    <el-button @click="logout" type="danger">退出登录</el-button>
  </el-card>
</template>

<script>
import api from '@/api';
import store from '@/store';
import config from '@/config';
import { mapMutations } from 'vuex';

export default {
  name: 'AccountActionCard',
  store,
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    async logout () {
      const response = await api.post(config.logout);
      if (response.data.resCode === '200') {
        this.LOGOUT();
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style>
.account__action-card {
  position: relative;
  margin: 20px 10px 0 0;
  height: 160px;
  bottom: 10px;
  border-radius: 10px;
  text-align: center;
}
.account__action-card button {
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
  background-color: #d73e3e;
  color: white;
}
</style>

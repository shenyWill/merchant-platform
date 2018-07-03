<template>
  <div class="account">
    <el-card class="account__card">
      <div slot="header">
        基本信息
      </div>
      <div class="account__card-body">
        <UserPane :data="account"/>
        <ContactsPane :data="account"/>
        <CompanyPane :data="account"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserPane from './UserPane';
import CompanyPane from './CompanyPane';
import ContactsPane from './ContactsPane';

import store from '@/store';
import api from '@/api';
import config from '@/config';
import { mapMutations } from 'vuex';

export default {
  name: 'Account',
  store,
  components: {
    UserPane,
    CompanyPane,
    ContactsPane
  },
  data () {
    return {
      user: {},
      account: {}
    };
  },
  methods: {
    ...mapMutations([
      'LOGIN'
    ]),
    request (url, data = {}) {
      return api.post(url, data);
    },
    async getUserInfo () {
      let user = {};
      const response = await this.request(config.account.user);
      if (response.data.resCode === '200') {
        user = response.data.data;
        this.LOGIN(user);
      } else {
        user = {};
      }
      return user;
    },
    async reload () {
      const response = await this.request(config.account.user);
      if (response.data.resCode === '200') {
        this.user = response.data.data;
        this.LOGIN(this.user);
      } else {
        this.user = store.state.user;
      }
      this.account = await this.getMerchantInfo();
    },
    async getMerchantInfo () {
      const response = await this.request(config.account.merchant);
      if (response.data.resCode === '200') {
        const data = {
          ...this.user,
          ...response.data.data
        };
        return data;
      } else {
        return {...this.user};
      }
    },
    async initialize() {
      this.user = await this.getUserInfo();
      this.account = await this.getMerchantInfo();
    }
  },
  mounted () {
    this.initialize();
  }
};
</script>

<style>
.account {
  margin: 10px;
  padding: 10px;
  text-align: left;
}
.account .el-card__header {
  color: white;
  background-color: #4f4f4f;
}
.account__pane {
  margin-bottom: 5px;
}
.account__pane-title {
  padding: 8px;
  margin-left: 30px;
  font-size: 16px;
  font-weight: bold;
  background-color: #d5d5d5;
  color: white;
}
.account__info {
  position: relative;
  padding: 25px;
}
.account__info div {
  display: inline-block;
}
.account__info-label {
  left: 0;
  font-size: 16px;
  font-weight: bold;
  min-width: 80px;
}
.account__info-value {
  min-width: 300px;
  height: 38px;
  line-height: 38px;
  padding-left: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
</style>

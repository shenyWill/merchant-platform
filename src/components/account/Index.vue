<template>
  <div class="account">
    <el-row>
      <el-col :span="8">
        <UserCard :data="user" @reload="initialize"/>
        <AccountActionCard/>
      </el-col>

      <el-col :span="16">
        <CompanyCard :data="{}"/>
        <ContactsCard :data="account"/>
        <AccountCard :data='account' @reload="initialize"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserCard from './UserCard';
import AccountActionCard from './ActionCard';
import AccountCard from './AccountCard';
import CompanyCard from './CompanyCard';
import ContactsCard from './ContactsCard';

import store from '@/store';
import api from '@/api';
import config from '@/config';

export default {
  name: 'Account',
  store,
  components: {
    UserCard,
    AccountActionCard,
    AccountCard,
    CompanyCard,
    ContactsCard
  },
  data () {
    return {
      user: {
      },
      account: {
      }
    };
  },
  methods: {
    request (url, data = {}) {
      return api.post(url, data);
    },
    async getUserInfo () {
      let user = store.state.user;
      if (!user) {
        const response = await this.request(config.account.user);
        user = response.data.data;
      }
      return user;
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
  position: relative;
  margin: 10px 10px;
  text-align: left;
}
.account .el-card__header {
  background-color: #4f4f4f;
  font-size: 15px;
  color: white;
  font-weight: bold;
}
.account__collapse-card {
  position: relative;
  border-radius: 10px;
  margin-right: 10px;
  border-bottom: none;
}
.account__collapse-card .el-card__header {
  padding: 0;
  cursor: pointer;
  height: 57px;
}
.account__collapse-card .el-card__header div {
  padding: 20px;
}
.account__collapse-card .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
}
.account__card-icon {
  float: right;
  font-size: 25px;
}
.account__info {
  position: relative;
  padding: 25px;
}
.account__info div {
  display: inline-block;
}
.account__info-label {
  position: absolute;
  left: 0;
  font-size: 14px;
  font-weight: bold;
  min-width: 80px;
}
.account__info-value {
  position: absolute;
  right: 10px;
  left: 50px;
  text-align: center;
  border-bottom: 1px solid black;
}
.account__info-user-value {
  margin-left: 120px;
}
.account__company .el-form-item__label {
  font-weight: bold;
  font-size: 16px;
}
.height-zero {
  transition: all .5s;
  height: 0;
}
</style>

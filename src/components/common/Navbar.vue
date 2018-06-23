<template>
  <div class="nav">
    <NavLogo/>
    <Userpane :userInfo="userInfo"/>
  </div>
</template>

<script>
import Userpane from './Userpane';
import NavLogo from './NavLogo';
import store from '@/store';
import api from '@/api';
import config from '@/config';
import { mapMutations } from 'vuex';

export default {
  name: 'Navbar',
  store,
  components: {
    Userpane,
    NavLogo
  },
  data () {
    return {
      userInfo: {}
    };
  },
  methods: {
    ...mapMutations([
      'SET_USER'
    ]),
    async request () {
      return api.post(config.account.user);
    },
    async getUserInfo () {
      let userInfo = store.state.user;
      if (!userInfo) {
        const response = await this.request();
        if (response.data.resCode === '200') {
          userInfo = response.data.data;
          this.SET_USER(userInfo);
        } else {
          userInfo = {};
        }
      }
      return userInfo;
    }
  },
  async mounted () {
    this.userInfo = await this.getUserInfo();
  }
};
</script>

<style>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 62px;

  background-color: #3b3b3b;
  z-index: 999;
}
</style>

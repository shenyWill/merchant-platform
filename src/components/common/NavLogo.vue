<template>
  <div class="nav-logo">
    <img @click="toIndexPage" class="nav-logo__image" src="@/assets/images/loginlogo.png" alt="">
    <p class="nav-logo__title">AI云平台</p>
  </div>
</template>

<script>
export default {
  name: 'NavLogo',
  data () {
    return {
    };
  },
  methods: {
    toIndexPage () {
      this.$router.push('/product');
    }
  }
};
</script>

<style>
.nav-logo {
  position: absolute;
  left: 0;
  height: 52px;
  padding-top: 10px;
  padding-left: 10px;
}
.nav-logo__image {
  height: auto;
  width: 150px;
  cursor: pointer;
}
.nav-logo__title {
  position: relative;
  display: inline;
  font-size: 14px;
  color: white;
  margin-left: 10px;
  bottom: 4px;
}
</style>

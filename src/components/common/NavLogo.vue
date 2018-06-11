<template>
  <div class="nav-logo">
    <img class="image-logo" src="@/assets/images/navlogo.png" alt="">
    <p class="logo-title">AI云平台</p>
  </div>
</template>

<script>
export default {
  name: 'NavLogo',
  data () {
    return {
    };
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
.image-logo {
  height: auto;
  width: 150px;
}
.logo-title {
  position: relative;
  display: inline;
  font-size: 14px;
  color: white;
  margin-left: 10px;
  bottom: 4px;
}
</style>

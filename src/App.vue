<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* @import './assets/css/common.scss'; */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin-top: 62px;
  padding: 0;
  margin: 0;
  height: 100%;
  background: no-repeat;
  background-size: 100% 100%;
}
html, body {
  bottom: 0;
  margin: 0;
  padding: 0;
}
</style>

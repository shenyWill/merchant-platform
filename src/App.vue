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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin-top: 60px;
  padding: 0;
  margin: 0;
  height: 100%;
  background: no-repeat;
  background-size: 100% 100%;
}
html, body {
  padding: 0;
  margin: 0;
  background-color: #eceeee;
}
</style>

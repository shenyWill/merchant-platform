<template>
  <div class="menu-item">
    <div class="menu-item-container">
      <img class="menu-item-image" :src="icon" alt="item">
      <p class="menu-item-name">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    route: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style>
.menu-item {
  height: 87px;
  width: 100%;
  cursor: pointer;
}
.menu-item-container {
  padding-top: 20px;
  height: 100%;
}
.menu-item :hover {
  background-color: #1a2f3a;
}
.menu-item-name {
  margin: 0;
  color: #18688c;
}
</style>

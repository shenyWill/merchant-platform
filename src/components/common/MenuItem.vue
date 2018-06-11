<template>
  <div class="menu-item">
    <div class="menu-item-container">
      <i :class="['iconfont', 'menu-item_icon', icon]"></i>
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
.menu-item_icon {
  font-size: 37px;
  color: #18688c;
}
.menu-item-name {
  margin: 0;
  color: #18688c;
}
</style>

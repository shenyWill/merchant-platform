<template>
  <div class="menu-item">
    <router-link class="menu-item-container" :to="route">
      <i :class="['iconfont', 'menu-item_icon', icon]"></i>
      <p class="menu-item-name">{{ name }}</p>
    </router-link>
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
.menu-item__container {
  padding-top: 20px;
  height: 100%;
  text-decoration: none;
  display: block;
}
.menu-item :hover {
  background-color: #1a2f3a;
}
.menu-item__icon {
  font-size: 37px;
  color: #18688c;
}
.menu-item__name {
  margin: 0;
  color: #18688c;
}
</style>

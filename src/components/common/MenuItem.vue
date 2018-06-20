<template>
  <div class="menu-item">
    <router-link class="menu-item__container" :to="route">
      <i :class="['iconfont', 'menu-item__icon', icon]"></i>
      <p class="menu-item__name">{{ name }}</p>
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
    },
    children: {
      type: Array,
      default: () => {
        return [];
      }
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
  margin-top: 10px;
  padding-top: 10px;
  height: 100%;
  text-decoration: none;
  display: block;
}
.menu-item:hover {
  background-color: #3b3b3b;
}
.menu-item__icon {
  font-size: 37px;
  color: white;
}
.menu-item__name {
  margin: 0;
  color: white;
}
</style>

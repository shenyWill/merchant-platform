<template>
  <div class="menu-item">
    <router-link class="menu-item__container" :to="route" v-if="children && children.length === 0">
      <i :class="['iconfont', 'menu-item__icon', icon]"></i>
      <p class="menu-item__name">{{ name }}</p>
    </router-link>
    <div v-else class="menu-item__container menu-item__menu">
      <i :class="['iconfont', 'menu-item__icon', icon]"></i>
      <p class="menu-item__name">{{ name }}</p>
      <div class="menu-item__submenu">
        <router-link v-for="(item, index) in children" :key="index" class="menu-item__submenu-title" :to="item.route">
          {{ item.name }}
        </router-link>
      </div>
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
    },
    children: {
      type: Array,
      default: () => {
        return [];
      }
    }
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
  position: relative;
  margin-top: 10px;
  padding-top: 10px;
  height: 100%;
  text-decoration: none;
  display: block;
}
.menu-item:hover {
  border-left: 2px solid #409eff;
  background-color: #3b3b3b;
  transition: all 0.8s;
}
.menu-item:hover .menu-item__submenu {
  padding: 20px;
  height: auto;
  transition: all 0.8s;
  box-shadow: 2px 1px 5px #888;
}
.menu-item__container .menu-item__icon {
  font-size: 37px;
  color: white;
}
.menu-item__name {
  margin: 0;
  color: white;
}
.menu-item__submenu {
  position: absolute;
  top: 0;
  left: 97px;
  width: 160px;
  height: 0;
  overflow: hidden;
  background-color: #4f4f4f;
}
.menu-item__submenu-title {
  display: block;
  color: white;
  height: 35px;
  padding-top: 8px;
  border-radius: 15px;
  text-decoration: none;
}
.menu-item__submenu-title:hover {
  background-color: #3b3b3b;
  transition: all 0.5s;
  transform: scale(1.1);
}
</style>

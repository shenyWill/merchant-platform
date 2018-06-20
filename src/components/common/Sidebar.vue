<template>
  <div class="sidebar">
    <div class="menu-item-list">
      <MenuItem v-for="(item, index) in menu"
      :key="index"
      :icon="item.icon"
      :name="item.name"
      :children="item.children ? item.children : []"
      :route="item.route"/>
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem';
import menu from '@/config/menu';
export default {
  name: 'Sidebar',
  components: {
    MenuItem
  },
  data () {
    return {
      menu: menu
    };
  }
};
</script>

<style>
.sidebar {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 62px;
  width: 99px;

  background-color: #4f4f4f;
  z-index: 999;
}
.menu-item-list {
  margin-top: 30px;
}
</style>

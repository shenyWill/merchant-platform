<template>
  <div class="page">
    <Navbar />
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
export default {
  name: 'Index',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style>
.page {
  height: 100%;
  margin-top: 62px;
  margin-left: 98px;
  padding-top: 17px;
  padding-left: 15px;
}
</style>

<template>
  <div class="dashboard">
    <Navbar />
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'
export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.dashboard {
  height: 100%;
  margin-top: 62px;
  margin-left: 98px;
}
</style>

<template>
  <div class="login-component">
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    async handleLogin () {
      await login()
    }
  }
}
</script>

<style>
</style>

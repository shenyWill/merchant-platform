<template>
  <div class="nav">
    <NavLogo/>
    <Userpane/>
  </div>
</template>

<script>
import Userpane from './Userpane';
import NavLogo from './NavLogo';
export default {
  name: 'Navbar',
  components: {
    Userpane,
    NavLogo
  },
  data () {
    return {
    };
  }
};
</script>

<style>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 62px;
  background-color: #1a2f3a;
}
</style>

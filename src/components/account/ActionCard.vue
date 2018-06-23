<template>
  <el-card class="account__action-card">
    <el-button type="danger">退出登录</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'AccountActionCard',
  data () {
    return {
    };
  }
};
</script>

<style>
.account__action-card {
  margin: 20px 10px 0 0;
  height: 160px;
  bottom: 10px;
  border-radius: 10px;
  text-align: center;
}
.account__action-card button {
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
  background-color: #d73e3e;
  color: white;
}
</style>

<template>

  <div class="product">
    <div class="product-contain">
      <p class="welcome">
        <span class="hi">Hi</span>
        <span>欢迎登入</span>
      </p>
      <!-- 用量概览 -->
      <Consumption></Consumption>
      <!-- 签约产品 -->
      <Contract></Contract>
      <!-- 操作指引 -->
      <Operation></Operation>
    </div>

    
  </div>
</template>

<script>
import Consumption from '@/components/product/Consumption'
import Contract from '@/components/product/Contract'
import Operation from '@/components/product/Operation'
export default {
  components: {
    Consumption,
    Contract,
    Operation
  },
  mounted(){
    setTimeout(() => {
      $('.welcome').slideUp(2000)
    },2000)
  }
}
</script>


<style lang="scss" scoped>
.product {
  background: #eceeee;
  overflow: hidden;
  margin-right: 20px;
}
.product-contain {
  width: 100%;
  float: right;
  min-width: 1100px;
  

  // 欢迎样式
  .welcome {
    color: #30b2e7;
    font-size: 21px;
    text-align: center;
    width: 100%;
    height: 52px;
    line-height: 52px;
    background-color: #00140b;
    margin-bottom: 7px;
    margin-top: 0;
    &.hide {
      display: none;
    }
  }
  .hi {
    height: 26px;
    border: 2px solid #30b2e7;
    padding: 4px;
    font-size: 19px;
    border-radius: 4px;
  }
}
</style>



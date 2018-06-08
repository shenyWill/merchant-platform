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
    </div>

    
  </div>
</template>

<script>
import Consumption from '@/components/product/Consumption'
import Contract from '@/components/product/Contract'
export default {
  components: {
    Consumption,
    Contract
  },
  mounted(){
    $('.product').show();
  }
}
</script>


<style lang="scss" scoped>
.product {
  background: #eceeee;
  overflow: hidden;
  margin-right: 20px;
  // display: none;
}
.product-contain {
  width: 90%;
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



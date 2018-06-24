<template>
  <div class="product-test">
    <el-card v-loading="isLoading">
      <div slot="header">
        产品测试
      </div>
      <div class="product-test__control">
        <div class="product-test__label">
          产品名称
        </div>
        <el-select
          v-model="selectedProduct"
          placeholder="请选择产品">
          <el-option
            v-for="product in products"
            :label="product.apiName"
            :key="product.apiCode"
            :value="product.apiCode"
            >
          </el-option>
        </el-select>
      </div>

      <el-row>
        <FaceCompare
          @result="handleCompareResult"
          @loading="toggleLoading"
          v-if="selectedProduct === 'PRODUCT_FACE_COMPARE'"/>
        <FaceIdentification
          @result="handleIdentifyResult"
          v-if="selectedProduct === 'PRODUCT_FACE_IDENTIFY'"/>
      </el-row>
      <div class="product-test__result">
        <div class="product-test__label">查询结果</div>
        <div class="product-test__result-score">{{ score }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import FaceCompare from './FaceCompare';
import FaceIdentification from './FaceIdentification';

export default {
  name: 'ProductTest',
  components: {
    FaceCompare,
    FaceIdentification
  },
  data () {
    return {
      score: '',
      isLoading: false,
      selectedProduct: 'PRODUCT_FACE_COMPARE',
      products: [{
        apiName: '人脸比对',
        apiCode: 'PRODUCT_FACE_COMPARE'
      }, {
        apiName: '人证比对',
        apiCode: 'PRODUCT_FACE_IDENTIFY'
      }]
    };
  },
  methods: {
    handleCompareResult (data) {
      this.score = data;
    },
    handleIdentifyResult (data) {
      this.score = data;
    },
    toggleLoading (isLoading) {
      this.isLoading = isLoading;
    }
  }
};
</script>

<style>
.product-test {
  margin: 10px;
  padding: 10px;
  text-align: left;
}
.product-test .el-card__header {
  color: white;
  background-color: #4f4f4f;
}
.product-test__control {
  text-align: left;
  margin-bottom: 20px;
}
.product-test__result {
  margin-top: 20px;
  text-align: left;
}
.product-test__label {
  display: inline-block;
  font-size: 14px;
  width: 80px;
}
.product-test__result-score {
  margin-left: 80px;
  margin-top: -20px;
  border: 1px solid lightgray;
  height: 100px;
  max-width: 400px;
}
</style>

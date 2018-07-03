<template>
  <div class="account__pane">
    <div class="account__pane-title">
      认证信息：
    </div>

    <div class="account__info">
      <div class="account__info-label">
        企业名称：
      </div>
      <div v-if="data.companyName" class="account__info-value">
        {{ data.companyName }}
      </div>
      <div v-else>无</div>
    </div>
    <el-row>
      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">营业执照：</div>
          <img class="account__company-image" v-if="data.businessLicense" :src="'/aicloudmerchant' + data.businessLicense" alt="">
          <div v-else>无</div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">法人身份证正面：</div>
          <img class="account__company-image" v-if="data.idcardFront" :src="'/aicloudmerchant' + data.idcardFront" alt="">
          <div v-else>无</div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">法人身份证反面：</div>
          <img class="account__company-image" v-if="data.idcardBack" :src="'/aicloudmerchant' + data.idcardBack" alt="">
          <div v-else>无</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CompanyPane',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style>
.account__company-image {
  position: relative;
  margin-top: 30px;
  width: 334px;
  height: 186px;
  display: block;
  overflow: hidden;
}
.account__company-image :hover {
  border-color: #409EFF;
}
</style>

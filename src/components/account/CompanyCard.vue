<template>
  <div class="account__company-card">
    <el-card class="account__collapse-card">
      <div slot="header" @click="toggleCard">
        认证信息：
        <i class="iconfont account__card-icon icon-user"></i>
      </div>
      <div :class="['account__collapse-company', isToggle ? 'height-zero' : '']">
        <el-row>
          <el-col :span="12">
            <div class="account__info">
              <div class="account__info-label">
                企业名称：
              </div>
              <div class="account__info-user-value">
                {{ data.companyName }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="account__info">
              <div class="account__info-label">
                法人姓名：
              </div>
              <div class="account__info-user-value">
                {{ data.legalPersonName }}
              </div>
            </div>
          </el-col>
        </el-row>
        <div>
          <div class="account__info">
            <div class="account__info-label">营业执照：</div>
            <img class="account__company-image" :src="data.businessLicense" alt="">
          </div>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <div class="account__info">
                <div class="account__info-label">法人身份证正面：</div>
                <img class="account__company-image" :src="data.idcardFront" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="account__info">
                <div class="account__info-label">法人身份证反面：</div>
                <img class="account__company-image" :src="data.idcardBack" alt="">
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CompanyCard',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
        };
      }
    }
  },
  data () {
    return {
      isToggle: true
    };
  },
  methods: {
    toggleCard () {
      this.isToggle = !this.isToggle;
    }
  }
};
</script>

<style>
.account__collapse-company {
  height: 590px;
  transition: all .5s;
  overflow: hidden;
}
.account__company-image {
  position: relative;
  margin-top: 30px;
  width: 334px;
  height: 186px;
  display: inline-block;
  overflow: hidden;
}
.account__company-image :hover {
  border-color: #409EFF;
}
</style>

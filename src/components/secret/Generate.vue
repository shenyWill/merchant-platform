<template>
  <div class="secret-generate">
    <div class="secret-generate__title">
      <img draggable="false" :src="image" alt="title">
    </div>
    <div class="secret-generate__form">
      <el-form ref="form" :model="form">
        <el-form-item label="秘钥类型">
          <br />
          <el-select v-model="form.secretType" placeholder="请选择">
            <el-option
              v-for="item in secretOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="secret-generate__platform-public" label="平台签名公钥：">
          <el-input resize="none" type="textarea"></el-input>
        </el-form-item>

        <p class="text-warning">{{ text }}</p>
        <el-button class="secret-generate__button" @click="generateSecret" type="primary">在线生成</el-button>

        <el-form-item class="secret-generate__user-public" label="用户签名公钥：">
          <el-input type="textarea" resize="none"></el-input>
        </el-form-item>

        <el-form-item class="secret-generate__user-secret" label="用户签名私钥：">
          <el-input type="textarea" resize="none"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecretGenerate',
  data () {
    return {
      image: require('@/assets/images/navlogo.png'),
      text: '注：鉴权数据中心提供统一的RSA签名方式，即：用户可在平台在线生成或者自行生成密钥对，同时将签名公钥上传至平台，私钥留下自己注意保密，通过生成的签名密钥进行签名，产生签名值。通过平台签名公钥和平台返回签名值进行验签。',
      secretOptions: [
      ],
      form: {
        secretType: ''
      }
    };
  },
  methods: {
    generateSecret () {
    }
  }
};
</script>

<style>
.secret-generate {
  position: relative;
  margin: 10px 102px 10px 102px;
  text-align: left;
}
.secret-generate__form {
  margin-top: 30px;
}
.secret-generate .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
.secret-generate .el-select {
  height: 28px;
  width: 100%;
}
.secret-generate .text-warning {
  color: red;
}
.secret-generate__button {
  position: absolute;
  right: 0;
}
.secret-generate__user-public {
  margin-top: 55px;
}
.secret-generate__platform-public .el-textarea__inner {
  min-height: 92px!important;
}
.secret-generate__user-public .el-textarea__inner {
  min-height: 92px!important;
}
.secret-generate__user-secret .el-textarea__inner {
  min-height: 216px!important;
}
</style>

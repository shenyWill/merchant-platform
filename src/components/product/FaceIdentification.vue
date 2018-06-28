<template>
  <div class="product-face-identification">
    <slot name="product-face-identification__header">
    </slot>

    <slot name="product-face-identification__content">
      <el-row>
        <el-form
          ref="identify-form"
          :model="form"
          :rules="formRules"
          label-width="80px"
          label-position="left">
          <el-form-item label="应用列表">
            <el-select @clear="clearSelect" @change="onSelectApp" v-model="selectedApp" placeholder="请选择" clearable>
              <el-option
                v-for="(item, index) in appList"
                :value="index"
                :label="item.appName"
                :key="index"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="product-image-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageChange"
              >
              <img class="image-upload" :src="image" v-if="image">
              <i v-else slot="trigger" class="el-icon-plus product-face-compare__uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="身份证号" prop="userCode">
            <el-input v-model="form.userCode" placeholder="请输入身份证号"></el-input>
          </el-form-item>

          <div class="product-face-compare__footer">
            <p>{{ tips }}</p>
            <el-button @click="submit" type="primary">提交</el-button>
          </div>
        </el-form>
      </el-row>
    </slot>
  </div>
</template>

<script>
import { validateUploadImage, img2Base64, showMessage } from '@/utils';
import { imageUploadTips, imageSelectedAppTips } from '@/config/errorMsg';
import api from '@/api';
import config from '@/config';

export default {
  name: 'FaceIdentification',
  data () {
    return {
      apiCode: 'PRODUCT_HD_PHOTO_AUTH_API',
      image: '',
      form: {
        image: '',
        name: '',
        userCode: '',
        apiKey: '',
        apiSecret: ''
      },
      appList: [],
      selectedApp: '',
      formRules: {
        name: [
          { required: true, message: '请输入姓名', tirgger: 'blur' }
        ],
        userCode: [
          { required: true, message: '请输入身份证号', tirgger: 'blur' }
        ]
      },
      tips: '只能上传JPG、JPEG、PNG格式图片，单张图片转码后不能超过2MB'
    };
  },
  methods: {
    validateHasAuth (apps, cb) {
      if (!cb) {
        cb = () => {
          showMessage.call(this, 'error', '请先签约或绑定产品');
        };
      }
      if (apps && apps.length === 0) {
        cb();
        return false;
      }
      return true;
    },
    onSelectApp (index) {
      if (index === '') return;
      const app = this.appList[index];
      this.form.apiKey = app.apiKey;
      this.form.apiSecret = app.apiSecret;
    },
    clearSelect () {
      this.form.apiKey = '';
      this.form.apiSecret = '';
    },
    async fetchAppList () {
      const response = await api.post(config.product.appList, {apiCode: this.apiCode});
      if (response.data.resCode === '200') {
        return response.data.lists;
      } else {
        return [];
      }
    },
    handleImageChange (file) {
      if (!this.validateHasAuth(this.appList)) return;
      if (validateUploadImage(file)) {
        const url = URL.createObjectURL(file.raw);
        let image = new Image();
        image.src = url;
        image.onload = () => {
          const data = img2Base64(image);
          this.image = data;
          this.$emit('data', data);
        };
      }
    },
    submit () {
      if (!this.validateHasAuth(this.appList)) return;
      if (this.form.apiKey === '') {
        showMessage.call(this, 'error', imageSelectedAppTips);
        return;
      }
      if (this.image === '') {
        showMessage.call(this, 'error', imageUploadTips);
        return;
      }
      this.$refs['identify-form'].validate(async valid => {
        if (valid) {
          this.$emit('loading', true);
          const data = {
            image1: this.image,
            realName: this.form.name,
            idcard: this.form.userCode,
            apiKey: this.form.apiKey,
            apiSecret: this.form.apiSecret
          };
          const response = await api.post(config.product.faceAuth, data);
          this.$emit('result', JSON.parse(response.data.data.result));
          this.$emit('loading', false);
        } else {
          return false;
        }
      });
    }
  },
  async mounted () {
    this.appList = await this.fetchAppList();
  }
};
</script>

<style>
.product-face-identification {
  text-align: left;
}
.product-face-identification .el-input {
  max-width: 400px;
}
</style>

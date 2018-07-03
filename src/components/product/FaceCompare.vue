<template>
  <div class="product-face-compare">
    <slot name="product-face-compare__header">
    </slot>

    <slot name="product-face-compare__content">
      <el-row>
        <el-form
          ref="compare-form"
          :model="form"
          label-width="80px"
          label-position="left">
          <el-form-item label="应用列表">
            <el-select @change="onSelectApp" @clear="clearSelect" v-model="selectedApp" placeholder="请选择" clearable>
              <el-option
                v-for="(item, index) in appList"
                :value="index"
                :label="item.appName"
                :key="index"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传照片">
            <el-upload
              class="product-image-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleFirstImageChange"
              >
              <img class="image-upload" :src="firstImage" v-if="firstImage">
              <i v-else slot="trigger" class="el-icon-plus product-face-compare__uploader-icon"></i>
            </el-upload>

            <el-upload
              class="product-image-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleSecondImageChange"
              >
              <img class="image-upload" :src="secondImage" v-if="secondImage">
              <i v-else slot="trigger" class="el-icon-plus product-face-compare__uploader-icon"></i>
            </el-upload>
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
import { validateUploadImage, img2Base64, showMessage, base64Length } from '@/utils';
import { imageUploadTips, imageSelectedAppTips } from '@/config/errorMsg';
import api from '@/api';
import config from '@/config';

export default {
  name: 'FaceCompare',
  data () {
    return {
      apiCode: 'PRODUCT_FACE_COMPARE_API',
      firstImage: '',
      secondImage: '',
      appList: [],
      selectedApp: '',
      form: {
        firstImage: '',
        secondImage: '',
        apiKey: '',
        apiSecret: ''
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
    handleFirstImageChange (file) {
      if (!this.validateHasAuth(this.appList)) return;
      if (validateUploadImage(file)) {
        const url = URL.createObjectURL(file.raw);
        let image = new Image();
        image.src = url;
        image.onload = () => {
          const data = img2Base64(image);
          if (base64Length(data)) {
            this.firstImage = data;
            this.form.firstImage = data;
          }
        };
      }
    },
    handleSecondImageChange (file) {
      if (!this.validateHasAuth(this.appList)) return;
      if (validateUploadImage(file)) {
        const url = URL.createObjectURL(file.raw);
        let image = new Image();
        image.src = url;
        image.onload = () => {
          const data = img2Base64(image);
          if (base64Length(data)) {
            this.secondImage = data;
            this.form.secondImage = data;
          }
        };
      }
    },
    async submit () {
      if (!this.validateHasAuth(this.appList)) return;
      if (this.form.apiKey === '') {
        showMessage.call(this, 'error', imageSelectedAppTips);
        return;
      }
      if (this.firstImage === '' || this.secondImage === '') {
        showMessage.call(this, 'error', imageUploadTips);
        return;
      }
      try {
        this.$emit('loading', true);
        const data = {
          image1: this.form.firstImage,
          image2: this.form.secondImage,
          apiKey: this.form.apiKey,
          apiSecret: this.form.apiSecret
        };
        const response = await api.post(config.product.faceCompare, data);
        this.$emit('loading', false);
        this.$emit('result', JSON.parse(response.data.data.result));
      } catch (error) {
        this.$emit('loading', false);
      }
    }
  },
  async mounted () {
    this.appList = await this.fetchAppList();
  }
};
</script>

<style>
.product-face-compare {
  text-align: left;
}
.product-image-uploader {
  position: relative;
  margin: 20px;
  height: 178px;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.product-image-uploader .el-upload:hover {
  border-color: #409EFF;
}
.product-face-compare__uploader-icon {
  font-size: 28px;
  color: #Bc939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.product-face-compare__footer {
  margin-left: 80px;
}
.product-face-compare__footer p {
  font-size: 14px;
}
.image-upload {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

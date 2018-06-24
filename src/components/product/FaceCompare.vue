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
import { validateUploadImage, img2Base64, showMessage } from '@/utils';
import { imageUploadTips } from '@/config/errorMsg';
import api from '@/api';
import config from '@/config';

export default {
  name: 'FaceCompare',
  data () {
    return {
      firstImage: '',
      secondImage: '',
      form: {
        firstImage: '',
        secondImage: ''
      },
      tips: '只能上传JPG、JPEG、PNG格式图片，单张图片转码后不能超过2MB'
    };
  },
  methods: {
    handleFirstImageChange (file) {
      if (validateUploadImage(file)) {
        const url = URL.createObjectURL(file.raw);
        let image = new Image();
        image.src = url;
        image.onload = () => {
          const data = img2Base64(image);
          this.firstImage = data;
          this.form.firstImage = data;
        };
      }
    },
    handleSecondImageChange (file) {
      if (validateUploadImage(file)) {
        const url = URL.createObjectURL(file.raw);
        let image = new Image();
        image.src = url;
        image.onload = () => {
          const data = img2Base64(image);
          this.secondImage = data;
          this.form.secondImage = data;
        };
      }
    },
    async submit () {
      if (this.firstImage === '' || this.secondImage === '') {
        showMessage.call(this, 'error', imageUploadTips);
        return;
      }
      try {
        // TODO
        this.$emit('loading', true);
        const response = await api.post(config.product.test, this.form);
        this.$emit('result', response.data.data);
        this.$emit('loading', false);
      } catch (error) {
      }
    }
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

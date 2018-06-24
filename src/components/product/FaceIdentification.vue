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
            <el-input placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="身份证号" prop="userCode">
            <el-input placeholder="请输入身份证号"></el-input>
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

export default {
  name: 'FaceIdentification',
  data () {
    return {
      image: '',
      form: {
        image: '',
        name: '',
        userCode: ''
      },
      formRules: {
        // TODO
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
    handleImageChange (file) {
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
    async submit () {
      if (this.image === '') {
        showMessage.call(this, 'error', imageUploadTips);
        return;
      }
      this.$refs['identify-form'].validate(valid => {
        if (valid) {
          // TODO
          this.$emit('loading', true);
          this.$emit('loading', false);
        } else {
          return false;
        }
      });
    }
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

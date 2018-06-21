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
              :before-upload="beforeFirstImageUpload"
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
              :before-upload="beforeSecondImageUpload"
              >
              <img class="image-upload" :src="secondImage" v-if="secondImage">
              <i v-else slot="trigger" class="el-icon-plus product-face-compare__uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <div class="product-face-compare__footer">
            <p>只能上传JPG、JPEG、PNG格式文件，文件不能超过2MB</p>
            <el-button type="primary">提交</el-button>
          </div>
        </el-form>
      </el-row>
    </slot>

  </div>
</template>

<script>
import { fileType } from '@/utils';
export default {
  name: 'FaceCompare',
  props: [
    'form'
  ],
  data () {
    return {
      firstImage: '',
      firstImageData: '',
      secondImage: '',
      secondImageData: ''
    };
  },
  methods: {
    isImage (name) {
      const type = fileType(name);
      const lists = ['jpg', 'jpeg', 'png'];
      for (let i = 0; i < lists.length; i++) {
        if (type === lists[i]) return true;
      }
      return false;
    },
    beforeFirstImageUpload () {
    },
    handleFirstImageChange () {
    },
    beforeSecondImageUpload () {
    },
    handleSecondImageChange () {
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
</style>

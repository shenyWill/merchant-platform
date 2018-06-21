<template>
  <div class="product-face-identification">
    <slot name="product-face-identification__header">
    </slot>

    <slot name="product-face-identification__content">
      <el-row>
        <el-form
          ref="identify-form"
          :model="form"
          label-width="80px"
          label-position="left">
          <el-form-item label="上传图片">
            <el-upload
              class="product-image-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageChange"
              :before-upload="beforeImageUpload"
              >
              <img class="image-upload" :src="image" v-if="image">
              <i v-else slot="trigger" class="el-icon-plus product-face-compare__uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="身份证号">
            <el-input placeholder="请输入身份证号"></el-input>
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
export default {
  name: 'FaceIdentification',
  data () {
    return {
      image: '',
      form: {
      }
    };
  },
  methods: {
    handleImageChange () {
    },
    beforeImageUpload () {
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

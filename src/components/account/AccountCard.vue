<template>
  <div class="account__account-card">
    <el-card class="account__collapse-card">
      <div slot="header" @click="toggleCard">
        账号信息：
        <i class="iconfont account__card-icon account__user-icon icon-card"></i>
      </div>
      <div :class="['account__collapse-user', isToggle ? 'height-zero': '']">
        <div class="account__info">
          <div class="account__info-label">
            商户编码：
          </div>
          <div class="account__info-user-value">
            {{ data.merchantId }}
          </div>
        </div>

        <div class="account__info">
          <div class="account__info-label">
            商户名称：
          </div>
          <div class="account__info-user-value">
            {{ data.merchantName }}
          </div>
        </div>

        <div class="account__info">
          <div class="account__info-label">
            电子邮箱：
          </div>
          <div class="account__info-user-value">
            {{ data.email }}
          </div>
          <el-button
            size="small"
            class="account__modify-button"
            @click="showEmailDialog"
            type="primary">
            修改信息
          </el-button>
        </div>

        <div class="account__info">
          <div class="account__info-label">
            手机号码：
          </div>
          <div class="account__info-user-value">
            {{ data.userPhone }}
          </div>
          <el-button
            v-if="false"
            @click="showMobileDialog"
            class="account__modify-button"
            size="small"
            type="primary">
            修改信息
          </el-button>
        </div>

        <div class="account__info">
          <div class="account__info-label">
            密码：
          </div>
          <div class="account__info-user-value">
            *******************
          </div>
          <el-button
            @click="showPasswordDialog"
            class="account__modify-button"
            size="small"
            type="primary">
            修改信息
          </el-button>
        </div>
      </div>
    </el-card>

    <el-dialog title="修改手机号码" :visible.sync="mobileDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="mobileForm" :model="mobileForm" label-width="100px" :rules="mobileRules">
        <el-form-item label="新手机号码" prop="userPhone">
          <el-input v-model="mobileForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validateCode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="mobileForm.validateCode"></el-input>
            </el-col>
            <el-col :span="8">
              <img v-if="validateImage" @click="fetchValidateImage" class="account__validate-image" :src="validateImage">
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="mobileDialog = false">取消</el-button>
        <el-button type="primary" @click="changeMobile">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="passwordDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="passwordForm" :model="passwordForm" label-width="100px" :rules="passwordRules">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="passwordDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改邮箱" :visible.sync="emailDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="emailForm" :model="emailForm" label-width="100px" :rules="emailRules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="emailForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="emailDialog = false">取消</el-button>
        <el-button type="primary" @click="changeEmail">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { showMessage, request } from '@/utils';
import config from '@/config';
import api from '@/api';

export default {
  name: 'AccountCard',
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
      isToggle: false,
      validateImage: '',
      passwordDialog: false,
      mobileDialog: false,
      emailDialog: false,
      emailForm: {
        email: ''
      },
      mobileForm: {
        userPhone: '',
        validateCode: ''
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' },
          { validator: this.validatePwd, trigger: 'blur' }
        ]
      },
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      mobileRules: {
        userPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: this.validatePhone, trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    toggleCard () {
      this.isToggle = !this.isToggle;
    },
    validatePwd (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码.'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致.'));
      } else {
        callback();
      }
    },
    validatePhone (rule, value, callback) {
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!reg.test(value)) {
        callback(new Error('手机号码格式错误'));
      }
      callback();
    },
    showMobileDialog () {
      this.showDialog('mobileForm', () => {
        if (!this.$refs['mobileForm']) this.fetchValidateImage();
        this.mobileDialog = true;
      });
    },
    showPasswordDialog () {
      this.showDialog('passwordForm', () => {
        this.passwordDialog = true;
      });
    },
    showEmailDialog () {
      this.showDialog('emailForm', () => {
        this.emailDialog = true;
      });
    },
    showDialog (type, cb) {
      if (this.$refs[type]) {
        this.$refs[type].resetFields();
      }
      cb();
    },
    changeEmail () {
      this.update('emailForm', async () => {
        const email = this.emailForm.email;
        const response = await request(config.account.changeEmail, {email: email});
        if (response.data.resCode === '200') {
          showMessage.call(this, 'success', '修改邮箱成功');
          this.$emit('reload');
        }
      }, () => {
        this.emailDialog = false;
      });
    },
    changeMobile () {
      this.update('mobileForm', async () => {
        const data = {
          validateCode: this.mobileForm.validateCode.toUpperCase(),
          userPhone: this.mobileForm.userPhone
        };
        const response = await request(config.account.changeMobile, data);
        if (response.data.resCode === '200') {
          showMessage.call(this, 'success', '修改手机号码成功');
          this.$emit('reload');
        } else if (response.data.resCode === '1020') {
          showMessage.call(this, 'error', '验证码已过期');
        }
      }, () => {
        this.mobileDialog = false;
      });
    },
    changePassword () {
      this.update('passwordForm', async () => {
        const form = {
          oldPassword: this.passwordForm.oldPassword,
          newPassword: this.passwordForm.newPassword
        };
        const response = await request(config.account.changePwd, form);
        if (response.data.resCode === '200') {
          showMessage.call(this, 'success', '修改密码成功');
        }
      }, () => {
        this.passwordDialog = false;
      });
    },
    update (type, submit, cb) {
      this.$refs[type].validate(valid => {
        if (valid) {
          submit();
          cb();
        }
      });
    },
    async fetchValidateImage () {
      api.post(config.account.validateImage, {}, {
        responseType: 'arraybuffer'
      })
      .then(response => {
        return 'data:image/png;base64,' +
          btoa(new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''));
      })
      .then(data => {
        this.validateImage = data;
      });
    }
  }
};
</script>

<style>
.account__collapse-user {
  height: 390px;
  transition: all .5s;
}
.account__modify-button {
  position: absolute;
  right: 0;
}
.height-zero {
  transition: all .5s;
  height: 0;
}
.account__validate-image {
  cursor: pointer;
  margin: 5px;
  margin-left: 10px;
}
.account__user-icon {
  font-size: 22px;
}
</style>

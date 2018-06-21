<template>
  <div class="account">
    <div class="account__avatar">
      <img :src="userInfo.avatar" alt="avatar">
    </div>
    <div class="account__username">
      {{ userInfo.username }}
    </div>
    <div class="account__info-container">
      <div class="account__info">
        <div class="account__info-label">
          用户名：
        </div>
        <div class="account__info-value">
          {{ userInfo.username }}
        </div>
      </div>
      <div class="account__info">
        <div class="account__info-label">
          用户昵称：
        </div>
        <div class="account__info-value">
          {{ userInfo.nickname }}
        </div>
      </div>
      <div class="account__info">
        <div class="account__info-label">
          邮箱：
        </div>
        <div class="account__info-value">
          {{ userInfo.email }}
        </div>
      </div>
      <div class="account__info">
        <div class="account__info-label">
          手机：
        </div>
        <div class="account__info-value">
          {{ userInfo.mobile }}
        </div>
      </div>
      <div class="account__info">
        <div class="account__info-label">
          用户状态：
        </div>
        <el-switch
          class="account__info-status"
          v-model="userInfo.status"
          >
        </el-switch>
      </div>
      <el-button @click="showUserForm" type="primary">
        修改信息
      </el-button>

      <div class="account__company">
        <el-form ref="companyForm" :model="companyForm" :rules="companyRules" label-width="120px" labelPosition="left">
          <el-form-item label="商户编号：" prop="id">
            <el-input v-model="companyForm.id"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="name">
            <el-input v-model="companyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contacts">
            <el-input v-model="companyForm.contacts"></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="region">
            <el-input v-model="companyForm.region"></el-input>
          </el-form-item>
          <el-button @click="showCompanyForm" type="primary">修改信息</el-button>
        </el-form>
      </div>

      <el-dialog
        title="修改账号信息"
        :visible.sync="isUserFormVisible">
        <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="password" v-model="userForm.confirmPwd" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userForm.nickname" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userForm.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="hideUserForm">取消</el-button>
          <el-button type="primary" @click="submitForm('userForm')">修改</el-button>
        </span>
      </el-dialog>

    </div>

    <el-dialog title="修改企业信息" :visible.sync="isCompanyFormVisible">
      <el-form ref="companyForm" :model="companyForm" :rules="companyRules" label-width="80px">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="hideCompanyForm">取消</el-button>
        <el-button type="primary" @click="submitForm('companyForm')">修改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      isUserFormVisible: false,
      isCompanyFormVisible: false,
      userInfo: {
      },
      userForm: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        mobile: ''
      },
      companyForm: {
        id: '',
        name: '',
        contacts: '',
        region: ''
      },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },
      companyRules: {
      }
    };
  },
  methods: {
    getUserInfo () {
      const data = {
        avatar: require('@/assets/images/logo.png'),
        username: 'admin',
        nickname: 'admin',
        email: 'admin@example.com',
        mobile: '18613945882',
        status: true
      };
      return data;
    },
    showUserForm () {
      this.isUserFormVisible = true;
    },
    hideUserForm () {
      this.isUserFormVisible = false;
      this.$refs['userForm'].resetFields();
    },
    showCompanyForm () {
      this.isCompanyFormVisible = true;
    },
    hideCompanyForm () {
      this.isCompanyFormVisible = false;
      this.$refs['companyForm'].resetFields();
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    }
  },
  mounted () {
    this.userInfo = this.getUserInfo();
  }
};
</script>

<style>
.account {
  position: relative;
  margin: 0 10px;
  text-align: left;
}
.account__avatar {
  margin-top: 34px;
  margin-left: 100px;
}
.account__avatar img {
  width: 196px;
  height: 196px;
  border-radius: 98px;
}
.account__username {
  font-size: 31px;
  font-weight: bold;
  margin-left: 150px;
}
.account__info-container {
  margin-top: 50px;
  margin-left: 30px;
}
.account__info {
  position: relative;
  min-width: 250px;
  width: 350px;
  padding: 20px;
}
.account__info div {
  display: inline-block;
}
.account__info-label {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: bold;
  min-width: 80px;
}
.account__info-value {
  position: relative;
  right: 0;
  left: 50px;
  min-width: 250px;
  text-align: center;
  border-bottom: 1px solid black;
}
.account__info-status {
  text-align: left;
  width: 150px;
  left: 80px;
}
.account__company {
  margin: 50px 0 20px;
  max-width: 600px;
}
.account__company .el-form-item__label {
  font-weight: bold;
  font-size: 16px;
}
</style>

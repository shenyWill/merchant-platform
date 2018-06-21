<template>
  <div class="account">
    <el-row>
      <el-col :span="8">
        <el-card class="account__user-card">
          <div slot="header">
            <span>用户信息：</span>
            <i class="el-icon-menu account__card-icon"></i>
          </div>
          <div class="account__avatar">
            <img :src="userInfo.avatar" alt="avatar">
          </div>
          <div class="account__username">
            {{ userInfo.username }}
          </div>
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
        </el-card>
        <el-card class="account__action-card">
          <el-button type="danger">退出登录</el-button>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card class="account__collapse-card">
          <div slot="header" @click="toggleCompanyCard">
            认证信息：
          </div>
          <div :class="['account__collapse-company', isCompanyCollapse ? 'height-zero' : '']">
            <el-row>
              <el-col :span="12">
                <div class="account__info">
                  <div class="account__info-label">
                    企业名称：
                  </div>
                  <div class="account__info-user-value">
                    {{ merchantInfo.companyName }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="account__info">
                  <div class="account__info-label">
                    企业名称：
                  </div>
                  <div class="account__info-user-value">
                    {{ merchantInfo.companyContacts }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <div>
              <div class="account__info">
                <div class="account__info-label">营业执照：</div>
                <el-upload
                  class="account__upload"
                  action=""
                  >
                </el-upload>
              </div>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <div class="account__info">
                    <div class="account__info-label">法人身份证正面：</div>
                    <el-upload
                      class="account__upload"
                      action=""
                      >
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="account__info">
                    <div class="account__info-label">法人身份证反面：</div>
                    <el-upload
                      class="account__upload"
                      action=""
                      >
                    </el-upload>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>

        <el-card class="account__collapse-card">
          <div slot="header" @click="toggleContactsCard">
            联系方式：
          </div>
          <div :class="['account__collapse-contacts', isContactsCollapse ? 'height-zero' : '']">
            <el-row>
              <el-col :span="12">
                <div class="account__info">
                  <div class="account__info-label">
                    联系人：
                  </div>
                  <div class="account__info-user-value">
                    {{ merchantInfo.contacts }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="account__info">
                  <div class="account__info-label">
                    联系电话：
                  </div>
                  <div class="account__info-user-value">
                    {{ merchantInfo.contactsMobile }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="account__info">
              <div class="account__info-label">
                地址：
              </div>
              <div class="account__info-user-value">
                {{ merchantInfo.address }}
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="account__collapse-card">
          <div slot="header" @click="toggleUserCard">
            账号信息：
          </div>
          <div :class="['account__collapse-user', isUserCardCollapse ? 'height-zero': '']">
            <div class="account__info">
              <div class="account__info-label">
                商户编码：
              </div>
              <div class="account__info-user-value">
                {{ merchantInfo.merchantId }}
              </div>
            </div>

            <div class="account__info">
              <div class="account__info-label">
                商户名称：
              </div>
              <div class="account__info-user-value">
                {{ merchantInfo.merchantName }}
              </div>
            </div>

            <div class="account__info">
              <div class="account__info-label">
                电子邮箱：
              </div>
              <div class="account__info-user-value">
                {{ merchantInfo.email }}
              </div>
            </div>

            <div class="account__info">
              <div class="account__info-label">
                手机号码：
              </div>
              <div class="account__info-user-value">
                {{ merchantInfo.mobile }}
              </div>
            </div>

            <div class="account__info">
              <div class="account__info-label">
                密码：
              </div>
              <div class="account__info-user-value">
                *******************
              </div>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      isUserCardCollapse: false,
      isContactsCollapse: true,
      isCompanyCollapse: true,
      userInfo: {
      },
      userForm: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        mobile: ''
      },
      merchantInfo: {
        merchantId: '1231231231',
        merchantName: 'admin',
        email: 'admin@example.com',
        mobile: '134123123111',
        contacts: 'Wanghu',
        contactsMobile: '123412311231',
        address: 'SHENZHEN',
        companyName: 'Ali',
        companyContacts: 'Wanghu'
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
        mobile: '18613945882'
      };
      return data;
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    toggleUserCard () {
      this.isUserCardCollapse = !this.isUserCardCollapse;
    },
    toggleContactsCard () {
      this.isContactsCollapse = !this.isContactsCollapse;
    },
    toggleCompanyCard () {
      this.isCompanyCollapse = !this.isCompanyCollapse;
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
.account .el-card__header {
  background-color: #4f4f4f;
  font-size: 15px;
  color: white;
  font-weight: bold;
}
.account__user-card {
  position: relative;
  border-radius: 10px;
  margin-right: 10px;
}
.account__collapse-card {
  position: relative;
  border-radius: 10px;
  margin-right: 10px;
  border-bottom: none;
}
.account__collapse-card .el-card__header {
  padding: 0;
  cursor: pointer;
  height: 57px;
}
.account__collapse-card .el-card__header div {
  padding: 20px;
}
.account__collapse-card .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
}
.account__collapse-user {
  height: 270px;
  transition: all .5s;
}
.account__collapse-contacts {
  height: 110px;
  transition: all .5s;
  overflow: hidden;
}
.account__collapse-company {
  height: 590px;
  transition: all .5s;
  overflow: hidden;
}
.account__card-icon {
  float: right;
  font-size: 25px;
}
.account__avatar {
  text-align: center;
}
.account__avatar img {
  width: 155px;
  height: 155px;
  border-radius: 78px;
}
.account__username {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
.account__info {
  position: relative;
  min-width: 250px;
  width: 350px;
  padding: 18px;
}
.account__info div {
  display: inline-block;
}
.account__info-label {
  position: absolute;
  left: 0;
  font-size: 14px;
  font-weight: bold;
  min-width: 80px;
}
.account__info-value {
  position: relative;
  margin-left: 10px;
  right: 0;
  left: 50px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid black;
}
.account__action-card {
  margin: 20px 10px 0 0;
  height: 160px;
  bottom: 10px;
  border-radius: 10px;
  text-align: center;
}
.account__action-card button {
  margin-top: 50px;
  width: 80%;
  border-radius: 10px;
  background-color: #d73e3e;
  color: white;
}
.account__info-user-value {
  margin-left: 120px;
}
.account__company .el-form-item__label {
  font-weight: bold;
  font-size: 16px;
}
.height-zero {
  transition: all .5s;
  height: 0;
}
.account__upload {
  position: relative;
  margin-top: 30px;
  width: 334px;
  height: 186px;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  overflow: hidden;
}
.account__upload .el-upload:hover {
  border-color: #409EFF;
}
</style>

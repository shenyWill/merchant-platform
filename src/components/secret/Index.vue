<template>
  <div class="secret">
    <div class="secret__input">
      <div class="secret__input-title">apiKey:：</div>
      <el-input v-model="apiKey"></el-input>
    </div>

    <div class="secret__input">
      <div class="secret__input-title">平台签名公钥：</div>
      <el-input type="textarea" v-model="platformPublicKey"></el-input>
    </div>

    <div class="secret__binding">
      <div class="secret__input-title">绑定应用：</div>
      <el-table
        :data="appDetail">
        <el-table-column
          prop="userName"
          label="应用名称"
          >
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="应用编号">
        </el-table-column>
      </el-table>
    </div>

    <div class="secret__whitelist">
      <div class="secret__input-title">IP白名单：</div>
      <el-row>
        <el-col :span="12">
          <el-input resize="none" type="textarea" class="secret__whitelist-input"></el-input>
        </el-col>
        <el-col :span="12">
          <p class="secret__whitelist-info" v-html="ipInfo"></p>
          <el-button class="secret__generate-button" type="primary" @click="generateKey">在线生成</el-button>
        </el-col>
      </el-row>
      <el-button type="primary">确定</el-button>
    </div>

    <div class="secret__input secret__user-public">
      <div class="secret__input-title">用户签名公钥：</div>
      <el-input v-model="userPublicKey" resize="none" type="textarea"></el-input>
    </div>

    <div>
      <el-button @click="uploadPublicKey" type="primary">上传公钥</el-button>
      <el-button type="primary">复制公钥</el-button>
    </div>
  </div>
</template>

<script>
import { request, showMessage } from '@/utils';
import config from '@/config';

export default {
  name: 'Secret',
  data () {
    return {
      platformPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXyE/yHrjuqHG9ZDVv2KIynVtozWyWj24c2HDBE8fokftA7bFodyrvvsaMrx4x/Q8kMbwt1wynAXTreeEFHm+DYfuuZYmpKd4jVrxJFPl3u87wmbIUwEDYWVK662YOwyZYaqjAiQelKI8tZCFuL8k2lDJqlt77Sw3JiECuJrNnMwIDAQAB',
      ipInfo: 'IP说明：<br/>如未设置IP白名单，则任何IP都可以请求<br/>该IP须为服务器外网IP，即最终出口访问的IP，可以是多个<br/>一行一个IP地址，如：<br/>12.6.56.125',
      apiKey: '',
      userPublicKey: '',
      appDetail: [{
        userName: '',
        userCode: ''
      }]
    };
  },
  methods: {
    generateKey () {
      this.$router.push('/secret/generate');
    },
    async getAppDetail (id) {
      if (!id) return;
      const response = await request(config.product.detail, { id: id });
      if (response.data.resCode === '200') {
        return [{...response.data.data}];
      } else {
        return [{name: '', id: ''}];
      }
    },
    async uploadPublicKey () {
      if (!this.userPublicKey) {
        showMessage.call(this, 'error', '请填写公钥');
        return;
      }
      const data = {
        id: this.$route.query.id,
        publicKey: this.userPublicKey
      };
      const response = await request(config.product.modify, data);
      if (response.data.resCode === '200') {
        showMessage.call(this, 'success', '上传成功');
      } else {
        showMessage.call(this, 'error', `请重新上传：${response.data.resMsg}`);
      }
    }
  },
  async mounted () {
    this.appDetail = await this.getAppDetail(this.$route.query.id);
    this.apiKey = this.appDetail[0].apiKey;
  }
};
</script>

<style>
.secret {
  position: relative;
  margin: 16px 90px 16px 64px;
  text-align: left;
}
.secret__input {
  margin-bottom: 43px;
}
.secret__input-title {
  font-weight: bold;
}
.secret__binding {
  margin-bottom: 20px;
}
.secret__binding .el-button {
  margin-top: 10px;
}
.secret__binding .el-table th {
  background-color: #d5d5d5;
  color: black;
}
.secret__whitelist {
  margin-bottom: 10px;
}
.secret__whitelist-input .el-textarea__inner {
  height: 201px;
}
.secret__whitelist-info {
  margin: 0 10px;
}
.secret__whitelist .el-button {
  margin-top: 10px;
}
.secret__generate-button {
  float: right;
}
.secret__user-public .el-textarea__inner {
  min-height: 122px!important;
}
</style>

<template>
  <div class="secret">
    <el-breadcrumb separator="/" class="sercert__breadcrumb">
      <el-breadcrumb-item :to="{ path: '/application'}">应用管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/application'}">参数配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="12">
        <div class="secret__merchant">
          <div class="secret__info-label">商户名称:</div>
          <div class="secret__info-value">{{ appDetail.userName }}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="secret__merchant">
          <div class="secret__info-label">商户编码:</div>
          <div class="secret__info-value">{{ appDetail.userCode }}</div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="secret__app">
          <div class="secret__info-label">应用名称:</div>
          <div class="secret__info-value">{{ appDetail.name }}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="secret__app">
          <div class="secret__info-label">apiKey:</div>
          <div class="secret__info-value">{{ appDetail.apiKey }}</div>
        </div>
      </el-col>
    </el-row>

    <div class="secret__input">
      <div class="secret__input-title">apiSecret：</div>
      <div class="secret__input-content">
        {{ apiSecret }}
      </div>
    </div>

    <div class="secret__input">
      <div class="secret__input-title">平台签名公钥：</div>
      <div class="secret__input-content">
        {{ platformPublicKey }}
      </div>
    </div>

    <div class="secret__app-products">
      <div class="secret__input-title">绑定产品：</div>
      <el-table
        :data="products"
        >
        <el-table-column
          prop="apiCode"
          label="产品编码"
          >
        </el-table-column>
        <el-table-column
          prop="apiName"
          label="产品名称"
          >
        </el-table-column>
      </el-table>
    </div>

    <div class="secret__bundle" v-if="isSDK && isSDK === true">
      <div class="secret__input-title">包名：</div>
      <div class="secret__input-content">
        {{ bundleID }}
      </div>
      <el-button @click="bundleDialog = true;" type="primary">修改</el-button>
    </div>

    <div class="secret__whitelist" v-if="isAPI && isAPI === true">
      <div class="secret__input-title">IP白名单：</div>
      <el-row>
        <el-col :span="12">
          <div class="secret__whitelist-input">{{ ipWhiteList }}</div>
        </el-col>
        <el-col :span="12">
          <p class="secret__whitelist-info" v-html="ipInfo"></p>
        </el-col>
      </el-row>
      <el-button @click="showIpDialog" type="primary">修改</el-button>
    </div>

    <div class="secret__input secret__user-public">
      <div class="secret__input-title">用户签名公钥：
        <a class="secret__auto-generate" href="/web/#/secret/generate" target="_blank">在线生成</a>
      </div>
      <div id="userPublicKey" class="secret__input-content">
        {{ userPublicKey }}
      </div>
    </div>

    <div>
      <el-button @click="publicKeyDialog = true;" type="primary">上传公钥</el-button>
      <el-button data-clipboard-target="#userPublicKey" class="clipboard" @click="copySecret" type="primary">复制公钥</el-button>
    </div>

    <el-dialog title="修改包名" :visible.sync="bundleDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="bundleForm" label-width="100px" :model="bundleForm" :rules="bundleRules">
        <el-form-item label="包名" prop="packageName">
          <el-input v-model="bundleForm.packageName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelBundleDialog">取消</el-button>
        <el-button type="primary" @click="uploadBundleID">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改IP白名单" :visible.sync="ipDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="ipForm" label-width="100px" :model="ipForm" :rules="ipRules">
        <el-form-item label="IP白名单" prop="boundIp">
          <el-input v-model="ipForm.boundIp" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelIpDialog">取消</el-button>
        <el-button type="primary" @click="uploadWhiteList">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传签名公钥" :visible.sync="publicKeyDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form ref="publicKeyForm" label-width="100px" :model="publicKeyForm" :rules="publicKeyRules">
        <el-form-item label="签名公钥" prop="publicKey">
          <el-input type="textarea" v-model="publicKeyForm.publicKey"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelPublicKeyDialog">取消</el-button>
        <el-button type="primary" @click="uploadPublicKey">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { request, showMessage, isValidIP } from '@/utils';
import config from '@/config';

export default {
  name: 'Secret',
  data () {
    return {
      platformPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXyE/yHrjuqHG9ZDVv2KIynVtozWyWj24c2HDBE8fokftA7bFodyrvvsaMrx4x/Q8kMbwt1wynAXTreeEFHm+DYfuuZYmpKd4jVrxJFPl3u87wmbIUwEDYWVK662YOwyZYaqjAiQelKI8tZCFuL8k2lDJqlt77Sw3JiECuJrNnMwIDAQAB',
      ipInfo: 'IP说明：<br/>如未设置IP白名单，则任何IP都可以请求<br/>该IP须为服务器外网IP，即最终出口访问的IP，可以是多个<br/>多个IP地址由英文逗号分隔，如：<br/>12.6.56.125,12.6.56.126',
      apiKey: '',
      apiSecret: '',
      userPublicKey: '',
      clipboard: null,
      ipWhiteList: '',
      isSDK: null,
      isAPI: null,
      bundleID: '',
      bundleDialog: false,
      ipDialog: false,
      publicKeyDialog: false,
      products: [],
      bundleForm: {
        packageName: ''
      },
      bundleRules: {
        packageName: [
          { required: true, message: '请输入包名', trigger: 'blur' },
          { min: 5, max: 100, message: '长度在5到100个字符', trigger: 'blur' },
          { validator: this.validateBundleID, trigger: 'blur' }
        ]
      },
      publicKeyForm: {
        publicKey: ''
      },
      publicKeyRules: {
        publicKey: [
          { required: true, message: '请输入签名公钥', trigger: 'blur' },
          { min: 10, max: 5000, message: '长度在10到5000个字符', trigger: 'blur' }
        ]
      },
      ipForm: {
        boundIp: ''
      },
      ipRules: {
        boundIp: [
          { validator: this.validateIP, trigger: 'blur' }
        ]
      },
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
      const response = await request(config.application.detail, { id: id });
      if (response.data.resCode === '200') {
        return [{...response.data.data}];
      } else {
        return [{name: '', id: ''}];
      }
    },
    uploadPublicKey () {
      this.$refs['publicKeyForm'].validate(async valid => {
        if (valid) {
          const data = {
            id: this.$route.query.id,
            ...this.publicKeyForm
          };
          const response = await request(config.application.modify, data);
          this.publicKeyDialog = false;
          if (response.data.resCode === '200') {
            this.userPublicKey = this.publicKeyForm.publicKey;
            showMessage.call(this, 'success', '上传成功');
          } else {
            showMessage.call(this, 'error', `请重新上传：${response.data.resMsg}`);
          }
        }
      });
    },
    copySecret () {
      if (this.userPublicKey === '') {
        showMessage.call(this, 'error', '请填写签名公钥');
        return false;
      } else {
        this.clipboard.on('success', (e) => {
          if (e.text !== '') {
            showMessage.call(this, 'success', '复制公钥成功');
            return true;
          }
        });
      }
    },
    validateBundleID (rule, value, callback) {
      if (value.indexOf('.') === -1) {
        callback(new Error('包名中包含"."'));
      } else {
        callback();
      }
    },
    validateIP (rule, value, callback) {
      if (value === '') callback();
      const array = value.split(',');
      array.forEach((ip) => {
        const isIP = isValidIP(ip);
        if (!isIP) {
          callback(new Error('请填写合法的IP地址'));
        }
      });
      callback();
    },
    cancelBundleDialog () {
      this.bundleDialog = false;
      this.$refs['bundleForm'].resetFields();
    },
    cancelPublicKeyDialog () {
      this.publicKeyDialog = false;
      this.$refs['publicKeyForm'].resetFields();
    },
    cancelIpDialog () {
      this.ipDialog = false;
      this.$refs['ipForm'].resetFields();
    },
    showIpDialog () {
      this.ipForm.boundIp = this.ipWhiteList;
      this.ipDialog = true;
    },
    async uploadWhiteList () {
      this.$refs['ipForm'].validate(async valid => {
        if (valid) {
          const response = await request(config.application.modify, {
            id: this.$route.query.id,
            ...this.ipForm
          });
          this.ipDialog = false;
          if (response.data.resCode === '200') {
            this.ipWhiteList = this.ipForm.boundIp;
            showMessage.call(this, 'success', '修改成功');
          }
        }
      });
    },
    uploadBundleID () {
      this.$refs['bundleForm'].validate(async valid => {
        if (valid) {
          const response = await request(config.application.modify, {
            id: this.$route.query.id,
            ...this.bundleForm
          });
          this.bundleDialog = false;
          if (response.data.resCode === '200') {
            this.bundleID = this.bundleForm.packageName;
            showMessage.call(this, 'success', '添加成功');
          }
        }
      });
    },
    async getProducts (key) {
      const data = {apiKey: key};
      const response = await request(config.application.products, data);
      if (response.data.resCode === '200') {
        return response.data.lists;
      }
    },
    initialize (data) {
      this.userPublicKey = data.publicKey;
      this.apiKey = data.apiKey;
      this.apiSecret = data.apiSecret;
      this.bundleID = data.packageName ? data.packageName : '';
      this.ipWhiteList = data.boundIp;
      this.isSDK = data.appType === '1';
      this.isAPI = data.appType === '2';
    }
  },
  async mounted () {
    this.clipboard = new ClipboardJS('.clipboard');
    const response = await this.getAppDetail(this.$route.query.id);
    this.appDetail = response[0];
    this.initialize(this.appDetail);
    this.products = await this.getProducts(this.apiKey);
  }
};
</script>

<style>
.secret {
  position: relative;
  margin: 16px 90px 16px 64px;
  width: 50%;
  text-align: left;
}
.sercert__breadcrumb {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}
.secret__merchant {
  margin-bottom: 10px;
}
.secret__input {
  margin: 20px 0;
}
.secret__input-title {
  font-weight: bold;
}
.secret__info-label {
  display: inline-block;
  left: 0;
  font-size: 16px;
  font-weight: bold;
  min-width: 80px;
}
.secret__info-value {
  display: inline-block;
  right: 10px;
  left: 50px;
  text-align: center;
}
.secret__input-content {
  margin-top: 10px;
  padding: 10px;
  min-height: 50px;
  width: 100%;
  border: 1px solid lightgray;
  overflow-wrap: break-word;
}
.secret__app-products {
  margin-bottom: 20px;
}
.secret__binding {
  margin-bottom: 20px;
}
.secret__binding .el-button {
  margin-top: 10px;
}
.secret .el-table th {
  background-color: #d5d5d5;
  color: black;
}
.secret__bundle {
  margin-bottom: 10px;
}
.secret__bundle .el-button {
  margin-top: 10px;
}
.secret__whitelist {
  margin-bottom: 10px;
}
.secret__whitelist-input {
  min-height: 201px;
  border: 1px solid lightgray;
}
.secret__whitelist-info {
  margin: 0 10px;
}
.secret__whitelist .el-button {
  margin-top: 10px;
}
.secret__user-public .el-textarea__inner {
  min-height: 122px!important;
}
.secret__auto-generate {
  float: right;
}
</style>

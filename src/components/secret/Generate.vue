<template>
  <div class="secret-generate">
    <div class="secret-generate__title">
    </div>
    <div class="secret-generate__form">
      <div class="secret-generate__input-title">平台签名公钥：</div>
      <div class="secret-generate__input-content">
        {{ platformPublicKey }}
      </div>

      <p class="text-warning">{{ text }}</p>
      <el-button class="secret-generate__button" @click="generateSecret" type="primary">在线生成</el-button>

      <div class="secret-generate__public">
        <div class="secret-generate__input-title">用户签名公钥：</div>
        <div id="userPublicKey" class="secret-generate__public-key">{{ form.userPublicKey }}</div>
        <el-button @click="copy(form.userPublicKey, publicKeyClipboard)" class="publicKeyClipboard" data-clipboard-target="#userPublicKey" type="primary">复制</el-button>
      </div>

      <div class="secret-generate__secret">
        <div class="secret-generate__input-title">用户签名私钥：</div>
        <div id="userSecretKey" class="secret-generate__secret-key">{{ form.userPrivateKey }}</div>
        <el-button @click="copy(form.userPrivateKey, secretKeyClipboard)" class="secretKeyClipboard" data-clipboard-target="#userSecretKey" type="primary">复制</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { showMessage } from '@/utils';
import api from '@/api';
import config from '@/config';

export default {
  name: 'SecretGenerate',
  data () {
    return {
      platformPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXyE/yHrjuqHG9ZDVv2KIynVtozWyWj24c2HDBE8fokftA7bFodyrvvsaMrx4x/Q8kMbwt1wynAXTreeEFHm+DYfuuZYmpKd4jVrxJFPl3u87wmbIUwEDYWVK662YOwyZYaqjAiQelKI8tZCFuL8k2lDJqlt77Sw3JiECuJrNnMwIDAQAB',
      text: '注：鉴权数据中心提供统一的RSA签名方式，即：用户可在平台在线生成或者自行生成密钥对，同时将签名公钥上传至平台，私钥留下自己注意保密，通过生成的签名密钥进行签名，产生签名值。通过平台签名公钥和平台返回签名值进行验签。',
      publicKeyClipboard: null,
      secretKeyClipboard: null,
      form: {
        userPublicKey: '',
        userPrivateKey: ''
      }
    };
  },
  methods: {
    async generateSecret () {
      const response = await api.post(config.secret.generate);
      if (response.data.resCode === '200') {
        this.form = {
          ...this.form,
          userPublicKey: response.data.data.publicKey,
          userPrivateKey: response.data.data.privateKey
        };
      }
    },
    copy (key, clipboard) {
      if (key === '') {
        const message = '请生成公钥私钥';
        showMessage.call(this, 'error', message);
        return false;
      } else {
        clipboard.on('success', e => {
          if (e.text !== '') {
            showMessage.call(this, 'success', '复制成功');
            return true;
          }
        });
      }
    }
  },
  mounted () {
    this.publicKeyClipboard = new ClipboardJS('.publicKeyClipboard');
    this.secretKeyClipboard = new ClipboardJS('.secretKeyClipboard');
  }
};
</script>

<style>
.secret-generate {
  position: relative;
  margin: 10px 102px 10px 102px;
  width: 50%;
  font-size: 14px;
  text-align: left;
}
.secret-generate__form {
  margin-top: 30px;
}
.secret-generate .el-form-item__label {
  font-weight: bold;
}
.secret-generate .el-select {
  height: 28px;
  width: 100%;
}
.secret-generate .secret-generate__input-content {
  margin-top: 10px;
  padding: 10px;
  min-height: 50px;
  width: 100%;
  border: 1px solid lightgray;
  overflow-wrap: break-word;
}
.secret-generate .text-warning {
  color: red;
}
.secret-generate__button {
  position: absolute;
  right: 0;
}
.secret-generate__public {
  margin-top: 40px;
}
.secret-generate__public-key {
  margin-top: 55px;
  min-height: 92px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid lightgray;
  overflow-wrap: break-word;
}
.secret-generate__secret-key {
  margin-top: 55px;
  min-height: 216px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid lightgray;
  overflow-wrap: break-word;
}
.publicKeyClipboard {
  margin-top: 10px;
}
.secretKeyClipboard {
  margin-top: 10px;
}
</style>

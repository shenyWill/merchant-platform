<template>
  <div class="secret">
    <div class="secret__input">
      <div class="secret__input-title">appkey：</div>
      <el-input></el-input>
    </div>

    <div class="secret__input">
      <div class="secret__input-title">平台签名公钥：</div>
      <el-input></el-input>
    </div>

    <div class="secret__binding">
      <div class="secret__input-title">绑定应用：</div>
      <el-table
        :data="tableData">
        <el-table-column
          prop="name"
          label="应用名称"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="应用编号">
        </el-table-column>
      </el-table>
      <el-button type="primary">绑定应用</el-button>
    </div>

    <div class="secret__whitelist">
      <div class="secret__input-title">IP白名单：</div>
      <el-row>
        <el-col :span="12">
          <el-input resize="none" type="textarea" class="secret__whitelist-input"></el-input>
        </el-col>
        <el-col :span="12">
          <p class="secret__whitelist-info" v-html="ipInfo"></p>
        </el-col>
      </el-row>
      <el-button type="primary">确定</el-button>
    </div>

    <div class="secret__input secret__user-public">
      <div class="secret__input-title">用户签名公钥：</div>
      <el-input resize="none" type="textarea"></el-input>
    </div>

    <div>
      <el-button type="primary">上传公钥</el-button>
      <el-button type="primary">复制公钥</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Secret',
  data () {
    return {
      ipInfo: 'IP说明：<br/>如未设置IP白名单，则任何IP都可以请求<br/>该IP须为服务器外网IP，即最终出口访问的IP，可以是多个<br/>一行一个IP地址，如：<br/>12.6.56.125',
      tableData: [{
        name: '易丰信息',
        id: '1FDSDFSFS1231sdf0'
      }]
    };
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
  font-height: 201px;
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
</style>

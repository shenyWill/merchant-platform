<template>
  <div class="application">
    <h4 class="count-title">
      <i class="el-icon-tickets"> 应用列表</i>
      <span class="add-app" @click="showAddAppDialog">添加应用</span>
    </h4>
    <div class="list-table">
      <el-table :data="appTableData" border class="app-table" row-class-name="app-table-tr">
        <el-table-column prop="apiKey" label="API Key" width="300" align="center"></el-table-column>
        <el-table-column prop="name" label="应用名称" width="180" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="120" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button  size='small' @click="handleDisable(scope.$index,scope.row)" class="disable-btn" v-text="scope.row.status == '启用' ? '禁用': '启用'"></el-button>
            <el-button  size='small' :disabled="scope.row.status == '启用' ? false : true" @click="handleBindProduct(scope.$index,scope.row)">绑定产品</el-button>
            <el-button  size='small' :disabled="scope.row.status == '启用' ? false : true">参数配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加应用弹出框 -->
    <el-dialog title="添加应用" :visible.sync="addAppDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-form :model="addForm" :rules="rules" ref="addForm" class="add-form" label-width="100px">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option v-for="item in appType" :key="item" :label="item" :value="appType.indexOf(item)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约类型" prop="appType">
          <el-select v-model="addForm.appType" placeholder="请选择">
            <el-option label="SDK" value="1"></el-option>
            <el-option label="API" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAppDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSumbit('addForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 绑定产品弹出框 -->
    <el-dialog title="请选择服务" :visible.sync="bindProductDialog" :close-on-click-modal="false" :lock-scroll="false">
      <el-transfer :data="bindForm" v-model="bindDate" class="product-bind" :titles="['暂未绑定产品','待绑定产品']"></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindProductDialog = false">取 消</el-button>
        <el-button type="primary" @click="bindSumit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
export default {
  data() {
    return {
      appTableData: [], // 应用列表数据
      appType: [], // 类型列表
      addAppDialog: false, // 添加应用弹出框标识
      addForm: {}, // 添加应用数据
      bindProductDialog: false, // 绑定产品弹出框标识
      bindForm: [], // 绑定产品数据
      bindDate: [], // 绑定产品传送数据
      bindRow: '', // 绑定产品的API Key
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择应用类型', trigger: 'change' }
        ],
        appType: [
          { required: true, message: '请选择签约类型', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 禁用功能
    async handleDisable(index, row) {
      let reqObj = { ...row };
      reqObj.status === '启用' ? (reqObj.status = 0) : (reqObj.status = 1);
      reqObj.type = this.appType.indexOf(reqObj.type);
      const response = await api.post(config.application.modify, reqObj);
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
        this.$message({
          message: resObj.resMsg,
          type: 'success'
        });
      } else {
        this.$message({
          message: resObj.resMsg,
          type: 'error'
        });
      }
      await this.responseAPI();
    },
    // 读取应用列表数据展示
    async responseAPI() {
      const response = await api.post(config.application.list, {});
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
        this.appTableData = [];
        resObj.lists.forEach(value => {
          value.status === '1'
            ? (value.status = '启用')
            : (value.status = '禁用');
          value.type = this.appType[value.type];
          value.createTime = parseTime(value.createTime);
          this.appTableData.push(value);
        });
      }
    },
    // 获取type的key值对应的value
    async typeAPI() {
      const response = await api.post(config.application.type, {});
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
        resObj.lists.forEach(value => {
          let number = Number(value.paraVal);
          this.appType[number] = value.paraName;
        });
      }
    },
    // 第一次获取数据渲染页面
    async onceList() {
      await this.typeAPI();
      await this.responseAPI();
    },
    // 添加应用弹出框
    showAddAppDialog() {
      this.addForm = {};
      this.addAppDialog = true;
      if (this.$refs['addForm']) {
        this.$refs['addForm'].clearValidate();
      }
    },
    // 添加应用
    async addSumbit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addAppDialog = false;
          api.post(config.application.add, this.addForm).then(response => {
            let resObj = response.data;
            this.addForm = {};
            if (Number(resObj.resCode) === 200) {
              this.responseAPI();
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: resObj.resMsg,
                type: 'error'
              });
            }
            this.$refs[formName].clearValidate();
          });
        }
      });
    },
    // 绑定产品弹出框
    async handleBindProduct(index, row) {
      this.bindProductDialog = true;
      this.bindDate = [];
      this.bindForm = [];
      this.bindRow = row.apiKey;
      let reqObj = {apiKey: row.apiKey};
      const response = await api.post(config.application.notsign, reqObj);
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
          resObj.lists.forEach(value => {
            this.bindForm.push({
              key: value.apiCode,
              label: value.apiName
            });
          });
      }
    },
    // 绑定产品
    async bindSumit() {
      if (this.bindDate.length) {
        const response = await api.post(config.application.bind, {apiKey: this.bindRow, apiCode: this.bindDate.toString()});
        let resObj = response.data;
        if (Number(resObj.resCode) === 200) {
          this.$message({
            message: resObj.resMsg,
              type: 'success'
          });
        } else {
          this.$message({
            message: resObj.resMsg,
              type: 'error'
          });
        }
        this.bindProductDialog = false;
      } else {
        this.bindProductDialog = false;
      }
    }
  },
  mounted() {
    this.onceList();
    // api.post(config.loginAPI, {userName: 'test', password: '123456'}).then(response => {});
  }
};
</script>

<style lang="scss" scoped>
.application {
  text-align: left;
  background: #ffffff;
  padding: 43px 30px 30px 39px;
  .add-btn {
    margin-bottom: 26px;
  }
  .app-table {
    width: 100%;
  }
  .count-title {
    height: 49px;
    line-height: 49px;
    background-color: rgba(242, 242, 242, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    color: #666666;
    font-size: 12px;
    box-sizing: border-box;
    padding-left: 10px;
    overflow: hidden;
    position: relative;
    margin-bottom: 0;
  }
  .add-app {
    position: absolute;
    display: block;
    height: 30px;
    width: 88px;
    background-color: #ffffff;
    color: #444;
    right: 10px;
    top: 8px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  .list-table {
    background-color: #ffffff;
    border: 1px solid rgba(228, 228, 228, 1);
    padding: 15px 10px;
  }
}
</style>

<template>
  <div class="application">
    <h4 class="count-title">
      <i class="el-icon-tickets"> 应用列表</i>
      <span class="add-app">添加应用</span>
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
            <el-button type='primary' size='small' @click="handleEdit(scope.$index,scope.row)">禁用</el-button>
            <el-button type='primary' size='small'>绑定产品</el-button>
            <el-button type='primary' size='small'>参数配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
export default {
  data() {
    return {
      appTableData: [],
      appType: []
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row)
    },
    responseAPI() {
      api.post(config.application.list, {}).then(response => {
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
      });
    }
  },
  mounted() {
    api.post(config.application.type, {}).then(response => {
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
        resObj.lists.forEach(value => {
          let number = Number(value.paraVal);
          this.appType[number] = value.paraName;
        });
      }
      this.responseAPI();
    });
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

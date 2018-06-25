<template>
    <div class="service">
        <h4 class="service-title">产品服务</h4>
        <search @searchResult="searchResult" @searchReset="searchReset">
            <div slot="search-form">
                <el-form :inline="true" :model="searchData" class="search-form">
                    <el-form-item label="产品名称" class="search-item">
                        <el-select v-model="searchData.apiCode" placeholder="请选择产品名称">
                            <el-option :label="item.apiName" :value="item.apiCode" v-for="item in productNameObj" :key="item.apiCode"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品状态" class="search-item">
                        <el-select v-model="searchData.status" placeholder="请选择产品状态">
                            <el-option label="开启" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </search>

        <!-- 服务列表 -->
        <div class="service-list">
            <div class="list-title">
                <i class="el-icon-tickets"> 服务列表</i>
            </div>
            <div class="list-table">
                <el-table :data="serviceList" border header-row-class-name="list-head">
                    <el-table-column prop="apiCode" label="产品编码" min-width="240"></el-table-column>
                    <el-table-column prop="apiName" label="产品名称" min-width="180"></el-table-column>
                    <el-table-column prop="signType" label="签约类型" min-width="180"></el-table-column>
                    <el-table-column prop="signNum" label="签约次数" min-width="120"></el-table-column>
                    <el-table-column prop="useNum" label="已使用次数" min-width="120"></el-table-column>
                    <el-table-column prop="status" label="产品状态" min-width="180"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" min-width="240"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/common/Search';
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
export default {
  data() {
    return {
      searchData: {},
      serviceList: [],
      productNameObj: []
    };
  },
  mounted() {
    // 初始化获取产品列表
    this.responseAPI({});
    api.post(config.product.all, {}).then(response => {
      let resObj = response.data;
      if (Number(resObj.resCode) === 200) {
        resObj.lists.forEach(value => {
          this.productNameObj.push({
            apiCode: value.apiCode,
            apiName: value.apiName
          });
        });
      }
    });
  },
  components: {
    Search
  },
  methods: {
    searchResult() {
      this.responseAPI(this.searchData);
    },
    searchReset() {
        this.searchData = {};
    },
    responseAPI(data) {
      api.post(config.product.list, data).then(response => {
        let resObj = response.data;
        if (Number(resObj.resCode) === 200) {
          this.serviceList = [];
          resObj.lists.forEach(value => {
            value.signType === '2'
              ? (value.signType = '后付费')
              : (value.signType = '预付费');
            value.status === '1'
              ? (value.status = '启用')
              : (value.status = '禁用');
            value.createTime = parseTime(value.createTime);
            this.serviceList.push(value);
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.service {
  text-align: left;
  padding: 0 20px;
  font-family: 'Arial Normal', 'Arial';
  .list-title {
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
  }
  .list-table {
    background-color: #ffffff;
    border: 1px solid rgba(228, 228, 228, 1);
    padding: 15px 10px;
  }
}
</style>

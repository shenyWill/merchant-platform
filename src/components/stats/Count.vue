<template>
    <div class="count">
        <h4 class="count-title">调用明细</h4>
        <search @searchResult="searchResult" @searchReset="searchReset">
            <div slot="search-form">
                <el-form :inline="true" :model="searchData" class="search-form">
                    <el-form-item label="产品名称" class="search-item">
                        <el-select v-model="searchData.apiCode" placeholder="请选择产品名称">
                            <el-option :label="item.apiName" :value="item.apiCode" v-for="item in productList" :key="item.apiCode"></el-option>
                            <el-option label="全部" value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="　Apikey" class="search-item">
                        <el-input v-model="searchData.apiKey" placeholder="请输入apiKey"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间" class="search-item">
                        <el-time-picker v-model="searchData.startDate" placeholder="请选择时间"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" class="search-item">
                        <el-time-picker v-model="searchData.endDate" placeholder="请选择日期"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="选择日期" class="search-item">
                        <el-date-picker v-model="searchData.tableSuffix" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="商户流水" class="search-item">
                        <el-input v-model="searchData.merTradeNo" placeholder="请输入商户流水"></el-input>
                    </el-form-item>
                    <el-form-item label="平台流水" class="search-item">
                        <el-input v-model="searchData.platTradeNo" placeholder="请输入平台流水"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </search>
        <!-- 明细列表 -->
        <div class="count-list">
            <div class="list-title">
                <i class="el-icon-tickets"> 明细列表</i>
            </div>
            <div class="list-table">
                <el-table :data="countList" border header-row-class-name="list-head">
                    <el-table-column prop="apiCode" label="产品编码" min-width="260"></el-table-column>
                    <el-table-column prop="apiKey" label="apiKey" min-width="270"></el-table-column>
                    <el-table-column prop="apiName" label="产品名称" min-width="100"></el-table-column>
                    <el-table-column prop="appName" label="应用名称" min-width="100"></el-table-column>
                    <el-table-column prop="merTradeNo" label="商户流水" min-width="220"></el-table-column>
                    <el-table-column prop="platTradeNo" label="平台流水" min-width="270"></el-table-column>
                    <el-table-column prop="queryResult" label="查询结果" min-width="80"></el-table-column>
                    <el-table-column prop="elapsedTime" label="耗时" min-width="80"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" min-width="180"></el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="list-pager">
                    <el-pagination background layout="prev,pager,next" :total="500"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/common/Search';
import config from '@/config';
import api from '@/api';
import { parseTime } from '@/utils';
export default {
  components: {
    Search
  },
  data() {
    return {
      searchData: {},
      countList: [],
      productList: [] // 产品列表
    };
  },
  methods: {
    async responseAPI(data) {
      const response = await api.post(config.stat.page, data);
      let resObj = response.data;
      this.countList = [];
      if (Number(resObj.resCode) === 200) {
        this.countList = [...resObj.lists];
        this.countList.forEach(value => {
          value.createTime = parseTime(value.createTime);
        });
      }
    },
    // 获取产品列表
    async getProductList() {
      const response = await api.post(config.product.list, {});
      let resObj = response.data;
      resObj.lists.forEach(value => {
        this.productList.push({
          apiCode: value.apiCode,
          apiName: value.apiName
        });
      });
    },
    // 查询结果
    searchResult() {
        if (this.searchData.startDate && !this.searchData.endDate) {
        this.$message({
          message: '请输入结束时间！',
          type: 'error'
        });
        return;
      }
      if (this.searchData.endDate && !this.searchData.startDate) {
        this.$message({
          message: '请输入开始时间！',
          type: 'error'
        });
        return;
      }
      if (
        Date.parse(this.searchData.endDate) <
        Date.parse(this.searchData.startDate)
      ) {
        this.$message({
          message: '结束时间不能晚于开始时间！',
          type: 'error'
        });
        return;
      }
      let resObj = {...this.searchData};
        resObj.startDate = parseTime(resObj.startDate);
        resObj.endDate = parseTime(resObj.endDate);
        resObj.tableSuffix = parseTime(resObj.tableSuffix);
        this.responseAPI(resObj);
    },
    // 重置
    searchReset() {
        this.searchData = {};
    }
  },
  mounted() {
    this.responseAPI({});
    this.getProductList();
  }
};
</script>

<style lang="scss" scoped>
.count {
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
  .list-pager {
    margin-top: 20px;
    text-align: center;
  }
}
</style>


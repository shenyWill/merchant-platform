<template>
    <div class="count">
        <h4 class="count-title">调用统计</h4>
        <search>
            <div slot="search-form">
                <el-form :inline="true" :model="searchData" class="search-form">
                    <el-form-item label="产品名称" class="search-item">
                        <el-select v-model="searchData.productName" placeholder="请选择产品名称">
                            <el-option label="产品一" value="1"></el-option>
                            <el-option label="产品二" value="2"></el-option>
                            <el-option label="全部" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="　Apikey" class="search-item">
                        <el-input v-model="searchData.apikey" placeholder="请输入apikey"></el-input>
                    </el-form-item>
                    <el-form-item label="开始日期" class="search-item">
                        <el-date-picker v-model="searchData.startDate" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" class="search-item">
                        <el-date-picker v-model="searchData.endDate" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="商户流水" class="search-item">
                        <el-input v-model="searchData.merchantStream" placeholder="请输入商户流水"></el-input>
                    </el-form-item>
                    <el-form-item label="平台流水" class="search-item">
                        <el-input v-model="searchData.platFormStream" placeholder="请输入平台流水"></el-input>
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
                    <el-table-column prop="code" label="产品编码" width="120"></el-table-column>
                    <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
                    <el-table-column prop="appname" label="应用名称" width="120"></el-table-column>
                    <el-table-column prop="merchantStream" label="商户流水" width="180"></el-table-column>
                    <el-table-column prop="platformStream" label="平台流水" width="180"></el-table-column>
                    <el-table-column prop="result" label="查询结果" width="180"></el-table-column>
                    <el-table-column prop="usetime" label="耗时" width="180"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
// import config from '@/config';
// import api from '@/api';
// import { parseTime } from '@/utils';
export default {
  components: {
    Search
  },
  data() {
    return {
      searchData: {},
      countList: [
        {
          code: 'PC20161616',
          name: 'OCR识别',
          appname: '牛的一批',
          merchantStream: 'SH201614045668',
          platformStream: 'PT2016140415668',
          result: '识别成功',
          usetime: '300MS',
          createTime: '2018-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          appname: '牛的一批',
          merchantStream: 'SH201614045668',
          platformStream: 'PT2016140415668',
          result: '识别成功',
          usetime: '300MS',
          createTime: '2018-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          appname: '牛的一批',
          merchantStream: 'SH201614045668',
          platformStream: 'PT2016140415668',
          result: '识别成功',
          usetime: '300MS',
          createTime: '2018-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          appname: '牛的一批',
          merchantStream: 'SH201614045668',
          platformStream: 'PT2016140415668',
          result: '识别成功',
          usetime: '300MS',
          createTime: '2018-06-19'
        }
      ]
    };
  },
  methods: {
      responseAPI() {
        //   const response = api.post(config.stat.page, {});
        //   let resObj = response.data;
        //   if(resObj.)
      }
  },
  mounted() {
      this.responseAPI();
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


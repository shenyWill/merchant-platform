<template>
    <div class="service">
        <h4 class="service-title">产品服务</h4>
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
                    <el-form-item label="产品状态" class="search-item">
                        <el-select v-model="searchData.productStatus" placeholder="请选择产品状态">
                            <el-option label="开启" value="1"></el-option>
                            <el-option label="禁用" value="2"></el-option>
                            <el-option label="审核中" value="2"></el-option>
                            <el-option label="审核拒绝" value="2"></el-option>
                            <el-option label="全部" value="2"></el-option>
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
                    <el-table-column prop="code" label="产品编码" width="180"></el-table-column>
                    <el-table-column prop="name" label="产品名称" width="180"></el-table-column>
                    <el-table-column prop="type" label="签约类型" width="180"></el-table-column>
                    <el-table-column prop="number" label="签约次数" width="180"></el-table-column>
                    <el-table-column prop="useNumber" label="已使用次数" width="180"></el-table-column>
                    <el-table-column prop="status" label="产品状态" width="180"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/common/Search';
export default {
  data() {
    return {
      searchData: {},
      serviceList: [
        {
          code: 'PC20161616',
          name: 'OCR识别',
          type: '预付费',
          number: '20000',
          useNumber: '10000',
          status: '启用',
          createTime: '218-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          type: '预付费',
          number: '20000',
          useNumber: '10000',
          status: '启用',
          createTime: '218-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          type: '预付费',
          number: '20000',
          useNumber: '10000',
          status: '启用',
          createTime: '218-06-19'
        },
        {
          code: 'PC20161616',
          name: 'OCR识别',
          type: '预付费',
          number: '20000',
          useNumber: '10000',
          status: '启用',
          createTime: '218-06-19'
        }
      ]
    };
  },
  components: {
    Search
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

<template>
    <div class="service">
        <h4 class="service-title">产品服务</h4>
        <!-- 搜索查询 -->
        <div class="service-search">
            <div class="search-title">
                <span class="search-title-icon">
                    <i class="el-icon-zoom-in"> 筛选查询</i>
                </span>
                <span class="search-title-filter" @click="searchShow">
                    <i class="el-icon-arrow-up" v-show="searchToggle"> 收起筛选</i>
                    <i class="el-icon-arrow-down" v-show="!searchToggle"> 展开筛选</i>
                </span>
                <span class="search-title-result">查询结果</span>
            </div>
            <div class="search-table">
                <el-form :inline="true" :model="searchData" class="search-form">
                    <el-form-item label="产品名称">
                        <el-select v-model="searchData.productName" placeholder="请选择产品名称">
                            <el-option label="产品一" value="1"></el-option>
                            <el-option label="产品二" value="2"></el-option>
                            <el-option label="全部" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品状态">
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
        </div>
        <!-- 服务列表 -->
        <div class="service-list">
            <div class="list-title">
                 <i class="el-icon-tickets"> 服务列表</i>
            </div>
            <div class="list-table">
                <el-table :data="serviceList" border>
                    <el-table-column prop="code" label="产品编码" width="180"></el-table-column>
                    <el-table-column prop="name" label="产品名称" width="180"></el-table-column>
                    <el-table-column prop="type" label="签约类型" width="180"></el-table-column>
                    <el-table-column prop="number" label="签约次数" width="180"></el-table-column>
                    <el-table-column prop="useNumber" label="已使用次数" width="180"></el-table-column>
                    <el-table-column prop="status" label="产品状态" width="180"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {},
      searchToggle: true,
      serviceList: [
          {
            code: 'PC20161616',
            name: 'OCR识别',
            type: '预付费',
            number: '20000',
            useNumber: '10000',
            status: '启用',
            'createTime': '218-06-19'
          },
          {
            code: 'PC20161616',
            name: 'OCR识别',
            type: '预付费',
            number: '20000',
            useNumber: '10000',
            status: '启用',
            'createTime': '218-06-19'
          },
          {
            code: 'PC20161616',
            name: 'OCR识别',
            type: '预付费',
            number: '20000',
            useNumber: '10000',
            status: '启用',
            'createTime': '218-06-19'
          },
          {
            code: 'PC20161616',
            name: 'OCR识别',
            type: '预付费',
            number: '20000',
            useNumber: '10000',
            status: '启用',
            'createTime': '218-06-19'
          }
      ]
    };
  },
  methods: {
    searchShow() {
      if (this.searchToggle) {
        this.searchToggle = false;
        $('.search-table').slideUp(500);
      } else {
        this.searchToggle = true;
        $('.search-table').slideDown(500);
      }
    }
  }
};
</script>



<style lang="scss" scoped>
.service {
  text-align: left;
  padding: 0 20px;
  font-family: 'Arial Normal', 'Arial';
  .service-search {
      margin-bottom: 20px;
  }
  .search-title,.list-title {
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
  .search-title-filter {
    position: absolute;
    right: 120px;
    cursor: pointer;
    font-size: 14px;
  }
  .search-title-result {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 14px;
    display: block;
    height: 30px;
    width: 88px;
    background-color: #ffffff;
    color: #333333;
    text-align: center;
    line-height: 30px;
    top: 10px;
  }
  .search-table {
    height: 65px;
    color: #666666;
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 10px;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .list-table {
      background-color: #ffffff;
      border: 1px solid rgba(228, 228, 228, 1);
      padding: 15px 10px;
  }
}
</style>

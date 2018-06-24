<template>
  <div class="detail">
    <h4 class="detail-title">调用明细</h4>
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
            <el-input v-model="searchData.apiKey" placeholder="请输入apikey"></el-input>
          </el-form-item>
          <el-form-item label="开始日期" class="search-item">
            <el-date-picker v-model="searchData.startDate" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" class="search-item">
            <el-date-picker v-model="searchData.endDate" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </search>

    <!-- 折线图 -->
    <div class="detail-chart">
      <div class="chart-title">
        <span class="chart-title-detail">调用曲线图</span>
        <ul class="chart-nav">
          <li class="chart-list active" @click="checkoutDate('day')">当天</li>
          <li class="chart-list" @click="checkoutDate('week')">本周</li>
          <li class="chart-list" @click="checkoutDate('month')">本月</li>
          <li class="chart-list" @click="checkoutDate('upmonth')">上月</li>
          <li class="chart-list" @click="checkoutDate('year')">本年</li>
        </ul>
      </div>
      <div id='chart-line' class='chart-line'></div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/common/Search';
import config from '@/config';
import api from '@/api';
import { parseTime } from '@/utils';
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default {
  components: {
    Search
  },
  data() {
    return {
      searchData: {},
      clickName: 'day',
      productList: [], // 产品列表
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['不计费次数', '计费次数', '总次数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '不计费次数',
            type: 'line',
            stack: '总量',
            data: [],
            smooth: true
          },
          {
            name: '计费次数',
            type: 'line',
            stack: '总量',
            data: [],
            smooth: true
          },
          {
            name: '总次数',
            type: 'line',
            stack: '总量',
            data: [],
            smooth: true
          }
        ]
      }
    };
  },
  methods: {
    // 画折线图
    drawLine() {
      let myChart = echarts.init(document.getElementById('chart-line'));
      myChart.setOption(this.option);
    },
    async responseAPI(url, data) {
      const response = await api.post(url, data);
      let resObj = response.data;
      this.option.xAxis.data = [];
      this.option.series.forEach(value => (value.data = []));
      resObj.lists.forEach(value => {
        this.option.xAxis.data.push(value.datestr);
        this.option.series[0].data.push(value.invalid);
        this.option.series[1].data.push(value.valid);
        this.option.series[2].data.push(value.count);
      });
      this.drawLine();
    },
    // 查看不同日期统计
    async checkoutDate(uname) {
      $('.chart-list').removeClass('active');
      $(event.target).addClass('active');
      this.searchData = {};
      this.clickName = uname;
      let url = config.stat[uname];
      this.responseAPI(url, {});
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
      if (this.searchData.startDate && this.searchData.startDate) {
        this.searchData.startDate = parseTime(this.searchData.startDate);
        this.searchData.endDate = parseTime(this.searchData.endDate);
        this.responseAPI(config.stat.searchDay, this.searchData);
      } else {
        this.responseAPI(config.stat[this.clickName], this.searchData);
      }
    },
    searchReset() {
      this.searchData = {};
    }
  },
  mounted() {
    this.responseAPI(config.stat.day, {});
    this.getProductList();
  }
};
</script>

<style lang="scss" scoped>
.detail {
  text-align: left;
  padding: 0 20px;
  font-family: 'Arial Normal', 'Arial';
  .chart-title {
    background-color: #f2f2f2;
    height: 49px;
    position: relative;
    overflow: hidden;
    line-height: 49px;
    color: #666666;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding-left: 5px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .chart-nav {
    position: absolute;
    width: 420px;
    border: 1px solid #e4e4e4;
    height: 30px;
    right: 10px;
    top: 8px;
    overflow: hidden;
  }
  .chart-list {
    height: 100%;
    line-height: 30px;
    float: left;
    width: 84px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    color: #999999;
    background-color: #f4f7fa;
    border-right: 1px solid #e4e4e4;
    &:last-child {
      border-right: 0;
    }
    &:hover {
      color: #666666;
    }
    &.active {
      color: #1abc9c;
      background-color: #ffffff;
    }
  }
  .chart-line {
    height: 325px;
    width: 80%;
    margin: 0 auto;
  }
}
</style>

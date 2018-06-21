<template>
  <div class="detail">
    <h4 class="detail-title">调用明细</h4>
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
        </el-form>
      </div>
    </search>

    <!-- 折线图 -->
    <div class="detail-chart">
      <div class="chart-title">
        <span class="chart-title-detail">调用曲线图</span>
        <ul class="chart-nav">
          <li class="chart-list active">当天</li>
          <li class="chart-list">本周</li>
          <li class="chart-list">本月</li>
          <li class="chart-list">上月</li>
          <li class="chart-list">本年</li>
        </ul>
      </div>
      <div id='chart-line' class='chart-line'></div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/common/Search';
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '不计费次数',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true
          },
          {
            name: '计费次数',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true
          },
          {
            name: '总次数',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
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
    }
  },
  mounted() {
    this.drawLine();
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

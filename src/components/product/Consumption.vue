<template>
    <div class='consumption'>
        <h1 class='consumption-title'>用量概览</h1>
        <ul class='consumption-list'>
            <li class='consumption-check active'>当天</li>
            <li class='consumption-check'>本周</li>
            <li class='consumption-check'>本月</li>
            <li class='consumption-check'>上月</li>
            <li class='consumption-check'>本年</li>
        </ul>
        <div id='consumption-line' class='consumption-line'></div>
        <p class='consumption-totle'>
            总次数：99次
        </p>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default {
  data() {
    return {
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
      let myChart = echarts.init(document.getElementById('consumption-line'));
      console.log(this.option)
      myChart.setOption(this.option);
    }
  },
  mounted(){
      this.drawLine()
  }
}
</script>

<style lang='scss' scoped>
@mixin border-left {
    border-left: 1px solid #888888;
}
@mixin border {
    border: 1px solid #888888;
}
.consumption {
    width: 100%;
    overflow: hidden;
    text-align: left;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 17px;
    .consumption-line {
        height: 325px;
        width: 80%;
        margin: 0 auto;
    }
    .consumption-title {
        margin-top: 18px;
        margin-left: 24px;
        font-size: 20px;
        color: #414141;
    }
    .consumption-list {
        list-style: none;
        overflow: hidden;
        border-radius: 4px;
        width: 400px;
        height: 28px;
        line-height: 28px;
        @include border;
        padding: 0;
        cursor: pointer;
        margin-top: 0;
        position: relative;
        left: 66%;
    }
    .consumption-check {
        float: left;
        height: 28px;
        width: 80px;
        text-align: center;
        box-sizing: border-box;
        @include border-left;
        &:first-child {
            border-left: 0;
        }
        &.active {
            background-color: #548faa;
        }
    }
    .consumption-totle {
        text-align: center;
    }
}
</style>

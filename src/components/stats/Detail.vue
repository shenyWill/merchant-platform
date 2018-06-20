<template>
  <div class="stats-detail">
    <div class="stats-detail__search">
      <el-form
        v-model="searchForm"
        >
      </el-form>
    </div>
    <div class="stats-detail__table">
      <el-table
        :header-cell-style="tableHeaderStyle"
        v-if="tableData && tableData.length"
        :data="tableData"
        border
        stripe
        >
        <el-table-column
          prop="id"
          label="序号"
          width="">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="应用名称"
          width="">
        </el-table-column>
        <el-table-column
          prop="requestID"
          label="请求批次号"
          width="">
        </el-table-column>
        <el-table-column
          prop="result"
          label="查询结果"
          width="">
        </el-table-column>
        <el-table-column
          prop="queryTime"
          label="查询时间"
          width="">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          >
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsDetail',
  data () {
    return {
      tableHeaderStyle: {
        border: '1px solid lightgray',
        backgroundColor: '#00a8ec',
        color: 'black',
        fontSize: '16px'
      },
      tableData: null,
      response: null,
      searchForm: {
      }
    };
  },
  methods: {
    handleDetail (row) {
    },
    fetchList () {
      try {
        const data = [{
          id: 0,
          productName: 'name',
          appName: 'app',
          requestID: 'request',
          result: 'result',
          queryTime: 'query'
        }, {
          id: 1,
          productName: 'name',
          appName: 'app',
          requestID: 'request',
          result: 'result',
          queryTime: 'query'
        }];

        return data;
      } catch (error) {
        return error;
      }
    }
  },
  created () {
    this.tableData = this.fetchList();
  }
};
</script>

<style>
.stats-detail {
  background-color: white;
  padding: 20px;
}
.stats-detail__table {
  margin: 20px;
}
.stats-detail__table .el-table th {
  text-align: center;
}
</style>

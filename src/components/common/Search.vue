<template>
    <!-- 搜索查询 -->
    <div class="search">
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
            <slot name="search-form"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchToggle: true
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
.search {
  margin-bottom: 20px;
  min-width: 900px;
  .search-title {
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
    color: #666666;
    font-size: 14px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 10px;
    box-sizing: border-box;
    padding-top: 10px;
  }
}
</style>

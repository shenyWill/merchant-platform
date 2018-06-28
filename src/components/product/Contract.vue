<template>
  <div class="contract">
    <h1 class="contract-title">签约产品({{productList.length}})</h1>
    <div class="contract-product">
      <p class="contract-product-detail" v-for="item in productList" :key="item.id">
        <img src="@/assets/images/product-detail-icon.png" alt="">
        <span class="detail-name">产品名称：{{item.apiName}}</span>
        <span class="detail-time">申请时间：{{item.createTime}}</span>
        <span class="detail-num">签约次数：{{item.signNum}}</span>
        <span class="detail-num">状　　态：{{item.status == 1 ? '启用' : '禁用'}}</span>
        <span class="detail-see" @click="showDetail(item)">查看详情</span>
      </p>
    </div>
    <!-- 查看详情弹出框 -->
    <el-dialog title="产品详情" :visible.sync="detailDialog" class="detail-dialog" :lock-scroll="false">
      <ul class="detai-nav">
        <li class="detail-list"><span class="detail-list-key">产品编码</span><span class="detail-list-value">{{detailObj.apiCode}}</span></li>
        <li class="detail-list"><span class="detail-list-key">产品名称</span><span class="detail-list-value">{{detailObj.apiName}}</span></li>
        <li class="detail-list"><span class="detail-list-key">签约次数</span><span class="detail-list-value">{{detailObj.signNum}}</span></li>
        <li class="detail-list"><span class="detail-list-key">已使用次数</span><span class="detail-list-value">{{detailObj.useNum}}</span></li>
        <li class="detail-list"><span class="detail-list-key">状态</span><span class="detail-list-value">{{detailObj.status}}</span></li>
        <li class="detail-list"><span class="detail-list-key">创建时间</span><span class="detail-list-value">{{detailObj.createTime}}</span></li>
        <li class="detail-list" v-if="detailObj.updateTime ? true : false"><span class="detail-list-key">更新时间</span><span class="detail-list-value">{{detailObj.updateTime}}</span></li>
        <li class="detail-list"><span class="detail-list-key">已绑定应用</span><span class="detail-list-value" v-for="item in detailObj.appArr" :key="item">{{item}}</span></li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config';
import api from '@/api';
import { parseTime } from '@/utils';
export default {
  data() {
    return {
      productList: [], // 产品列表
      detailObj: {}, // 详情信息
      detailDialog: false // 详情弹出框
    };
  },
  methods: {
    // 获取产品列表
    async getProductList() {
      const response = await api.post(config.product.list, {});
      let resObj = response.data;
      this.productList = [...resObj.lists];
      this.productList.forEach(value => {
        value.createTime = parseTime(value.createTime);
        value.updateTime = parseTime(value.updateTime);
      });
    },
    // 查看详情
    async showDetail(detail) {
      const response = await api.post(config.product.applist, {apiCode: detail.apiCode});
      let resObj = response.data;
      this.detailObj = {...detail};
      this.detailObj.appArr = [];
      Number(this.detailObj.status) === 1 ? this.detailObj.status = '启用' : this.detailObj.status = '禁用';
      resObj.lists.forEach(value => {
        this.detailObj.appArr.push(value.apiName);
      });
      this.detailDialog = true;
    }
  },
  mounted() {
    this.getProductList();
  }
};
</script>

<style lang="scss" scoped>
.contract {
  background-color: #ffffff;
  overflow: hidden;
  text-align: left;
  .contract-title {
    font-size: 20px;
    color: #414141;
    margin-top: 19px;
    margin-left: 25px;
  }
  .contract-product {
    margin-left: 67px;
    overflow: hidden;
  }
  .contract-product-detail {
    height: 210px;
    width: 356px;
    background-color: #e9f6fc;
    float: left;
    border-radius: 5px;
    margin-right: 35px;
    position: relative;
    img {
      width: 79px;
      height: 79px;
      top: 29px;
      left: 27px;
      position: absolute;
    }
    span {
      display: block;
      margin-left: 133px;
      margin-bottom: 13px;
      color: #000000;
      font-size: 13px;
    }
    .detail-name {
      margin-top: 35px;
      font-size: 20px;
      color: #414141;
      font-weight: bold;
    }
    .detail-see {
      color: #fb6b6b;
      font-size: 15px;
      position: absolute;
      bottom: 0;
      right: 25px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .detail-dialog {
    min-width: 1000px;
  }
  .detai-nav {
    border: 1px solid #666666;
    min-width: 600px;
  }
  .detail-list {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid #666666;
    &:last-child {
      border-bottom: 0;
    }
  }
  .detail-list-key {
    width: 15%;
    display: inline-block;
    border-right: 1px solid #666666;
    text-indent: 10px;
    color: #000000;
  }
  .detail-list-value {
    text-indent: 10px;
    display: inline-block;
  }
}
</style>

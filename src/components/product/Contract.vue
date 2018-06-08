<template>
    <div class="contract">
        <h1 class="contract-title">签约产品(3)</h1>
        <div class="contract-product">
            <p class="contract-product-detail">
                <img src="@/assets/images/product-detail-icon.png" alt="">
                <span class="detail-name">产品名称：人脸对比</span>
                <span class="detail-time">申请时间：2018-06-15</span>
                <span class="detail-num">签约次数：10000</span>
                <span class="detail-see">查看详情</span>
            </p>
            <p class="contract-product-detail">
                <img src="@/assets/images/product-detail-icon.png" alt="">
                <span class="detail-name">产品名称：人脸对比</span>
                <span class="detail-time">申请时间：2018-06-15</span>
                <span class="detail-num">签约次数：10000</span>
                <span class="detail-see">查看详情</span>
            </p>
            <p class="contract-product-detail">
                <img src="@/assets/images/product-detail-icon.png" alt="">
                <span class="detail-name">产品名称：人脸对比</span>
                <span class="detail-time">申请时间：2018-06-15</span>
                <span class="detail-num">签约次数：10000</span>
                <span class="detail-see">查看详情</span>
            </p>
            <p class="contract-product-detail">
                <img src="@/assets/images/product-detail-icon.png" alt="">
                <span class="detail-name">产品名称：人脸对比</span>
                <span class="detail-time">申请时间：2018-06-15</span>
                <span class="detail-num">签约次数：10000</span>
                <span class="detail-see">查看详情</span>
            </p>
            
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.contract {
    background-color: #ffffff;
    overflow: hidden;
    text-align: left;
    .contract-title{
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
        height: 190px;
        width: 356px;
        background-color: #e9f6fc;
        float: left;
        border-radius: 5px;
        margin-right: 74px;
        position: relative;
        &:nth-child(3n) {
            margin-right: 0;
        }
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
}
</style>

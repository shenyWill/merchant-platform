<template>
    <div class="application">
        <el-button type="primary" class="add-btn">+ 新建应用</el-button>
        <el-table :data="appTableData" border class="app-table" row-class-name="app-table-tr" >
            <el-table-column prop="id" label="序号" width="180" align="center"></el-table-column>
            <el-table-column prop="name" label="应用名称" width="180" align="center"></el-table-column>
            <el-table-column prop="APIKey" label="API Key" width="180" align="center"></el-table-column>
            <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
            <!-- 状态 -->
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.switch"></el-switch>
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span @click="handleEdit(scope.$index,scope.row)">编辑</span>
                    <span>查看</span>
                    <span>绑定产品</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss">
.application .app-table .app-table-tr:nth-of-type(2n) {
    background: #eeeff6;
}
</style>

<script>
export default {
    data() {
        return {
            appTableData: [
                {
                    id: 1,
                    name: '人脸比对',
                    APIKey: 'dasdasdasasasdwdqr',
                    type: '社交',
                    createTime: '2018-06-05',
                    switch: true
                },
                {
                    id: 2,
                    name: '人脸检测',
                    APIKey: 'werterwgwerh',
                    type: '移动支付',
                    createTime: '2018-06-05',
                    switch: true
                },
                {
                    id: 3,
                    name: '活体检测',
                    APIKey: 'werterwgwerh',
                    type: '娱乐',
                    createTime: '2018-06-05',
                    switch: false
                }
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
            // console.log(row)
        }
    }
};
</script>

<style lang="scss" scoped>
.application {
    text-align: left;
    background: #ffffff;
    padding: 43px 30px 30px 39px;
    .add-btn {
        margin-bottom: 26px;
    }
    .app-table {
        width: 100%;
    }
}
</style>

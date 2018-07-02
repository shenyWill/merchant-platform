<template>
  <div class="account__pane">
    <div class="account__pane-title">
      联系方式：
    </div>
    <el-row>
      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">
            联系人：
          </div>
          <div class="account__info-value">
            {{ data.contactName }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">
            联系电话：
          </div>
          <div class="account__info-value">
            {{ data.contactPhone }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="account__info">
          <div class="account__info-label">
            地址：
          </div>
          <div class="account__info-value">
            {{ data.detailAddress }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ContactsPane',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style>
</style>

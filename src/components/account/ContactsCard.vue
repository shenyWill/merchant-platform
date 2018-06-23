<template>
  <div class="account__contacts-card">
    <el-card class="account__collapse-card">
      <div slot="header" @click="toggleCard">
        联系方式：
        <i class="iconfont account__card-icon icon-user"></i>
      </div>
      <div :class="['account__collapse-contacts', isToggle ? 'height-zero' : '']">
        <el-row>
          <el-col :span="12">
            <div class="account__info">
              <div class="account__info-label">
                联系人：
              </div>
              <div class="account__info-user-value">
                {{ contactsInfo.contactName }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="account__info">
              <div class="account__info-label">
                联系电话：
              </div>
              <div class="account__info-user-value">
                {{ contactsInfo.contactPhone }}
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="account__info">
          <div class="account__info-label">
            地址：
          </div>
          <div class="account__info-user-value">
            {{ contactsInfo.detailAddress }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ContactsCard',
  props: {
    contactsInfo: {
      type: Object,
      default: () => {
        return {
        };
      }
    }
  },
  data () {
    return {
      isToggle: true
    };
  },
  methods: {
    toggleCard () {
      this.isToggle = !this.isToggle;
    }
  }
};
</script>

<style>
.account__collapse-contacts {
  height: 130px;
  transition: all .5s;
  overflow: hidden;
}
.height-zero {
  transition: all .5s;
  height: 0;
}
</style>

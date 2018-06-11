<template>
    <div class='operation'>
        <ul class='operation-nav'>
            <li class='operation-title'><i class="iconfont icon-zhiyin"></i> 操作指引</li>
            <li class='operation-list'>1、申请新产品</li>
            <li class='operation-list'>2、新建新应用</li>
            <li class='operation-list'>3、应用绑定产品</li>
            <li class='operation-list'>4、获取参数配置</li>
            <li class='operation-list'>5、API联调</li>
        </ul>
    </div>
</template>

<script>
export default {
  mounted() {
    let timeoutShow, timeoutHide;
    $('.operation-title,.operation-list').hover(
      function() {
        if ($(this).is('.operation-list')) {
          $(this).toggleClass('active-color');
        }
        (function operationListShow(i) {
          if (timeoutHide) {
            clearTimeout(timeoutHide);
          }
          timeoutShow = setTimeout(() => {
            if (i > 4) {
              return;
            }
            if (
              $('.operation-list')
                .eq(i)
                .not('.active')
            ) {
              $('.operation-list')
                .eq(i)
                .addClass('active');
            }
            i++;
            operationListShow(i);
          }, 100);
        })(0);
      },
      function() {
        if ($(this).is('.operation-list')) {
          $(this).toggleClass('active-color');
        }
        (function operationListHide(i) {
          if (timeoutShow) {
            clearTimeout(timeoutShow);
          }
          timeoutHide = setTimeout(() => {
            if (i > 4) {
              return;
            }
            $('.operation-list')
              .eq(4 - i)
              .removeClass('active');
            i++;
            operationListHide(i);
          }, 100);
        })(0);
      }
    );
  }
};
</script>


<style lang='scss' scoped>
.operation {
  position: fixed;
  width: 133px;
  height: 280px;
  right: 0;
  top: 200px;
  z-index: 999;
  .operation-nav {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    li {
      background-color: #384d57;
      color: #ffffff;
      margin-bottom: 1px;
      text-align: center;
    }
  }
  .operation-title {
    width: 133px;
    height: 43px;
    line-height: 43px;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 21px;
    i {
      position: absolute;
      left: 3px;
      top: 2px;
      font-size: 25px;
    }
  }
  .operation-list {
    padding: 14px 17px;
    font-size: 13px;
    transform: translateX(100%);
    transition: all 1s;
    &.active {
      transform: translateX(0);
    }
    &.active-color {
      background-color: #548faa;
    }
  }
}
</style>

<template>
  <div class="horizontal_info">
    <van-row class="borrow_message">
      <van-col span="8" class="borrow_message_title">{{ title }}</van-col>
      <van-col span="16" class="borrow_message_data">{{ value }}</van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "HorizontalInfo",
  props: { title: String, value: String },
  data() {
    return {};
  },
};
</script>
<style scoped>
.horizontal_info {
  width: 100%;
}
/* 借款信息栏 */
.borrow_message {
  padding-bottom: 15px;
  font-size: 28px;
}
.borrow_message_title {
  color: #999999;
}
.borrow_message_data {
  color: #333333;
  /* vertical-align: middle; */
  line-height: 40px;
  font-size: 28px;
}
</style>>


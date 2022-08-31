<template>
  <!-- 查询导航 -->
  <div class="search">
    <div class="left_input">
      <div class="field">
        <div class="field_value">
          <input type="text" placeholder="请输入借款客户名称" class="field_control" v-model="content.name" />
        </div>
      </div>
      <div class="field">
        <div class="field_value">
          <input type="text" placeholder="请输入担保客户名称" class="field_control" v-model="content.phone" />
        </div>
      </div>
    </div>
    <div class="right_search" @click="onSearch()">
      <img src="@/assets/images/khcx_cx_bg.png" />
      <p class="search_input">查询</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      content: {
        name: "",
        phone: ""
      }
    };
  },
  methods: {
    // 点击查询，向父组件传参
    onSearch() {
      this.$emit("content", this.content);
    }
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.search {
  width: 750px;
  background: white;
  padding: 24px;
  border-bottom: 1px rgba(220, 220, 220, 0.5) solid;
  height: 160px;
}
/* 左侧输入部分 */
.left_input {
  width: 500px;
  float: left;
  margin-right: 24px;
}
/* 右侧搜索部分 */
.right_search {
  position: relative;
  float: left;
  text-align: center;
  width: 178px;
}
.right_search img {
  width: 178px;
}
.search_input {
  position: absolute;
  width: 100%;
  top: 65px;
  font-size: 28px;
  color: white;
  text-align: center;
}
/* 输入框 */
.field {
  vertical-align: middle;
  width: 500px;
  height: 64px;
  text-align: center;
  background: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 24px;
}
.field_value {
  position: relative;
}
.field_control {
  margin-top:-2px;
  line-height:64px;
  font-size: 28px;
  position: absolute;
  left: 60px;
  text-align: center;
  background: none;
  border: none;
  border-radius: 20px;
  color: #333333;
  vertical-align: middle;
}
input::-webkit-input-placeholder {
  color: #bdbdbd;
}
</style>
<template>
  <!-- 搜索框 -->
  <div class="search">
    <div class="input_search">
      <img v-if="!searchContent" src="@/assets/images/search_icon.png" />
      <input
        class="search_ipt"
        placeholder="请输入借款客户姓名"
        v-model="searchContent"
        @keyup.enter="toQuery()"
        @input="vaidateEmoji"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSerch",
  components: {},
  props: {
    type: String //判断是已分配查询还是待分配查询
  },
  data() {
    return {
      searchContent: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 查询
    toQuery() {
      // if (this.searchContent) {
      this.$emit("toQuery", {
        type: this.type,
        searchContent: this.searchContent
      });
      // } else {
      //   this.$toast("请输入借款客户姓名");
      // }
    },
    //防止输入表情
    vaidateEmoji() {
      this.searchContent = this.searchContent.replace(
        /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,
        ""
      );
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  background: var(--color-Lightgray-bg);
  position: fixed;
  left: 0;
  z-index: 999;
  top: 180px;
}
.input_search {
  width: 100%;
  z-index: 99;
  display: flex;
  flex-direction: row;
  background: white;
  margin: 24px 0 0px 0;
  position: relative;
  box-sizing: border-box;
  padding: 24px;
  justify-content: space-between;
}
.input_search img {
  position: absolute;
  left: 28%;
  top: 46px;
  width: 30px;
  height: 30px;
}
.search_ipt {
  width: 100%;
  border: none;
  border-radius: 10px;
  height: 58px;
  text-align: center;
  padding: 6px 12px;
  background: #f1f1f1;
}
input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #bdbdbd;
}
.search_btn {
  color: white;
  border-radius: 10px;
  width: 100px;
  text-align: center;
  padding: 10px 20px;
  background: var(--color-orange-text);
}
</style>

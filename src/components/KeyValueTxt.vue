<template>
  <div class="keyValueTxt">
    <span>{{ title }}：</span> <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "KeyValueTxt",
  components: {},
  props: {},
  data() {
    return {};
  },
  props: {
    title: {
      default: "标题",
      type: String,
    },
    content: {
      default: "内容",
      type: String,
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.keyValueTxt {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 18px 24px 0 24px;
  font-size: 28px;
}
span:first-child {
  min-width: 200px;
  color: #a3a3a3;
}
span:last-child {
  word-wrap: break-word;
  word-break: break-all;
  color: #333333;
  width: 100%;
}
</style>

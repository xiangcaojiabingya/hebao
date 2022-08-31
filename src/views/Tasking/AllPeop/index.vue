<template>
  <!-- 人员选择 -->
  <div class="AllPeop">
    <item-nav-bar title="核保人员选择"></item-nav-bar>
    <!-- 搜索 -->
    <div class="top">
      <div class="search">
        <van-search v-model="value" background="#ffffff" placeholder="请输入姓名" @input="onSearch" />
      </div>
      
      <div class="content" v-if="show">
        <ul>
          <li v-for="(item, index) of items" :key="index" @click="back(item)">
            <span class="left">{{ item.HBUSERNAME }}</span>
            <span class="right">{{ item.ORGNAME }}</span>
          </li>
        </ul>
      </div>
      <div v-else class="fallContent">~暂无数据~</div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import eventBus from "@/utils/eventBus.js";
import { apiUrl, ajaxPost } from "@/api.js";
export default {
  name: "AllPeop",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      num: this.$route.query.num,
      name: this.$route.query.name,
      input: "",
      value: "",
      items: [],
      list: [],
      show: true,
      falShow: true,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    this.getData();
  },
  methods: {
    onSearch() {
      var name = this.value;
      this.getData();
    },
    back(item) {
      // 兄弟组件通信
      eventBus.$emit("chooseData", {
        num: this.num,
        text: item.HBUSERNAME,
        id: item.HBUSERID,
      });
      this.$router.go(-1);
    },
    getData() {
      var data = {
        USERID: localStorage.getItem("userId"),
        LOGINID: localStorage.getItem("empNo"),
        USERNAME: this.value,
      };
      var category = localStorage.getItem("category");
      if (category == "ls") {
        var api = apiUrl.queryLsUserList;
      } else {
        var api = apiUrl.queryPerson;
      }
      ajaxPost(api, data)
        .then((res) => {
          if (res.length == '0') {
            this.show = false;
          } else {
            this.show = true;
            this.items = res;
          }
          
          this.$toast.clear();
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
  },
};
</script>

<style scoped>
.AllPeop {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.top {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 92px;
}
.search {
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #fff;

}
.content {
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  font-size: 36px;
  position: relative;
  margin-top: 24px;
  flex-grow: 1;
}
.content ul {
  /* display: flex;
  justify-content: space-between; */
  font-size: 32px;
  margin: 0 20px;
  padding: 10px 0;
  line-height: 80px;
}
.content ul li {
  border-bottom: 1px solid var(--color-Lightgray-bg);
  height: 110px;
  line-height: 110px;
}
.content ul li .left {
  display: inline-block;
  min-width: 120px;
  font-size: 28px;
  color: #333333;
}
.content ul li .right {
  font-size: 28px;
  color: #999999;
}
.fallContent {
  margin: 0 auto;
  font-size: 28px;
  color: #333333;

}
</style>

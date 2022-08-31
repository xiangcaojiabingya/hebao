<template>
  <!-- 核保待办查询 -->
  <div class="content">
    <!-- 引入头部导航栏组件 -->
    <item-nav-bar title="核保待办查询"></item-nav-bar>
    <!-- 搜索栏 -->
    <div class="fixed">
      <search @content="getContent"></search>
    </div>
    <!-- 列表 -->
    <div class="substance" v-if="onshow">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onload"
          :finished-text="finished_text"
          loading-text="加载中"
          class="list"
        >
          <van-cell
            v-for="(item, index) in customerList"
            :key="index"
            class="card_main"
            @click="btn(item)"
          >
            <div class="card_head_left"></div>

            <div class="card_head">
              <!-- 借款客户名称 -->
              <div class="card_head_text">
                <span>{{ item.CUSTOMERNAME }}</span>
              </div>
              <!-- 任务状态 -->
              <div class="card_head_type">
                <span>{{ item.STATUSNAME }}</span>
              </div>
            </div>
            <div class="card_body">
              <div class="card_item">
                <div class="prompt">授信金额：</div>
                <div class="data">{{ item.BUSINESSSUM }}</div>
              </div>
              <!-- 判断是否是未分配状态，展示或不展示下列数据 -->
              <!-- <div class="undistributed" v-show="item.STATUSNAME != '未分配'"> -->
              <div class="undistributed">
                <div class="card_item">
                  <div class="prompt">担保客户：</div>
                  <div class="data">{{ item.GUARANTORNAME }}</div>
                </div>

                <div class="card_item">
                  <div class="prompt">担保金额：</div>
                  <div class="data">{{ item.GUARANTYSUM }}</div>
                </div>
                <div class="card_item">
                  <div class="prompt">担保类型：</div>
                  <div class="data">{{ item.GUARANTYTYPENAME }}</div>
                </div>
                <div class="card_item">
                  <div class="prompt">担保合同编号：</div>
                  <div class="data">{{ item.GCSERIALNO }}</div>
                </div>
              </div>
              <!-- 所有状态都有的数据 -->
              <div class="card_item">
                <div class="prompt">客户经理：</div>
                <div class="data">{{ item.INPUTUSERNAME }}</div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 未输入搜索条件 -->
    <div class="none" v-else>
      <div class="pic">
        <img src="@/assets/images/cx_qxy_pic.png" alt />
      </div>
      <div class="text">
        <span>请先输入您的搜索条件哦</span>
      </div>
    </div>
  </div>
</template>
<script>
// 导入查询头部

import { hideWebViewTitle } from "@/utils/mxapi.js";
import Search from "@/components/search.vue";
import ItemNavBar from "@/components/ItemNavBar.vue";
import { ajaxPost, apiUrl } from "@/api.js";

export default {
  name: "QueryUnderwriting",
  components: {
    // List,
    Search,
    ItemNavBar,
  },
  data() {
    return {
      // 列表数据
      customerList: [],
      type: this.$route.query.type,
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: "1",
      pageSize: "10",
      queryName: "",
      queryPhone: "",
      onshow: true, // 是否展示列表数据
      category: this.$route.query.category,
      permissions: this.$route.query.meauPermissions,
    };
  },
  methods: {
    // 接收查询组件点击事件参数
    getContent(data) {
      this.customerList = [];
      this.queryName = data.name;
      this.queryPhone = data.phone;
      if (data.name == "" && data.phone == "") {
        this.$toast("请至少输入一项搜索条件");
        this.onshow = false;
      } else {
        this.pageNum = "1";
        this.finished_text = "";
        this.getQuery();
        this.onshow = true;
      }
    },
    // 核保查询
    getQuery() {
      if (this.pageNum === "1") {
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
        });
      }
      var data = {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        STATUS: "undone",
        CUSTOMERNAME: this.queryName,
        GUARANTYNAME: this.queryPhone,
        PAGE: this.pageNum,
        PAGESIZE: this.pageSize,
      };
      var url = {};
      if (this.category == "zh") {
        url = apiUrl.zhCarryTaskList;
      } else {
        url = apiUrl.lsCarryTaskList;
      }
      ajaxPost(url, data)
        .then((res) => {
          this.$toast.clear();
          if (this.refreshing) {
            this.refreshing = false;
          }

          if (res != undefined) {
            if (this.pageNum === "1") {
              this.customerList = res;
            } else {
              this.customerList.push(...res);
            }
            // 加载状态
            this.loading = false;
            if (res.length >= this.pageSize) {
              this.pageNum++;
              this.finished = false;
            } else {
              this.finished = true;
            }
          } else {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
          }
          this.$toast.clear();
          if (this.customerList.length == 0) {
            this.finished = true;
            this.finished_text = "暂无数据";
          } else {
            if (this.finished) {
              this.finished_text = "没有更多了";
            }
          }
        })
        .catch((error) => {
          this.finished = true;
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.$toast.clear();
        });
    },
    // 上滑加载
    onload() {
      this.getQuery();
    },
    // 下拉刷新
    onRefresh() {
      this.customerList = [];
      this.pageNum = "1";
      this.finished = true;
      this.finished_text = "";
      this.loading = true;
      this.onload();
    },
    // 路由跳转
    // CUSTOMERTYPE  01 对公  03 个人
    //  DISPOSALDATE 日期处理
    btn(list) {
      if (this.category == "zh") {
        let date = list.DISPOSALDATE.split(" ")[0].replace(/\//g, "");
        list.DISPOSALDATE = date;
      } else {
        let date = list.DISPOSALDATE.substring(0, 8);
        list.DISPOSALDATE = date;
      }
      // 未完成个人
      if (list.CUSTOMERTYPE.slice(0, 2) == "03") {
        this.$router.push({
          path: "/retailCredit",
          query: {
            item: JSON.stringify(list),
            category: this.category,
            randomID: new Date().getTime(),
            category: this.category,
          },
        });
      }
      // 未完成公司
      else if (list.CUSTOMERTYPE.slice(0, 2) == "01") {
        this.$router.push({
          path: "/comprehensiveCredit",
          query: {
            item: JSON.stringify(list),
            category: this.category,
            randomID: new Date().getTime(),
            category: this.category,
          },
        });
      }
    },
  },
  mounted() {
    hideWebViewTitle();
  },
  created() {},
};
</script>
<style scoped>
.content {
  padding-top: 92px;
}
.list {
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  padding-top: 41px;
}

.card_main {
  background: #ffffff;
  background-size: 100% 100%;
  font-size: 28px;
  width: 100%;
  padding: 0;
  margin-bottom: 30px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}

.card_head {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}

.card_head_left {
  position: absolute;
  width: 6px;
  height: 30px;
  background-color: #14ccbd;
  top: 24px;
  left: 1px;
}

.card_head_text {
  position: absolute;
  /* float: left; */
  color: #333333;
  font-weight: 700;
  padding: 24px 0;
  /* line-height: 56px; */
}

.card_head_type {
  position: absolute;
  /* float: right; */
  color: #14ccbd;
  font-size: 24px;
  padding: 24px;
  right: 0;
}

.card_body {
  margin: 0 24px;
  margin-left: 12px;
  color: #333333;
  margin-bottom: 30px;
}
.card_item {
  display: flex;
  padding-top: 15px;
  padding-left: 12px;
  min-height: 43px;
  align-items: center;
}

.prompt {
  color: var(--color-gray-text);
  float: left;
  width: 35%;
}

.data {
  float: right;
  width: 65%;
}

.fixed {
  padding-top: 92px;
  position: fixed;
  top: 0;
  z-index: 99;
  background: #f5f6f7;
}

.none {
  position: fixed;
  top: 550px;
  text-align: center;
  width: 750px;
}

.pic {
  margin-bottom: 24px;
}

.pic img {
  width: 300px;
}

.text {
  font-size: 24px;
  color: #999999;
}

.substance {
  margin-top: 208px;
}
</style>

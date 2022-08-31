<template>
  <!--   任务分发页 -->
  <div class="taskDispatch">
    <item-nav-bar title="任务分配"></item-nav-bar>
    <!--  Tab标签 -->
    <van-tabs
      v-model="active"
      line-width="50%"
      sticky
      title-active-color="#ff6619"
      title-inactive-color="#737373"
      color="#ff6619"
      class="tabs_div"
      @change="tabChange"
    >
      <van-tab title="待分配">
        <!-- 搜索框 -->
        <input-search @toQuery="toQuery" type="dfa"></input-search>
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          class="list_vant"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finished_text"
            @load="onLoad"
          >
            <!-- 列表 -->
            <task-list
              :taskList="list"
              v-if="list.length > 0"
              @func="getlist"
            ></task-list>
          </van-list>
        </van-pull-refresh>
        <div class="dispatch_div">
          <span @click="toDispatch">去分配</span>
        </div>
      </van-tab>
      <van-tab title="已分配">
        <!-- 搜索框 -->
        <input-search @toQuery="toQuery" type="yfa"></input-search>
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          class="list_vant"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finished_text"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <!-- 列表 -->
            <task-list-done
              :taskList="list"
              v-if="list.length > 0"
              @function="getlist2"
            ></task-list-done>
          </van-list>
        </van-pull-refresh>
        <div class="dispatch_div">
          <span @click="toTaskRecover">任务收回</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import InputSearch from "./components/InputSearch.vue";
import ItemNavBar from "@/components/ItemNavBar.vue";
import TaskList from "./components/TaskList.vue";
import TaskListDone from "./components/TaskListDone.vue";
import { ajaxPost, apiUrl } from "@/api.js";

export default {
  name: "TaskDispatch",
  components: {
    InputSearch,
    ItemNavBar,
    TaskList,
    TaskListDone,
  },
  data() {
    return {
      active: 0,
      list: [],
      refreshing: false, //下拉刷新
      loading: false, //上拉加载
      finished: false, //加载完成，finished为true
      finished_text: "没有更多了",
      error: false,
      pageNum: "1", //页码
      pageSize: "10", //条数
      list2: [],
      tempList: [],
      category: localStorage.getItem("category"),
      status: "undone",
      TASKTYPE: "",
      GUARANTORNAME: [],
      RELATIVESERIALNO: "",
      SERIALNO: "",
      SERIALNO2: "",
      GUARANTORNAME2: "",
      RELATIVESERIALNO2: "",
      TASKTYPE2: "",
      item: {},
      searchContent: "", // 搜索条件
      queryType: "", // 判断待分配、已分配
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 输入客户姓名点击回车
    toQuery(data) {
      this.searchContent = data.searchContent;
      this.queryType = data.type;
      this.onRefresh();
    },
    // 去分配
    toDispatch() {
      let chooseList = [];
      this.list.forEach((element) => {
        if (element.children.length > 0) {
          element.children.forEach((item) => {
            if (item.childrenChecked) {
              this.item = element;
              chooseList.push(item);
            }
          });
        }
      });
      if (chooseList.length > 0) {
        this.$router.push({
          path: "/TaskDetail",
          query: {
            item: JSON.stringify(this.item),
            chooseList: JSON.stringify(chooseList),
            randomID: new Date().getTime(),
          },
        });
      } else {
        this.$dialog
          .alert({
            message: "请选择任务",
          })
          .then(() => {
            // on close
          });
      }
    },
    // 任务收回
    toTaskRecover() {
      let chooseList = [];
      this.list.forEach((element) => {
        if (element.children.length > 0) {
          element.children.forEach((item) => {
            if (item.childrenChecked) {
              this.item = element;
              chooseList.push(item);
            }
          });
        }
      });
      if (chooseList.length > 0) {
        this.$router.push({
          path: "/TaskDetailDone",
          query: {
            item: JSON.stringify(this.item),
            chooseList: JSON.stringify(chooseList),
            SERIALNO: this.SERIALNO2,
            RELATIVESERIALNO: this.RELATIVESERIALNO,
            GUARANTORNAME: this.GUARANTORNAME2,
            TASKTYPE: this.TASKTYPE2,
          },
        });
      } else {
        this.$dialog
          .alert({
            message: "请选择任务",
          })
          .then(() => {
            // on close
          });
      }
    },
    //加载
    onLoad() {
      this.getData();
    },
    
    //刷新
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.pageNum = "1";
      this.finished = true;
      this.finished_text = "";

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getData() {
      if (this.pageNum == "1") {
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
        });
      }
      var data = {
        USERID: localStorage.getItem("userId"),
        LOGINID: localStorage.getItem("empNo"),
        STATUS: this.status,
        PAGE: this.pageNum,
        PAGESIZE: this.pageSize,
      };
      if (this.queryType == "dfa" && this.status == "undone") {
        if (this.searchContent != "") {
          data.CUSTOMERNAME = this.searchContent;
        }
      } else if (this.queryType == "yfa" && this.status == "done") {
        if (this.searchContent != "") {
          data.CUSTOMERNAME = this.searchContent;
        }
      }

      if (this.category == "zh") {
        var api = apiUrl.queryzhCustomerList;
      } else {
        var api = apiUrl.querylsCustomerList;
      }
      ajaxPost(api, data)
        .then((res) => {
          this.disabled = false;
          this.list2 = [];
          this.tempList = res;
          res.forEach((item) => {
            this.list2.push({
              CUSTOMERNAME: item.CUSTOMERNAME,
              BUSINESSSUM: item.BUSINESSSUM,
              INPUTUSERNAME: item.INPUTUSERNAME,
              RELATIVESERIALNO: item.RELATIVESERIALNO,
              TASKTYPE: item.TASKTYPE,
              children: [],
            });
          });
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (res != undefined) {
            if (this.pageNum === "1") {
              this.list = this.list2;
            } else {
              this.list = [...this.list, ...this.list2];
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.tempList.length >= this.pageSize) {
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
          if (this.list.length == 0) {
            this.finished_text = "暂无数据";
          } else {
            this.finished_text = "没有更多了";
          }
        })
        .catch((err) => {
          this.disabled = true;
          this.finished = true;
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.$toast.clear();
        });
    },
    tabChange(name, title) {
      if (name == "0") {
        this.status = "undone";
        this.pageNum = "1";
        this.list = [];
        this.refreshing = true;
        this.finished_text = "";
        this.getData();
      } else {
        this.status = "done";
        this.pageNum = "1";
        this.list = [];
        this.refreshing = true;
        this.finished_text = "";
        this.getData();
      }
    },
    getlist(GUARANTORNAME, TASKTYPE, RELATIVESERIALNO, SERIALNO) {
      this.GUARANTORNAME = GUARANTORNAME;
      this.TASKTYPE = TASKTYPE;
      this.RELATIVESERIALNO = RELATIVESERIALNO;
      this.SERIALNO = SERIALNO;
    },
    getlist2(SERIALNO, GUARANTORNAME, RELATIVESERIALNO, TASKTYPE) {
      this.SERIALNO2 = SERIALNO;
      this.GUARANTORNAME2 = GUARANTORNAME;
      this.RELATIVESERIALNO2 = RELATIVESERIALNO;
      this.TASKTYPE2 = TASKTYPE;
    },
  },
};
</script>

<style scoped>
.taskDispatch {
  width: 100%;
  display: flex;
  font-size: 28px;
  background: var(--color-Lightgray-bg);
  flex-direction: column;
}
/* tab的样式 */
.tabs_div {
  position: fixed;
  left: 0;
  top: 92px;
  overflow: hidden;
  width: 100%;
  z-index: 99;
  height: 100%;
}
.list_vant {
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  bottom: 200px;
  top: 84px;
  left: 0;
  z-index: -1;
  margin-top: 150px;
}

/* 底部按钮 */
.dispatch_div {
  width: 100%;
  position: fixed;
  height: 120px;
  background: white;
  display: flex;
  left: 0;
  bottom: 0;
  border-top: 1px solid var(--color-Lightgray-bg);
}
.dispatch_div span {
  font-size: 32px;
  color: white;
  width: calc(100% - 48px);
  height: 80px;
  margin-left: 24px;
  margin-top: 20px;
  border-radius: 80px;
  text-align: center;
  line-height: 80px;
  background: var(--color-orange-selected);
}
</style>

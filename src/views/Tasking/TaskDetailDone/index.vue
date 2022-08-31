<template>
  <!-- 任务分发已完成 -->
  <div class="TaskDetal">
    <item-nav-bar title="任务分配"></item-nav-bar>
    <div class="first">
      <div class="one">
        <div class="top">{{ item.CUSTOMERNAME }}</div>
        <div class="content">
          <p>
            <span class="left">授信金额:</span>
            <span class="right">{{ item.BUSINESSSUM }}</span>
          </p>
          <p>
            <span class="left">客户经理:</span>
            <span class="right">{{ item.INPUTUSERNAME }}</span>
          </p>
          <p>
            <span class="left">担保人:</span>
            <span class="right">{{ this.GUARANTORNAME }}</span>
          </p>
        </div>
        <div class="first-right">已分配</div>
      </div>
    </div>
    <!-- 核保人员选择 -->
    <div class="second">
      <div class="second-top">
        <span>核保人员</span>
      </div>
      <div class="second-bottom">
        <ul v-for="(items, index) in peop" :key="index">
          <li>
            <div class="left">
              <span>核保人员</span>
            </div>
            <div class="right">
              <!-- <div v-if="items.num == '0'" >
                <span class="before">{{item.INPUTUSERNAME}}</span>
                <span class="after">{{items.refuse}}</span>
              </div>-->
              <div class="before">
                <span class="before">{{items.text}}</span>
                <span class="after">{{items.refuse}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bottom">
      <button class="btn" @click="take()">收回</button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import { ajaxPost, apiUrl } from "@/api.js";

export default {
  name: "TaskDetailDone",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      peop: [],
      category: localStorage.getItem("category"),
      SERIALNO: this.$route.query.SERIALNO,
      GUARANTORNAME: this.$route.query.GUARANTORNAME,
      RELATIVESERIALNO: this.$route.query.RELATIVESERIALNO,
      TASKTYPE: this.$route.query.TASKTYPE,
      item: JSON.parse(this.$route.query.item),
      chooseList: JSON.parse(this.$route.query.chooseList),
      takeArr: "",
      date: "",
      array: []
    };
  },
  computed: {},
  created() {
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner"
    });
    this.getTaskInfo();
    this.getImgData();
  },
  activated() {},
  mounted() {},
  watch: {},

  methods: {
    //任务详情
    getTaskInfo() {
      let data = {
        LOGINID: localStorage.getItem("empNo"), //工号
        USERID: localStorage.getItem("userId"), //信贷号
        SERIALNO: this.SERIALNO,
        TASKTYPE: this.TASKTYPE
      };

      let api;
      if (this.category == "zh") {
        // 综合
        api = apiUrl.zhTaskInfo;
      } else {
        // 零售
        api = apiUrl.lsTaskInfo;
      }
      ajaxPost(api, data)
        .then(res => {
          res.forEach(element => {
            var arr = element.USERLIST;
            arr.forEach(item => {
              this.peop.push({
                text: item.USERNAME,
                refuse: item.STATUSNAME
              });
            });
          });

          this.$toast.clear();
        })
        .catch(error => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //任务收回
    getTakeback() {
      let data = {
        LOGINID: localStorage.getItem("empNo"), //工号
        USERID: localStorage.getItem("userId"), //信贷号
        SERIALNO: this.SERIALNO
      };

      let api;
      if (this.category == "zh") {
        // 综合
        api = apiUrl.rusUser;
      } else {
        // 零售
        api = apiUrl.queryLsTakeback;
      }
      ajaxPost(api, data)
        .then(res => {
          res.forEach(element => {
            this.takeArr = element;
          });
          if (this.takeArr.RETURNCODE == "SUCCESS") {
            this.$dialog
              .alert({
                message: "收回成功"
              })
              .then(() => {
                this.$router.go(-1);
              });
          } else {
            this.$dialog
              .alert({
                message: "收回失败"
              })
              .then(() => {
                // on close
              });
          }
          this.$toast.clear();
        })
        .catch(error => {
          console.log(error);
          this.$toast.clear();
        });
    },
    take() {
      // 判断是否有已完成的
      let isSuccess = false;
      this.peop.forEach(element => {
        if (element.refuse == "已完成") {
          isSuccess = true;
        }
      });
      if (isSuccess) {
        this.$dialog
          .alert({
            message: "已开始核保，不可以收回！"
          })
          .then(() => {});
      } else {
        // 判断是否已经上传影像资料
        if (this.array.length != 0) {
          this.$dialog
            .alert({
              message: "已开始核保，不可以收回！"
            })
            .then(() => {});
        } else {
          this.getTakeback();
        }
      }
    },
    // 获取影像资料
    getImgData() {
      if (this.category == "ls") {
        this.chooseList.forEach(element => {
          this.date = element.DISPOSALDATE.substring(0, 8);
        });
      } else {
        this.chooseList.forEach(element => {
          this.date = element.DISPOSALDATE.split(" ")[0].replace(/\//g, "");
        });
      }

      let url;
      if (this.category == "zh") {
        url = apiUrl.zhQueryImg;
      } else {
        url = apiUrl.lsQueryImg;
      }
      ajaxPost(url, {
        inputDate: this.date,
        taskNo: this.SERIALNO
      })
        .then(res => {
          this.array = res.url;
          this.$toast.clear();
        })
        .catch(error => {
          this.$toast.clear();
        });
    }
  }
};
</script>

<style scoped>
.TaskDetal {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.first {
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  font-size: 36px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  padding-top: 92px;
}
.top {
  padding-top: 30px;
  color: var(--color-black-text);
  font-size: 32px;
  font-weight: bolder;
}
.one {
  margin-top: 20px;
  margin-left: 24px;
  margin-right: 24px;
  padding-bottom: 20px;
  position: relative;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.one:last-child {
  border-bottom: none;
}
.content {
  font-size: 28px;
}
.before {
  display: inline;
  color: #333333;
  margin-right: 10px;
}
.after {
  margin-right: 10px;
  display: inline;
  color: #f59a23;
}
.content .left {
  color: var(--color-gray-text);
  font-size: 28px;
  width: 150px;
  display: inline-block;
}
.content .right {
  font-size: 28px;
}
div.first-right {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: #14ccbd;
}
.second {
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  font-size: 36px;
  /* padding-bottom: 50px; */
  position: relative;
  /* height: 200px; */
}
.second-top {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  font-weight: bolder;
  margin: 0 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--color-Lightgray-bg);
  position: relative;
}
.second-top img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}
/* .second-bottom{} */
.second-bottom ul:last-child {
  border-bottom: 1px solid #e6e6e6;
}
.second-bottom ul li {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  margin: 0 20px;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.second-bottom ul:last-child li {
  border-bottom: none;
}
.second-bottom ul li .left img {
  width: 26px;
  height: 26px;
  margin-right: 25px;
}
/* 收回按钮 */
.bottom {
  text-align: center;
  margin-top: 60px;
}
.btn {
  width: 660px;
  height: 80px;
  border-radius: 50px;
  background-color: #ff6619;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
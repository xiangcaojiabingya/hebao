<template>
  <!-- 任务分发未完成 -->
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
            <span class="right">{{ guarantee }}</span>
          </p>
        </div>
        <div class="first-right">未分配</div>
      </div>
    </div>
    <!-- 核保人员选择 -->
    <div class="second">
      <div class="second-top">
        <span>核保人员</span>
        <img src="@/assets/images/add.png" alt @click="add" />
      </div>
      <div class="second-bottom">
        <ul v-for="(item, index) in peop" :key="index">
          <li>
            <div class="left">
              <img src="@/assets/images/delet.png" alt @click="del(index)" />
              <span>核保人员</span>
            </div>
            <div class="right" @click="change(item.num)">
              <div v-if="item.text == '请选择核保人员'" class="before">{{ item.text }}</div>
              <div v-else-if="item.text == '默认客户经理'" class="before">{{ item.text }}</div>
              <div v-else class="after">{{ item.text }}</div>
              <img src="@/assets/images/cx_jr_icon.png" alt />
            </div>
          </li>
          <!-- 删除弹窗 -->
          <van-popup v-model="deleteShow" round>
            <div class="popup">
              <div class="popup-top">确认</div>
              <div class="popup-middle">你确定要删除该核保人员吗？</div>
              <div class="popup-bottom">
                <button class="left" @click="delok()">
                  <span>确定</span>
                </button>
                <div class="right" @click="delno">取消</div>
              </div>
            </div>
          </van-popup>
        </ul>
      </div>
    </div>

    <div class="bottom">
      <button class="btn" @click="bute">确认提交</button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import eventBus from "@/utils/eventBus.js";
import { apiUrl, ajaxPost } from "@/api.js";

export default {
  name: "TaskDetail",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      name: "张三",
      typeName: "未分配",
      index: "",
      category: localStorage.getItem("category"),
      peop: [
        { num: "0", text: "请选择核保人员", HBUSERID: "" },
        { num: "1", text: "请选择核保人员", HBUSERID: "" }
      ],
      type: this.$route.query.type,
      deleteShow: false,
      item: JSON.parse(this.$route.query.item),
      chooseList: JSON.parse(this.$route.query.chooseList),
      guarantee: "",
      List: [],
      IDlist: "",
      NoList: [],
      NOSERIALNO: "",
      SERIALNO: []
    };
  },
  computed: {},
  created() {
    this.chooseList.forEach(element => {
      this.guarantee = this.guarantee + element.GUARANTORNAME + ",";
      this.NOSERIALNO = this.NOSERIALNO + element.SERIALNO + "@";
    });
    this.guarantee = this.guarantee.substring(-1, this.guarantee.length - 1);
    this.NOSERIALNO = this.NOSERIALNO.substring(-1, this.NOSERIALNO.length - 1);
  },
  activated() {
    // 核保人员选择之后传回数据
    eventBus.$off("chooseData");
    eventBus.$on(
      "chooseData",
      function(data) {
        this.peop.forEach(element => {
          if (element.num == data.num) {
            element.text = data.text;
            element.HBUSERID = data.id;
          }
        });
      }.bind(this)
    );
  },
  mounted() {},
  watch: {},

  methods: {
    // 添加核保人员
    add() {
      if (this.peop.length == "0") {
        var num = 0;
        this.peop.push({
          num: num,
          text: "请选择核保人员",
          HBUSERID: ""
        });
      } else {
        var num2 = Number(this.peop[this.peop.length - 1].num) + 1;
        this.peop.push({
          num: num2,
          text: "请选择核保人员",
          HBUSERID: ""
        });
      }
    },
    // 删除核保人员
    del(index) {
      this.deleteShow = true;
      this.index = index;
    },
    delok() {
      this.peop.splice(this.index, 1);
      this.deleteShow = false;
    },
    delno() {
      this.deleteShow = false;
    },
    // 选择核保人员
    change(num) {
      this.$router.push({
        path: "/Allpeop",
        query: {
          num: num
        }
      });
    },
    // 提交
    bute() {
      if (this.peop.length < 2) {
        // 判断核保人员个数
        this.$dialog
          .alert({
            message: "核保人员至少两个"
          })
          .then(() => {
            // on close
          });
      } else {
        let array = [];
        this.List = [];
        for (let i = 0; i < this.peop.length; i++) {
          if (this.peop[i].HBUSERID) {
            array.push(this.peop[i].HBUSERID);
          }
          this.List = this.List + this.peop[i].HBUSERID + "@";
          this.IDlist = this.List.substring(-1, this.List.length - 1);
        }
        if (array.length < this.peop.length) {
          // 判断是否选择核保人员
          this.$dialog
            .alert({
              message: "请选择核保人员"
            })
            .then(() => {
              // on close
            });
        } else {
          let pdpeop = false;
          // 判断核保人员是否相同
          for (let i = 0; i < this.peop.length; i++) {
            for (let j = i + 1; j < this.peop.length; j++) {
              if (this.peop[i].text == this.peop[j].text) {
                pdpeop = true;
                break;
              }
            }
          }
          if (pdpeop) {
            this.$dialog
              .alert({
                message: "请选择不同的核保人员"
              })
              .then(() => {
                // on close
              });
          } else {
            this.task();
          }
        }
      }
    },
    task() {
      let url;
      let array = [];
      this.NoList = [];
      if (this.category == "zh") {
        url = apiUrl.assignTask;
      } else {
        url = apiUrl.queryLsDistribute;
      }
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });

      var data = {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        SERIALNO: this.NOSERIALNO,
        HBUSERID: this.IDlist
      };
      ajaxPost(url, data)
        .then(res => {
          this.$toast.clear();
          var data = res;
          let isSuccess = false;
          data.forEach(element => {
            if (element.RETURNCODE == "SUCCESS") {
              isSuccess = true;
            }
          });
          if (isSuccess) {
            this.$dialog
              .alert({
                message: "任务分配成功"
              })
              .then(() => {
                this.$router.go(-1);
              });
          } else {
            this.$dialog
              .alert({
                message: "任务分配失败,请重新分配"
              })
              .then(() => {
                this.$router.go(-1);
              });
          }

          // this.$router.go(-1);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
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
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
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
  color: #999999;
}
.after {
  margin-right: 10px;
  display: inline;
  color: #333333;
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
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.second-bottom ul li {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
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
/* .second-bottom ul li .right {} */
.second-bottom ul li .right span {
  margin-right: 20px;
  color: #f59a23;
}
.second-bottom ul li .right img {
  height: 20px;
  vertical-align: middle;
}
/* 提交按钮 */
.bottom {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
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
/* 删除弹窗 */
.popup {
  width: 600px;
  text-align: center;
}
.popup-top {
  padding: 30px 0;
  font-size: 36px;
  font-weight: bolder;
  border-bottom: 1px solid #e6e6e6;
}
.popup-middle {
  padding: 58px 0;
  font-size: 32px;
}
.popup-bottom .left {
  width: 460px;
  height: 60px;
  background-color: #f8692d;
  border: none;
  border-radius: 10px;
  line-height: 60px;
}
.popup-bottom .left span {
  font-size: 28px;
  color: #fff;
}
.popup-bottom .right {
  margin: 40px 0;
  font-size: 28px;
  color: #7a7a7a;
}
</style>
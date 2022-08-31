<template>
  <div class="retail_credit">
    <item-nav-bar title="业务信息"></item-nav-bar>
    <!-- 顶部贷款信息 -->
    <div class="retail_top_div">
      <div class="jkkh_name_div">
        <span>{{ itemInfo.CUSTOMERNAME }}</span>
        <span>{{ itemInfo.STATUSNAME }}</span>
      </div>
      <horizontal-info
        title="授信金额："
        :value="itemInfo.BUSINESSSUM"
      ></horizontal-info>
      <horizontal-info
        title="担保人："
        :value="itemInfo.GUARANTORNAME"
      ></horizontal-info>
      <horizontal-info
        title="担保金额："
        :value="itemInfo.GUARANTYSUM"
      ></horizontal-info>
      <horizontal-info
        title="担保类型："
        :value="itemInfo.GUARANTYTYPENAME"
      ></horizontal-info>
      <horizontal-info
        title="合同编码："
        :value="itemInfo.GCSERIALNO"
      ></horizontal-info>
      <horizontal-info
        title="客户经理："
        :value="itemInfo.INPUTUSERNAME"
      ></horizontal-info>
    </div>
    <!-- 中间核保人员信息 -->
    <div class="retail_hb_info_div">
      <div v-for="(item, index) in hbUserList" :key="index">
        <div>
          <van-row class="credit_message_body">
            <van-col span="8" class="credit_title"
              >核保人员{{ index + 1 }}：</van-col
            >
            <van-col span="10" class="credit_name">{{ item.USERNAME }}</van-col>
          </van-row>
        </div>
        <horizontal-line></horizontal-line>
      </div>
    </div>
    <!-- 担保人列表 -->
    <div class="retail_db_info">
      <div class="top_color">
        <div class="danbao_title_div">
          <div class="size_rg"></div>
          <span>{{ itemInfo.GUARANTORNAME }}</span>
        </div>
        <horizontal-line></horizontal-line>
        <div class="ht_div">
          <div class="ht_left">
            <img src="@/assets/images/sfhy.png" class="images" />
            <span>身份核验</span>
          </div>
          <div class="ht_right" @click="toImageData('sfhc')">
            <span>{{ text1 }}</span>
            <img src="@/assets/images/cx_jr_icon.png" class="img" />
          </div>
        </div>
      </div>
    </div>
    <!-- 合同和影像资料 -->
    <div class="top_color">
      <div class="ht_div">
        <div class="ht_left">
          <img class="yx_img" src="@/assets/images/yxzl1.png" />
          <span>现场影像资料</span>
        </div>
        <div class="ht_right" @click="toImageData('yxzl')">
          <span>{{ text2 }}</span>
          <img src="@/assets/images/cx_jr_icon.png" class="img" />
        </div>
      </div>
      <div class="plr24">
        <horizontal-line></horizontal-line>
      </div>

      <div class="ht_div">
        <div class="ht_left">
          <img class="ht_img" src="@/assets/images/htsc1.png" />
          <span>合同上传</span>
        </div>
        <div class="ht_right" @click="toImageData('ht')">
          <span>{{ text3 }}</span>
          <img src="@/assets/images/cx_jr_icon.png" class="img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import HorizontalInfo from "@/components/HorizontalInfo.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import eventBus from "@/utils/eventBus.js";
import { apiUrl, ajaxPost } from "@/api.js";
export default {
  name: "retailCredits",
  components: {
    ItemNavBar,
    HorizontalInfo,
    HorizontalLine,
  },
  props: {},
  data() {
    return {
      category: this.$route.query.category,
      show: false,
      text1: "未核验",
      text2: "未上传",
      text3: "未上传",
      sfhcList: [],
      yxzlList: [],
      htList: [],
      tip: "",
      itemInfo: JSON.parse(this.$route.query.item),
      hbUserList: [], //核保人列表
    };
  },
  computed: {},
  created() {},
  activated() {
    eventBus.$off("chooseData");
    eventBus.$on(
      "chooseData",
      function (data) {
        this.text1 = data.text;
      }.bind(this)
    );
  },
  mounted() {
    this.getHbUserList();
  },
  methods: {
    // 获取核保人员列表
    getHbUserList() {
      let url;
      if (this.category == "zh") {
        url = apiUrl.zhTaskUserList;
      } else {
        url = apiUrl.lsTaskUserList;
      }
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      ajaxPost(url, {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        SERIALNO: this.itemInfo.SERIALNO,
        TASKTYPE: this.itemInfo.TASKTYPE,
      })
        .then((res) => {
          this.hbUserList = [];
          res.forEach(element => {
            if (element.STATUSNAME == '已分配' || element.STATUSNAME == '已完成') {
              this.hbUserList.push({
                USERNAME: element.USERNAME
              })
            }
          });
          // this.hbUserList = res;
          this.getImgData();
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },

    // 获取影像资料
    getImgData() {
      let url;
      if (this.category == "zh") {
        url = apiUrl.zhQueryImg;
      } else {
        url = apiUrl.lsQueryImg;
      }
      ajaxPost(url, {
        // inputDate: "20210902",
        inputDate: this.itemInfo.DISPOSALDATE,
        taskNo: this.itemInfo.SERIALNO,
      })
        .then((res) => {
          this.$toast.clear();
          let imgList = res.url;
          if (imgList.length > 0) {
            //  个人
            if ("db02002" in imgList[0]) {
              // 影像资料
              this.yxzlList = imgList[0].db02002;
              if (this.yxzlList.length > 0) {
                this.text2 = "已上传";
              }
              if ("db02003" in imgList[0]) {
                // 合同
                this.htList = imgList[0].db02003;
                if (this.htList.length > 0) {
                  this.text3 = "已上传";
                }
              }
              if ("db02001" in imgList[0]) {
                // 身份核验
                this.sfhcList = imgList[0].db02001;
                if (this.sfhcList.length > 0) {
                  this.text1 = "已核验";
                }
              }
            }
          }
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    // 跳转页面
    toImageData(flag) {
      let state = false;
      switch (flag) {
        case "yxzl":
          if (this.text2 == "已上传") {
            state = true;
          }
          this.$router.push({
            path: "/imageData",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.yxzlList),
              st: state,
              category: this.category,
            },
          });
          break;
        case "ht":
          if (this.text3 == "已上传") {
            state = true;
          }
          this.$router.push({
            path: "/imageData",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.htList),
              st: state,
              category: this.category,
            },
          });
          break;
        case "sfhc":
          if (this.text1 == "已核验") {
            state = true;
          }
          this.$router.push({
            path: "/imageData",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.sfhcList),
              st: state,
              category: this.category,
            },
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.retail_credit {
  width: 100%;
  background: var(--color-gray-bg);
}

/* 顶部贷款信息 */
.retail_top_div {
  width: 100%;
  padding: 30px 24px 15px 24px;
  font-size: 28px;
  padding-top: 92px;
  box-sizing: border-box;
  background: white;
  display: flex;
  flex-direction: column;
}

.jkkh_name_div {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 15px;
  align-items: center;
  justify-content: space-between;
}

.jkkh_name_div span:first-child {
  font-weight: bold;
}

.jkkh_name_div span:last-child {
  font-size: 24px;
  color: #29cbbe;
}

/* 中间核保人员信息 */
.retail_hb_info_div {
  width: 100%;
  background: white;
  margin-top: 24px;
  padding: 0 24px;
  font-size: 28px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}

/* 核保人员模块文字 */
.credit_title {
  margin-top: 9px;
  padding: 40px 0;
  color: #999999;
}

.credit_name {
  margin-top: 9px;
  padding: 40px 0;
  color: #333333;
}
/* 担保人列表 */
.retail_db_info {
  width: 100%;
  margin-top: 24px;
}

.top_color {
  margin-top: 24px;
  background-color: #ffffff;
}

.danbao_title_div {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 80px;
  font-size: 28px;
}

.danbao_title_div span {
  margin-left: 16px;
}

.size_rg {
  padding-left: 0;
  width: 6px;
  height: 30px;
  background-color: #ff6619;
}

.images {
  width: 24px;
  margin-top: 6px;
}

.img {
  height: 22px;
  margin-left: 10px;
  margin-top: 4px;
}

/* 合同图标 */
.ht_img {
  width: 18px;
}

.ht_div {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 108px;
  padding: 0 24px;
  justify-content: space-between;
  font-size: 28px;
  align-items: center;
}

.ht_left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ht_left span {
  margin-left: 20px;
}

/* 影像图标 */
.yx_img {
  width: 20px;
}

.ht_right {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 25%;
  justify-content: flex-end;
}

.ht_right span {
  font-size: 24px;
  color: #ff6619;
}

.plr24 {
  padding: 0 24px;
}
</style>
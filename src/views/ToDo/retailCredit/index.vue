<template>
  <div class="retail_credit">
    <item-nav-bar title="业务信息"></item-nav-bar>
    <!-- 顶部贷款信息 -->
    <div class="retail_top_div">
      <div class="jkkh_name_div">
        <span>{{ itemInfo.CUSTOMERNAME }}</span>
        <span>{{ itemInfo.STATUSNAME }}</span>
      </div>
      <horizontal-info title="授信金额：" :value="itemInfo.BUSINESSSUM"></horizontal-info>
      <horizontal-info title="担保人：" :value="itemInfo.GUARANTORNAME"></horizontal-info>
      <horizontal-info title="担保金额：" :value="itemInfo.GUARANTYSUM"></horizontal-info>
      <horizontal-info title="担保类型：" :value="itemInfo.GUARANTYTYPENAME"></horizontal-info>
      <horizontal-info title="合同编码：" :value="itemInfo.GCSERIALNO"></horizontal-info>
      <horizontal-info title="客户经理：" :value="itemInfo.INPUTUSERNAME"></horizontal-info>
    </div>
    <!-- 中间核保人员信息 -->
    <div class="retail_hb_info_div">
      <div v-for="(item, index) in hbUserList" :key="index">
        <div>
          <van-row class="credit_message_body">
            <van-col span="8" class="credit_title">核保人员{{ index + 1 }}：</van-col>
            <van-col span="10" class="credit_name">{{ item.USERNAME }}</van-col>
            <van-col span="6" class="credit_btn">
              <button
                class="refuse_btn"
                @click="showPop('您确定要拒绝处理该任务吗？')"
                color="#ff4d4d"
                plain
                v-if="item.USERNAME == nameHb"
              >拒绝</button>
            </van-col>
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
    <!-- 底部文字说明 -->
    <div class="prompt">
      <span>
        担保人为自然人时，拍摄现场照片前需先对担保人进行身份核验。
        <br />担保人为对公单位时，身份核验和授权书可跳过。
        <br />合同上传可通过移动端和电脑端两种方式上传。
      </span>
    </div>
    <!-- 完成按钮 -->
    <div class="finish">
      <button class="finish_button" @click="showPop('您确定已完成该任务的核保？')">完成</button>
    </div>
    <!-- 弹窗 -->
    <van-overlay :show="show">
      <div class="pop">
        <div class="pop_content">
          <div class="pop_title">
            <span>确认</span>
          </div>
          <div class="pop_askText">
            <span>{{ tip }}</span>
          </div>
          <div class="pop_btn">
            <button class="pop_btn_confirm" @click="confirm()">确定</button>
            <button class="pop_btn_cancel" @click="cancelBtn()">取消</button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import HorizontalInfo from "@/components/HorizontalInfo.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import { apiUrl, ajaxPost } from "@/api.js";
export default {
  name: "RetailCredit",
  components: {
    ItemNavBar,
    HorizontalInfo,
    HorizontalLine
  },
  props: {},
  data() {
    return {
      type: this.$route.query.type,
      name: this.$route.query.name,
      category: this.$route.query.category,
      show: false,
      text1: "未核验",
      text2: "未上传",
      text3: "未上传",
      sfhcList: [],
      yxzlList: [],
      htList: [],
      tip: "",
      nameHb: localStorage.getItem("name"),
      itemInfo: JSON.parse(this.$route.query.item),
      hbUserList: ""
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getHbUserList();
    localStorage.setItem("GUARANTORNAME", this.itemInfo.GUARANTORNAME);
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.back();
    },
    // 完成
    submitSuccess() {
      let url;
      if (this.category == "zh") {
        url = apiUrl.makeTask;
      } else {
        url = apiUrl.queryLsFinishTask;
      }
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      ajaxPost(url, {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        SERIALNO: this.itemInfo.SERIALNO
      })
        .then(res => {
          this.$toast.clear();
          this.goBack();
        })
        .catch(error => {
          this.$toast.clear();
        });
    },
    // 退回
    returnFun() {
      let url;
      if (this.category == "zh") {
        url = apiUrl.returnTask;
      } else {
        url = apiUrl.queryLsReturnAction;
      }
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      ajaxPost(url, {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        SERIALNO: this.itemInfo.SERIALNO
      })
        .then(res => {
          this.$toast.clear();
          this.goBack();
        })
        .catch(error => {
          this.$toast.clear();
        });
    },
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
        loadingType: "spinner"
      });
      ajaxPost(url, {
        LOGINID: localStorage.getItem("empNo"),
        USERID: localStorage.getItem("userId"),
        SERIALNO: this.itemInfo.SERIALNO,
        TASKTYPE: this.itemInfo.TASKTYPE
      })
        .then(res => {
          this.hbUserList = [];
          res.forEach(element => {
            if (
              element.STATUSNAME == "已分配" ||
              element.STATUSNAME == "已完成"
            ) {
              this.hbUserList.push({
                USERNAME: element.USERNAME
              });
            }
          });
          // this.hbUserList = res;
          this.getImgData();
        })
        .catch(error => {
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
        taskNo: this.itemInfo.SERIALNO
      })
        .then(res => {
          this.$toast.clear();
          this.itemInfo.CUSTOMERTYPE = "0323";
          let imgList = res.url;
          if (imgList.length > 0) {
            //  个人
            if ("db02002" in imgList[0]) {
              // 影像资料
              this.yxzlList = imgList[0].db02002;
              if (this.yxzlList.length > 0) {
                this.text2 = "已上传";
              }
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
        })
        .catch(error => {
          this.$toast.clear();
        });
    },
    //   弹窗的取消
    cancelBtn() {
      this.show = false;
    },
    // 弹窗的确定按钮
    confirm() {
      this.show = false;
      if (this.tip == "您确定要拒绝处理该任务吗？") {
        if (
          this.text1 == "已核验" ||
          this.text2 == "已上传" ||
          this.text3 == "已上传"
        ) {
          this.$dialog
            .alert({
              message: "已开始核保不能退回！"
            })
            .then(() => {
              // on close
            });
        } else {
          this.returnFun();
        }
      } else {
        if (this.text1 == "已核验" && this.text2 == "已上传") {
          this.submitSuccess();
        } else {
          this.$dialog
            .alert({
              message: "请先完成身份核验与现场影像资料上传！"
            })
            .then(() => {
              // on close
            });
        }
      }
      this.show = false;
    },

    // 点击完成
    showPop(txt) {
      this.tip = txt;
      this.show = true;
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
            path: "/UpdateContract",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.yxzlList),
              st: state,
              category: this.category,
              itemInfo: JSON.stringify(this.itemInfo),
              busiFileType: "db02002"
            }
          });
          break;
        case "ht":
          if (this.text3 == "已上传") {
            state = true;
          }
          this.$router.push({
            path: "/UpdateContract",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.htList),
              st: state,
              category: this.category,
              randomID: new Date().getTime(),
              itemInfo: JSON.stringify(this.itemInfo),
              busiFileType: "db02003"
            }
          });
          break;
        case "sfhc":
          if (this.text1 == "已核验") {
            state = true;
            this.$router.push({
              path: "/imageData",
              query: {
                flag: flag, //区分是身份核验、授权书、影像资料、合同
                imgList: JSON.stringify(this.sfhcList),
                st: state,
                category: this.category,
              }
            });
          } else {
            this.$router.push({
              path: "/IdCard",
              query: {
                category: this.category,
                itemInfo: JSON.stringify(this.itemInfo),
                randomID: new Date().getTime(),
                type: "gr",
                name:this.itemInfo.GUARANTORNAME,
              }
            });
          }
          break;
      }
    }
  }
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
  margin-top: 92px;
  box-sizing: border-box;
  background: white;
  display: flex;
  flex-direction: column;
}

.jkkh_name_div {
  display: flex;
  flex-direction: row;
  width: 100%;
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
  height: 107px;
  line-height: 107px;
  color: #999999;
}

.credit_name {
  height: 107px;
  line-height: 107px;
  color: #333333;
}

/* 拒绝按钮 */
.credit_btn {
  height: 107px;
  line-height: 107px;
  text-align: right;
}

.refuse_btn {
  border: 2px solid #ff4d4d;
  background: #ffffff;
  color: #ff4d4d;
  border-radius: 50px;
  width: 140px;
  height: 56px;
  line-height: 56px;
  /* padding: 10px 0; */
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
  width: 12px;
  margin-left: 10px;
  transform: scale(2);
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

/* 底部文字*/
.prompt {
  font-size: 24px;
  color: #999999;
  padding: 24px;
  line-height: 2;
  padding-bottom: 0;
}
/* 完成按钮 */
.finish {
  padding: 48px;
}

.finish_button {
  width: 100%;
  background: var(--color-orange-text);
  color: #ffffff;
  font-size: 32px;
  height: 80px;
  border-radius: 50px;
  border: 2px solid var(--color-orange-text);
}

/* 弹窗 */
.pop {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pop_content {
  width: 600px;
  /* height: 120px; */
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
}

/* 弹出层标题 */
.pop_title {
  font-size: 36px;
  color: #000000;
  padding: 30px 0;
  border-bottom: 1px solid #e6e6e6;
}

/* 弹出层提示文字 */
.pop_askText {
  font-size: 32px;
  color: #000000;
  padding: 58px 0;
}

.pop_btn {
  font-size: 28px;
  text-align: center;
  padding-bottom: 28px;
}

.pop_btn button {
  width: 460px;
  height: 60px;
  text-align: center;
  line-height: 50px;
}

/* 弹出框确定按钮 */
.pop_btn_confirm {
  background: var(--color-orange-text);
  border: none;
  color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* 弹出框取消按钮 */
.pop_btn_cancel {
  background: #ffffff;
  border: none;
  color: #7a7a7a;
}
</style>

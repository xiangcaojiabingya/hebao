<template>
  <!-- 未完成综合 -->
  <div class="daiban">
    <ItemNavBar title="业务信息"></ItemNavBar>
    <div class="message">
      <!-- 借款 -->
      <div class="borrow">
        <div class="borrow_head">
          <span class="borrow_head_name">{{ itemInfo.CUSTOMERNAME }}</span>
          <span class="borrow_head_type">{{ itemInfo.STATUSNAME }}</span>
        </div>
        <horizontal-info title="授信金额：" :value="itemInfo.BUSINESSSUM"></horizontal-info>
        <horizontal-info title="担保人：" :value="itemInfo.GUARANTORNAME"></horizontal-info>
        <horizontal-info title="担保金额：" :value="itemInfo.GUARANTYSUM"></horizontal-info>
        <horizontal-info title="担保类型：" :value="itemInfo.GUARANTYTYPENAME"></horizontal-info>
        <horizontal-info title="合同编号：" :value="itemInfo.GCSERIALNO"></horizontal-info>
        <horizontal-info title="客户经理：" :value="itemInfo.INPUTUSERNAME"></horizontal-info>
      </div>
      <!-- 核保人员 -->
      <div class="retail_hb_info_div">
        <div v-for="(item, index) in hbUserList" :key="index">
          <div>
            <van-row class="credit_message_body">
              <van-col span="8" class="credit_title">核保人员：</van-col>
              <van-col span="10" class="credit_name">
                {{
                item.USERNAME
                }}
              </van-col>
              <van-col span="6" class="credit_btn">
                <button class="refuse_btn" @click="refuse" v-if="item.USERNAME == nameHb">拒绝</button>
              </van-col>
            </van-row>
          </div>
          <horizontal-line></horizontal-line>
        </div>
      </div>
      <!-- 担保信息 -->
      <div class="warrant">
        <!-- 担保人 -->
        <div class="warrant_person">
          <div class="warrant_person_head border_bottom">
            <div class="warrant_person_head_icon"></div>
            <div class="warrant_person_head_title">
              <span>{{ itemInfo.GUARANTORNAME }}</span>
            </div>
          </div>
          <!-- 身份核验 -->
          <div v-for="(item, index) in identifyList" :key="index">
            <div class="warrant_person_identify">
              <van-swipe-cell right-width="174px">
                <van-row>
                  <van-col class="warrant_person_identify_icon" span="2">
                    <img src="@/assets/images/sfhy.png" />
                  </van-col>
                  <van-col class="warrant_person_identify_text" span="16">
                    <span>身份核验</span>
                  </van-col>
                  <van-col
                    class="warrant_person_identify_status"
                    span="6"
                    @click="toImageData('sfhc', item.txt)"
                  >
                    <span>{{ item.txt }}</span>&nbsp;
                    <img src="@/assets/images/cx_jr_icon.png" />
                  </van-col>
                </van-row>
                <template #right>
                  <!-- <van-button square type="danger" text="删除" class="delete_btn" /> -->
                  <div class="delete_btn" @click="deleteIdent(index)">删除</div>
                </template>
              </van-swipe-cell>
            </div>
            <div class="plr24">
              <horizontal-line></horizontal-line>
            </div>
          </div>

          <!-- 授权书 -->
          <div class="warrant_person_identify">
            <van-row>
              <van-col class="warrant_person_identify_icon" span="2">
                <img src="@/assets/images/sqs_pic.png" />
              </van-col>
              <van-col class="warrant_person_identify_text" span="16">
                <span>授权书</span>
              </van-col>
              <van-col class="warrant_person_identify_status" span="6" @click="toImageData('sqs')">
                <span>{{ text2 }}</span>&nbsp;
                <img src="@/assets/images/cx_jr_icon.png" />
              </van-col>
            </van-row>
          </div>
          <div class="plr24">
            <horizontal-line></horizontal-line>
          </div>
          <div class="warrant_person_add_btn" @click="addBtn">
            <button class="add_button">
              <img src="@/assets/images/plus1.png" class="add_btn_plus" />增加身份核验
            </button>
          </div>
        </div>
        <!-- 影像资料 -->
        <div class="warrant_resource">
          <div class="warrant_person_identify">
            <van-row>
              <van-col class="warrant_person_identify_icon" span="2">
                <img src="@/assets/images/yxzl1.png" />
              </van-col>
              <van-col class="warrant_person_identify_text" span="16">
                <span>现场影像资料</span>
              </van-col>
              <van-col class="warrant_person_identify_status" span="6" @click="toImageData('yxzl')">
                <span>{{ text3 }}</span>&nbsp;
                <img src="@/assets/images/cx_jr_icon.png" />
              </van-col>
            </van-row>
          </div>
          <div class="plr24">
            <horizontal-line></horizontal-line>
          </div>
          <div class="warrant_person_identify">
            <van-row>
              <van-col class="warrant_person_identify_icon" span="2">
                <img class="ht_img" src="@/assets/images/htsc1.png" />
              </van-col>
              <van-col class="warrant_person_identify_text" span="16">
                <span>合同上传</span>
              </van-col>
              <van-col class="warrant_person_identify_status" span="6" @click="toImageData('ht')">
                <span>{{ text4 }}</span>&nbsp;
                <img src="@/assets/images/cx_jr_icon.png" />
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <!-- 提示文字 -->
      <div class="prompt">
        <span>
          担保人为自然人时，拍摄现场照片前需先对担保人进行身份核验。
          <br />担保人为对公单位时，身份核验和授权书可跳过。
          <br />合同上传可通过移动端和电脑端两种方式上传。
        </span>
      </div>
      <!-- 完成按钮 -->
      <div class="finish">
        <button class="finish_button" @click="finishPop">完成</button>
      </div>
    </div>
    <!-- 弹出框 -->
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
            <button class="pop_btn_confirm" @click="confirm">确定</button>
            <button class="pop_btn_cancel" @click="show = false">取消</button>
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
  name: "retailCredit",
  components: {
    ItemNavBar,
    HorizontalInfo,
    HorizontalLine
  },
  props: {},
  data() {
    return {
      category: this.$route.query.category,
      tip: "",
      show: false,
      hbUserList: "",
      text1: "未核验",
      text2: "未上传",
      text3: "未上传",
      text4: "未上传",
      identifyList: [{ txt: "未核验" }],
      sfhcList: [],
      yxzlList: [],
      sqsList: [],
      htList: [],
      nameHb: localStorage.getItem("name"),
      itemInfo: JSON.parse(this.$route.query.item)
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
        inputDate: this.itemInfo.DISPOSALDATE,
        taskNo: this.itemInfo.SERIALNO
      })
        .then(res => {
          this.$toast.clear();
          let imgList = res.url;
          if (imgList.length > 0) {
            if ("db01003" in imgList[0]) {
              // 影像资料
              this.yxzlList = imgList[0].db01003;
              if (this.yxzlList.length > 0) {
                this.text3 = "已上传";
              }
            }
            if ("db01004" in imgList[0]) {
              // 合同
              this.htList = imgList[0].db01004;
              if (this.htList.length > 0) {
                this.text4 = "已上传";
              }
            }
            if ("db01001" in imgList[0]) {
              // 身份核验
              this.sfhcList = imgList[0].db01001;
              if (this.sfhcList.length > 0) {
                this.text1 = "已核验";
                this.identifyList[0].txt = "已核验";
              }
            }
            if ("db01002" in imgList[0]) {
              // 授权书
              this.sqsList = imgList[0].db01002;
              if (this.sqsList.length > 0) {
                this.text2 = "已上传";
              }
            }
          }
        })
        .catch(error => {
          this.$toast.clear();
        });
    },
    back() {
      this.refuse_show = false;
      this.finish_show = false;
    },
    // 展示拒绝按钮内容
    refuse() {
      this.show = true;
      this.tip = "您确定要拒绝处理该任务吗？";
    },
    // 增加身份核验
    addBtn() {
      this.identifyList.push({ txt: "未核验" });
    },
    deleteIdent(index) {
      this.identifyList.splice(index, 1);
    },
    // 跳转页面
    toImageData(flag, txt) {
      let state = false;
      switch (flag) {
        case "yxzl":
          // 影像资料
          this.$router.push({
            path: "/UpdateContract",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.yxzlList),
              category: this.category,
              itemInfo: JSON.stringify(this.itemInfo),
              busiFileType: "db01003"
            }
          });
          break;
        case "ht":
          // 合同
          this.$router.push({
            path: "/UpdateContract",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.htList),
              category: this.category,
              itemInfo: JSON.stringify(this.itemInfo),
              busiFileType: "db01004"
            }
          });
          break;
        case "sfhc":
          // 身份核验
          if (txt == "已核验") {
            state = true;
            this.$router.push({
              path: "/imageData",
              query: {
                flag: flag, //区分是身份核验、授权书、影像资料、合同
                imgList: JSON.stringify(this.sfhcList),
                st: state,
                category: this.category
              }
            });
          } else {
            this.$router.push({
              path: "/IdCard",
              query: {
                category: this.category,
                itemInfo: JSON.stringify(this.itemInfo),
                randomID: new Date().getTime(),
                type: "dg"
              }
            });
          }
          break;
        case "sqs":
          // 授权书
          this.$router.push({
            path: "/UpdateContract",
            query: {
              flag: flag, //区分是身份核验、授权书、影像资料、合同
              imgList: JSON.stringify(this.sqsList),
              category: this.category,
              itemInfo: JSON.stringify(this.itemInfo),
              busiFileType: "db01002"
            }
          });
          break;
      }
    },
    // 完成
    finishPop() {
      this.show = true;
      this.tip = "您确定已完成该任务的核保？";
      // this.$toast.loading({
      //   duration: 0,
      //   message: "加载中...",
      //   forbidClick: true,
      //   loadingType: "spinner"
      // });
      // this.getData();
    },
    // 展示拒绝弹窗
    confirm() {
      this.show = false;

      if (this.tip == "您确定要拒绝处理该任务吗？") {
        if (
          this.text1 == "已核验" ||
          this.text2 == "已上传" ||
          this.text3 == "已上传" ||
          this.text4 == "已上传"
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
        if (this.text3 == "已上传") {
          this.submitSuccess();
        } else {
          this.$dialog
            .alert({
              message: "请先完成影像资料上传！"
            })
            .then(() => {
              // on close
            });
        }
      }
    }
  }
};
</script>
<style scoped>
/* 业务信息 */
.message {
  position: absolute;
  top: 92px;
  width: 100%;
}

/* 借款客户模块 */
.borrow {
  background: #ffffff;
  padding: 0 24px;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
  padding-bottom: 15px;
}

/* 借款客户名称栏 */
.borrow_head {
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.borrow_head_name {
  color: #333333;
  font-size: 28px;
}

.borrow_head_type {
  color: #14ccbd;
  font-size: 24px;
  text-align: right;
}

/* 借款信息栏 */
.borrow_message {
  padding-bottom: 15px;
  font-size: 28px;
}

.borrow_message_title {
  color: #999999;
}

.borrow_message_data {
  color: #333333;
  /* vertical-align: middle; */
  line-height: 40px;
  font-size: 28px;
}

/* 核保人员模块 */
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
  /* padding: 20px 0; */
  color: #999999;
  height: 107px;
  line-height: 107px;
}

.credit_name {
  /* padding: 20px 0; */
  height: 107px;
  line-height: 107px;
  color: #333333;
}

/* 拒绝按钮 */
.credit_btn {
  /* padding: 20px 0; */
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
  /* padding: 6px 0; */
  line-height: 56px;
}

/* 分割线 */
.plr24 {
  padding: 0 24px;
}

.border_bottom {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
/* 担保人模块 */
.warrant {
  font-size: 28px;
  color: #333333;
}

.warrant_person {
  margin-top: 24px;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
  background: #ffffff;
}

/* 担保人员姓名 */
.warrant_person_head {
  position: relative;
  height: 32px;
  padding: 24px 0;
  line-height: 32px;
}

/* 核保人员图标 */
.warrant_person_head_icon {
  position: absolute;
  height: 30px;
  width: 6px;
  background: #ff661a;
  left: 0;
}
.ht_img {
  width: 18px;
}

/* 核保人员文字 */
.warrant_person_head_title {
  position: absolute;
  left: 24px;
}

/* 身份核验 */
.warrant_person_identify {
  padding: 0 24px;
  height: 107px;
  line-height: 107px;
}

/* 身份核验图标 */
.warrant_person_identify_icon img {
  width: 24px;
  /* vertical-align: bottom; */
}

/* 身份核验文字 */
.warrant_person_identify_text {
  color: #333333;
}

/* 身份核验状态 */
.warrant_person_identify_status span {
  color: #ff661a;
  font-size: 24px;
}

.warrant_person_identify_status {
  text-align: right;
}

/* 身份核验状态图标 */
.warrant_person_identify_status img {
  height: 18px;
}

/* 删除按钮 */
.delete_btn {
  height: 100%;
  background: #ff4d4d;
  width: 150px;
  text-align: center;
  color: #ffffff;
  margin-left: 24px;
}

/* 资料 */
.warrant_resource {
  margin: 24px 0;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}

/* 添加担保人员按钮 */
.warrant_person_add_btn {
  padding: 24px;
}

.add_button {
  width: 100%;
  height: 60px;
  font-size: 24px;
  border: 2px dotted #e6e6e6;
  background: #ffffff;
  color: #fdab1a;
}

.add_btn_plus {
  height: 24px;
  padding-right: 10px;
}

/* 提示文字 */
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
  border: none;
}

/* 弹出层 */
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

/* 弹出层按钮 */
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

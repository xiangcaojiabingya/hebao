<template>
  <!-- 身份核验-上传身份证 -->
  <div class="IdCard">
    <ItemNavBar title="身份核验"></ItemNavBar>
    <div class="top">
      <!-- 定位 -->
      <location :locationInfo="locationInfo"></location>
      <!-- 上传身份证 -->
      <div class="content">
        <p class="content-top">请上传身份证</p>
        <div class="middle">
          <div class="middle-top">实名认证信息保存后将无法修改，请确认无误！</div>
          <div class="middle-top">拍摄时请确保身份证边框完整，字迹清晰，亮度均衡。</div>
          <div class="middle-middle">
            <img :src="images.sfzzm" alt @click="sfzzm" />
            <span>上传身份证照片面</span>
          </div>
          <div class="middle-bottom">
            <img :src="images.sfzfm" alt @click="sfzfm" />
            <span>上传身份证国徽面</span>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="category == 'ls'">
        <button class="btn" @click="btn">确认提交</button>
      </div>
      <div class="bottom_second" v-else-if="category == 'zh'">
        <button class="btn_skip" @click="btn_skip">跳过</button>
        <button class="btn_submit" @click="btn">确认提交</button>
      </div>
      <!-- 弹窗 -->
      <van-popup v-model="show" round>
        <div class="popup">
          <div class="popup-top">
            <p class="one">请您确认身份信息</p>
            <p class="two">{{ information.name }}</p>
            <p class="three">{{ information.idCard }}</p>
          </div>
          <div class="popup-bottom">
            <div class="left" @click="again">重新拍摄</div>
            <div class="right" @click="btnOk">确认</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getLocation, MXCamera } from "@/utils/mxapi.js";
import Location from "@/components/Location.vue";
import ItemNavBar from "@/components/ItemNavBar.vue";
import { apiUrl, ajaxPost } from "@/api.js";

export default {
  name: "IdCard",
  components: { Location, ItemNavBar },
  props: {},
  data() {
    return {
      category: this.$route.query.category,
      name: this.$route.query.name,
      show: false,
      information: {
        name: "张三",
        idCard: "1264667388"
      },
      images: {
        sfzzm: require("@/assets/images/zjsc_sfzzm_pic1.png"),
        sfzfm: require("@/assets/images/zjsc_sfzbm_pic.png")
      },
      idImgUp: "",
      idImgDown: "",
      maxSize: "51187",
      itemInfo: this.$route.query.itemInfo,
      locationInfo: "",
      type: this.$route.query.type
    };
  },
  computed: {},
  created() {},
  mounted() {
    //获取位置信息
    getLocation()
      .then(res => {
        this.locationInfo = res;
      })
      .catch(e => {});
  },
  methods: {
    btn() {
      if (this.idImgUp == "" || this.idImgDown == "") {
        this.$dialog
          .alert({
            message: "请拍摄身份证"
          })
          .then(() => {
            // on close
          });
      } else {
        this.upload();
      }
    },
    btn_skip() {
      this.$router.go(-1);
    },
    // 重新扫描
    again() {
      this.show = false;
    },
    // 确认通过
    btnOk() {
      this.show = false;
      this.$router.push({
        path: "/face",
        query: {
          idImgUp: this.idImgUp,
          idImgDown: this.idImgDown,
          name: this.information.name,
          idCard: this.information.idCard,
          itemInfo: this.itemInfo,
          type: this.type
        }
      });
    },
    // 拍照身份证正面
    sfzzm() {
      MXCamera(this.locationInfo, this.maxSize)
        .then(base64 => {
          var url = "data:image/png;base64," + base64;
          this.images.sfzzm = "";
          this.images.sfzzm = url;
          this.idImgUp = base64;
        })
        .catch(e => {
          this.$toast.fail("拍照调用失败");
        });
    },
    // 拍照身份证反面
    sfzfm() {
      MXCamera(this.locationInfo, this.maxSize)
        .then(base64 => {
          var url = "data:image/png;base64," + base64;
          this.images.sfzfm = "";
          this.images.sfzfm = url;
          this.idImgDown = base64;
        })
        .catch(e => {
          this.$toast.fail("拍照调用失败");
        });
    },
    // 上传身份证
    upload() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });

      var data = {
        idImgUp: this.idImgUp,
        idImgDown: this.idImgDown,
        taskNo: JSON.parse(this.itemInfo).SERIALNO
      };
      if (this.type == "gr") {
        data.busiFileType = "db02001";
      } else {
        data.busiFileType = "db01001";
      }
      ajaxPost(apiUrl.uploadSfz, data)
        .then(res => {
          if (this.type == "gr") {
            if (res.name != "" && res.cardno != "") {
              if (this.name == res.name) {
                this.information.name = res.name;
                this.information.idCard = res.cardno;
                this.show = true;
              } else {
                this.$dialog
                .alert({
                  message: "请上传本人身份证，重新拍摄"
                })
                .then(() => {
                  // on close
                });
              }
            } else {
              this.$dialog
                .alert({
                  message: "数据获取失败，请重新拍摄"
                })
                .then(() => {
                  // on close
                });
            }
          } else {
            if (res.name != "" && res.cardno != "") {
              this.information.name = res.name;
              this.information.idCard = res.cardno;
              this.show = true;
            } else {
              this.$dialog
                .alert({
                  message: "数据获取失败，请重新拍摄"
                })
                .then(() => {
                  // on close
                });
            }
          }

          this.$toast.clear();
        })
        .catch(error => {
          console.log("请求错误" + JSON.stringify(error));
          this.$toast.clear();
        });
    }
  }
};
</script>

<style scoped>
.IdCard {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.top {
  padding-top: 92px;
}
.content {
  /* height: 80%; */
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 24px;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}
.content-top {
  font-size: 36px;
  font-weight: bolder;
  margin: 0;
  padding: 0;
  padding-top: 40px;
  padding-left: 25px;
}
.middle {
  margin: 15px 25px;
  font-size: 28px;
}
.middle-top {
  margin-top: 10px;
  color: #999999;
}
.middle-middle,
.middle-bottom {
  display: flex;
  flex-direction: column;
  margin: 40px 0;
}
.middle-bottom {
  padding-bottom: 40px;
}
.middle-middle img,
.middle-bottom img {
  width: 440px;
  /* height: 300px; */
  margin: 0 auto;
}
.middle-middle span,
.middle-bottom span {
  margin: 0 auto;
  font-size: 28px;
  margin-top: 24px;
}
.bottom {
  text-align: center;
  padding-bottom: 60px;
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
.bottom_second {
  margin: 0 55px;
  display: flex;
  padding-bottom: 60px;
}
.btn_submit {
  width: 300px;
  height: 80px;
  border-radius: 50px;
  background-color: #ff6619;
  border: none;
  color: white;
  font-size: 28px;
}
.btn_skip {
  width: 300px;
  height: 80px;
  border-radius: 50px;
  background-color: #ffffff;
  border: 1px solid #ff6619;
  color: #ff6619;
  font-size: 28px;
  margin-right: 40px;
}
/* 弹窗 */
.popup {
  width: 600px;
  text-align: center;
}
.popup-top {
  border-bottom: 1px solid #e5e5e5;
}
.popup-top .one {
  font-size: 36px;
  font-weight: bolder;
  margin: 0;
  padding: 0;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
}
.popup-top .two {
  font-size: 32px;
  margin: 0;
  padding: 0;
  padding-top: 60px;
  padding-bottom: 30px;
}
.popup-top .three {
  font-size: 32px;
  margin: 0;
  padding: 0;
  padding-bottom: 60px;
}
.popup-bottom {
  display: flex;
  justify-content: space-around;
  height: 100px;
  line-height: 100px;
}
.popup-bottom .left {
  width: 50%;
  border-right: 1px solid #e5e5e5;
  text-align: center;
  font-size: 32px;
}
.popup-bottom .right {
  width: 50%;
  color: #ff6619;
  font-size: 32px;
}
</style>
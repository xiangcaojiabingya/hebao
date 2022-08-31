<template>
  <!-- 身份核验-人脸识别 -->
  <div class="face">
    <ItemNavBar title="授信核保"></ItemNavBar>
    <div class="top">
      <!-- 定位 -->
      <location :locationInfo="locationInfo"></location>
      <div class="content">
        <p class="content-top">请上传正面照片</p>
        <div class="middle">
          <div class="middle-top">请确定光线充足，平行拍摄</div>
          <div class="middle-middle">
            <img :src=rlImg alt  @click="face()"/>
            <span>上传正面照片</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <button class="btn" @click="btn">确认提交</button>
        <!-- 成功弹窗 -->
        <van-popup v-model="show" round>
          <div class="popup">
            <div class="popup-top">
              <img :src="information.img" alt />
              <p class="two">{{ information.text }}</p>
            </div>
            <div class="popup-bottom">
              <button class="btn2" @click="btn2">确认</button>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLocation,
  MXCamera
} from "@/utils/mxapi.js";
import Location from "@/components/Location.vue";
import ItemNavBar from "@/components/ItemNavBar.vue";
import { apiUrl, ajaxPost } from "@/api.js";

export default {
  name: "face",
  components: { Location,ItemNavBar },
  props: {},
  data() {
    return {
      show: false,
      rlImg: require("@/assets/images/zjsc_sfzzm_pic.png"),
      faceImg: '',
      idImg: this.$route.query.idImgUp,
      idImgDown: this.$route.query.idImgDown,
      cName: this.$route.query.name,
      cId: this.$route.query.idCard,
      loginId: localStorage.getItem('empNo'),
      information: {
        img: require("@/assets/images/pic_cg.png"),
        text: "验证成功"
      },
      text: "认证通过",
       maxSize: '409600',
      itemInfo: this.$route.query.itemInfo,
      category: localStorage.getItem('category'),
      locationInfo:'',
      type: this.$route.query.type,
      faceCode: '1'
    };
  },
  computed: {},
  created() {},
  mounted() {
    //获取位置信息
    getLocation()
      .then((res) => {
        this.locationInfo = res;
      })
      .catch((e) => {});
  },
  methods: {
    btn() {
      if (this.faceImg == '') {
        this.$dialog.alert({
          message: "请拍摄身份证"
        }).then(() => {
          // on close
        });
      } else {
        this.upload();
      }
      
    },
    btn2() {
      this.show = false;
      this.$router.go(-2);
    },
    btn3() {
      location.reload();
    },
    // 人脸拍照
    face() {
      MXCamera(this.locationInfo,this.maxSize,this.faceCode)
        .then(base64 => {
          var url = "data:image/png;base64," + base64;
          this.rlImg = "";
          this.rlImg = url;
          this.faceImg = base64;
        })
        .catch(e => {
          this.$toast.fail("拍照调用失败");
        });
    },
    upload() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      var data = {
        cId: this.cId,
        cName: this.cName,
        idImg: this.idImg,
        faceImg: this.faceImg,
        loginId: this.loginId,
        idImgBack: this.idImgDown,
        inputDate: JSON.parse(this.itemInfo).DISPOSALDATE,
        taskNo: JSON.parse(this.itemInfo).SERIALNO,
      type: this.$route.query.type,

      };
      if (this.type == "gr") {
        data.busiFileType = "db02001";
      } else {
        data.busiFileType = "db01001";
      }
      ajaxPost(apiUrl.faceCardCompare,data)
        .then(res => {
          if (res.simResult == '认证通过') {
            this.show = true;
          } else {
            this.$dialog
            .alert({
              message: "认证失败，请重新拍摄。"
            })
            .then(() => {
              // on close
            });
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
.face {
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
  box-shadow: 0 2px 4px 0 rgba(229,229,229,0.5);

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
.middle-middle {
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  text-align: center;
}
.middle-middle img {
  width: 440px;
  /* height: 500px; */
  margin: 0 auto;
  margin-bottom: 30px;
}
.middle-middle span {
  font-size: 28px;
  margin-bottom: 40px;
}
.bottom {
  text-align: center;
  margin-top: 50px;
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
/* 弹窗 */
.popup {
  width: 600px;
  /* height: 410px; */
}
/* .popup-top {
} */
.popup-top img {
  width: 120px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.popup-top .two {
  font-size: 32px;
  margin: 0;
  padding: 0;
  margin-bottom: 50px;
}
.popup-bottom {
  display: flex;
  justify-content: space-around;
  height: 100px;
  line-height: 100px;
  margin-bottom: 20px;
}
.popup-bottom button {
  width: 460px;
  height: 60px;
  line-height: 60px;
  border-radius: 20px;
  background-color: #f8692d;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  /* padding-bottom: 41px; */
  cursor: pointer;
}
</style>
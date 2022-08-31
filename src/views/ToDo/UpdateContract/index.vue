<template>
  <!--   上传合同或者影响资料页面 -->
  <div class="updateContract">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="content_div">
      <!-- 定位 -->
      <location :locationInfo="locationInfo"></location>
      <!-- 上传部分 -->
      <div class="middle_div">
        <div class="horital_div">
          <div class="texts">
            {{ text }}
          </div>
        </div>
        <take-photo
          @del="del"
          :imageData="imageData"
          :locationInfo="locationInfo"
          @addImgs="takeImgs"
          @addVideos="takeVideos"
          ref="delImgs"
        ></take-photo>
      </div>
      <div class="commit_div" @click="submit">确认提交</div>

      <!-- 提交弹窗 -->
      <van-overlay :show="submitShow">
        <div class="pop">
          <div class="pop_content">
            <div class="pop_askText">
              <span>
                {{ tip }}
              </span>
            </div>
            <div class="pop_btn">
              <button class="pop_btn_confirm" @click="submitConfirm">
                确定
              </button>
            </div>
          </div>
        </div>
      </van-overlay>
      <!-- 删除弹窗 -->
      <van-overlay :show="deleteShow">
        <div class="pop">
          <div class="pop_content">
            <div class="pop_title">
              <span>确认</span>
            </div>
            <div class="pop_askText">
              <span>
                {{ tip }}
              </span>
            </div>
            <div class="pop_btn">
              <button class="pop_btn_confirm" @click="deleteConfirm">
                确定
              </button>
              <button class="pop_btn_cancel" @click="deleteShow = false">
                取消
              </button>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import TakePhoto from "./components/TakePhoto.vue";
import Location from "@/components/Location.vue";
import ItemNavBar from "@/components/ItemNavBar.vue";
import { dealImgList } from "@/utils/index.js";

import { getLocation, showWebViewTitle } from "@/utils/mxapi.js";
import { apiUrl, ajaxPost } from "@/api.js";
export default {
  name: "UpdateContract",
  components: { TakePhoto, Location, ItemNavBar },
  props: {},
  data() {
    return {
      category: this.$route.query.category,
      imageData: [],
      flag: this.$route.query.flag,
      title: "影像资料",
      locationInfo: "",
      text: "添加合同",
      tip: "",
      submitShow: false,
      deleteShow: false,
      imgIndex: 0,
      popTitleImg: "",
      onlyImgsData: [], //要上传的图片列表
      onlyVideoList: [], //要上传的视频列表
      // taskNo: "2021081600000021",
      isImgSuccess: false, //记录图片是否上传成功
      itemInfo: JSON.parse(this.$route.query.itemInfo),
      busiFileType: this.$route.query.busiFileType,
    };
  },
  computed: {},
  created() {
    if (this.flag == "yxzl") {
      this.title = "现场影像资料";
      this.text = "影像资料";
    } else if (this.flag == "ht") {
      this.title = "合同";
      this.text = "合同";
    } else if (this.flag == "sqs") {
      this.title = "授权书";
      this.text = "授权书";
    }
  },
  mounted() {
    
    
    if (JSON.parse(this.$route.query.imgList)) {
      this.imageData = dealImgList(JSON.parse(this.$route.query.imgList));
    }
    //获取位置信息
    getLocation()
      .then((res) => {
        this.locationInfo = res;
      })
      .catch((e) => {});
  },
  methods: {
    // 删除图片提示弹框
    del(index) {
      this.deleteShow = true;
      this.popTitleImg = this.imageData[index];
      this.imgIndex = index;

      if (this.flag == "yxzl") {
        this.tip = "您确定要删除该影像资料吗";
      } else if (this.flag == "ht") {
        this.tip = "您确定要删除该合同吗";
      } else if (this.flag == "sqs") {
        this.tip = "您确定要删除该授权书吗";
      }
    },
    // 提交图片
    submit() {
      this.imageData.forEach((element) => {
        if (element.flag == "local") {
          if (element.type == "mp4") {
            this.onlyVideoList.push({
              fingerPrint: element.fingerPrint, //文件地址
              fileType: "mp4", //文件id
              fileId: element.fileId, //文件id
            });
          } else {
            this.onlyImgsData.push(
              element.url.replace("data:image/png;base64,", "")
            );
          }
        }
      });
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.uploadImgList();
    },
    // 上传图片
    uploadImgList() {
      if (this.isImgSuccess) {
        if (this.onlyVideoList.length > 0) {
          this.uploadVideo();
        } else {
          this.$toast("请添加要上传图片或者视频");
        }
      } else {
        if (this.onlyImgsData.length > 0) {
          let url;
          if (this.category == "zh") {
            url = apiUrl.zhUploadImg;
          } else {
            url = apiUrl.lsUploadImg;
          }
          ajaxPost(url, {
            inputDate: this.itemInfo.DISPOSALDATE,
            busiFileType: this.busiFileType,
            images: this.onlyImgsData,
            taskNo: this.itemInfo.SERIALNO,
          })
            .then((res) => {
              if (this.onlyVideoList.length > 0) {
                this.uploadVideo();
              } else {
                this.tip = "提交成功";
                this.submitShow = true;
                this.$toast.clear();
              }
              this.isImgSuccess = true;
            })
            .catch((error) => {
              this.$toast.clear();
            });
        } else {
          if (this.onlyVideoList.length > 0) {
            this.uploadVideo();
          } else {
            this.$toast("请添加要上传图片或者视频");
          }
        }
      }
    },
    //视频上传
    uploadVideo() {
      let url;
      if (this.category == "zh") {
        url = apiUrl.zhUploadVideo;
      } else {
        url = apiUrl.lsUploadVideo;
      }
      let querys = {
        inputDate: this.itemInfo.DISPOSALDATE,
        busiFileType: this.busiFileType,
        taskNo: this.itemInfo.SERIALNO,
        videos: this.onlyVideoList,
      };
      ajaxPost(url, querys)
        .then((res) => {
          this.$toast.clear();
          this.tip = "提交成功";
          this.submitShow = true;
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    // 提交确定
    submitConfirm() {
      this.submitShow = false;
      this.$router.go(-1);
    },
    // 删除确定
    deleteConfirm() {
      this.deleteShow = false;
      let data = this.imageData[this.imgIndex];
      this.imageData.splice(this.imgIndex, 1);
      this.$refs.delImgs.deleteImgOrVideo(data);
    },
  },
};
</script>

<style scoped>
.updateContract {
  width: 100%;
  display: flex;
  font-size: 28px;
  background: var(--color-Lightgray-bg);
  flex-direction: column;
}
/* 合同或者影像资料 部分 */
.content_div {
  padding-top: 92px;
}
.middle_div {
  width: 100%;
  background: white;
  display: flex;
  margin-top: 24px;
  padding: 24px 24px 24px 24px;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 4px;
}
.horital_div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contract_div {
  display: flex;
  width: 84%;
  padding: 10px 12px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-split-line);
}
.texts {
  font-weight: bold;
}
.drop_icon {
  color: var(--color-gray-text);
  font-size: 18px;
}
/* 删除按钮 */
.dele_img {
  width: 40px;
}
/* 添加按钮 */
.add_btn {
  color: var(--color-orange-text);
  font-size: 32px;
  width: 100%;
  height: 110px;
  margin-top: 24px;
  line-height: 110px;
  text-align: center;
  border-radius: 4px;
  background-color: #fff;
}
.add_btn img {
  width: 30px;
  vertical-align: middle;
}
.add_btn span {
  font-size: 32px;
  margin-left: 10px;
}
/* 提示文字 */
.tip_span {
  color: red;
  font-size: 22px;
  width: calc(100% - 48px);
  text-align: center;
  margin: 30px 24px;
}
/* 确认提交 */
.commit_div {
  font-size: 28px;
  width: 660px;
  height: 80px;
  margin-left: 45px;
  margin-top: 60px;
  border-radius: 200px;
  line-height: 80px;
  color: white;
  text-align: center;
  margin-bottom: 50px;
  background: var(--color-orange-text);
}
/* 删除 */
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

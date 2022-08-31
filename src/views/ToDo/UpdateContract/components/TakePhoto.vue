<template>
  <!-- 影像资料上传加水印（已用）-->
  <div class="ImageData">
    <div class="img_div">
      <!-- 图片列表 -->
      <div class="img_main" v-for="(item, index) in imageData" :key="index">
        <van-image
          class="img_item"
          fit="cover"
          width="100%"
          height="100%"
          :src="item.url"
          @click="toPreviewImg(index)"
        />
        <img
          src="@/assets/images/guanbi-2.png"
          alt
          v-if="item.flag == 'local'"
          class="del_img"
          @click="deleteData(index)"
        />
      </div>

      <!-- 添加图标 -->
      <van-image
        fit="cover"
        class="add_img"
        @click="choose()"
        :src="require('@/assets/images/yxzl_tj_icon.png')"
      />

      <van-action-sheet
        v-model="actionSheetIsShow"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="onSelect"
      />
      <!-- 播放视频的弹窗 -->
      <van-popup v-model="shows" class="video_popups">
        <video controls :src="localUrl" id="myVideo" width="100%"></video>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  getLocation,
  MXCamera,
  MXVideo,
  palyVideo,
  updateImg
} from "@/utils/mxapi.js";
import { ImagePreview } from "vant";
import { filePreview } from "@/api.js";
import { removeItem } from "@/utils/index.js";
export default {
  name: "TakePhoto",
  components: {},
  props: {
    locationInfo: String,
    imageData: Array
  },
  data() {
    return {
      videoSrc: "",
      position: "",
      type: "",
      actionSheetIsShow: false, //动作面板是否展示
      localUrl: "",
      shows: false, //是否展示视频播放的弹窗
      actions: [{ name: "拍照" }, { name: "录频" }],
      numList: [], //统计本地添加视频和图片的数量
      GUARANTORNAME: localStorage.getItem("GUARANTORNAME"),
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    imageData(val, oldVal) {
      //普通的watch监听
      // console.log("数据变化：" + val.length);
      this.imageData = val;
    }
  },
  methods: {
    // 选择照片还是视频
    choose() {
      if (this.numList.length >= 10) {
        this.$dialog
          .alert({
            title: "标题",
            message: "单次上传视频或者图片的最大数量为：10"
          })
          .then(() => {
            // on confirm
          });
      } else {
        this.actionSheetIsShow = true;
      }
    },
    // 动作面板选择
    onSelect(item) {
      this.actionSheetIsShow = false;
      switch (item.name) {
        case "拍照":
          this.addImgs();
          break;
        case "录频":
          this.addvideo();
          break;
      }
    },
    // 点击动作面板取消
    onCancel() {
      this.actionSheetIsShow = false;
    },
    // 父组件调取删除统计数组中的数据
    deleteImgOrVideo(data) {
      this.numList = removeItem(this.numList, data);
    },
    // 上传图片
    addImgs() {
      // 获取地理位置
      if (this.locationInfo) {
        this.position = this.locationInfo;
        MXCamera(this.position)
          .then(base64 => {
            this.imageData.push({
              url: "data:image/png;base64," + base64,
              type: "png",
              flag: "local"
            });
            this.numList.push("data:image/png;base64," + base64);
          })
          .catch(e => {
            // console.log(`e:${e}`);
            this.$toast.fail("拍照调用失败");
          });
      } else {
        getLocation()
          .then(res => {
            this.position = res;
            MXCamera(this.position)
              .then(base64 => {
                this.imageData.push({
                  url: "data:image/png;base64," + base64,
                  type: "png",
                  flag: "local"
                });
                this.numList.push("data:image/png;base64," + base64);
              })
              .catch(e => {
                // console.log(`e:${e}`);
                this.$toast.fail("拍照调用失败");
              });
          })
          .catch(e => {});
      }
    },
    toPreviewImg(index) {
      if (
        this.imageData[index].type.toLowerCase() == "png" ||
        this.imageData[index].type.toLowerCase() == "jpg" ||
        this.imageData[index].type.toLowerCase() == "jpeg"
      ) {
        // 图片预览
        ImagePreview([this.imageData[index].url]);
      } else if (this.imageData[index].type.toLowerCase() == "mp4") {
        // 视频预览
        if (this.imageData[index].flag == "local") {
          this.localUrl = this.imageData[index].videoUrl;
          palyVideo(this.localUrl);
        } else {
          this.$toast("手机端不支持视频播放，请去电脑端查看");
        }
      } else if (this.imageData[index].type.toLowerCase() == "pdf") {
        // 文档预览
        filePreview({
          fileType: "pdf",
          resourceUrl: this.imageData[index].fileUrl
        });
      }
    },
    deleteData(index) {
      this.$emit("del", index);
    },
    // 视频拍摄
    addvideo() {
      MXVideo()
        .then(base64 => {
          let videoSrc = "";
          let res = "";
          if (device.platform.toUpperCase() === "IOS") {
            res = base64;
            videoSrc = res.localRes[0].url;
          } else {
            res = JSON.parse(base64);
            videoSrc = res.localRes[0].url;
          }

          updateImg([videoSrc])
            .then(res => {
              this.imageData.push({
                url: require("@/assets/images/video.png"),
                videoUrl: videoSrc,
                type: "mp4",
                flag: "local",
                fingerPrint: JSON.parse(res)[0].fingerprint, //文件地址
                fileType: "mp4", //文件id
                fileId: JSON.parse(res)[0].serverId //文件id
              });
              this.numList.push(videoSrc);
            })
            .catch(error => {});
        })
        .catch(e => {
          // console.log(`e:${e}`);
          this.$toast.fail("摄像调用失败");
        });
    }
  }
};
</script>

<style scoped>
.ImageData {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding-top: 15px;
  font-size: 14px;
}
.img_div {
  width: 100%;
  /* margin-top: 30px; */
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.img_main {
  position: relative;
  float: left;
  width: 20%;
  margin-left: 4%;
  margin-top: 50px;
}
.img_main::before {
  content: "";
  padding-top: 100%;
  display: block;
}

.img_main .del_img {
  position: absolute;
  top: 0;
  right: 0;
  height: 34px;
  width: 34px;
  padding: 0 0 20px 20px;
}
.img_item {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.add_img {
  width: 20%;
  margin-left: 4%;
  height: 100%;
  float: left;
  margin-top: 50px;
}
.delete_img {
  width: 22px;
  height: 22px;
  padding: 10px;
  position: absolute;
  top: -15px;
  right: -15px;
}
.video_popups {
  width: 84%;
}
</style>

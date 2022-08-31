<template>
  <!--   上传合同或者影响资料页面 -->
  <div class="updateContract" v-if="st == 'true'">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="top_div">
      <div class="texts">
        {{ text }}
      </div>
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
        </div>
      </div>
    </div>
  </div>
  <div class="all" v-else>
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="photo">
      <img src="@/assets/images/nopic.png" alt="" class="images" />
      <div class="font">未查询到核保资料</div>
    </div>
  </div>
</template>
<script>
import ItemNavBar from "@/components/ItemNavBar.vue";
import { filePreview } from "@/api.js";
import { ImagePreview } from "vant";
import { dealImgList } from "@/utils/index.js";

export default {
  name: "imageData",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      imageData: [],
      flag: this.$route.query.flag,
      st: this.$route.query.st,
      category: this.$route.query.category,
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
    } else if (this.flag == "sfhc") {
      this.title = "身份核验";
      this.text = "身份核验";
    }
  },
  mounted() {
    if (this.$route.query.imgList) {
      this.imageData = dealImgList(JSON.parse(this.$route.query.imgList));
    }
  },
  methods: {
    toPreviewImg(index) {
      if (
        this.imageData[index].type.toLowerCase() == "png" ||
        this.imageData[index].type.toLowerCase() == "jpg" ||
        this.imageData[index].type.toLowerCase() == "jpeg"
      ) {
        ImagePreview([this.imageData[index].url]);
      } else if (this.imageData[index].type.toLowerCase() == "mp4") {
        this.$toast("手机端不支持视频播放，请去电脑端查看");
      } else if (this.imageData[index].type.toLowerCase() == "pdf") {
        // 文件预览
        filePreview({
          fileType: "pdf",
          resourceUrl: this.imageData[index].fileUrl,
        });
      }
    },
  },
};
</script>

<style scoped>
.updateContract {
  width: 100%;
  display: flex;
  padding-top: 92px;
  font-size: 28px;
  background: var(--color-Lightgray-bg);
  flex-direction: column;
}
.texts {
  font-weight: bold;
  margin-left: 24px;
}
.top_div {
  background: white;
  margin-top: 30px;
  margin-left: 24px;
  margin-right: 24px;
}
.img_div {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.img_main {
  display: inline-block;
  margin-right: 30px;
  position: relative;

  width: 120px;
  height: 120px;
  margin-bottom: 30px;
}
.img_main::before {
  content: "";
  padding-top: 100%;
  display: block;
}
.img_main .del {
  position: absolute;
  top: 0;
  right: 0;
  height: 24px;
  width: 24px;
}
.img_item {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.texts {
  margin-top: 20px;
  font-weight: bold;
}
.all {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
/* 图片样式 */
.photo {
  padding-top: 92px;
  text-align: center;
}
.images {
  margin-top: 180px;
  height: 200px;
  width: 200px;
}
.font {
  font-size: 28px;
  color: #999999;
}
</style>

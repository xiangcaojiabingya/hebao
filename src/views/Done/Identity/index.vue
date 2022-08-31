<template>
  <!-- 身份核验-已核验 -->
  <div class="Identity">
    <item-nav-bar title="身份核验"></item-nav-bar>
    <div class="content" v-if="check == true">
      <div class="top">
        <img :src="img.img1" alt />
        <img :src="img.img2" alt />
        <img :src="img.img3" alt />
      </div>
      <div class="bottom">
        <p>认证通过</p>
        <button class="btn" @click="btn">返回</button>
      </div>
    </div>
    <div class="content" v-else>
      <div class="content_top">
        <img src="@/assets/images/nopic.png" alt />
      </div>
      <div class="bottom">
        <p>未进行核验</p>
        <!-- <button class="btn" @click="btn">返回</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { setWebViewTitle } from "@/utils/mxapi.js";
import ItemNavBar from "@/components/ItemNavBar.vue";
export default {
  name: "Identity",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      img: {
        img1: require("@/assets/images/zjsc_sfzzm_pic1.png"),
        img2: require("@/assets/images/zjsc_sfzbm_pic.png"),
        img3: require("@/assets/images/zjsc_sfzzm_pic.png"),
      },
      check: true
    };
  },
  computed: {},
  created() {},
  mounted() {
    setWebViewTitle("身份核验");
  },
  methods: {
    btn() {
      window.history.go(-1);
    }
  }
};
</script>

<style scoped>
.Identity {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.content {
  text-align: center;
  background-color: #fff;
  margin: 0 auto;
  padding-top: 92px;
}
.top {
  display: flex;
  flex-flow: column;
}
.top img {
  width: 440px;
  margin: 0 auto;
  margin-top: 50px;
}
.bottom {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 50px;
}
.bottom p {
  font-size: 28px;
  color: #999999;
}
.btn {
  width: 660px;
  height: 80px;
  border-radius:50px;
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
.content_top {
  display: flex;
  flex-flow: column;
  margin-top: 180px;
}
.content_top img {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
</style>
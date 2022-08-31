<template>
  <!--   首页、菜单页导航栏 -->
  <div class="item-nav-bar" :class="{ 'title-border': border }">
    <div>
      <div class="van-nav-bar__left" @click="onClickLeft">
        <img v-if="show" :src="imgUrl[1]" width="24" height="24" />
      </div>
      <div class="van-nav-bar__title van-ellipsis">{{ title }}</div>
      <div class="van-nav-bar__right" @click="onClickRight">
        <img :src="imgUrl[0]" width="20" height="20" />
      </div>
    </div>
  </div>
</template>

<script>
import { closeApp } from "@/utils/mxapi.js";
export default {
  name: "ItemNavBar", //顶部标题栏
  components: {},
  props: {
    title: {
      type: String,
      default: "Title"
    },
    lefttext: {
      type: String,
      default: ""
    },
    leftSet: {
      type: String,
      default: "FINISH"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgUrl: [
        require("@/assets/images/close_app_icon_white.png"),
        require("@/assets/images/left_jr_icon.png")
      ],
      show: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      closeApp();
    }
  },
  mounted() {
    if (this.leftSet == "FINISH") {
      this.show = false;
    }
  },
  activated() {}
};
</script>

<style scoped>
.item-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  height: 92px;

  z-index: 100;
}
.van-nav-bar {
  position: relative;
  z-index: 1;
  line-height: 44px;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
}
.van-nav-bar__left,
.van-nav-bar__right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 24px;
  font-size: 28px;
  cursor: pointer;
}
.van-nav-bar__left {
  left: 0;
  /* display: none; */
}
.van-nav-bar__right {
  right: 0;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: #ffffff;
  font-weight: 500;
  font-size: 36px;
  margin-top: 20px;
  text-align: center;
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
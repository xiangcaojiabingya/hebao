<template>
  <!--首页选择 -->
  <div class="Index">
    <ItemNavBar title="授信核保" :leftIconIsshow="false"></ItemNavBar>
    <div class="top">
      <span class="first">您好，</span>
      <span class="second">{{ name }}&nbsp;&nbsp;({{ work }})</span>
      <span class="last">请选择处理哪种业务</span>
    </div>
    <div
      class="middle"
      v-for="(item, index) in list"
      :key="index"
      @click="btn(item)"
    >
      <img class="middle_left" :src="item.img" alt />
      <div class="middle_content">
        <span class="content_top">{{ item.name }}</span>
        <span class="content_bottom">{{ item.text }}</span>
      </div>
      <img class="middle_right" src="@/assets/images/fanhui.png" alt />
    </div>
  </div>
</template>

<script>
import { hideWebViewTitle, getSSOToken } from "@/utils/mxapi.js";
import ItemNavBar from "@/components/ItemNavBar.vue";
import {
  ajaxGet,
  apiUrl,
  chnlCode,
  client_secret,
  app_id,
  clientId,
  bearerToken,
  ajaxPostNormal,
} from "@/api.js";

import { GetKey } from "@/utils/AESCryptoJS.js";
export default {
  name: "Index",
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      name: "",
      work: "",
      list: [
        {
          name: "零售信贷",
          text: "去处理零售信贷授信核保业务",
          img: require("../assets/images/ls.png"),
          category: "ls",
        },
        {
          name: "综合信贷",
          text: "去处理综合信贷授信核保业务",
          img: require("../assets/images/zh.png"),
          category: "zh",
        },
      ],
      chnlCode: chnlCode, //平台常量
      client_secret: client_secret, //平台常量
      app_id: app_id, //应用id
    };
  },
  computed: {},
  created() {},
  mounted() {
    hideWebViewTitle();
    // 获取AES加密key
    localStorage.setItem("aesKey", GetKey());
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    //获取接口管理平台Token
    ajaxGet(apiUrl.getToken.url)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        this.getMXToken();
      })
      .catch((error) => {
        this.$toast.clear();
      });
  },
  methods: {
    btn(item) {
      this.$router.push({
        path: "/Home",
        query: {
          category: item.category, // ls--点击零售信贷  zh--点击综合信贷
          name: this.name,
          work: this.work,
        },
      });
    },
    //单点登录
    ssoLogin(res) {
      ajaxPostNormal(apiUrl.ssoLogin, {
        appId: clientId,
        bearerToken: bearerToken,
        token: res,
      })
        .then((res) => {
          localStorage.setItem("empNo", res.data.loginName); //保存当前登录用户的工号
          let nameStart = res.data.name;
          if (nameStart.indexOf(" ") != -1) {
            this.name = nameStart.split(" ").join("");
          } else {
            this.name = nameStart;
          }
          localStorage.setItem("name", this.name); //保存当前登录用户的姓名
          this.work = localStorage.getItem("empNo");
          this.$toast.clear();
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    //获取敏行平台的token
    getMXToken() {
      if (process.env.NODE_ENV === "production") {
        getSSOToken(this.app_id).then((res) => {
          //PAIAAHhtj3iK5no49kiSdmXGczgI1O3RtzYkYbGZ9izmXCIX
          this.ssoLogin(res);
        });
      } else {
        let res = "PAIAAHVzAxxM4F7xbET7jv3Rd49LbYSJvzJ2ShcAItkgiYFe";
        this.ssoLogin(res);
      }
    },
  },
};
</script>

<style scoped>
.Index {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.top {
  padding-top: 92px;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-left: 45px;
  padding-bottom: 40px;
}
span.first {
  color: var(--color-black-text);
  font-size: 36px;
  font-weight: bolder;
}
span.second {
  color: var(--color-black-text);
  font-size: 36px;
  font-weight: bolder;
  margin-top: 14px;
}
span.last {
  font-size: 24px;
  color: var(--color-gray-text);
  margin-top: 14px;
}
/* 中间 */
.middle {
  display: flex;
  /* justify-content: space-between; */
  background-color: #f5f9ff;
  margin-top: 40px;
  margin-left: 45px;
  margin-right: 45px;
}
.middle_left {
  width: 130px;
  height: 120px;
  margin: 47px 48px 47px 50px;
}
.middle_content {
  display: flex;
  flex-direction: column;
  margin: auto 0;
}
.content_top {
  font-size: 40px;
  font-weight: 400;
  color: #333333;
  margin-bottom: 14px;
}
.content_bottom {
  font-size: 24px;
  color: #999999;
}
.middle_right {
  width: 18px;
  height: 32px;
  margin: auto 0;
  margin-left: 68px;
}
</style>

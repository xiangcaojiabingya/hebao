<template>
  <!-- 首页菜单 -->
  <div class="Index">
    <div class="top">
      <Nav title="授信核保" :leftSet="leftSet">
        <!-- <template #left>
          <img class="tupian" src="../assets/images/left_jr_icon.png" alt />
        </template>-->
        <template #right>
          <img
            class="tupian"
            src="../assets/images/close_app_icon_white.png"
            alt
          />
        </template>
      </Nav>
      <div class="middle">
        <div class="content">
          <div class="content_left">
            <img class="tp" src="../assets/images/head_pic.png" alt />
            <span class="content1"
              >{{ arrs.name }}&nbsp;&nbsp;{{ arrs.userid }}</span
            >
          </div>
          <div class="content_right">
            <p class="choose" @click="choose">切换账号</p>
          </div>

          <!-- Pick选择 -->
          <van-popup v-model="show" position="bottom">
            <van-picker
              title="标题"
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="onCancel"
              value-key="USERID"
            />
          </van-popup>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-top">
        <div
          class="content"
          v-for="(item, index) in list"
          :key="index"
          @click="btn(item)"
        >
          <div class="content-left">
            <img :src="item.img" />
            <p>{{ item.title }}</p>
          </div>
          <div class="content-right">
            <!-- <van-badge
              class="badge"
              :content="item.content"
              v-if="item.content > 0"
            />-->
            <div class="badge" v-if="item.content > 0">{{ item.content }}</div>
            <img class="jiantou" src="../assets/images/big_arrow.png" alt />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <img src="../assets/images/rzbank_pic.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { ajaxPost, apiUrl } from "@/api.js";
import { hideWebViewTitle } from "@/utils/mxapi.js";

export default {
  name: "Home",
  components: {
    Nav,
  },
  props: {},
  data() {
    return {
      leftSet: "leftSet",
      category: this.$route.query.category,
      name: this.$route.query.name,
      work: this.$route.query.work,
      arrs: {
        name: this.$route.query.name,
        userid: "",
      },
      list: [],
      columns: [],
      show: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    hideWebViewTitle();
    localStorage.setItem("category", this.category);
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    this.login();
  },
  methods: {
    login() {
      var data = {
        LOGINID: this.work,
      };
      if (this.category == "zh") {
        var api = apiUrl.userQuery;
      } else {
        var api = apiUrl.queryLsUserId;
      }
      ajaxPost(api, data)
        .then((res) => {
          var userIdList = res;
          var data = userIdList[0];
          this.arrs.userid = data.USERID;
          localStorage.setItem("userId", this.arrs.userid);
          this.columns = res;
          this.getMenuList();
        })
        .catch((error) => {
          this.$toast.clear();
          console.log(error);
        });
    },
    getMenuList() {
      let data = {
        LOGINID: localStorage.getItem("empNo"), //工号
        USERID: localStorage.getItem("userId"), //信贷号
      };
      let api;
      if (this.category == "zh") {
        // 综合
        api = apiUrl.zhMenuList;
      } else {
        // 零售
        api = apiUrl.lsMenuList;
      }
      ajaxPost(api, data)
        .then((res) => {
          this.$toast.clear();
          if (res.MENULIST == undefined) {
            this.$toast("该用户没有权限： 请检查该用户");
            return;
          }
          this.list = [];
          let menuList = res.MENULIST;
          if (menuList.length == 0) {
            this.$toast("该用户没有权限： 请检查该用户");
            return;
          }
          menuList.forEach((element) => {
            // 查询
            if (element.MENUID == "6001200010" || element.MENUID == "0861") {
              this.list.push({
                title: "查询",
                img: require("../assets/images/db.png"),
                type: "query", // 跳转传参type
                MENUID: element.MENUID,
              });
            }
            // 核保岗
            if (element.MENUID == "6001200030" || element.MENUID == "0863") {
              this.list.push({
                title: "核保待办任务",
                img: require("../assets/images/yb.png"),
                content: element.COUNT,
                type: "db",
                MENUID: element.MENUID,
              });
            }
            // 分配
            if (element.MENUID == "6001200020" || element.MENUID == "0862") {
              this.list.push({
                title: "任务分配",
                img: require("../assets/images/rwfp.png"),
                content: element.COUNT,
                type: "rwfp",
                MENUID: element.MENUID,
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.$toast.clear();
        });
    },
    btn(item) {
      if (item.type == "query") {
        let permissions;
        if (this.list.length == 3) {
          permissions = "hbfp";
        } else if (this.list.length == 2) {
          this.list.forEach((element) => {
            // 核保岗
            if (element.MENUID == "6001200030") {
              permissions = "hb";
            }
            // 分配
            if (element.MENUID == "6001200020") {
              permissions = "fp";
            }
          });
        }

        this.$router.push({
          path: "/Query",
          query: {
            randomID: new Date().getTime(),
            type: item.type,
            meauPermissions: permissions,
            category: this.category,
          },
        });
      } else if (item.type == "db") {
        this.$router.push({
          path: "/QueryUnderwriting",
          query: {
            type: item.type,
            category: this.category,
          },
        });
      } else if (item.type == "rwfp") {
        this.$router.push({
          path: "/TaskDispatch",
          query: {
            type: item.type,
            category: this.category,
          },
        });
      }
    },
    choose() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.show = false;
      this.arrs.userid = value.USERID;
      localStorage.setItem("userId", this.arrs.userid);
      // 刷新菜单权限
      this.getMenuList();
    },
    //取消选择
    onCancel() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.main {
  font-size: 42px;
  text-align: center;
}

.Index {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}

.top {
  width: 100%;
  height: 440px;
  background-image: url("../assets/images/banner_pic.png");
  background-size: 100% 100%;
  text-align: center;
  position: relative;
}

.tupian {
  height: 44px;
}

.middle {
  width: 100%;
  top: 92%;
  position: absolute;
  /* text-align: center; */
  /* background-size: contain; */
}

.middle .content {
  width: 94%;
  height: 72px;
  /* line-height: 72px; */
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  margin: 0 auto;
  /* background-size: 100% 100%; */
  /* padding: 2px 0; */
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}

.content_left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tp {
  width: 36px;
  height: 36px;
  margin-left: 40px;
  /* margin: auto 0 auto 40px; */
}

span.content1 {
  color: #333333;
  font-size: 28px;
  margin: 0 20px;
  /* height: 72px; */
  /* line-height: 72px; */
}

.content_right {
  margin-right: 24px;
}

.choose {
  font-size: 24px;
  color: #ff6619;
  margin: auto 0;
}

.footer {
  text-align: center;
  margin-top: 60px;
}

.footer-top .content {
  width: 94%;
  margin: 0 auto;
  border-radius: 10px;
  height: 180px;
  line-height: 180px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 24px;
}

.content-left {
  display: flex;
}

.content-left img {
  width: 60px;
  height: 60px;
  margin: auto 40px auto 40px;
}

.content-left p {
  font-size: 38px;
  font-weight: 500;
  margin-left: 20px;
  margin: 0;
  padding: 0;
}

.content-right {
  margin: auto 20px;
  display: flex;
}

.badge {
  background-color: red;
  border-radius: 20px;
  margin-right: 10px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}

.content-right .jiantou {
  width: 30px;
  height: 30px;
  margin: auto;
}
.footer-bottom {
  position: absolute;
  width: 100%;
  bottom: 10%;
}
.footer-bottom img {
  width: 35%;
  margin-top: 60px;
}
</style>

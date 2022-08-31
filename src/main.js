import Vue from 'vue'
import App from './App.vue'
import router from "@/router/index"
// 有赞UI库
import Vant from 'vant';
import 'vant/lib/index.css';
// 通用样式
import "@/assets/base.css";
import "@/assets/css/vant.css";

import 'amfe-flexible'

// 判断是否使用mock数据
if (process.env.VUE_APP_MOCK === "true") {
  require('./mock');
}


Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

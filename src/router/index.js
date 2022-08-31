import Vue from "vue";
import VueRouter from "vue-router"

// 通用模块路由
import CommonRouter from "./commonRouter"


Vue.use(VueRouter)


var router = new VueRouter({
    routes: [
        { //默认
            path: '/',
            redirect: 'Index'
        },
        ...CommonRouter],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }

})


export default router;
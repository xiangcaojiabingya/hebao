export default [
    // 首页 
    {
        path: "/Index",
        name: "Index",
        component: () => import("@/views/Index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 首页菜单
    {
        path: "/Home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 待办查询
    {
        path: "/Query",
        name: "Query",
        component: () => import("@/views/Query/index.vue"),
        meta: {
            keepAlive: true // 需要被缓存
        },
    },
    // 核保待办查询
    {
        path: "/QueryUnderwriting",
        name: "QueryUnderwriting",
        component: () => import("@/views/QueryUnderwriting/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 上传身份证
    {
        path: "/IdCard",
        name: "IdCard",
        component: () => import("@/views/ToDo/IdCard/index.vue"),
        meta: {
            keepAlive: true // 需要被缓存
        },
    },
    // 人脸识别
    {
        path: "/face",
        name: "face",
        component: () => import("@/views/ToDo/face/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 已办-身份核验
    {
        path: "/Identity",
        name: "Identity",
        component: () => import("@/views/Done/Identity/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 任务分发-未分配
    {
        path: "/TaskDetail",
        name: "TaskDetail",
        component: () => import("@/views/Tasking/TaskDetail/index.vue"),
        meta: {
            keepAlive: true // 需要被缓存
        },
    },
    // 任务分发-已分配
    {
        path: "/TaskDetailDone",
        name: "TaskDetailDone",
        component: () => import("@/views/Tasking/TaskDetailDone/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },

    // 核保人员详情
    {
        path: "/AllPeop",
        name: "AllPeop",
        component: () => import("@/views/Tasking/AllPeop/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    {
        // 待办零售信贷
        path: '/retailCredit',
        name: '零售信贷',
        component: () => import('@/views/ToDo/retailCredit/index'),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        // 待办综合信贷
        path: '/comprehensiveCredit',
        name: '综合信贷',
        component: () => import('@/views/ToDo/comprehensiveCredit/index'),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        // 已办影像资料上传
        path: '/imageData',
        name: '影像资料',
        component: () => import('@/views/Done/imageData/index'),
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        // 合同和影像资料上传
        path: '/UpdateContract',
        name: "UpdateContract",
        component: () => import("@/views/ToDo/UpdateContract/index"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    }, {
        // 任务分配列表
        path: "/TaskDispatch",
        name: "TaskDispatch",
        component: () =>
            import("@/views/Tasking/TaskDispatch/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },
    },
    // 综合已办
    {
        path: "/comprehensiveCredits",
        name: "comprehensiveCredits",
        component: () => import("@/views/Done/businessInformation/comprehensiveCredits/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },

    },
    // 零售已办
    {
        path: "/retailCredits",
        name: "retailCredits",
        component: () => import("@/views/Done/businessInformation/retailCredits/index.vue"),
        meta: {
            keepAlive: false // 需要被缓存
        },

    },


]
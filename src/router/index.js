import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'
import { Message } from 'element-ui'
import getTitle from '@/utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: { title: '登录页' },
        hidden: true,
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true,
    },
    {
        path: '/',
        name: 'Home',
        component: Layout,
        redirect: '/dashbord',
        children: [
            {
                path: 'dashbord',
                name: 'Dashbord',
                component: () => import('@/views/dashboard'),
                meta: { title: '首页', icon: 'el-icon-s-data' },
            },
        ],
    },
    {
        path: '/personal',
        name: 'Personal',
        component: Layout,
        redirect: '/personal/index',
        hidden: true,
        children: [
            {
                path: 'index',
                name: 'Personal-index',
                component: () => import('@/views/personal'),
                meta: { title: '个人中心' },
            },
        ],
    },
]
/*动态添加routers*/
export const asyncRoutes = [
    // {
    //     path: '/table',
    //     name: 'Table',
    //     redirect: '/table/base-table',
    //     component: Layout,
    //     meta: {
    //         title: 'Table',
    //         icon: 'el-icon-table iconfont',
    //     },
    //     children: [
    //         {
    //             path: 'base-table',
    //             name: 'BaseTable',
    //             component: () => import('@/views/table/common-table'),
    //             meta: { title: '普通表格' },
    //         },
    //         {
    //             path: 'complex-table',
    //             name: 'ComplexTable',
    //             component: () => import('@/views/table/complex-table'),
    //             meta: { title: '复杂表格' },
    //         },
    //     ],
    // },
    {
        path: '/user',
        name: 'User',
        redirect: '/user/base-user',
        component: Layout,
        meta: {
            title: 'User',
            icon: 'el-icon-user',
        },
        children: [
            {
                path: 'user_',
                name: 'UserList',
                component: () => import('@/views/user/user.vue'),
                meta: { title: '用户管理' },
            },
            {
                path: 'role_',
                name: 'RoleUser',
                component: () => import('@/views/role/role'),
                meta: { title: '角色管理' },
            },
            {
                path: 'role_setting',
                name: 'RoleSet',
                component: () => import('@/views/role/role_set'),
                meta: { title: '角色设置' },
            },
            {
                path: 'permission_',
                name: 'PermissionUser',
                component: () => import('@/views/permission/permission'),
                meta: { title: '权限管理' },
            },
        ],
    },
    {
        path: '/order',
        name: 'Order',
        redirect: '/order/alipay-order',
        component: Layout,
        meta: {
            title: 'Order',
            icon: 'el-icon-s-order',
        },
        children: [
            {
                path: 'alipay-order',
                name: 'AlipayOrder',
                component: () => import('@/views/order/alipay_order.vue'),
                meta: { title: '支付宝订单' },
            },
        ],
    },
    {
        path: '/error',
        component: Layout,
        name: 'Error',
        redirect: '/error/404',
        hidden: true,
        children: [
            {
                path: '404',
                name: 'Page404',
                component: () => import('@/views/error-page/404'),
                meta: { title: '404', icon: 'el-icon-s-release' },
            },
        ],
    },
    {
        path: 'https://github.com/gcddblue/vue-admin-webapp',
        name: 'Github',
        hidden: true,
        meta: { icon: 'el-icon-link', title: '项目链接' },
    },
    {
        path: '*',
        name: '*404',
        redirect: '/404',
        hidden: true,
    },
]
const creatRouter = () => {
    return new Router({
        routes: currencyRoutes,
        scrollBehavior() {
            return { x: 0, y: 0 }
        },
    })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
    const reset = creatRouter()
    router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
    document.title = getTitle(to.meta.title)
    if (to.path === '/login') {
        next()
    } else {
        if (store.getters.token) {
            const hasRoles = store.getters.roles.length > 0
            // console.log('role', hasRoles)
            if (hasRoles) {
                next()
            } else {
                try {
                    // console.log('开始获取权限')
                    const res = await store.dispatch('user/_getInfo')
                    // console.log('roles', res)
                    // 过期
                    if (res.errorCode === '502') {
                        await store.dispatch('user/_refreshToken')
                    }
                    // 失效
                    if (res.errorCode === '503') {
                        Message.error(res.message)
                        localStorage.removeItem('token')
                        next({
                            path: '/login',
                            query: {
                                redirect: to.fullPath,
                            },
                        })
                    }
                    //TODO 获取菜单，按钮权限
                    let roles = [
                        'Home',
                        'Dashbord',
                        'Login',
                        '404',
                        'User',
                        'Table',
                        'BaseUser',
                        'RoleUser',
                        'UserList',
                    ]
                    const addRoutes = await store.dispatch('permission/getAsyncRoutes', roles)
                    // console.log('add', addRoutes)
                    router.addRoutes(addRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    Message.error(error)
                }
            }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            })
        }
    }
})
export default router

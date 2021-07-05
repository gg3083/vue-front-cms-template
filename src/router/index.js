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
]
/*动态添加routers*/
export const asyncRoutes = [
    {
        path: '/system_manager',
        name: 's:system:menu',
        redirect: '/system_manager/user',
        component: Layout,
        meta: {
            title: '系统权限',
            icon: 'el-icon-s-tools',
        },
        children: [
            {
                path: 'user',
                name: 's:system:sys_user:menu',
                component: () => import('@/views/user/user.vue'),
                meta: { title: '用户管理' },
            },
            {
                path: 'role',
                name: 's:system:sys_role:menu',
                component: () => import('@/views/role/role'),
                meta: { title: '角色管理' },
            },
            {
                path: 'role_setting',
                name: 's:system:sys_role_set:menu',
                component: () => import('@/views/role/role_set'),
                meta: { title: '角色设置' },
            },
            {
                path: 'permission',
                name: 's:system:sys_perm:menu',
                component: () => import('@/views/permission/permission'),
                meta: { title: '权限管理' },
            },
        ],
    },
    {
        path: '/order',
        name: 's:order:menu',
        redirect: '/order/alipay_order',
        component: Layout,
        meta: {
            title: 'Order',
            icon: 'el-icon-s-order',
        },
        children: [
            {
                path: 'alipay_order',
                name: 's:order:alipay_order:menu',
                component: () => import('@/views/order/alipay_order.vue'),
                meta: { title: '支付宝订单' },
            },
        ],
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
                    const addRoutes = await store.dispatch('permission/getAsyncRoutes', asyncRoutes)
                    console.log('add', addRoutes)
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

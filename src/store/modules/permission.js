import { currencyRoutes } from '@/router'

const state = {
    routes: [],
    addRoutes: [],
}
const mutations = {
    SET_ROUTES(state, payload) {
        state.routes = [...currencyRoutes, ...payload]
        state.addRoutes = payload
    },
}

function forSearchMenu(roles) {
    let menuNameList = []
    roles.forEach((item) => {
        if (item.children) {
            item.children = forSearchMenu(item.children)
        }
        menuNameList.push(item)
    })
    return menuNameList
}
// 遍历asyncRoutes动态路由
// 用户的权限，所有的权限
function forSearchArr(route, menuList) {
    let arrNew = []
    for (let item of menuList) {
        let itemNew = { ...item } //解决浅拷贝共享同一内存地址
        if (route.includes(itemNew.name)) {
            if (itemNew.children) {
                itemNew.children = forSearchArr(route, itemNew.children)
            }
            arrNew.push(itemNew)
        }
    }
    return arrNew
}
const actions = {
    getAsyncRoutes({ commit, rootGetters }, roles) {
        return new Promise((resolve) => {
            let routes = []
            // console.log('当前用户拥有的权限', rootGetters.roles)
            let menuList = forSearchMenu(roles)
            // console.log('所有的权限: ', menuList)
            routes = forSearchArr(rootGetters.roles, menuList)
            // console.log('routes', routes)
            // routes = routes.concat(currencyRoutes)
            commit('SET_ROUTES', routes)
            resolve(routes)
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

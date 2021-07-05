import { login, getInfo, refreshToken } from '@/api/user'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
    userName: '',
    roles: [],
    introduce: '',
}
const mutations = {
    SET_TOKEN(state, val) {
        state.token = val
        localStorage.setItem('token', val)
    },
    DEL_TOKEN(state) {
        state.token = ''
        state.userName = ''
        state.roles = ''
        state.introduce = ''
        localStorage.removeItem('token')
    },
    SET_ROLES(state, payload) {
        state.roles = payload
    },
    SET_NAME(state, payload) {
        state.userName = payload
    },
    SET_INTRODUCE(state, payload) {
        state.introduce = payload
    },
}
const actions = {
    // user login
    _login({ commit }, formdatas) {
        return new Promise((resolve, reject) => {
            login(formdatas)
                .then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        commit('SET_TOKEN', res.obj.token)
                        //
                        // commit('SET_ROLES', res.obj.roleAlias)
                        // commit('SET_NAME', res.obj.loginName)
                        // commit('SET_INTRODUCE', JSON.stringify(res.obj))
                    }
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    loginOut({ commit }) {
        commit('DEL_TOKEN')
        resetRouter()
        router.push({
            path: '/login',
            query: {
                redirect: '/',
            },
        })
    },
    _getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo()
                .then((res) => {
                    if (res.code === 0) {
                        const { loginName, realName, permList } = res.obj
                        commit('SET_ROLES', permList)
                        commit('SET_NAME', loginName)
                        commit('SET_INTRODUCE', realName)
                    } else {
                        console.log('reject', res)
                        reject(res)
                    }
                    resolve(res)
                })
                .catch((error) => {
                    console.log('reject error', error)
                    reject(error)
                })
        })
    },
    _refreshToken({ commit }) {
        return new Promise((resolve, reject) => {
            refreshToken()
                .then((res) => {
                    if (res.code === 0) {
                        commit('SET_TOKEN', res.obj)
                    }
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

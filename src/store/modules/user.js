import { login, getInfo, refreshToken } from '@/api/login'
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
                        console.log(document.cookie)
                        console.log(res.obj.token)
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
                        const { loginName, realName, roleAlias } = res.obj
                        commit('SET_ROLES', [roleAlias])
                        commit('SET_NAME', loginName)
                        commit('SET_INTRODUCE', realName)
                    } else {
                        if (!(res.errorCode === '502' || res.errorCode === '503')) {
                            Message.error(res.msg)
                        }
                        commit('SET_ROLES', ['LOGIN'])
                    }
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    _refreshToken({ commit }) {
        console.log('开始刷新token')
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

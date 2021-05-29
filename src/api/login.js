import $axios from './index'
import qs from 'qs'

export function login(data) {
    const url = '/user/login?' + qs.stringify(data)
    return $axios.postForFrom(url)
}

export function getInfo() {
    const url = '/user/'
    return $axios.get(url)
}

export function listUser(data) {
    const url = '/user/list'
    return $axios.get(url, data)
}

export function addUser(data) {
    const url = '/user/add'
    return $axios.post(url, data)
}

export function forbiddenUser(id) {
    const url = '/auth/user/forbidden/' + id
    return $axios.get(url)
}

export function normalUser(id) {
    const url = '/auth/user/normal/' + id
    return $axios.get(url)
}

export function refreshToken() {
    const url = '/user/refreshToken'
    return $axios.get(url)
}

export function upgradeUser(id, data) {
    const url = '/auth/user/upgrade/' + id
    return $axios.post(url, data)
}

export function setNickname(id, nickname) {
    const url = `/auth/user/setting/${id}/${nickname}`
    return $axios.post(url)
}

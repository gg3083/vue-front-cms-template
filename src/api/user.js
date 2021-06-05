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

export function refreshToken() {
    const url = '/user/refreshToken'
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
export function updateUser(id, data) {
    const url = '/user/update/' + id
    return $axios.post(url, data)
}
export function deleteUser(id) {
    const url = '/user/delete/' + id
    return $axios.post(url)
}
export function resetPwd() {
    const url = '/user/refreshToken'
    return $axios.get(url)
}

import $axios from './index'

export function listPerm(data) {
    const url = '/permission/list'
    return $axios.get(url, data)
}

export function addPerm(data) {
    const url = '/permission/add'
    return $axios.post(url, data)
}
export function updatePerm(id, data) {
    const url = '/permission/update/' + id
    return $axios.post(url, data)
}
export function deletePerm(id) {
    const url = '/permission/delete/' + id
    return $axios.post(url)
}

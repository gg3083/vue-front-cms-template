import $axios from './index'

export function listRole(data) {
    const url = '/role/list'
    return $axios.get(url, data)
}

export function addRole(data) {
    const url = '/role/add'
    return $axios.post(url, data)
}
export function updateRole(id, data) {
    const url = '/role/update/' + id
    return $axios.post(url, data)
}
export function deleteRole(id) {
    const url = '/role/delete/' + id
    return $axios.post(url)
}

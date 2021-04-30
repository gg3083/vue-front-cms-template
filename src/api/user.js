import $axios from './index'

export function listRole(data) {
    const url = '/role/list'
    return $axios.get(url, data)
}

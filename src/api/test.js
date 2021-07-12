import $axios from './index'

export function list1(params) {
    const url = '/recipe/list'
    return $axios.get(url, params)
}

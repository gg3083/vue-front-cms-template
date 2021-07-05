import $axios from './index'

export function listAlipayOrder(data) {
    const url = '/alipay-order/list'
    return $axios.get(url, data)
}

export function addAlipayOrder(data) {
    const url = '/alipay-order/add'
    return $axios.post(url, data)
}
export function updateAlipayOrder(id, data) {
    const url = '/alipay-order/update/' + id
    return $axios.post(url, data)
}
export function deleteAlipayOrder(id) {
    const url = '/alipay-order/delete/' + id
    return $axios.post(url)
}

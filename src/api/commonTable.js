import $axios from './index'
import qs from 'qs'

export function apiRequest(url, data) {
    return $axios.get(url, data)
}

export function apiQsRequest(url, data) {
    console.log(data, 7878)
    return $axios.get(url, data)
}

export function exportFile(url, data) {
    return $axios.get(url, data)
}

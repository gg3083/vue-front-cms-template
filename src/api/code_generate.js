import $axios from './index'

export function previewJsCode(data) {
    const url = '/code-generate/js/preview'
    return $axios.post(url, data)
}

export function exportJsCode(data) {
    const url = '/code-generate/js/export'
    return $axios.post(url, data)
}
export function tableList() {
    const url = '/code-generate/table/list'
    return $axios.post(url)
}
export function tableGetField(data) {
    const url = '/code-generate/table/getField'
    return $axios.post(url, data)
}

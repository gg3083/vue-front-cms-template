import $axios from './index'

export function previewJsCode(data) {
    const url = '/code-generate/js/preview'
    return $axios.post(url, data)
}

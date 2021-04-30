// 数字格式化 除以10000
exports.numFormatFilter = (val) => {
    if (val === undefined || val === 0 || val === '0') {
        return '0.00'
    } else {
        let value = val / 10000
        if ((value + '').indexOf('.') > -1) {
            let num = value
            let n = 2
            num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) //四舍五入
            let s = num + ''
            let rs = s.indexOf('.')
            //判定如果是整数，增加小数点再补0
            if (rs < 0) {
                rs = s.length
                s += '.'
            }
            while (s.length <= rs + n) {
                s += '0'
            }
            return s
        }
        return value + '.00'
    }
}

exports.partFilter = (val) => {
    if (val === 1) return '管理员'
    if (val === 2) return '普通用户'
    else return '未知'
}

exports.activeStatusFilter = (val) => {
    if (val === 2) return '正常'
    if (val === 1) return '禁用'
    else return '未知'
}

exports.unixTimeFilter = (val) => {
    if (val <= 0) {
        return ''
    }
    let date = new Date(val * 1000)
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    return date.getFullYear() + '-' + month + '-' + day
}

exports.timeFilter = (val) => {
    let date = val
    if (!val) {
        date = new Date()
    }
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    return date.getFullYear() + '-' + month + '-' + day
}

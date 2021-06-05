export function timeUnixFilter(val) {
    let date = ''
    if (val) {
        date = new Date(val * 1000)
    } else {
        date = new Date()
    }
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    let hours = date.getHours()
    if (hours < 10) hours = '0' + hours
    let minute = date.getMinutes()
    if (minute < 10) minute = '0' + minute
    let second = date.getSeconds()
    if (second < 10) second = '0' + second

    return `${date.getFullYear()}-${month}-${day} ${hours}:${minute}:${second}`
}

export function lengthLimitFilter(val) {
    if (val && val.length > 20) {
        return val.substring(0, 20) + '...'
    }
    return val
}

export function amountFilter(val) {
    return val && val.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

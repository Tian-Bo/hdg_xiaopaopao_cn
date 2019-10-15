/*
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-06 14:39:48
 * @LastEditTime: 2019-08-28 17:21:41
 */
/**
 * 4位一空格（格式化字符串）
 * @param {String} val
 */
const formatBank = (val) => {
    if (val) return val.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
};

/**
 * 时间戳转时间
 * @param {String} val
 */
const setTimeStamp = (val) => {
    if (val) return new Date(time).valueOf()
};

/**
 * 时间戳转时间（年|月|日 时:分:秒）
 * @param {timestamp} value
 */
const setTimeFilter = (val) => {
    if (val) {
        let date = new Date(val * 1000)
        let year = date.getFullYear() // 获取完整的年份(4位,1970)
        let month = date.getMonth() + 1 // 获取月份(0-11,0代表1月,用的时候记得加上1)
        let day = date.getDate() // 获取日(1-31)
        let hour = date.getHours() // 获取小时数(0-23)
        let minute = date.getMinutes() // 获取分钟数(0-59)
        let second = date.getSeconds() // 获取秒数(0-59)
    
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
      
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    
}

export default {
    formatBank,
    setTimeStamp,
    setTimeFilter
}

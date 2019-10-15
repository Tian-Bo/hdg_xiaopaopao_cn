/*
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-07-10 18:32:22
 * @LastEditTime: 2019-09-10 18:53:17
 */
/* 工具js */

/**
 *  根据环境匹配域名
 * */
const __globalApl = (function() {
  var host = window.location.host
  var globalApl

  if (host.indexOf('dev') != -1) {
    globalApl = 'https://www.yanzhaicun.cn'
  } else if (host.indexOf('yanzhaicun') != -1) {
    globalApl = 'https://www.yanzhaicun.cn'
  } else if (host.indexOf('localhost') != -1) {
    globalApl = 'https://www.yanzhaicun.cn'
  } else {
    globalApl = 'https://www.huodongge.cn'
  }
  return globalApl
})()

export {
  // 根据环境匹配域名:
  __globalApl
}

/**
 * 格式化时间戳（年|月|日）
 * @param {timestamp} value
 * @Param type type为1 的时候 时间戳不满两位数带0
 * @num 为一不用除以1000
 */
export const timeFilter = (value, type, num) => {
  let date
  if (num !== 1) {
    date = new Date(value * 1000)
  } else {
    date = new Date(value)
  }
  let year = date.getFullYear() // 获取完整的年份(4位,1970)
  let month = date.getMonth() + 1 // 获取月份(0-11,0代表1月,用的时候记得加上1)
  let day = date.getDate() // 获取日(1-31)
  let hour = date.getHours() // 获取小时数(0-23)
  let minute = date.getMinutes() // 获取分钟数(0-59)
  let second = date.getSeconds() // 获取秒数(0-59)

  let addZero = num => {
    if (num < 10) {
      return '0' + num
    }
    return num
  }

  if (type === 1) {
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(
      hour
    )}:${addZero(minute)}:${addZero(second)}`
  } else {
    return year + '-' + month + '-' + day
  }
}

/**
 * 时间转时间戳
 */
export const timeStamp = time => {
  return new Date(time).valueOf()
}

/**
 * 获取网页宽度
 */
export const windowWidth = function() {
  return document.body.clientWidth
}

/**
 * 获取url路径
 */
export const helpUrl = function() {
  let href = window.location.pathname
  let hash = window.location.hash

  if (href[0] == '/') {
    href = href.slice(1, href.length)
  }

  if (hash[0] == '#') {
    hash = hash.slice(2, hash.length)
  }

  if (hash.indexOf('?') != -1) {
    hash = hash.split('?')[0]
  }
  let theUrl = href + hash
  if (theUrl.indexOf('index') == -1) {
    theUrl += '/index'
  }
  console.log(theUrl)

  return theUrl
}

/**
 * 验证手机号
 * @param str 号码输入input
 * @returns {boolean}
 */
export const checkTel = str => {
  let reg = /^1[23456789][0-9]{9}$/
  if (reg.test(str)) return true
  return false
}

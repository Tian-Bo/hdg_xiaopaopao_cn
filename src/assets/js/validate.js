/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}


/**
 * 银行卡
 * @param {*} s
 */
export function isBlak (s) {
  return /^[0-9]*$/.test(s)
}

/**
 *  中文处理"
 * @param s
 * @returns {boolean}
 */
export function isChina (s) {
  return /^[\u4e00-\u9fa5]+$/.test(s)
}

/**
 * 符号处理  [`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]
 * @param s
 * @returns {boolean}
 */
export function isRune (s) {
  return /[@#\$%\^&\*]+$/.test(s)
}

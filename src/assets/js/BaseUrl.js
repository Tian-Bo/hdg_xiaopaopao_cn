function BaseUrl() {
  let baseUrl = window.location.host;
  if (baseUrl == 'www.huodongge.cn') {
        return  baseUrl = 'https://www.huodongge.cn'
  } else {
        return baseUrl = 'https://www.yanzhaicun.cn'
  }
}
export { BaseUrl }



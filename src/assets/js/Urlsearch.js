/*
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-07-10 18:32:22
 * @LastEditTime: 2019-09-27 17:54:00
 */
// 获取地址栏的参数
export function UrlSearch(){
  let adder =  window.location.href;
  let name,value,str = adder,num = str.indexOf("?"); //取得整个地址栏
  str = str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
  let arr = str.split("&"); //各个参数放到数组里
  for (let i=0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
    if (num>0) {
          name = arr[i].substring(0,num);
          value = arr[i].substr(num+1);
          this[name] = value;
    }
  }
}


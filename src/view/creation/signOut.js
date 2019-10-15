/*
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-11 15:24:36
 * @LastEditTime: 2019-09-30 15:57:50
 */
// 退出页面
import axiosHttp from 'axios'
import { checkClusterIssue } from '@/api/api'
import { MessageBox } from 'element-ui'

function returnPage() {
  // 判断本地缓存有没有activityShow 有的话就说明是从编辑页面过来的
  // \view\creation\create_activity\index.vue
  // isCluster():存储了localStorage.getItem('activityShow')
  if (localStorage.getItem('activityShow') == 0) {
    // 清除拼团ID和编辑页带过来的参数
    localStorage.removeItem('activityShow')
    localStorage.removeItem('clusterId')
    window.close()
  } else {
    // 清除拼团ID和编辑页带过来的参数
    localStorage.removeItem('activityShow')
    localStorage.removeItem('clusterId')
    window.location.href = '/vuemerchant/#/activity?tab=1'
  }
}
export const signOutFunc = () => {
  MessageBox.confirm(
    '此次编辑并未发布,现在退出会导致活动不能同步,请点击海报-->发布与浏览',
    '温馨提示',
    {
      confirmButtonText: '继续编辑',
      cancelButtonText: '立即退出',
      type: 'warning'
    }
  )
    .then(() => {})
    .catch(() => {
      returnPage()
    })
}

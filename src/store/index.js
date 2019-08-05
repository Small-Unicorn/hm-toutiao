// 关于本地存储cookie localStorage sessionStorage
// 封装sessionStorage 的函数 提供给它模块使用
// 制定好key名字 value格式 字符串格式json数据
const KEY = 'hm-toutiao-user'
export default {
  // 设置用户信息
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}

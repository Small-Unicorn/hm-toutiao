// 关于本地存储cookie localStorage sessionStorage
// 封装sessionStorage 的函数 提供给它模块使用
// 制定好key名字 value格式 字符串格式json数据
// json.stringify  将js值 如 对象 数组 转化为json字符串
// json.parse 将数值转化为js对象
const KEY = 'hm-toutiao-user'
export default {
  // 设置用户信息
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    // clear()清除所有本地 不建议 clear 清除所有
    window.sessionStorage.removeItem(KEY)
  }
}

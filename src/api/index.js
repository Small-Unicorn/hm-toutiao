// 对axios 进行配置 然后导出
import axios from 'axios'
import store from '@/store'
import JSONBIG from 'json-bigint'
// 进行配置
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 对data原始json字符 对data转化 return转化后的结果
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 请求头字段
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUSer().token}`
// }
axios.interceptors.request.use((config) => {
  // 修改 每次请求前 获取一次token 设置头部
  // 不会覆盖之前的头部信息
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  return res
},
(err) => {
  // 获取响应状态码 err错误对象 err.Promise.status响应状态码
  if (err.response.status === 401) {
    // token 失效 跳转登录页面
    // this.$router.push('/login) 把hash改为 #/login
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
// 导出
export default axios

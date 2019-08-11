// 封装一个vue插件安装所有全局组件
// 作用 注册components下所有组件为全局组件
// vue插件定义规则:$.fn 暴露对象{} 在对象中选项install 对应的函数
// 函数形参 对应vue对象
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

export default {
  install (Vue) {
    // Vue.use (使用插件) Vue就是use前的Vue
    // Vue 全局注册组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}

// 测试组件com-a
<template>
  <div class="container">COM-A{{msg}}</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    // 绑定事件 事件名b2a 回调函数
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style scoped lang="less">

</style>

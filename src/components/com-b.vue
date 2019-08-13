// 测试用 com-b组件
//触发事件
<template>
    <div class="container">
       COM-B<button @click="fn()">给A组件传值</button>
    </div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: '  b组件的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

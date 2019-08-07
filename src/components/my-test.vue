<template>
   <div class="container">
       <div class="header">header</div>
       <div class="content">
           <!-- 不写名字是默认插槽 -->
           <!-- 具名插槽 -->
           <slot name="content" :msg="msg" a="10"></slot>
       </div>
       <div class="footer">
           <slot name="footer"></slot>
       </div>
   </div>
</template>

<script>
export default {
  name: 'my-test',
  // 挂载数据
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'>

</style>

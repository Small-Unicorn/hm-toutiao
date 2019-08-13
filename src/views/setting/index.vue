//谁绑定的自定义事件只能由谁来触发这个事件
//在A组件内部 绑定一个自定义事件 此时回调函数属于A组件接收传参
//在B组件内部 触发一个自定义事件
//这项只是渲染用
<template>
    <div class="container">
       <com-a></com-a>
       <hr>
       <com-b></com-b>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>

//把功能都集成在这
<template>
    <el-select :value="value" clearable placeholder="请选择" @change="fn">
        <el-option
        v-for="item in channelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  // watch: {
  //   // total(newVal,oldVal){}
  //   'myValue': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.myValue = null
  //     }
  //   }
  // },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      // 后端不支持控制符问题
      if (val === '') val = null
      // 提交给父组件
      this.$emit('input', val)
    },
    async getChannelOptions () {
      // 声明数据
      // 从后端获取数据 http.get获取‘channels’
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'>

</style>

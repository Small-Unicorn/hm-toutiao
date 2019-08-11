<template>
    <div class="container">
       <!-- 筛选区域   -->
       <el-card>
          <div slot="header" class="clearfix">
             <my-bread>内容管理</my-bread>
          </div>
          <el-form label-width="80px" size="small">
             <el-form-item label="状态: ">
                 <el-radio-group v-model="reqParams.status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
             </el-form-item>
             <el-form-item label="频道: ">
                  <!-- <el-select v-model="reqParams.channel_id" clearble placeholder="请选择">
                    <el-option
                    v-for="item in channelOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select> -->
                <!-- 使用自己的组件 -->
                <!-- :value="reqParams.channel_id" -->
                <my-channel v-model="reqParams.channel_id"></my-channel>
             </el-form-item>
             <el-form-item label="日期: ">

                  <el-date-picker
                  @change="changeDate"
                  value-format="yyyy-MM-dd"
                  v-model="dateArr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                  </el-date-picker>
             </el-form-item>
             <el-form-item>
                <el-button type="primary" round @click="search()">筛选</el-button>
             </el-form-item>
          </el-form>
       </el-card>
       <!-- 结果区域 -->
         <!-- 具名插槽 -->
       <el-card>
          <div slot="header">根据筛选条件共查询到{{total}}条结果:</div>
          <!-- 主题内容 -->
            <!-- 表格组件 prop指定当前列每一行显示数据的字段名称如日期 -->
          <el-table
            :data="articles"
            style="width: 100%">
            <!-- 列 -->
            <el-table-column
              label="封面">
                <!-- 插入额外内容 作用域插槽-->
                <template slot-scope="scope">
                   <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
                       <div slot="error" class="image-slot">
                          <img src="../../assets/images/error.gif" alt="" style="width:120px;height:80px">
                       </div>
                   </el-image>
                </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                 <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
                 <el-tag v-if="scope.row.status===1" >待审核</el-tag>
                 <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
                 <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
                 <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="pubdate"
              label="发布时间">
            </el-table-column>
            <el-table-column
              label="操作" width="120px">
                <template slot-scope="scope">
                   <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
                   <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
                </template>
            </el-table-column>
          </el-table>
            <!-- 分页组件 -->
          <div style="text-align:center;margin-top:30px;">
            <!-- 默认每页10条 total指定条数 page-size每页显示-->
            <!-- 当更改当前页码时 渲染新列表 -->
            <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total" :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="changePager">
            </el-pagination>
          </div>
       </el-card>
    </div>
</template>

<script>

// 导入 注册
export default {

  // 依赖数据
  data () {
    return {
      // 收集请求参数(表单数据)
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      // channelOptions: [],
      // 日期数组
      dateArr: [],
      // 文章列表数据
      articles: [],
      total: 0
    }
  },
  // 计算属性 computed 需要一个新数据 依赖data中的数据得到
  // 侦听器 watch 监听data改变 作性能开销较大(异步操作)也可做其他事
  // watch: {
  //   // total(newVal,oldVal){}
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
    // 获取频道下拉选项数据
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    edit (id) {
      // 发布文章 编辑文章 同一个路由规则
      // 使用query 传参 /publish /publish?id=10
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      // 弹出一个确认框
      // 点击确认 发出删除请求
      // 提示 更新列表
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => { })
    },
    // 选择日期函数
    changeDate (dateArr) {
      // dateArr[起始日期，结束日期]
      // dateArr 有清空功能 清空后值是null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },

    // 页码改变函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   // 声明数据
    //   // 从后端获取数据 http.get获取‘channels’
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // 第二个参数是各对象 {params:指定参数对象}
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
   .el-card{
      margin-bottom:20px;
   }
</style>

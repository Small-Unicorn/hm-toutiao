<template>
    <div class="container">
      <el-card class="my-card">
         <!-- logo -->
         <img src="../../assets/images/logo_index.png" alt="">
         <!-- 表单 -->
         <el-form  ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item >
              <!-- 前端验证不送后台 -->
               <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" round style="width:100%" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 按照自己校验逻辑去校验值value即可
      // 手机号格式  1开头 第2位 3-9  最后 9位数字即可
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机格式不对')) }
      callback()
    }

    return {
      // 表单的数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '13911111111',
        code: '246810'
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 1. 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 2. 校验成功发起登录请求
          // this.$http
          //   .post(
          //     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     // res 是响应对象 res.data数据属于响应主体
          //     // console.log(res.data)
          //     // 存储用户信息
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 请求失败 提示  手机号或验证码错误
          //     this.$message.error('手机号或验证码错误')
          //   })
          // async&await方法表单校验 await必须在async内
          // 捕获代码异常 try{可能会执行报错代码}catch(e){处理错误}
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          // 异常处理 捕获到catch里
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>
// .vue文件的scoped 在style下的样式在当前组件下生效
<style scoped lang='less'>
   .container{
       width:100% ;
       height:100%;
       position: absolute;
       // 定位/尺寸 等比缩放 多余裁剪
       background:url(../../assets/images/login_bg.jpg) no-repeat center/cover
   }
   .my-card{
       width:400px;
       height:350px;
       position: absolute;
       left:50%;
       top:50%;
       transform:translate(-50%,-60%);
       img{
            width: 200px;
            display: block;
            margin: 0 auto 30px;
       }
   }
</style>

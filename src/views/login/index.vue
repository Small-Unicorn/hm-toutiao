<template>
    <div class="container">
      <el-card class="my-card">
         <!-- logo -->
         <img src="../../assets/images/logo_index.png" alt="">
         <!-- 表单 -->
         <el-form  ref="loginForm" :model="loginForm" :rules="loginRules">
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
export default {
  data () {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不对'))
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '',
        code: ''
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
      // 对整个表单校验
      // 获取dom对象
      // 回调函数 各字段的是否校验成功
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post(' http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm).then(res => {
            // res响应对象 res.data数据属于响应主体
            // console.log(res.data)
            this.$router.push('/')
          })
            .catch(() => {
              // 请求失败提示 手机号或验证码错误
              this.$message.error('手机号或验证码错误')
            })
        }
      })
      // 校验成功发送登陆请求
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

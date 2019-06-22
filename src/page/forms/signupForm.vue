<template>
  <Form class="container" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
    <FormItem label="用户名" prop="username" :label-width="60">
      <Input v-model="formValidate.username" placeholder="请输入您的用户名" style="width:240px;"></Input>
    </FormItem>
    <FormItem label="密码" prop="password" :label-width="60">
      <Input type="password" v-model="formValidate.password" placeholder="请输入您的密码" style="width:240px;"></Input>
    </FormItem>
    <FormItem label="E-mail" prop="email" :label-width="60">
      <Input v-model="formValidate.email" placeholder="Enter your e-mail" style="width:240px;"></Input>
    </FormItem>
    <FormItem label="QQ" prop="qq" :label-width="60">
      <Input v-model="formValidate.qq" placeholder="Enter your QQ" style="width:240px;"></Input>
    </FormItem>
    <div>
      <Button type="primary" @click="handleSubmit('formValidate')" style="width:130px;margin-left:30px;">注册</Button>
      <Button @click="handleReset('formValidate')" style="width:120px;margin-left:25px;">重置</Button>
    </div>
    <div class="toLogin" @click="toLogin">已有帐号？登录</div>
  </Form>
</template>
<script>
  export default {
    name: 'signupForm',
    data() {
      return {
        formValidate: {
          username: '',
          password: '',
          qq: '',
          email: ''
        },
        ruleValidate: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {type: 'string', min: 1, message: '密码不能少于8个字符', trigger: 'blur'}
          ],
          qq: [
            {required: false}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let successCall = () => {
              this.$Message.success("注册成功，请到邮箱验证账号");
              this.$emit("signup-success");
            };
            let errCallback = (msg) => this.$Message.error(msg);
            this.$store.dispatch('signup', {data: this.formValidate, successCall, errCallback});
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      toLogin() {
        console.log("to login")
        this.$emit("to-login");
      }
    }
  }
</script>

<style scoped>
.container {
  font-size:14px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(92,92,92,1);
}

  .toLogin {
    cursor: pointer;
    margin-top: 14px;
    text-align: center;
    color: #F54B5E;
    font-weight: 400;
  }

</style>

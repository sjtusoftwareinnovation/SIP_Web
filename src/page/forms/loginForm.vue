<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" class="container">
    <FormItem label="E-mail" prop="email" :label-width="80" style="margin-top: 10px;">
      <Input v-model="formValidate.email" placeholder="请输入您的邮箱" style="width:240px;"></Input>
    </FormItem>
    <FormItem label="密码" prop="password" :label-width="80">
      <Input type="password" @on-enter="handleSubmit('formValidate')" v-model="formValidate.password"
             placeholder="请输入您的密码" style="width:240px;"></Input>
    </FormItem>
    <div>
      <Button type="primary" @click="handleSubmit('formValidate')" style="width:130px;margin-left:30px;margin-top:10px">
        登录
      </Button>
      <Button @click="handleReset('formValidate')" style="width:130px;margin-left:25px;margin-top:10px">重置</Button>
    </div>
  </Form>
</template>
<script>
  export default {
    name: 'loginForm',
    data() {
      return {
        formValidate: {
          email: '',
          password: '',
        },
        ruleValidate: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {type: 'string', min: 1, message: '密码不能少于8个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      enterInput() {
        console.log("enter")
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let successCall = () => {
              this.$Message.success("登陆成功");
              this.$emit("login-success");
              this.$router.push({path: '/user'})
            };
            let errCallback = () => this.$Message.error('用户名或密码错误');
            this.$store.dispatch('login', {data: this.formValidate, successCall, errCallback})
          } else {
            this.$Message.error('登陆失败');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style scoped>

  .container {
    font-size: 14px;
    font-family: Arial;
    font-weight: bold;
    color: rgba(92, 92, 92, 1);
  }

</style>

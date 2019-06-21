<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="团队名称" prop="name">
      <Input :disabled="item!=null&&item!=undefined" v-model="formValidate.name"></Input>
      {{item?'':'团队名称创建后不可修改'}}
    </FormItem>
    <FormItem label="QQ" prop="qq">
      <Input v-model="formValidate.qq"></Input>
    </FormItem>
    <FormItem label="团队描述" prop="description">
      <Input type="textarea" v-model="formValidate.description"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">{{item?'修改':'创建'}}</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    name: 'teamForm',
    data() {
      return {
        formValidate: {
          name: '',
          qq: '',
          description: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          qq: [
            {required: false}
          ],
          description: [
            {required: true, message: '描述不能为空', trigger: 'blur'},
            {type: 'string', max: 100, message: '描述不能超过100个字符', trigger: 'blur'}
          ]
        }
      }
    },
    props: ['item'],
    watch: {
      item: function (newItem) {
        if (newItem) this.formValidate = newItem;
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let failCb = (msg) => this.$Message.error(msg);
            if (this.item) {
              let successCb = () => {
                this.$emit('success-create');
                this.$Message.success("队伍修改成功");
              };
              this.item.qq = this.formValidate.qq;
              this.item.description = this.formValidate.description;
              this.$store.dispatch('modifyTeam', {
                data: {
                  ...this.item,
                  ...this.formValidate,
                },
                successCb,
                failCb
              });
            } else {
              let successCb = () => {
                this.$emit('success-create');
                this.$Message.success("队伍创建成功");
              };
              this.$store.dispatch('createTeam', {
                data: {
                  ...this.formValidate,
                  leader: this.userInfo.id,
                  competitionId: this.$route.params.id
                },
                successCb,
                failCb
              });
            }

          } else {
            this.$Message.error('请填写信息');
          }
        })
      },
    }
  }
</script>

<style scoped>


</style>

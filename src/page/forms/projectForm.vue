<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" class="container">
    <FormItem label="项目名称" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入您的项目名称"></Input>
    </FormItem>
    <FormItem label="联系方式" prop="name">
      <Input v-model="formValidate.contact" placeholder="请输入您的联系方式"></Input>
    </FormItem>
    <FormItem label="项目类别" prop="type">
      <Cascader :data="type" v-model="formValidate.type" placeholder="选择您的项目类别"></Cascader>
    </FormItem>
    <FormItem label="截止时间" prop="registerEnd">
      <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.registerEnd"></DatePicker>
    </FormItem>
    <FormItem label="上传封面图片" prop="pic">
      <Upload
        :before-upload="handleUpload"
        type="drag"
        name="image"
        :format="['jpg','jpeg','png']"
        action=""
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽图片上传</p>
        </div>
      </Upload>
      <div v-if="file !== null">
        文件名: {{ file.name }}
      </div>
    </FormItem>
    <FormItem label="项目详情" prop="description">
      <quill-editor v-model="formValidate.description"
                    ref="myQuillEditor"
                    :options="editorOption">
      </quill-editor>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    name: 'projectForm',
    data() {
      return {
        file: null,
        editorOption: {
          placeholder: '详细地介绍您的项目...',
        },
        type: [
          {
            value: '创新创业项目',
            label: '创新创业项目'
          }, {
            value: '科研项目',
            label: '科研项目'
          }, {
            value: '其他',
            label: '其他'
          }
        ],
        formValidate: {
          name: '',
          type: [''],
          contact: '',
          registerEnd: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, type: 'array', message: '请选择项目类别', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '项目联系方式不能为空', trigger: 'blur'}
          ],
          registerEnd: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ],
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
      })
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            //upload picture and create project
            if (this.file) {
              let successCb = (pic) => {
                this.$Message.success('图片上传成功');
                this.formValidate.img = pic;
                this.createProject();
              };
              let failCb = () => this.$Message.error('图片上传失败');
              this.$store.dispatch('upLoad', {
                  img: this.file,
                  successCb,
                  failCb
                }
              );
            }else {
              this.createProject();
            }
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      createProject() {
        let successCb = (id) => {
          this.$Message.success('发布成功');
          this.$router.push("/project/" + id);
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('addProject', {
          data: {...this.formValidate, releaseUser: this.userInfo.id},
          successCb,
          failCb
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleUpload(file) {
        this.file = file;
        return false;
      },
    }
  }
</script>

<style scoped>
  .container {
    width: 50%;
  }

</style>

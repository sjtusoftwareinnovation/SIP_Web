<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="father">
        <Row>
            <Col span="12">
                <FormItem label="竞赛名称" prop="name" :label-width="80">
                    <Input v-model="formValidate.name" placeholder="请输入您的企业名称"></Input>
                </FormItem>
                <FormItem label="承办方" prop="undertaker" :label-width="80">
                    <Input v-model="formValidate.undertaker" placeholder="请输入承办方名称"></Input>
                </FormItem>
                <FormItem label="报名链接" prop="url" :label-width="80">
                    <Input v-model="formValidate.url" placeholder="请输入竞赛报名链接"></Input>
                </FormItem>
                <FormItem label="竞赛类别" prop="type" :label-width="80">
                    <Select v-model="formValidate.type" placeholder="选择您的竞赛类别">
                        <Option value="创新竞赛">创新竞赛</Option>
                        <Option value="创业竞赛">创业竞赛</Option>
                    </Select>
                </FormItem>
                <FormItem label="竞赛级别" prop="level" :label-width="80">
                    <Select v-model="formValidate.level" placeholder="选择您的竞赛级别">
                        <Option value="校级">校级</Option>
                        <Option value="市级">市级</Option>
                        <Option value="国家级">国家级</Option>
                    </Select>
                </FormItem>
                <FormItem label="报名开始" :label-width="80" prop="registerBegin">
                    <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.registerBegin"></DatePicker>
                </FormItem>
                <FormItem label="比赛开始" :label-width="80" prop="competitionBegin">
                    <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.competitionBegin"></DatePicker>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="主办方" prop="host" :label-width="80">
                    <Input v-model="formValidate.host" placeholder="请输入主办方名称"></Input>
                </FormItem>
                <FormItem label="组织者" prop="organizer" :label-width="80">
                    <Input v-model="formValidate.organizer" placeholder="请输入组织者名称"></Input>
                </FormItem>
                <FormItem label="奖金" prop="bonus" :label-width="80">
                    <Input  v-model="formValidate.bonus" placeholder="请输入奖金金额"></Input>
                </FormItem>
                <FormItem label="竞赛分类" prop="category" :label-width="80">
                    <Select v-model="formValidate.category" placeholder="选择您的竞赛分类">
                        <Option value="工科">工科</Option>
                        <Option value="理科">理科</Option>
                    </Select>
                </FormItem>
                <FormItem label="决赛地点" prop="finalPos" :label-width="80">
                    <Select v-model="formValidate.finalPos" placeholder="选择城市">
                        <Option value="北京">北京</Option>
                        <Option value="上海">上海</Option>
                        <Option value="深圳">深圳</Option>
                    </Select>
                </FormItem>
                <FormItem label="报名截止" :label-width="80" prop="registerEnd">
                    <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.registerEnd"></DatePicker>
                </FormItem>
                <FormItem label="比赛截止" :label-width="80" prop="competitionEnd">
                    <DatePicker type="datetime" placeholder="选择日期" v-model="formValidate.competitionEnd"></DatePicker>
                </FormItem>
            </Col>
        </Row>

        <FormItem label="封面图片" prop="file" :label-width="80">
            <Upload
                :before-upload="handleUpload"
                type="drag"
                name = "image"
                :format="['jpg','jpeg','png']"
                action=""
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽图片上传</p>
                </div>
            </Upload>
            <div v-if="file !== null">文件名: {{ file.name }}
              <Button @click="upload" >{{ '点击上传' }}</Button>
            </div>
        </FormItem>

        <FormItem label="竞赛详情" prop="description" :label-width="80">
            <quill-editor v-model="formValidate.description"
                      ref="myQuillEditor"
                      class="editer"
                      :options="editorOption" >
            </quill-editor>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import { mapState } from 'vuex';

    export default {
        name: 'competitionForm',
        data () {
            return {
                id: 0,
                file: null,
                editorOption: {
                  placeholder: '详细地介绍您的竞赛，包括竞赛时间节点以及赛制...',
                },
                formValidate: {
                    name: '',
                    img: '',
                    category: '',
                    host: '',
                    type: '',
                    level: '',
                    description: '',
                    bonus: 0,
                    finalPos: '',
                    url: '',
                    organizer: '',
                    undertaker: '',
                    registerBegin: '',
                    registerEnd: '',
                    competitionBegin: '',
                    competitionEnd: '',
                },
                ruleValidate: {
                    // name: [
                    //     { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    // ],
                    // host: [
                    //     { required: true, message: '主办方名称不能为空', trigger: 'blur' }
                    // ],
                    // bonus: [
                    //     { required: true, message: '请输入奖金金额', trigger: 'blur' }
                    // ],
                    // url: [
                    //     { required: true, type: 'url', message: '请填写竞赛报名链接', trigger: 'blur' }
                    // ],
                    // finalPos: [
                    //     { required: true, message: '请选择总决赛地点', trigger: 'change' }
                    // ],
                    // registerBegin: [
                    //     { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    // ],
                    // registerEnd: [
                    //     { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    // ],
                    // competitionBegin: [
                    //     { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    // ],
                    // competitionEnd: [
                    //     { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    // ],
                    // description: [
                    //     { required: true, message: '请输入竞赛详情', trigger: 'blur' },
                    // ]
                }
            }
        },
        props: [
          'item'
        ],
        mounted () {
          if (this.item) {
            this.formValidate = this.item;
          }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.item){
                          this.$store.dispatch('modifyCompetition', this.formValidate)
                        }else{
                          this.$store.dispatch('createCompetition', this.formValidate)
                        }
                    } else {
                        this.$Message.error('上传失败');
                    }
                })
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                // this.file = null;
                this.$store.dispatch('upLoad', {img: this.file});
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        computed: {
          ...mapState({
            competitionId: state => state.competition.info.id,
            competitionPic: state => state.pic.url,
          })
        },
        watch: {
            competitionId: function (newId, oldId) {
              // this.$Message.success('创建成功');
                // this.$router.push({path: '/competition/'+ newId});
            },
            competitionPic: function (newPic, oldPic) {
                console.log(newPic)
                this.formValidate.img = newPic;
            },
            item: function (item){
              let f = {...item}
              if(f.registerBegin) f.registerBegin = new Date(f.registerBegin)
              if(f.registerEnd) f.registerEnd = new Date(f.registerEnd)
              if(f.competitionEnd) f.competitionEnd = new Date(f.competitionEnd)
              if(f.competitionBegin) f.competitionBegin = new Date(f.competitionBegin)
              this.formValidate = f;
            }
        },
    }
</script>

<style >


</style>

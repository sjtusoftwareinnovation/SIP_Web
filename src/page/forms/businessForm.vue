<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" class="father">
        <FormItem label="企业名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入您的企业名称"></Input>
        </FormItem>
        <FormItem label="学校名称" prop="school">
            <Input v-model="formValidate.school" placeholder="请输入合作学校名称"></Input>
        </FormItem>
        <FormItem label="项目类别" prop="type">
        		<Cascader :data="type" v-model="formValidate.type" placeholder="选择您的项目类别"></Cascader>
        </FormItem>
        <FormItem label="学历要求" prop="education">
            <CheckboxGroup v-model="formValidate.education">
                <Checkbox label="undergraduate">本科</Checkbox>
                <Checkbox label="master">硕士</Checkbox>
                <Checkbox label="doctor">博士</Checkbox>
            </CheckboxGroup>
        </FormItem>
		<FormItem label="上传封面图片" prop="pic">
		    <Upload
		        multiple
		        type="drag"
		        :format="['jpg','jpeg','png']"
		        action="//jsonplaceholder.typicode.com/posts/">
		        <div style="padding: 20px 0">
		            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
		            <p>Click or drag files here to upload</p>
		        </div>
		    </Upload>
    	</FormItem>
        <FormItem label="企业简介" prop="shortdesc">
            <Input v-model="formValidate.shortdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="用一句话简单介绍您的企业（不超过40个字）"></Input>
        </FormItem>
        <FormItem label="企业详情" prop="desc">
            <quill-editor v-model="formValidate.desc"
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
    export default {
        name: 'businessForm',
        data () {
            return {
                value1: [],
                editorOption: {
                  placeholder: '详细介绍您的企业',
                },
                type: [{
                    value: 'need',
                    label: '开发需求 ',
                    children: [
                        {
                            value: 'engineering',
                            label: '工科'
                        },
                        {
                            value: 'science',
                            label: '理科'
                        }
                    ]
                }, {
                    value: 'internship',
                    label: '实习机会'
                }, {
                    value: 'recruit',
                    label: '人才招聘'
                }
                ],
                formValidate: {
                    name: '',
                    school: '',
                    type: [],
                    education: [],
                    desc: '',
                    shortdesc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    ],
                    school: [
                        { required: true, message: '学校名称不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择项目类别', trigger: 'blur' }
                    ],
                    education: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个', trigger: 'change' }
                    ],
                    shortdesc: [
                        { required: true, message: '请输入企业简介（不超过20个字）', trigger: 'blur' },
                        { type: 'string', max: 20, message: '企业简介不能超过20个字', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入企业详情', trigger: 'blur' },
                        { type: 'string', min: 1, message: '企业详情不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>


</style>

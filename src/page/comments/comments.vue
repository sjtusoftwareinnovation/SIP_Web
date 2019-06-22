<template>
  <div>
    <div class="list-item">
      <h2>评论区</h2>
      <Divider />
      <div v-if="comments.length==0">暂无评论</div>
      <comment-item
        :item="item"
        v-for="(item, index) in comments"
        :key="index"
      ></comment-item>
    </div>
    <div class="add">
      <Form>
        <FormItem label="">
          <Input v-model="textarea" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="理性发言，说点好听的~"></Input>
        </FormItem>
        <FormItem>
          <Button :disabled="userInfo==null" type="primary" @click.native="addcomment">发送</Button>
          {{userInfo==null?'请登陆后发表':''}}
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  const commentItem = () => import('./commentItem');

  export default {
    name: 'comments',
    props: [
      'id'
    ],
    data() {
      return {
        textarea: ''
      }
    },
    mounted() {
      this.$store.dispatch('getComments', {id: this.id});
    },
    components: {
      commentItem,
    },
    computed: mapState({
      comments: state => state.competition.comment.list,
      userInfo: state => state.userInfo,
    }),
    methods: {
      addcomment: function () {
        let sCb = () => {
          this.$Message.success("发布成功");
          this.$store.dispatch('getComments', {id: this.id});
        };
        let failCb = () => this.$Message.error("网络故障");
        let data = {competitionId: this.id, userId: this.userInfo.id, content: this.textarea};
        this.$store.dispatch('addComment', {data, sCb, failCb});
      },
    },
  }
</script>

<style scoped lang="scss">

  .list-item {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    justify-content: flex-start;
  }

  .list-item > h2 {
    font-size: 14px;
    margin-bottom: -20px;
  }

  .add {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    justify-content: flex-start;

  }

</style>


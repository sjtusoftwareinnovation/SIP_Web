<template>
  <div>
    <div class="noTeam" v-if="!notEnd&&(!info||info.tstatus==-1)">
      没有加入队伍
    </div>
    <div class="noTeam" v-else-if="(!info||info.tstatus==-1)&&notEnd">
      当前无队伍，可创建队伍或者加入其他队伍
      <Button style="margin: 10px" @click="createTeam" type="primary">创建队伍</Button>
    </div>

    <div class="my-team" v-else>
      <my-team-item :sCb="getMyTeam" :memberList="memberList" :info="info" :modifyTeam="modifyTeam"></my-team-item>
    </div>
    <Modal v-model="modal" scrollable footer-hide :title="modelTitle">
      <team-form v-on:success-create="modal=false" :item="modifyItem"></team-form>
    </Modal>
  </div>
</template>

<script>
  const teamForm = () => import('@/page/forms/teamForm');
  const myTeamItem = () => import('./myTeamItem');
  import {mapState} from 'vuex';

  export default {
    name: 'competitionMyTeam',
    data() {
      return {
        modal: false,
        modifyItem: null,
        modelTitle: '创建队伍'
      }
    },
    mounted() {
      this.getMyTeam();
    },
    components: {
      teamForm, myTeamItem
    },
    computed: {
      isLeader: function () {
        return this.info.status > 0 && this.userInfo.id == this.info.leader;
      },
      ...mapState({
        info: state => state.team.info,
        memberList: state => state.team.memberList,
        userInfo: state => state.userInfo,
        notEnd: state => state.competition.info.status != '已结束'
      })
    },
    methods: {
      getMyTeam: function() {
        this.$store.dispatch('getMyTeam', {cid: this.$route.params.id, uid: this.userInfo.id});
      },
      modifyTeam: function (item) {
        this.modelTitle = '修改信息';
        this.modifyItem = item;
        this.modal = true;
      },
      handleApply: function (status, item) {
        let successCb = () => this.$Message.success(status == 1 ? '同意申请' : '拒绝申请');
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('handleApply', {
          data: {
            id: item.applyId,
            teamId: this.info.id,
            userId: item.id,
            status
          },
          successCb,
          failCb
        });
      },
      changeStatus: function () {
        let status = this.info.status;
        let successCb = (sts) => {
          this.info.status = sts;
          this.$Message.success(status == 1 ? '已关闭组队' : '已开放组队')
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('modifyTeam', {
          data: {
            ...this.info,
            status: this.info.status == 1 ? 2 : 1
          },
          successCb,
          failCb
        });
      },
      //移除队员
      removeMember: function (userId) {
        let teamId = this.info.id;
        let successCb = () => {
          this.$Message.success('已移除');
          this.$store.dispatch('getTeam', {tid: teamId});
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('removeMember', {teamId, userId, successCb, failCb});
      },// 取消申请
      cancelApply: function (id) {
        let successCb = () => this.$Message.success('成功删除申请');
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('cancelApply', {
          data: {
            id: id
          },
          successCb,
          failCb
        });
      },
      quitTeam: function () {
        this.$store.dispatch('quitTeam', {id: this.userid});
        this.$router.push({path: '/competitions'});
      },
      createTeam: function () {
        this.modelTitle = '创建队伍';
        this.modal = true;
      },
      // 解散队伍
      deleteTeam: function () {
        let successCb = () => {
          this.$Message.success('已解散队伍');
          this.$store.dispatch('getTeamId', {cid: this.$route.params.id, uid: this.userInfo.id});
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('deleteTeam', {id: this.info.id, successCb, failCb});
      }
    },


  }
</script>

<style scoped lang="scss">

  .noTeam {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


</style>

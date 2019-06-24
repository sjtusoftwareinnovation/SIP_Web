<template>

  <div class="container">
    <!--<v-tcard v-if="false"-->
    <!--:item="item"-->
    <!--v-for="(item, index) in teams"-->
    <!--:key="index">-->
    <!--</v-tcard>-->

    <my-team-item :sCb="getTeamsAll" v-for="(item, index) in teams"
                  :key="index"
                  class="my-team"
                  :memberList="item.userStatusList"
                  :info="item.team"
                  :modifyTeam="modifyTeam"></my-team-item>
    <Modal v-model="modal" scrollable footer-hide :title="modelTitle">
      <team-form v-on:success-create="successCb" :item="modifyItem"></team-form>
    </Modal>
  </div>

</template>

<script>
  import myTeamItem from '@/page/competition/myTeamItem.vue'
  import teamForm from '@/page/forms/teamForm.vue'
  import {mapState} from 'vuex';
  import user from "./user";

  export default {
    data() {
      return {
        modal: false,
        modifyItem: null,
        modelTitle: '修改信息',
        // teams: []
      }
    },
    components: {
      myTeamItem, teamForm
    },
    computed: mapState({
      teams: function (state) {
        if (this.$route.path === "/user/application") {
          return state.team.list && state.team.list.filter(item => {
            let u = item.userStatusList.filter(user => user.id == state.userInfo.id);
            let join = u.filter(user => user.status === 1);
            let apply = u.filter(user => user.status === 0 || user.status === -1);
            return join.length === 0 && apply.length > 0
          }).map(item => {
            let u = item.userStatusList.filter(user => user.id == state.userInfo.id);
            let apply = u.filter(user => user.status === 0);

            item.team.tstatus = apply.length > 0 ? 0 : -1;
            item.team.applyId = apply.length > 0 ? apply[0].applyId : 0;
            return item
          });
        } else {
          return state.team.list && state.team.list.filter(item => {
            let u = item.userStatusList.filter(user => user.id == state.userInfo.id).filter(user => user.status === 1);
            return u.length > 0
          }).map(item => {
            item.team.tstatus = 1;
            return item;
          });
        }
      },
      userInfo: state => state.userInfo,
    }),
    watch: {
      // teamList: function() {
      //   console.log(this.$route);
      //   if (this.$route.path === "/user/application")
      //     this.teams = this.teamList && this.teamList.filter(item => {
      //       let u = item.userStatusList.filter(user => user.id == state.userInfo.id);
      //       return u.length > 0 && u[0].status === 0
      //     });
      //   else
      //     this.teams = this.teamList.list && this.teamList.filter(item => {
      //       let u = item.userStatusList.filter(user => user.id == state.userInfo.id);
      //       return u.length > 0 && u[0].status === 1
      //     });
      // },
    },
    methods: {
      modifyTeam: function (item) {
        this.modifyItem = item;
        this.modal = true;
      },
      successCb: function () {
        this.modal = false;
        this.getTeamsAll()
      },
      getTeamsAll: function () {
        this.$store.dispatch('getTeamsAll', this.userInfo.id);
      }
    },
    mounted() {
      this.getTeamsAll()
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    & > div {
      margin: 10px 0;
    }
  }

</style>

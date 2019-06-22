<template>
  <div class="list-item">
    <div class="info">
      <Avatar class="leader" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
      <div class="detail">
        <h1>{{item.name}}</h1>
        <p>队长：{{item.leader}}</p>
        <p>QQ：{{item.qq}} </p>
      </div>
      <div class="status">
        {{stateList[item.status]}}
      </div>
    </div>

    <div class="introduction">
      <div class="label">团队介绍：</div>
      <p>
        {{item.description}}
      </p>
    </div>
    <Button v-if="notEnd" :disabled="item.status!=1 ||disabled||!isLogin" style="margin:10px"
            size="large" type="primary" @click="apply">
      {{isLogin?(item.status==1?'申请组队':'组队成功'):'请先登陆'}}
    </Button>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {teamStateList} from "../../common/constValue";

  export default {
    name: 'teamItem',
    data() {
      return {
        stateList: teamStateList,
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        disabled: state => state.team.info && (state.team.info.id !== undefined && state.team.info.tstatus !== -1),
        notEnd: state => state.competition.info.status != '已结束',
        isLogin: state => state.userInfo && state.userInfo.id != null
      })
    },
    props: [
      'item'
    ],
    methods: {
      apply: function () {
        if (this.userInfo.id) {
          let successCb = () => this.$Message.success('申请成功，请耐心等待队长批准~');
          let failCb = (msg) => this.$Message.error(msg);
          this.$store.dispatch('applyTeam', {
            data: {userId: this.userInfo.id, teamId: this.item.id, "status": 0},
            successCb,
            failCb
          });
        } else {
          this.$Message.warning('请先登录哦~');
        }
      },
    },
  }
</script>

<style scoped lang="scss">

  .list-item {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 300px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    flex-grow: 1;
  }


  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 20px;
  }

  .status {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    writing-mode: vertical-rl;
    padding: 20px 5px 20px 5px;
    margin: 10px 0;
    background-color: #409EFF;
    color: white;
  }

  .leader {
    float: left;
    margin-right: 15px;
    width: 70px;
    height: 70px;
    line-height: 40px;
    border-radius: 40px;
  }

  .label {
    color: grey;
  }

  .list-item > div {
    margin: 10px;
  }

  .requirement p, .introduction p {
    height: 92px;
    overflow: hidden;
    font-size: 13px;
  }
</style>

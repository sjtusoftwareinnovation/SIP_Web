<template>
  <div class="list-item">
    <div class="info">
      <Avatar class="avatar" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
      <div class="team-name">
        <h1>{{info.name}}</h1>
        <p>QQ：{{info.qq}}</p>
      </div>
      <div class="team-intro">
        <p style="width: 60px">团队介绍：</p>
        <p>{{info.description}}</p>
      </div>
      <div style="margin-left: 10px">
        <Dropdown @on-click="dispatchOp" v-if="isLeader">
          <a href="javascript:void(0)">
            <Icon style="font-size: 20px;" type="md-settings"></Icon>
          </a>
          <DropdownMenu  slot="list">
            <DropdownItem name="1" >{{info.status==1?'关闭组队':'开放组队'}}</DropdownItem>
            <DropdownItem name="2">解散队伍</DropdownItem>
            <DropdownItem name="3">修改信息</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div v-else-if="info.tstatus==0">
          <Button shape="circle" @click.native="cancelApply(info.applyId)">取消申请</Button>
        </div>
        <span class="handleApply" v-else-if="info.tstatus==-1">
            已拒绝
        </span>
      </div>
      <div class="detail" v-if="false">
        <div class="team-name">
          <h1>{{info.name}}</h1>
          <Tag v-if="info.tstatus==-1">被拒绝</Tag>
          <Tag v-if="info.tstatus==0">申请中</Tag>
        </div>
        <div v-if="isLeader&&notEnd">
          <Button shape="circle" @click="changeStatus">
            {{info.status==1?'关闭组队':'开放组队'}}
          </Button>
          <Button shape="circle" @click.native="deleteTeam">解散队伍</Button>
          <Button shape="circle" icon="ios-settings"
                  @click="modifyTeam(info)">
            修改团队信息
          </Button>
        </div>
        <div v-else-if="notEnd&&info.tstatus==0">
          <Button shape="circle" @click.native="cancelApply(info.applyId)">取消申请</Button>
        </div>
      </div>
    </div>

    <div class="members" v-if="info.tstatus===undefined">
      <Card class="card">
        <p slot="title">队员列表：</p>
        <div class="team-members" :key="index"
             v-for="(item, index) in memberList" v-if="item.status==1">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
          <span>{{item.username}}</span>
          <Tag color="primary" v-if="info.leader==item.id">队长</Tag>
          <Button v-if="notEnd&&isLeader&&item.id!=info.leader"
                  @click="removeMember(item.id)" type="text" class="removeBtn">
            移除队员
          </Button>
        </div>
      </Card>

      <Card class="card" v-if="info.tstatus===undefined">
        <p slot="title">申请处理列表：</p>
        <div class="team-members" :key="index" v-if="item.status<1"
             v-for="(item, index) in memberList">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
          <span>{{item.username}}</span>
          <span class="handleApply" v-if="notEnd&&isLeader&&item.status==0">
                <Button @click="handleApply(1, item)" type="text">同意申请</Button>
                <Button @click="handleApply(-1, item)" type="text">拒绝申请</Button>
              </span>
          <span class="handleApply" v-else-if="item.status==-1">
                已拒绝
            </span>
          <span class="handleApply" v-else-if="item.status==-2">
                已移除队伍
            </span>
        </div>
      </Card>

    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {teamStateList} from "../../common/constValue";

  export default {
    name: 'myTeamItem',
    data() {
      return {
        stateList: teamStateList,
      }
    },
    computed: {
      isLeader: function () {
        return this.info.status > 0 && this.userInfo.id == this.info.leader;
      },
      ...mapState({
        userInfo: state => state.userInfo,
        notEnd: state => true,
      })
    },
    props: [
      'info', 'modifyTeam', 'memberList', 'sCb'
    ],
    methods: {
      dispatchOp: function(name) {
        switch (name) {
          case '1':
            this.changeStatus();
            return;
          case '2':
            this.deleteTeam();
            return;
          case '3':
            this.modifyTeam(this.info);
            return;
          case '4':
            this.cancelApply(this.info.applyId);
            return;
          default:
            return;
        }
      },
      handleApply: function (status, item) {
        let successCb = () => {
          this.sCb && this.sCb();
          this.$Message.success(status == 1 ? '同意申请' : '拒绝申请')
        };
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
        let successCb = () => {
          this.sCb && this.sCb();
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
          this.sCb && this.sCb();
          this.$store.dispatch('getTeam', {tid: teamId});
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('removeMember', {teamId, userId, successCb, failCb});
      },
      // 解散队伍
      deleteTeam: function () {
        let successCb = () => {
          this.$Message.success('已解散队伍');
          this.sCb && this.sCb();
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('deleteTeam', {id: this.info.id, successCb, failCb});
      },
      // 取消申请
      cancelApply: function (id) {
        let successCb = () => {
          this.$Message.success('成功取消申请')
          this.sCb && this.sCb();
        };
        let failCb = () => this.$Message.error('网络故障');
        this.$store.dispatch('cancelApply', {
          data: {
            id: id
          },
          successCb,
          failCb
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .list-item {
    margin: 10px 0;
  }

  .members {
    display: flex;
    margin-top: 10px;

    .card:first-child {
      margin-right: 10px;
    }

    .card {
      width: 50%;
    }
  }

  .detail {
    display: flex;
    flex-direction: column;
    margin: 0 40px 0 20px;

    & > p {
      margin-top: 5px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }

  .info {
    display: flex;
    align-items: center;
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

  .avatar {
    /*width: 40px;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*border-radius: 40px;*/
  }

  .label {
    color: grey;
    margin-bottom: 10px;
  }

  .team-members {
    margin-bottom: 10px;

    & > span {
      margin-right: 10px;
    }

    .removeBtn {
      float: right;
    }
  }

  .handleApply {
    float: right;
  }

  .team-name {
    margin-left: 22px;
    width: 20%;

    h1 {
      font-size:16px;
      margin-right: 10px;
    }

    div {
      font-size: 13px;
    }
  }

  .team-intro {
    display: flex;
    margin-left: 10px;
    width: 60%;
  }

  .info {
    display: flex;
    align-items: flex-start;
  }

</style>

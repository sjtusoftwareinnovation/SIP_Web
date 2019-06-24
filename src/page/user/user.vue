<template>
  <div class="container">
    <div class="head">
      <Avatar id="avatar"
        :src='(userInfo&&userInfo.avatar)||"https://avatars1.githubusercontent.com/u/10410257?s=460&v=4"'/>

      <div class="profile-group">
        <h1>{{userInfo&&userInfo.username}}</h1>
        <div>
          <span>邮箱： {{userInfo&&userInfo.email}}</span>
          <span>qq： {{userInfo&&userInfo.qq||'未填写'}}</span>
          <span>微信： {{userInfo&&userInfo.wechatCode||'未绑定'}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <Menu class="menu" active-name="1" :open-names="['1','2','3','4']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper"/>
            队伍
          </template>
          <MenuItem name="1-1" to="/user/team">我的队伍</MenuItem>
          <MenuItem name="1-2" to="/user/application">我的申请</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-paper"/>
            竞赛
          </template>
          <MenuItem name="2-1" to="/user/ucompetition">竞赛列表</MenuItem>
          <MenuItem name="2-2" to="/user/ucompetition/create">创建竞赛</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper"/>
            项目
          </template>
          <MenuItem name="3-1" to="/user/uproject">项目列表</MenuItem>
          <MenuItem name="3-2" to="/user/uproject/create">创建项目</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-paper"/>
            校企
          </template>
          <MenuItem name="4-1" to="/user/ubussiness">校企列表</MenuItem>
          <MenuItem name="4-2" to="/user/ubussiness/create">创建校企</MenuItem>
        </Submenu>
      </Menu>
      <transition name="fade">
        <router-view class="router"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
      })
    },
    mounted() {

    },
    created() {

    }
  }
</script>

<style scoped>

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .content {
    display: flex;
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  }

  .head {
    border-radius: 5px;
    padding: 0 120px;
    margin-top: 60px;
    margin-bottom: 30px;
    background:rgba(189,213,227,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  }

  .head h1 {
    color: black;
    margin-bottom: 10px;
    font-size:24px;
  }

  #avatar {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 120px;
    top: -50px;
    vertical-align: bottom;
  }


  .profile-group {
    margin-left: 60px;
    font-size: 18px;
    display: inline-block;
    top: -30px;
    position: relative;
  }

  .profile-group > div > span{
    margin-right: 20px;
    font-size:14px;
    color:rgba(112,112,112,1);
  }

  .router {
    padding: 20px 30px;
  }

</style>

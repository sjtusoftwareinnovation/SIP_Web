<template>
  <div class="header">

    <div class="nav-left">
      <router-link class="logo" style="color: black;" to="/welcome">
        双创平台
      </router-link>
      <Menu class="menu" mode="horizontal" :active-name="active+''">
        <MenuItem name="2" to="/competitions">
          双创竞赛
        </MenuItem>
        <MenuItem name="3" to="/projects">
          双创项目
        </MenuItem>
        <MenuItem name="4" to="/businesses">
          校企需求
        </MenuItem>
        <MenuItem name="5" to="/instructions">
          关于我们
        </MenuItem>
      </Menu>
    </div>

    <div class="nav-right">

      <Dropdown @on-click="logout" v-if="isLogin">
        <div class="user" @click="$router.push(`/user`)">
          <Avatar icon="person" class="avatar" src="https://avatars1.githubusercontent.com/u/10410257?s=460&v=4"/>
          <Icon type="more" size="30" class="more"></Icon>
          <span>{{userInfo && userInfo.username}}</span>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem name="logout">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div class="user" v-if="!isLogin">
        <Button type="text" v-if="!loginset" @click="loginShow">登录</Button>
        <Button type="primary"  v-if="loginset" @click="signupShow">注册</Button>
      </div>
    </div>

    <div class="formContainer1" v-if="!isLogin&&($route.name =='welcome')&&(loginset)">
      <div class="form-signup">Login</div>
      <div class="sp">
        <Divider/>
      </div>
      <login-form></login-form>
    </div>

  </div>

</template>

<script>
  import {mapState} from 'vuex';
  import loginForm from '@/page/forms/loginForm';

  export default {
    data() {
      return {
        keyword: '',
        searchset: false,
        loginset: false,  //false 注册，true 登录
        registerModel: false,
        options: [],
        list: ['在竞赛中搜索：', '在项目中搜索：', '在企业中搜索：'],
        value: ""
      }
    },
    props: [
      'active'
    ],
    computed: {
      isLogin: function () {
        return this.userInfo && this.userInfo.username;
      },
      ...mapState({
        userInfo: state => state.userInfo,
      })
    },
    components: {
      loginForm
    },
    mounted() {
      if (this.$route.query.login == 1 && !this.isLogin) {
        this.loginset = true;
      }
    },
    watch: {
    },
    methods: {
      loginShow: function () {
        this.$router.push(`/welcome`);
        this.loginset = true;
      },
      logout: function (key) {
        if (key == "logout") {
          let successCall = () => {
            this.$Message.success("已退出账号");
            this.$router.push(`/`)
          };
          let errCallback = (msg) => this.$Message.error(msg);
          this.$store.dispatch('logout', {data: this.formValidate, successCall, errCallback});
        }
      }
    }

  };
</script>

<style scoped>

  .header {
    height: 70px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    margin-bottom: 20px;
    min-width: 960px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    margin-left: 8%;
    font-size: 24px;
    font-family: Helvetica Neue;
    font-weight: 400;
    line-height: 29px;
    width: 120px;
  }

  .nav-left {
    margin-left: 2%;
    display: flex;
    align-items: center;
    min-width: 600px;
  }

  .menu {
    background-color: hsla(0, 0%, 95%, 0);
    height: 70px;
    font-size: 16px;
    line-height: 72px;
    font-family: Helvetica Neue;
    font-weight: bold;
  }

  .nav-right {
    margin-right: 5%;
    display: flex;
    min-width: 350px;
  }

  .user {
    cursor: pointer;
    margin-top: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-20%);
    color: #F54B5E;
    font-size: 14px;
    height: 32px;
  }

  .more {
    float: right;
    margin-left: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-60%);
  }

  .search-bar a div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 220px;
    padding: 7px 16px;
  }

  .formContainer {
    position: absolute;
    right: 13%;
    top: 280px;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .formContainer1 {
    position: absolute;
    right: 13%;
    top: 280px;
    width: 400px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-signup {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(125, 185, 222, 1);
  }

  .sp {
    width: 80%;
  }


  .search-bar {
    position: absolute;
    background-color: white;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    min-width: 239px;
    will-change: top, left;
    transform-origin: center top 0;
    top: 60px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 900;
  }

  .ivu-divider-horizontal {
    margin: 10px 0;
  }

  .search {
    width: 239px;
    height: 30px;
    top: 15px;
    border-radius: 20px;
    border-color: black;
    margin-right: 20px;
  }

  .search input {
    height: 30px;
  }
</style>

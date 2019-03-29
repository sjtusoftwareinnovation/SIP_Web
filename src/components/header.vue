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
  </div>

</template>

<script>
  import {mapState} from 'vuex';

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
    },
    components: {
    },
    mounted() {
    },
    watch: {
    },
    methods: {
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

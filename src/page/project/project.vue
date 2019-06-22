<template>
  <div class="container">
    <div class="header" :style="{backgroundImage: 'url(' + info.cover + ')', backgroundSize:'100% 350px'}">
      <div class="mask">
        <div class="title-info">
          <span class="title-info-type">{{info.type}}</span>
          <h1>{{info.name}}</h1>
          
          <div class="apply-info">
            <a :href="info.url" target="_blank">
              <Button :to="info.url||''" class="apply-button" type="primary" size="large">立即报名</Button>
            </a>
          </div>
          <div class="other-info">
            <span>联系方式：{{info.contact}}</span>
            <span>浏览量：{{info.pageview}}</span>
            <span>报名截止时间：{{info.registerEnd&&info.registerEnd.replace("T"," ").substring(0,19)}}</span>
          </div>
        </div>
      </div>
    </div>


    <div class="inner-container">
<!--      <Menu class="menu" mode="horizontal" :active-name="active">-->
      <Menu class="menu" mode="horizontal">
        <MenuItem name="1" to="1">
          项目详情
        </MenuItem>
<!--         <MenuItem name="2" to="2">
          参赛队伍
        </MenuItem>
        <MenuItem name="3" v-if="userInfo&&userInfo.id" to="3">
          我的队伍
        </MenuItem> -->
      </Menu>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>

    <v-comments :id="$route.params.id" class="comments"></v-comments>

  </div>
</template>

<script>
  import {mapState} from 'vuex';

  const vComments = () => import('../comments/comments')

  export default {
    data() {
      return {}
    },
    components: {
      vComments,
    },
    computed: mapState({
      info: state => state.project.info,
    }),
    methods: {},
    created() {
      this.$store.dispatch('getProject', {id: this.$route.params.id});
    }
  }
</script>

<style scoped lang="scss">

  .container {
    font-size: 16px;
    margin: 0 100px;
    display: flex;
    flex-direction: column;
  }

  .header {
    width: 100%;
    height: 350px;
    border-radius: 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 20px;
    margin: 20px 0;

    div {
      z-index: 2;
    }

    .title-info {
      span {
        font-size: 12px;
        margin-right: 10px;
        margin-left: 20px;
      }

    .title-info-type {
      font-size: 14px;
    }

    .bonus {
      margin-top:60px;
      font-size:18px;
    }

      .other-info {
        margin-top: 80px;
        display: flex;
        flex-direction: column;
        color: rgba(255,255,255,1);
        z-index: 1;
        color:rgba(112,112,112,1);  
      }
    }
  }

  .header:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    border-radius:4px 4px 4px 4px;
  }

  .apply-info {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-top:60px;
  }

  .bonus {
    font-size: 30px;
    margin: 10px 0;
  }

  .apply-button {
    font-size: 20px;
    margin: 20px 0;
  }

  .team-button {
    width: 100px;
    margin-top: 20px;
    margin-bottom: -50px;
    align-self: flex-end;
    z-index: 999;
  }

  .join-team {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .mask {
    width:350px;
    height:350px;
    margin-top: -20px;
    margin-left: -20px;
    background:rgba(219,219,219,1);
    opacity:0.9;
    z-index: 2;
    color:rgba(112,112,112,1);  
  }

  .title-info > h1 {
    margin-left: 20px;
    font-size:20px;
    font-family:Helvetica Neue;
    font-weight:400;
  }

  .comments{
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    margin-bottom: 20px;
    padding: 0px 20px;
    border-radius:4px;
  }
  .inner-container {
    background-color: #fff; 
    margin: 10px 0px 20px 0px; 
    padding: 0px 20px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    border-radius:4px;
  }

</style>

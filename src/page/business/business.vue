<template>
  <div class="container">
    <div class="header" :style="{backgroundImage: 'url(' + info.img + ')', backgroundSize:'100% 350px'}">
      <div class="title-info">
          <span>{{info.type}}</span>
          <h1>{{info.name}}</h1>
          <div>
            <span>{{info.organizer}}</span>
            <span>浏览量：{{info.pageview}}</span>
            <span>报名截止时间：{{info.registerEnd}}</span>
          </div>
      </div>
      <div class="apply-info">

        <Button class="apply-button" size="large">立即报名</Button>
      </div>
    </div>
    <Tabs value="name1" class="inner-container">
        <TabPane label="项目详情" name="name1">
           {{info.description}}
        </TabPane>
    </Tabs>
    <v-comments class="comments"></v-comments>
  </div>
</template>

<script>
import {mapState} from 'vuex';
const vComments = () => import('../comments/comments')

export default {
    data () {
        return {
          businesses: [{
            title: "2019年秋上海交通大学XX竞赛（创新）",
            subcontent: "POLARDB是阿里云自研的全新一代商用关系型云数据库，举办POLARDB数据库性能大赛的初衷是希望能够促进国内数据库研发人员的交流， 碰撞出创新的火..."
          }],
          teams: [{
            name: "吃鸡小分队",
            leader: "xxx",
            qq: "5922XXX29"
          }]
        }
    },
    computed: mapState({
      info: state => state.business.info,
    }),
    components: {
      vComments
    },
    created(){
      this.$store.dispatch('getBusiness', {id: this.$route.params.id});

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
      font-size: 16px;
    }
  }
}
.header:before {
  content:"";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  filter: blur(4px);

}
.apply-info {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.bonus {
  font-size: 30px;
  margin: 10px 0;
}
.apply-button {
    color: white;
    font-size: 20px;
    border: 2px solid;
    background: transparent;
    margin: 20px 0;
}
.team-button {
    width: 100px;
    margin-top: 20px;
    margin-bottom: -30px;
    align-self: flex-end;
    z-index: 3;
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
    padding: 10px 20px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    border-radius:4px;
  }
</style>

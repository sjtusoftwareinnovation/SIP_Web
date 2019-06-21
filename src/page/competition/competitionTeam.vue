<template>
  <div class="container">
    <div class="header">
      <span>筛选</span>
      <Select v-model="status" placeholder="招募状态"
              style="margin-left: 10px;width:100px">
        <Option v-for="(item, index) in stateList" :value="index" :key="item">{{item}}</Option>
      </Select>
      <span style="margin-left: 10px">精确查找</span>
      <Input v-model="name" placeholder="输入队伍名称进行查找" style="width: auto;margin-left: 10px">
        <Button slot="append" icon="ios-search" style="font-size: 20px;padding: 0 7px"></Button>
      </Input>
    </div>
    <div class="lists">
      <team-item
        :item="item"
        v-for="(item, index) in teams"
        :key="index"
      >
      </team-item>
    </div>
  </div>
</template>

<script>
  const teamItem = () => import('./teamItem')
  import {mapState} from 'vuex';
  import {teamStateList} from "../../common/constValue";

  export default {
    data() {
      return {
        status: '',
        name: '',
        stateList: teamStateList,
      }
    },
    components: {
      teamItem
    },
    computed: mapState({
      teams: state => state.competition.teams,
    }),
  }
</script>

<style scoped lang="scss">

  .container {
    margin: 40px 0px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
  }

</style>

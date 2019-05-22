<template>
  <div class="container">
    <div class="filter">
      <img class="pic_search" src="@/assets/pic_search@2x.png">
      <div class="table">
         <div class="condition">
          <span>筛选条件</span>
          <Select style="width:100px;box-shadow:0px 3px 6px rgba(0,0,0,0.16);" v-model="type"
                  placeholder="竞赛类型">
            <Option v-for="item in typeList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
          <Select v-model="source" placeholder="来源范围"
                  style="margin-left: 10px;width:100px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)">
            <Option v-for="item in sourceList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
          <Select v-model="host" placeholder="主办单位"
                  style="margin-left: 10px;width:100px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)">
            <Option v-for="item in hostList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
          <Select v-model="level" placeholder="竞赛级别"
                  style="margin-left: 10px;width:100px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)">
            <Option v-for="item in levelList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
          <Select v-model="status" placeholder="竞赛状态"
                  style="margin-left: 10px;width:100px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)">
            <Option v-for="item in statusList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
        </div>
        <div class="search">
          <span>竞赛名称</span>
          <Input style="width: 250px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)" v-model="name" icon="ios-search"/>

        </div>
        <div class="order">
          <span>排序方式</span>
          <Button @click="orderByTime" :type="orderBy=='releaseTime'?'primary':'default'" style="box-shadow:0px 3px 6px rgba(0,0,0,0.16)" >
            发布时间
            <Icon type="ios-reorder"></Icon>
          </Button>
          <Button @click="orderByBonus" :type="orderBy=='bonus'?'primary':'default'"
                  style="margin-left: 10px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)">
            奖金金额
            <Icon type="ios-reorder"></Icon>
          </Button>

        </div>
      </div>

    </div>
    <div class="lists">
      <ul class="list-container">
        <competition-item
          :item="item"
          v-for="(item, index) in cList"
          :key="index"
        >
        </competition-item>
      </ul>
    </div>
  </div>
</template>

<script>
  const competitionItem = () => import('../../components/competitionItem')
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        page: 1,
        typeList: [null, '创新竞赛', '创业竞赛'],
        hostList: [null, '上海交通大学', '华东师范大学'],
        sourceList: [null, '本校', '跨校'],
        levelList: [null, '校级', '市级', '省级', '国家级'],
        statusList: [null, '暂未报名', '正在报名', '已结束'],
        type: '',
        source: '',
        host: '',
        level: '',
        status: '',
        name: '',
        orderBy: 'releaseTime',//releaseTime/ bonus
      }
    },
    computed: mapState({
      cList: state => state.competition.list,
      totalPages: state => state.competition.totalPages,
      isloadingComplete: state => state.competition.isloadingComplete,
    }),
    components: {
      competitionItem
    },
    watch: {
      type: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      host: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      level: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      status: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      source: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      orderBy: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      name: function (newQuestion, oldQuestion) {
        this.getCompetitions()
      },
      $route: function (newQuestion, oldQuestion) {
        this.name = this.$route.query.key
      }
    },
    created() {
      this.$emit('active-index', 2);
      this.name = this.$route.query.key || '';
    },
    mounted: function () {
      this.$store.dispatch('getCompetitions', {page: this.page, orderBy: this.orderBy, name: this.name});
    },
    methods: {
      loadMore: function () {
        if (this.page < this.totalPages) {
          this.page += 1;
          this.$store.dispatch('getCompetitions', {page: this.page, tag_id: this.tag_id, more: true});
        }
      },
      getCompetitions: function () {
        let data = {page: 1}
        if (this.type && this.type.length > 0) data.type = this.type;
        if (this.host && this.host.length > 0) data.host = this.host;
        if (this.level && this.level.length > 0) data.level = this.level;
        if (this.status && this.status.length > 0) data.status = this.status;
        if (this.source && this.source.length > 0) data.source = this.source;
        if (this.orderBy.length > 0) data.orderBy = this.orderBy;
        if (this.name.length > 0) data.name = this.name;
        this.$store.dispatch('getCompetitions', data);
      },
      orderByTime: function () {
        this.orderBy = 'releaseTime';
        if (this.page != 1) this.page = 1;
      },
      orderByBonus: function () {
        this.orderBy = 'bonus';
        if (this.page != 1) this.page = 1;
      },
      changeType: function (value) {
        this.type = value
        if (this.page != 1) this.page = 1;
      },
      changeHost: function (value) {
        this.host = value
        if (this.page != 1) this.page = 1;
      },
      changeLevel: function (value) {
        this.level = value
        if (this.page != 1) this.page = 1;
      },
      changeSource: function (value) {
        this.source = value
        if (this.page != 1) this.page = 1;
      },
      changeStatus(value) {
        this.status = value
        if (this.page != 1) this.page = 1;
      }
    }
  }
</script>

<style scoped lang="scss">

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .filter {
    display: flex;
    flex-direction: row;
    height:250px;
    background:rgba(0,0,0,0);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    padding-top: 23px;
    border-radius:4px;
    background-image: url('./../../assets/pic_search_background@2x.png');
  }

  .pic_search {
    width:201px;
    height:207px;
    margin-left: 72px;
  }

  .condition, .search, .order {
    display: flex;
    flex-direction: row;
  }

  .table {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
  }

  .condition > span, .search > span, .order > span {
    font-size:14px;
    font-family:Helvetica Neue;
    font-weight:bold;
    margin-right: 20px;
    margin-left: 50px;
  }

  .table > Select {
    border:1px solid #000;
  }

  .condition, .search, .order {
    margin: 10px 0 20px;
  }

  .search {
    display: flex;
  }

  .lists {
    margin: 0 auto;
    width: 1020px;
  }

  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }

</style>

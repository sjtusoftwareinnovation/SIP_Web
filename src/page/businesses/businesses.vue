<template>
   <div class="container">
        <div class="filter">
          <img class="pic_search" src="@/assets/school-company.png">
          <div class="table">
              <div class="condition">
                <span>筛选条件</span>
                <Select style="width:100px" v-model="type" placeholder="项目类型">
                      <Option v-for="item in typeList" :value="item" :key="item">{{item}}</Option>
                </Select>
                <Select v-model="source" placeholder="来源范围"  style="margin-left: 10px;width:100px">
                      <Option v-for="item in sourceList" :value="item" :key="item">{{item}}</Option>
                </Select>
                <Select v-model="need" placeholder="需求类别" style="margin-left: 10px;width:100px">
                      <Option v-for="item in needList" :value="item" :key="item">{{item}}</Option>
                </Select>
                <Select v-model="level" placeholder="学生类型" style="margin-left: 10px;width:100px">
                      <Option v-for="item in levelList" :value="item" :key="item">{{item}}</Option>
                </Select>
                <Select v-model="status" placeholder="项目状态" style="margin-left: 10px;width:100px">
                      <Option v-for="item in statusList" :value="item" :key="item">{{item}}</Option>
                </Select>
              </div>
              <div class="search">
                <span>项目名称</span>
                <Input style="width: 250px;box-shadow:0px 3px 6px rgba(0,0,0,0.16)" v-model="name"  icon="ios-search"/>
              </div>
              <div class="order">
                <span>排序方式</span>
                <Button @click="orderByTime" :type="orderBy=='releaseTime'?'primary':'default'" size="large">
                    发布时间
                    <Icon type="ios-reorder"></Icon>
                </Button>
                <Button @click="orderByBonus" :type="orderBy=='bonus'?'primary':'default'" size="large" style="margin-left: 10px">
                    奖金金额
                    <Icon type="ios-reorder"></Icon>
                </Button>
                <Button @click="orderByView" :type="orderBy=='view'?'primary':'default'" size="large" style="margin-left: 10px">
                    浏览量
                    <Icon type="ios-reorder"></Icon>
                </Button>
              </div>
          </div>
        </div>


    <div class="lists">
      <ul class="list-container">
        <business-item
          :item="item"
          v-for="(item, index) in cList"
          :key="index"
        >
        </business-item>
      </ul>
    </div>
   </div>
</template>

<script>
const businessItem = () => import('./businessItem')
import {mapState} from 'vuex';

export default {
    data () {
        return {
          page: 1,
          type: '',
          source: '',
          need: '',
          level: '',
          status: '',
          name: '',
          typeList: ['开发需求', '人才招聘', '实习机会','不限'],
          sourceList: ['本校', '跨校','不限'],
          statusList: ['暂未报名','正在报名', '已结束','不限'],
          levelList: ['本科', '硕士', '博士','不限'],
          needList: ['材料高分子', '海洋', '船舶','不限'],
          orderBy: 'releaseTime',//time bonus view
        }
    },
    computed: mapState({
      cList: state => state.business.list,
      totalPages: state => state.business.totalPages,
      isloadingComplete: state => state.business.isloadingComplete,
    }),
    components: {
      businessItem
    },
    watch: {
      type: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      need: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      level: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      status: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      source: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      name: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy,name: this.name});
      },
      $route: function (newQuestion, oldQuestion) {
        this.name = this.$route.query.key
      }
    },
    created(){
        this.$emit('active-index', 4);
        this.name = this.$route.query.key;
    },
    mounted: function () {
      this.$store.dispatch('getBusinesses', {page: this.page, name: this.name});
    },
    methods: {
      loadMore: function() {
        if(this.page < this.totalPages){
          this.page += 1;
          this.$store.dispatch('getBusinesses', {page: this.page, tag_id: this.tag_id, more: true});
        }
      },
      orderByTime: function() {
        this.orderBy = 'releaseTime';
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      orderByBonus: function() {
        this.orderBy = 'bonus';
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      orderByView: function() {
        this.orderBy = 'view';
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      changeType: function(value) {
        this.type = value
        this.$store.dispatch('getBusinesses', {page: this.page, tag_id: this.tag_id, more: true});
      },
      changeNeed: function(value) {
        this.need = value
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      changeLevel: function(value) {
        this.level = value
      },
      changeSource: function(value) {
        this.source = value
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
      },
      changeStatus (value) {
        this.status = value
        console.log(value)
        this.$store.dispatch('getBusinesses', {page: this.page, type: this.type, status: this.status, orderBy: this.orderBy});
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
    width:214px;
    height:204px;
    margin-left: 72px;
    margin-top: -10px;
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
    margin-left: 11%;
  }

  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }


</style>

<template>
  <div class="container">
    <div class="filter">
      <img class="pic_search" src="@/assets/project_pic.png">
      <div class="table">
        <div class="condition">
          <span>筛选条件</span>
          <Select style="width:100px" v-model="type" placeholder="项目类型">
            <Option v-for="item in typeList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
          <Select v-model="status" placeholder="项目状态" style="margin-left: 10px;width:100px">
            <Option v-for="item in statusList" :value="item||''" :key="item||'全部'">{{item||'全部'}}</Option>
          </Select>
        </div>
        <div class="search">
          <span>竞赛名称</span>
          <Input style="width: auto;font-size: 14px;" v-model="name" icon="ios-search"/>
        </div>

        <div class="order" v-if="false">
          <span>排序方式</span>
          <Button @click="orderByTime" :type="orderBy=='time'?'primary':'default'" size="large">
            发布时间
            <Icon type="ios-reorder"></Icon>
          </Button>
          <Button @click="orderByView" :type="orderBy=='view'?'primary':'default'" size="large"
                  style="margin-left: 10px">
            浏览量
            <Icon type="ios-reorder"></Icon>
          </Button>
        </div>
      </div>
    </div>

    <div class="lists">
      <ul class="list-container">
        <project-item
          :item="item"
          v-for="(item, index) in projects"
          :key="index"
        >
        </project-item>
      </ul>
    </div>

  </div>
</template>

<script>
  const projectItem = () => import('./projectItem');
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        page: 1,
        type: null,
        status: null,
        name: '',
        typeList: [null, '创新创业项目', '科研项目'],
        statusList: [null, '正在报名', '已结束'],
        orderBy: 'time',//time view
      }
    },
    computed: mapState({
      projects: state => state.project.list,
      totalPages: state => state.project.totalPages,
    }),
    components: {
      projectItem
    },
    watch: {
      type: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getProjects', {
          page: this.page,
          type: this.type,
          status: this.status,
          name: this.name.length > 0 ? name : ''
          // orderBy: this.orderBy
        });
      },
      status: function (newQuestion, oldQuestion) {
        this.$store.dispatch('getProjects', {
          page: this.page,
          type: this.type,
          status: this.status,
          name: this.name.length > 0 ? name : ''
          // orderBy: this.orderBy
        });
      },
      name: function (newName, oldName) {
        this.$store.dispatch('getProjects', {
          page: this.page,
          type: this.type,
          status: this.status,
          name: newName && newName.length > 0 ? newName : ''
          // orderBy: this.orderBy
        });
      },
      $route: function (newQuestion, oldQuestion) {
        this.name = this.$route.query.key
      }
    },
    created() {
      this.$emit('active-index', 3);
      this.$store.dispatch('getProjects', {page: 1});
      this.name = this.$route.query.key;
    },
    mounted: function () {
      this.$store.dispatch('getProjects', {page: 1, name: this.name});
    },
    methods: {
      loadMore: function () {
        if (this.page < this.totalPages) {
          this.page += 1;
          this.$store.dispatch('getProjects', {page: this.page, tag_id: this.tag_id, more: true});
        }
      },
      // orderByTime: function () {
      //   this.orderBy = 'time';
      //   this.$store.dispatch('getBusinesses', {
      //     page: this.page,
      //     type: this.type,
      //     status: this.status,
      //     orderBy: this.orderBy
      //   });
      // },
      // orderByView: function () {
      //   this.orderBy = 'view';
      //   this.$store.dispatch('getBusinesses', {
      //     page: this.page,
      //     type: this.type,
      //     status: this.status,
      //     orderBy: this.orderBy
      //   });
      // },
      changeType: function (value) {
        this.type = value;
        this.$store.dispatch('getProjects', {page: this.page, tag_id: this.tag_id, more: true});
      },
      changeStatus(value) {
        this.status = value;
        this.$store.dispatch('getProjects', {
          page: this.page,
          type: this.type,
          status: this.status,
          orderBy: this.orderBy
        });
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
    height: 250px;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding-top: 23px;
    border-radius: 4px;
    background-image: url('./../../assets/pic_search_background@2x.png');
  }

  .pic_search {
    width: 245px;
    height: 177px;
    margin-left: 53px;
    margin-top: 15px;
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
    font-size: 14px;
    font-family: Helvetica Neue;
    font-weight: bold;
    margin-right: 20px;
    margin-left: 50px;
  }

  .table > Select {
    border: 1px solid #000;
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

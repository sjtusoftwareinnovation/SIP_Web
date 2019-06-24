<template>

  <div class="container">
      <list-item
        :item="item"
        v-for="(item, index) in cList"
        :key="index"
        :clickHandler="clickHandler"
      >
      </list-item>
      <Page :current="page" class="page" :total="totalPages" show-elevator />
      <Icon type="ios-settings" class="create" size="35" color="#808695" ></Icon>
      <Modal v-model="modal" fullscreen  scrollable footer-hide title="竞赛表单">
        <competition-form :item="item"></competition-form>
      </Modal>
  </div>

</template>

<script>
import competitionForm from '@/page/forms/competitionForm.vue'
import listItem from '@/components/competitionItem.vue'
import {mapState} from 'vuex';

export default {
    data () {
        return {
          page: 1,
          item: {},
          modal: false
        }
    },
    computed: mapState({
      cList: state => state.competition.list,
      totalPages: state => state.competition.totalPages,
      isloadingComplete: state => state.competition.isloadingComplete,
    }),
    methods: {
      clickHandler: function (item) {
        this.item = item;
        this.modal = true
      },
    },
    watch: {
      page: function(){
        this.$store.dispatch('getCompetitions', {page: this.page});
      }
    },
    components: {
      listItem,
      competitionForm
    },
    created(){
        this.$store.dispatch('getCompetitions', {page: this.page});
    }
}
</script>

<style scoped>

.container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  width: 90%;
  height: 200px;
  display: flex;

  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

}

.page {
  margin-top: 20px;
}

.pic {
  width: 250px;
  height: 150px;
  background-color: gray;
}

.title {
  width: 200px;
  height: 150px;
  background-color: gray;
}

.create {
  margin-top: 60px;
}
</style>

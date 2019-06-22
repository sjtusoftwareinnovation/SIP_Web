<template>
  <div class="container">

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

export default {
    data () {
        return {
          teams: [{
            name: "吃鸡小分队",
            leader: "xxx",
            qq: "5922XXX29"
          }]
        }
    },
    components: {
      teamItem
    },
    created(){


    }
}
</script>

<style scoped lang="scss">

.container {
    margin: 20px 0 60px 0;
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
  justify-content: center;
}

</style>

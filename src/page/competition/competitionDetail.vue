<template>
  <div v-html="description" class="container">
  </div>
</template>

<script>

  import {mapState} from 'vuex';

  export default {
    data() {
      return {}
    },
    computed: mapState({
      description: state => state.competition.info.description,
    })
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 20px 0;
  }
</style>

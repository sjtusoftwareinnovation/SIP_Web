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
    created() {
    },
    computed: mapState({
      description: state => state.project.info.description,
    })
  }
</script>

<style scoped lang="scss">

  .container {
    margin: 20px 0;
  }

</style>

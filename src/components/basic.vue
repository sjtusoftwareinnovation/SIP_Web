<template>

  <Layout class="container">
    <v-banner :active="index" ></v-banner>
    <Content class="main">
      <transition name="fade">
        <router-view v-on:active-index="index=$event"></router-view>
      </transition>
    </Content>

    <Footer class="footer">
      <h2 class="footertitle">上海交通大学双创平台</h2>
      <!-- <h2 class="footerinfo1">Copyright © 2018 XXX.com </h2> -->
    </Footer>
    <BackTop></BackTop>
  </Layout>

</template>
<script>
  import vBanner from '@/components/header.vue'

  export default {
    data() {
      return {
        index: 1
      };
    },
    components: {
      vBanner,
    },
    methods: {}
  };
</script>
<style scoped>
  .container {
    min-height: 80vh;
    min-width: 1200px;
    display: flex;
    /*justify-content: center;*/
  }


  .main {
    /*background-color: #fff;*/
    margin: 0 100px;
  }

  .footer {
    text-align: center;
    height: 80px;
    background-color: white;
    box-shadow:0px -3px 6px rgba(0,0,0,0.16);
  }

  .footertitle {
    font-size: 12px;
    font-weight: lighter;
    color: black;
    letter-spacing: 2px;

  }

  .footerinfo1 {
    font-size: 11px;
    font-weight: lighter;
    color: black;

  }


</style>

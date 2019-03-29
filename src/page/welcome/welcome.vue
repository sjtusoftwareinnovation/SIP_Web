<template>
  <div class="bg">

    <img class="bg-pic" src="@/assets/index_pic.png">
    <img class="bg-arrow" src="@/assets/arrow.png">

    <div class="title">
     <div class="cn">
       <p>上海交通大学</p>
       <p>学生双创门户</p>
     </div>
     <div class="en">
       <p>SJTU Student</p>
       <p>Innovation Center</p>       
     </div>

    </div>

    <Row v-if="false" class="container" type="flex" :gutter="16" justify="center">
      <Col span="4">
        <div class="text">
          <p>注册用户</p>
          <p>100</p>
        </div>
      </Col>
      <Col span="4">
        <div class="text">
          <p>队伍数量</p>
          <p>100</p>
        </div>
      </Col>
      <Col span="4">
        <div class="text">
          <p>奖金总额</p>
          <p>1033110</p>
        </div>
      </Col>
      <Col span="4">
        <div class="text">
          <p>竞赛数量</p>
          <p>100</p>
        </div>
      </Col>
      <Col span="4">
        <div class="text">
          <p>项目数量</p>
          <p>100</p>
        </div>
      </Col>
    </Row>
    <!-- </div> -->
  </div>
</template>

<script>

  export default {
    mounted() {
      this.$emit('active-index', '1');
    }
  }
</script>

<style scoped>
  .bg {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: -14px;
    margin-left: -100px;
    margin-right: -100px;
    height:667px;
    background:rgba(235,235,235,1);
  }

  .bg-pic {
    width: 52%;
  }

  .bg-arrow {
    margin-left: -10px;
    margin-right: -50px;
    margin-top: 151px;
    height: 100px;
  }

  .title {
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    width: 40%;
    align-items: center;
  }

  .title > div > p {
    display:inline;
    font-family:Helvetica Neue;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }

  .cn {
    font-size:34px;
  }

  .cn > p:nth-child(2) {
    color:rgba(245,75,94,1);
  }

  .en {
    font-size:27px;
  }

  .en > p:nth-child(1) {
    color:rgba(245,75,94,1);
  }


  .container {
    margin-top: -160px;
    height: 160px;
    display: flex;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28px;
    color: white;

  }
</style>

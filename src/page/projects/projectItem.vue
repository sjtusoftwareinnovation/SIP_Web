<template>
  <div class="list-item">
    <router-link :to="'/project/'+item.id">
      <img :src=item.cover  style="width:320px;height:240px">
    </router-link>
    <div class="info">
      <div class="info-title">
        <router-link :to="'/competition/'+item.id" class="name">
          {{item.name}}
        </router-link>
        <span class="project-type">{{item.type}}</span>
        <div :class="[ item.status == '已结束' ? 'pot' : 'pot1']"></div>
        <div :class="[ item.status == '已结束' ? 'status' : 'status1']">{{item.status}}</div>
      </div>

      <div class="sub-info">
        <!-- <span>主办方：{{item.host}}</span> -->
        <p>发布时间：{{item.releaseTime&&item.releaseTime.trim().substring(0, 10)}}</p>
      </div>
      <div class="discription">
        <div class="discription">赛事简要：</div>
        <div class="desc">
          {{item.description&&item.description.trim().substring(0, 15).replace(/<[^<>]+>/g ,"")}}
        </div>
      </div>
    </div>
    <Divider/>
    <div class="info-list">
<!--       <div class="info-list-item">
        <div><img src="@/assets/money_S.svg" style="width:14px;height:14px;margin-right:3px;">总奖池</div>
        <div class="value">{{item.bonus}}</div>
      </div>
      <div class="info-list-item">
        <div><img src="@/assets/flag.svg" style="width:14px;height:14px;margin-right:3px;">参赛队伍</div>
        <div class="value">{{item.teamNum}}</div>
      </div> -->
      <div class="info-list-item">
        <div><img src="@/assets/calendar_m.svg" style="width:14px;height:14px;margin-right:3px;">报名截止日期</div>
        <div class="value">{{item.registerEnd&&item.registerEnd.trim().substring(0, 10)}}</div>
      </div>
    </div>

    <!--     <div class="status">
          {{item.status}}
        </div> -->
  </div>
</template>

<script>

  export default {
    name: 'projectItem',
    props: [
      'item'
    ],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .name {
    font-size: 20px;
    font-family: Helvetica Neue;
    padding: 8px 14px;
    font-weight: 500;
    margin-left: -14px;
    color: rgba(0, 0, 0, 1);
  }

  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 10px;
    width: 320px;
    height: 437px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background-color: #fff;

  }

  .info-list {
    margin-top: -15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: rgba(112, 112, 112, 1);
  }

  .info-list > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
  }


  .value {
    font-size: 12px;
    font-weight: 500;
    margin: 10px 5px;
  }

  .info {
    flex: 1;
    margin-left: 20px;
    margin-top: -8px;
  }


  .desc > p, .discription, .desc {
    /*overflow: hidden;*/
    /*height: 50px;*/
    word-break: break-all;
    /*text-overflow: ellipsis;*/
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
    color: #707070;
    font-weight: 400;
  }

  .desc > p:not(:first-child) {
    display: none;
  }


  .sub-info {
    display: flex;
    flex-direction: row;
    color: rgba(112, 112, 112, 1);
    margin-top: -5px;
    font-size: 12px;
    font-family: Helvetica Neue;
    margin-bottom: 16px;
  }

  .sub-info > span {
    color: rgba(0, 0, 0, 1);
    margin-right: 20px;
    font-weight: bold;
  }

  .project-type {
    margin-top: 16px;
    margin-right:5px;
  }


  .status {
    font-size: 12px;
    font-family: Helvetica Neue;
    font-weight: 400;
    margin-top: 14px;
    color: rgba(245, 75, 94, 1);
  }

  .status1 {
    font-size: 12px;
    font-family: Helvetica Neue;
    font-weight: 400;
    margin-top: 14px;
    color: rgba(72, 210, 160, 1);
  }

  .modify {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin: 10px 0;
  }

  .discription {
    display: flex;
    flex-direction: row;
    color: black;
    font-size: 14px;
    font-weight: bold;
  }

  .info-title {
    display: flex;
    flex-direction: row;
  }

  .pot {
    width: 8px;
    height: 8px;
    background: rgba(245, 75, 94, 1);
    border-radius: 50%;
    margin-top: 20px;
    margin-right: 5px;
  }

  .pot1 {
    width: 8px;
    height: 8px;
    background: rgba(72, 210, 160, 1);
    border-radius: 50%;
    margin-top: 20px;
    margin-right: 5px;
  }

</style>

<template>
  <div class="item">
    <Avatar class="author" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
    <div>
      <h3>{{item.username}}</h3>
      <p class="time">{{createdTime}}</p>
      <p>{{item.content||'暂无评论。。。'}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'commentItem',
    props: [
      'item'
    ],
    data() {
      return {}
    },
    computed: {
      createdTime: function () {
        return this.item.createdTime && this.item.createdTime.trim().substring(0, 10)
      }
    }
  }
</script>

<style scoped lang="scss">

  .item {
    display: flex;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: solid 1px #e8e5e5;
    align-items: flex-start;
  }

  h3 {
    font-weight: normal;
    font-size: 16px;
    display: inline-block;
  }

  .author {
    margin-right: 10px;
  }

  .content {
    margin: 10px 20px;
  }

  .time {
    display: inline-block;
    color: grey;
    font-size: 14px;
    margin: 0 15px;
  }
</style>

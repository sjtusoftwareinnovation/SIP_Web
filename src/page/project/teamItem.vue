<template>
    <div class="list-item">
      <div class="info">
        <Avatar class="leader" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <div class="detail">
            <h1 @click="toDetail">{{item.name}}</h1>
            <p>队长：{{item.leader}}</p>
            <p>QQ：{{item.qq}}</p>
        </div>
        <div class="status">
            暂未开始
        </div>
      </div>
      <div class="members">
        <div class="label">队员：</div>
        <div class="member-list">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        </div>
      </div>
      <div class="requirement">
        <div class="label">组队需求：</div>
        <p>
          产品
        </p>
      </div>
      <div class="introduction">
        <div class="label">团队介绍：</div>
        <p>
          暂无介绍
        </p>
      </div>
    </div>
</template>

<script>

export default {
    name: 'competitionItem',
    props: [
      'item'
    ],
    data () {
        return {
        }
    },
    methods: {
      toDetail: function () {
        this.$router.push({path:'/project',query: {id: this.item.id}});
      },
    }
}
</script>

<style scoped lang="scss">

.list-item {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 500px;
}
.detail {
    display: flex;
    flex-direction: column;
    margin: 0 100px 0 20px;
}
.info {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 24px;
}
.status {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    writing-mode: vertical-rl;
    padding: 20px 5px 20px 5px;
    margin: 10px 0;
    background-color: #409EFF;
    color: white;
}
.leader {
    width: 80px;
    height: 80px;
    line-height: 40px;
    border-radius: 40px;
}

.label {
  color: grey;
}

.list-item > div {
  margin: 10px;
}
</style>

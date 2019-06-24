<template>

	<div class="father">
            <list-item
              :item="item"
              v-for="(item, index) in list"
              :key="index"
            >
            </list-item>
            <Icon type="ios-settings" class="create" size="40" color="#808695"></Icon>
	</div>

</template>

<script>
import listItem from '@/page/businesses/businessItem.vue'
export default {
    data () {
        return {
          list:[{
            title: "2019年秋上海交通大学XX校企",
            imgurl: "@/assets/demo1.png"
          }],
          page: 1,

        }
    },
    methods: {

    },
    components: {
      listItem
    },
   created(){

   }
}
</script>

<style scoped>

.father {
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.list {
	width: 90%;
	height: 200px;
	display: flex;

	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;

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

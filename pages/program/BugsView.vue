<template>
  <div v-if="this.$store.state.state.user_id === 2 || this.$store.state.state.user_id === 1" id="BugsView">
    <BugItem class="bug-item" v-for="(item, index) in bugs" :key="index" :user_id="item.user_id" :name="item.name" :comment="item.comment" :image_url="item.image_url" />
  </div>
</template>

<script>
import BugItem from "@/components/BugsView/BugItem.vue";

export default {
  name: "BugsView",
  components: {BugItem},
  data() {
    return{
      bugs: []
    }
  },
  beforeCreate() {
    this.$store.$axios.get('https://oe7jy3.deta.dev/get_check_bugs').then(data=>{
      console.log(data)
      this.bugs = data.data
    })
  },
  mounted() {
    console.log(this.$store.state.state.user_id)
    if (this.$store.state.state.user_id !== 1 && this.$store.state.state.user_id !== 2){
      this.$nuxt.$router.push('/program/Account')
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

  #BugsView{
    max-height: 100vh;
    overflow-y: scroll;
    display: flex;
    //flex-direction: column;
    padding: 8px;
    flex-wrap: wrap;
    //gap: 10px;
    justify-content: space-between;
  }
  .bug-item{
    border: 2px solid $blue;
    border-radius: 5px;
    margin-bottom: 50px;
    width: 500px;
  }

</style>

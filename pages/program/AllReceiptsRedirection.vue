<template>
  <div class="AllReceiptsRedirection">
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  middleware: ['redirect-to-all-time'],
  layout: 'allReceiptsPage',
  methods: {...mapActions(['GET_ALL_USER_DATA'])},
  created() {
    // this.GET_ALL_USER_DATA()
  },
  // beforeRouteEnter(){
  //   console.log('qwe')
  // },
  data() {
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";


</style>

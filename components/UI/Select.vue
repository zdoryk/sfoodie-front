<template>
  <div class="select">
    <input type="text" v-model="state">
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex"

export default {
  name: "my-select",
  methods: {
    ...mapGetters(['PRODUCTS'])
  },
  data(){
    return{
      state: []
    }
  },
  computed: {
    ...mapState('products', ['products'])
  }
}
</script>

<style scoped>

</style>

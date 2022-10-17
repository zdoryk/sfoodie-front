<template>
</template>

<script>
  import Vue from 'vue';
  import VueTablerIcons from "vue-tabler-icons";
  import {mapActions} from "vuex";

  Vue.use(VueTablerIcons);




  export default Vue.extend({
    components: { },
    name: 'Index',
    middleware: ['redirect-to-add-new'],
    methods: {...mapActions(['GET_ALL_USER_DATA'])},
    created() {
      // console.log('qwe')
      // this.GET_TEST()
    }
  })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

</style>

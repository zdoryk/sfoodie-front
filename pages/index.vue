<template>
</template>

<script>
  import Vue from 'vue';
  import VueTablerIcons from "vue-tabler-icons";
  // import VueApexCharts from 'vue-apexcharts'

  import {mapActions} from "vuex";

  Vue.use(VueTablerIcons);
  // Vue.use(VueApexCharts)
  //
  // Vue.component('apexchart', VueApexCharts)




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

</style>

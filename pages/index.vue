<template>

</template>

<script>
  import Vue from 'vue';
  import VueTablerIcons from "vue-tabler-icons";

  Vue.use(VueTablerIcons);

  export default Vue.extend({
    components: { },
    name: 'Index',
    middleware: ['redirect-to-add-new']
  })
</script>

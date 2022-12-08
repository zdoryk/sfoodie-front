<template>

    <div class="Statistic">
      <div class="title">
        Statistic
      </div>
      <tree-map v-if="this.$store.state.state.tree_map_data.colors !== undefined"/>
    </div>

</template>

<script>
import TreeMap from "@/components/Statistic/Charts/TreeMap";
import {mapActions} from "vuex";
export default {
  name: 'Statistic',
  components: {TreeMap},
  methods: {...mapActions(['GET_TREEMAP_DATA'])},
  created() {
    this.GET_TREEMAP_DATA(1)
  },
}
</script>

<style scoped>
  .title{
    font-family: 'Poppins',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;

    color: #EDEFFF;
  }
  .Statistic{
    width: 100%;
  }
</style>

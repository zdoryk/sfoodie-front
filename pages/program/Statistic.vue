<template>

    <div class="Statistic">
      <div class="title">
        Statistic
      </div>
      <tree-map v-if="this.$store.state.state.tree_map_data.colors !== undefined"/>
      <div class="footer">
        <stacked-bar v-if="this.$store.state.state.existing_receipts !== undefined && this.$store.state.state.tree_map_data.colors !== undefined" />
        <div class="line-chart"></div>
      </div>
    </div>

</template>

<script>
import TreeMap from "@/components/Statistic/Charts/TreeMap";
import {mapActions} from "vuex";
import StackedBar from "@/components/Statistic/Charts/StackedBar";
export default {
  name: 'Statistic',
  components: {StackedBar, TreeMap},
  methods: {...mapActions(['GET_TREEMAP_DATA', 'GET_ALL_USER_DATA'])},
  created() {
    this.GET_ALL_USER_DATA(this.$store.state.state.user_id)
    // this.GET_ALL_USER_DATA(this.$store.state.state.user_id)
    this.GET_TREEMAP_DATA(this.$store.state.state.user_id)
    // this.GET_TREEMAP_DATA(this.$store.state.state.user_id)
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

  #stacked{
    flex: 1
  }

  .line-chart{
    flex: 1.5;
  }

  .footer{
    display: flex;
  }
</style>

<template>
    <div class="Statistic">
      <div class="title">
        Statistic
      </div>
      <client-only>
        <tree-map v-if="this.$store.state.state.tree_map_data.colors !== undefined"/>
        <div class="footer"
             v-if="this.$store.state.state.existing_receipts !== undefined
                  && this.$store.state.state.stacked_bar_data.categories !== undefined
                  && this.$store.state.state.tree_map_data.colors !== undefined
                  && this.$store.state.state.existing_categories.length !== 0
                  && this.$store.state.state.existing_categories.length !== undefined">
          <stacked-bar id="stacked" />
          <line-chart id="line"/>
        </div>
      </client-only>
    </div>
</template>

<script>
import TreeMap from "@/components/Statistic/Charts/TreeMap";
import {mapActions} from "vuex";
import StackedBar from "@/components/Statistic/Charts/StackedBar";
import LineChart from "@/components/Statistic/Charts/LineChart";
export default {
  name: 'Statistic',
  components: {LineChart, StackedBar, TreeMap},
  methods: {...mapActions(['GET_TREEMAP_DATA', 'GET_ALL_USER_RECEIPTS', 'GET_USER_CATEGORIES', 'GET_ALL_USER_DATA'])},
  created() {
    // this.GET_ALL_USER_DATA(this.$store.state.state.user_id)
    this.GET_USER_CATEGORIES(this.$store.state.state.user_id)
    this.GET_ALL_USER_RECEIPTS(this.$store.state.state.user_id)
    this.GET_TREEMAP_DATA(this.$store.state.state.user_id)
  },
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";
  .title{
    font-family: 'Poppins',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;

    color: $white;
  }
  .Statistic{
    width: 100%;
    padding: 16px;
    padding-right: 0;
  }

  #stacked{
    width: 40%;
  }

  #line{
    width: 55%;
    transform: translateX(-2%);
  }

  .footer{
    display: flex;
    justify-content: space-between;
    /*max-height: 30% ;*/
  }

  @media (max-width: $phone-size) {
    #stacked, #line{
      width: 100%;
    }
    #line{
      transform: translateX(0);
    }
    .Statistic{
      overflow-y: auto;
      //overflow: auto;
      height: 100vh;
      overflow-x: hidden;
    }

    .footer{
      flex-direction: column;
      padding-right: 16px;
    }
  }
</style>

<template>
    <div class="Statistic">
      <div class="content" v-if="this.$store.state.state.existing_receipts !== undefined
   && this.$store.state.state.stacked_bar_data.categories !== undefined
   && this.$store.state.state.tree_map_data.colors !== undefined
   && this.$store.state.state.existing_categories.length !== 0
   && this.$store.state.state.existing_categories.length !== undefined">
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
      <div id="container" v-else>
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                            flood-color="#5D5FEF"/>
            </filter>
          </defs>
          <circle id="spinner" style="fill:transparent;stroke:#5D5FEF;stroke-width: 7px;stroke-linecap: round;" cx="50" cy="50" r="45"/>
        </svg>
      </div>


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
  #container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  #container {
    width: 30px;
    height: 30px;
  }

  @keyframes animation {
    0% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -105;
    }
    50% {
      stroke-dasharray: 80 10;
      stroke-dashoffset: -160;
    }
    100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
    }
  }

  #spinner {
    transform-origin: center;
    animation-name: animation;
    animation-duration: 1.2s;
    //animation-timing-function: cubic-bezier;
    animation-iteration-count: infinite;
  }

  .title{
    font-family: 'Poppins',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;

    color: $white;
  }
  .Statistic, .content{
    width: 100%;
    //padding: 16px;
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
      padding: 16px;
      height: 100vh;
      overflow-x: hidden;
    }

    .footer{
      flex-direction: column;
      padding-right: 16px;
    }
  }
</style>

<template>
  <div class="tree-map">
    <client-only>
      <blue-button class="back-button" @click.native="back" v-if="this.$store.state.state.charts_shared.isChartCategoryData">< Back</blue-button>
      <apexchart ref="tree_map_chart" type="treemap" height="300"  :options="chartOptions" :series="series" ></apexchart>
    </client-only>
  </div>
</template>

<script>
// import VueApexCharts from "vue-apexcharts";

import {mapActions} from "vuex";
import BlueButton from "@/components/UI/BlueButton";
import Vue from "vue";

export default {
  name: "TreeMap",
  components: {BlueButton, [process.browser && 'apexchart']: () => import('vue-apexcharts'),},
  mounted() {
    this.chartOptions.colors = this.$store.state.state.tree_map_data.colors
    this.series = [this.categories_agg]
  },
  beforeDestroy(){
    console.log('Leave')
    this.SET_CATEGORY_CHART_DATA_ACTION({selected_category: 'None', isChartCategoryData: false})
    this.$parent.$destroy()
  },
  updated() {
    // const element = document.querySelector(".apexcharts-title-text");
    let back_button = document.querySelector(".back-button")
    let rects = document.querySelectorAll('g.apexcharts-treemap-series .apexcharts-treemap-rect')
    if (back_button){
      back_button.style.top =  rects[0].getBoundingClientRect().top + 10 + 'px';
      back_button.style.left =  rects[0].getBoundingClientRect().left + 10 + 'px';
    }
    let index
    for (const rect of rects) {
      rect.addEventListener('click', () => {
        if(!this.$store.state.state.charts_shared.isChartCategoryData){
          index = rect.getAttribute('j');
          this.series = [this.tree_map_data.at(index)]
          this.chartOptions = {...this.chartOptions, ...{
              colors: [this.$store.state.state.tree_map_data.colors.at(index)],
              plotOptions: {
                treemap: {
                  distributed: false,
                  enableShades: true
                }
              }
            }}
          this.SET_CATEGORY_CHART_DATA_ACTION({selected_category: this.tree_map_data.at(index).name, isChartCategoryData: true})
        }
      })
      rect.style.stroke = '#282932'
      rect.style.cursor = 'pointer'
    }
  },
  // watch: {
  //   test: function(newValue, oldValue) {
  //     // console.log(`myVariable changed from ${oldValue} to ${newValue}`);
  //     if(this.$store.state.state.charts_shared.isChartCategoryData) {
  //           let rects = document.querySelectorAll('g.apexcharts-treemap-series .apexcharts-treemap-rect')
  //           const colors = []
  //           for (const rect of rects){
  //             colors.push(rect.getAttribute('fill'))
  //           }
  //           console.log(colors)
  //           this.SET_CATEGORY_CHART_DATA_ACTION({
  //             selected_category: this.$store.state.state.charts_shared.selected_category,
  //             isChartCategoryData: true,
  //             Nodes: colors
  //           })
  //         }
  //         console.log("removed")
  //   }
  // },
  data(){
    return {
      series: [],
      chartOptions: {
        labels: {
          formatter: function (value) {
            return value + '$';
          }
        },
        legend: {
          show: false
        },
        chart: {
          height: 300,
          type: 'treemap',
          toolbar: {
            show: false
            // theme: {mode: 'dark'}
          },
          foreColor: '#edefff',

          events: {
            updated: (chartContext, options) => {
              this.update_colors()
            },
            dataPointSelection: (chartContext, { xaxis, yaxis }) => {
              this.product_selection(chartContext.target.attributes.selected.value, chartContext.target.attributes.j.value)
              console.log(chartContext)
            },
            // dataPointMouseLeave: (event, chartContext, config) => {
              // event.target.attributes.selected.value = false
              // console.group()
              // console.log(event.target.attributes.selected.value)
              // console.log('leave')
              // console.groupEnd()
              // this.product_selection(false)
            // },
            // dataPointMouseEnter: function(event, chartContext, config) {
            //   console.log('enter')
            // }
          }
        },
        // title: {
        //   text: 'Expenses on each category and each product',
        //   align: 'center',
        //   style: {
        //     fontFamily: 'Poppins',
        //     fontSize: 20,
        //     color: '#edefff'
        //   }
        // },
        dataLabels: {
          style: {
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            colors: ['#edefff']
          },
        },
        tooltip: {
          theme: 'dark',
          y: {
            formatter: (seriesValue) => seriesValue.toFixed(2) + ' $',
          },
        },

        colors: this.colors,
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          },
        }
      },

    }
  },
  methods: {
    product_selection(isSelected, index){
      if (this.$store.state.state.charts_shared.isChartCategoryData){
        this.$store.commit('SET_IS_CHART_SELECTED_PRODUCT', {bool: JSON.parse(isSelected), index: JSON.parse(index)})
        // this.SET_IS_CHART_SELECTED_PRODUCT_ACTION({bool: isSelected, index: index})
        console.log(isSelected)
        console.log(index)
      }
    },

    update_colors(){
      let rects = document.querySelectorAll('g.apexcharts-treemap-series .apexcharts-treemap-rect')
      const colors = []
      for (const rect of rects){
        colors.push(rect.getAttribute('fill'))
      }
      this.SET_SHARED_CHART_COLORS_ACTION(colors)
    },
    ...mapActions(['SET_CATEGORY_CHART_DATA_ACTION', 'SET_SHARED_CHART_COLORS_ACTION', 'SET_IS_CHART_SELECTED_PRODUCT_ACTION']),
    back(){
      this.series = [this.categories_agg]
      const colors = JSON.parse(JSON.stringify(this.$store.state.state.tree_map_data.colors))
      this.chartOptions = {...this.chartOptions, ...{
          colors: colors,
          // colors: this.$store.state.state.tree_map_data.colors,
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          }
        }}
      this.$store.commit('SET_IS_CHART_SELECTED_PRODUCT', {bool: false, index: 0})
      this.SET_CATEGORY_CHART_DATA_ACTION({selected_category: '', isChartCategoryData: false})
    }
  },
  computed: {
    categories_agg() {
      return this.$store.state.state.tree_map_data.categories_aggregated
    },
    tree_map_data(){
      return this.$store.state.state.tree_map_data.tree_map_data
    },
    colors(){
      if (this.$store.state.state.tree_map_data.colors !== undefined){
        this.chartOptions.colors = this.$store.state.state.tree_map_data.colors
        return this.$store.state.state.tree_map_data.colors
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .apexcharts-treemap-rect.apexcharts-treemap-rect {
      stroke: none !important;
  }

  .back-button{
    //transform: translateY(5px);
    padding: 8px 12px;
    position: absolute;
    z-index: 3;
    cursor: pointer;
  }

</style>

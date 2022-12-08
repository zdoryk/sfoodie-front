<template>
  <div class="tree-map">
    <client-only>
      <div class="rofl" @click="back"><--</div>
      <apexchart ref="tree_map_chart" type="treemap" height="350" :options="chartOptions" :series="series" ></apexchart>
    </client-only>
  </div>
</template>

<script>
// import VueApexCharts from "vue-apexcharts";

import {mapActions} from "vuex";

export default {
  name: "TreeMap",
  components: { [process.browser && 'apexchart']: () => import('vue-apexcharts'),},
  mounted() {
    this.chartOptions.colors = this.$store.state.state.tree_map_data.colors
    this.series = [this.categories_agg]
    // }
  },
  updated() {
    // let menu = document.querySelector('.apexcharts-menu')
    // if (menu){
    //   menu.style.background = '#282932'
    //   menu.style.border = 'none'
    // }
    // let menu_items = document.querySelectorAll('.apexcharts-menu-item')
    // if (menu_items){
    //   for (const item of menu_items){
    //     item.addEventListener("mouseover", function() {
    //       this.style.background = "#3A3C4C";
    //     });
    //     item.addEventListener("mouseout", function() {
    //       this.style.background = "#282932";
    //     });
    //   }
    // }
    let element = document.querySelector(".apexcharts-title-text");
    if (element){
      document.querySelector(".rofl").style.top =  element.getBoundingClientRect().top + window.pageYOffset + 'px';
    }
    let rects = document.querySelectorAll('g.apexcharts-treemap-series .apexcharts-treemap-rect')
    for (const rect of rects) {
      rect.addEventListener('click', () => {
        if(!this.isCategoryData){
          const index = rect.getAttribute('j');
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
          this.isCategoryData = true
        }
      })
      rect.style.stroke = '#282932'
      // rect.style.borderRadius = '10px'
    }
  },
  data(){
    return {
      // raw_data: [],
      // category_data: [],
      // category_color: {},
      // colors: [],
      // series: [
      //   {
      //     name: 'Desktops',
      //     data: [
      //       {
      //         x: 'ABC',
      //         y: 10
      //       },
      //       {
      //         x: 'DEF',
      //         y: 60
      //       },
      //       {
      //         x: 'XYZ',
      //         y: 41
      //       }
      //     ]
      //   },
      //   {
      //     name: 'Mobile',
      //     data: [
      //       {
      //         x: 'ABCD',
      //         y: 10
      //       },
      //       {
      //         x: 'DEFG',
      //         y: 20
      //       },
      //       {
      //         x: 'WXYZ',
      //         y: 51
      //       },
      //       {
      //         x: 'PQR',
      //         y: 30
      //       },
      //       {
      //         x: 'MNO',
      //         y: 20
      //       },
      //       {
      //         x: 'CDE',
      //         y: 30
      //       }
      //     ]
      //   }
      // ],
      // series: [
      //   {
      //     name: "Fruits",
      //     data: [
      //       {
      //         x: "Bananas",
      //         y: 24.5
      //       },
      //       {
      //         x: "Pineapple",
      //         y: 54.89
      //       },
      //       {
      //         x: "Strawberry",
      //         y: 64.3
      //       }
      //     ]
      //   },
      //   {
      //     name: "Meat",
      //     data: [
      //       {
      //         x: "Beef",
      //         y: 107.91
      //       },
      //       {
      //         x: "Ham",
      //         y: 37.29
      //       }
      //     ]
      //   },
      //   {
      //     name: "Drinks",
      //     data: [
      //       {
      //         x: "Juice",
      //         y: 12.38
      //       }
      //     ]
      //   },
      //   {
      //     name: "Semi-finished products",
      //     data: [
      //       {
      //         x: "Lasagne",
      //         y: 63.92
      //       }
      //     ]
      //   },
      //   {
      //     name: "Snacks",
      //     data: [
      //       {
      //         x: "Snickers",
      //         y: 1.98
      //       }
      //     ]
      //   },
      //   {
      //     name: "Other",
      //     data: [
      //       {
      //         x: "string",
      //         y: 10
      //       }
      //     ]
      //   },
      // ],
      series: [],
      isCategoryData: false,
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
          height: 350,
          type: 'treemap',
          toolbar: {
            show: false
            // theme: {mode: 'dark'}
          }
          // events: {
          //   dataPointSelection: function(event, chartContext, config) {
          //     console.log(this.$store.state.state.tree_map_data.tree_map_data)
          //     console.log(this.tree_map_data[config.dataPointIndex])
          //   }
          // }
        },
        title: {
          text: 'Expenses on each category and each product',
          align: 'center',
          style: {
            fontFamily: 'Poppins',
            fontSize: 20,
            color: '#edefff'
          }
        },
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
            formatter: (seriesValue) => seriesValue + ' $',
          },
        },

        colors: this.colors,
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        }
      },

    }
  },
  methods: {
    back(){
      this.series = [this.categories_agg]
      this.chartOptions = {...this.chartOptions, ...{
          colors: this.$store.state.state.tree_map_data.colors,
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          }
        }}
      this.isCategoryData = false
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
    // color_category(){
    //   let category_color
    //   for (let i = 0; i < this.tree_map_data.length; i++) {
    //     category_color[this.tree_map_data[i].name] = this.colors[i]
    //   }
    // },
  }
}
</script>

<style scoped lang="scss">
  .apexcharts-treemap-rect.apexcharts-treemap-rect {
      stroke: none !important;
  }

  .rofl{
    transform: translateY(5px);
    position: absolute;
    z-index: 3;
    cursor: pointer;
  }

</style>

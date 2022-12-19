<template>
  <div id="stacked">
    <client-only>
      <div class="title">
        Lorem ipsum
      </div>
      <div class="chart">
        <apexchart ref="chart" type="bar" width="95%" height="280px" :options="chartOptions" :series="data_series" ></apexchart>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "StackedBar",
  components: { [process.browser && 'apexchart']: () => import('vue-apexcharts'),},
  mounted() {
    this.chartOptions.colors = Array.from(this.$store.state.state.tree_map_data.colors)
    this.$store.watch((state) => state.state.charts_shared.colors, (newValue, oldValue) => {
      this.change_colors(JSON.parse(JSON.stringify(newValue)))
    })
  },
  beforeDestroy() {

  },
  updated() {
    let svg = document.querySelector('#stacked svg')
    if (svg){
      svg.style.borderRadius = '5px'
      svg.style.paddingRight = '5px'
    }
  },
  methods: {
    change_colors(newValue){
      console.log(newValue)
      console.log(this.$refs)
      // this.chartOptions.colors = newValue
      if (this.$refs.chart !== undefined){
        this.$refs.chart.updateOptions({colors: newValue}, true, true, true);
      }
      // this.chartOptions = {...this.chartOptions, ...{
      //     colors: newValue,
      //     chart: {
      //       animations: { enabled: true, easing: "linear", speed: 1500,
      //         animateGradually: { enabled: true, delay: 1500 },
      //         dynamicAnimation: { enabled: true, speed: 1500 }
      //       }
      //     }
      //   }
      // }
    },
    test: function (data, isCategoryData) {
      let productData = []
      let products = Object.assign({}, data)
      let productNames
      const selected_category = '' + this.$store.state.state.charts_shared.selected_category

      console.log(products)
      if (isCategoryData) {
        const category_map = this.$store.state.state.stacked_bar_data.category_map_products
        products = Object.fromEntries(Object.entries(products).filter( ([key,value]) => category_map[key.split(",")[0]] === selected_category))
          // this.chartOptions = {...this.chartOptions, ...{
          //     colors: this.$store.state.state.charts_shared.colors
              //   .findIndex(item => item.name === selected_category))],
              // colors: colors.reverse()
            // }
          // }
      } else {
        products = Object.assign({}, data)
      }
      productNames = Array.from(new Set(Object.keys(products).map((name) =>
          name.split(",")[0]
      )))

      // console.log(products)
      console.log(productNames)
      for (let i = 0; i < productNames.length; i++) {
        productData.push({
          name: productNames[i],
          data: [
            products[`${productNames[i]},Monday`],
            products[`${productNames[i]},Tuesday`],
            products[`${productNames[i]},Wednesday`],
            products[`${productNames[i]},Thursday`],
            products[`${productNames[i]},Friday`],
            products[`${productNames[i]},Saturday`],
            products[`${productNames[i]},Sunday`]
          ]
        })
      }
      console.log(productData)

      if (!isCategoryData) {
        console.log(this.$store.state.state.tree_map_data.tree_map_data)
        const convertedArray = this.$store.state.state.tree_map_data.tree_map_data.map(obj2 => {
          // find the corresponding object in array1
          console.log(obj2)
          const obj1 = productData.find(obj => obj.name === obj2.name)
          // create a new object with the same name and data
          return {
            name: obj1.name,
            data: obj1.data
          }
        })
        // console.log(convertedArray)
        return convertedArray
      }
      console.group()
      const convertedArray = JSON.parse(JSON.stringify(this.$store.state.state.tree_map_data.tree_map_data)).map(obj => ({
        name: obj.name,
        data: obj.data.map(item => item.x)
      }))
      console.log(convertedArray)
      const result = convertedArray.find(obj => obj.name === selected_category).data.map(name => {
        return productData.find(item => item.name === name)
      })
      console.log(result)
      console.groupEnd()
      if (this.$store.state.state.charts_shared.product.isProductSelected){
        this.$store.commit('SET_CHART_SELECTED_PRODUCT_NAME', result[this.$store.state.state.charts_shared.product.index].name)
        return [result[this.$store.state.state.charts_shared.product.index]]
        // console.group()
        // console.log(result)
        // console.log(result[this.$store.state.state.charts_shared.product.index])
        // console.groupEnd()
      } else return result
      // return convertedArray.find(obj => obj.name === selected_category).data.map(name => {
      //   return productData.find(item => item.name === name)
      // })
    },

  },
  data() {
    return {
      chartOptions: {
        // colors: ["#FF7043","#FF5252","#536DFE","#B388FF","#FFA726","#656b69","#F178B6"],
        chart: {
          type: 'bar',
          // height: 280,
          stacked: true,
          toolbar: {
            show: false
          },
          background: 'transparent',
          fontFamily: 'Poppins',
          foreColor: '#edefff',
          tooltip: {
            theme: 'dark',
            y: {
              formatter: (seriesValue) => seriesValue.toFixed(2),
            },
          },
          events: {
          }
        },
        theme: {
          mode: 'dark',
        },
        plotOptions: {
          bar: {
            // horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetY: -10,
                formatter: function (val, opts) {
                  return val.toFixed(2)
                },
                style: {
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#edefff',
                  fontWeight: 900
                }
              }
            }
          },
        },
        dataLabels: {
          enabled: false,
          formatter: (value) => value.toFixed(2),
          style: {
            fontSize: '14px',
            // fontFamily: 'Poppins, sans-serif',
            color: '#edefff',
            fontWeight: 600
          }
        },
        stroke: {
          width: 1,
          colors: ['#23242D']
          // colors: ["#FF7043","#FF5252","#536DFE","#B388FF","#FFA726","#656b69","#F178B6"]
        },
        // title: {
        //   text: 'Fiction Books Sales'
        // },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yaxis: {
          title: {
            text: undefined
          },
          // decimalsInFloat: true
          labels: {
            formatter: (value) => value.toFixed(2)
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false,
          // position: 'top',
          // horizontalAlign: 'left',
          // offsetY: -10
        },
        grid: {
          show: true,
          borderColor: "#3A3C4C"
        }
      },
    }
  },
  computed:{
    data_series(){
      const isCategory = this.$store.state.state.charts_shared.isChartCategoryData
      const isProduct = this.$store.state.state.charts_shared.product.isProductSelected
      console.log(isProduct)
      console.log(isCategory)
      console.log(this.$store.state.state.stacked_bar_data.categories.length)
      if (isCategory === false ){
        return this.test(this.$store.state.state.stacked_bar_data.categories, isCategory)
      }
      // else if (isCategory === true && this.$store.state.state.charts_shared.product.isProductSelected &&
      //   this.$store.state.state.stacked_bar_data.products !== undefined){
      //   return
      // }
      else if (isCategory === true && this.$store.state.state.stacked_bar_data.products !== undefined){
        return this.test(this.$store.state.state.stacked_bar_data.products, isCategory)
      }
    },
    display(){
      if (this.$refs.chart !== undefined){
        return 'block'
      }
      return 'none'
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
  .chart{
    background-color: $grey-background;
    border-radius: 4px;
  }

  .title{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
    margin-top: 16px;
  }
</style>

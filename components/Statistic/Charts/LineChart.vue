<template>
  <div class="line-chart">
    <client-only>
      <div class="title">
        Lorem Ipsum
      </div>
      <div id="line-chart-block">
        <apexchart ref="chart" type="area" height="280px" :options="chartOptions" :series="main"></apexchart>
      </div>
    </client-only>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {mapGetters} from "vuex";

export default {
  name: "LineChart",
  components: {BlueButton, [process.browser && 'apexchart']: () => import('vue-apexcharts'),},
  mounted() {
    this.$store.watch((state) => state.state.charts_shared.colors, (newValue, oldValue) => {
      this.changeColor(JSON.parse(JSON.stringify(newValue)))
    })
    // this.chartOptions.colors = [this.$store.state.state.tree_map_data.colors[0]]
  },
  computed: {
    ...mapGetters(['currencySymbol']),
    main(){
      const isCategory = this.$store.state.state.charts_shared.isChartCategoryData
      const isProduct = this.$store.state.state.charts_shared.product.isProductSelected
      let receipts = Array.from(this.$store.state.state.existing_receipts).sort((a,b) => a.createdAt-b.createdAt)

      console.log(isProduct)
      console.log(isCategory)
      if (isProduct){
        return this.test(this.filter_by_product(this.filter_by_category(receipts)))
      }
      if (isCategory === false ) {
        return this.test(receipts, isCategory, isProduct)
      }
      else if (isCategory === true){
        return this.test(this.filter_by_category(receipts), isCategory, isProduct)
      }
      // return this.test()
    }
  },
  methods: {
    changeColor(newValue){
      if (this.$refs.chart !== undefined){
        if (this.$store.state.state.charts_shared.isChartCategoryData === false) this.$refs.chart.updateOptions({colors: ['rgb(0, 143, 251)']}, true, true, true);
        else this.$refs.chart.updateOptions({colors: newValue}, true, true, true);
      }
    },

    filter_by_category(receipts){
      const selected_category = "" + this.$store.state.state.charts_shared.selected_category
      const mapped_category_products = Object.assign({}, this.$store.state.state.stacked_bar_data.category_map_products)
      return receipts.map(receipt => {
        const filtered = receipt.products.filter(product => mapped_category_products[product.product_name] === selected_category)
        return {...receipt, products: filtered};
      }).filter(obj => obj.products.length > 0)
    },

    filter_by_product(receipts){
      console.log(receipts)
      return receipts.map(receipt => {
        const filtered = receipt.products.filter(product => product.product_name === this.$store.state.state.charts_shared.product.product_name)
        return {...receipt, products: filtered};
      }).filter(obj => obj.products.length > 0)
      // console.log(this.$store.state.state.tree_map_data.tree_map_data[this.$store.state.state.charts_shared.selected_category_index])
    },

    test(receipts, isCategory, isProduct){
      // let receipts = Array.from(this.$store.state.state.existing_receipts).sort((a,b) => a.createdAt-b.createdAt)
      let totalsByDate = {}

      receipts.forEach(receipt => {
        let date = new Date(receipt.createdAt * 1000);
        // date = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
        date =  date.getFullYear() + "-" + ("0"+(date.getMonth())).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
        let total = receipt.products.reduce((accumulator, product) => accumulator + product.price, 0)
        if (totalsByDate[date]) {
          totalsByDate[date] += total;
        } else {
          totalsByDate[date] = total;
        }
      });

      const totalsArray = Object.values(totalsByDate).map(total => {
        return total;
      });
      const datesArray = Object.keys(totalsByDate).map(key => {
        return new Date(key).toISOString();
      });

      this.chartOptions = {...this.chartOptions, ...{
          xaxis: {
            categories: datesArray,
            type: 'category',
            tooltip: {
              x: {
                format: 'dd/MM/yy'
              },
            },
            labels: {
              style: {
                colors: ['#edefff'],
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
              },
              formatter: label => {
                let new_label = "" + label
                new_label = new Date(new_label.slice(0,10))
                new_label.setMonth(new_label.getMonth() + 1)
                return new_label.toLocaleString('en-EG', { month: 'short' })  + ', ' + new_label.getDate()
              }
            }
          }
        }
      }
      if (isProduct){
        return [{name: 'Expenses for: product', data: totalsArray}]
      }
      else if (isCategory){
        return [{name: 'Expenses for: ' + this.$store.state.state.charts_shared.selected_category, data: totalsArray}]
      }
      return [{name: 'All expenses', data: totalsArray}]
    }
  },
  data(){
    return{
      sample_data: {
        dates: [],
        total: []
      },
      series: [{
        name: 'series1',
        data: []
      }],

      chartOptions: {
        chart: {
          height: 280,
          // colors: ['#000000'],
          fontSize: '12px',
          fontFamily: 'Poppins',
          fontWeight: 400,
          type: 'area',
          toolbar: {
            show: false
            // theme: {mode: 'dark'}
          },
          foreColor: '#edefff',
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            colors: ['#edefff']
          },
        },
        tooltip: {
          theme: 'dark',
          style: {
            fontFamily: "Poppins, sans-serif"
          },
          y: {
            formatter: (seriesValue) => seriesValue.toFixed(2) + ' ' + this.currencySymbol,
          },
          x: {
            format: 'dd/MM/yy'
          },
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          show: true,
          borderColor: "#3A3C4C"
        },

        xaxis: {
          show: true,
          type: 'datetime',
          tooltip: {
            x: {
              format: 'dd/MM/yy'
            },
          },
          // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
          labels: {
            style: {
              colors: ['#edefff'],
              fontSize: '12px',
              fontFamily: 'Poppins',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            format: 'dd/MM/yy'
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ['#edefff'],
              fontSize: '12px',
              fontFamily: 'Poppins',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            formatter:(data) => data.toFixed(2) + ' ' + this.currencySymbol
          }
        }
      },
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

  #line-chart-block{
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

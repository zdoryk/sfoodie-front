<template>
  <div class="line-chart">
    <client-only>
      <div class="title">
        Lorem Ipsum
      </div>
      <div id="line-chart-block">
        <apexchart type="area" height="280px" :options="chartOptions" :series="series"></apexchart>
      </div>
    </client-only>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";

export default {
  name: "LineChart",
  components: {BlueButton, [process.browser && 'apexchart']: () => import('vue-apexcharts'),},
  mounted() {
    const receipts = Array.from(this.$store.state.state.existing_receipts).sort((a,b) => a.createdAt-b.createdAt)
    let totalsByDate = {}
    console.log(receipts)
    receipts.forEach(receipt => {
      let date = new Date(receipt.createdAt * 1000);
      date = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
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
    this.series = [{name: 'All expenses', data: totalsArray}]
    this.chartOptions.xaxis.categories = datesArray
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
          // height: 350,
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
            formatter: (seriesValue) => seriesValue.toFixed(2) + ' $',
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
            formatter:(data) => data.toFixed(2)
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

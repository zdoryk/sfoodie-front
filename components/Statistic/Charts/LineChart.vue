<template>
  <div class="line-chart">
    <client-only>
      <div class="title">
        <!--        Expenses trends-->
        Spending trends
      </div>
      <div id="line-chart-block">
        <apexchart
          ref="chart"
          type="area"
          height="280px"
          :options="chartOptions"
          :series="main"
        ></apexchart>
      </div>
    </client-only>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import { mapGetters } from "vuex";

export default {
  name: "LineChart",
  components: {
    BlueButton,
    [process.browser && "apexchart"]: () => import("vue-apexcharts"),
  },
  mounted() {
    this.$store.watch(
      (state) => state.state.charts_shared.colors,
      (newValue, oldValue) => {
        this.changeColor(JSON.parse(JSON.stringify(newValue)));
      }
    );
    // this.chartOptions.colors = [this.$store.state.state.tree_map_data.colors[0]]
  },
  props: ["start", "end"],
  computed: {
    ...mapGetters(["currencySymbol"]),
    main() {
      const isCategory =
        this.$store.state.state.charts_shared.isChartCategoryData;
      const isProduct =
        this.$store.state.state.charts_shared.product.isProductSelected;
      // let receipts = Array.from(this.$store.state.state.existing_receipts).sort((a,b) => a.createdAt-b.createdAt)
      let receipts = Array.from(this.$store.state.state.existing_receipts);
      console.log(
        receipts.map((receipt) => new Date(receipt.createdAt * 1000))
      );
      console.log(new Date(this.start * 1000));
      console.log(new Date(this.end + 86399));
      receipts = this.aggregateReceipts(
        receipts.filter(
          (receipt) =>
            receipt.createdAt >= this.start &&
            receipt.createdAt <= this.end + 86399
        )
      ).sort((a, b) => a.createdAt - b.createdAt);
      console.log(receipts);
      // console.log(receipts)
      // console.log(isProduct)
      // console.log(isCategory)
      if (isProduct) {
        return this.test(
          this.filter_by_product(this.filter_by_category(receipts))
        );
      }
      if (isCategory === false) {
        return this.test(receipts, isCategory, isProduct);
      } else if (isCategory === true) {
        return this.test(
          this.filter_by_category(receipts),
          isCategory,
          isProduct
        );
      }
      // return this.test()
    },
  },
  methods: {
    // Function to aggregate receipts by day
    aggregateReceipts(receipts) {
      // Create an empty object to store the aggregated data
      const aggregatedData = {};

      // Loop through the receipts
      for (let i = 0; i < receipts.length; i++) {
        // Get the date from the createdAt timestamp
        const date = new Date(receipts[i].createdAt * 1000).toDateString();

        // Check if the date already exists in the aggregatedData object
        if (!aggregatedData[date]) {
          // If it doesn't, create a new object with the date as the key
          aggregatedData[date] = {
            totalPrice: 0,
            products: [],
          };
        }

        // Add the total price of the receipt to the total price for that date
        aggregatedData[date].totalPrice += receipts[i].total_price;

        // Loop through the products in the receipt
        for (let j = 0; j < receipts[i].products.length; j++) {
          // Get the product name
          const productName = receipts[i].products[j].product_name;

          // Check if the product already exists in the products array
          let existingProduct = aggregatedData[date].products.find(
            (p) => p.product_name === productName
          );
          if (!existingProduct) {
            // If it doesn't, push a new object with the product name as the key
            existingProduct = { product_name: productName, price: 0 };
            aggregatedData[date].products.push(existingProduct);
          }

          // Add the price of the product to the total price for that product
          existingProduct.price += receipts[i].products[j].price;
        }
      }

      // Create an empty array to store the final list of objects
      const aggregatedList = [];

      // Loop through the aggregatedData object and push each day's data as an object to the aggregatedList array
      for (const date in aggregatedData) {
        aggregatedList.push({
          createdAt: new Date(date).getTime() / 1000,
          totalPrice: aggregatedData[date].totalPrice,
          products: aggregatedData[date].products,
        });
      }

      return aggregatedList;
    },

    changeColor(newValue) {
      if (this.$refs.chart !== undefined) {
        if (this.$store.state.state.charts_shared.isChartCategoryData === false)
          this.$refs.chart.updateOptions(
            { colors: ["rgb(0, 143, 251)"] },
            true,
            true,
            true
          );
        else
          this.$refs.chart.updateOptions(
            { colors: newValue },
            true,
            true,
            true
          );
      }
    },

    filter_by_category(receipts) {
      const selected_category =
        "" + this.$store.state.state.charts_shared.selected_category;
      const mapped_category_products = Object.assign(
        {},
        this.$store.state.state.stacked_bar_data.category_map_products
      );
      return receipts
        .map((receipt) => {
          const filtered = receipt.products.filter(
            (product) =>
              mapped_category_products[product.product_name] ===
              selected_category
          );
          return { ...receipt, products: filtered };
        })
        .filter((obj) => obj.products.length > 0);
    },

    filter_by_product(receipts) {
      // console.log(receipts)
      return receipts
        .map((receipt) => {
          const filtered = receipt.products.filter(
            (product) =>
              product.product_name ===
              this.$store.state.state.charts_shared.product.product_name
          );
          return { ...receipt, products: filtered };
        })
        .filter((obj) => obj.products.length > 0);
      // console.log(this.$store.state.state.tree_map_data.tree_map_data[this.$store.state.state.charts_shared.selected_category_index])
    },

    test(receipts, isCategory, isProduct) {
      // let receipts = Array.from(this.$store.state.state.existing_receipts).sort((a,b) => a.createdAt-b.createdAt)
      let totalsByDate = {};

      receipts.forEach((receipt) => {
        let date = new Date(receipt.createdAt * 1000).toLocaleString();
        // console.log(date.toISOString())
        // date = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
        // date =  date.getFullYear() + "-" + ("0"+(date.getMonth())).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
        let total = receipt.products.reduce(
          (accumulator, product) => accumulator + product.price,
          0
        );
        if (totalsByDate[date]) {
          totalsByDate[date] += total;
        } else {
          totalsByDate[date] = total;
        }
      });

      const totalsArray = Object.values(totalsByDate).map((total) => {
        return total;
      });
      const datesArray = Object.keys(totalsByDate);
      // console.log(datesArray)
      // .map(key => {
      // console.log(key)
      // console.log(new Date(key))
      // return new Date(key).toISOString();
      // return new Date(key);
      // return key
      // });

      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: datesArray,
            type: "category",
            tooltip: {
              x: {
                format: "dd/MM/yy",
              },
            },
            labels: {
              style: {
                colors: ["#edefff"],
                fontSize: "12px",
                fontFamily: "Poppins",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
              formatter: (label) => {
                let new_label = "" + label;
                new_label = new Date(new_label.slice(0, 10));
                new_label.setMonth(new_label.getMonth());
                return (
                  new_label.toLocaleString("en-EG", { month: "short" }) +
                  ", " +
                  new_label.getDate()
                );
              },
            },
          },
        },
      };
      if (isProduct) {
        return [{ name: "Expenses for: product", data: totalsArray }];
      } else if (isCategory) {
        return [
          {
            name:
              "Expenses for: " +
              this.$store.state.state.charts_shared.selected_category,
            data: totalsArray,
          },
        ];
      }
      return [{ name: "All expenses", data: totalsArray }];
    },
  },
  data() {
    return {
      sample_data: {
        dates: [],
        total: [],
      },
      series: [
        {
          name: "series1",
          data: [],
        },
      ],

      chartOptions: {
        chart: {
          height: 280,
          // colors: ['#000000'],
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 400,
          type: "area",
          toolbar: {
            show: false,
            // theme: {mode: 'dark'}
          },
          foreColor: "#edefff",
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            colors: ["#edefff"],
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontFamily: "Poppins, sans-serif",
          },
          y: {
            formatter: (seriesValue) =>
              seriesValue.toFixed(2) + " " + this.currencySymbol,
          },
          x: {
            format: "dd/MM/yy",
          },
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          show: true,
          borderColor: "#3A3C4C",
        },

        xaxis: {
          show: true,
          type: "datetime",
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
          // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
          labels: {
            style: {
              colors: ["#edefff"],
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            format: "dd/MM/yy",
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: ["#edefff"],
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (data) => data.toFixed(2) + " " + this.currencySymbol,
          },
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

#line-chart-block {
  background-color: $grey-background;
  border-radius: 4px;
}

.title {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 10px;
  margin-top: 16px;
}
</style>

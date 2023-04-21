<template>
  <div class="AllReceipts">
    <div class="navigation-bar">
      <div id="title">All Receipts</div>
      <div class="time-period">
        <div class="filters">
          <!--          <div class="clear-filters" v-on:click="this.clearFilters">-->
          <!--            <div class="clear-filters-text">Clear filters</div>-->
          <!--            <x-icon  class="ico clear-filters-ico"/>-->
          <!--          </div>-->
          <client-only>
            <category-filter ref="category_filter" />
          </client-only>
          <price-range-filter ref="price_range_filter" v-model="priceRange" />
          <div class="date-time">
            <date-picker
              v-model="timePeriod"
              range
              format="MMM DD, YYYY"
              :placeholder="'Choose a date'"
            ></date-picker>
          </div>
          <div class="clear-filters" v-on:click="this.clearFilters">
            <div class="clear-filters-text">Clear</div>
            <x-icon class="ico clear-filters-ico" />
          </div>
        </div>
      </div>
    </div>
    <div class="all-receipts-content">
      <div class="AllTime">
        <!--        <div id="receipt-view-div">-->
        <receipt-view
          :key="receiptViewKey"
          id="receipt-view"
          v-model="isConfirmationVisible"
          v-if="Object.keys(sorted_receipts_by_mmYYYY).length !== 0"
        />
        <!--        </div>-->
        <div id="content" :style="cssVars">
          <div v-if="isConfirmationVisible" id="delete-confirmation-div">
            <delete-confirmation v-model="isConfirmationVisible"
              >Do you really want to delete this receipt?</delete-confirmation
            >
            <div class="opacity" @click="closeConfirmation"></div>
          </div>
          <div class="there-is-no-receipts" v-if="!isReceipts">
            <div class="text">
              There is no receipts that would satisfy filters conditions.
            </div>
          </div>
          <div
            id="month"
            v-for="(item, key, i) in sorted_receipts_by_mmYYYY"
            :key="i"
            v-if="isReceipts"
          >
            <div class="date_title">{{ key }}</div>
            <div class="receipts">
              <ExistingReceiptItem
                v-for="(receipt, key, index) in item"
                :key="index"
                v-bind:existing_receipt_data="receipt"
                v-model="activeReceiptID"
              />
            </div>
            <div class="line" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import TimePeriodItem from "@/components/AllReceipts/TimePeriodItem";
import { mapActions } from "vuex";
import ExistingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";
import ReceiptView from "@/components/AllReceipts/ReceiptView";
import PopUp from "@/components/AllReceipts/PopUp";
import DeleteConfirmation from "@/components/UI/DeleteConfirmation";
import PriceRangeFilter from "@/components/AllReceipts/PriceFilter/PriceRangeFilter";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import { XIcon } from "vue-tabler-icons";
import CategoryFilter from "@/components/AllReceipts/CategoryFilter/CategoryFilter";

export default {
  components: {
    CategoryFilter,
    RedStrokeButton,
    PriceRangeFilter,
    PopUp,
    ExistingReceiptItem,
    ReceiptView,
    TimePeriodItem,
    DeleteConfirmation,
    DatePicker,
    XIcon,
  },
  layout: "allReceiptsPage",
  // middleware: ['GET_DATA'],
  data() {
    return {
      activeReceiptID: this.$store.state.state.selected_receipt.receipt_id,
      isConfirmationVisible: false,
      timePeriod: [],
      priceRange: [],
      categories_to_include: [],
      overflow: "scroll",
      receiptViewKey: 0,
    };
  },
  methods: {
    ...mapActions([
      "SET_EXISTING_RECEIPTS_ACTION",
      "SELECT_FIRST_RECEIPT",
      "GET_ALL_USER_RECEIPTS",
      "GET_USER_CATEGORIES",
    ]),
    closeConfirmation() {
      this.isConfirmationVisible = !this.isConfirmationVisible;
    },
    closePopUp() {
      // this.SELECT_FIRST_RECEIPT()
      this.receiptViewKey += 1;
      this.activeReceiptID = this.activeReceipt;
    },
    clearFilters() {
      this.timePeriod = [];
      this.priceRange = [];
      this.$refs.price_range_filter.clearInput();
      this.$refs.category_filter.clearInput();
      this.categories_to_include = [];
    },

    set_categories_to_include(categories) {
      this.categories_to_include = categories;
    },

    filterByCategories(object, categories, mapped) {
      console.log(object);
      console.log(categories);
      return object.products.some((product) =>
        categories.includes(mapped[product.product_name])
      );
    },
  },

  created() {
    this.GET_ALL_USER_RECEIPTS(this.userId);
    this.GET_USER_CATEGORIES(this.userId);
  },

  computed: {
    userId() {
      return this.$store.state.state.user_id;
    },

    activeReceipt() {
      return this.$store.state.state.selected_receipt.receipt_id;
    },

    cssVars() {
      return {
        "--overflow-y": this.overflow,
      };
    },

    isReceipts() {
      return (
        typeof this.$store.state.state.selected_receipt.products !== "undefined"
      );
    },

    filtered_existing_receipts() {
      this.overflow = "scroll";

      let receipts = JSON.parse(
        JSON.stringify(this.$store.state.state.existing_receipts)
      );
      receipts.map(function (receipt) {
        receipt.createdAt = new Date(receipt.createdAt * 1000);
      });
      receipts.map(
        (receipt) =>
          (receipt.createdAt =
            ("0" + (receipt.createdAt.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + receipt.createdAt.getDate()).slice(-2) +
            "/" +
            receipt.createdAt.getFullYear())
      );

      receipts = receipts
        .sort(
          (a, b) =>
            Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
        )
        .reverse();

      if (
        typeof this.timePeriod[0] !== "undefined" &&
        this.timePeriod[0] !== null
      ) {
        // console.log(this.timePeriod[0])
        receipts = receipts.filter(
          (receipt) =>
            new Date(receipt.createdAt) >= this.timePeriod[0] &&
            new Date(receipt.createdAt) <= this.timePeriod[1]
        );
      }

      if (receipts.length === 0) {
        this.isThereAreReceipts = false;
        this.overflow = "hidden";
      }

      if (this.priceRange.length > 0) {
        receipts = receipts.filter(
          (receipt) =>
            this.priceRange[0] <= receipt.total_price &&
            receipt.total_price <= this.priceRange[1]
        );
      }

      // Categories
      if (this.categories_to_include.length > 0) {
        const category_products_mapped =
          this.$store.state.state.stacked_bar_data.category_map_products;
        console.log(category_products_mapped);
        receipts = receipts.filter((object) =>
          this.filterByCategories(
            object,
            this.categories_to_include,
            category_products_mapped
          )
        );
        console.log(receipts);
      }
      return receipts;
    },

    // receipts() {
    //   return this.filtered_existing_receipts;
    // },

    sorted_receipts_by_mmYYYY() {
      let month_year = [
        ...new Set(
          this.filtered_existing_receipts.map(
            (receipt) =>
              receipt.createdAt.substring(0, 3) + receipt.createdAt.substring(6)
          )
        ),
      ]
        .sort()
        .map((item) => ({ [item]: [] }));
      console.log(month_year);
      this.filtered_existing_receipts.map(function (receipt) {
        for (let i = 0; i < month_year.length; i++) {
          let key = Object.keys(month_year[i])[0];
          if (
            key ===
            receipt.createdAt.substring(0, 3) + receipt.createdAt.substring(6)
          ) {
            month_year[i][key].push(receipt);
          }
        }
      });

      let smt = {};

      for (let index in month_year) {
        const date = new Date(
          Object.keys(month_year[index])[0].substring(0, 3) +
            "01/20" +
            Object.keys(month_year[index])[0].substring(5)
        );
        // console.log(date)
        let result = date.toLocaleString("en-EG", { month: "short" });

        if (date.getFullYear() === new Date().getFullYear())
          smt[result] = month_year[index][Object.keys(month_year[index])[0]];
        else
          smt[result + ", " + date.getFullYear()] =
            month_year[index][Object.keys(month_year[index])[0]];
      }

      return smt;
    },

    date_format(raw_date) {
      const date = new Date(raw_date);
      let result = date.toLocaleString("en-EG", { month: "short" });
      if (date.getFullYear() === new Date().getFullYear()) return result;
      else return result + ", " + date.getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.AllReceipts {
  width: 100%;
  //padding: 16px
}

#title {
  font-size: 25px;
  font-weight: bold;
  flex: 1;
  justify-self: flex-start;
}

.navigation-bar {
  //display: flex;
  margin-bottom: 40px;
  //flex-wrap: wrap;
}

.time-period {
  //display: flex;
  align-items: center;
  //justify-content: space-between;
  flex: 3;
}

@media (max-width: $desktop-m) {
  .time-period {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //flex-wrap: wrap;
    flex: 1.2;
  }
}

@media (max-width: 900px) {
  .navigation-bar {
    //display: block;
  }
}

@media (max-width: $tab-size) {
  .navigation-bar {
    display: block;
    padding: 16px 16px 0;
  }
  .all-receipts-content {
    padding: 0 16px;
  }

  .time-period {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    //flex-wrap: wrap;
    flex: 3;

    a {
      margin-right: 30px;
    }
  }

  #title {
    font-size: 25px;
    font-weight: bold;
    flex: 1;
    justify-self: flex-start;
    margin-left: 5px;
  }
}

//@media (max-width: $phone-size){
//  .AllReceipts{
//    //padding: 16px;
//  }
//
//  .all-receipts-content > div {
//    justify-content: center;
//  }
//
//  .opacity{
//    position: absolute;
//    width: 100%;
//    height: 100vh;
//    background-color: #000000;
//    opacity: 0.5;
//    visibility: hidden;
//    padding: 0;
//    left:0;
//    right:0;
//    z-index: 1001;
//  }
//
//  #receipt-view-div{
//    position: fixed;
//    left: 500px;
//    visibility: hidden;
//    width: fit-content;
//    max-width: 300px;
//    //top: 50%
//  }
//}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: $grey-input-background;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: $blue;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: $blue;
}

.AllTime {
  display: flex;
}

.receipts {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 2;
  width: 100%;
}

#receipt-view-div {
  flex: 1;
}

.date_title {
  font-size: 20px;
  margin-bottom: 24px;
}

.line {
  width: 95%;
  height: 0;
  border: 1px solid $line;
  transform: rotate(0.13deg);
  flex: none;
  order: 0;
  z-index: -1;
  align-self: stretch;
  margin-top: 4px;
  margin-bottom: 24px;
}

#content {
  overflow-y: var(--overflow-y);
  max-height: 74vh;
  min-width: 360px;
  width: 100%;
}

#delete-confirmation-div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%; /* Need a specific value to work */
  height: 100%;
  //background-color: #edefff;
  //border: 3px solid white;
  display: flex;
  justify-content: center;
}

.delete-confirmation {
  z-index: 1004;
  margin-top: 10%;
}

.opacity {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.5;
  visibility: var(--visibility);
  padding: 0;
  left: 0;
  right: 0;
  z-index: 1003;
}

.date-time {
  min-width: 290px;
}

.mx-input.mx-input {
  background-color: #696ae9;
}

.filters {
  display: flex;
  margin-top: 20px;
  //justify-content: flex-end;
  //flex: 2;
}

.price-range-filter {
  margin: 0 16px;
}

.there-is-no-receipts {
  display: flex;
  justify-content: center;
  width: 100%;
  vertical-align: center;
  align-items: center;
}

.text {
  position: absolute;
  top: 30%;
  vertical-align: center;
  font-size: 20px;
  text-align: center;
}

.clear-filters {
  padding: 0 6px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  //margin-left: 20px;
  //left: 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border-radius: 4px;
}

.clear-filters:hover {
  box-shadow: 0px 0px 0px 1px $peach;
  //border: 1px solid $peach;
}

.clear-filters-text {
  align-items: center;
  color: $peach;
}

.clear-filters-ico {
  color: $peach;
}
</style>

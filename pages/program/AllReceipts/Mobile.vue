<template>
  <div class="AllReceipts">
    <transition name="fade">
      <div
        class="opacity"
        :style="cssVars"
        v-show="this.isVisible === 'visible'"
        v-on:click="activeReceiptID = ''"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="isConfirmationVisible"
        style="z-index: 4"
        class="opacity confirmation-opacity"
        @click="closeConfirmation"
      ></div>
    </transition>
    <div class="navigation-bar">
      <div id="title">All Receipts</div>
      <div class="filters">
        <!--        <div>* Filters in future *</div>-->
        <div class="first-row">
          <client-only>
            <category-filter
              ref="category_filter"
              id="mobile-category-filter"
            />
          </client-only>
          <price-range-filter
            ref="price_filter"
            id="mobile-price-range-filter"
            v-model="priceRange"
          />
          <!--          <price-range-filter id="mobile-categories-filter"/>-->
        </div>
        <div class="second-row">
          <date-picker
            id="mobile-date-picker"
            v-model="timePeriod"
            range
            format="MMM DD, YYYY"
            :placeholder="'Choose a date'"
          />
          <cross-button @click.native="clearFilters()" />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="AllTime">
        <div id="content">
          <div
            id="month"
            v-for="(item, key, i) in sorted_receipts_by_mmYYYY"
            :key="i"
          >
            <div class="date_title">{{ key }}</div>
            <div class="receipts">
              <ExistingReceiptItem
                class="mobile-receipt"
                v-for="(receipt, index) in item"
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

    <div id="pop-up" :style="cssVars">
      <pop-up v-model="isConfirmationVisible" />
    </div>
    <!--    <div>{{this.filtered_receipts}}</div>-->

    <!--    <div v-if="this.$store.state.state.isReceiptDeleteConfirmation" id="delete-confirmation">-->
    <transition name="normal">
      <div v-if="isConfirmationVisible" id="delete-confirmation-div">
        <DeleteConfirmation v-model="isConfirmationVisible">
          Do you really want to delete this receipt?
        </DeleteConfirmation>
      </div>
    </transition>

    <!--    <div class="test" :style="cssVars">qweqwe</div>-->
  </div>
</template>

<script>
import TimePeriodItem from "@/components/AllReceipts/TimePeriodItem";
import { mapActions } from "vuex";
import ExistingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";
import ReceiptView from "@/components/AllReceipts/ReceiptView";
import PopUp from "@/components/AllReceipts/PopUp";
import DeleteConfirmation from "@/components/UI/DeleteConfirmation";
import priceRangeFilter from "@/components/AllReceipts/PriceFilter/PriceRangeFilter";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import crossButton from "@/components/UI/CrossButton";
import CategoryFilter from "@/components/AllReceipts/CategoryFilter/CategoryFilter";

export default {
  components: {
    CategoryFilter,
    crossButton,
    PopUp,
    ExistingReceiptItem,
    ReceiptView,
    TimePeriodItem,
    DeleteConfirmation,
    priceRangeFilter,
    DatePicker,
  },
  layout: "allReceiptsPage",
  data() {
    return {
      activeReceiptID: "",
      isConfirmationVisible: false,
      timePeriod: [],
      priceRange: [],
      categories_to_include: [],
    };
  },
  methods: {
    ...mapActions([
      "SET_EXISTING_RECEIPTS_ACTION",
      "GET_ALL_USER_RECEIPTS",
      "GET_USER_CATEGORIES",
    ]),
    closeConfirmation() {
      this.isConfirmationVisible = !this.isConfirmationVisible;
    },
    closePopUp() {
      this.activeReceiptID = "";
    },

    clearFilters() {
      // console.log(this.$children[0])
      this.timePeriod = [];
      this.priceRange = [];
      this.$refs.price_filter.clearInput();
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
    this.GET_ALL_USER_RECEIPTS(this.$store.state.state.user_id);
    this.GET_USER_CATEGORIES(this.$store.state.state.user_id);
  },

  computed: {
    filtered_existing_receipts() {
      let receipts = JSON.parse(
        JSON.stringify(this.$store.state.state.existing_receipts)
      );
      console.log(receipts);
      receipts.map(
        (receipt) =>
          (receipt.createdAt = new Date(parseInt(receipt.createdAt + "000")))
      );
      receipts.map(
        (receipt) =>
          (receipt.createdAt =
            ("0" + (receipt.createdAt.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + receipt.createdAt.getDate()).slice(-2) +
            "/" +
            receipt.createdAt.getFullYear())
      );
      // receipts.map(receipt => receipt.createdAt = ('0' + receipt.createdAt.getMonth()).slice(-2) + '/' + ( '0' + receipt.createdAt.getDate()).slice(-2) + '/' + receipt.createdAt.getFullYear())

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

    receipts() {
      return this.filtered_existing_receipts;
    },

    sorted_receipts_by_mmYYYY() {
      console.log(this.filtered_existing_receipts);
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
      // .sort().reverse().map((item) => ({ [item]: [] }))

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
      // return 1
    },

    date_format(raw_date) {
      const date = new Date(raw_date);
      let result = date.toLocaleString("en-EG", { month: "short" });
      if (date.getFullYear() === new Date().getFullYear()) return result;
      else return result + ", " + date.getFullYear();
    },

    translate_height() {
      // console.log(height)
      if (
        typeof this.$store.state.state.selected_receipt.products !== "undefined"
      ) {
        if (this.activeReceiptID === "")
          return (
            204 + this.$store.state.state.selected_receipt.products.length * 40
          );
        else return "0";
      } else return "0";
    },

    isVisible() {
      if (this.activeReceiptID === "") return "hidden";
      else return "visible";
    },

    cssVars() {
      return {
        // '--bg-color': this.bgColor,
        "--height": this.translate_height + "px",
        "--visibility": this.isVisible,
        "--delete-confirmation-visibility": this.isConfirmationVisible,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.opacity {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.5;
  //visibility: var(--visibility);
  padding: 0;
  left: 0;
  right: 0;
  z-index: 3;
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-active.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.normal-enter-active.normal-enter-active,
.normal-leave-active {
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}

.normal-enter.normal-enter,
.normal-leave-to {
  opacity: 0;
  position: absolute;
}

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
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
  padding: 16px 16px 0;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.9;
}

.content {
  padding: 0 16px;
}

@media (max-width: $desktop-m) {
  .filters {
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
  }

  .filters {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    //flex-wrap: wrap;
    flex: 1;

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

@media (max-width: $phone-size) {
  .AllReceipts {
    //padding: 16px;
  }

  .content > div {
    justify-content: center;
  }

  //.opacity{
  //  position: absolute;
  //  width: 100%;
  //  height: 100vh;
  //  background-color: #000000;
  //  //opacity: ;
  //  //visibility: var(--visibility);
  //  padding: 0;
  //  left:0;
  //  right:0;
  //  z-index: 3;
  //  //transition: opacity 0.3s ease-in-out;
  //}
}

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
  /*flex-wrap: wrap;*/
}

.receipts {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 2;
  width: 100%;
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
  overflow-y: scroll;
  max-height: 74vh;
}

@media (max-width: 380px) {
  #content {
    padding: 0 16px;
    max-height: 67vh;
  }
  .mobile-receipt {
    min-width: 270px;
  }
}

#pop-up {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  visibility: var(--visibility);
  transform: translateY(var(--height));
  transition: all ease-in-out 0.3s;
  z-index: 3;
}
//
//.test{
//  height: var(--height);
//}

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
  z-index: 5;
  margin-top: 50%;
}

.filters {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.first-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  //justify-content: flex-end;
}

.second-row {
  margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#mobile-price-range-filter,
#mobile-categories-filter {
  width: 48%;
}

#mobile-date-picker {
  width: 88%;
}

.category-filter {
  width: 49%;
  z-index: 2;
}
</style>

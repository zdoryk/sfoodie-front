<template>
  <div class="price-range-filter">
    <div
      class="price-range-input-wrapper"
      @click="isPopUpVisible ? notToClose() : closeOpen()"
    >
      <input
        id="price-range-input"
        placeholder="Price range"
        v-model="inputValue"
        autocomplete="off"
      />
      <div class="apple-ico">
        <coin-icon class="ico filter-ico" />
      </div>
    </div>
    <price-range-filter-pop-up
      id="pop-up"
      :style="cssVars"
      v-bind:visible="isPopUpVisible"
      v-model:filterInput="inputValue"
    />
  </div>
</template>

<script>
import { CoinIcon } from "vue-tabler-icons";
import PriceRangeFilterPopUp from "@/components/AllReceipts/PriceFilter/PriceRangeFilterPopUp";

export default {
  name: "PriceRangeFilter",
  components: {
    CoinIcon,
    PriceRangeFilterPopUp,
  },
  props: {
    priceRange: {
      type: [],
      default: [],
    },
  },
  model: {
    prop: "priceRange",
    event: "updatePriceRange",
  },
  data() {
    return {
      isPopUpVisible: false,
      height: 0,
      margin: "0 16px",
      inputValue: "",
    };
  },
  methods: {
    test() {
      console.log(this.$children);
    },

    closeOpen() {
      console.log("Closed )");
      this.height = 0;
      this.padding = "16px";
      this.isPopUpVisible = !this.isPopUpVisible;
      // for (let i = 0; i < 50; i++) {
      //   this.height = this.height + 2
      //   this.sleep(200)
      // }
      this.height = 130;
    },
    notToClose() {
      console.log("Not closed )");
    },

    hide() {
      if (this.isPopUpVisible === true) {
        this.padding = "0 16px";
        this.height = 0;
        this.isPopUpVisible = !this.isPopUpVisible;
      }
    },

    clear_price_range() {
      this.$parent.clear_price_range();
      this.clearInput();
      this.hide();
    },

    updateParentPriceRange() {
      let newPriceRange = this.inputValue
        .split("~")
        .map((item) => item.trim().substring(1, item.length));
      // newPriceRange = newPriceRange.map(item => item.substring(1, item.length))

      this.$emit("updatePriceRange", newPriceRange);
    },

    clearInput() {
      this.inputValue = "";
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  computed: {
    cssVars() {
      return {
        // '--bg-color': this.bgColor,
        "--height": this.height + "px",
        "--padding": this.padding,
        // '--visibility': this.isVisible,
        // '--delete-confirmation-visibility': this.isConfirmationVisible
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.price-range-input-wrapper {
  position: relative;
}

.price-range-filter {
  position: relative;
  min-width: 160px;
}
.price-range-filter {
  //display:none
}
.price-range-filter:hover {
  display: block;
}
.price-range-filter:hover {
  //display:none
}

.ico {
  color: $blue;
}

.apple-ico {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  right: 8px;
  --webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  vertical-align: middle;
}

#price-range-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 16px;
  line-height: 1.4;
  color: #edefff;
  background-color: #282932;
  border: 1px solid rgba(105, 106, 233, 0.2);
  border-radius: 4px;
  font-family: Poppins, sans-serif;
  caret-color: transparent;
  cursor: pointer;
  //opacity: 0.2;
}

#price-range-input:hover {
  border: 1px solid $blue;
}

#price-range-input:focus {
  outline: none;
  border: 1px solid $blue;
}

#price-range-input:focus::-webkit-input-placeholder {
  color: #edefff;
}

#pop-up {
  height: var(--height);
  padding: var(--padding);
  transition-property: height, padding;
  transition-duration: 0.15s;
  z-index: 1001;
  //transition: 0.2s ease-in-out;
}

@media (max-width: $phone-size) {
  #pop-up {
    right: 0;
  }
}
</style>

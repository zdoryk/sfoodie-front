<template>
  <div class="price-range-filter-pop-up" v-click-outside="hide">
    <div class="content" v-if="visible">
      <div class="inputs">
        <input
          :style="cssVars"
          v-model="inputFrom"
          class="from"
          :placeholder="'0' + currencySymbol"
          @keyup.enter="apply"
          type="number"
        />
        <input
          :style="cssVars"
          v-model="inputTo"
          class="to"
          :placeholder="'100' + currencySymbol"
          @keyup.enter="apply"
          type="number"
        />
      </div>
      <div class="buttons">
        <red-stroke-button class="clear-button" v-on:click.native="clear_inputs"
          >Clear</red-stroke-button
        >
        <blue-button class="apply-button" v-on:click.native="apply"
          >Apply</blue-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import BlueButton from "@/components/UI/BlueButton";
import { mapGetters } from "vuex";

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (
        !(
          el === event.target ||
          el.contains(event.target) ||
          el.parentElement.contains(event.target)
        )
      ) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {
  name: "PriceRangeFilterPopUp",
  components: { BlueButton, RedStrokeButton },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: String,
      default: "",
    },
  },
  model: {
    prop: "inputValue",
    event: "onUpdateInputValue",
  },
  methods: {
    hide() {
      this.$parent.hide();
    },

    clear_inputs() {
      this.inputFrom = "";
      this.inputTo = "";
    },

    apply() {
      console.log(typeof this.inputTo);
      if (this.inputFrom === "" && this.inputTo === "")
        this.$parent.clear_price_range();
      else if (!this.inputTo && this.inputFrom) {
        this.$emit(
          "onUpdateInputValue",
          this.currencySymbol +
            this.inputFrom +
            " ~ " +
            this.currencySymbol +
            "999999"
        );
        this.$parent.hide();
        this.$parent.updateParentPriceRange();
      } else if (!this.inputFrom && this.inputTo) {
        this.$emit(
          "onUpdateInputValue",
          this.currencySymbol + "0" + " ~ " + this.currencySymbol + this.inputTo
        );
        this.$parent.hide();
        this.$parent.updateParentPriceRange();
      } else {
        if (parseFloat(this.inputFrom) <= parseFloat(this.inputTo)) {
          this.$emit(
            "onUpdateInputValue",
            this.currencySymbol +
              this.inputFrom +
              " ~ " +
              this.currencySymbol +
              this.inputTo
          );
          this.$parent.hide();
          this.$parent.updateParentPriceRange();
        } else alert("Value to in price filter lower then value from.");
      }
    },
  },
  data() {
    return {
      inputFrom: "",
      inputTo: "",
      inputFromBorder: "none",
      inputToBorder: "none",
    };
  },
  computed: {
    ...mapGetters(["currencySymbol"]),

    borderFromListener() {
      if (this.inputFrom !== "") return "1px solid rgba(105, 106, 233, 0.2)";
      else return "none";
    },

    borderToListener() {
      if (this.inputTo !== "") return "1px solid rgba(105, 106, 233, 0.2)";
      else return "none";
    },

    cssVars() {
      return {
        "--borderFrom": this.borderFromListener,
        "--borderTo": this.borderToListener,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.price-range-filter-pop-up {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 24px 24px;
  //gap: 16px;
  right: -15%;
  position: absolute;
  width: 320px;
  height: 136px;

  background: #23242d;
  //box-shadow: 0px -4px 40px #1B1C22;
  border-radius: 8px;
}

.content {
  width: 100%;
}

.inputs {
  width: 100%;
  display: flex;
  //justify-content: space-between;
}

.from.from {
  margin-right: 6%;
  border: var(--borderFrom);
}

.to.to {
  border: var(--borderTo);
}

.from,
.to {
  width: 47%;
  background-color: $grey-input-background;
  border: none;
  border-radius: 4px;
  height: 40px;
  padding-left: 16px;
  color: $white;
  font-family: Poppins, sans-serif;
}

//input:focus{
//  border: 1px solid #696AE9;
//}

input:focus-visible {
  //border: 1px solid $blue;
  outline: 1px solid $blue;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.buttons {
  display: flex;
  //height: 24px;
  margin-top: 20px;
  justify-content: flex-end;
  gap: 8px;
}

.clear-button {
  text-align: center;
}

.apply-button {
  font-size: 16px;
  padding: 12px;
}

.clear-button,
.apply-button {
  max-height: 32px;
}
</style>

<template>
  <div class="first-row">
    <h1>New Receipt</h1>
    <div class="inputs-container">
      <input
        placeholder="Product name"
        class="form-control custom-input"
        id="product-input"
        list="my-list-id"
        ref="productInput"
        v-model="new_product.product_name"
        v-on:input="product_name_constraint"
        v-on:keydown="product_prevent_input"
      />
      <datalist id="my-list-id" class="list-of-products">
        <option
          v-for="(product, index) in products"
          :key="product + index"
          class="list-of-products"
        >
          {{ product }}
        </option>
      </datalist>
      <input
        placeholder="Price"
        type="number"
        class="form-control custom-input"
        id="price-input"
        v-model="new_product.price"
        ref="priceInput"
        v-on:input="price_constraint"
        v-on:keydown="price_prevent_input"
        @keydown.enter="add_new_product"
      />
      <!--        v-on:keyup="handleArrow"-->
      <blue-button
        id="add-button"
        v-on:click.native="add_new_product"
        :disabled="disabled"
        :style="disabled_style"
      >
        <div>Add</div>
      </blue-button>
    </div>
    <div class="there-is-no-products" v-show="user_added_products.length === 0">
      <div class="first">
        <img :src="fruits" />
      </div>
      <div class="second">
        <img :src="dairy" />
        <img :src="drinks" />
      </div>
      <div class="third">
        <div class="text">Add your products!</div>
      </div>
      <div class="fourth">
        <img :src="vegetables" />
        <img :src="meat" />
      </div>
      <div class="fifth">
        <img :src="snacks" />
      </div>
    </div>
    <transition name="fade">
      <div class="content" v-if="user_added_products.length !== 0">
        <div class="products">
          <transition-group name="fade" mode="out-in">
            <new-product
              v-for="(product, key, index) in user_added_products"
              v-bind:product_data="product"
              :index="key"
              :key="product.product_name + key"
            />
          </transition-group>
        </div>
        <div id="line"></div>
        <div class="total">
          <div class="total-amount">
            Total
            {{ this.$store.state.state.new_receipt_products.length }} products
          </div>
          <!--            <div class="total-price">${{this.total_price.toFixed(2)}}</div>-->
          <p class="total-price">
            {{ currencySymbol }}{{ tweened.toFixed(2) }}
          </p>
          <!--            <cross-button id="blank"/>-->
        </div>
        <div id="delete-save-buttons">
          <red-stroke-button
            @click.native="delete_all_from_receipt"
            class="buttons"
            >Delete all</red-stroke-button
          >
          <blue-button @click.native="saveReceipt" class="buttons"
            >Save Receipt</blue-button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import NewProduct from "@/components/AddNewReceipt/NewProduct";
import { mapActions, mapGetters, mapMutations } from "vuex";
import CrossButton from "@/components/UI/CrossButton";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import gsap from "gsap";
// import dairy from '@/assets/svgs_desktop/dairy.svg';

export default {
  components: { RedStrokeButton, CrossButton, BlueButton, NewProduct },
  watch: {
    total_price(newValue) {
      gsap.to(this, { duration: 0.5, tweened: Number(newValue) || 0 });
    },
  },
  data() {
    return {
      tweened: 0,
      new_product: {
        product_name: "",
        // product_name: 'Meal',
        // price: 123.45
        price: "",
      },
      dairy: require("assets/svgs_desktop/dairy.svg"),
      drinks: require("assets/svgs_desktop/drinks.svg"),
      fruits: require("assets/svgs_desktop/fruits.svg"),
      meat: require("assets/svgs_desktop/meat.svg"),
      snacks: require("assets/svgs_desktop/snacks.svg"),
      vegetables: require("assets/svgs_desktop/vegetables.svg"),
    };
  },
  created() {
    this.GET_ALL_USER_RECEIPTS(this.$store.state.state.user_id);
  },
  mounted() {
    let products = document.querySelector(".products");
    if (products) {
      if (this.isOverflown(products)) {
        products.style.paddingRight = "10px";
      } else products.style.paddingRight = "0";
    }
  },
  updated() {
    let products = document.querySelector(".products");
    if (products) {
      if (this.isOverflown(products)) {
        products.style.paddingRight = "10px";
      } else products.style.paddingRight = "0";
    }
  },
  computed: {
    ...mapGetters(["currencySymbol"]),
    products() {
      return this.$store.state.state.products;
    },
    user_added_products() {
      return this.$store.state.state.new_receipt_products;
    },
    total_price() {
      let before_sum = JSON.parse(
        JSON.stringify(this.$store.state.state.new_receipt_products)
      ).map((item) => item.price);
      return before_sum.reduce((partialSum, a) => partialSum + a, 0);
    },

    disabled() {
      return (
        this.new_product.price.length === 0 ||
        this.new_product.product_name.length === 0
      );
    },
    disabled_style() {
      if (
        this.new_product.price.length === 0 ||
        this.new_product.product_name.length === 0
      ) {
        return {
          "--content": "Please enter category name",
          "--border-color": "#FF5252",
          "--back-color": "#696AE9",
          "--cursor": "default",
          "--opacity": "0.5",
        };
      } else {
        return {
          // "--content": "Please enter category name",
          "--border-color": "#282932",
          "--back-color": "#5D5FEF",
          "--box-shadow": "0 0 20px rgba(105, 106, 233, 0.2)",
          "--cursor": "pointer",
          "--opacity": "1",
        };
      }
    },
  },

  methods: {
    ...mapActions([
      "ADD_PRODUCT_TO_RECEIPT_PRODUCTS",
      "POST_NEW_RECEIPT",
      "GET_ALL_USER_RECEIPTS",
    ]),
    ...mapMutations(["DELETE_ALL_FROM_RECEIPT"]),

    product_name_constraint(event) {
      if (event.target.value.length > 25) {
        this.new_product.product_name = this.new_product.product_name.slice(
          0,
          25
        );
      }
    },
    product_prevent_input(event) {
      if (event.key === "ArrowRight") {
        if (event.target.selectionStart === event.target.value.length) {
          this.$refs.priceInput.focus();
        }
      }
      if (event.key === "Enter") {
        this.$refs.priceInput.focus();
      }
      if (
        event instanceof KeyboardEvent &&
        event.key.match(/[!№@#\$%^&*()`~+=\[\]{};':"\\|,.<>\/?]/g)
      ) {
        event.preventDefault();
      }
    },

    // handleArrow(event){
    //   if (event.key === 'ArrowLeft') {
    //     console.log('we')
    //     console.log(event.target.selectionStart)
    //     if (event.target.selectionStart === 0) {
    //       this.$refs.productInput.focus()
    //     }
    //   }
    // },

    price_prevent_input(event) {
      if (event.key === "-") {
        event.preventDefault();
      }
    },
    price_constraint(event) {
      this.new_product.price = event.target.value.slice(0, 8);
      if (
        event.target.value.length > 3 &&
        event.target.value.split(".")[1] !== undefined &&
        event.target.value.split(".")[1].length >= 2
      ) {
        this.new_product.price = parseFloat(this.new_product.price).toFixed(2);
      }
    },

    isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    },
    add_new_product() {
      // We're checking if there is product with same product_name in state.receipt_products
      // if (!JSON.parse(JSON.stringify(this.$store.state.state.new_receipt_products))
      //     .map(item => item.product_name).includes(this.new_product.product_name)){
      const product = {
        product_name:
          this.new_product.product_name.at(0).toUpperCase() +
          this.new_product.product_name.substring(1),
        price: parseFloat(this.new_product.price),
      };
      console.log(JSON.parse(JSON.stringify(this.new_product)));
      this.ADD_PRODUCT_TO_RECEIPT_PRODUCTS(JSON.parse(JSON.stringify(product)));
      this.new_product = { product_name: "", price: "" };
      this.$refs.productInput.focus();

      // else alert(`The receipt already contains a product with the name: "${this.new_product.product_name}"`);
    },
    delete_all_from_receipt() {
      this.DELETE_ALL_FROM_RECEIPT();
    },
    saveReceipt() {
      console.log(this.$store.state.state.new_receipt_products);
      let distinctProducts = Array.from(
        this.$store.state.state.new_receipt_products
      )
        .map((product) => ({
          product_name: product.product_name,
          price: product.price.toFixed(2),
        }))
        .reduce((acc, curr) => {
          if (acc[curr.product_name]) {
            acc[curr.product_name] += Number(curr.price);
          } else {
            acc[curr.product_name] = Number(curr.price);
          }
          return acc;
        }, {});
      let distinctProductsArray = Object.entries(distinctProducts).map(
        ([product_name, price]) => ({ product_name, price })
      );
      console.log(distinctProducts);
      let new_receipt = {
        user_id: this.$store.state.state.user_id,
        receipt_id: 0,
        createdAt: Math.floor(Date.now() / 1000),
        products: distinctProductsArray,
        total_price: parseFloat(this.total_price.toFixed(2)),
      };
      this.POST_NEW_RECEIPT(new_receipt);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/variables";

.fade-enter-active.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.products {
  max-height: 40vh;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  @if overflow-y == "scroll" {
    margin-top: 32px;
  }
}

.first-row {
  margin-top: 18px;
}

.first-row,
.content,
.there-is-no-products {
  max-width: 560px;
}

.content {
  margin-top: 16px;
  padding: 40px;
  background-color: $grey-background;
  //box-shadow: 0px -4px 40px $black-shadow;
  border-radius: 8px;
}

.there-is-no-products {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 40px;
  border-radius: 8px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.first,
.fifth {
  display: flex;
  justify-content: center;
}

.third {
  justify-content: center;
  margin: 25px 0;
}

.text {
  display: flex;
  justify-content: center;
  font-size: 24px;
}

.second,
.fourth {
  display: flex;
  justify-content: space-between;
}

.second {
  margin-top: 10px;
}

.fourth {
  margin-bottom: 10px;
}

h1 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 24px;
}

.inputs-container {
  display: flex;
}

#product-input,
#price-input {
  margin-right: 20px;
}

#product-input {
  //flex: 3;
  width: 70%;
}

#price-input {
  width: 30%;
  //flex: 1;
}

#add-button {
  width: 80px;
  text-align: center;
  padding: 8px 0;
  opacity: var(--opacity);
  cursor: var(--cursor);
  transition: opacity 0.5s;
}

#add-button:hover {
  box-shadow: var(--box-shadow);
  background-color: var(--back-color);
}

.custom-input {
  background: $grey-input-background;
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  color: $white;
}

input::-webkit-calendar-picker-indicator {
  display: none;
  opacity: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

#line {
  width: 100%;
  height: 0;
  border: 1px solid $line;
  transform: rotate(0.13deg);
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  margin-bottom: 16px;
  z-index: 10;
}

.total,
.total-price {
  display: flex;
}

.total {
  justify-content: space-between;
}

.total-amount {
  //flex: 4;
}

.total-price {
  //flex: 1;
  justify-content: flex-end;
}

#delete-save-buttons {
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
}

.buttons {
  width: 160px;
}

.bttn {
  padding: 0;
}

@media (max-width: $phone-size) {
  .first-row {
    margin-top: 20px;
  }

  #product-input {
    max-width: 200px;
  }

  #price-input {
    max-width: 80px;
  }

  #add-button {
    max-width: 40px;
    max-height: 40px;
  }

  #product-input,
  #price-input {
    margin-right: 8px;
  }

  .content {
    max-width: 338px;
    padding: 16px;
  }

  .buttons {
    max-width: 143.5px;
  }

  .NewProduct {
    margin-bottom: 20px;
  }

  .there-is-no-products {
    margin-top: 40px;
    padding: 0;
  }

  .text {
    font-size: 24px;
  }

  .second {
    margin-top: 0;
  }

  .fourth {
    margin-bottom: 0;
  }

  .third {
    margin: 15px 0;
  }
}
</style>

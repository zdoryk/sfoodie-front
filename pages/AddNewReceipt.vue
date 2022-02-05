<template>
    <div class="first-row">
      <h1>New Receipt</h1>
      <div class="inputs-container">
        <input
          placeholder="Product name"
          class="form-control custom-input"
          id="product-input"
          list="my-list-id"
          v-model="new_product.product_name"
        />
        <datalist id="my-list-id" class="list-of-products">
          <option v-for="product in products" :key="product" class="list-of-products">
            {{ product }}
          </option>
        </datalist>
        <input
          placeholder="Price"
          type="number"
          class="form-control custom-input"
          id="price-input"
          v-model="new_product.price"
        />
        <blue-button
          id="add-button"
          v-on:click.native="add_new_product"
        >
          Add
        </blue-button>
      </div>
      <div class="products-container">
        <new-product
          v-for="product in user_added_products"
          :key="product.product_id"
           v-bind:product_data="product"
          />
      </div>
    </div>
</template>

<script>

import BlueButton from "@/components/UI/BlueButton";
import NewProduct from "@/components/NewProduct"
import md5 from "md5"
import {mapActions} from "vuex"
import _ from "lodash"

export default {
  components: {BlueButton, NewProduct},
  data() {
    return {
      new_product: {
        product_name: 'Meal',
        price: 123.45,
        product_id: ''
      },
      isExist: false  // We check if there is product with same product_id in state.receipt_products
    }
  },
  computed: {
    products(){
      return this.$store.state.state.products
    },
    user_added_products(){
      return this.$store.state.state.receipt_products
    }
  },

  methods: {
    ...mapActions([
      'ADD_PRODUCT_TO_RECEIPT_PRODUCTS',
    ]),
    add_new_product() {
      this.new_product['product_id'] = md5(this.new_product.product_name.toLowerCase())
      if (!JSON.parse(JSON.stringify(this.$store.state.state.receipt_products))
          .map(item => item.product_id).includes(this.new_product.product_id)){
        this.ADD_PRODUCT_TO_RECEIPT_PRODUCTS(JSON.parse(JSON.stringify(this.new_product)))
      }
      else alert(`The receipt already contains a product with the name: "${this.new_product.product_name}"`);
    }
  }
}
</script>

<style scoped lang="scss">


.first-row, .products-container {
  max-width: 560px;
}

.products-container {
  margin-top: 16px;
  padding: 40px;
  background: #23242D;
  box-shadow: 0px -4px 40px #1B1C22;
  border-radius: 8px;
}


h1 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom:24px;
}

.inputs-container {
  display: flex;
}

#product-input,
#price-input {
  margin-right: 20px;
}

#product-input {
  flex: 3;
}

#price-input {
  flex: 1;
}

#add-button {
  width: 80px;
  text-align: center;
  padding: 8px 0;
}

.custom-input {
  background: #282932;
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  color: #edefff;
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

input[type=number] {
  -moz-appearance: textfield;
}


</style>

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
        <div id="line"></div>
        <div class="total">
          <div class="total-amount">Total {{this.$store.state.state.receipt_products.length}} products</div>
          <div class="total-price">${{this.total_price.toFixed(2)}}</div>
          <cross-button id="blank"/>
        </div>
        <div id="delete-save-buttons">
          <red-button @click.native="delete_all_from_receipt" class="buttons">Delete all</red-button>
          <blue-button class="buttons">Save Receipt</blue-button>
        </div>
      </div>
    </div>
</template>

<script>

import BlueButton from "@/components/UI/BlueButton";
import NewProduct from "@/components/AddNewReceipt/NewProduct"
import md5 from "md5"
import {mapActions, mapMutations} from "vuex"
import _ from "lodash"
import RedButton from "@/components/UI/RedButton";
import CrossButton from "@/components/UI/CrossButton";

export default {
  components: {CrossButton, RedButton, BlueButton, NewProduct},
  data() {
    return {
      new_product: {
        product_name: 'Meal',
        price: 123.45,
        product_id: ''
      },
    }
  },
  computed: {
    products(){
      return this.$store.state.state.products
    },
    user_added_products(){
      return this.$store.state.state.receipt_products
    },
    total_price(){
      let before_sum = JSON.parse(JSON.stringify(this.$store.state.state.receipt_products)).map(item => item.price)
      return before_sum.reduce((partialSum, a) => partialSum + a, 0);
    }
  },

  methods: {
    ...mapActions([
      'ADD_PRODUCT_TO_RECEIPT_PRODUCTS',
    ]),
    ...mapMutations([
      'DELETE_ALL_FROM_RECEIPT'
    ]),
    add_new_product() {
      this.new_product['product_id'] = md5(this.new_product.product_name.toLowerCase())
      // We're checking if there is product with same product_id in state.receipt_products
      if (!JSON.parse(JSON.stringify(this.$store.state.state.receipt_products))
          .map(item => item.product_id).includes(this.new_product.product_id)){
        this.ADD_PRODUCT_TO_RECEIPT_PRODUCTS(JSON.parse(JSON.stringify(this.new_product)))
      }
      else alert(`The receipt already contains a product with the name: "${this.new_product.product_name}"`);
    },
    delete_all_from_receipt() {
      this.DELETE_ALL_FROM_RECEIPT()
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


#line {
  width: 100%;
  height: 0;
  border: 1px solid #3A3C4C;
  transform: rotate(0.13deg);
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  margin-bottom: 16px;
}

.total, .total-price {
  display: flex;
}

.total-amount{
  flex: 4;
}

.total-price{
  flex: 1;
  justify-content: flex-end;
  margin-right: 32px;
}

#blank {
  opacity: 0;
  cursor: default
}

#delete-save-buttons {
  margin-top: 28px;
  display: flex;
  justify-content: space-around;
}

.buttons{
  width: 160px;
}

</style>

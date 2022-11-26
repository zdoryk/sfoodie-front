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
          <div>Add</div>
        </blue-button>
      </div>
      <div class="there-is-no-products" v-show="user_added_products.length === 0">
        <div class="first">
          <img :src="fruits"/>
        </div>
        <div class="second">
          <img :src="dairy"/>
          <img :src="drinks"/>
        </div>
        <div class="third">
          <div class="text">Add your products!</div>
        </div>
        <div class="fourth">
          <img :src="vegetables"/>
          <img :src="meat"/>
        </div>
        <div class="fifth">
          <img :src="snacks"/>
        </div>
      </div>
      <div class="products-container" v-if="user_added_products.length !== 0">
        <new-product
          v-for="(product, key, index) in user_added_products"
          v-bind:product_data="product"
          :key="product.product_name"
        />
        <div id="line"></div>
        <div class="total">
          <div class="total-amount">Total {{this.$store.state.state.new_receipt_products.length}} products</div>
          <div class="total-price">${{this.total_price.toFixed(2)}}</div>
          <cross-button id="blank"/>
        </div>
        <div id="delete-save-buttons">
          <red-stroke-button @click.native="delete_all_from_receipt" class="buttons">Delete all</red-stroke-button>
          <blue-button @click.native="saveReceipt" class="buttons">Save Receipt</blue-button>
        </div>
      </div>
    </div>
</template>

<script>

import BlueButton from "@/components/UI/BlueButton";
import NewProduct from "@/components/AddNewReceipt/NewProduct"
import {mapActions, mapMutations} from "vuex"
import CrossButton from "@/components/UI/CrossButton";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
// import dairy from '@/assets/svgs_desktop/dairy.svg';

export default {
  components: {RedStrokeButton, CrossButton, BlueButton, NewProduct},
  data() {
    return {
      new_product: {
        product_name: 'Meal',
        price: 123.45
      },
      dairy: require('@/assets/svgs_desktop/dairy.svg'),
      drinks: require('@/assets/svgs_desktop/drinks.svg'),
      fruits: require('assets/svgs_desktop/fruits.svg'),
      meat: require('@/assets/svgs_desktop/meat.svg'),
      snacks: require('@/assets/svgs_desktop/snacks.svg'),
      vegetables: require('assets/svgs_desktop/vegetables.svg')
    }
  },
  computed: {
    products(){
      return this.$store.state.state.products
    },
    user_added_products(){
      return this.$store.state.state.new_receipt_products
    },
    total_price(){
      let before_sum = JSON.parse(JSON.stringify(this.$store.state.state.new_receipt_products)).map(item => item.price)
      return before_sum.reduce((partialSum, a) => partialSum + a, 0);
    }
  },

  methods: {
    ...mapActions([
      'ADD_PRODUCT_TO_RECEIPT_PRODUCTS', 'POST_NEW_RECEIPT'
    ]),
    ...mapMutations([
      'DELETE_ALL_FROM_RECEIPT'
    ]),
    add_new_product() {
      // We're checking if there is product with same product_name in state.receipt_products
      if (!JSON.parse(JSON.stringify(this.$store.state.state.new_receipt_products))
          .map(item => item.product_name).includes(this.new_product.product_name)){
        const product = {
          product_name: this.new_product.product_name,
          price: parseFloat(this.new_product.price)
        }
        console.log(JSON.parse(JSON.stringify(this.new_product)))
        this.ADD_PRODUCT_TO_RECEIPT_PRODUCTS(JSON.parse(JSON.stringify(product)))
      }
      else alert(`The receipt already contains a product with the name: "${this.new_product.product_name}"`);
    },
    delete_all_from_receipt() {
      this.DELETE_ALL_FROM_RECEIPT()
    },
    saveReceipt(){
      let new_receipt = {
        user_id: this.$store.state.state.user_id,
        createdAt: Math.floor(Date.now() / 1000),
        products: this.$store.state.state.new_receipt_products,
        total_price: parseFloat(this.total_price).toFixed(2)
      }
      this.POST_NEW_RECEIPT(new_receipt)
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

.first-row{
  margin-top: 18px;
}

.first-row, .products-container, .there-is-no-products{
  max-width: 560px;
}

.products-container{
  margin-top: 16px;
  padding: 40px;
  background-color: $grey-background;
  //box-shadow: 0px -4px 40px $black-shadow;
  border-radius: 8px;
}

.there-is-no-products{
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 40px;
  border-radius: 8px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.first, .fifth{
  display: flex;
  justify-content: center;
}

.third{
  justify-content: center;
  margin: 25px 0;
}

.text{
  display: flex;
  justify-content: center;
  font-size: 24px;
}

.second,.fourth{
  display: flex;
  justify-content: space-between;
}

.second{
  margin-top: 10px;
}

.fourth{
  margin-bottom: 10px;
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
  //flex: 3;
  width: 70%
}

#price-input {
  width: 30%
  //flex: 1;
}

#add-button {
  width: 80px;
  text-align: center;
  padding: 8px 0;
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

input[type=number] {
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

#delete-save-buttons {
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
}

.buttons{
  width: 160px;
}

.bttn{
  padding: 0;
}


@media (max-width: $phone-size){
  .first-row{
    margin-top: 20px;
  }

  #product-input{
    max-width: 200px;
  }

  #price-input{
    max-width: 80px;
  }

  #add-button{
    max-width: 40px;
    max-height: 40px;
  }

  #product-input,
  #price-input {
    margin-right: 8px;
  }

  .products-container{
    max-width: 338px;
    padding: 16px;
  }

  .buttons{
    max-width: 143.5px;
  }


  .NewProduct{
    margin-bottom: 20px;
  }

  .there-is-no-products{
    margin-top: 40px;
    padding: 0;
  }

  .text{
    font-size: 24px;
  }

  .second{
    margin-top: 0;
  }

  .fourth{
    margin-bottom: 0;
  }

  .third{
    margin: 15px 0;
  }


}

</style>

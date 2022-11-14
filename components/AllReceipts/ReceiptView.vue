<template>
  <div class="receipt-view">
      <div id="header" v-if="isData">
          <div id="date">
              {{date_format}}
          </div>
      </div>
      <div id="body" v-if="isData">
          <div class="line"/>
          <div id="receipt-view-products">
            <div class="receipt-view-product"
                 v-for="product in selected_receipt_products"
                 :key="product.product_name"
            >
              <div class="product-name receipt-view-product-title">
                {{product.product_name}}
              </div>
              <div class="product-price receipt-view-product-price">
                ${{product.price}}
              </div>
            </div>
          </div>
          <div class="line"/>
      </div>
      <div id="footer" v-if="isData">
          <div class="receipt-view-total-amount-price">
              <div class="grey total-amount">Total {{total_products_amount}} products</div>
              <div class="grey total-price">${{total_price}}</div>
          </div>
          <red-stroke-button class="delete-button" @click.native="updateVisibility">Delete</red-stroke-button>
      </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import RedStrokeButton from "@/components/UI/RedStrokeButton";


export default {
  name: "ReceiptView",
  components: {RedStrokeButton},
  computed: {
    isData(){
      return typeof this.$store.state.state.selected_receipt.products !== 'undefined';
    },

    date_format() {
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        let date = ''
        if (typeof this.$store.state.state.selected_receipt.createdAt === 'string'){
          // console.log(this.$store.state.state.selected_receipt)
          // console.log('string')
          date = new Date(this.$store.state.state.selected_receipt.createdAt)
        } else {
          // console.log(this.$store.state.state.selected_receipt)
          date = new Date(this.$store.state.state.selected_receipt.createdAt * 1000)
        }
        // const date = new Date(this.receipt[0].createdAt)
        let result = date.toLocaleString('en-EG', {month: 'short'}) + ' ' + date.getDate()
        // console.log(result)
        if (date.getFullYear() === new Date().getFullYear()) return result
        else return result + ', ' + date.getFullYear()
      }
    },
    total_price(){
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        let before_sum = JSON.parse(JSON.stringify(this.$store.state.state.selected_receipt.products)).map(item => item.price)
        return before_sum.reduce((partialSum, a) => partialSum + a).toFixed(2);
      }
    },
    total_products_amount(){
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        console.log(this.$store.state.state.selected_receipt.products.length)
        return this.$store.state.state.selected_receipt.products.length
      }
    },
    selected_receipt_products(){
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined'){
        console.log(this.$store.state.state.selected_receipt.products)
        return this.$store.state.state.selected_receipt.products
      }
    }

  },
  methods: {
    ...mapActions(['SELECT_FIRST_RECEIPT']),

    updateVisibility(){
      this.$emit('onUpdateVisibility', !this.isConfirmationVisible)
    }
  },
  model: {
    prop: 'isConfirmationVisible',
    event: 'onUpdateVisibility'
  },
  props: [
    'isConfirmationVisible'
  ],

}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";
::-webkit-scrollbar {
  width: 4px;
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


  .receipt-view {
    //position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 16px;
    z-index: 1000;
    min-width: 300px;
    max-width: 300px;
    min-height: 300px;
    //width: 350px;
    height: fit-content;

    background: $grey-background;
    //box-shadow: 0 -4px 40px $receipt-view-shadow;
    border-radius: 8px;

    margin-right: 24px;
    //max-height: 400px;
  }

  .line {
    width: 100%;
    height: 0;
    border: 1px solid $line;
    transform: rotate(0.13deg);

    flex: none;
    order: 0;
    align-self: stretch;
  }

  #date{
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    align-items: center;
    margin: 0;
  }

  #body {
    width: 100%
  }

  #header {
    width: 100%;
  }


  #receipt-view-products {
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding: 0;
    padding-right: 7px;
    gap: 8px;
    width: 100%;
    max-height: 280px;
    margin-top: 16px;
    margin-bottom: 8px;
    overflow-y: auto;

  }

  .receipt-view-product {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
  }

  #footer{
    width: 100%;
  }

  .receipt-view-total-amount-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    margin-bottom: 20px;
  }

  .delete-button {
    padding: 2px 12px;
  }


</style>

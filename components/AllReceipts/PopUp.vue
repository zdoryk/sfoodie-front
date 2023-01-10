<template>
  <div id="container">
    <div id="header">
      <div id="date" >
        {{date_format}}
      </div>
    </div>
    <div id="body">
      <div class="line"/>
      <div id="pop-up-products">
        <div class="pop-up-product"
             v-for="product in selected_receipt_products"
             :key="product.product_name"
        >
          <div class="product-name pop-up-product-title">
            {{product.product_name}}
          </div>
          <div class="product-price pop-up-product-price">
            {{currencySymbol}}{{product.price}}
          </div>
        </div>
      </div>
      <div class="line-with-shadow"/>
    </div>
    <div id="footer">
      <div class="pop-up-total-amount-price">
        <div class="grey total-amount">Total {{this.total_products_amount}} products</div>
        <div class="grey total-price">{{currencySymbol}}{{total_price.toFixed(2)}}</div>
      </div>
      <red-stroke-button class="delete-button" @click.native="updateVisibility">Delete</red-stroke-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import RedStrokeButton from "@/components/UI/RedStrokeButton";

export default {
  name: "PopUp",
  components: {RedStrokeButton},
  computed: {
    ...mapGetters(['currencySymbol']),
    total_products_amount() {
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        return this.$store.state.state.selected_receipt.products.length
      } else return 0
    },

    selected_receipt_products() {
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        return this.$store.state.state.selected_receipt.products;
      } else return []
    },

    date_format() {
      const date = new Date(this.$store.state.state.selected_receipt.createdAt)
      let result = date.toLocaleString('en-EG', { month: 'short' }) + ' ' + date.getDate()
      if (date.getFullYear() === new Date().getFullYear()) return result
      else return result + ', ' + date.getFullYear()
    },
    total_price(){
      if (typeof this.$store.state.state.selected_receipt.products !== 'undefined') {
        let before_sum = JSON.parse(JSON.stringify(this.$store.state.state.selected_receipt.products)).map(item => item.price)
        return before_sum.reduce((partialSum, a) => partialSum + a);
      } else return 0
    },



  },
  model: {
    prop: 'isConfirmationVisible',
    event: 'onUpdateVisibility'
  },
  props: [
    'isConfirmationVisible'
  ],
  methods: {
    ...mapActions(['SELECT_FIRST_RECEIPT']),
    updateVisibility() {
      // console.log('HI' + !this.isConfirmationVisible)
      this.$emit('onUpdateVisibility', !this.isConfirmationVisible)
    },
  },

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

  #container{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 16px;
    gap: 24px;

    position: relative;
    width: 100%;
    height: fit-content;
    max-height: 70%;

    background: #23242D;
    box-shadow: 0 -4px 40px #1B1C22;
    border-radius: 8px 8px 0 0;
  }


  .line, .line-with-shadow{
    width: 100%;
    height: 0;
    border: 1px solid $line;
    transform: rotate(0.13deg);

    flex: none;
    order: 0;
    align-self: stretch;
  }

  .line-with-shadow {
    box-shadow: 0px -32px 50px 8px rgba(35, 36, 45, 1);
    // Need to be tested
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


  #pop-up-products {
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding: 0;
    padding-right: 7px;
    gap: 8px;
    width: 100%;
    max-height: 360px;
    margin-top: 16px;
    margin-bottom: 8px;
    overflow-y: auto;

  }

  .pop-up-product {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
  }

  #footer {
    width: 100%;
  }

  .pop-up-total-amount-price {
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

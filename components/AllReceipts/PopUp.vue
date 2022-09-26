<template>
  <div id="container">
    <div id="header">
      <div id="date" >
        {{date_format}}
      </div>
    </div>
    <div id="body">
      <div class="line"/>
      <div id="receipt-view-products">
        <div class="receipt-view-product"
             v-for="product in this.$store.state.state.selected_receipt_mobile.products"
             :key="product.product_id"
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
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PopUp",
  computed: {
    date_format() {
      const date = new Date(this.$store.state.state.selected_receipt_mobile.createdAt)
      let result = date.toLocaleString('en-EG', { month: 'short' }) + ' ' + date.getDate()
      if (date.getFullYear() === new Date().getFullYear()) return result
      else return result + ', ' + date.getFullYear()
    },
    total_price(){
      let before_sum = JSON.parse(JSON.stringify(this.$store.state.state.selected_receipt.products)).map(item => item.price)
      return before_sum.reduce((partialSum, a) => partialSum + a);
    },
  },
  props: {
    //   receipt: Array
  },
  methods: {
    ...mapActions(['SELECT_FIRST_RECEIPT']),
    test(){
      this.SELECT_FIRST_RECEIPT()
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
    width: 375px;
    height: fit-content;

    background: #23242D;
    box-shadow: 0 -4px 40px #1B1C22;
    border-radius: 8px 8px 0 0;
  }

</style>

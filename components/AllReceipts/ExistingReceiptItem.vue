<template>
  <div class="ExistingReceiptItem">
    <div class="date-and-chevron-button">
<!--      <div class="date">-->
<!--        December 21-->
<!--      </div>-->
      <chevron-down-button @click.native="isOpened = !isOpened"  v-bind:is-opened="this.isOpened">{{this.date_format}}</chevron-down-button>
<!--      <chevron-down-button @click.native="click">{{this.existing_receipt_data[1].date}}</chevron-down-button>-->

    </div>
    <div class="hidden" v-if="isOpened">
      <div class="receipt-line"/>
      <div class="existing-receipt-product" v-for="product in this.existing_receipt_data.products" :key="product.product_id">
        <div class="grey existing-receipt-product-title">
          {{product.product_name}}
        </div>
        <div class="grey existing-receipt-product-price">
          ${{product.price}}
        </div>
      </div>
    </div>
    <div class="receipt-line"/>
    <div class="total-amount-price">
      <div class="grey total-amount">Total {{existing_receipt_data.products.length}} products</div>
      <div class="grey total-price">${{total_price.toFixed(2)}}</div>
    </div>
<!--    <div class="delete-button" v-if="isOpened">-->
    <red-button class="delete-button" v-if="isOpened" @click.native="delete_this_receipt">Delete</red-button>
<!--    </div>-->
  </div>
</template>

<script>
import ChevronDownButton from "@/components/UI/ChevronDownButton";
import md5 from "md5";
import RedButton from "@/components/UI/RedButton";
import {mapActions} from "vuex";

export default {
  name: "ExistingReceiptItem",
  components: {RedButton, ChevronDownButton},
  data(){
    return{
      isOpened: false,
    }
  },
  props: {
      existing_receipt_data: {},
  },
  methods: {
    ...mapActions(
      [
        'DELETE_EXISTING_RECEIPT'
      ]
    ),

    //    DEV
    // click(){
    //   console.log(this.existing_receipt_data)
    // }

    delete_this_receipt(){
      console.log(this.existing_receipt_data)
      this.DELETE_EXISTING_RECEIPT(this.existing_receipt_data)
    }
  },
  computed: {
    total_price(){
      let before_sum = JSON.parse(JSON.stringify(this.existing_receipt_data.products)).map(item => item.price)
      return before_sum.reduce((partialSum, a) => partialSum + a);
    },

    date_format() {
      const date = new Date(this.existing_receipt_data.createdAt)
      return date.toLocaleString('en-EG', { month: 'short' }) + ', ' + date.getDate()


    }
  }
}
</script>

<style scoped lang="scss">
  .ExistingReceiptItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    margin-bottom: 40px;
    width: 334px;
    //height: 136px;
    top: 0;
    background: #23242D;
    box-shadow: 0 -4px 40px #1B1C22;
    border-radius: 8px;
  }

  .date-and-chevron-button{
    width: 100%;
    display: flex;
    //align-items: center;
    justify-content: space-between;
    //cursor: pointer;

    & > button {
      font-size: 20px;
    }

    &:hover > button{
      transition: 0.3s ease-out;
      color: #696AE9;
    }
  }

  .date {
    font-size: 20px;
  }

  .receipt-line{
    width: 100%;
    border: 1px solid #3A3C4C;
    height: 0;
    margin-top: 16px
  }

  .total-amount-price{
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total-amount {
    font-size: 16px;
  }

  .total-price{
    font-size: 20px;
    /*font-family: Poppins;*/
    font-style: normal;
    font-weight: 600;
  }

  .grey{
    color: #B6B8CA;
  }

  .hidden {
    width: 100%
  }

  .existing-receipt-product {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

  }

  .existing-receipt-product-price {
    font-weight: 600;
    font-size: 16px;
  }

  .delete-button.delete-button {
    padding: 4px 12px;
    margin-top: 20px;
    font-size: 16px;
  }

</style>

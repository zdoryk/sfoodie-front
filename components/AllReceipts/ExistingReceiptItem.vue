<template>
  <div class="ExistingReceiptItem"
       :class="{'active' : this.activePlan === this.existing_receipt_data.receipt_id}"
       tabindex="0"
       @click="updateActivePlan"
  >
      <div id="header">
          <div id="date">
            {{this.date_format}}
          </div>
      </div>

      <div id="footer">
          <div class="total-amount">
              {{existing_receipt_data.products.length}} products
          </div>
          <div class="total-price">
              {{currencySymbol}}{{total_price.toFixed(2)}}
          </div>
      </div>
  </div>
</template>

<script>
import ChevronDownButton from "@/components/UI/ChevronDownButton";
import RedButton from "@/components/UI/RedStrokeButton";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExistingReceiptItem",
  components: {RedButton, ChevronDownButton},
  data(){
    return{
      myStyle: {
        backgroundColor:"#16a085",
        width: "10px",
        height: "10px"
      }
    }
  },
  model: {
    prop: 'activePlan',
    event: 'onUpdatePlan'
  },
  props: [
      "existing_receipt_data", 'activePlan'
  ],
  methods: {
    ...mapActions(
      [
         'SELECT_EXISTING_RECEIPT',
      ]
    ),

    // delete_this_receipt(){
    //   console.log(this.existing_receipt_data)
    //   this.DELETE_EXISTING_RECEIPT(this.existing_receipt_data)
    // },
    updateActivePlan() {
      // console.log('HI' + this.existing_receipt_data.receipt_id)
      this.$emit('onUpdatePlan', this.existing_receipt_data.receipt_id)
      // console.log('HI' + this.existing_receipt_data.receipt_id)
      this.SELECT_EXISTING_RECEIPT(this.existing_receipt_data)
    },
  },
  computed: {
    ...mapGetters(['currencySymbol']),
    total_price(){
      let before_sum = JSON.parse(JSON.stringify(this.existing_receipt_data.products)).map(item => item.price)
      return before_sum.reduce((partialSum, a) => partialSum + a);
    },

    date_format() {
      const date = new Date(this.existing_receipt_data.createdAt)
      let result = date.toLocaleString('en-EG', { month: 'short' }) + ' ' + date.getDate()
      if (date.getFullYear() === new Date().getFullYear()) return result
      else return result + ', ' + date.getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
  .ExistingReceiptItem{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 8px;

    min-width: 290px;
    max-width: 354.83px;
    height: 92px;

    background: $grey-background;
    box-shadow: 0 5px 20px -10px $black-shadow;
    border-radius: 8px;

    flex: 1;

    // Temporary
    margin-bottom: 20px;
    margin-right: 20px;

    cursor: pointer;
  }

  //.active {
  //  background-color: #edefff;
  //}

  #date {
    width: 100%;
    height: 24px;
    font-weight: 600;

    display: flex;
    align-items: center;

    color: #EDEFFF;

    flex: none;
    order: 0;
    flex-grow: 1;
  }

  #footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 4px 4px 0;
    gap: 32px;
    width: 100%;
    height: 32px;
  }

  .total-amount {
    width: 60%;
    height: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: $grey;
    flex: 4;
  }

  .total-price {
    width: 84px;
    height: 24px;
    font-style: normal;
    //font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    color: $grey;
    flex: 1;
  }

  .active{
    background: $blue;
    box-shadow: 0 0 8px rgba(105, 106, 233, 0.5), 0 0 20px $blue-shadow;

    .total-amount, .total-price {
      color: #edefff;
    }

    transition: background-color 0.3s ease-out;
  }


  @media(max-width: $phone-size){
    .ExistingReceiptItem{
      margin-right: 0;
      max-width: 335px;
    }
  }

</style>

<template>
  <div class="AllTime">
    <div id="receipt_view_pop-up">
<!--        <receipt-view v-bind:receipt="selected_receipt"/>-->
<!--        <receipt-view v-bind:is_selected="activePlan"/>-->
      <receipt-view id="receipt_view"/>
      <pop-up id="pop-up"/>
    </div>
    <div id="content">
      <div id="month" v-for="(item, key, i) in filtered_receipts_by_mmYYYY" :key="i">
        <div class="date_title">{{ key }}</div>
        <div class="receipts">
          <ExistingReceiptItem v-for="(receipt, index) in item" :key="index"
                               v-bind:existing_receipt_data="receipt"
                               v-model="activePlan"
          />
        </div>
        <div class="line"/>
      </div>

    </div>
  </div>
</template>

<script>
import ExistingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";
import ReceiptView from "@/components/AllReceipts/ReceiptView";
import {mapActions, mapState} from "vuex";
import PopUp from "@/components/AllReceipts/PopUp";


export default {
  components: {PopUp, ExistingReceiptItem, ReceiptView},
  layout: 'allReceiptsPage',
  name: "AllTime",
  data() {
    return {
      activePlan: '1',
    }
  },
  methods:{
    ...mapActions(['SET_EXISTING_RECEIPTS_ACTION']),
  },
  created() {
    this.SET_EXISTING_RECEIPTS_ACTION()
  },

  computed: {
    existing_receipts(){
      console.log(JSON.parse(JSON.stringify(this.$store.state.state.existing_receipts)))
      return JSON.parse(JSON.stringify(this.$store.state.state.existing_receipts))
    },

    receipts() {
      return this.existing_receipts;
    },

    filtered_receipts_by_mmYYYY(){
      // let month_year = this.existing_receipts.map((receipt) => ({ [receipt.createdAt.substring(0,3) + receipt.createdAt.substring(6)]: [] }))
      let month_year = [...new Set (this.existing_receipts.map((receipt) => receipt.createdAt.substring(0,3) + receipt.createdAt.substring(6)))].map((item) => ({ [item]: [] }))
      console.log(month_year)

      this.existing_receipts.map(function(receipt){
        for (let i = 0; i < month_year.length; i++) {
          let key = Object.keys(month_year[i])[0]
          if(key === receipt.createdAt.substring(0,3) + receipt.createdAt.substring(6)){
            month_year[i][key].push(receipt)
          }
        }
      });
      // console.log(Object.keys(month_year[0])[0])
      let smt = {}

      for (let index in month_year) {
        const date = new Date(Object.keys(month_year[index])[0].substring(0,3) + '01/20' + Object.keys(month_year[index])[0].substring(5))
        console.log(date)
        let result = date.toLocaleString('en-EG', { month: 'short' })
        // console.log(month_year[index][Object.keys(month_year[index])[0]])
        if (date.getFullYear() === new Date().getFullYear()) smt[result] = month_year[index][Object.keys(month_year[index])[0]]
        else smt[result + ', ' + date.getFullYear()] = month_year[index][Object.keys(month_year[index])[0]]
      }

      return smt
    },

    date_format(raw_date) {
      const date = new Date(raw_date)
      let result = date.toLocaleString('en-EG', { month: 'short' })
      if (date.getFullYear() === new Date().getFullYear()) return result
      else return result + ', ' + date.getFullYear()
    }

  }

}
</script>

<style scoped lang="scss">
@import "assets/variables";
::-webkit-scrollbar {
  width: 6px;
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


  .AllTime{
    display: flex;
    /*flex-wrap: wrap;*/
  }

  .receipts{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex: 2;
    width: 100%;
  }

  #receipt_view_pop-up{
    flex: 1
  }

  #pop-up{
    visibility: hidden;

  }

  .date_title {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .line {
    width: 95%;
    height: 0;
    border: 1px solid $line;
    transform: rotate(0.13deg);
    flex: none;
    order: 0;
    z-index: -1;
    align-self: stretch;
    margin-top: 4px;
    margin-bottom: 24px;
  }

  #content{
    overflow-y: scroll;
    max-height: 74vh;
  }



  @media(max-width: $phone-size){
    #receipt_view_pop-up{
      position: fixed;
      left: 500px;
      visibility: hidden;
      //top: 50%
    }


  }

</style>

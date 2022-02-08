<template>
  <div class="ThisMonth">
    <div class="existing-receipts ex-r-1" >
      <ExistingReceiptItem  v-for="(receipt, index) in each_1" :key="index" v-bind:existing_receipt_data="receipt"/>
    </div>
    <div class="existing-receipts ex-r-2">
      <ExistingReceiptItem  v-for="(receipt, index) in each_2" :key="index" v-bind:existing_receipt_data="receipt"/>
    </div>
    <div class="existing-receipts ex-r-3" >
      <ExistingReceiptItem v-for="(receipt, index) in each_3" :key="index" v-bind:existing_receipt_data="receipt"/>
    </div>
  </div>
</template>

<script>
import ExistingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";
import {filter_this_month} from "@/utils/existing_receipts_filter";
import {mapState} from "vuex";

export default {
  components: {ExistingReceiptItem},
  layout: 'allReceiptsPage',
  name: "ThisMonth",

  computed: {
    existing_receipts(){
      console.log(JSON.parse(JSON.stringify(this.$store.state.state.existing_receipts)))
      return filter_this_month(JSON.parse(JSON.stringify(this.$store.state.state.existing_receipts)))
    },

    each_1(){
      let result = []
      for (let i = 0; i < this.existing_receipts.length; i = i + 3){
        result.push(this.existing_receipts[i])
      }
      return result
    },
    each_2(){
      let result = []
      for (let i = 1; i < this.existing_receipts.length; i = i + 3){
        result.push(this.existing_receipts[i])
      }
      return result
    },
    each_3(){
      let result = []
      for (let i = 2; i < this.existing_receipts.length; i = i + 3){
        result.push(this.existing_receipts[i])
      }
      return result
    }
  }

}
</script>

<style scoped>
.ThisMonth{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.existing-receipts {
  display: flex;
  flex-direction: column;
}

.ex-r-1, .ex-r-2 {
  /*margin-right: 40px;*/
}
</style>

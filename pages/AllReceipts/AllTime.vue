<template>
  <div class="AllTime">
    <ExistingReceiptItem/>
  </div>
</template>

<script>
import ExistingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";
export default {
  components: {ExistingReceiptItem},
  layout: 'allReceiptsPage',
  name: "AllTime"
}
</script>

<style scoped>

</style>

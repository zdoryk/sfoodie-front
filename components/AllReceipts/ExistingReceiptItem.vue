<template>
  <div class="ExistingReceiptItem">
    <div class="date-and-chevron-button">
<!--      <div class="date">-->
<!--        December 21-->
<!--      </div>-->
      <chevron-down-button>December 21</chevron-down-button>
    </div>
    <div class="receipt-line"/>
    <div class="total-amount-price">
      <div class="total-amount">Total 4 products</div>
      <div class="total-price">$35.38</div>
    </div>
  </div>
</template>

<script>
import ChevronDownButton from "@/components/UI/ChevronDownButton";
export default {
  name: "ExistingReceiptItem",
  components: {ChevronDownButton}
}
</script>

<style scoped lang="scss">
  .ExistingReceiptItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    width: 334px;
    height: 136px;
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
    margin: 16px 0;
  }

  .total-amount-price{
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
    color: #B6B8CA;
    /*font-family: Poppins;*/
    font-style: normal;
    font-weight: 600;
  }

</style>

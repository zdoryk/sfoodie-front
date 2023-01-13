<template>
  <div class="NewProduct">
    <div class="product-name">
      {{product_data.product_name}}
    </div>
    <div class="product-price">
      {{currencySymbol}}{{product_data.price.toFixed(2)}}
    </div>
    <cross-button @click.native="delete_from_receipt"/>
  </div>
</template>

<script>
import CrossButton from "@/components/UI/CrossButton";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewProduct",
  components: {CrossButton},
  props: [
    'product_data',
    'index'
  ],
  methods:{
    ...mapActions([
      'DELETE_FROM_RECEIPT'
    ]),

    delete_from_receipt(){
      // console.log(this.product_data.product_name)
      // this.DELETE_FROM_RECEIPT(this.product_data.product_name)
      this.DELETE_FROM_RECEIPT(this.index)
      console.log(this.$store.state.state.new_receipt_products)
    }
  },
  computed:{
    ...mapGetters(['currencySymbol'])
  }
}
</script>

<style lang="scss" scoped>
  .NewProduct {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .product-name {
    flex: 4;
  }

  .product-price {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-right: 32px;
  }
</style>

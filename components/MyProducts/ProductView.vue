<template>
  <div id="product-view">
<!--    Products-->
<!--    {{ // this.$store.state.state.selected_category }}-->
    <product-item
      v-for="(value, key, index) in products_from_selected_category"
      :key="index"
      :product="value"
    />
  </div>
</template>

<script>
import ProductItem from "./ProductItem"

export default {
  name: "ProductView",
  components: {
    ProductItem
  },
  computed: {
    products_from_selected_category () {
      return this.$store.state.state.selected_category.products
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";

  #product-view{
    flex: 4;
    /*max-width: 460px;*/
    min-width: 300px;
    margin-left: 40px;
    color: white;
    padding: 16px 24px;
    padding-top: 20px;
    gap: 8px;
    /*width: 600px;*/
    height: 576px;
    background: #23242D;
    //box-shadow: 0 -4px 40px #1B1C22;
    border-radius: 8px;
    overflow-y: scroll;
  }

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
</style>

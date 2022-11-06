<template>
  <div id="product-view">
    Products
    {{ this.$store.state.state.selected_category }}
  </div>
</template>

<script>
export default {
  name: "ProductView"
}
</script>

<style scoped>
  #product-view{
    flex: 4;
    /*max-width: 460px;*/
    min-width: 300px;
    height: 300px;
    background-color: #edefff;
    margin-left: 40px;
    color: black;
  }
</style>

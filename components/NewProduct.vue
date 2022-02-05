<template>
  <div class="NewProduct">
    <div class="product-name">
      {{product_data.product_name}}
    </div>
    <div class="product-price">
      ${{product_data.price}}
    </div>
    <cross-button @click="test"/>
  </div>
</template>

<script>
import CrossButton from "@/components/UI/CrossButton";
export default {
  name: "NewProduct",
  components: {CrossButton},
  props: {
    product_data: {
      type: Object,
      default() {
        return{}
      }
    }
  },
  methods:{
    test(){
      console.log('Test')
    }
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

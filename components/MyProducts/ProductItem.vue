<template>
  <div class="product-item">
    <div class="name-category" >
      <div class="product-name" v-if="product.product_name.length < 20">
        {{ this.product.product_name }}
      </div>
      <div class="product-name long" v-if="product.product_name.length >= 20" :style='{"--content": JSON.stringify(this.product.product_name)}'>
        {{ this.product.product_name.substring(0,20) }}...
      </div>
      <div class="product-category" :style="{'color': this.product.color}">
        ● {{ this.product.product_category}}
      </div>
      <div class="buttons">

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ['product'],
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";


    .product-item{
      display: flex;
      /*flex-direction: row;*/
      align-items: center;
      padding: 4px 0;
      padding-bottom: 14px;
      margin-bottom: 10px;
      gap: 8px;

      //width: 552px;
      height: 40px;

      /* Inside auto layout */

      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
      border-bottom: #3A3C4C 1px solid;
    }

    .product-name{
      //min-width: 80px;
      //max-width: 150px;
      position: relative;
      width: 170px
    }

    .long {
      cursor: pointer;
    }

    .long::after {
      background-color: $line;
      border-radius: 10px;
      color: $blue;
      display: none;
      padding: 10px 15px;
      position: absolute;
      text-align: center;
      z-index: 999;
      width: 150px;
    }

    .long::after {
      content: var(--content);
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 10px));
    }

    .long:hover::after {
      display: block;
    }

    .long::before {
      background-color: $line;
      content: ' ';
      display: none;
      position: absolute;
      width: 15px;
      height: 15px;
      z-index: 999;
    }

    .long:hover::before {
      display: block;
    }

    .long::before {
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 5px)) rotate(45deg);
    }

    .name-category{
      display: flex;
    }


</style>

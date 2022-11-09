<template>
  <div class="product-item">
    <div class="opacity" :style="{'visibility': this.isPopUpVisible}"/>
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
    </div>
    <div class="buttons">
      <blue-stroke-button @click.native="edit">
        <edit-icon size="18"/>
      </blue-stroke-button>
      <red-stroke-button>
        <x-icon size="18"/>
      </red-stroke-button>
      <edit-product-pop-up :style="display" :product_data="product"/>
    </div>
  </div>
</template>

<script>
import {EditIcon, XIcon} from "vue-tabler-icons"
import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import EditProductPopUp from "@/components/MyProducts/EditProductPopUp";

export default {
  name: "ProductItem",
  props: ['product'],
  data () {
    return {
      display: {"display": "none"},
      isPopUpVisible: 'hidden'
    }
  },
  components: {RedStrokeButton, EditIcon, BlueStrokeButton, XIcon, EditProductPopUp},
  methods: {
    edit () {
      // if (this.display.display === "none"){
      //   this.display.display = "flex"
      //   this.isPopUpVisible = true
      // } else {
      //   this.display.display = "none"
      //   this.isPopUpVisible = false
      // }
      this.display.display = "flex"
      this.isPopUpVisible = 'visible'
    },

    delete_product () {

    },
    hide(){
      this.display.display = 'none'
      this.isPopUpVisible = 'hidden'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";

    .opacity{
      position: absolute;
      width: 100%;
      height: 100vh;
      background-color: #000000;
      opacity: 0.5;
      left:0;
      top: 0;
      z-index: 1003;
    }

    .product-item{
      display: flex;
      /*flex-direction: row;*/
      align-items: center;
      padding: 4px 0;
      padding-bottom: 16px;
      margin-bottom: 12px;
      gap: 8px;

      //width: 552px;
      height: 40px;

      /* Inside auto layout */

      order: 0;
      align-self: stretch;
      flex-grow: 0;
      border-bottom: #3A3C4C 1px solid;
      justify-content: space-between;
    }

    .product-name{
      //min-width: 80px;
      //max-width: 150px;
      position: relative;
      width: 180px
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
      z-index: 2;
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


    .buttons{
      display: flex;
      gap: 8px;
      flex: 1;
      justify-content: flex-end;
    }

    .blue-stroke-button{
      padding: 7px;
      color: $blue;
      border-color: $blue;
    }

    .red-stroke-button{
      padding: 7px;
    }


</style>

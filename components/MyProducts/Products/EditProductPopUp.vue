<template>
  <div class="edit-product-pop-up" v-click-outside="hide">
    <div class="title">
      Edit product
    </div>
    <div class="edit-content" >
      <div class="edit-product-name-input">
        <input placeholder="product_data" id="product-name-input" type="text" v-model="this.product_name">
      </div>
<!--      <div class="edit-product-category-select">-->
<!--        <vue-select :options="some_list" class="style-chooser" placeholder="Choose a Styling Option"/>-->
<!--      </div>-->
      <div class="some-input">
        <custom-select :product="product_data"/>
      </div>
      <div id="buttons">
        <red-stroke-button id="cancel" @click.native="hide">
          Cancel
        </red-stroke-button>
        <blue-button id="confirm">
          Confirm
        </blue-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import CustomSelect from "@/components/MyProducts/CustomSelect";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import BlueButton from "@/components/UI/BlueButton";
import Vue from "vue";


Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target) || el.parentElement.contains(event.target)))  {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

export default {
  name: "EditProductPopUp",
  components: {CustomSelect, VueSelect, RedStrokeButton, BlueButton},
  data() {
    return {
      some_list: ["Odin","Dwa","Three", "Odin","Dwa","Three", "Odin","Dwa","Three", "Odin","Dwa","Three"],
      product_name: '',
      display: 'none'
    }
  },
  props: ['product_data'],
  created() {
    this.product_name = this.product_data.product_name
  },
  computed: {
  },
  methods: {
    hide () {
      this.$parent.hide()
    }
  }
}
</script>



<style scoped lang="scss">
@import "../../../assets/variables";

  .edit-product-pop-up{
    display: none;
    flex-direction: column;
    position: absolute;
    width: 428px;
    height: 360px;
    padding: 40px;
    gap: 40px;
    //box-shadow: 0 0 10px 5px $black;
    background-color: $grey-background;
    border-radius: 8px;
    z-index: 1004;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;

  }

  .title{
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }

  #product-name-input{
    display:inline-block;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    width:100%;
    height:34px;
    padding:6px 30px;
    padding-left:10px;
    font-size:16px;
    line-height:1.4;
    color:#edefff;
    background-color: #282932;
    border: 1px solid #282932;
    //border: none;
    border-radius:4px;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    //caret-color: transparent;
    //cursor: pointer;
  //opacity: 0.2;
  }

  #product-name-input:hover{
    border: 1px solid $blue;
  }

  #product-name-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  #product-name-input::-webkit-input-placeholder{
    color: #8A8B94;
  }
  #buttons{
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  }

  .red-stroke-button, #confirm{
    width: 47%;
    height: 48px;
    margin-top: 0;
    //padding: 12px 0;
  }

  #confirm{

  }

 //.style-chooser{
 //  margin-top: 30px;
 //
 //  //--vs-colors--lightest: rgba(60,60,60,0.26);
 //  //--vs-colors--light: rgba(60,60,60,0.5);
 //  //--vs-colors--dark: #333;
 //  //--vs-colors--darkest: rgba(0,0,0,0.15);
 //  --vs-search-input-color: #3a3a3a3c3c;
 //  --vs-search-input-bg: #282932;
 //  --vs-search-input-placeholder-color: #8A8B94;
 //  //--vs-font-size: 1rem;
 //  //--vs-line-height: 1.4;
 //  //--vs-state-disabled-bg: #f8f8f8;
 //  //--vs-state-disabled-color: var(--vs-colors--light);
 //  //--vs-state-disabled-controls-color: var(--vs-colors--light);
 //  //--vs-state-disabled-cursor: not-allowed;
 //  --vs-border-color: #282932;
 //  --vs-border-width: 1px;
 //  --vs-border-style: solid;
 //  --vs-border-radius: 4px;
 //  --vs-actions-padding: 4px 6px 0 3px;
 //  //--vs-controls-color: var(--vs-colors--light);
 //  //--vs-controls-size: 1;
 //  //--vs-controls--deselect-text-shadow: 0 1px 0 #fff;
 //  //--vs-selected-bg: yellow;
 //  --vs-selected-color: #edefff;
 //  //--vs-selected-border-color: var(--vs-border-color);
 //  //--vs-selected-border-style: var(--vs-border-style);
 //  //--vs-selected-border-width: var(--vs-border-width);
 //  --vs-dropdown-bg: #282932;
 //  --vs-dropdown-color: #B6B8CA;
 //  --vs-dropdown-z-index: 1000;
 //  //--vs-dropdown-min-width: 160px;
 //  //--vs-dropdown-max-height: 350px;
 //  --vs-dropdown-box-shadow: 0px 3px 6px 0px var(--vs-colors--darkest);
 //  //--vs-dropdown-option-bg: #000;
 //  --vs-dropdown-option-color: var(--vs-dropdown-color);
 //  --vs-dropdown-option-padding: 3px 20px;
 //  --vs-dropdown-option--active-bg: #696AE9;
 //  --vs-dropdown-option--active-color: #edefff;
 //  --vs-dropdown-option--deselect-bg: #fb5858;
 //  --vs-dropdown-option--deselect-color: #edefff;
 //  --vs-transition-timing-function: cubic-bezier(1,-0.115,0.975,0.855);
 //  --vs-transition-duration: 150ms;
 // }



</style>

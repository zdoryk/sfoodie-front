<template>
  <div class="category-filter-pop-up" v-click-outside="hide">
    <div class="content" v-if="visible">
      <div class="check-boxes">
        <category-filter-check-box-item
          v-for="(value, key, index) in categories_data"
          :key="index"
          :category_data="value || 'undefined'"
        />

      </div>
      <div class="buttons">
        <red-stroke-button class="clear-button" v-on:click.native="clear_inputs">Clear</red-stroke-button>
        <blue-button class="apply-button" v-on:click.native="apply">Apply</blue-button>
      </div>

    </div>
  </div>
</template>

<script>

import Vue from "vue";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import BlueButton from "@/components/UI/BlueButton";
import CategoryFilterCheckBoxItem from "@/components/AllReceipts/CategoryFilter/CategoryFilterCheckBoxItem";

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      let class_value = 'none'
      if (event.target.attributes.class !== undefined) class_value = event.target.attributes.class.value
      if (!(el === event.target || el.contains(event.target)  ||el.parentElement.contains(event.target))){
        if( class_value !== undefined && !(class_value === 'ico check-box-ico icon icon-tabler icon-tabler-check')){
          vnode.context[binding.expression](event);
        }
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
  name: "CategoryFilterPopUp",
  components: {CategoryFilterCheckBoxItem, BlueButton, RedStrokeButton},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selected_categories: {
      type: Object
    }
  },
  mounted() {
    this.temp_selected_categories = Object.assign({}, this.selected_categories)
  },
  data(){
    return{
      temp_selected_categories: {},
    }
  },
  computed:{
    categories_data(){
      return this.$store.state.state.existing_categories.slice(1).map(category => {
        return {
          category_name: category.category_name,
          ico: category.ico,
          color: category.color,
          state: this.temp_selected_categories[category.category_name]
        }
      })
    }
  },
  methods: {
    set_category_state(category_name, state){
      this.temp_selected_categories[category_name] = state
    },

    hide(){
      this.$parent.hide()
    },

    clear_inputs(){
      Object.entries(this.temp_selected_categories).map(([key,value])=>{
        this.temp_selected_categories[key]= false
      })
      this.$parent.clearInput()
    },

    apply(){
      this.$parent.set_category_state(this.temp_selected_categories)
      this.$parent.hide()
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../../../assets/variables";



  .category-filter-pop-up{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 24px;
    //gap: 16px;

    //right: -15%;
    position: absolute;
    width: 320px;
    height: 136px;

    background: #23242D;
    //box-shadow: 0px -4px 40px #1B1C22;
    border-radius: 8px;
  }

  .content{
    width: 100%;
  }

  .inputs{
    width: 100%;
    display: flex;
    //justify-content: space-between;
  }

  .from.from {
    margin-right: 6%;
    border: var(--borderFrom);
  }

  .to.to{
    border: var(--borderTo);
  }

  .from, .to{
    width: 47%;
    background-color: $grey-input-background;
    border: none;
    border-radius: 4px;
    height: 40px;
    padding-left:  16px;
    color: $white;
    font-family: Poppins, sans-serif;
  }

  //input:focus{
  //  border: 1px solid #696AE9;
  //}

  input:focus-visible{
    //border: 1px solid $blue;
    outline: 1px solid $blue;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }


  .buttons {
    display: flex;
    //height: 24px;
    margin-top: 20px;
    justify-content: flex-end;
    gap: 8px;
  }

  .clear-button{
    text-align: center;
  }

  .apply-button{
    font-size: 16px;
    padding: 12px;
  }

  .clear-button, .apply-button{
    max-height: 32px;
  }

  .check-boxes{
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 30vh;
    overflow-y: auto;
    border-radius: 4px;
  }

</style>

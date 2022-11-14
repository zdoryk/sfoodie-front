<template>
  <div class="custom-select">
    <input
      placeholder="Select category"
      id="custom-select-input"
      type="text"
      @click="expanded = !expanded"
      autocomplete="none"
      v-model="this.category_name"
      :style="{'color': this.category_color}"
    >

    <transition-expand>
      <div class="content-wrapper" v-if="expanded" v-click-outside="hide">
        <div class="category-item"
             v-for="(value, key, index) in category_and_color"
             :style="{'color': value.category_color}"
             @click="change_category(value)"
        >
          {{ value.category_name }}
        </div>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import Vue from "vue";
import TransitionExpand from "@/components/Animations/TransitionExpand";

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
  name: "CustomSelect",
  components: {TransitionExpand},
  props: ['product'],
  data () {
    return{
      expanded: false,
      category_name: '',
      category_color: ''
    }
  },
  created() {
    this.category_name = '● ' + this.product.product_category
    this.category_color = this.product.color
  },
  methods: {
    change_category (value) {
      this.category_name = value.category_name
      this.$parent.change_category_name(this.category_name)
      this.category_color = value.category_color
      this.expanded = !this.expanded
    },
    hide () {
      this.expanded = false
    }
  },
  computed: {
    category_and_color: function () {
      let result = JSON.parse(JSON.stringify(this.$store.state.state.existing_categories))
      console.log(result)
      result.splice(0, 1)
      return result.map(function (category) {
        return {
          "category_name": '● ' + category.category_name,
          "category_color": category.color
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

  .custom-select {
    margin-top: 20px;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition-property: opacity, height;
  }
  .expand-enter,
  .expand-leave-to {
    opacity: 0;
  }

  .content-wrapper{
    width: 348px;
    background-color: $grey-input-background;
    padding: 4px 0;
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
    //box-shadow: 0 5px 10px 1px $grey-background;
    border-radius: 4px;
    z-index: 10;
  }

  #custom-select-input{
    z-index: 11;
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
    //border-top-left-radius:4px;
    //border-top-right-radius:4px;
    border-radius: 4px;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    caret-color: transparent;
    cursor: pointer;
    border: 1px solid #282932;
    /*//opacity: 0.2;*/
  }

  #custom-select-input:hover{
    border: 1px solid $blue;
  }

  #custom-select-input:focus{
    border: 1px solid $blue;
    outline: none;
  }

  #custom-select-input::-webkit-input-placeholder{
    color: #8A8B94;
  }

  .category-item{
    //margin: 10px 16px;
    margin: 2px 6px;
    padding: 6px 16px;
    //padding: 4px 2px;
    //border-top: 1px solid $line;
    //border-bottom: 1px solid $line;
    //border: 1px solid $line;
    border-radius: 4px;
    cursor: pointer;
    //background-color: $grey-background;
    transition: .2s;
  }

  .category-item:hover{
    background-color: #3A3C4C;
  }
</style>

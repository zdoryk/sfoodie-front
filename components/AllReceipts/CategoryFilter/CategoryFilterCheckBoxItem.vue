<template>
  <div class="check-box-item">
    <check-box :is-checked="category_state"/>
    <div class="item-style" :style="cssVars">
      <img :src="icon">
    </div>
    <div class="title">
      {{ category_name }}
    </div>
  </div>
</template>

<script>

import * as icons from "assets/categories_svgs";
import CheckBox from "@/components/UI/CheckBox";


export default {
  name: "CategoryFilterCheckBoxItem",
  components: {CheckBox},
  data(){
    return{
      selected_categories: {}
    }
  },
  props: {
    category_data: {},
  },
  methods: {
    change_state(state){
      this.$parent.set_category_state(this.category_data.category_name,state)
    }
  },
  computed: {
    category_name () {
      if (this.category_data !== 'undefined') return this.category_data.category_name
    },
    category_state () {
      if (this.category_data !== 'undefined') return this.category_data.state
    },
    icon() {
      if (this.category_data !== 'undefined') return icons[this.category_data.ico]
    },
    cssVars () {
      return {
        "--back-color": this.category_data.color,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
  .check-box-item{
    display: flex;
    width: 100%;
    height: 32px;
    align-items: center;
    gap: 8px;
  }

  img{
    width: 24px;
    height: 24px;
  }

  .item-style{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
    //background-color: #696AE9;
    border-radius: 4px;
    background-color: var(--back-color);

  }

  .title{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: $grey;
  }

  .item-style, .title{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }

</style>

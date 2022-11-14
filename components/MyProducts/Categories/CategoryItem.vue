<template>
  <div
    class="category-item"
    tabindex="0"
    @click="updateActivePlan"
    :class="{'active' : this.activeCategory === category_name}"
  >
    <div class="category-style" :style="cssVars">
      <img :src="icon">
    </div>
    <div class="title">
      {{ category_name }}
    </div>
    <div class="products-chevron">
      <div class="product-amount">
        {{ product_amount }} products
      </div>
      <div>
        <chevron-right-icon />
      </div>
    </div>
  </div>
</template>

<script>
import {ChevronRightIcon, AppleIcon} from "vue-tabler-icons"
import {mapActions} from "vuex";
import * as icons from "assets/categories_svgs";

export default {
  name: "CategoryItem",
  components: {ChevronRightIcon, AppleIcon},
  // props: ["category_data", "activeCategory"],
  props: {
    category_data: [],
    activeCategory: String
  },
  model: {
    prop: 'activeCategory',
    event: 'onUpdatePlan'
  },
  methods: {
    ...mapActions(
      [
        'SELECT_EXISTING_CATEGORY',
      ]
    ),
    updateActivePlan() {
      this.$emit('onUpdatePlan', this.category_name)
      this.SELECT_EXISTING_CATEGORY(this.category_data)
      console.log(this.$store.state.state.selected_category)
    },
  },
  computed: {
    product_amount () {
      if (this.category_data !== 'undefined') return this.category_data.products.length
    },
    category_name () {
      if (this.category_data !== 'undefined') return this.category_data.category_name
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
@import "../../../assets/variables";

  .category-item{
    display: flex;
    /*align-items: flex-start;*/
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    gap: 16px;

    /*width: 440px;*/
    height: 72px;
    background-color: $grey-background;
    //box-shadow: 0 0 -4px 40px $receipt-view-shadow;
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    //z-index: 4;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .title{
    flex: 3;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  .product-amount{
    /*margin-top: 3px;*/
    font-weight: 400;
    font-size: 14px;
    color: $grey;
  }

  .products-chevron{
    display: flex;
    flex: 2;
    justify-content: space-between;
    align-items: center;

  }

  .active.active{
    background: $blue;
    box-shadow: 0 0 8px rgba(105, 106, 233, 0.5), 0 0 20px $blue-shadow;

    .product-amount {
      color: #edefff;
    }

    transition: background-color 0.3s ease-out;
  }

  img {
    height: 24px;
    width: 24px;
    fill: #FFFFFF;
  }

  .category-style{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    //background-color: #696AE9;
    border-radius: 4px;
    background-color: var(--back-color);
  }

</style>

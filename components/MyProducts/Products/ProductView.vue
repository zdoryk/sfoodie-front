<template>
  <div ref="product-view" id="product-view">
    <transition name="fade-opacity">
      <div class="opacity-product-view"
           ref="opacity"
           v-show="isOpacity"
      >
      </div>
    </transition>
    <product-item
      v-for="(value, key, index) in products_from_selected_category"
      :key="value.product_name"
      :product="value || 'undefined'"
    />
  </div>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  name: "ProductView",
  components: {
    ProductItem,
  },
  data(){
    return{
      viewHeight: 0,
      isOpacity: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$watch(
        () => this.selectedCategory.products,
        (newVal, oldVal) => {
          console.log('Products array changed:', newVal);
          this.getViewHeight()
        }
      );
    });
  },
  methods: {
    getViewHeight() {
      this.$refs["opacity"].style.height = 0
      this.viewHeight = this.$refs["product-view"].scrollHeight;
      this.$refs["opacity"].style.height = this.viewHeight + 30 + "px"
      console.log(this.viewHeight);
      console.log(this.$refs["opacity"].style.height)
    },
    showOpacity(){
      if (window.innerWidth <= 430){
        this.isOpacity = true
        this.$parent.changeNewOpacity(true)
      }
    },
    hideOpacity(){
      this.isOpacity = false
      this.$parent.changeNewOpacity(false)
    }
  },
  computed: {
    products_from_selected_category() {
      return this.$store.state.state.selected_category.products;
    },
    selectedCategory() {
        return this.$store.state.state.selected_category;
    },

    // I WAS TRYING TO SET OVERFLOW HIDDEN WHEN THERE IS NOT ENOUGH PRODUCTS TO OVERFLOW

    // isProductsHeightBigger() {
    //   console.log(this.products_from_selected_category);
    //   if (this.$store.state.state.selected_category.products !== undefined) {
        // this.viewHeight = this.$refs["product-view"].scrollHeight;
        // console.log(this.viewHeight);
        // console.log(this.products_from_selected_category.length * 40 < 480);
        // return this.products_from_selected_category.length * 40 < 480
        // if (typeof this.$refs["product-view"] !== "undefined") {
        //   if (this.products_from_selected_category.length * 40 < 480) {
        //     this.$refs["product-view"].style.overflowY = "hidden";
        //   } else this.$refs["product-view"].style.overflowY = "scroll";
        // }
      // }
      // return 1;
    // },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.fade-opacity-enter-active.fade-opacity-enter-active,
.fade-opacity-leave-active.fade-opacity-leave-active {
  opacity: 0.5;
  transition: all 0.2s ease-in-out;
}

.fade-opacity-enter.fade-opacity-enter,
.fade-opacity-leave-to.fade-opacity-leave-to {
  opacity: 0;
}
.opacity-product-view{
  position: absolute; width: 130%; background: black; opacity: 50%; top: -30px; left: -30px;
}

#product-view {
  flex: 4;
  /*max-width: 460px;*/
  min-width: 305px;
  color: white;
  padding: 16px 24px;
  padding-top: 20px;
  gap: 8px;
  /*width: 600px;*/
  height: 576px;
  background: #23242d;
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

<template>
  <div class="MyProducts">
    <div class="navigation-bar">
      <div id="title">My Products</div>
      <div class="buttons" :style="{'--category-translate': -difference+'px'}">
        <blue-button id="create-category"  @click.native="show_hide_new_category">
          <plus-icon class="ico"/>
          <div ref="create_new_category">Create category</div>
        </blue-button>
        <red-stroke-button id="create-product"  @click.native="show_hide_new_product">
          <apple-icon class="ico"/>
          New Product
        </red-stroke-button>
      </div>
      <div class="back-to-categories" @click="change_translate" :style="cssVars">
        <chevron-left-icon class="ico"/>
        {{ selected_category_name }}
      </div>
    </div>
    <div class="content">
      <category-view :style="{'--category-translate': -difference+'px'}"/>
      <product-view :style="cssVars" ref="product_view"/>
    </div>
<!--    <blue-button @click.native="change_translate" id="test">qwe</blue-button>-->
    <create-new-product v-if="isNewProduct"></create-new-product>
<!--    <div class="opacity" v-if="isNewCategory" @click="isNewCategory = !isNewCategory"/>-->
<!--    <div class="opacity" v-if="isNewProduct" @click="isNewProduct = !isNewProduct"/>-->
    <div class="opacity" v-if="isOpacity" @click="show_hide_opacity"/>
    <create-new-category v-show="isNewCategory" />
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {PlusIcon, AppleIcon, ChevronLeftIcon} from 'vue-tabler-icons'
import CategoryView from "@/components/MyProducts/Categories/CategoryView";
import ProductView from "@/components/MyProducts/Products/ProductView";
import {mapActions} from "vuex";
import CreateNewCategory from "@/components/MyProducts/CreateNewCategory";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import CreateNewProduct from "@/components/MyProducts/CreateNewProduct";

export default {
  name: 'MyProducts',
  components: {
    CreateNewProduct,
    RedStrokeButton, CreateNewCategory, ProductView, CategoryView, BlueButton, PlusIcon, AppleIcon, ChevronLeftIcon},
  data(){
    return{
      isNewCategory: false,
      isNewProduct: false,
      isOpacity: false,
      translate: 0,
      difference: 0
    }
  },
  methods: {
    change_translate () {
      if (this.difference === 0){
        this.difference = this.translate
      } else this.difference = 0
      console.log(this.$refs.product_view.clientWidth)
    },
    onResize() {
      this.translate = window.innerWidth
    },
    show_hide_opacity () {
      this.isNewCategory = false;
      this.isNewProduct = false;
      this.isOpacity = this.isOpacity !== true
    },
    show_hide_new_category () {
      this.isNewCategory = true
      this.isOpacity = true
    },
    show_hide_new_product() {
      this.isNewProduct = true
      this.isOpacity = true
    },
    ...mapActions(['GET_USER_CATEGORIES', 'GET_ALL_USER_DATA'])
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    if (window.innerWidth < 420) this.$refs['create_new_category'].textContent = 'New Category'
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    cssVars(){
      let display = 'none'
      if (this.difference > 0) display = 'block'
      return{
        '--product-translate': - this.translate + this.difference + 'px',
        '--product-display': display
      }
    },
    selected_category_name () {
      return this.$store.state.state.selected_category.category_name
    }
  },
  created() {
    this.GET_USER_CATEGORIES(this.$store.state.state.user_id)
    if (process.browser){
      this.translate = window.innerWidth
    }
  },
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
  padding: 0;
  left:0;
  top: 0;
  z-index: 1003;
}

.MyProducts{
  width: 100%;
}

.navigation-bar {
  display: flex;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

#title{
  font-size: 25px;
  font-weight: bold;
  flex: 1;
  justify-self: flex-start;
}

#create-category{
  padding: 8px 10px;
  translate: (-15px);

}

#create-product{
  padding: 6px 10px;
}

.ico{
  margin-right: 5px;
}

.content{
  width: 100%;
  display: flex;
}

.buttons{
  display: flex;
}

.back-to-categories{
  display: none;
}

@media (max-width: $tab-size) {
  #title {
    flex: 0.8;
  }

  #create-category {
    translate: (-4%);
  }
}

@media (max-width: $phone-size){

  .buttons{
    translate: var(--category-translate);
    transition: 0.3s ease-in-out;
    margin-top: 36px;
    width: 100%;
  }

  #create-product, #create-category{
    flex: 1;
    padding: 12px;
  }

  #category-view{
    width: 100% ;
    translate: var(--category-translate);
    transition: 0.3s ease-in-out;
    margin-right: 0;
    //width: calc();
  }

  #product-view{
    position: absolute;
    //transform: translateX(414px);
    translate: var(--product-translate);
    //display: var(--product-display);
    transition: 0.3s ease-in-out;
    width: calc(100% - 32px);
    height: 70%;
  }

  .navigation-bar{
    margin-bottom: 24px;
    padding: 16px 16px 0;
  }

  .back-to-categories{
    display: flex;
    position: absolute;
    top: 100px;
    //transform: translateY(85px);
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    translate: var(--product-translate);
    //display: var(--product-display);
    transition: 0.3s ease-in-out;
  }

  #create-new-product, #create-new-category{
    width: 90%;
    padding: 30px 24px;
    height: fit-content;
    //height: 85%;
  }


  #test{
    font-size: 32px;
  }

  .content{
    padding: 0 16px;
  }
}

</style>

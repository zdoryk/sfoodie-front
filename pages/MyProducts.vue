<template>
  <div class="MyProducts">
    <div class="navigation-bar">
      <div id="title">My Products</div>
      <div class="button">
        <blue-button id="create-category" @click.native="isNewCategory = !isNewCategory">
          <plus-icon class="ico"/>
          Create category
        </blue-button>
        <red-stroke-button id="create-product" @click.native="isNewProduct = !isNewProduct">
          <apple-icon class="ico"/>
          New Product
        </red-stroke-button>
      </div>
    </div>
    <div class="content">
      <category-view />
      <product-view />
    </div>
    <create-new-product v-if="isNewProduct"></create-new-product>
    <div class="opacity" v-if="isNewCategory" @click="isNewCategory = !isNewCategory"/>
    <div class="opacity" v-if="isNewProduct" @click="isNewProduct = !isNewProduct"/>
    <create-new-category v-show="isNewCategory" />
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {PlusIcon, AppleIcon} from 'vue-tabler-icons'
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
    RedStrokeButton, CreateNewCategory, ProductView, CategoryView, BlueButton, PlusIcon, AppleIcon},
  data(){
    return{
      isNewCategory: false,
      isNewProduct: false,
    }
  },
  methods: {
    ...mapActions(['GET_ALL_USER_DATA']),
    hide_category_creation () {
      this.isNewCategory = false
      this.isNewProduct = false
    }
  },
  created() {
    this.GET_ALL_USER_DATA(1)
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

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
  padding: 16px 16px 0;
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
  padding: 0 16px;
  width: 100%;
  display: flex;
}

.button{
  display: flex;
}

  @media (max-width: $tab-size) {
    #title {
      flex: 0.8;
    }

    #create-category {
      translate: (-4%);
    }

  }

</style>

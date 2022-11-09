<template>
  <div class="MyProducts">
    <div class="navigation-bar">
      <div id="title">My Products</div>
      <div class="button">
        <blue-button id="create-category">
          <plus-icon class="ico"/>
          Create category
        </blue-button>
      </div>
    </div>
    <div class="content">
      <category-view />
      <product-view />
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {PlusIcon} from 'vue-tabler-icons'
import CategoryView from "@/components/MyProducts/Categories/CategoryView";
import ProductView from "@/components/MyProducts/Products/ProductView";

export default {
  name: 'MyProducts',
  components: {ProductView, CategoryView, BlueButton, PlusIcon},
}
</script>

<style scoped>

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
}

.content{
  padding: 0 16px;
  width: 100%;
  display: flex;


}

</style>

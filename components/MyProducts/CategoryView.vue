<template>
  <div id="category-view">
    <category-item
      v-for="(value, key, index) in categories"
      :key="index"
      :category_data="value"
      v-model="activeCategory"
    />

  </div>
</template>

<script>
import CategoryItem from "@/components/MyProducts/CategoryItem";

export default {
  name: "CategoryView",
  components: {CategoryItem},
  data () {
    return {
      // category_items: [
      //   {
      //     category_name: "All Products",
      //     products: [1, 2, 3, 4, 5, 6]
      //   },
      //   {
      //     category_name: "Fruits",
      //     products: [2, 4, 5]
      //   }
      // ],
      activeCategory: this.$store.state.state.selected_category.category_name
    }
  },
  computed: {
    categories () {
      return this.$store.state.state.existing_categories
    }
  }
}
</script>

<style scoped>
    #category-view{
      flex: 3;
      /*max-width: 460px;*/
      min-width: 300px;
      height: 300px;
      /*background-color: #696AE9;*/
      border: 1px white solid;
    }
</style>

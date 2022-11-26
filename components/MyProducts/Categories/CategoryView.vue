<template>
  <div id="category-view" v-if="categories[0] !== null">
    <category-item
      v-for="(value, key, index) in categories"
      :key="index"
      :category_data="value || 'undefined'"
      v-model="activeCategory"
    />
<!--    {{categories}}-->
<!--    <div v-if="categories[0] !== null">-->
<!--      {{ categories[0] }}-->
<!--    </div>-->
  </div>
</template>

<script>
import CategoryItem from "@/components/MyProducts/Categories/CategoryItem";

export default {
  name: "CategoryView",
  components: {CategoryItem},
  data () {
    return {
      activeCategory: this.$store.state.state.selected_category.category_name
    }
  },
  computed: {
    categories () {
      if (this.$store.state.state.existing_categories !== 'undefined') {
        let categories = Array.from(this.$store.state.state.existing_categories)
        categories.sort((a, b) => b.products.length - a.products.length)
        const other = categories.find(category => category.category_name === 'Other')
        categories.splice(categories.findIndex(category => category.category_name === 'Other'), 1);
        categories.splice(categories.length, 0, other);

        return categories
      } else return []
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

    #category-view{
      flex: 3;
      /*max-width: 460px;*/
      min-width: 300px;
      max-height: 70vh;
      min-height: 20vh;
      /*background-color: #696AE9;*/
      //border: 1px white solid;
      margin-right: 40px;
      overflow-y: scroll;
      padding-right: 5px;
    }

    @media (max-width: $tab-size) {
      #category-view{
        min-width: 250px;
        margin-right: 20px;

      }

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

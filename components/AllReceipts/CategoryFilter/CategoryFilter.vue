<template>
  <div class="category-filter">
    <div class="category-filter-input-wrapper" @click="isPopUpVisible ? notToClose() : closeOpen()">
      <input id="category-filter-input" placeholder="Category filter" v-model="inputValue" autocomplete="off">
      <div class="apple-ico">
        <apple-icon class="ico filter-ico"/>
      </div>
    </div>
    <category-filter-pop-up id='pop-up' :style="cssVars" v-bind:visible="isPopUpVisible"
                               :selected_categories="selected_categories"/>
  </div>
</template>

<script>
import { AppleIcon } from 'vue-tabler-icons';
// import PriceRangeFilterPopUp from "@/components/AllReceipts/PriceFilter/PriceRangeFilterPopUp";
import CategoryFilterPopUp from "@/components/AllReceipts/CategoryFilter/CategoryFilterPopUp";

export default {
  name: "CategoryFilter",
  components: {CategoryFilterPopUp, AppleIcon},
  beforeMount() {
    this.selected_categories = this.$store.state.state.existing_categories.map(category => {
      return {
        category_name: category.category_name,
        state: false
      }
    }).reduce((acc, item) => {
      acc[item.category_name] = item.state
      return acc
    }, {})
  },
  data(){
    return{
      isPopUpVisible: false,
      height: 0,
      max_height: window.document.documentElement.clientHeight,
      margin: '0 16px',
      inputValue: '',
      selected_categories: {},
    }
  },
  methods: {
    set_category_state(new_selected_categories) {
      this.selected_categories = new_selected_categories
      const list_of_categories = Object.entries(new_selected_categories).filter(([key,value]) => value === true).map(([key]) => key)
      this.inputValue = list_of_categories.length + " categories selected"
      this.$parent.set_categories_to_include(list_of_categories)
      // this.selected_categories[category_name] = state
    },

    closeOpen() {
      console.log('Closed )');
      this.height = 0
      this.padding = '24px'
      this.isPopUpVisible = !this.isPopUpVisible;
      this.height = this.max_height / 10 * 4.3
    },

    notToClose() {
      console.log('Not closed )');
    },

    hide(){
      if (this.isPopUpVisible === true ){
        this.padding = '0 16px'
        this.height = 0
        this.isPopUpVisible = !this.isPopUpVisible;
      }
    },
    //
    // clear_price_range(){
    //   this.$parent.clear_price_range()
    //   this.clearInput()
    //   this.hide()
    // },

    clearInput(){
      this.inputValue = ''
      Object.entries(this.selected_categories).map(([key,value])=>{
        this.selected_categories[key]= false
      })
      this.$parent.set_categories_to_include([])
    },
  },
  computed:{
    cssVars() {
      return {
        '--height': this.height + 'px',
        '--padding': this.padding
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/variables";

.category-filter{
  position:relative;
  min-width: 160px;
  z-index: 2000;
}

.category-filter:hover{
  display:block
}
.category-filter:hover{
  //display:none
}

.ico{
  color: $blue;

}

.apple-ico {
  width: 24px;
  height: 24px;
  position:absolute;
  top:50%;
  right:8px;
  --webkit-transform:translateY(-50%);
  transform:translateY(-50%);
  font-size:16px;
  line-height:1;
  vertical-align:middle
}

#category-filter-input{
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
  border: 1px solid rgba(105, 106, 233, 0.2);
  border-radius:4px;
  font-family: Poppins, sans-serif;
  caret-color: transparent;
  cursor: pointer;
  //opacity: 0.2;
}

#category-filter-input:hover{
  border: 1px solid $blue;
}

#category-filter-input:focus{
  outline: none;
  border: 1px solid $blue;
}

#category-filter-input:focus::-webkit-input-placeholder{
  color: #edefff;
}


#pop-up{
  height: var(--height);
  padding: var(--padding);
  transition-property: height, padding;
  transition-duration: 0.15s;
  z-index: 1001;
  //transition: 0.2s ease-in-out;
}

@media (max-width: $phone-size) {
  #pop-up{
    right: auto;
  }
}

</style>

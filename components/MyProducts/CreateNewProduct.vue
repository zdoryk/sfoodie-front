<template>
  <div id="create-new-product">
    <div class="title">
      New Product
    </div>
    <div class="content width-full">
      <div class="product-name-input width-full">
        <div class="name-label label width-full">
          Product name
        </div>
        <div class="error" :style="input_error_styles">
          <input class="width-full email-input" type="text" :style="input_error_styles" placeholder="Name your product" v-model="product_name">
        </div>
        <!--        <div class="error-text">-->
        <!--          Error: duplicate category name.-->
        <!--        </div>-->
      </div>
      <div class="category-select width-full" >
        <div class="category-select-label label width-full">
          Select category
        </div>
        <custom-select :product='product'>
        </custom-select>
      </div>
    </div>
    <div class="buttons">
      <red-stroke-button class="buttons" @click.native="hide">
        Cancel
      </red-stroke-button>
      <blue-button :style="input_error_styles" class="button" @click.native="create_new">
        Save product
      </blue-button>
    </div>
  </div>
</template>

<script>
import ButtonColor from "@/components/MyProducts/ButtonColor";
import ButtonIcon from "@/components/MyProducts/ButtonIcon";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import BlueButton from "@/components/UI/BlueButton";
import {mapActions} from "vuex";
import CustomSelect from "@/components/MyProducts/CustomSelect";

export default {
  name: "CreateNewProduct",
  components: {ButtonIcon, ButtonColor, RedStrokeButton, BlueButton, CustomSelect},
  data(){
    return{
      product_name: '',
      category_name: '',
      product_name_is_fine: false
    }
  },
  mounted() {
    this.category_name = (' ' + this.product.product_category).slice(1)
  },
  computed: {
    product(){
      let some
      // Did this because if i want ot give to user to change the colors of categories then, the color of category Other can e modified.
      this.$store.state.state.existing_categories.map(function (category) {
        if (category.category_name === 'Other'){
          some = {product_category: category.category_name, color: category.color}
        }
      })
      return some
    },

    input_error_styles () {
      if (this.product_name.length === 0){
        this.product_name_is_fine = false
        return {'--content': JSON.stringify('Please enter product name'),
          '--border-color': '#FF5252',
          '--back-color': '#696AE9',
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      let categories_products = (Array.from((this.$store.state.state.existing_categories[0].products))).map(product => product.product_name.toLowerCase())
      if (categories_products.includes(this.product_name.toLowerCase())){
        this.product_name_is_fine = false
        return {
          '--content': JSON.stringify('There is a product with this name'),
          '--border-color': '#FF5252',
          '--back-color': '#696AE9',
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      this.product_name_is_fine = true
      return {
        '--content': '',
        '--border-color': '#282932',
        '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
        '--back-color': '#5D5FEF',
        '--cursor': 'pointer',
        '--opacity': '1'
      }
    }

  },
  methods: {
    ...mapActions(['POST_NEW_PRODUCT','GET_USER_CATEGORIES']),
    hide(){
      this.$parent.show_hide_opacity()
    },
    change_category_name(name){
      this.category_name = name.slice(2)
    },
    create_new(){
      this.POST_NEW_PRODUCT({
        user_id: this.$store.state.state.user_id,
        new_category_name: this.category_name,
        new_product_name: this.product_name
      })
      this.GET_USER_CATEGORIES(this.$store.state.state.user_id)
      this.hide()
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";




#create-new-product{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 40px;

  position: absolute;
  width: 428px;
  height: 428px;
  z-index: 1004;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;

  background: $grey-background;

  box-shadow: 0 0 -4px 40px #1B1C22;
  border-radius: 8px;
}

.title{
  font-family: 'Poppins',sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;

  color: #EDEFFF;
}

.content{
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.width-full{
  width: 100%;
}

.email-input{
  padding: 6px 12px;
  border-radius: 4px;
  background-color: $grey-input-background;
  border: 1px solid var(--border-color);
  color: $white;
}

.email-input::placeholder{
  //color: #FF5252;
  //opacity: 0.7;
}

.error{
  position: relative;
}

.email-input:focus{
  outline: none;
  border: 1px solid $blue;
}

.email-input:hover{
  border: 1px solid $blue;
}

.error::after {
  //background-color: $line;
  border-radius: 10px;
  color:#FF5252;
  //padding: 10px 15px;
  position: absolute;
  text-align: center;
  font-size: 14px;
  //width: 150px;
  //content: 'Something';
  content: var(--content);
  top: 0;
  left: 0;
  transform: translate(0,190%);
  z-index: 1005;
}


.label{
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
}

.buttons{
  display: flex;
  gap: 16px;
  width: 100%;
}

.button{
  width: 100%;
  display: flex;
}

.error-text{
  font-size: 14px;
  color: #FF5252;
}

.bttn{
  cursor: var(--cursor);
  opacity: var(--opacity);
}

.bttn.bttn:hover{
  box-shadow: var(--box-shadow);
  background-color: var(--back-color);
}



</style>

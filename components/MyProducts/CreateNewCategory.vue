<template>
  <div id="create-new-category">
    <div class="title">
      Create Category
    </div>
    <div class="content width-full">
      <div class="category-name-input width-full">
        <div class="name-label label width-full">
          Name of category
        </div>
        <div class="error" :style="input_error_styles">
          <input class="width-full name-input" type="text" :style="input_error_styles" placeholder="Name your category" v-model="category_name">
        </div>
<!--        <div class="error-text">-->
<!--          Error: duplicate category name.-->
<!--        </div>-->
      </div>
      <div class="color-select width-full" >
        <div tabindex="0" class="color-label label width-full">
          Select color
        </div>
        <div class="colors">
          <button-color
            v-for='(value, index) in colors'
            :key="index"
            v-model="activeColor"
            :colorData="{color: value, index: index}"
          >
          </button-color>
        </div>
      </div>
      <div class="icon-select width-full">
        <div class="color-label label width-full">
          Select Icon
        </div>
        <div class="icons">
          <button-icon
            v-for="(value, index) in icons"
            :key="index"
            v-model="activeIcon"
            :iconData="{icon_name: value, index: index}"
          >
          </button-icon>
        </div>
      </div>
    </div>
    <div class="buttons">
      <red-stroke-button class="buttons" @click.native="hide">
        Cancel
      </red-stroke-button>
      <blue-button :style="input_error_styles" class="button" @click.native="create_new">
        Save category
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
export default {
  name: "CreateNewCategory",
  components: {ButtonIcon, ButtonColor, RedStrokeButton, BlueButton},
  data(){
    return{
      category_name: '',
      activeColor: '#E7C074',
      activeIcon: 'cafes',
      category_name_is_fine: false
    }
  },
  computed: {
    colors (){
      return this.$store.state.state.color_palette
    },
    icons (){
      return this.$store.state.state.icons
    },
    // input_border_color () {
    //   if (this.category_name.length === 0) return {'--border-color': '#FF5252'}
    //   else return {'--border-color': '#282932'}
    // },
    input_error_styles () {
      if (this.category_name.length === 0){
        this.category_name_is_fine = false
        return {'--content': JSON.stringify('Please enter category name'),
          '--border-color': '#FF5252',
          '--back-color': '#696AE9',
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      let categories_names = Array.from(this.$store.state.state.existing_categories)
      categories_names = categories_names.map(category => category.category_name.toLowerCase())
      if (categories_names.includes(this.category_name.toLowerCase())){
        this.category_name_is_fine = false
        return {
          '--content': JSON.stringify('There is category with this name'),
          '--border-color': '#FF5252',
          '--back-color': '#696AE9',
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      this.category_name_is_fine = true
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
    ...mapActions(['POST_NEW_CATEGORY', 'GET_USER_CATEGORIES']),
    hide(){
      this.$parent.show_hide_opacity()
    },
    create_new(){
      this.POST_NEW_CATEGORY({
        user_id: this.$store.state.state.user_id,
        ico: this.activeIcon,
        color: this.activeColor,
        category_name: this.category_name
      })
      console.log({
        user_id: this.$store.state.state.user_id,
        new_icon_name: this.activeIcon,
        new_color_name: this.activeColor,
        new_category_name: this.category_name
      })
      this.GET_USER_CATEGORIES(this.$store.state.state.user_id)
      this.hide()
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";


  #create-new-category{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 40px;

    position: absolute;
    width: 428px;
    height: 628px;
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

  .name-input{
    padding: 6px 12px;
    border-radius: 4px;
    background-color: $grey-input-background;
    border: 1px solid var(--border-color);
    color: $white;
  }

  .name-input::placeholder{
    //color: #FF5252;
    //opacity: 0.7;
  }

  .error{
    position: relative;
  }

  .name-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  .name-input:hover{
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

  .colors, .icons{
    gap: 11px;
    display: flex;
    flex-wrap: wrap;
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

  @media (max-width: $phone-size) {
    .button-color,.button-icon{
      width: 30px;
      height: 30px;
    }



  }



</style>

<template>
  <div id="create-new-category" v-if="afterCreation > 0">
    <div class="title">
      Create Category
    </div>
    <div class="content width-full">
      <div class="category-name-input width-full">
        <div class="name-label label width-full">
          Name of category
        </div>
        <input class="width-full name-input" type="text" placeholder="Name of category" v-model="category_name">
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
            v-for="(value, index) in ['drinks','fish', 'greens', 'pizza', 'snacks', 'wine','apple', 'carrot', 'milk', 'drumstick', 'baguette', 'bowl', 'cafes', 'candy']"
            :key="index"
            v-model="activeIcon"
            :iconData="{icon_name: value, index: index}"
          >
          </button-icon>
        </div>
      </div>
    </div>
    <div class="buttons">

    </div>
  </div>
</template>

<script>
import ButtonColor from "@/components/MyProducts/ButtonColor";
import ButtonIcon from "@/components/MyProducts/ButtonIcon";
export default {
  name: "CreateNewCategory",
  components: {ButtonIcon, ButtonColor},
  data(){
    return{
      category_name: '',
      activeColor: '',
      activeIcon: '',
      afterCreation: 0
    }
  },
  beforeCreate() {
    this.afterCreation = 0
  },
  mounted() {
    this.afterCreation = 1
  },
  computed: {
    colors (){
      return this.$store.state.state.color_palette
    }
  },
  methods: {
    test(value){
      console.log(value)
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
    left: 506px;
    top: 98px;

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
    border: 1px solid $grey-input-background;
    color: $white;
  }

  .name-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  .name-input:hover{
    border: 1px solid $blue;
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


</style>

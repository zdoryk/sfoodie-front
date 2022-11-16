<template>
  <div
    class="button-icon"
    @click="changeActive"
    :class="{'active-color' : this.iconData.icon_name === this.activeIcon}"
    tabindex="0"
  >
    <img :src="icon">
  </div>
</template>

<script>
import * as icons from "assets/categories_svgs";

export default {
  name: "ButtonIcon",
  props: ['activeIcon', 'iconData'],
  model: {
    prop: 'activeIcon',
    event: 'onUpdateIcon'
  },
  methods: {
    changeActive () {
      console.log('change')
      this.$emit('onUpdateIcon', this.iconData.icon_name)
    },
  },
  computed: {
    // cssVars () {
    //   return{
    //     '--component-color': this.iconData.color
    //   }
    // },
    icon() {
      // if (this.iconData !== 'undefined') return icons[this.category_data.ico]
      return icons[this.iconData.icon_name]
    },
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
  img{
    width: 32px;
    height: 32px;
    opacity: 0.7;
    transition: 0.1s ease-in-out;
  }

  .button-icon{
    width: 40px;
    height: 40px;
    border-radius: 4px;
    outline: none;
    //background-color: $;
    transition: 0.1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .active-color{
    border-radius: 6px;
    box-shadow: 0 0 0 2px #696AE9;

    img{
      opacity: 1;
    }
  }

</style>

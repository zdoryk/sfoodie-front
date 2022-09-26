<template>
  <button class="bttn" v-on:click="changeHamburger">
    <slot></slot>
  </button>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'add-new-product-button',
  methods: {
    ...mapActions(["CHANGE_HAMBURGER_STATE_ACTION"]),
    changeHamburger(){
      this.CHANGE_HAMBURGER_STATE_ACTION()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "assets/variables";

  .bttn {
    color: $white;
    background-color: $blue;
    display: flex;
    align-items: center;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    justify-content: center;
  }

  .bttn:hover{
    transition: 0.3s ease-out;
    box-shadow: 0 0 20px $blue-shadow;
    background-color: $blue-dark;
    border-radius: 4px;
  }

</style>

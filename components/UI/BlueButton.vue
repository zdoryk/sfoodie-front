<template>
  <button class="bttn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'blue-button'
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
    transition: all 0.3s ease-in-out;
  }

  .bttn:hover{
    box-shadow: 0 0 20px $blue-shadow;
    background-color: $blue-dark;
  }

</style>

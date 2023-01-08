<template>
  <button class="blue-stroke-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'blue-stroke-button'
}
</script>

<style scoped lang="scss">

@import 'assets/variables';

.blue-stroke-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 1px solid $light-blue;
  color: $light-blue;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

}

.blue-stroke-button:hover{
  border-radius: 4px;
  background: $light-blue-dark;
  box-shadow: 0 0 20px $light-blue-shadow;
  color: $white;
}

</style>

<template>
  <button class="red-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'red-button'
}
</script>

<style scoped lang="scss">

@import 'assets/variables';

.red-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 1px solid $peach;
  color: $peach;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
}

.red-button:hover{
  transition: 0.3s ease-out;
  border-radius: 4px;
  background: $peach;
  box-shadow: 0 0 20px $peach-shadow;
  color: $white;
}

</style>

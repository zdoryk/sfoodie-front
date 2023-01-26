<template>
  <button class="red-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "red-button",
};
</script>

<style scoped lang="scss">
@import "assets/variables";

.red-button {
  color: $white;
  background-color: $accents-red;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.red-button:hover {
  box-shadow: 0 0 20px $peach-shadow;
  background-color: $accents-red-dark;
  border-radius: 4px;
}
</style>

<template>
  <button class="cross-button">
    <x-icon class="ico" />
  </button>
</template>

<script>
import { XIcon } from "vue-tabler-icons";

export default {
  name: "CrossButton",
  components: { XIcon },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

.cross-button {
  width: 24px;
  height: 24px;
  border: 1.5px solid $peach;
  color: $peach;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: transparent;
  padding: 0;
  transition: all 0.3s ease-in-out;

  > svg {
    vertical-align: unset;
  }
}

.cross-button:hover {
  background: $peach;
  color: $white;
  border: 1.5px solid $peach;
  box-shadow: 0 0 20px $peach-shadow;
  border-radius: 4px;
}
</style>

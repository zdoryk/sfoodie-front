<template>
  <button class="chevron-down-button">
    <slot></slot>
    <chevron-down-icon v-if="isOpened === false" class="ico" />
    <chevron-up-icon v-if="isOpened" class="ico" />
  </button>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "vue-tabler-icons";

export default {
  name: "ChevronDownButton",
  components: { ChevronDownIcon, ChevronUpIcon },
  props: {
    isOpened: false,
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

.chevron-down-button {
  width: 100%;
  height: 32px;
  color: $white;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: transparent;
  padding: 0;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

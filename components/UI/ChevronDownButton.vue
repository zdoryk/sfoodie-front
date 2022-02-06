<template>
  <button class="chevron-down-button">
    <slot></slot>
    <chevron-down-icon class="ico"/>
  </button>
</template>

<script>
import {ChevronDownIcon} from "vue-tabler-icons"

export default {
  name: "ChevronDownButton",
  components: {ChevronDownIcon}
}
</script>

<style scoped>

.chevron-down-button {
  width: 100%;
  height: 32px;
  color: #edefff;
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

<template>
  <button class="cross-button">
    <x-icon class="ico"/>
  </button>
</template>

<script>
import { XIcon } from 'vue-tabler-icons';

export default {
  name: "CrossButton",
  components: {XIcon},
}
</script>

<style scoped lang="scss">
.cross-button {
  width: 24px;
  height: 24px;
  border: 1.5px solid #ED957D;
  color: #ED957D;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: transparent;
  padding: 0;

  > svg {
    vertical-align: unset;
  }
}


.cross-button:hover{
  transition: 0.3s ease-out;
  background: #ED957D;
  color: #edefff;
  border: 1px solid #ED957D;
  box-shadow: 0 0 20px rgba(242, 139, 112, 0.3);
  border-radius: 4px;
}

</style>

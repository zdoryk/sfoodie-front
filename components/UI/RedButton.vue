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

<style scoped>


.red-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 1px solid #ED957D;
  color: #ED957D;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
}

.red-button:hover{
  transition: 0.3s ease-out;
  border-radius: 4px;
  background: #ED957D;
  box-shadow: 0 0 20px rgba(242, 139, 112, 0.3);
  color: #edefff;
}

</style>

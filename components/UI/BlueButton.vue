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

<style scoped>


  .bttn {
    color: #EDEFFF;
    background-color: #696AE9;
    display: flex;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    justify-content: center;
  }

  .bttn:hover{
    transition: 0.3s ease-out;
    box-shadow: 0 0 20px rgba(105, 106, 233, 0.2);
    background-color: #5D5FEF;
    border-radius: 4px;
  }

</style>

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
    padding: 10px 15px;
    width: 200px;
    color: #EDEFFF;
    background-color: #696AE9;
    display: flex;
    font-size: 15px;
    border: none;
    border-radius: 4px;
  }

  .bttn:hover{
    transition: 0.3s ease-out;
    box-shadow: 0px 0px 20px rgba(105, 106, 233, 0.2);
    background-color: #5D5FEF;
    border-radius: 4px;
  }

</style>

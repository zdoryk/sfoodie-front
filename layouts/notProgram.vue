<template>
  <div id="main-window">
    <div id="main">
      <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginSignUp"
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  @import "assets/variables";

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: $grey-input-background;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: $blue;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: $blue;
  }

  #main-window {
    min-height: 100vh;
    //height: 100vh;
    width: 100%;
    display: flex;
  }

  #main {
    width: 100%;
    padding: 0;
    background-color: $black;
    color: $white;
    display: flex;
    flex: 1 1 0;
    justify-content: center;
  }

  .total-amount,.total-price, .product-price, .product-name, .text {
    color: $grey;
    font-family: Poppins, sans-serif;
    //font-weight: 600;
  }

  .total-amount, .product-name {
    font-size: 16px;
    font-weight: 400;
  }

  .total-price{
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
  }

  .product-price {
    font-weight: 600;
    font-size: 16px;
  }

  @media (max-width: $tab-size){

    #main {
      padding: 30px;
    }

    #side-bar{
      position: fixed;
      top: 0;
      left: -300px;
      height: 100vh;
      width: 100%;
      max-width: 300px;
      transition: 0.2s linear;
    }

    #side-bar.active.active {
      left: 0;
    }

  }

  @media (max-width: $phone-size){

    #side-bar{
      position: fixed;
      top: 0;
      left: -300px;
      height: 100vh;
      width: 100%;
      transition: 0.2s linear;
    }

    #side-bar.active.active {
      left: 0;
    }

    #main {
      padding: 0;
    }

  }

  body{
    overflow: auto;
    height: fit-content;
  }

  html{
    //height: fit-content;
  }

  * {
    font-family: Poppins, sans-serif;
  }
</style>




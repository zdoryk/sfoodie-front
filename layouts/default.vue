<template>
    <div id="main-window">
        <SideBar/>
        <div id="main">
          <nuxt/>
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/SideBar/SideBar.vue'
    export default {
        components: {
            SideBar
        },
        name: "layout"
    }
</script>


<style lang="scss">
    @import "assets/variables";

    #main-window {
        min-height: 100vh;
        height: 100%;
        width: 100%;
        display: flex;
    }

    #main {
      width: 100%;
      padding: 40px;
      background-color: $black;
      color: $white;
      display: flex;
      justify-content: center;
    }

    .total-amount,.total-price, .product-price, .product-name {
      color: $grey;
      /*font-family: Poppins;*/
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


</style>

<template>
    <div id="main-window">
        <SideBar id="side-bar" :class="{active: isActive}"/>
        <div class="menu-toggle" v-on:click="isActive = !isActive" :class="{active: isActive}">
          <div class="hamburger" >
            <span></span>
          </div>
        </div>
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
        name: "layout",
        data() {
          return {
            isActive: false
          }
        },
    }

</script>


<style lang="scss">
    @import "assets/variables";


    #main-window {
        min-height: 100vh;
        height: 100vh;
        width: 100%;
        display: flex;
    }

    #main {
      width: 100%;
      padding: 40px;
      background-color: $black;
      color: $white;
      display: flex;
      flex: 1 1 0;
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

    .menu-toggle{
      display: none;
      position: fixed;
      top: 7px;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 99px;
      //background-color: #2e3047;
      cursor: pointer;
    }

    .hamburger {
      position: relative;
      top: calc(50% - 1px);
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
    }

    .hamburger > span,
    .hamburger > span::before,
    .hamburger > span::after {
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      border-radius: 99px;
      background-color: #FFF;
      transition-duration: .25s;
    }

    .hamburger > span::before {
      content: '';
      top: -8px;
    }
    .hamburger > span::after {
      content: '';
      top: 8px;
    }

    .menu-toggle.active.active .hamburger > span {
      transform: rotate(45deg);
    }
    .menu-toggle.active.active .hamburger > span::before {
      top: 0;
      transform: rotate(0deg);
    }
    .menu-toggle.active.active .hamburger > span::after {
      top: 0;
      transform: rotate(90deg);
    }

    @media (max-width: 1024px){
      #side-bar{
        max-width: 200px;
      }
    }

    @media (max-width: 800px){
      .menu-toggle{
        display: block;
      }

      #main {
        padding: 0;
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

    @media (max-width: 420px){
      .menu-toggle{
        display: block;
      }


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

    }

</style>

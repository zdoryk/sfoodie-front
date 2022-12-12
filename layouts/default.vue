<template>
    <div id="main-window">
        <SideBar id="side-bar" :class="{active: checkState}"/>
<!--        <div class="menu-toggle" v-on:click="isActive = !isActive" :class="{active: isActive}">-->
<!--          <div class="burger" >-->
<!--            <span></span>-->
<!--          </div>-->
<!--        </div>-->
        <Burger/>
        <div id="main">
          <nuxt/>
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/SideBar/SideBar.vue'
    import Burger from "@/components/SideBar/Burger";
    import {mapActions} from "vuex";
    import jwt from "vue-jwt-decode";
    export default {
        components: {
          Burger,
            SideBar
        },
        name: "layout",
        data() {
          return {
            isActive: false,
          }
        },
        mounted() {
        },
      methods: {...mapActions(['GET_ALL_USER_DATA'])},
        created() {
          console.log(this.$store.state.state.access_token)

          const decoded = jwt.decode(this.$store.state.state.access_token)
          this.$store.commit('AUTH_MUTATIONS_SET_USER', {user_id: decoded.user_id, email: decoded.sub})
          // this.GET_ALL_USER_DATA()
        },
        computed: {
          checkState() {
            return this.$store.state.state.isHamburger
          },
        }
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
      padding: 40px;
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
      overflow: hidden;
    }

    * {
      font-family: Poppins, sans-serif;
    }
</style>



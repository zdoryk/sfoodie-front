<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        Info
      </div>
      <div class="email">Email</div>
      <input type="text" v-model="email_address">
      <div class="pass">password</div>
      <input type="text" v-model="password">
      <div class="buttons">
        <blue-button @click.native="authentificate">Login</blue-button>
        <red-stroke-button @click.native="get_me"> Get me </red-stroke-button>
        <red-button @click.native="log_out">Log out</red-button>
      </div>
      <p v-for="(key, index) in Object.values(this.currency_data)" :key="index">{{key.symbol}}</p>



    </div>

</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {mapActions} from "vuex";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import RedButton from "@/components/UI/RedButton";
import currencyData from "assets/currency.json";

export default {
  name: 'Info',
  components: {RedButton, RedStrokeButton, BlueButton},
  data(){
    return{
      email_address: "nice.zdorik@gmail.com",
      password: "a0504905922A",
      currency_symbol: null,
      currency_data: currencyData
    }
  },
  mounted() {
    console.log(currencyData['USD'])
  },
  methods: {
    ...mapActions(['LOGIN', 'GET_ME', 'LOGOUT']),
    authentificate(){
      this.LOGIN({email: this.email_address, password: this.password})
    },
    get_me () {
      console.log(this.$store.state.state.access_token)
      this.GET_ME(this.$store.state.state.access_token)
    },
    log_out(){
      this.LOGOUT()
    },

  }
}
</script>

<style scoped>

  h1{
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 15px;
  }

  .buttons{
    display: flex;
    /*width: 300px;*/
    /*justify-content: space-between;*/
    margin-top: 10px;
    gap: 10px;
  }
</style>

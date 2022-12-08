<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        Info
      </div>
      <div class="email">Email</div>
      <input type="text" v-model="email_address">
      <div class="pass">password</div>
      <input type="text" v-model="password">
      <blue-button @click.native="authentificate">Click</blue-button>
      <red-stroke-button @click.native="get_me"> Click </red-stroke-button>
    </div>

</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {mapActions} from "vuex";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
export default {
  name: 'Info',
  components: {RedStrokeButton, BlueButton},
  data(){
    return{
      email_address: "nice.zdorik@gmail.com",
      password: "a0504905922A"
    }
  },
  methods: {
    ...mapActions(['LOGIN', 'GET_ME']),
    authentificate(){
      this.LOGIN({email: this.email_address, password: this.password})
    },
    get_me () {
      console.log(this.$store.state.state.access_token)
      this.GET_ME(this.$store.state.state.access_token)
    }

  }
}
</script>

<style scoped>

h1{
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 15px;
}
</style>

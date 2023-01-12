<template>
  <div class="login">
    <div class="content">
      <div class="title">Login</div>
      <div class="inputs">
        <div class="label">Email</div>
        <input id="email-input" type="email" v-model="email_address" v-on:keyup.enter="authentificate">
        <div class="label">Password</div>
        <input id="password-input" type="password" v-model="password" v-on:keyup.enter="authentificate">
      </div>
      <div class="footer">
        <blue-button :disabled="isError" :style="buttonStyle" id="login-button" @click.native="authentificate">{{buttonText}}</blue-button>
        <p>Don't have an account?</p>
        <nuxt-link id="sign-up-link" to="/SignUp"><p class="link-text">Create new one!</p></nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import {mapActions} from "vuex";
export default {
  name: "Login",
  components: {BlueButton},
  layout: 'notProgram',
  data(){
    return{
      // email_address: "d.zdorik@gmail.com",
      email_address: "",
      password: "",
      buttonText: 'Log in',
      isError: false
      // password: "a0504905922A"
    }
  },
  methods: {
    ...mapActions(['LOGIN', 'GET_ME']),
    async authentificate() {
      try {
        await this.LOGIN({email: this.email_address, password: this.password})
      } catch (error) {
        console.log(error)
        if (error === 'Incorrect username or password'){
          this.isError = true
          setTimeout(() => {
            this.isError = false

          }, 4000);
        }
      }
      // this.$nuxt.context.app.router.push('/program/AddNewReceipt')
    },
  },
  computed: {
    buttonStyle(){
      if (this.isError){
        this.buttonText = 'Incorrect username or password'
        return {
          '--back-color': '#FF5252',
          '--opacity': '1'
        }
      }
      this.buttonText = 'Login'
      return{
        '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
        '--back-color': '#5D5FEF',
        // '--cursor': 'pointer',
        '--opacity': '1'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
  #login-button{
    padding: 12px;
    opacity: var(--opacity);
    background-color: var(--back-color);
    transition: all 0.3s ease-in-out;
  }

  #login-button:hover{
    background-color: var(--back-color);
    box-shadow: var(--box-shadow);

  }

  .login{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 40px;
  }

  .content{
    background-color: $grey-background;
    width: 400px;
    //height: 60vh;
    padding: 40px;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    --webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .title{
    font-size: 24px;
    font-weight: 900;
    display: flex;
    justify-content: center;
  }

  .inputs{
    margin-top: 32px;
    //display: ;
  }

  .label{
    user-select: none;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none;
    color: $grey;
  }

  input{
    padding: 6px 12px;
    border-radius: 4px;
    background-color: $grey-input-background;
    border: 1px solid $grey-input-background;
    color: $white;
    width: 100%;
    margin-bottom: 16px;
    margin-top: 4px;
  }
  input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  input:hover{
    border: 1px solid $blue;
  }

  .footer{
    margin-top: 8px;
  }

  #login-button{
    padding: 12px 30px;
    width: 100%;
    font-size: 16px;
    margin-bottom: 16px;
  }

  #sign-up-link{
    display: flex;
    justify-content: center;
    text-align: center;
    color: $white;
    font-size: 16px;
  }

  p{
    color: $grey;
    font-size: 14px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
  }

  .link-text{
    text-decoration: underline;
    color: $white;
  }

  @media (max-width: $phone-size){
    .content{
      width: 360px;
      padding: 32px;
    }
  }
</style>

<template>
  <div class="signup">
<!--    <div id="modal">-->
    <TransitionGroup name="fade" mode="out-in">
    <div id="modal" v-if="is_message_has_been_sent" :key="'modal'">
      <div class="title">Activation link has been sent</div>
      <div class="label">
        Please check your email also a spam for an activation link.
      </div>
    </div>
    <div class="content" v-if="!is_message_has_been_sent" :key="'content'">
      <div class="title">Sign Up</div>
      <div class="inputs">
        <div class="label">Email</div>
        <input id="email-input" type="email" v-model="email_address" @keyup.enter="sign_up">
        <div class="label">Password</div>
        <div class="error" :style="password_error" ref="password_error">
          <input
            id="password-input"
            type="password"
            v-model="password"
            @keyup.enter="sign_up"
            @focus="password_is_focused = true"
            @blur="password_is_focused = false"
          >
        </div>
        <div class="label">Repeat password</div>
        <div class="error" :style="repeat_password_error" ref="repeat_password_error">
          <input
            id="repeat-password-input"
            type="password"
            v-model="repeat_password"
            @keyup.enter="sign_up"
            @focus="repeat_password_is_focused = true"
            @blur="repeat_password_is_focused = false"
          >
        </div>
      </div>
      <div class="footer">
        <blue-button :disabled="isError || !password_is_fine || !repeat_password_is_fine || !check_length" :style="buttonStyle"  id="login-button" @click.native="sign_up">{{buttonText}}</blue-button>
        <p>Already have an account?</p>
        <nuxt-link id="sign-up-link" to="/Login"><p class="link-text">Log in</p></nuxt-link>
      </div>
    </div>
    </TransitionGroup>
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
      // password: "a0504905922A"
      repeat_password: "",
      repeat_password_is_fine: false,
      repeat_password_is_focused: true,
      password: "",
      password_is_fine: true,
      password_is_focused: true,
      buttonText: 'Sign up',
      isError: false,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      doesnt_match: {
        '--content': JSON.stringify("Password doesn't match requirements"),
        '--border-color': '#FF5252',
        '--back-color': '#696AE9',
      },
      good_pass: {
        '--content': ' ',
        '--border-color': '#66BB6A',
        '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
        '--back-color': '#5D5FEF',
      },
      is_message_has_been_sent: false
    }
  },
  methods: {
    ...mapActions(['SIGN_UP']),
    async sign_up(){
      try {
        const data = await this.SIGN_UP({email_address: this.email_address, password: this.password})
        if (data.data.detail === 'Message has been sent'){
          this.is_message_has_been_sent = true
          setTimeout(() => {
            this.is_message_has_been_sent = false
          }, 20000);
        }
      }
      catch (error){
        if (error.status === 409){
          console.log(error.data.detail)
          this.isError = true
          setTimeout(() => {
            this.isError = false

          }, 4000);

        }
      }
    },

  },
  computed: {
      buttonStyle(){
        if (this.isError){
          this.buttonText = 'Email is already used'
          return {
            '--back-color': '#FF5252',
            '--opacity': '1'
          }
        }
        if (!this.password_is_fine || !this.repeat_password_is_fine || !this.check_length){
          return {
            // '--cursor': 'default',
            '--opacity': '0.5',
            '--back-color': '#5D5FEF',
          }
        }
        this.buttonText = 'Sign up'
        return{
          '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
          '--back-color': '#5D5FEF',
          // '--cursor': 'pointer',
          '--opacity': '1'
        }
      },
    check_length(){
      return !(this.password.length < 8 || this.repeat_password.length < 8);
    },
    password_error(){
      if (this.password_is_focused){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (!this.regex.test(this.password)){
        this.password_is_fine = false
        return this.doesnt_match
      }
      this.password_is_fine = true
      return this.good_pass
    },
    repeat_password_error(){
      if (this.repeat_password_is_focused){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (!this.regex.test(this.repeat_password)){
        this.repeat_password_is_fine = false
        return this.doesnt_match
      }
      if (this.repeat_password !== this.password){
        this.repeat_password_is_fine = false
        return Object.assign({}, this.doesnt_match, {
          '--content': JSON.stringify("Passwords do not match")
        })
      }
      this.repeat_password_is_fine = true
      return this.good_pass
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";


.fade-enter-active,
.fade-leave-active
{
  transition: all 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0;
}

#modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: $grey-background;
  width: 400px;
  //height: 60vh;
  padding: 40px;
  border-radius: 8px;

  .title, .label{
    text-align: center;
  }
}

#email-input#email-input{
  border: 1px solid $black !important;
}

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

.signup{
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
  //border: 1px solid $grey-input-background;
  border: 1px solid var(--border-color);
  color: $white;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 4px;
}

.error{
  position: relative;
}

.error::after {
  //background-color: $line;
  border-radius: 10px;
  color:#FF5252;
  //padding: 10px 15px;
  position: absolute;
  text-align: center;
  font-size: 14px;
  //width: 150px;
  //content: 'Something';
  content: var(--content);
  top: 0;
  left: 0;
  transform: translate(0,190%);
  z-index: 1005;
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

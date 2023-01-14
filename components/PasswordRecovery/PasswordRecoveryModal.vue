<template>
  <div id="password-recovery-modal">
    <div id="code-modal" v-if="!is_password_updated">
      <div class="recovery-title">
        Password recovery
      </div>
      <div class="content-code">
        <div>
          <div class="label">Password</div>
          <div class="error" :style="password_error" ref="password_error">
            <input
              id="password-input"
              class="recovery-input"
              type="password"
              placeholder="Write your new password"
              v-model="password"
              @keyup.enter="send_code"
              @focus="password_is_focused = true"
              @blur="password_is_focused = false"
            >
          </div>
        </div>
        <div>
          <div class="label">Repeat password</div>
          <div class="error" :style="repeat_password_error" ref="repeat_password_error">
            <input
              id="repeat-password-input"
              class="recovery-input"
              type="password"
              placeholder="Repeat your new password"
              v-model="repeat_password"
              @keyup.enter="send_code"
              @focus="repeat_password_is_focused = true"
              @blur="repeat_password_is_focused = false"
            >
          </div>
        </div>
        <div>
          <div class="recovery-label">Code</div>
          <div class="error" :style="code_error" ref="code_error">
            <input
              class="recovery-input"
              id="number-input"
              type="number"
              maxlength="8"
              placeholder="Write a code from email message"
              @focus="code_from_input_is_focused = true"
              @blur="code_from_input_is_focused = false"
              v-model="code_from_input"
              v-on:input="check_code"
              v-on:keyup.enter="send_code"
            >
          </div>
        </div>
  <!--      <blue-button :disabled="code_from_input < 8" :style="button_style" class="recovery-button" @click.native="send_code">{{buttonText}}</blue-button>-->
      </div>
      <blue-button :disabled="isError || !password_is_fine || !repeat_password_is_fine || !check_length"
                   :style="button_style"
                   class="recovery-button"
                   @click.native="send_code"
      >
        {{buttonText}}
      </blue-button>
    </div>
    <div id="password-was-updated-modal" v-else>
      <div class="recovery-title">Password was successfully updated!</div>
      <div class="recovery-label">
        Now you can return to the login page.
      </div>
      <blue-button id="go-to-login" @click.native="redirect_to_login">Log in</blue-button>
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton.vue";

export default {
  name: "PasswordRecoveryModal",
  components: {BlueButton},
  data(){
    return{
      code_from_input: '',
      code_from_input_is_fine: true,
      code_from_input_is_focused: true,
      buttonText: 'Send',
      isError: false,
      repeat_password: "",
      repeat_password_is_fine: false,
      repeat_password_is_focused: true,
      password: "",
      password_is_fine: true,
      password_is_focused: true,
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
      is_password_updated: false
    }
  },
  props: [
    'token',
    // 'user_email'
  ],
  computed: {
    button_style(){
      if (this.is_password_updated){
        return{
          '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
          '--back-color': '#5D5FEF',
          // '--cursor': 'pointer',
          '--opacity': '1'
        }
      }
      if (this.isError){
        this.buttonText = 'Invalid code'
        return {
          '--back-color': '#FF5252',
          '--opacity': '1'
        }
      }
      this.buttonText = 'Send'
      if (this.password_is_fine && this.repeat_password_is_fine && this.check_length){
        return{
          '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
          '--back-color': '#5D5FEF',
          // '--cursor': 'pointer',
          '--opacity': '1'
        }
      }
      return {
        // '--cursor': 'default',
        '--opacity': '0.5',
        '--back-color': '#5D5FEF',
      }
    },
    check_length(){
      return !(this.password.length < 8 || this.repeat_password.length < 8 || this.code_from_input.length < 8);
    },
    is_everything_is_fine(){
      if(this.check_length && this.password_is_fine && this.repeat_password_is_fine && this.code_from_input_is_fine && !this.isError){
        return true
      }
    },
    code_error(){
      if (this.code_from_input_is_fine){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (this.code_from_input.length < 8){
        this.password_is_fine = false
        return Object.assign({}, this.doesnt_match, {
          '--content': JSON.stringify('Code consists of 8 digits')
        })
      }
      this.password_is_fine = true
      return this.good_pass
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
  },
  methods: {
    redirect_to_login(){
      this.$nuxt.$router.push('Login')
    },
    async send_code(){
      if (this.is_everything_is_fine){
        try {
          const request_data = {
            // email: this.user_email,
            token: this.code_from_input,
            password: this.repeat_password
          }
          const data = await this.$store.dispatch('SEND_CODE_FOR_RECOVERY', request_data)
          // console.log(data.data.code)
          // console.log(data)
          if (data.data.detail === "Password has been updated"){
            this.is_password_updated = true
          }
        } catch  (e) {
          console.log(e.response)
          if (e.response.status === 404){
            this.isError = true
            setTimeout(() => {
              this.isError = false

            }, 5000);
          }
        }
      }else {
        console.log('Some of the fields is not correct')
      }
    },
    check_code(event){
      if (event.target.value.length > 8) {
        this.code_from_input = this.code_from_input.slice(0, 8)
      }
      // console.log(this.code_from_input)
      // console.log(typeof this.code_from_input)
      // if (Number(this.code_from_input) === this.token){
      //   this.send_code()
      // }
    },
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";
input[type='number']{
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#code-modal, .content-code, #password-was-updated-modal{
  display: flex;
  flex-direction: column;
  gap: 24px;

}

#password-recovery-modal{
  min-height: 150px;
}

#password-was-updated-modal{
  .recovery-title, .recovery-label{
    display: flex;
    text-align: center;
    justify-content: center;
  }
  gap: 16px;
}

.content-code{
  margin-bottom: 8px;
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

input{
  margin: 0;
}

#go-to-login, .recovery-button.recovery-button{
  padding: 12px;
}

.recovery-button.recovery-button{
  opacity: var(--opacity);
  background-color: var(--back-color);
  transition: all 0.3s ease-in-out;
  width: 100%;
}

.recovery-button.recovery-button:hover{
  background-color: var(--back-color);
  box-shadow: var(--box-shadow);

}

</style>

<template>
  <div class="password-modal">

    <div class="modal-title">
      Change password
    </div>
    <div class="line"/>
    <div class="password-input-block">
      <div class="password-input-block-title">
        Old password
      </div>
      <div class="error" :style="old_error">
        <input
          class="password-input"
          type="password"
          placeholder="Write your old password"
          v-model="old"
          :style="old_error"
          @focus="old_is_focused = true"
          @blur="old_is_focused = false"
        >
      </div>
    </div>
    <div class="password-input-block">
      <div class="password-input-block-title">
        New password
      </div>
      <div class="error" :style="new_1_error">
        <input
          class="password-input"
          type="password"
          placeholder="Write your new password"
          v-model="new_1"
          :style="new_1_error"
          @focus="new_1_is_focused = true"
          @blur="new_1_is_focused = false"
        >
      </div>
    </div>
    <div class="password-input-block">
      <div class="password-input-block-title">
        Repeat new password
      </div>
      <div class="error" :style="new_2_error">
        <input
          class="password-input"
          type="password"
          placeholder="Repeat your new pass"
          v-model="new_2"
          :style="new_2_error"
          @focus="mew_2_is_focused = true"
          @blur="mew_2_is_focused = false"
        >
      </div>
    </div>
    <div class="footer">
      <blue-button :style="button_styles" :disabled="!old_is_fine || !mew_1_is_fine || !mew_2_is_fine || !check_length">
        Save
      </blue-button>
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton.vue";

export default {
  name: "PasswordModal",
  components: {BlueButton},
  data(){
    return{
      old: '',
      old_is_fine: true,
      old_is_focused: true,
      new_1: '',
      mew_1_is_fine: true,
      new_1_is_focused: true,
      new_2: '',
      mew_2_is_fine: true,
      mew_2_is_focused: true,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      doesnt_match: {
        '--content': JSON.stringify("Password doesn't match requirements"),
        '--border-color': '#FF5252',
        '--back-color': '#696AE9',
      },
      good_pass: {
        '--content': '',
        '--border-color': '#66BB6A',
        '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
        '--back-color': '#5D5FEF',
      }
    }
  },
  methods:{
    save(){
      //TODO connect to REST
    }
  },
  computed: {
    check_length(){
      return !(this.old.length < 8 || this.new_1.length < 8 || this.new_2.length < 8);

    },
    old_error(){
      if (this.old_is_focused){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (!this.regex.test(this.old)){
        this.old_is_fine = false
        return this.doesnt_match
      }
      this.old_is_fine = true
      return this.good_pass
    },
    new_1_error(){
      if (this.new_1_is_focused){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (!this.regex.test(this.new_1)){
        this.mew_1_is_fine = false
        return this.doesnt_match
      }
      this.mew_1_is_fine = true
      return this.good_pass
    },
    new_2_error(){
      if (this.mew_2_is_focused){
        return Object.assign({}, this.good_pass, {
          '--border-color': '#282932'
        })
      }
      if (!this.regex.test(this.new_2)){
        this.mew_2_is_fine = false
        return this.doesnt_match
      }
      if (this.new_1 !== this.new_2){
        this.mew_2_is_fine = false
        return Object.assign({}, this.doesnt_match, {
          '--content': JSON.stringify("New passwords do not match")
        })
      }
      this.mew_2_is_fine = true
      return this.good_pass
    },

    button_styles(){
      if (!this.mew_2_is_fine || !this.mew_1_is_fine || !this.old_is_fine || !this.check_length){
        return {
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      return {
        '--cursor': 'pointer',
        '--opacity': '1'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";

  .footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .bttn{
    padding: 8px 16px;
    opacity: var(--opacity);
    cursor: var(--cursor);
  }

  .password-modal{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 16px;
    width: 380px;
    //height: 416px; // TODO temporary
    background: $grey-background;
    box-shadow: 0px -4px 40px $receipt-view-shadow;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1004;
  }

  .line{
    width: 100%;
    height: 1px;
    background-color: $line;
    //border: 1px solid $line;
    align-self: stretch;
    margin-top: 4px;
  }

  .modal-title{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
  .password-input-block-title{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }


  .password-input{
    padding: 6px 12px;
    border-radius: 4px;
    background-color: $grey-input-background;
    border: 1px solid var(--border-color);
    color: $white;
    margin-bottom: 6px;
  }

  .error{
    position: relative;
  }

  .password-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  .password-input:hover{
    border: 1px solid $blue;
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

</style>

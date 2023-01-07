<template>
  <div id="account-page">
    <transition name="opacity">
      <div class="opacity"
           v-show="isPasswordModal || isDeactivateConfirmation || isExportModal"
           @click="closeAll"/>
    </transition>
    <transition name="opacity">
      <password-modal v-show="isPasswordModal" />
    </transition>
    <transition name="opacity">
      <deactivation-confirmation v-show="isDeactivateConfirmation"></deactivation-confirmation>
    </transition>
    <transition name="opacity">
      <export-modal v-show="isExportModal"/>
    </transition>

    <div class="title">
      Account
    </div>
    <div class="content">
      <div id="account-details-block" class="block">
        <div class="header">
          <div class="block-title">
            Account details
          </div>
        </div>
        <div class="body">
          <div id="email" class="account-details-block">
            <transition-group name="fade" mode="out-in" style="width: 100%">
              <div class="first" v-show="!this.email_is_editing" :key="'first'">
                <div class="text-content" >
                  <div class="text-content-primary">
                    Email
                  </div>
                  <div class="text-content-text">
                    {{user_email}}
                  </div>
                </div>
                <blue-stroke-button class="edit-button" @click.native="email_is_editing = !email_is_editing">
                  <edit-icon class="ico"/>
                </blue-stroke-button >
              </div>
              <div class="second"  v-show="this.email_is_editing" :key="'second'">
                <div class="error" :style="input_error_styles">
                  <input
                    class="email-input"
                    type="email"
                    :style="input_error_styles"
                    placeholder="Name your category"
                    v-model="email"
                  >
                </div>
                <blue-button class="save-button"
                             :style="input_error_styles"
                             @click.native="save_email">Save</blue-button>
              </div>
            </transition-group>

          </div>
          <div id="currency" class="account-details-block">
              <transition-group name="fade" mode="out-in" style="width: 100%">
                <div class="first" v-show="!this.currency_is_editing" :key="'first-currency'">
                  <div class="text-content">
                    <div class="text-content-primary">
                      Currency
                    </div>
                    <div class="text-content-text">
                      {{this.user_currency}}
                    </div>
                  </div>
                  <blue-stroke-button class="edit-button" @click.native="currency_is_editing = !currency_is_editing">
                    <edit-icon class="ico"/>
                  </blue-stroke-button >
                </div>
                <div class="second"  v-show="this.currency_is_editing" :key="'second-currency'">
                  <currency-selector ref="currency-selector"/>
                  <blue-button class="save-button"
                               :style="input_error_styles"
                               @click.native="save_currency"
                  >
                    Save
                  </blue-button>
                </div>
              </transition-group>
          </div>
          <div id="password" class="account-details-block">
            <div class="text-content">
              <div class="text-content-primary">
                Password
              </div>
              <div class="text-content-text">
                **********
              </div>
            </div>
            <blue-stroke-button class="edit-button" @click.native="isPasswordModal = true">
              <edit-icon class="ico"/>
            </blue-stroke-button >
          </div>
        </div>
      </div>
      <div id="export-data-block" class="block">
        <div class="text-content">
          <div class="block-title">
            Export
          </div>
          <div class="text-content-text">
            Export my entries as csv, json, xslx files
          </div>
        </div>
        <blue-button @click.native="isExportModal = true" id="export-data-button">
          Export
        </blue-button>
      </div>
      <div id="account-actions-block" class="block">
        <div id="log-out">
          <div class="text-content">
            <div class="text-content-primary">
              Log out
            </div>
            <div class="text-content-text">
              Log out of your account on this device
            </div>
          </div>
          <div class="button-div">
            <blue-stroke-button id="log-out-button" class="bttn" @click.native="log_out">
              Log out <arrow-bar-right-icon class="ico" size="18"/>
            </blue-stroke-button>
          </div>
        </div>
        <div id="deactivate-account">
          <div class="text-content">
            <div class="text-content-primary">
              Deactivate account
            </div>
            <div class="text-content-text">
              This will delete all your data from our server and can’t be undone
            </div>
          </div>
          <div class="button-div">
            <red-stroke-button id="deactivate-button" class="bttn" @click.native="isDeactivateConfirmation = true">
              Deactivate
            </red-stroke-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton.vue";
import {EditIcon, ArrowBarRightIcon} from "vue-tabler-icons";
import BlueStrokeButton from "@/components/UI/BlueStrokeButton.vue";
import RedStrokeButton from "@/components/UI/RedStrokeButton.vue";
import CurrencySelector from "@/components/Account/CurrencySelector.vue";
import PasswordModal from "@/components/Account/PasswordModal.vue";
import {mapActions} from "vuex";
import DeactivationConfirmation from "@/components/Account/DeactivationConfirmation.vue";
import ExportModal from "@/components/Account/ExportModal.vue";

export default {
  name: "Account",
  components: {
    ExportModal,
    DeactivationConfirmation,
    PasswordModal,
    CurrencySelector, RedStrokeButton, ArrowBarRightIcon, BlueStrokeButton, BlueButton, EditIcon},
  data(){
    return{
      email: "email@gmail.com",
      email_is_fine: true,
      email_is_editing: false,
      currency: "",
      currency_is_editing: false,
      isPasswordModal: false,
      isDeactivateConfirmation: false,
      isExportModal: false
    }
  },
  mounted() {
    this.email = this.user_email
    this.currency = this.user_currency
  },
  methods: {
    ...mapActions(['LOGOUT']),
    save_email(){
      if (this.isValidEmail && this.email !== this.user_email){
        const user_data = {
          "user_id": this.$store.state.state.user_id,
          "new_email":this.email
        }
        this.$store.dispatch("PUT_USER_EMAIL", user_data)
      }
      this.email_is_editing = !this.email_is_editing
    },
    set_currency(currency) {
      console.log(currency)
      this.currency = currency
    },
    save_currency(){
      if (this.currency !== this.user_currency) {
        const user_data = {
          "user_id": this.$store.state.state.user_id,
          "new_currency": this.currency
        }
        this.$store.dispatch("PUT_USER_CURRENCY", user_data)
      }
      this.currency_is_editing = !this.currency_is_editing
    },
    log_out(){
      this.LOGOUT()
    },

    closeAll(){
      this.isDeactivateConfirmation = false
      this.isPasswordModal = false
      this.isExportModal = false
    },

    deactivate(){

    }
  },
  computed: {
    user_email(){
      return this.$store.state.state.email_address
    },
    user_currency(){
      return this.$store.state.state.currency
    },

    isValidEmail() {
      let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(this.email);
    },
    input_error_styles () {
      if (this.email.length === 0 || !this.isValidEmail){
        this.email_is_fine = false
        return {
          '--content': JSON.stringify('Please enter valid email'),
          '--border-color': '#FF5252',
          '--back-color': '#696AE9',
          '--cursor': 'default',
          '--opacity': '0.5'
        }
      }
      this.email_is_fine = true
      return {
        '--content': '',
        '--border-color': '#282932',
        '--box-shadow': '0 0 20px rgba(105, 106, 233, 0.2)',
        '--back-color': '#5D5FEF',
        '--cursor': 'pointer',
        '--opacity': '1'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";
  .opacity{
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    padding: 0;
    top: 0;
    left:0;
    right:0;
    z-index: 1003;
  }

  .deactivation-confirmation{
    z-index: 1004;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .opacity-enter-active,
  .opacity-leave-active
  {
    transition: all 0.3s ease-in-out;
  }

  .opacity-enter,
  .opacity-leave-to
  {
    opacity: 0;
    position: absolute;
  }

  .fade-enter-active,
  .fade-leave-active
  {
    transition: all 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-to
  {
    opacity: 0;
    position: absolute;
  }

  .fade-leave-to{
    position: absolute;
  }

  .first, .second{
    //position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
  }

  .save-button.save-button{
    padding: 8px 16px;
    max-height: 38px;
    cursor: var(--cursor);
    opacity: var(--opacity);
  }

  .save-button.save-button:hover{
    box-shadow: var(--box-shadow);
    background-color: var(--back-color);
  }

  .email-input{
    padding: 6px 12px;
    border-radius: 4px;
    background-color: $grey-input-background;
    border: 1px solid var(--border-color);
    color: $white;
  }

  .email-input::placeholder{
    //color: #FF5252;
    //opacity: 0.7;
  }

  .error{
    position: relative;
  }

  .email-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  .email-input:hover{
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



#account-page{
    width: 100%;
    height: 100vh;
  }

  .title{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;
    color: $white;
  }

  .content{
    margin-top: 32px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .block{
    background-color: $grey-background;
    padding: 24px;
    border-radius: 5px;
  }

  .block-title{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: $white;
  }

  .blue-stroke-button{
    border: 1px solid $blue;
    color: $blue;
  }

  .blue-stroke-button:hover{
    transition: 0.3s ease-out;
    border-radius: 4px;
    background: $blue-dark;
    box-shadow: 0 0 20px $blue-shadow;
    color: $white;
  }

  .text-content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .text-content-primary{
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: $white;
    }
    .text-content-text{
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #8A8B94;
      max-width: 320px;
    }
  }

  #account-details-block{
    .body{
      gap: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 32px;

      .account-details-block{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .edit-button{
          width: 32px;
          height: 32px;
          padding: 0;

          .ico{
            width: 18px;
            height: 18px;
          }
        }


      }
    }
  }

  #export-data-block{
    display: flex;
    justify-content: space-between;

    #export-data-button{
      width: 100px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $white;
    }
  }

  #account-actions-block{
    display: flex;
    flex-direction: column;
    gap: 16px;
    #log-out, #deactivate-account{
      display: flex;
      justify-content: space-between;

      .ico{
        margin-left: 10px;
      }
      .button-div{
        display: flex;
        align-items: center;
        .bttn{
          max-height: 40px;
        }

        #log-out-button{
          //border: ;
        }

        #deactivate-button{
          border: 1px solid $caution-red;
          color: $caution-red
        }
        #deactivate-button:hover{
          border: 1px solid $caution-red-dark;
          background-color: $caution-red-dark;
          color: $white;
        }
      }

    }
  }


</style>

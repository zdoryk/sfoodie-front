<template>
  <div id="password-recovery">
      <email-modal v-if="!is_message_has_been_sent" :key="'email_modal'"/>
      <password-recovery-modal
        :key="'password-recovery'"
        :token="token"
        v-else
      />
    <!--      :user_email="email" -->
  </div>
</template>

<script>

import EmailModal from "@/components/PasswordRecovery/EmailModal.vue";
import PasswordRecoveryModal from "@/components/PasswordRecovery/PasswordRecoveryModal.vue";

export default {
  name: "PasswordRecovery",
  components: {EmailModal, PasswordRecoveryModal},
  layout: 'notProgram',
  data(){
    return{
      is_message_has_been_sent: false,
      token: null,
      email: null
    }
  },
  methods: {
    // message_was_sent(token, email){
    message_was_sent(token){
      this.is_message_has_been_sent = true
      this.token = token
      // this.email = email
    }
  }

}
</script>

<style lang="scss">
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


#password-recovery{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  //height: 440px;
  width: 380px;
  background: $grey-background;
  box-shadow: 0px -4px 40px $receipt-view-shadow;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1004;
}

.recovery-title{
  font-size: 24px;
  font-weight: 900;
  display: flex;
  justify-content: center;
}


.recovery-label{
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none;
  color: $grey;
}

.recovery-input{
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

.recovery-button{
  padding: 10px;
}


</style>

<template>
  <div class="deactivation-confirmation">
    <div class="header">
      <p class="text">
        Type&nbsp;<b> Deactivate </b>&nbsp;
      </p>
      <p class="text">
        to  deactivate your account:
      </p>
    </div>
    <div class="body">
      <input class="deactivate-input" v-model="input_value">
    </div>
    <div class="footer">
      <red-button
        @click.native="deactivate_account"
        class="deactivate-button"
        :disabled="!check_input"
        :style="button_style"
      >
        Deactivate
      </red-button>
      <blue-stroke-button @click.native="updateVisibility" class="cancel-button">Cancel</blue-stroke-button>
    </div>
  </div>
</template>



<script>


import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import RedButton from "@/components/UI/RedButton";
import {mapActions} from "vuex";
import {state} from "@/store";

export default {
  name: "DeleteConfirmation",
  components: {RedButton, BlueStrokeButton},
  data(){
    return{
      input_value: ''
    }
  },
  methods:{
    updateVisibility() {
      this.$parent.closeAll()
    },
    deactivate_account(){
      const request_body = {user_id: this.$store.state.state.user_id}
      this.$store.dispatch('DEACTIVATE_USER_ACCOUNT', request_body)
    },

  },
  computed: {
    check_input(){
      return this.input_value === 'Deactivate';
    },

    button_style(){
      if (this.check_input){
        return {
          "--box-shadow": "0 0 20px rgb(242 139 112 / 30%)",
          "--background-color": "#de5d5d"
        }
      }
      return {
        "--background-color": "#F66969",
        "--opacity": "0.5"
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";


.deactivate-input{
  margin-top: 8px;
  width: 100%;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: $grey-input-background;
  border: 1px solid $grey-input-background;;
  color: $white;
}

.deactivate-input:focus{
  outline: none;
  border: 1px solid $blue;
}

.deactivate-input:hover{
  border: 1px solid $blue;
}


.deactivation-confirmation{
  width: 390px;
  background-color: $grey-background;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1001;
  //margin-top: 40%;
}

.header{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.text{
  //font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  //width: 265px;
  display: flex;
  text-align: center;
}

.footer{
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.deactivate-button.deactivate-button{
  width: 145px;
  opacity: var(--opacity);
  transition: all .3s ease-in-out;
  //font-size: 16px;
}

.deactivate-button:hover{
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
}


.cancel-button{
  width: 145px;
  //background-color: $blue;
  border: 1px solid $blue;
  color: $blue;
}

.cancel-button:hover{
  border-color: $blue-dark;
  color: $white;
  background-color:  $blue-dark;
}



</style>

<template>
  <div class="move-confirmation">
    <div class="header">
      <div class="text">
        <slot>

        </slot>
      </div>
    </div>
    <div class="footer">
      <!--      <div>{{this.isConfirmationVisible}}</div>-->
      <red-stroke-button  class="delete-button" @click.native="hide">Cancel</red-stroke-button>
      <blue-button class="cancel-button" @click.native="accepted">Move to other</blue-button>
    </div>
  </div>
</template>

<script>
import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import RedButton from "@/components/UI/RedButton";
import {mapActions} from "vuex";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import BlueButton from "@/components/UI/BlueButton";

export default {
  name: "MoveConfirmation",
  components: {
    RedStrokeButton,
    BlueStrokeButton, RedButton, BlueButton
  },
  methods: {
    // ...mapActions([]),
    accepted(){
      console.log("accepted")
      this.$parent.move_to_other_accepted()
    },

    hide(){
      console.log('qwe')
      this.$parent.hide()
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

  .move-confirmation{
    width: 350px;
    height: 160px;
    background-color: $grey-background;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1004;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  //margin-top: 40%;
  }

  .header{
    display: flex;
    justify-content: center;
  }

  .text{
  //font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 265px;
    display: flex;
    text-align: center;
  }

  .footer{
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
  }

  .delete-button.delete-button{
    width: 145px;
  //font-size: 16px;
  }

  .cancel-button{
    width: 145px;
  }

</style>

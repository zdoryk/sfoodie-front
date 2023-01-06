<template>
  <div class="deactivation-confirmation">
    <div class="header">
      <div class="text">
        <slot>

        </slot>
      </div>
    </div>
    <div class="footer">
      <red-button  @click.native="deactivate_account" class="deactivate-button">Deactivate</red-button>
      <blue-stroke-button @click.native="updateVisibility" class="cancel-button">Cancel</blue-stroke-button>
    </div>
  </div>
</template>



<script>


import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import RedButton from "@/components/UI/RedButton";
import {mapActions} from "vuex";

export default {
  name: "DeleteConfirmation",
  components: {RedButton, BlueStrokeButton},
  methods:{
    updateVisibility() {
      this.$parent.closeAll()
    },
    deactivate_account(){
      // TODO DELETE REQUEST ON REST
    },

    ...mapActions(
      [
      ]
    ),
  },

}
</script>

<style scoped lang="scss">
@import "../../assets/variables";

.deactivation-confirmation{
  width: 350px;
  height: 160px;
  background-color: $grey-background;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1001;
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

.deactivate-button.deactivate-button{
  width: 145px;
  //font-size: 16px;
}

.cancel-button{
  width: 145px;
}



</style>

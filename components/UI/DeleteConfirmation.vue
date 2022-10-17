<template>
  <div class="delete-confirmation">
    <div class="header">
      <div class="text">Do you really want to delete this receipt?</div>
    </div>
    <div class="footer">
<!--      <div>{{this.isConfirmationVisible}}</div>-->
      <red-button  @click.native="deleteSelectedReceipt" class="delete-button">Delete</red-button>
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
  model: {
    prop: 'isConfirmationVisible',
    event: 'updateConfirmationVisibility',
  },
  props: [
    'isConfirmationVisible'
  ],
  methods:{
    updateVisibility() {
      this.$parent.closeConfirmation()
    },

    deleteSelectedReceipt(){
      this.DELETE_SELECTED_RECEIPT()
      this.$emit('updateConfirmationVisibility', !this.isConfirmationVisible)
      this.$parent.closePopUp()
    },


    ...mapActions(
      [
        'DELETE_SELECTED_RECEIPT', 'SELECT_FIRST_RECEIPT'
      ]
    ),
  },

}
</script>

<style scoped lang="scss">
@import "../../assets/variables";

  .delete-confirmation{
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

  .delete-button.delete-button{
    width: 145px;
    //font-size: 16px;
  }

  .cancel-button{
    width: 145px;
  }



</style>

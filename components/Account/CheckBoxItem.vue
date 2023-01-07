<template>
  <div class="check-box-item">
    <check-box :is-checked="data_obj.isChecked"/>
    <p>
      {{name}}
    </p>
  </div>
</template>

<script>
import CheckBox from "@/components/UI/CheckBox.vue";

export default {
  name: "CheckBoxItem",
  components: {CheckBox},
  props: ["data_obj"],
  computed: {
    name(){
      return this.data_obj.name
    }
  },
  methods: {
    change_state(state){
      this.$parent.change_state(this.data_obj.name, state, this.data_obj.category_name)
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";

.check-box-item{
  display: flex;
  p {
    margin: 0;
    display: flex;
    align-items: center;
  }

  .check-box{
    margin-right: 8px;
  }
}


</style>

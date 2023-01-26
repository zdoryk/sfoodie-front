<template>
  <button
    class="button-color"
    @click="changeActive"
    :class="{ 'active-color': this.colorData.color === this.activeColor }"
    tabindex="0"
    :style="cssVars"
  ></button>
</template>

<script>
export default {
  name: "ButtonColor",
  props: ["activeColor", "colorData"],
  model: {
    prop: "activeColor",
    event: "onUpdatePlan",
  },
  methods: {
    changeActive() {
      console.log("change");
      this.$emit("onUpdatePlan", this.colorData.color);
    },
  },
  computed: {
    cssVars() {
      return {
        "--component-color": this.colorData.color,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.button-color {
  width: 40px;
  height: 40px;
  //margin-right: 11px;
  border-radius: 4px;
  outline: none;
  border: 4px solid var(--component-color);
  background-color: var(--component-color);
  transition: 0.1s ease-in-out;
}

.active-color {
  border: 4px solid #282932;
  border-radius: 6px;
  box-shadow: 0 0 0 2px #696ae9;
}
</style>

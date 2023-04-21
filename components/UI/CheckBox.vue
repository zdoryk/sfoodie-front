<template>
  <div class="check-box" @click="check" :style="cssVars">
    <check-icon v-show="isChecked" class="ico check-box-ico" />
  </div>
</template>

<script>
import { CheckIcon } from "vue-tabler-icons";

export default {
  name: "CheckBox",
  components: { CheckIcon },
  props: ["isChecked"],
  computed: {
    cssVars() {
      if (this.isChecked) {
        return {
          "--border": "1px solid #696AE9",
          "--background-color": "#696AE9",
        };
      }
      return {
        "--border": "1px solid #3A3C4C",
        "--background-color": "#282932",
      };
    },
  },
  methods: {
    check() {
      this.$parent.change_state(!this.isChecked);
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

.check-box {
  width: 32px;
  height: 32px;
  background: var(--background-color);
  border: var(--border);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
</style>

<template>
  <button class="btn" v-on:click="changeHamburger">
    <slot></slot>
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "menu-item",
  methods: {
    ...mapActions(["CHANGE_HAMBURGER_STATE_ACTION"]),
    changeHamburger() {
      this.CHANGE_HAMBURGER_STATE_ACTION();
    },
  },
};
</script>

<style lang="scss">
@import "assets/variables";

.btn.btn {
  position: relative;
  width: 200px;
  padding-left: 15px;
  text-align: left;
  margin-left: 10px;
  padding-top: 35px;
  background: none;
  color: $grey;
  border: none;
  font-size: 15px;
  outline: none;
  box-shadow: none;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  transform: translate(12px, 0);
  color: $blue;
}
</style>

<template>
  <div
    class="menu-toggle"
    v-on:click="changeHamburger"
    :class="{ active: getState }"
  >
    <div class="hamburger">
      <span></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Burger",
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    getState() {
      return this.$store.state.state.isHamburger;
    },
  },
  ...mapActions(["CHANGE_HAMBURGER_STATE_ACTION"]),
  methods: {
    changeHamburger() {
      this.$store.commit("CHANGE_HAMBURGER_STATE");
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";
.menu-toggle {
  /*align-self: end;*/
  /*position: absolute;*/
  display: none;
  position: fixed;
  top: 23px;
  right: 8%;
  width: 26px;
  height: 26px;
  /*border-radius: 99px;*/
  /*//background-color: #2e3047;*/
  cursor: pointer;
}

.hamburger {
  position: relative;
  top: calc(50% - 1px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
}

.hamburger > span,
.hamburger > span::before,
.hamburger > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 99px;
  background-color: #fff;
  transition-duration: 0.25s;
}

.hamburger > span::before {
  content: "";
  top: -8px;
}
.hamburger > span::after {
  content: "";
  top: 8px;
}

.menu-toggle.active.active .hamburger > span {
  transform: rotate(45deg);
}
.menu-toggle.active.active .hamburger > span::before {
  top: 0;
  transform: rotate(0deg);
}
.menu-toggle.active.active .hamburger > span::after {
  top: 0;
  transform: rotate(90deg);
}

@media (max-width: $tab-size) {
  .menu-toggle {
    display: block;
  }

  .menu-toggle {
    /*align-self: end;*/
    /*position: absolute;*/
    /*position: fixed;*/
    top: 50px;
    right: 45px;
    width: 26px;
    height: 26px;
    /*border-radius: 99px;*/
    /*//background-color: #2e3047;*/
    cursor: pointer;
  }
}

@media (max-width: 420px) {
  .menu-toggle {
    display: block;
    top: 23px;
    right: 8%;
  }
}
</style>

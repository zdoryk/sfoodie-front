<template>
  <div class="cookie-modal">
    <div class="modal-content">
      <div class="title">Hey, it's Sfoodie.</div>
      <div class="text">
        We are using cookies to enhance your experience. By continuing to use
        this website, you agree to our use of cookies.
      </div>
      <blue-button @click.native="acceptCookies">Accept</blue-button>
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton.vue";

export default {
  name: "CookieWarning",
  components: { BlueButton },
  methods: {
    acceptCookies() {
      // call the function that sets the cookie
      this.$store.dispatch("SET_COOKIE_WARNING_ACCEPTED");
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

.title {
  font-size: 24px;
  font-weight: 900;
  display: flex;
  justify-content: center;
}

.text {
  text-align: center;
}

.cookie-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.modal-content {
  background-color: $black;
  padding: 20px;
  border-radius: 6px;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bttn {
  padding: 12px;
}
</style>

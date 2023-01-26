<template>
  <div id="email-modal">
    <div class="recovery-title">Write your email</div>
    <div class="content-email">
      <div>
        <div class="recovery-label">Email</div>
        <input
          class="recovery-input"
          id="email-input"
          type="email"
          v-model="email_address"
          v-on:keyup.enter="send_email"
        />
      </div>
      <blue-button
        :disabled="!is_email_ok"
        :style="button_style"
        class="recovery-button"
        @click.native="send_email"
        >{{ buttonText }}</blue-button
      >
    </div>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton.vue";

export default {
  name: "EmailModal",
  components: { BlueButton },
  // layout: 'notProgram',
  data() {
    return {
      email_address: "",
      regex:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
      buttonText: "Send",
      isError: false,
    };
  },
  computed: {
    is_email_ok() {
      return this.regex.test(this.email_address);
    },

    button_style() {
      if (this.isError) {
        this.buttonText = "There is no user with this email";
        return {
          "--back-color": "#FF5252",
          "--opacity": "1",
        };
      }
      this.buttonText = "Send";
      if (this.is_email_ok) {
        return {
          "--box-shadow": "0 0 20px rgba(105, 106, 233, 0.2)",
          "--back-color": "#5D5FEF",
          "--opacity": "1",
        };
      }
      return {
        "--opacity": "0.5",
        "--back-color": "#5D5FEF",
      };
    },
  },
  methods: {
    async send_email() {
      if (this.is_email_ok) {
        try {
          const data = await this.$store.dispatch(
            "SEND_EMAIL_FOR_RECOVERY",
            this.email_address
          );
          // console.log(data.data.code)
          if (data.data.detail === "Message has been sent") {
            // this.$parent.message_was_sent(data.data.code, this.email_address)
            this.$parent.message_was_sent(data.data.code);
          }
        } catch (e) {
          console.log(e.response.status);
          if (e.response.status === 404) {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 4000);
          }
        }
      } else {
        this.buttonText = "Write email correctly";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/variables";

#email-modal,
.content-e-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bttn {
  padding: 12px;
  opacity: var(--opacity);
  background-color: var(--back-color);
  transition: all 0.3s ease-in-out;
  width: 100%;
}

.bttn:hover {
  background-color: var(--back-color);
  box-shadow: var(--box-shadow);
}
</style>

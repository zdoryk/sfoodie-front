<template>
  <div class="AllReceiptsRedirection"></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: ["redirect-to-all-time"],
  layout: "allReceiptsPage",
};
</script>

<style scoped lang="scss">
@import "../../assets/variables";
</style>

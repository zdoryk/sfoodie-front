<template />

<script>

export default {
  middleware: ['redirect-to-all-time']
}

</script>

<style lang="scss">
@import "assets/variables";

.time-period-active span {
  transition: all 0.3s ease-out;
  color: $blue;
  padding-bottom: 12px;
  border-bottom: 1px solid $blue;
}


</style>

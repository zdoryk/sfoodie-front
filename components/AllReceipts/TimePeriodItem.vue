<template>
  <div class="time-period-item">
    <button class="time-period-button">
      <span>
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "time-period-item"
}
</script>

<style scoped lang="scss">
  .time-period-button.time-period-button {
    background: none;
    color: #B6B8CA;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 16px;
    //border-bottom: 1px solid #696AE9;
    padding-bottom: 12px;
    margin-bottom: -10px;

    span {
      display: block;
      transition: all 0.3s ease-out;
      white-space: nowrap;
    }
  }

  .time-period-item:hover {
    .time-period-button {
      span {
        transition: all 0.3s ease-out;
        color: #696AE9;
      }
    }
  }

</style>

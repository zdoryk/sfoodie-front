<template>
  <div class="AllReceipts">
    <div class="navigation-bar">
      <div id="title">All Receipts</div>
      <div class="time-period">
        <nuxt-link active-class="time-period-active" to="/AllReceipts/AllTime">
          <time-period-item>All time</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/ThisWeek">
          <time-period-item >This week</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/ThisMonth">
          <time-period-item>This month</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/CustomPeriod">
          <time-period-item>Custom period</time-period-item>
        </nuxt-link>
      </div>
    </div>
    <div class="time-period-content">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import TimePeriodItem from "@/components/AllReceipts/TimePeriodItem";

export default {
  components: {TimePeriodItem},
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.AllReceipts{
  width: 100%;
}


#title{
  font-size: 25px;
  font-weight: bold;
  flex: 1;
  justify-self: flex-start;
}

.navigation-bar {
  display: flex;
  margin-bottom: 40px;
}

.time-period {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 2.5;
}


</style>

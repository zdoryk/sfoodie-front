<template>
  <div class="AllReceipts">
    <div class="opacity"/>
    <div class="navigation-bar">
      <div id="title">All Receipts</div>
      <div class="time-period">
        <nuxt-link active-class="time-period-active" to="/AllReceipts/AllTime">
          <time-period-item>All time</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/ThisWeek">
          <time-period-item class="not-first" >Week</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/ThisMonth">
          <time-period-item class="not-first">Month</time-period-item>
        </nuxt-link>
        <nuxt-link active-class="time-period-active" to="/AllReceipts/CustomPeriod">
          <time-period-item class="not-first">Custom</time-period-item>
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
import {mapActions} from "vuex";

export default {
  components: {TimePeriodItem},
  data() {
    return {
    }
  },
  methods:{
    ...mapActions(['SET_EXISTING_RECEIPTS_ACTION'])
  },
  // mounted() {
  //   this.SET_EXISTING_RECEIPTS_ACTION()
  // }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

.AllReceipts{
  width: 100%;
  //padding: 16px
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
  flex-wrap: wrap;
  padding: 16px 16px 0;
}

.time-period {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.9;
}

.time-period-content{
  padding: 0 16px;
}


@media (max-width: $desktop-m){
  .time-period {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //flex-wrap: wrap;
    flex: 1.2;

  }
}

@media (max-width: 900px){
  .navigation-bar{
    //display: block;
  }
}


@media (max-width: $tab-size){
  .navigation-bar{
    display: block;
  }

  .time-period {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    //flex-wrap: wrap;
    flex: 1;

    a {
      margin-right: 30px;
    }
  }

  #title{
    font-size: 25px;
    font-weight: bold;
    flex: 1;
    justify-self: flex-start;
    margin-left: 5px;
  }

}



@media (max-width: $phone-size){
  .AllReceipts{
    //padding: 16px;
  }

  .time-period-content > div {
    justify-content: center;
  }

  .opacity{
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    visibility: hidden;
    padding: 0;
    left:0;
    right:0;
  }

}





</style>

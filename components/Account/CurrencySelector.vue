<template>
  <div class="currency-selector">
    <input
      class="currency-input"
      type="text"
      placeholder="Choose your currency"
      v-model="currency"
      @click="isPopUp = true"
      @keyup="change"
      ref="input"
    >
    <transition name="stretch">
      <div class="pop-up" v-show="isPopUp" ref="popup">
        <p v-for="code in current_codes" :key="code" class="list-of-products" @click="() => set_currency(code)">
          {{ code }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CurrencySelector",
  data(){
    return{
      currency: '',
      isPopUp: false,
      currencies_alpha_codes: [
        "USD",
        "CAD",
        "EUR",
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ARS",
        "AUD",
        "AZN",
        "BAM",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BND",
        "BOB",
        "BRL",
        "BWP",
        "BYN",
        "BZD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EEK",
        "EGP",
        "ERN",
        "ETB",
        "GBP",
        "GEL",
        "GHS",
        "GNF",
        "GTQ",
        "HKD",
        "HNL",
        "HRK",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JMD",
        "JOD",
        "JPY",
        "KES",
        "KHR",
        "KMF",
        "KRW",
        "KWD",
        "KZT",
        "LBP",
        "LKR",
        "LTL",
        "LVL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MOP",
        "MUR",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "OMR",
        "PAB",
        "PEN",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SDG",
        "SEK",
        "SGD",
        "SOS",
        "SYP",
        "THB",
        "TND",
        "TOP",
        "TRY",
        "TTD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "UYU",
        "UZS",
        "VEF",
        "VND",
        "XAF",
        "XOF",
        "YER",
        "ZAR",
        "ZMK",
        "ZWL"
      ],
      current_codes: []
    }
  },
  mounted() {
    this.current_codes = Array.from(this.currencies_alpha_codes)
    this.change()
    document.addEventListener('click', this.closePopup);
    this.currency = this.$store.state.state.currency
    // this.$refs.popup.style.width = (window.innerWidth/10 *9) + 'px'
    console.log(window.innerWidth)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closePopup);
  },
  methods:{
    set_currency(code){
      console.log(code)
      this.currency = code
      this.$parent.$parent.set_currency(code)
      this.close()
    },
    close(){
      this.isPopUp = false
    },
    change(){
      this.current_codes = this.currencies_alpha_codes.filter(c => c.toLowerCase().startsWith(this.currency.toLowerCase()));
    },
    closePopup(event) {
      // console.log(event.target)
      // console.log(this.$refs.popup)
      // console.log(this.$refs.popup.contains(event.target))
      // console.log(event.target === this.$refs.popup)
      if (event.target !== this.$refs.popup && event.target !== this.$refs.input && !this.$refs.popup.contains(event.target)) {
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";
  .stretch-enter-active,
  .stretch-leave-active
  {
    transition: all 0.3s ease-in-out;
    max-height: 230px;

  }

  p{
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    font-family: Poppins;
  }

  p:hover{
    color: $blue;
  }

  .stretch-enter,
  .stretch-leave-to
  {
    max-height: 0;
    opacity: 0;
    p {
      transform: translateY(-10px);
    }
  }

  .pop-up{
    height: auto;
    //transition: all 0.3s ease-in-out;
    width: 335px;
    position: absolute;
    //height: 300px;
    background-color: $grey-input-background;
    padding: 16px;
    transform: translateY(-1px);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow-y: scroll;
    max-height: 230px;
    @media (max-width: $phone-size){
      width: calc((100vw - 80px - 69px) * 0.9);
    }
  }

  .currency-input:focus{
    outline: none;
    border: 1px solid $blue;
  }

  .currency-input:hover{
    border: 1px solid $blue;
  }

  .currency-input{
    padding: 6px 12px;
    border-radius: 4px;
    background-color: $grey-input-background;
    border: 1px solid $grey-input-background;
    color: $white;

    @media (max-width: $phone-size) {
      width: 90%
    }
    //width: ;
  }
</style>

<template>
    <div class="container-fluid">
      <h1>All Receipts</h1>
       <div class="row justify-content-center">
         <cross-button @click.native="test"/>
       </div>
    </div>
</template>

<script>
    import CrossButton from "@/components/UI/CrossButton";
    import _ from "lodash"
    import md5 from "md5";

    export default {
      components: {CrossButton},
      data() {
            return {
              a: [
                {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
                {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
                {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
                {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
              ]
                // size: list.length
            }
        },
      methods:{
        test(){
          let b = md5('Beef'.toLowerCase())
          console.log(JSON.parse(JSON.stringify(this.a)).map(item => item.product_id).includes(b))
        }

      }
    }
</script>

<style scoped>
    h1{
        font-size: 25px;
        font-weight: bold;
        padding-bottom: 15px;
    }

    input::-webkit-calendar-picker-indicator {
        display: none;
        opacity: 0;
    }



</style>

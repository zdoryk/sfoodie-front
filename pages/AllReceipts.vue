<template>
  <div id=main>
    <div class="container-fluid">
       <div class="row justify-content-center">
         Receipts
       </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

                // size: list.length
            }
        }
    }
</script>

<style scoped>
    #main{
        width: 100%;
        height: 100%;
        padding: 40px 200px;
        background-color: #1D1E26;
        color: #EDEFFF;
    }

    h1{
        font-size: 25px;
        font-weight: bold;
        padding-bottom: 15px;
    }

    #product-input{
        width: 300px;
        background: #282932;
        border: none;
        border-radius: 4px;
        outline: none;
        box-shadow: none;
        color: #EDEFFF;
    }

    input::-webkit-calendar-picker-indicator {
        display: none;
        opacity: 0;
    }

    .qwe{
        background-color: #1D1E26;
    }



</style>

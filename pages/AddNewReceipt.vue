<template>
  <div id=main>
    <div class="container-fluid">
        <div class="col">
            <div class="row">
                <h1>
                    New Receipt
                </h1>
            </div>
            <div class="row">
                <div class="col-4">
                    <input placeholder="Product name" class="form-control" id="product-input" list="my-list-id">
                    <datalist id="my-list-id" class="qwe">
                        <option v-for="product in products" :key="product" class="qwe">{{ product }}</option>
                    </datalist>
                </div>
                <div class="col-2">
                    <!-- <b-form-input type="number"/> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                sizes: ['Bread', 'Chicken', 'Salmon',
                        'Pasta', 'Rice', 'Oil', 'Ketchup',
                        'Salad', 'Cereals', 'Tomato', 'Carrot',
                        'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
                // size: list.length
            }
        },
        computed: {
          ...mapState('products', ['products'])
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

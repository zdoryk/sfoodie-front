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
                <div class="col-8">
                    <input placeholder="Product name" class="form-control custom-input" id="product-input" list="my-list-id">
                    <datalist id="my-list-id" class="qwe">
                        <option v-for="size in productss" :key="size" class="qwe">{{ size }}</option>
                    </datalist>
                </div>
                <div class="col-3">
                     <input placeholder="Price" type="number" class="form-control custom-input"  id="price-input"/>
                </div>
                <div class="col-1">
                  <blue-button>
                    Add
                  </blue-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

    import BlueButton from "@/components/UI/BlueButton";
    export default {
      components: {BlueButton},
      data() {
            return {
            }
        },
        computed: {
          productss(){
            return this.$store.state.state.products
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
        /*width: 300px;*/
    }

    #price-input{

    }

    .custom-input{
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

<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'menu-item'
}
</script>

<style lang="scss">
@import "assets/variables";

    .btn.btn{
        position: relative;
        width: 200px;
        padding-left: 15px;
        text-align: left;
        margin-left: 10px;
        padding-top: 35px;
        background: none;
        color: $grey;
        border: none;
        font-size: 15px;
        outline: none;
        box-shadow: none;
    }

    .btn:hover{
        transition: all 0.3s ease-out;
        transform: translate(12px, 0);
        color: $blue;
    }
</style>

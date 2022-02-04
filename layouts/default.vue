<template>
    <div id="main-window">
        <SideBar/>
        <nuxt/>
    </div>
</template>

<script lang="ts">
    import SideBar from '@/components/SideBar.vue'
    export default {
        components: {
            SideBar
        },
        name: "layout"
    }
</script>


<style>
    #main-window {
        height: 100vh;
        width: 100%;
        display: flex;
    }

</style>

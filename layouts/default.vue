<template>
    <div id="main-window">
        <SideBar/>
        <div id="main">
          <nuxt/>
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/SideBar/SideBar.vue'
    export default {
        components: {
            SideBar
        },
        name: "layout"
    }
</script>


<style>
    #main-window {
        min-height: 100vh;
        height: 100%;
        width: 100%;
        display: flex;
    }

    #main {
      width: 100%;
      padding: 40px;
      background-color: #1d1e26;
      color: #edefff;
      display: flex;
      justify-content: center;
    }

</style>

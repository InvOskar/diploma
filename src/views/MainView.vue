<template>
    <div class="main">
        <the-header />
        <router-view />
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
export default {
    components: { TheHeader },


}
</script>

<style lang="scss" scoped>
.main {
    background: linear-gradient(163.28deg, #FFFFFF 9.02%, #EDF5EE 88.12%);
    height: 1080px;
}
</style>
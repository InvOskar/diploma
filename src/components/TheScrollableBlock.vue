<template>
    <div class="scrollable" :style="{width: width, height: height}">
        <slot></slot>
    </div>
</template>

<script>
import { gsap } from "gsap";
export default {
    props: {
        width: {
            type: String,
            default: '70%'
        },
        height: {
            type: String,
            default: '650px'
        }
    },

    mounted() {
        gsap.from('.scrollable', {
            delay: 0.5,
            duration: 0.7,
            opacity: 0,
            y: 100,
        });
    },
}
</script>

<style lang="scss" scoped>
.scrollable{
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    padding: 50px;

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);
    border-radius: 30px;
}
</style>
<template>
    <div class="input-form" :style="{width: width, height: height}">
        <slot></slot>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    props: {
        width: {
            type: String,
            default: '75%',
        },
        height: {
            type: String,
            default: '500px',
        },
    },
    mounted() {
        gsap.from('.input-form', {
            duration: 0.7,
            opacity: 0,
            y: -100,
        });
    },
}
</script>

<style lang="scss" scoped>
.input-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 20px;

    padding: 20px;

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);
    
}
</style>
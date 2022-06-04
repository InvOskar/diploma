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
.scrollable::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.scrollable::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

.scrollable::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #50BE95;
}
</style>
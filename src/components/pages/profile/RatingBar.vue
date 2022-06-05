<template>
    <div class="score-bar">
    <svg class="progres" width="100%" height="100%" fill="#494875">
        <circle class="progres-circle" cx="25" cy="25" r="22" stroke-width="5" ref="progresCircle"  :style="getStyle"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em">{{rating}}</text>
    </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circle: null,
            color: '',
        }
    },
    props: {
        rating:{ 
            type: Number,
            required: true,
        },
    },
    mounted() {
        this.circle = this.$refs.progresCircle;
    },
    computed: {
        getStyle(){
            if (!this.circle) return {};
            const radius = this.circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - this.rating / 5 * circumference;
            return {
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: offset,
                stroke: this.rating < 3.5 ? '#ff0000' : this.rating < 4.5 ? '#ffd700' : '#00ff00',
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.score-bar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #494875;
    position: relative;
    margin-top: -19px;
    margin-left: 10px;
}
.progres-circle{
    transform-origin: center;
    transform: rotate(-90deg);
}
text{
    fill: #fff;
    font-size: 22px;
    font-weight: bold;
}
</style>
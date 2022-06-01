<template>
    <button :style="{width: width, marginTop: mt, marginLeft: ml}">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '200px',
        },
        mt: {
            type: String,
            default: '0',
        },
        ml: {
            type: String,
            default: '0',
        },
    }
}
</script>

<style lang="scss" scoped>
button{
    font-weight: 700;
    font-size: 22px;
    line-height: 150%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #FFFFFF;

    background: #50BE95;
    border-radius: 2px;
    border: 0;
    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);

    min-height: 60px;

    &:hover{
        cursor: pointer;
    }
}
</style>
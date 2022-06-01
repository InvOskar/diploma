<template>
    <label :style="{fontSize: fs}">
        <slot></slot>
    </label>
</template>

<script>
export default {
    props: {
        fs: {
            type: String,
            default: '24px'
        },
    },
}
</script>

<style lang="scss" scoped>
label{
    font-weight: 700;
    line-height: 36px;

    letter-spacing: -0.02em;
    font-feature-settings: 'calt' off;

}
</style>
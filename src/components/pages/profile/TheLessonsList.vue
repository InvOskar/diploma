<template>
    <div class="block">
        lessons block
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.block{
    width: 1000px;
    height: 450px;

    box-shadow: 7px 7px 7px #ccc;
}
</style>
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

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);
}
</style>
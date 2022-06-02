<template>
    <div class="block">
        <div class="img">

        </div>
        <p>{{ user.firstName }} {{ user.lastName }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.dateOfBirth }}</p>
        <p>{{ user.workExperience }}</p>
        <p>{{ user.currentWork }}</p>
        <p>{{ user.rating }}</p>
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
    width: 600px;
    height: 800px;

    box-shadow: 7px 7px 7px #ccc;
}
</style>
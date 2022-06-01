<template>
    <div class="block">
        <p class="name">{{ teacher.lastName }} {{ teacher.firstName }}</p>
        <p>{{ teacher.dateOfBirth }}</p>
        <p>{{ teacher.workExperience }}</p>
        <p>{{ teacher.currentWork }}</p>
        <p>{{ teacher.teacherRating }}</p>
    </div>
</template>

<script>
export default {
    props: {
        teacher: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
.block{
    border-bottom: 2px solid #50BE95;

    padding: 20px;

    display: flex;
    justify-content: space-between;

    font-size: 20px;

    &:hover{
        cursor: pointer;
    }
}
.name{
    font-size: 24px;
    font-weight: 700;
}
</style>
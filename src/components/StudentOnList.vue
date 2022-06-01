<template>
    <div class="block">
        <p class="name">{{ student.lastName }} {{ student.firstName }}</p>
        <p>{{ student.dateOfBirth }}</p>
        <p>{{ student.grade }}</p>
        <p>{{ student.placeOfStudy }}</p>
        <p>{{ student.avarageGrade }}</p>
    </div>
</template>

<script>
export default {
    props: {
        student: {
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
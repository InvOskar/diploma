<template>
    <div class="block">
        <p class="name">{{ teacher.lastName }} {{ teacher.firstName }}</p>
        <p>{{ teacher.dateOfBirth.split("-").reverse().join(".") }}</p>
        <p>{{ teacher.currentWork }}</p>
        <p class="name">{{ teacher.rating }}</p>
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

    display: grid;
    grid-template-columns: repeat(4, 1fr);


    font-size: 20px;


    &:hover{
        cursor: pointer;
    }
}
p{
    text-align: center;
}
.name{
    font-size: 24px;
    font-weight: 700;
}
</style>
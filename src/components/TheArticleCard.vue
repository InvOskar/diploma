<template>
    <div class="card">
        <p class="card-title">{{ article.title }}</p>
        <p class="card-subtitle">{{ article.subtitle }}</p>
        <p>{{ article.date }}</p>
        <div class="card-img"><img :src="require(`@/assets/images/${article.lang}.png`)"></div>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    min-width: 150px;
    max-width: 300px;
    height: 230px;

    padding: 20px;

    border: 1px solid #50BE95;
    border-radius: 9px;

    cursor: pointer;
}
p{
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 15px;
    word-wrap: break-word;
}
.card-title {
    font-size: 22px;
    font-weight: bold;
}
.card-subtitle{
    font-size: 20px;
    color: grey;
}
.card-img{
    position: absolute;
    top: -10px;
    right: -10px;   
}
</style>
<template>
    <div class="article">
        <p class="topic">{{ article.topic }}</p>
        <p class="text">{{ article.content }}</p>
        <p class="author">{{ article.author }}</p>
        <p class="date">{{ article.date }}</p>
    </div>
</template>

<script>
import articlesPageText from "./ArticlesPage.vue";
export default {
    data() {
        return {
            articleId: this.$route.params.articleId,
            article: {},
        }
    },
    created() {
        this.article = articlesPageText.articles.find(article => article.id == this.articleId);
    }
}
</script>

<style lang="scss" scoped>

</style>
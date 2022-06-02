<template>
    <div class="article">
        <p class="topic">{{ article.title }}</p>
    </div>
</template>

<script>
import ArticleService from '../../../services/article.service'

const articleService = new ArticleService();

export default {
    data() {
        return {
            article: {},
        }
    },
    mounted(){
        articleService.getArticleById(this.$route.params.id).then(res => {
            this.article = res;
        })
    },
}
</script>

<style lang="scss" scoped>

</style>
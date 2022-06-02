<template>
    <div class="block">
        articles block
        <article-on-list :article="article" v-for="article in articles" :key="article._id"></article-on-list>
        <p @click="$router.push('/article/create')">add article</p>
    </div>
</template>

<script>
import ArticleOnList from '../../ArticleOnList.vue'
import ArticleService from '../../../services/article.service'

const articleService = new ArticleService();

export default {
    components: { ArticleOnList },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            articles: [],
        }
    },
    methods : {
        getArticle(){
            articleService.getArticlesByUserId(this.user._id).then(res => {
                this.articles = res;
            })
        }
    },

    mounted() {
        setTimeout(() =>{
            this.getArticle();
        }, 100);
    },
}
</script>

<style lang="scss" scoped>
.block{
    width: 1000px;
    height: 300px;

    box-shadow: 7px 7px 7px #ccc;
}
</style>
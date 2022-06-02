<template>
    <div class="articles">
        <h1>{{ content.header }}</h1>
        <the-top-bar/>
        <the-scrollable-block>
            <article-on-list @click="goToArticle(article._id)" v-for="article in articles" :article="article" :key="article._id"/>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../../TheTopBar.vue'
import { articlesPageText } from './ArticlesPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import ArticleOnList from '../../ArticleOnList.vue'
import ArticleService from '../../../services/article.service'

const articleService = new ArticleService();

export default {
    components: { TheTopBar, ArticleOnList, TheScrollableBlock },
    data() {
        return {
            content: articlesPageText.RU,
            articles: [],
        }
    },

    methods: {
        goToArticle(id){
            this.$router.push(`/article/${id}`);
        },
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = articlesPageText[newLang];
        }
    },
    
    mounted() {
        articleService.getArticles()
            .then(res => {
                this.articles = res;
            })
    }
}
</script>

<style lang="scss" scoped>
.articles{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 50px;

    margin-top: 40px;
}
</style>
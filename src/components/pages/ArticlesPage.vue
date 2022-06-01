<template>
    <div class="articles">
        <h1>{{ content.header }}</h1>
        <the-top-bar/>
        <the-scrollable-block>
            <article-on-list v-for="article in content.articles" :article="article" :key="article.id"/>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../TheTopBar.vue'
import { articlesPageText } from './ArticlesPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../TheScrollableBlock.vue'
import ArticleOnList from '../ArticleOnList.vue'

export default {
    components: { TheTopBar, ArticleOnList, TheScrollableBlock },
    data() {
        return {
            content: articlesPageText.RU,
        }
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = articlesPageText[newLang];
        }
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
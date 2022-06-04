<template>
    <div class="articles">
        <h1>{{ content.header }}</h1>
        <the-top-bar 
            :page="'articles'"
            @sort="sort($event)" 
            @search="search($event)"/>
        <the-scrollable-block v-if="articles.length>0">
            <article-on-list
                @click="goToArticle(article._id)"
                v-for="article in articles"
                :key="article._id"
                :article="article"/>
        </the-scrollable-block>
        <div class="empty-text" v-else>
            <p>{{ content.emptyText }}</p>
        </div>
    </div>
</template>

<script>
import TheTopBar from '../../TheTopBar.vue'
import { articlesPageText } from './ArticlesPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import ArticleOnList from '../../ArticleOnList.vue'
import ArticleService from '../../../services/article.service'
import { gsap } from 'gsap'

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
        getArticles(){
            articleService.getArticles()
                .then(res => {
                    this.articles = res;
                });
        },
        sort($event){
            if($event.id==0){
                $event.isClicked ? 
                    this.articles.sort((a,b) =>{ return b.rating - a.rating }) : 
                    this.articles.sort((a,b) =>{ return a.rating - b.rating })
            }else if($event.id==1){
                $event.isClicked ? 
                    this.articles.sort((a,b) =>{ return new Date(b.date) - new Date(a.date) }) : 
                    this.articles.sort((a,b) =>{ return new Date(a.date) - new Date(b.date) })
            }else if($event.id==2){
                $event.isClicked ? 
                    this.articles.sort((a,b) =>{ return b.title.toLowerCase().localeCompare(a.title.toLowerCase()) }) : 
                    this.articles.sort((a,b) =>{ return a.title.toLowerCase().localeCompare(b.title.toLowerCase()) })
            }
        },
        search($event){
            if($event!=''){
                this.articles = this.articles.filter(article => {
                    return article.title.toLowerCase().includes($event.toLowerCase()) +
                    article.author.toLowerCase().includes($event.toLowerCase()) +
                    article.lang.toLowerCase().includes($event.toLowerCase());
                }); 
            }else{
                this.getArticles();
            }
        }
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
        this.getArticles();
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
.empty-text {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
}
</style>
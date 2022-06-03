<template>
    <div class="block scrollX">
        <p class="title">{{ content.title }}</p>
        <div class="card-list" :class="{ center :articles.length<1}">
            <the-article-card @click="$router.push('/article/'+article._id)" :article="article" v-for="article in articles" :key="article._id"></the-article-card>
            <plus-button :width="'50px'" :height="'50px'" @click="$router.push('/article/create')"></plus-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheArticleCard from '../../TheArticleCard.vue'
import PlusButton from '../../UI/PlusButton.vue'
import { profilePageText } from './ProfilePage'
import ArticleService from '../../../services/article.service'

const articleService = new ArticleService();

export default {
    components: { TheArticleCard, PlusButton },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            articles: [],
            content: profilePageText.RU.articleList,
        }
    },

    methods : {
        getArticle(){
            articleService.getArticlesByUserId(this.user._id).then(res => {
                this.articles = res;
            })
        }
    },

    updated() {
        this.getArticle();
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = profilePageText[newLang].articleList;
        }
    },
}
</script>

<style lang="scss" scoped>
.block{
    width: 1000px;
    height: 320px;

    display: flex;
    flex-direction: column;

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);
}
.card-list{
    display: flex;
    align-items: center;

    margin-left: 30px;
    gap: 30px;
}
.center{
    justify-content: center;
    height: 230px;
}
.title{
    font-size: 24px;
    font-weight: bold;

    padding: 15px;
}

</style>
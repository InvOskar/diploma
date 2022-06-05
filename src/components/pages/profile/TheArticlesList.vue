<template>
    <div class="block scrollX">
        <p class="title">{{ content.title }}</p>
        <div class="card-list animate" :class="{ center :articles.length<1}">
            <the-article-card
                :article="article" 
                v-for="article in articles" 
                :key="article._id" />
            <plus-button
                :width="'50px'" :height="'50px'" 
                @click="$router.push('/article/create')" 
                v-if="isAuthor" />
        </div>
        <p v-if="articles.length<1 && !isAuthor" class="no-articles">
            {{ content.emptyText }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheArticleCard from './TheArticleCard.vue'
import PlusButton from '../../UI/PlusButton.vue'
import { profilePageText } from './ProfilePage'
import ArticleService from '../../../services/article.service'
import UserService from '../../../services/user.service'
import { gsap } from 'gsap'

const articleService = new ArticleService();
const userService = new UserService();

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
            isAuthor: false,
        }
    },

    methods : {
        getArticle(){
            articleService.getArticlesByUserId(this.user._id).then(res => {
                this.articles = res;
            })
        },

        checkIsAuthor(){
            if(this.isSignedUp){
                userService.getAuthUser().then(res => {
                    let user = res;
                    if(user._id === this.user._id){
                        this.isAuthor = true;
                    }
                });
            }
        },
    },

    updated() {
        this.getArticle();
        this.checkIsAuthor();
    },

    mounted() {
        gsap.from('.animate', {
            delay: 2,
            opacity: 0,
            y: -300,
            duration: 3,
            ease: "elastic",
        });
    },

    computed: {
        ...mapGetters(['getLanguage', 'isSignedUp'])
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

    border-radius: 30px;
    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);

    display: flex;
    flex-direction: column;
}
.card-list{
    display: flex;
    align-items: center;
    gap: 30px;

    margin-left: 30px;
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
.no-articles{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    
    height: 100%;
}
</style>
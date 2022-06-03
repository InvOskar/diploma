<template>
    <div class="article">
        <p class="title" :contenteditable="isContenteditable()" @input="updateTitle($event.target.innerHTML)">{{ article.title }}</p>
        <p class="subtitle" :contenteditable="isContenteditable()" @input="updateSubtitle($event.target.innerHTML)">{{ article.subtitle }}</p>
        <the-scrollable-block>
            <div class="content">
                <p class="paragraph" 
                v-for="(paragraph, i) in article.content" :key="i" 
                :contenteditable="isContenteditable()"
                @input="updateParagraph($event.target.innerHTML, i)"
                v-html="paragraph">
                </p>
            </div>
        </the-scrollable-block>
        <div class="info">
            <p>{{ content.author }}: {{ article.author }}</p>
            <p>{{ content.date }}: {{ article.date }}</p>
            <p>{{ content.lang }}: {{ article.lang}}</p>
        </div>
        <main-button v-if="isAuthor" style="float: right; margin-right: 250px;" @click="saveArticle()">{{ content.save }}</main-button>
    </div>
</template>

<script>
import TheScrollableBlock from '../../TheScrollableBlock.vue';
import ArticleService from '../../../services/article.service';
import UserService from '../../../services/user.service';
import { gsap } from "gsap";
import { mapGetters } from 'vuex';
import { articlesPageText } from './ArticlesPage';
import MainButton from '../../UI/MainButton.vue';

const articleService = new ArticleService();
const userService = new UserService();

export default {
    components: { TheScrollableBlock, MainButton },

    data() {
        return {
            article: {},
            content: articlesPageText.RU.articlePage,
            isAuthor: false,
            newArticle: {},
        }
    },

    methods: {
        currentArticle() {
            articleService.getArticleById(this.$route.params.id).then(res => {
                this.article = res;
                this.checkIsAuthor();
            });
        },
        checkIsAuthor(){
            if(this.isSignedUp){
                userService.getAuthUser().then(res => {
                    let user = res;

                    if(user._id === this.article.authorId){
                        this.isAuthor = true;
                    }
                });
            }
        },
        isContenteditable(){
            if(this.isAuthor){
                return true;
            }
            return false;
        },
        updateTitle(title){
            this.newArticle.title = title;
        },
        updateSubtitle(subtitle){
            this.newArticle.subtitle = subtitle;
        },
        updateParagraph(paragraph, i){
            this.newArticle.content[i] = paragraph;
        },
        saveArticle(){
            articleService.updateArticle(this.newArticle).then(res => {
                gsap.from(".article", {duration: 1, opacity: 0});
            });
        },
    },

    mounted(){
        this.currentArticle();
        gsap.from(".title", {
            duration: 2,
            opacity: 0,
            x: -500,
        });
        gsap.from(".subtitle", {
            duration: 2,
            opacity: 0,
            x: 500,
        });
        gsap.from(".info", {
            duration: 2,
            opacity: 0,
            y: 500,
        });
    },

    updated() {
        this.newArticle = {...this.article};
    },

    computed: {
        ...mapGetters(['getLanguage', 'isSignedUp']),
    },

    watch: {
        getLanguage(newLang){
            this.content = articlesPageText[newLang].articlePage;
        }
    }
}
</script>

<style lang="scss" scoped>
.title, .subtitle {
    text-align: center;
}
.title{
    font-size: 43px;
    font-weight: bold;
    margin-top: 40px;
}
.subtitle{
    font-size: 26px;
    font-weight: bold;
    color: #828282;
    padding: 20px;
}
.content{
    padding: 20px;

    gap: 20px;

    font-size: 26px;
}
.info {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 100px;

    padding: 20px;

    font-size: 24px;

}
</style>
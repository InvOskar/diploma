<template>
    <div class="article">
        <p class="title" 
            :contenteditable="isContenteditable()"
            @input="updateTitle($event.target.innerHTML)"
            v-html="article.title">
        </p>
        <p class="subtitle"
            :contenteditable="isContenteditable()"
            @input="updateSubtitle($event.target.innerHTML)"
            v-html="article.subtitle">
        </p>
        <the-scrollable-block>
            <div class="content">
                <p class="context"
                    v-for="(paragraph, i) in article.content"
                    :key="i" 
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
        <main-button v-if="isAuthor" 
            style="float: right; margin-right: 250px;" 
            @click="saveArticle()">
            {{ content.save }}
        </main-button>
        <div class="assesment" v-else-if="isSignedUp">
            <p>{{ content.assesment }}: </p>
            <div class="rating" 
                v-for="i in 5" :key="i" 
                @click="rate(i)" 
                :class="{selected: i== rating, rated: isRated}">
                {{ i }}
            </div>
        </div>
        <main-button class="comments-button"
            @click="$router.push(`/article/${article._id}/comments`)">
            {{ content.comments }}
        </main-button>
    </div>
</template>

<script>
import TheScrollableBlock from '../../TheScrollableBlock.vue';
import ArticleService from '../../../services/article.service';
import LessonService from '../../../services/lesson.service';
import UserService from '../../../services/user.service';
import { gsap } from "gsap";
import { mapGetters } from 'vuex';
import { articlesPageText } from './ArticlesPage';
import MainButton from '../../UI/MainButton.vue';

const articleService = new ArticleService();
const lessonService = new LessonService();
const userService = new UserService();

export default {
    components: { TheScrollableBlock, MainButton },

    data() {
        return {
            article: {},
            content: articlesPageText.RU.articlePage,
            isAuthor: false,
            newArticle: {},
            rating: null, 
            isRated: false,
            userId: null,
            newRating: 4.5,
        }
    },

    methods: {
        rate(i){
            this.rating = i;
            this.isRated = true;
            let item = {
                articleId: this.article._id,
                userId: this.userId,
                rating: i,
            }
            articleService.updateRating(item).then((res) => {
                this.isRated = true;
                articleService.getAvarageRating(this.article.authorId).then((res) => {
                    res ? this.newRating += res : this.newRating += 4.5;
                    
                    lessonService.getAvarageRating(this.article.authorId).then((res) => {
                        res ? this.newRating += res : this.newRating += 4.5;

                        userService.updateRating({id: this.article.authorId, rating: this.newRating/3});
                    })
                })
            }).catch(() => {
                this.isRated = false;
            })
        },

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
                    this.userId = user._id;
                    if(user._id === this.article.authorId){
                        this.isAuthor = true;
                    }else if(user.ratedArticles.find(id => id === this.article._id)){
                        this.isRated = true;
                        this.rating = this.article.assesments.find(item => item.userId === user._id).assesment;
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
        this.newArticle = {...this.article };
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
.context{
    margin-bottom: 20px;
    text-indent: 40px;
}
.info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;

    padding: 20px;

    font-size: 24px;
}
.assesment{
    display: flex;
    align-items: center;
    gap: 20px;

    float: right;
    margin-right: 300px;

    &>p{
        font-size: 24px;
        font-weight: bold;
    }
}
.rating{
    display: block;
    border-bottom: 1px solid #50BE95;
    background: transparent;
    padding: 10px;

    cursor: pointer;
    transition: all 0.3s ease;

    font-size: 24px;
    font-weight: bold;

    &:hover{
        background: #50BE95;
        color: #fff;
    }
}
.selected{
    background: #50BE95;
    color: #fff;
}
.rated{
    pointer-events: none;
}
.comments-button{
    position: relative;
    float: left;
    left: 240px;
}
</style>
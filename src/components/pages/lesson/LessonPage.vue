<template>
    <div class="article">
        <p class="title" 
            :contenteditable="isContenteditable()"
            @input="updateTitle($event.target.innerHTML)"
            v-html="lesson.title">
        </p>
        <p class="subtitle"
            :contenteditable="isContenteditable()"
            @input="updateSubtitle($event.target.innerHTML)"
            v-html="lesson.subject">
        </p>
        <the-scrollable-block>
            <div class="content">
                <p class="paragraph"
                    :contenteditable="isContenteditable()"
                    @input="updateDescription($event.target.innerHTML, i)"
                    v-html="lesson.description">
                </p>
            </div>
        </the-scrollable-block>
        <div class="info">
            <p>{{ content.author }}: {{ lesson.author }}</p>
            <p>{{ content.date }}: {{ lesson.date }}</p>
            <p>{{ content.lang }}: {{ lesson.lang}}</p>
        </div>
        <main-button v-if="isAuthor" 
            style="float: right; margin-right: 250px;" 
            @click="saveLesson()">
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
            @click="$router.push(`/lesson/${lesson._id}/comments`)">
            {{ content.comments }}
        </main-button>
    </div>
</template>

<script>
import TheScrollableBlock from '../../TheScrollableBlock.vue';
import LessonService from '../../../services/lesson.service';
import ArticleService from '../../../services/article.service';
import UserService from '../../../services/user.service';
import { gsap } from "gsap";
import { mapGetters } from 'vuex';
import { lessonsPageText } from './LessonsPage';
import MainButton from '../../UI/MainButton.vue';

const articleService = new ArticleService();
const lessonService = new LessonService();
const userService = new UserService();

export default {
    components: { TheScrollableBlock, MainButton },

    data() {
        return {
            lesson: {},
            content: lessonsPageText.RU.lessonPage,
            isAuthor: false,
            newLesson: {},
            rating: null, 
            isRated: false,
            userId: null,
            lessonsRating: [],
            artclesRating: [],
        }
    },

    methods: {
        rate(i){
            this.rating = i;
            this.isRated = true;
            let item = {
                lessonId: this.lesson._id,
                userId: this.userId,
                rating: i,
            }
            lessonService.updateRating(item).then((res) => {
                this.isRated = true;
                let newRate = {
                    id: res.authorId,
                    newRating: this.getNewAuthorRating(),
                }
                // userService.updateRating(newRate);
            }).catch(() => {
                this.isRated = false;
            })
        },

        getNewAuthorRating(){
            let rating = (this.articlesRating.reduce((a, b) => a + b, 0) + this.lessonsRating.reduce((a, b) => a + b, 0)) / (this.articlesRating.length + this.lessonsRating.length);
            return (rating+4.5)/2;
        },

        currentLesson() {
            lessonService.getLessonById(this.$route.params.id).then(res => {
                this.lesson = res;
                this.checkIsAuthor();
            });
        },

        checkIsAuthor(){
            if(this.isSignedUp){
                userService.getAuthUser().then(res => {
                    let user = res;
                    this.userId = user._id;
                    if(user._id === this.lesson.authorId){
                        this.isAuthor = true;
                    }else if(user.ratedLessons.find(id => id === this.lesson._id)){
                        this.isRated = true;
                        this.rating = this.lesson.assesments.find(item => item.userId === user._id).assesment;
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
            this.newLesson.title = title;
        },
        updateSubject(subject){
            this.newLesson.subject = subject;
        },
        updateDescription(description){
            this.newLesson.description = description;
        },
        saveLesson(){
            lessonService.updateLesson(this.newLesson).then(res => {
                gsap.from(".article", {duration: 1, opacity: 0});
            });
        },
    },

    mounted(){
        this.currentLesson();
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
        this.newLesson = { ...this.lesson };
        articleService.getArticlesByUserId(this.lesson.authorId).then((res) => {
            res.forEach(item => {
                this.articlesRating.push(item.rating);
            });
        });
        lessonService.getLessonsByUserId(this.lesson.authorId).then((res) => {
            res.forEach(item => {
                this.lessonsRating.push(item.rating);
            });
        });
    },

    computed: {
        ...mapGetters(['getLanguage', 'isSignedUp']),
    },

    watch: {
        getLanguage(newLang){
            this.content = lessonsPageText[newLang].lessonPage;
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
.paragraph{
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

    cursor: pointer;

    background: transparent;
    padding: 10px;

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
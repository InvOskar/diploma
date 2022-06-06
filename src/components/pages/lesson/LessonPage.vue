<template>
    <div class="article">
        <p class="title">{{ content.lesson }}</p>
        <the-scrollable-block>
            <p class="lesson-title" 
                :contenteditable="isContenteditable()"
                @input="updateTitle($event.target.innerHTML)"
                v-html="lesson.title">
            </p>
            <p class="subtitle"
                :contenteditable="isContenteditable()"
                @input="updateSubtitle($event.target.innerHTML)"
                v-html="lesson.subject">
            </p>
            <div class="content">
                <p>{{ content.description }}:</p>
                <p class="context"
                    :contenteditable="isContenteditable()"
                    @input="updateDescription($event.target.innerHTML, i)"
                    v-html="lesson.description">
                </p>
            </div>
            <div class="content">
                <p>{{ content.link }}:</p>
                <p class="context link"
                    :contenteditable="isContenteditable()"
                    @input="updateLink($event.target.innerHTML, i)"
                    v-html="lesson.link">
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
import UserService from '../../../services/user.service';
import { gsap } from "gsap";
import { mapGetters } from 'vuex';
import { lessonsPageText } from './LessonsPage';
import MainButton from '../../UI/MainButton.vue';

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
            }).catch(() => {
                this.isRated = false;
            })
        },

        currentLesson() {
            lessonService.getLessonById(this.$route.params.id).then(res => {
                this.lesson = res;
                this.checkIsAuthor();
            });
        },

        isItLink(str){
            if(str.includes('http')){
                return true;
            }
            return false;
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
        updateLink(link){
            if(link.includes('http') || link.includes('https')){
                this.newLesson.link = link;
            }
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
            y: -500,
        });
        gsap.from(".lesson-title", {
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
.title{
    text-align: center;
}
.title{
    font-size: 43px;
    font-weight: bold;
    padding: 40px 0;
}
.lesson-title{
    font-size: 30px;
    font-weight: bold;
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

    border: 1px solid grey;
    border-radius: 30px;
}
.link{
    text-decoration: underline;
}
.context{
    padding: 20px 0;
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
    transition: all 0.3s ease;

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
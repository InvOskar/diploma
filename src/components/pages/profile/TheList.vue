<template>
    <div class="block scrollX">
        <p class="title">{{ getTitle() }}</p>
        <div class="card-list animate" :class="{ center :items.length<1}">
            <the-card
                :item="item"
                :type="type"
                :user="user" 
                v-for="item in items" 
                :key="item._id" />
            <plus-button
                :width="'50px'" :height="'50px'"
                @click="$router.push(`/${type}/create`)"
                v-if="isAuthor" />
        </div>
        <p v-if="items.length<1 && !isAuthor && type === 'article'" class="no-articles">
            {{ getEmptyText() }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheCard from './TheCard.vue'
import PlusButton from '../../UI/PlusButton.vue'
import { profilePageText } from './ProfilePage'
import ArticleService from '../../../services/article.service'
import UserService from '../../../services/user.service'
import LessonService from '../../../services/lesson.service'
import { gsap } from 'gsap'

const articleService = new ArticleService();
const lessonService = new LessonService();
const userService = new UserService();

export default {
    components: { TheCard, PlusButton },
    props: {
        user: {
            type: Object,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
    },

    data() {
        return {
            items: [],
            content: profilePageText.RU.list,
            isAuthor: false,
        }
    },

    methods : {
        getTitle(){
            if(this.type === 'article'){
                return this.content.title.article;
            } else if(this.type === 'lesson'){
                return this.content.title.lesson;
            }
        },
        getEmptyText(){
            if(this.type === 'article'){
                return this.content.emptyText.article;
            } else if(this.type === 'lesson'){
                return this.content.emptyText.lesson;
            }
        },
        getArticle(){
            articleService.getArticlesByUserId(this.user._id).then(res => {
                this.items = res;
            })
        },
        getLesson(){
            lessonService.getLessonsByUserId(this.user._id).then(res => {
                this.items = res;
            })
        },
        getItem(){
            if(this.type === 'lesson'){
                this.getLesson();
            }else if(this.type === 'article'){
                this.getArticle();
            }
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
        this.checkIsAuthor();
        this.getItem();
    },

    // mounted() {
    //     gsap.from('.animate', {
    //         delay: 2,
    //         opacity: 0,
    //         y: -300,
    //         duration: 3,
    //         ease: "elastic",
    //     });
    // },

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
    height: 375px;

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
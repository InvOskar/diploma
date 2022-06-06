<template>
    <div class="card">
        <div @click="$router.push(`/${type}/`+item._id)">
            <p class="card-title">{{ item.title }}</p>
            <p class="card-subtitle" v-if="type==='article'">{{ item.subtitle }}</p>
            <p class="card-subtitle" v-if="type==='lesson'">{{ item.subject }}</p>
            <p>{{ item.date }}</p>
            <div class="card-img">
                <img :src="require(`@/assets/images/${item.lang}.png`)">
            </div>
        </div>
        <div class="delete-button">
            <minus-button @click="deleteItem()" v-if="isAuthor"></minus-button>
        </div>
    </div>
</template>

<script>
import MinusButton from '../../UI/MinusButton.vue';
import { mapGetters } from "vuex";
import ArticleService from '../../../services/article.service'
import LessonService from '../../../services/lesson.service'
import UserService from '../../../services/user.service'

const artcileService = new ArticleService();
const lessonService = new LessonService();
const userService = new UserService();

export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    components: { MinusButton },

    data() {
        return {
            isAuthor: false,
            userId: null,
        }
    },

    computed: {
        ...mapGetters(['isSignedUp'])
    },

    methods: {
        checkIsAuthor(){
            if(this.isSignedUp){
                userService.getAuthUser().then(res => {
                    this.userId = res._id;

                    if(this.userId === this.item.authorId){
                        this.isAuthor = true;
                    }
                })
            }
        },
        deleteArticle() {
            artcileService.deleteArticle(this.item._id).then(res => {
                this.$router.push('/profile/' + this.userId);
            });
        },
        deleteLesson() {
            lessonService.deleteLesson(this.item._id).then(res => {
                this.$router.push('/profile/' + this.userId);
            });
        },
        deleteItem() {
            if(this.type === 'article'){
                this.deleteArticle();
            }else if(this.type === 'lesson'){
                this.deleteLesson();
            }
        },
    },

    mounted() {
        this.checkIsAuthor();
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    min-width: 150px;
    max-width: 300px;
    height: 290px;

    padding: 20px;

    border: 1px solid #50BE95;
    border-radius: 9px;

    cursor: pointer;
}
p{
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 15px;
    word-wrap: break-word;
}
.card-title {
    font-size: 22px;
    font-weight: bold;
}
.card-subtitle{
    font-size: 20px;
    color: grey;
}
.card-img{
    position: absolute;
    top: -10px;
    right: -10px;   
}
.delete-button{
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>
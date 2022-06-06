<template>
    <div>
        <div class="info-block">
            <div class="title">
                <p>{{ content.commentsFor }}&nbsp;</p>
                <p>{{ getType() }}: {{ item.title }}</p>
            </div>
            <div class="info">
                <p>{{ content.author }}: {{ item.author }}</p>
                <p>{{ content.date }}: {{ item.date }}</p>
                <p>{{ content.rating }}: {{ item.rating }}</p>
            </div>
        </div>
        <the-scrollable-block>
            <div class="comments" v-if="!isEmpty">
                <the-comment class="comment"
                    v-for="comment in comments"
                    :key="comment"
                    :comment="comment"
                    @deleteComment="deleteComment($event)"
                    @updateComment="updateComment($event)"/>
            </div>
            <div class="empty-text" v-else>
                <p>{{ content.emptyText }}</p>
            </div>
        </the-scrollable-block>
        <div class="add-comment">
            <main-input :placeholder="content.addCommentPlaceholder"
                v-model="newComment" 
                ref="commentInput"
                :width="'80%'"/>
            <main-button @click="addComment()">{{ content.addComment }}</main-button>
        </div>
    </div>
</template>

<script>
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import TheComment from './TheComment.vue'
import { commentPageText } from './CommentPage'
import CommentService from '../../../services/comment.service';
import ArticleService from '../../../services/article.service';
import LessonService from '../../../services/lesson.service';
import UserService from '../../../services/user.service';
import PlusButton from '../../UI/PlusButton.vue';
import MainButton from '../../UI/MainButton.vue';
import MainInput from '../../UI/MainInput.vue';
import { gsap } from 'gsap';

const commentService = new CommentService();
const articleService = new ArticleService();
const lessonService = new LessonService();
const userService = new UserService();

export default {
    components: { TheScrollableBlock, TheComment, PlusButton, MainButton, MainInput },

    data() {
        return {
            item: {},
            type: '',
            comments: [],
            content: commentPageText.RU.commentPage,
            isEmpty: true,
            newComment: '',
            user: {},
        }
    },

    methods: {
        getTypeOfPage(){
            this.type = this.$route.path.split('/')[1];
        },
        getType(){
            if(this.type === 'article'){
                return this.content.article;
            }
            if(this.type === 'lesson'){
                return this.content.lesson;
            }
        },
        getPageItem(){
            if(this.type === 'article'){
                articleService.getArticleById(this.$route.params.id)
                    .then(res => {
                        this.item = res;
                    });
            }else if(this.type === 'lesson'){
                lessonService.getLessonById(this.$route.params.id)
                    .then(res => {
                        this.item = res;
                    });
            }
        },
        getComments(){
            commentService.getCommentsByPostId(this.item._id).then(res => {
                this.comments = res;
                if(this.comments.length > 0){
                    this.isEmpty = false;
                }
            })
        },
        addComment(){
            if(this.newComment.length > 0){
                let currentDate = new Date();
                let date = currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
                let newComment = {
                    postId: this.item._id,
                    userId: this.user._id,
                    content: this.newComment,
                    date: date,
                    userName: this.user.firstName + ' ' + this.user.lastName,
                }
                commentService.createComment(newComment).then(res => {
                    this.$refs["commentInput"].value = "";
                    this.getComments();
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        deleteComment(id){
            commentService.deleteComment(id).then(res => {
                this.getComments();
            })
            .catch(err => {
                console.log(err);
            });
        },
        updateComment(comment){
            if(comment.content.length < 1){
                this.deleteComment(comment._id);
            }else{
                commentService.updateComment(comment).then(res => {
                    this.getComments();
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
    }, 

    mounted() {
        userService.getAuthUser().then(res => {
            this.user = res;
        });
        this.getTypeOfPage();
        this.getPageItem();
        let tl = new gsap.timeline();
        tl.from('.info-block', {
            duration: 1,
            opacity: 0,
            y: -100,
            ease: 'power3.out',
        })
        .from('.add-comment', {
            duration: 1,
            opacity: 0,
            y: 100,
            ease: 'power3.out',
        })
    },

    updated() {
        this.getComments();
    },
}
</script>

<style lang="scss" scoped>
.info-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 40px 0;
    margin-left: 250px;
}
.title {
    display: flex;
    align-items: center;

    &>p{
        font-size: 36px;
        font-weight: bold;
    }
}
.info{
    display: flex;
    gap: 30px;

    &>p{
        color: grey;
        font-size: 24px;
    }
}
.add-comment{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    width: 75%;
    margin: 0 auto;
}
</style>


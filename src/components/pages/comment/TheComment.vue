<template>
    <div class="comment-block">
        <div class="top">
            <p class="user">{{ comment.userName }}</p>
            <p class="delete" 
                v-if="isAuthor" 
                @click="deleteComment()">{{ content.delete }}</p>
        </div>
        <p class="content" 
            :contenteditable="isContenteditable()"
            @input="updateContent($event.target.innerHTML)"
            v-html="comment.content"></p>
        <div class="bottom">
            <p>&nbsp;</p>
            <p class="date">{{ comment.date }}</p>
        </div>
    </div>
</template>

<script>
import { commentPageText } from './CommentPage'
import UserService from '../../../services/user.service'

const userService = new UserService();

export default {
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            content: commentPageText.RU.theComment,
            isAuthor: false,
            user: {},
            newComment: { ...this.comment },
        }
    },

    methods: {
        getUser(){
            userService.getAuthUser().then(res => {
                this.user = res;

                if(this.user._id === this.comment.userId){
                    this.isAuthor = true;
                }
            });
        },
        isContenteditable(){
            if(this.isAuthor){
                return true;
            }
            return false;
        },
        deleteComment(){
            this.$emit('deleteComment', this.comment._id);
        },
        updateContent(content){
            this.newComment.content = content;
            this.$emit('updateComment', this.newComment);
        },
    },

    mounted() {
        this.getUser();
    },
}
</script>

<style lang="scss" scoped>
.comment-block {
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 20px;

    gap: 20px;

    border-radius: 30px;
    border-bottom-left-radius: 0;

    margin-bottom: 40px;

    background: radial-gradient(168.5% 100% at 50% 0%, #f5f5f5 0%, #50BE95 100%);
}
.top, .bottom{
    display: flex;
    justify-content: space-between;

    font-size: 24px;
}
.content{
    font-size: 36px;
}
.delete{
    color: red;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
}
.user, .date{
    color: grey;
}
.update{
    color: green;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
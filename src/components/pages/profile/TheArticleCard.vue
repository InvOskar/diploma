<template>
    <div class="card">
        <div @click="$router.push('/article/'+article._id)">
            <p class="card-title">{{ article.title }}</p>
            <p class="card-subtitle">{{ article.subtitle }}</p>
            <p>{{ article.date }}</p>
            <div class="card-img"><img :src="require(`@/assets/images/${article.lang}.png`)"></div>
        </div>
        <div style="display: flex; justify-content: center;">
            <minus-button @click="deleteArticle()" v-if="isAuthor"></minus-button>
        </div>
    </div>
</template>

<script>
import MinusButton from '../../UI/MinusButton.vue';
import { mapGetters } from "vuex";
import ArticleService from '../../../services/article.service'
import UserService from '../../../services/user.service'

const artcileService = new ArticleService();
const userService = new UserService();

export default {
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    components: { MinusButton },

    data() {
        return {
            isAuthor: false
        }
    },

    computed: {
        ...mapGetters(['isSignedUp'])
    },

    methods: {
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
        deleteArticle() {
            artcileService.deleteArticle(this.article._id).then(res => {
                this.$router.push('/myProfile');
            });
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
    height: 230px;

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
</style>
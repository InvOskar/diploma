<template>
    <div class="__page-block">
        <h1> {{ text.title }} </h1>
        <the-scrollable-block :width="'90%'" :height="'800px'">
            <div class="lang">
                <p>{{ text.lang }}</p>
                <div>
                    <div v-for="language in languages" :key="language">
                        <input class="radio-input" 
                            type="radio" 
                            :value="language" 
                            v-model="lang">
                        {{ language }}
                    </div>
                </div>
            </div>
            <div class="title">
                <main-input class="maintitle" 
                    :width="'90%'" :height="'300px'" 
                    :placeholder="`${ text.articleTitle }`" 
                    v-model="title" />
                <main-input class="subtitle" 
                    :width="'90%'" :height="'300px'" 
                    :placeholder="`${ text.articleSubtitle }`" 
                    v-model="subtitle" />
            </div>
            <div class="content">
                <div class="paragraph" v-for="i in paragraphCounter" :key="i">
                    <minus-button class="minus" @click="deleteParagraph(i)" />
                    <textarea :placeholder="`${ text.articleParagraph } ${i}`" 
                        v-model="content[i-1]" />
                </div>
                <plus-button @click="addParagraph" />
                <main-button @click="createArticle">
                    {{ text.createArticle }}
                </main-button>
                <div class="error">
                    <p>{{ error }}</p>
                </div>
            </div>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import MainButton from '../../UI/MainButton.vue'
import MainInput from '../../UI/MainInput.vue'
import MinusButton from '../../UI/MinusButton.vue'
import PlusButton from '../../UI/PlusButton.vue'
import { articlesPageText } from "./ArticlesPage";
import { mapGetters } from 'vuex'
import ArticleService from '../../../services/article.service'
import UserService from '../../../services/user.service'

const articleService = new ArticleService();
const userService = new UserService();

export default {
  components: { TheScrollableBlock, MainInput, PlusButton, MinusButton, MainButton },
    data() {
        return {
            text: articlesPageText.RU.createArticle,
            title: "",
            subtitle: "",
            content: [""],
            paragraphCounter: 1,
            user: {},
            lang: "",
            error: "",
            languages: ["RU", "KZ", "EN"],
        }
    },

    methods: {
        addParagraph() {
            this.content.push("");
            this.paragraphCounter++;
        },

        deleteParagraph(i) {
            this.content.splice(i-1, 1);
            this.paragraphCounter--;
        },

        createArticle(){
            if(this.checkData()){
                let currentDate = new Date();
                let date = currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
                let author = this.user.firstName + " " + this.user.lastName;
                let article = {
                    title: this.title,
                    subtitle: this.subtitle,
                    content: this.content,
                    author: author,
                    authorId: this.user._id,
                    lang: this.lang,
                    date: date,
                }
                articleService.createArticle(article)
                    .then(res => {
                        this.$router.push('/articles');
                    })
                    .catch(err => {
                        this.error = err;
                    })
            }
        },

        checkData(){
            if(this.title.length < 1){
                this.error = "Введите название статьи";
                return false;
            }
            if(this.subtitle.length < 1){
                this.error = "Введите подзаголовок статьи";
                return false;
            }
            this.content.forEach(paragraph => {
                if(paragraph.length < 1){
                    this.error = "Введите текст параграфа";
                    return false;
                }
            });
            if(this.lang===""){
                this.error = "Выберите язык";
                return false;
            }
            return true;
        },
    },

    mounted(){
        userService.getAuthUser().then((res) => {
            this.user = res;
        });
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.text = articlesPageText[newLang].createArticle;
        }
    }
}
</script>

<style lang="scss" scoped>
.lang{
    font-size: 22px;

    &>p{
        padding-bottom: 10px;
        font-weight: bold;
    }

    &>div{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
}
.radio-input{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #2F4858;
  transition: 0.2s all linear;
  outline: none;

  margin-right: 5px;
    
  cursor: pointer;

}
.radio-input:checked {
  border: 6px solid #50BE95;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}
.title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
input, textarea{
    &::placeholder{
        font-style: italic;
    }
}
.maintitle{
    font-size: 26px;
    font-weight: 700;
}
.subtitle{
    font-size: 16px;
    font-weight: 400;

    color: grey;
}

textarea{
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: 400;
    background: transparent;
    border-bottom: 3px solid #50BE95;
    border-right: 3px solid #50BE95;

    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;

    padding: 8px;
    box-shadow: 2px 2px 6px grey;
}
.paragraph{
    width: 90%;
    height: 300px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 20px;
}
</style>
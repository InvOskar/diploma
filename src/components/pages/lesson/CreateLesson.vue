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
                    :placeholder="`${ text.lessonTitle }`" 
                    v-model="title" />
                <main-input class="subtitle" 
                    :width="'90%'" :height="'300px'" 
                    :placeholder="`${ text.subject }`" 
                    v-model="subject" />
            </div>
            <div class="content">
                <div class="paragraph">
                    <textarea :placeholder="`${ text.lessonDescription }`"
                        v-model="description"/>
                </div>
                <main-button @click="createLesson">
                    {{ text.createLesson }}
                </main-button>
                <div class="error">
                    <p>{{ error }}</p>
                </div>
            </div>
        </the-scrollable-block>
    </div>
</template>

<script>
import { lessonsPageText } from './LessonsPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import MainInput from '../../UI/MainInput.vue'
import MainButton from '../../UI/MainButton.vue'
import LessonService from '../../../services/lesson.service'
import UserService from '../../../services/user.service'

const lessonService = new LessonService();
const userService = new UserService();

export default {
  components: { TheScrollableBlock, MainInput, MainButton },
    data() {
        return {
            text: lessonsPageText.RU.createLesson,
            lang: '',
            title: '',
            description: '',
            subject: '',
            languages: ["RU", "KZ", "EN"],
            error: '',
            user: {},
        }
    },

    methods: {
        checkData(){
            if(this.title.length < 1){
                this.error = "Введите название статьи";
                return false;
            }
            if(this.description.length < 1){
                this.error = "Введите описание статьи";
                return false;
            }
            if(this.lang===""){
                this.error = "Выберите язык";
                return false;
            }
            return true;
        },
        createLesson(){
            if(this.checkData()){
                let currentDate = new Date();
                let date = currentDate.getDate() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();
                let author = this.user.firstName + " " + this.user.lastName;
                let lesson = {
                    title: this.title,
                    description: this.description,
                    subject: this.subject,
                    content: [],
                    author: author,
                    authorId: this.user._id,
                    lang: this.lang,
                    date: date,
                }
                lessonService.createLesson(lesson)
                    .then(res => {
                        this.$router.push('/lesson/' + res._id);
                    })
                    .catch(err => {
                        this.error = err;
                    })
            }
        }
    },

    computed: {
        ...mapGetters(['getLanguage']),
    },

    mounted() {
        this.lang = this.getLanguage;
        userService.getAuthUser()
            .then(res => {
                this.user = res;
            })
            .catch(err => {
                this.error = err.message;
            })
    }
}
</script>

<style lang="scss" scoped>
.lang{
    font-size: 22px;
    text-align: center;

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
<template>
    <div class="__page-block">
        <h1>{{ content.header }}</h1>
        <the-top-bar 
            :page="'lessons'"
            @sort="sort($event)"
            @search="search($event)"/>
        <the-scrollable-block>
            <lesson-on-list 
                v-for="lesson in lessons" 
                :lesson="lesson" 
                :key="lesson._id"
                @click="goToLesson(lesson._id)"/>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../../TheTopBar.vue'
import { lessonsPageText } from './LessonsPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import LessonOnList from './LessonOnList.vue'
import LessonService from '../../../services/lesson.service'

const lessonService = new LessonService();

export default {
    components: { TheTopBar, LessonOnList, TheScrollableBlock },
    data() {
        return {
            content: lessonsPageText.RU,
            lessons: [],
        }
    },

    methods: {
        goToLesson(id){
            this.$router.push(`/lesson/${id}`);
        },
        getLessons(){
            lessonService.getLessons()
                .then(res => {
                    this.lessons = res;
                });
        },
        sort($event){
            if($event.id==0){
                $event.isClicked ? 
                    this.lessons.sort((a,b) =>{ return b.rating - a.rating }) : 
                    this.lessons.sort((a,b) =>{ return a.rating - b.rating })
            }else if($event.id==1){
                $event.isClicked ? 
                    this.lessons.sort((a,b) =>{ return new Date(b.date) - new Date(a.date) }) : 
                    this.lessons.sort((a,b) =>{ return new Date(a.date) - new Date(b.date) })
            }else if($event.id==2){
                $event.isClicked ? 
                    this.lessons.sort((a,b) =>{ return b.title.toLowerCase().localeCompare(a.title.toLowerCase()) }) : 
                    this.lessons.sort((a,b) =>{ return a.title.toLowerCase().localeCompare(b.title.toLowerCase()) })
            }
        },
        search($event){
            if($event!=''){
                this.lessons = this.lessons.filter(lesson => {
                    return lesson.title.toLowerCase().includes($event.toLowerCase()) +
                    lesson.author.toLowerCase().includes($event.toLowerCase()) +
                    lesson.subject.toLowerCase().includes($event.toLowerCase()) +
                    lesson.lang.toLowerCase().includes($event.toLowerCase());
                }); 
            }else{
                this.getLessons();
            }
        }
    },

    mounted() {
        this.getLessons();
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = lessonsPageText[newLang];
        }
    }
}
</script>

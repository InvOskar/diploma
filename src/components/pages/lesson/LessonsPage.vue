<template>
    <div class="__page-block">
        <h1>{{ content.header }}</h1>
        <the-top-bar/>
        <the-scrollable-block>
            <!-- <lesson-on-list 
                v-for="lesson in content.lessons" 
                :lesson="lesson" 
                :key="lesson.id"/> -->
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../../TheTopBar.vue'
import { lessonsPageText } from './LessonsPage'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import LessonOnList from './LessonOnList.vue'

export default {
    components: { TheTopBar, LessonOnList, TheScrollableBlock },
    data() {
        return {
            content: lessonsPageText.RU,
        }
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

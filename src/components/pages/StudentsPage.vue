<template>
    <div class="articles">
        <h1>{{ content.header }}</h1>
        <the-top-bar/>
        <the-scrollable-block>
            <student-on-list v-for="student in content.students" :student="student" :key="student.studentEmail"/>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../TheTopBar.vue'
import { studentsPageText } from './StudentsPage.js'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../TheScrollableBlock.vue'
import StudentOnList from '../StudentOnList.vue'

export default {
    components: { TheTopBar, StudentOnList, TheScrollableBlock },
    data() {
        return {
            content: studentsPageText.RU,
        }
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = studentsPageText[newLang];
        }
    }
}
</script>

<style lang="scss" scoped>
.articles{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 50px;

    margin-top: 40px;
}
</style>
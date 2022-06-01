<template>
    <div class="articles">
        <h1>{{ content.header }}</h1>
        <the-top-bar/>
        <the-scrollable-block>
            <teacher-on-list @click="goToProfile(teacher)" v-for="(teacher, index) in teachers" :teacher="teacher" :key="index"/>
        </the-scrollable-block>
    </div>
</template>

<script>
import TheTopBar from '../TheTopBar.vue'
import { teachersPageText } from './TeachersPage.js'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../TheScrollableBlock.vue'
import TeacherOnList from '../TeacherOnList.vue'
import UserService from '../../services/user.service';

const userService = new UserService();

export default {
    components: { TheTopBar, TeacherOnList, TheScrollableBlock },
    data() {
        return {
            content: teachersPageText.RU,
            teachers: [],
        }
    },

    methods: {
        goToProfile(teacher){
            this.$router.push('/profile/' + teacher._id);
        },
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = teachersPageText[newLang];
        }
    },

    mounted(){
        userService.getUsers().then((res) => {
            this.teachers = res;
        });
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
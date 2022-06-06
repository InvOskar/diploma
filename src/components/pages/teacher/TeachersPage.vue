<template>
    <div class="__page-block">
        <h1>{{ content.header }}</h1>
        <the-top-bar 
            :page="'teachers'"
            @sort="sort($event)" 
            @search="search($event)"/>
        <the-scrollable-block v-if="teachers.length>0">
            <teacher-on-list 
                @click="goToProfile(teacher)"
                v-for="(teacher, index) in teachers"
                :key="index"
                :teacher="teacher" />
        </the-scrollable-block>
        <div class="empty-text" v-else>
            <p>{{ content.emptyText }}</p>
        </div>
    </div>
</template>

<script>
import TheTopBar from '../../TheTopBar.vue'
import { teachersPageText } from './TeachersPage.js'
import { mapGetters } from 'vuex'
import TheScrollableBlock from '../../TheScrollableBlock.vue'
import TeacherOnList from './TeacherOnList.vue'
import UserService from '../../../services/user.service';

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
        getUsers(){
            userService.getUsers().then((res) => {
                this.teachers = res;
            });
        },
        sort($event){
            if($event.id==0){
                $event.isClicked ? 
                    this.teachers.sort((a,b) =>{ return b.rating - a.rating }) : 
                    this.teachers.sort((a,b) =>{ return a.rating - b.rating })
            }else if($event.id==1){
                $event.isClicked ? 
                    this.teachers.sort((a,b) =>{ return b.firstName.toLowerCase().localeCompare(a.firstName.toLowerCase()) }) : 
                    this.teachers.sort((a,b) =>{ return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()) })
            }
        },
        search($event){
            if($event!=''){
                this.teachers = this.teachers.filter(teacher => {
                    return teacher.firstName.toLowerCase().includes($event.toLowerCase()) +
                    teacher.lastName.toLowerCase().includes($event.toLowerCase()) +
                    teacher.currentWork.toLowerCase().includes($event.toLowerCase());
                }); 
            }else{
                this.getUsers();
            }
        }
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
        this.getUsers();
    }
}
</script>

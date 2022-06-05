<template>
    <div class="my-profile">
        <the-info-block :user="user" class="animate1"></the-info-block>
        <div class="lists">
            <the-articles-list :user="user" class="animate2"></the-articles-list>
            <the-lessons-list :user="user" class="animate3"></the-lessons-list>
        </div>
    </div>
</template>

<script>
import TheInfoBlock from './TheInfoBlock.vue'
import TheArticlesList from './TheArticlesList.vue'
import TheLessonsList from './TheLessonsList.vue'
import UserService from '../../../services/user.service'
import { gsap } from 'gsap'

const userService = new UserService();

export default {
    components: { TheInfoBlock, TheArticlesList, TheLessonsList },

    data() { 
        return{
            user: {},
        }
    },

    beforeCreate() {
        if(this.$route.params.id==1){
            userService.getAuthUser().then(res => {
                this.$router.push(res._id);
                this.user = res;
            });
        }else{
            userService.getUserById(this.$route.params.id).then((res) => {
                this.user = res;
            });
        }
    },
    mounted(){
        let tl = gsap.timeline();
        tl.from('.animate1', {duration: 1, opacity: 0, x: -100})
            .from('.animate2', {duration: 1, opacity: 0, x: 100, y: -100})
            .from('.animate3', {duration: 1, opacity: 0, x: 100, y: 100})
    },
}
</script>

<style lang="scss" scoped>
.my-profile{
    width: 90%;
    height: 800px;

    margin: auto;
    margin-top: 90px;

    display: grid;
    grid-template-columns: .4fr .6fr;
}
.lists{
    display: grid;
    grid-gap: 30px;
}
</style>
<template>
    <div class="my-profile">
        <the-info-block :user="user"></the-info-block>
        <div class="lists">
            <the-articles-list :user="user"></the-articles-list>
            <!-- <the-lessons-list :user="user"></the-lessons-list> -->
            <asyncArticleList :user="user"></asyncArticleList>
        </div>
    </div>
</template>

<script>
import TheInfoBlock from './TheInfoBlock.vue'
import TheArticlesList from './TheArticlesList.vue'
import TheLessonsList from './TheLessonsList.vue'
import UserService from '../../../services/user.service'
import { defineAsyncComponent } from 'vue'



const userService = new UserService();

export default {
    components: { 
        TheInfoBlock, 
        TheArticlesList, 
        TheLessonsList,
        asyncArticleList: defineAsyncComponent(() => 
            import('./TheArticlesList.vue')
        ),
    },

    data() { 
        return{
            user: {},
        }
    },
    mounted(){
        userService.getAuthUser().then((res) => {
            this.user = res;
        });
    }

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
    grid-gap: 50px;
}
</style>
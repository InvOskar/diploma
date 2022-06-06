<template>
    <div class="block">
        <div class="left">
            <div class="top-line">
                <p class="topic"> {{ lesson.title }} </p>
            </div>
            <div class="bottom-line">
                <p>{{ content.subject}}: {{ lesson.subject }}</p>
                <p>{{ content.author }}: {{ lesson.author }}</p>
                <p>{{ content.date }}: {{ lesson.date }}</p>
                <p>{{ content.lang }}: {{ lesson.lang }}</p>
            </div>
        </div>
        <div class="rating">{{ lesson.rating.toFixed(2) }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { lessonsPageText } from './LessonsPage'

export default {
    props:{
        lesson:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            content: lessonsPageText.RU.lessonPage
        }
    },
    computed: {
        ...mapGetters(['getLanguage'])
    },
}
</script>

<style lang="scss" scoped>
.block {
    border-bottom: 2px solid #50BE95;

    padding: 20px;

    display: flex;
    justify-content: space-between;

    &:hover{
        cursor: pointer;
    }
}
.left {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.topic{
    font-size: 24px;
    font-weight: 700;
}
.bottom-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;

    padding-top: 10px;

    font-size: 16px;
    color: grey;
}
.rating{
    float: right;

    width: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    font-weight: 700;
}
</style>
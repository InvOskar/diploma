<template>
    <div>{{ lesson.title }}</div>
</template>

<script>
import LessonService from '../../../services/lesson.service'

const lessonService = new LessonService();

export default {
    data() {
        return {
            lesson: {},
        }
    },

    methods: {
        getLesson() {
            lessonService.getLesson(this.$route.params._id).then(response => {
                this.lesson = response;
            });
        },
    },

    mounted(){

    }
}
</script>

<style>

</style>
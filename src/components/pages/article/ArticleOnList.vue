<template>
    <div class="block">
        <div class="left">
            <div class="top-line">
                <p class="topic">{{ article.title }}</p>
            </div>
            <div class="bottom-line">
                <p>{{ keys[getLanguage][0] }}: {{ article.author }}</p>
                <p>{{ keys[getLanguage][1] }}: {{ article.date }}</p>
                <p>{{ keys[getLanguage][2] }}: {{ article.lang }}</p>
            </div>
        </div>
        <div class="rating">{{ article.rating.toFixed(2) }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        article:{
            type:Object,
            required:true
        }
    },

    data(){
        return{
            keys: {
                RU: ['Автор', 'Дата', 'Язык'],
                KZ: ['Автор', 'Дата', 'Язык'],
                EN: ['Author', 'Date', 'Language']
            },
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
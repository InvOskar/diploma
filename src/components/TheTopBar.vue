<template>
    <div class="top-bar">
        <div class="searcher">
            <input type="text" class="searcher-input" placeholder="Search...">
            <img src="@/assets/svg/search.svg" class="searcher"/>
        </div>
        <div class="sort-options">
            <p class="sort">{{ topBarText.sort }}</p>
            <p v-for="item in topBarText.sortOptions" :key="item" class="option">{{ item }}</p>
        </div>
    </div>
</template>

<script>
import { topBarText } from './TheTopBar.js'
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'

export default {
    data() {
        return {
            topBarText: topBarText.RU,
        }
    },

    props: {
        page: {
            type: String,
            required: true,
        },
    },  

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.topBarText = topBarText[newLang];
        }
    },

    mounted() {
        gsap.from('.top-bar', {
            duration: 1,
            opacity: 0,
            x: -300,
            ease: 'power3.out'
        })
    }
}
</script>

<style lang="scss" scoped>
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 50px;

    border: 3px solid #50BE95;

    width: 70%;
    margin: auto;

    border-radius: 50px;
}
.searcher{
    width: 45%;
    height: 100%;

    margin-left: 50px;

    display: flex;
    align-items: center;

    &>img{
        width: 35px;
        height: 35px;
    }
}

.searcher-input{
    border: none;
    outline: none;
    background: none;
    font-size: 20px;
    font-weight: 700;
    color: #50BE95;
    padding: 0;

    width: 60%;
}

.sort-options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;

    font-size: 20px;
}
.sort{
    font-size: 22px;
    font-weight: 700;
}
.selected{
    color: #50BE95;
}
.option{
    cursor: pointer;
}
</style>
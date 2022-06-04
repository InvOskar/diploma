<template>
    <div class="top-bar">
        <div class="searcher">
            <input type="text" 
                class="searcher-input" 
                placeholder="Search..."
                v-model="search">
            <img src="@/assets/svg/search.svg" class="searcher"/>
        </div>
        <div class="sort-options" v-if="page!='teachers'">
            <p class="sort">{{ topBarText.sort }}</p>
            <p v-for="(item, index) in topBarText.sortOptions" 
                :key="index" 
                class="option" 
                @click="clicked(index)">
                {{ item }}
            </p>
        </div>
        <div class="sort-options" v-else>
            <p class="sort">{{ topBarText.sort }}</p>
            <p v-for="(item, index) in topBarText.sortOptionsTeachers" 
                :key="index" 
                class="option" 
                @click="clicked(index)">
                {{ item }}
            </p>
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
            isClicked: [false, false, false],
            search: '',
        }
    },

    props: {
        page: {
            type: String,
            required: true,
        },
    },  

    methods: {
        clicked(index){
            this.isClicked[index] = !this.isClicked[index];
            let item = {
                id: index,
                isClicked: this.isClicked[index],
            }
            this.$emit('sort', item);
        }
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.topBarText = topBarText[newLang];
        },
        search(newSearch){
            this.$emit('search', newSearch);
        }
    },

    mounted() {
        let tl = gsap.timeline();
        tl.from('.top-bar', {
            duration: 1,
            opacity: 0,
            x: -300,
            ease: 'power3.out'
        })
        .from('.searcher', {
            duration: 1,
            opacity: 0,
            x: -300,
            ease: 'power3.out'
        })
        .from('.sort', {
            duration: 1,
            opacity: 0,
            x: -300,
            ease: 'elastic'
        })
        .from('.option',{
            duration: 1,
            opacity: 0,
            x: 100,
            stagger: 0.4,
            ease: 'back'
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